/* Shared behavior for the home page and all project / study pages. */
(function () {
  'use strict';
  const validTheme = value => ['light', 'dark', 'system'].includes(value);

  class ThemeManager {
    constructor() {
      this.state = window.portfolioThemeState || {key:'junsu_portfolio_theme', preference:'system', media:matchMedia('(prefers-color-scheme: dark)')};
      this.fab = document.querySelector('.floating-theme-fab');
      this.trigger = this.fab?.querySelector('.theme-fab-trigger');
      this.options = this.fab?.querySelector('.theme-fab-spheres');
      this.buttons = [...document.querySelectorAll('[data-theme-set]')];
      this.apply();
      this.setOpen(false);
      this.trigger?.addEventListener('click', () => {
        const open = !this.fab.classList.contains('open');
        this.setOpen(open);
        if (open) requestAnimationFrame(() => {
          if (this.fab.classList.contains('open')) this.options.querySelector('button')?.focus({preventScroll:true});
        });
      });
      this.buttons.forEach(button => button.addEventListener('click', () => {
        this.setTheme(button.dataset.themeSet);
        this.setOpen(false, true);
      }));
      document.addEventListener('click', event => {
        if (this.fab && !this.fab.contains(event.target)) this.setOpen(false);
      });
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && this.fab?.classList.contains('open')) this.setOpen(false, true);
      });
      document.addEventListener('focusin', event => {
        if (this.fab && !this.fab.contains(event.target)) this.setOpen(false);
      });
      this.state.media.addEventListener('change', () => {
        if (this.state.preference === 'system') this.apply();
      });
      window.addEventListener('storage', event => {
        if (event.key === this.state.key || event.key === null) {
          this.state.preference = validTheme(event.newValue) ? event.newValue : 'system';
          this.apply();
        }
      });
      window.addEventListener('pageshow', () => {
        try {
          const stored = localStorage.getItem(this.state.key);
          this.state.preference = validTheme(stored) ? stored : 'system';
        } catch { /* Preserve the in-memory selection. */ }
        this.apply();
      });
    }
    setTheme(theme) {
      if (!validTheme(theme)) return;
      this.state.preference = theme;
      try { localStorage.setItem(this.state.key, theme); } catch { /* Selection still works on this page. */ }
      this.apply();
    }
    apply() {
      const resolved = this.state.preference === 'system' ? (this.state.media.matches ? 'dark' : 'light') : this.state.preference;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themePreference = this.state.preference;
      this.buttons.forEach(button => {
        const active = button.dataset.themeSet === this.state.preference;
        button.classList.toggle('active', active);
        button.setAttribute('aria-pressed', String(active));
      });
      const selected = this.buttons.find(button => button.dataset.themeSet === this.state.preference);
      const icon = this.trigger?.querySelector('.fab-current-icon');
      if (icon && selected?.querySelector('svg')) icon.replaceChildren(selected.querySelector('svg').cloneNode(true));
      const labels = {light:'라이트', dark:'다크', system:'시스템'};
      this.trigger?.setAttribute('aria-label', `테마 설정: ${labels[this.state.preference]} 모드`);
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', resolved === 'dark' ? '#171819' : '#fafaf8');
    }
    setOpen(open, restoreFocus = false) {
      if (!this.fab || !this.options) return;
      this.fab.classList.toggle('open', open);
      document.body.classList.toggle('theme-fab-expanded', open);
      const backToTop = document.querySelector('.floating-back-to-top');
      if (backToTop) {
        const shift = open ? (this.options.offsetHeight + 12) : 0;
        backToTop.style.setProperty('--fab-shift', shift + 'px');
      }
      this.trigger.setAttribute('aria-expanded', String(open));
      this.options.setAttribute('aria-hidden', String(!open));
      this.options.inert = !open;
      this.options.querySelectorAll('button').forEach(button => button.tabIndex = open ? 0 : -1);
      if (restoreFocus) this.trigger.focus({preventScroll:true});
    }
  }

  function revealTarget(target) {
    const pane = target.closest('.tab-pane, .tab-content-panel');
    if (pane && !pane.classList.contains('active')) {
      const button = [...document.querySelectorAll('[data-tab], .tab-switch-btn[aria-controls]')].find(item => (item.dataset.tab || item.getAttribute('aria-controls')) === pane.id);
      if (button) button.click();
      else document.querySelectorAll('.tab-pane').forEach(item => item.classList.toggle('active', item === pane));
    }
    for (let parent = target.parentElement; parent; parent = parent.parentElement) {
      if (parent.tagName === 'DETAILS') parent.open = true;
    }
  }
  function initNavigation() {
    const links = [...document.querySelectorAll('.toc-item-link, .toc-rail-link, .sidebar-nav-item')];
    const targets = links.map(link => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
    const mark = target => links.forEach(link => {
      const active = link.hash === '#' + target.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
    const navigate = (target, smooth) => {
      revealTarget(target);
      requestAnimationFrame(() => {
        target.scrollIntoView({behavior:smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant', block:'start'});
        target.setAttribute('tabindex', '-1');
        target.focus({preventScroll:true});
        mark(target);
      });
    };
    links.forEach(link => link.addEventListener('click', event => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, '', link.hash);
      navigate(target, true);
    }));
    const jumpToHash = () => {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) navigate(target, false);
    };
    window.addEventListener('hashchange', jumpToHash);
    if (location.hash) jumpToHash();
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
        if (visible[0]) mark(visible[0].target);
      }, {rootMargin:'-18% 0px -60% 0px'});
      targets.forEach(target => observer.observe(target));
    }
  }
  function initTabs() {
    const buttons = [...document.querySelectorAll('button[data-tab]')];
    buttons.forEach(button => {
      button.setAttribute('role', 'tab');
      button.parentElement.setAttribute('role', 'tablist');
      const pane = document.getElementById(button.dataset.tab);
      if (!pane) return;
      button.id ||= 'tab-control-' + pane.id;
      button.setAttribute('aria-controls', pane.id);
      pane.setAttribute('role', 'tabpanel');
      pane.setAttribute('aria-labelledby', button.id);
      const update = () => buttons.forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
        item.tabIndex = active ? 0 : -1;
        document.getElementById(item.dataset.tab)?.classList.toggle('active', active);
      });
      button.setAttribute('aria-selected', String(button.classList.contains('active')));
      button.tabIndex = button.classList.contains('active') ? 0 : -1;
      button.addEventListener('click', update);
      button.addEventListener('keydown', event => {
        const index = buttons.indexOf(button);
        let next;
        if (event.key === 'ArrowRight') next = buttons[(index + 1) % buttons.length];
        if (event.key === 'ArrowLeft') next = buttons[(index - 1 + buttons.length) % buttons.length];
        if (event.key === 'Home') next = buttons[0];
        if (event.key === 'End') next = buttons.at(-1);
        if (next) { event.preventDefault(); next.click(); next.focus(); }
      });
    });
  }
  function initBackToTop() {
    let btn = document.querySelector('.floating-back-to-top');
    if (!btn) {
      btn = document.createElement('button');
      btn.className = 'floating-back-to-top';
      btn.id = 'floatingBackToTop';
      btn.type = 'button';
      btn.setAttribute('aria-label', '페이지 최상단으로 이동');
      btn.setAttribute('title', '맨 위로 가기');
      btn.innerHTML = `
        <span class="mono-icon mono-icon-stroke">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 15l-6-6-6 6"></path>
          </svg>
        </span>
        <span class="back-to-top-tooltip">맨 위로</span>
      `;
      const fab = document.querySelector('.floating-theme-fab');
      if (fab && fab.parentNode) {
        fab.parentNode.insertBefore(btn, fab);
      } else {
        document.body.appendChild(btn);
      }
    }
    const update = () => {
      const show = window.scrollY > 200;
      btn.classList.toggle('visible', show);
      btn.tabIndex = show ? 0 : -1;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    btn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
      const topTarget = document.querySelector('#main-content, main');
      if (topTarget) {
        // Keep keyboard navigation near the content without revealing the skip link.
        if (!topTarget.hasAttribute('tabindex')) topTarget.setAttribute('tabindex', '-1');
        topTarget.focus({ preventScroll: true });
      }
    });
  }
  function initEmailCopy() {
    const buttons = [...document.querySelectorAll('[data-copy-email]')];
    if (!buttons.length) return;
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.setAttribute('aria-atomic', 'true');
    document.body.appendChild(toast);
    let hideTimer;
    let clearTimer;
    let request = 0;
    function notify(message) {
      clearTimeout(hideTimer);
      clearTimeout(clearTimer);
      toast.textContent = message;
      toast.classList.add('is-visible');
      hideTimer = setTimeout(() => {
        toast.classList.remove('is-visible');
        clearTimer = setTimeout(() => { toast.textContent = ''; }, 200);
      }, 2400);
    }
    function legacyCopy(email) {
      const active = document.activeElement;
      const selection = window.getSelection();
      const ranges = selection ? Array.from({length:selection.rangeCount}, (_, index) => selection.getRangeAt(index).cloneRange()) : [];
      const field = document.createElement('textarea');
      field.dataset.copyHelper = '';
      field.value = email;
      field.readOnly = true;
      field.tabIndex = -1;
      field.className = 'email-copy-helper';
      document.body.appendChild(field);
      try {
        field.focus({preventScroll:true});
        field.select();
        return document.execCommand('copy');
      } finally {
        field.remove();
        active?.focus({preventScroll:true});
        if (selection) {
          selection.removeAllRanges();
          ranges.forEach(range => selection.addRange(range));
        }
      }
    }
    buttons.forEach(button => button.addEventListener('click', async () => {
      const current = ++request;
      const email = button.dataset.copyEmail;
      let copied = false;
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch {
        try { copied = legacyCopy(email); } catch { /* Report failure instead of a false success. */ }
      }
      if (current === request) notify(copied ? '이메일이 복사되었습니다!' : '복사하지 못했습니다. 연락처의 주소를 직접 복사해 주세요.');
    }));
  }
  document.addEventListener('DOMContentLoaded', () => {
    window.portfolioTheme = new ThemeManager();
    initTabs();
    initNavigation();
    initBackToTop();
    initEmailCopy();
  }, {once:true});
})();
