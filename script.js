/* ==================================================
   CHADOOOR J.A.T
   FINAL SCRIPT
================================================== */


document.addEventListener("DOMContentLoaded", () => {


  /* ================= LUCIDE ICONS ================= */

  function loadIcons(){

    if(window.lucide){

      lucide.createIcons();

    }

  }


  loadIcons();



  /* ================= MOBILE MENU ================= */


  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");


  if(menuButton && nav){


    menuButton.addEventListener("click",()=>{


      const opened = nav.classList.toggle("open");


      menuButton.setAttribute(
        "aria-expanded",
        opened ? "true" : "false"
      );


    });



    // بستن منو با کلیک روی لینک

    nav.querySelectorAll("a").forEach(link=>{


      link.addEventListener("click",()=>{

        nav.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });


    });


  }





  /* ================= CONTACT FORM ================= */


  const contactForms =
  document.querySelectorAll(".contact-form");


  contactForms.forEach(form=>{


    form.addEventListener("submit",(event)=>{


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

`سلام چادردوزی جزیره

نام: ${name}

شماره تماس: ${phone}

نوع خدمت: ${service}

توضیحات:
${request}`;




      const whatsapp =

      "https://wa.me/989118031241?text="

      + encodeURIComponent(message);



      window.open(
        whatsapp,
        "_blank",
        "noopener"
      );




      const status =
      form.querySelector(".form-message");



      if(status){


        status.textContent =
        "درخواست شما در واتساپ ارسال شد.";


        status.classList.add("success");


      }



      form.reset();



    });


  });







  /* ================= FLOATING WHATSAPP ================= */


  if(!document.querySelector(".floating-whatsapp")){


    const whatsappButton =
    document.createElement("a");



    whatsappButton.className =
    "floating-whatsapp";



    whatsappButton.href =
    "https://wa.me/989118031241?text="
    +
    encodeURIComponent(
      "سلام، درباره سفارش چادر مشاوره می‌خواهم."
    );



    whatsappButton.target="_blank";


    whatsappButton.rel =
    "noopener noreferrer";



    whatsappButton.setAttribute(
      "aria-label",
      "مشاوره واتساپ"
    );



    whatsappButton.innerHTML =

    `
    <i data-lucide="message-circle"></i>
    <span>مشاوره واتساپ</span>
    `;



    document.body.appendChild(
      whatsappButton
    );



  }



  loadIcons();



});
