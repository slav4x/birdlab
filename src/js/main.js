/* eslint-disable operator-linebreak */
/* eslint-disable no-inner-declarations */

const viewportFix = (width) => {
  const meta = document.querySelector('meta[name="viewport"]');
  meta.setAttribute('content', `user-scalable=no, width=${screen.width <= width ? width : 'device-width'}`);
};

viewportFix(375);

document.addEventListener('DOMContentLoaded', function () {
  const UPDATE = ({ target, x, y }) => {
    const bounds = target.getBoundingClientRect();
    target.style.setProperty('--x', x - bounds.left);
    target.style.setProperty('--y', y - bounds.top);
  };

  const BTNS = document.querySelectorAll('.hover');
  BTNS.forEach((BTN) => BTN.addEventListener('pointermove', UPDATE));
});

document.querySelectorAll('.reviews-item').forEach((item) => {
  item.addEventListener('click', function () {
    const video = this.querySelector('video');

    if (video) {
      if (video.muted) {
        video.muted = false;
        this.classList.remove('muted');
        video.currentTime = 0;
        video.play();
      } else {
        video.muted = true;
        this.classList.add('muted');
      }
    }
  });
});

const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
  const splide = new Splide('.hero-slider', {
    type: 'loop',
    gap: '10px',
    autoScroll: {
      autoStart: true,
      speed: 0.2,
      pauseOnHover: false,
      pauseOnFocus: false,
    },
    autoWidth: true,
  });
  splide.mount(window.splide.Extensions);
}

const reviewsSlider = document.querySelector('.reviews-slider');
if (reviewsSlider) {
  const splide = new Splide('.reviews-slider', {
    type: 'loop',
    gap: '-62px',
  });
  splide.mount();

  splide.on('move', function (e) {
    document.querySelectorAll('.reviews-item').forEach((item) => {
      const video = item.querySelector('video');

      if (video) {
        video.muted = true;
        item.classList.add('muted');
      }
    });
  });
}

const reviews = document.querySelector('.reviews');
if (reviews) {
  const closeReviews = reviews.querySelector('.reviews-close');
  closeReviews.addEventListener('click', () => {
    reviews.remove();
  });
}

document.querySelector('.quiz')?.addEventListener('click', function (event) {
  if (event.target.classList.contains('quiz-step__next')) {
    const currentStep = event.currentTarget.querySelector('.quiz-step.active');
    const nextStep = currentStep?.nextElementSibling;

    if (nextStep?.classList.contains('quiz-step')) {
      currentStep.classList.remove('active');
      nextStep.classList.add('active');
    }
  }
});
