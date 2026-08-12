(function () {
  "use strict";

  var path = window.location.pathname.replace(/\\/g, "/");
  var fileName = path.split("/").pop() || "index.html";
  var isInnerPage = path.indexOf("/pages/") !== -1;
  var homePath = isInnerPage ? "../index.html" : "#top";
  var pagePrefix = isInnerPage ? "" : "pages/";
  var communityPath = isInnerPage ? "../index.html#community" : "#community";
  var config = window.STAR_LAUNCHER_SITE_CONFIG || {};
  var toggle = document.querySelector("[data-menu-toggle]");
  var navigation = document.querySelector("[data-navigation]");

  var guidePages = ["installation.html", "setup.html", "controller-setup.html", "faq.html", "troubleshooting.html"];
  var securityPages = ["security.html", "verify-download.html"];

  function currentSection() {
    if (!isInnerPage || fileName === "index.html") {
      return "home";
    }
    if (fileName === "download.html") {
      return "download";
    }
    if (guidePages.indexOf(fileName) !== -1) {
      return "guides";
    }
    if (fileName === "release-notes.html") {
      return "updates";
    }
    if (securityPages.indexOf(fileName) !== -1) {
      return "security";
    }
    return "";
  }

  function buildGlobalNavigation() {
    if (!navigation) {
      return;
    }

    var section = currentSection();
    var links = [
      { key: "home", label: "Home", href: homePath },
      { key: "download", label: "Download", href: pagePrefix + "download.html" },
      { key: "guides", label: "Guides & Help", href: pagePrefix + "installation.html" },
      { key: "updates", label: "Updates", href: pagePrefix + "release-notes.html" },
      { key: "security", label: "Security", href: pagePrefix + "security.html" },
      { key: "community", label: "Community", href: communityPath }
    ];

    navigation.replaceChildren();
    links.forEach(function (link) {
      var anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.key === section) {
        anchor.setAttribute("aria-current", "page");
      }
      navigation.appendChild(anchor);
    });
  }

  function addReleaseNotice() {
    var header = document.querySelector("[data-site-header]");
    var noticeConfig = config.releaseNotice;

    if (!header || !noticeConfig || !noticeConfig.enabled) {
      return;
    }

    var notice = document.createElement("div");
    var noticeInner = document.createElement("div");
    var label = document.createElement("strong");
    var link = document.createElement("a");
    var noticePath = isInnerPage ? "../" + noticeConfig.path : noticeConfig.path;

    notice.className = "release-notice";
    notice.setAttribute("role", "note");
    noticeInner.className = "container release-notice-inner";
    label.textContent = noticeConfig.label;
    link.href = noticePath;
    link.textContent = noticeConfig.linkLabel;
    noticeInner.append(label, link);
    notice.appendChild(noticeInner);
    header.appendChild(notice);
    document.body.classList.add("has-release-notice");
  }

  function addBreadcrumbs() {
    if (!isInnerPage) {
      return;
    }

    var hero = document.querySelector(".docs-hero-inner");
    if (!hero || hero.querySelector(".breadcrumbs")) {
      return;
    }

    var labels = {
      "download.html": ["Download"],
      "installation.html": ["Guides & Help", "Installation"],
      "setup.html": ["Guides & Help", "Setup guide"],
      "controller-setup.html": ["Guides & Help", "Controller setup"],
      "faq.html": ["Guides & Help", "FAQ"],
      "troubleshooting.html": ["Guides & Help", "Troubleshooting"],
      "release-notes.html": ["Updates", "Release notes"],
      "security.html": ["Security", "Security & privacy"],
      "verify-download.html": ["Security", "Verify a download"],
      "gear.html": ["Recommended Gear"]
    };
    var trail = labels[fileName];

    if (!trail) {
      return;
    }

    var breadcrumbs = document.createElement("nav");
    var list = document.createElement("ol");
    var homeItem = document.createElement("li");
    var homeLink = document.createElement("a");

    breadcrumbs.className = "breadcrumbs";
    breadcrumbs.setAttribute("aria-label", "Breadcrumb");
    homeLink.href = "../index.html";
    homeLink.textContent = "Home";
    homeItem.appendChild(homeLink);
    list.appendChild(homeItem);

    trail.forEach(function (item, index) {
      var listItem = document.createElement("li");
      listItem.textContent = item;
      if (index === trail.length - 1) {
        listItem.setAttribute("aria-current", "page");
      }
      list.appendChild(listItem);
    });

    breadcrumbs.appendChild(list);
    hero.prepend(breadcrumbs);
  }

  function normalizeSidebar() {
    var sidebar = document.querySelector(".docs-sidebar");
    if (!sidebar) {
      return;
    }

    var title = sidebar.querySelector("strong");
    var sidebarNavigation = sidebar.querySelector("nav");
    var items = [
      { href: "download.html", label: "Download" },
      { group: "Guides & Help" },
      { href: "installation.html", label: "Installation" },
      { href: "setup.html", label: "Setup guide" },
      { href: "controller-setup.html", label: "Controller setup" },
      { href: "faq.html", label: "FAQ" },
      { href: "troubleshooting.html", label: "Troubleshooting" },
      { group: "Updates" },
      { href: "release-notes.html", label: "Release notes" },
      { group: "Security" },
      { href: "security.html", label: "Security & privacy" },
      { href: "verify-download.html", label: "Verify a download" }
    ];

    if (!title || !sidebarNavigation) {
      return;
    }

    title.textContent = "Navigate";
    sidebarNavigation.setAttribute("aria-label", "Site sections");
    sidebarNavigation.replaceChildren();
    items.forEach(function (item) {
      if (item.group) {
        var groupLabel = document.createElement("span");
        groupLabel.className = "sidebar-group-label";
        groupLabel.textContent = item.group;
        sidebarNavigation.appendChild(groupLabel);
        return;
      }

      var anchor = document.createElement("a");
      anchor.href = item.href;
      anchor.textContent = item.label;
      if (item.href === fileName) {
        anchor.setAttribute("aria-current", "page");
      }
      sidebarNavigation.appendChild(anchor);
    });
  }

  function addInnerFooterNavigation() {
    var footer = document.querySelector(".site-footer");
    if (!isInnerPage || !footer || footer.querySelector(".footer-main")) {
      return;
    }

    var footerMain = document.createElement("div");
    footerMain.className = "container footer-main footer-directory";
    footerMain.innerHTML =
      '<div><strong>Explore Star-Launcher</strong><p>Product information, help, updates, and security resources.</p></div>' +
      '<nav aria-label="Footer navigation">' +
      '<a href="../index.html">Home</a><a href="download.html">Download</a>' +
      '<a href="installation.html">Installation</a><a href="setup.html">Setup guide</a>' +
      '<a href="controller-setup.html">Controller setup</a><a href="faq.html">FAQ</a>' +
      '<a href="troubleshooting.html">Troubleshooting</a><a href="release-notes.html">Updates</a>' +
      '<a href="security.html">Security</a><a href="verify-download.html">Verify downloads</a>' +
      '<a href="../index.html#community">Community</a></nav>';
    footer.prepend(footerMain);
  }

  buildGlobalNavigation();
  addReleaseNotice();
  addBreadcrumbs();
  normalizeSidebar();
  addInnerFooterNavigation();

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
