'use strict';

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
htmlElement.classList.add(currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', function() {
  const isDarkMode = htmlElement.classList.contains('dark-mode');
  
  if (isDarkMode) {
    htmlElement.classList.remove('dark-mode');
    htmlElement.classList.add('light-mode');
    localStorage.setItem('theme', 'light-mode');
    updateThemeIcon('light-mode');
  } else {
    htmlElement.classList.remove('light-mode');
    htmlElement.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark-mode');
    updateThemeIcon('dark-mode');
  }
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('ion-icon');
  if (theme === 'dark-mode') {
    icon.setAttribute('name', 'sun-outline');
  } else {
    icon.setAttribute('name', 'moon-outline');
  }
}

// ===== STATS COUNTER ANIMATION =====
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 50);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '+';
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 50);
  });
}

// ===== SCROLL TO TOP BUTTON =====
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
  if (window.pageYOffset > 300) {
    scrollTop.classList.add('show');
  } else {
    scrollTop.classList.remove('show');
  }
});

scrollTop.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== PROJECT FILTER SYSTEM =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    this.classList.add('active');

    const filterValue = this.getAttribute('data-filter');

    // Filter projects
    projectItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-tech') === filterValue) {
        item.style.display = 'block';
        item.classList.add('visible');
      } else {
        item.style.display = 'none';
        item.classList.remove('visible');
      }
    });
  });
});

// ===== FOOTER YEAR AUTO-UPDATE =====
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ===== element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // Close sidebar on mobile when navigating
    if (sidebar.classList.contains("active")) {
      sidebar.classList.remove("active");
    }

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);

        // Trigger stats animation when about page loads
        if (pages[i].dataset.page === 'about') {
          setTimeout(animateStats, 100);
        }
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Smooth scroll animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-item, .project-item, .contact-card, .timeline-item, .service-item, .cert-card, .achievement-item').forEach(el => {
  observer.observe(el);
});

// Add smooth transitions for skill bars
document.addEventListener('DOMContentLoaded', function() {
  // Initialize skill bars
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.transition = 'width 1s ease-out';
      bar.style.width = width;
    }, 100);
  });

  // Add scroll effect to navbar
  let lastScrollTop = 0;
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navbar.style.opacity = '0.8';
    } else {
      navbar.style.opacity = '1';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // Start stats animation on page load if about is visible
  if (document.querySelector('.about.active')) {
    setTimeout(animateStats, 500);
  }
});

// Enhanced link opening in GitHub
document.querySelectorAll('.project-item a, .contact-card-link, .cta-btn').forEach(link => {
  if (link.href && (link.href.includes('github.com') || link.href.includes('mailto:') || link.href.includes('tel:'))) {
    link.addEventListener('click', function(e) {
      if (link.target === '_blank') {
        e.preventDefault();
        window.open(this.href, '_blank');
      }
    });
  }
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
  const keys = {
    '1': document.querySelector('[data-nav-link]'),
    '2': document.querySelector('[data-nav-link]:nth-child(2)'),
    '3': document.querySelector('[data-nav-link]:nth-child(3)'),
    '4': document.querySelector('[data-nav-link]:nth-child(4)'),
    '5': document.querySelector('[data-nav-link]:nth-child(5)')
  };
  
  if (keys[event.key] && event.ctrlKey) {
    keys[event.key].click();
  }
});

// Add parallax effect on scroll
window.addEventListener('scroll', function() {
  const scrollPosition = window.pageYOffset;
  const sidebar = document.querySelector('[data-sidebar]');
  if (sidebar) {
    sidebar.style.transform = `translateY(${scrollPosition * 0.05}px)`;
  }
});