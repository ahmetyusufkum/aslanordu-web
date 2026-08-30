'use strict';

const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    document.body.classList.toggle('menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Menüyü kapat' : 'Menüyü aç');
    toggle.textContent = isOpen ? '✕' : '☰';
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Menüyü aç');
    toggle.textContent = '☰';
  }));
}

const slider = document.querySelector('.academy-slider');

if (slider) {
  const track = slider.querySelector('.academy-track');
  const slides = [...slider.querySelectorAll('.academy-slide')];
  const previous = slider.querySelector('.slider-prev');
  const next = slider.querySelector('.slider-next');
  const count = slider.querySelector('.slider-count');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeSlide = 0;
  let autoplay;

  const showSlide = index => {
    activeSlide = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${activeSlide * 100}%)`;
    count.textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
  };

  const stopAutoplay = () => window.clearInterval(autoplay);
  const startAutoplay = () => {
    if (reducedMotion) return;
    stopAutoplay();
    autoplay = window.setInterval(() => showSlide(activeSlide + 1), 4200);
  };

  previous.addEventListener('click', () => { showSlide(activeSlide - 1); startAutoplay(); });
  next.addEventListener('click', () => { showSlide(activeSlide + 1); startAutoplay(); });
  slider.addEventListener('mouseenter', stopAutoplay);
  slider.addEventListener('mouseleave', startAutoplay);
  slider.addEventListener('focusin', stopAutoplay);
  slider.addEventListener('focusout', startAutoplay);
  startAutoplay();
}
