/* ============================================
   RAMS AUDIOVISUALS — SHARED JS
   ============================================ */

/* ----- Navbar hamburger ----- */
(function () {
  const hamburger = document.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile');
  if (!hamburger || !mobileMenu) return;
  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  };
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });
})();

/* ----- Contact form ----- */
(function () {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const phoneInput = form.querySelector('[data-phone-input]');
  const citySelect = form.querySelector('[data-city-select]');
  const status = form.querySelector('[data-contact-status]');

  const setStatus = (message, isError = false) => {
    if (!status) return;
    status.hidden = !message;
    status.textContent = message || '';
    status.classList.toggle('is-error', isError);
  };

  const normalizePhone = () => {
    if (!phoneInput) return;
    const digits = phoneInput.value.replace(/\D/g, '');
    phoneInput.value = digits.length > 10 ? digits.slice(-10) : digits;
    if (phoneInput.value.length && phoneInput.value.length !== 10) {
      phoneInput.setCustomValidity('Please enter exactly 10 digits.');
    } else {
      phoneInput.setCustomValidity('');
    }
  };

  if (phoneInput) {
    phoneInput.addEventListener('input', normalizePhone);
    phoneInput.addEventListener('blur', normalizePhone);
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    normalizePhone();
    setStatus('');

    if (!form.reportValidity()) return;

    const formData = new FormData(form);
    const selectedOption = citySelect?.options[citySelect.selectedIndex];
    const cityName = selectedOption?.dataset.cityName || selectedOption?.textContent?.trim() || 'your city';
    const whatsappNumber = selectedOption?.dataset.cityWhatsapp || '919700033342';
    const message = [
      'Hi Rams AudioVisuals,',
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: +91 ${formData.get('phone')}`,
      `City: ${cityName}`,
      `Message: ${formData.get('message')}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    setStatus(`Opening WhatsApp for ${cityName}...`);
    const popup = window.open(whatsappUrl, '_blank', 'noopener');
    if (!popup) {
      window.location.href = whatsappUrl;
    }
    form.reset();
  });
})();

/* ----- FAQ accordion ----- */
(function () {
  document.querySelectorAll('.faq-item__question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ----- Rotating gallery tiles ----- */
(function () {
  const tiles = document.querySelectorAll('[data-rotating-tile]');
  if (!tiles.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  tiles.forEach((tile) => {
    const images = Array.from(tile.querySelectorAll('.rotating-gallery__image'));
    if (images.length < 2) return;

    let currentIndex = 0;
    window.setInterval(() => {
      images[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('is-active');
    }, 2000);
  });
})();

/* ----- Equipment filter tabs ----- */
(function () {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.equip-card-wrapper');
  if (!tabs.length || !cards.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ----- Smooth scroll for anchor links ----- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ----- Lazy load images ----- */
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[data-src]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  lazyImages.forEach(img => observer.observe(img));
}

/* ----- Cities scroll navigation ----- */
(function () {
  const container = document.querySelector('.cities-hscroll');
  const prevBtn = document.getElementById('cities-prev-btn');
  const nextBtn = document.getElementById('cities-next-btn');
  if (!container || !prevBtn || !nextBtn) return;

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -150, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: 150, behavior: 'smooth' });
  });
})();

