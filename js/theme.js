(function () {
  "use strict";

  var storageKey = "star-launcher-theme";
  var root = document.documentElement;
  var savedTheme;

  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  var theme = savedTheme === "light" ? "light" : "dark";
  root.dataset.theme = theme;

  function updateThemeColor(selectedTheme) {
    var themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      var selectedColor = getComputedStyle(root).getPropertyValue("--color-theme-meta").trim();
      themeColor.setAttribute("content", selectedColor);
    }
  }

  function updateToggle(toggle, selectedTheme) {
    var nextTheme = selectedTheme === "dark" ? "light" : "dark";
    toggle.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
    toggle.setAttribute("title", "Switch to " + nextTheme + " theme");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector("[data-theme-toggle]");
    updateThemeColor(theme);

    if (!toggle) {
      return;
    }

    updateToggle(toggle, theme);

    toggle.addEventListener("click", function () {
      theme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = theme;

      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        // The selected theme still applies for the current visit.
      }

      updateThemeColor(theme);
      updateToggle(toggle, theme);
    });
  });
})();
