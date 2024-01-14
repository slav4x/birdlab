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

  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);

  document.querySelectorAll('.reviews-item').forEach((item) => {
    item.addEventListener('click', function () {
      const video = this.querySelector('video');

      if (item.parentNode.classList.contains('is-active')) {
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

  const reviews = document.querySelector('.reviews');
  if (reviews) {
    const closeReviews = reviews.querySelector('.reviews-close');
    const openReviews = document.querySelector('.reviews-open');

    closeReviews.addEventListener('click', () => {
      reviews.classList.toggle('hide');

      document.querySelectorAll('.reviews-item').forEach((item) => {
        const video = item.querySelector('video');

        if (video) {
          video.muted = true;
          item.classList.add('muted');
        }
      });
    });

    openReviews.addEventListener('click', () => {
      reviews.classList.toggle('hide');
    });

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

  document.querySelector('.quiz')?.addEventListener('click', function (event) {
    const isNext = event.target.classList.contains('quiz-step__next');
    const isPrev = event.target.classList.contains('quiz-step__prev');

    if (isNext || isPrev) {
      const currentStep = event.currentTarget.querySelector('.quiz-step.active');
      const targetStep = isNext ? currentStep?.nextElementSibling : currentStep?.previousElementSibling;

      if (targetStep?.classList.contains('quiz-step')) {
        currentStep.classList.remove('active');
        targetStep.classList.add('active');
      }
    }
  });

  let isOpen = false;

  const sidebarBurger = document.querySelector('.sidebar-burger');
  const sidebarMobile = document.querySelector('.sidebar-mobile');

  sidebarBurger.addEventListener('click', function () {
    isOpen = !isOpen;

    sidebarBurger.classList.toggle('open');
    sidebarMobile.classList.toggle('show');

    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  });

  const sidebarLinks = sidebarMobile.querySelectorAll('.sidebar-nav a');
  sidebarLinks.forEach((el) => {
    el.addEventListener('click', () => {
      sidebarBurger.classList.toggle('open');
      sidebarMobile.classList.toggle('show');
      document.body.style.overflow = 'visible';
    });
  });

  // Генерация случайного токена
  function generateToken() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var token = '';
    for (var i = 0; i < 30; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }

  // Установка токена в скрытое поле формы
  function setToken(form) {
    var token = generateToken();
    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 't';
    hiddenInput.value = token;
    form.appendChild(hiddenInput);
  }

  // Инициализация токена для каждой формы на странице
  var forms = document.getElementsByTagName('form');
  for (var i = 0; i < forms.length; i++) {
    setToken(forms[i]);
  }

  var formInit = document.querySelectorAll('form');
  formInit.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      const button = form.querySelector('button');

      button.style.opacity = 0.5;
      button.style.cursor = 'not-allowed';
      button.disabled = true;
      button.textContent = 'Отправка...';
    });
  });
});

window.addEventListener('resize', function () {
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
});
