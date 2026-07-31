(function () {
  "use strict";

  var header = document.querySelector("[data-site-header]");
  var year = document.querySelector("[data-current-year]");
  var copyEmailButton = document.querySelector("[data-copy-email]");
  var copyStatus = document.querySelector("[data-copy-status]");
  var lightbox = document.querySelector("[data-screenshot-lightbox]");
  var lightboxImage = document.querySelector("[data-lightbox-preview]");
  var lightboxTitle = document.querySelector("[data-lightbox-title]");
  var lightboxClose = document.querySelector("[data-lightbox-close]");
  var screenshotLinks = document.querySelectorAll("[data-lightbox-image]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function fallbackCopy(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    var copied = document.execCommand("copy");
    textArea.remove();
    return copied;
  }

  if (copyEmailButton && copyStatus) {
    copyEmailButton.addEventListener("click", function () {
      var emailAddress = copyEmailButton.getAttribute("data-copy-email");
      var copyPromise;

      if (navigator.clipboard && window.isSecureContext) {
        copyPromise = navigator.clipboard.writeText(emailAddress);
      } else {
        copyPromise = fallbackCopy(emailAddress)
          ? Promise.resolve()
          : Promise.reject(new Error("Copy unavailable"));
      }

      copyPromise.then(function () {
        copyStatus.textContent = "Email address copied.";
      }).catch(function () {
        copyStatus.textContent = "Copy failed. Email: " + emailAddress;
      });
    });
  }

  if (lightbox && lightboxImage && lightboxTitle && lightboxClose && typeof lightbox.showModal === "function") {
    screenshotLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var thumbnail = link.querySelector("img");
        var caption = link.querySelector(".screenshot-caption strong");

        event.preventDefault();
        lightboxImage.src = link.href;
        lightboxImage.alt = thumbnail ? thumbnail.alt : "Star-Launcher screenshot";
        lightboxTitle.textContent = caption ? caption.textContent : "Star-Launcher screenshot";
        lightbox.showModal();
      });
    });

    lightboxClose.addEventListener("click", function () {
      lightbox.close();
    });

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) {
        lightbox.close();
      }
    });

    lightbox.addEventListener("close", function () {
      lightboxImage.removeAttribute("src");
      lightboxImage.alt = "";
    });
  }

  if (!header) {
    return;
  }

  function updateHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
