/* ==================================================
   CHADOOOR J.A.T - FINAL SCRIPT + CART
================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const CART_KEY = "chadoor_cart";

  function getCart(){
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  }

  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount(){
    const cart = getCart();
    const total = cart.reduce((s, i) => s + (Number(i.qty) || 0), 0);
    document.querySelectorAll("#cartCount").forEach(el => {
      if(el) el.textContent = total;
    });
  }

  function addToCart(product){
    const cart = getCart();
    const existing = cart.find(i => Number(i.id) === Number(product.id));
    if(existing){
      existing.qty = (Number(existing.qty) || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price || 0,
        image: product.image || "",
        qty: 1
      });
    }
    saveCart(cart);
    alert("«" + product.name + "» به سبد خرید اضافه شد.");
  }

  // در دسترس قرار دادن تابع برای صفحات دیگر
  window.chadoorAddToCart = addToCart;
  window.chadoorUpdateCartCount = updateCartCount;

  updateCartCount();

  /* ================= LUCIDE ICONS ================= */
  function loadIcons(){
    if(window.lucide) lucide.createIcons();
  }
  loadIcons();

  /* ================= MOBILE MENU ================= */
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if(menuButton && nav){
    menuButton.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ================= CONTACT FORM ================= */
  document.querySelectorAll(".contact-form").forEach(form => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = form.querySelector("#name")?.value.trim() || "کاربر";
      const phone = form.querySelector("#phone")?.value.trim() || "ثبت نشده";
      const service = form.querySelector("#service")?.value || "سفارش عمومی";
      const request = form.querySelector("#request")?.value.trim() || "بدون توضیح";
      const message = `سلام چادردوزی جزیره\n\nنام: ${name}\nشماره تماس: ${phone}\nنوع خدمت: ${service}\nتوضیحات:\n${request}`;
      window.open("https://wa.me/989118031241?text=" + encodeURIComponent(message), "_blank", "noopener");
      const status = form.querySelector(".form-message");
      if(status){ status.textContent = "درخواست شما در واتساپ ارسال شد."; status.classList.add("success"); }
      form.reset();
    });
  });

  /* ================= FLOATING WHATSAPP ================= */
  if(!document.querySelector(".floating-whatsapp")){
    const btn = document.createElement("a");
    btn.className = "floating-whatsapp";
    btn.href = "https://wa.me/989118031241?text=" + encodeURIComponent("سلام، درباره سفارش چادر مشاوره می‌خواهم.");
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.setAttribute("aria-label", "مشاوره واتساپ");
    btn.innerHTML = `<i data-lucide="message-circle"></i><span>مشاوره واتساپ</span>`;
    document.body.appendChild(btn);
    loadIcons();
  }

  /* ================= SHOP PRODUCTS ================= */
  const productGrid = document.querySelector("#productGrid") || document.querySelector(".shop-grid");

  if(productGrid){
    fetch("products.json")
    .then(r => r.json())
    .then(products => {
      productGrid.innerHTML = products.map(product => `
        <article class="shop-card product-card">
          <a href="product.html?id=${product.id}" class="shop-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='hero-chadoor.webp'">
          </a>
          <div style="padding:1.1rem 1.2rem 1.3rem; display:flex; flex-direction:column; flex:1;">
            <h3 style="font-size:1.05rem; margin:0 0 0.5rem; line-height:1.5;">
              <a href="product.html?id=${product.id}" style="color:inherit; text-decoration:none;">${product.name}</a>
            </h3>
            <p style="font-size:0.88rem; color:#68736f; line-height:1.7; margin:0 0 1rem; flex:1;">
              ${product.description || ""}
            </p>
            <div style="font-weight:800; font-size:1.1rem; color:#d32f2f; margin-bottom:0.9rem;">
              ${product.price > 0 ? product.price.toLocaleString("fa-IR") + " تومان" : "تماس برای قیمت"}
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px;">
              <a href="product.html?id=${product.id}"
                 style="display:flex;align-items:center;justify-content:center;background:#155e55;color:#fff;text-decoration:none;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;">
                جزئیات
              </a>
              <button type="button" class="add-cart-btn"
                 data-id="${product.id}"
                 data-name="${product.name}"
                 data-price="${product.price || 0}"
                 data-image="${product.image || ""}"
                 style="background:#f0f7f5;color:#155e55;border:1px solid #155e55;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;cursor:pointer;font-family:inherit;">
                + سبد
              </button>
              <a href="https://wa.me/989118031241?text=${encodeURIComponent("سلام، درباره «" + product.name + "» سوال دارم.")}"
                 target="_blank" rel="noopener"
                 style="display:flex;align-items:center;justify-content:center;background:#20b95a;color:#fff;text-decoration:none;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;">
                واتساپ
              </a>
            </div>
          </div>
        </article>
      `).join("");

      // رویداد افزودن به سبد
      productGrid.querySelectorAll(".add-cart-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          addToCart({
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price) || 0,
            image: btn.dataset.image
          });
        });
      });

      loadIcons();
    })
    .catch(err => {
      productGrid.innerHTML = "<p style='text-align:center;padding:2rem;color:#b42318;'>خطا در بارگذاری محصولات</p>";
      console.error(err);
    });
  }

});
