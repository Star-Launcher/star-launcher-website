# star-launcher-website

Official website for Star-Launcher, an independent community-developed Windows
launcher and startup utility designed to simplify the sim setup
workflow.

Star-Launcher is proprietary freeware. Its application source code is private
and is not distributed with public releases.

## Supported release format

Star-Launcher releases are distributed as a verified Portable ZIP. No installer
or background service is required.

- Windows 10 or Windows 11, x64
- .NET Framework 4.8
- Extract the complete ZIP before running `Star-Launcher.exe`
- User configuration is stored under `%APPDATA%\Star-Launcher`

Official release downloads should include verification information and release
notes. The website does not distribute a separate unsupported executable or
installer.

## Static update feed

The Star-Launcher updater uses a static, machine-readable stable-release feed:

- `/releases/latest.json` — latest stable release
- `/releases/stable/{version}.json` — permanent metadata for a specific release
- `/downloads/Star-Launcher-{version}.zip` — versioned portable package

The feed contains semantic version, release channel, date, download and release
notes URLs, SHA-256 checksum, file size, and minimum updater version. It requires
no API, database, account, or server-side application.

See [`docs/release-workflow.md`](docs/release-workflow.md) for the publishing
sequence and updater contract.

Project governance working documents:

- [`docs/trust-security-roadmap.md`](docs/trust-security-roadmap.md) — planned
  public trust, privacy, release-evidence, signing, and security-reporting work
- [`docs/project-metrics.md`](docs/project-metrics.md) — running aggregate metrics
  definitions, baselines, and snapshot ledger

## Current release

The site publishes Star-Launcher 5.1 Stable, which includes the native, automatically
saved game configurations for supported space and flight simulators. The 5.0
experience uses game artwork tiles on Main; separate Launch Methods, Game-Specific
Apps, and Keybind Viewers; universal Utility Apps and Preferences; and independent
controller presets. Version 5.1 adds a continuous nebula image across the Main-page
cards, higher-contrast labels and checkboxes, and responsive Game-Specific Apps and
Keybind Viewers columns that stack on narrower windows.

The website is a lightweight static site built with HTML, CSS, and JavaScript.

Future affiliate and sponsor capabilities are controlled by
`js/site-config.js` and remain disabled by default. Page-specific sponsor slots,
a restrained site-wide footer placement, and the dormant Recommended Gear
catalog require no backend or external advertising service. They are
intentionally kept away from the hero, navigation, download controls, and guide
content.

The approved visual palette is **Deep-Space Indigo**, pairing an indigo-blue
primary color with violet and restrained warm accents across dark and light
themes.

The public affiliation disclaimer identifies Star-Launcher as an independent
community project that is not affiliated with or endorsed by the developers,
publishers, platform owners, or trademark holders of its supported games and
third-party tools.

Approved logo assets are stored in `assets/branding` and switch automatically
between dark- and light-theme variants. The homepage includes direct community
Discord, PayPal, and Ko-fi support links.

See [`docs/monetization.md`](docs/monetization.md) for the affiliate disclosure,
product catalog, sponsor placement, and activation requirements.

## Local preview

Serve the repository with any static file server, then open `index.html` through
that server.
