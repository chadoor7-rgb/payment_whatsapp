document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

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
        text = `سلام، می‌خواهم در مورد سفارش چادر با شما تماس بگیریم.\nشماره تماس: ${phone || 'ثبت نشده'}`;
      }

      const whatsappUrl = `https://wa.me/989158017134?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank', 'noopener');
      message.textContent = form.classList.contains('contact-form')
        ? 'درخواست شما به واتساپ ارسال شد؛ به‌زودی پاسخ می‌گیریم.'
        : 'شماره شما به واتساپ ارسال شد؛ به‌زودی با شما تماس می‌گیریم.';
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
    socialLinks.innerHTML = '<a href="tel:09118031241"><i data-lucide="phone"></i><span>۰۹۱۱۸۰۳۱۲۴۱</span></a><a href="https://wa.me/989158017134?text=%D8%AF%D8%B1%D9%88%D8%AF%20%D9%85%DB%8C%E2%80%8C%D8%AE%D9%88%D8%A7%D9%85%20%D8%AF%D8%B1%20%D9%85%D9%88%D8%B1%D8%AF%20%DA%86%D8%A7%D8%AF%D8%B1%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D8%A8%DA%AF%DB%8C%D8%B1%D9%85" target="_blank" rel="noreferrer"><i data-lucide="message-circle"></i><span>واتساپ با پیام آماده</span></a><a href="https://chadortent.ir" target="_blank" rel="noreferrer"><i data-lucide="globe-2"></i><span>CHADORTENT.IR</span></a><a href="https://instagram.com/chadoor_" target="_blank" rel="noreferrer"><i data-lucide="instagram"></i><span>CHADOOR_</span></a><a href="https://instagram.com/chadortent.ir" target="_blank" rel="noreferrer"><i data-lucide="instagram"></i><span>CHADORTENT.IR</span></a><a href="https://t.me/GATTENT" target="_blank" rel="noreferrer"><i data-lucide="send"></i><span>GATTENT</span></a><span class="response-hours"><i data-lucide="clock-3"></i> پاسخ‌گویی هر روز ۸ تا ۲۲</span>';
    contactNumbers.after(socialLinks);
    if (window.lucide) lucide.createIcons();
  }
  document.querySelectorAll('footer').forEach((footer) => {
    const copyright = footer.querySelector('span:last-child');
    if (copyright) copyright.textContent = '© چادردوزی جزیره J.A.T © 2026، کلیه حقوق این وب‌سایت محفوظ است';
    const footerSocial = document.createElement('div');
    footerSocial.className = 'footer-social';
    footerSocial.innerHTML = '<a href="tel:09118031241">۰۹۱۱۸۰۳۱۲۴۱</a><a href="https://wa.me/989158017134?text=%D8%AF%D8%B1%D9%88%D8%AF%20%D9%85%DB%8C%E2%80%8C%D8%AE%D9%88%D8%A7%D9%85%20%D8%AF%D8%B1%20%D9%85%D9%88%D8%B1%D8%AF%20%DA%86%D8%A7%D8%AF%D8%B1%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D8%A8%DA%AF%DB%8C%D8%B1%D9%85" target="_blank" rel="noreferrer">واتساپ</a><a href="https://chadortent.ir" target="_blank" rel="noreferrer">CHADORTENT.IR</a><a href="https://instagram.com/chadoor_" target="_blank" rel="noreferrer">Instagram</a><a href="https://t.me/GATTENT" target="_blank" rel="noreferrer">Telegram</a><span>پاسخ‌گویی: ۸ تا ۲۲</span>';
    footer.insertBefore(footerSocial, footer.querySelector('p'));
  });
  document.querySelectorAll('.location-line').forEach((location) => {
    location.innerHTML = '<i data-lucide="map-pin"></i><span>ایران، مازندران، آمل، جاده هراز، روبه‌روی پلیس‌راه محمدآباد، فروشگاه و کارگاه تولید چادر مسافرتی چادردوزی جزیره</span><a class="map-link" href="https://maps.app.goo.gl/tmTA6vygLnNnsPhe6" target="_blank" rel="noreferrer"><i data-lucide="map"></i>مشاهده روی نقشه</a><div class="map-embed"><iframe title="نقشه فروشگاه چادردوزی جزیره" src="https://www.google.com/maps?q=چادردوزی%20جزیره%20آمل%20روبروی%20پلیس%20راه%20محمدآباد&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>';
    if (window.lucide) lucide.createIcons();
  });
  const serviceList = document.querySelector('.service-list');
  if (serviceList) {
    const projects = document.createElement('section');
    projects.className = 'project-showcase';
    projects.innerHTML = '<div class="section-heading"><p class="eyebrow"><span></span> نمونه‌کارها</p><h2>از ایده تا اجرای<br><em>تمیز و ماندگار.</em></h2></div><div class="project-grid"><article><div class="before-after"><img src="www.chadortent.ir6.jpg" alt="پروژه سفارشی چادر در طبیعت"><span>پروژه سفارشی</span></div><h3>چادر سفارشی کمپ</h3><p>طراحی‌شده برای فضای خواب بیشتر، با انتخاب پارچه و ابعاد متناسب با خودرو.</p></article><article><div class="before-after"><img src="www.chadortent.ir8.jpg" alt="بازسازی و تعمیر چادر کمپینگ"><span>بعد از تعمیر</span></div><h3>تعمیر و بازسازی</h3><p>تقویت نقاط آسیب‌دیده و ترمیم دوخت برای بازگشت چادر به مسیر سفر.</p></article></div>';
    serviceList.after(projects);
  }
  const articleGrid = document.querySelector('.article-grid');
  if (articleGrid) {
    const repairArticle = document.createElement('article');
    repairArticle.className = 'article-card';
    repairArticle.innerHTML = '<span>تعمیر و بازسازی</span><h2>تعمیر چادر مسافرتی: راهنمای کامل تشخیص آسیب و ترمیم اصولی</h2><p>از پارگی پارچه و خرابی زیپ تا نفوذ آب و شکستگی میله؛ در این راهنما روش تشخیص آسیب، زمان مناسب تعمیر و نکات پیشگیری را می‌خوانید.</p><a class="text-link" href="repair-tent.html">مطالعه راهنمای کامل <i data-lucide="arrow-left"></i></a>';
    articleGrid.appendChild(repairArticle);
    const springArticle = document.createElement('article');
    springArticle.className = 'article-card';
    springArticle.innerHTML = '<span>تعمیر فنر</span><h2>راهنمای کامل تعمیر فنر چادر مسافرتی</h2><p>علائم خرابی فنر، ابزارهای لازم، روش اصلاح خم‌شدگی و تقویت شکستگی را در این راهنمای کاربردی بخوانید.</p><a class="text-link" href="spring-tent-repair.html">خواندن مقاله <i data-lucide="arrow-left"></i></a>';
    articleGrid.appendChild(springArticle);
    if (window.lucide) lucide.createIcons();
  }
  const values = document.querySelector('.values');
  if (values) {
    const experience = document.createElement('section');
    experience.className = 'experience-copy';
    experience.innerHTML = '<p class="eyebrow"><span></span> تجربه‌ای که در دوخت دیده می‌شود</p><h2>چرا آمل؟ چرا چادردوزی جزیره؟</h2><p>آمل برای ما فقط محل کارگاه نیست؛ نقطه‌ای نزدیک به جاده، جنگل و مسیرهای شمال است. تیم دوخت J.A.T از انتخاب پارچه تا کنترل نهایی، هر سفارش را با نگاه کاربردی و دقت دست‌دوز آماده می‌کند.</p><div><strong>سال‌ها</strong><span>تجربه در تولید و تعمیر</span><strong>۱۰۰٪</strong><span>تمرکز روی نیاز هر سفارش</span></div>';
    values.before(experience);
  }
  const whatsappUrl = 'https://wa.me/989158017134?text=%D8%AF%D8%B1%D9%88%D8%AF%20%D9%85%DB%8C%E2%80%8C%D8%AE%D9%88%D8%A7%D9%85%20%D8%AF%D8%B1%20%D9%85%D9%88%D8%B1%D8%AF%20%DA%86%D8%A7%D8%AF%D8%B1%20%D9%85%D8%B4%D8%A7%D9%88%D8%B1%D9%87%20%D8%A8%DA%AF%DB%8C%D8%B1%D9%85';
  const floatingWhatsapp = document.createElement('a');
  floatingWhatsapp.className = 'floating-whatsapp';
  floatingWhatsapp.href = whatsappUrl;
  floatingWhatsapp.target = '_blank';
  floatingWhatsapp.rel = 'noreferrer';
  floatingWhatsapp.setAttribute('aria-label', 'تماس در واتساپ');
  floatingWhatsapp.innerHTML = '<i data-lucide="message-circle"></i><span>مشاوره واتساپ</span>';
  document.body.appendChild(floatingWhatsapp);
  if (window.lucide) lucide.createIcons();
  menuButton.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', nav.classList.contains('is-open'));
  });
});