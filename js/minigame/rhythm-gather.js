// Auto-modularized section: js/minigame/rhythm-gather.js

groundPlane.rotation.x = -Math.PI / 2;

groundPlane.receiveShadow = true;

document.getElementById('btn-forge-to-gather').addEventListener('click', () => { forgeModal.classList.add('hidden'); openGatherMinigame(); });

const gatherModal = document.getElementById('gather-modal');

const rhythmCanvas = document.getElementById('rhythmCanvas');

const rCtx = rhythmCanvas.getContext('2d');

const gatherSongLibrary = {
      twinkle: {
        id: 'twinkle',
        title: '《小星星變奏曲》',
        meta: '莫扎特 · 116 BPM · 明亮大調變奏',
        bpm: 116,
        sequence: [
          [0, 261.63], [0, 261.63], [2, 392.00], [2, 392.00], [3, 440.00], [3, 440.00], [2, 392.00],
          [1, 349.23], [1, 349.23], [1, 329.63], [1, 329.63], [0, 293.66], [0, 293.66], [0, 261.63],
          [2, 392.00], [2, 392.00], [1, 349.23], [1, 349.23], [1, 329.63], [1, 329.63], [0, 293.66]
        ]
      },
      ode: {
        id: 'ode',
        title: '《歡樂頌交響曲》',
        meta: '貝多芬 · 124 BPM · 莊嚴聖詠進行',
        bpm: 124,
        sequence: [
          [1, 329.63], [1, 329.63], [2, 349.23], [2, 392.00], [2, 392.00], [2, 349.23], [1, 329.63], [0, 293.66],
          [0, 261.63], [0, 261.63], [0, 293.66], [1, 329.63], [1, 329.63], [0, 293.66], [0, 293.66],
          [1, 329.63], [1, 329.63], [2, 349.23], [2, 392.00], [2, 392.00], [2, 349.23], [1, 329.63], [0, 293.66],
          [0, 261.63], [0, 261.63], [0, 293.66], [1, 329.63], [0, 293.66], [0, 261.63], [0, 261.63]
        ]
      },
      canon: {
        id: 'canon',
        title: '《卡農協奏曲》',
        meta: '帕海貝爾 · 108 BPM · 巴洛克和聲級進',
        bpm: 108,
        sequence: [
          [3, 523.25], [2, 493.88], [2, 440.00], [2, 392.00], [1, 349.23], [1, 329.63], [1, 349.23], [2, 392.00],
          [0, 261.63], [1, 329.63], [2, 392.00], [3, 523.25], [2, 440.00], [2, 392.00], [1, 329.63], [2, 392.00]
        ]
      },
      fate: {
        id: 'fate',
        title: '《命運交響曲》',
        meta: '貝多芬 · 132 BPM · 戲劇性半音階',
        bpm: 132,
        sequence: [
          [2, 392.00], [2, 392.00], [2, 392.00], [1, 311.13],
          [2, 349.23], [2, 349.23], [2, 349.23], [0, 293.66],
          [2, 392.00], [2, 392.00], [2, 392.00], [1, 311.13], [3, 523.25], [3, 523.25], [3, 523.25], [2, 415.30]
        ]
      },
      turkish: {
        id: 'turkish',
        title: '《土耳其進行曲》',
        meta: '莫扎特 · 138 BPM · 疾風迴旋舞曲',
        bpm: 138,
        sequence: [
          [2, 493.88], [2, 440.00], [2, 415.30], [2, 440.00], [3, 523.25],
          [2, 587.33], [3, 523.25], [2, 493.88], [3, 523.25], [3, 659.25],
          [3, 698.46], [3, 659.25], [3, 622.25], [3, 659.25], [3, 987.77], [3, 880.00]
        ]
      },
      air: {
        id: 'air',
        title: '《G弦上的詠嘆調》',
        meta: '巴哈 · 96 BPM · 永凍星辰詠嘆',
        bpm: 96,
        sequence: [
          [1, 329.63], [2, 369.99], [2, 392.00], [2, 440.00], [3, 493.88], [2, 392.00],
          [1, 329.63], [0, 293.66], [0, 261.63], [1, 329.63], [2, 392.00], [3, 523.25]
        ]
      }
    };

function generateProceduralSong() {
      const moods = [
        { name: '《秘境五聲即興曲·星夜》', scale: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25], bpm: 118 },
        { name: '《秘境五聲即興曲·狂雷》', scale: [220.00, 261.63, 293.66, 329.63, 392.00, 440.00], bpm: 130 },
        { name: '《秘境五聲即興曲·極光》', scale: [293.66, 329.63, 369.99, 440.00, 493.88, 587.33], bpm: 112 }
      ];
      const pick = moods[Math.floor(Math.random() * moods.length)];
      const seq = [];
      let curIdx = Math.floor(Math.random() * pick.scale.length);
      for (let i = 0; i < 24; i++) {
        const step = [-1, 0, 1, 1, -1, 2][Math.floor(Math.random() * 6)];
        curIdx = Math.max(0, Math.min(pick.scale.length - 1, curIdx + step));
        const lane = Math.min(3, Math.floor((curIdx / pick.scale.length) * 4));
        seq.push([lane, pick.scale[curIdx]]);
      }
      return {
        id: 'procedural',
        title: pick.name,
        meta: `即時程序作曲 · ${pick.bpm} BPM · 每次獨特旋律`,
        bpm: pick.bpm,
        sequence: seq
      };
    }

const laneMidiTargets = [60, 64, 67, 72];

const laneColors = ['#f43f5e', '#f59e0b', '#06b6d4', '#a855f7'];

const laneLabels = ['Do', 'Mi', 'Sol', "Do'"];

function pickActiveGatherSong() {
      const choice = document.getElementById('gather-song-select').value;
      gatherState.selectedSongKey = choice;
      if (choice === 'procedural') {
        gatherState.activeSong = generateProceduralSong();
      } else if (choice === 'random') {
        const keys = [...Object.keys(gatherSongLibrary), 'procedural'];
        const rnd = keys[Math.floor(Math.random() * keys.length)];
        gatherState.activeSong = rnd === 'procedural' ? generateProceduralSong() : gatherSongLibrary[rnd];
      } else {
        gatherState.activeSong = gatherSongLibrary[choice] || gatherSongLibrary.ode;
      }
      gatherState.songStepIdx = 0;
      document.getElementById('gather-song-badge').textContent = `🎵 曲目：${gatherState.activeSong.title}`;
      document.getElementById('gather-song-meta').textContent = gatherState.activeSong.meta;
    }

document.getElementById('gather-song-select').addEventListener('change', pickActiveGatherSong);

document.getElementById('btn-reroll-song').addEventListener('click', () => {
      document.getElementById('gather-song-select').value = 'random';
      pickActiveGatherSong();
      if (gatherState.activeSong) {
        const previewNotes = gatherState.activeSong.sequence.slice(0, 4);
        previewNotes.forEach((pair, idx) => sound.playNote(pair[1], gatherState.instrument, 0.35, idx * 0.18));
      }
    });

function syncGatherOptionUI() {
      document.getElementById('gather-diff-normal').className = gatherState.difficulty === 'normal'
        ? 'p-1.5 rounded-xl border border-emerald-400 bg-emerald-950/50 text-center'
        : 'p-1.5 rounded-xl border border-slate-700 bg-slate-900/60 text-center';
      document.getElementById('gather-diff-hard').className = gatherState.difficulty === 'hard'
        ? 'p-1.5 rounded-xl border border-amber-400 bg-amber-950/50 text-center'
        : 'p-1.5 rounded-xl border border-slate-700 bg-slate-900/60 text-center';
      document.getElementById('gather-diff-master').className = gatherState.difficulty === 'master'
        ? 'p-1.5 rounded-xl border border-purple-400 bg-purple-950/50 text-center'
        : 'p-1.5 rounded-xl border border-slate-700 bg-slate-900/60 text-center';

      const optPiano = document.getElementById('gather-opt-piano');
      const optGuitar = document.getElementById('gather-opt-guitar');
      optPiano.className = gatherState.instrument === 'piano'
        ? 'p-2 rounded-xl border border-amber-400 bg-slate-900 text-left'
        : 'p-2 rounded-xl border border-slate-700 bg-slate-900/60 text-left';
      optPiano.firstElementChild.className = gatherState.instrument === 'piano' ? 'font-black text-xs text-amber-300' : 'font-black text-xs text-slate-200';
      optGuitar.className = gatherState.instrument === 'guitar'
        ? 'p-2 rounded-xl border border-amber-400 bg-slate-900 text-left'
        : 'p-2 rounded-xl border border-slate-700 bg-slate-900/60 text-left';
      optGuitar.firstElementChild.className = gatherState.instrument === 'guitar' ? 'font-black text-xs text-amber-300' : 'font-black text-xs text-slate-200';
      document.getElementById('gather-mode-virtual').className = gatherState.inputMode === 'virtual'
        ? 'p-2 rounded-xl border border-teal-400 bg-teal-950/50 text-left'
        : 'p-2 rounded-xl border border-slate-700 bg-slate-900/60 text-left';
      document.getElementById('gather-mode-mic').className = gatherState.inputMode === 'mic'
        ? 'p-2 rounded-xl border border-cyan-400 bg-cyan-950/50 text-left'
        : 'p-2 rounded-xl border border-slate-700 bg-slate-900/60 text-left';
    }

document.getElementById('gather-diff-normal').addEventListener('click', () => { gatherState.difficulty = 'normal'; syncGatherOptionUI(); });

document.getElementById('gather-diff-hard').addEventListener('click', () => { gatherState.difficulty = 'hard'; syncGatherOptionUI(); });

document.getElementById('gather-diff-master').addEventListener('click', () => { gatherState.difficulty = 'master'; syncGatherOptionUI(); });

document.getElementById('gather-opt-piano').addEventListener('click', () => { gatherState.instrument = 'piano'; syncGatherOptionUI(); });

document.getElementById('gather-opt-guitar').addEventListener('click', () => { gatherState.instrument = 'guitar'; syncGatherOptionUI(); });

document.getElementById('gather-mode-virtual').addEventListener('click', () => { gatherState.inputMode = 'virtual'; syncGatherOptionUI(); });

document.getElementById('gather-mode-mic').addEventListener('click', () => { gatherState.inputMode = 'mic'; syncGatherOptionUI(); });

function openGatherMinigame() {
      gatherModal.classList.remove('hidden');
      document.getElementById('gather-overlay').classList.remove('hidden');
      document.getElementById('gather-rewards-summary').classList.add('hidden');
      document.getElementById('mic-telemetry-bar').classList.add('hidden');
      pickActiveGatherSong();
      syncGatherOptionUI();
      resizeRhythmCanvas();
    }

function resizeRhythmCanvas() {
      const rect = rhythmCanvas.parentElement.getBoundingClientRect();
      rhythmCanvas.width = rect.width || 600;
      rhythmCanvas.height = rect.height || 260;
    }

function updateFeverUI() {
      const fLabel = document.getElementById('gather-fever-label');
      const fBar = document.getElementById('gather-fever-bar');
      fBar.style.width = `${Math.min(100, gatherState.fever)}%`;
      if (gatherState.feverActive) {
        fLabel.textContent = '🔥 FEVER 2.0x!!';
        fLabel.className = 'text-[10px] font-black text-yellow-300 animate-pulse shrink-0';
      } else {
        fLabel.textContent = `🔥 FEVER ${Math.floor(gatherState.fever)}%`;
        fLabel.className = 'text-[10px] font-black text-amber-300 shrink-0';
      }
    }

function releaseRhythmLane(laneIdx) {
      if (laneIdx < 0 || laneIdx > 3) return;
      gatherState.laneHeld[laneIdx] = false;
      gatherState.notes.forEach(n => {
        if (n.lane === laneIdx && n.holding) {
          n.holding = false;
          n.hit = true;
        }
      });
    }

function rhythmLoop(now) {
      if (!gatherState.running) return;
      const w = rhythmCanvas.width, h = rhythmCanvas.height, hitY = h - 34, laneW = w / 4;
      rCtx.clearRect(0, 0, w, h);

      if (gatherState.feverActive) {
        rCtx.fillStyle = 'rgba(250, 204, 21, 0.08)';
        rCtx.fillRect(0, 0, w, h);
        gatherState.fever = Math.max(0, gatherState.fever - 0.16);
        if (gatherState.fever <= 0) gatherState.feverActive = false;
        updateFeverUI();
      }

      if (sound.micActive) {
        const pitch = sound.detectPitch();
        if (pitch && pitch.freq > 0) {
          document.getElementById('mic-detected-note').textContent = pitch.noteName;
          document.getElementById('mic-detected-hz').textContent = `${pitch.freq.toFixed(1)} Hz`;
          document.getElementById('mic-cents-text').textContent = `${pitch.cents >= 0 ? '+' : ''}${pitch.cents} cents`;
          const needlePct = Math.max(4, Math.min(96, 50 + pitch.cents * 0.8));
          document.getElementById('mic-tuner-needle').style.left = `calc(${needlePct}% - 4px)`;

          if (!gatherState.tunerOnly && now - gatherState.lastMicHitTime > 240) {
            let matchedLane = -1;
            laneMidiTargets.forEach((targetMidi, idx) => {
              const diff = Math.abs(pitch.midi - targetMidi);
              if (diff === 0 || diff === 12) matchedLane = idx;
            });
            if (matchedLane !== -1) {
              gatherState.lastMicHitTime = now;
              pressRhythmLane(matchedLane);
            }
          }
        }
      }

      for (let i = 0; i < 4; i++) {
        if (gatherState.laneHeld[i]) {
          rCtx.fillStyle = `${laneColors[i]}25`;
          rCtx.fillRect(i * laneW, 0, laneW, h);
        }
        rCtx.strokeStyle = 'rgba(212, 168, 83, 0.25)';
        rCtx.beginPath(); rCtx.moveTo(i * laneW, 0); rCtx.lineTo(i * laneW, h); rCtx.stroke();
        rCtx.fillStyle = `${laneColors[i]}44`;
        rCtx.fillRect(i * laneW + 6, hitY - 12, laneW - 12, 24);
        rCtx.fillStyle = '#fef3c7'; rCtx.font = 'bold 12px sans-serif'; rCtx.textAlign = 'center';
        rCtx.fillText(laneLabels[i], i * laneW + laneW / 2, hitY + 4);
      }

      if (!gatherState.tunerOnly) {
        const diffCfg = {
          normal: { spawnMs: 620, speed: 3.1, dualChance: 0.0,  holdChance: 0.22 },
          hard:   { spawnMs: 470, speed: 4.1, dualChance: 0.24, holdChance: 0.30 },
          master: { spawnMs: 360, speed: 5.2, dualChance: 0.36, holdChance: 0.35 }
        }[gatherState.difficulty];

        const slowFactor = gameState.activeFamiliars.includes('chrono_sentinel') ? 0.88 : 1.0;

        if (now - gatherState.lastSpawn > diffCfg.spawnMs) {
          const songSeq = gatherState.activeSong ? gatherState.activeSong.sequence : [[0, 261.63]];
          const [lane1, freq1] = songSeq[gatherState.songStepIdx % songSeq.length];
          gatherState.songStepIdx++;

          const isHold1 = gatherState.inputMode === 'virtual' && Math.random() < diffCfg.holdChance;
          gatherState.notes.push({
            lane: lane1,
            freq: freq1,
            y: -16,
            speed: diffCfg.speed * slowFactor,
            holdLen: isHold1 ? 75 : 0,
            holding: false,
            hit: false
          });

          if (Math.random() < diffCfg.dualChance) {
            const lane2 = (lane1 + 1 + Math.floor(Math.random() * 3)) % 4;
            gatherState.notes.push({
              lane: lane2,
              freq: freq1 * 1.25,
              y: -16,
              speed: diffCfg.speed * slowFactor,
              holdLen: 0,
              holding: false,
              hit: false
            });
          }
          gatherState.lastSpawn = now;
        }

        // Check Star-Awakened Familiar Auto-Catch Cooldown
        const maxActiveStar = Math.max(1, ...gameState.activeFamiliars.map(fid => {
          const f = familiarsList.find(x => x.id === fid);
          return f ? (f.starLevel || 1) : 1;
        }));
        const famCatchCooldown = maxActiveStar >= 3 ? 5000 : (maxActiveStar === 2 ? 9000 : 999999);

        gatherState.notes.forEach(n => {
          if (n.hit) return;
          n.y += n.speed;

          if (n.holding && gatherState.laneHeld[n.lane]) {
            gatherState.score += gatherState.feverActive ? 6 : 3;
            document.getElementById('gather-score').textContent = gatherState.score;
            if (n.y - n.holdLen >= hitY) {
              n.holding = false;
              n.hit = true;
              gatherState.score += 100;
              spawnRhythmParticles(n.lane * laneW + laneW / 2, hitY, '#fde047');
            }
          }

          if (n.y - n.holdLen > h + 20 && !n.hit) {
            if (maxActiveStar >= 2 && now - gatherState.lastFamCatchTime >= famCatchCooldown) {
              // Familiar Auto-Catch saves the combo!
              gatherState.lastFamCatchTime = now;
              n.hit = true;
              gatherState.score += 90;
              gatherState.combo++;
              sound.playNote(n.freq || laneFreqs[n.lane], gatherState.instrument, 0.45);
              spawnRhythmParticles(n.lane * laneW + laneW / 2, hitY, '#38bdf8');
              document.getElementById('gather-score').textContent = gatherState.score;
              document.getElementById('gather-combo').textContent = gatherState.combo;
            } else {
              n.hit = true;
              gatherState.combo = 0;
              document.getElementById('gather-combo').textContent = 0;
            }
          }

          const cx = n.lane * laneW + laneW / 2;
          if (n.holdLen > 0) {
            const topY = n.y - n.holdLen;
            const botY = n.holding ? hitY : n.y;
            if (botY > topY) {
              rCtx.fillStyle = n.holding ? 'rgba(250, 204, 21, 0.7)' : `${laneColors[n.lane]}66`;
              rCtx.fillRect(cx - 10, topY, 20, botY - topY);
              rCtx.strokeStyle = '#fef08a';
              rCtx.lineWidth = 1.5;
              rCtx.strokeRect(cx - 10, topY, 20, botY - topY);
            }
          }

          const drawY = n.holding ? hitY : n.y;
          rCtx.fillStyle = n.holding ? '#fde047' : laneColors[n.lane];
          rCtx.beginPath(); rCtx.arc(cx, drawY, 15, 0, Math.PI * 2); rCtx.fill();
          rCtx.strokeStyle = '#ffffff'; rCtx.lineWidth = 2; rCtx.stroke();
        });
        gatherState.notes = gatherState.notes.filter(n => !n.hit);
      }

      gatherState.particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life > 0) {
          rCtx.globalAlpha = p.life;
          rCtx.fillStyle = p.color;
          rCtx.beginPath();
          rCtx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
          rCtx.fill();
          rCtx.globalAlpha = 1;
        }
      });
      gatherState.particles = gatherState.particles.filter(p => p.life > 0);

      gatherState.rafId = requestAnimationFrame(rhythmLoop);
    }

document.getElementById('btn-open-gather').addEventListener('click', openGatherMinigame);

document.getElementById('btn-start-gather').addEventListener('click', () => startRhythmGame(false));

document.querySelectorAll('.rhythm-pad').forEach(btn => {
      const laneIdx = parseInt(btn.dataset.lane, 10);
      btn.addEventListener('pointerdown', e => { e.preventDefault(); pressRhythmLane(laneIdx); });
      btn.addEventListener('pointerup', () => releaseRhythmLane(laneIdx));
      btn.addEventListener('pointerleave', () => releaseRhythmLane(laneIdx));
      btn.addEventListener('pointercancel', () => releaseRhythmLane(laneIdx));
    });

function anyModalOpen() {
      return !challengeModal.classList.contains('hidden') ||
             !npcDialogueModal.classList.contains('hidden') ||
             !bagModal.classList.contains('hidden') ||
             !forgeModal.classList.contains('hidden') ||
             !gatherModal.classList.contains('hidden') ||
             !babelModal.classList.contains('hidden') ||
             !abyssModal.classList.contains('hidden') ||
             !skillsModal.classList.contains('hidden') ||
             !familiarsModal.classList.contains('hidden') ||
             !composerModal.classList.contains('hidden') ||
             !worldmapModal.classList.contains('hidden') ||
             !codexModal.classList.contains('hidden') ||
             !achievementsModal.classList.contains('hidden') ||
             !document.getElementById('help-modal').classList.contains('hidden');
    }

window.addEventListener('keyup', e => {
      const k = e.key.toLowerCase();
      gameState.keys[k] = false;
      if (k === 'd') releaseRhythmLane(0);
      if (k === 'f') releaseRhythmLane(1);
      if (k === 'j') releaseRhythmLane(2);
      if (k === 'k') releaseRhythmLane(3);
    });
