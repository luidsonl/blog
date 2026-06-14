// Dark mode toggle logic
(function () {
  const html = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  const iconSun = document.getElementById('icon-sun');
  const iconMoon = document.getElementById('icon-moon');

  function applyTheme(isDark) {
    if (isDark) {
      html.classList.add('dark');
      if (iconSun) iconSun.classList.remove('hidden');
      if (iconMoon) iconMoon.classList.add('hidden');
    } else {
      html.classList.remove('dark');
      if (iconSun) iconSun.classList.add('hidden');
      if (iconMoon) iconMoon.classList.remove('hidden');
    }
  }

  // Set initial icon state (theme already applied by inline script in baseof.html)
  applyTheme(html.classList.contains('dark'));

  if (btn) {
    btn.addEventListener('click', function () {
      const isDark = !html.classList.contains('dark');
      applyTheme(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
})();
