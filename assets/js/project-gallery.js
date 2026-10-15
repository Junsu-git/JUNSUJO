/* Independent, manually controlled galleries. No autoplay or invented screenshots. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.project-gallery').forEach((gallery, galleryIndex) => {
      const slides = [...gallery.querySelectorAll('.gallery-slide')];
      const viewport = gallery.querySelector('.gallery-viewport');
      const previous = gallery.querySelector('[data-gallery-prev]');
      const next = gallery.querySelector('[data-gallery-next]');
      const dots = gallery.querySelector('.gallery-dots');
      const status = gallery.querySelector('.gallery-status');
      let current = 0;
      let pointerStart;
      const canNavigate = slides.length > 1;
      previous.disabled = next.disabled = !canNavigate;
      viewport.tabIndex = canNavigate ? 0 : -1;
      gallery.dataset.galleryCount = slides.length;
      gallery.querySelector('.gallery-empty').hidden = slides.length > 0;
      slides.forEach((slide, index) => {
        slide.id ||= `project-image-${galleryIndex + 1}-${index + 1}`;
        slide.setAttribute('role', 'group');
        slide.setAttribute('aria-roledescription', '슬라이드');
        slide.setAttribute('aria-label', `${index + 1} / ${slides.length}`);
        const img = slide.querySelector('img');
        if (img) {
          img.draggable = false;
          const showImageError = () => {
            // Retain navigation to the other images when one file is unavailable.
            img.hidden = true;
            const error = document.createElement('p');
            error.className = 'gallery-image-error';
            error.textContent = '이미지를 불러오지 못했습니다.';
            slide.querySelector('.gallery-image-error')?.remove();
            slide.append(error);
          };
          img.addEventListener('error', showImageError);
          if (img.complete && img.naturalWidth === 0) showImageError();
        }
        if (canNavigate) {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'gallery-dot';
          dot.setAttribute('aria-label', `${index + 1}번 이미지 보기`);
          dot.setAttribute('aria-controls', slide.id);
          dot.addEventListener('click', () => show(index));
          dots.append(dot);
        }
      });
      function show(index) {
        if (!slides.length) {
          status.textContent = '이미지 준비 중';
          return;
        }
        current = (index + slides.length) % slides.length;
        slides.forEach((slide, index) => {
          slide.hidden = index !== current;
          slide.inert = index !== current;
        });
        [...dots.children].forEach((dot, index) => dot.setAttribute('aria-pressed', String(index === current)));
        status.textContent = `${current + 1} / ${slides.length}`;
      }
      previous.addEventListener('click', () => show(current - 1));
      next.addEventListener('click', () => show(current + 1));
      gallery.addEventListener('keydown', event => {
        if (!canNavigate || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft') show(current - 1);
        if (event.key === 'ArrowRight') show(current + 1);
        if (event.key === 'Home') show(0);
        if (event.key === 'End') show(slides.length - 1);
      });
      viewport.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch' && canNavigate) pointerStart = {x:event.clientX, y:event.clientY, id:event.pointerId};
      });
      viewport.addEventListener('pointerup', event => {
        if (!pointerStart || event.pointerId !== pointerStart.id) return;
        const dx = event.clientX - pointerStart.x;
        const dy = event.clientY - pointerStart.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) show(current + (dx < 0 ? 1 : -1));
        pointerStart = undefined;
      });
      viewport.addEventListener('pointercancel', () => {pointerStart = undefined;});
      show(0);
    });
  }, {once:true});
})();
