# Future monetization architecture

Star-Launcher and KCJones' Free Tools remain free, community-focused projects.
Revenue features are optional, clearly identified, and disabled by default.
They must never obstruct downloads, documentation, or support.

## Configuration

All monetization controls live in `js/site-config.js`.

The master `monetizationEnabled` setting hides every affiliate and sponsor
feature. The nested `affiliates.enabled` and `sponsors.enabled` settings control
each system independently.

No external advertising scripts, tracking pixels, payment processing, accounts,
databases, or server-side services are used.

## Recommended Gear

The dormant public structure is available at `pages/gear.html`. Its navigation
link remains hidden until the affiliate system is enabled.

Products are grouped under `affiliates.categories`:

```js
categories: [
  {
    name: "Flight Controls",
    products: [
      {
        name: "Product name",
        description: "Short factual description.",
        reason: "A specific reason KCJones recommends it.",
        image: "../assets/gear/product-image.webp",
        url: "https://affiliate.example/product",
        buttonLabel: "View product"
      }
    ]
  }
]
```

Only products with a name, description, recommendation reason, and valid HTTPS
URL are displayed. Product links automatically receive
`rel="sponsored noopener"`.

The configured affiliate disclosure is shown only when at least one valid
product card is displayed:

> Some links may be affiliate links. If you purchase through these links,
> KCJones may receive a commission at no additional cost to you.

Recommendations should be based on usefulness and direct relevance, never
commission value. Claims must be accurate and based on genuine experience or
evaluation.

## Sponsor placements

Available page-specific placements:

- `homepage-after-features`
- `homepage-after-download`
- `download-after-primary`

The special `site-wide-footer` placement inserts the same restrained sponsor
banner directly before the footer on every page that loads the monetization
script.

Example future configuration:

```js
sponsors: {
  enabled: true,
  placements: ["download-after-primary"],
  partnerName: "Partner name",
  message: "A short, factual description of the partnership.",
  url: "https://partner.example/",
  buttonLabel: "Learn more"
}
```

Sponsor banners render only when the partner name, message, and valid HTTPS URL
are present. They are labeled `Sponsored`, visually separated from site
content, and use a secondary button that cannot be confused with the primary
Star-Launcher download.

Prohibited sponsor behavior includes popups, autoplay, fake download buttons,
misleading controls, content overlays, and placement between a download label
and its button.

## Activation checklist

Before enabling any revenue feature:

1. Confirm the partner or affiliate account and final URLs.
2. Review every recommendation and claim for accuracy.
3. Add approved product imagery locally under `assets/gear/`.
4. Confirm the disclosure satisfies the relevant program and jurisdiction.
5. Configure the content while leaving the master switch off.
6. Preview desktop, mobile, dark, and light themes.
7. Enable the individual system, then the master switch.
8. Verify all outgoing links and sponsored-link attributes.

## Future project structure

The website can expand from Star-Launcher into a broader KCJones' Free Tools
home without changing this system:

```text
KCJones' Free Tools
├── Star-Launcher
├── Future tools
├── Support
├── Recommended Gear
└── Community partners
```

Affiliate and sponsor content remains a shared optional layer, not the identity
or primary navigation of any individual tool.
