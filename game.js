// ============ TELEGRAM ============
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// ============ КОНСТАНТЫ ============
const FACTIONS = {
  aurora: {
    name: 'Республика Аврора', color: '#00d4ff',
    start: { money: 1500, welfare: 80, population: 127500000, taxRate: 0.30 },
  },
  vesper: {
    name: 'Доминион Веспер', color: '#ff3b5c',
    start: { money: 1500, welfare: 60, population: 100000000, taxRate: 0.35 },
  },
};

const DIFFICULTY = {
  easy:   { playerMoneyMult: 1.2, playerSatPenalty: 0 },
  normal: { playerMoneyMult: 1.0, playerSatPenalty: 0 },
  hard:   { playerMoneyMult: 0.85, playerSatPenalty: 5 },
  insane: { playerMoneyMult: 0.7, playerSatPenalty: 15 },
};

const LANG = {
  ru: {
    gameTitle: 'ЛИТИЙНАЯ ДУГА', gameSubtitle: 'Стратегия в реальном времени за ресурс будущего',
    language: 'ЯЗЫК · LANGUAGE', faction: 'СТОРОНА', difficulty: 'СЛОЖНОСТЬ',
    startGame: 'НАЧАТЬ ИГРУ',
    auroraName: 'Республика Аврора', vesperName: 'Доминион Веспер',
    easy: 'Легко', normal: 'Норма', hard: 'Сложно', insane: 'Хардкор',
    diffEasy: 'Спокойное знакомство.', diffNormal: 'Сбалансированная игра.',
    diffHard: 'ИИ агрессивнее.', diffInsane: 'Максимальное давление.',
    aiIncome: 'Доход', playerMoney: 'Ваши деньги', playerSat: 'Старт. благо',
    chooseTarget: 'Выберите цель', chooseSource: 'Откуда атаковать?', backToMenu: 'В меню',
    ownerAurora: 'Аврора', ownerVesper: 'Веспер', ownerNeutral: 'Нейтрал',
    typeCapital: 'Столица', typeLarge: 'Крупный', typeMedium: 'Средний', typeSmall: 'Малый',
    cityOwner: 'Владелец:', cityType: 'Тип:', cityGarrison: 'Гарнизон:',
    cityInfra: 'Инфраструктура:', cityIncome: 'Доход:', cityDefense: 'Оборона:',
    cityBuildings: 'Здания:', cityStrategic: 'Стратег. объект:',
    tabCountry: 'Страна', tabServices: 'Службы', tabLogistics: 'Логистика', tabProduction: 'Производство',
    populationLabel: 'Население', birthRate: 'Рождаемость', deathRate: 'Смертность',
    workersLabel: 'Работают', armyLabel: 'В армии', welfareLabel: 'Благосостояние',
    taxLabel: 'Налоги', paymentsLabel: 'Выплаты населению',
    svcScience: 'Наука и образование', svcOrder: 'Правопорядок',
    svcHealth: 'Здравоохранение', svcEmergency: 'МЧС', svcCorruption: 'Коррупция',
    invest: 'Вложить +8', antiCorruption: 'Антикоррупционная кампания',
    svcScienceDesc: 'До +25% дохода', svcOrderDesc: 'Меньше беспорядков',
    svcHealthDesc: 'Меньше потерь', svcEmergencyDesc: 'Меньше ущерба',
    grpEconomy: '🏭 Экономика и производство', grpMilitary: '⚔️ Военная мощь',
    grpResources: '📦 Ресурсы', grpBuild: '🏗️ Здания в городах',
    techEconomy: 'Экономика', techCombat: 'Боевая подготовка', techArmor: 'Военная техника',
    techLogistics: 'Логистика', techAA: 'ПВО', techDrones: 'Дроны',
    techDroneFactory: 'Заводы дронов', techMobilization: 'Мобилизация',
    techLife: 'Качество жизни', techBirth: 'Рождаемость',
    techEconomyDesc: '+20% дохода за уровень', techCombatDesc: '+12% атаки за уровень',
    techArmorDesc: '+12% обороны за уровень', techLogisticsDesc: '−8% расход, +10% выпуск',
    techAADesc: 'Шанс сбить дроны', techDronesDesc: 'Открывает дроны',
    techDroneFactoryDesc: '+0.04/с сборка дронов', techMobDesc: 'Открывает призыв',
    techLifeDesc: '+0.07 к благу/с', techBirthDesc: '+1.2‰ за уровень',
    mobilize: 'Мобилизация · призыв',
    resAmmo: 'Боеприпасы', resWeapons: 'Оружие', resTanks: 'Танки', resFuel: 'Топливо',
    buy: 'Купить', bldMine: 'Шахта', bldFactory: 'Завод', bldAmmo: 'Завод боеприпасов',
    bldWeapon: 'Оружейный завод', bldTank: 'Танковый завод', bldOil: 'Нефтяная скважина',
    buildHint: 'Тапните город → кнопка «Строить».',
  },
  en: {
    gameTitle: 'LITHIUM ARC', gameSubtitle: 'Real-time strategy',
    language: 'LANGUAGE · ЯЗЫК', faction: 'FACTION', difficulty: 'DIFFICULTY',
    startGame: 'START GAME',
    auroraName: 'Aurora Republic', vesperName: 'Vesper Dominion',
    easy: 'Easy', normal: 'Normal', hard: 'Hard', insane: 'Insane',
    diffEasy: 'Calm intro.', diffNormal: 'Balanced.', diffHard: 'AI aggressive.', diffInsane: 'Maximum pressure.',
    aiIncome: 'Income', playerMoney: 'Your money', playerSat: 'Start welfare',
    chooseTarget: 'Choose target', chooseSource: 'Attack from?', backToMenu: 'Back',
    ownerAurora: 'Aurora', ownerVesper: 'Vesper', ownerNeutral: 'Neutral',
    typeCapital: 'Capital', typeLarge: 'Large', typeMedium: 'Medium', typeSmall: 'Small',
    cityOwner: 'Owner:', cityType: 'Type:', cityGarrison: 'Garrison:',
    cityInfra: 'Infrastructure:', cityIncome: 'Income:', cityDefense: 'Defense:',
    cityBuildings: 'Buildings:', cityStrategic: 'Strategic:',
    tabCountry: 'Country', tabServices: 'Services', tabLogistics: 'Logistics', tabProduction: 'Production',
    populationLabel: 'Population', birthRate: 'Birth rate', deathRate: 'Death rate',
    workersLabel: 'Workers', armyLabel: 'In army', welfareLabel: 'Welfare',
    taxLabel: 'Taxes', paymentsLabel: 'Payments to people',
    svcScience: 'Science & Education', svcOrder: 'Law & Order',
    svcHealth: 'Healthcare', svcEmergency: 'Emergency', svcCorruption: 'Corruption',
    invest: 'Invest +8', antiCorruption: 'Anti-corruption',
    svcScienceDesc: 'Up to +25% income', svcOrderDesc: 'Fewer riots',
    svcHealthDesc: 'Fewer losses', svcEmergencyDesc: 'Less damage',
    grpEconomy: '🏭 Economy & Production', grpMilitary: '⚔️ Military',
    grpResources: '📦 Resources', grpBuild: '🏗️ Buildings',
    techEconomy: 'Economy', techCombat: 'Combat', techArmor: 'Armor',
    techLogistics: 'Logistics', techAA: 'Air defense', techDrones: 'Drones',
    techDroneFactory: 'Drone factories', techMobilization: 'Mobilization',
    techLife: 'Quality of life', techBirth: 'Birth rate',
    techEconomyDesc: '+20% income/level', techCombatDesc: '+12% attack/level',
    techArmorDesc: '+12% defense/level', techLogisticsDesc: '−8% cost, +10% output',
    techAADesc: 'Shoot down drones', techDronesDesc: 'Unlock drones',
    techDroneFactoryDesc: '+0.04/s drone build', techMobDesc: 'Unlock conscription',
    techLifeDesc: '+0.07 welfare/s', techBirthDesc: '+1.2‰/level',
    mobilize: 'Mobilization',
    resAmmo: 'Ammo', resWeapons: 'Weapons', resTanks: 'Tanks', resFuel: 'Fuel',
    buy: 'Buy', bldMine: 'Mine', bldFactory: 'Factory', bldAmmo: 'Ammo factory',
    bldWeapon: 'Weapon factory', bldTank: 'Tank factory', bldOil: 'Oil well',
    buildHint: 'Tap a city → «Build» button.',
  },
};

// ============ STATE ============
const state = {
  settings: { language: 'ru', faction: null, difficulty: 'normal' },
  faction: null, enemyFaction: null, difficulty: null,
  money: 0, welfare: 55, population: 127500000, taxRate: 0.30,
  army: 0,
  timeScale: 1, paused: false, gameOver: false,
  gameOverShown: false, welfareTrend: 0,
  paymentsCost: 70,
  services: { science: 31, order: 23, health: 23, emergency: 23, corruption: 9 },
  tech: {
    economy: 2, combat: 2, armor: 1, logistics: 1, aa: 2,
    drones: 1, dronefactory: 1, mobilization: 1, life: 2, birth: 1,
  },
  resources: { ammo: 139, weapons: 71, tanks: 3, fuel: 162 },
  mobilizeCooldown: 0,
};

const RESOURCE_MAX = { ammo: 300, weapons: 200, tanks: 40, fuel: 300 };

// ============ КАРТА ============
const MAP = { W: 40, H: 30, TILE: 40 };
const WORLD_W = MAP.W * MAP.TILE;
const WORLD_H = MAP.H * MAP.TILE;

let CITIES = [];
let ROADS = [];
let ACTIVE_ATTACKS = [];
let seed = 12345;
function rand() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }

let canvas, ctx, dpr = window.devicePixelRatio || 1;
let worldCanvas, worldCtx;

const camera = {
  x: 0, y: 0, zoom: 1, minZoom: 0.5, maxZoom: 2.5,
  dragging: false, dragStartX: 0, dragStartY: 0,
  cameraStartX: 0, cameraStartY: 0, moved: false,
  pinching: false, pinchStartDist: 0, pinchStartZoom: 1,
  pinchCenterX: 0, pinchCenterY: 0,
};

// ============ КОНФИГУРАЦИИ ============
const SERVICES_CFG = {
  science:     { baseCost: 130, increment: 8 },
  order:       { baseCost: 95,  increment: 8 },
  health:      { baseCost: 95,  increment: 8 },
  emergency:   { baseCost: 95,  increment: 8 },
};

const TECH_CFG = {
  economy: 300, combat: 350, armor: 300, logistics: 280,
  aa: 400, drones: 350, dronefactory: 280, mobilization: 280,
  life: 380, birth: 280,
};

const BUILDINGS_CFG = {
  mine:          { ru: 'Шахта', en: 'Mine', cost: 850 },
  factory:       { ru: 'Завод', en: 'Factory', cost: 700 },
  ammoFactory:   { ru: 'Завод боеприпасов', en: 'Ammo factory', cost: 1020 },
  weaponFactory: { ru: 'Оружейный завод', en: 'Weapon factory', cost: 1360 },
  tankFactory:   { ru: 'Танковый завод', en: 'Tank factory', cost: 1200 },
  oilWell:       { ru: 'Нефтяная скважина', en: 'Oil well', cost: 1105 },
};

const FORTIFICATIONS = [
  { level: 0, icon: '🏘️', ru: 'Открытый', en: 'Open', cost: 0 },
  { level: 1, icon: '🛡️', ru: 'Окопы', en: 'Trenches', cost: 50 },
  { level: 2, icon: '🏰', ru: 'Бункеры', en: 'Bunkers', cost: 150 },
  { level: 3, icon: '🚀', ru: 'ПВО', en: 'Air def', cost: 300 },
  { level: 4, icon: '🛰️', ru: 'РЭБ', en: 'EW', cost: 600 },
];

const MAX_BUILDINGS = 8;

// ============ МЕНЮ ============
function applyLanguage(lang) {
  state.settings.language = lang;
  const dict = LANG[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key]) el.textContent = dict[key];
  });
  localStorage.setItem('lang', lang);
  if (state.settings.difficulty) updateDifficultyDesc(state.settings.difficulty);
}

function selectFaction(faction) {
  state.settings.faction = faction;
  document.querySelectorAll('.faction-card').forEach(c =>
    c.classList.toggle('selected', c.dataset.faction === faction)
  );
  checkReady();
}

function selectDifficulty(diff) {
  state.settings.difficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b =>
    b.classList.toggle('selected', b.dataset.diff === diff)
  );
  updateDifficultyDesc(diff);
  checkReady();
}

function updateDifficultyDesc(diff) {
  const dict = LANG[state.settings.language];
  const d = DIFFICULTY[diff];
  const el = document.getElementById('difficulty-desc');
  el.dataset.diff = diff;

  const pct = (mult) => {
    const v = Math.round((mult - 1) * 100);
    return (v > 0 ? '+' : '') + v + '%';
  };

  const cap = diff.charAt(0).toUpperCase() + diff.slice(1);

  el.innerHTML = `
    <div class="desc-title">${dict['diff' + cap]}</div>
    <div class="row-desc"><span>${dict.playerMoney}</span><span>${pct(d.playerMoneyMult)}</span></div>
    <div class="row-desc"><span>${dict.playerSat}</span><span>${d.playerSatPenalty > 0 ? '−' + d.playerSatPenalty : '—'}</span></div>
  `;
}

function checkReady() {
  const s = state.settings;
  document.getElementById('start-btn').disabled = !(s.language && s.faction && s.difficulty);
}

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    applyLanguage(btn.dataset.lang);
  });
});

document.querySelectorAll('.faction-card').forEach(card => {
  card.addEventListener('click', () => selectFaction(card.dataset.faction));
});

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => selectDifficulty(btn.dataset.diff));
});

document.getElementById('start-btn').addEventListener('click', startGame);

(function initLanguage() {
  const saved = localStorage.getItem('lang');
  const tgLang = tg?.initDataUnsafe?.user?.language_code;
  let lang = saved || (tgLang === 'en' ? 'en' : 'ru');
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('selected', b.dataset.lang === lang));
  applyLanguage(lang);
  updateDifficultyDesc(state.settings.difficulty);
})();

// ============ ГЕНЕРАЦИЯ ГОРОДОВ ============
function generateCities() {
  CITIES = [];

  CITIES.push({
    x: 3, y: 3, type: 'capital', owner: 'aurora',
    name: 'Аврора', baseIncome: 1.5, basePop: 5, infrastructure: 100, garrison: 5,
    fortification: 2,
    buildings: { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0 },
  });
  CITIES.push({
    x: MAP.W - 4, y: MAP.H - 4, type: 'capital', owner: 'vesper',
    name: 'Веспер', baseIncome: 1.5, basePop: 5, infrastructure: 100, garrison: 5,
    fortification: 2,
    buildings: { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0 },
  });

  const auroraZone = { xMin: 2, xMax: 16, yMin: 2, yMax: MAP.H - 3 };
  const vesperZone = { xMin: 23, xMax: MAP.W - 3, yMin: 2, yMax: MAP.H - 3 };

  const composition = [
    { type: 'large', count: 5, baseIncome: 0.8, garrison: 3 },
    { type: 'medium', count: 10, baseIncome: 0.4, garrison: 2 },
    { type: 'small', count: 15, baseIncome: 0.15, garrison: 1 },
  ];

  const prefixAurora = ['Север', 'Запад', 'Край', 'Верх', 'Бел', 'Нов', 'Стар', 'Крас', 'Свет', 'Тих'];
  const prefixVesper = ['Юг', 'Восток', 'Дол', 'Низ', 'Черн', 'Гор', 'Степ', 'Огн', 'Тен', 'Гром'];
  const suffix = ['град', 'поль', 'бург', 'ов', 'ин', 'ск', 'ец', 'овка', 'ино', 'ово'];

  const usedNames = new Set();
  const genName = (prefixes) => {
    for (let i = 0; i < 100; i++) {
      const name = prefixes[Math.floor(rand() * prefixes.length)]
                 + suffix[Math.floor(rand() * suffix.length)];
      if (!usedNames.has(name)) { usedNames.add(name); return name; }
    }
    return 'Город-' + Math.floor(rand() * 10000);
  };

  const placeCities = (owner, zone, prefixes) => {
    composition.forEach(({ type, count, baseIncome, garrison }) => {
      let placed = 0, attempts = 0;
      while (placed < count && attempts < 1000) {
        attempts++;
        const x = zone.xMin + Math.floor(rand() * (zone.xMax - zone.xMin));
        const y = zone.yMin + Math.floor(rand() * (zone.yMax - zone.yMin));
        if (CITIES.some(c => Math.abs(c.x - x) < 3 && Math.abs(c.y - y) < 3)) continue;

        CITIES.push({
          x, y, type, owner, name: genName(prefixes),
          baseIncome, basePop: 1, garrison,
          infrastructure: 60 + Math.floor(rand() * 30),
          fortification: 0,
          buildings: { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0 },
        });
        placed++;
      }
    });
  };

  placeCities('aurora', auroraZone, prefixAurora);
  placeCities('vesper', vesperZone, prefixVesper);
}

// ============ ГЕНЕРАЦИЯ ДОРОГ ============
function getRoadsFrom(city) {
  return ROADS.filter(r => r.from === city || r.to === city)
    .map(r => r.from === city ? r.to : r.from);
}

function generateRoads() {
  ROADS = [];
  const seen = new Set();

  CITIES.forEach(city => {
    const neighbors = CITIES.filter(c => c !== city)
      .map(c => ({ city: c, dist: Math.hypot(c.x - city.x, c.y - city.y) }))
      .sort((a, b) => a.dist - b.dist);

    let maxLinks = city.type === 'capital' ? 4 : city.type === 'large' ? 3 : 2;
    let links = 0;

    for (const { city: neighbor, dist } of neighbors) {
      if (links >= maxLinks) break;
      if (dist > 8) break;
      const key = [CITIES.indexOf(city), CITIES.indexOf(neighbor)].sort().join('-');
      if (seen.has(key)) { links++; continue; }
      if (city.owner !== neighbor.owner) continue;
      seen.add(key);
      ROADS.push({ from: city, to: neighbor, type: city.owner === 'aurora' ? 'own' : 'enemy' });
      links++;
    }
  });

  const auroraCities = CITIES.filter(c => c.owner === 'aurora');
  const vesperCities = CITIES.filter(c => c.owner === 'vesper');

  auroraCities.forEach(aCity => {
    const enemyNeighbors = vesperCities
      .map(v => ({ city: v, dist: Math.hypot(v.x - aCity.x, v.y - aCity.y) }))
      .sort((a, b) => a.dist - b.dist);
    let borderLinks = 0;
    for (const { city: vCity, dist } of enemyNeighbors) {
      if (borderLinks >= 1) break;
      if (dist > 10) break;
      const key = [CITIES.indexOf(aCity), CITIES.indexOf(vCity)].sort().join('-');
      if (seen.has(key)) continue;
      seen.add(key);
      ROADS.push({ from: aCity, to: vCity, type: 'border' });
      borderLinks++;
    }
  });
}

// ============ WORLD CANVAS ============
function generateWorldCanvas() {
  worldCanvas = document.createElement('canvas');
  worldCanvas.width = WORLD_W;
  worldCanvas.height = WORLD_H;
  worldCtx = worldCanvas.getContext('2d');

  worldCtx.fillStyle = '#141820';
  worldCtx.fillRect(0, 0, WORLD_W, WORLD_H);

  drawRegionsVoronoi();
  drawRiver();
}

function drawRegionsVoronoi() {
  const points = CITIES.map(c => [c.x * MAP.TILE + MAP.TILE / 2, c.y * MAP.TILE + MAP.TILE / 2]);
  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, WORLD_W, WORLD_H]);

  CITIES.forEach((city, i) => {
    const polygon = voronoi.cellPolygon(i);
    if (!polygon) return;

    const cx = city.x * MAP.TILE + MAP.TILE / 2;
    const cy = city.y * MAP.TILE + MAP.TILE / 2;

    let centerColor, edgeColor;
    if (city.owner === 'aurora') {
      centerColor = 'rgba(0, 90, 130, 0.85)';
      edgeColor = 'rgba(0, 40, 65, 0.85)';
    } else if (city.owner === 'vesper') {
      centerColor = 'rgba(130, 25, 50, 0.85)';
      edgeColor = 'rgba(60, 10, 20, 0.85)';
    } else {
      centerColor = 'rgba(70, 75, 85, 0.85)';
      edgeColor = 'rgba(35, 40, 48, 0.85)';
    }

    const grad = worldCtx.createRadialGradient(cx, cy, 0, cx, cy, 250);
    grad.addColorStop(0, centerColor);
    grad.addColorStop(1, edgeColor);

    worldCtx.beginPath();
    polygon.forEach(([x, y], j) => {
      if (j === 0) worldCtx.moveTo(x, y);
      else worldCtx.lineTo(x, y);
    });
    worldCtx.closePath();
    worldCtx.fillStyle = grad;
    worldCtx.fill();
    worldCtx.strokeStyle = 'rgba(8, 10, 14, 0.95)';
    worldCtx.lineWidth = 1.5;
    worldCtx.stroke();
  });
}

function drawRiver() {
  let px = WORLD_W * 0.45;
  let phase = 0;
  worldCtx.strokeStyle = '#0a1a28';
  worldCtx.lineWidth = 10;
  worldCtx.lineCap = 'round';
  worldCtx.lineJoin = 'round';
  worldCtx.beginPath();
  worldCtx.moveTo(px, 0);
  for (let py = 0; py < WORLD_H; py += 8) {
    phase += 0.18;
    px += Math.sin(phase) * 14;
    px = Math.max(WORLD_W * 0.35, Math.min(WORLD_W * 0.65, px));
    worldCtx.lineTo(px, py);
  }
  worldCtx.stroke();
  worldCtx.strokeStyle = '#153a5a';
  worldCtx.lineWidth = 4;
  worldCtx.stroke();
}

// ============ CANVAS ============
function initCanvas() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d');
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function centerOnPlayerBase() {
  const rect = canvas.getBoundingClientRect();
  const cap = CITIES.find(c => c.type === 'capital' && c.owner === state.faction);
  if (!cap) return;
  const worldCx = cap.x * MAP.TILE + MAP.TILE / 2;
  const worldCy = cap.y * MAP.TILE + MAP.TILE / 2;
  camera.x = worldCx - rect.width / camera.zoom / 2;
  camera.y = worldCy - rect.height / camera.zoom / 2;
  clampCamera();
}

function clampCamera() {
  const rect = canvas.getBoundingClientRect();
  const viewW = rect.width / camera.zoom;
  const viewH = rect.height / camera.zoom;
  if (WORLD_W <= viewW) camera.x = (WORLD_W - viewW) / 2;
  else camera.x = Math.max(0, Math.min(WORLD_W - viewW, camera.x));
  if (WORLD_H <= viewH) camera.y = (WORLD_H - viewH) / 2;
  else camera.y = Math.max(0, Math.min(WORLD_H - viewH, camera.y));
}

// ============ УПРАВЛЕНИЕ ============
function initCameraControls() {
  canvas.addEventListener('mousedown', e => {
    camera.dragging = true; camera.moved = false;
    camera.dragStartX = e.clientX; camera.dragStartY = e.clientY;
    camera.cameraStartX = camera.x; camera.cameraStartY = camera.y;
  });

  window.addEventListener('mousemove', e => {
    if (!camera.dragging) return;
    const dx = e.clientX - camera.dragStartX;
    const dy = e.clientY - camera.dragStartY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) camera.moved = true;
    camera.x = camera.cameraStartX - dx / camera.zoom;
    camera.y = camera.cameraStartY - dy / camera.zoom;
    clampCamera();
  });

  window.addEventListener('mouseup', e => {
    if (camera.dragging && !camera.moved) handleCanvasClick(e.clientX, e.clientY);
    camera.dragging = false;
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.15 : 1 / 1.15);
  }, { passive: false });

  canvas.addEventListener('touchstart', e => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      camera.dragging = true; camera.moved = false;
      camera.dragStartX = t.clientX; camera.dragStartY = t.clientY;
      camera.cameraStartX = camera.x; camera.cameraStartY = camera.y;
    } else if (e.touches.length === 2) {
      camera.dragging = false; camera.pinching = true;
      const t1 = e.touches[0], t2 = e.touches[1];
      camera.pinchStartDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      camera.pinchStartZoom = camera.zoom;
      const rect = canvas.getBoundingClientRect();
      camera.pinchCenterX = (t1.clientX + t2.clientX) / 2 - rect.left;
      camera.pinchCenterY = (t1.clientY + t2.clientY) / 2 - rect.top;
    }
  }, { passive: false });

  canvas.addEventListener('touchmove', e => {
    e.preventDefault();
    if (camera.dragging && e.touches.length === 1) {
      const t = e.touches[0];
      const dx = t.clientX - camera.dragStartX;
      const dy = t.clientY - camera.dragStartY;
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) camera.moved = true;
      camera.x = camera.cameraStartX - dx / camera.zoom;
      camera.y = camera.cameraStartY - dy / camera.zoom;
      clampCamera();
    } else if (camera.pinching && e.touches.length === 2) {
      const t1 = e.touches[0], t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const factor = dist / camera.pinchStartDist;
      const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.pinchStartZoom * factor));
      applyZoomAt(camera.pinchCenterX, camera.pinchCenterY, newZoom);
    }
  }, { passive: false });

  canvas.addEventListener('touchend', e => {
    e.preventDefault();
    if (camera.pinching && e.touches.length < 2) camera.pinching = false;
    if (camera.dragging && !camera.moved && e.changedTouches[0] && e.touches.length === 0) {
      const t = e.changedTouches[0];
      handleCanvasClick(t.clientX, t.clientY);
    }
    if (e.touches.length === 0) camera.dragging = false;
  }, { passive: false });
}

function zoomAt(clientX, clientY, factor) {
  const rect = canvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom * factor));
  applyZoomAt(localX, localY, newZoom);
}

function applyZoomAt(localX, localY, newZoom) {
  const worldX = localX / camera.zoom + camera.x;
  const worldY = localY / camera.zoom + camera.y;
  camera.zoom = newZoom;
  camera.x = worldX - localX / camera.zoom;
  camera.y = worldY - localY / camera.zoom;
  clampCamera();
}

function zoomByCenter(factor) {
  const rect = canvas.getBoundingClientRect();
  const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom * factor));
  applyZoomAt(rect.width / 2, rect.height / 2, newZoom);
}

// ============ КЛИК ============
function handleCanvasClick(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;
  const worldX = localX / camera.zoom + camera.x;
  const worldY = localY / camera.zoom + camera.y;

  let closest = null, minDist = 30;
  CITIES.forEach(c => {
    const cx = c.x * MAP.TILE + MAP.TILE / 2;
    const cy = c.y * MAP.TILE + MAP.TILE / 2;
    const d = Math.hypot(worldX - cx, worldY - cy);
    if (d < minDist) { minDist = d; closest = c; }
  });

  if (closest) openCityPanel(closest);
  else {
    closeCityPanel();
    closeAttackTargetPanel();
    closeAttackSourcesPanel();
  }
}

// ============ ПАНЕЛЬ ГОРОДА ============
let selectedCity = null;

function getFortification(city) {
  return FORTIFICATIONS[city.fortification || 0];
}

function getDefenseMultiplier(city) {
  return 1 + (city.fortification || 0) * 0.15;
}

function openCityPanel(city) {
  selectedCity = city;
  const dict = LANG[state.settings.language];
  const lang = state.settings.language;
  const panel = document.getElementById('city-panel');
  panel.classList.remove('hidden');

  document.getElementById('city-panel-name').textContent = city.name;
  document.getElementById('city-owner').textContent =
    city.owner === 'aurora' ? dict.ownerAurora :
    city.owner === 'vesper' ? dict.ownerVesper : dict.ownerNeutral;
  document.getElementById('city-type').textContent =
    city.type === 'capital' ? dict.typeCapital :
    city.type === 'large' ? dict.typeLarge :
    city.type === 'medium' ? dict.typeMedium : dict.typeSmall;
  document.getElementById('city-garrison').textContent = city.garrison;
  document.getElementById('city-infra').textContent = city.infrastructure + '%';

  const fort = getFortification(city);
  document.getElementById('city-defense').textContent = `${fort.icon} ${lang === 'ru' ? fort.ru : fort.en}`;

  const isOwn = city.owner === state.faction;
  const income = isOwn ? city.baseIncome * (city.infrastructure / 100) * (state.welfare / 100) : 0;
  document.getElementById('city-income').textContent = isOwn ? '+' + income.toFixed(2) + '/с' : '—';

  const buildings = city.buildings || {};
  const totalBuildings = Object.values(buildings).reduce((a, b) => a + b, 0);
  document.getElementById('city-buildings').textContent = totalBuildings > 0 ? totalBuildings : '—';

  const isStrategic = totalBuildings >= 5;
  document.getElementById('city-strategic').textContent = isStrategic ? '⚠️ Да' : 'Нет';
  document.getElementById('city-strategic').style.color = isStrategic ? '#ff3b5c' : '';

  const attackBtn = document.getElementById('city-attack-btn');
  const fortifyBtn = document.getElementById('city-fortify-btn');
  const buildBtn = document.getElementById('city-build-btn');

  if (isOwn) {
    attackBtn.textContent = '⚔️ ' + (lang === 'ru' ? 'Наступление' : 'Attack');
    attackBtn.disabled = city.garrison < 1;
    attackBtn.onclick = () => openAttackTargetPanel();

    const nextFort = FORTIFICATIONS[(city.fortification || 0) + 1];
    if (nextFort) {
      fortifyBtn.textContent = `${nextFort.icon} ${lang === 'ru' ? nextFort.ru : nextFort.en} (${nextFort.cost}💰)`;
      fortifyBtn.disabled = state.money < nextFort.cost;
      fortifyBtn.style.display = 'block';
      fortifyBtn.onclick = () => fortifyCity(city);
    } else {
      fortifyBtn.textContent = '✅ ' + (lang === 'ru' ? 'Максимум' : 'Max');
      fortifyBtn.disabled = true;
      fortifyBtn.style.display = 'block';
    }

    buildBtn.style.display = 'block';
    buildBtn.disabled = false;
    buildBtn.onclick = () => openBuildModal(city);
  } else {
    const sources = getRoadsFrom(city).filter(c => c.owner === state.faction && c.garrison > 0);
    if (sources.length > 0) {
      attackBtn.textContent = '⚔️ ' + (lang === 'ru' ? 'Наступление' : 'Attack');
      attackBtn.disabled = false;
      attackBtn.onclick = () => openAttackSourcesPanel(city, sources);
    } else {
      attackBtn.textContent = '🚫 ' + (lang === 'ru' ? 'Нет атак' : 'No attacks');
      attackBtn.disabled = true;
      attackBtn.onclick = null;
    }
    fortifyBtn.style.display = 'none';
    buildBtn.style.display = 'none';
  }
}

function closeCityPanel() {
  document.getElementById('city-panel').classList.add('hidden');
  selectedCity = null;
}

document.getElementById('city-panel-close').addEventListener('click', closeCityPanel);

function fortifyCity(city) {
  const nextFort = FORTIFICATIONS[(city.fortification || 0) + 1];
  if (!nextFort) return;
  if (state.money < nextFort.cost) return;
  state.money -= nextFort.cost;
  city.fortification = nextFort.level;
  openCityPanel(city);
}

// ============ ПАНЕЛИ АТАК ============
function openAttackTargetPanel() {
  if (!selectedCity) return;
  const dict = LANG[state.settings.language];
  const panel = document.getElementById('attack-target-panel');
  const list = document.getElementById('attack-targets');
  panel.classList.remove('hidden');
  list.innerHTML = '';

  const targets = getRoadsFrom(selectedCity).filter(c => c.owner !== state.faction);

  if (targets.length === 0) {
    list.innerHTML = '<div style="color:#64748b;font-size:12px;padding:10px">Нет доступных целей</div>';
    return;
  }

  targets.forEach(target => {
    const row = document.createElement('div');
    row.className = 'target-row';
    row.innerHTML = `
      <div>
        <div class="target-name">${target.name}</div>
        <div class="target-info">${target.owner === 'aurora' ? dict.ownerAurora : dict.ownerVesper}</div>
      </div>
      <div class="target-info">🛡️ ${target.garrison}</div>
    `;
    row.addEventListener('click', () => {
      launchAttack(selectedCity, target);
      closeAttackTargetPanel();
      closeCityPanel();
    });
    list.appendChild(row);
  });
}

function closeAttackTargetPanel() {
  document.getElementById('attack-target-panel').classList.add('hidden');
}
document.getElementById('attack-target-close').addEventListener('click', closeAttackTargetPanel);

function openAttackSourcesPanel(targetCity, sources) {
  const panel = document.getElementById('attack-sources-panel');
  const list = document.getElementById('attack-sources-list');
  panel.classList.remove('hidden');
  list.innerHTML = '';

  sources.forEach(source => {
    const row = document.createElement('div');
    row.className = 'target-row';
    row.innerHTML = `
      <div>
        <div class="target-name">${source.name}</div>
        <div class="target-info">🛡️ ${source.garrison}</div>
      </div>
      <div class="target-info">→ ${targetCity.name}</div>
    `;
    row.addEventListener('click', () => {
      launchAttack(source, targetCity);
      closeAttackSourcesPanel();
      closeCityPanel();
    });
    list.appendChild(row);
  });
}

function closeAttackSourcesPanel() {
  document.getElementById('attack-sources-panel').classList.add('hidden');
}
document.getElementById('attack-sources-close').addEventListener('click', closeAttackSourcesPanel);

// ============ АТАКА ============
function launchAttack(fromCity, toCity) {
  if (fromCity.garrison < 1) return;
  const units = fromCity.garrison;
  fromCity.garrison = 0;
  ACTIVE_ATTACKS.push({ from: fromCity, to: toCity, units, progress: 0, speed: 0.3 });
}

function updateAttacks(dt) {
  for (let i = ACTIVE_ATTACKS.length - 1; i >= 0; i--) {
    const atk = ACTIVE_ATTACKS[i];
    atk.progress += atk.speed * dt;
    if (atk.progress >= 1) {
      resolveAttack(atk.from, atk.to, atk.units);
      ACTIVE_ATTACKS.splice(i, 1);
    }
  }
}

function resolveAttack(fromCity, toCity, units) {
  const combatBonus = 1 + state.tech.combat * 0.12;
  const armorBonus = 1 + state.tech.armor * 0.12;
  const defenseMult = getDefenseMultiplier(toCity);

  const attackPower = units * combatBonus;
  const defensePower = toCity.garrison * defenseMult * armorBonus;

  if (attackPower > defensePower) {
    const losses = Math.ceil(defensePower * 0.7);
    toCity.owner = state.faction;
    toCity.garrison = Math.max(0, units - losses);
    toCity.fortification = Math.max(0, toCity.fortification - 1);
    state.welfare -= 5;
  } else {
    toCity.garrison = Math.max(0, toCity.garrison - Math.ceil(attackPower * 0.5));
    state.welfare -= 8;
  }
  state.welfare = Math.max(0, Math.min(100, state.welfare));
  checkVictory();
}

// ============ АТАКИ/ПАНЕЛИ ДЕЙСТВИЙ ============
function openActionsPanel() {
  document.getElementById('actions-modal').classList.remove('hidden');
  updateCurrentTab();
}

function closeActionsPanel() {
  document.getElementById('actions-modal').classList.add('hidden');
}

document.getElementById('actions-btn').addEventListener('click', openActionsPanel);
document.getElementById('actions-close').addEventListener('click', closeActionsPanel);

document.querySelectorAll('.actions-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    if (tab.disabled) return;
    document.querySelectorAll('.actions-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.actions-panel').forEach(p => p.classList.add('hidden'));
    document.getElementById('panel-' + tab.dataset.tab).classList.remove('hidden');
    updateCurrentTab();
  });
});

function updateCurrentTab() {
  const active = document.querySelector('.actions-tab.active');
  if (!active) return;
  if (active.dataset.tab === 'country') updateActionsPanel();
  if (active.dataset.tab === 'services') updateServicesPanel();
  if (active.dataset.tab === 'logistics') updateLogisticsPanel();
  if (active.dataset.tab === 'production') updateProductionPanel();
}

// ============ СТРАНА ============
document.getElementById('ac-tax-slider').addEventListener('input', e => {
  state.taxRate = parseInt(e.target.value) / 100;
  updateActionsPanel();
});

document.getElementById('ac-payments').addEventListener('click', () => {
  if (state.money < state.paymentsCost) return;
  state.money -= state.paymentsCost;
  state.welfare = Math.min(100, state.welfare + 8);
  state.paymentsCost = Math.round(state.paymentsCost * 1.15);
  updateActionsPanel();
});

function updateActionsPanel() {
  const fmtMln = n => (n / 1e6).toFixed(1) + ' млн';
  document.getElementById('ac-population').textContent = fmtMln(state.population);

  const birthRate = 8.0 + state.tech.birth * 1.2;
  const deathRate = 13.0;
  document.getElementById('ac-birth').textContent = birthRate.toFixed(1) + '‰';
  document.getElementById('ac-death').textContent = deathRate.toFixed(1) + '‰';

  const laborForce = state.population * 0.60;
  const army = state.army || (laborForce * 0.43);
  const workers = laborForce - army;
  document.getElementById('ac-workers').textContent = fmtMln(workers);
  document.getElementById('ac-army').textContent = fmtMln(army);
  document.getElementById('ac-labor-hint').textContent =
    `Рабочая сила: ${fmtMln(laborForce)} — ${fmtMln(army)} в армии = ${fmtMln(workers)}`;

  document.getElementById('ac-welfare').textContent = Math.floor(state.welfare) + '/100';
  document.getElementById('ac-welfare-bar').style.width = state.welfare + '%';
  const tr = document.getElementById('ac-welfare-trend');
  tr.textContent = `Тренд: ${state.welfareTrend >= 0 ? '+' : ''}${state.welfareTrend.toFixed(2)}/с`;
  tr.classList.toggle('positive', state.welfareTrend > 0);
  tr.classList.toggle('negative', state.welfareTrend < 0);

  document.getElementById('ac-tax').textContent = Math.round(state.taxRate * 100) + '%';
  document.getElementById('ac-tax-slider').value = Math.round(state.taxRate * 100);

  const taxMult = 1 + state.taxRate;
  const workersMult = workers / (laborForce * 0.85);
  const welfareMult = state.welfare / 60;
  document.getElementById('ac-multipliers').innerHTML =
    `Множители: налог ×${taxMult.toFixed(2)} · работники ×${workersMult.toFixed(2)} · благо ×${welfareMult.toFixed(2)}`;

  document.getElementById('ac-payments-cost').textContent = state.paymentsCost;
  document.getElementById('ac-payments').disabled = state.money < state.paymentsCost;
}

// ============ СЛУЖБЫ ============
function getServiceCost(key) {
  const cfg = SERVICES_CFG[key];
  const lvl = state.services[key];
  return Math.round(cfg.baseCost * Math.pow(1.06, lvl));
}

function getCorruptionCost() {
  return Math.round(80 * Math.pow(1.08, 100 - state.services.corruption));
}

['science', 'order', 'health', 'emergency'].forEach(key => {
  document.getElementById(`svc-${key}-btn`).addEventListener('click', () => {
    const cost = getServiceCost(key);
    if (state.money < cost || state.services[key] >= 100) return;
    state.money -= cost;
    state.services[key] = Math.min(100, state.services[key] + 8);
    updateServicesPanel();
  });
});

document.getElementById('svc-corruption-btn').addEventListener('click', () => {
  const cost = getCorruptionCost();
  if (state.money < cost || state.services.corruption <= 0) return;
  state.money -= cost;
  state.services.corruption = Math.max(0, state.services.corruption - 12);
  updateServicesPanel();
});

function updateServicesPanel() {
  const s = state.services;
  ['science', 'order', 'health', 'emergency'].forEach(key => {
    document.getElementById(`svc-${key}-level`).textContent = s[key] + '/100';
    document.getElementById(`svc-${key}-bar`).style.width = s[key] + '%';
    document.getElementById(`svc-${key}-cost`).textContent = getServiceCost(key);
    document.getElementById(`svc-${key}-btn`).disabled = state.money < getServiceCost(key) || s[key] >= 100;
  });

  document.getElementById('svc-corruption-level').textContent = s.corruption + '/100';
  document.getElementById('svc-corruption-bar').style.width = s.corruption + '%';
  document.getElementById('svc-corruption-cost').textContent = getCorruptionCost();
  document.getElementById('svc-corruption-btn').disabled = state.money < getCorruptionCost() || s.corruption <= 0;

  const drain = (s.corruption * 0.04).toFixed(1);
  const bonus = (s.science * 0.08).toFixed(1);
  document.getElementById('svc-corruption-desc').textContent =
    `Коррупция съедает ${drain}% дохода · наука даёт +${bonus}%`;
}

// ============ ЛОГИСТИКА ============
function getTechCost(key) {
  const base = TECH_CFG[key];
  const lvl = state.tech[key];
  return Math.round(base * Math.pow(1.35, lvl));
}

Object.keys(TECH_CFG).forEach(key => {
  const btn = document.getElementById(`tech-${key}-btn`);
  if (!btn) return;
  btn.addEventListener('click', () => {
    const cost = getTechCost(key);
    if (state.money < cost || state.tech[key] >= 6) return;
    state.money -= cost;
    state.tech[key]++;
    updateLogisticsPanel();
  });
});

document.getElementById('mobilize-btn').addEventListener('click', () => {
  if (state.tech.mobilization < 1) return;
  if (state.mobilizeCooldown > 0) return;
  CITIES.forEach(c => { if (c.owner === state.faction) c.garrison += 1; });
  state.welfare = Math.max(0, state.welfare - 5);
  state.mobilizeCooldown = 90;
  updateLogisticsPanel();
});

function updateLogisticsPanel() {
  Object.keys(TECH_CFG).forEach(key => {
    const lvl = state.tech[key];
    const cost = getTechCost(key);
    const lvlEl = document.getElementById(`tech-${key}-level`);
    const costEl = document.getElementById(`tech-${key}-cost`);
    const btn = document.getElementById(`tech-${key}-btn`);
    if (lvlEl) lvlEl.textContent = lvl;
    if (costEl) costEl.textContent = cost;
    if (btn) {
      if (lvl >= 6) {
        btn.textContent = '✅ Максимум';
        btn.disabled = true;
      } else {
        btn.textContent = 'Вложить';
        btn.disabled = state.money < cost;
      }
    }
  });

  const mobBtn = document.getElementById('mobilize-btn');
  if (state.tech.mobilization < 1) {
    mobBtn.disabled = true;
    mobBtn.textContent = '📣 Мобилизация недоступна';
  } else if (state.mobilizeCooldown > 0) {
    mobBtn.disabled = true;
    mobBtn.textContent = `⏳ Перезарядка ${Math.ceil(state.mobilizeCooldown)}с`;
  } else {
    mobBtn.disabled = false;
    mobBtn.textContent = '📣 Мобилизация · призыв';
  }
}

// ============ ПРОИЗВОДСТВО ============
function calcResourceProduction() {
  let ammo = 0, weapons = 0, tanks = 0, fuel = 0;
  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    ammo += (c.buildings?.ammoFactory || 0) * 1.2;
    weapons += (c.buildings?.weaponFactory || 0) * 0.6;
    tanks += (c.buildings?.tankFactory || 0) * 0.15;
    fuel += (c.buildings?.oilWell || 0) * 1.0;
  });
  return { ammo, weapons, tanks, fuel };
}

document.getElementById('buy-ammo-btn').addEventListener('click', () => {
  if (state.money < 120 || state.resources.ammo >= RESOURCE_MAX.ammo) return;
  state.money -= 120;
  state.resources.ammo = Math.min(RESOURCE_MAX.ammo, state.resources.ammo + 20);
  updateProductionPanel();
});
document.getElementById('buy-weapons-btn').addEventListener('click', () => {
  if (state.money < 200 || state.resources.weapons >= RESOURCE_MAX.weapons) return;
  state.money -= 200;
  state.resources.weapons = Math.min(RESOURCE_MAX.weapons, state.resources.weapons + 10);
  updateProductionPanel();
});
document.getElementById('buy-tanks-btn').addEventListener('click', () => {
  if (state.money < 160 || state.resources.tanks >= RESOURCE_MAX.tanks) return;
  state.money -= 160;
  state.resources.tanks = Math.min(RESOURCE_MAX.tanks, state.resources.tanks + 1);
  updateProductionPanel();
});
document.getElementById('buy-fuel-btn').addEventListener('click', () => {
  if (state.money < 160 || state.resources.fuel >= RESOURCE_MAX.fuel) return;
  state.money -= 160;
  state.resources.fuel = Math.min(RESOURCE_MAX.fuel, state.resources.fuel + 20);
  updateProductionPanel();
});

function updateProductionPanel() {
  const r = state.resources;
  const prod = calcResourceProduction();

  document.getElementById('res-ammo-count').textContent = `${Math.floor(r.ammo)}/${RESOURCE_MAX.ammo}`;
  document.getElementById('res-ammo-prod').textContent = `производство +${prod.ammo.toFixed(2)}/с`;
  document.getElementById('buy-ammo-btn').disabled = state.money < 120 || r.ammo >= RESOURCE_MAX.ammo;

  document.getElementById('res-weapons-count').textContent = `${Math.floor(r.weapons)}/${RESOURCE_MAX.weapons}`;
  document.getElementById('res-weapons-prod').textContent = `производство +${prod.weapons.toFixed(2)}/с`;
  document.getElementById('buy-weapons-btn').disabled = state.money < 200 || r.weapons >= RESOURCE_MAX.weapons;

  document.getElementById('res-tanks-count').textContent = `${Math.floor(r.tanks)}/${RESOURCE_MAX.tanks}`;
  document.getElementById('res-tanks-prod').textContent = prod.tanks > 0
    ? `производство +${prod.tanks.toFixed(2)}/с` : 'производство 0';
  document.getElementById('buy-tanks-btn').disabled = state.money < 160 || r.tanks >= RESOURCE_MAX.tanks;

  document.getElementById('res-fuel-count').textContent = `${Math.floor(r.fuel)}/${RESOURCE_MAX.fuel}`;
  document.getElementById('res-fuel-prod').textContent = `производство +${prod.fuel.toFixed(2)}/с`;
  document.getElementById('buy-fuel-btn').disabled = state.money < 160 || r.fuel >= RESOURCE_MAX.fuel;

  const totals = { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0 };
  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    Object.keys(totals).forEach(k => totals[k] += (c.buildings?.[k] || 0));
  });
  document.getElementById('bld-mine-total').textContent = totals.mine;
  document.getElementById('bld-factory-total').textContent = totals.factory;
  document.getElementById('bld-ammo-total').textContent = totals.ammoFactory;
  document.getElementById('bld-weapon-total').textContent = totals.weaponFactory;
  document.getElementById('bld-tank-total').textContent = totals.tankFactory;
  document.getElementById('bld-oil-total').textContent = totals.oilWell;
}

// ============ СТРОИТЕЛЬСТВО ============
let buildCity = null;

function getBuildingCost(city, key) {
  const base = BUILDINGS_CFG[key].cost;
  const count = city.buildings[key] || 0;
  return Math.round(base * Math.pow(1.10, count));
}

function openBuildModal(city) {
  buildCity = city;
  const modal = document.getElementById('build-modal');
  const title = document.getElementById('build-modal-title');
  const body = document.getElementById('build-modal-body');
  const lang = state.settings.language;

  title.textContent = `Строительство · ${city.name}`;
  body.innerHTML = '';

  Object.keys(BUILDINGS_CFG).forEach(key => {
    const b = BUILDINGS_CFG[key];
    const count = city.buildings[key] || 0;
    const cost = getBuildingCost(city, key);
    const canBuild = count < MAX_BUILDINGS && state.money >= cost;

    const row = document.createElement('div');
    row.className = 'build-row';
    row.innerHTML = `
      <div class="build-info">
        <div class="build-name">${b[lang]}</div>
        <div class="build-count">Построено: ${count}/${MAX_BUILDINGS}</div>
      </div>
      <button class="build-action" data-key="${key}" ${canBuild ? '' : 'disabled'}>💰 ${cost}</button>
    `;
    body.appendChild(row);
  });

  body.querySelectorAll('.build-action').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      const cost = getBuildingCost(buildCity, key);
      if (state.money < cost) return;
      if (buildCity.buildings[key] >= MAX_BUILDINGS) return;
      state.money -= cost;
      buildCity.buildings[key]++;
      openBuildModal(buildCity);
    });
  });

  modal.classList.remove('hidden');
}

function closeBuildModal() {
  document.getElementById('build-modal').classList.add('hidden');
  buildCity = null;
}

document.getElementById('build-modal-close').addEventListener('click', closeBuildModal);

// ============ ИГРОВОЙ ЦИКЛ ============
let lastTime = performance.now();

function loop(now) {
  let dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  if (!state.paused && !state.gameOver) update(dt * state.timeScale);
  updateHUD();
  renderMap();

  const actionsModal = document.getElementById('actions-modal');
  if (!actionsModal.classList.contains('hidden')) {
    const active = document.querySelector('.actions-tab.active');
    if (active) {
      if (active.dataset.tab === 'country') updateActionsPanel();
      if (active.dataset.tab === 'services') updateServicesPanel();
      if (active.dataset.tab === 'logistics') updateLogisticsPanel();
      if (active.dataset.tab === 'production') updateProductionPanel();
    }
  }

  if (state.gameOver && !state.gameOverShown) {
    state.gameOverShown = true;
    document.getElementById('gameover-title').textContent =
      state.gameOverReason === 'victory' ? '🏆 Победа' : '💀 Поражение';
    document.getElementById('gameover-text').textContent = state.gameOverText || '';
    document.getElementById('gameover-modal').classList.remove('hidden');
  }

  requestAnimationFrame(loop);
}

function calcIncome() {
  const laborForce = state.population * 0.60;
  const army = state.army || (laborForce * 0.43);
  const workers = laborForce - army;

  const taxMult = 1 + state.taxRate;
  const workersMult = Math.max(0.1, workers / (laborForce * 0.85));
  const welfareMult = Math.max(0.1, state.welfare / 60);
  const scienceMult = 1 + (state.services.science / 100) * 0.25;
  const corruptionMult = 1 - (state.services.corruption / 100) * 0.04;
  const economyMult = 1 + state.tech.economy * 0.20;
  const logisticsMult = 1 + state.tech.logistics * 0.10;

  let cityIncome = 0;
  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    const mine = (c.buildings?.mine || 0) * 4;
    const factory = (c.buildings?.factory || 0) * 2.5;
    cityIncome += c.baseIncome * (c.infrastructure / 100) + mine + factory;
  });

  return cityIncome * taxMult * workersMult * welfareMult * scienceMult * corruptionMult * economyMult * logisticsMult;
}

function update(dt) {
  state.money += calcIncome() * dt;

  // Ресурсы — производство
  const prod = calcResourceProduction();
  state.resources.ammo = Math.min(RESOURCE_MAX.ammo, Math.max(0, state.resources.ammo + (prod.ammo - 0.56) * dt));
  state.resources.weapons = Math.min(RESOURCE_MAX.weapons, state.resources.weapons + prod.weapons * dt);
  state.resources.tanks = Math.min(RESOURCE_MAX.tanks, state.resources.tanks + prod.tanks * dt);
  state.resources.fuel = Math.min(RESOURCE_MAX.fuel, Math.max(0, state.resources.fuel + (prod.fuel - 0.40) * dt));

  // Население
  const birthRate = 8.0 + state.tech.birth * 1.2;
  const deathRate = 13.0;
  const popDelta = state.population * (birthRate - deathRate) / 1000 / 86400;
  state.population = Math.max(1e6, state.population + popDelta * dt);

  // Благосостояние
  let welfareDelta = -0.05;
  if (state.taxRate > 0.30) welfareDelta -= (state.taxRate - 0.30) * 2;
  if (state.taxRate < 0.20) welfareDelta += (0.20 - state.taxRate) * 1.5;
  welfareDelta += state.tech.life * 0.07;
  state.welfare = Math.max(0, Math.min(100, state.welfare + welfareDelta * dt));
  state.welfareTrend = welfareDelta;

  // Коррупция
  let corruptionDelta = 0.05;
  corruptionDelta -= (state.services.science / 100) * 0.02;
  corruptionDelta -= (state.services.order / 100) * 0.03;
  state.services.corruption = Math.max(0, Math.min(100, state.services.corruption + corruptionDelta * dt));

  // КД мобилизации
  if (state.mobilizeCooldown > 0) state.mobilizeCooldown = Math.max(0, state.mobilizeCooldown - dt);

  updateAttacks(dt);

  if (state.welfare <= 0) {
    state.gameOver = true;
    state.gameOverReason = 'defeat';
    state.gameOverText = 'Переворот. Вы свергнуты.';
    return;
  }

  checkVictory();
}

function checkVictory() {
  if (state.gameOver) return;
  const playerCap = CITIES.find(c => c.type === 'capital' && c.owner === state.faction);
  const enemyCap = CITIES.find(c => c.type === 'capital' && c.owner === state.enemyFaction);

  if (!enemyCap) {
    state.gameOver = true;
    state.gameOverReason = 'victory';
    state.gameOverText = '🏆 ПОБЕДА! Столица врага захвачена.';
  } else if (!playerCap) {
    state.gameOver = true;
    state.gameOverReason = 'defeat';
    state.gameOverText = '💀 ПОРАЖЕНИЕ. Ваша столица пала.';
  }
}

// ============ HUD ============
const fmt = n => Math.floor(n).toLocaleString('ru-RU');

function updateHUD() {
  document.getElementById('money').textContent = fmt(state.money);
  const income = calcIncome();
  const incEl = document.getElementById('income');
  incEl.textContent = (income >= 0 ? '+' : '') + income.toFixed(1) + '/с';
  incEl.classList.toggle('positive', income > 0);
  incEl.classList.toggle('negative', income < 0);

  document.getElementById('population').textContent = (state.population / 1e6).toFixed(0) + 'м';

  const satEl = document.getElementById('satisfaction');
  satEl.textContent = Math.floor(state.welfare) + '%';
  satEl.classList.remove('sat-good', 'sat-mid', 'sat-bad');
  satEl.classList.add(state.welfare > 60 ? 'sat-good' : state.welfare > 30 ? 'sat-mid' : 'sat-bad');

  const corEl = document.getElementById('corruption');
  corEl.textContent = Math.floor(state.services.corruption) + '%';
  corEl.classList.remove('cor-good', 'cor-mid', 'cor-bad');
  corEl.classList.add(state.services.corruption < 30 ? 'cor-good' : state.services.corruption < 60 ? 'cor-mid' : 'cor-bad');
}

// ============ РЕНДЕР ============
function renderMap() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  ctx.fillStyle = '#0a0e1a';
  ctx.fillRect(0, 0, w, h);

  ctx.drawImage(worldCanvas, camera.x, camera.y, w / camera.zoom, h / camera.zoom, 0, 0, w, h);

  renderRoads();
  renderAttacks();
  renderCities();
}

function renderRoads() {
  const rect = canvas.getBoundingClientRect();
  const tileSize = MAP.TILE * camera.zoom;

  ROADS.forEach(road => {
    const a = road.from, b = road.to;
    const x1 = (a.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y1 = (a.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;
    const x2 = (b.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y2 = (b.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;

    if (Math.max(x1, x2) < 0 || Math.min(x1, x2) > rect.width ||
        Math.max(y1, y2) < 0 || Math.min(y1, y2) > rect.height) return;

    const color = road.type === 'own' ? 'rgba(0, 212, 255, 0.4)'
                : road.type === 'enemy' ? 'rgba(255, 59, 92, 0.4)'
                : 'rgba(180, 190, 210, 0.35)';

    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1, 1.2 * camera.zoom);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

function renderAttacks() {
  const tileSize = MAP.TILE * camera.zoom;
  ACTIVE_ATTACKS.forEach(atk => {
    const a = atk.from, b = atk.to;
    const x1 = (a.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y1 = (a.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;
    const x2 = (b.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y2 = (b.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;
    const cx = x1 + (x2 - x1) * atk.progress;
    const cy = y1 + (y2 - y1) * atk.progress;

    ctx.strokeStyle = '#00ff88';
    ctx.globalAlpha = 0.3;
    ctx.lineWidth = Math.max(2, 3 * camera.zoom);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(cx, cy);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const pulse = 1 + Math.sin(performance.now() / 200) * 0.3;
    ctx.fillStyle = '#00ff88';
    ctx.beginPath();
    ctx.arc(cx, cy, 6 * camera.zoom * pulse, 0, Math.PI * 2);
    ctx.fill();
  });
}

function renderCities() {
  const tileSize = MAP.TILE * camera.zoom;
  const rect = canvas.getBoundingClientRect();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  CITIES.forEach(c => {
    const sx = (c.x * MAP.TILE - camera.x) * camera.zoom;
    const sy = (c.y * MAP.TILE - camera.y) * camera.zoom;
    if (sx < -100 || sx > rect.width + 100 || sy < -100 || sy > rect.height + 100) return;

    const color = c.owner === 'aurora' ? '#00d4ff'
                : c.owner === 'vesper' ? '#ff3b5c' : '#8892a6';

    const radiusRatio = c.type === 'capital' ? 0.32 : c.type === 'large' ? 0.24
                      : c.type === 'medium' ? 0.18 : 0.13;
    const radius = Math.max(3, tileSize * radiusRatio);

    ctx.shadowColor = color;
    ctx.shadowBlur = c.type === 'capital' ? 24 : 12;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx + tileSize / 2, sy + tileSize / 2, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(sx + tileSize / 2, sy + tileSize / 2, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Иконка укрепления
    if (c.fortification > 0 && camera.zoom > 0.7) {
      const fort = FORTIFICATIONS[c.fortification];
      ctx.font = `${Math.max(12, 16 * camera.zoom)}px sans-serif`;
      ctx.fillText(fort.icon, sx + tileSize / 2, sy + tileSize / 2 - radius - 8);
    }

    // Стратегический объект
    const bTotal = Object.values(c.buildings || {}).reduce((a, b) => a + b, 0);
    if (bTotal >= 5 && camera.zoom > 0.7) {
      ctx.font = `${Math.max(12, 14 * camera.zoom)}px sans-serif`;
      ctx.fillText('⚠️', sx + tileSize / 2 + radius + 6, sy + tileSize / 2 - radius);
    }

    if (camera.zoom < 0.6 && c.type !== 'capital' && c.type !== 'large') return;

    const fontSize = Math.max(9,
      (c.type === 'capital' ? 13 : c.type === 'large' ? 12 : c.type === 'medium' ? 11 : 10) * Math.max(0.8, camera.zoom)
    );
    ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
    ctx.textBaseline = 'top';
    const textX = sx + tileSize / 2;
    const textY = sy + tileSize / 2 + radius + 4;
    const textWidth = ctx.measureText(c.name).width;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.fillRect(textX - textWidth / 2 - 3, textY - 1, textWidth + 6, fontSize + 2);

    ctx.fillStyle = color;
    ctx.fillText(c.name, textX, textY);
  });
}

// ============ СТАРТ ============
function startGame() {
  const s = state.settings;
  state.faction = s.faction;
  state.enemyFaction = s.faction === 'aurora' ? 'vesper' : 'aurora';
  state.difficulty = s.difficulty;

  const f = FACTIONS[state.faction];
  state.money = f.start.money;
  state.welfare = f.start.welfare;
  state.population = f.start.population;
  state.taxRate = f.start.taxRate;

  const d = DIFFICULTY[state.difficulty];
  state.money *= d.playerMoneyMult;
  state.welfare -= d.playerSatPenalty;

  if (tg) {
    if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
    if (tg.disableSwipes) tg.disableSwipes();
  }

  document.getElementById('menu').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  document.querySelector('.speed-btn[data-speed="1"]').classList.add('active');

  seed = 12345;
  generateCities();
  generateRoads();
  generateWorldCanvas();

  initCanvas();
  initCameraControls();
  centerOnPlayerBase();

  lastTime = performance.now();
  requestAnimationFrame(loop);
}

// ============ КНОПКИ ============
document.querySelectorAll('.speed-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.timeScale = parseInt(btn.dataset.speed);
    state.paused = false;
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const p = document.getElementById('pause-btn');
    p.textContent = '⏸'; p.classList.remove('paused');
  });
});

document.getElementById('pause-btn').addEventListener('click', e => {
  state.paused = !state.paused;
  e.target.textContent = state.paused ? '▶' : '⏸';
  e.target.classList.toggle('paused', state.paused);
});

document.getElementById('zoom-in').addEventListener('click', () => zoomByCenter(1.25));
document.getElementById('zoom-out').addEventListener('click', () => zoomByCenter(1 / 1.25));

document.getElementById('city-list-btn').addEventListener('click', () => centerOnPlayerBase());

document.getElementById('gameover-restart').addEventListener('click', () => {
  state.gameOver = false;
  state.gameOverShown = false;
  state.gameOverReason = null;
  state.gameOverText = null;
  document.getElementById('gameover-modal').classList.add('hidden');
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
});