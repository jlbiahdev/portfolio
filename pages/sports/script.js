import { activities } from './data/activities.js?v=20261019';

const CHART_COLORS = {
  primary: '#135267',
  primaryLight: '#1a6e8a',
  text: '#ffffff',
  textMuted: 'rgba(255,255,255,0.45)',
  grid: 'rgba(255,255,255,0.06)',
  bg: '#1e272e',
};

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabs();
  fillHeroKpis();
  renderBasket(activities.basket);
  renderWalking(activities.walking);
  renderRunning(activities.running);
  renderCycling(activities.cycling);
});

// ────────────────────────────────────────────────────────────────────
// THEME (même cookie que le portfolio : THEME=light|dark)
// ────────────────────────────────────────────────────────────────────

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
  setCookie('THEME', theme, 365);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.setAttribute('aria-pressed', theme === 'light');
}

function initTheme() {
  const saved = getCookie('THEME')
    || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  applyTheme(saved);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = getCookie('THEME') || 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// ────────────────────────────────────────────────────────────────────
// TABS
// ────────────────────────────────────────────────────────────────────

function initTabs() {
  const tabs = document.querySelectorAll('.sport-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      document.getElementById(`tab-${target}`).classList.add('active');
    });
  });
}

// ────────────────────────────────────────────────────────────────────
// HERO KPIs
// ────────────────────────────────────────────────────────────────────

function fillHeroKpis() {
  document.getElementById('kpi-walk').textContent =
    activities.walking.total.distance.toLocaleString('fr-FR', { maximumFractionDigits: 0 });
  document.getElementById('kpi-run').textContent =
    Math.round(activities.running.total.distance);
  document.getElementById('kpi-bike').textContent =
    Math.round(activities.cycling.total.distance);
  document.getElementById('kpi-vo2').textContent = activities.running.vo2max;
  const totalSessions = activities.walking.total.sessions + activities.running.total.sessions
    + activities.cycling.total.sessions;
  document.getElementById('kpi-sessions').textContent = totalSessions;
}

// ────────────────────────────────────────────────────────────────────
// BASKET
// ────────────────────────────────────────────────────────────────────

const ATTEMPTS_PER_SET = 10;

function dayStats(day) {
  const validSeries = day.series.filter(s => s.length > 0);
  if (validSeries.length === 0) return null;
  const made     = validSeries.flat().reduce((a, b) => a + b, 0);
  const attempts = validSeries.flat().length * ATTEMPTS_PER_SET;
  const pct      = Math.round((made / attempts) * 100);
  const sets     = validSeries.flat().length; // nombre total de séries de 10
  return { made, attempts, pct, sets, seriesCount: validSeries.length };
}

function weekStats(week) {
  const days = week.days.map(dayStats).filter(Boolean);
  if (days.length === 0) return null;
  const made     = days.reduce((a, d) => a + d.made, 0);
  const attempts = days.reduce((a, d) => a + d.attempts, 0);
  const pct      = Math.round((made / attempts) * 100);
  const avgPct   = Math.round(days.reduce((a, d) => a + d.pct, 0) / days.length);
  return { made, attempts, pct, avgPct, sessionCount: days.length };
}

function weather(pct) {
  if (pct < 25) return { icon: '❄️', label: 'Froid',       cls: 'wx-cold'   };
  if (pct < 40) return { icon: '🌧️', label: 'Compliqué',  cls: 'wx-rain'   };
  if (pct < 55) return { icon: '⛅', label: 'Correct',     cls: 'wx-cloud'  };
  if (pct < 70) return { icon: '🌤️', label: 'Bonne séance', cls: 'wx-sun'  };
  return              { icon: '🔥', label: 'En feu !',     cls: 'wx-fire'   };
}

function renderBasket(basket) {
  const container = document.getElementById('basket-content');

  // ── Récap global ──────────────────────────────────────────────────
  const allDayStats = basket.weeks.flatMap(w => w.days.map(dayStats)).filter(Boolean);
  const globalMade     = allDayStats.reduce((a, d) => a + d.made, 0);
  const globalAttempts = allDayStats.reduce((a, d) => a + d.attempts, 0);
  const globalPct      = Math.round((globalMade / globalAttempts) * 100);
  const globalAvgDay   = Math.round(allDayStats.reduce((a, d) => a + d.pct, 0) / allDayStats.length);
  const wx             = weather(globalPct);

  let html = `
    <div class="basket-recap">
      <div class="recap-card highlight">
        <span class="recap-value">${globalPct}%</span>
        <span class="recap-label">Réussite globale</span>
        <span class="recap-sub">${globalMade} / ${globalAttempts} tirs</span>
      </div>
      <div class="recap-card">
        <span class="recap-value">${globalAvgDay}%</span>
        <span class="recap-label">Moy. journalière</span>
      </div>
      <div class="recap-card">
        <span class="recap-value">${allDayStats.length}</span>
        <span class="recap-label">Sessions</span>
      </div>
      <div class="recap-card ${wx.cls}">
        <span class="recap-icon">${wx.icon}</span>
        <span class="recap-label">Forme générale</span>
        <span class="recap-sub">${wx.label}</span>
      </div>
    </div>`;

  // ── Semaines ──────────────────────────────────────────────────────
  basket.weeks.forEach((week, wi) => {
    const ws = weekStats(week);
    if (!ws) return;

    html += `<div class="week-block">
      <div class="week-header">
        <span class="week-label">Semaine ${wi + 1}</span>
        <div class="week-summary">
          <span class="week-pct">${ws.pct}%</span>
          <span class="week-detail">${ws.made}/${ws.attempts} · moy. ${ws.avgPct}% / session</span>
        </div>
      </div>
      <div class="sessions-row">`;

    week.days.forEach(day => {
      const ds = dayStats(day);
      const dateLabel = formatDay(day.date);

      html += `<div class="session-card">`;

      if (!ds) {
        html += `<div class="session-date">${dateLabel}</div>
          <div class="session-empty">Session planifiée</div>`;
      } else {
        const wx = weather(ds.pct);
        html += `
          <div class="session-header">
            <span class="session-date">${dateLabel}</span>
            <span class="session-wx ${wx.cls}" title="${wx.label}">${wx.icon}</span>
          </div>
          <div class="session-pct-bar">
            <div class="pct-fill" style="width:${ds.pct}%"></div>
          </div>
          <div class="session-pct-label">
            <span class="pct-value">${ds.pct}%</span>
            <span class="pct-detail">${ds.made}/${ds.attempts} · ${ds.sets} séries</span>
          </div>
          <div class="series-list">`;

        day.series.forEach(series => {
          if (series.length === 0) return;
          const seriesMade = series.reduce((a, b) => a + b, 0);
          const seriesAttempts = series.length * ATTEMPTS_PER_SET;
          const seriesPct = Math.round((seriesMade / seriesAttempts) * 100);
          html += `<div class="series-row">`;
          series.forEach(val => {
            html += `<div class="heat-cell ${heatClass(val)}">${val}</div>`;
          });
          html += `<span class="series-sum">${seriesPct}%</span></div>`;
        });

        html += `</div>`; // series-list
      }

      html += `</div>`; // session-card
    });

    html += `</div></div>`; // sessions-row, week-block
  });

  container.innerHTML = html;
}

function heatClass(val) {
  // val = réussis sur 10 → couleur proportionnelle au %
  if (val === 0) return 'heat-0';
  if (val <= 2)  return 'heat-1';
  if (val <= 3)  return 'heat-2';
  if (val <= 4)  return 'heat-3';
  if (val <= 5)  return 'heat-4';
  if (val <= 6)  return 'heat-5';
  return 'heat-hi'; // 7+
}

// ────────────────────────────────────────────────────────────────────
// WALKING
// ────────────────────────────────────────────────────────────────────

function renderWalking(walking) {
  // Stat cards
  document.getElementById('walking-stats').innerHTML = `
    <div class="stat-card highlight">
      <span class="stat-value">${walking.total.distance.toLocaleString('fr-FR', { maximumFractionDigits: 0 })} km</span>
      <span class="stat-label">Distance totale</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${walking.total.sessions}</span>
      <span class="stat-label">Sessions</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${(walking.total.calories / 1000).toFixed(1)}k</span>
      <span class="stat-label">Calories</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${bestMonth(walking.months).distance} km</span>
      <span class="stat-label">Meilleur mois</span>
    </div>`;

  // Chart
  const sorted = [...walking.months].sort((a, b) => a.month.localeCompare(b.month));
  const labels = sorted.map(m => formatMonth(m.month));
  const values = sorted.map(m => m.distance);

  new ApexCharts(document.getElementById('chart-walking'), {
    chart: {
      type: 'bar',
      height: 320,
      background: 'transparent',
      toolbar: { show: false },
    },
    series: [{ name: 'Distance (km)', data: values }],
    xaxis: {
      categories: labels,
      labels: { style: { colors: CHART_COLORS.textMuted, fontSize: '1.2rem', fontFamily: 'Nunito' } },
    },
    yaxis: {
      labels: { style: { colors: CHART_COLORS.textMuted, fontFamily: 'Nunito' } },
    },
    colors: [CHART_COLORS.primary],
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: '60%' },
    },
    dataLabels: { enabled: false },
    grid: { borderColor: CHART_COLORS.grid },
    theme: { mode: 'dark' },
    tooltip: {
      y: { formatter: v => `${v} km` },
      style: { fontFamily: 'Nunito' },
    },
  }).render();
}

// ────────────────────────────────────────────────────────────────────
// RUNNING
// ────────────────────────────────────────────────────────────────────

function renderRunning(running) {
  // VO2Max card
  document.getElementById('vo2max-section').innerHTML = `
    <div class="vo2max-card">
      <div class="vo2max-number">${running.vo2max}</div>
      <div class="vo2max-info">
        <span class="vo2max-title">VO2 Max</span>
        <span class="vo2max-unit">ml / kg / min</span>
        <span class="vo2max-badge">Excellent · Top 20 %</span>
      </div>
    </div>`;

  // Stat cards
  document.getElementById('running-stats').innerHTML = `
    <div class="stat-card highlight">
      <span class="stat-value">${Math.round(running.total.distance)} km</span>
      <span class="stat-label">Distance totale</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${running.total.sessions}</span>
      <span class="stat-label">Sessions</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${(running.total.calories / 1000).toFixed(1)}k</span>
      <span class="stat-label">Calories</span>
    </div>`;

  // Podium
  const medals = ['🥇', '🥈', '🥉'];
  document.getElementById('running-podium').innerHTML = running.bestSessions
    .slice(0, 3)
    .map((s, i) => `
      <div class="podium-item">
        <span class="podium-medal">${medals[i]}</span>
        <span class="podium-period">${s.period}</span>
        <span class="podium-distance">${s.distance}</span>
        <span class="podium-km">km</span>
        <span class="podium-sessions">${s.sessions} sessions · ${s.calories} kcal</span>
      </div>`)
    .join('');

  // Chart
  const sorted = [...running.months].sort((a, b) => a.month.localeCompare(b.month));
  const labels = sorted.map(m => formatMonth(m.month));
  const values = sorted.map(m => m.distance);

  new ApexCharts(document.getElementById('chart-running'), {
    chart: {
      type: 'area',
      height: 260,
      background: 'transparent',
      toolbar: { show: false },
      sparkline: { enabled: false },
    },
    series: [{ name: 'Distance (km)', data: values }],
    xaxis: {
      categories: labels,
      labels: { style: { colors: CHART_COLORS.textMuted, fontSize: '1.2rem', fontFamily: 'Nunito' } },
    },
    yaxis: {
      labels: { style: { colors: CHART_COLORS.textMuted, fontFamily: 'Nunito' } },
    },
    colors: [CHART_COLORS.primaryLight],
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 100] },
    },
    stroke: { curve: 'smooth', width: 3 },
    dataLabels: { enabled: false },
    grid: { borderColor: CHART_COLORS.grid },
    theme: { mode: 'dark' },
    tooltip: {
      y: { formatter: v => `${v} km` },
      style: { fontFamily: 'Nunito' },
    },
  }).render();

  renderSessionTable('running-sessions', running.sessions, 'pace');
}

// ────────────────────────────────────────────────────────────────────
// CYCLING
// ────────────────────────────────────────────────────────────────────

function renderCycling(cycling) {
  const longest = cycling.sessions.reduce((max, s) => s.distance > max.distance ? s : max, cycling.sessions[0]);
  const fastest = cycling.sessions.reduce((max, s) => speed(s) > speed(max) ? s : max, cycling.sessions[0]);

  document.getElementById('cycling-stats').innerHTML = `
    <div class="stat-card highlight">
      <span class="stat-value">${Math.round(cycling.total.distance)} km</span>
      <span class="stat-label">Distance totale</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${cycling.total.sessions}</span>
      <span class="stat-label">Sessions</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${Math.round(cycling.total.hours)} h</span>
      <span class="stat-label">En selle</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${(cycling.total.calories / 1000).toFixed(1)}k</span>
      <span class="stat-label">Calories</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${longest.distance} km</span>
      <span class="stat-label">Plus longue sortie</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${speed(fastest).toFixed(1)} km/h</span>
      <span class="stat-label">Meilleure moyenne</span>
    </div>`;

  const sorted = [...cycling.months].sort((a, b) => a.month.localeCompare(b.month));
  new ApexCharts(document.getElementById('chart-cycling'), {
    chart: { type: 'bar', height: 300, background: 'transparent', toolbar: { show: false } },
    series: [{ name: 'Distance (km)', data: sorted.map(m => m.distance) }],
    xaxis: {
      categories: sorted.map(m => formatMonth(m.month)),
      labels: { style: { colors: CHART_COLORS.textMuted, fontSize: '1.2rem', fontFamily: 'Nunito' } },
    },
    yaxis: { labels: { style: { colors: CHART_COLORS.textMuted, fontFamily: 'Nunito' } } },
    colors: [CHART_COLORS.primaryLight],
    plotOptions: { bar: { borderRadius: 6, columnWidth: '55%' } },
    dataLabels: { enabled: false },
    grid: { borderColor: CHART_COLORS.grid },
    theme: { mode: 'dark' },
    tooltip: { y: { formatter: v => `${v} km` }, style: { fontFamily: 'Nunito' } },
  }).render();

  renderSessionTable('cycling-sessions', cycling.sessions, 'speed');
}

// Tableau des sorties : allure (min/km) pour la course, vitesse (km/h) pour le vélo
function renderSessionTable(id, sessions, metric) {
  const el = document.getElementById(id);
  if (!el || !sessions?.length) return;
  const head = metric === 'pace' ? 'Allure' : 'Vitesse';
  const rows = [...sessions]
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
    .map(s => `<tr>
        <td>${formatDay(s.date)} <small>${s.time}</small></td>
        <td class="num">${s.distance.toFixed(2)} km</td>
        <td class="num">${s.duration}</td>
        <td class="num">${metric === 'pace' ? pace(s) : speed(s).toFixed(1) + ' km/h'}</td>
      </tr>`).join('');
  el.innerHTML = `<table class="session-table">
      <thead><tr><th>Date</th><th class="num">Distance</th><th class="num">Durée</th><th class="num">${head}</th></tr></thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function seconds(duration) {
  const [h, m, s] = duration.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}

function speed(s) {
  return s.distance / (seconds(s.duration) / 3600);
}

function pace(s) {
  const secPerKm = Math.round(seconds(s.duration) / s.distance);
  return `${Math.floor(secPerKm / 60)}'${String(secPerKm % 60).padStart(2, '0')}"/km`;
}

// ────────────────────────────────────────────────────────────────────
// UTILITAIRES
// ────────────────────────────────────────────────────────────────────

function formatDay(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatMonth(monthStr) {
  const [year, month] = monthStr.split('-');
  const date = new Date(Number(year), Number(month) - 1, 1);
  return date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
}

function bestMonth(months) {
  return months.reduce((max, m) => m.distance > max.distance ? m : max, months[0]);
}
