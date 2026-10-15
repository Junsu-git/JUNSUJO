/* Main-only scroll navigation; detail-page TOCs keep their existing behavior. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    const links = [...document.querySelectorAll('.home-nav-link')];
    const sections = links.map(link => document.getElementById(link.hash.slice(1)));
    let scheduled = false;
    function mark(section) {
      links.forEach(link => {
        const selected = link.hash === '#' + section.id;
        link.classList.toggle('active', selected);
        if (selected) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }
    function update() {
      scheduled = false;
      let current = sections[0];
      const threshold = Math.min(180, innerHeight * .2);
      for (const section of sections) if (section.getBoundingClientRect().top <= threshold) current = section;
      if (scrollY + innerHeight >= document.documentElement.scrollHeight - 2) current = sections.at(-1);
      mark(current);
    }
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(update);
    }
    links.forEach((link, index) => link.addEventListener('click', event => {
      event.preventDefault();
      const section = sections[index];
      history.pushState(null, '', link.hash);
      section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
      section.setAttribute('tabindex', '-1');
      section.focus({preventScroll:true});
      mark(section);
      schedule();
    }));
    window.addEventListener('scroll', schedule, {passive:true});
    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    window.addEventListener('pageshow', schedule);
    schedule();
  }, {once:true});
})();
