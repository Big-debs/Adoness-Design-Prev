// Give each film one silent start and leave all subsequent playback to the viewer.
const stillness = matchMedia('(prefers-reduced-motion: reduce)');
const started = new WeakSet();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const {target: film, intersectionRatio} of entries) {
      if (intersectionRatio === 0) film.pause();
      if (intersectionRatio >= 0.5 && !stillness.matches && !started.has(film)) {
        started.add(film);
        film.play().catch(() => {});
      }
    }
  }, {threshold: [0, 0.5]});
  for (const film of document.querySelectorAll('.studio-film')) {
    film.addEventListener('play', () => started.add(film));
    observer.observe(film);
  }
}
