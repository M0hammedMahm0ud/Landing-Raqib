// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;

mobileMenuBtn?.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
  body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu?.querySelectorAll('a');
mobileLinks?.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    body.style.overflow = '';
  });
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.offsetTop - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll('.feature-card, .step-card, .pricing-card, .testimonial-card');
animatedElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Animated Counter for Stats (if any)
const animateCounter = (element, target, duration = 2000) => {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current);
    }
  }, 16);
};

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
contactForm?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    company: document.getElementById('company').value,
    message: document.getElementById('message').value
  };

  // Basic validation
  if (!formData.name || !formData.email || !formData.message) {
    showNotification('Please fill in all required fields', 'error');
    return;
  }

  if (!isValidEmail(formData.email)) {
    showNotification('Please enter a valid email address', 'error');
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    // TODO: Replace with actual API endpoint
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData)
    // });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    showNotification('Thank you! We\'ll get back to you soon.', 'success');
    contactForm.reset();
  } catch (error) {
    showNotification('Something went wrong. Please try again.', 'error');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => notification.classList.add('show'), 100);

  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Pricing Card Click Handler
document.querySelectorAll('.pricing-card button').forEach(button => {
  button.addEventListener('click', (e) => {
    const plan = e.target.closest('.pricing-card').querySelector('h3').textContent;
    if (plan === 'Enterprise') {
      // Scroll to contact form
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      showNotification(`Redirecting to ${plan} plan signup...`, 'info');
      // TODO: Add actual signup link
      // window.location.href = `/signup?plan=${plan.toLowerCase()}`;
    }
  });
});

// Floating Cards Animation Enhancement
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
});

// Hero CTA Button Click
const heroCTA = document.querySelector('.hero-content .btn-primary');
heroCTA?.addEventListener('click', () => {
  const pricingSection = document.getElementById('pricing');
  pricingSection?.scrollIntoView({ behavior: 'smooth' });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  const heroMockup = document.querySelector('.hero-mockup');

  if (heroContent && scrolled < 600) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / 600);
  }

  if (heroMockup && scrolled < 600) {
    heroMockup.style.transform = `translateY(${scrolled * 0.2}px)`;
  }
});

// Video Demo Handler
const videoPlaceholder = document.querySelector('.video-placeholder');
videoPlaceholder?.addEventListener('click', () => {
  // TODO: Replace with actual video URL
  const videoUrl = 'YOUR_VIDEO_URL'; // e.g., YouTube embed URL

  if (videoUrl && videoUrl !== 'YOUR_VIDEO_URL') {
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');

    const videoWrapper = document.querySelector('.video-wrapper');
    videoWrapper.innerHTML = '';
    videoWrapper.appendChild(iframe);
  } else {
    showNotification('Demo video coming soon!', 'info');
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class to body for animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // Log page view (for analytics)
  console.log('Raqib Landing Page Loaded');
});
