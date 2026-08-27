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
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });
});