/* ───────────────────────────────────────
   Jaap Bullion — App JavaScript
   • Particle generator
   • Scroll-reveal animations
   • WhatsApp inquiry builder
   • vCard generation
─────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initScrollReveal();
  initNavbarScroll();
  generateVCard();
});

/* ── Gold Particle Generator ── */
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const COUNT = 22;
  for (let i = 0; i < COUNT; i++) {
    const p = document.createElement('span');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;
    const opacity = Math.random() * 0.35 + 0.05;

    Object.assign(p.style, {
      position: 'absolute',
      left: `${x}%`,
      bottom: `-${size}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '50%',
      background: `rgba(201, 168, 76, ${opacity})`,
      boxShadow: `0 0 ${size * 3}px rgba(201, 168, 76, ${opacity * 0.8})`,
      animation: `riseParticle ${duration}s ${delay}s ease-in infinite`,
      pointerEvents: 'none',
    });

    container.appendChild(p);
  }

  // Inject keyframes if not already present
  if (!document.getElementById('particle-style')) {
    const style = document.createElement('style');
    style.id = 'particle-style';
    style.textContent = `
      @keyframes riseParticle {
        0%   { transform: translateY(0) scale(1); opacity: 0; }
        10%  { opacity: 1; }
        90%  { opacity: 0.4; }
        100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .stat-item, .contact-card, .about-text p, .pillar, .save-contact-card, .inquiry-form'
  );

  targets.forEach((el, i) => {
    el.classList.add('fade-in-up');
    // Stagger delay based on data-delay or index
    const delay = el.dataset.delay || (i % 4) * 80;
    el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ── Navbar Scroll Behaviour ── */
function initNavbarScroll() {
  const nav = document.querySelector('.navbar');
  let lastY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    if (currentY > 80) {
      nav.style.background = 'rgba(5,5,5,0.96)';
      nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(5,5,5,0.85)';
      nav.style.boxShadow = 'none';
    }
    lastY = currentY;
  }, { passive: true });
}

/* ── Generate vCard File Dynamically ── */
function generateVCard() {
  const vcfContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'FN:Jaap Bullion Pvt. Ltd.',
    'ORG:Jaap Bullion Pvt. Ltd.',
    'TITLE:Gold · Silver · Bullion · Investment',
    'TEL;TYPE=CELL,VOICE:+919081666601',
    'ADR;TYPE=WORK:;;389 Shyamdham Chowk Above Sitaram Gas & Materials;Nana Varachha;Surat;395006;India',
    'NOTE:Trusted Bullion Traders in Surat - Gold 999/999.9 & Silver 999 Fine. BIS Hallmarked.',
    'END:VCARD',
  ].join('\r\n');

  const blob = new Blob([vcfContent], { type: 'text/vcard' });
  const url = URL.createObjectURL(blob);

  const links = document.querySelectorAll('a[href="assets/jaap_bullion.vcf"]');
  links.forEach((link) => {
    link.href = url;
    link.download = 'Jaap_Bullion.vcf';
  });
}

/* ── WhatsApp Inquiry Builder ── */
function sendInquiry() {
  const interest = document.getElementById('interest')?.value || 'Bullion';
  const name = document.getElementById('name')?.value?.trim();
  const phone = document.getElementById('phone')?.value?.trim();

  if (!name) {
    alert('Please enter your name.');
    return;
  }

  let msg = `Hello Jaap Bullion,\n\n`;
  msg += `I am interested in: *${interest}*\n`;
  msg += `Name: *${name}*\n`;
  if (phone) msg += `Phone: *${phone}*\n`;
  msg += `\nKindly get in touch with me. Thank you!`;

  const encoded = encodeURIComponent(msg);
  window.open(`https://wa.me/919081666601?text=${encoded}`, '_blank');
}
