// ============================================
// Stud & Beam Constructions — Site Interactions
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Services dropdown (desktop hover + click) ---- */
  var dropdown = document.querySelector('.nav-dropdown');
  if (dropdown) {
    var toggleBtn = dropdown.querySelector('.nav-link');
    dropdown.addEventListener('mouseenter', function () { dropdown.classList.add('open'); });
    dropdown.addEventListener('mouseleave', function () { dropdown.classList.remove('open'); });
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('open');
      });
    }
    document.addEventListener('click', function () { dropdown.classList.remove('open'); });
  }

  /* ---- Mobile menu toggle ---- */
  var mobileBtn = document.querySelector('.mobile-menu-btn');
  var navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', function () {
      navLinks.classList.toggle('mobile-open');
    });
  }

  /* ---- FAQ accordion ---- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-question');
    var icon = item.querySelector('.icon');
    if (!q) return;
    q.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      // close all others
      faqItems.forEach(function (other) {
        other.classList.remove('open');
        var otherIcon = other.querySelector('.icon');
        if (otherIcon) otherIcon.textContent = '+';
      });
      if (!isOpen) {
        item.classList.add('open');
        if (icon) icon.textContent = '−';
      }
    });
  });

  /* ---- Project filter tabs (Projects page) ---- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('[data-project-category]');
  if (filterBtns.length && projectCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.getAttribute('data-filter');
        projectCards.forEach(function (card) {
          if (cat === 'all' || card.getAttribute('data-project-category') === cat) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- Our Story image carousel ---- */
  var carousel = document.querySelector('.story-carousel');
  if (carousel) {
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('img'));
    var caption = document.querySelector('.story-caption');
    var dots = Array.prototype.slice.call(document.querySelectorAll('.story-dot'));
    var current = 0;
    var autoplayTimer = null;
    var resumeTimer = null;

    function showSlide(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (img, idx) {
        img.style.display = idx === current ? 'block' : 'none';
      });
      if (caption) caption.textContent = slides[current].getAttribute('data-caption') || '';
      dots.forEach(function (dot, idx) {
        dot.classList.toggle('active', idx === current);
      });
    }

    function startAutoplay() {
      clearInterval(autoplayTimer);
      autoplayTimer = setInterval(function () { showSlide(current + 1); }, 5000);
    }
    function pauseAutoplay() { clearInterval(autoplayTimer); }
    function resumeAutoplaySoon() {
      clearInterval(autoplayTimer);
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(startAutoplay, 4000);
    }

    var prevBtn = document.querySelector('.story-nav-btn.prev');
    var nextBtn = document.querySelector('.story-nav-btn.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { showSlide(current - 1); resumeAutoplaySoon(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { showSlide(current + 1); resumeAutoplaySoon(); });
    dots.forEach(function (dot, idx) {
      dot.addEventListener('click', function () { showSlide(idx); resumeAutoplaySoon(); });
    });
    carousel.addEventListener('mouseenter', pauseAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    showSlide(0);
    startAutoplay();
  }

  /* ---- Contact form (static site — shows a thank-you message) ---- */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var wrap = document.querySelector('.contact-form-wrap');
      if (wrap) {
        wrap.innerHTML =
          '<div class="form-success">' +
          '<h3>Thanks — we\'ll be in touch.</h3>' +
          '<p>We typically respond within one business day.</p>' +
          '</div>';
      }
    });
  }

});
