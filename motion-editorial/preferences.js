const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');
const score = document.getElementById('studioScore');
const soundButton = document.getElementById('soundToggle');

function showTheme() {
  const light = root.dataset.theme === 'light';
  themeButton.textContent = light ? 'Dark' : 'Light';
  themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
  themeButton.removeAttribute('aria-pressed');
}
showTheme();
themeButton.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('adoness-editorial-theme', root.dataset.theme); } catch {}
  showTheme();
});

function showSound() {
  soundButton.textContent = score.paused ? 'Sound off' : 'Sound on';
  soundButton.setAttribute('aria-pressed', String(!score.paused));
}
score.volume = 0.42;
score.addEventListener('play', showSound);
score.addEventListener('pause', showSound);
soundButton.addEventListener('click', async () => {
  if (!score.paused) {
    score.pause();
    return;
  }
  try { await score.play(); }
  catch { soundButton.textContent = 'Retry sound'; }
});
document.addEventListener('visibilitychange', () => { if (document.hidden) score.pause(); });
