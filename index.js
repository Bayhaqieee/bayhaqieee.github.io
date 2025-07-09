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

    // Reset visibility for all cards before applying filters
    projectCards.hide();

    if (primaryFilterValue === 'tech') {
      secondaryFilters.removeClass('hidden');
      secondaryFilters.find('.filter-btn').removeClass('active'); // Reset secondary filters
      projectCards.filter('[data-category="tech"]').show();
    } else {
      secondaryFilters.addClass('hidden');
      if (primaryFilterValue === 'all') {
        projectCards.show();
      } else {
        projectCards.filter(`[data-category="${primaryFilterValue}"]`).show();
      }
    }
  });

  secondaryFilters.find('.filter-btn').on('click', function() {
    secondaryFilters.find('.filter-btn').removeClass('active');
    $(this).addClass('active');
    const secondaryFilterValue = $(this).data('filter');
    projectCards.hide().filter(`[data-focus="${secondaryFilterValue}"]`).show();
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
    skillFilterBtns.removeClass('active');
    $(this).addClass('active');

    const filter = $(this).data('filter');

    skillCategories.each(function() {
        const category = $(this).data('category');
        if (filter === 'all' || category === filter) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
  });

  // --- Certification Category Filtering (NEW) ---
  const certFilterBtns = $('#cert-filters .cert-filter-btn');
  const certItems = $('#certifications-container .cert-item');

  certFilterBtns.on('click', function() {
    certFilterBtns.removeClass('active');
    $(this).addClass('active');

    const filterValue = $(this).data('filter');

    certItems.each(function() {
      const itemCategory = $(this).data('category');
      if (filterValue === 'all' || itemCategory === filterValue) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });


  // --- Function to sync card heights (CORRECTED) ---
  function syncCardHeights() {
    const grid = $('.activities-grid');
    
    if (window.innerWidth > 1024) {
      // --- Row 1: Activities & Skills ---
      const activitiesBox = grid.find('.content-box:nth-child(1)');
      const skillsBox = grid.find('.content-box:nth-child(2)');
      
      // Reset heights to auto to get the natural height
      activitiesBox.css('height', 'auto');
      skillsBox.css('height', 'auto');
      
      // Find the minimum height in the first row
      const minHeight1 = Math.min(activitiesBox.outerHeight(), skillsBox.outerHeight());
      
      // Apply the min height to both boxes
      activitiesBox.css('height', minHeight1);
      skillsBox.css('height', minHeight1);

      // --- Row 2: Education & Certifications ---
      const educationBox = grid.find('.content-box:nth-child(3)');
      const certsBox = grid.find('.content-box:nth-child(4)');

      // Reset heights to auto
      educationBox.css('height', 'auto');
      certsBox.css('height', 'auto');
      
      // Find the minimum height in the second row
      const minHeight2 = Math.min(educationBox.outerHeight(), certsBox.outerHeight());

      // Apply the min height to both boxes
      educationBox.css('height', minHeight2);
      certsBox.css('height', minHeight2);

    } else {
      // On smaller screens, reset all heights to auto
      grid.find('.content-box').css('height', 'auto');
    }
  }

  // --- Certificate Card Navigation ---
  $('#certifications-container').on('click', '.cert-item', function() {
    const url = $(this).data('gdrive-url');
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  });


  // Initial and resize calls for height syncing
  $(window).on('load', function() {
      syncCardHeights();
  });

  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncCardHeights, 100);
  });

});