// ============ TELEGRAM ============
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// ============ ДАННЫЕ ============
const FACTIONS = {
  aurora: {
    name: 'Республика Аврора',
    color: '#3b82f6',
    start: { money: 100, satisfaction: 80, corruption: 20, population: 1000 },
    modifiers: {
      unitCostMult: 1.5, unitPowerMult: 1.4,
      casualtySatPenalty: 3, socialProgramMult: 1.5,
      reformSpeedMult: 1.3, victorySatBonus: 12,
    },
  },
  vesper: {
    name: 'Доминион Веспер',
    color: '#dc2626',
    start: { money: 250, satisfaction: 60, corruption: 45, population: 1500 },
    modifiers: {
      unitCostMult: 0.7, unitPowerMult: 0.9,
      casualtySatPenalty: 1, socialProgramMult: 0.7,
      reformSpeedMult: 0.8, victorySatBonus: 6,
    },
  },
};

const DIFFICULTY = {
  easy:   { aiIncomeMult: 0.8, aiUnitMult: 0.9, playerMoneyMult: 1.0, playerSatPenalty: 0 },
  normal: { aiIncomeMult: 1.0, aiUnitMult: 1.0, playerMoneyMult: 1.0, playerSatPenalty: 0 },
  hard:   { aiIncomeMult: 1.3, aiUnitMult: 1.15, playerMoneyMult: 0.9, playerSatPenalty: 0 },
  insane: { aiIncomeMult: 1.6, aiUnitMult: 1.3, playerMoneyMult: 0.8, playerSatPenalty: 10 },
};

const LANG = {
  ru: {
    language: 'Язык', faction: 'Сторона', difficulty: 'Сложность',
    startGame: 'Начать игру',
    auroraName: 'Республика Аврора', vesperName: 'Доминион Веспер',
    easy: 'Легко', normal: 'Норма', hard: 'Сложно', insane: 'Хардкор',
    population: 'население', satisfaction: 'довольность', corruption: 'коррупция',

    diffEasy: 'Спокойное знакомство. ИИ медлит, у вас запас ресурсов.',
    diffNormal: 'Сбалансированная игра. ИИ действует адекватно.',
    diffHard: 'ИИ агрессивнее и богаче. У вас меньше денег.',
    diffInsane: 'Максимальное давление. ИИ доминирует, вы начинаете в кризисе.',

    aiIncome: 'Доход ИИ',
    aiUnits: 'Сила юнитов ИИ',
    playerMoney: 'Ваши деньги',
    playerSat: 'Старт. довольность',
  },
  en: {
    language: 'Language', faction: 'Faction', difficulty: 'Difficulty',
    startGame: 'Start game',
    auroraName: 'Aurora Republic', vesperName: 'Vesper Dominion',
    easy: 'Easy', normal: 'Normal', hard: 'Hard', insane: 'Insane',
    population: 'population', satisfaction: 'satisfaction', corruption: 'corruption',

    diffEasy: 'A calm introduction. AI is slow, you have resource surplus.',
    diffNormal: 'Balanced game. AI acts reasonably.',
    diffHard: 'AI is more aggressive and richer. You have less money.',
    diffInsane: 'Maximum pressure. AI dominates, you start in crisis.',

    aiIncome: 'AI income',
    aiUnits: 'AI unit power',
    playerMoney: 'Your money',
    playerSat: 'Start satisfaction',
  },
};

// ============ STATE ============
const state = {
  settings: { language: 'ru', faction: null, difficulty: 'normal' },
  faction: null, enemyFaction: null, difficulty: null,
  money: 0, satisfaction: 0, corruption: 0, population: 0,
  timeScale: 1, paused: false, gameOver: false,
  coupTimer: null,
};

const BALANCE = {
  baseTaxIncome: 30,
  basePopulationGrowth: 0.5,
  coupWarningThreshold: 5,
  coupTimerSeconds: 60,
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

  // Обновить описание сложности на новом языке
  if (state.settings.difficulty) {
    updateDifficultyDesc(state.settings.difficulty);
  }
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
    <div style="margin-bottom:6px;color:#cbd5e1">${dict['diff' + cap]}</div>
    <div class="row-desc"><span>${dict.aiIncome}</span><span>${pct(d.aiIncomeMult)}</span></div>
    <div class="row-desc"><span>${dict.aiUnits}</span><span>${pct(d.aiUnitMult)}</span></div>
    <div class="row-desc"><span>${dict.playerMoney}</span><span>${pct(d.playerMoneyMult)}</span></div>
    <div class="row-desc"><span>${dict.playerSat}</span><span>${d.playerSatPenalty > 0 ? '−' + d.playerSatPenalty + '%' : '—'}</span></div>
  `;
}

function checkReady() {
  const s = state.settings;
  const ready = s.language && s.faction && s.difficulty;
  document.getElementById('start-btn').disabled = !ready;
}

// Обработчики меню
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

// Автоопределение языка из Telegram
(function initLanguage() {
  const saved = localStorage.getItem('lang');
  const tgLang = tg?.initDataUnsafe?.user?.language_code;
  let lang = saved || (tgLang === 'en' ? 'en' : 'ru');
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('selected', b.dataset.lang === lang);
  });
  applyLanguage(lang);

  // Показать описание дефолтной сложности
  updateDifficultyDesc(state.settings.difficulty);
})();

// ============ СТАРТ ИГРЫ ============
function startGame() {
  const s = state.settings;
  state.faction = s.faction;
  state.enemyFaction = s.faction === 'aurora' ? 'vesper' : 'aurora';
  state.difficulty = s.difficulty;

  // Стартовые значения фракции
  const f = FACTIONS[state.faction];
  Object.assign(state, f.start);

  // Модификаторы сложности
  const d = DIFFICULTY[state.difficulty];
  state.money *= d.playerMoneyMult;
  state.satisfaction -= d.playerSatPenalty;

  // Переключаем экраны
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');

  // Скорость ×1 по умолчанию
  document.querySelector('.speed-btn[data-speed="1"]').classList.add('active');

  // Запуск игрового цикла
  lastTime = performance.now();
  requestAnimationFrame(loop);
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
  requestAnimationFrame(loop);
}

function calcIncome() {
  return BALANCE.baseTaxIncome
    * 0.25 * (state.satisfaction / 100) * (1 - state.corruption / 100);
}

function update(dt) {
  // Деньги
  state.money += calcIncome() * dt;

  // Население
  let popDelta = 0;
  if (state.satisfaction > 60) popDelta = BALANCE.basePopulationGrowth * ((state.satisfaction - 60) / 40);
  else if (state.satisfaction < 30) popDelta = -BALANCE.basePopulationGrowth * ((30 - state.satisfaction) / 30);
  state.population = Math.max(0, state.population + popDelta * dt);

  // Удовлетворённость
  let satDelta = 0;
  if (state.corruption > 50) satDelta -= 0.4 * ((state.corruption - 50) / 50);
  if (satDelta < 0) satDelta *= (1 + state.corruption / 100);
  state.satisfaction = Math.max(0, Math.min(100, state.satisfaction + satDelta * dt));

  // Коррупция
  state.corruption = Math.max(0, Math.min(100, state.corruption + (0.3 * 0.05 - 0.02) * dt));

  // Переворот
  if (state.satisfaction <= 0) { state.gameOver = true; return; }
  if (state.satisfaction < BALANCE.coupWarningThreshold) {
    if (state.coupTimer === null) state.coupTimer = BALANCE.coupTimerSeconds;
    else if ((state.coupTimer -= dt) <= 0) state.gameOver = true;
  } else state.coupTimer = null;
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

// ============ КНОПКИ СКОРОСТИ ============
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