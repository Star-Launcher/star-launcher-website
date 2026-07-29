(function () {
  "use strict";

  var toggle = document.querySelector("[data-menu-toggle]");
  var navigation = document.querySelector("[data-navigation]");

  if (!toggle || !navigation) {
    return;
  }

  function closeNavigation() {
    navigation.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.querySelector(".sr-only").textContent = "Open navigation";
  }

  toggle.addEventListener("click", function () {
    var isOpen = navigation.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.querySelector(".sr-only").textContent = isOpen ? "Close navigation" : "Open navigation";
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.matches("a")) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNavigation();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      closeNavigation();
    }
  });
})();
