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
    // Находим видео внутри текущего элемента
    const video = this.querySelector('video');

    if (video) {
      if (video.muted) {
        // Если видео было без звука, включаем звук
        video.muted = false;
        // Убираем класс 'muted'
        this.classList.remove('muted');
        // Перезапускаем видео с начала
        video.currentTime = 0;
        video.play();
      } else {
        // Если видео было со звуком, выключаем звук
        video.muted = true;
        // Возвращаем класс 'muted'
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
        // Возвращаем класс 'muted'
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

const quiz = document.querySelector('.quiz');
if (quiz) {
  const quizWrapper = quiz.querySelector('.quiz-wrapper');

  quizWrapper.addEventListener('click', function (event) {
    if (event.target.classList.contains('quiz-step__next')) {
      const currentStep = document.querySelector('.quiz-step.active');
      const nextStep = currentStep.nextElementSibling;

      if (nextStep && nextStep.classList.contains('quiz-step')) {
        currentStep.classList.remove('active');
        nextStep.classList.add('active');
      }
    }
  });
}
