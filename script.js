/* ==================================================
   CHADOOOR J.A.T - OPTIMIZED SCRIPT + CART
================================================== */

(function () {
  "use strict";

  const CART_KEY = "chadoor_cart";
  const WA_NUMBER = "989118031241";

  /* ---------- Cart ---------- */
  function getCart() {
    try {
      const data = localStorage.getItem(CART_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function updateCartCount() {
    const total = getCart().reduce((s, i) => s + (Number(i.qty) || 0), 0);
    const nodes = document.querySelectorAll("#cartCount");
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].textContent = total;
    }
  }

  function addToCart(product) {
    const cart = getCart();
    const id = Number(product.id);
    const existing = cart.find((i) => Number(i.id) === id);

    if (existing) {
      existing.qty = (Number(existing.qty) || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        image: product.image || "",
        qty: 1
      });
    }

    saveCart(cart);
    alert("«" + product.name + "» به سبد خرید اضافه شد.");
  }

  window.chadoorAddToCart = addToCart;
  window.chadoorUpdateCartCount = updateCartCount;
  window.chadoorGetCart = getCart;

  /* ---------- Icons (optional Lucide) ---------- */
  function loadIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    if (!menuButton || !nav) return;

    menuButton.addEventListener("click", () => {
      const opened = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", opened ? "true" : "false");
    });

    // یک listener با delegation به‌جای یکی برای هر لینک
    nav.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- Contact form → WhatsApp ---------- */
  function initContactForms() {
    const forms = document.querySelectorAll(".contact-form");
    if (!forms.length) return;

    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = form.querySelector("#name")?.value.trim() || "کاربر";
        const phone = form.querySelector("#phone")?.value.trim() || "ثبت نشده";
        const service = form.querySelector("#service")?.value || "سفارش عمومی";
        const request = form.querySelector("#request")?.value.trim() || "بدون توضیح";
        const message =
          "سلام چادردوزی جزیره\n\nنام: " +
          name +
          "\nشماره تماس: " +
          phone +
          "\nنوع خدمت: " +
          service +
          "\nتوضیحات:\n" +
          request;

        window.open(
          "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(message),
          "_blank",
          "noopener,noreferrer"
        );

        const status = form.querySelector(".form-message");
        if (status) {
          status.textContent = "درخواست شما در واتساپ ارسال شد.";
          status.classList.add("success");
        }
        form.reset();
      });
    });
  }

  /* ---------- Floating WhatsApp ---------- */
  function initFloatingWhatsApp() {
    if (document.querySelector(".floating-whatsapp")) return;

    const btn = document.createElement("a");
    btn.className = "floating-whatsapp";
    btn.href =
      "https://wa.me/" +
      WA_NUMBER +
      "?text=" +
      encodeURIComponent("سلام، درباره سفارش چادر مشاوره می‌خواهم.");
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.setAttribute("aria-label", "مشاوره واتساپ");
    btn.innerHTML = '<i data-lucide="message-circle"></i><span>مشاوره واتساپ</span>';
    document.body.appendChild(btn);
    loadIcons();
  }

  /* ---------- Escape HTML (XSS-safe for names) ---------- */
  function esc(str) {
    return String(str ?? "").replace(/[&<>"']/g, (m) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])
    );
  }

  /* ---------- Shop products ---------- */
  function initShop() {
    const productGrid =
      document.querySelector("#productGrid") || document.querySelector(".shop-grid");
    if (!productGrid) return;

    fetch("products.json")
      .then((r) => {
        if (!r.ok) throw new Error("products.json");
        return r.json();
      })
      .then((products) => {
        if (!Array.isArray(products) || !products.length) {
          productGrid.innerHTML =
            "<p style='text-align:center;padding:2rem;color:#68736f;'>محصولی یافت نشد.</p>";
          return;
        }

        const frag = document.createDocumentFragment();

        for (let i = 0; i < products.length; i++) {
          const p = products[i];
          const priceText =
            Number(p.price) > 0
              ? Number(p.price).toLocaleString("fa-IR") + " تومان"
              : "تماس برای قیمت";

          const waUrl =
            "https://wa.me/" +
            WA_NUMBER +
            "?text=" +
            encodeURIComponent("سلام، درباره «" + (p.name || "") + "» سوال دارم.");

          const article = document.createElement("article");
          article.className = "shop-card product-card";
          article.innerHTML =
            '<a href="product.html?id=' +
            p.id +
            '" class="shop-image">' +
            '<img src="' +
            esc(p.image || "hero-chadoor.webp") +
            '" alt="' +
            esc(p.name) +
            '" loading="lazy" decoding="async" width="400" height="300" onerror="this.src=\'hero-chadoor.webp\'">' +
            "</a>" +
            '<div style="padding:1.1rem 1.2rem 1.3rem;display:flex;flex-direction:column;flex:1;">' +
            '<h3 style="font-size:1.05rem;margin:0 0 0.5rem;line-height:1.5;">' +
            '<a href="product.html?id=' +
            p.id +
            '" style="color:inherit;text-decoration:none;">' +
            esc(p.name) +
            "</a></h3>" +
            '<p style="font-size:0.88rem;color:#68736f;line-height:1.7;margin:0 0 1rem;flex:1;">' +
            esc(p.description || "") +
            "</p>" +
            '<div style="font-weight:800;font-size:1.1rem;color:#d32f2f;margin-bottom:0.9rem;">' +
            priceText +
            "</div>" +
            '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">' +
            '<a href="product.html?id=' +
            p.id +
            '" style="display:flex;align-items:center;justify-content:center;background:#155e55;color:#fff;text-decoration:none;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;">جزئیات</a>' +
            '<button type="button" class="add-cart-btn" data-id="' +
            p.id +
            '" data-name="' +
            esc(p.name) +
            '" data-price="' +
            (p.price || 0) +
            '" data-image="' +
            esc(p.image || "") +
            '" style="background:#f0f7f5;color:#155e55;border:1px solid #155e55;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;cursor:pointer;font-family:inherit;">+ سبد</button>' +
            '<a href="' +
            waUrl +
            '" target="_blank" rel="noopener" style="display:flex;align-items:center;justify-content:center;background:#20b95a;color:#fff;text-decoration:none;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;">واتساپ</a>' +
            "</div></div>";

          frag.appendChild(article);
        }

        productGrid.replaceChildren(frag);

        // یک listener برای همه دکمه‌ها
        productGrid.addEventListener("click", (e) => {
          const btn = e.target.closest(".add-cart-btn");
          if (!btn) return;
          addToCart({
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: Number(btn.dataset.price) || 0,
            image: btn.dataset.image
          });
        });

        loadIcons();
      })
      .catch(() => {
        productGrid.innerHTML =
          "<p style='text-align:center;padding:2rem;color:#b42318;'>خطا در بارگذاری محصولات</p>";
      });
  }

  /* ---------- Cart page (اگر #cartItems وجود داشته باشد) ---------- */
  function initCartPage() {
    const box = document.getElementById("cartItems");
    if (!box) return;

    const cart = getCart();
    if (!cart.length) {
      box.innerHTML =
        '<p style="text-align:center;padding:2rem;color:#68736f;">سبد خرید خالی است.</p>';
      return;
    }

    let total = 0;
    const rows = cart
      .map((item) => {
        const line = (Number(item.price) || 0) * (Number(item.qty) || 1);
        total += line;
        return (
          '<div class="cart-row" data-id="' +
          item.id +
          '" style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #e5e8e5;">' +
          '<img src="' +
          esc(item.image || "hero-chadoor.webp") +
          '" alt="" width="64" height="64" style="object-fit:cover;border-radius:8px;" loading="lazy" decoding="async" onerror="this.src=\'hero-chadoor.webp\'">' +
          '<div style="flex:1;">' +
          "<strong>" +
          esc(item.name) +
          "</strong><br>" +
          '<span style="color:#68736f;font-size:0.9rem;">تعداد: ' +
          item.qty +
          "</span>" +
          "</div>" +
          '<div style="font-weight:700;">' +
          (line > 0 ? line.toLocaleString("fa-IR") + " تومان" : "—") +
          "</div>" +
          '<button type="button" class="cart-remove" data-id="' +
          item.id +
          '" style="border:0;background:#fee;color:#b42318;border-radius:8px;padding:6px 10px;cursor:pointer;">حذف</button>' +
          "</div>"
        );
      })
      .join("");

    box.innerHTML =
      rows +
      '<div style="text-align:left;padding:1rem 0;font-weight:800;font-size:1.15rem;">جمع: ' +
      (total > 0 ? total.toLocaleString("fa-IR") + " تومان" : "تماس برای قیمت") +
      "</div>";

    box.addEventListener("click", (e) => {
      const btn = e.target.closest(".cart-remove");
      if (!btn) return;
      const id = Number(btn.dataset.id);
      const next = getCart().filter((i) => Number(i.id) !== id);
      saveCart(next);
      initCartPage();
    });
  }

  /* ---------- Boot ---------- */
  function boot() {
    updateCartCount();
    initMenu();
    initContactForms();
    initFloatingWhatsApp();
    initShop();
    initCartPage();
    loadIcons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
