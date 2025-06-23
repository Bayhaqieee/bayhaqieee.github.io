$(document).ready(function () {
  // Typed.js setup
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

  // Project filter functionality
  const primaryFilters = $('#primary-filters .filter-btn');
  const secondaryFilters = $('#secondary-filters');
  const projectCards = $('.project-card');

  // --- Primary Filter Click ---
  primaryFilters.on('click', function() {
    // Set active class
    primaryFilters.removeClass('active');
    $(this).addClass('active');

    const primaryFilterValue = $(this).data('filter');

    // Show/hide secondary filters
    if (primaryFilterValue === 'tech') {
      secondaryFilters.removeClass('hidden');
      // Reset secondary filter to show all tech projects initially
      secondaryFilters.find('.filter-btn').removeClass('active');
    } else {
      secondaryFilters.addClass('hidden');
    }

    // Filter cards
    projectCards.each(function() {
      const cardCategory = $(this).data('category');
      
      if (primaryFilterValue === 'all' || cardCategory === primaryFilterValue) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });

  // --- Secondary Filter Click ---
  secondaryFilters.find('.filter-btn').on('click', function() {
    // Set active class for secondary buttons
    secondaryFilters.find('.filter-btn').removeClass('active');
    $(this).addClass('active');

    const secondaryFilterValue = $(this).data('filter');

    // Filter cards
    projectCards.each(function() {
      const cardCategory = $(this).data('category');
      const cardFocus = $(this).data('focus');

      // Only show cards that are 'tech' AND match the chosen focus
      if (cardCategory === 'tech' && cardFocus === secondaryFilterValue) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });
});