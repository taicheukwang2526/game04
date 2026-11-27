// Auto-modularized section: js/ui/hud-modals.js

const enchantAffixesPool = [
      { id: 'aff_major', name: '☀️ 晨曦大調共鳴 (+15% 大調傷害)', type: 'majorDmg', val: 0.15 },
      { id: 'aff_minor', name: '🌙 夜曲小調共鳴 (+15% 小調傷害)', type: 'minorDmg', val: 0.15 },
      { id: 'aff_shield', name: '🛡️ 開場聖詠護盾 (+30 初始護盾)', type: 'startShield', val: 30 },
      { id: 'aff_crit', name: '⚡ 狂雷失真暴擊 (+18% 暴擊率)', type: 'critRate', val: 0.18 },
      { id: 'aff_mp', name: '💧 魔力泉湧 (+10 每次答題回魔)', type: 'mpOnHit', val: 10 }
    ];

const musicUltimates = [
      { id: 1, key: '1', name: '音波震盪波', icon: '🌊', cost: 35, btnGrad: 'from-cyan-800 to-slate-900 border-cyan-400/80' },
      { id: 2, key: '2', name: '聖詠治癒和弦', icon: '💚', cost: 40, btnGrad: 'from-emerald-800 to-slate-900 border-emerald-400/80' },
      { id: 3, key: '3', name: '鋼琴星隕協奏', icon: '🌠', cost: 60, btnGrad: 'from-indigo-800 to-slate-950 border-indigo-400/80' },
      { id: 4, key: '4', name: '狂雷電結他獨奏', icon: '⚡', cost: 65, btnGrad: 'from-amber-700 to-slate-950 border-amber-400/80' },
      { id: 5, key: '5', name: '終焉交響風暴', icon: '🔥', cost: 95, btnGrad: 'from-rose-800 to-slate-950 border-rose-400/80' },
      { id: 6, key: '6', name: '靈魂協奏曲(自創)', icon: '🎼', cost: 80, btnGrad: 'from-purple-800 via-fuchsia-900 to-slate-950 border-amber-300' }
    ];

function getActiveTitle()     { return abyssTitlesData.find(t => t.id === gameState.activeTitleId) || abyssTitlesData[0]; }

const threeHost = document.getElementById('three-canvas-host');

const worldLabelsLayer = document.getElementById('world-labels-layer');

const worldDmgLayer = document.getElementById('world-dmg-layer');

let isDraggingCam = false, dragStart = { x: 0, y: 0 }

, dragMoved = false;

threeHost.addEventListener('pointerdown', e => {
      isDraggingCam = true; dragMoved = false; dragStart = { x: e.clientX, y: e.clientY };
    });

window.addEventListener('pointerup', e => {
      if (isDraggingCam && !dragMoved && !anyModalOpen() && !gameState.encounterTransitioning) handle3DClick(e);
      isDraggingCam = false;
    });

threeHost.addEventListener('wheel', e => {
      camDist = Math.max(9.5, Math.min(27, camDist + e.deltaY * 0.01));
    }, { passive: true });

const shadowBound = 28;

robeBody.position.y = 0.82;

robeBody.castShadow = true;

playerGroup.add(robeBody);

robeTrimRing.rotation.x = Math.PI / 2;

robeTrimRing.position.y = 0.06;

playerGroup.add(robeTrimRing);

mageHead.position.y = 1.72;

playerGroup.add(mageHead);

eyeL.position.set(-0.10, 1.74, 0.26);

eyeR.position.set(0.10, 1.74, 0.26);

playerGroup.add(eyeL, eyeR);

hatBrim.position.y = 1.94;

playerGroup.add(hatBrim);

hatBand.rotation.x = Math.PI / 2;

hatBand.position.y = 1.98;

playerGroup.add(hatBand);

hatCone.position.set(0, 2.36, -0.04);

hatCone.rotation.x = -0.18;

playerGroup.add(hatCone);

mageAuraRing.rotation.x = -Math.PI / 2;

mageAuraRing.position.y = 0.03;

playerGroup.add(mageAuraRing);

famHalo1.rotation.x = Math.PI / 2;

famHalo2.rotation.x = Math.PI / 2;

waypointRing.rotation.x = -Math.PI / 2;

waypointRing.position.y = 0.04;

waypointRing.visible = false;

let worldEntities = [];

let skyRingGroup = null;

function createFloatingWorldLabel(ent) {
      const el = document.createElement('div');
      el.className = 'world-tag select-none';
      if (ent.kind === 'npc') {
        el.innerHTML = `
          <div class="px-2.5 py-1 rounded-lg bg-slate-950/90 border border-amber-400/80 shadow-lg text-center backdrop-blur-sm hover:border-cyan-300 transition">
            <div class="text-[11px] font-black text-amber-200 whitespace-nowrap">${ent.ref.name}</div>
            <div class="text-[9px] font-bold text-cyan-300 whitespace-nowrap">${ent.ref.role}</div>
          </div>
        `;
      } else if (ent.kind === 'chest') {
        el.innerHTML = `
          <div class="px-2.5 py-1 rounded-lg bg-slate-950/90 border ${ent.ref.opened ? 'border-slate-600 opacity-60' : 'border-emerald-400'} shadow-lg text-center backdrop-blur-sm hover:border-amber-300 transition">
            <div class="text-[11px] font-black ${ent.ref.opened ? 'text-slate-400' : 'text-emerald-300'} whitespace-nowrap">💎 ${ent.ref.name}</div>
            <div class="text-[9px] font-bold text-amber-200 whitespace-nowrap">${ent.ref.opened ? '✓ 已開啟' : '🔐 3音密碼解鎖 SR/SSR'}</div>
          </div>
        `;
      } else if (ent.kind === 'vein') {
        el.innerHTML = `
          <div class="px-2 py-0.5 rounded-lg bg-slate-950/85 border border-teal-400/80 shadow text-center backdrop-blur-sm">
            <div class="text-[10px] font-black text-teal-200 whitespace-nowrap">⛏️ ${ent.ref.name} (${ent.ref.hp}/${ent.ref.maxHp})</div>
            <div class="text-[8px] font-bold text-cyan-300 whitespace-nowrap">按 [空白鍵/J] 音刃劈開</div>
          </div>
        `;
      } else {
        const affTag = ent.ref.affinity === 'major' ? '☀️大調弱點' : '🌙小調弱點';
        el.innerHTML = `
          <div class="px-2.5 py-1 rounded-lg bg-slate-950/90 border ${ent.ref.isBoss ? 'border-rose-400' : 'border-rose-600/80'} shadow-lg text-center backdrop-blur-sm hover:border-amber-300 transition">
            <div class="text-[11px] font-black ${ent.ref.isBoss ? 'text-rose-300' : 'text-rose-200'} whitespace-nowrap">
              Lv.${ent.ref.lv} ${ent.ref.name}
            </div>
            <div class="w-24 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-rose-800 mx-auto my-0.5">
              <div class="monster-tag-hp h-full bg-rose-500" style="width: ${Math.max(0, Math.round((ent.ref.hp / ent.ref.maxHp) * 100))}%;"></div>
            </div>
            <div class="text-[9px] font-bold text-amber-300 whitespace-nowrap">${affTag}</div>
          </div>
        `;
      }
      el.addEventListener('click', e => {
        e.stopPropagation();
        const dist = Math.hypot(gameState.playerPos.x - ent.x, gameState.playerPos.z - ent.z);
        if (dist <= 6.5) {
          triggerInteractable(ent);
        } else {
          gameState.targetPos = { x: ent.x, z: ent.z + 1.8 };
          waypointRing.position.set(ent.x, 0.05, ent.z + 1.8);
          waypointRing.visible = true;
          showToast(`🪄 魔導師正前往「${ent.ref.name}」...`);
        }
      });
      worldLabelsLayer.appendChild(el);
      return el;
    }

const bagModal = document.getElementById('bag-modal');

const forgeModal = document.getElementById('forge-modal');

function getRarityBadgeHTML(rarity) {
      const colors = {
        SSR: 'bg-gradient-to-r from-amber-400 to-yellow-200 text-slate-950',
        SR:  'bg-purple-500 text-white',
        R:   'bg-sky-500 text-slate-950',
        N:   'bg-slate-600 text-slate-100'
      };
      return `<span class="px-1 py-0.2 rounded text-[9px] font-epic font-black ${colors[rarity] || colors.N}">${rarity}</span>`;
    }

function bindSquareSlotDragEvents() {
      ['weapon', 'offhand', 'armor', 'relic'].forEach(slotName => {
        const slotEl = document.getElementById(`sq-slot-${slotName}`);
        slotEl.addEventListener('dragover', e => { e.preventDefault(); slotEl.classList.add('drag-over'); });
        slotEl.addEventListener('dragleave', () => slotEl.classList.remove('drag-over'));
        slotEl.addEventListener('drop', e => {
          e.preventDefault();
          slotEl.classList.remove('drag-over');
          const draggedItemId = e.dataTransfer.getData('text/plain');
          const item = gearCatalog.find(g => g.id === draggedItemId);
          if (!item) return;
          if (item.slot !== slotName) {
            showToast(`⚠️ 該裝備屬於【${getSlotChineseName(item.slot)}】，請拖放至對應正方形裝備格！`, 'border-rose-500 text-rose-200');
            return;
          }
          gameState.equipped[`${slotName}Id`] = item.id;
          gameState.selectedBagItemId = item.id;
          sound.playForgeSFX();
          showToast(`✦ 已穿戴 [${item.rarity}]【${item.name}】！`);
          updateHUD();
          renderBagModal();
        });
      });
    }

function getSlotChineseName(slot) {
      const map = { weapon: '主手魔導器', offhand: '副手共鳴器', armor: '聖詠法袍', relic: '奧術聖印' };
      return map[slot] || slot;
    }

function syncBagFilterButtons() {
      document.querySelectorAll('.bag-filter-btn').forEach(b => {
        b.className = b.dataset.filter === gameState.bagFilter
          ? 'bag-filter-btn px-2.5 py-1 rounded-lg text-xs font-black bg-amber-500 text-slate-950'
          : 'bag-filter-btn px-2.5 py-1 rounded-lg text-xs font-bold text-slate-300';
      });
    }

document.querySelectorAll('.bag-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => { gameState.bagFilter = btn.dataset.filter; syncBagFilterButtons(); renderBagModal(); });
    });

document.getElementById('btn-sort-rarity').addEventListener('click', () => {
      gameState.bagSortRarity = !gameState.bagSortRarity;
      document.getElementById('btn-sort-rarity').textContent = gameState.bagSortRarity ? '✓ 已按稀有度排序' : '⇅ 按稀有度排序';
      renderBagModal();
    });

document.getElementById('btn-open-bag').addEventListener('click', () => { renderBagModal(); bagModal.classList.remove('hidden'); });

document.getElementById('hud-durability-box').addEventListener('click', () => { renderBagModal(); bagModal.classList.remove('hidden'); });

document.getElementById('btn-close-bag').addEventListener('click', () => bagModal.classList.add('hidden'));

document.getElementById('btn-armory-to-forge').addEventListener('click', () => { bagModal.classList.add('hidden'); renderForgeModal(); forgeModal.classList.remove('hidden'); });

const npcDialogueModal = document.getElementById('npc-dialogue-modal');

document.getElementById('btn-close-npc-dlg').addEventListener('click', () => npcDialogueModal.classList.add('hidden'));

function showToast(msg, borderClass = 'border-amber-400 text-amber-100') {
      const container = document.getElementById('toast-container');
      const el = document.createElement('div');
      el.className = `arcane-glass ${borderClass} px-4 py-2 rounded-xl font-bold text-xs sm:text-sm text-center animate-pop`;
      el.textContent = msg;
      container.appendChild(el);
      setTimeout(() => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.3s ease';
        setTimeout(() => el.remove(), 300);
      }, 3000);
    }

function renderUltimatesHUD() {
      const bar = document.getElementById('ultimates-bar');
      bar.innerHTML = '';
      musicUltimates.forEach(u => {
        const canCast = gameState.mana >= u.cost;
        const btn = document.createElement('button');
        btn.disabled = !canCast;
        btn.className = canCast
          ? `flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-gradient-to-b ${u.btnGrad} border text-amber-50 shadow-lg cursor-pointer active:scale-95 transition animate-arcane-glow`
          : `flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/85 border border-slate-800 text-slate-600 cursor-not-allowed`;
        btn.innerHTML = `
          <span class="text-sm">${u.icon}</span>
          <div class="text-left leading-tight">
            <div class="text-[10px] font-black">${u.name}</div>
            <div class="text-[9px] font-bold ${canCast ? 'text-cyan-300' : 'text-slate-600'}">${u.cost}MP [${u.key}]</div>
          </div>
        `;
        btn.addEventListener('click', () => triggerUltimate(u.id));
        bar.appendChild(btn);
      });
    }

const achievementsModal = document.getElementById('achievements-modal');

document.getElementById('btn-open-achievements').addEventListener('click', () => { renderAchievementsModal(); achievementsModal.classList.remove('hidden'); });

document.getElementById('btn-close-achievements').addEventListener('click', () => achievementsModal.classList.add('hidden'));

function addMana(amt) { gameState.mana = Math.min(getPlayerTotalStats().maxMana, gameState.mana + amt); updateHUD(); }

// --- ENDLESS ABYSS & TITLES MODAL ---

const abyssModal = document.getElementById('abyss-modal');

function renderAbyssModal() {
      const nextFloor = gameState.abyssBestFloor + 1;
      document.getElementById('abyss-best-floor').textContent = gameState.abyssBestFloor;
      document.getElementById('abyss-next-floor').textContent = nextFloor;
      document.getElementById('abyss-btn-floor').textContent = nextFloor;

      const grid = document.getElementById('abyss-titles-grid');
      grid.innerHTML = '';
      abyssTitlesData.forEach(t => {
        const unlocked = gameState.abyssBestFloor >= t.reqFloor;
        const equipped = gameState.activeTitleId === t.id;
        const card = document.createElement('div');
        card.className = `arcane-subpanel rounded-xl p-3 border flex items-center justify-between gap-2 ${equipped ? 'border-amber-400 bg-slate-900' : 'border-slate-800'}`;
        card.innerHTML = `
          <div>
            <div class="font-epic font-black text-xs sm:text-sm ${unlocked ? 'text-amber-300' : 'text-slate-500'}">🎖️ ${t.name}</div>
            <div class="text-[11px] text-cyan-300 mt-0.5">${t.bonusText}</div>
            <div class="text-[10px] text-slate-400 mt-0.5">${unlocked ? '✓ 已解鎖榮耀稱號' : `🔒 通關深淵第 ${t.reqFloor} 層解鎖`}</div>
          </div>
          ${unlocked
            ? `<button onclick="equipAbyssTitle('${t.id}')" class="px-3 py-1.5 rounded-lg text-xs font-black shrink-0 ${equipped ? 'bg-slate-800 text-amber-300 border border-amber-500/50' : 'btn-arcane-gold'}">${equipped ? '✦ 佩戴中' : '佩戴'}</button>`
            : `<span class="text-xs text-slate-600 shrink-0">未解鎖</span>`}
        `;
        grid.appendChild(card);
      });
    }

document.getElementById('btn-enter-abyss-floor').addEventListener('click', () => {
      const floor = gameState.abyssBestFloor + 1;
      abyssModal.classList.add('hidden');
      const noteLen = Math.min(6, 3 + Math.floor(floor / 3));
      const targetSeq = generateSequenceByTheory('chromatic', noteLen);
      gameState.currentChallenge = {
        mode: 'abyss', theory: 'chromatic', abyssFloor: floor,
        targetSeq, userSeq: [], instrument: floor % 2 === 0 ? 'guitar' : 'piano', solved: false
      };
      setupChallengeModalUI({
        avatar: '🌀', name: `無盡深淵 第 ${floor} 層守護靈`,
        title: `無盡音律試煉 · 連續重現 ${noteLen} 個半音階音符`,
        dialogue: `「深淵第 ${floor} 層的共鳴考驗！聆聽這段 ${noteLen} 音半音階旋律並精準彈出！」`,
        showMonsterBar: false, showStaff: false, showNormalAtkBtn: false, theory: 'chromatic'
      });
    });

document.getElementById('btn-open-abyss').addEventListener('click', () => { renderAbyssModal(); abyssModal.classList.remove('hidden'); });

document.getElementById('hud-active-title').addEventListener('click', () => { renderAbyssModal(); abyssModal.classList.remove('hidden'); });

document.getElementById('btn-close-abyss').addEventListener('click', () => abyssModal.classList.add('hidden'));

const worldmapModal = document.getElementById('worldmap-modal');

document.getElementById('btn-open-worldmap').addEventListener('click', () => { renderWorldMapModal(); worldmapModal.classList.remove('hidden'); });

document.getElementById('btn-close-worldmap').addEventListener('click', () => worldmapModal.classList.add('hidden'));

const babelModal = document.getElementById('babel-modal');

document.getElementById('btn-open-babel').addEventListener('click', () => { renderBabelModal(); babelModal.classList.remove('hidden'); });

document.getElementById('btn-close-babel').addEventListener('click', () => babelModal.classList.add('hidden'));

document.getElementById('btn-open-forge').addEventListener('click', () => { renderForgeModal(); forgeModal.classList.remove('hidden'); });

document.getElementById('btn-close-forge').addEventListener('click', () => forgeModal.classList.add('hidden'));

function encodeResonanceShareCode() {
      const prefix = gameState.customUltimate.instrument === 'piano' ? 'RES-PNO-' : 'RES-GTR-';
      return prefix + gameState.customUltimate.notes.join('-');
    }

const codexModal = document.getElementById('codex-modal');

document.getElementById('btn-open-codex').addEventListener('click', () => codexModal.classList.remove('hidden'));

document.getElementById('btn-close-codex').addEventListener('click', () => codexModal.classList.add('hidden'));

const challengeModal = document.getElementById('challenge-modal');

const instrumentInputContainer = document.getElementById('instrument-input-container');

const answerSlots = document.getElementById('answer-slots');

function syncChallengeInstrumentButtons(inst) {
      const isGuitar = inst === 'guitar';
      document.getElementById('inst-piano').className = !isGuitar
        ? 'px-2 py-1 rounded text-[11px] font-black bg-amber-500 text-slate-950'
        : 'px-2 py-1 rounded text-[11px] font-bold text-slate-300';
      document.getElementById('inst-guitar').className = isGuitar
        ? 'px-2 py-1 rounded text-[11px] font-black bg-amber-500 text-slate-950'
        : 'px-2 py-1 rounded text-[11px] font-bold text-slate-300';
    }

document.getElementById('view-piano-keys').addEventListener('click', () => {
      gameState.inputViewMode = 'piano';
      document.getElementById('view-piano-keys').className = 'px-2 py-1 rounded text-[11px] font-black bg-cyan-500 text-slate-950';
      document.getElementById('view-guitar-tab').className = 'px-2 py-1 rounded text-[11px] font-bold text-slate-300';
      renderInstrumentInputView();
    });

document.getElementById('view-guitar-tab').addEventListener('click', () => {
      gameState.inputViewMode = 'guitar';
      document.getElementById('view-guitar-tab').className = 'px-2 py-1 rounded text-[11px] font-black bg-cyan-500 text-slate-950';
      document.getElementById('view-piano-keys').className = 'px-2 py-1 rounded text-[11px] font-bold text-slate-300';
      renderInstrumentInputView();
    });

function openSealedChestChallenge(chest) {
      if (chest.opened) {
        showToast('💎 此音律寶箱已被開啟過了！');
        return;
      }
      const targetSeq = generateSequenceByTheory(chest.theory, chest.noteCount);
      gameState.currentChallenge = {
        mode: 'chest', theory: chest.theory, chestData: chest,
        targetSeq, userSeq: [], instrument: 'piano', solved: false
      };
      setupChallengeModalUI({
        avatar: '💎', name: chest.name,
        title: `封印音律寶箱解鎖（${chest.noteCount} 音共鳴密碼）`,
        dialogue: '「聆聽寶箱水晶發出的共鳴密碼並完整重現，即可開啟寶箱獲得 SR / SSR 稀有神兵！」',
        showMonsterBar: false, showStaff: false, showNormalAtkBtn: false, theory: chest.theory
      });
    }

function startMentorTrial(npc, theoryMode = 'white') {
      const targetSeq = generateSequenceByTheory(theoryMode, 2);
      gameState.currentChallenge = { mode: 'npc', theory: theoryMode, targetSeq, userSeq: [], instrument: 'piano', solved: false };
      setupChallengeModalUI({
        avatar: npc.avatar, name: npc.name,
        title: theoryMode === 'chromatic' ? '12 音半音階試煉' : (theoryMode === 'intervals' ? '星界音程試煉' : '魔導基礎音階試煉'),
        dialogue: '「凝神聆聽我奏響的音符序列，然後以你的魔導器重現這段旋律！」',
        showMonsterBar: false, showStaff: false, showNormalAtkBtn: false, theory: theoryMode
      });
    }

function openBabelChallenge(babelFloor) {
      gameState.currentChallenge = {
        mode: 'babel', theory: 'chromatic', babelData: babelFloor,
        targetSeq: [...babelFloor.notes], userSeq: [], instrument: babelFloor.instrument, solved: false
      };
      setupChallengeModalUI({
        avatar: '🗼', name: babelFloor.title, title: `巴別音律之塔 第 ${babelFloor.floor} 層`,
        dialogue: `「請完整重現【${babelFloor.composer}】的經典樂句（共 ${babelFloor.notes.length} 音）！」`,
        showMonsterBar: false, showStaff: false, showNormalAtkBtn: false, theory: 'chromatic'
      });
    }

function renderAnswerSlots() {
      const ch = gameState.currentChallenge;
      if (!ch) return;
      answerSlots.innerHTML = '';
      for (let i = 0; i < ch.targetSeq.length; i++) {
        const val = ch.userSeq[i];
        const slot = document.createElement('div');
        slot.className = val
          ? 'px-2 h-7 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center font-black text-amber-200 text-xs animate-pop'
          : 'w-8 h-7 rounded-lg bg-slate-950 border border-dashed border-slate-600 flex items-center justify-center text-slate-500 text-xs';
        slot.textContent = val || '?';
        answerSlots.appendChild(slot);
      }
    }

document.getElementById('btn-clear-answer').addEventListener('click', () => {
      if (gameState.currentChallenge && !gameState.currentChallenge.solved) {
        gameState.currentChallenge.userSeq = [];
        renderAnswerSlots();
      }
    });

document.getElementById('btn-toggle-audition').addEventListener('click', () => {
      gameState.auditionMode = !gameState.auditionMode;
      const btn = document.getElementById('btn-toggle-audition');
      if (gameState.auditionMode) {
        btn.textContent = '🎹 試音模式（只試聽不填入）';
        btn.className = 'px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[10px] font-black transition';
      } else {
        btn.textContent = '🎧 詠唱模式（點擊填入）';
        btn.className = 'px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 border border-amber-500/60 text-[10px] font-bold text-amber-300 transition';
      }
    });

window.addEventListener('blur', () => {
      gameState.keys = {};
      isDraggingCam = false;
    });

document.querySelectorAll('.dpad-btn').forEach(btn => {
      const dir = btn.dataset.dir;
      btn.addEventListener('pointerdown', e => { e.preventDefault(); gameState.keys[dir] = true; });
      btn.addEventListener('pointerup', () => gameState.keys[dir] = false);
      btn.addEventListener('pointerleave', () => gameState.keys[dir] = false);
    });

document.getElementById('btn-interact-mobile').addEventListener('click', () => { if (gameState.activeInteractable) triggerInteractable(gameState.activeInteractable); });

document.getElementById('btn-help').addEventListener('click', () => document.getElementById('help-modal').classList.remove('hidden'));

loadGameProgress();

bindSquareSlotDragEvents();

updateHUD();
