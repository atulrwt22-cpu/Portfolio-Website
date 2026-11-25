'use strict';

/* Edit these once; every matching link on the page updates. */
const CONFIG = {
  email: 'atulrwt22@gmail.com',
  linkedin: 'https://www.linkedin.com/in/atul-rawat-b7562a362',
  github: 'https://github.com/atulrwt22-cpu',
  'project-cricket': 'https://github.com/atulrwt22-cpu/cricket-gear-sports-website',
  'project-business': 'https://github.com/atulrwt22-cpu/Business-Website',
};

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.dataset.link;
    if (CONFIG[key]) el.href = key === 'email' ? `mailto:${CONFIG.email}` : CONFIG[key];
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  // Close the mobile menu after choosing a link
  const menu = document.getElementById('navMenu');
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    if (menu.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(menu).hide();
  }));

  // Highlight the current section in the navigation
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const sections = navLinks.map(l => document.querySelector(l.getAttribute('href'))).filter(Boolean);
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));

  // Contact form: validate, then open the visitor's email app with the message filled in
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.textContent = '';
    status.classList.remove('ok');
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(field => {
      field.value = field.value.trim();
      const ok = field.checkValidity();
      field.classList.toggle('is-invalid', !ok);
      field.classList.toggle('is-valid', ok);
      if (!ok) valid = false;
    });
    if (!valid) { form.querySelector('.is-invalid').focus(); return; }
    const { name, email, message } = form.elements;
    const subject = encodeURIComponent(`Portfolio enquiry from ${name.value}`);
    const body = encodeURIComponent(`${message.value}\n\nFrom: ${name.value} (${email.value})`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
    status.textContent = 'Your email app should open with the message ready to send.';
    status.classList.add('ok');
    form.reset();
    form.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid'));
  });
  form.addEventListener('input', e => {
    if (e.target.classList.contains('is-invalid') && e.target.checkValidity()) e.target.classList.remove('is-invalid');
  });
});
