(function () {
  "use strict";

  var config = window.STAR_LAUNCHER_SITE_CONFIG;

  if (!config || !config.monetizationEnabled) {
    return;
  }

  function isSafeUrl(value) {
    try {
      return new URL(value, window.location.href).protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  function createSponsorSlot(placement) {
    var slot = document.createElement("aside");
    slot.className = "ad-slot ad-slot-horizontal";
    slot.setAttribute("aria-label", "Sponsored content");
    slot.setAttribute("data-sponsor-slot", placement);
    slot.hidden = true;

    var container = document.createElement("div");
    container.className = "container";
    var inner = document.createElement("div");
    inner.className = "ad-slot-inner";
    container.appendChild(inner);
    slot.appendChild(container);
    return slot;
  }

  function renderSponsor(slot, sponsor) {
    var inner = slot.querySelector(".ad-slot-inner");
    if (!inner) {
      return;
    }

    var label = document.createElement("span");
    label.className = "ad-label";
    label.textContent = "Sponsored";

    var content = document.createElement("div");
    content.className = "sponsor-content";

    var copy = document.createElement("div");
    var name = document.createElement("strong");
    name.textContent = sponsor.partnerName;
    var message = document.createElement("p");
    message.textContent = sponsor.message;
    copy.appendChild(name);
    copy.appendChild(message);

    var link = document.createElement("a");
    link.className = "button button-secondary";
    link.href = sponsor.url;
    link.target = "_blank";
    link.rel = "sponsored noopener";
    link.textContent = sponsor.buttonLabel || "Learn more";

    content.appendChild(copy);
    content.appendChild(link);
    inner.replaceChildren(label, content);
    slot.hidden = false;
  }

  function enableSponsors() {
    var sponsor = config.sponsors;
    if (
      !sponsor ||
      !sponsor.enabled ||
      !sponsor.partnerName ||
      !sponsor.message ||
      !isSafeUrl(sponsor.url)
    ) {
      return;
    }

    var placements = Array.isArray(sponsor.placements)
      ? sponsor.placements
      : [];

    placements.forEach(function (placement) {
      var slots;

      if (placement === "site-wide-footer") {
        var footer = document.querySelector(".site-footer");
        if (footer) {
          var globalSlot = createSponsorSlot(placement);
          footer.parentNode.insertBefore(globalSlot, footer);
        }
      }

      slots = document.querySelectorAll(
        '[data-sponsor-slot="' + placement + '"]'
      );
      slots.forEach(function (slot) {
        renderSponsor(slot, sponsor);
      });
    });
  }

  function createProductCard(product) {
    if (
      !product ||
      !product.name ||
      !product.description ||
      !product.reason ||
      !isSafeUrl(product.url)
    ) {
      return null;
    }

    var card = document.createElement("article");
    card.className = "gear-card";

    var imageArea = document.createElement("div");
    imageArea.className = "gear-card-image";
    if (product.image) {
      var image = document.createElement("img");
      image.src = product.image;
      image.alt = "";
      image.loading = "lazy";
      imageArea.appendChild(image);
    } else {
      imageArea.textContent = "Product image";
    }

    var body = document.createElement("div");
    body.className = "gear-card-body";
    var title = document.createElement("h3");
    title.textContent = product.name;
    var description = document.createElement("p");
    description.textContent = product.description;
    var reason = document.createElement("p");
    reason.className = "gear-reason";
    reason.textContent = "Why KCJones recommends it: " + product.reason;
    var link = document.createElement("a");
    link.className = "button button-secondary";
    link.href = product.url;
    link.target = "_blank";
    link.rel = "sponsored noopener";
    link.textContent = product.buttonLabel || "View product";

    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(reason);
    body.appendChild(link);
    card.appendChild(imageArea);
    card.appendChild(body);
    return card;
  }

  function enableAffiliates() {
    var affiliates = config.affiliates;
    if (!affiliates || !affiliates.enabled) {
      return;
    }

    document.querySelectorAll("[data-affiliate-link]").forEach(function (link) {
      link.hidden = false;
    });

    var catalog = document.querySelector("[data-gear-catalog]");
    var inactive = document.querySelector("[data-gear-inactive]");
    var disclosure = document.querySelector("[data-affiliate-disclosure]");
    var renderedProducts = 0;

    if (!catalog) {
      return;
    }

    catalog.replaceChildren();
    (affiliates.categories || []).forEach(function (category) {
      if (!category || !category.name || !Array.isArray(category.products)) {
        return;
      }

      var cards = document.createElement("div");
      cards.className = "gear-grid";
      category.products.forEach(function (product) {
        var card = createProductCard(product);
        if (card) {
          cards.appendChild(card);
          renderedProducts += 1;
        }
      });

      if (!cards.children.length) {
        return;
      }

      var section = document.createElement("section");
      section.className = "gear-category";
      var heading = document.createElement("h2");
      heading.textContent = category.name;
      section.appendChild(heading);
      section.appendChild(cards);
      catalog.appendChild(section);
    });

    if (renderedProducts) {
      catalog.hidden = false;
      if (inactive) {
        inactive.hidden = true;
      }
      if (disclosure) {
        disclosure.textContent = affiliates.disclosure;
        disclosure.hidden = false;
      }
    }
  }

  enableSponsors();
  enableAffiliates();
})();
