// =============================================
// HERO PARALLAX SCENE â€” scroll & mouse reactivity
// =============================================
(function() {
  const scene = document.getElementById('hero-scene');
  if (!scene) return;

  const layers = scene.querySelectorAll('.hero-layer[data-depth]');

  const SCALE = 0.45;

  let currentY = 0;
  let targetY  = 0;

  let currentMouseX = 0;
  let currentMouseY = 0;
  let targetMouseX  = 0;
  let targetMouseY  = 0;

  let raf = null;

  function onScroll() {
    targetY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onMouseMove(e) {
    const rect = scene.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Normalize mouse offset between -1 and 1
    targetMouseX = (e.clientX - rect.left - centerX) / centerX;
    targetMouseY = (e.clientY - rect.top - centerY) / centerY;
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function tick() {
    // Smooth lerp toward target scroll and mouse coordinates
    currentY += (targetY - currentY) * 0.12;
    currentMouseX += (targetMouseX - currentMouseX) * 0.08;
    currentMouseY += (targetMouseY - currentMouseY) * 0.08;

    layers.forEach(function(layer) {
      const depth = parseFloat(layer.dataset.depth) || 0;
      
      let dy = -(currentY * depth * SCALE);
      let dx = currentMouseX * depth * 18;
      let my = currentMouseY * depth * 12;

      // Smooth scroll parallax for front silhouette:
      // Follows scroll up and down smoothly with dynamic depth offset
      if (layer.id === 'layer-front-orange') {
        dy = -(currentY * 0.42);
      }

      layer.style.transform = 'translate3d(' + dx.toFixed(2) + 'px, ' + (dy + my).toFixed(2) + 'px, 0)';
    });

    const scrollDiff = Math.abs(targetY - currentY);
    const mouseDiff  = Math.abs(targetMouseX - currentMouseX) + Math.abs(targetMouseY - currentMouseY);

    if (scrollDiff > 0.05 || mouseDiff > 0.005) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = null;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  scene.addEventListener('mousemove', onMouseMove, { passive: true });

  scene.addEventListener('mouseleave', function() {
    targetMouseX = 0;
    targetMouseY = 0;
    if (!raf) raf = requestAnimationFrame(tick);
  });

  // Smooth scroll for the CTA button
  const cta = document.getElementById('hero-scroll-cta');
  if (cta) {
    cta.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('content-section');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
})();


// =============================================
// SIDEBAR HOVER / POP-OUT + PIN BEHAVIOUR
// =============================================
(function() {
  const sidebar = document.getElementById('sidebar');
  const trigger = document.getElementById('sidebar-trigger');
  const pinBtn  = document.getElementById('sidebar-pin-btn');
  if (!sidebar || !trigger) return;

  let closeTimer = null;
  let isPinned   = false;

  function openSidebar() {
    clearTimeout(closeTimer);
    sidebar.classList.add('sidebar-open');
  }

  function scheduledClose() {
    if (isPinned) return; // Don't close if pinned
    closeTimer = setTimeout(function() {
      sidebar.classList.remove('sidebar-open');
    }, 250);
  }

  // Hover-to-reveal
  trigger.addEventListener('mouseenter', openSidebar);
  trigger.addEventListener('mouseleave', scheduledClose);
  sidebar.addEventListener('mouseenter', openSidebar);
  sidebar.addEventListener('mouseleave', scheduledClose);

  // Pin / Unpin on button click
  if (pinBtn) {
    pinBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      isPinned = !isPinned;
      sidebar.classList.toggle('sidebar-pinned', isPinned);
      sidebar.classList.toggle('sidebar-open',   isPinned);
      pinBtn.setAttribute('title', isPinned ? 'Unpin sidebar' : 'Pin sidebar open');
    });
  }
})();

// =============================================
// QUICK-LINKS: SEQUENTIAL ROBOTIC ANIMATION + ACTIVE SECTION
// =============================================
(function() {
  const qlBar      = document.getElementById('quick-links');
  const collapseBtn = document.getElementById('ql-collapse-btn');
  const qlItems    = document.getElementById('ql-items');
  const arrowSvg   = collapseBtn ? collapseBtn.querySelector('svg') : null;

  if (!qlBar || !collapseBtn || !qlItems) return;

  let isOpen      = true;   // tracks current state
  let isAnimating = false;  // prevents overlapping animations

  /* â”€â”€ helpers â”€â”€ */
  function hideItems(cb) {
    qlItems.classList.add('items-hidden');
    if (arrowSvg) arrowSvg.style.transform = 'rotate(180deg)';
    // Wait for the CSS transition on #ql-items (max-height + opacity: 0.35s)
    setTimeout(cb, 350);
  }

  function showItems() {
    qlItems.classList.remove('items-hidden');
    if (arrowSvg) arrowSvg.style.transform = '';
  }

  /* â”€â”€ COLLAPSE: Phase 1 hide items â†’ Phase 2 slide to dock â”€â”€ */
  function collapse() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    // Phase 1 â€“ collapse items
    hideItems(function() {
      // Phase 2 â€“ mechanical slide to bottom-right dock
      qlBar.classList.add('ql-docked');
      isOpen = false;

      // Allow next action after slide completes (~600ms)
      setTimeout(function() { isAnimating = false; }, 600);
    });
  }

  /* â”€â”€ EXPAND: Phase 1 slide to open position â†’ Phase 2 reveal items â”€â”€ */
  function expand() {
    if (isOpen || isAnimating) return;
    isAnimating = true;

    // Phase 1 â€“ mechanical slide back to vertical-center right position
    qlBar.classList.remove('ql-docked');

    let handled = false;

    function onMoveEnd(e) {
      // Wait for the "top" property transition to finish
      if (e.propertyName !== 'top') return;
      if (handled) return;
      handled = true;
      qlBar.removeEventListener('transitionend', onMoveEnd);

      // Phase 2 â€“ expand items
      showItems();
      isOpen = true;
      isAnimating = false;
    }

    qlBar.addEventListener('transitionend', onMoveEnd);

    // Fallback: if transitionend never fires (e.g. no transition applied)
    setTimeout(function() {
      if (!handled) {
        handled = true;
        qlBar.removeEventListener('transitionend', onMoveEnd);
        showItems();
        isOpen = true;
        isAnimating = false;
      }
    }, 700);
  }

  collapseBtn.addEventListener('click', function() {
    if (isOpen) { collapse(); } else { expand(); }
  });

  // Active-section highlighting via IntersectionObserver
  const sections = ['home', 'about-me-card', 'experience', 'project', 'contact'];
  const qlLinks  = document.querySelectorAll('.quick-link-item[href]');

  if (!qlLinks.length) return;

  const sectionMap = {};
  sections.forEach(function(id) {
    const el = document.getElementById(id);
    if (el) sectionMap[id] = el;
  });

  let activeId = null;

  function setActive(id) {
    if (id === activeId) return;
    activeId = id;
    qlLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === '#' + id) {
        link.classList.add('ql-active');
      } else {
        link.classList.remove('ql-active');
      }
    });
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-80px 0px -20% 0px'
  });

  Object.values(sectionMap).forEach(function(el) {
    observer.observe(el);
  });

  // Highlight first section on load
  setActive('home');
})();

// Preloader Logic
$(document).ready(function() {
  const preloader = $('#preloader');
  const welcomeImage = $('#welcome-pict img')[0];

  function hidePreloader() {
    if (preloader.length && !preloader.hasClass('hiding')) {
      preloader.addClass('hiding'); // prevent multiple calls
      preloader.fadeOut(750, function() {
        $(this).remove();
      });
    }
  }

  if (welcomeImage) {
    if (welcomeImage.complete) {
      hidePreloader();
    } else {
      $(welcomeImage).on('load error', hidePreloader);
    }
  } else {
    hidePreloader();
  }
  
  // Fallback: maximum wait time of 3 seconds
  setTimeout(hidePreloader, 3000);
});

$(document).ready(function () {
  // Typed.js setup for the animated text (welcome card)
  if (document.getElementById('typed')) {
    var typed = new Typed("#typed", {
      strings: [
        "Generative AI Engineer", 
        "Machine Learning Engineer",
        "Data Scientist",
        "Business Analyst",
        "Software Engineer",
        "Project Manager",
        "Full Stack Developer",
        "UI/UX Designer",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true,
    });
  }

  // Typed.js for the hero section (same strings, same loop)
  if (document.getElementById('typed-hero')) {
    var typedHero = new Typed("#typed-hero", {
      strings: [
        "Generative AI Engineer", 
        "Machine Learning Engineer",
        "Data Scientist",
        "Business Analyst",
        "Software Engineer",
        "Project Manager",
        "Full Stack Developer",
        "UI/UX Designer",
      ],
      typeSpeed: 90,
      backSpeed: 45,
      startDelay: 800,
      loop: true,
    });
  }

  // Project Filter Functionality
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


  // Quick Links Dropdown Functionality
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

  // Scroll Animation with early trigger and instant fallback
  const animatedElements = document.querySelectorAll('.scroll-animate');
  if (animatedElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '0px 0px 150px 0px'
    });
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    function checkVisibilityFallback() {
      animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 150 && rect.bottom > -50) {
          el.classList.add('is-visible');
        }
      });
    }
    window.addEventListener('scroll', checkVisibilityFallback, { passive: true });
    window.addEventListener('load', checkVisibilityFallback);
    checkVisibilityFallback();
  }


  // Technical Skills View Toggle
  const skillToggleBtn = $('#skill-view-toggle');
  const skillsContainer = $('#skills-container');
  const iconGrid = $('#icon-grid');
  const iconList = $('#icon-list');

  skillToggleBtn.on('click', function() {
    skillsContainer.toggleClass('show-cards');
    iconGrid.toggle();
    iconList.toggle();
  });
  
  // Reusable Filter Dropdown Logic
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
      
      // Automatically close the dropdown after selection
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

  // Function to sync card heights (CORRECTED)
  function syncCardHeights() {
    const grid = $('.activities-grid');
    
    if (window.innerWidth > 1024) {
      // Row 1: Activities & Skills
      const activitiesBox = grid.find('.content-box:nth-child(1)');
      const skillsBox = grid.find('.content-box:nth-child(2)');
      
      // Set height of right card to match left card
      skillsBox.height(activitiesBox.height());

      // Row 2: Education & Certifications
      const educationBox = grid.find('.content-box:nth-child(3)');
      const certsBox = grid.find('.content-box:nth-child(4)');
      
      // Set height of right card to match left card
      certsBox.height(educationBox.height());

    } else {
      // On smaller screens, reset all heights to auto
      grid.find('.content-box').css('height', 'auto');
    }
  }
  
  // Certificate Card Click Navigation
  $('#certifications-container').on('click', '.cert-item', function() {
    const url = $(this).data('gdrive-url');
    if (url && url !== '#') {
      window.open(url, '_blank');
    }
  });
  
  // START: NEW EXPERIENCE TIMELINE SCRIPT V2
  const timelineItemsV2 = $('.timeline-item');
  const timelineCards = $('.timeline-card');
  const prevBtnV2 = $('#prev-btn');
  const nextBtnV2 = $('#next-btn');
  let currentIndexV2 = 0;

  function updateTimelineV2(newIndex) {
    // Update timeline points
    timelineItemsV2.removeClass('active');
    timelineItemsV2.eq(newIndex).addClass('active');

    // Update timeline cards
    timelineCards.removeClass('active');
    timelineCards.filter(`[data-step="${newIndex + 1}"]`).addClass('active');
    
    currentIndexV2 = newIndex;

    // Update button states
    prevBtnV2.prop('disabled', currentIndexV2 === 0);
    nextBtnV2.prop('disabled', currentIndexV2 === timelineItemsV2.length - 1);
  }

  nextBtnV2.on('click', function() {
    if (currentIndexV2 < timelineItemsV2.length - 1) {
      updateTimelineV2(currentIndexV2 + 1);
    }
  });

  prevBtnV2.on('click', function() {
    if (currentIndexV2 > 0) {
      updateTimelineV2(currentIndexV2 - 1);
    }
  });

  timelineItemsV2.on('click', function() {
    const newIndex = $(this).data('step') - 1;
    updateTimelineV2(newIndex);
  });

  // Initial setup
  updateTimelineV2(0);
  // END: NEW EXPERIENCE TIMELINE SCRIPT V2


  // Initial and resize calls for height syncing
  $(window).on('load', function() {
      syncCardHeights();
  });

  let resizeTimer;
  $(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(syncCardHeights, 100);
  });

  // Project Modal Logic
  const projectModal = $('#project-modal');
  const modalTitle = $('#modal-project-title');
  const modalDescription = $('#modal-project-description');
  const modalImage = $('#modal-project-image');
  const modalTags = $('#modal-project-tags');
  const modalLink = $('#modal-project-link');

  // When a project card is clicked
  $('#project-grid').on('click', '.project-card', function(e) {
    e.preventDefault(); 

    const title = $(this).data('title');
    const description = $(this).data('description');
    const tags = $(this).data('tags').split(',');
    const buttonText = $(this).data('button-text');
    const imageUrl = $(this).find('img').attr('src');
    const repoUrl = $(this).attr('href');

    modalTitle.text(title);
    modalDescription.text(description);
    modalImage.attr('src', imageUrl);
    modalLink.attr('href', repoUrl).text(buttonText);
    
    modalTags.empty();
    tags.forEach(function(tag) {
      const tagUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(tag.trim())}`;
      const tagElement = `<a href="${tagUrl}" target="_blank" class="tag-link">${tag.trim()}</a>`;
      modalTags.append(tagElement);
    });

    // Show the modal by adding the 'visible' class
    projectModal.addClass('visible');
  });

  // Function to close the modal
  function closeModal() {
    // Hide the modal by removing the 'visible' class
    projectModal.removeClass('visible');
  }

  // Event listeners for closing the modal
  projectModal.on('click', '.modal-close', closeModal);

  projectModal.on('click', function(e) {
    if ($(e.target).is(projectModal)) {
      closeModal();
    }
  });

  $(document).on('keyup', function(e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  // Expertise Modal Logic
  const expertiseModal = $('#expertise-modal');
  const skillIcons = {}; // Object to store skill names and their icon URLs

  // 1. Build the skill icon library on page load
  $('#skills-container .skill-item').each(function() {
    const skillName = $(this).data('skill');
    const iconSrc = $(this).find('img').attr('src');
    if (skillName && iconSrc) {
      skillIcons[skillName] = iconSrc;
    }
  });

  // 2. Set up the click event for gallery items
  $('.expertise-gallery').on('click', '.gallery-item', function() {
    // Get data from the clicked item
    const title = $(this).find('h3').text();
    const description = $(this).data('description');
    const tags = $(this).data('tags').split(',');
    const stack = $(this).data('stack').split(',');
    
    // Populate the modal
    expertiseModal.find('#modal-expertise-title').text(title);
    expertiseModal.find('#modal-expertise-description').text(description);
    
    // Populate concept tags
    const tagsContainer = expertiseModal.find('#modal-expertise-tags').empty();
    tags.forEach(function(tag) {
      const tagUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(tag.trim())}`;
      const tagElement = `<a href="${tagUrl}" target="_blank" class="tag-link">${tag.trim()}</a>`;
      tagsContainer.append(tagElement);
    });

    // Populate tech stack
    const stackContainer = expertiseModal.find('#modal-expertise-stack').empty();
    stack.forEach(function(skill) {
      const skillName = skill.trim();
      const iconSrc = skillIcons[skillName];
      if (iconSrc) {
        const stackElement = `
          <div class="stack-item">
            <img src="${iconSrc}" alt="${skillName} logo">
            <span class="stack-name">${skillName}</span>
          </div>
        `;
        stackContainer.append(stackElement);
      }
    });
    
    // Show the modal
    expertiseModal.addClass('visible');
  });

  // 3. Set up closing functionality
  function closeExpertiseModal() {
    expertiseModal.removeClass('visible');
  }

  expertiseModal.on('click', '.modal-close', closeExpertiseModal);
  expertiseModal.on('click', function(e) {
    if ($(e.target).is(expertiseModal)) {
      closeExpertiseModal();
    }
  });
  $(document).on('keyup', function(e) {
    if (e.key === "Escape" && expertiseModal.hasClass('visible')) {
      closeExpertiseModal();
    }
  });

});




// ------------------------------------------------
// AVATAR POP-UP SCROLL ANIMATION
// Triggers the pop-up spring animation when the user
// scrolls down to the welcome card section.
// ------------------------------------------------
(function () {
  var avatarBox = document.getElementById('avatar-box');
  if (!avatarBox) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        avatarBox.classList.add('popped');
      }
    });
  }, { threshold: 0.25 });

  observer.observe(avatarBox);
})();

// ------------------------------------------------
// MULTILINGUAL GREETING CYCLER
// Smoothly cycles "Hello!" in 10 world languages
// ------------------------------------------------
(function () {
  var helloEl = document.getElementById('multilingual-hello');
  if (!helloEl) return;

  var greetings = [
    "Hello!",      // English
    "Halo!",       // Indonesian
    "Bonjour!",    // French
    "Konnichiwa!", // Japanese
    "Ciao!",       // Italian
    "Hola!",       // Spanish
    "Olá!",        // Portuguese
    "Namaste!",    // Hindi
    "Nǐ Hǎo!",     // Chinese
    "Guten Tag!"   // German
  ];

  var index = 0;

  setInterval(function () {
    helloEl.classList.add('fade-out');
    
    setTimeout(function () {
      index = (index + 1) % greetings.length;
      helloEl.textContent = greetings[index];
      helloEl.classList.remove('fade-out');
      helloEl.classList.add('fade-in');

      setTimeout(function () {
        helloEl.classList.remove('fade-in');
      }, 400);
    }, 400);
  }, 2600);
})();

// ------------------------------------------------
// GITHUB STATS AUTO-FETCHER
// Dynamically fetches public_repos and account start date
// for GitHub user 'Bayhaqieee' via GitHub public API.
// ------------------------------------------------
(function () {
  const yearsEl = document.getElementById('stat-years-count');
  const projectsEl = document.getElementById('stat-projects-count');
  if (!yearsEl && !projectsEl) return;

  fetch('https://api.github.com/users/Bayhaqieee')
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data) {
        if (data.public_repos && projectsEl) {
          projectsEl.textContent = data.public_repos + '+';
        }
        if (data.created_at && yearsEl) {
          var startYear = new Date(data.created_at).getFullYear();
          var currentYear = new Date().getFullYear();
          var diffYears = Math.max(1, currentYear - startYear);
          yearsEl.textContent = diffYears + '+';
        }
      }
    })
    .catch(function (err) {
      console.log('GitHub API fetch fallback:', err);
    });
})();


