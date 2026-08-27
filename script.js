document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  const form = document.querySelector('.signup-form');
  const message = document.querySelector('.form-message');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const phone = form.querySelector('input').value.trim();
    if (!phone) return;
    message.textContent = 'شماره ثبت شد؛ لینک شروع به‌زودی برایتان ارسال می‌شود.';
    message.classList.add('success');
    form.querySelector('input').value = '';
  });

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });
});