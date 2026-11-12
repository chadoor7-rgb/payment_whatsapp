
/* ==================================================
   CHADOOOR J.A.T
   نسخه یکپارچه اصلاح‌شده
   منوی موبایل، سبد خرید، واتساپ، محصولات،
   جست‌وجو، فیلتر و قیمت استعلامی
================================================== */

(function () {
  "use strict";

  const CART_KEY = "chadoor_cart";
  const WA_NUMBER = "989118031241";
  const FALLBACK_IMAGE = "hero-chadoor.webp";

  /* ---------- ابزارهای عمومی ---------- */

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function normalizeText(value) {
    return String(value ?? "")
      .toLowerCase()
      .replace(/ي/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/ۀ/g, "ه")
      .replace(/ة/g, "ه")
      .replace(/[\u064B-\u065F\u0670]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function formatPrice(price) {
    const value = Math.max(0, Number(price) || 0);

    return value > 0
      ? value.toLocaleString("fa-IR") + " تومان"
      : "جهت استعلام قیمت تماس بگیرید";
  }

  function safeImagePath(value) {
    const path = String(value || "").trim();

    if (
      !path ||
      /^(?:javascript:|data:|https?:\/\/|\/\/)/i.test(path)
    ) {
      return FALLBACK_IMAGE;
    }

    return path;
  }

  /* ---------- دسته‌بندی محصولات ---------- */

  function getFilterCategory(category) {
    const categoryMap = {
      "چادر برزنتی": "tarpaulin",
      "برزنتی": "tarpaulin",

      "چادر مسافرتی": "travel",
      "چادر کوهنوردی": "travel",

      "چادر کودک": "kids",

      "پشه‌بند": "accessories",
      "پشه بند": "accessories",
      "تجهیزات کمپینگ": "accessories",
      "روکش خودرو": "accessories",

      "خدمات": "services"
    };

    return categoryMap[String(category || "").trim()] || "all";
  }

  /* ---------- سبد خرید ---------- */

  function getCart() {
    try {
      const raw = localStorage.getItem(CART_KEY);
      const data = raw ? JSON.parse(raw) : [];

      if (!Array.isArray(data)) return [];

      return data
        .filter((item) =>
          item &&
          item.id !== undefined &&
          item.id !== null &&
          Number.isFinite(Number(item.id)) &&
          Number(item.id) > 0
        )
        .map((item) => ({
          id: item.id,
          name: String(item.name || "محصول"),
          price: Math.max(0, Number(item.price) || 0),
          image: String(item.image || ""),
          qty: Math.max(1, Math.floor(Number(item.qty) || 1))
        }));

    } catch (error) {
      console.warn("خطا در خواندن سبد خرید:", error);
      return [];
    }
  }

  function updateCartCount() {
    const total = getCart().reduce(
      (sum, item) => sum + item.qty,
      0
    );

    document.querySelectorAll("#cartCount").forEach((node) => {
      node.textContent = total.toLocaleString("fa-IR");
    });
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartCount();
      return true;

    } catch (error) {
      console.error("خطا در ذخیره سبد خرید:", error);

      alert("ذخیره سبد خرید امکان‌پذیر نیست. تنظیمات مرورگر را بررسی کنید.");

      return false;
    }
  }

  function addToCart(product) {
    if (!product || product.id === undefined) return;

    const id = Number(product.id);

    if (!Number.isFinite(id) || id <= 0) {
      console.warn("شناسه محصول نامعتبر است.");
      return;
    }

    const cart = getCart();

    const existing = cart.find(
      (item) => Number(item.id) === id
    );

    if (existing) {
      existing.qty += 1;
      existing.name = String(product.name || existing.name);
      existing.image = String(product.image || existing.image);
      existing.price = Math.max(0, Number(product.price) || 0);

    } else {
      cart.push({
        id: id,
        name: String(product.name || "محصول"),
        price: Math.max(0, Number(product.price) || 0),
        image: String(product.image || ""),
        qty: 1
      });
    }

    if (saveCart(cart)) {
      alert("«" + String(product.name || "محصول") +
        "» به سبد خرید اضافه شد.");

      renderCartPage();
    }
  }

  window.chadoorAddToCart = addToCart;
  window.chadoorGetCart = getCart;
  window.chadoorUpdateCartCount = updateCartCount;

  /* ---------- آیکون‌ها ---------- */

  function loadIcons() {
    if (
      window.lucide &&
      typeof window.lucide.createIcons === "function"
    ) {
      window.lucide.createIcons();
    }
  }

  /* ---------- منوی موبایل ---------- */

  function initMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".main-nav");
    const header = document.querySelector(".site-header");

    if (!menuButton || !nav) return;

    if (menuButton.dataset.menuInitialized === "true") return;

    menuButton.dataset.menuInitialized = "true";

    let overlay = document.getElementById("navOverlay");

    if (!overlay) {
      overlay = document.createElement("button");
      overlay.id = "navOverlay";
      overlay.className = "nav-overlay";
      overlay.type = "button";
      overlay.setAttribute("aria-label", "بستن منو");
      overlay.setAttribute("aria-hidden", "true");

      document.body.appendChild(overlay);
    }

    function openMenu() {
      nav.classList.add("open");

      menuButton.setAttribute("aria-expanded", "true");
      menuButton.setAttribute("aria-label", "بستن منو");

      document.body.style.overflow = "hidden";

      overlay.classList.add("show");
      overlay.setAttribute("aria-hidden", "false");

      if (header) header.style.zIndex = "10060";
    }

    function closeMenu() {
      nav.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "باز کردن منو");

      document.body.style.overflow = "";

      overlay.classList.remove("show");
      overlay.setAttribute("aria-hidden", "true");

      if (header) header.style.zIndex = "";
    }

    menuButton.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();

      nav.classList.contains("open")
        ? closeMenu()
        : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (
        event.key === "Escape" &&
        nav.classList.contains("open")
      ) {
        closeMenu();
      }
    });
  }

  /* ---------- فرم تماس با واتساپ ---------- */

  function initContactForms() {
    document.querySelectorAll(".contact-form").forEach((form) => {
      if (form.dataset.waFormInitialized === "true") return;

      form.dataset.waFormInitialized = "true";

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name =
          form.querySelector("#name")?.value.trim() || "کاربر";

        const phone =
          form.querySelector("#phone")?.value.trim() || "ثبت نشده";

        const service =
          form.querySelector("#service")?.value || "سفارش عمومی";

        const request =
          form.querySelector("#request")?.value.trim() || "بدون توضیح";

        const message =
          "سلام چادردوزی جزیره\n\n" +
          "نام: " + name +
          "\nشماره تماس: " + phone +
          "\nنوع خدمت: " + service +
          "\nتوضیحات:\n" + request;

        const whatsappUrl =
          "https://wa.me/" + WA_NUMBER +
          "?text=" + encodeURIComponent(message);

        window.open(
          whatsappUrl,
          "_blank",
          "noopener,noreferrer"
        );

        const status = form.querySelector(".form-message");

        if (status) {
          status.textContent =
            "برای ارسال پیام، آن را در واتساپ تأیید کنید.";

          status.classList.add("success");
        }
      });
    });
  }

  /* ---------- دکمه شناور واتساپ ---------- */

  function initFloatingWhatsApp() {
    if (document.querySelector(".floating-whatsapp")) return;

    const btn = document.createElement("a");

    btn.className = "floating-whatsapp";

    btn.href =
      "https://wa.me/" + WA_NUMBER +
      "?text=" +
      encodeURIComponent("سلام، درباره سفارش چادر مشاوره می‌خواهم.");

    btn.target = "_blank";
    btn.rel = "noopener noreferrer";

    btn.setAttribute("aria-label", "مشاوره واتساپ");

    btn.innerHTML =
      '<i data-lucide="message-circle" aria-hidden="true"></i>' +
      "<span>مشاوره واتساپ</span>";

    document.body.appendChild(btn);

    loadIcons();
  }

  /* ---------- فیلتر و جست‌وجوی فروشگاه ---------- */

  function initShopFilters() {
    const grid = document.querySelector("#productGrid");
    const search = document.querySelector("#shopSearch");
    const resultCount = document.querySelector("#shopResultCount");

    if (!grid) return;

    const buttons = document.querySelectorAll(".filter-btn");

    if (!grid.dataset.filterInitialized) {
      grid.dataset.filterInitialized = "true";
      grid.dataset.activeFilter = "all";
    }

    function applyFilters() {
      const activeFilter = grid.dataset.activeFilter || "all";

      const query = normalizeText(search?.value || "");

      const cards = grid.querySelectorAll(".product-card");

      let visible = 0;

      cards.forEach((card) => {
        const category = card.dataset.category || "all";

        const text = normalizeText(
          card.dataset.search ||
          card.textContent ||
          ""
        );

        const categoryMatch =
          activeFilter === "all" ||
          category === activeFilter;

        const searchMatch =
          !query || text.includes(query);

        const show = categoryMatch && searchMatch;

        card.hidden = !show;

        if (show) visible++;
      });

      if (resultCount) {
        resultCount.textContent =
          visible.toLocaleString("fa-IR") +
          " محصول از " +
          cards.length.toLocaleString("fa-IR") +
          " محصول";
      }
    }

    buttons.forEach((button) => {
      if (button.dataset.filterInitialized === "true") return;

      button.dataset.filterInitialized = "true";

      button.addEventListener("click", () => {
        const filter = button.dataset.filter || "all";

        grid.dataset.activeFilter = filter;

        buttons.forEach((item) => {
          item.classList.toggle("active", item === button);
        });

        applyFilters();
      });
    });

    if (
      search &&
      search.dataset.searchInitialized !== "true"
    ) {
      search.dataset.searchInitialized = "true";

      search.addEventListener("input", applyFilters);
    }

    applyFilters();
  }

  /* ---------- ساخت کارت محصول ---------- */

  function createProductCard(product) {
    const id = encodeURIComponent(String(product.id));
    const name = String(product.name || "محصول");
    const price = Math.max(0, Number(product.price) || 0);
    const image = safeImagePath(product.image);
    const category = getFilterCategory(product.category);

    const whatsappUrl =
      "https://wa.me/" + WA_NUMBER +
      "?text=" +
      encodeURIComponent(
        "سلام، درباره «" + name + "» سؤال دارم."
      );

    const article = document.createElement("article");

    article.className = "shop-card product-card";

    article.dataset.category = category;

    article.dataset.search = normalizeText(
      name + " " +
      String(product.description || "") + " " +
      String(product.category || "")
    );

    article.innerHTML =
      '<a href="product.html?id=' + id + '" class="shop-image">' +
        '<img src="' + esc(image) +
        '" alt="' + esc(name) +
        '" loading="lazy" decoding="async" width="400" height="300">' +
      "</a>" +

      '<div class="product-body" style="padding:1.1rem 1.2rem 1.3rem;display:flex;flex-direction:column;flex:1;">' +

        '<h3 style="font-size:1.05rem;margin:0 0 0.5rem;line-height:1.5;">' +
          '<a href="product.html?id=' + id +
          '" style="color:inherit;text-decoration:none;">' +
            esc(name) +
          "</a>" +
        "</h3>" +

        '<p style="font-size:0.88rem;color:#68736f;line-height:1.8;margin:0 0 1rem;flex:1;">' +
          esc(product.description || "") +
        "</p>" +

        '<div class="product-price" style="font-weight:800;font-size:1.05rem;color:#d32f2f;margin-bottom:0.9rem;">' +
          esc(formatPrice(price)) +
        "</div>" +

        '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;">' +

          '<a href="product.html?id=' + id +
          '" style="display:flex;align-items:center;justify-content:center;background:#155e55;color:#fff;text-decoration:none;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;">جزئیات</a>' +

          '<button type="button" class="add-cart-btn" data-id="' +
          esc(product.id) +
          '" data-name="' + esc(name) +
          '" data-price="' + price +
          '" data-image="' + esc(image) +
          '" style="background:#f0f7f5;color:#155e55;border:1px solid #155e55;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;cursor:pointer;font-family:inherit;">+ سبد</button>' +

          '<a href="' + esc(whatsappUrl) +
          '" target="_blank" rel="noopener noreferrer" ' +
          'style="display:flex;align-items:center;justify-content:center;background:#20b95a;color:#fff;text-decoration:none;border-radius:10px;padding:0.65rem 0.3rem;font-size:0.8rem;font-weight:700;">واتساپ</a>' +

        "</div>" +
      "</div>";

    const img = article.querySelector("img");

    img.addEventListener("error", function () {
      this.onerror = null;
      this.src = FALLBACK_IMAGE;
    });

    return article;
  }

  /* ---------- بارگذاری محصولات ---------- */

  function initShop() {
    const productGrid = document.querySelector("#productGrid");

    if (!productGrid) return;

    if (productGrid.dataset.shopInitialized === "true") return;

    productGrid.dataset.shopInitialized = "true";

    // فیلترها از ابتدا فعال باشند
    initShopFilters();

    fetch("products.json", { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("تعذر دریافت products.json");
        }

        return response.json();
      })

      .then((products) => {
        if (!Array.isArray(products) || products.length === 0) {
          productGrid.innerHTML =
            "<p style='text-align:center;padding:2rem;color:#68736f;'>محصولی یافت نشد.</p>";

          initShopFilters();
          return;
        }

        const fragment = document.createDocumentFragment();

        products.forEach((product) => {
          if (
            !product ||
            product.id === undefined ||
            product.id === null ||
            !product.name
          ) {
            return;
          }

          fragment.appendChild(createProductCard(product));
        });

        if (!fragment.childNodes.length) {
          productGrid.innerHTML =
            "<p style='text-align:center;padding:2rem;color:#68736f;'>محصول معتبری برای نمایش یافت نشد.</p>";

          return;
        }

        productGrid.replaceChildren(fragment);

        // اجرای دوباره فیلترها پس از بارگذاری محصولات
        initShopFilters();

        // فعال‌سازی اسکیما در صورت تعریف آن در shop.html
        if (typeof window.addShopSchema === "function") {
          window.addShopSchema(products);
        }

        loadIcons();
      })

      .catch((error) => {
        console.error("خطا در بارگذاری محصولات:", error);

        productGrid.innerHTML =
          "<p style='text-align:center;padding:2rem;color:#b42318;line-height:2;'>بارگذاری محصولات انجام نشد. وجود فایل products.json و معتبر بودن محتوای آن را بررسی کنید.</p>";

        initShopFilters();
      });
  }

  /* ---------- دکمه‌های سبد خرید ---------- */

  function initShopCartButtons() {
    if (
      document.documentElement.dataset.cartButtonsInitialized === "true"
    ) {
      return;
    }

    document.documentElement.dataset.cartButtonsInitialized = "true";

    document.addEventListener("click", (event) => {
      const button = event.target.closest(".add-cart-btn");

      if (!button) return;

      addToCart({
        id: button.dataset.id,
        name: button.dataset.name,
        price: Number(button.dataset.price) || 0,
        image: button.dataset.image || ""
      });
    });
  }

  /* ---------- نمایش سبد خرید ---------- */

  function renderCartPage() {
    const box = document.getElementById("cartItems");

    if (!box) return;

    const cart = getCart();

    if (!cart.length) {
      box.innerHTML =
        '<p style="text-align:center;padding:2rem;color:#68736f;">سبد خرید خالی است.</p>';

      return;
    }

    let total = 0;
    let hasQuoteItem = false;

    const rows = cart.map((item) => {
      const quantity = Math.max(1, Number(item.qty) || 1);
      const price = Math.max(0, Number(item.price) || 0);
      const lineTotal = price * quantity;

      total += lineTotal;

      if (price === 0) {
        hasQuoteItem = true;
      }

      return (
        '<div class="cart-row" data-id="' +
          esc(item.id) +
          '" style="display:flex;gap:12px;align-items:center;padding:12px 0;border-bottom:1px solid #e5e8e5;">' +

          '<img src="' +
            esc(safeImagePath(item.image)) +
            '" alt="' +
            esc(item.name) +
            '" width="64" height="64" style="object-fit:cover;border-radius:8px;" loading="lazy" decoding="async">' +

          '<div style="flex:1;min-width:0;">' +
            "<strong>" +
              esc(item.name) +
            "</strong><br>" +

            '<span style="color:#68736f;font-size:0.9rem;">تعداد: ' +
              quantity.toLocaleString("fa-IR") +
            "</span>" +
          "</div>" +

          '<div style="font-weight:700;white-space:nowrap;">' +
            (
              lineTotal > 0
                ? formatPrice(lineTotal)
                : "استعلام قیمت"
            ) +
          "</div>" +

          '<button type="button" class="cart-remove" data-id="' +
            esc(item.id) +
            '" aria-label="حذف محصول از سبد" style="border:0;background:#fee;color:#b42318;border-radius:8px;padding:6px 10px;cursor:pointer;">حذف</button>' +

        "</div>"
      );
    }).join("");

    const quoteNote = hasQuoteItem
      ? '<p style="color:#68736f;font-size:0.9rem;line-height:1.8;">مبلغ نهایی محصولاتی که قیمت مشخص ندارند، پس از استعلام اعلام می‌شود.</p>'
      : "";

    box.innerHTML =
      rows +
      '<div style="text-align:left;padding:1rem 0;font-weight:800;font-size:1.15rem;">جمع محصولات دارای قیمت: ' +
      (total > 0 ? formatPrice(total) : "استعلام قیمت") +
      "</div>" +
      quoteNote;
  }

  function initCartPage() {
    const box = document.getElementById("cartItems");

    if (!box) return;

    if (box.dataset.cartPageInitialized === "true") {
      renderCartPage();
      return;
    }

    box.dataset.cartPageInitialized = "true";

    box.addEventListener("click", (event) => {
      const button = event.target.closest(".cart-remove");

      if (!button) return;

      const id = Number(button.dataset.id);

      const nextCart = getCart().filter(
        (item) => Number(item.id) !== id
      );

      if (saveCart(nextCart)) {
        renderCartPage();
      }
    });

    renderCartPage();
  }

  /* ---------- تنظیم راست‌چین جست‌وجوی گوگل ---------- */

  function fixGoogleSearchDir() {
    const input = document.querySelector(
      ".gsc-input, input.gsc-input"
    );

    const wrapper = document.querySelector(
      ".gsc-control-wrapper-cse"
    );

    if (wrapper) {
      wrapper.setAttribute("dir", "rtl");
    }

    if (input) {
      input.setAttribute("dir", "rtl");
      input.style.direction = "rtl";
      input.style.textAlign = "right";
    }
  }

  /* ---------- راه‌اندازی اصلی ---------- */

  function boot() {
    updateCartCount();
    initMenu();
    initContactForms();
    initFloatingWhatsApp();
    initShopCartButtons();
    initShop();
    initCartPage();
    loadIcons();
    fixGoogleSearchDir();

    window.setTimeout(fixGoogleSearchDir, 1000);
    window.setTimeout(fixGoogleSearchDir, 3000);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      boot,
      { once: true }
    );
  } else {
    boot();
  }

})();
