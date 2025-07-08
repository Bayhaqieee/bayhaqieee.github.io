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


  // --- Function to sync card heights (CORRECTED LOGIC) ---
  function syncCardHeights() {
    const grid = $('.activities-grid');
    
    // Only run on desktop where grid has 2 columns
    if (window.innerWidth > 1024) {
      // --- Row 1: Activities & Skills ---
      const activitiesBox = grid.find('.content-box:nth-child(1)');
      const skillsBox = grid.find('.content-box:nth-child(2)');
      
      // Reset heights to auto to get the natural height of each element
      activitiesBox.css('height', 'auto');
      skillsBox.css('height', 'auto');
      
      // Find the minimum height in the first row
      const minHeight1 = Math.min(activitiesBox.outerHeight(), skillsBox.outerHeight());
      
      // Apply the min height to both boxes in the first row
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

      // Apply the min height to both boxes in the second row
      educationBox.css('height', minHeight2);
      certsBox.css('height', minHeight2);

    } else {
      // On smaller screens, reset all heights to auto to allow natural flow
      grid.find('.content-box').css('height', 'auto');
    }
  }

  // --- Certificate Modal Functionality ---
  const certModal = $('#cert-modal');
  const modalImage = $('#modal-cert-image');
  const closeModalBtn = $('.modal-close');
  const certItems = $('.cert-item');

  certItems.on('click', function() {
      // Get the certificate URL from the data attribute
      const certUrl = $(this).data('gdrive-url');
      // Create a placeholder URL with the certificate title
      const certTitle = $(this).find('.cert-title').text();
      const placeholderUrl = `https://placehold.co/1200x800/222831/eeeeee?text=${encodeURIComponent(certTitle)}`;
      
      // Use the placeholder for now. In a real scenario, you'd use certUrl.
      modalImage.attr('src', placeholderUrl); 
      certModal.css('display', 'flex');
  });

  // Function to close the modal
  function closeModal() {
      certModal.css('display', 'none');
      modalImage.attr('src', ''); // Clear src to prevent old image flashing on next open
  }

  // Event listener for the close button
  closeModalBtn.on('click', closeModal);

  // Event listener to close modal by clicking on the overlay
  certModal.on('click', function(e) {
      if ($(e.target).is(certModal)) {
          closeModal();
      }
  });
  
  // Event listener to close modal with the Escape key
  $(document).on('keydown', function(e) {
    if (e.key === "Escape" && certModal.css('display') === 'flex') {
      closeModal();
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