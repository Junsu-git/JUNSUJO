/**
 * PORTFOLIO OBJECT-ORIENTED JAVASCRIPT SYSTEM (2026)
 * - ThemeManager: Handles Light / Dark / System Mode preferences across all pages
 * - TocTracker: Implements Vertical On-This-Page Scroll Tracking Rail (Image 3)
 * - ProjectFilterManager: Handles Tab filtering across unified projects & assignments
 * - SidebarScrollSpy: Active state synchronization for Sticky Sidebar & Nav (Image 2)
 */

class ThemeManager {
  constructor() {
    this.STORAGE_KEYS = ["junsu_portfolio_theme", "theme-preference"];
    this.currentTheme = "system"; // 'light' | 'dark' | 'system'
    this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    this.init();
  }

  init() {
    // 1. Retrieve saved theme from either key or fallback to system
    let saved = null;
    for (const key of this.STORAGE_KEYS) {
      const val = localStorage.getItem(key);
      if (val === "light" || val === "dark" || val === "system") {
        saved = val;
        break;
      }
    }
    this.currentTheme = saved || "system";

    // 2. Apply theme
    this.applyTheme(this.currentTheme);

    // 3. Listen for OS theme changes
    if (this.mediaQuery.addEventListener) {
      this.mediaQuery.addEventListener("change", () => {
        if (this.currentTheme === "system") {
          this.applyTheme("system");
        }
      });
    }

    // 4. Bind theme toggle buttons
    this.bindButtons();
  }

  setTheme(newTheme) {
    if (!["light", "dark", "system"].includes(newTheme)) return;
    this.currentTheme = newTheme;
    for (const key of this.STORAGE_KEYS) {
      localStorage.setItem(key, newTheme);
    }
    this.applyTheme(newTheme);
    this.updateButtonsUI();
  }

  applyTheme(theme) {
    const root = document.documentElement;
    if (theme === "system") {
      const isSystemDark = this.mediaQuery.matches;
      root.setAttribute("data-theme", isSystemDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", theme);
    }
    this.updateButtonsUI();
  }

  updateButtonsUI() {
    const buttons = document.querySelectorAll("[data-theme-set], .theme-toggle-btn[data-theme], .theme-fab-sphere");
    buttons.forEach((btn) => {
      const target = btn.getAttribute("data-theme-set") || btn.getAttribute("data-theme");
      if (target === this.currentTheme) {
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      }
    });

    // Update FAB trigger icon based on applied theme
    const fabTriggerIcon = document.querySelector(".fab-current-icon");
    if (fabTriggerIcon) {
      if (this.currentTheme === "light") {
        fabTriggerIcon.textContent = "☀️";
      } else if (this.currentTheme === "dark") {
        fabTriggerIcon.textContent = "🌙";
      } else {
        fabTriggerIcon.textContent = "💻";
      }
    }
  }

  bindButtons() {
    document.addEventListener("click", (e) => {
      // 1. FAB Trigger Toggle
      const trigger = e.target.closest(".theme-fab-trigger");
      const fabContainer = document.querySelector(".floating-theme-fab");
      if (trigger && fabContainer) {
        e.stopPropagation();
        fabContainer.classList.toggle("open");
        return;
      }

      // 2. Click on Theme Buttons or Spheres
      const btn = e.target.closest("[data-theme-set], .theme-toggle-btn[data-theme], .theme-fab-sphere");
      if (btn) {
        const targetTheme = btn.getAttribute("data-theme-set") || btn.getAttribute("data-theme");
        if (targetTheme) {
          this.setTheme(targetTheme);
          if (fabContainer) {
            fabContainer.classList.remove("open");
          }
        }
        return;
      }

      // 3. Outside Click Closes FAB
      if (fabContainer && !fabContainer.contains(e.target)) {
        fabContainer.classList.remove("open");
      }
    });
    this.updateButtonsUI();
  }
}

class TocTracker {
  constructor(options = {}) {
    this.containerSelectors = [".toc-rail-list", ".toc-track-line", ".toc-rail-container"];
    this.linkSelectors = [".toc-rail-link", ".toc-item-link"];
    this.activeClass = options.activeClass || "active";
    this.init();
  }

  init() {
    let container = null;
    for (const sel of this.containerSelectors) {
      const el = document.querySelector(sel);
      if (el) {
        container = el;
        break;
      }
    }
    if (!container) return;

    this.links = Array.from(document.querySelectorAll(this.linkSelectors.join(",")));
    if (this.links.length === 0) return;

    // Collect targeted section elements by their IDs referenced in links
    const targetIds = this.links
      .map(link => {
        const href = link.getAttribute("href");
        return href && href.startsWith("#") ? href.slice(1) : null;
      })
      .filter(Boolean);

    this.sections = targetIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (this.sections.length === 0) return;

    this.setupObserver();
    this.bindClicks();
  }

  setupObserver() {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -65% 0px",
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          this.setActiveLink(id);
        }
      });
    }, observerOptions);

    this.sections.forEach((sec) => observer.observe(sec));
  }

  setActiveLink(id) {
    this.links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${id}`) {
        link.classList.add(this.activeClass);
      } else {
        link.classList.remove(this.activeClass);
      }
    });
  }

  bindClicks() {
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const href = link.getAttribute("href");
        if (href && href.startsWith("#")) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.pushState(null, null, href);
            this.setActiveLink(href.slice(1));
          }
        }
      });
    });
  }
}

class ProjectFilterManager {
  constructor(options = {}) {
    this.containerSelectors = ["#projects", "#projects-unified", ".projects-archive-section"];
    this.tabSelectors = [".filter-tab-btn", ".tab-btn", ".project-filter-btn"];
    this.cardSelectors = [".project-unified-card", ".portfolio-card"];
    this.init();
  }

  init() {
    let container = null;
    for (const sel of this.containerSelectors) {
      const el = document.querySelector(sel);
      if (el) {
        container = el;
        break;
      }
    }
    if (!container) return;

    const tabs = Array.from(container.querySelectorAll(this.tabSelectors.join(",")));
    const cards = Array.from(container.querySelectorAll(this.cardSelectors.join(",")));

    if (tabs.length === 0 || cards.length === 0) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.getAttribute("data-filter") || "all";
        cards.forEach((card) => {
          const category = card.getAttribute("data-category") || "";
          if (filter === "all" || category.includes(filter)) {
            card.style.display = "flex";
            card.style.animation = "fadeIn 280ms ease";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }
}

class SidebarScrollSpy {
  constructor() {
    this.navItems = Array.from(document.querySelectorAll(".sidebar-nav-item, .sidebar-nav a"));
    this.sections = Array.from(document.querySelectorAll("section[id], [data-nav-section][id], div[id].portfolio-section"));
    if (this.navItems.length > 0 && this.sections.length > 0) {
      this.init();
    }
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          this.navItems.forEach((item) => {
            const href = item.getAttribute("href");
            if (href === `#${currentId}`) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    }, { rootMargin: "-20% 0px -65% 0px" });

    this.sections.forEach((sec) => observer.observe(sec));
  }
}

// Global bootstrap on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.portfolioTheme = new ThemeManager();
  window.portfolioToc = new TocTracker();
  window.portfolioFilter = new ProjectFilterManager();
  window.portfolioSidebarSpy = new SidebarScrollSpy();
});
