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
const WORLD_W = MAP.W * MAP.TILE;
const WORLD_H = MAP.H * MAP.TILE;

let map = [];
let CITIES = [];
let ROADS = [];
let ACTIVE_ATTACKS = [];
let RIVER_POINTS = [];

let seed = 12345;
function rand() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

// ============ CANVAS ============
let canvas, ctx, dpr = window.devicePixelRatio || 1;
let worldCanvas, worldCtx;

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

// ============ ГЕНЕРАЦИЯ КАРТЫ (логика) ============
function generateMap() {
  map = [];
  for (let y = 0; y < MAP.H; y++) {
    const row = [];
    for (let x = 0; x < MAP.W; x++) row.push(0);
    map.push(row);
  }
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
function getRoadsFrom(city) {
  return ROADS
    .filter(r => r.from === city || r.to === city)
    .map(r => r.from === city ? r.to : r.from);
}

function generateRoads() {
  ROADS = [];
  const seen = new Set();

  CITIES.forEach(city => {
    const neighbors = CITIES
      .filter(c => c !== city)
      .map(c => ({ city: c, dist: Math.hypot(c.x - city.x, c.y - city.y) }))
      .sort((a, b) => a.dist - b.dist);

    let maxLinks;
    switch (city.type) {
      case 'capital': maxLinks = 4; break;
      case 'large':   maxLinks = 3; break;
      case 'medium':  maxLinks = 2; break;
      default:        maxLinks = 2;
    }

    let links = 0;
    for (const { city: neighbor, dist } of neighbors) {
      if (links >= maxLinks) break;
      if (dist > 8) break;

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

  // Межфракционные
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
      if (dist > 10) break;

      const key = [CITIES.indexOf(aCity), CITIES.indexOf(vCity)].sort().join('-');
      if (seen.has(key)) continue;
      seen.add(key);

      ROADS.push({ from: aCity, to: vCity, type: 'border' });
      borderLinks++;
    }
  });
}

// ============ ГЕНЕРАЦИЯ WORLD CANVAS (Voronoi + река) ============
function generateWorldCanvas() {
  worldCanvas = document.createElement('canvas');
  worldCanvas.width = WORLD_W;
  worldCanvas.height = WORLD_H;
  worldCtx = worldCanvas.getContext('2d');

  // 1. Базовый тёмный фон
  worldCtx.fillStyle = '#1a1d24';
  worldCtx.fillRect(0, 0, WORLD_W, WORLD_H);

  // 2. Регионы Voronoi (рисуем цветными пятнами с размытием)
  drawRegions();

  // 3. Границы регионов (тёмные тонкие линии)
  drawBorders();

  // 4. Река
  drawRiver();

  // 5. Легкий шум/текстура
  drawTexture();
}

function drawRegions() {
  const cities = CITIES.map(c => ({
    x: c.x * MAP.TILE + MAP.TILE / 2,
    y: c.y * MAP.TILE + MAP.TILE / 2,
    owner: c.owner,
  }));

  const step = 3;
  for (let py = 0; py < WORLD_H; py += step) {
    for (let px = 0; px < WORLD_W; px += step) {
      let minDist = Infinity;
      let nearest = null;
      for (const c of cities) {
        const d = (c.x - px) ** 2 + (c.y - py) ** 2;
        if (d < minDist) {
          minDist = d;
          nearest = c;
        }
      }

      let color;
      if (nearest.owner === 'aurora') {
        color = 'rgba(0, 50, 80, 0.55)';
      } else if (nearest.owner === 'vesper') {
        color = 'rgba(80, 15, 30, 0.55)';
      } else {
        color = 'rgba(40, 44, 52, 0.4)';
      }

      worldCtx.fillStyle = color;
      worldCtx.fillRect(px, py, step, step);
    }
  }
}

function drawBorders() {
  const cities = CITIES.map(c => ({
    x: c.x * MAP.TILE + MAP.TILE / 2,
    y: c.y * MAP.TILE + MAP.TILE / 2,
    owner: c.owner,
  }));

  worldCtx.strokeStyle = 'rgba(10, 12, 16, 0.9)';
  worldCtx.lineWidth = 1;
  worldCtx.lineCap = 'round';

  // Рисуем границы через соседей — линии между городами разных владельцев
  const seen = new Set();
  cities.forEach((a, i) => {
    cities.forEach((b, j) => {
      if (i >= j) return;
      if (a.owner === b.owner) return;

      const key = i + '-' + j;
      if (seen.has(key)) return;
      seen.add(key);

      const dist = Math.hypot(b.x - a.x, b.y - a.y);
      if (dist > 300) return; // только близкие

      // Середина — граница
      const mx = (a.x + b.x) / 2;
      const my = (a.y + b.y) / 2;

      // Перпендикуляр
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      const nx = -dy / len;
      const ny = dx / len;

      // Рисуем линию длиной 60px
      worldCtx.beginPath();
      worldCtx.moveTo(mx - nx * 30, my - ny * 30);
      worldCtx.lineTo(mx + nx * 30, my + ny * 30);
      worldCtx.stroke();
    });
  });
}

function drawRiver() {
  RIVER_POINTS = [];
  let px = WORLD_W * 0.45;
  let phase = 0;

  worldCtx.strokeStyle = '#0f2233';
  worldCtx.lineWidth = 8;
  worldCtx.lineCap = 'round';
  worldCtx.lineJoin = 'round';
  worldCtx.beginPath();
  worldCtx.moveTo(px, 0);

  for (let py = 0; py < WORLD_H; py += 8) {
    phase += 0.15;
    px += Math.sin(phase) * 12;
    px = Math.max(WORLD_W * 0.35, Math.min(WORLD_W * 0.65, px));
    worldCtx.lineTo(px, py);
    RIVER_POINTS.push({ x: px, y: py });
  }
  worldCtx.stroke();

  // Светлая кромка
  worldCtx.strokeStyle = '#1e4260';
  worldCtx.lineWidth = 3;
  worldCtx.stroke();
}

function drawTexture() {
  // Простой шум — точки
  worldCtx.fillStyle = 'rgba(255, 255, 255, 0.015)';
  for (let i = 0; i < 800; i++) {
    const x = rand() * WORLD_W;
    const y = rand() * WORLD_H;
    worldCtx.fillRect(x, y, 2, 2);
  }
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
  const viewW = rect.width / camera.zoom;
  const viewH = rect.height / camera.zoom;

  camera.x = worldCx - viewW / 2;
  camera.y = worldCy - viewH / 2;
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

  // Ищем ближайший город в радиусе 30px
  let closest = null;
  let minDist = 30;
  CITIES.forEach(c => {
    const cx = c.x * MAP.TILE + MAP.TILE / 2;
    const cy = c.y * MAP.TILE + MAP.TILE / 2;
    const d = Math.hypot(worldX - cx, worldY - cy);
    if (d < minDist) {
      minDist = d;
      closest = c;
    }
  });

  if (closest) {
    openCityPanel(closest);
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

// ============ ПАНЕЛИ ============
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
function renderMap() {
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const w = rect.width;
  const h = rect.height;

  ctx.fillStyle = '#0a0e1a';
  ctx.fillRect(0, 0, w, h);

  // Копируем видимую часть worldCanvas
  const srcX = camera.x;
  const srcY = camera.y;
  const srcW = w / camera.zoom;
  const srcH = h / camera.zoom;

  ctx.drawImage(
    worldCanvas,
    srcX, srcY, srcW, srcH,
    0, 0, w, h
  );

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

    const color = road.type === 'own'    ? 'rgba(0, 212, 255, 0.35)'
                : road.type === 'enemy'  ? 'rgba(255, 59, 92, 0.35)'
                : 'rgba(180, 190, 210, 0.3)';

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
  const tileSize = MAP.TILE * camera.zoom;
  const rect = canvas.getBoundingClientRect();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  CITIES.forEach(c => {
    const sx = (c.x * MAP.TILE - camera.x) * camera.zoom;
    const sy = (c.y * MAP.TILE - camera.y) * camera.zoom;

    if (sx < -100 || sx > rect.width + 100 || sy < -100 || sy > rect.height + 100) return;

    const color = c.owner === 'aurora' ? '#00d4ff'
                : c.owner === 'vesper' ? '#ff3b5c'
                : '#8892a6';

    const radiusRatio = c.type === 'capital' ? 0.32
                      : c.type === 'large' ? 0.24
                      : c.type === 'medium' ? 0.18
                      : 0.13;
    const radius = Math.max(3, tileSize * radiusRatio);

    // Свечение
    ctx.shadowColor = color;
    ctx.shadowBlur = c.type === 'capital' ? 24 : 12;

    // Круг города
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(sx + tileSize / 2, sy + tileSize / 2, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Внутренняя точка
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(sx + tileSize / 2, sy + tileSize / 2, radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Название
    if (camera.zoom < 0.6 && c.type !== 'capital' && c.type !== 'large') return;

    const fontSize = Math.max(9,
      (c.type === 'capital' ? 13 : c.type === 'large' ? 12 : c.type === 'medium' ? 11 : 10) * Math.max(0.8, camera.zoom)
    );
    ctx.font = `bold ${fontSize}px -apple-system, sans-serif`;
    ctx.textBaseline = 'top';

    const textX = sx + tileSize / 2;
    const textY = sy + tileSize / 2 + radius + 4;

    const textWidth = ctx.measureText(c.name).width;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
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
  generateMap();
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