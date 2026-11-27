// Auto-modularized section: js/audio/sound-engine.js

/**
     * ============================================================================
     * 1. WEB AUDIO SYNTHESIZER, NORMAL ATTACK SFX, ADAPTIVE BGM & PITCH DETECTOR
     * ============================================================================
     */

class SoundEngine {
      constructor() {
        this.ctx = null;
        this.bgmPlaying = false;
        this.bgmTimer = null;
        this.bgmStep = 0;

        this.micStream = null;
        this.analyser = null;
        this.micBuffer = null;
        this.micActive = false;
        this.seqTimers = [];

        this.chromaticNotes = [
          { id: 'Do',   solfege: 'Do',   pitch: 'C4',  isBlack: false, staffStep: 0, freq: 261.63, tab: 'A-3', stringIdx: 4, fret: 3 },
          { id: 'Do#',  solfege: 'Do#',  pitch: 'C#4', isBlack: true,  staffStep: 0, freq: 277.18, tab: 'A-4', stringIdx: 4, fret: 4 },
          { id: 'Re',   solfege: 'Re',   pitch: 'D4',  isBlack: false, staffStep: 1, freq: 293.66, tab: 'D-0', stringIdx: 3, fret: 0 },
          { id: 'Re#',  solfege: 'Re#',  pitch: 'D#4', isBlack: true,  staffStep: 1, freq: 311.13, tab: 'D-1', stringIdx: 3, fret: 1 },
          { id: 'Mi',   solfege: 'Mi',   pitch: 'E4',  isBlack: false, staffStep: 2, freq: 329.63, tab: 'D-2', stringIdx: 3, fret: 2 },
          { id: 'Fa',   solfege: 'Fa',   pitch: 'F4',  isBlack: false, staffStep: 3, freq: 349.23, tab: 'D-3', stringIdx: 3, fret: 3 },
          { id: 'Fa#',  solfege: 'Fa#',  pitch: 'F#4', isBlack: true,  staffStep: 3, freq: 369.99, tab: 'D-4', stringIdx: 3, fret: 4 },
          { id: 'Sol',  solfege: 'Sol',  pitch: 'G4',  isBlack: false, staffStep: 4, freq: 392.00, tab: 'G-0', stringIdx: 2, fret: 0 },
          { id: 'Sol#', solfege: 'Sol#', pitch: 'G#4', isBlack: true,  staffStep: 4, freq: 415.30, tab: 'G-1', stringIdx: 2, fret: 1 },
          { id: 'La',   solfege: 'La',   pitch: 'A4',  isBlack: false, staffStep: 5, freq: 440.00, tab: 'G-2', stringIdx: 2, fret: 2 },
          { id: 'La#',  solfege: 'La#',  pitch: 'A#4', isBlack: true,  staffStep: 5, freq: 466.16, tab: 'G-3', stringIdx: 2, fret: 3 },
          { id: 'Si',   solfege: 'Si',   pitch: 'B4',  isBlack: false, staffStep: 6, freq: 493.88, tab: 'B-0', stringIdx: 1, fret: 0 }
        ];
        this.whiteNotes = this.chromaticNotes.filter(n => !n.isBlack);
      }

      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          this.ctx = new AudioContext();
        }
        if (this.ctx.state === 'suspended') this.ctx.resume();
      }

      getNoteById(id) {
        if (id === "Do'") return { id: "Do'", solfege: "Do'", pitch: 'C5', freq: 523.25, tab: 'B-1', stringIdx: 1, fret: 1, staffStep: 7 };
        return this.chromaticNotes.find(n => n.id === id);
      }

      playNote(freq, instrument = 'piano', duration = 0.85, delay = 0) {
        this.init();
        const now = this.ctx.currentTime + delay;

        if (instrument === 'piano') {
          const masterGain = this.ctx.createGain();
          masterGain.connect(this.ctx.destination);
          masterGain.gain.setValueAtTime(0.001, now);
          masterGain.gain.linearRampToValueAtTime(0.36, now + 0.015);
          masterGain.gain.exponentialRampToValueAtTime(0.13, now + 0.35);
          masterGain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

          [
            { ratio: 1, type: 'triangle', weight: 0.65 },
            { ratio: 2, type: 'sine',     weight: 0.25 },
            { ratio: 3, type: 'sine',     weight: 0.10 }
          ].forEach(h => {
            const osc = this.ctx.createOscillator();
            const hGain = this.ctx.createGain();
            osc.type = h.type;
            osc.frequency.setValueAtTime(freq * h.ratio, now);
            hGain.gain.setValueAtTime(h.weight, now);
            osc.connect(hGain);
            hGain.connect(masterGain);
            osc.start(now);
            osc.stop(now + duration + 0.05);
          });
        } else if (instrument === 'organ') {
          const masterGain = this.ctx.createGain();
          masterGain.connect(this.ctx.destination);
          masterGain.gain.setValueAtTime(0.001, now);
          masterGain.gain.linearRampToValueAtTime(0.26, now + 0.05);
          masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.15);

          [0.5, 1, 2].forEach((ratio, idx) => {
            const osc = this.ctx.createOscillator();
            const g = this.ctx.createGain();
            osc.type = idx === 1 ? 'sawtooth' : 'triangle';
            osc.frequency.setValueAtTime(freq * ratio, now);
            g.gain.setValueAtTime(idx === 1 ? 0.28 : 0.38, now);
            osc.connect(g);
            g.connect(masterGain);
            osc.start(now);
            osc.stop(now + duration * 1.2);
          });
        } else {
          const masterGain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(freq * 6.5, now);
          filter.frequency.exponentialRampToValueAtTime(freq * 1.4, now + 0.45);
          filter.Q.setValueAtTime(2.5, now);

          masterGain.gain.setValueAtTime(0.001, now);
          masterGain.gain.linearRampToValueAtTime(0.35, now + 0.02);
          masterGain.gain.exponentialRampToValueAtTime(0.12, now + 0.4);
          masterGain.gain.exponentialRampToValueAtTime(0.0008, now + duration * 1.1);

          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          osc1.type = 'sawtooth';
          osc2.type = 'triangle';
          osc1.frequency.setValueAtTime(freq, now);
          osc2.frequency.setValueAtTime(freq * 1.003, now);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(masterGain);
          masterGain.connect(this.ctx.destination);

          osc1.start(now);
          osc2.start(now);
          osc1.stop(now + duration * 1.15);
          osc2.stop(now + duration * 1.15);
        }
      }

      playNormalAttackSFX(comboStep = 1, instrument = 'piano') {
        this.init();
        if (comboStep === 1) {
          this.playNote(329.63, instrument, 0.32, 0);
        } else if (comboStep === 2) {
          this.playNote(415.30, instrument, 0.36, 0);
          this.playNote(493.88, instrument, 0.36, 0.05);
        } else {
          this.playNote(659.25, instrument, 0.55, 0);
          this.playNote(830.61, instrument, 0.55, 0.04);
          this.playNote(987.77, instrument, 0.65, 0.08);
        }
      }

      playPitchBendGuitar(baseFreq = 329.63) {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.122, now + 0.35); // Whole-step bend
        osc.frequency.setValueAtTime(baseFreq * 1.122, now + 0.55);
        osc.frequency.exponentialRampToValueAtTime(baseFreq, now + 0.85);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2400, now);
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.32, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.92);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.95);
      }

      playChordSimultaneous(noteIds, instrument = 'piano', duration = 1.05) {
        this.init();
        noteIds.forEach(id => {
          const nObj = this.getNoteById(id);
          if (nObj) this.playNote(nObj.freq, instrument, duration, 0);
        });
      }

      playParrySFX(perfect = true) {
        this.init();
        if (perfect) {
          [523.25, 783.99, 1046.50, 1318.51].forEach((f, i) => this.playNote(f, 'piano', 0.55, i * 0.035));
        } else {
          this.playNote(392.00, 'piano', 0.4, 0);
          this.playNote(523.25, 'piano', 0.4, 0.05);
        }
      }

      playEncounterClimaxSFX() {
        this.init();
        [261.63, 392.00, 523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
          this.playNote(f, i % 2 === 0 ? 'piano' : 'guitar', 0.65, i * 0.055);
        });
      }

      clearSequenceTimers() {
        if (this.seqTimers) this.seqTimers.forEach(id => clearTimeout(id));
        this.seqTimers = [];
      }

      playSequence(noteIds, instrument = 'piano', gap = 0.48, onStepHighlight = null) {
        this.clearSequenceTimers();
        noteIds.forEach((id, idx) => {
          const noteObj = this.getNoteById(id);
          if (noteObj) {
            this.playNote(noteObj.freq, instrument, 0.8, idx * gap);
            if (typeof onStepHighlight === 'function') {
              const tid = setTimeout(() => onStepHighlight(idx), idx * gap * 1000);
              this.seqTimers.push(tid);
            }
          }
        });
        if (typeof onStepHighlight === 'function' && noteIds.length > 0) {
          const endTid = setTimeout(() => onStepHighlight(-1), noteIds.length * gap * 1000 + 250);
          this.seqTimers.push(endTid);
        }
      }

      playChord(rootFreq, quality = 'major', instrument = 'piano') {
        const third = quality === 'major' ? rootFreq * Math.pow(2, 4 / 12) : rootFreq * Math.pow(2, 3 / 12);
        const fifth = rootFreq * Math.pow(2, 7 / 12);
        [rootFreq, third, fifth].forEach((f, i) => this.playNote(f, instrument, 0.95, i * 0.04));
      }

      playSuccessSFX() {
        this.init();
        [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => this.playNote(f, 'piano', 0.48, i * 0.06));
      }

      playForgeSFX() {
        this.init();
        this.playNote(880, 'piano', 0.3, 0);
        this.playNote(1174.66, 'piano', 0.5, 0.12);
        this.playNote(1318.51, 'piano', 0.7, 0.24);
      }

      playErrorSFX() {
        this.init();
        this.playNote(220, 'guitar', 0.3, 0);
        this.playNote(196, 'guitar', 0.4, 0.15);
      }

      playUltimateSFX(ultId, customData = null) {
        this.init();
        if (ultId === 1) [261.63, 329.63, 392.00, 523.25, 659.25, 783.99].forEach((f, i) => this.playNote(f, 'guitar', 0.7, i * 0.05));
        else if (ultId === 2) { this.playChord(261.63, 'major', 'piano'); setTimeout(() => this.playChord(392.00, 'major', 'piano'), 220); }
        else if (ultId === 3) [1046.50, 987.77, 783.99, 659.25, 523.25, 261.63, 130.81].forEach((f, i) => this.playNote(f, 'piano', 0.9, i * 0.065));
        else if (ultId === 4) [164.81, 246.94, 329.63, 493.88, 659.25, 783.99, 987.77].forEach((f, i) => this.playNote(f, 'guitar', 0.85, i * 0.055));
        else if (ultId === 5) {
          [[261.63, 329.63, 392.00, 523.25], [349.23, 440.00, 523.25, 698.46], [392.00, 493.88, 587.33, 783.99], [523.25, 659.25, 783.99, 1046.50]]
            .forEach((chord, step) => chord.forEach(f => this.playNote(f, 'piano', 1.1, step * 0.24)));
        } else if (ultId === 6 && customData) {
          this.playSequence(customData.notes, customData.instrument, 0.22);
        }
      }

      async startMicrophone() {
        this.init();
        if (this.micActive && this.micStream) return true;
        try {
          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return false;
          this.micStream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
          });
          const source = this.ctx.createMediaStreamSource(this.micStream);
          this.analyser = this.ctx.createAnalyser();
          this.analyser.fftSize = 2048;
          source.connect(this.analyser);
          this.micBuffer = new Float32Array(this.analyser.fftSize);
          this.micActive = true;
          return true;
        } catch (err) {
          this.micActive = false;
          return false;
        }
      }

      stopMicrophone() {
        this.micActive = false;
        if (this.micStream) {
          this.micStream.getTracks().forEach(t => t.stop());
          this.micStream = null;
        }
        this.analyser = null;
      }

      detectPitch() {
        if (!this.micActive || !this.analyser) return null;
        this.analyser.getFloatTimeDomainData(this.micBuffer);
        const buf = this.micBuffer;
        const SIZE = buf.length;
        let rms = 0;
        for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.015) return { freq: -1, rms, noteName: '--', midi: -1, cents: 0 };

        let r1 = 0, r2 = SIZE - 1;
        const thres = 0.2;
        for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
        for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

        const trimmed = buf.slice(r1, r2);
        const trimSize = trimmed.length;
        if (trimSize < 32) return { freq: -1, rms, noteName: '--', midi: -1, cents: 0 };

        const c = new Float32Array(trimSize);
        for (let i = 0; i < trimSize; i++) {
          for (let j = 0; j < trimSize - i; j++) c[i] += trimmed[j] * trimmed[j + i];
        }

        let d = 0;
        while (d < trimSize - 1 && c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < trimSize; i++) {
          if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
        }
        if (maxpos <= 0) return { freq: -1, rms, noteName: '--', midi: -1, cents: 0 };

        let T0 = maxpos;
        if (maxpos > 0 && maxpos < trimSize - 1) {
          const x1 = c[maxpos - 1], x2 = c[maxpos], x3 = c[maxpos + 1];
          const a = (x1 + x3 - 2 * x2) / 2;
          const b = (x3 - x1) / 2;
          if (a) T0 = T0 - b / (2 * a);
        }

        const freq = this.ctx.sampleRate / T0;
        if (freq < 75 || freq > 1400) return { freq: -1, rms, noteName: '--', midi: -1, cents: 0 };

        const exactMidi = 12 * (Math.log(freq / 440) / Math.log(2)) + 69;
        const midi = Math.round(exactMidi);
        const cents = Math.round((exactMidi - midi) * 100);
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteName = noteNames[(midi % 12 + 12) % 12] + (Math.floor(midi / 12) - 1);
        return { freq, rms, noteName, midi, cents };
      }

      toggleBGM() {
        this.init();
        this.bgmPlaying = !this.bgmPlaying;
        if (this.bgmPlaying) {
          clearInterval(this.bgmTimer);
          const biomeScales = {
            ch1: [293.66, 349.23, 440.00, 523.25, 493.88, 440.00, 349.23, 329.63],
            ch2: [220.00, 261.63, 311.13, 329.63, 415.30, 440.00, 415.30, 329.63],
            ch3: [261.63, 392.00, 493.88, 587.33, 659.25, 587.33, 493.88, 392.00]
          };
          this.bgmStep = 0;
          this.bgmTimer = setInterval(() => {
            if (!this.bgmPlaying) return;
            const scale = biomeScales[gameState.currentBiome] || biomeScales.ch1;
            const inBattle = gameState.currentChallenge && gameState.currentChallenge.mode === 'monster';
            const isBossEnraged = inBattle && gameState.currentChallenge.entity && gameState.currentChallenge.entity.enraged;
            let nearDanger = inBattle;
            if (!nearDanger && typeof biomeMonstersMap !== 'undefined') {
              nearDanger = (biomeMonstersMap[gameState.currentBiome] || []).some(m => m.respawnTimer <= 0 && Math.hypot(m.x - gameState.playerPos.x, m.z - gameState.playerPos.z) < 8.5);
            }

            const freq = scale[this.bgmStep % scale.length];
            const now = this.ctx.currentTime;

            // Stem 1: Lead Arpeggio (Always Active)
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = isBossEnraged ? 'sawtooth' : (inBattle ? 'square' : 'triangle');
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.001, now);
            gain.gain.linearRampToValueAtTime(inBattle ? 0.022 : 0.028, now + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.38);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.4);

            // Stem 2: Combat Bass & Pulse (Fades in when near monster or in battle)
            if (nearDanger && this.bgmStep % 2 === 0) {
              const bass = this.ctx.createOscillator();
              const bGain = this.ctx.createGain();
              bass.type = inBattle ? 'triangle' : 'sine';
              bass.frequency.setValueAtTime(scale[0] * 0.5, now);
              bGain.gain.setValueAtTime(inBattle ? 0.055 : 0.035, now);
              bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
              bass.connect(bGain);
              bGain.connect(this.ctx.destination);
              bass.start(now);
              bass.stop(now + 0.48);
            }

            // Stem 3: Boss Phase 2 Enrage Organ Choir Pad
            if (isBossEnraged && this.bgmStep % 4 === 0) {
              const choir = this.ctx.createOscillator();
              const cGain = this.ctx.createGain();
              choir.type = 'sawtooth';
              choir.frequency.setValueAtTime(scale[4] * 0.5, now);
              cGain.gain.setValueAtTime(0.024, now);
              cGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
              choir.connect(cGain);
              cGain.connect(this.ctx.destination);
              choir.start(now);
              choir.stop(now + 1.25);
            }
            this.bgmStep++;
          }, 360);
        } else {
          clearInterval(this.bgmTimer);
        }
        return this.bgmPlaying;
      }
    }

const sound = new SoundEngine();

const biomeChimesMap = {
      ch1: {
        solved: false,
        pillars: [
          { id: 'chime_1_1', step: 1, note: 'Do', freq: 261.63, label: '① Do 鐘柱', x: -8.5, z: 9.5, lit: false },
          { id: 'chime_1_2', step: 2, note: 'Mi', freq: 329.63, label: '② Mi 鐘柱', x: 0.0,  z: 14.5, lit: false },
          { id: 'chime_1_3', step: 3, note: 'Sol', freq: 392.00, label: '③ Sol 鐘柱', x: 8.5,  z: 9.5, lit: false }
        ]
      },
      ch2: {
        solved: false,
        pillars: [
          { id: 'chime_2_1', step: 1, note: 'Re', freq: 293.66, label: '① Re 雷柱', x: -9.5, z: 9.5, lit: false },
          { id: 'chime_2_2', step: 2, note: 'Fa#', freq: 369.99, label: '② Fa# 雷柱', x: 0.0, z: 14.5, lit: false },
          { id: 'chime_2_3', step: 3, note: 'La', freq: 440.00, label: '③ La 雷柱', x: 9.5, z: 9.5, lit: false }
        ]
      },
      ch3: {
        solved: false,
        pillars: [
          { id: 'chime_3_1', step: 1, note: 'Mi', freq: 329.63, label: '① Mi 冰柱', x: -9.5, z: 9.5, lit: false },
          { id: 'chime_3_2', step: 2, note: 'Sol#', freq: 415.30, label: '② Sol# 冰柱', x: 0.0, z: 14.5, lit: false },
          { id: 'chime_3_3', step: 3, note: 'Si', freq: 493.88, label: '③ Si 冰柱', x: 9.5, z: 9.5, lit: false }
        ]
      }
    };

const abyssTitlesData = [
      { id: 'novice_bard', name: '音律見習生', reqFloor: 0, bonusText: '初始稱號（無額外加成）', atk: 0, def: 0, mp: 0 },
      { id: 'chord_seeker', name: '和聲探索者', reqFloor: 2, bonusText: '魔導攻擊 +8，魔力上限 +15 MP', atk: 8, def: 0, mp: 15 },
      { id: 'thunder_soloist', name: '狂雷獨奏者', reqFloor: 5, bonusText: '魔導攻擊 +18，奧術護甲 +8', atk: 18, def: 8, mp: 20 },
      { id: 'symphony_knight', name: '交響聖殿騎士', reqFloor: 8, bonusText: '魔導攻擊 +28，奧術護甲 +16，魔力 +35 MP', atk: 28, def: 16, mp: 35 },
      { id: 'absolute_archmage', name: '絕對音感大魔導', reqFloor: 12, bonusText: '全屬性巔峰：魔攻 +45，護甲 +25，魔力 +60 MP', atk: 45, def: 25, mp: 60 }
    ];

const skillTreesData = [
      {
        branch: 'pianist', title: '🎹 聖詠鋼琴魔導派', color: 'text-cyan-300 border-cyan-500/70',
        nodes: [
          { id: 'p_harmonic_strike', name: '雙音和聲重擊', maxLv: 3, desc: '普攻與答題攻擊額外造成 +15% 魔導傷害，答題多削弱 1 層 Boss 護盾。' },
          { id: 'p_pitch_meditation', name: '絕對音感冥想', maxLv: 3, desc: '連續答對時，每次額外恢復 +8 MP。' }
        ]
      },
      {
        branch: 'guitarist', title: '🎸 狂雷結他戰法派', color: 'text-amber-300 border-amber-500/70',
        nodes: [
          { id: 'g_overdrive', name: '失真超載暴擊', maxLv: 3, desc: '法杖耐久低於 40% 或裝備結他系兵器時，所有傷害額外 +22%。' },
          { id: 'g_riff_lifesteal', name: '嗜血連段 (Riff)', maxLv: 3, desc: '每次成功答題攻擊自動吸取 12 點生命值 (HP)。' }
        ]
      },
      {
        branch: 'conductor', title: '🎼 皇家交響指揮派', color: 'text-purple-300 border-purple-500/70',
        nodes: [
          { id: 'c_dual_familiar', name: '雙重樂靈契約', maxLv: 1, desc: '核心奧義：允許同時召喚 2 隻星界樂靈隨行並疊加被動效果！' },
          { id: 'c_symphonic_shield', name: '交響聖詠護盾', maxLv: 3, desc: '施放任何奧義時，額外為自身附加 35 點魔導護盾吸收傷害。' }
        ]
      }
    ];

let camYaw = 0, camPitch = 0.68, camDist = 16.5;

window.addEventListener('pointermove', e => {
      if (!isDraggingCam) return;
      const dx = e.clientX - dragStart.x, dy = e.clientY - dragStart.y;
      if (Math.hypot(dx, dy) > 5) dragMoved = true;
      camYaw -= dx * 0.007;
      camPitch = Math.max(0.32, Math.min(1.25, camPitch + dy * 0.006));
      dragStart = { x: e.clientX, y: e.clientY };
    });

function handle3DClick(e) {
      sound.init();
      const rect = renderer.domElement.getBoundingClientRect();
      pointerNDC.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerNDC.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointerNDC, camera);

      for (const ent of worldEntities) {
        if ((ent.kind === 'monster' || ent.kind === 'vein') && ent.ref.respawnTimer > 0) continue;
        const hits = raycaster.intersectObjects(ent.mesh.children, true);
        if (hits.length > 0) {
          if (Math.hypot(gameState.playerPos.x - ent.x, gameState.playerPos.z - ent.z) <= 6.5) {
            triggerInteractable(ent);
          } else {
            gameState.targetPos = { x: ent.x, z: ent.z + 1.8 };
            waypointRing.position.set(ent.x, 0.05, ent.z + 1.8);
            waypointRing.visible = true;
          }
          return;
        }
      }

      const groundHits = raycaster.intersectObject(groundPlane);
      if (groundHits.length > 0) {
        const pt = groundHits[0].point;
        const tx = Math.max(-24, Math.min(24, pt.x));
        const tz = Math.max(-24, Math.min(24, pt.z));
        gameState.targetPos = { x: tx, z: tz };
        waypointRing.position.set(tx, 0.05, tz);
        waypointRing.visible = true;
      }
    }

window.toggleEquipItem = function(id) {
      const item = gearCatalog.find(g => g.id === id);
      if (!item) return;
      const key = `${item.slot}Id`;
      gameState.equipped[key] = gameState.equipped[key] === id ? null : id;
      sound.playForgeSFX();
      updateHUD();
      renderBagModal();
    };

function openNPCDialogue(npc) {
      if (npc.type === 'babel') { renderBabelModal(); babelModal.classList.remove('hidden'); return; }
      if (npc.type === 'worldmap') { renderWorldMapModal(); worldmapModal.classList.remove('hidden'); return; }

      sound.init();
      document.getElementById('npc-dlg-avatar').textContent = npc.avatar || '🧙‍♂️';
      document.getElementById('npc-dlg-role').textContent = npc.role || 'Arcane Citizen';
      document.getElementById('npc-dlg-name').textContent = npc.name;
      document.getElementById('npc-dlg-text').textContent = npc.dialogue;

      const actionsEl = document.getElementById('npc-dlg-actions');
      actionsEl.innerHTML = '';

      const actBtn = document.createElement('button');
      actBtn.className = 'px-4 py-2 rounded-xl btn-arcane-gold font-black text-xs sm:text-sm';
      actBtn.textContent = npc.actionLabel || '開始試煉';
      actBtn.addEventListener('click', () => {
        npcDialogueModal.classList.add('hidden');
        if (npc.actionType === 'forge') { renderForgeModal(); forgeModal.classList.remove('hidden'); }
        else if (npc.actionType === 'gather') { openGatherMinigame(); }
        else if (npc.actionType === 'familiars') { renderFamiliarsModal(); familiarsModal.classList.remove('hidden'); }
        else if (npc.actionType === 'sightread') { startSightReadTrial(npc); }
        else if (npc.actionType === 'trial_chromatic') { startMentorTrial(npc, 'chromatic'); }
        else if (npc.actionType === 'trial_intervals') { startMentorTrial(npc, 'intervals'); }
        else { startMentorTrial(npc, 'white'); }
      });

      const closeBtn = document.createElement('button');
      closeBtn.className = 'px-4 py-2 rounded-xl btn-arcane-dark font-bold text-xs sm:text-sm';
      closeBtn.textContent = '稍後再說';
      closeBtn.addEventListener('click', () => npcDialogueModal.classList.add('hidden'));

      actionsEl.appendChild(closeBtn);
      actionsEl.appendChild(actBtn);
      npcDialogueModal.classList.remove('hidden');
    }

window.equipAbyssTitle = function(titleId) {
      gameState.activeTitleId = titleId;
      sound.playSuccessSFX();
      updateHUD();
      renderAbyssModal();
      showToast(`🎖️ 已佩戴稱號【${getActiveTitle().name}】！`);
    };

window.travelToBiome = function(biomeId) {
      sound.playSuccessSFX();
      build3DBiome(biomeId, false);
      worldmapModal.classList.add('hidden');
      showToast(`🌀 已傳送至【${biomesData[biomeId].title}】！`);
    };

window.previewBabelSong = function(floor) {
      const item = babelMasterpieces.find(b => b.floor === floor);
      if (item) sound.playSequence(item.notes, item.instrument, 0.36);
    };

window.learnSkillNode = function(nodeId, maxLv) {
      if (gameState.sp <= 0 || (gameState.skills[nodeId] || 0) >= maxLv) return;
      gameState.sp -= 1;
      gameState.skills[nodeId] = (gameState.skills[nodeId] || 0) + 1;
      sound.playSuccessSFX();
      showToast('🌳 已領悟全新魔導樂派天賦！');
      updateHUD();
      renderSkillsModal();
    };

function triggerUltimate(ultId) {
      const ult = musicUltimates.find(u => u.id === ultId);
      if (!ult || gameState.mana < ult.cost) return;

      gameState.mana -= ult.cost;
      gameState.castAnimTimer = 0.75;
      sound.playUltimateSFX(ultId, ultId === 6 ? gameState.customUltimate : null);

      const shieldLv = gameState.skills.c_symphonic_shield || 0;
      if (shieldLv > 0) gameState.barrier += shieldLv * 35;

      updateHUD();
      const stats = getPlayerTotalStats();
      const relicBonus = (stats.relic && stats.relic.id === 'golden_tuning_fork') ? 1.15 : 1.0;
      const dualBonus = (stats.weapon && stats.weapon.affinity === 'dual') ? 1.25 : 1.0;
      const astralSetBonus = (stats.setCounts && stats.setCounts.astral >= 4) ? 1.25 : 1.0;

      const inBattle = gameState.currentChallenge && gameState.currentChallenge.mode === 'monster' && !gameState.currentChallenge.solved;
      const battleMonster = inBattle ? gameState.currentChallenge.entity : null;

      const applyUltimateDamage = (baseDmg, stunRounds = 0) => {
        const finalDmg = Math.round(baseDmg * relicBonus * dualBonus * astralSetBonus);
        if (battleMonster) {
          let actualDmg = finalDmg;
          if (battleMonster.shield > 0) {
            battleMonster.shield = Math.max(0, battleMonster.shield - 1);
            actualDmg = Math.round(finalDmg * 0.65);
            if (battleMonster.enraged && battleMonster.shield === 0) {
              battleMonster.enraged = false;
              battleMonster.enrageCountdown = 0;
              showToast('⚡ 奧義擊碎狂暴護盾，成功打斷大魔王終焉詠唱！', 'border-cyan-400 text-cyan-200');
            }
          }
          battleMonster.hp -= actualDmg;
          checkBossPhase2Enrage(battleMonster);
          if (stunRounds > 0) battleMonster.stunned = stunRounds;
          updateMonsterCombatBar(battleMonster);
          renderBattleUltimates();
          if (battleMonster.hp <= 0) {
            completeMonsterVictory(battleMonster, actualDmg, true);
          } else {
            const fb = document.getElementById('modal-feedback');
            fb.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-amber-950/90 text-amber-200 border border-amber-500 animate-pop';
            fb.textContent = `✦ 魔導奧義【${ult.name}】轟擊！造成 ${actualDmg} 點共鳴傷害！`;
            fb.classList.remove('hidden');
          }
        } else {
          let defeated = 0;
          (biomeMonstersMap[gameState.currentBiome] || []).forEach(m => {
            if (m.respawnTimer <= 0 && Math.hypot(m.x - gameState.playerPos.x, m.z - gameState.playerPos.z) <= 13) {
              m.hp -= finalDmg;
              spawnFloating3DDamage(m.x, 2.5, m.z, `-${finalDmg} 奧義`, true);
              if (m.hp <= 0) {
                m.respawnTimer = m.isBoss ? 30 : 15;
                m.hp = m.maxHp;
                defeated++;
                addExp(m.rewardExp);
                Object.keys(m.rewardMats).forEach(k => gameState.materials[k] += m.rewardMats[k]);
              }
            }
          });
          if (defeated > 0) {
            build3DBiome(gameState.currentBiome, true);
            showToast(`🪄 3D 魔導奧義【${ult.name}】淨化了附近 ${defeated} 名游蕩魔物！`);
          }
        }
      };

      if (ultId === 1) { trigger3DShockwave(0x22d3ee); showToast(`🌊 詠唱【音波震盪波】！`); applyUltimateDamage(stats.totalAtk * 2.0 + 25, 1); }
      else if (ultId === 2) { const healAmt = 75 + gameState.level * 12; healPlayer(healAmt); trigger3DShockwave(0x34d399); showToast(`💚 詠唱【聖詠治癒和弦】！恢復 ${healAmt} HP！`); if (inBattle) renderBattleUltimates(); }
      else if (ultId === 3) { triggerScreenShake(); trigger3DShockwave(0x818cf8); showToast(`🌠 詠唱【鋼琴星隕協奏】！`); applyUltimateDamage(stats.totalAtk * 2.7 + 45, 0); }
      else if (ultId === 4) { triggerScreenShake(); trigger3DShockwave(0xf59e0b); showToast(`⚡ 詠唱【狂雷電結他獨奏】！`); applyUltimateDamage(stats.totalAtk * 3.1 + 50, 0); }
      else if (ultId === 5) {
        triggerScreenShake(); trigger3DShockwave(0xf43f5e);
        const w = getEquippedWeapon();
        if (w) { w.durability = Math.min(w.maxDurability, w.durability + 15); updateHUD(); }
        showToast(`🔥 終焉奧義【終焉交響風暴】！！`);
        applyUltimateDamage(stats.totalAtk * 4.3 + 90, 1);
      } else if (ultId === 6) {
        const uniqueNotes = new Set(gameState.customUltimate.notes).size;
        const mult = 1.0 + uniqueNotes * 0.08;
        triggerScreenShake(); trigger3DShockwave(0xc084fc);
        showToast(`🎼 奏響自創奧義【靈魂協奏曲】(${mult.toFixed(2)}x)！！`);
        applyUltimateDamage((stats.totalAtk * 3.6 + 70) * mult, 1);
      }
    }

window.repairGear = function(id) {
      const it = gearCatalog.find(g => g.id === id);
      if (!it || gameState.materials.ore < 1 || gameState.materials.wood < 1) return;
      gameState.materials.ore--; gameState.materials.wood--;
      it.durability = it.maxDurability;
      sound.playForgeSFX(); updateHUD(); renderForgeModal();
    };

function renderComposerGrid() {
      const grid = document.getElementById('composer-grid');
      grid.innerHTML = '';
      [...sound.whiteNotes].reverse().forEach(note => {
        const row = document.createElement('div');
        row.className = 'grid grid-cols-9 gap-1 items-center';
        row.innerHTML = `<div class="text-[11px] font-black text-amber-300 text-right pr-2">${note.solfege}</div>`;
        for (let step = 0; step < 8; step++) {
          const isSel = gameState.customUltimate.notes[step] === note.id;
          const cell = document.createElement('button');
          cell.className = isSel
            ? 'h-6 rounded bg-amber-400 text-slate-950 font-black text-[10px]'
            : 'h-6 rounded bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-600 text-[10px]';
          cell.textContent = isSel ? note.solfege : `拍${step + 1}`;
          cell.addEventListener('click', () => {
            gameState.customUltimate.notes[step] = note.id;
            sound.playNote(note.freq, gameState.customUltimate.instrument, 0.45);
            renderComposerGrid();
          });
          row.appendChild(cell);
        }
        grid.appendChild(row);
      });
      const uniqueCount = new Set(gameState.customUltimate.notes).size;
      document.getElementById('composer-power-preview').textContent = `預計奧義威力加成：${(1.0 + uniqueCount * 0.08).toFixed(2)}x（${uniqueCount} 種不同音階）`;
      document.getElementById('comp-share-code').value = encodeResonanceShareCode();
    }

document.getElementById('btn-comp-random').addEventListener('click', () => {
      gameState.customUltimate.notes = Array.from({ length: 8 }, () => sound.whiteNotes[Math.floor(Math.random() * sound.whiteNotes.length)].id);
      renderComposerGrid();
      sound.playSequence(gameState.customUltimate.notes, gameState.customUltimate.instrument, 0.22);
    });

document.getElementById('btn-comp-preview').addEventListener('click', () => sound.playSequence(gameState.customUltimate.notes, gameState.customUltimate.instrument, 0.24));

document.getElementById('btn-comp-import').addEventListener('click', () => {
      const parts = document.getElementById('comp-share-code').value.trim().split('-');
      const validIds = new Set(sound.whiteNotes.map(n => n.id));
      const importedNotes = parts.slice(2);
      if (parts.length === 10 && parts[0] === 'RES' && (parts[1] === 'PNO' || parts[1] === 'GTR') && importedNotes.every(id => validIds.has(id))) {
        gameState.customUltimate.instrument = parts[1] === 'GTR' ? 'guitar' : 'piano';
        gameState.customUltimate.notes = importedNotes;
        renderComposerGrid(); sound.playSuccessSFX(); showToast('📥 成功載入外部共鳴樂譜碼！');
      } else {
        sound.playErrorSFX();
        showToast('⚠️ 共鳴樂譜碼格式無效（範例：RES-PNO-Do-Mi-Sol-La-Sol-Mi-Re-Do）', 'border-rose-500 text-rose-200');
      }
    });

document.getElementById('btn-comp-save').addEventListener('click', () => {
      saveGameProgress(); sound.playSuccessSFX(); showToast('🎼 專屬旋律已封印至第 6 奧義！'); composerModal.classList.add('hidden');
    });

function playTargetSequenceWithStaffSync(ch) {
      if (!ch) return;
      if (ch.theory === 'chords') {
        sound.playChordSimultaneous(ch.targetSeq, ch.instrument, 1.15);
        drawTrebleStaffNotes(ch.targetSeq, 0);
        setTimeout(() => drawTrebleStaffNotes(ch.targetSeq, -1), 1100);
        return;
      }
      sound.playSequence(ch.targetSeq, ch.instrument, 0.48, (stepIdx) => {
        gameState.staffHighlightIdx = stepIdx;
        drawTrebleStaffNotes(ch.targetSeq, stepIdx);
      });
    }

function renderInstrumentInputView(eliminatedId = null) {
      const ch = gameState.currentChallenge;
      const allowBlackKeys = ch && (ch.theory === 'chromatic' || ch.theory === 'intervals' || ch.mode === 'babel' || ch.mode === 'abyss');
      const highDo = sound.getNoteById("Do'");

      if (gameState.inputViewMode === 'piano') {
        instrumentInputContainer.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-1 text-xs font-bold text-amber-300 mb-1.5">
            <span>🎹 13音律魔導琴鍵（含高音 Do'｜${allowBlackKeys ? '已解鎖 # 黑鍵！' : '白鍵音階'}）</span>
            <span class="text-[10px] text-cyan-300 font-normal">⌨️ 鍵盤快捷：Z X C V B N M ,（黑鍵 S D G H J）</span>
          </div>
          <div class="relative bg-slate-950 p-2 rounded-xl border border-amber-600/50">
            <div id="black-keys-row" class="grid grid-cols-8 gap-1 mb-1"></div>
            <div id="white-keys-row" class="grid grid-cols-8 gap-1"></div>
          </div>
        `;
        const blackRow = document.getElementById('black-keys-row');
        const whiteRow = document.getElementById('white-keys-row');

        const blackSlots = ['Do#', 'Re#', null, 'Fa#', 'Sol#', 'La#', null, null];
        blackSlots.forEach(bId => {
          if (!bId) {
            blackRow.innerHTML += `<div></div>`;
          } else {
            const n = sound.getNoteById(bId);
            const dis = !allowBlackKeys || eliminatedId === bId;
            const btn = document.createElement('button');
            btn.disabled = dis;
            btn.className = dis
              ? 'py-2 rounded-lg bg-slate-900/50 border border-slate-800 text-slate-700 text-[10px] font-bold cursor-not-allowed'
              : 'py-2 rounded-lg bg-gradient-to-b from-slate-700 to-black border border-amber-500/80 text-amber-300 font-black text-[11px] shadow active:translate-y-0.5 cursor-pointer';
            btn.innerHTML = `<div>${n.solfege}</div><div class="text-[8px] opacity-75">${n.tab}</div>`;
            if (!dis) btn.addEventListener('click', () => handleNoteClick(bId));
            blackRow.appendChild(btn);
          }
        });

        [...sound.whiteNotes, highDo].forEach(n => {
          const dis = eliminatedId === n.id;
          const btn = document.createElement('button');
          btn.disabled = dis;
          btn.className = dis
            ? 'py-3 rounded-lg bg-slate-900 text-slate-700 border border-slate-800 text-xs font-bold opacity-40'
            : 'py-3 rounded-lg bg-gradient-to-b from-stone-100 to-stone-300 hover:from-white hover:to-amber-100 text-slate-950 font-black text-xs shadow border border-amber-500 active:translate-y-0.5 cursor-pointer';
          btn.innerHTML = `<div>${n.solfege}</div><div class="text-[9px] text-slate-600">${n.pitch}</div>`;
          if (!dis) btn.addEventListener('click', () => handleNoteClick(n.id));
          whiteRow.appendChild(btn);
        });
      } else {
        const stringNames = ['e (1弦)', 'B (2弦)', 'G (3弦)', 'D (4弦)', 'A (5弦)', 'E (6弦)'];
        const notesToShow = [...(allowBlackKeys ? sound.chromaticNotes : sound.whiteNotes), highDo];

        let html = `
          <div class="text-xs font-bold text-amber-300 mb-1.5">🎸 結他六線譜（TAB）指板視圖 — 點擊弦格奏出魔導音符（含 B-1 高音 Do'）：</div>
          <div class="bg-stone-950 p-2 rounded-xl border border-amber-600/50 overflow-x-auto">
            <div class="min-w-[440px] space-y-1">
              <div class="grid grid-cols-6 gap-1 text-[10px] font-mono text-amber-400/80 border-b border-stone-800 pb-1">
                <span>弦線 \\ 品格</span><span>空弦 (0)</span><span>第1格</span><span>第2格</span><span>第3格</span><span>第4格</span>
              </div>
        `;

        for (let sIdx = 0; sIdx < 6; sIdx++) {
          html += `<div class="grid grid-cols-6 gap-1 items-center">
            <span class="text-[10px] font-bold text-slate-400 whitespace-nowrap">${stringNames[sIdx]}</span>`;
          for (let fret = 0; fret <= 4; fret++) {
            const matched = notesToShow.find(n => n.stringIdx === sIdx && n.fret === fret && eliminatedId !== n.id);
            if (matched) {
              html += `<button onclick="handleNoteClick(&quot;${matched.id}&quot;)" class="py-1 rounded bg-amber-900/80 hover:bg-amber-600 border border-amber-400/80 text-amber-100 font-black text-[10px] whitespace-nowrap transition">
                ${fret} (${matched.solfege})
              </button>`;
            } else {
              html += `<div class="h-5 flex items-center justify-center"><div class="w-full h-0.5 bg-stone-700"></div></div>`;
            }
          }
          html += `</div>`;
        }
        html += `</div></div>`;
        instrumentInputContainer.innerHTML = html;
      }
    }

function generateSequenceByTheory(theory, count) {
      if (theory === 'chords') {
        const triads = [
          ['Do', 'Mi', 'Sol'],   // C Major
          ['Re', 'Fa', 'La'],    // D Minor
          ['Mi', 'Sol', 'Si'],   // E Minor
          ['Fa', 'La', "Do'"],   // F Major
          ['Sol', 'Si', 'Re'],   // G Major
          ['La', 'Do', 'Mi']     // A Minor
        ];
        return triads[Math.floor(Math.random() * triads.length)];
      }
      if (theory === 'chromatic') {
        const pool = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
        return Array.from({ length: count }, () => pool[Math.floor(Math.random() * pool.length)]);
      } else if (theory === 'intervals') {
        const intervalPairs = [['Do', 'Mi'], ['Do', 'Sol'], ['Re', 'La'], ['Fa', "Do'"], ['Mi', 'Si'], ['Do', 'Fa']];
        const seq = [];
        while (seq.length < count) {
          const pair = intervalPairs[Math.floor(Math.random() * intervalPairs.length)];
          seq.push(...pair);
        }
        return seq.slice(0, count);
      }
      return Array.from({ length: count }, () => sound.whiteNotes[Math.floor(Math.random() * sound.whiteNotes.length)].id);
    }

document.getElementById('stance-major').addEventListener('click', () => { setStance('major'); sound.playChord(261.63, 'major', 'piano'); });

document.getElementById('stance-minor').addEventListener('click', () => { setStance('minor'); sound.playChord(220.00, 'minor', 'piano'); });

function openMonsterBattle(monster, openingSlashDmg = 0) {
      sound.clearSequenceTimers();
      monster.hp = monster.maxHp;
      monster.shield = monster.isBoss ? (monster.id === 'boss_seraphiel' ? 3 : 2) : (monster.lv >= 3 ? 1 : 0);
      monster.stunned = 0;
      monster.enraged = false;
      monster.enrageCountdown = 0;

      if (openingSlashDmg > 0) {
        monster.hp = Math.max(12, monster.hp - openingSlashDmg);
      }

      const initStats = getPlayerTotalStats();
      if (initStats.setCounts && initStats.setCounts.glacial >= 4) {
        gameState.barrier = Math.max(gameState.barrier, 50);
        updateHUD();
      }

      gameState.combatCombo = 0;
      const activeTheory = (monster.lv >= 6 && Math.random() < 0.45) ? 'chords' : monster.theory;
      const targetSeq = generateSequenceByTheory(activeTheory, activeTheory === 'chords' ? 3 : monster.noteCount);

      gameState.currentChallenge = {
        mode: 'monster', theory: activeTheory, entity: monster,
        targetSeq, userSeq: [], instrument: monster.instrument, solved: false
      };

      const introText = openingSlashDmg > 0
        ? `⚡ 奧術音刃先制斬擊已造成 -${openingSlashDmg} 傷害！【${monster.name}】奏出了反擊音律，快聽音按鍵或揮動奧術普攻！`
        : `【${monster.name}】發動了音律攻勢！聆聽音符並按下對應琴鍵反擊！`;

      setupChallengeModalUI({
        avatar: monster.avatar, name: `Lv.${monster.lv} ${monster.name}`,
        title: `音律共鳴對決 (${monster.instrument === 'guitar' ? '🎸結他聲波' : (monster.instrument === 'organ' ? '🎹管風琴' : '🎹鋼琴聲波')})`,
        dialogue: introText,
        showMonsterBar: true, showStaff: false, showNormalAtkBtn: true, theory: monster.theory, affinity: monster.affinity
      });
      updateMonsterCombatBar(monster);
    }

window.handleNoteClick = function(noteId) {
      const ch = gameState.currentChallenge;
      if (!ch || ch.solved || gameState.parryState.active) return;
      const noteObj = sound.getNoteById(noteId);
      if (noteObj) {
        sound.playNote(noteObj.freq, ch.instrument, 0.75);
        // Pentatonic harmony accompaniment during Freestyle Solo!
        if (gameState.freestyleSolo.active && ch.mode === 'monster') {
          sound.playNote(noteObj.freq * 1.498, ch.instrument, 0.65, 0.03);
          const stats = getPlayerTotalStats();
          const soloDmg = Math.max(8, Math.round(stats.totalAtk * 0.45));
          ch.entity.hp -= soloDmg;
          gameState.freestyleSolo.hits++;
          updateMonsterCombatBar(ch.entity);
          modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-purple-950/95 text-amber-200 border border-amber-400 animate-pop';
          modalFeedback.textContent = `🎸 自由獨奏連擊 x${gameState.freestyleSolo.hits}！轟出 ${soloDmg} 點五聲和聲傷害！`;
          modalFeedback.classList.remove('hidden');
          if (ch.entity.hp <= 0) {
            gameState.freestyleSolo.active = false;
            document.getElementById('freestyle-solo-banner').classList.add('hidden');
            completeMonsterVictory(ch.entity, soloDmg, true);
          }
          return;
        }
      }
      // Audition Mode: Preview notes without filling slots!
      if (gameState.auditionMode) return;

      if (ch.userSeq.length >= ch.targetSeq.length) return;
      ch.userSeq.push(noteId);
      renderAnswerSlots();
      if (ch.userSeq.length === ch.targetSeq.length) setTimeout(evaluateChallengeAnswer, 260);
    };

function completeMonsterVictory(monster, finalDmg, viaUltimate = false) {
      gameState.currentChallenge.solved = true;
      sound.playSuccessSFX();
      addMana(monster.rewardMana);
      addExp(monster.rewardExp);

      const owl = familiarsList.find(f => f.id === 'nocturne_owl');
      const gryphon = familiarsList.find(f => f.id === 'chord_gryphon');
      if (gryphon && !gryphon.unlocked) { gryphon.unlocked = true; showToast('🦅 擊敗魔物，解鎖星界樂靈【烈焰和弦獅鷲】！'); }
      if (monster.isBoss && owl && !owl.unlocked) owl.unlocked = true;

      const matSummary = [];
      Object.keys(monster.rewardMats).forEach(k => {
        if (monster.rewardMats[k] > 0) {
          gameState.materials[k] += monster.rewardMats[k];
          const names = { ore: '🪨礦石', wood: '🪵古木', string: '✨琴弦', thunder: '⚡雷霆石', core: '💠結晶' };
          matSummary.push(`${names[k]}+${monster.rewardMats[k]}`);
        }
      });

      monster.respawnTimer = monster.isBoss ? 25 : 14;
      monster.hp = monster.maxHp;
      monster.enraged = false;
      build3DBiome(gameState.currentBiome, true);

      modalFeedback.className = 'rounded-xl p-2.5 text-center font-bold text-xs sm:text-sm bg-emerald-950/95 text-emerald-200 border border-emerald-500 animate-pop';
      modalFeedback.textContent = `🏆 ${viaUltimate ? '奧義終結' : '音律共鳴'} ${finalDmg} 傷害！擊敗【${monster.name}】！獲得 +${monster.rewardExp} EXP 與 ${matSummary.join(' ')}`;
      modalFeedback.classList.remove('hidden');
      setTimeout(() => challengeModal.classList.add('hidden'), 1800);
    }

function evaluateChallengeAnswer() {
      const ch = gameState.currentChallenge;
      const isCorrect = ch.userSeq.every((val, idx) => val === ch.targetSeq[idx]);

      if (isCorrect) {
        sound.playSuccessSFX();
        if (ch.mode === 'npc' || ch.mode === 'sightread') {
          ch.solved = true;
          addMana(45);
          addExp(65);
          if (ch.mode === 'sightread') {
            const owl = familiarsList.find(f => f.id === 'nocturne_owl');
            if (owl && !owl.unlocked) { owl.unlocked = true; showToast('🦉 完成石碑識譜，解鎖【銀翼音梟·諾克圖】！'); }
          }
          modalFeedback.className = 'rounded-xl p-2.5 text-center font-bold text-xs sm:text-sm bg-emerald-950/95 text-emerald-200 border border-emerald-500 animate-pop';
          modalFeedback.textContent = '✨ 完美共鳴！恢復 +45 MP 並獲得 +65 經驗！';
          modalFeedback.classList.remove('hidden');
          setTimeout(() => challengeModal.classList.add('hidden'), 1500);
        } else if (ch.mode === 'chest') {
          ch.solved = true;
          const chest = ch.chestData;
          chest.opened = true;
          const pool = chest.rewardGearPool || [];
          const unowned = pool.map(id => gearCatalog.find(g => g.id === id)).filter(g => g && !g.owned);
          const rewardGear = unowned.length > 0 ? unowned[0] : gearCatalog.find(g => g.id === pool[0]);
          let lootMsg = '';
          if (rewardGear && !rewardGear.owned) {
            rewardGear.owned = true;
            gameState.selectedBagItemId = rewardGear.id;
            lootMsg = `獲得 [${rewardGear.rarity}] 神兵【${rewardGear.name}】！`;
          } else {
            gameState.materials.ore += 5;
            gameState.materials.wood += 4;
            gameState.materials.string += 3;
            lootMsg = '獲得 🪨礦石+5 🪵古木+4 ✨琴弦+3！';
          }
          if (chest.rewardCore > 0) {
            gameState.materials.core += chest.rewardCore;
            lootMsg += ` 💠魔王結晶+${chest.rewardCore}！`;
          }
          addExp(90);
          build3DBiome(gameState.currentBiome, true);
          modalFeedback.className = 'rounded-xl p-2.5 text-center font-bold text-xs sm:text-sm bg-emerald-950/95 text-emerald-200 border border-emerald-400 animate-pop';
          modalFeedback.textContent = `💎 寶箱封印解除！${lootMsg}`;
          modalFeedback.classList.remove('hidden');
          setTimeout(() => challengeModal.classList.add('hidden'), 1800);
        } else if (ch.mode === 'abyss') {
          ch.solved = true;
          const fl = ch.abyssFloor;
          gameState.abyssBestFloor = Math.max(gameState.abyssBestFloor, fl);
          gameState.materials.ore += 3 + Math.floor(fl / 2);
          gameState.materials.wood += 2 + Math.floor(fl / 2);
          gameState.materials.string += 2;
          let bonusNote = '';
          if (fl % 3 === 0) {
            gameState.sp += 1;
            gameState.materials.core += 1;
            bonusNote = ' ＋ ✦ 天賦點 +1 SP ＆ 💠結晶 +1！';
          }
          addExp(80 + fl * 20);
          const newlyUnlockedTitle = abyssTitlesData.find(t => t.reqFloor === fl);
          if (newlyUnlockedTitle) {
            showToast(`🎖️ 解鎖全新榮耀稱號【${newlyUnlockedTitle.name}】！`);
          }
          modalFeedback.className = 'rounded-xl p-2.5 text-center font-bold text-xs sm:text-sm bg-fuchsia-950/95 text-fuchsia-200 border border-fuchsia-400 animate-pop';
          modalFeedback.textContent = `🌀 深淵第 ${fl} 層征服成功！獲得海量經驗與素材${bonusNote}`;
          modalFeedback.classList.remove('hidden');
          setTimeout(() => { challengeModal.classList.add('hidden'); renderAbyssModal(); abyssModal.classList.remove('hidden'); }, 1650);
        } else if (ch.mode === 'babel') {
          ch.solved = true;
          const b = ch.babelData;
          const firstClear = !gameState.babelCleared.includes(b.floor);
          if (firstClear) {
            gameState.babelCleared.push(b.floor);
            gameState.sp += b.rewardSP;
            Object.keys(b.rewardMats).forEach(k => gameState.materials[k] += (b.rewardMats[k] || 0));
            const owl = familiarsList.find(f => f.id === 'nocturne_owl');
            if (owl && !owl.unlocked) owl.unlocked = true;
          }
          addMana(60); addExp(120);
          modalFeedback.className = 'rounded-xl p-2.5 text-center font-bold text-xs sm:text-sm bg-amber-950/95 text-amber-200 border border-amber-400 animate-pop';
          modalFeedback.textContent = firstClear
            ? `🗼 名曲通關！獲得 +${b.rewardSP} 天賦點 (SP) 與古典寶藏素材！`
            : `🗼 再次完美重現名曲！獲得 +60 MP 與 +120 EXP！`;
          modalFeedback.classList.remove('hidden');
          setTimeout(() => challengeModal.classList.add('hidden'), 1700);
        } else if (ch.mode === 'monster') {
          const monster = ch.entity;
          const stats = getPlayerTotalStats();
          gameState.combatCombo += 1;

          let mult = 1.0 + Math.min(0.4, gameState.combatCombo * 0.08);
          let tag = '';
          if (gameState.combatStance === monster.affinity) { mult *= 1.5; tag += '【屬性弱點 1.5x!】'; }
          if (stats.weapon && stats.weapon.affinity === gameState.combatStance) mult *= 1.2;

          const owlFam = familiarsList.find(f => f.id === 'nocturne_owl');
          const owlStarMult = 1 + ((owlFam ? owlFam.starLevel : 1) - 1) * 0.35;
          if (gameState.activeFamiliars.includes('nocturne_owl') && gameState.combatStance === 'minor') mult *= (1 + 0.2 * owlStarMult);

          if (stats.setCounts && stats.setCounts.thunder >= 2 && gameState.combatStance === 'minor') mult *= 1.18;
          if (stats.setCounts && stats.setCounts.thunder >= 4) { mult *= 1.28; tag += '【狂雷4件套!】'; }
          if (stats.setCounts && stats.setCounts.glacial >= 4 && gameState.combatStance === 'major') { mult *= 1.25; tag += '【永凍4件套!】'; }

          const harmLv = gameState.skills.p_harmonic_strike || 0;
          if (harmLv > 0) mult *= (1 + harmLv * 0.15);
          const overLv = gameState.skills.g_overdrive || 0;
          if (overLv > 0 && stats.weapon && (stats.weapon.durability / stats.weapon.maxDurability < 0.4 || stats.weapon.category === 'guitar')) {
            mult *= (1 + overLv * 0.22); tag += '【狂雷超載!】';
          }

          if (!gameState.showStaffAssist) {
            mult *= 1.25;
            tag += '【盲聽專注 1.25x!】';
            gameState.stats.blindWins = (gameState.stats.blindWins || 0) + 1;
          }
          if (ch.theory === 'chords') {
            gameState.stats.chordWins = (gameState.stats.chordWins || 0) + 1;
            tag += '【和弦共鳴破陣!】';
          }
          if (gameState.guitarBendCharged) {
            gameState.guitarBendCharged = false;
            mult *= 1.35;
            tag += '【🎸推弦超載 1.35x!】';
          }
          const hasCritPick = stats.relic && stats.relic.id === 'crimson_distortion_pick';
          if (hasCritPick && Math.random() < 0.30) { mult *= 1.55; tag += '【💥猩紅暴擊!】'; }
          let dmg = Math.round(stats.totalAtk * mult);
          if (gameState.activeFamiliars.includes('chord_gryphon')) {
            const gryphonFam = familiarsList.find(f => f.id === 'chord_gryphon');
            const gMult = 0.45 + ((gryphonFam ? gryphonFam.starLevel : 1) - 1) * 0.15;
            dmg += Math.round(stats.totalAtk * gMult);
            tag += '【獅鷲追擊!】';
          }

          if (monster.shield > 0) {
            const breakAmt = 1 + (harmLv > 0 ? 1 : 0);
            monster.shield = Math.max(0, monster.shield - breakAmt);
            dmg = Math.round(dmg * 0.65);
            tag += `【擊碎護盾!】`;
            if (monster.shield === 0) {
              if (monster.enraged) {
                monster.enraged = false;
                monster.enrageCountdown = 0;
                tag += '【打斷狂暴詠唱!】';
              }
              startFreestyleSolo(monster);
            }
          }

          monster.hp -= dmg;
          checkBossPhase2Enrage(monster);
          updateMonsterCombatBar(monster);

          const w = getEquippedWeapon();
          if (w) w.durability = Math.max(0, w.durability - Math.max(2, Math.floor(monster.durabilityCost * 0.5)));

          const chronoFam = familiarsList.find(f => f.id === 'chrono_sentinel');
          const cBonus = 6 + ((chronoFam ? chronoFam.starLevel : 1) - 1) * 3;
          let mpGain = 16
            + (gameState.activeFamiliars.includes('chrono_sentinel') ? cBonus : 0)
            + (gameState.skills.p_pitch_meditation || 0) * 8
            + ((stats.setCounts && stats.setCounts.astral >= 4) ? 8 : 0);
          addMana(mpGain);

          const lifeLv = gameState.skills.g_riff_lifesteal || 0;
          if (lifeLv > 0) healPlayer(lifeLv * 12);

          updateHUD();
          renderBattleUltimates();

          if (monster.hp <= 0) {
            completeMonsterVictory(monster, dmg, false);
          } else {
            ch.targetSeq = generateSequenceByTheory(monster.theory, monster.noteCount);
            ch.userSeq = [];
            renderAnswerSlots();
            drawTrebleStaffNotes(ch.targetSeq, -1);
            modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-cyan-950/95 text-cyan-200 border border-cyan-400 animate-pop';
            modalFeedback.textContent = `⚔️ 奏出和聲斬擊造成 ${dmg} 點傷害！${tag}（魔物將於 1 秒後反擊...）`;
            modalFeedback.classList.remove('hidden');
            setTimeout(() => { if (gameState.currentChallenge && !gameState.currentChallenge.solved) playTargetSequenceWithStaffSync(ch); }, 950);
          }
        }
      } else {
        sound.playErrorSFX();
        gameState.combatCombo = 0;
        if (ch.mode === 'monster') {
          const monster = ch.entity;
          updateMonsterCombatBar(monster);
          if (monster.stunned > 0) {
            monster.stunned -= 1;
            updateMonsterCombatBar(monster);
            modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-cyan-950/95 text-cyan-200 border border-cyan-500 animate-pop';
            modalFeedback.textContent = '⚡ 音符偏差，但魔物仍處於暈眩無法反擊！';
            modalFeedback.classList.remove('hidden');
          } else {
            const stats = getPlayerTotalStats();
            const ar = getEquippedArmor();
            if (ar) ar.durability = Math.max(0, ar.durability - 4);
            let rawIncoming = Math.max(4, monster.atk - stats.totalDef);

            // Boss Phase 2 Enrage Countdown Check
            if (monster.enraged) {
              monster.enrageCountdown--;
              updateMonsterCombatBar(monster);
              if (monster.enrageCountdown <= 0) {
                rawIncoming = Math.round(rawIncoming * 1.9);
                monster.enrageCountdown = 2;
                showToast('🔥 大魔王釋放【終焉沉默樂章】！造成毀滅性衝擊！', 'border-rose-500 text-rose-200');
              }
            }

            // Trigger Perfect Rhythm Parry Challenge!
            startParryChallenge(monster, rawIncoming);
          }
        } else {
          modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-rose-950/95 text-rose-200 border border-rose-500 animate-pop';
          modalFeedback.textContent = '🎵 音符未完全吻合，請點擊「重播目標旋律」再試一次！';
          modalFeedback.classList.remove('hidden');
        }
        ch.userSeq = [];
        renderAnswerSlots();
      }
    }

document.getElementById('btn-guitar-bend').addEventListener('click', () => {
      sound.playPitchBendGuitar(329.63);
      gameState.guitarBendCharged = true;
      showToast('🎸 奏出電結他推弦滑音！下一次音律攻擊獲得 1.35x 推弦共鳴增幅！');
    });

document.getElementById('btn-toggle-battle-mic').addEventListener('click', async () => {
      const btn = document.getElementById('btn-toggle-battle-mic');
      const bar = document.getElementById('battle-mic-bar');
      if (!gameState.battleMicEnabled) {
        const ok = await sound.startMicrophone();
        if (!ok) {
          showToast('⚠️ 無法開啟麥克風權限，請檢查瀏覽器設定！', 'border-rose-500 text-rose-200');
          return;
        }
        gameState.battleMicEnabled = true;
        btn.textContent = '🔴 關閉真樂器收音';
        btn.className = 'px-2 py-0.5 rounded bg-rose-600 text-white text-[10px] font-black transition';
        bar.classList.remove('hidden');
      } else {
        gameState.battleMicEnabled = false;
        sound.stopMicrophone();
        btn.textContent = '🎙️ 開啟真樂器收音';
        btn.className = 'px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-rose-500/60 text-[10px] font-bold text-rose-300 transition';
        bar.classList.add('hidden');
      }
    });

document.getElementById('btn-close-modal').addEventListener('click', () => {
      sound.clearSequenceTimers();
      if (gameState.parryState.active) {
        gameState.parryState.active = false;
        cancelAnimationFrame(gameState.parryState.rafId);
        parryOverlay.classList.add('hidden');
      }
      if (gameState.freestyleSolo.active) {
        gameState.freestyleSolo.active = false;
        cancelAnimationFrame(gameState.freestyleSolo.rafId);
        document.getElementById('freestyle-solo-banner').classList.add('hidden');
      }
      if (gameState.battleMicEnabled) {
        gameState.battleMicEnabled = false;
        sound.stopMicrophone();
        document.getElementById('battle-mic-bar').classList.add('hidden');
        document.getElementById('btn-toggle-battle-mic').textContent = '🎙️ 開啟真樂器收音';
      }
      challengeModal.classList.add('hidden');
      gameState.currentChallenge = null;
    });

const gatherState = {
      running: false,
      tunerOnly: false,
      instrument: 'piano',
      difficulty: 'normal',
      selectedSongKey: 'random',
      activeSong: null,
      songStepIdx: 0,
      inputMode: 'virtual',
      score: 0, combo: 0, fever: 0, feverActive: false,
      timeLeft: 30, notes: [], particles: [],
      laneHeld: [false, false, false, false],
      lastSpawn: 0, lastMicHitTime: 0, lastFamCatchTime: 0,
      rafId: null, timerId: null
    };

const laneFreqs = [261.63, 329.63, 392.00, 523.25];

async function startRhythmGame(tunerOnly = false) {
      sound.init();
      resizeRhythmCanvas();

      if (gatherState.inputMode === 'mic' || tunerOnly) {
        const micOk = await sound.startMicrophone();
        if (!micOk) {
          showToast('⚠️ 無法存取麥克風（請允許權限），自動切換至虛擬演奏模式！', 'border-rose-500 text-rose-200');
          gatherState.inputMode = 'virtual';
          tunerOnly = false;
          syncGatherOptionUI();
          document.getElementById('mic-telemetry-bar').classList.add('hidden');
        } else {
          document.getElementById('mic-telemetry-bar').classList.remove('hidden');
        }
      } else {
        sound.stopMicrophone();
        document.getElementById('mic-telemetry-bar').classList.add('hidden');
      }

      gatherState.running = true;
      gatherState.tunerOnly = tunerOnly;
      gatherState.score = 0;
      gatherState.combo = 0;
      gatherState.fever = 0;
      gatherState.feverActive = false;
      gatherState.timeLeft = tunerOnly ? 999 : 30;
      gatherState.notes = [];
      gatherState.particles = [];
      gatherState.laneHeld = [false, false, false, false];
      gatherState.songStepIdx = 0;
      gatherState.lastSpawn = performance.now();
      gatherState.lastFamCatchTime = performance.now();
      if (!gatherState.activeSong) pickActiveGatherSong();
      document.getElementById('gather-combo').textContent = '0';
      updateFeverUI();
      document.getElementById('gather-timer').textContent = tunerOnly ? '∞' : '30';
      document.getElementById('gather-overlay').classList.add('hidden');

      clearInterval(gatherState.timerId);
      if (!tunerOnly) {
        gatherState.timerId = setInterval(() => {
          gatherState.timeLeft--;
          document.getElementById('gather-timer').textContent = gatherState.timeLeft;
          if (gatherState.timeLeft <= 0) finishRhythmGame();
        }, 1000);
      }

      cancelAnimationFrame(gatherState.rafId);
      gatherState.rafId = requestAnimationFrame(rhythmLoop);
    }

function pressRhythmLane(laneIdx) {
      if (laneIdx < 0 || laneIdx > 3) return;
      gatherState.laneHeld[laneIdx] = true;
      if (!gatherState.running || gatherState.tunerOnly) {
        sound.playNote(laneFreqs[laneIdx], gatherState.instrument, 0.55);
        return;
      }

      const hitY = rhythmCanvas.height - 34;
      const laneW = rhythmCanvas.width / 4;
      let hitIdx = -1, bestDist = 54;
      gatherState.notes.forEach((n, i) => {
        if (n.lane === laneIdx && !n.hit && !n.holding) {
          const d = Math.abs(n.y - hitY);
          if (d < bestDist) { bestDist = d; hitIdx = i; }
        }
      });

      if (hitIdx !== -1) {
        const note = gatherState.notes[hitIdx];
        sound.playNote(note.freq || laneFreqs[laneIdx], gatherState.instrument, 0.65);

        const feverMult = gatherState.feverActive ? 2 : 1;
        const pts = (bestDist < 22 ? 120 : 75) * feverMult;
        gatherState.score += pts;
        gatherState.combo++;
        spawnRhythmParticles(laneIdx * laneW + laneW / 2, hitY, laneColors[laneIdx]);

        if (!gatherState.feverActive) {
          gatherState.fever = Math.min(100, gatherState.fever + (bestDist < 22 ? 10 : 6));
          if (gatherState.fever >= 100) {
            gatherState.feverActive = true;
            sound.playChord(523.25, 'major', gatherState.instrument);
          }
        }

        if (note.holdLen > 0) note.holding = true;
        else note.hit = true;

        document.getElementById('gather-score').textContent = gatherState.score;
        document.getElementById('gather-combo').textContent = gatherState.combo;
        updateFeverUI();
      } else {
        sound.playNote(laneFreqs[laneIdx], gatherState.instrument, 0.35);
      }
    }

function finishRhythmGame() {
      gatherState.running = false;
      clearInterval(gatherState.timerId);
      cancelAnimationFrame(gatherState.rafId);
      sound.stopMicrophone();
      document.getElementById('mic-telemetry-bar').classList.add('hidden');

      const diffMult = { normal: 1.0, hard: 1.5, master: 2.2 }[gatherState.difficulty] || 1.0;
      const baseMult = Math.max(1, Math.floor((gatherState.score / 320) * diffMult));
      const oreGain = baseMult * 2 + (gatherState.instrument === 'piano' ? 2 : 0);
      const woodGain = baseMult * 2 + (gatherState.instrument === 'guitar' ? 2 : 0);
      const stringGain = baseMult + (gatherState.instrument === 'piano' ? 2 : 1);
      const thunderGain = (gameState.currentBiome === 'ch2' || gatherState.instrument === 'guitar') ? Math.max(1, Math.floor(baseMult * 0.9)) : 0;
      const coreGain = (gatherState.difficulty === 'master' && gatherState.score >= 2800) ? 1 : 0;

      gameState.materials.ore += oreGain;
      gameState.materials.wood += woodGain;
      gameState.materials.string += stringGain;
      gameState.materials.thunder += thunderGain;
      gameState.materials.core += coreGain;
      addExp(40 + baseMult * 18);
      sound.playSuccessSFX();

      const sumEl = document.getElementById('gather-rewards-summary');
      sumEl.textContent = `採集完成 (${diffMult}x)！獲得：🪨礦石+${oreGain} 🪵古木+${woodGain} ✨琴弦+${stringGain}${thunderGain ? ` ⚡雷霆石+${thunderGain}` : ''}${coreGain ? ` 💠結晶+${coreGain}` : ''}`;
      sumEl.classList.remove('hidden');
      document.getElementById('gather-overlay').classList.remove('hidden');
    }

document.getElementById('btn-test-tuner').addEventListener('click', () => startRhythmGame(true));

document.getElementById('btn-close-gather').addEventListener('click', () => {
      gatherState.running = false;
      clearInterval(gatherState.timerId);
      cancelAnimationFrame(gatherState.rafId);
      sound.stopMicrophone();
      gatherModal.classList.add('hidden');
    });

function syncBgmButtons(on) {
      document.getElementById('bgm-icon').textContent = on ? '🔊 配樂' : '🔇 配樂';
      document.getElementById('btn-bgm-mobile').textContent = on ? '🔊' : '🔇';
    }

document.getElementById('btn-bgm').addEventListener('click', () => syncBgmButtons(sound.toggleBGM()));

document.getElementById('btn-bgm-mobile').addEventListener('click', () => syncBgmButtons(sound.toggleBGM()));

document.getElementById('btn-start-game').addEventListener('click', () => { sound.init(); document.getElementById('help-modal').classList.add('hidden'); });
