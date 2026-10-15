/* Runs before CSS on every page to prevent a theme flash. */
(function () {
  'use strict';
  const key = 'junsu_portfolio_theme';
  const valid = value => ['light', 'dark', 'system'].includes(value);
  let preference = 'system';
  try {
    const stored = localStorage.getItem(key);
    const legacy = localStorage.getItem('theme-preference');
    preference = valid(stored) ? stored : valid(legacy) ? legacy : 'system';
    if (!valid(stored) && valid(legacy)) localStorage.setItem(key, preference);
  } catch { /* System mode remains usable if storage is blocked. */ }
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  window.portfolioThemeState = { key, preference, media };
  document.documentElement.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
  document.documentElement.dataset.themePreference = preference;
})();
