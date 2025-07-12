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
    projectCards.hide(); // Hide all cards first

    if (primaryFilterValue === 'tech') {
      secondaryFilters.removeClass('hidden');
      secondaryFilters.find('.filter-btn').removeClass('active');
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
  
  // --- Reusable Filter Dropdown Logic ---
  function setupFilterDropdown(dropdownId, itemSelector, categorySelector) {
    const dropdown = $(`#${dropdownId}`);
    const toggle = dropdown.find('.filter-dropdown-toggle');
    const menu = dropdown.find('.filter-dropdown-menu');
    const items = dropdown.find('.filter-dropdown-item');
    const contentToFilter = $(itemSelector);

    toggle.on('click', function(e) {
      e.stopPropagation();
      // Close other dropdowns
      $('.filter-dropdown-menu').not(menu).removeClass('show');
      $('.filter-dropdown').not(dropdown).removeClass('open');
      // Toggle current dropdown
      menu.toggleClass('show');
      dropdown.toggleClass('open');
    });

    items.on('click', function(e) {
      e.preventDefault();
      const filterValue = $(this).data('filter');
      const filterText = $(this).text();

      toggle.find('span').text(filterText);
      items.removeClass('active');
      $(this).addClass('active');

      contentToFilter.each(function() {
        const itemCategory = $(this).data(categorySelector);
        if (filterValue === 'all' || itemCategory === filterValue) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
      
      // --- Automatically close the dropdown after selection ---
      menu.removeClass('show');
      dropdown.removeClass('open');
    });
    
    $(document).on('click', function(e) {
        if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
            menu.removeClass('show');
            dropdown.removeClass('open');
        }
    });
  }

  // Initialize dropdowns
  setupFilterDropdown('skill-filters', '.skill-category', 'category');
  setupFilterDropdown('cert-filters', '#certifications-container .cert-item', 'category');

  // --- Function to sync card heights (CORRECTED) ---
  function syncCardHeights() {
    const grid = $('.activities-grid');
    
    if (window.innerWidth > 1024) {
      // --- Row 1: Activities & Skills ---
      const activitiesBox = grid.find('.content-box:nth-child(1)');
      const skillsBox = grid.find('.content-box:nth-child(2)');
      
      // Set height of right card to match left card
      skillsBox.height(activitiesBox.height());

      // --- Row 2: Education & Certifications ---
      const educationBox = grid.find('.content-box:nth-child(3)');
      const certsBox = grid.find('.content-box:nth-child(4)');
      
      // Set height of right card to match left card
      certsBox.height(educationBox.height());

    } else {
      // On smaller screens, reset all heights to auto
      grid.find('.content-box').css('height', 'auto');
    }
  }
  
  // --- Certificate Card Click Navigation ---
  $('#certifications-container').on('click', '.cert-item', function() {
    const url = $(this).data('gdrive-url');
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  });
  
  // --- START: NEW EXPERIENCE TIMELINE SCRIPT V3 ---
  const timelineItemsV3 = $('.timeline-item');
  const timelineCardsV3 = $('.timeline-card');
  const prevBtnV3 = $('#prev-btn');
  const nextBtnV3 = $('#next-btn');
  const progressLine = $('.timeline-line-progress');
  let currentIndexV3 = 0;

  function updateTimelineV3(newIndex) {
    const totalItems = timelineItemsV3.length;
    
    // Update timeline points and connectors
    timelineItemsV3.removeClass('active completed');
    for (let i = 0; i < totalItems; i++) {
        if (i < newIndex) {
            timelineItemsV3.eq(i).addClass('completed');
        } else if (i === newIndex) {
            timelineItemsV3.eq(i).addClass('active');
        }
    }

    // Update timeline cards
    timelineCardsV3.removeClass('active');
    timelineCardsV3.filter(`[data-step="${newIndex + 1}"]`).addClass('active');
    
    // Update progress line width
    const progressPercentage = (newIndex / (totalItems - 1)) * 100;
    progressLine.css('width', `${progressPercentage}%`);

    currentIndexV3 = newIndex;

    // Update button states
    prevBtnV3.prop('disabled', currentIndexV3 === 0);
    nextBtnV3.prop('disabled', currentIndexV3 === totalItems - 1);
  }

  nextBtnV3.on('click', function() {
    if (currentIndexV3 < timelineItemsV3.length - 1) {
      updateTimelineV3(currentIndexV3 + 1);
    }
  });

  prevBtnV3.on('click', function() {
    if (currentIndexV3 > 0) {
      updateTimelineV3(currentIndexV3 - 1);
    }
  });

  timelineItemsV3.on('click', function() {
    const newIndex = $(this).data('step') - 1;
    updateTimelineV3(newIndex);
  });

  // Initial setup
  updateTimelineV3(0);
  // --- END: NEW EXPERIENCE TIMELINE SCRIPT V3 ---


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