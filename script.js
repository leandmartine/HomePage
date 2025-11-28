// ===================================
// TejidosFDL - Interactive Features
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initPromoBanner();
  initNavbar();
  initMobileMenu();
  initScrollToTop();
  initScrollAnimations();
  initProductCards();
});

// ===================================
// Promotional Banner
// ===================================
function initPromoBanner() {
  const promoBanner = document.getElementById('promoBanner');
  const promoClose = document.getElementById('promoClose');
  
  // Check if banner was previously dismissed
  const bannerDismissed = localStorage.getItem('promoBannerDismissed');
  
  if (bannerDismissed === 'true') {
    promoBanner.style.display = 'none';
  }
  
  // Close banner with animation
  promoClose.addEventListener('click', () => {
    promoBanner.classList.add('hidden');
    localStorage.setItem('promoBannerDismissed', 'true');
    
    // Remove from DOM after animation
    setTimeout(() => {
      promoBanner.style.display = 'none';
    }, 300);
  });
}

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for shadow effect
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate toggle icon
    if (navMenu.classList.contains('active')) {
      mobileToggle.textContent = '✕';
    } else {
      mobileToggle.textContent = '☰';
    }
  });
  
  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.textContent = '☰';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
      navMenu.classList.remove('active');
      mobileToggle.textContent = '☰';
    }
  });
}

// ===================================
// Scroll to Top Button
// ===================================
function initScrollToTop() {
  const scrollTopBtn = document.getElementById('scrollTop');
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  // Smooth scroll to top
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// Scroll Animations with Intersection Observer
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add stagger delay for multiple items
        const delay = index * 100;
        setTimeout(() => {
          entry.target.classList.add('animate');
        }, delay);
        
        // Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements with data-animate attribute
  const animateElements = document.querySelectorAll('[data-animate]');
  animateElements.forEach(element => {
    observer.observe(element);
  });
}

// ===================================
// Product Cards Interactive Features
// ===================================
function initProductCards() {
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    // Add to cart button interaction
    const addToCartBtn = card.querySelector('.add-to-cart');
    
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Visual feedback
        addToCartBtn.textContent = '✓ Agregado';
        addToCartBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset after delay
        setTimeout(() => {
          addToCartBtn.textContent = 'Añadir al carrito';
          addToCartBtn.style.background = '';
        }, 2000);
        
        // Add animation
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
          card.style.transform = '';
        }, 200);
      });
    }
    
    // Image loading effect
    const productImage = card.querySelector('.product-image img');
    if (productImage) {
      productImage.addEventListener('load', () => {
        productImage.classList.remove('loading');
      });
      
      // Add loading class initially
      if (!productImage.complete) {
        productImage.classList.add('loading');
      }
    }
  });
}

// ===================================
// Smooth Scroll for Anchor Links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only prevent default for internal links
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed navbar
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===================================
// Performance: Lazy Loading Images
// ===================================
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.src;
  });
} else {
  // Fallback for browsers that don't support lazy loading
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ===================================
// Category Cards 3D Tilt Effect
// ===================================
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===================================
// Console Branding (Easter Egg)
// ===================================
console.log('%c TejidosFDL ', 'background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); color: white; font-size: 20px; padding: 10px 20px; border-radius: 10px; font-weight: bold;');
console.log('%c Desarrollado con ❤️ para tejedores creativos ', 'color: #8b5cf6; font-size: 12px; font-style: italic;');
