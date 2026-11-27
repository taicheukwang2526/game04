// Auto-modularized section: js/combat/battle-system.js

const babelMasterpieces = [
      { floor: 1, title: '第一層：貝多芬《歡樂頌》(Ode to Joy)', composer: 'Ludwig van Beethoven', notes: ['Mi', 'Mi', 'Fa', 'Sol', 'Sol', 'Fa', 'Mi', 'Re'], instrument: 'piano', rewardSP: 1, rewardMats: { ore: 3, wood: 2, string: 2, thunder: 0, core: 0 }, desc: '古典樂最輝煌嘅大調聖詠旋律，以純淨白鍵級進構成。' },
      { floor: 2, title: '第二層：貝多芬《第五號交響曲·命運》', composer: 'Ludwig van Beethoven', notes: ['Sol', 'Sol', 'Sol', 'Re#'], instrument: 'organ', rewardSP: 1, rewardMats: { ore: 4, wood: 3, string: 2, thunder: 2, core: 0 }, desc: '「命運在敲門！」包含大三度下行至升記號黑鍵（D#/Eb）嘅震撼動機。' },
      { floor: 3, title: '第三層：莫扎特《土耳其進行曲》動機', composer: 'Wolfgang Amadeus Mozart', notes: ['Si', 'La', 'Sol#', 'La', "Do'"], instrument: 'piano', rewardSP: 1, rewardMats: { ore: 5, wood: 4, string: 3, thunder: 2, core: 0 }, desc: '靈巧華麗嘅半音階裝飾迴旋，考驗對 G# 與高音 Do 的精準掌握。' },
      { floor: 4, title: '第四層：巴哈《G弦上的詠嘆調》', composer: 'Johann Sebastian Bach', notes: ['Mi', 'Fa#', 'Sol', 'La', 'Si', 'Sol'], instrument: 'guitar', rewardSP: 2, rewardMats: { ore: 6, wood: 5, string: 4, thunder: 3, core: 1 }, desc: '巴洛克復調音樂之巔，蘊含升 F（F#）的莊嚴旋律線條，通關可獲魔王結晶！' }
    ];

const SAVE_KEY = 'chronicles_arcane_symphony_3d_v6';

staffGroup.add(staffShaft);

staffHeadRing.position.y = 1.18;

staffGroup.add(staffHeadRing);

staffCrystal.position.y = 1.18;

staffGroup.add(staffCrystal);

staffGroup.position.set(0.75, 1.25, 0.25);

staffGroup.rotation.z = -0.18;

playerGroup.add(staffGroup);

function performOverworldNormalAttack() {
      if (anyModalOpen() || gameState.encounterTransitioning) return;
      const now = performance.now();
      if (now - gameState.lastNormalAtkTime < 220) return;

      if (now - gameState.lastNormalAtkTime > 1800) gameState.normalComboStep = 1;
      const step = gameState.normalComboStep;
      gameState.lastNormalAtkTime = now;
      gameState.slashAnimTimer = 0.28;

      const w = getEquippedWeapon();
      const inst = w && w.category === 'guitar' ? 'guitar' : 'piano';
      sound.playNormalAttackSFX(step, inst);

      // Auto-aim gently toward nearest monster or unbroken crystal vein within 12.5 units
      let aimYaw = playerGroup.rotation.y;
      let nearestTarget = null, nearestD = 12.5;
      worldEntities.forEach(ent => {
        const activeMonster = ent.kind === 'monster' && ent.ref.respawnTimer <= 0;
        const activeVein = ent.kind === 'vein' && ent.ref.respawnTimer <= 0;
        if (activeMonster || activeVein) {
          const d = Math.hypot(ent.x - gameState.playerPos.x, ent.z - gameState.playerPos.z);
          if (d < nearestD) { nearestD = d; nearestTarget = ent; }
        }
      });
      if (nearestTarget) {
        aimYaw = Math.atan2(nearestTarget.x - gameState.playerPos.x, nearestTarget.z - gameState.playerPos.z);
        playerGroup.rotation.y = aimYaw;
      }

      const slashGroup = new THREE.Group();
      const slashColor = step === 3 ? 0xfacc15 : (step === 2 ? 0xc084fc : 0x38bdf8);
      const bladeMesh = new THREE.Mesh(
        new THREE.TorusGeometry(step === 3 ? 0.95 : 0.65, 0.11, 8, 20, Math.PI * 1.15),
        new THREE.MeshBasicMaterial({ color: slashColor })
      );
      bladeMesh.rotation.x = Math.PI / 2;
      bladeMesh.rotation.z = -Math.PI * 0.57;
      slashGroup.add(bladeMesh);

      const coreOrb = new THREE.Mesh(
        new THREE.OctahedronGeometry(step === 3 ? 0.34 : 0.22, 0),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      slashGroup.add(coreOrb);

      slashGroup.position.set(gameState.playerPos.x + Math.sin(aimYaw) * 1.0, 1.25, gameState.playerPos.z + Math.cos(aimYaw) * 1.0);
      slashGroup.rotation.y = aimYaw;
      scene.add(slashGroup);

      const stats = getPlayerTotalStats();
      const stepMult = step === 3 ? 1.35 : (step === 2 ? 1.05 : 0.85);
      const harmonicSkill = 1.0 + (gameState.skills.p_harmonic_strike || 0) * 0.15;
      const dmg = Math.max(10, Math.round(stats.totalAtk * stepMult * harmonicSkill));

      arcaneSlashes.push({
        mesh: slashGroup,
        vx: Math.sin(aimYaw) * 26,
        vz: Math.cos(aimYaw) * 26,
        life: 0.45,
        step,
        dmg,
        hitIds: new Set()
      });

      gameState.normalComboStep = step >= 3 ? 1 : step + 1;
      const pill = document.getElementById('overworld-combo-pill');
      if (pill) pill.textContent = `${gameState.normalComboStep}段 · 斬擊`;
    }

document.getElementById('btn-overworld-normal-atk').addEventListener('click', e => {
      e.stopPropagation();
      performOverworldNormalAttack();
    });

function updateHUD() {
      const stats = getPlayerTotalStats();
      gameState.mana = Math.min(stats.maxMana, gameState.mana);
      gameState.hp = Math.min(stats.effectiveMaxHp, gameState.hp);

      const tObj = getActiveTitle();
      document.getElementById('hud-active-title').textContent = `✦ ${tObj.name}`;

      document.getElementById('ui-hp-bar').style.width = `${Math.max(0, Math.round((gameState.hp / stats.effectiveMaxHp) * 100))}%`;
      document.getElementById('ui-hp-text').textContent = `${gameState.hp}/${stats.effectiveMaxHp}`;

      const barEl = document.getElementById('ui-barrier-text');
      if (gameState.barrier > 0) {
        barEl.textContent = `+${gameState.barrier}盾`;
        barEl.classList.remove('hidden');
      } else {
        barEl.classList.add('hidden');
      }

      document.getElementById('ui-mana-bar').style.width = `${Math.min(100, Math.round((gameState.mana / stats.maxMana) * 100))}%`;
      document.getElementById('ui-mana-text').textContent = `${gameState.mana}/${stats.maxMana}`;

      document.getElementById('ui-level').textContent = `Lv.${gameState.level}`;
      const spBadge = document.getElementById('ui-sp-badge');
      const spAlert = document.getElementById('badge-sp-alert');
      if (gameState.sp > 0) {
        spBadge.textContent = `✦ SP ${gameState.sp}`;
        spBadge.classList.remove('hidden');
        spAlert.classList.remove('hidden');
      } else {
        spBadge.classList.add('hidden');
        spAlert.classList.add('hidden');
      }

      document.getElementById('ui-atk-badge').textContent = `🪄 魔攻 ${stats.totalAtk}${stats.weaponBroken ? '(損)' : ''}`;
      document.getElementById('ui-def-badge').textContent = `🛡️ 護甲 ${stats.totalDef}`;

      const f1 = familiarsList.find(f => f.id === gameState.activeFamiliars[0]);
      const f2 = familiarsList.find(f => f.id === gameState.activeFamiliars[1]);
      document.getElementById('hud-familiar-badge').textContent = `${f1 ? f1.icon : ''}${f2 ? f2.icon : ''}` || '✦';
      if (f1) {
        familiarOrb1.children[0].material.color.setHex(f1.orbColor);
        const s1 = 1 + ((f1.starLevel || 1) - 1) * 0.25;
        familiarOrb1.scale.set(s1, s1, s1);
        familiarOrb1.children[1].visible = (f1.starLevel || 1) >= 2;
      }
      familiarOrb1.visible = !!f1;
      if (f2) {
        familiarOrb2.children[0].material.color.setHex(f2.orbColor);
        const s2 = 1 + ((f2.starLevel || 1) - 1) * 0.25;
        familiarOrb2.scale.set(s2, s2, s2);
        familiarOrb2.children[1].visible = (f2.starLevel || 1) >= 2;
      }
      familiarOrb2.visible = !!f2;

      const w = stats.weapon;
      const ar = stats.armor;
      const durBar = document.getElementById('ui-dur-bar');
      const durText = document.getElementById('ui-dur-text');
      const repAlert = document.getElementById('badge-repair-alert');
      const armorLow = ar && (ar.durability / ar.maxDurability) <= 0.35;

      if (w) {
        document.getElementById('hud-weapon-icon').textContent = w.icon;
        const pct = Math.round((w.durability / w.maxDurability) * 100);
        durBar.style.width = `${pct}%`;
        durText.textContent = `${w.durability}/${w.maxDurability}`;
        durBar.className = pct <= 0 ? 'h-full bg-rose-600' : (pct <= 35 ? 'h-full bg-amber-500' : 'h-full bg-emerald-400');
        if (pct <= 35 || armorLow) repAlert.classList.remove('hidden'); else repAlert.classList.add('hidden');
      } else {
        document.getElementById('hud-weapon-icon').textContent = '✊';
        durBar.style.width = '0%';
        durText.textContent = '空手';
        if (armorLow) repAlert.classList.remove('hidden'); else repAlert.classList.add('hidden');
      }

      const vig = document.getElementById('low-hp-vignette');
      if (vig) {
        if (gameState.hp / stats.effectiveMaxHp <= 0.28) vig.classList.remove('hidden');
        else vig.classList.add('hidden');
      }
      if (typeof update3DPlayerVisuals === 'function') update3DPlayerVisuals();
      renderUltimatesHUD();
      saveGameProgress();
    }

function healPlayer(amt) { gameState.hp = Math.min(getPlayerTotalStats().effectiveMaxHp, gameState.hp + amt); updateHUD(); }

function addExp(amt) {
      gameState.exp += amt;
      let leveledUp = false;
      while (gameState.exp >= gameState.level * 110) {
        gameState.exp -= gameState.level * 110;
        gameState.level += 1;
        gameState.sp += 1;
        gameState.maxHp += 25;
        leveledUp = true;
      }
      if (leveledUp) {
        gameState.hp = getPlayerTotalStats().effectiveMaxHp;
        showToast(`🌟 魔導階位提升至 Lv.${gameState.level}！獲得天賦點 (SP)！`);
      }
      updateHUD();
    }

const composerModal = document.getElementById('composer-modal');

document.getElementById('comp-inst-piano').addEventListener('click', () => { gameState.customUltimate.instrument = 'piano'; renderComposerGrid(); });

document.getElementById('comp-inst-guitar').addEventListener('click', () => { gameState.customUltimate.instrument = 'guitar'; renderComposerGrid(); });

document.getElementById('btn-comp-copy').addEventListener('click', () => {
      const inp = document.getElementById('comp-share-code');
      inp.select(); document.execCommand('copy');
      showToast('📋 已複製【共鳴樂譜分享碼】！');
    });

document.getElementById('btn-open-composer').addEventListener('click', () => { renderComposerGrid(); composerModal.classList.remove('hidden'); });

document.getElementById('btn-close-composer').addEventListener('click', () => composerModal.classList.add('hidden'));

const battleUltimatesBox = document.getElementById('battle-ultimates-box');

const staffTabletBox = document.getElementById('staff-tablet-box');

const btnBattleNormalAtk = document.getElementById('btn-battle-normal-attack');

const parryOverlay = document.getElementById('parry-overlay');

// --- PERFECT RHYTHM PARRY SYSTEM ---

function resolveParryAttempt(playerPressed = true) {
      if (!gameState.parryState.active) return;
      const ps = gameState.parryState;
      ps.active = false;
      cancelAnimationFrame(ps.rafId);
      parryOverlay.classList.add('hidden');

      const elapsed = performance.now() - ps.startTime;
      const t = elapsed / ps.duration;
      // Target golden ring (96px) is around t = 0.70; Perfect window [0.56, 0.84], Good window [0.42, 0.94]
      const diff = Math.abs(t - 0.70);
      const isPerfect = playerPressed && diff <= 0.14;
      const isGood = playerPressed && !isPerfect && diff <= 0.25;

      if (isPerfect) {
        sound.playParrySFX(true);
        gameState.stats.perfectParries = (gameState.stats.perfectParries || 0) + 1;
        gameState.hitstopTimer = 0.08;
        const flashEl = document.getElementById('impact-flash-overlay');
        if (flashEl) { flashEl.classList.remove('hidden'); setTimeout(() => flashEl.classList.add('hidden'), 420); }
        const stats = getPlayerTotalStats();
        const reflectDmg = Math.max(12, Math.round(stats.totalAtk * 0.65));
        ps.monster.hp -= reflectDmg;
        addMana(15);
        updateMonsterCombatBar(ps.monster);
        renderBattleUltimates();

        if (ps.monster.hp <= 0) {
          completeMonsterVictory(ps.monster, reflectDmg, false);
          return;
        }
        modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-amber-950/95 text-amber-200 border border-amber-400 animate-pop';
        modalFeedback.textContent = `🛡️✨ PERFECT PARRY 完美音律格擋！完全彈開傷害，反彈 ${reflectDmg} 聲波並回復 +15 MP！`;
        modalFeedback.classList.remove('hidden');
      } else if (isGood) {
        sound.playParrySFX(false);
        const reduced = Math.max(2, Math.round(ps.incomingDmg * 0.35));
        applyDamageToPlayer(reduced);
        modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-cyan-950/95 text-cyan-200 border border-cyan-400 animate-pop';
        modalFeedback.textContent = `🛡️ 音律格擋成功！減免 65% 傷害，僅受 ${reduced} 點餘波傷害！`;
        modalFeedback.classList.remove('hidden');
      } else {
        sound.playErrorSFX();
        applyDamageToPlayer(ps.incomingDmg);
        modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-rose-950/95 text-rose-200 border border-rose-500 animate-pop';
        modalFeedback.textContent = `💥 未能格擋！遭到魔物聲波反擊扣除 ${ps.incomingDmg} HP！`;
        modalFeedback.classList.remove('hidden');
      }
    }

function applyDamageToPlayer(rawIncoming) {
      let dmg = rawIncoming;
      if (gameState.barrier > 0) {
        const absorbed = Math.min(gameState.barrier, dmg);
        gameState.barrier -= absorbed;
        dmg -= absorbed;
      }
      gameState.hp = Math.max(10, gameState.hp - dmg);
      updateHUD();
    }

document.getElementById('btn-trigger-parry').addEventListener('click', () => resolveParryAttempt(true));

function syncBattleNormalAttackUI() {
      const step = gameState.normalComboStep;
      const names = ['第1段·根音斬 (0 MP)', '第2段·三度連擊 (0 MP)', '第3段·五度終結暴擊 (0 MP)'];
      document.getElementById('battle-normal-step').textContent = `${step} / 3 段`;
      document.getElementById('battle-normal-btn-title').textContent = `奧術普攻 · ${names[step - 1]}`;
    }

function syncStaffToggleUI() {
      const canvas = document.getElementById('staffCanvas');
      const placeholder = document.getElementById('staff-hidden-placeholder');
      const btn = document.getElementById('btn-toggle-staff');
      if (!canvas || !placeholder || !btn) return;
      if (gameState.showStaffAssist) {
        canvas.classList.remove('hidden');
        placeholder.classList.add('hidden');
        btn.textContent = '👁️ 隱藏五線譜（盲聽挑戰）';
      } else {
        canvas.classList.add('hidden');
        placeholder.classList.remove('hidden');
        btn.textContent = '🎼 顯示五線譜提示';
      }
    }

document.getElementById('btn-toggle-staff').addEventListener('click', () => {
      gameState.showStaffAssist = !gameState.showStaffAssist;
      syncStaffToggleUI();
      saveGameProgress();
    });

function renderBattleUltimates() {
      const grid = document.getElementById('battle-ultimates-grid');
      grid.innerHTML = '';
      musicUltimates.forEach(u => {
        const can = gameState.mana >= u.cost;
        const btn = document.createElement('button');
        btn.disabled = !can;
        btn.className = can
          ? `px-2 py-1.5 rounded-lg bg-gradient-to-r ${u.btnGrad} border text-[11px] font-black text-amber-100 flex items-center justify-between`
          : `px-2 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-600 flex items-center justify-between cursor-not-allowed`;
        btn.innerHTML = `<span>${u.icon} ${u.name}</span><span>${u.cost}MP</span>`;
        btn.addEventListener('click', () => triggerUltimate(u.id));
        grid.appendChild(btn);
      });
    }

function setStance(stance) {
      gameState.combatStance = stance;
      document.getElementById('stance-major').className = stance === 'major'
        ? 'px-2 py-1 rounded text-[11px] font-black bg-amber-500 text-slate-950'
        : 'px-2 py-1 rounded text-[11px] font-bold text-slate-300';
      document.getElementById('stance-minor').className = stance === 'minor'
        ? 'px-2 py-1 rounded text-[11px] font-black bg-indigo-500 text-white'
        : 'px-2 py-1 rounded text-[11px] font-bold text-indigo-300';
    }

function startSightReadTrial(npc) {
      const targetSeq = generateSequenceByTheory('white', 2);
      gameState.currentChallenge = { mode: 'sightread', theory: 'white', targetSeq, userSeq: [], instrument: 'piano', solved: false };
      setupChallengeModalUI({
        avatar: '📜', name: npc.name, title: '高音譜號五線譜識譜試煉',
        dialogue: '「觀察上方石碑五線譜上顯示的兩個音符位置，在魔導琴鍵或結他指板上彈出它們！」',
        showMonsterBar: false, showStaff: true, showNormalAtkBtn: false, theory: 'white'
      });
      drawTrebleStaffNotes(targetSeq);
    }

document.getElementById('inst-piano').addEventListener('click', () => {
      if (!gameState.currentChallenge) return;
      gameState.currentChallenge.instrument = 'piano';
      syncChallengeInstrumentButtons('piano');
      playTargetSequenceWithStaffSync(gameState.currentChallenge);
    });

document.getElementById('inst-guitar').addEventListener('click', () => {
      if (!gameState.currentChallenge) return;
      gameState.currentChallenge.instrument = 'guitar';
      syncChallengeInstrumentButtons('guitar');
      playTargetSequenceWithStaffSync(gameState.currentChallenge);
    });

document.getElementById('btn-play-target').addEventListener('click', () => {
      if (gameState.currentChallenge) playTargetSequenceWithStaffSync(gameState.currentChallenge);
    });

const npcPrompt = document.getElementById('npc-prompt');

const npcPromptText = document.getElementById('npc-prompt-text');

window.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      gameState.keys[k] = true;

      // Perfect Parry Trigger inside Battle Modal
      if (gameState.parryState.active && !e.repeat && (e.code === 'Space' || k === 'e' || k === 'j')) {
        e.preventDefault();
        resolveParryAttempt(true);
        return;
      }

      if (gatherState.running && !gatherState.tunerOnly && !e.repeat) {
        if (k === 'd') pressRhythmLane(0);
        if (k === 'f') pressRhythmLane(1);
        if (k === 'j') pressRhythmLane(2);
        if (k === 'k') pressRhythmLane(3);
        return;
      }

      // Direct Keyboard Piano Playing inside Challenge Modal
      if (!challengeModal.classList.contains('hidden') && gameState.currentChallenge && !gameState.currentChallenge.solved && !gameState.parryState.active && !e.repeat) {
        const whiteKeyMap = { 'z': 'Do', 'x': 'Re', 'c': 'Mi', 'v': 'Fa', 'b': 'Sol', 'n': 'La', 'm': 'Si', ',': "Do'" };
        const blackKeyMap = { 's': 'Do#', 'd': 'Re#', 'g': 'Fa#', 'h': 'Sol#', 'j': 'La#' };
        if (whiteKeyMap[k]) {
          e.preventDefault();
          handleNoteClick(whiteKeyMap[k]);
          return;
        }
        const ch = gameState.currentChallenge;
        const allowBlack = ch.theory === 'chromatic' || ch.theory === 'intervals' || ch.mode === 'babel' || ch.mode === 'abyss';
        if (allowBlack && blackKeyMap[k]) {
          e.preventDefault();
          handleNoteClick(blackKeyMap[k]);
          return;
        }
        if (k === 'r') {
          e.preventDefault();
          playTargetSequenceWithStaffSync(ch);
          return;
        }
        if (ch.mode === 'monster' && ['1', '2', '3', '4', '5', '6'].includes(e.key)) {
          e.preventDefault();
          triggerUltimate(parseInt(e.key, 10));
          return;
        }
      }

      if (anyModalOpen()) return;
      if (e.code === 'Space' || k === 'j') {
        e.preventDefault();
        performOverworldNormalAttack();
      }
      if (['1', '2', '3', '4', '5', '6'].includes(e.key)) triggerUltimate(parseInt(e.key, 10));
      if (k === 'e' && gameState.activeInteractable) triggerInteractable(gameState.activeInteractable);
    });

npcPrompt.addEventListener('click', () => { if (gameState.activeInteractable) triggerInteractable(gameState.activeInteractable); });
