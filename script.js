document.addEventListener('DOMContentLoaded', () => {
  // آیکون‌ها
  if (window.lucide) lucide.createIcons();

  // منوی موبایل
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open'); // اگر کلاس دیگری داری (مثل is-open) عوض کن
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // فرم‌های ثبت سفارش و تماس
  document.querySelectorAll('.signup-form, .contact-form').forEach((form) => {
    const message = form.querySelector('.form-message');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let text = 'سلام، در مورد سفارش و مشاوره می‌خواهم صحبت کنم.';

      if (form.classList.contains('contact-form')) {
        const name = form.querySelector('#name')?.value?.trim();
        const phone = form.querySelector('#phone')?.value?.trim();
        const service = form.querySelector('#service')?.value || 'سفارش عمومی';
        const request = form.querySelector('#request')?.value?.trim();

        text = `سلام، نام من ${name || 'کاربر'} است.\nشماره تماس: ${phone || 'ثبت نشده'}\nنوع خدمت: ${service}\nتوضیح: ${request || 'بدون توضیح'}`;
      } else {
        const phone = form.querySelector('input[type="tel"]')?.value?.trim();
        text = `سلام، می‌خواهم در مورد سفارش چادر با شما تماس بگیرم.\nشماره تماس: ${phone || 'ثبت نشده'}`;
      }

      const whatsappUrl = `https://wa.me/989118031241?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener');

      if (message) {
        message.textContent = form.classList.contains('contact-form')
          ? 'درخواست شما به واتساپ ارسال شد؛ به‌زودی پاسخ می‌گیریم.'
          : 'شماره شما به واتساپ ارسال شد؛ به‌زودی با شما تماس می‌گیریم.';
        message.classList.add('success');
      }

      form.reset();
    });
  });

  // دکمه شناور واتساپ
  const whatsappUrl = 'https://wa.me/989118031241?text=' + encodeURIComponent('سلام، در مورد سفارش چادر مشاوره می‌خواهم.');
  const floatingWhatsapp = document.createElement('a');
  floatingWhatsapp.className = 'floating-whatsapp';
  floatingWhatsapp.href = whatsappUrl;
  floatingWhatsapp.target = '_blank';
  floatingWhatsapp.rel = 'noopener noreferrer';
  floatingWhatsapp.setAttribute('aria-label', 'مشاوره واتساپ');
  floatingWhatsapp.innerHTML = '<i data-lucide="message-circle"></i><span>مشاوره واتساپ</span>';
  document.body.appendChild(floatingWhatsapp);

  if (window.lucide) lucide.createIcons();
});
