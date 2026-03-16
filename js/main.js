/**
 * Juice Nation JA / FORGE Meal Replacement Shake
 * Main JavaScript — vanilla ES6+, zero dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Sticky Header Scroll Effect
     ========================================================================== */

  const siteHeader = document.getElementById('siteHeader');

  if (siteHeader) {
    window.addEventListener('scroll', () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ==========================================================================
     2. Mobile Menu Toggle
     ========================================================================== */

  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  const closeMobileMenu = () => {
    menuToggle?.classList.remove('active');
    mobileMenu?.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('active');
      menuToggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('no-scroll', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     3. Scroll Reveal Animations (IntersectionObserver)
     ========================================================================== */

  const animatedEls = document.querySelectorAll('[data-animate]');

  if (animatedEls.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const el = entry.target;
        const staggerDelay = el.closest('[data-animate-stagger]');

        if (staggerDelay) {
          const siblings = [...staggerDelay.querySelectorAll('[data-animate]')];
          const index = siblings.indexOf(el);
          el.style.transitionDelay = `${index * 100}ms`;
        }

        el.classList.add('visible');
        observer.unobserve(el);
      });
    }, { threshold: 0.15 });

    animatedEls.forEach(el => revealObserver.observe(el));
  }

  /* ==========================================================================
     4. Announcement Bar Marquee — Pause on Hover
     ========================================================================== */

  const marqueeTrack = document.querySelector('.marquee-track');

  if (marqueeTrack) {
    marqueeTrack.addEventListener('mouseenter', () => {
      marqueeTrack.classList.add('paused');
    });
    marqueeTrack.addEventListener('mouseleave', () => {
      marqueeTrack.classList.remove('paused');
    });
  }

  /* ==========================================================================
     5. FAQ Accordion
     ========================================================================== */

  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      if (!parentItem) return;

      const isOpen = parentItem.classList.contains('active');

      // Close all items first (single-open behavior)
      document.querySelectorAll('.faq-item.active').forEach(item => {
        item.classList.remove('active');
        const answer = item.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = null;
      });

      // Toggle the clicked item
      if (!isOpen) {
        parentItem.classList.add('active');
        const answer = parentItem.querySelector('.faq-answer');
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  /* ==========================================================================
     6. Contact Form Handling
     ========================================================================== */

  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /\d{7,}/;

    const showFieldError = (field) => {
      field.classList.add('form-error');
    };

    const clearFieldError = (field) => {
      field.classList.remove('form-error');
    };

    // Clear errors on input
    contactForm.querySelectorAll('input, textarea, select').forEach(field => {
      field.addEventListener('input', () => clearFieldError(field));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const requiredFields = contactForm.querySelectorAll('[required]');
      let firstInvalid = null;

      requiredFields.forEach(field => {
        clearFieldError(field);
        let isValid = true;
        const value = field.value.trim();

        if (!value) {
          isValid = false;
        } else if (field.type === 'email' && !emailRegex.test(value)) {
          isValid = false;
        } else if (field.type === 'tel' && !phoneRegex.test(value.replace(/\D/g, ''))) {
          isValid = false;
        }

        if (!isValid) {
          showFieldError(field);
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
        return;
      }

      // Success state
      contactForm.style.display = 'none';
      const successEl = contactForm.parentElement?.querySelector('.form-success');
      if (successEl) {
        successEl.style.display = 'block';
        successEl.classList.add('visible');
      }
    });
  }

  /* ==========================================================================
     7. Product Flavor Tabs (Products Page)
     ========================================================================== */

  const flavorTabs = document.querySelectorAll('.flavor-tab');
  const productPanels = document.querySelectorAll('.product-detail-panel');

  if (flavorTabs.length && productPanels.length) {
    const switchProductTab = (targetId) => {
      flavorTabs.forEach(t => t.classList.toggle('active', t.dataset.flavor === targetId));

      productPanels.forEach(panel => {
        const isTarget = panel.id === targetId;
        if (isTarget) {
          panel.classList.add('active');
          panel.style.opacity = '0';
          requestAnimationFrame(() => { panel.style.opacity = '1'; });
        } else {
          panel.classList.remove('active');
        }
      });

      // Update hash without scrolling
      history.replaceState(null, '', `#${targetId}`);
    };

    flavorTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.flavor;
        if (target) switchProductTab(target);
      });
    });

    // Restore from hash on load
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      switchProductTab(hash);
    }
  }

  /* ==========================================================================
     8. Nutrition Flavor Tabs (Nutrition Page)
     ========================================================================== */

  const nutritionTabs = document.querySelectorAll('.nutrition-tab');
  const nutritionPanels = document.querySelectorAll('.nutrition-panel');

  if (nutritionTabs.length && nutritionPanels.length) {
    nutritionTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.flavor;
        if (!target) return;

        nutritionTabs.forEach(t => t.classList.toggle('active', t.dataset.flavor === target));

        nutritionPanels.forEach(panel => {
          const isTarget = panel.id === target;
          if (isTarget) {
            panel.classList.add('active');
            panel.style.opacity = '0';
            requestAnimationFrame(() => { panel.style.opacity = '1'; });
          } else {
            panel.classList.remove('active');
          }
        });
      });
    });
  }

  /* ==========================================================================
     9. Quiz Logic (Quiz Page)
     ========================================================================== */

  const quizContainer = document.querySelector('.quiz-container');

  if (quizContainer) {
    const steps = quizContainer.querySelectorAll('.quiz-step');
    const progressBar = quizContainer.querySelector('.quiz-progress-bar');
    const resultSection = quizContainer.querySelector('.quiz-result');
    let currentStep = 0;
    const answers = [];

    const FLAVORS = {
      'blueberry-strawberry': {
        name: 'Blueberry Strawberry',
        calories: 320,
        protein: 18,
        tags: ['berry', 'breakfast', 'weight-management'],
      },
      'coffee-banana': {
        name: 'Coffee Banana',
        calories: 290,
        protein: 17,
        tags: ['coffee', 'breakfast', 'late-night', 'energy'],
      },
      'peanut-banana': {
        name: 'Peanut Banana',
        calories: 370,
        protein: 19,
        tags: ['nutty', 'post-workout', 'protein'],
      },
      'peanut-banana-strawberry': {
        name: 'Peanut Banana Strawberry',
        calories: 380,
        protein: 20,
        tags: ['sweet', 'post-workout', 'protein'],
      },
    };

    const ANSWER_TAG_MAP = {
      // Step 1 — Goal
      'Energy': ['energy'],
      'Protein': ['protein'],
      'Convenience': ['breakfast', 'late-night'],
      'Weight Management': ['weight-management'],
      // Step 2 — Flavor
      'Berry/Fruity': ['berry'],
      'Nutty/Creamy': ['nutty'],
      'Coffee/Rich': ['coffee'],
      'Sweet/Tropical': ['sweet'],
      // Step 3 — Timing
      'Breakfast': ['breakfast'],
      'Lunch on-the-go': ['energy', 'weight-management'],
      'Post-workout': ['post-workout'],
      'Late-night': ['late-night'],
    };

    const goToStep = (index) => {
      steps.forEach((step, i) => {
        step.classList.toggle('active', i === index);
      });
      currentStep = index;
      if (progressBar) {
        progressBar.style.width = `${((index + 1) / steps.length) * 100}%`;
      }
    };

    const calculateRecommendation = () => {
      const userTags = answers.flatMap(a => ANSWER_TAG_MAP[a] || []);
      let bestKey = null;
      let bestScore = -1;

      for (const [key, flavor] of Object.entries(FLAVORS)) {
        const score = flavor.tags.reduce((sum, tag) => sum + (userTags.includes(tag) ? 1 : 0), 0);
        if (score > bestScore) {
          bestScore = score;
          bestKey = key;
        }
      }

      return { key: bestKey, ...FLAVORS[bestKey] };
    };

    const showResult = (rec) => {
      steps.forEach(s => s.classList.remove('active'));
      if (progressBar) progressBar.style.width = '100%';

      if (resultSection) {
        resultSection.innerHTML = `
          <div class="quiz-result-card" data-flavor="${rec.key}">
            <h3>Your Perfect Match</h3>
            <p class="result-flavor-name">${rec.name}</p>
            <ul class="result-stats">
              <li><strong>${rec.calories}</strong> kcal</li>
              <li><strong>${rec.protein}g</strong> protein</li>
            </ul>
            <a href="/products#${rec.key}" class="btn btn-primary">View Details</a>
          </div>`;
        resultSection.classList.add('active');
        resultSection.style.opacity = '0';
        requestAnimationFrame(() => { resultSection.style.opacity = '1'; });
      }
    };

    // Option selection
    quizContainer.addEventListener('click', (e) => {
      const option = e.target.closest('.quiz-option');
      if (!option) return;

      const step = option.closest('.quiz-step');
      if (!step) return;

      step.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });

    // Next button
    quizContainer.querySelectorAll('.quiz-next').forEach(btn => {
      btn.addEventListener('click', () => {
        const activeStep = steps[currentStep];
        const selected = activeStep?.querySelector('.quiz-option.selected');

        if (!selected) {
          activeStep?.classList.add('shake');
          setTimeout(() => activeStep?.classList.remove('shake'), 500);
          return;
        }

        answers[currentStep] = selected.dataset.value || selected.textContent.trim();

        if (currentStep < steps.length - 1) {
          goToStep(currentStep + 1);
        } else {
          const rec = calculateRecommendation();
          showResult(rec);
        }
      });
    });

    // Prev button
    quizContainer.querySelectorAll('.quiz-prev').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 0) goToStep(currentStep - 1);
      });
    });

    // Initialize first step
    goToStep(0);
  }

  /* ==========================================================================
     10. Smooth Scroll for Anchor Links
     ========================================================================== */

  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId.length < 2) return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    const headerOffset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: 'smooth' });

    // Close mobile menu if open
    closeMobileMenu();
  });

  /* ==========================================================================
     11. Active Nav Link Highlighting
     ========================================================================== */

  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';

  document.querySelectorAll('nav a, .nav-links a, .nav-list a, .main-nav a').forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
    }
  });

  /* ==========================================================================
     12. Image Lazy Loading — Fade-In on Load
     ========================================================================== */

  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';

    const reveal = () => { img.style.opacity = '1'; };

    if (img.complete) {
      reveal();
    } else {
      img.addEventListener('load', reveal, { once: true });
      img.addEventListener('error', reveal, { once: true });
    }
  });
});
