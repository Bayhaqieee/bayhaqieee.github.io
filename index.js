$(document).ready(function () {
  // Typed.js setup for the animated text
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

  // --- Project Filter Functionality ---
  const primaryFilters = $('#primary-filters .filter-btn');
  const secondaryFilters = $('#secondary-filters');
  const projectCards = $('.project-card');

  // --- Primary Filter Click Handler ---
  primaryFilters.on('click', function() {
    // Manages the 'active' class for the main filter buttons
    primaryFilters.removeClass('active');
    $(this).addClass('active');

    const primaryFilterValue = $(this).data('filter');

    // Shows or hides the secondary filter group based on the primary selection
    if (primaryFilterValue === 'tech') {
      secondaryFilters.removeClass('hidden');
      // Resets the secondary filter to show all tech projects initially
      secondaryFilters.find('.filter-btn').removeClass('active');
    } else {
      secondaryFilters.addClass('hidden');
    }

    // Filters the project cards based on the selected primary category
    projectCards.each(function() {
      const cardCategory = $(this).data('category');
      
      if (primaryFilterValue === 'all' || cardCategory === primaryFilterValue) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });

  // --- Secondary Filter Click Handler ---
  secondaryFilters.find('.filter-btn').on('click', function() {
    // Manages the 'active' class for the secondary filter buttons
    secondaryFilters.find('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const secondaryFilterValue = $(this).data('filter');

    // Filters the project cards based on the selected secondary focus
    projectCards.each(function() {
      const cardCategory = $(this).data('category');
      const cardFocus = $(this).data('focus');

      // Only shows cards that are in the 'tech' category AND match the chosen focus
      if (cardCategory === 'tech' && cardFocus === secondaryFilterValue) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });

  // --- Quick Links Dropdown Functionality ---
  // UPDATED: Changed the selector to target the new class
  const dropdownToggle = $('.more-btn'); 
  const dropdownMenu = $('.dropdown-menu');

  // Toggles the dropdown menu's visibility when the 'More' button is clicked
  dropdownToggle.on('click', function(e) {
    e.stopPropagation(); // Prevents the document click from firing immediately
    dropdownMenu.toggleClass('show');
  });

  // Closes the dropdown menu if a click occurs anywhere outside of it
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.dropdown').length) {
      if (dropdownMenu.hasClass('show')) {
        dropdownMenu.removeClass('show');
      }
    }
  });

  // --- Scroll Animation ---
  const animatedElements = document.querySelectorAll('.scroll-animate');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.1 // The element is considered visible when 10% of it is in the viewport
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
});