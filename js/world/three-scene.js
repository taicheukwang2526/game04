// Auto-modularized section: js/world/three-scene.js

// Resonance Wind-Chime Puzzle Pillars (Hit in ascending order with Arcane Slash!)

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(48, threeHost.clientWidth / threeHost.clientHeight, 0.1, 200);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });

renderer.setSize(threeHost.clientWidth, threeHost.clientHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

renderer.shadowMap.enabled = true;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;

threeHost.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x334155, 0.95);

scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xfde68a, 1.15);

dirLight.position.set(18, 28, 16);

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 1024;

dirLight.shadow.mapSize.height = 1024;

dirLight.shadow.camera.near = 2;

dirLight.shadow.camera.far = 80;

dirLight.shadow.camera.left = -shadowBound;

dirLight.shadow.camera.right = shadowBound;

dirLight.shadow.camera.top = shadowBound;

dirLight.shadow.camera.bottom = -shadowBound;

scene.add(dirLight);

const playerGroup = new THREE.Group();

const velvetMat = new THREE.MeshStandardMaterial({ color: 0x17153b, roughness: 0.55, metalness: 0.25 });

const goldTrimMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.25, metalness: 0.85 });

const arcaneCyanMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

const robeBody = new THREE.Mesh(new THREE.ConeGeometry(0.68, 1.65, 16), velvetMat);

const robeTrimRing = new THREE.Mesh(new THREE.TorusGeometry(0.67, 0.035, 8, 24), goldTrimMat);

const capeMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.72, 1.45, 10, 1, true, Math.PI * 0.65, Math.PI * 0.7),
      new THREE.MeshStandardMaterial({ color: 0x2e1065, roughness: 0.6, side: THREE.DoubleSide })
    );

capeMesh.position.set(0, 0.88, -0.05);

playerGroup.add(capeMesh);

const mageHead = new THREE.Mesh(new THREE.SphereGeometry(0.30, 16, 16), new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 }));

const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), arcaneCyanMat);

const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), arcaneCyanMat);

const hatBrim = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.65, 0.05, 20), velvetMat);

const hatBand = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.03, 8, 20), goldTrimMat);

const hatCone = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.85, 16), velvetMat);

const staffGroup = new THREE.Group();

const staffShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.042, 2.15, 10), goldTrimMat);

const staffHeadRing = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.03, 10, 24), goldTrimMat);

const staffCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), arcaneCyanMat);

const mageAuraRing = new THREE.Mesh(
      new THREE.RingGeometry(0.82, 0.94, 32),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.65 })
    );

const playerLight = new THREE.PointLight(0x38bdf8, 1.5, 12);

playerLight.position.set(0, 2.2, 0.3);

playerGroup.add(playerLight);

const famHalo1 = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 8, 24), new THREE.MeshBasicMaterial({ color: 0xfef08a }));

const famHalo2 = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.025, 8, 24), new THREE.MeshBasicMaterial({ color: 0x7dd3fc }));

scene.add(playerGroup);

const waypointRing = new THREE.Mesh(
      new THREE.RingGeometry(0.35, 0.55, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide })
    );

scene.add(waypointRing);

let shockwaveMeshes = [];

let arcaneSlashes = [];

let ambientParticles = null;

const groundPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(68, 68),
      new THREE.MeshStandardMaterial({ color: 0x111d1c, roughness: 0.85, metalness: 0.15 })
    );

scene.add(groundPlane);

function cleanupOverworldProjectiles() {
      for (let i = arcaneSlashes.length - 1; i >= 0; i--) {
        scene.remove(arcaneSlashes[i].mesh);
      }
      arcaneSlashes = [];
    }

function spawnFloating3DDamage(worldX, worldY, worldZ, text, isCrit = false) {
      const proj = new THREE.Vector3(worldX, worldY, worldZ);
      proj.project(camera);
      if (proj.z > 1) return;
      const sx = (proj.x * 0.5 + 0.5) * threeHost.clientWidth;
      const sy = (-proj.y * 0.5 + 0.5) * threeHost.clientHeight;
      const el = document.createElement('div');
      el.className = `floating-dmg-popup font-epic font-black ${isCrit ? 'text-xl text-amber-300' : 'text-base text-cyan-200'}`;
      el.style.left = `${sx}px`;
      el.style.top = `${sy}px`;
      el.textContent = text;
      worldDmgLayer.appendChild(el);
      setTimeout(() => el.remove(), 920);
    }

function createRunePortal3D(x, z, colorHex) {
      const g = new THREE.Group();
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.3, 0.11, 12, 32),
        new THREE.MeshStandardMaterial({ color: colorHex, emissive: colorHex, emissiveIntensity: 0.9, metalness: 0.8 })
      );
      ring.position.y = 1.45; g.add(ring);
      const base = new THREE.Mesh(
        new THREE.CylinderGeometry(1.45, 1.65, 0.18, 24),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 })
      );
      base.position.y = 0.09; g.add(base);
      const pLight = new THREE.PointLight(colorHex, 1.4, 9);
      pLight.position.y = 1.8; g.add(pLight);
      g.position.set(x, 0, z);
      biomeGroup.add(g);
      return g;
    }

function createSealedChest3D(chest) {
      const g = new THREE.Group();
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.75, 0.85),
        new THREE.MeshStandardMaterial({ color: chest.opened ? 0x334155 : 0x78350f, roughness: 0.4, metalness: 0.6 })
      );
      body.position.y = 0.38; body.castShadow = true; g.add(body);

      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(1.26, 0.14, 0.91),
        new THREE.MeshStandardMaterial({ color: chest.opened ? 0x64748b : 0xfbbf24, metalness: 0.85, roughness: 0.25 })
      );
      trim.position.y = 0.72; g.add(trim);

      if (!chest.opened) {
        const sealOrb = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.28, 0),
          new THREE.MeshBasicMaterial({ color: 0x34d399 })
        );
        sealOrb.position.y = 1.35;
        g.add(sealOrb);
        envAnimItems.push({ mesh: sealOrb, type: 'spinFloat', baseY: 1.35, speed: 2.5 });

        const cLight = new THREE.PointLight(0x34d399, 1.3, 8);
        cLight.position.y = 1.4; g.add(cLight);
      }

      g.position.set(chest.x, 0, chest.z);
      biomeGroup.add(g);
      return g;
    }

function createCrystalVein3D(vein) {
      const g = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({
        color: 0x2dd4bf, emissive: 0x0d9488, emissiveIntensity: 0.75, roughness: 0.18, metalness: 0.4
      });
      for (let i = 0; i < 4; i++) {
        const h = 0.9 + i * 0.35;
        const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), mat);
        shard.scale.set(0.75, h * 1.6, 0.75);
        shard.position.set((i - 1.5) * 0.32, h * 0.5, (i % 2) * 0.25);
        shard.rotation.z = (i - 1.5) * 0.25;
        shard.castShadow = true;
        g.add(shard);
      }
      const vLight = new THREE.PointLight(0x2dd4bf, 1.1, 7);
      vLight.position.y = 1.2; g.add(vLight);
      g.position.set(vein.x, 0, vein.z);
      biomeGroup.add(g);
      return g;
    }

function createNPC3D(npc) {
      const g = new THREE.Group();
      if (npc.propType === 'monolith') {
        const stone = new THREE.Mesh(new THREE.BoxGeometry(1.15, 2.4, 0.45), new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.65, metalness: 0.4 }));
        stone.position.y = 1.2; stone.castShadow = true; g.add(stone);
        const crystalTop = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), new THREE.MeshBasicMaterial({ color: npc.orbColor }));
        crystalTop.position.y = 2.8; g.add(crystalTop);
      } else {
        const robe = new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.6, 14), new THREE.MeshStandardMaterial({ color: npc.robeColor || 0x1e1b4b, roughness: 0.55 }));
        robe.position.y = 0.8; robe.castShadow = true; g.add(robe);
        const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), new THREE.MeshStandardMaterial({ color: 0xe2c6a6, roughness: 0.6 }));
        head.position.y = 1.72; g.add(head);
        if (npc.hatColor) {
          const hat = new THREE.Mesh(new THREE.ConeGeometry(0.36, 0.75, 14), new THREE.MeshStandardMaterial({ color: npc.hatColor, roughness: 0.5 }));
          hat.position.y = 2.22; g.add(hat);
        }
        if (npc.propType === 'anvil') {
          const anvil = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 0.45), new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.85, roughness: 0.25 }));
          anvil.position.set(1.05, 0.28, 0.2); anvil.castShadow = true; g.add(anvil);
        }
        if (npc.propType === 'crystal') {
          const crys = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x0d9488, emissiveIntensity: 0.7 }));
          crys.position.set(1.0, 0.65, 0.2); g.add(crys);
        }
        const questDiamond = new THREE.Mesh(new THREE.OctahedronGeometry(0.24, 0), new THREE.MeshBasicMaterial({ color: npc.orbColor || 0xfacc15 }));
        questDiamond.position.y = 2.65; g.add(questDiamond);
      }
      const nLight = new THREE.PointLight(npc.orbColor || 0xfacc15, 1.1, 7);
      nLight.position.y = 2.0; g.add(nLight);
      g.position.set(npc.x, 0, npc.z);
      biomeGroup.add(g);
      return g;
    }

const raycaster = new THREE.Raycaster();

const pointerNDC = new THREE.Vector2();

const radarCanvas = document.getElementById('radarCanvas');

const radarCtx = radarCanvas.getContext('2d');

function drawMiniRadar() {
      const w = radarCanvas.width, h = radarCanvas.height;
      const cx = w / 2, cy = h / 2, r = cx - 3;
      radarCtx.clearRect(0, 0, w, h);

      radarCtx.strokeStyle = 'rgba(212, 168, 83, 0.35)';
      radarCtx.lineWidth = 1;
      radarCtx.beginPath(); radarCtx.arc(cx, cy, r * 0.55, 0, Math.PI * 2); radarCtx.stroke();

      radarCtx.fillStyle = '#38bdf8';
      radarCtx.beginPath(); radarCtx.arc(cx, cy, 3.2, 0, Math.PI * 2); radarCtx.fill();

      const scale = r / 24;
      worldEntities.forEach(ent => {
        if ((ent.kind === 'monster' || ent.kind === 'vein') && ent.ref.respawnTimer > 0) return;
        const dx = (ent.x - gameState.playerPos.x) * scale;
        const dz = (ent.z - gameState.playerPos.z) * scale;
        if (Math.hypot(dx, dz) > r) return;

        if (ent.kind === 'monster') {
          radarCtx.fillStyle = ent.ref.isBoss ? '#ff2a55' : '#f43f5e';
        } else if (ent.kind === 'chest') {
          radarCtx.fillStyle = ent.ref.opened ? '#64748b' : '#34d399';
        } else if (ent.kind === 'vein') {
          radarCtx.fillStyle = '#2dd4bf';
        } else {
          radarCtx.fillStyle = ent.ref.portalColor ? '#22d3ee' : '#facc15';
        }
        radarCtx.beginPath();
        radarCtx.arc(cx + dx, cy + dz, ent.ref.isBoss ? 3.5 : 2.5, 0, Math.PI * 2);
        radarCtx.fill();
      });
    }

function renderBagModal() {
      const stats = getPlayerTotalStats();

      document.getElementById('bag-mat-ore').textContent = gameState.materials.ore;
      document.getElementById('bag-mat-wood').textContent = gameState.materials.wood;
      document.getElementById('bag-mat-string').textContent = gameState.materials.string;
      document.getElementById('bag-mat-thunder').textContent = gameState.materials.thunder;
      document.getElementById('bag-mat-core').textContent = gameState.materials.core;

      document.getElementById('armory-total-cp').textContent = stats.combatPower.toLocaleString();
      document.getElementById('armory-stat-atk').textContent = `${stats.totalAtk}${stats.weaponBroken ? '(損)' : ''}`;
      document.getElementById('armory-stat-def').textContent = stats.totalDef;
      document.getElementById('armory-stat-mp').textContent = stats.maxMana;
      document.getElementById('armory-stat-hp').textContent = stats.effectiveMaxHp;

      const setListEl = document.getElementById('armory-set-list');
      const activeSetLines = [];
      Object.keys(stats.setCounts).forEach(sKey => {
        const cnt = stats.setCounts[sKey];
        if (cnt >= 2) {
          const sInfo = gearSetsData[sKey];
          activeSetLines.push(`<div class="${sInfo.color} font-bold">★ ${sInfo.name} (${cnt}/4)：${sInfo.bonus2}</div>`);
          if (cnt >= 4) activeSetLines.push(`<div class="text-emerald-300 font-black pl-3">✦ ${sInfo.bonus4}</div>`);
        }
      });
      setListEl.innerHTML = activeSetLines.length > 0
        ? activeSetLines.join('')
        : '<span class="text-slate-500">穿戴 2 件或 4 件同系列裝備（星詠 / 狂雷 / 永凍）可啟動共鳴套裝效果！</span>';

      const w = stats.weapon;
      if (w) {
        const pct = Math.round((w.durability / w.maxDurability) * 100);
        document.getElementById('armory-dur-text').textContent = `${w.durability}/${w.maxDurability} (${pct}%)`;
        const bar = document.getElementById('armory-dur-bar');
        bar.style.width = `${pct}%`;
        bar.className = pct <= 0 ? 'h-full bg-rose-600' : (pct <= 35 ? 'h-full bg-amber-500' : 'h-full bg-gradient-to-r from-amber-500 to-emerald-400');
      } else {
        document.getElementById('armory-dur-text').textContent = '未裝備';
        document.getElementById('armory-dur-bar').style.width = '0%';
      }

      const ar = stats.armor;
      if (ar) {
        const arPct = Math.round((ar.durability / ar.maxDurability) * 100);
        document.getElementById('armory-armor-dur-text').textContent = `${ar.durability}/${ar.maxDurability} (${arPct}%)`;
        const arBar = document.getElementById('armory-armor-dur-bar');
        arBar.style.width = `${arPct}%`;
        arBar.className = arPct <= 0 ? 'h-full bg-rose-600' : (arPct <= 35 ? 'h-full bg-amber-500' : 'h-full bg-gradient-to-r from-sky-500 to-cyan-300');
      } else {
        document.getElementById('armory-armor-dur-text').textContent = '未裝備';
        document.getElementById('armory-armor-dur-bar').style.width = '0%';
      }

      const slotWatermarks = { weapon: '🪄', offhand: '🎵', armor: '🧥', relic: '🔮' };
      ['weapon', 'offhand', 'armor', 'relic'].forEach(slotName => {
        const item = stats[slotName];
        const sqEl = document.getElementById(`sq-slot-${slotName}`);
        if (!item) {
          sqEl.className = 'equip-square-slot w-full max-w-[78px] mx-auto rounded-xl bg-slate-950/90 border-2 border-dashed border-slate-600 flex flex-col items-center justify-center cursor-pointer hover:border-amber-400';
          sqEl.innerHTML = `<span class="text-xl opacity-35">${slotWatermarks[slotName]}</span><span class="text-[11px] font-black text-slate-400 mt-0.5">+ 空置</span>`;
          sqEl.onclick = () => { gameState.bagFilter = slotName; syncBagFilterButtons(); renderBagModal(); };
        } else {
          sqEl.className = `equip-square-slot w-full max-w-[78px] mx-auto rounded-xl rarity-${item.rarity} flex flex-col items-center justify-center cursor-pointer hover:brightness-110`;
          sqEl.innerHTML = `
            <div class="absolute top-1 left-1">${getRarityBadgeHTML(item.rarity)}</div>
            <span class="text-3xl mt-1 drop-shadow">${item.icon}</span>
            ${item.level > 0 ? `<span class="absolute bottom-1 right-1 bg-slate-950/90 border border-amber-400 text-amber-300 text-[9px] font-black px-1 rounded">+${item.level}</span>` : ''}
          `;
          sqEl.onclick = () => { gameState.selectedBagItemId = item.id; renderBagModal(); };
        }
      });

      const grid = document.getElementById('bag-items-grid');
      grid.innerHTML = '';
      let ownedList = gearCatalog.filter(g => g.owned && (gameState.bagFilter === 'all' || g.slot === gameState.bagFilter));

      if (gameState.bagSortRarity) {
        const rank = { SSR: 4, SR: 3, R: 2, N: 1 };
        ownedList.sort((a, b) => (rank[b.rarity] - rank[a.rarity]) || (b.level - a.level));
      }

      if (!ownedList.some(g => g.id === gameState.selectedBagItemId) && ownedList.length > 0) {
        gameState.selectedBagItemId = ownedList[0].id;
      }

      ownedList.forEach(item => {
        const isEq = Object.values(gameState.equipped).includes(item.id);
        const isSel = gameState.selectedBagItemId === item.id;
        const tile = document.createElement('div');
        tile.draggable = true;
        tile.className = `relative aspect-square rounded-xl rarity-${item.rarity} flex flex-col items-center justify-center p-1 cursor-pointer transition ${isSel ? 'ring-2 ring-cyan-300 scale-105 z-10' : 'opacity-90 hover:opacity-100'}`;
        tile.innerHTML = `
          <div class="absolute top-1 left-1">${getRarityBadgeHTML(item.rarity)}</div>
          ${isEq ? `<span class="absolute top-1 right-1 bg-emerald-500 text-slate-950 text-[8px] font-black px-1 rounded shadow">已裝備</span>` : ''}
          <span class="text-2xl sm:text-3xl mt-1 pointer-events-none">${item.icon}</span>
          <span class="text-[9px] font-bold text-slate-200 truncate w-full text-center px-0.5 mt-0.5 pointer-events-none">${item.name}</span>
          ${item.level > 0 ? `<span class="absolute bottom-4 right-1 bg-slate-950/90 border border-amber-400 text-amber-300 text-[8px] font-black px-1 rounded">+${item.level}</span>` : ''}
        `;
        tile.addEventListener('click', () => { gameState.selectedBagItemId = item.id; renderBagModal(); });
        tile.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', item.id); gameState.selectedBagItemId = item.id; });
        grid.appendChild(tile);
      });

      const inspector = document.getElementById('armory-inspector-card');
      const selItem = gearCatalog.find(g => g.id === gameState.selectedBagItemId) || ownedList[0];
      if (!selItem) {
        inspector.innerHTML = `<div class="text-xs text-slate-400 text-center py-4">暫無此分類裝備，可前往鍛造爐重鑄！</div>`;
        return;
      }

      const selStats = getItemStats(selItem);
      const isCurrentlyEquipped = Object.values(gameState.equipped).includes(selItem.id);
      const currentSlotItem = stats[selItem.slot];
      const curSlotStats = getItemStats(currentSlotItem);

      const diffAtk = selStats.atk - curSlotStats.atk;
      const diffDef = selStats.def - curSlotStats.def;
      const diffMp  = selStats.mpBonus - curSlotStats.mpBonus;
      const setTagHtml = selItem.setId && gearSetsData[selItem.setId]
        ? `<span class="px-1.5 py-0.2 rounded bg-purple-950 border border-purple-500/60 text-purple-200 text-[10px] font-bold">✦ ${gearSetsData[selItem.setId].name}</span>`
        : '';

      const formatDiff = (val) => {
        if (isCurrentlyEquipped || val === 0) return '';
        return val > 0 ? `<span class="text-emerald-400 font-black ml-1">▲+${val}</span>` : `<span class="text-rose-400 font-black ml-1">▼${val}</span>`;
      };

      inspector.innerHTML = `
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="w-12 h-12 rounded-xl rarity-${selItem.rarity} flex items-center justify-center text-3xl shrink-0">
              ${selItem.icon}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-1.5">
                ${getRarityBadgeHTML(selItem.rarity)}
                <span class="px-1.5 py-0.2 rounded bg-slate-800 text-cyan-300 text-[10px] font-bold">${getSlotChineseName(selItem.slot)}</span>
                ${setTagHtml}
                <span class="font-black text-sm text-amber-200">${selItem.name} ${selItem.level > 0 ? `+${selItem.level}` : ''}</span>
              </div>
              <div class="text-[11px] text-slate-400 mt-0.5">${selItem.desc}</div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-1.5 bg-slate-950/90 p-2 rounded-lg border border-slate-800 text-[11px]">
          <div><span class="text-slate-400">魔攻：</span><b class="text-rose-300">+${selStats.atk}</b>${formatDiff(diffAtk)}</div>
          <div><span class="text-slate-400">護甲：</span><b class="text-sky-300">+${selStats.def}</b>${formatDiff(diffDef)}</div>
          <div><span class="text-slate-400">魔導：</span><b class="text-cyan-300">+${selStats.mpBonus}</b>${formatDiff(diffMp)}</div>
        </div>

        <div class="flex gap-2">
          <button onclick="toggleEquipItem('${selItem.id}')" class="flex-1 py-2 rounded-xl font-black text-xs transition ${isCurrentlyEquipped ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/50' : 'btn-arcane-gold'}">
            ${isCurrentlyEquipped ? '卸下此裝備' : '⚔️ 穿戴裝備'}
          </button>
          <button onclick="openForgeForItem()" class="px-3.5 py-2 rounded-xl btn-arcane-dark font-bold text-xs text-amber-200">
            ⚒️ 強化 / 修復
          </button>
        </div>
      `;
    }

function trigger3DShockwave(colorHex) {
      const geo = new THREE.RingGeometry(0.4, 0.85, 32);
      const mat = new THREE.MeshBasicMaterial({ color: colorHex, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = -Math.PI / 2;
      mesh.position.set(gameState.playerPos.x, 0.15, gameState.playerPos.z);
      scene.add(mesh);
      shockwaveMeshes.push({ mesh, scale: 1, alpha: 0.95 });
    }

function triggerScreenShake() {
      const vp = document.getElementById('viewport-container');
      vp.classList.remove('animate-shake');
      void vp.offsetWidth;
      vp.classList.add('animate-shake');
    }

function renderForgeModal() {
      document.getElementById('forge-mat-ore').textContent = gameState.materials.ore;
      document.getElementById('forge-mat-wood').textContent = gameState.materials.wood;
      document.getElementById('forge-mat-string').textContent = gameState.materials.string;
      document.getElementById('forge-mat-thunder').textContent = gameState.materials.thunder;
      document.getElementById('forge-mat-core').textContent = gameState.materials.core;

      const list = document.getElementById('forge-list');
      list.innerHTML = '';
      gearCatalog.forEach(item => {
        const card = document.createElement('div');
        card.className = 'arcane-subpanel rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5';
        if (!item.owned && item.craftCost) {
          const c = item.craftCost;
          const can = gameState.materials.ore >= c.ore && gameState.materials.wood >= c.wood && gameState.materials.string >= c.string && gameState.materials.thunder >= (c.thunder || 0) && gameState.materials.core >= (c.core || 0);
          card.innerHTML = `
            <div class="flex items-start gap-2.5">
              <span class="text-2xl">${item.icon}</span>
              <div>
                <div class="flex items-center gap-1.5">
                  ${getRarityBadgeHTML(item.rarity)}
                  <span class="text-[10px] text-cyan-300 font-bold">[${getSlotChineseName(item.slot)}]</span>
                  <span class="font-black text-xs text-amber-200">${item.name}</span>
                </div>
                <div class="text-[10px] text-slate-300">魔攻+${item.baseAtk} 護甲+${item.baseDef} MP+${item.mpBonus} — ${item.desc}</div>
                <div class="text-[10px] font-bold text-amber-300 mt-0.5">素材：🪨${c.ore} 🪵${c.wood} ✨${c.string}${c.thunder ? ` ⚡${c.thunder}` : ''}${c.core ? ` 💠${c.core}` : ''}</div>
              </div>
            </div>
            <button onclick="craftGear('${item.id}')" ${can ? '' : 'disabled'} class="px-3.5 py-1.5 rounded-lg font-black text-xs shrink-0 ${can ? 'btn-arcane-gold' : 'bg-slate-900 text-slate-600'}">⚒️ 鍛造</button>
          `;
        } else {
          const s = getItemStats(item);
          const hasDur = item.slot === 'weapon' || item.slot === 'armor';
          const canRep = hasDur && item.durability < item.maxDurability && gameState.materials.ore >= 1 && gameState.materials.wood >= 1;
          const upg = { ore: 2 + item.level * 2, wood: 2 + item.level, string: 1 + Math.floor(item.level / 2) };
          const canUpg = item.level < 5 && gameState.materials.ore >= upg.ore && gameState.materials.wood >= upg.wood && gameState.materials.string >= upg.string;
          card.innerHTML = `
            <div class="flex items-start gap-2.5">
              <span class="text-2xl">${item.icon}</span>
              <div>
                <div class="flex items-center gap-1.5">
                  ${getRarityBadgeHTML(item.rarity)}
                  <span class="text-[10px] text-cyan-300 font-bold">[${getSlotChineseName(item.slot)}]</span>
                  <span class="font-black text-xs text-amber-200">${item.name} +${item.level}</span>
                </div>
                <div class="text-[10px] text-slate-300">魔攻+${s.rawAtk} 護甲+${s.rawDef} MP+${s.mpBonus} ${hasDur ? `｜ 耐久 ${item.durability}/${item.maxDurability}` : ''}</div>
                ${item.enchant ? `<div class="text-[10px] font-bold text-purple-300 mt-0.5">🔮 附魔詞條：${item.enchant.name}</div>` : ''}
              </div>
            </div>
            <div class="flex gap-1.5 shrink-0">
              ${hasDur ? `<button onclick="repairGear('${item.id}')" ${canRep ? '' : 'disabled'} class="px-2.5 py-1 rounded-lg text-xs font-bold ${canRep ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-900 text-slate-600'}">🔧 修復(🪨1🪵1)</button>` : ''}
              <button onclick="enchantGear('${item.id}')" ${gameState.materials.core >= 1 ? '' : 'disabled'} class="px-2.5 py-1 rounded-lg text-xs font-bold ${gameState.materials.core >= 1 ? 'bg-purple-800 hover:bg-purple-700 text-purple-100 border border-purple-400/60' : 'bg-slate-900 text-slate-600'}" title="消耗 1 顆魔王結晶洗煉隨機共鳴詞條">🔮 附魔(💠1)</button>
              <button onclick="upgradeGear('${item.id}')" ${canUpg ? '' : 'disabled'} class="px-2.5 py-1 rounded-lg text-xs font-black ${canUpg ? 'btn-arcane-gold' : 'bg-slate-900 text-slate-600'}">${item.level >= 5 ? 'MAX' : `⬆️ +${item.level + 1} (🪨${upg.ore}🪵${upg.wood}✨${upg.string})`}</button>
            </div>
          `;
        }
        list.appendChild(card);
      });
    }

function drawTrebleStaffNotes(noteIds, highlightIdx = -1) {
      const sc = document.getElementById('staffCanvas');
      if (!sc) return;
      const sctx = sc.getContext('2d');
      sctx.clearRect(0, 0, sc.width, sc.height);

      const bottomLineY = 74, stepPx = 5.5;
      sctx.strokeStyle = '#64748b';
      sctx.lineWidth = 1.4;
      for (let line = 0; line < 5; line++) {
        const y = bottomLineY - line * (stepPx * 2);
        sctx.beginPath();
        sctx.moveTo(22, y);
        sctx.lineTo(sc.width - 22, y);
        sctx.stroke();
      }

      sctx.fillStyle = '#facc15';
      sctx.font = '48px serif';
      sctx.fillText('𝄞', 24, 76);

      if (!Array.isArray(noteIds) || noteIds.length === 0) return;

      const usableWidth = sc.width - 135;
      const spacing = Math.min(72, Math.max(36, usableWidth / Math.max(1, noteIds.length)));

      noteIds.forEach((nId, idx) => {
        const nObj = sound.getNoteById(nId);
        if (!nObj) return;
        const nx = 95 + idx * spacing;
        const ny = bottomLineY - (nObj.staffStep - 2) * stepPx;
        const isActive = idx === highlightIdx;

        if (nObj.staffStep === 0) {
          sctx.strokeStyle = isActive ? '#fde047' : '#e2e8f0';
          sctx.lineWidth = 1.6;
          sctx.beginPath();
          sctx.moveTo(nx - 14, ny);
          sctx.lineTo(nx + 14, ny);
          sctx.stroke();
        }

        if (nObj.isBlack || nId.includes('#')) {
          sctx.fillStyle = isActive ? '#fde047' : '#f472b6';
          sctx.font = 'bold 14px sans-serif';
          sctx.fillText('♯', nx - 19, ny + 5);
        }

        if (isActive) {
          sctx.save();
          sctx.fillStyle = 'rgba(250, 204, 21, 0.32)';
          sctx.beginPath();
          sctx.arc(nx, ny, 14, 0, Math.PI * 2);
          sctx.fill();
          sctx.restore();
        }

        sctx.fillStyle = isActive ? '#facc15' : '#38bdf8';
        sctx.beginPath();
        sctx.ellipse(nx, ny, 7.5, 5, -0.25, 0, Math.PI * 2);
        sctx.fill();

        sctx.strokeStyle = isActive ? '#facc15' : '#38bdf8';
        sctx.lineWidth = 1.8;
        sctx.beginPath();
        if (nObj.staffStep >= 6) {
          sctx.moveTo(nx - 6.5, ny);
          sctx.lineTo(nx - 6.5, ny + 24);
        } else {
          sctx.moveTo(nx + 6.5, ny);
          sctx.lineTo(nx + 6.5, ny - 24);
        }
        sctx.stroke();

        sctx.fillStyle = isActive ? '#fef08a' : '#94a3b8';
        sctx.font = 'bold 10px sans-serif';
        sctx.fillText(`${idx + 1}`, nx - 3, 98);
      });
    }

function spawnRhythmParticles(x, y, color) {
      for (let i = 0; i < 10; i++) {
        const ang = (Math.PI * 2 * i) / 10;
        gatherState.particles.push({
          x, y,
          vx: Math.cos(ang) * (1.8 + Math.random() * 2.5),
          vy: Math.sin(ang) * (1.8 + Math.random() * 2.5),
          life: 1.0,
          color
        });
      }
    }

window.addEventListener('resize', () => {
      camera.aspect = threeHost.clientWidth / threeHost.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(threeHost.clientWidth, threeHost.clientHeight);
      if (!gatherModal.classList.contains('hidden')) resizeRhythmCanvas();
    });

const clock = new THREE.Clock();

const tempVec = new THREE.Vector3();

window.onload = function() {
      animate();
    };
