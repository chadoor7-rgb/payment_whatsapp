document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  document.querySelectorAll('.signup-form, .contact-form').forEach((form) => {
    const message = form.querySelector('.form-message');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      message.textContent = form.classList.contains('contact-form')
        ? 'درخواست شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم.'
        : 'شماره ثبت شد؛ به‌زودی با شما تماس می‌گیریم.';
      message.classList.add('success');
      form.reset();
    });
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  const contactNumbers = document.querySelector('.contact-numbers');
  if (contactNumbers && document.querySelector('.contact-form')) {
    const socialLinks = document.createElement('div');
    socialLinks.className = 'social-links';
    socialLinks.innerHTML = '<a href="https://chadortent.ir" target="_blank" rel="noreferrer"><i data-lucide="globe-2"></i><span>CHADORTENT.IR</span></a><a href="https://instagram.com/chadoor_" target="_blank" rel="noreferrer"><i data-lucide="instagram"></i><span>CHADOOR_</span></a><a href="https://instagram.com/chadortent.ir" target="_blank" rel="noreferrer"><i data-lucide="instagram"></i><span>CHADORTENT.IR</span></a><a href="https://wa.me/989158017134" target="_blank" rel="noreferrer"><i data-lucide="message-circle"></i><span>واتساپ</span></a><a href="https://t.me/GATTENT" target="_blank" rel="noreferrer"><i data-lucide="send"></i><span>GATTENT</span></a>';
    contactNumbers.after(socialLinks);
    if (window.lucide) lucide.createIcons();
  }
  document.querySelectorAll('footer').forEach((footer) => {
    const copyright = footer.querySelector('span:last-child');
    if (copyright) copyright.textContent = '© چادردوزی جزیره J.A.T © 2026، کلیه حقوق این وب‌سایت محفوظ است';
    const footerSocial = document.createElement('div');
    footerSocial.className = 'footer-social';
    footerSocial.innerHTML = '<a href="https://chadortent.ir" target="_blank" rel="noreferrer">CHADORTENT.IR</a><a href="https://instagram.com/chadoor_" target="_blank" rel="noreferrer">Instagram</a><a href="https://t.me/GATTENT" target="_blank" rel="noreferrer">Telegram</a>';
    footer.insertBefore(footerSocial, footer.querySelector('p'));
  });
  document.querySelectorAll('.location-line').forEach((location) => {
    location.innerHTML = '<i data-lucide="map-pin"></i><span>ایران، مازندران، آمل، روبه‌روی پلیس‌راه، فروشگاه و کارگاه تولید چادر مسافرتی چادردوزی جزیره</span><a class="map-link" href="https://maps.app.goo.gl/tmTA6vygLnNnsPhe6" target="_blank" rel="noreferrer"><i data-lucide="map"></i>مشاهده روی نقشه</a>';
    if (window.lucide) lucide.createIcons();
  });
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });
});