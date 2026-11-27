// Auto-modularized section: js/data/game-catalog.js

/**
     * ============================================================================
     * 2. WORLD CHAPTERS, NPCS, MONSTERS, SEALED CHESTS, VEINS, TITLES & 26 GEAR
     * ============================================================================
     */

const biomesData = {
      ch1: {
        id: 'ch1', title: '🌑 第一章 · 黑曜和諧荒野', subtitle: 'C大調白鍵 · 和弦共鳴',
        fogColor: 0x091018, groundColor: 0x111d1c, accentColor: 0xd9a74a,
        desc: '黑曜石玄武岩與星辰火炬照亮嘅暮色荒野。探索角落可發現「封印音律寶箱」與可劈開嘅「共鳴水晶礦脈」。'
      },
      ch2: {
        id: 'ch2', title: '⚡ 第二章 · 雷鳴銅管峽谷', subtitle: '12音半音階（含升記號 # 黑鍵）',
        fogColor: 0x180f08, groundColor: 0x24160e, accentColor: 0xf59e0b,
        desc: '狂雷與黃銅鑄造嘅峽谷！附近游蕩著半音階銅管魔像與失真雷狼，並散落著雷鳴寶箱。'
      },
      ch3: {
        id: 'ch3', title: '❄️ 第三章 · 永凍星辰聖殿', subtitle: '音程辨識（大三度 / 純五度）',
        fogColor: 0x071022, groundColor: 0x0e1a30, accentColor: 0x38bdf8,
        desc: '極光籠罩嘅星界冰晶神殿，終極 Boss「寂靜大天使」盤踞於北方祭壇。'
      }
    };

const biomeNPCsMap = {
      ch1: [
        {
          id: 'npc_orpheus', type: 'mentor', name: '大魔導師 · 奧菲斯', role: 'Arcane Music Archmage', avatar: '🧙‍♂️',
          x: -3.5, z: 2.5, robeColor: 0x1e1b4b, hatColor: 0x312e81, orbColor: 0x38bdf8,
          dialogue: '「歡迎來到黑曜荒野！按 [空白鍵 / J] 揮出『奧術音刃』可斬擊魔物或劈開野生水晶礦脈；戰鬥失誤時抓準金色光環按 [空白鍵] 更可觸發『完美節拍格擋』！」',
          actionLabel: '🎵 接受魔導音律試煉 (+MP & 經驗)', actionType: 'trial'
        },
        {
          id: 'npc_bach', type: 'forge', name: '矮人鍛造師 · 巴赫', role: 'Master Rune Blacksmith', avatar: '⚒️',
          x: -7.5, z: -2.0, robeColor: 0x78350f, propType: 'anvil', orbColor: 0xf59e0b,
          dialogue: '「戰鬥磨損會降低指揮杖與法袍威力！把採集到的音律礦石與共鳴古木交給我，我替你修復並重鑄四槽神兵！」',
          actionLabel: '⚒️ 開啟黑鐵共鳴鍛造爐', actionType: 'forge'
        },
        {
          id: 'npc_mimi', type: 'gather', name: '採集精靈 · 咪咪', role: 'Crystal Vein Sprite', avatar: '🧚‍♀️',
          x: 6.5, z: 2.0, robeColor: 0x0f766e, propType: 'crystal', orbColor: 0x2dd4bf,
          dialogue: '「水晶礦脈升級至 3.0 啦！支援隨機古典名曲曲庫、AI 即時作曲、長按滑條與真實樂器麥克風收音！」',
          actionLabel: '⛏️ 進入節奏採集 3.0 / 調音器', actionType: 'gather'
        },
        {
          id: 'npc_siren', type: 'familiar', name: '樂靈馴養師 · 賽蓮', role: 'Astral Familiar Keeper', avatar: '🦉',
          x: 4.5, z: -4.5, robeColor: 0x4c1d95, orbColor: 0xc084fc,
          dialogue: '「餵食採集素材可以讓星界樂靈升星覺醒（1★ → 3★）！覺醒後在節奏採集 3.0 中會定期自動幫你接住漏掉的音符！」',
          actionLabel: '🦉 管理與升星隨行樂靈', actionType: 'familiars'
        },
        {
          id: 'tablet_ch1', type: 'sightread', name: '📜 古代五線譜石碑', role: 'Treble Clef Monolith', avatar: '📜',
          x: 0, z: 11.5, propType: 'monolith', orbColor: 0x38bdf8,
          dialogue: '「石碑上刻劃著古老的高音譜號五線譜。辨識音符高度並以魔導指揮杖奏響，即可獲得魔力洗禮！」',
          actionLabel: '📜 進行高音譜號識譜試煉', actionType: 'sightread'
        }
      ],
      ch2: [
        {
          id: 'npc_wagner', type: 'forge', name: '雷鳴鐵匠 · 華格納', role: 'Thunder Brass Forgemaster', avatar: '⚡',
          x: -6.5, z: 2.5, robeColor: 0x92400e, propType: 'anvil', orbColor: 0xfacc15,
          dialogue: '「雷鳴峽谷的魔獸披著半音階重甲！快用你採集到的『雷霆共振石』鍛造《雷霆共振電結他杖》吧！」',
          actionLabel: '⚒️ 開啟雷鳴鍛造爐', actionType: 'forge'
        },
        {
          id: 'npc_paganini', type: 'mentor', name: '峽谷流浪樂師 · 帕格尼尼', role: 'Chromatic Virtuoso', avatar: '🎻',
          x: 6.0, z: 2.5, robeColor: 0x7f1d1d, orbColor: 0xf43f5e,
          dialogue: '「掌握 C#、F#、G# 等升記號黑鍵，才能演奏出疾風驟雨般的狂想曲！」',
          actionLabel: '🎹 挑戰 12 音半音階試煉', actionType: 'trial_chromatic'
        },
        {
          id: 'npc_mimi_2', type: 'gather', name: '雷晶採集者 · 咪咪', role: 'Thunder Vein Sprite', avatar: '🧚‍♀️',
          x: 0, z: 9.5, robeColor: 0x0f766e, propType: 'crystal', orbColor: 0x2dd4bf,
          dialogue: '「峽谷礦脈蘊含高能雷霆共振石，快來演奏滑條音符觸發 FEVER 採集吧！」',
          actionLabel: '⛏️ 採集雷鳴礦脈 3.0', actionType: 'gather'
        }
      ],
      ch3: [
        {
          id: 'npc_debussy', type: 'mentor', name: '星界占星師 · 德布西', role: 'Celestial Interval Sage', avatar: '🌌',
          x: -5.5, z: 3.0, robeColor: 0x1e3a8a, orbColor: 0x38bdf8,
          dialogue: '「大三度、純四度與純五度構成了宇宙星辰軌道。準備好迎接二階段狂暴的寂靜大天使了嗎？」',
          actionLabel: '❄️ 進行星界音程試煉', actionType: 'trial_intervals'
        },
        {
          id: 'npc_warden', type: 'forge', name: '星殿鑄造官 · 奧古斯都', role: 'Astral Armory Keeper', avatar: '🛡️',
          x: 5.5, z: 3.0, robeColor: 0x312e81, propType: 'anvil', orbColor: 0x818cf8,
          dialogue: '「以魔王結晶與星辰琴弦鑄造終極聖兵《星界交響大魔導杖》，粉碎寂靜大天使的領域！」',
          actionLabel: '⚒️ 鍛造終極星界神兵', actionType: 'forge'
        }
      ]
    };

// Sealed Musical Treasure Chests & Slashable Crystal Veins across the 3 Biomes

const biomeChestsMap = {
      ch1: [
        { id: 'chest_ch1_1', name: '封印音律寶箱·荒野遺寶', x: -13.5, z: -10.5, theory: 'white', noteCount: 3, rewardGearPool: ['ivory_chant_sword', 'silver_lyre_offhand', 'silver_resonance_mail'], rewardCore: 0, opened: false },
        { id: 'chest_ch1_2', name: '封印音律寶箱·星辰秘匣', x: 14.0, z: -11.5, theory: 'white', noteCount: 3, rewardGearPool: ['mithril_harp_rapier', 'golden_tuning_fork', 'astral_staff_crest'], rewardCore: 1, opened: false }
      ],
      ch2: [
        { id: 'chest_ch2_1', name: '封印音律寶箱·雷鳴銅匣', x: -13.5, z: -10.5, theory: 'chromatic', noteCount: 3, rewardGearPool: ['thunder_stratocaster', 'thunder_amplifier_orb', 'thunderplate_cuirass'], rewardCore: 1, opened: false },
        { id: 'chest_ch2_2', name: '封印音律寶箱·深淵黑匣', x: 14.0, z: -11.5, theory: 'chromatic', noteCount: 3, rewardGearPool: ['abyssal_bass_scythe', 'dragon_horn_resonator', 'crimson_distortion_pick'], rewardCore: 1, opened: false }
      ],
      ch3: [
        { id: 'chest_ch3_1', name: '封印音律寶箱·永凍聖匣', x: -13.5, z: -10.5, theory: 'intervals', noteCount: 2, rewardGearPool: ['glacial_organ_scepter', 'frost_chime_censer', 'glacial_choir_vestments'], rewardCore: 1, opened: false },
        { id: 'chest_ch3_2', name: '封印音律寶箱·星界神匣', x: 14.0, z: -11.5, theory: 'intervals', noteCount: 2, rewardGearPool: ['astral_symphony_greatsword', 'celestial_grimoire', 'dragonscale_symphony_armor', 'silence_breaker_sigil'], rewardCore: 2, opened: false }
      ]
    };

const biomeVeinsMap = {
      ch1: [
        { id: 'vein_1_1', name: '共鳴水晶礦脈', x: 11.5, z: -3.5, hp: 2, maxHp: 2, respawnTimer: 0 },
        { id: 'vein_1_2', name: '共鳴水晶礦脈', x: -11.5, z: -5.5, hp: 2, maxHp: 2, respawnTimer: 0 },
        { id: 'vein_1_3', name: '星輝古木礦簇', x: 7.5, z: 10.5, hp: 2, maxHp: 2, respawnTimer: 0 }
      ],
      ch2: [
        { id: 'vein_2_1', name: '雷霆共振礦脈', x: 11.5, z: -3.5, hp: 2, maxHp: 2, respawnTimer: 0 },
        { id: 'vein_2_2', name: '雷霆共振礦脈', x: -11.5, z: -5.5, hp: 2, maxHp: 2, respawnTimer: 0 },
        { id: 'vein_2_3', name: '黃銅共鳴礦簇', x: 7.5, z: 10.5, hp: 2, maxHp: 2, respawnTimer: 0 }
      ],
      ch3: [
        { id: 'vein_3_1', name: '永凍星晶礦脈', x: 11.5, z: -3.5, hp: 2, maxHp: 2, respawnTimer: 0 },
        { id: 'vein_3_2', name: '永凍星晶礦脈', x: -11.5, z: -5.5, hp: 2, maxHp: 2, respawnTimer: 0 },
        { id: 'vein_3_3', name: '極光琴弦礦簇', x: 7.5, z: 10.5, hp: 2, maxHp: 2, respawnTimer: 0 }
      ]
    };

const achievementsCatalog = [
      { id: 'ach_blind_5', title: '👁️ 絕對音感盲聽者', desc: '在隱藏五線譜（盲聽模式）下累計答對 5 次音律序列', target: 5, statKey: 'blindWins', rewardSP: 1, rewardCore: 0 },
      { id: 'ach_parry_5', title: '🛡️ 零傷節拍格擋王', desc: '累計觸發 5 次 PERFECT PARRY 完美音律格擋', target: 5, statKey: 'perfectParries', rewardSP: 1, rewardCore: 1 },
      { id: 'ach_chord_3', title: '🎹 和弦破盾大師', desc: '累計成功辨識並擊破 3 次高階「和弦共鳴題型」', target: 3, statKey: 'chordWins', rewardSP: 1, rewardCore: 0 },
      { id: 'ach_chimes_1', title: '🎐 荒野風鈴解謎者', desc: '成功按音階順序劈響任意章節的 3 座共鳴風鈴柱', target: 1, statKey: 'chimesSolved', rewardSP: 1, rewardCore: 1 },
      { id: 'ach_gear_8', title: '⚔️ 傳奇神兵收藏家', desc: '累計擁有至少 8 件不同魔導裝備或聖印', target: 8, statKey: 'ownedGearCount', rewardSP: 1, rewardCore: 1 },
      { id: 'ach_abyss_5', title: '🌀 深淵征服者', desc: '在「音樂無盡深淵」突破至第 5 層', target: 5, statKey: 'abyssFloor', rewardSP: 2, rewardCore: 1 }
    ];

const biomeMonstersMap = {
      ch1: [
        { id: 'm1_slime', isBoss: false, lv: 1, name: '走音史萊姆', avatar: '🟢', affinity: 'major', theory: 'white', homeX: 4.5, homeZ: -2.5, x: 4.5, z: -2.5, patrolAngle: 0, patrolRadius: 2.2, hp: 85, maxHp: 85, atk: 15, shield: 0, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'piano', noteCount: 1, durabilityCost: 7, rewardMana: 30, rewardExp: 45, rewardMats: { ore: 2, wood: 1, string: 0, thunder: 0, core: 0 }, respawnTimer: 0 },
        { id: 'm1_bat', isBoss: false, lv: 2, name: '噪音夜蝠', avatar: '🦇', affinity: 'minor', theory: 'white', homeX: -3.5, homeZ: -6.5, x: -3.5, z: -6.5, patrolAngle: 1.5, patrolRadius: 2.8, hp: 100, maxHp: 100, atk: 18, shield: 0, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'guitar', noteCount: 2, durabilityCost: 8, rewardMana: 35, rewardExp: 55, rewardMats: { ore: 1, wood: 2, string: 1, thunder: 0, core: 0 }, respawnTimer: 0 },
        { id: 'm1_gargoyle', isBoss: false, lv: 3, name: '荒野石像鬼', avatar: '🗿', affinity: 'major', theory: 'white', homeX: 8.5, homeZ: -7.5, x: 8.5, z: -7.5, patrolAngle: 3.1, patrolRadius: 2.0, hp: 120, maxHp: 120, atk: 22, shield: 1, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'piano', noteCount: 2, durabilityCost: 10, rewardMana: 45, rewardExp: 70, rewardMats: { ore: 3, wood: 2, string: 1, thunder: 0, core: 0 }, respawnTimer: 0 },
        { id: 'boss_malakor', isBoss: true, lv: 5, name: '混沌指揮家·馬拉科爾', avatar: '👑', affinity: 'minor', theory: 'white', homeX: 0, homeZ: -15.5, x: 0, z: -15.5, patrolAngle: 0, patrolRadius: 1.2, hp: 340, maxHp: 340, atk: 35, shield: 2, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'organ', noteCount: 3, durabilityCost: 14, rewardMana: 110, rewardExp: 240, rewardMats: { ore: 5, wood: 4, string: 3, thunder: 1, core: 1 }, respawnTimer: 0 }
      ],
      ch2: [
        { id: 'm2_golem', isBoss: false, lv: 5, name: '半音階銅管魔像', avatar: '🤖', affinity: 'major', theory: 'chromatic', homeX: 5.5, homeZ: -4.0, x: 5.5, z: -4.0, patrolAngle: 0.4, patrolRadius: 2.5, hp: 165, maxHp: 165, atk: 26, shield: 1, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'guitar', noteCount: 2, durabilityCost: 10, rewardMana: 50, rewardExp: 95, rewardMats: { ore: 3, wood: 2, string: 1, thunder: 2, core: 0 }, respawnTimer: 0 },
        { id: 'm2_wolf', isBoss: false, lv: 6, name: '失真雷狼', avatar: '🐺', affinity: 'minor', theory: 'chromatic', homeX: -6.0, homeZ: -5.5, x: -6.0, z: -5.5, patrolAngle: 2.2, patrolRadius: 3.2, hp: 185, maxHp: 185, atk: 31, shield: 1, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'guitar', noteCount: 2, durabilityCost: 12, rewardMana: 60, rewardExp: 120, rewardMats: { ore: 3, wood: 3, string: 2, thunder: 3, core: 0 }, respawnTimer: 0 },
        { id: 'boss_rhapsody', isBoss: true, lv: 8, name: '雷鳴狂想領主', avatar: '⚡', affinity: 'minor', theory: 'chromatic', homeX: 0, homeZ: -16.0, x: 0, z: -16.0, patrolAngle: 0, patrolRadius: 1.5, hp: 430, maxHp: 430, atk: 40, shield: 2, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'guitar', noteCount: 3, durabilityCost: 15, rewardMana: 130, rewardExp: 300, rewardMats: { ore: 5, wood: 4, string: 3, thunder: 4, core: 1 }, respawnTimer: 0 }
      ],
      ch3: [
        { id: 'm3_siren', isBoss: false, lv: 8, name: '寒冰音程塞壬', avatar: '❄️', affinity: 'major', theory: 'intervals', homeX: 5.5, homeZ: -4.5, x: 5.5, z: -4.5, patrolAngle: 0.8, patrolRadius: 2.6, hp: 215, maxHp: 215, atk: 34, shield: 1, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'piano', noteCount: 2, durabilityCost: 12, rewardMana: 70, rewardExp: 150, rewardMats: { ore: 4, wood: 3, string: 3, thunder: 2, core: 0 }, respawnTimer: 0 },
        { id: 'm3_beast', isBoss: false, lv: 9, name: '虛空管風琴獸', avatar: '👁️', affinity: 'minor', theory: 'intervals', homeX: -5.5, homeZ: -5.5, x: -5.5, z: -5.5, patrolAngle: 2.6, patrolRadius: 2.4, hp: 245, maxHp: 245, atk: 38, shield: 2, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'organ', noteCount: 2, durabilityCost: 13, rewardMana: 80, rewardExp: 175, rewardMats: { ore: 4, wood: 4, string: 3, thunder: 3, core: 0 }, respawnTimer: 0 },
        { id: 'boss_seraphiel', isBoss: true, lv: 12, name: '寂靜大天使·塞拉菲爾', avatar: '👼', affinity: 'major', theory: 'intervals', homeX: 0, homeZ: -16.5, x: 0, z: -16.5, patrolAngle: 0, patrolRadius: 1.2, hp: 540, maxHp: 540, atk: 48, shield: 3, stunned: 0, enraged: false, enrageCountdown: 0, instrument: 'organ', noteCount: 2, durabilityCost: 16, rewardMana: 160, rewardExp: 420, rewardMats: { ore: 7, wood: 6, string: 5, thunder: 5, core: 2 }, respawnTimer: 0 }
      ]
    };

const gearSetsData = {
      astral: {
        name: '星詠交響套裝',
        color: 'text-amber-300',
        bonus2: '【2件】魔導攻擊 +18，魔力上限 +35 MP',
        bonus4: '【4件】全奧義傷害 +25%，每次答題額外回復 +8 MP'
      },
      thunder: {
        name: '狂雷失真套裝',
        color: 'text-yellow-300',
        bonus2: '【2件】魔導攻擊 +15，小調共鳴傷害 +18%',
        bonus4: '【4件】普攻與答題附帶雷霆連鎖（+28% 總傷害）'
      },
      glacial: {
        name: '永凍聖詠套裝',
        color: 'text-cyan-300',
        bonus2: '【2件】奧術護甲 +14，生命上限 +55 HP',
        bonus4: '【4件】戰鬥開場自動獲得 50 點聖詠護盾，大調共鳴 +25%'
      }
    };

const defaultGearCatalog = [
      { id: 'rusty_blade', rarity: 'N', setId: null, name: '見習高音譜號魔杖', slot: 'weapon', category: 'piano', affinity: 'neutral', icon: '🪄', baseAtk: 14, baseDef: 0, mpBonus: 10, durability: 60, maxDurability: 60, level: 0, owned: true, desc: '鑲嵌微型共鳴水晶嘅見習魔導指揮杖。', craftCost: null },
      { id: 'ivory_chant_sword', rarity: 'R', setId: 'astral', name: '象牙聖詠指揮杖', slot: 'weapon', category: 'piano', affinity: 'major', icon: '🎼', baseAtk: 26, baseDef: 2, mpBonus: 20, durability: 80, maxDurability: 80, level: 0, owned: false, desc: '【星詠套裝】鋼琴系｜大調共鳴：大調傷害 +20%，星隕協奏 +25%。', craftCost: { ore: 3, wood: 2, string: 1, thunder: 0, core: 0 } },
      { id: 'rosewood_folk_axe', rarity: 'R', setId: null, name: '紫檀共鳴琴弦杖斧', slot: 'weapon', category: 'guitar', affinity: 'major', icon: '🎸', baseAtk: 28, baseDef: 0, mpBonus: 18, durability: 85, maxDurability: 85, level: 0, owned: false, desc: '結他系｜大調共鳴：以千年紫檀木與魔導鋼弦鍛造。', craftCost: { ore: 3, wood: 4, string: 1, thunder: 0, core: 0 } },
      { id: 'mithril_harp_rapier', rarity: 'SR', setId: 'astral', name: '秘銀豎琴星輝杖', slot: 'weapon', category: 'piano', affinity: 'minor', icon: '🎐', baseAtk: 36, baseDef: 3, mpBonus: 35, durability: 90, maxDurability: 90, level: 0, owned: false, desc: '【星詠套裝】鋼琴系｜小調共鳴：冷冽小調銀輝，大幅提升 MP 上限。', craftCost: { ore: 5, wood: 3, string: 2, thunder: 0, core: 0 } },
      { id: 'thunder_stratocaster', rarity: 'SR', setId: 'thunder', name: '雷霆共振電結他杖', slot: 'weapon', category: 'guitar', affinity: 'minor', icon: '⚡', baseAtk: 48, baseDef: 2, mpBonus: 35, durability: 105, maxDurability: 105, level: 0, owned: false, desc: '【狂雷套裝】結他系：蘊含雷鳴峽谷之雷霆共振石，狂雷獨奏 +30%。', craftCost: { ore: 6, wood: 4, string: 2, thunder: 3, core: 0 } },
      { id: 'glacial_organ_scepter', rarity: 'SR', setId: 'glacial', name: '永凍管風琴冰晶杖', slot: 'weapon', category: 'piano', affinity: 'major', icon: '❄️', baseAtk: 52, baseDef: 6, mpBonus: 45, durability: 115, maxDurability: 115, level: 0, owned: false, desc: '【永凍套裝】鋼琴系：極地萬年玄冰雕琢，兼具高防禦與神聖和聲。', craftCost: { ore: 6, wood: 5, string: 3, thunder: 2, core: 0 } },
      { id: 'abyssal_bass_scythe', rarity: 'SSR', setId: 'thunder', name: '深淵重金屬低音戰鐮', slot: 'weapon', category: 'guitar', affinity: 'minor', icon: '🔥', baseAtk: 64, baseDef: 4, mpBonus: 50, durability: 125, maxDurability: 125, level: 0, owned: false, desc: '【狂雷套裝】傳說結他系｜超低頻震波撕裂護盾，暴擊傷害毀天滅地。', craftCost: { ore: 8, wood: 5, string: 3, thunder: 4, core: 1 } },
      { id: 'astral_symphony_greatsword', rarity: 'SSR', setId: 'astral', name: '星界交響大魔導杖', slot: 'weapon', category: 'piano', affinity: 'dual', icon: '🌟', baseAtk: 70, baseDef: 6, mpBonus: 65, durability: 135, maxDurability: 135, level: 0, owned: false, desc: '【星詠套裝】終極神兵｜雙調共鳴：所有音樂奧義傷害 +25%。', craftCost: { ore: 9, wood: 6, string: 4, thunder: 4, core: 1 } },

      { id: 'oak_echo_bell', rarity: 'N', setId: null, name: '橡木共鳴手搖鈴', slot: 'offhand', category: 'offhand', affinity: 'neutral', icon: '🔔', baseAtk: 4, baseDef: 3, mpBonus: 10, durability: 80, maxDurability: 80, level: 0, owned: true, desc: '能穩定魔導波長嘅入門副手共鳴器。', craftCost: null },
      { id: 'silver_lyre_offhand', rarity: 'R', setId: 'astral', name: '銀月吟遊小豎琴', slot: 'offhand', category: 'offhand', affinity: 'major', icon: '🪕', baseAtk: 11, baseDef: 6, mpBonus: 25, durability: 95, maxDurability: 95, level: 0, owned: false, desc: '【星詠套裝】副手共鳴器｜大調時額外增幅魔攻與法力上限。', craftCost: { ore: 3, wood: 3, string: 2, thunder: 0, core: 0 } },
      { id: 'thunder_amplifier_orb', rarity: 'SR', setId: 'thunder', name: '雷鳴真空管共鳴晶球', slot: 'offhand', category: 'offhand', affinity: 'minor', icon: '🔮', baseAtk: 19, baseDef: 8, mpBonus: 40, durability: 110, maxDurability: 110, level: 0, owned: false, desc: '【狂雷套裝】副手共鳴器｜放大電結他與暗影和弦波長，大幅提升魔攻。', craftCost: { ore: 5, wood: 3, string: 2, thunder: 3, core: 0 } },
      { id: 'frost_chime_censer', rarity: 'SR', setId: 'glacial', name: '極光冰鈴聖詠香爐', slot: 'offhand', category: 'offhand', affinity: 'major', icon: '🎐', baseAtk: 16, baseDef: 13, mpBonus: 45, durability: 115, maxDurability: 115, level: 0, owned: false, desc: '【永凍套裝】副手共鳴器｜散發冰晶音霧，兼顧奧術護甲與回魔。', craftCost: { ore: 5, wood: 4, string: 3, thunder: 2, core: 0 } },
      { id: 'dragon_horn_resonator', rarity: 'SSR', setId: 'thunder', name: '古龍號角共鳴器', slot: 'offhand', category: 'offhand', affinity: 'dual', icon: '📯', baseAtk: 26, baseDef: 11, mpBonus: 55, durability: 130, maxDurability: 130, level: 0, owned: false, desc: '【狂雷套裝】傳說副手｜吹響遠古龍吟震懾全場魔物。', craftCost: { ore: 7, wood: 5, string: 3, thunder: 4, core: 1 } },
      { id: 'celestial_grimoire', rarity: 'SSR', setId: 'astral', name: '星辰交響禁典', slot: 'offhand', category: 'offhand', affinity: 'dual', icon: '📘', baseAtk: 29, baseDef: 14, mpBonus: 65, durability: 135, maxDurability: 135, level: 0, owned: false, desc: '【星詠套裝】傳說副手魔導書｜記載宇宙創世和聲，全屬性大幅飛躍！', craftCost: { ore: 8, wood: 5, string: 4, thunder: 3, core: 1 } },

      { id: 'bard_linen_cloak', rarity: 'N', setId: null, name: '午夜天鵝絨魔導袍', slot: 'armor', category: 'armor', affinity: 'neutral', icon: '🧥', baseAtk: 2, baseDef: 6, mpBonus: 15, durability: 70, maxDurability: 70, level: 0, owned: true, desc: '繡有金色五線譜暗紋的魔導師法袍。', craftCost: null },
      { id: 'silver_resonance_mail', rarity: 'R', setId: 'astral', name: '銀絲共鳴魔導法衣', slot: 'armor', category: 'armor', affinity: 'major', icon: '🛡️', baseAtk: 6, baseDef: 16, mpBonus: 25, durability: 95, maxDurability: 95, level: 0, owned: false, desc: '【星詠套裝】MaxHP +30，大幅減輕物理與聲波反擊。', craftCost: { ore: 5, wood: 3, string: 2, thunder: 0, core: 0 } },
      { id: 'thunderplate_cuirass', rarity: 'SR', setId: 'thunder', name: '雷銅星紋重法袍', slot: 'armor', category: 'armor', affinity: 'minor', icon: '🦺', baseAtk: 12, baseDef: 24, mpBonus: 35, durability: 115, maxDurability: 115, level: 0, owned: false, desc: '【狂雷套裝】MaxHP +50，抵禦雷鳴峽谷高壓電流。', craftCost: { ore: 6, wood: 4, string: 2, thunder: 3, core: 0 } },
      { id: 'glacial_choir_vestments', rarity: 'SR', setId: 'glacial', name: '永凍聖詠冰晶法衣', slot: 'armor', category: 'armor', affinity: 'major', icon: '🥼', baseAtk: 10, baseDef: 29, mpBonus: 45, durability: 120, maxDurability: 120, level: 0, owned: false, desc: '【永凍套裝】MaxHP +65，極光結界大幅吸收敵方反擊傷害。', craftCost: { ore: 6, wood: 5, string: 3, thunder: 2, core: 0 } },
      { id: 'abyssal_requiem_mantle', rarity: 'SSR', setId: 'glacial', name: '極光安魂曲大聖袍', slot: 'armor', category: 'armor', affinity: 'dual', icon: '🥻', baseAtk: 15, baseDef: 36, mpBonus: 60, durability: 140, maxDurability: 140, level: 0, owned: false, desc: '【永凍套裝】傳說防具｜MaxHP +95，宛如穿戴整片極光星幕。', craftCost: { ore: 8, wood: 6, string: 4, thunder: 3, core: 1 } },
      { id: 'dragonscale_symphony_armor', rarity: 'SSR', setId: 'astral', name: '龍鱗星界大魔導袍', slot: 'armor', category: 'armor', affinity: 'dual', icon: '👘', baseAtk: 18, baseDef: 35, mpBonus: 60, durability: 140, maxDurability: 140, level: 0, owned: false, desc: '【星詠套裝】終極法袍｜MaxHP +85，魔力與防禦達至巔峰。', craftCost: { ore: 9, wood: 6, string: 4, thunder: 4, core: 1 } },

      { id: 'bronze_metronome', rarity: 'N', setId: null, name: '青銅節拍魔導懷錶', slot: 'relic', category: 'relic', affinity: 'neutral', icon: '⏱️', baseAtk: 2, baseDef: 2, mpBonus: 15, durability: 100, maxDurability: 100, level: 0, owned: true, desc: '提升魔導上限 +15 MP。', craftCost: null },
      { id: 'golden_tuning_fork', rarity: 'R', setId: 'astral', name: '古代黃金音叉聖印', slot: 'relic', category: 'relic', affinity: 'major', icon: '🔱', baseAtk: 8, baseDef: 4, mpBonus: 40, durability: 120, maxDurability: 120, level: 0, owned: false, desc: '【星詠套裝】魔力上限 +40 MP，所有奧義傷害 +15%。', craftCost: { ore: 5, wood: 4, string: 2, thunder: 0, core: 0 } },
      { id: 'crimson_distortion_pick', rarity: 'SR', setId: 'thunder', name: '猩紅失真雷電撥片', slot: 'relic', category: 'relic', affinity: 'minor', icon: '🎸', baseAtk: 15, baseDef: 5, mpBonus: 45, durability: 130, maxDurability: 130, level: 0, owned: false, desc: '【狂雷套裝】電結他與普攻連段暴擊率大幅提升！', craftCost: { ore: 6, wood: 4, string: 3, thunder: 3, core: 0 } },
      { id: 'astral_staff_crest', rarity: 'SR', setId: 'astral', name: '星辰五線譜徽章', slot: 'relic', category: 'relic', affinity: 'dual', icon: '🔯', baseAtk: 13, baseDef: 6, mpBonus: 55, durability: 140, maxDurability: 140, level: 0, owned: false, desc: '【星詠套裝】聽音試煉時自動揭示首個提示音符！', craftCost: { ore: 7, wood: 5, string: 4, thunder: 2, core: 0 } },
      { id: 'frost_diapason_crown', rarity: 'SSR', setId: 'glacial', name: '永凍和諧冰冠聖印', slot: 'relic', category: 'relic', affinity: 'dual', icon: '👑', baseAtk: 18, baseDef: 12, mpBonus: 70, durability: 155, maxDurability: 155, level: 0, owned: false, desc: '【永凍套裝】神話聖印｜大幅強化全屬性與聖詠護盾上限。', craftCost: { ore: 8, wood: 5, string: 4, thunder: 3, core: 1 } },
      { id: 'silence_breaker_sigil', rarity: 'SSR', setId: 'thunder', name: '寂靜破除者聖印', slot: 'relic', category: 'relic', affinity: 'dual', icon: '💠', baseAtk: 22, baseDef: 10, mpBonus: 75, durability: 160, maxDurability: 160, level: 0, owned: false, desc: '【狂雷套裝】封印大天使之力嘅聖印，全屬性大幅飛躍！', craftCost: { ore: 8, wood: 6, string: 5, thunder: 4, core: 2 } }
    ];

let gearCatalog = JSON.parse(JSON.stringify(defaultGearCatalog));

const defaultFamiliars = [
      { id: 'chrono_sentinel', name: '節拍哨兵·克羅諾', icon: '🕰️', orbColor: 0xfacc15, starLevel: 1, role: '魔力回流 · 自動接音', unlocked: true, unlockCondition: '初始夥伴', desc: '每次答題額外恢復 +6 MP；升星後在採集 3.0 中每 9 秒自動接住漏掉音符！' },
      { id: 'nocturne_owl', name: '銀翼音梟·諾克圖', icon: '🦉', orbColor: 0x38bdf8, starLevel: 1, role: '小調共鳴 · 洞察排除', unlocked: false, unlockCondition: '完成五線譜石碑或巴別塔第 1 層解鎖', desc: '戰鬥自動排除錯誤音符，小調共鳴 +20%；升星後增強自動接音頻率！' },
      { id: 'chord_gryphon', name: '烈焰和弦獅鷲', icon: '🦅', orbColor: 0xf43f5e, starLevel: 1, role: '和聲追擊 · 破甲猛攻', unlocked: false, unlockCondition: '擊敗任意附近魔物解鎖', desc: '成功答題後發動和聲烈焰追擊（45%~75% 魔攻額外傷害）！' }
    ];

let familiarsList = JSON.parse(JSON.stringify(defaultFamiliars));

const gameState = {
      currentBiome: 'ch1',
      level: 1, exp: 0, sp: 1,
      hp: 130, maxHp: 130, barrier: 0, mana: 70,
      materials: { ore: 3, wood: 3, string: 1, thunder: 0, core: 0 },
      equipped: { weaponId: 'rusty_blade', offhandId: 'oak_echo_bell', armorId: 'bard_linen_cloak', relicId: 'bronze_metronome' },
      selectedBagItemId: 'rusty_blade',
      bagSortRarity: false,
      activeFamiliars: ['chrono_sentinel'],
      skills: { p_harmonic_strike: 0, p_pitch_meditation: 0, g_overdrive: 0, g_riff_lifesteal: 0, c_dual_familiar: 0, c_symphonic_shield: 0 },
      babelCleared: [],
      abyssBestFloor: 0,
      activeTitleId: 'novice_bard',
      customUltimate: { instrument: 'piano', notes: ['Do', 'Mi', 'Sol', 'La', 'Sol', 'Mi', 'Re', 'Do'] },
      combatStance: 'major',
      inputViewMode: 'piano',
      showStaffAssist: true,
      auditionMode: false,
      battleMicEnabled: false,
      lastBattleMicTime: 0,
      guitarBendCharged: false,
      freestyleSolo: { active: false, timeLeft: 0, hits: 0, rafId: null },
      hitstopTimer: 0,
      stats: { blindWins: 0, perfectParries: 0, chordWins: 0, chimesSolved: 0 },
      claimedAchievements: [],
      staffHighlightIdx: -1,
      combatCombo: 0,
      normalComboStep: 1,
      lastNormalAtkTime: 0,
      bagFilter: 'all',
      playerPos: { x: 0, z: 6.5 },
      targetPos: null,
      castAnimTimer: 0,
      slashAnimTimer: 0,
      encounterTransitioning: false,
      encounterCamTarget: null,
      parryState: { active: false, startTime: 0, duration: 1450, incomingDmg: 0, monster: null, rafId: null },
      keys: {},
      activeInteractable: null,
      currentChallenge: null
    };

function saveGameProgress() {
      try {
        localStorage.setItem(SAVE_KEY, JSON.stringify({
          currentBiome: gameState.currentBiome,
          level: gameState.level, exp: gameState.exp, sp: gameState.sp,
          hp: gameState.hp, maxHp: gameState.maxHp, mana: gameState.mana,
          materials: gameState.materials, equipped: gameState.equipped,
          activeFamiliars: gameState.activeFamiliars, skills: gameState.skills,
          babelCleared: gameState.babelCleared,
          abyssBestFloor: gameState.abyssBestFloor,
          activeTitleId: gameState.activeTitleId,
          showStaffAssist: gameState.showStaffAssist,
          customUltimate: gameState.customUltimate,
          stats: gameState.stats,
          claimedAchievements: gameState.claimedAchievements,
          gearState: gearCatalog.map(g => ({ id: g.id, owned: g.owned, level: g.level, durability: g.durability, maxDurability: g.maxDurability, enchant: g.enchant || null })),
          familiarState: familiarsList.map(f => ({ id: f.id, unlocked: f.unlocked, starLevel: f.starLevel || 1 })),
          openedChests: Object.values(biomeChestsMap).flat().filter(c => c.opened).map(c => c.id)
        }));
      } catch (e) {}
    }

function loadGameProgress() {
      try {
        const raw = localStorage.getItem(SAVE_KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        if (d.currentBiome) gameState.currentBiome = d.currentBiome;
        gameState.level = d.level || 1;
        gameState.exp = d.exp || 0;
        gameState.sp = d.sp ?? 1;
        gameState.hp = d.hp || 130;
        gameState.maxHp = d.maxHp || 130;
        gameState.mana = d.mana ?? 70;
        if (d.materials) gameState.materials = { ore: 0, wood: 0, string: 0, thunder: 0, core: 0, ...d.materials };
        if (d.equipped) gameState.equipped = { weaponId: 'rusty_blade', offhandId: 'oak_echo_bell', armorId: 'bard_linen_cloak', relicId: 'bronze_metronome', ...d.equipped };
        if (Array.isArray(d.activeFamiliars)) gameState.activeFamiliars = d.activeFamiliars;
        if (d.skills) gameState.skills = { ...gameState.skills, ...d.skills };
        if (Array.isArray(d.babelCleared)) gameState.babelCleared = d.babelCleared;
        gameState.abyssBestFloor = d.abyssBestFloor || 0;
        if (d.activeTitleId) gameState.activeTitleId = d.activeTitleId;
        if (typeof d.showStaffAssist === 'boolean') gameState.showStaffAssist = d.showStaffAssist;
        if (d.stats) gameState.stats = { ...gameState.stats, ...d.stats };
        if (Array.isArray(d.claimedAchievements)) gameState.claimedAchievements = d.claimedAchievements;
        if (d.customUltimate) gameState.customUltimate = d.customUltimate;
        if (Array.isArray(d.gearState)) {
          d.gearState.forEach(s => { const t = gearCatalog.find(g => g.id === s.id); if (t) Object.assign(t, s); });
        }
        if (Array.isArray(d.familiarState)) {
          d.familiarState.forEach(s => { const t = familiarsList.find(f => f.id === s.id); if (t) { t.unlocked = s.unlocked; t.starLevel = s.starLevel || 1; } });
        }
        if (Array.isArray(d.openedChests)) {
          Object.values(biomeChestsMap).flat().forEach(c => { if (d.openedChests.includes(c.id)) c.opened = true; });
        }
      } catch (e) {}
    }

document.getElementById('btn-reset-save').addEventListener('click', () => { localStorage.removeItem(SAVE_KEY); location.reload(); });

function getEquippedWeapon()  { return gearCatalog.find(g => g.id === gameState.equipped.weaponId)  || null; }

function getEquippedOffhand() { return gearCatalog.find(g => g.id === gameState.equipped.offhandId) || null; }

function getEquippedArmor()   { return gearCatalog.find(g => g.id === gameState.equipped.armorId)   || null; }

function getEquippedRelic()   { return gearCatalog.find(g => g.id === gameState.equipped.relicId)   || null; }

function getItemStats(item) {
      if (!item) return { atk: 0, rawAtk: 0, def: 0, rawDef: 0, mpBonus: 0, isBroken: false };
      const isBroken = (item.slot === 'weapon' || item.slot === 'armor') && item.durability <= 0;
      const rawAtk = item.baseAtk + item.level * 8;
      const rawDef = item.baseDef + item.level * 4;
      return {
        atk: isBroken ? Math.max(2, Math.floor(rawAtk * 0.20)) : rawAtk,
        rawAtk,
        def: isBroken ? Math.max(1, Math.floor(rawDef * 0.25)) : rawDef,
        rawDef,
        mpBonus: item.mpBonus + item.level * 10,
        isBroken
      };
    }

function getPlayerTotalStats() {
      const w = getEquippedWeapon(), oh = getEquippedOffhand(), ar = getEquippedArmor(), re = getEquippedRelic();
      const wS = getItemStats(w), ohS = getItemStats(oh), arS = getItemStats(ar), reS = getItemStats(re);
      const titleObj = getActiveTitle();
      const armorHpBonus = ar ? (
        ar.id === 'abyssal_requiem_mantle' ? 95 :
        ar.id === 'dragonscale_symphony_armor' ? 85 :
        ar.id === 'glacial_choir_vestments' ? 65 :
        ar.id === 'thunderplate_cuirass' ? 50 :
        ar.id === 'silver_resonance_mail' ? 30 : 0
      ) : 0;

      const equippedList = [w, oh, ar, re].filter(Boolean);
      const setCounts = { astral: 0, thunder: 0, glacial: 0 };
      equippedList.forEach(it => { if (it.setId && setCounts[it.setId] !== undefined) setCounts[it.setId]++; });

      let setAtkBonus = 0, setDefBonus = 0, setMpBonus = 0, setHpBonus = 0;
      if (setCounts.astral >= 2) { setAtkBonus += 18; setMpBonus += 35; }
      if (setCounts.thunder >= 2) { setAtkBonus += 15; }
      if (setCounts.glacial >= 2) { setDefBonus += 14; setHpBonus += 55; }

      const totalAtk = 6 + wS.atk + ohS.atk + arS.atk + reS.atk + setAtkBonus + titleObj.atk;
      const totalDef = 2 + wS.def + ohS.def + arS.def + reS.def + setDefBonus + titleObj.def;
      const maxMana = 100 + wS.mpBonus + ohS.mpBonus + arS.mpBonus + reS.mpBonus + setMpBonus + titleObj.mp;
      const effectiveMaxHp = gameState.maxHp + armorHpBonus + setHpBonus;
      const combatPower = totalAtk * 28 + totalDef * 22 + maxMana * 4 + effectiveMaxHp * 2 + gameState.level * 120;
      return {
        totalAtk, totalDef, maxMana, effectiveMaxHp, combatPower, setCounts,
        weapon: w, offhand: oh, armor: ar, relic: re, weaponBroken: wS.isBroken
      };
    }

/**
     * ============================================================================
     * 3. 3D MUSIC MAGE, NORMAL ATTACK SLASH (HITS MONSTERS & CRYSTAL VEINS)
     * ============================================================================
     */

function update3DPlayerVisuals() {
      const w = getEquippedWeapon();
      const ar = getEquippedArmor();
      if (w) {
        const isGuitar = w.category === 'guitar';
        staffHeadRing.scale.set(isGuitar ? 1.35 : 1.0, isGuitar ? 1.85 : 1.0, 1.0);
        const wColor = w.id.includes('thunder') || w.id.includes('abyssal') ? 0xf59e0b
          : (w.id.includes('glacial') ? 0x38bdf8
          : (w.id.includes('astral') || w.id.includes('mithril') ? 0xc084fc : 0x38bdf8));
        staffCrystal.material.color.setHex(wColor);
        mageAuraRing.material.color.setHex(wColor);
        playerLight.color.setHex(wColor);
      }
      if (ar) {
        const rColor = ar.id.includes('glacial') ? 0x0c4a6e
          : (ar.id.includes('thunder') ? 0x451a03
          : (ar.id.includes('dragon') || ar.id.includes('abyssal') ? 0x3b0764 : 0x17153b));
        velvetMat.color.setHex(rColor);
      }
    }

// Familiar Orbs with Star-Awakening Halo Rings

const familiarOrb1 = new THREE.Group();

familiarOrb1.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 1), new THREE.MeshBasicMaterial({ color: 0xfacc15 })));

familiarOrb1.add(famHalo1);

const familiarOrb2 = new THREE.Group();

familiarOrb2.add(new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 1), new THREE.MeshBasicMaterial({ color: 0x38bdf8 })));

familiarOrb2.add(famHalo2);

playerGroup.add(familiarOrb1, familiarOrb2);

const biomeGroup = new THREE.Group();

scene.add(biomeGroup);

let envAnimItems = [];

function triggerBattleEncounterTransition(monster, openingDmg) {
      if (gameState.encounterTransitioning || anyModalOpen()) return;
      cleanupOverworldProjectiles();
      gameState.encounterTransitioning = true;
      gameState.targetPos = null;
      waypointRing.visible = false;
      gameState.encounterCamTarget = { x: monster.x, z: monster.z };

      triggerScreenShake();
      trigger3DShockwave(0xfacc15);
      sound.playEncounterClimaxSFX();

      const overlay = document.getElementById('encounter-transition-overlay');
      document.getElementById('encounter-subtext').textContent =
        `奧術音刃先制斬擊 -${openingDmg} HP！準備聆聽【${monster.name}】的旋律`;
      overlay.classList.remove('hidden');

      setTimeout(() => {
        overlay.classList.add('hidden');
        gameState.encounterTransitioning = false;
        gameState.encounterCamTarget = null;
        openMonsterBattle(monster, openingDmg);
      }, 820);
    }

function createMonster3D(m) {
      const g = new THREE.Group();
      const matColor = m.isBoss ? 0x7f1d1d : (m.affinity === 'major' ? 0xb45309 : 0x3730a3);
      const emissiveHex = m.isBoss ? 0xf43f5e : (m.affinity === 'major' ? 0xf59e0b : 0x6366f1);
      const scale = m.isBoss ? 1.85 : 1.0;

      const core = new THREE.Mesh(
        m.isBoss ? new THREE.OctahedronGeometry(1.05, 0) : new THREE.DodecahedronGeometry(0.72, 0),
        new THREE.MeshStandardMaterial({ color: matColor, emissive: emissiveHex, emissiveIntensity: 0.4, roughness: 0.35, metalness: 0.7 })
      );
      core.position.y = 1.15 * scale; core.castShadow = true; g.add(core);

      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff2a55 });
      const e1 = new THREE.Mesh(new THREE.SphereGeometry(0.11 * scale, 8, 8), eyeMat);
      e1.position.set(-0.24 * scale, 1.25 * scale, 0.58 * scale);
      const e2 = new THREE.Mesh(new THREE.SphereGeometry(0.11 * scale, 8, 8), eyeMat);
      e2.position.set(0.24 * scale, 1.25 * scale, 0.58 * scale);
      g.add(e1, e2);

      const threatRing = new THREE.Mesh(
        new THREE.RingGeometry(0.85 * scale, 1.02 * scale, 24),
        new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide, transparent: true, opacity: 0.7 })
      );
      threatRing.rotation.x = -Math.PI / 2; threatRing.position.y = 0.04;
      g.add(threatRing);

      g.position.set(m.x, 0, m.z);
      biomeGroup.add(g);
      return g;
    }

function build3DBiome(biomeId, keepPlayerPos = false) {
      gameState.currentBiome = biomeId;
      const b = biomesData[biomeId];
      document.getElementById('ui-biome-title').textContent = b.title;
      document.getElementById('ui-biome-sub').textContent = b.subtitle;
      document.getElementById('ui-biome-title-mobile').textContent = b.title;

      while (biomeGroup.children.length > 0) biomeGroup.remove(biomeGroup.children[0]);
      worldLabelsLayer.innerHTML = '';
      worldEntities = [];
      envAnimItems = [];

      scene.fog = new THREE.FogExp2(b.fogColor, 0.022);
      scene.background = new THREE.Color(b.fogColor);
      groundPlane.material.color.setHex(b.groundColor);

      const gridHelper = new THREE.GridHelper(64, 32, b.accentColor, 0x1e293b);
      gridHelper.position.y = 0.015;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.35;
      biomeGroup.add(gridHelper);

      const plazaDisc = new THREE.Mesh(
        new THREE.CircleGeometry(4.4, 36),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7, metalness: 0.4 })
      );
      plazaDisc.rotation.x = -Math.PI / 2;
      plazaDisc.position.set(0, 0.02, 5.5);
      plazaDisc.receiveShadow = true;
      biomeGroup.add(plazaDisc);

      const plazaRing = new THREE.Mesh(
        new THREE.RingGeometry(4.15, 4.45, 36),
        new THREE.MeshBasicMaterial({ color: b.accentColor, side: THREE.DoubleSide })
      );
      plazaRing.rotation.x = -Math.PI / 2;
      plazaRing.position.set(0, 0.03, 5.5);
      biomeGroup.add(plazaRing);

      const stoneMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.85, metalness: 0.2 });
      const pathTargets = [
        { x: 0, z: -15.5 },
        { x: -7.5, z: -2.0 },
        { x: 6.5, z: 2.0 },
        { x: -11.5, z: 3.5 },
        { x: 11.5, z: 3.5 }
      ];
      pathTargets.forEach(pt => {
        const steps = 12;
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          const sx = pt.x * t + Math.sin(s * 1.3) * 0.25;
          const sz = 5.5 + (pt.z - 5.5) * t;
          const slab = new THREE.Mesh(
            new THREE.CylinderGeometry(0.42 + (s % 2) * 0.14, 0.48, 0.06, 7),
            stoneMat
          );
          slab.position.set(sx, 0.03, sz);
          slab.rotation.y = s * 0.8;
          slab.receiveShadow = true;
          biomeGroup.add(slab);
        }
      });

      const altarGroup = new THREE.Group();
      const altarBase = new THREE.Mesh(
        new THREE.CylinderGeometry(3.6, 4.2, 0.35, 24),
        new THREE.MeshStandardMaterial({ color: 0x1e1b2e, roughness: 0.5, metalness: 0.6 })
      );
      altarBase.position.y = 0.18;
      altarBase.receiveShadow = true;
      altarGroup.add(altarBase);

      const altarRuneRing = new THREE.Mesh(
        new THREE.RingGeometry(2.8, 3.2, 32),
        new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide })
      );
      altarRuneRing.rotation.x = -Math.PI / 2;
      altarRuneRing.position.y = 0.37;
      altarGroup.add(altarRuneRing);

      [-3.2, 3.2].forEach(ox => {
        const col = new THREE.Mesh(
          new THREE.BoxGeometry(0.85, 5.4, 0.85),
          new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.7 })
        );
        col.position.set(ox, 2.7, -2.2);
        col.castShadow = true;
        altarGroup.add(col);

        const capOrb = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.45, 0),
          new THREE.MeshBasicMaterial({ color: 0xf43f5e })
        );
        capOrb.position.set(ox, 5.9, -2.2);
        altarGroup.add(capOrb);
        envAnimItems.push({ mesh: capOrb, type: 'spinFloat', baseY: 5.9, speed: 2.2 });
      });
      const lintel = new THREE.Mesh(
        new THREE.BoxGeometry(7.6, 0.65, 1.0),
        new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5, metalness: 0.6 })
      );
      lintel.position.set(0, 5.2, -2.2);
      altarGroup.add(lintel);
      altarGroup.position.set(0, 0, -16.2);
      biomeGroup.add(altarGroup);

      const pillarMat = new THREE.MeshStandardMaterial({
        color: biomeId === 'ch3' ? 0x1e3a8a : (biomeId === 'ch2' ? 0x451a03 : 0x1e293b),
        roughness: 0.5, metalness: 0.6
      });
      for (let i = 0; i < 20; i++) {
        const angle = (Math.PI * 2 * i) / 20;
        const radius = 20.5 + (i % 3) * 2.5;
        const px = Math.cos(angle) * radius;
        const pz = Math.sin(angle) * radius;
        const h = 4.0 + (i % 4) * 1.8;

        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.9, h, 8), pillarMat);
        pillar.position.set(px, h / 2, pz);
        pillar.castShadow = true;
        biomeGroup.add(pillar);

        if (biomeId === 'ch2') {
          const pipe = new THREE.Mesh(
            new THREE.CylinderGeometry(0.28, 0.28, h * 0.7, 12),
            new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 })
          );
          pipe.position.set(px + 0.55, h * 0.55, pz);
          biomeGroup.add(pipe);
        } else if (biomeId === 'ch3') {
          const spire = new THREE.Mesh(
            new THREE.ConeGeometry(0.75, 2.8, 6),
            new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5, roughness: 0.15 })
          );
          spire.position.set(px, h + 1.1, pz);
          biomeGroup.add(spire);
        }

        if (i % 4 === 0) {
          const lanternOrb = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 10, 10),
            new THREE.MeshBasicMaterial({ color: b.accentColor })
          );
          lanternOrb.position.set(px, h + 0.45, pz);
          biomeGroup.add(lanternOrb);

          const brazierLight = new THREE.PointLight(b.accentColor, 1.35, 15);
          brazierLight.position.set(px, h + 0.8, pz);
          biomeGroup.add(brazierLight);
        }
      }

      const crystalMat = new THREE.MeshStandardMaterial({
        color: biomeId === 'ch3' ? 0x7dd3fc : (biomeId === 'ch2' ? 0xfbbf24 : 0x2dd4bf),
        emissive: biomeId === 'ch3' ? 0x0369a1 : (biomeId === 'ch2' ? 0xb45309 : 0x0f766e),
        emissiveIntensity: 0.55,
        roughness: 0.2,
        metalness: 0.4
      });
      const foliageMat = new THREE.MeshStandardMaterial({
        color: biomeId === 'ch3' ? 0x1e40af : (biomeId === 'ch2' ? 0x7c2d12 : 0x064e3b),
        roughness: 0.8
      });
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x291d18, roughness: 0.9 });

      for (let k = 0; k < 42; k++) {
        const ang = k * 2.39996;
        const dist = 7.5 + (k % 11) * 1.15;
        const sx = Math.cos(ang) * dist;
        const sz = Math.sin(ang) * dist;

        if (Math.abs(sx) < 3.5 && sz > -14 && sz < 9) continue;

        if (k % 3 === 0) {
          const tree = new THREE.Group();
          const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.34, 1.8, 7), trunkMat);
          trunk.position.y = 0.9;
          trunk.castShadow = true;
          tree.add(trunk);

          const crown1 = new THREE.Mesh(new THREE.ConeGeometry(1.15, 2.1, 7), foliageMat);
          crown1.position.y = 2.3;
          crown1.castShadow = true;
          tree.add(crown1);

          const crown2 = new THREE.Mesh(new THREE.ConeGeometry(0.82, 1.7, 7), foliageMat);
          crown2.position.y = 3.35;
          tree.add(crown2);

          tree.position.set(sx, 0, sz);
          biomeGroup.add(tree);
          envAnimItems.push({ mesh: tree, type: 'sway', phase: k * 0.7 });
        } else if (k % 3 === 1) {
          const cluster = new THREE.Group();
          for (let c = 0; c < 3; c++) {
            const ch = 0.7 + c * 0.45;
            const shard = new THREE.Mesh(new THREE.OctahedronGeometry(0.24 + c * 0.06, 0), crystalMat);
            shard.scale.set(0.7, ch * 1.6, 0.7);
            shard.position.set((c - 1) * 0.28, ch * 0.45, (c % 2) * 0.2);
            shard.rotation.z = (c - 1) * 0.22;
            cluster.add(shard);
          }
          cluster.position.set(sx, 0, sz);
          biomeGroup.add(cluster);
        } else {
          const mush = new THREE.Group();
          const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 0.35, 6), stoneMat);
          stem.position.y = 0.17;
          const cap = new THREE.Mesh(new THREE.SphereGeometry(0.24, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), crystalMat);
          cap.position.y = 0.32;
          mush.add(stem, cap);
          mush.position.set(sx, 0, sz);
          biomeGroup.add(mush);
          envAnimItems.push({ mesh: mush, type: 'sway', phase: k * 1.1 });
        }
      }

      skyRingGroup = new THREE.Group();
      const outerAstrolabe = new THREE.Mesh(
        new THREE.TorusGeometry(18, 0.12, 8, 64),
        new THREE.MeshBasicMaterial({ color: b.accentColor, transparent: true, opacity: 0.35 })
      );
      outerAstrolabe.rotation.x = Math.PI / 2.3;
      const innerAstrolabe = new THREE.Mesh(
        new THREE.TorusGeometry(13.5, 0.09, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.3 })
      );
      innerAstrolabe.rotation.x = Math.PI / 1.8;
      skyRingGroup.add(outerAstrolabe, innerAstrolabe);
      skyRingGroup.position.set(0, 14, -4);
      biomeGroup.add(skyRingGroup);

      const pCount = 360;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3]     = (Math.random() - 0.5) * 48;
        pPos[i * 3 + 1] = 0.3 + Math.random() * 11;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 48;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: biomeId === 'ch3' ? 0xe0f2fe : (biomeId === 'ch2' ? 0xfbbf24 : 0x5eead4),
        size: biomeId === 'ch3' ? 0.24 : 0.22,
        transparent: true,
        opacity: 0.85
      });
      ambientParticles = new THREE.Points(pGeo, pMat);
      biomeGroup.add(ambientParticles);

      (biomeNPCsMap[biomeId] || []).forEach(npc => {
        const mesh = createNPC3D(npc);
        const ent = { kind: 'npc', ref: npc, mesh, x: npc.x, z: npc.z, labelEl: null };
        ent.labelEl = createFloatingWorldLabel(ent);
        worldEntities.push(ent);
      });

      const sharedPortals = [
        { id: 'babel_portal', type: 'babel', name: '🗼 巴別音律之塔', role: '古典名曲試煉傳送門', x: -11.5, z: 3.5, portalColor: 0xfacc15 },
        { id: 'world_portal', type: 'worldmap', name: '🗺️ 章節傳送符文陣', role: '前往其他 3D 章節', x: 11.5, z: 3.5, portalColor: 0x38bdf8 }
      ];
      sharedPortals.forEach(p => {
        const mesh = createRunePortal3D(p.x, p.z, p.portalColor);
        const ent = { kind: 'npc', ref: p, mesh, x: p.x, z: p.z, labelEl: null };
        ent.labelEl = createFloatingWorldLabel(ent);
        worldEntities.push(ent);
      });

      // Spawn Sealed Musical Treasure Chests
      (biomeChestsMap[biomeId] || []).forEach(chest => {
        const mesh = createSealedChest3D(chest);
        const ent = { kind: 'chest', ref: chest, mesh, x: chest.x, z: chest.z, labelEl: null };
        ent.labelEl = createFloatingWorldLabel(ent);
        worldEntities.push(ent);
      });

      // Spawn Resonance Wind-Chime Puzzle Pillars
      const chimeSet = biomeChimesMap[biomeId];
      if (chimeSet && !chimeSet.solved) {
        chimeSet.pillars.forEach(p => {
          const g = new THREE.Group();
          const col = new THREE.Mesh(
            new THREE.CylinderGeometry(0.38, 0.48, 2.3, 8),
            new THREE.MeshStandardMaterial({ color: p.lit ? 0xfacc15 : 0x334155, emissive: p.lit ? 0xd97706 : 0x000000, emissiveIntensity: 0.6, metalness: 0.7 })
          );
          col.position.y = 1.15; col.castShadow = true; g.add(col);
          const bell = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.32, 0),
            new THREE.MeshBasicMaterial({ color: p.lit ? 0xfef08a : 0x38bdf8 })
          );
          bell.position.y = 2.65; g.add(bell);
          g.position.set(p.x, 0, p.z);
          biomeGroup.add(g);

          const el = document.createElement('div');
          el.className = 'world-tag select-none';
          el.innerHTML = `<div class="px-2 py-0.5 rounded-lg bg-slate-950/85 border ${p.lit ? 'border-amber-400 text-amber-300' : 'border-cyan-400/70 text-cyan-200'} text-[10px] font-black whitespace-nowrap">🎐 ${p.label} ${p.lit ? '✓' : ''}</div>`;
          worldLabelsLayer.appendChild(el);
          worldEntities.push({ kind: 'chime', ref: p, mesh: g, x: p.x, z: p.z, labelEl: el });
        });
      }

      // Spawn Slashable Resonance Crystal Veins
      (biomeVeinsMap[biomeId] || []).forEach(vein => {
        if (vein.respawnTimer <= 0) {
          const mesh = createCrystalVein3D(vein);
          const ent = { kind: 'vein', ref: vein, mesh, x: vein.x, z: vein.z, labelEl: null };
          ent.labelEl = createFloatingWorldLabel(ent);
          worldEntities.push(ent);
        }
      });

      (biomeMonstersMap[biomeId] || []).forEach(m => {
        if (m.respawnTimer <= 0) {
          if (!keepPlayerPos) { m.x = m.homeX; m.z = m.homeZ; }
          const mesh = createMonster3D(m);
          const ent = { kind: 'monster', ref: m, mesh, x: m.x, z: m.z, labelEl: null };
          ent.labelEl = createFloatingWorldLabel(ent);
          worldEntities.push(ent);
        }
      });

      if (!keepPlayerPos) {
        gameState.playerPos = { x: 0, z: 6.5 };
        gameState.targetPos = null;
        waypointRing.visible = false;
      }
      saveGameProgress();
    }

/**
     * ============================================================================
     * 4. MOBILE RPG TWO-COLUMN CHARACTER & SQUARE EQUIPMENT SLOTS + BACKPACK UI
     * ============================================================================
     */

window.openForgeForItem = function() {
      bagModal.classList.add('hidden');
      renderForgeModal();
      forgeModal.classList.remove('hidden');
    };

/**
     * ============================================================================
     * 5. NPC DIALOGUE, HUD UPDATES, ABYSS & TITLES, WORLD MAP, BABEL, SKILLS, FORGE
     * ============================================================================
     */

window.enchantGear = function(id) {
      const it = gearCatalog.find(g => g.id === id);
      if (!it || gameState.materials.core < 1) return;
      gameState.materials.core -= 1;
      const affix = enchantAffixesPool[Math.floor(Math.random() * enchantAffixesPool.length)];
      it.enchant = { ...affix };
      sound.playForgeSFX();
      showToast(`🔮 成功為【${it.name}】注入詞條：${affix.name}！`);
      updateHUD();
      renderForgeModal();
    };

function getAchievementProgress(ach) {
      if (ach.statKey === 'ownedGearCount') return gearCatalog.filter(g => g.owned).length;
      if (ach.statKey === 'abyssFloor') return gameState.abyssBestFloor;
      return gameState.stats[ach.statKey] || 0;
    }

function renderAchievementsModal() {
      const list = document.getElementById('achievements-list');
      list.innerHTML = '';
      achievementsCatalog.forEach(ach => {
        const prog = getAchievementProgress(ach);
        const done = prog >= ach.target;
        const claimed = gameState.claimedAchievements.includes(ach.id);
        const card = document.createElement('div');
        card.className = `arcane-subpanel rounded-xl p-3 border flex flex-col justify-between gap-2 ${done ? 'border-emerald-400/80' : 'border-slate-800'}`;
        card.innerHTML = `
          <div>
            <div class="flex items-center justify-between gap-2">
              <span class="font-epic font-black text-xs sm:text-sm text-amber-200">${ach.title}</span>
              <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-700">${Math.min(prog, ach.target)} / ${ach.target}</span>
            </div>
            <p class="text-[11px] text-slate-300 mt-1">${ach.desc}</p>
            <div class="text-[10px] font-bold text-purple-300 mt-1">獎勵：✦ +${ach.rewardSP} SP ${ach.rewardCore ? `＋ 💠魔王結晶 +${ach.rewardCore}` : ''}</div>
          </div>
          ${claimed
            ? `<div class="text-center py-1 rounded-lg bg-slate-900 text-emerald-400 text-xs font-black">✓ 已領取獎勵</div>`
            : (done
              ? `<button onclick="claimAchievement('${ach.id}')" class="w-full py-1.5 rounded-lg btn-arcane-gold text-xs font-black">🎁 領取成就獎勵</button>`
              : `<div class="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden"><div class="h-full bg-cyan-500" style="width:${Math.min(100, Math.round((prog / ach.target) * 100))}%"></div></div>`)}
        `;
        list.appendChild(card);
      });
    }

window.claimAchievement = function(achId) {
      const ach = achievementsCatalog.find(a => a.id === achId);
      if (!ach || gameState.claimedAchievements.includes(achId)) return;
      if (getAchievementProgress(ach) < ach.target) return;
      gameState.claimedAchievements.push(achId);
      gameState.sp += ach.rewardSP;
      gameState.materials.core += ach.rewardCore;
      sound.playSuccessSFX();
      showToast(`🏆 領取成就【${ach.title}】獎勵！獲得 +${ach.rewardSP} SP！`);
      updateHUD();
      renderAchievementsModal();
    };

function renderWorldMapModal() {
      const list = document.getElementById('worldmap-list');
      list.innerHTML = '';
      Object.values(biomesData).forEach(b => {
        const isCurrent = gameState.currentBiome === b.id;
        const card = document.createElement('div');
        card.className = `arcane-subpanel rounded-xl p-3.5 border flex flex-col justify-between gap-3 ${isCurrent ? 'border-amber-400 bg-slate-900' : 'border-slate-800'}`;
        card.innerHTML = `
          <div>
            <div class="font-epic font-black text-sm text-amber-300">${b.title}</div>
            <div class="text-[11px] font-bold text-cyan-300 mt-0.5">${b.subtitle}</div>
            <p class="text-xs text-slate-300 mt-2 leading-relaxed">${b.desc}</p>
          </div>
          <button onclick="travelToBiome('${b.id}')" class="w-full py-2 rounded-xl font-black text-xs transition ${isCurrent ? 'bg-slate-800 text-amber-300 border border-amber-500/50' : 'btn-arcane-gold'}">
            ${isCurrent ? '✦ 當前所在 3D 領域' : '🌀 啟動符文傳送'}
          </button>
        `;
        list.appendChild(card);
      });
    }

function renderBabelModal() {
      const list = document.getElementById('babel-floors-list');
      list.innerHTML = '';
      babelMasterpieces.forEach(item => {
        const cleared = gameState.babelCleared.includes(item.floor);
        const card = document.createElement('div');
        card.className = 'arcane-subpanel rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3';
        card.innerHTML = `
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-epic font-black text-sm text-amber-300">${item.title}</span>
              <span class="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-700">${item.composer}</span>
              ${cleared ? '<span class="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 font-bold">✓ 已通關</span>' : ''}
            </div>
            <p class="text-xs text-slate-300 mt-1">${item.desc}</p>
            <div class="text-[11px] font-bold text-purple-300 mt-1">
              首通獎勵：✦ +${item.rewardSP} 天賦點 (SP) ｜ 🪨+${item.rewardMats.ore} 🪵+${item.rewardMats.wood} ✨+${item.rewardMats.string}${item.rewardMats.core ? ` 💠+${item.rewardMats.core}` : ''}
            </div>
          </div>
          <div class="flex gap-1.5 shrink-0">
            <button onclick="previewBabelSong(${item.floor})" class="px-3 py-1.5 rounded-lg btn-arcane-dark text-xs font-bold">🔊 聆聽名曲</button>
            <button onclick="startBabelTrial(${item.floor})" class="px-4 py-1.5 rounded-lg btn-arcane-gold text-xs font-black">🎹 演奏挑戰</button>
          </div>
        `;
        list.appendChild(card);
      });
    }

window.startBabelTrial = function(floor) {
      const item = babelMasterpieces.find(b => b.floor === floor);
      if (!item) return;
      babelModal.classList.add('hidden');
      openBabelChallenge(item);
    };

const skillsModal = document.getElementById('skills-modal');

function renderSkillsModal() {
      document.getElementById('skills-sp-display').textContent = gameState.sp;
      const grid = document.getElementById('skills-trees-grid');
      grid.innerHTML = '';

      skillTreesData.forEach(branch => {
        const col = document.createElement('div');
        col.className = `arcane-subpanel rounded-xl p-3 border ${branch.color} space-y-2.5`;
        col.innerHTML = `<h3 class="font-epic font-black text-sm ${branch.color.split(' ')[0]} border-b border-slate-800 pb-1.5">${branch.title}</h3>`;

        branch.nodes.forEach(node => {
          const curLv = gameState.skills[node.id] || 0;
          const isMax = curLv >= node.maxLv;
          const canLearn = !isMax && gameState.sp > 0;
          const nCard = document.createElement('div');
          nCard.className = 'bg-slate-950/90 rounded-lg p-2.5 border border-slate-800 space-y-1.5';
          nCard.innerHTML = `
            <div class="flex justify-between items-center">
              <span class="font-black text-xs text-amber-200">${node.name}</span>
              <span class="text-[10px] font-bold text-cyan-300">Lv.${curLv}/${node.maxLv}</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-snug">${node.desc}</p>
            <button onclick="learnSkillNode('${node.id}', ${node.maxLv})" ${canLearn ? '' : 'disabled'} class="w-full py-1 rounded-lg text-xs font-black transition ${canLearn ? 'btn-arcane-gold cursor-pointer' : 'bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed'}">
              ${isMax ? '★ 已達巔峰' : '✦ 消耗 1 SP 領悟'}
            </button>
          `;
          col.appendChild(nCard);
        });
        grid.appendChild(col);
      });
    }

document.getElementById('btn-open-skills').addEventListener('click', () => { renderSkillsModal(); skillsModal.classList.remove('hidden'); });

document.getElementById('ui-sp-badge').addEventListener('click', () => { renderSkillsModal(); skillsModal.classList.remove('hidden'); });

document.getElementById('btn-close-skills').addEventListener('click', () => skillsModal.classList.add('hidden'));

window.upgradeGear = function(id) {
      const it = gearCatalog.find(g => g.id === id);
      const upg = { ore: 2 + it.level * 2, wood: 2 + it.level, string: 1 + Math.floor(it.level / 2) };
      if (!it || it.level >= 5 || gameState.materials.ore < upg.ore || gameState.materials.wood < upg.wood || gameState.materials.string < upg.string) return;
      gameState.materials.ore -= upg.ore; gameState.materials.wood -= upg.wood; gameState.materials.string -= upg.string;
      it.level++; it.maxDurability += 15; it.durability = it.maxDurability;
      sound.playForgeSFX(); updateHUD(); renderForgeModal();
    };

window.craftGear = function(id) {
      const it = gearCatalog.find(g => g.id === id);
      if (!it || it.owned) return;
      const c = it.craftCost;
      if (gameState.materials.ore < c.ore || gameState.materials.wood < c.wood || gameState.materials.string < c.string || gameState.materials.thunder < (c.thunder || 0) || gameState.materials.core < (c.core || 0)) return;
      gameState.materials.ore -= c.ore; gameState.materials.wood -= c.wood; gameState.materials.string -= c.string; gameState.materials.thunder -= (c.thunder || 0); gameState.materials.core -= (c.core || 0);
      it.owned = true; gameState.equipped[`${it.slot}Id`] = it.id; gameState.selectedBagItemId = it.id;
      sound.playForgeSFX(); showToast(`🎉 成功鍛造並裝備 [${it.rarity}]【${it.name}】！`); updateHUD(); renderForgeModal();
    };

// --- FAMILIAR STAR UPGRADE SYSTEM ---

const familiarsModal = document.getElementById('familiars-modal');

function renderFamiliarsModal() {
      const maxSlots = (gameState.skills.c_dual_familiar || 0) >= 1 ? 2 : 1;
      document.getElementById('familiars-slot-hint').textContent = `可召喚 ${maxSlots} 隻樂靈隨行（已召喚 ${gameState.activeFamiliars.length}/${maxSlots}）｜ 餵食素材可升星覺醒採集自動接音！`;
      const list = document.getElementById('familiars-list');
      list.innerHTML = '';
      familiarsList.forEach(fam => {
        const isActive = gameState.activeFamiliars.includes(fam.id);
        const stars = fam.starLevel || 1;
        const starIcons = '★'.repeat(stars) + '☆'.repeat(3 - stars);
        const upgCost = { ore: stars * 3, wood: stars * 3, string: stars * 2 };
        const canStarUp = fam.unlocked && stars < 3 && gameState.materials.ore >= upgCost.ore && gameState.materials.wood >= upgCost.wood && gameState.materials.string >= upgCost.string;

        const card = document.createElement('div');
        card.className = `arcane-subpanel rounded-xl p-3 border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${isActive ? 'border-amber-400 bg-slate-900' : 'border-slate-800'}`;
        card.innerHTML = `
          <div class="flex items-start gap-2.5">
            <span class="text-3xl">${fam.icon}</span>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-epic font-black text-sm text-amber-200">${fam.name}</span>
                <span class="text-xs font-black text-yellow-300 tracking-widest">${starIcons}</span>
                <span class="text-[10px] text-cyan-300">[${fam.role}]</span>
              </div>
              <p class="text-xs text-slate-300 mt-0.5">${fam.desc}</p>
              <div class="text-[10px] text-emerald-300 font-bold mt-0.5">
                當前星級效果：戰鬥被動 ${(100 + (stars - 1) * 35)}% 效能 ${stars >= 2 ? `｜ 採集模式每 ${stars === 3 ? '5' : '9'} 秒自動接住漏掉音符！` : '（升至 2★ 解鎖採集自動接音）'}
              </div>
              ${!fam.unlocked ? `<div class="text-[10px] text-rose-400 mt-1">🔒 ${fam.unlockCondition}</div>` : ''}
            </div>
          </div>
          ${fam.unlocked
            ? `<div class="flex sm:flex-col gap-1.5 shrink-0">
                <button onclick="toggleFamiliar('${fam.id}')" class="px-3.5 py-1.5 rounded-lg text-xs font-black ${isActive ? 'bg-slate-800 text-amber-300 border border-amber-500/50' : 'btn-arcane-gold'}">${isActive ? '✦ 隨行中' : '召喚'}</button>
                ${stars < 3
                  ? `<button onclick="upgradeFamiliarStar('${fam.id}')" ${canStarUp ? '' : 'disabled'} class="px-3 py-1 rounded-lg text-[10px] font-black ${canStarUp ? 'bg-purple-700 hover:bg-purple-600 text-white border border-purple-300' : 'bg-slate-900 text-slate-600'}">⬆️ 升至 ${stars + 1}★ (🪨${upgCost.ore}🪵${upgCost.wood}✨${upgCost.string})</button>`
                  : `<span class="text-center text-[10px] font-black text-amber-300">👑 已滿星覺醒</span>`}
              </div>`
            : `<span class="text-xs text-slate-600 shrink-0">未解鎖</span>`}
        `;
        list.appendChild(card);
      });
    }

window.upgradeFamiliarStar = function(id) {
      const fam = familiarsList.find(f => f.id === id);
      if (!fam || !fam.unlocked || (fam.starLevel || 1) >= 3) return;
      const stars = fam.starLevel || 1;
      const upgCost = { ore: stars * 3, wood: stars * 3, string: stars * 2 };
      if (gameState.materials.ore < upgCost.ore || gameState.materials.wood < upgCost.wood || gameState.materials.string < upgCost.string) return;
      gameState.materials.ore -= upgCost.ore;
      gameState.materials.wood -= upgCost.wood;
      gameState.materials.string -= upgCost.string;
      fam.starLevel = stars + 1;
      sound.playForgeSFX();
      showToast(`🌟【${fam.name}】進化至 ${fam.starLevel}★！已覺醒節奏採集自動接音光環！`);
      updateHUD();
      renderFamiliarsModal();
    };

window.toggleFamiliar = function(id) {
      const maxSlots = (gameState.skills.c_dual_familiar || 0) >= 1 ? 2 : 1;
      if (gameState.activeFamiliars.includes(id)) {
        gameState.activeFamiliars = gameState.activeFamiliars.filter(f => f !== id);
      } else {
        if (gameState.activeFamiliars.length >= maxSlots) gameState.activeFamiliars.shift();
        gameState.activeFamiliars.push(id);
      }
      sound.playSuccessSFX();
      updateHUD();
      renderFamiliarsModal();
    };

document.getElementById('btn-open-familiars').addEventListener('click', () => { renderFamiliarsModal(); familiarsModal.classList.remove('hidden'); });

document.getElementById('btn-close-familiars').addEventListener('click', () => familiarsModal.classList.add('hidden'));

/**
     * ============================================================================
     * 6. MUSICAL LISTENING BATTLE, PERFECT PARRY & BOSS PHASE 2 ENRAGE
     * ============================================================================
     */

const modalFeedback = document.getElementById('modal-feedback');

const monsterCombatBar = document.getElementById('monster-combat-bar');

function startParryChallenge(monster, rawIncomingDmg) {
      gameState.parryState = {
        active: true,
        startTime: performance.now(),
        duration: 1450,
        incomingDmg: rawIncomingDmg,
        monster,
        rafId: null
      };
      parryOverlay.classList.remove('hidden');
      const ringEl = document.getElementById('parry-shrinking-ring');

      const tickParry = (now) => {
        if (!gameState.parryState.active) return;
        const elapsed = now - gameState.parryState.startTime;
        const t = Math.min(1, elapsed / gameState.parryState.duration);
        // Shrinks from 180px down to 60px; target golden ring is 96px (at t ≈ 0.70)
        const size = 180 - t * 120;
        ringEl.style.width = `${size}px`;
        ringEl.style.height = `${size}px`;

        if (t >= 1) {
          resolveParryAttempt(false);
        } else {
          gameState.parryState.rafId = requestAnimationFrame(tickParry);
        }
      };
      gameState.parryState.rafId = requestAnimationFrame(tickParry);
    }

// --- BOSS PHASE 2 ENRAGE TRANSFORMATION ---

function checkBossPhase2Enrage(monster) {
      if (monster.isBoss && !monster.enraged && monster.hp > 0 && monster.hp <= monster.maxHp * 0.5) {
        monster.enraged = true;
        monster.enrageCountdown = 2;
        monster.shield = Math.max(monster.shield, 2);
        monster.theory = 'chromatic';
        if (gameState.currentChallenge) gameState.currentChallenge.theory = 'chromatic';
        sound.playEncounterClimaxSFX();
        triggerScreenShake();
        renderInstrumentInputView();
        showToast(`🔥 警告！【${monster.name}】進入二階段狂暴！獲得 2 層護盾並開始詠唱終焉樂章！`, 'border-rose-500 text-rose-200');
      }
    }

btnBattleNormalAtk.addEventListener('click', () => {
      const ch = gameState.currentChallenge;
      if (!ch || ch.mode !== 'monster' || ch.solved || gameState.parryState.active) return;
      const monster = ch.entity;
      const step = gameState.normalComboStep;
      const stats = getPlayerTotalStats();

      const w = getEquippedWeapon();
      const inst = w && w.category === 'guitar' ? 'guitar' : 'piano';
      sound.playNormalAttackSFX(step, inst);

      const stepMult = step === 3 ? 1.25 : (step === 2 ? 0.90 : 0.72);
      const harmonicSkill = 1.0 + (gameState.skills.p_harmonic_strike || 0) * 0.15;
      const hasCritRelic = stats.relic && stats.relic.id === 'crimson_distortion_pick';
      const critChance = (hasCritRelic ? 0.28 : 0.08) + (step === 3 ? 0.15 : 0);
      const isCritHit = Math.random() < critChance;
      let dmg = Math.max(8, Math.round(stats.totalAtk * stepMult * harmonicSkill * (isCritHit ? 1.55 : 1.0)));

      if (monster.shield > 0) {
        if (step === 3) monster.shield = Math.max(0, monster.shield - 1);
        dmg = Math.round(dmg * 0.7);
      }

      monster.hp -= dmg;
      checkBossPhase2Enrage(monster);
      updateMonsterCombatBar(monster);

      if (w) w.durability = Math.max(0, w.durability - 2);
      const mpGain = 18 + (gameState.activeFamiliars.includes('chrono_sentinel') ? 4 : 0);
      addMana(mpGain);
      updateHUD();
      renderBattleUltimates();

      gameState.normalComboStep = step >= 3 ? 1 : step + 1;
      syncBattleNormalAttackUI();

      if (monster.hp <= 0) {
        completeMonsterVictory(monster, dmg, false);
        return;
      }

      let counterMsg = '';
      if (monster.stunned > 0) {
        monster.stunned--;
        updateMonsterCombatBar(monster);
        counterMsg = '（魔物暈眩中，無法反擊！）';
      } else if (step === 3) {
        counterMsg = '（五度終結技震退魔物，打斷其反擊！）';
      } else {
        const rawIncoming = Math.max(4, Math.round(monster.atk * 0.65) - Math.floor(stats.totalDef * 0.5));
        applyDamageToPlayer(rawIncoming);
        counterMsg = `遭魔物反擊 -${rawIncoming} HP`;
      }

      modalFeedback.className = 'rounded-xl p-2 text-center font-bold text-xs sm:text-sm bg-sky-950/95 text-cyan-200 border border-cyan-400 animate-pop';
      modalFeedback.textContent = `⚔️ 奧術普攻第 ${step} 段命中${isCritHit ? '【💥暴擊!】' : ''}！造成 ${dmg} 點傷害，回復 +${mpGain} MP！${counterMsg}`;
      modalFeedback.classList.remove('hidden');
    });

function updateMonsterCombatBar(monster) {
      document.getElementById('monster-hp-fill').style.width = `${Math.max(0, Math.round((monster.hp / monster.maxHp) * 100))}%`;
      document.getElementById('monster-hp-text').textContent = `${Math.max(0, monster.hp)}/${monster.maxHp}`;
      const shEl = document.getElementById('monster-shield-badge');
      const stEl = document.getElementById('monster-stun-badge');
      const enEl = document.getElementById('boss-enrage-badge');
      if (monster.shield > 0) { shEl.textContent = `🛡️ 護盾 x${monster.shield}`; shEl.classList.remove('hidden'); } else shEl.classList.add('hidden');
      if (monster.stunned > 0) { stEl.textContent = `⚡ 暈眩 (${monster.stunned}回合)`; stEl.classList.remove('hidden'); } else stEl.classList.add('hidden');
      if (monster.enraged) {
        enEl.textContent = `🔥 二階段狂暴 · 終焉詠唱 (${monster.enrageCountdown}回合)`;
        enEl.classList.remove('hidden');
      } else {
        enEl.classList.add('hidden');
      }
      document.getElementById('combat-combo-count').textContent = gameState.combatCombo;
    }

function setupChallengeModalUI(opts) {
      document.getElementById('modal-npc-avatar').textContent = opts.avatar;
      document.getElementById('modal-npc-name').textContent = opts.name;
      document.getElementById('modal-quest-title').textContent = opts.title;
      document.getElementById('modal-dialogue').textContent = opts.dialogue;
      modalFeedback.classList.add('hidden');
      parryOverlay.classList.add('hidden');

      const theoryMap = { white: 'C大調白鍵', chromatic: '12音半音階(#)', intervals: '星界音程' };
      document.getElementById('modal-theory-badge').textContent = theoryMap[opts.theory] || '音律試煉';

      const affBadge = document.getElementById('modal-affinity-badge');
      if (opts.affinity) {
        affBadge.textContent = opts.affinity === 'major' ? '☀️ 大調弱點 (1.5x)' : '🌙 小調弱點 (1.5x)';
        affBadge.className = opts.affinity === 'major'
          ? 'text-[10px] font-black px-2 py-0.5 rounded border bg-amber-950 text-amber-300 border-amber-500'
          : 'text-[10px] font-black px-2 py-0.5 rounded border bg-indigo-950 text-indigo-300 border-indigo-400';
        affBadge.classList.remove('hidden');
      } else {
        affBadge.classList.add('hidden');
      }

      if (opts.showNormalAtkBtn) {
        btnBattleNormalAtk.classList.remove('hidden');
        syncBattleNormalAttackUI();
      } else {
        btnBattleNormalAtk.classList.add('hidden');
      }

      if (opts.showMonsterBar) {
        monsterCombatBar.classList.remove('hidden');
        battleUltimatesBox.classList.remove('hidden');
        renderBattleUltimates();
      } else {
        monsterCombatBar.classList.add('hidden');
        battleUltimatesBox.classList.add('hidden');
      }

      staffTabletBox.classList.remove('hidden');
      syncStaffToggleUI();
      drawTrebleStaffNotes(gameState.currentChallenge ? gameState.currentChallenge.targetSeq : [], -1);

      const ch = gameState.currentChallenge;
      let eliminatedId = null;
      if (gameState.activeFamiliars.includes('nocturne_owl') && ch.mode === 'monster') {
        const wrongPool = sound.whiteNotes.filter(n => !ch.targetSeq.includes(n.id));
        if (wrongPool.length > 0) eliminatedId = wrongPool[0].id;
      }

      const relic = getEquippedRelic();
      if (relic && relic.id === 'astral_staff_crest' && ch.targetSeq.length > 0) {
        ch.userSeq = [ch.targetSeq[0]];
      }

      syncChallengeInstrumentButtons(ch.instrument);
      renderInstrumentInputView(eliminatedId);
      renderAnswerSlots();
      challengeModal.classList.remove('hidden');

      setTimeout(() => playTargetSequenceWithStaffSync(ch), 260);
    }

function startFreestyleSolo(monster) {
      if (gameState.freestyleSolo.active) return;
      gameState.freestyleSolo = { active: true, timeLeft: 4.0, hits: 0, rafId: null };
      const banner = document.getElementById('freestyle-solo-banner');
      const timerTxt = document.getElementById('freestyle-timer-text');
      banner.classList.remove('hidden');

      let lastT = performance.now();
      const tickSolo = (now) => {
        if (!gameState.freestyleSolo.active) return;
        const dt = (now - lastT) / 1000;
        lastT = now;
        gameState.freestyleSolo.timeLeft = Math.max(0, gameState.freestyleSolo.timeLeft - dt);
        timerTxt.textContent = gameState.freestyleSolo.timeLeft.toFixed(1);
        if (gameState.freestyleSolo.timeLeft <= 0 || monster.hp <= 0) {
          gameState.freestyleSolo.active = false;
          banner.classList.add('hidden');
          return;
        }
        gameState.freestyleSolo.rafId = requestAnimationFrame(tickSolo);
      };
      gameState.freestyleSolo.rafId = requestAnimationFrame(tickSolo);
    }

/**
     * ============================================================================
     * 7. RHYTHM GATHERING MINI-GAME 3.0 (WITH FAMILIAR STAR AUTO-CATCH)
     * ============================================================================
     */

/**
     * ============================================================================
     * 8. MAIN 3D SIMULATION LOOP, SLASH HIT DETECTION (MONSTERS & CRYSTAL VEINS)
     * ============================================================================
     */

function triggerInteractable(ent) {
      if (!ent) return;
      if (ent.kind === 'npc') openNPCDialogue(ent.ref);
      else if (ent.kind === 'chest') openSealedChestChallenge(ent.ref);
      else if (ent.kind === 'vein') performOverworldNormalAttack();
      else if (ent.kind === 'monster') openMonsterBattle(ent.ref, 0);
    }

function animate() {
      requestAnimationFrame(animate);
      const rawDt = Math.min(0.05, clock.getDelta());
      if (gameState.hitstopTimer > 0) {
        gameState.hitstopTimer -= rawDt;
        renderer.render(scene, camera);
        return;
      }
      const dt = rawDt;
      const elapsed = clock.getElapsedTime();

      // Live Battle Microphone Pitch Detection -> Auto Cast Note
      if (gameState.battleMicEnabled && sound.micActive && !challengeModal.classList.contains('hidden') && gameState.currentChallenge && !gameState.currentChallenge.solved) {
        const pitch = sound.detectPitch();
        if (pitch && pitch.freq > 0) {
          document.getElementById('battle-mic-note').textContent = pitch.noteName;
          document.getElementById('battle-mic-hz').textContent = `${pitch.freq.toFixed(1)} Hz`;
          const nowMs = performance.now();
          if (Math.abs(pitch.cents) <= 28 && nowMs - gameState.lastBattleMicTime > 520) {
            const pcMap = ['Do', 'Do#', 'Re', 'Re#', 'Mi', 'Fa', 'Fa#', 'Sol', 'Sol#', 'La', 'La#', 'Si'];
            const matchedSolfege = pcMap[(pitch.midi % 12 + 12) % 12];
            const finalId = (pitch.midi >= 72 && matchedSolfege === 'Do') ? "Do'" : matchedSolfege;
            gameState.lastBattleMicTime = nowMs;
            handleNoteClick(finalId);
          }
        }
      }

      if (!anyModalOpen() && !gameState.encounterTransitioning) {
        const moveSpeed = 7.8 * dt;
        let dx = 0, dz = 0;

        if (gameState.keys['w'] || gameState.keys['arrowup'] || gameState.keys['up']) dz -= 1;
        if (gameState.keys['s'] || gameState.keys['arrowdown'] || gameState.keys['down']) dz += 1;
        if (gameState.keys['a'] || gameState.keys['arrowleft'] || gameState.keys['left']) dx -= 1;
        if (gameState.keys['d'] || gameState.keys['arrowright'] || gameState.keys['right']) dx += 1;

        if (dx !== 0 || dz !== 0) {
          gameState.targetPos = null;
          waypointRing.visible = false;
          const len = Math.hypot(dx, dz);
          const inputX = dx / len, inputZ = dz / len;
          const worldDx = inputX * Math.cos(camYaw) + inputZ * Math.sin(camYaw);
          const worldDz = -inputX * Math.sin(camYaw) + inputZ * Math.cos(camYaw);
          gameState.playerPos.x = Math.max(-24, Math.min(24, gameState.playerPos.x + worldDx * moveSpeed));
          gameState.playerPos.z = Math.max(-24, Math.min(24, gameState.playerPos.z + worldDz * moveSpeed));
          playerGroup.rotation.y = Math.atan2(worldDx, worldDz);
        } else if (gameState.targetPos) {
          const tx = gameState.targetPos.x - gameState.playerPos.x;
          const tz = gameState.targetPos.z - gameState.playerPos.z;
          const dist = Math.hypot(tx, tz);
          if (dist > 0.22) {
            gameState.playerPos.x += (tx / dist) * moveSpeed;
            gameState.playerPos.z += (tz / dist) * moveSpeed;
            playerGroup.rotation.y = Math.atan2(tx, tz);
          } else {
            gameState.targetPos = null;
            waypointRing.visible = false;
          }
        }
      }

      playerGroup.position.set(gameState.playerPos.x, 0, gameState.playerPos.z);

      if (gameState.castAnimTimer > 0) {
        gameState.castAnimTimer -= dt;
        staffGroup.position.y = 1.65 + Math.sin(elapsed * 22) * 0.14;
        staffGroup.rotation.z = 0;
        staffCrystal.rotation.y += dt * 12;
      } else if (gameState.slashAnimTimer > 0) {
        gameState.slashAnimTimer -= dt;
        staffGroup.rotation.x = Math.sin((0.28 - gameState.slashAnimTimer) * 18) * 1.1;
        staffGroup.rotation.z = -0.55;
      } else {
        staffGroup.position.y = 1.25 + Math.sin(elapsed * 3) * 0.05;
        staffGroup.rotation.x = 0;
        staffGroup.rotation.z = -0.18;
        staffCrystal.rotation.y += dt * 2.5;
      }
      mageAuraRing.rotation.z = elapsed * 0.8;

      if (familiarOrb1.visible) {
        familiarOrb1.position.set(Math.cos(elapsed * 2.4) * 1.15, 1.7 + Math.sin(elapsed * 4) * 0.15, Math.sin(elapsed * 2.4) * 1.15);
        familiarOrb1.rotation.y = elapsed * 3;
      }
      if (familiarOrb2.visible) {
        familiarOrb2.position.set(Math.cos(elapsed * 2.4 + Math.PI) * 1.15, 1.7 + Math.cos(elapsed * 4) * 0.15, Math.sin(elapsed * 2.4 + Math.PI) * 1.15);
        familiarOrb2.rotation.y = -elapsed * 3;
      }

      // Overworld Normal Attack Projectiles -> Hit Monsters OR Slashable Crystal Veins!
      for (let i = arcaneSlashes.length - 1; i >= 0; i--) {
        const sl = arcaneSlashes[i];
        sl.life -= dt;
        sl.mesh.position.x += sl.vx * dt;
        sl.mesh.position.z += sl.vz * dt;
        sl.mesh.rotation.y += dt * 16;

        let triggeredBattle = false;
        let veinHitNeedsRebuild = false;
        for (const ent of [...worldEntities]) {
          if (ent.kind === 'monster' && ent.ref.respawnTimer <= 0 && !sl.hitIds.has(ent.ref.id)) {
            const hitRad = ent.ref.isBoss ? 2.1 : 1.45;
            if (Math.hypot(ent.x - sl.mesh.position.x, ent.z - sl.mesh.position.z) <= hitRad) {
              sl.hitIds.add(ent.ref.id);
              spawnFloating3DDamage(ent.x, 2.2, ent.z, `-${sl.dmg} 音刃`, sl.step === 3);
              triggerBattleEncounterTransition(ent.ref, sl.dmg);
              triggeredBattle = true;
              break;
            }
          } else if (ent.kind === 'chime' && !sl.hitIds.has(ent.ref.id)) {
            if (Math.hypot(ent.x - sl.mesh.position.x, ent.z - sl.mesh.position.z) <= 1.55) {
              sl.hitIds.add(ent.ref.id);
              const chimeSet = biomeChimesMap[gameState.currentBiome];
              const litCount = chimeSet.pillars.filter(x => x.lit).length;
              if (ent.ref.step === litCount + 1) {
                ent.ref.lit = true;
                sound.playNote(ent.ref.freq, 'piano', 0.85);
                spawnFloating3DDamage(ent.x, 2.6, ent.z, `🎐 ${ent.ref.note} 共鳴!`, true);
                if (chimeSet.pillars.every(x => x.lit)) {
                  chimeSet.solved = true;
                  gameState.stats.chimesSolved = (gameState.stats.chimesSolved || 0) + 1;
                  gameState.materials.core += 1;
                  gameState.materials.ore += 4;
                  gameState.materials.string += 3;
                  sound.playSuccessSFX();
                  addExp(120);
                  showToast('🎐✨ 三座風鈴音階共鳴完成！獲得 💠魔王結晶+1、🪨礦石+4、✨琴弦+3！');
                }
              } else {
                chimeSet.pillars.forEach(x => x.lit = false);
                sound.playErrorSFX();
                showToast('⚠️ 音階順序錯誤！風鈴陣已重置（請按 ① → ② → ③ 順序劈響）', 'border-rose-500 text-rose-200');
              }
              veinHitNeedsRebuild = true;
              break;
            }
          } else if (ent.kind === 'vein' && ent.ref.respawnTimer <= 0 && !sl.hitIds.has(ent.ref.id)) {
            if (Math.hypot(ent.x - sl.mesh.position.x, ent.z - sl.mesh.position.z) <= 1.6) {
              sl.hitIds.add(ent.ref.id);
              ent.ref.hp -= 1;
              sound.playForgeSFX();
              spawnFloating3DDamage(ent.x, 1.8, ent.z, '⛏️ 劈開礦脈!', false);
              if (ent.ref.hp <= 0) {
                ent.ref.respawnTimer = 25;
                ent.ref.hp = ent.ref.maxHp;
                gameState.materials.ore += 2;
                gameState.materials.wood += 1;
                gameState.materials.string += 1;
                if (gameState.currentBiome === 'ch2') gameState.materials.thunder += 1;
                addMana(12);
                updateHUD();
                showToast(`⛏️ 劈開【${ent.ref.name}】！獲得 🪨礦石+2 🪵古木+1 ✨琴弦+1${gameState.currentBiome === 'ch2' ? ' ⚡雷霆石+1' : ''}！`);
              }
              veinHitNeedsRebuild = true;
              break;
            }
          }
        }
        if (veinHitNeedsRebuild && !triggeredBattle) {
          build3DBiome(gameState.currentBiome, true);
        }

        if (triggeredBattle) break;
        if (sl.life <= 0) {
          scene.remove(sl.mesh);
          arcaneSlashes.splice(i, 1);
        }
      }

      // Respawn Monsters & Crystal Veins
      let needsRebuild = false;
      (biomeMonstersMap[gameState.currentBiome] || []).forEach(m => {
        if (m.respawnTimer > 0) {
          m.respawnTimer -= dt;
          if (m.respawnTimer <= 0) { m.respawnTimer = 0; needsRebuild = true; }
        }
      });
      (biomeVeinsMap[gameState.currentBiome] || []).forEach(v => {
        if (v.respawnTimer > 0) {
          v.respawnTimer -= dt;
          if (v.respawnTimer <= 0) { v.respawnTimer = 0; needsRebuild = true; }
        }
      });
      if (needsRebuild) build3DBiome(gameState.currentBiome, true);

      let closestEnt = null, minDist = 4.6;
      worldEntities.forEach(ent => {
        if ((ent.kind === 'monster' || ent.kind === 'vein') && ent.ref.respawnTimer > 0) return;
        if (ent.kind === 'monster') {
          if (!anyModalOpen() && !gameState.encounterTransitioning) {
            ent.ref.patrolAngle += dt * 0.7;
            ent.x = ent.ref.homeX + Math.cos(ent.ref.patrolAngle) * ent.ref.patrolRadius;
            ent.z = ent.ref.homeZ + Math.sin(ent.ref.patrolAngle) * ent.ref.patrolRadius;
            ent.ref.x = ent.x;
            ent.ref.z = ent.z;
          }
          ent.mesh.position.set(ent.x, Math.sin(elapsed * 2.5 + ent.x) * 0.12, ent.z);
          ent.mesh.children[0].rotation.y = elapsed * 1.1;
          const hpBar = ent.labelEl && ent.labelEl.querySelector('.monster-tag-hp');
          if (hpBar) hpBar.style.width = `${Math.max(0, Math.round((ent.ref.hp / ent.ref.maxHp) * 100))}%`;
        } else if (ent.kind === 'npc' && ent.ref.portalColor) {
          ent.mesh.children[0].rotation.z = elapsed * 1.4;
        }

        const d = Math.hypot(gameState.playerPos.x - ent.x, gameState.playerPos.z - ent.z);
        if (d < minDist) { minDist = d; closestEnt = ent; }

        if (ent.labelEl) {
          tempVec.set(ent.x, ent.kind === 'monster' && ent.ref.isBoss ? 3.8 : 2.95, ent.z);
          tempVec.project(camera);
          if (tempVec.z > 1) {
            ent.labelEl.style.display = 'none';
          } else {
            ent.labelEl.style.display = 'block';
            const sx = (tempVec.x * 0.5 + 0.5) * threeHost.clientWidth;
            const sy = (-tempVec.y * 0.5 + 0.5) * threeHost.clientHeight;
            ent.labelEl.style.left = `${sx}px`;
            ent.labelEl.style.top = `${sy}px`;
          }
        }
      });

      gameState.activeInteractable = closestEnt;
      if (closestEnt && !anyModalOpen() && !gameState.encounterTransitioning) {
        npcPrompt.classList.remove('hidden');
        if (closestEnt.kind === 'monster') {
          npcPromptText.textContent = `按 [空白鍵/J] 普攻斬擊開戰，或 [E] 對決「${closestEnt.ref.name}」`;
        } else if (closestEnt.kind === 'chest') {
          npcPromptText.textContent = closestEnt.ref.opened ? '💎 寶箱已開啟' : `按 [E] 解鎖「${closestEnt.ref.name}」`;
        } else if (closestEnt.kind === 'vein') {
          npcPromptText.textContent = `按 [空白鍵/J] 揮動音刃劈開「${closestEnt.ref.name}」`;
        } else {
          npcPromptText.textContent = `按 [E] 與「${closestEnt.ref.name}」互動`;
        }
      } else {
        npcPrompt.classList.add('hidden');
      }

      for (let i = shockwaveMeshes.length - 1; i >= 0; i--) {
        const sw = shockwaveMeshes[i];
        sw.scale += dt * 16;
        sw.alpha -= dt * 1.3;
        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        sw.mesh.material.opacity = Math.max(0, sw.alpha);
        if (sw.alpha <= 0) { scene.remove(sw.mesh); shockwaveMeshes.splice(i, 1); }
      }

      envAnimItems.forEach(item => {
        if (item.type === 'sway') {
          item.mesh.rotation.z = Math.sin(elapsed * 1.6 + item.phase) * 0.06;
          item.mesh.rotation.x = Math.cos(elapsed * 1.3 + item.phase) * 0.04;
        } else if (item.type === 'spinFloat') {
          item.mesh.rotation.y = elapsed * item.speed;
          item.mesh.position.y = item.baseY + Math.sin(elapsed * 2.4) * 0.22;
        }
      });

      if (skyRingGroup) {
        skyRingGroup.children[0].rotation.z = elapsed * 0.14;
        skyRingGroup.children[1].rotation.z = -elapsed * 0.22;
      }

      if (ambientParticles) {
        const posArr = ambientParticles.geometry.attributes.position.array;
        const isSnow = gameState.currentBiome === 'ch3';
        for (let i = 0; i < posArr.length; i += 3) {
          if (isSnow) {
            posArr[i + 1] -= dt * 1.4;
            posArr[i] += Math.sin(elapsed + i) * dt * 0.4;
            if (posArr[i + 1] < 0.2) posArr[i + 1] = 11.5;
          } else {
            posArr[i + 1] += Math.sin(elapsed * 1.8 + i) * dt * 0.45;
            posArr[i] += Math.cos(elapsed * 1.2 + i) * dt * 0.35;
          }
        }
        ambientParticles.geometry.attributes.position.needsUpdate = true;
      }

      if (gameState.encounterTransitioning && gameState.encounterCamTarget) {
        const midX = (gameState.playerPos.x + gameState.encounterCamTarget.x) * 0.5;
        const midZ = (gameState.playerPos.z + gameState.encounterCamTarget.z) * 0.5;
        const zoomDist = 8.5;
        camera.position.lerp(
          new THREE.Vector3(midX + zoomDist * Math.sin(camYaw) * 0.6, 5.2, midZ + zoomDist * Math.cos(camYaw) * 0.6),
          0.16
        );
        camera.lookAt(midX, 1.3, midZ);
      } else {
        const targetCamX = gameState.playerPos.x + camDist * Math.sin(camYaw) * Math.cos(camPitch);
        const targetCamY = camDist * Math.sin(camPitch);
        const targetCamZ = gameState.playerPos.z + camDist * Math.cos(camYaw) * Math.cos(camPitch);
        camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.14);
        camera.lookAt(gameState.playerPos.x, 1.2, gameState.playerPos.z);
      }

      drawMiniRadar();
      renderer.render(scene, camera);
    }

build3DBiome(gameState.currentBiome, false);
