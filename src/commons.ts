import { Splide } from '@splidejs/splide';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Swiper } from 'swiper';

gsap.registerPlugin(ScrollTrigger);
window.addEventListener('DOMContentLoaded', (event) => {
  // Split text into spans
  const typeSplit = new SplitType('[text-split]', {
    types: 'words, chars',
    tagName: 'span',
  });

  // Link timelines to scroll position
  function createScrollTrigger(triggerElement, timeline) {
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top bottom',
      onLeaveBack: () => {
        timeline.progress(0);
        timeline.pause();
      },
    });
    ScrollTrigger.create({
      trigger: triggerElement,
      start: 'top 80%',
      onEnter: () => timeline.play(),
    });
  }

  $('[scrub-each-word]').each(function (index) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
        end: 'bottom 80%',
        scrub: 0.5,
      },
    });
    tl.from($(this).find('.word'), {
      opacity: 0.2,
      duration: 0.4,
      ease: 'power1.out',
      stagger: { each: 0.4 },
    });
  });

  // Avoid flash of unstyled content
  gsap.set('[text-split]', { opacity: 1 });
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Page loader animation
function pageloader() {
  const pageloaderTL = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power2.out' },
  });

  pageloaderTL
    .to('.pageload_logo', { opacity: 0 })
    .to('.pageload_bar', { height: '0%', ease: 'power1.inOut', stagger: { amount: 0.3 } }, 0)
    .to('.pageload_component', { autoAlpha: 0 });
}

// Home page load animation
function homePageLoad() {
  const homePageLoadTl = gsap.timeline({
    defaults: { duration: 0.8, ease: 'power2.out' },
  });

  homePageLoadTl
    .to("[hero-element='component']", { opacity: 1 })
    .from(
      "[hero-element='heading'] .word",
      {
        yPercent: 60,
        opacity: 0,
        rotate: 3,
        stagger: 0.05,
        ease: 'power4.out',
      },
      0.25
    )
    .to("[hero-element='image']", { scale: 1, duration: 1 }, 0)
    .from(
      "[hero-element='component'] .button",
      {
        yPercent: 100,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
      },
      '0.5'
    );
}

// Kits interaction animation
function kitsInteraction() {
  gsap.utils.toArray('.kits_list').forEach((list) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: list,
          start: 'top 70%',
          end: 'bottom center',
          toggleActions: 'play none none none',
        },
      })
      .from(list.querySelectorAll('.kits_item-box'), {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      });
  });

  gsap.to('.community_bg-image', {
    scale: 1.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.section_community',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      anticipatePin: 1,
      fastScrollEnd: true,
      smoothTouch: true,
      onUpdate: (self) => {
        if (self.progress % 0.05 === 0) {
          gsap.set('.community_bg-image', { force3D: true });
        }
      },
    },
  });

  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '.section_location',
      start: 'top 70%',
      toggleActions: 'play none none none',
    },
  });

  masterTimeline
    .from('[data-stagger]', {
      duration: 1,
      yPercent: 60,
      opacity: 0,
      stagger: 0.15,
      ease: 'power2.out',
    })
    .from(
      '.is--location',
      {
        duration: 1,
        opacity: 0,
        scale: 0.95,
        stagger: 0.1,
        ease: 'power2.out',
      },
      '<0.5'
    );
}

// Flexible interaction animation (commented out)
function flexibleInteraction() {
  // Uncomment and modify as needed
}

// Run animations after window load
window.addEventListener('load', () => {
  homePageLoad();
  pageloader();
  kitsInteraction();
  flexibleInteraction();
});

let heroSlider;

function initHeroSlider() {
  if (window.innerWidth > 767 && !heroSlider) {
    heroSlider = new Swiper('.swiper1', {
      direction: 'horizontal',
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 16,
      loop: false,
      centeredSlides: false,
      mousewheel: { forceToAxis: true },
      speed: 300,
      breakpoints: {
        992: { slidesPerView: 3 },
      },
      pagination: {
        el: '.hero-slider-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.button-next',
        prevEl: '.button-prev',
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });
  } else if (window.innerWidth <= 767 && heroSlider) {
    heroSlider.destroy(true, true);
    heroSlider = null;
  }
}

// Initialize on load
initHeroSlider();

// Re-check on window resize
window.addEventListener('resize', initHeroSlider);

let swiper2;

function initSwiper() {
  if (window.innerWidth > 480) {
    if (!swiper2) {
      swiper2 = new Swiper('.swiper2', {
        slidesPerView: 2,
        slidesPerGroup: 1,
        grabCursor: true,
        a11y: false,
        spaceBetween: 8,
        allowTouchMove: true,
        navigation: {
          nextEl: "[data-swiper-button='next']",
          prevEl: "[data-swiper-button='prev']",
        },
        breakpoints: {
          481: {
            slidesPerView: 1.1,
            slidesPerGroup: 1,
            spaceBetween: 8,
          },
          767: {
            slidesPerView: 2.5,
            slidesPerGroup: 1,
            spaceBetween: 8,
          },
          992: {
            slidesPerView: 2.5,
            slidesPerGroup: 1,
            spaceBetween: 8,
          },
        },
      });
    }
  } else if (swiper2) {
    swiper2.destroy(true, true);
    swiper2 = null;
  }
}

initSwiper();
window.addEventListener('resize', initSwiper);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.section_opinion').forEach((element) => {
    new Swiper(element.querySelector('.opinion'), {
      direction: 'vertical',
      slidesPerView: 1,
      spaceBetween: 20,
      autoHeight: true,
      speed: 500,
      navigation: {
        nextEl: element.querySelector('.swiper-next'),
        prevEl: element.querySelector('.swiper-prev'),
        disabledClass: 'is-disabled',
      },
      pagination: {
        el: element.querySelector('.swiper-bullet-wrapper'),
        clickable: true,
        bulletClass: 'swiper-bullet',
        bulletActiveClass: 'is-active',
      },
      slideActiveClass: 'is-active',
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      mousewheel: true,
    });
  });
});

function staggerAnimate(triggerSelector, staggerSelector, customSettings = {}) {
  const defaultSettings = {
    triggerStart: 'top 70%',
    duration: 1,
    yPercent: 60,
    stagger: 0.15,
    ease: 'power2.out',
  };

  const settings = { ...defaultSettings, ...customSettings };

  gsap.from(staggerSelector, {
    scrollTrigger: {
      trigger: triggerSelector,
      start: settings.triggerStart,
      toggleActions: 'play none none none',
    },
    duration: settings.duration,
    yPercent: settings.yPercent,
    opacity: 0,
    stagger: settings.stagger,
    ease: settings.ease,
  });
}

// Usage
$(document).ready(function () {
  staggerAnimate('.section_ame');
  staggerAnimate('.section_other');
  staggerAnimate('.section_products');
  // staggerAnimate(".section_opinion");
  staggerAnimate('.section_marquee');
  staggerAnimate('.section_explore');
});

// Initialize Splide slider
new Splide('.amenities', {
  type: 'loop',
  autoWidth: true,
  height: 'auto',
  drag: 'free',
  arrows: false,
  pagination: false,
  label: 'Image Slider',
  reduceMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: 'pause',
  },
  autoScroll: {
    speed: 0.6,
  },
  breakpoints: {
    991: { autoScroll: { speed: 0.6 } },
    767: { autoScroll: { speed: 0.6 } },
  },
}).mount(window.splide.Extensions);

// Staggered animation for links
const staggerLinks = document.querySelectorAll('[stagger-link]');
staggerLinks.forEach((link) => {
  const letters = link.querySelectorAll('.char');
  link.addEventListener('mouseenter', function () {
    gsap.to(letters, {
      yPercent: -100,
      duration: 0.5,
      ease: 'power4.inOut',
      stagger: { each: 0.03, from: 'start' },
      overwrite: true,
    });
  });
  link.addEventListener('mouseleave', function () {
    gsap.to(letters, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power4.inOut',
      stagger: { each: 0.03, from: 'random' },
    });
  });
});

let splitInstance;

function initializeTextSplit() {
  // Initialize the text splitting on elements with the data-split-text attribute
  splitInstance = new SplitType('[data-split-text]', {
    types: 'lines, words, chars',
    tagName: 'span',
  });
}

initializeTextSplit(); // Initialize splitting on page load

// Track the current window width
let currentWindowWidth = window.innerWidth;

// Handle the window resize event
window.addEventListener('resize', function () {
  if (currentWindowWidth !== window.innerWidth) {
    // Update current window width
    currentWindowWidth = window.innerWidth;

    // If splitInstance is defined, revert the split before reinitializing
    if (splitInstance) {
      splitInstance.revert();
    }

    // Reinitialize the text splitting after reverting
    initializeTextSplit();
  }
});
