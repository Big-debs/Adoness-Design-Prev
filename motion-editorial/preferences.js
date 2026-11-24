const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');

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
