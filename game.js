// ============ TELEGRAM ============
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// ============ КОНСТАНТЫ ============
const FACTIONS = {
  aurora: {
    name: 'Республика Аврора',
    color: '#00d4ff',
    start: { money: 500, satisfaction: 80, corruption: 20, population: 1000 },
    modifiers: { casualtySatPenalty: 3, victorySatBonus: 12 },
  },
  vesper: {
    name: 'Доминион Веспер',
    color: '#ff3b5c',
    start: { money: 500, satisfaction: 60, corruption: 45, population: 1500 },
    modifiers: { casualtySatPenalty: 1, victorySatBonus: 6 },
  },
};

const DIFFICULTY = {
  easy:   { aiIncomeMult: 0.8, playerMoneyMult: 1.0, playerSatPenalty: 0 },
  normal: { aiIncomeMult: 1.0, playerMoneyMult: 1.0, playerSatPenalty: 0 },
  hard:   { aiIncomeMult: 1.3, playerMoneyMult: 0.9, playerSatPenalty: 0 },
  insane: { aiIncomeMult: 1.6, playerMoneyMult: 0.8, playerSatPenalty: 10 },
};

const LANG = {
  ru: {
    gameTitle: 'ЛИТИЙНАЯ ДУГА', gameSubtitle: 'Стратегия в реальном времени за ресурс будущего',
    language: 'ЯЗЫК · LANGUAGE', faction: 'СТОРОНА', difficulty: 'СЛОЖНОСТЬ',
    startGame: 'НАЧАТЬ ИГРУ',
    auroraName: 'Республика Аврора', vesperName: 'Доминион Веспер',
    easy: 'Легко', normal: 'Норма', hard: 'Сложно', insane: 'Хардкор',
    diffEasy: 'Спокойное знакомство. ИИ медлит.', diffNormal: 'Сбалансированная игра.',
    diffHard: 'ИИ агрессивнее и богаче.', diffInsane: 'Максимальное давление.',
    aiIncome: 'Доход ИИ', aiUnits: 'Сила ИИ', playerMoney: 'Ваши деньги', playerSat: 'Старт. довольность',
    chooseTarget: 'Выберите цель', chooseSource: 'Откуда атаковать?', backToMenu: 'В меню',
    ownerAurora: 'Аврора', ownerVesper: 'Веспер', ownerNeutral: 'Нейтрал',
    typeCapital: 'Столица', typeLarge: 'Крупный', typeMedium: 'Средний', typeSmall: 'Малый',
    cityOwner: 'Владелец:', cityType: 'Тип:', cityGarrison: 'Гарнизон:',
    cityInfra: 'Инфраструктура:', cityIncome: 'Доход:',
  },
  en: {
    gameTitle: 'LITHIUM ARC', gameSubtitle: 'Real-time strategy for the resource of the future',
    language: 'LANGUAGE · ЯЗЫК', faction: 'FACTION', difficulty: 'DIFFICULTY',
    startGame: 'START GAME',
    auroraName: 'Aurora Republic', vesperName: 'Vesper Dominion',
    easy: 'Easy', normal: 'Normal', hard: 'Hard', insane: 'Insane',
    diffEasy: 'A calm introduction.', diffNormal: 'Balanced game.',
    diffHard: 'AI is more aggressive and richer.', diffInsane: 'Maximum pressure.',
    aiIncome: 'AI income', aiUnits: 'AI power', playerMoney: 'Your money', playerSat: 'Start satisfaction',
    chooseTarget: 'Choose target', chooseSource: 'Attack from where?', backToMenu: 'Back to menu',
    ownerAurora: 'Aurora', ownerVesper: 'Vesper', ownerNeutral: 'Neutral',
    typeCapital: 'Capital', typeLarge: 'Large', typeMedium: 'Medium', typeSmall: 'Small',
    cityOwner: 'Owner:', cityType: 'Type:', cityGarrison: 'Garrison:',
    cityInfra: 'Infrastructure:', cityIncome: 'Income:',
  },
};

// ============ STATE ============
const state = {
  settings: { language: 'ru', faction: null, difficulty: 'normal' },
  faction: null, enemyFaction: null, difficulty: null,
  money: 0, satisfaction: 0, corruption: 0, population: 0,
  timeScale: 1, paused: false, gameOver: false,
  coupTimer: null, gameOverShown: false,
};

const BALANCE = {
  baseTaxIncome: 0.5,
  basePopulationGrowth: 0.5,
  coupWarningThreshold: 5,
  coupTimerSeconds: 60,
};

// ============ КАРТА ============
const MAP = { W: 40, H: 30, TILE: 40 };

const TILE = { GROUND: 0, GRASS: 1, MOUNTAIN: 2, WATER: 3 };

const TILE_COLORS = {
  [TILE.GROUND]:   '#1a2230',
  [TILE.GRASS]:    '#16281f',
  [TILE.MOUNTAIN]: '#3a3530',
  [TILE.WATER]:    '#0a2233',
};

const CITY_COLORS = {
  aurora:  '#00d4ff',
  vesper:  '#ff3b5c',
  neutral: '#8892a6',
};

let map = [];
let CITIES = [];
let ROADS = [];
let ACTIVE_ATTACKS = [];

let seed = 12345;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

const tileNoise = new Map();
function getTileNoise(x, y) {
  const key = x + ',' + y;
  if (!tileNoise.has(key)) {
    const n = ((x * 73856093) ^ (y * 19349663)) % 1000 / 1000;
    tileNoise.set(key, Math.abs(n));
  }
  return tileNoise.get(key);
}

// ============ CANVAS ============
let canvas, ctx, dpr = window.devicePixelRatio || 1;

const camera = {
  x: 0, y: 0,
  zoom: 1,
  minZoom: 0.5,
  maxZoom: 2.5,
  dragging: false,
  dragStartX: 0, dragStartY: 0,
  cameraStartX: 0, cameraStartY: 0,
  moved: false,
  pinching: false,
  pinchStartDist: 0,
  pinchStartZoom: 1,
  pinchCenterX: 0,
  pinchCenterY: 0,
};

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
    const val = Math.round((mult - 1) * 100);
    return (val > 0 ? '+' : '') + val + '%';
  };

  const cap = diff.charAt(0).toUpperCase() + diff.slice(1);

  el.innerHTML = `
    <div class="desc-title">${dict['diff' + cap]}</div>
    <div class="row-desc"><span>${dict.aiIncome}</span><span>${pct(d.aiIncomeMult)}</span></div>
    <div class="row-desc"><span>${dict.playerMoney}</span><span>${pct(d.playerMoneyMult)}</span></div>
    <div class="row-desc"><span>${dict.playerSat}</span><span>${d.playerSatPenalty > 0 ? '−' + d.playerSatPenalty + '%' : '—'}</span></div>
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

// ============ ГЕНЕРАЦИЯ КАРТЫ ============
function generateMap() {
  map = [];
  for (let y = 0; y < MAP.H; y++) {
    const row = [];
    for (let x = 0; x < MAP.W; x++) {
      row.push(TILE.GROUND);
    }
    map.push(row);
  }

  for (let y = 0; y < MAP.H; y++) {
    for (let x = 0; x < MAP.W; x++) {
      if (x === 0 || y === 0 || x === MAP.W - 1 || y === MAP.H - 1) {
        map[y][x] = TILE.MOUNTAIN;
      }
    }
  }

  for (let i = 0; i < 8; i++) {
    const cx = 4 + Math.floor(rand() * (MAP.W - 8));
    const cy = 4 + Math.floor(rand() * (MAP.H - 8));
    const size = 2 + Math.floor(rand() * 3);

    for (let dy = -size; dy <= size; dy++) {
      for (let dx = -size; dx <= size; dx++) {
        const dist = Math.hypot(dx, dy);
        if (dist > size) continue;
        if (rand() < 1 - dist / size) {
          const nx = cx + dx, ny = cy + dy;
          if (map[ny] && map[ny][nx] !== undefined) {
            map[ny][nx] = TILE.MOUNTAIN;
          }
        }
      }
    }
  }

  let rx = 19;
  for (let y = 1; y < MAP.H - 1; y++) {
    rx += Math.floor(rand() * 3) - 1;
    rx = Math.max(17, Math.min(22, rx));
    if (map[y]) map[y][rx] = TILE.WATER;
    if (rand() < 0.3 && map[y] && map[y][rx + 1] !== undefined) map[y][rx + 1] = TILE.WATER;
  }

  for (let i = 0; i < 15; i++) {
    const cx = Math.floor(rand() * MAP.W);
    const cy = Math.floor(rand() * MAP.H);
    const size = 2 + Math.floor(rand() * 3);
    for (let dy = -size; dy <= size; dy++) {
      for (let dx = -size; dx <= size; dx++) {
        if (rand() < 0.5 && map[cy + dy] && map[cy + dy][cx + dx] === TILE.GROUND) {
          map[cy + dy][cx + dx] = TILE.GRASS;
        }
      }
    }
  }
}

function isPassable(x, y) {
  if (x < 0 || y < 0 || x >= MAP.W || y >= MAP.H) return false;
  const t = map[y][x];
  return t !== TILE.MOUNTAIN && t !== TILE.WATER;
}

// ============ ГЕНЕРАЦИЯ ГОРОДОВ ============
function generateCities() {
  CITIES = [];

  CITIES.push({
    x: 3, y: 3, type: 'capital', owner: 'aurora',
    name: 'Аврора', baseIncome: 1.5, basePop: 5, infrastructure: 100, garrison: 5,
  });
  CITIES.push({
    x: MAP.W - 4, y: MAP.H - 4, type: 'capital', owner: 'vesper',
    name: 'Веспер', baseIncome: 1.5, basePop: 5, infrastructure: 100, garrison: 5,
  });

  const auroraZone = { xMin: 2, xMax: 16, yMin: 2, yMax: MAP.H - 3 };
  const vesperZone = { xMin: 23, xMax: MAP.W - 3, yMin: 2, yMax: MAP.H - 3 };

  const composition = [
    { type: 'large',  count: 5,  baseIncome: 0.8, basePop: 2,   garrison: 3 },
    { type: 'medium', count: 10, baseIncome: 0.4, basePop: 1,   garrison: 2 },
    { type: 'small',  count: 15, baseIncome: 0.15, basePop: 0.3, garrison: 1 },
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

  const placeCities = (owner, zone, namePrefixes) => {
    composition.forEach(({ type, count, baseIncome, basePop, garrison }) => {
      let placed = 0, attempts = 0;
      while (placed < count && attempts < 1000) {
        attempts++;
        const x = zone.xMin + Math.floor(rand() * (zone.xMax - zone.xMin));
        const y = zone.yMin + Math.floor(rand() * (zone.yMax - zone.yMin));

        if (!isPassable(x, y)) continue;
        if (CITIES.some(c => Math.abs(c.x - x) < 3 && Math.abs(c.y - y) < 3)) continue;

        CITIES.push({
          x, y, type, owner,
          name: genName(namePrefixes),
          baseIncome, basePop, garrison,
          infrastructure: 60 + Math.floor(rand() * 30),
        });
        placed++;
      }
    });
  };

  placeCities('aurora', auroraZone, prefixAurora);
  placeCities('vesper', vesperZone, prefixVesper);
}

// ============ ГЕНЕРАЦИЯ ДОРОГ ============
function hasRoad(a, b) {
  return ROADS.some(r =>
    (r.from === a && r.to === b) || (r.from === b && r.to === a)
  );
}

function getRoadsFrom(city) {
  return ROADS
    .filter(r => r.from === city || r.to === city)
    .map(r => r.from === city ? r.to : r.from);
}

function generateRoads() {
  ROADS = [];
  const seen = new Set();

  // === 1. Внутренние дороги каждой фракции ===
  CITIES.forEach(city => {
    const neighbors = CITIES
      .filter(c => c !== city)
      .map(c => ({ city: c, dist: Math.hypot(c.x - city.x, c.y - city.y) }))
      .sort((a, b) => a.dist - b.dist);

    let maxLinks;
    switch (city.type) {
      case 'capital': maxLinks = 5; break;
      case 'large':   maxLinks = 4; break;
      case 'medium':  maxLinks = 3; break;
      default:        maxLinks = 2;
    }

    let links = 0;
    for (const { city: neighbor, dist } of neighbors) {
      if (links >= maxLinks) break;
      if (dist > 10) break;

      const key = [CITIES.indexOf(city), CITIES.indexOf(neighbor)].sort().join('-');
      if (seen.has(key)) { links++; continue; }

      if (city.owner !== neighbor.owner) continue;

      seen.add(key);
      ROADS.push({
        from: city,
        to: neighbor,
        type: city.owner === 'aurora' ? 'own' : 'enemy',
      });
      links++;
    }
  });

  // === 2. Межфракционные дороги (граница) ===
  const auroraCities = CITIES.filter(c => c.owner === 'aurora');
  const vesperCities = CITIES.filter(c => c.owner === 'vesper');

  auroraCities.forEach(aCity => {
    const enemyNeighbors = vesperCities
      .map(v => ({ city: v, dist: Math.hypot(v.x - aCity.x, v.y - aCity.y) }))
      .sort((a, b) => a.dist - b.dist);

    let borderLinks = 0;
    const maxBorderLinks = aCity.type === 'capital' ? 2 : 1;

    for (const { city: vCity, dist } of enemyNeighbors) {
      if (borderLinks >= maxBorderLinks) break;
      if (dist > 12) break;

      const key = [CITIES.indexOf(aCity), CITIES.indexOf(vCity)].sort().join('-');
      if (seen.has(key)) continue;
      seen.add(key);

      ROADS.push({
        from: aCity,
        to: vCity,
        type: 'border',
      });
      borderLinks++;
    }
  });
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

function screenTileSize() {
  return MAP.TILE * camera.zoom;
}

function centerOnPlayerBase() {
  const rect = canvas.getBoundingClientRect();
  const cap = CITIES.find(c => c.type === 'capital' && c.owner === state.faction);
  if (!cap) return;

  const worldCx = cap.x * MAP.TILE + MAP.TILE / 2;
  const worldCy = cap.y * MAP.TILE + MAP.TILE / 2;
  const viewW = rect.width / camera.zoom;
  const viewH = rect.height / camera.zoom;

  camera.x = worldCx - viewW / 2;
  camera.y = worldCy - viewH / 2;
  clampCamera();
}

function clampCamera() {
  const rect = canvas.getBoundingClientRect();
  const worldW = MAP.W * MAP.TILE;
  const worldH = MAP.H * MAP.TILE;
  const viewW = rect.width / camera.zoom;
  const viewH = rect.height / camera.zoom;

  if (worldW <= viewW) {
    camera.x = (worldW - viewW) / 2;
  } else {
    camera.x = Math.max(0, Math.min(worldW - viewW, camera.x));
  }

  if (worldH <= viewH) {
    camera.y = (worldH - viewH) / 2;
  } else {
    camera.y = Math.max(0, Math.min(worldH - viewH, camera.y));
  }
}

// ============ УПРАВЛЕНИЕ КАМЕРОЙ ============
function initCameraControls() {
  // Мышь
  canvas.addEventListener('mousedown', e => {
    camera.dragging = true;
    camera.moved = false;
    camera.dragStartX = e.clientX;
    camera.dragStartY = e.clientY;
    camera.cameraStartX = camera.x;
    camera.cameraStartY = camera.y;
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
    if (camera.dragging && !camera.moved) {
      handleCanvasClick(e.clientX, e.clientY);
    }
    camera.dragging = false;
  });

  canvas.addEventListener('wheel', e => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
    zoomAt(e.clientX, e.clientY, factor);
  }, { passive: false });

  // Тач
  canvas.addEventListener('touchstart', e => {
    e.preventDefault();

    if (e.touches.length === 1) {
      const t = e.touches[0];
      camera.dragging = true;
      camera.moved = false;
      camera.dragStartX = t.clientX;
      camera.dragStartY = t.clientY;
      camera.cameraStartX = camera.x;
      camera.cameraStartY = camera.y;
    } else if (e.touches.length === 2) {
      camera.dragging = false;
      camera.pinching = true;

      const t1 = e.touches[0];
      const t2 = e.touches[1];
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
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);

      const factor = dist / camera.pinchStartDist;
      const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.pinchStartZoom * factor));
      applyZoomAt(camera.pinchCenterX, camera.pinchCenterY, newZoom);
    }
  }, { passive: false });

  canvas.addEventListener('touchend', e => {
    e.preventDefault();

    if (camera.pinching && e.touches.length < 2) {
      camera.pinching = false;
    }

    if (camera.dragging && !camera.moved && e.changedTouches[0] && e.touches.length === 0) {
      const t = e.changedTouches[0];
      handleCanvasClick(t.clientX, t.clientY);
    }

    if (e.touches.length === 0) {
      camera.dragging = false;
    }
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
  const cx = rect.width / 2;
  const cy = rect.height / 2;
  const newZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.zoom * factor));
  applyZoomAt(cx, cy, newZoom);
}

// ============ КЛИК ПО КАРТЕ ============
function handleCanvasClick(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top;

  const worldX = localX / camera.zoom + camera.x;
  const worldY = localY / camera.zoom + camera.y;

  const tileX = Math.floor(worldX / MAP.TILE);
  const tileY = Math.floor(worldY / MAP.TILE);

  const city = CITIES.find(c => c.x === tileX && c.y === tileY);
  if (city) {
    openCityPanel(city);
  } else {
    closeCityPanel();
    closeAttackTargetPanel();
    closeAttackSourcesPanel();
  }
}

// ============ ПАНЕЛЬ ГОРОДА ============
let selectedCity = null;

function openCityPanel(city) {
  selectedCity = city;
  const dict = LANG[state.settings.language];
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

  const isOwn = city.owner === state.faction;
  const income = isOwn
    ? city.baseIncome * (city.infrastructure / 100) * (state.satisfaction / 100)
    : 0;
  document.getElementById('city-income').textContent = isOwn
    ? '+' + income.toFixed(2) + '/с'
    : '—';

  const attackBtn = document.getElementById('city-attack-btn');

  if (isOwn) {
    attackBtn.textContent = '⚔️ ' + (state.settings.language === 'ru' ? 'Наступление' : 'Attack');
    attackBtn.disabled = city.garrison < 1;
    attackBtn.onclick = () => openAttackTargetPanel();
  } else {
    const sources = getRoadsFrom(city).filter(c =>
      c.owner === state.faction && c.garrison > 0
    );

    if (sources.length > 0) {
      attackBtn.textContent = '⚔️ ' + (state.settings.language === 'ru' ? 'Наступление' : 'Attack');
      attackBtn.disabled = false;
      attackBtn.onclick = () => openAttackSourcesPanel(city, sources);
    } else {
      attackBtn.textContent = '🚫 ' + (state.settings.language === 'ru'
        ? 'Нет доступных атак'
        : 'No available attacks');
      attackBtn.disabled = true;
      attackBtn.onclick = null;
    }
  }
}

function closeCityPanel() {
  document.getElementById('city-panel').classList.add('hidden');
  selectedCity = null;
}

document.getElementById('city-panel-close').addEventListener('click', closeCityPanel);

// ============ ПАНЕЛЬ ЦЕЛЕЙ (свой город) ============
function openAttackTargetPanel() {
  if (!selectedCity) return;
  const dict = LANG[state.settings.language];
  const panel = document.getElementById('attack-target-panel');
  const list = document.getElementById('attack-targets');
  panel.classList.remove('hidden');
  list.innerHTML = '';

  const targets = getRoadsFrom(selectedCity)
    .filter(c => c.owner !== state.faction);

  if (targets.length === 0) {
    list.innerHTML = `<div style="color:#64748b;font-size:12px;padding:10px">${state.settings.language === 'ru' ? 'Нет доступных целей' : 'No targets available'}</div>`;
    return;
  }

  targets.forEach(target => {
    const row = document.createElement('div');
    row.className = 'target-row';
    row.innerHTML = `
      <div>
        <div class="target-name">${target.name}</div>
        <div class="target-info">${target.owner === 'aurora' ? dict.ownerAurora : target.owner === 'vesper' ? dict.ownerVesper : dict.ownerNeutral}</div>
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

// ============ ПАНЕЛЬ ИСТОЧНИКОВ (вражеский город) ============
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

// ============ НАСТУПЛЕНИЕ ============
function launchAttack(fromCity, toCity) {
  if (fromCity.garrison < 1) return;
  const units = fromCity.garrison;
  fromCity.garrison = 0;

  ACTIVE_ATTACKS.push({
    from: fromCity,
    to: toCity,
    units,
    progress: 0,
    speed: 0.3,
  });
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
  const attackPower = units;
  const defensePower = toCity.garrison;

  if (attackPower > defensePower) {
    const losses = Math.ceil(defensePower * 0.7);
    toCity.owner = state.faction;
    toCity.garrison = Math.max(0, units - losses);
    state.satisfaction -= 5;
  } else {
    toCity.garrison = Math.max(0, toCity.garrison - Math.ceil(attackPower * 0.5));
    state.satisfaction -= 8;
  }

  state.satisfaction = Math.max(0, Math.min(100, state.satisfaction));
  checkVictory();
}

// ============ ИГРОВОЙ ЦИКЛ ============
let lastTime = performance.now();

function loop(now) {
  let dt = Math.min((now - lastTime) / 1000, 0.1);
  lastTime = now;

  if (!state.paused && !state.gameOver) {
    update(dt * state.timeScale);
  }
  updateHUD();
  renderMap();

  if (state.gameOver && !state.gameOverShown) {
    state.gameOverShown = true;
    document.getElementById('gameover-title').textContent =
      state.gameOverReason === 'victory'
        ? (state.settings.language === 'ru' ? '🏆 Победа' : '🏆 Victory')
        : (state.settings.language === 'ru' ? '💀 Поражение' : '💀 Defeat');
    document.getElementById('gameover-text').textContent = state.gameOverText || '';
    document.getElementById('gameover-modal').classList.remove('hidden');
  }

  requestAnimationFrame(loop);
}

function calcIncome() {
  const taxIncome = BALANCE.baseTaxIncome * (state.satisfaction / 100) * (1 - state.corruption / 100);
  let cityIncome = 0;
  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    cityIncome += c.baseIncome * (c.infrastructure / 100) * (state.satisfaction / 100) * (1 - state.corruption / 100);
  });
  return taxIncome + cityIncome;
}

function update(dt) {
  state.money += calcIncome() * dt;

  let popDelta = 0;
  if (state.satisfaction > 60) popDelta += BALANCE.basePopulationGrowth * ((state.satisfaction - 60) / 40);
  else if (state.satisfaction < 30) popDelta -= BALANCE.basePopulationGrowth * ((30 - state.satisfaction) / 30);

  CITIES.forEach(c => {
    if (c.owner !== state.faction) return;
    popDelta += c.basePop * 0.1 * (state.satisfaction / 100);
  });
  state.population = Math.max(0, state.population + popDelta * dt);

  let satDelta = 0;
  if (state.corruption > 50) satDelta -= 0.4 * ((state.corruption - 50) / 50);
  if (satDelta < 0) satDelta *= (1 + state.corruption / 100);
  state.satisfaction = Math.max(0, Math.min(100, state.satisfaction + satDelta * dt));

  state.corruption = Math.max(0, Math.min(100, state.corruption + (0.05 - 0.02) * dt));

  updateAttacks(dt);

  if (state.satisfaction <= 0) {
    state.gameOver = true;
    state.gameOverReason = 'defeat';
    state.gameOverText = state.settings.language === 'ru' ? 'Переворот. Вы свергнуты.' : 'Coup. You are overthrown.';
    return;
  }
  if (state.satisfaction < BALANCE.coupWarningThreshold) {
    if (state.coupTimer === null) state.coupTimer = BALANCE.coupTimerSeconds;
    else if ((state.coupTimer -= dt) <= 0) {
      state.gameOver = true;
      state.gameOverReason = 'defeat';
      state.gameOverText = state.settings.language === 'ru' ? 'Переворот. Вы свергнуты.' : 'Coup. You are overthrown.';
    }
  } else state.coupTimer = null;

  checkVictory();
}

function checkVictory() {
  if (state.gameOver) return;
  const playerCapital = CITIES.find(c => c.type === 'capital' && c.owner === state.faction);
  const enemyCapital = CITIES.find(c => c.type === 'capital' && c.owner === state.enemyFaction);

  if (!enemyCapital) {
    state.gameOver = true;
    state.gameOverReason = 'victory';
    state.gameOverText = state.settings.language === 'ru'
      ? '🏆 ПОБЕДА! Столица врага захвачена.'
      : '🏆 VICTORY! Enemy capital captured.';
  } else if (!playerCapital) {
    state.gameOver = true;
    state.gameOverReason = 'defeat';
    state.gameOverText = state.settings.language === 'ru'
      ? '💀 ПОРАЖЕНИЕ. Ваша столица пала.'
      : '💀 DEFEAT. Your capital has fallen.';
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

  document.getElementById('population').textContent = fmt(state.population);

  const satEl = document.getElementById('satisfaction');
  satEl.textContent = Math.floor(state.satisfaction) + '%';
  satEl.classList.remove('sat-good', 'sat-mid', 'sat-bad');
  satEl.classList.add(state.satisfaction > 60 ? 'sat-good' : state.satisfaction > 30 ? 'sat-mid' : 'sat-bad');

  const corEl = document.getElementById('corruption');
  corEl.textContent = Math.floor(state.corruption) + '%';
  corEl.classList.remove('cor-good', 'cor-mid', 'cor-bad');
  corEl.classList.add(state.corruption < 30 ? 'cor-good' : state.corruption < 60 ? 'cor-mid' : 'cor-bad');
}

// ============ РЕНДЕР ============
function renderTile(x, y, sx, sy, size) {
  const t = map[y][x];
  const noise = getTileNoise(x, y);

  if (t === TILE.GROUND) {
    const base = 26 + noise * 8;
    ctx.fillStyle = `rgb(${base}, ${base + 8}, ${base + 18})`;
    ctx.fillRect(sx, sy, size, size);
    if (noise > 0.7 && size > 12) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.fillRect(sx + noise * size * 0.5, sy + (1 - noise) * size * 0.5, size * 0.05, size * 0.05);
    }
  } else if (t === TILE.GRASS) {
    const g = 30 + noise * 15;
    ctx.fillStyle = `rgb(${20 + noise * 10}, ${g}, ${20 + noise * 5})`;
    ctx.fillRect(sx, sy, size, size);
    if (size > 20) {
      ctx.strokeStyle = 'rgba(60, 120, 60, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx + size * 0.2, sy + size - 4);
      ctx.lineTo(sx + size * 0.2 + noise * 4 - 2, sy + size * 0.2);
      ctx.moveTo(sx + size * 0.8, sy + size - 4);
      ctx.lineTo(sx + size * 0.8 + (1 - noise) * 4 - 2, sy + size * 0.25);
      ctx.stroke();
    }
  } else if (t === TILE.MOUNTAIN) {
    const g = 50 + noise * 20;
    ctx.fillStyle = `rgb(${g}, ${g - 10}, ${g - 15})`;
    ctx.fillRect(sx, sy, size, size);

    if (size > 15) {
      ctx.fillStyle = `rgba(30, 25, 22, 0.6)`;
      ctx.beginPath();
      ctx.moveTo(sx + size * 0.5, sy + size * 0.15);
      ctx.lineTo(sx + size * 0.15, sy + size - size * 0.1);
      ctx.lineTo(sx + size * 0.85, sy + size - size * 0.1);
      ctx.closePath();
      ctx.fill();

      if (noise > 0.6 && size > 25) {
        ctx.fillStyle = 'rgba(220, 220, 220, 0.5)';
        ctx.beginPath();
        ctx.moveTo(sx + size * 0.5, sy + size * 0.15);
        ctx.lineTo(sx + size * 0.4, sy + size * 0.35);
        ctx.lineTo(sx + size * 0.6, sy + size * 0.35);
        ctx.closePath();
        ctx.fill();
      }
    }
  } else if (t === TILE.WATER) {
    const b = 60 + noise * 20;
    ctx.fillStyle = `rgb(10, ${b * 0.6}, ${b})`;
    ctx.fillRect(sx, sy, size, size);

    if (size > 15) {
      ctx.strokeStyle = 'rgba(100, 180, 220, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < 2; i++) {
        const wy = sy + size * 0.3 + i * size * 0.35;
        ctx.moveTo(sx + size * 0.15, wy);
        ctx.quadraticCurveTo(sx + size * 0.5, wy - 2, sx + size * 0.85, wy);
      }
      ctx.stroke();
    }
  }

  if (size > 12) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx + 0.5, sy + 0.5, size - 1, size - 1);
  }
}

function renderMap() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  ctx.fillStyle = '#060913';
  ctx.fillRect(0, 0, w, h);

  const tileSize = screenTileSize();

  const x0 = Math.max(0, Math.floor(camera.x / MAP.TILE));
  const y0 = Math.max(0, Math.floor(camera.y / MAP.TILE));
  const x1 = Math.min(MAP.W - 1, Math.ceil((camera.x + w / camera.zoom) / MAP.TILE));
  const y1 = Math.min(MAP.H - 1, Math.ceil((camera.y + h / camera.zoom) / MAP.TILE));

  for (let y = y0; y <= y1; y++) {
    for (let x = x0; x <= x1; x++) {
      const sx = (x * MAP.TILE - camera.x) * camera.zoom;
      const sy = (y * MAP.TILE - camera.y) * camera.zoom;
      renderTile(x, y, sx, sy, tileSize);
    }
  }

  renderRoads();
  renderAttacks();
  renderCities();
}

function renderRoads() {
  const rect = canvas.getBoundingClientRect();
  const tileSize = screenTileSize();

  ROADS.forEach(road => {
    const a = road.from, b = road.to;

    const x1 = (a.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y1 = (a.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;
    const x2 = (b.x * MAP.TILE - camera.x) * camera.zoom + tileSize / 2;
    const y2 = (b.y * MAP.TILE - camera.y) * camera.zoom + tileSize / 2;

    if (Math.max(x1, x2) < 0 || Math.min(x1, x2) > rect.width ||
        Math.max(y1, y2) < 0 || Math.min(y1, y2) > rect.height) return;

    const color = road.type === 'own'    ? '#00d4ff'
                : road.type === 'enemy'  ? '#ff3b5c'
                : road.type === 'border' ? '#8892a6'
                : '#8892a6';

    const lineWidth = Math.max(1, 1.5 * camera.zoom);
    const dash = Math.max(3, 5 * camera.zoom);

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.setLineDash([dash, dash]);
    ctx.globalAlpha = 0.5;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
  });
}

function renderAttacks() {
  const tileSize = screenTileSize();

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
    ctx.lineWidth = Math.max(2, 3 * camera.zoom);
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
  const tileSize = screenTileSize();
  const rect = canvas.getBoundingClientRect();

  const x0 = Math.max(0, Math.floor(camera.x / MAP.TILE) - 1);
  const y0 = Math.max(0, Math.floor(camera.y / MAP.TILE) - 1);
  const x1 = Math.min(MAP.W, Math.ceil((camera.x + rect.width / camera.zoom) / MAP.TILE) + 1);
  const y1 = Math.min(MAP.H, Math.ceil((camera.y + rect.height / camera.zoom) / MAP.TILE) + 1);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  CITIES.forEach(c => {
    if (c.x < x0 || c.x > x1 || c.y < y0 || c.y > y1) return;

    const sx = (c.x * MAP.TILE - camera.x) * camera.zoom;
    const sy = (c.y * MAP.TILE - camera.y) * camera.zoom;
    const color = CITY_COLORS[c.owner];

    const sizeRatio = c.type === 'capital' ? 0.75
                    : c.type === 'large' ? 0.55
                    : c.type === 'medium' ? 0.45
                    : 0.35;
    const radius = tileSize * sizeRatio / 2;

    ctx.shadowColor = color;
    ctx.shadowBlur = c.type === 'capital' ? 16 : 8;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx + tileSize / 2, sy + tileSize / 2, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    if (c.type === 'capital' && tileSize > 20) {
      ctx.font = `${tileSize * 0.55}px sans-serif`;
      ctx.textBaseline = 'middle';
      ctx.fillText('🏠', sx + tileSize / 2, sy + tileSize / 2 + 2);
    }

    if (camera.zoom < 0.7 && c.type !== 'capital' && c.type !== 'large') return;

    ctx.textBaseline = 'top';

    const fontSize = Math.max(8,
      (c.type === 'capital' ? 12 : c.type === 'large' ? 11 : c.type === 'medium' ? 10 : 9) * camera.zoom
    );
    ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;

    const textY = sy + tileSize + 2;
    const textX = sx + tileSize / 2;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.lineWidth = Math.max(2, 3 * camera.zoom);
    ctx.strokeText(c.name, textX, textY);

    ctx.fillStyle = color;
    ctx.fillText(c.name, textX, textY);
  });
}

// ============ СТАРТ ИГРЫ ============
function startGame() {
  const s = state.settings;
  state.faction = s.faction;
  state.enemyFaction = s.faction === 'aurora' ? 'vesper' : 'aurora';
  state.difficulty = s.difficulty;

  const f = FACTIONS[state.faction];
  Object.assign(state, f.start);

  const d = DIFFICULTY[state.difficulty];
  state.money *= d.playerMoneyMult;
  state.satisfaction -= d.playerSatPenalty;

  if (tg) {
    if (tg.disableVerticalSwipes) tg.disableVerticalSwipes();
    if (tg.disableSwipes) tg.disableSwipes();
  }

  document.getElementById('menu').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  document.querySelector('.speed-btn[data-speed="1"]').classList.add('active');

  seed = 12345;
  tileNoise.clear();
  generateMap();
  generateCities();
  generateRoads();

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

document.getElementById('city-list-btn').addEventListener('click', () => {
  centerOnPlayerBase();
});

document.getElementById('gameover-restart').addEventListener('click', () => {
  state.gameOver = false;
  state.gameOverShown = false;
  state.gameOverReason = null;
  state.gameOverText = null;
  document.getElementById('gameover-modal').classList.add('hidden');
  document.getElementById('game-screen').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
});