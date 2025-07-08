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

  primaryFilters.on('click', function() {
    primaryFilters.removeClass('active');
    $(this).addClass('active');
    const primaryFilterValue = $(this).data('filter');
    if (primaryFilterValue === 'tech') {
      secondaryFilters.removeClass('hidden');
      secondaryFilters.find('.filter-btn').removeClass('active');
    } else {
      secondaryFilters.addClass('hidden');
    }
    projectCards.each(function() {
      const cardCategory = $(this).data('category');
      if (primaryFilterValue === 'all' || cardCategory === primaryFilterValue) {
        $(this).removeClass('hide');
      } else {
        $(this).addClass('hide');
      }
    });
  });

  secondaryFilters.find('.filter-btn').on('click', function() {
    secondaryFilters.find('.filter-btn').removeClass('active');
    $(this).addClass('active');
    const secondaryFilterValue = $(this).data('filter');
    projectCards.each(function() {
      const cardCategory = $(this).data('category');
      const cardFocus = $(this).data('focus');
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

  dropdownToggle.on('click', function(e) {
    e.stopPropagation();
    dropdownMenu.toggleClass('show');
  });

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
    threshold: 0.1
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
    skillsContainer.toggleClass('show-cards');
    iconGrid.toggle();
    iconList.toggle();
  });

  // --- Technical Skills Category Filtering ---
  const skillFilterBtns = $('.skill-filter-btn');
  const skillCategories = $('.skill-category');

  skillFilterBtns.on('click', function() {
    // Manage active state for buttons
    skillFilterBtns.removeClass('active');
    $(this).addClass('active');

    const filter = $(this).data('filter');

    // Show/hide categories based on filter
    skillCategories.each(function() {
        const category = $(this).data('category');
        if (filter === 'all' || category === filter) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
  });


  // --- Function to sync card heights ---
  function syncCardHeights() {
    const grid = $('.activities-grid');
    
    if (window.innerWidth > 1024) {
      // Row 1
      const activitiesBox = grid.find('.content-box:nth-child(1)');
      const skillsBox = grid.find('.content-box:nth-child(2)');
      activitiesBox.css('height', 'auto');
      skillsBox.css('height', 'auto');
      const targetHeight1 = activitiesBox.outerHeight();
      skillsBox.css('height', targetHeight1);

      // Row 2
      const educationBox = grid.find('.content-box:nth-child(3)');
      const certsBox = grid.find('.content-box:nth-child(4)');
      educationBox.css('height', 'auto');
      certsBox.css('height', 'auto');
      const targetHeight2 = educationBox.outerHeight();
      certsBox.css('height', targetHeight2);

    } else {
      grid.find('.content-box').css('height', 'auto');
    }
  }

  $(window).on('load', function() {
      syncCardHeights();
  });

  $(window).on('resize', function() {
    syncCardHeights();
  });

});