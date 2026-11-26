const toast = document.getElementById('toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 2800);
}

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

const rsvpButton = document.getElementById('rsvpButton');
rsvpButton.addEventListener('click', () => {
  const joined = rsvpButton.dataset.joined === 'true';
  rsvpButton.dataset.joined = String(!joined);
  rsvpButton.innerHTML = joined ? 'Count me in <span>↗</span>' : 'You’re on the list ✓';
  showToast(joined ? 'You’re no longer on the guest list.' : 'You’re on the list! See you at Autumn Afterglow.');
});

document.querySelectorAll('.map-pin').forEach((pin) => {
  pin.addEventListener('click', () => {
    const place = pin.dataset.place;
    document.getElementById('mapTooltip').textContent = place;
  });
});

let mapZoom = 1;
function updateMapZoom(direction) {
  mapZoom = Math.min(1.35, Math.max(.8, mapZoom + direction * .1));
  const grid = document.querySelector('.map-grid');
  const mapArt = document.getElementById('mapArt');
  grid.style.backgroundSize = `${43 * mapZoom}px ${43 * mapZoom}px`;
  mapArt.style.backgroundColor = mapZoom > 1 ? '#f2f0ea' : '#f5f3ee';
  document.getElementById('mapTooltip').textContent = `Map zoom ${Math.round(mapZoom * 100)}%`;
}
document.getElementById('zoomIn').addEventListener('click', () => updateMapZoom(1));
document.getElementById('zoomOut').addEventListener('click', () => updateMapZoom(-1));

document.querySelector('.map-layers').addEventListener('click', (event) => {
  const enabled = event.currentTarget.dataset.layers !== 'on';
  event.currentTarget.dataset.layers = enabled ? 'on' : 'off';
  document.querySelector('.map-grid').style.opacity = enabled ? '.25' : '.7';
  showToast(enabled ? 'Simplified map view on.' : 'All map details are back.');
});

document.querySelector('.map-search').addEventListener('click', () => {
  showToast('Try a pin to explore popular campus places.');
});

['appStore', 'playStore'].forEach((id) => {
  document.getElementById(id).addEventListener('click', (event) => {
    event.preventDefault();
    showToast('Campause is coming soon to your app store. Stay tuned!');
  });
});
