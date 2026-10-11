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
    tabCountry: 'Страна', tabServices: 'Службы', tabLogistics: 'Логистика',
    tabProduction: 'Производство', tabArmy: 'Армия',
    populationLabel: 'Население', birthRate: 'Рождаемость', deathRate: 'Смертность',
    workersLabel: 'Работают', armyLabel: 'В армии', welfareLabel: 'Благосостояние',
    taxLabel: 'Налоги', paymentsLabel: 'Выплаты населению',
    svcScience: 'Наука', svcOrder: 'Правопорядок', svcHealth: 'Здравоохранение',
    svcEmergency: 'МЧС', svcCorruption: 'Коррупция',
    invest: 'Вложить +8', antiCorruption: 'Антикоррупционная кампания',
    svcScienceDesc: 'До +25% дохода', svcOrderDesc: 'Меньше беспорядков',
    svcHealthDesc: 'Снижает смертность', svcEmergencyDesc: 'Меньше ущерба',
    grpEconomy: '🏭 Экономика', grpMilitary: '⚔️ Военная мощь',
    grpResources: '📦 Ресурсы', grpBuild: '🏗️ Здания',
    techEconomy: 'Экономика', techCombat: 'Боевая подготовка', techArmor: 'Военная техника',
    techLogistics: 'Логистика', techAA: 'ПВО', techDrones: 'Дроны',
    techDroneFactory: 'Заводы дронов', techMobilization: 'Мобилизация',
    techLife: 'Качество жизни', techBirth: 'Рождаемость',
    techEconomyDesc: '+20% дохода за уровень', techCombatDesc: '+12% атаки за уровень',
    techArmorDesc: '+12% обороны за уровень', techLogisticsDesc: '−8% расход, +10% выпуск',
    techAADesc: 'Шанс сбить дроны', techDronesDesc: 'Открывает дроны',
    techDroneFactoryDesc: '+15% к производству дронов', techMobDesc: 'Открывает призыв',
    techLifeDesc: '+0.07 к благу/с', techBirthDesc: '+1.2‰ за уровень',
    mobilize: 'Мобилизация · призыв',
    resAmmo: 'Боеприпасы', resWeapons: 'Оружие', resTanks: 'Танки',
    resFuel: 'Топливо', resDrones: 'Дроны',
    bldMine: 'Шахта', bldFactory: 'Завод', bldAmmo: 'Завод боеприпасов',
    bldWeapon: 'Оружейный завод', bldTank: 'Танковый завод', bldOil: 'Нефтяная скважина',
    bldDroneFactory: 'Завод дронов',
    armyTotal: 'Всего войск:', armyGarrisons: 'В гарнизонах:', armyInField: 'В поле:',
    unitInfantry: 'Пехота', unitTanks: 'Танки', unitAA: 'ПВО',
    unitMissiles: 'Ракеты', unitDrones: 'Дроны',
  },
  en: {
    gameTitle: 'LITHIUM ARC', gameSubtitle: 'Real-time strategy',
    language: 'LANGUAGE · ЯЗЫК', faction: 'FACTION', difficulty: 'DIFFICULTY',
    startGame: 'START GAME',
    auroraName: 'Aurora Republic', vesperName: 'Vesper Dominion',
    easy: 'Easy', normal: 'Normal', hard: 'Hard', insane: 'Insane',
    diffEasy: 'Calm intro.', diffNormal: 'Balanced.',
    diffHard: 'AI aggressive.', diffInsane: 'Maximum pressure.',
    aiIncome: 'Income', playerMoney: 'Your money', playerSat: 'Start welfare',
    chooseTarget: 'Choose target', chooseSource: 'Attack from?', backToMenu: 'Back',
    ownerAurora: 'Aurora', ownerVesper: 'Vesper', ownerNeutral: 'Neutral',
    typeCapital: 'Capital', typeLarge: 'Large', typeMedium: 'Medium', typeSmall: 'Small',
    cityOwner: 'Owner:', cityType: 'Type:', cityGarrison: 'Garrison:',
    cityInfra: 'Infrastructure:', cityIncome: 'Income:', cityDefense: 'Defense:',
    cityBuildings: 'Buildings:', cityStrategic: 'Strategic:',
    tabCountry: 'Country', tabServices: 'Services', tabLogistics: 'Logistics',
    tabProduction: 'Production', tabArmy: 'Army',
    populationLabel: 'Population', birthRate: 'Birth rate', deathRate: 'Death rate',
    workersLabel: 'Workers', armyLabel: 'In army', welfareLabel: 'Welfare',
    taxLabel: 'Taxes', paymentsLabel: 'Payments',
    svcScience: 'Science', svcOrder: 'Law & Order', svcHealth: 'Healthcare',
    svcEmergency: 'Emergency', svcCorruption: 'Corruption',
    invest: 'Invest +8', antiCorruption: 'Anti-corruption',
    svcScienceDesc: 'Up to +25% income', svcOrderDesc: 'Fewer riots',
    svcHealthDesc: 'Reduces death rate', svcEmergencyDesc: 'Less damage',
    grpEconomy: '🏭 Economy', grpMilitary: '⚔️ Military',
    grpResources: '📦 Resources', grpBuild: '🏗️ Buildings',
    techEconomy: 'Economy', techCombat: 'Combat', techArmor: 'Armor',
    techLogistics: 'Logistics', techAA: 'Air defense', techDrones: 'Drones',
    techDroneFactory: 'Drone factories', techMobilization: 'Mobilization',
    techLife: 'Quality of life', techBirth: 'Birth rate',
    techEconomyDesc: '+20% income/level', techCombatDesc: '+12% attack/level',
    techArmorDesc: '+12% defense/level', techLogisticsDesc: '−8% cost, +10% output',
    techAADesc: 'Shoot down drones', techDronesDesc: 'Unlock drones',
    techDroneFactoryDesc: '+15% drone production', techMobDesc: 'Unlock conscription',
    techLifeDesc: '+0.07 welfare/s', techBirthDesc: '+1.2‰/level',
    mobilize: 'Mobilization',
    resAmmo: 'Ammo', resWeapons: 'Weapons', resTanks: 'Tanks',
    resFuel: 'Fuel', resDrones: 'Drones',
    bldMine: 'Mine', bldFactory: 'Factory', bldAmmo: 'Ammo factory',
    bldWeapon: 'Weapon factory', bldTank: 'Tank factory', bldOil: 'Oil well',
    bldDroneFactory: 'Drone factory',
    armyTotal: 'Total troops:', armyGarrisons: 'In garrisons:', armyInField: 'In field:',
    unitInfantry: 'Infantry', unitTanks: 'Tanks', unitAA: 'Air defense',
    unitMissiles: 'Missiles', unitDrones: 'Drones',
  },
};

// UNIT TYPES
const UNIT_TYPES = {
  infantry: { icon: 'soldier.svg', ru: 'Пехота', en: 'Infantry', cost: { weapons: 5, fuel: 0.5, money: 30 }, power: 1.0 },
  tanks:    { icon: 'tank.svg', ru: 'Танки', en: 'Tanks', cost: { tanks: 1, fuel: 2, money: 80 }, power: 3.0 },
  aa:       { icon: 'anti-aircraft.svg', ru: 'ПВО', en: 'Air defense', cost: { weapons: 8, fuel: 3, money: 120 }, power: 1.5 },
  missiles: { icon: 'missile.svg', ru: 'Ракеты', en: 'Missiles', cost: { weapons: 15, fuel: 5, money: 250 }, power: 5.0 },
  drones:   { icon: 'drone.svg', ru: 'Дроны', en: 'Drones', cost: { money: 80 }, power: 0.8 },
};

const UNIT_ORDER = ['infantry', 'tanks', 'aa', 'missiles', 'drones'];

// ============ РАСХОД РЕСУРСОВ ============
const UNIT_COST_PER_ATTACK = {
  infantry: { ammo: 3.0, fuel: 0 },
  tanks:    { ammo: 4.0, fuel: 3.0 },
  aa:       { ammo: 6.0, fuel: 2.5 },  // не используется (ПВО не атакует), но пусть будет
  missiles: { ammo: 10.0, fuel: 4.0 },
  drones:   { ammo: 2.0, fuel: 1.5 },
};

const UNIT_COST_PER_TRANSFER = {
  infantry: { ammo: 0, fuel: 0.5 },
  tanks:    { ammo: 0, fuel: 2.0 },
  aa:       { ammo: 0, fuel: 1.5 },
  missiles: { ammo: 0, fuel: 2.5 },
  drones:   { ammo: 0, fuel: 0.5 },
};

function calcAttackCost(composition) {
  let ammo = 0, fuel = 0;
  UNIT_ORDER.forEach(k => {
    if (k === 'aa') return; // ПВО не атакует
    const count = composition[k] || 0;
    if (count === 0) return;
    const cost = UNIT_COST_PER_ATTACK[k];
    ammo += cost.ammo * count;
    fuel += cost.fuel * count;
  });
  return { ammo, fuel };
}

function calcTransferCost(composition) {
  let fuel = 0;
  UNIT_ORDER.forEach(k => {
    const count = composition[k] || 0;
    if (count === 0) return;
    fuel += UNIT_COST_PER_TRANSFER[k].fuel * count;
  });
  return { ammo: 0, fuel };
}

// ============ ИКОНКА БМП ============
let apcImage = null;

function loadApсImage() {
  apcImage = new Image();
  apcImage.src = 'icons/apc.png';
}

// ============ ГАРНИЗОН ============
function makeStartingGarrison() { return { infantry: 5, tanks: 2, aa: 0, missiles: 0, drones: 0 }; }
function makeEmptyGarrison() { return { infantry: 0, tanks: 0, aa: 0, missiles: 0, drones: 0 }; }

function getGarrisonTotal(g) { return UNIT_ORDER.reduce((s, k) => s + (g[k] || 0), 0); }
function getCityPower(city) {
  const g = city.garrison || {};
  return UNIT_ORDER.reduce((s, k) => s + (g[k] || 0) * (UNIT_TYPES[k]?.power || 0), 0);
}
function canAttack(city) { return city.owner === state.faction && getGarrisonTotal(city.garrison) > 0; }
function canHire(city, unitType, count = 1) {
  if (city.owner !== state.faction) return false;
  const cost = UNIT_TYPES[unitType].cost;
  if (state.money < (cost.money || 0) * count) return false;
  if (state.resources.weapons < (cost.weapons || 0) * count) return false;
  if (state.resources.tanks < (cost.tanks || 0) * count) return false;
  if (state.resources.fuel < (cost.fuel || 0) * count) return false;
  if (state.resources.drones < (cost.drones || 0) * count) return false;
  return true;
}

// WEATHER
const WEATHER = {
  clear:    { icon: 'sun.svg', ru: 'Ясно',   en: 'Clear',    speedMult: 1.0, incomeMult: 1.00, welfareDelta: 0,     aaMult: 1.0 },
  rain:     { icon: 'rain.svg', ru: 'Дождь',  en: 'Rain',     speedMult: 0.8, incomeMult: 0.95, welfareDelta: 0,     aaMult: 1.0 },
  snow:     { icon: 'snow.svg', ru: 'Снег',   en: 'Snow',     speedMult: 0.6, incomeMult: 0.90, welfareDelta: -0.05, aaMult: 1.0 },
  fog:      { icon: 'fog.svg', ru: 'Туман',  en: 'Fog',      speedMult: 0.7, incomeMult: 1.00, welfareDelta: 0,     aaMult: 0.8 },
  storm:    { icon: 'storm.svg', ru: 'Гроза',  en: 'Storm',    speedMult: 0.5, incomeMult: 0.85, welfareDelta: -0.10, aaMult: 0.8 },
  blizzard: { icon: 'tornado.svg', ru: 'Буря',   en: 'Blizzard', speedMult: 0.4, incomeMult: 0.75, welfareDelta: -0.15, aaMult: 0.7 },
};
const WEATHER_KEYS = ['clear', 'clear', 'clear', 'rain', 'rain', 'snow', 'fog', 'storm', 'blizzard'];

// DAY/NIGHT
const DAY_CYCLE_DURATION = 240;
const DAY_PHASES = [
  { key: 'dawn',  icon: 'sun.svg', ru: 'Рассвет', en: 'Dawn',  start: 0.000, end: 0.125 },
  { key: 'day',   icon: 'sun.svg', ru: 'День',    en: 'Day',   start: 0.125, end: 0.500 },
  { key: 'dusk',  icon: 'sun.svg', ru: 'Закат',   en: 'Dusk',  start: 0.500, end: 0.625 },
  { key: 'night', icon: 'moon.svg', ru: 'Ночь',    en: 'Night', start: 0.625, end: 1.000 },
];
const DAY_EFFECTS = {
  dawn:  { incomeMult: 1.00, speedMult: 1.00, welfareDelta: 0,     darkness: 0.15 },
  day:   { incomeMult: 1.10, speedMult: 1.00, welfareDelta: 0,     darkness: 0.00 },
  dusk:  { incomeMult: 1.00, speedMult: 1.00, welfareDelta: 0,     darkness: 0.20 },
  night: { incomeMult: 0.90, speedMult: 0.80, welfareDelta: -0.02, darkness: 0.55 },
};

// STATE
const state = {
  settings: { language: 'ru', faction: null, difficulty: 'normal' },
  faction: null, enemyFaction: null, difficulty: null,
  money: 0, welfare: 55, population: 127500000, taxRate: 0.30, army: 0,
  timeScale: 1, paused: false, gameOver: false, gameOverShown: false, welfareTrend: 0,
  paymentsCost: 70,
  services: { science: 31, order: 23, health: 23, emergency: 23, corruption: 9 },
  tech: { economy: 0, combat: 0, armor: 0, logistics: 0, aa: 0, drones: 0, dronefactory: 0, mobilization: 0, life: 0, birth: 0 },
  resources: { ammo: 139, weapons: 71, tanks: 3, fuel: 162, drones: 0 },
  mobilizeCooldown: 0,
  weather: 'clear', weatherTimer: 90, weatherDuration: 90,
  globalTime: 0, lastAttackTime: -999,
  dayTime: 0.2,
  gameDay: 1,
  lastEventText: '',
  lastEventType: 'info',
  lastEventTime: -999,
  statusOverride: null,
  statusOverrideUntil: 0,
  warnedAboutAttack: false,
  captureEffects: [],
};

const RESOURCE_MAX = { ammo: 300, weapons: 200, tanks: 40, fuel: 300, drones: 100 };

// MAP
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
let worldTextureCanvas, worldOverlayCanvas;
let noiseGen;

const camera = {
  x: 0, y: 0, zoom: 1, minZoom: 0.5, maxZoom: 2.5,
  dragging: false, dragStartX: 0, dragStartY: 0,
  cameraStartX: 0, cameraStartY: 0, moved: false,
  pinching: false, pinchStartDist: 0, pinchStartZoom: 1,
  pinchCenterX: 0, pinchCenterY: 0,
};

// CONFIGS
const SERVICES_CFG = {
  science: { baseCost: 130, increment: 8 },
  order: { baseCost: 95, increment: 8 },
  health: { baseCost: 95, increment: 8 },
  emergency: { baseCost: 95, increment: 8 },
};
const TECH_CFG = {
  economy: 300, combat: 350, armor: 300, logistics: 280,
  aa: 400, drones: 350, dronefactory: 280, mobilization: 280,
  life: 380, birth: 280,
};
const BUILDINGS_CFG = {
  mine: { ru: 'Шахта', en: 'Mine', cost: 850, icon: 'pickaxe.svg' },
  factory: { ru: 'Завод', en: 'Factory', cost: 700, icon: 'factory.svg' },
  ammoFactory: { ru: 'Завод боеприпасов', en: 'Ammo factory', cost: 1020, icon: 'ammo-box.svg' },
  weaponFactory: { ru: 'Оружейный завод', en: 'Weapon factory', cost: 1360, icon: 'sword.svg' },
  tankFactory: { ru: 'Танковый завод', en: 'Tank factory', cost: 1200, icon: 'tank.svg' },
  oilWell: { ru: 'Нефтяная скважина', en: 'Oil well', cost: 1105, icon: 'oil-pump.svg' },
  droneFactory: { ru: 'Завод дронов', en: 'Drone factory', cost: 1250, icon: 'drone.svg' },
};
const FORTIFICATIONS = [
  { level: 0, icon: 'buildings.svg', ru: 'Открытый', en: 'Open', cost: 0 },
  { level: 1, icon: 'shield.svg', ru: 'Окопы', en: 'Trenches', cost: 50 },
  { level: 2, icon: 'castle.svg', ru: 'Бункеры', en: 'Bunkers', cost: 150 },
  { level: 3, icon: 'anti-aircraft.svg', ru: 'ПВО', en: 'Air def', cost: 300 },
  { level: 4, icon: 'cargo.svg', ru: 'РЭБ', en: 'EW', cost: 600 },
];
const MAX_BUILDINGS = 8;

// ============ NOISE ============
function initNoise() {
  if (typeof SimplexNoise !== 'undefined') noiseGen = new SimplexNoise();
  else noiseGen = { noise2D: (x, y) => Math.sin(x * 0.5) * Math.cos(y * 0.5) * 0.5 };
}

function fbm(x, y, octaves = 4, scale = 0.01) {
  let v = 0, amp = 1, freq = scale, max = 0;
  for (let i = 0; i < octaves; i++) {
    v += noiseGen.noise2D(x * freq, y * freq) * amp;
    max += amp;
    amp *= 0.5;
    freq *= 2;
  }
  return v / max;
}

function getTerrainColor(x, y, owner) {
  const n1 = fbm(x, y, 4, 0.008);
  const n2 = fbm(x + 1000, y + 1000, 3, 0.025);
  const n3 = fbm(x + 5000, y + 5000, 2, 0.05);
  let base = 20 + n1 * 12;
  let r, g, b;
  if (owner === 'aurora') {
    r = base - 5; g = base + 8 + n2 * 6; b = base + 18 + n2 * 8;
  } else if (owner === 'vesper') {
    r = base + 10 + n2 * 6; g = base - 2; b = base - 5;
  } else {
    r = base; g = base + 2; b = base + 5;
  }
  if (n2 > 0.4) { g += 8; r -= 3; }
  else if (n2 < -0.4) { r += 6; g -= 3; }
  const grain = n3 * 4;
  r += grain; g += grain; b += grain;
  return `rgb(${Math.max(0, Math.min(255, r|0))},${Math.max(0, Math.min(255, g|0))},${Math.max(0, Math.min(255, b|0))})`;
}

// ============ EVENT MESSAGE ============
function setEventMessage(text, type = 'info') {
  state.lastEventText = text;
  state.lastEventType = type;
  state.lastEventTime = state.globalTime;
  state.statusOverride = { text, type };
  state.statusOverrideUntil = performance.now() + 3000;
}

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
  document.querySelectorAll('.faction-card').forEach(c => c.classList.toggle('selected', c.dataset.faction === faction));
  checkReady();
}
function selectDifficulty(diff) {
  state.settings.difficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.toggle('selected', b.dataset.diff === diff));
  updateDifficultyDesc(diff);
  checkReady();
}
function updateDifficultyDesc(diff) {
  const dict = LANG[state.settings.language];
  const d = DIFFICULTY[diff];
  const el = document.getElementById('difficulty-desc');
  el.dataset.diff = diff;
  const pct = m => { const v = Math.round((m - 1) * 100); return (v > 0 ? '+' : '') + v + '%'; };
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
    btn.classList.add('selected'); applyLanguage(btn.dataset.lang);
  });
});
document.querySelectorAll('.faction-card').forEach(card => card.addEventListener('click', () => selectFaction(card.dataset.faction)));
document.querySelectorAll('.diff-btn').forEach(btn => btn.addEventListener('click', () => selectDifficulty(btn.dataset.diff)));
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
    x: 3, y: 3, type: 'capital', owner: 'aurora', name: 'Аврора',
    baseIncome: 1.5, basePop: 5, infrastructure: 100,
    garrison: makeStartingGarrison(), fortification: 2,
    buildings: { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0, droneFactory: 0 },
  });
  CITIES.push({
    x: MAP.W - 4, y: MAP.H - 4, type: 'capital', owner: 'vesper', name: 'Веспер',
    baseIncome: 1.5, basePop: 5, infrastructure: 100,
    garrison: makeStartingGarrison(), fortification: 2,
    buildings: { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0, droneFactory: 0 },
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
  const genName = prefixes => {
    for (let i = 0; i < 100; i++) {
      const name = prefixes[Math.floor(rand() * prefixes.length)] + suffix[Math.floor(rand() * suffix.length)];
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
        const g = makeEmptyGarrison();
        g.infantry = garrison;
        CITIES.push({
          x, y, type, owner, name: genName(prefixes),
          baseIncome, basePop: 1, garrison: g,
          infrastructure: 60 + Math.floor(rand() * 30),
          fortification: 0,
          buildings: { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0, droneFactory: 0 },
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
  return ROADS.filter(r => r.from === city || r.to === city).map(r => r.from === city ? r.to : r.from);
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
  initNoise();
  generateTerrainCanvas();
  generateOverlayCanvas();
}

function generateTerrainCanvas() {
  worldTextureCanvas = document.createElement('canvas');
  worldTextureCanvas.width = WORLD_W;
  worldTextureCanvas.height = WORLD_H;
  const tctx = worldTextureCanvas.getContext('2d');

  tctx.fillStyle = '#1a1f2a';
  tctx.fillRect(0, 0, WORLD_W, WORLD_H);

  const blockSize = 6;
  for (let py = 0; py < WORLD_H; py += blockSize) {
    for (let px = 0; px < WORLD_W; px += blockSize) {
      let minD = Infinity, owner = 'neutral';
      for (let i = 0; i < CITIES.length; i++) {
        const dx = CITIES[i].x * MAP.TILE + MAP.TILE / 2 - px;
        const dy = CITIES[i].y * MAP.TILE + MAP.TILE / 2 - py;
        const d = dx * dx + dy * dy;
        if (d < minD) { minD = d; owner = CITIES[i].owner; }
      }
      tctx.fillStyle = getTerrainColor(px, py, owner);
      tctx.fillRect(px, py, blockSize, blockSize);
    }
  }

  const lightGrad = tctx.createLinearGradient(0, 0, WORLD_W, WORLD_H);
  lightGrad.addColorStop(0, 'rgba(255, 240, 200, 0.06)');
  lightGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
  lightGrad.addColorStop(1, 'rgba(0, 0, 20, 0.08)');
  tctx.fillStyle = lightGrad;
  tctx.fillRect(0, 0, WORLD_W, WORLD_H);
}

function generateOverlayCanvas() {
  worldOverlayCanvas = document.createElement('canvas');
  worldOverlayCanvas.width = WORLD_W;
  worldOverlayCanvas.height = WORLD_H;
  const octx = worldOverlayCanvas.getContext('2d');

  const points = CITIES.map(c => [c.x * MAP.TILE + MAP.TILE / 2, c.y * MAP.TILE + MAP.TILE / 2]);
  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, WORLD_W, WORLD_H]);

  CITIES.forEach((city, i) => {
    const polygon = voronoi.cellPolygon(i);
    if (!polygon) return;
    const cx = city.x * MAP.TILE + MAP.TILE / 2;
    const cy = city.y * MAP.TILE + MAP.TILE / 2;
    let centerColor;
    if (city.owner === 'aurora') centerColor = 'rgba(0, 90, 130, 0.32)';
    else if (city.owner === 'vesper') centerColor = 'rgba(140, 30, 55, 0.32)';
    else centerColor = 'rgba(80, 85, 95, 0.25)';

    const grad = octx.createRadialGradient(cx, cy, 0, cx, cy, 240);
    grad.addColorStop(0, centerColor);
    grad.addColorStop(1, centerColor.replace(/[\d.]+\)$/, '0.05)'));

    octx.beginPath();
    polygon.forEach(([x, y], j) => j === 0 ? octx.moveTo(x, y) : octx.lineTo(x, y));
    octx.closePath();
    octx.fillStyle = grad;
    octx.fill();
  });

  octx.strokeStyle = 'rgba(15, 20, 30, 0.9)';
  octx.lineWidth = 1.5;

  CITIES.forEach((city, i) => {
    const polygon = voronoi.cellPolygon(i);
    if (!polygon) return;

    octx.beginPath();
    for (let k = 0; k < polygon.length; k++) {
      const p1 = polygon[k];
      const p2 = polygon[(k + 1) % polygon.length];
      const steps = 4;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        const x = p1[0] + (p2[0] - p1[0]) * t;
        const y = p1[1] + (p2[1] - p1[1]) * t;
        const dx = p2[0] - p1[0];
        const dy = p2[1] - p1[1];
        const len = Math.hypot(dx, dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;
        const wobble = noiseGen.noise2D(x * 0.05, y * 0.05) * 3;
        const fx = x + nx * wobble;
        const fy = y + ny * wobble;
        if (k === 0 && s === 0) octx.moveTo(fx, fy);
        else octx.lineTo(fx, fy);
      }
    }
    octx.closePath();
    octx.stroke();
  });

  for (let i = 0; i < CITIES.length; i++) {
    for (const j of voronoi.neighbors(i)) {
      if (i >= j) continue;
      if (CITIES[i].owner === CITIES[j].owner) continue;
      const c1 = voronoi.cellPolygon(i), c2 = voronoi.cellPolygon(j);
      if (!c1 || !c2) continue;
      const shared = [];
      c1.forEach(p1 => c2.forEach(p2 => {
        if (Math.abs(p1[0] - p2[0]) < 0.5 && Math.abs(p1[1] - p2[1]) < 0.5) shared.push(p1);
      }));
      if (shared.length >= 2) {
        octx.beginPath();
        octx.moveTo(shared[0][0], shared[0][1]);
        for (let k = 1; k < shared.length; k++) octx.lineTo(shared[k][0], shared[k][1]);
        octx.strokeStyle = 'rgba(0, 0, 0, 0.95)';
        octx.lineWidth = 2.5;
        octx.stroke();
      }
    }
  }

  drawRiverOverlay(octx);
}

function drawRiverOverlay(octx) {
  let px = WORLD_W * 0.45, phase = 0;
  const points = [];
  for (let py = 0; py < WORLD_H; py += 8) {
    phase += 0.15;
    px += Math.sin(phase) * 12 + (Math.random() - 0.5) * 3;
    px = Math.max(WORLD_W * 0.35, Math.min(WORLD_W * 0.65, px));
    points.push({ x: px, y: py });
  }
  octx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
  octx.lineWidth = 14; octx.lineCap = 'round'; octx.lineJoin = 'round';
  octx.beginPath();
  points.forEach((p, i) => i === 0 ? octx.moveTo(p.x, p.y) : octx.lineTo(p.x, p.y));
  octx.stroke();
  octx.strokeStyle = '#0a1a28';
  octx.lineWidth = 10;
  octx.stroke();
  octx.strokeStyle = '#153a5a';
  octx.lineWidth = 4;
  octx.stroke();
  octx.strokeStyle = 'rgba(100, 180, 240, 0.25)';
  octx.lineWidth = 1.5;
  octx.beginPath();
  points.forEach((p, i) => {
    if (i % 3 === 0) {
      const offset = Math.sin(i * 0.5) * 2;
      if (i === 0) octx.moveTo(p.x + offset, p.y);
      else octx.lineTo(p.x + offset, p.y);
    }
  });
  octx.stroke();
}

// ============ CANVAS / УПРАВЛЕНИЕ ============
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
  const lx = clientX - rect.left, ly = clientY - rect.top;
  const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom * factor));
  applyZoomAt(lx, ly, newZoom);
}
function applyZoomAt(lx, ly, newZoom) {
  const worldX = lx / camera.zoom + camera.x;
  const worldY = ly / camera.zoom + camera.y;
  camera.zoom = newZoom;
  camera.x = worldX - lx / camera.zoom;
  camera.y = worldY - ly / camera.zoom;
  clampCamera();
}
function zoomByCenter(factor) {
  const rect = canvas.getBoundingClientRect();
  const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom * factor));
  applyZoomAt(rect.width / 2, rect.height / 2, newZoom);
}

function handleCanvasClick(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const lx = clientX - rect.left, ly = clientY - rect.top;
  const worldX = lx / camera.zoom + camera.x;
  const worldY = ly / camera.zoom + camera.y;
  let closest = null, minDist = 30;
  CITIES.forEach(c => {
    const cx = c.x * MAP.TILE + MAP.TILE / 2;
    const cy = c.y * MAP.TILE + MAP.TILE / 2;
    const d = Math.hypot(worldX - cx, worldY - cy);
    if (d < minDist) { minDist = d; closest = c; }
  });
  if (closest) openCityPanel(closest);
  else { closeCityPanel(); closeAttackTargetPanel(); closeAttackSourcesPanel(); }
}

// ============ ПАНЕЛЬ ГОРОДА ============
let selectedCity = null;
function getFortification(city) { return FORTIFICATIONS[city.fortification || 0]; }
function getDefenseMultiplier(city) { return 1 + (city.fortification || 0) * 0.15; }

function openCityPanel(city) {
  selectedCity = city;
  const dict = LANG[state.settings.language];
  const lang = state.settings.language;
  document.getElementById('city-panel').classList.remove('hidden');
  document.getElementById('city-panel-name').textContent = city.name;
  document.getElementById('city-owner').textContent =
    city.owner === 'aurora' ? dict.ownerAurora :
    city.owner === 'vesper' ? dict.ownerVesper : dict.ownerNeutral;
  document.getElementById('city-type').textContent =
    city.type === 'capital' ? dict.typeCapital :
    city.type === 'large' ? dict.typeLarge :
    city.type === 'medium' ? dict.typeMedium : dict.typeSmall;
  const g = city.garrison || makeEmptyGarrison();
  const gTotal = getGarrisonTotal(g);
  const gStr = UNIT_ORDER.filter(k => g[k] > 0)
    .map(k => `<img class="svg-icon-inline" src="icons/${UNIT_TYPES[k].icon}" alt="">${g[k]}`)
    .join(' ') || '—';
  document.getElementById('city-garrison').innerHTML = `${gTotal} (${gStr})`;
  document.getElementById('city-infra').textContent = city.infrastructure + '%';
  const fort = getFortification(city);
  document.getElementById('city-defense').innerHTML =
    `<img class="svg-icon-inline" src="icons/${fort.icon}" alt=""> ${lang === 'ru' ? fort.ru : fort.en}`;
  const isOwn = city.owner === state.faction;
  const income = isOwn ? city.baseIncome * (city.infrastructure / 100) * (state.welfare / 100) : 0;
  document.getElementById('city-income').textContent = isOwn ? '+' + income.toFixed(2) + '/с' : '—';
  const buildings = city.buildings || {};
  const totalBuildings = Object.values(buildings).reduce((a, b) => a + b, 0);
  document.getElementById('city-buildings').textContent = totalBuildings > 0 ? totalBuildings : '—';
  const isStrategic = totalBuildings >= 5;
  document.getElementById('city-strategic').innerHTML = isStrategic
    ? `<img class="svg-icon-inline" src="icons/Warning.svg" alt=""> Да`
    : 'Нет';
  document.getElementById('city-strategic').style.color = isStrategic ? '#ff3b5c' : '';

  const attackBtn = document.getElementById('city-attack-btn');
  const transferBtn = document.getElementById('city-transfer-btn');
  const hireBtn = document.getElementById('city-hire-btn');
  const fortifyBtn = document.getElementById('city-fortify-btn');
  const buildBtn = document.getElementById('city-build-btn');

  if (isOwn) {
    attackBtn.disabled = !canAttack(city);
    attackBtn.onclick = () => openSendModal(city);

    transferBtn.style.display = 'flex';
    const ownTargets = getRoadsFrom(city).filter(c => c.owner === state.faction);
    if (ownTargets.length > 0 && getGarrisonTotal(city.garrison) > 0) {
      transferBtn.disabled = false;
      transferBtn.onclick = () => openTransferModal(city);
    } else {
      transferBtn.disabled = true;
      transferBtn.onclick = null;
    }

    hireBtn.style.display = 'flex';
    hireBtn.disabled = false;
    hireBtn.onclick = () => openHireModal(city);
    const nextFort = FORTIFICATIONS[(city.fortification || 0) + 1];
    if (nextFort) {
      fortifyBtn.innerHTML =
        `<img class="svg-icon" src="icons/${nextFort.icon}" alt=""><span>${lang === 'ru' ? nextFort.ru : nextFort.en} (${nextFort.cost})</span>`;
      fortifyBtn.disabled = state.money < nextFort.cost;
      fortifyBtn.style.display = 'flex';
      fortifyBtn.onclick = () => fortifyCity(city);
    } else {
      fortifyBtn.innerHTML = `<span>✅ Максимум</span>`;
      fortifyBtn.disabled = true; fortifyBtn.style.display = 'flex';
    }
    buildBtn.style.display = 'flex';
    buildBtn.disabled = false;
    buildBtn.onclick = () => openBuildModal(city);
  } else {
    const sources = getRoadsFrom(city).filter(c => c.owner === state.faction && canAttack(c));
    if (sources.length > 0) {
      attackBtn.disabled = false;
      attackBtn.onclick = () => openAttackSourcesPanel(city, sources);
    } else {
      attackBtn.disabled = true;
      attackBtn.onclick = null;
    }
    hireBtn.style.display = 'none';
    fortifyBtn.style.display = 'none';
    buildBtn.style.display = 'none';
    transferBtn.style.display = 'none';
  }
}
function closeCityPanel() {
  document.getElementById('city-panel').classList.add('hidden');
  selectedCity = null;
}
document.getElementById('city-panel-close').addEventListener('click', closeCityPanel);
function fortifyCity(city) {
  const nf = FORTIFICATIONS[(city.fortification || 0) + 1];
  if (!nf || state.money < nf.cost) return;
  state.money -= nf.cost;
  city.fortification = nf.level;
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
  targets.forEach(target => {
    const row = document.createElement('div');
    row.className = 'target-row';
    row.innerHTML = `
      <div>
        <div class="target-name">${target.name}</div>
        <div class="target-info">${target.owner === 'aurora' ? dict.ownerAurora : dict.ownerVesper} · Сила: ${getCityPower(target).toFixed(1)}</div>
      </div>
    `;
    row.addEventListener('click', () => { closeAttackTargetPanel(); closeCityPanel(); openSendCompositionModal(selectedCity, target); });
    list.appendChild(row);
  });
}
function closeAttackTargetPanel() { document.getElementById('attack-target-panel').classList.add('hidden'); }
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
        <div class="target-info">Сила: ${getCityPower(source).toFixed(1)}</div>
      </div>
      <div class="target-info">→ ${targetCity.name}</div>
    `;
    row.addEventListener('click', () => { closeAttackSourcesPanel(); closeCityPanel(); openSendCompositionModal(source, targetCity); });
    list.appendChild(row);
  });
}
function closeAttackSourcesPanel() { document.getElementById('attack-sources-panel').classList.add('hidden'); }
document.getElementById('attack-sources-close').addEventListener('click', closeAttackSourcesPanel);

// ============ ОТПРАВКА ============
let sendFromCity = null, sendToCity = null, sendComposition = null;

function openSendModal(fromCity) {
  const targets = getRoadsFrom(fromCity).filter(c => c.owner !== state.faction);
  if (targets.length === 0) return;
  if (targets.length === 1) openSendCompositionModal(fromCity, targets[0]);
  else {
    const dict = LANG[state.settings.language];
    const list = document.getElementById('attack-targets');
    const panel = document.getElementById('attack-target-panel');
    panel.classList.remove('hidden');
    list.innerHTML = '';
    targets.forEach(target => {
      const row = document.createElement('div');
      row.className = 'target-row';
      row.innerHTML = `
        <div>
          <div class="target-name">${target.name}</div>
          <div class="target-info">${target.owner === 'aurora' ? dict.ownerAurora : dict.ownerVesper} · Сила: ${getCityPower(target).toFixed(1)}</div>
        </div>
      `;
      row.addEventListener('click', () => { closeAttackTargetPanel(); openSendCompositionModal(fromCity, target); });
      list.appendChild(row);
    });
  }
}

// ============ ПЕРЕБРОСКА ============
function openTransferModal(fromCity) {
  const targets = getRoadsFrom(fromCity).filter(c => c.owner === state.faction);
  if (targets.length === 0) return;

  if (targets.length === 1) {
    openTransferCompositionModal(fromCity, targets[0]);
  } else {
    const list = document.getElementById('attack-targets');
    const panel = document.getElementById('attack-target-panel');
    panel.classList.remove('hidden');
    list.innerHTML = '';

    targets.forEach(target => {
      const row = document.createElement('div');
      row.className = 'target-row';
      row.innerHTML = `
        <div>
          <div class="target-name">🔄 ${target.name}</div>
          <div class="target-info">Гарнизон: ${getGarrisonTotal(target.garrison)} · Сила: ${getCityPower(target).toFixed(1)}</div>
        </div>
      `;
      row.addEventListener('click', () => {
        closeAttackTargetPanel();
        openTransferCompositionModal(fromCity, target);
      });
      list.appendChild(row);
    });
  }
}

function openTransferCompositionModal(fromCity, toCity) {
  sendFromCity = fromCity;
  sendToCity = toCity;
  sendComposition = { ...fromCity.garrison };

  const modal = document.getElementById('send-modal');
  const title = document.getElementById('send-modal-title');
  const body = document.getElementById('send-modal-body');
  const lang = state.settings.language;
  title.textContent = `🔄 ${fromCity.name} → ${toCity.name}`;

  const update = () => {
    body.innerHTML = '';
    UNIT_ORDER.forEach(key => {
      const available = fromCity.garrison[key] || 0;
      if (available === 0) return;
      const current = sendComposition[key] || 0;
      const ut = UNIT_TYPES[key];
      const row = document.createElement('div');
      row.className = 'send-row';
      row.innerHTML = `
        <div class="send-row-name">
          <img class="svg-icon-inline" src="icons/${ut.icon}" alt="">
          ${lang === 'ru' ? ut.ru : ut.en} (${available})
        </div>
        <div class="send-row-controls">
          <button class="send-row-btn" data-unit="${key}" data-delta="-1" ${current <= 0 ? 'disabled' : ''}>−</button>
          <div class="send-row-value">${current}</div>
          <button class="send-row-btn" data-unit="${key}" data-delta="1" ${current >= available ? 'disabled' : ''}>+</button>
        </div>
      `;
      body.appendChild(row);
    });

    const totalUnits = UNIT_ORDER.reduce((s, k) => s + (sendComposition[k] || 0), 0);
    const cost = calcTransferCost(sendComposition);
    const hasFuel = state.resources.fuel >= cost.fuel;

    const summary = document.createElement('div');
    summary.className = 'send-summary';
    summary.innerHTML = `
      Перебрасывается: <b>${totalUnits}</b> юнитов<br>
      <span style="color:${hasFuel ? '#94a3b8' : '#ff3b5c'}">
        <img class="svg-icon-inline" src="icons/oil-barrel.svg" alt="">
        топливо: ${cost.fuel.toFixed(1)} / ${Math.floor(state.resources.fuel)}
      </span>
    `;
    body.appendChild(summary);

    if (!hasFuel) {
      const warn = document.createElement('div');
      warn.className = 'send-warning';
      warn.innerHTML = `⚠️ Не хватает топлива: ${(cost.fuel - state.resources.fuel).toFixed(1)}`;
      body.appendChild(warn);
    }

    body.querySelectorAll('.send-row-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const unit = btn.dataset.unit;
        const delta = parseInt(btn.dataset.delta);
        sendComposition[unit] = Math.max(0, Math.min(fromCity.garrison[unit] || 0, (sendComposition[unit] || 0) + delta));
        update();
      });
    });

    document.getElementById('send-confirm-btn').disabled = totalUnits === 0 || !hasFuel;
    document.getElementById('send-confirm-btn').dataset.mode = 'transfer';
  };
  update();
  modal.classList.remove('hidden');
}

function resolveTransfer(fromCity, toCity, composition) {
  UNIT_ORDER.forEach(k => {
    if ((composition[k] || 0) > 0) {
      toCity.garrison[k] = (toCity.garrison[k] || 0) + (composition[k] || 0);
    }
  });
  setEventMessage(`✅ Подкрепление прибыло в ${toCity.name}`, 'success');
}

// ============ ОТПРАВКА — атака ============
function openSendCompositionModal(fromCity, toCity) {
  sendFromCity = fromCity; sendToCity = toCity;
  sendComposition = { ...fromCity.garrison };
  const modal = document.getElementById('send-modal');
  const title = document.getElementById('send-modal-title');
  const body = document.getElementById('send-modal-body');
  const lang = state.settings.language;
  title.textContent = `⚔️ ${fromCity.name} → ${toCity.name}`;

  const update = () => {
    body.innerHTML = '';
    UNIT_ORDER.forEach(key => {
      // ПВО не участвует в атаках
      if (key === 'aa') return;

      const available = fromCity.garrison[key] || 0;
      if (available === 0) return;
      const current = sendComposition[key] || 0;
      const ut = UNIT_TYPES[key];
      const row = document.createElement('div');
      row.className = 'send-row';
      row.innerHTML = `
        <div class="send-row-name">
          <img class="svg-icon-inline" src="icons/${ut.icon}" alt="">
          ${lang === 'ru' ? ut.ru : ut.en} (${available})
        </div>
        <div class="send-row-controls">
          <button class="send-row-btn" data-unit="${key}" data-delta="-1" ${current <= 0 ? 'disabled' : ''}>−</button>
          <div class="send-row-value">${current}</div>
          <button class="send-row-btn" data-unit="${key}" data-delta="1" ${current >= available ? 'disabled' : ''}>+</button>
        </div>
      `;
      body.appendChild(row);
    });

    // Обнуляем ПВО в составе (нельзя атаковать)
    sendComposition.aa = 0;

    const totalUnits = UNIT_ORDER.reduce((s, k) => s + (sendComposition[k] || 0), 0);
    const totalPower = UNIT_ORDER.reduce((s, k) => s + (sendComposition[k] || 0) * UNIT_TYPES[k].power, 0);
    const cost = calcAttackCost(sendComposition);

    const hasAmmo = state.resources.ammo >= cost.ammo;
    const hasFuel = state.resources.fuel >= cost.fuel;

    const summary = document.createElement('div');
    summary.className = 'send-summary';
    summary.innerHTML = `
      Итого: <b>${totalUnits}</b> · Сила: <b>${totalPower.toFixed(1)}</b><br>
      <span style="color:${hasAmmo ? '#94a3b8' : '#ff3b5c'}">
        <img class="svg-icon-inline" src="icons/ammo.svg" alt="">
        ${cost.ammo.toFixed(1)} / ${Math.floor(state.resources.ammo)}
      </span>
      &nbsp;·&nbsp;
      <span style="color:${hasFuel ? '#94a3b8' : '#ff3b5c'}">
        <img class="svg-icon-inline" src="icons/oil-barrel.svg" alt="">
        ${cost.fuel.toFixed(1)} / ${Math.floor(state.resources.fuel)}
      </span>
    `;
    body.appendChild(summary);

    if (!hasAmmo || !hasFuel) {
      const warn = document.createElement('div');
      warn.className = 'send-warning';
      const missing = [];
      if (!hasAmmo) missing.push(`боеприпасов ${(cost.ammo - state.resources.ammo).toFixed(1)}`);
      if (!hasFuel) missing.push(`топлива ${(cost.fuel - state.resources.fuel).toFixed(1)}`);
      warn.innerHTML = `⚠️ Не хватает: ${missing.join(', ')}`;
      body.appendChild(warn);
    }

    body.querySelectorAll('.send-row-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const unit = btn.dataset.unit;
        const delta = parseInt(btn.dataset.delta);
        sendComposition[unit] = Math.max(0, Math.min(fromCity.garrison[unit] || 0, (sendComposition[unit] || 0) + delta));
        update();
      });
    });

    document.getElementById('send-confirm-btn').disabled = totalUnits === 0 || !hasAmmo || !hasFuel;
    document.getElementById('send-confirm-btn').dataset.mode = 'attack';
  };
  update();
  modal.classList.remove('hidden');
}

document.getElementById('send-modal-close').addEventListener('click', () => {
  document.getElementById('send-modal').classList.add('hidden');
  sendFromCity = null; sendToCity = null; sendComposition = null;
});

document.getElementById('send-confirm-btn').addEventListener('click', () => {
  if (!sendFromCity || !sendToCity || !sendComposition) return;
  const totalUnits = UNIT_ORDER.reduce((s, k) => s + (sendComposition[k] || 0), 0);
  if (totalUnits === 0) return;

  const mode = document.getElementById('send-confirm-btn').dataset.mode || 'attack';
  const isTransfer = mode === 'transfer';

  if (isTransfer) {
    const cost = calcTransferCost(sendComposition);
    if (state.resources.fuel < cost.fuel) return;
    state.resources.fuel = Math.max(0, state.resources.fuel - cost.fuel);
  } else {
    const cost = calcAttackCost(sendComposition);
    if (state.resources.ammo < cost.ammo || state.resources.fuel < cost.fuel) return;
    state.resources.ammo = Math.max(0, state.resources.ammo - cost.ammo);
    state.resources.fuel = Math.max(0, state.resources.fuel - cost.fuel);
  }

  UNIT_ORDER.forEach(k => {
    sendFromCity.garrison[k] = Math.max(0, (sendFromCity.garrison[k] || 0) - (sendComposition[k] || 0));
  });

  const weather = WEATHER[state.weather];
  const dayEff = getDayEffects();
  const speedMult = isTransfer ? 1.6 : 1.0;

  ACTIVE_ATTACKS.push({
    from: sendFromCity,
    to: sendToCity,
    composition: { ...sendComposition },
    progress: 0,
    speed: 0.1 * weather.speedMult * dayEff.speedMult * speedMult,
    type: isTransfer ? 'transfer' : 'attack',
  });

  state.lastAttackTime = state.globalTime;

  if (isTransfer) {
    setEventMessage(`🔄 Переброска: ${sendFromCity.name} → ${sendToCity.name}`, 'info');
  } else {
    setEventMessage(`⚔️ Войска: ${sendFromCity.name} → ${sendToCity.name}`, 'warning');
  }

  document.getElementById('send-modal').classList.add('hidden');
  document.getElementById('send-confirm-btn').dataset.mode = 'attack';
  closeCityPanel();
  sendFromCity = null; sendToCity = null; sendComposition = null;
});

// ============ НАЙМ ============
let hireCity = null;
function openHireModal(city) {
  hireCity = city;
  const modal = document.getElementById('hire-modal');
  const title = document.getElementById('hire-modal-title');
  const body = document.getElementById('hire-modal-body');
  const res = document.getElementById('hire-modal-resources');
  const lang = state.settings.language;
  title.textContent = `${lang === 'ru' ? 'Найм' : 'Hire'} · ${city.name}`;
  body.innerHTML = '';
  res.innerHTML = `
    <span><img class="svg-icon-inline" src="icons/coins.svg" alt=""> <b>${Math.floor(state.money)}</b></span>
    <span><img class="svg-icon-inline" src="icons/sword.svg" alt=""> <b>${Math.floor(state.resources.weapons)}</b></span>
    <span><img class="svg-icon-inline" src="icons/tank.svg" alt=""> <b>${Math.floor(state.resources.tanks)}</b></span>
    <span><img class="svg-icon-inline" src="icons/oil-barrel.svg" alt=""> <b>${Math.floor(state.resources.fuel)}</b></span>
    <span><img class="svg-icon-inline" src="icons/drone.svg" alt=""> <b>${Math.floor(state.resources.drones)}</b></span>
  `;
  UNIT_ORDER.forEach(key => {
    const ut = UNIT_TYPES[key];
    const count = city.garrison[key] || 0;
    const cost = ut.cost;
    const costStr = [
      cost.weapons ? `<img class="svg-icon-inline" src="icons/sword.svg" alt=""> ${cost.weapons}` : '',
      cost.tanks ? `<img class="svg-icon-inline" src="icons/tank.svg" alt=""> ${cost.tanks}` : '',
      cost.fuel ? `<img class="svg-icon-inline" src="icons/oil-barrel.svg" alt=""> ${cost.fuel}` : '',
      cost.drones ? `<img class="svg-icon-inline" src="icons/drone.svg" alt=""> ${cost.drones}` : '',
      cost.money ? `<img class="svg-icon-inline" src="icons/coins.svg" alt=""> ${cost.money}` : '',
    ].filter(Boolean).join(' + ');
    const row = document.createElement('div');
    row.className = 'hire-row';
    row.innerHTML = `
      <div class="hire-row-info">
        <div class="hire-row-name"><img class="svg-icon-inline" src="icons/${ut.icon}" alt=""> ${lang === 'ru' ? ut.ru : ut.en}</div>
        <div class="hire-row-count">В гарнизоне: ${count}</div>
        <div class="hire-row-cost">${costStr}</div>
      </div>
      <div class="hire-row-buttons">
        <button class="hire-btn-small" data-unit="${key}" data-count="1" ${canHire(city, key, 1) ? '' : 'disabled'}>+1</button>
        <button class="hire-btn-small" data-unit="${key}" data-count="5" ${canHire(city, key, 5) ? '' : 'disabled'}>+5</button>
      </div>
    `;
    body.appendChild(row);
  });
  body.querySelectorAll('.hire-btn-small').forEach(btn => {
    btn.addEventListener('click', () => {
      hireUnits(hireCity, btn.dataset.unit, parseInt(btn.dataset.count));
      openHireModal(hireCity);
    });
  });
  modal.classList.remove('hidden');
}
function hireUnits(city, unitType, count) {
  if (!canHire(city, unitType, count)) return;
  const cost = UNIT_TYPES[unitType].cost;
  state.money -= (cost.money || 0) * count;
  state.resources.weapons -= (cost.weapons || 0) * count;
  state.resources.tanks -= (cost.tanks || 0) * count;
  state.resources.fuel -= (cost.fuel || 0) * count;
  state.resources.drones -= (cost.drones || 0) * count;
  city.garrison[unitType] = (city.garrison[unitType] || 0) + count;
}
function closeHireModal() {
  document.getElementById('hire-modal').classList.add('hidden');
  hireCity = null;
}
document.getElementById('hire-modal-close').addEventListener('click', closeHireModal);

// ============ ДЕЙСТВИЯ ============
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
  if (active.dataset.tab === 'army') updateArmyPanel();
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
  const health = state.services.health;
  const deathRate = 13.0 * (1 - health / 100 * 0.45);
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
  return Math.round(cfg.baseCost * Math.pow(1.06, state.services[key]));
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
  return Math.round(TECH_CFG[key] * Math.pow(1.35, state.tech[key]));
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
  CITIES.forEach(c => {
    if (c.owner === state.faction) c.garrison.infantry = (c.garrison.infantry || 0) + 1;
  });
  state.welfare = Math.max(0, state.welfare - 5);
  state.mobilizeCooldown = 90;
  setEventMessage(`📣 Мобилизация проведена`, 'warning');
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
      if (lvl >= 6) { btn.textContent = '✅'; btn.disabled = true; }
      else { btn.textContent = 'Вложить'; btn.disabled = state.money < cost; }
    }
  });
  const mobBtn = document.getElementById('mobilize-btn');
  const mobSpan = mobBtn.querySelector('span');
  if (state.tech.mobilization < 1) { mobBtn.disabled = true; mobSpan.textContent = 'Мобилизация недоступна'; }
  else if (state.mobilizeCooldown > 0) { mobBtn.disabled = true; mobSpan.textContent = `Перезарядка ${Math.ceil(state.mobilizeCooldown)}с`; }
  else { mobBtn.disabled = false; mobSpan.textContent = 'Мобилизация · призыв'; }
}

// ============ ПРОИЗВОДСТВО ============
function calcResourceProduction() {
  let ammo = 0, weapons = 0, tanks = 0, fuel = 0, drones = 0;
  let myCitiesCount = 0;
  let droneFactoryCount = 0;

  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    myCitiesCount++;
    ammo += (c.buildings?.ammoFactory || 0) * 1.2;
    weapons += (c.buildings?.weaponFactory || 0) * 0.6;
    tanks += (c.buildings?.tankFactory || 0) * 0.15;
    fuel += (c.buildings?.oilWell || 0) * 1.0;
    droneFactoryCount += (c.buildings?.droneFactory || 0);
  });

  // Дроны: базовое (0.02 × город) + от заводов (0.04 × завод)
  const droneTechMult = 1 + state.tech.dronefactory * 0.15;
  drones = (myCitiesCount * 0.02 + droneFactoryCount * 0.04) * droneTechMult;

  return { ammo, weapons, tanks, fuel, drones };
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
  document.getElementById('res-tanks-prod').textContent = prod.tanks > 0 ? `производство +${prod.tanks.toFixed(2)}/с` : 'производство 0';
  document.getElementById('buy-tanks-btn').disabled = state.money < 160 || r.tanks >= RESOURCE_MAX.tanks;
  document.getElementById('res-fuel-count').textContent = `${Math.floor(r.fuel)}/${RESOURCE_MAX.fuel}`;
  document.getElementById('res-fuel-prod').textContent = `производство +${prod.fuel.toFixed(2)}/с`;
  document.getElementById('buy-fuel-btn').disabled = state.money < 160 || r.fuel >= RESOURCE_MAX.fuel;
  document.getElementById('res-drones-count').textContent = `${Math.floor(r.drones)}/${RESOURCE_MAX.drones}`;
  document.getElementById('res-drones-prod').textContent = `производство +${prod.drones.toFixed(2)}/с`;

  const totals = { mine: 0, factory: 0, ammoFactory: 0, weaponFactory: 0, tankFactory: 0, oilWell: 0, droneFactory: 0 };
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
  document.getElementById('bld-dronefactory-total').textContent = totals.droneFactory;
}

// ============ АРМИЯ ============
function updateArmyPanel() {
  let garrisons = 0, inField = 0;
  const byType = { infantry: 0, tanks: 0, aa: 0, missiles: 0, drones: 0 };
  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    UNIT_ORDER.forEach(k => {
      const v = c.garrison[k] || 0;
      garrisons += v;
      byType[k] += v;
    });
  });
  ACTIVE_ATTACKS.forEach(atk => {
    if (atk.from.owner !== state.faction) return;
    UNIT_ORDER.forEach(k => {
      const v = atk.composition[k] || 0;
      inField += v;
      byType[k] += v;
    });
  });
  document.getElementById('army-total').textContent = garrisons + inField;
  document.getElementById('army-garrisons').textContent = garrisons;
  document.getElementById('army-in-field').textContent = inField;
  document.getElementById('army-infantry-count').textContent = byType.infantry;
  document.getElementById('army-tanks-count').textContent = byType.tanks;
  document.getElementById('army-aa-count').textContent = byType.aa;
  document.getElementById('army-missiles-count').textContent = byType.missiles;
  document.getElementById('army-drones-count').textContent = byType.drones;
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
        <div class="build-name"><img class="svg-icon-inline" src="icons/${b.icon}" alt=""> ${b[lang]}</div>
        <div class="build-count">Построено: ${count}/${MAX_BUILDINGS}</div>
      </div>
      <button class="build-action" data-key="${key}" ${canBuild ? '' : 'disabled'}>
        <img class="svg-icon-inline" src="icons/coins.svg" alt=""> ${cost}
      </button>
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

// ============ АТАКИ / БОЙ ============
function updateAttacks(dt) {
  for (let i = ACTIVE_ATTACKS.length - 1; i >= 0; i--) {
    const atk = ACTIVE_ATTACKS[i];
    atk.progress += atk.speed * dt;
    if (atk.progress >= 1) {
      if (atk.type === 'transfer') {
        resolveTransfer(atk.from, atk.to, atk.composition);
      } else {
        resolveBattle(atk.from, atk.to, atk.composition);
      }
      ACTIVE_ATTACKS.splice(i, 1);
    }
  }
}

function resolveBattle(fromCity, toCity, composition) {
  const attackerGarrison = composition;
  const defenderGarrison = { ...toCity.garrison };
  const combatBonus = 1 + state.tech.combat * 0.12;
  const armorBonus = 1 + state.tech.armor * 0.12;
  const defenseMult = getDefenseMultiplier(toCity);

  // ПВО не даёт атакующей силы
  const attackPower = UNIT_ORDER
    .filter(k => k !== 'aa')
    .reduce((s, k) => s + (attackerGarrison[k] || 0) * UNIT_TYPES[k].power, 0) * combatBonus;

  const defensePower = UNIT_ORDER.reduce((s, k) => s + (defenderGarrison[k] || 0) * UNIT_TYPES[k].power, 0) * armorBonus * defenseMult;
  const victory = attackPower > defensePower;
  const attackerLosses = {}, defenderLosses = {}, survivors = { ...attackerGarrison };

  if (victory) {
    const ratio = defensePower / Math.max(0.01, attackPower);
    const lossRatio = Math.min(1, ratio * 0.7);
    UNIT_ORDER.forEach(k => {
      const count = attackerGarrison[k] || 0;
      const lost = Math.floor(count * lossRatio);
      attackerLosses[k] = lost;
      survivors[k] = count - lost;
    });
    UNIT_ORDER.forEach(k => { defenderLosses[k] = Math.ceil((defenderGarrison[k] || 0) * 0.85); });

    const wasEnemy = toCity.owner !== state.faction;
    toCity.owner = state.faction;
    toCity.garrison = { ...survivors };
    toCity.fortification = Math.max(0, toCity.fortification - 1);
    state.welfare -= 5;

    // Эффект захвата
    if (wasEnemy) {
      const isEnemyCapture = fromCity.owner === state.enemyFaction;
      state.captureEffects.push({
        x: toCity.x,
        y: toCity.y,
        start: performance.now(),
        duration: 1500,
        color: isEnemyCapture ? '#ff3b5c' : '#00ff88',
      });
    }
  } else {
    const ratio = attackPower / Math.max(0.01, defensePower);
    const lossRatio = Math.min(1, ratio * 0.9);
    UNIT_ORDER.forEach(k => {
      const count = attackerGarrison[k] || 0;
      const lost = Math.ceil(count * lossRatio);
      attackerLosses[k] = lost;
      survivors[k] = count - lost;
    });
    UNIT_ORDER.forEach(k => {
      if (survivors[k] > 0) fromCity.garrison[k] = (fromCity.garrison[k] || 0) + survivors[k];
    });
    UNIT_ORDER.forEach(k => {
      const count = defenderGarrison[k] || 0;
      const lost = Math.floor(count * 0.3);
      defenderLosses[k] = lost;
      toCity.garrison[k] = Math.max(0, count - lost);
    });
    state.welfare -= 8;
  }
  state.welfare = Math.max(0, Math.min(100, state.welfare));

  if (victory) {
    setEventMessage(`✅ Захвачен ${toCity.name}`, 'success');
  } else {
    setEventMessage(`💀 Потеряли войска под ${toCity.name}`, 'danger');
  }

  checkVictory();
}

// ============ ДЕНЬ/НОЧЬ / ПОГОДА ============
function getCurrentPhase() {
  const t = state.dayTime % 1;
  for (const phase of DAY_PHASES) {
    if (t >= phase.start && t < phase.end) return phase;
  }
  return DAY_PHASES[0];
}
function getDayEffects() { return DAY_EFFECTS[getCurrentPhase().key]; }
function getDarknessAlpha() {
  const t = state.dayTime % 1;
  let current = DAY_PHASES[0], next = DAY_PHASES[1];
  for (let i = 0; i < DAY_PHASES.length; i++) {
    if (t >= DAY_PHASES[i].start && t < DAY_PHASES[i].end) {
      current = DAY_PHASES[i];
      next = DAY_PHASES[(i + 1) % DAY_PHASES.length];
      break;
    }
  }
  const p = (t - current.start) / (current.end - current.start);
  const cur = DAY_EFFECTS[current.key].darkness;
  const nxt = DAY_EFFECTS[next.key].darkness;
  if (p > 0.7) {
    const b = (p - 0.7) / 0.3;
    return cur + (nxt - cur) * b;
  }
  return cur;
}

function getSituation() {
  const timeSince = state.globalTime - state.lastAttackTime;
  const enemyAttacksOnUs = ACTIVE_ATTACKS.filter(atk => atk.from.owner === state.enemyFaction && atk.to.owner === state.faction && atk.type !== 'transfer');
  const ourAttacks = ACTIVE_ATTACKS.filter(atk => atk.from.owner === state.faction && atk.type !== 'transfer');
  const critical = enemyAttacksOnUs.some(atk => {
    const defPower = getCityPower(atk.to) * getDefenseMultiplier(atk.to) * (1 + state.tech.armor * 0.12);
    const atkPower = UNIT_ORDER.reduce((s, k) => s + (atk.composition[k] || 0) * UNIT_TYPES[k].power, 0) * (1 + state.tech.combat * 0.12);
    return atkPower > defPower;
  });
  if (critical) return { icon: '💀', color: 'critical', ru: 'Критическая', en: 'Critical' };
  if (enemyAttacksOnUs.length > 0) return { icon: '🔴', color: 'red', ru: 'Враг наступает', en: 'Enemy' };
  if (ourAttacks.length > 0) return { icon: '🟡', color: 'yellow', ru: 'Напряжение', en: 'Tension' };
  return { icon: '🟢', color: 'green', ru: 'Затишье', en: 'Calm' };
}

function getCityThreat(city) {
  let totalEnemyPower = 0;
  ACTIVE_ATTACKS.forEach(atk => {
    if (atk.to === city && atk.from.owner === state.enemyFaction && atk.type !== 'transfer') {
      const atkPower = UNIT_ORDER.reduce((s, k) => s + (atk.composition[k] || 0) * UNIT_TYPES[k].power, 0);
      totalEnemyPower += atkPower;
    }
  });
  if (totalEnemyPower === 0) return 0;
  const defensePower = getCityPower(city) * getDefenseMultiplier(city) * (1 + state.tech.armor * 0.12);
  const combatBonus = 1 + state.tech.combat * 0.12;
  if (totalEnemyPower * combatBonus > defensePower) return 2;
  return 1;
}

// ============ ЭКГ-МОНИТОР ============
let situationCtx = null;
let situationPoints = [];
let lastSituationDraw = 0;
const SITUATION_POINTS = 120;

function initSituationCanvas() {
  const c = document.getElementById('situation-canvas');
  if (!c) return;
  const rect = c.getBoundingClientRect();
  const dpr2 = window.devicePixelRatio || 1;
  c.width = rect.width * dpr2;
  c.height = rect.height * dpr2;
  situationCtx = c.getContext('2d');
  situationCtx.setTransform(dpr2, 0, 0, dpr2, 0, 0);
}

function getTension() {
  let tension = 0;
  const sit = getSituation();
  if (sit.color === 'green') tension = 0.05;
  else if (sit.color === 'yellow') tension = 0.3;
  else if (sit.color === 'red') tension = 0.6;
  else if (sit.color === 'critical') tension = 0.95;

  tension += Math.min(0.3, ACTIVE_ATTACKS.length * 0.1);
  if (state.welfare < 30) tension += 0.15;
  if (state.services.corruption > 60) tension += 0.1;

  return Math.min(1, tension);
}

function getSituationY() {
  const tension = getTension();
  const targetY = 0.75 - tension * 0.6;
  const noise = (Math.random() - 0.5) * 0.08;
  return Math.max(0.05, Math.min(0.95, targetY + noise));
}

function drawSituation() {
  if (!situationCtx) return;
  const c = document.getElementById('situation-canvas');
  const w = c.getBoundingClientRect().width;
  const h = c.getBoundingClientRect().height;

  situationCtx.clearRect(0, 0, w, h);

  situationPoints.push({ y: getSituationY() });
  if (situationPoints.length > SITUATION_POINTS) situationPoints.shift();

  if (situationPoints.length < 2) return;

  const tension = getTension();
  let color;
  if (tension < 0.15) color = '#4ade80';
  else if (tension < 0.45) color = '#facc15';
  else if (tension < 0.75) color = '#ff9500';
  else color = '#ff3b5c';

  situationCtx.strokeStyle = color;
  situationCtx.lineWidth = 1.8;
  situationCtx.lineJoin = 'round';
  situationCtx.shadowColor = color;
  situationCtx.shadowBlur = 6;

  situationCtx.beginPath();
  situationPoints.forEach((p, i) => {
    const x = (i / (SITUATION_POINTS - 1)) * w;
    const y = p.y * h;
    if (i === 0) situationCtx.moveTo(x, y);
    else situationCtx.lineTo(x, y);
  });
  situationCtx.stroke();
  situationCtx.shadowBlur = 0;

  const last = situationPoints[situationPoints.length - 1];
  if (last) {
    const lx = ((situationPoints.length - 1) / (SITUATION_POINTS - 1)) * w;
    const ly = last.y * h;
    situationCtx.fillStyle = color;
    situationCtx.beginPath();
    situationCtx.arc(lx, ly, 2.5, 0, Math.PI * 2);
    situationCtx.fill();
  }

  situationCtx.strokeStyle = 'rgba(100, 150, 200, 0.08)';
  situationCtx.lineWidth = 1;
  for (let i = 1; i < 4; i++) {
    const gy = (i / 4) * h;
    situationCtx.beginPath();
    situationCtx.moveTo(0, gy);
    situationCtx.lineTo(w, gy);
    situationCtx.stroke();
  }
}

// ============ ИГРОВОЙ ЦИКЛ ============
let lastTime = performance.now();
function loop(now) {
  let dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;
  if (!state.paused && !state.gameOver) update(dt * state.timeScale);
  updateHUD();
  renderMap();

  const actionsModal = document.getElementById('actions-modal');
  if (!actionsModal.classList.contains('hidden')) updateCurrentTab();

  if (performance.now() - lastSituationDraw > 50) {
    drawSituation();
    lastSituationDraw = performance.now();
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
  const weatherMult = WEATHER[state.weather].incomeMult;
  const dayMult = getDayEffects().incomeMult;

  let cityIncome = 0;
  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    const mine = (c.buildings?.mine || 0) * 4;
    const factory = (c.buildings?.factory || 0) * 2.5;
    cityIncome += c.baseIncome * (c.infrastructure / 100) + mine + factory;
  });
  return cityIncome * taxMult * workersMult * welfareMult * scienceMult * corruptionMult * economyMult * logisticsMult * weatherMult * dayMult;
}

function update(dt) {
  state.money += calcIncome() * dt;
  state.globalTime += dt;

  state.weatherTimer -= dt;
  if (state.weatherTimer <= 0) {
    state.weather = WEATHER_KEYS[Math.floor(Math.random() * WEATHER_KEYS.length)];
    state.weatherDuration = 60 + Math.random() * 60;
    state.weatherTimer = state.weatherDuration;
  }

  state.dayTime += dt / DAY_CYCLE_DURATION;
  if (state.dayTime >= 1) state.dayTime -= 1;

  const prod = calcResourceProduction();
  state.resources.ammo = Math.min(RESOURCE_MAX.ammo, Math.max(0, state.resources.ammo + (prod.ammo - 0.56) * dt));
  state.resources.weapons = Math.min(RESOURCE_MAX.weapons, state.resources.weapons + prod.weapons * dt);
  state.resources.tanks = Math.min(RESOURCE_MAX.tanks, state.resources.tanks + prod.tanks * dt);
  state.resources.fuel = Math.min(RESOURCE_MAX.fuel, Math.max(0, state.resources.fuel + (prod.fuel - 0.40) * dt));

  // Дроны — от calcResourceProduction (базовое + заводы × технология)
  state.resources.drones = Math.min(RESOURCE_MAX.drones, state.resources.drones + prod.drones * dt);

  const birthRate = 8.0 + state.tech.birth * 1.2;
  const health = state.services.health;
  const deathRate = 13.0 * (1 - health / 100 * 0.45);
  const popDelta = state.population * (birthRate - deathRate) / 1000 / 86400;
  state.population = Math.max(1e6, state.population + popDelta * dt);

  let wd = -0.05;
  if (state.taxRate > 0.30) wd -= (state.taxRate - 0.30) * 2;
  if (state.taxRate < 0.20) wd += (0.20 - state.taxRate) * 1.5;
  wd += state.tech.life * 0.07;
  wd += WEATHER[state.weather].welfareDelta;
  wd += getDayEffects().welfareDelta;
  state.welfare = Math.max(0, Math.min(100, state.welfare + wd * dt));
  state.welfareTrend = wd;

  let cd = 0.05;
  cd -= (state.services.science / 100) * 0.02;
  cd -= (state.services.order / 100) * 0.03;
  state.services.corruption = Math.max(0, Math.min(100, state.services.corruption + cd * dt));

  if (state.mobilizeCooldown > 0) state.mobilizeCooldown = Math.max(0, state.mobilizeCooldown - dt);

  updateAttacks(dt);

  const incomingEnemyAttack = ACTIVE_ATTACKS.find(atk =>
    atk.from.owner === state.enemyFaction && atk.to.owner === state.faction && atk.type !== 'transfer'
  );
  if (incomingEnemyAttack && !state.warnedAboutAttack) {
    state.warnedAboutAttack = true;
    setEventMessage(`🚨 Враг атакует ${incomingEnemyAttack.to.name}!`, 'danger');
  }
  if (!incomingEnemyAttack) state.warnedAboutAttack = false;

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

  const r = state.resources;
  const rm = RESOURCE_MAX;
  document.getElementById('hud-ammo').textContent = Math.floor(r.ammo);
  document.getElementById('res-ammo-bar').style.width = (r.ammo / rm.ammo * 100) + '%';
  document.getElementById('hud-weapons').textContent = Math.floor(r.weapons);
  document.getElementById('res-weapons-bar').style.width = (r.weapons / rm.weapons * 100) + '%';
  document.getElementById('hud-tanks').textContent = Math.floor(r.tanks);
  document.getElementById('res-tanks-bar').style.width = (r.tanks / rm.tanks * 100) + '%';
  document.getElementById('hud-fuel').textContent = Math.floor(r.fuel);
  document.getElementById('res-fuel-bar').style.width = (r.fuel / rm.fuel * 100) + '%';
  document.getElementById('hud-drones').textContent = Math.floor(r.drones);
  document.getElementById('res-drones-bar').style.width = (r.drones / rm.drones * 100) + '%';

  const dayOfGame = Math.floor(state.globalTime / DAY_CYCLE_DURATION) + 1;
  state.gameDay = dayOfGame;
  const phaseT = state.dayTime % 1;
  const hours = Math.floor(phaseT * 24);
  const minutes = Math.floor((phaseT * 24 - hours) * 60);
  document.getElementById('game-date').textContent =
    `День ${dayOfGame}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;

  const phase = getCurrentPhase();
  const lang = state.settings.language;
  document.getElementById('time-icon').src = 'icons/' + phase.icon;
  document.getElementById('time-name').textContent = lang === 'ru' ? phase.ru : phase.en;

  const weather = WEATHER[state.weather];
  document.getElementById('weather-icon').src = 'icons/' + weather.icon;
  document.getElementById('weather-name').textContent = lang === 'ru' ? weather.ru : weather.en;
  document.getElementById('weather-effect').textContent = 'скорость ×' + weather.speedMult.toFixed(1);

  const sitLabel = document.getElementById('situation-label');
  const sitStatus = document.getElementById('situation-status');
  const now = performance.now();
  let displayText = '';
  let displayColor = 'idle';

  if (state.statusOverride && now < state.statusOverrideUntil) {
    displayText = state.statusOverride.text;
    const t = state.statusOverride.type;
    displayColor = t === 'danger' ? 'critical'
                 : t === 'warning' ? 'yellow'
                 : t === 'success' ? 'green'
                 : 'idle';
  } else {
    if (state.statusOverride) state.statusOverride = null;
    displayText = '';
    displayColor = 'idle';
  }

  sitStatus.textContent = displayText || '—';
  sitLabel.className = 'situation-label status-' + displayColor;
}

// ============ РЕНДЕР ============
function renderMap() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width, h = rect.height;

  ctx.fillStyle = '#0a0e1a';
  ctx.fillRect(0, 0, w, h);

  const srcX = camera.x, srcY = camera.y;
  const srcW = w / camera.zoom, srcH = h / camera.zoom;

  if (worldTextureCanvas) ctx.drawImage(worldTextureCanvas, srcX, srcY, srcW, srcH, 0, 0, w, h);
  if (worldOverlayCanvas) ctx.drawImage(worldOverlayCanvas, srcX, srcY, srcW, srcH, 0, 0, w, h);

  renderGrid(w, h);
  renderRoads();
  renderAttacks();
  renderCities();
  renderCaptureEffects();
  renderWeather();

  const darkness = getDarknessAlpha();
  if (darkness > 0.01) {
    ctx.fillStyle = `rgba(5, 10, 25, ${darkness})`;
    ctx.fillRect(0, 0, w, h);
  }

  renderVignette(w, h);
}

function renderCaptureEffects() {
  const tileSize = MAP.TILE * camera.zoom;
  const now = performance.now();

  for (let i = state.captureEffects.length - 1; i >= 0; i--) {
    const fx = state.captureEffects[i];
    const elapsed = now - fx.start;
    const progress = elapsed / fx.duration;

    if (progress >= 1) {
      state.captureEffects.splice(i, 1);
      continue;
    }

    const sx = (fx.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const sy = (fx.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;

    const maxRadius = 60 * camera.zoom;
    const radius = maxRadius * progress;
    const alpha = (1 - progress) * 0.8;

    ctx.strokeStyle = fx.color;
    ctx.lineWidth = 3 * camera.zoom * (1 - progress * 0.5);
    ctx.globalAlpha = alpha;
    ctx.shadowColor = fx.color;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(sx, sy, radius, 0, Math.PI * 2);
    ctx.stroke();

    if (progress > 0.2) {
      const p2 = (progress - 0.2) / 0.8;
      const r2 = maxRadius * 0.7 * p2;
      const a2 = (1 - p2) * 0.5;
      ctx.globalAlpha = a2;
      ctx.lineWidth = 2 * camera.zoom;
      ctx.beginPath();
      ctx.arc(sx, sy, r2, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (progress < 0.3) {
      const flashAlpha = (1 - progress / 0.3) * 0.6;
      ctx.globalAlpha = flashAlpha;
      ctx.fillStyle = fx.color;
      ctx.beginPath();
      ctx.arc(sx, sy, 30 * camera.zoom * (1 - progress / 0.3), 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function renderGrid(w, h) {
  if (camera.zoom < 0.5) return;
  const step = MAP.TILE * 2;
  const alpha = camera.zoom > 1.2 ? 0.20 : camera.zoom > 0.8 ? 0.14 : 0.09;

  ctx.strokeStyle = `rgba(140, 200, 240, ${alpha})`;
  ctx.lineWidth = 1;
  ctx.setLineDash([3, 4]);

  const startX = Math.floor(camera.x / step) * step;
  const endX = camera.x + w / camera.zoom;
  for (let wx = startX; wx <= endX; wx += step) {
    const sx = (wx - camera.x) * camera.zoom;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, h);
    ctx.stroke();
  }

  const startY = Math.floor(camera.y / step) * step;
  const endY = camera.y + h / camera.zoom;
  for (let wy = startY; wy <= endY; wy += step) {
    const sy = (wy - camera.y) * camera.zoom;
    ctx.beginPath();
    ctx.moveTo(0, sy);
    ctx.lineTo(w, sy);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  const bigStep = MAP.TILE * 8;
  ctx.strokeStyle = `rgba(140, 200, 240, ${alpha * 1.8})`;
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 6]);

  const startBX = Math.floor(camera.x / bigStep) * bigStep;
  for (let wx = startBX; wx <= endX; wx += bigStep) {
    const sx = (wx - camera.x) * camera.zoom;
    ctx.beginPath();
    ctx.moveTo(sx, 0);
    ctx.lineTo(sx, h);
    ctx.stroke();
  }
  const startBY = Math.floor(camera.y / bigStep) * bigStep;
  for (let wy = startBY; wy <= endY; wy += bigStep) {
    const sy = (wy - camera.y) * camera.zoom;
    ctx.beginPath();
    ctx.moveTo(0, sy);
    ctx.lineTo(w, sy);
    ctx.stroke();
  }
  ctx.setLineDash([]);

  if (camera.zoom > 0.9) {
    ctx.font = `bold ${Math.max(9, 10 * camera.zoom)}px -apple-system, sans-serif`;
    ctx.fillStyle = `rgba(140, 200, 240, ${alpha * 3})`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    for (let wx = startBX; wx <= endX; wx += bigStep) {
      const sx = (wx - camera.x) * camera.zoom;
      ctx.fillText('X' + Math.floor(wx / MAP.TILE), sx + 3, 3);
    }
    for (let wy = startBY; wy <= endY; wy += bigStep) {
      const sy = (wy - camera.y) * camera.zoom;
      ctx.fillText('Y' + Math.floor(wy / MAP.TILE), 3, sy + 3);
    }
  }
}

function renderWeather() {
  const rect = canvas.getBoundingClientRect();
  const w = rect.width, h = rect.height;
  const weather = state.weather;
  const time = performance.now() * 0.001;

  if (weather === 'rain' || weather === 'storm') {
    ctx.strokeStyle = 'rgba(140, 180, 220, 0.35)';
    ctx.lineWidth = 1;
    const count = weather === 'storm' ? 100 : 60;
    for (let i = 0; i < count; i++) {
      const seed = i * 137;
      const x = (seed * 31 + time * 200) % w;
      const y = (seed * 53 + time * 600) % h;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - 2, y + 12);
      ctx.stroke();
    }
  } else if (weather === 'snow' || weather === 'blizzard') {
    ctx.fillStyle = 'rgba(220, 230, 240, 0.7)';
    const count = weather === 'blizzard' ? 120 : 70;
    for (let i = 0; i < count; i++) {
      const seed = i * 199;
      const x = (seed * 31 + Math.sin(time + i) * 30) % w;
      const y = (seed * 53 + time * 80) % h;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (weather === 'fog') {
    ctx.fillStyle = 'rgba(180, 190, 200, 0.15)';
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 5; i++) {
      const x = ((i * 317 + performance.now() * 0.02) % (w + 200)) - 100;
      const y = (i * 173) % h;
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 150);
      grad.addColorStop(0, 'rgba(200, 210, 220, 0.15)');
      grad.addColorStop(1, 'rgba(200, 210, 220, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(x - 150, y - 150, 300, 300);
    }
  }
}

function renderVignette(w, h) {
  const grad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.4, w / 2, h / 2, Math.max(w, h) * 0.8);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function renderCityShadow(sx, sy, radius) {
  const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, radius * 2.5);
  grad.addColorStop(0, 'rgba(0, 0, 0, 0.5)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(sx, sy, radius * 2.5, 0, Math.PI * 2);
  ctx.fill();
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

    const color = road.type === 'own'    ? 'rgba(0, 212, 255, 0.85)'
                : road.type === 'enemy'  ? 'rgba(255, 59, 92, 0.85)'
                : 'rgba(180, 190, 210, 0.75)';

    const innerColor = road.type === 'own'    ? '#0a3a4a'
                     : road.type === 'enemy'  ? '#4a0a1a'
                     : '#2a3040';

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.lineWidth = Math.max(3, 4 * camera.zoom);
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.5, 2 * camera.zoom);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.strokeStyle = innerColor;
    ctx.lineWidth = Math.max(0.5, 0.8 * camera.zoom);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
}

function renderAttacks() {
  const tileSize = MAP.TILE * camera.zoom;
  const now = performance.now();

  ACTIVE_ATTACKS.forEach(atk => {
    const a = atk.from, b = atk.to;
    const x1 = (a.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y1 = (a.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;
    const x2 = (b.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y2 = (b.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;
    const cx = x1 + (x2 - x1) * atk.progress;
    const cy = y1 + (y2 - y1) * atk.progress;

    const attacker = atk.from.owner;
    const isEnemyAttackOnUs = attacker === state.enemyFaction && b.owner === state.faction;
    const isOurAttack = attacker === state.faction;
    const isTransfer = atk.type === 'transfer';

    let color;
    if (isTransfer) color = '#06b6d4';
    else if (isEnemyAttackOnUs) color = '#ff3b5c';
    else if (isOurAttack) color = '#00ff88';
    else color = '#ff9500';

    const pulseAlpha = (isEnemyAttackOnUs && !isTransfer)
      ? 0.4 + Math.sin(now / 150) * 0.3
      : 0.3;

    ctx.strokeStyle = color;
    ctx.globalAlpha = pulseAlpha;
    ctx.lineWidth = Math.max(2, 3 * camera.zoom);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.shadowColor = color;
    ctx.shadowBlur = isTransfer ? 8 : (isEnemyAttackOnUs ? 20 : 14);
    ctx.lineWidth = Math.max(2, 3 * camera.zoom);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(cx, cy);
    ctx.stroke();
    ctx.shadowBlur = 0;

    const iconSize = Math.max(20, 26 * camera.zoom);
    const pulseScale = 1 + Math.sin(now / 400) * 0.08;
    const finalSize = iconSize * pulseScale;

    ctx.fillStyle = 'rgba(10, 15, 25, 0.85)';
    ctx.strokeStyle = color;
    ctx.lineWidth = Math.max(1.5, 2 * camera.zoom);
    ctx.beginPath();
    ctx.arc(cx, cy, finalSize / 2 + 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (isTransfer) {
      ctx.font = `${finalSize * 0.7}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      ctx.fillText('🔄', cx, cy + 1);
    } else if (apcImage && apcImage.complete) {
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 10;
      ctx.drawImage(apcImage, cx - finalSize / 2 * 0.7, cy - finalSize / 2 * 0.7, finalSize * 0.7, finalSize * 0.7);
      ctx.restore();
    } else {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(cx, cy, 6 * camera.zoom, 0, Math.PI * 2);
      ctx.fill();
    }

    if (isEnemyAttackOnUs && !isTransfer) {
      const ringPulse = 1 + Math.sin(now / 150) * 0.4;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.arc(cx, cy, (finalSize / 2 + 6) * ringPulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
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

    const color = c.owner === 'aurora' ? '#00d4ff' : c.owner === 'vesper' ? '#ff3b5c' : '#8892a6';
    const radiusRatio = c.type === 'capital' ? 0.32 : c.type === 'large' ? 0.24 : c.type === 'medium' ? 0.18 : 0.13;
    const radius = Math.max(3, tileSize * radiusRatio);

    renderCityShadow(sx + tileSize / 2, sy + tileSize / 2, radius);

    const threat = getCityThreat(c);
    if (threat > 0) {
      const now = performance.now();
      const pulseFreq = threat === 2 ? 400 : 700;
      const maxRadius = radius + (threat === 2 ? 22 : 14);
      const waveCount = threat === 2 ? 2 : 1;

      for (let w = 0; w < waveCount; w++) {
        const wavePhase = ((now / pulseFreq) + w * 0.5) % 1;
        const waveRadius = radius + (maxRadius - radius) * wavePhase;
        const waveAlpha = (1 - wavePhase) * (threat === 2 ? 0.7 : 0.4);

        ctx.strokeStyle = `rgba(255, 59, 92, ${waveAlpha})`;
        ctx.lineWidth = threat === 2 ? 2.5 : 1.8;
        ctx.beginPath();
        ctx.arc(sx + tileSize / 2, sy + tileSize / 2, waveRadius, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (threat === 2) {
        const glowPulse = 0.6 + Math.sin(now / 200) * 0.3;
        ctx.shadowColor = '#ff3b5c';
        ctx.shadowBlur = 24 * glowPulse;
      }
    }

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

    const gTotal = getGarrisonTotal(c.garrison || {});
    if (gTotal > 0 && camera.zoom > 0.7) {
      ctx.font = `bold ${Math.max(9, 10 * camera.zoom)}px -apple-system, sans-serif`;
      const txt = '⚔' + gTotal;
      const w = ctx.measureText(txt).width;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(sx + tileSize / 2 - w/2 - 2, sy + tileSize / 2 - radius - 20, w + 4, 12);
      ctx.fillStyle = '#fff';
      ctx.fillText(txt, sx + tileSize / 2, sy + tileSize / 2 - radius - 14);
    }

    if (camera.zoom < 0.6 && c.type !== 'capital' && c.type !== 'large') return;

    const fontSize = Math.max(9, (c.type === 'capital' ? 13 : c.type === 'large' ? 12 : c.type === 'medium' ? 11 : 10) * Math.max(0.8, camera.zoom));
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

  loadApсImage();
  initCanvas();
  initCameraControls();
  centerOnPlayerBase();
  initSituationCanvas();
  window.addEventListener('resize', initSituationCanvas);
  situationPoints = [];

  lastTime = performance.now();
  requestAnimationFrame(loop);
}

// ============ КНОПКИ ============
document.querySelectorAll('.speed-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    state.timeScale = parseFloat(btn.dataset.speed);
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