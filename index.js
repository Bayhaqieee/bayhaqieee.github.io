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

  // --- Technical Skills View Toggle ---
  const skillToggleBtn = $('#skill-view-toggle');
  const skillsContainer = $('#skills-container');
  const iconGrid = $('#icon-grid');
  const iconList = $('#icon-list');

  skillToggleBtn.on('click', function() {
    // Toggle the class on the container to change the grid layout
    skillsContainer.toggleClass('show-names');
    
    // Toggle which icon is visible
    iconGrid.toggle();
    iconList.toggle();
  });

  // --- Function to sync card heights ---
  function syncCardHeights() {
    const grid = $('.activities-grid');
    
    // Only run this logic for screen widths where the grid is 2 columns
    if (window.innerWidth > 1024) {
      // --- Sync Row 1 ---
      const leftCardRow1 = grid.find('.content-box:nth-child(1)');
      const rightCardRow1 = grid.find('.content-box:nth-child(2)');
      
      // Get height from the left card
      const targetHeight1 = leftCardRow1.outerHeight();
      // Apply it to the right card
      rightCardRow1.css('height', targetHeight1);

      // --- Sync Row 2 ---
      const leftCardRow2 = grid.find('.content-box:nth-child(3)');
      const rightCardRow2 = grid.find('.content-box:nth-child(4)');

      // Get height from the left card in the second row
      const targetHeight2 = leftCardRow2.outerHeight();
      // Apply it to the right card in the second row
      rightCardRow2.css('height', targetHeight2);

    } else {
      // On smaller, single-column screens, let height be automatic
      grid.find('.content-box').css('height', 'auto');
    }
  }

  // Run the function on page load after a short delay to ensure rendering is complete
  setTimeout(function() {
      syncCardHeights();
  }, 100);

  // Re-run the function on window resize
  $(window).on('resize', function() {
    syncCardHeights();
  });

});