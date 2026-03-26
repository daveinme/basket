// Invia evento di tracking silenzioso al server
function track(type, match, photo) {
  fetch('/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, match, photo })
  }).catch(() => {}); // silenzioso, non blocca mai l'utente
}

// Costruisce URL R2 con encoding corretto degli spazi
function photoUrl(matchId, filename) {
  const encodedId  = encodeURIComponent(matchId);
  const encodedFile = encodeURIComponent(filename);
  return `${R2}/basket/${encodedId}/${encodedFile}`;
}

// Download forzato via fetch+blob (evita apertura in nuova tab)
async function downloadPhoto(url, filename) {
  try {
    const res  = await fetch(url);
    const blob = await res.blob();
    const a    = document.createElement('a');
    a.href     = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
  } catch {
    // Fallback: attributo download diretto
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    a.click();
  }
}

// ── Lightbox ────────────────────────────────────────────────
const lightbox     = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.hidden    = true;
lightbox.innerHTML = '<button class="lightbox-close" title="Chiudi">✕</button><img alt="">';
document.body.appendChild(lightbox);

const lbImg  = lightbox.querySelector('img');
const lbClose = lightbox.querySelector('.lightbox-close');

function openLightbox(src) {
  lbImg.src      = src;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.hidden = true;
  lbImg.src       = '';
  document.body.style.overflow = '';
}
lightbox.addEventListener('click', e => { if (e.target === lightbox || e.target === lbImg) closeLightbox(); });
lbClose.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// ── Homepage: griglia partite ────────────────────────────────
const grid    = document.getElementById('matchGrid');
const overlay = document.getElementById('overlay');
const gallery = document.getElementById('gallery');
const btnBack = document.getElementById('btnBack');
const titleEl = document.getElementById('overlayTitle');
const countEl = document.getElementById('photoCount');

PARTITE.forEach(match => {
  if (!match.photos.length) return; // partita senza foto ancora: nascosta
  const thumb = photoUrl(match.id, match.photos[0]);

  const card = document.createElement('div');
  card.className = 'match-card';
  card.innerHTML = `
    <img class="card-thumb" src="${thumb}" alt="${match.label}" loading="lazy">
    <div class="card-body">
      <div class="card-num">Partita ${match.num}</div>
      <div class="card-title">${match.label}</div>
      <div class="card-meta">${match.photos.length} foto</div>
    </div>`;

  card.addEventListener('click', () => { track('visit', match.id, null); openGallery(match); });
  grid.appendChild(card);
});

// ── Galleria partita ─────────────────────────────────────────
function openGallery(match) {
  titleEl.textContent = `Partita ${match.num} – ${match.label}`;
  countEl.textContent = `${match.photos.length} foto`;
  gallery.innerHTML   = '';

  match.photos.forEach(filename => {
    const url = photoUrl(match.id, filename);

    const item = document.createElement('div');
    item.className = 'photo-item';
    item.innerHTML = `
      <img src="${url}" alt="${filename}" loading="lazy">
      <div class="photo-footer">
        <span class="photo-name">${filename.replace(' copia.jpg', '')}</span>
        <button class="btn-dl" title="Scarica foto">⬇ Scarica</button>
      </div>`;

    item.querySelector('img').addEventListener('click', () => openLightbox(url));
    item.querySelector('.btn-dl').addEventListener('click', () => { track('download', match.id, filename); downloadPhoto(url, filename); });

    gallery.appendChild(item);
  });

  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

btnBack.addEventListener('click', () => {
  overlay.hidden = true;
  document.body.style.overflow = '';
});
