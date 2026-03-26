const express = require('express');
const fs      = require('fs');
const path    = require('path');
const crypto  = require('crypto');

const app      = express();
const PORT     = 3006;
const DB_FILE  = path.join(__dirname, 'stats.json');
const STATS_PASSWORD = 'admin'; // cambia a piacere

// ── Inizializza DB stats se non esiste ──────────────────────
function loadStats() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ visits: 0, downloads: 0, events: [] }));
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function saveStats(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// ── Tracking endpoint (chiamato dal sito) ───────────────────
app.post('/track', (req, res) => {
  const { type, match, photo } = req.body;
  if (!['visit', 'download'].includes(type)) return res.sendStatus(400);

  const stats = loadStats();
  const event = {
    type,
    match:  match  || null,
    photo:  photo  || null,
    time:   new Date().toISOString(),
    ip:     (req.headers['cf-connecting-ip'] || req.ip).replace(/(\d+)$/, 'xxx')
  };

  if (type === 'visit')    stats.visits++;
  if (type === 'download') stats.downloads++;
  stats.events.unshift(event);           // più recenti prima
  if (stats.events.length > 2000) stats.events = stats.events.slice(0, 2000);

  saveStats(stats);
  res.sendStatus(204);
});

// ── Reset stats ─────────────────────────────────────────────
app.post('/stats/reset', (req, res) => {
  if (req.query.pw !== STATS_PASSWORD) return res.status(401).send('Non autorizzato');
  saveStats({ visits: 0, downloads: 0, events: [] });
  res.sendStatus(204);
});

// ── Pannello stats (protetto da password via query param) ────
app.get('/stats', (req, res) => {
  if (req.query.pw !== STATS_PASSWORD) {
    return res.status(401).send('Non autorizzato');
  }

  const stats = loadStats();

  // Aggregazioni
  const byMatch    = {};
  const byDay      = {};
  const downloads  = stats.events.filter(e => e.type === 'download');

  downloads.forEach(e => {
    byMatch[e.match] = (byMatch[e.match] || 0) + 1;
    const day = e.time.slice(0, 10);
    byDay[day] = (byDay[day] || 0) + 1;
  });

  const topMatch = Object.entries(byMatch).sort((a,b) => b[1]-a[1]).slice(0, 5);
  const lastDays = Object.entries(byDay).sort((a,b) => a[0].localeCompare(b[0])).slice(-14);

  const html = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Stats – Basket Agropoli</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#111318;color:#e8eaf0;font-family:'Segoe UI',system-ui,sans-serif;padding:2rem 1.5rem}
  h1{color:#f05a1a;font-size:1.6rem;margin-bottom:1.5rem}
  .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:1rem;margin-bottom:2rem}
  .card{background:#1a1e26;border:1px solid #2a2f3a;border-radius:10px;padding:1.2rem;text-align:center}
  .card .num{font-size:2.2rem;font-weight:800;color:#f05a1a}
  .card .lbl{font-size:.8rem;color:#8891a4;margin-top:.3rem;text-transform:uppercase;letter-spacing:.06em}
  h2{font-size:1rem;color:#8891a4;text-transform:uppercase;letter-spacing:.08em;margin:1.5rem 0 .8rem}
  table{width:100%;border-collapse:collapse;font-size:.88rem}
  th{text-align:left;color:#8891a4;padding:.4rem .6rem;border-bottom:1px solid #2a2f3a}
  td{padding:.45rem .6rem;border-bottom:1px solid #1a1e26}
  tr:hover td{background:#1a1e26}
  .badge{background:#f05a1a;color:#fff;border-radius:4px;padding:.1rem .45rem;font-size:.75rem;font-weight:700}
  .refresh{float:right;font-size:.8rem;color:#8891a4}
</style>
</head>
<body>
<h1>🏀 Statistiche Basket Agropoli <span class="refresh">Aggiornato: ${new Date().toLocaleString('it-IT')} &nbsp;·&nbsp; <button onclick="resetStats()" style="background:#c0392b;color:#fff;border:none;padding:.3rem .8rem;border-radius:6px;cursor:pointer;font-size:.8rem;font-weight:700">Reset stats</button></span></h1>
<script>
function resetStats(){
  if(!confirm('Azzera tutte le statistiche?')) return;
  fetch('/stats/reset?pw=${STATS_PASSWORD}',{method:'POST'})
    .then(()=>location.reload());
}
</script>

<div class="cards">
  <div class="card"><div class="num">${stats.visits}</div><div class="lbl">Visite totali</div></div>
  <div class="card"><div class="num">${stats.downloads}</div><div class="lbl">Download totali</div></div>
  <div class="card"><div class="num">${downloads.length > 0 ? downloads[0].time.slice(0,10) : '—'}</div><div class="lbl">Ultimo download</div></div>
</div>

<h2>Top partite per download</h2>
<table>
  <tr><th>#</th><th>Partita</th><th>Download</th></tr>
  ${topMatch.map(([m,n],i) => `<tr><td>${i+1}</td><td>${m || '—'}</td><td><span class="badge">${n}</span></td></tr>`).join('')}
  ${topMatch.length === 0 ? '<tr><td colspan="3" style="color:#8891a4;padding:.8rem .6rem">Nessun download ancora</td></tr>' : ''}
</table>

<h2>Download ultimi 14 giorni</h2>
<table>
  <tr><th>Data</th><th>Download</th></tr>
  ${lastDays.reverse().map(([d,n]) => `<tr><td>${d}</td><td>${n}</td></tr>`).join('')}
  ${lastDays.length === 0 ? '<tr><td colspan="2" style="color:#8891a4;padding:.8rem .6rem">Nessun dato</td></tr>' : ''}
</table>

<h2>Ultimi 50 eventi</h2>
<table>
  <tr><th>Ora</th><th>Tipo</th><th>Partita</th><th>File</th><th>IP</th></tr>
  ${stats.events.slice(0,50).map(e => `
    <tr>
      <td>${new Date(e.time).toLocaleString('it-IT')}</td>
      <td><span class="badge" style="background:${e.type==='download'?'#f05a1a':'#2a5298'}">${e.type}</span></td>
      <td>${e.match || '—'}</td>
      <td style="font-size:.78rem;color:#8891a4">${e.photo ? e.photo.replace(' copia.jpg','') : '—'}</td>
      <td style="font-size:.78rem;color:#8891a4">${e.ip || '—'}</td>
    </tr>`).join('')}
  ${stats.events.length === 0 ? '<tr><td colspan="5" style="color:#8891a4;padding:.8rem .6rem">Nessun evento ancora</td></tr>' : ''}
</table>
</body></html>`;

  res.send(html);
});

app.listen(PORT, () => console.log(`Server avviato su porta ${PORT}`));
