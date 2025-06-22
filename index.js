$(document).ready(function () {
  $('[data-toggle="popover"]').popover();

  var typed = new Typed("#typed", {
    strings: [
      "University Student",
      "Future",
      "Tech Expert",
      "Ambassador",
      "Star",
    ],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
  });

  // Carousel Functionality for Career Focus
  const carouselContainer = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  let currentSlideIndex = 0;
  let scrollStep = 0; // This will hold the width of one slide for scrolling

  // Function to calculate scroll step dynamically
  function calculateScrollStep() {
    if (slides.length > 0 && carouselContainer) {
      return carouselContainer.offsetWidth;
    }
    return 0;
  }

  // Generate dots dynamically
  // Clear existing dots first to avoid duplicates if re-initialized
  dotsContainer.innerHTML = ''; 
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) {
      dot.classList.add('active');
    }
    dot.dataset.slideIndex = index;
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot'); // Re-select dots after generation

  function updateCarousel() {
    scrollStep = calculateScrollStep(); // Recalculate before each scroll
    carouselContainer.scrollLeft = currentSlideIndex * scrollStep;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, index) => {
      if (index === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  prevButton.addEventListener('click', () => {
    currentSlideIndex = Math.max(0, currentSlideIndex - 1);
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentSlideIndex = Math.min(slides.length - 1, currentSlideIndex + 1);
    updateCarousel();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      currentSlideIndex = parseInt(e.target.dataset.slideIndex);
      updateCarousel();
    });
  });

  carouselContainer.addEventListener('scroll', () => {
    if (slides.length > 0) {
      scrollStep = calculateScrollStep(); // Recalculate for accurate rounding
      const newIndex = Math.round(carouselContainer.scrollLeft / scrollStep);
      if (newIndex !== currentSlideIndex) {
        currentSlideIndex = newIndex;
        updateDots();
      }
    }
  });

  window.addEventListener('load', () => {
    if (slides.length > 0) {
      scrollStep = calculateScrollStep(); // Initial calculation
      updateCarousel();
    }
  });
  
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        updateCarousel(); // Re-center the current slide after resize
    }, 250);
  });
});