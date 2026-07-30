# star-launcher-website

Official website for Star-Launcher, an independent community-developed Windows
launcher and startup utility designed to simplify the Star Citizen setup
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

## Project status

The website is being developed incrementally as a lightweight static site using
HTML, CSS, and JavaScript.

Future affiliate and sponsor capabilities are controlled by
`js/site-config.js` and remain disabled by default. Page-specific sponsor slots,
a restrained site-wide footer placement, and the dormant Recommended Gear
catalog require no backend or external advertising service. They are
intentionally kept away from the hero, navigation, download controls, and guide
content.

The approved visual palette is **Deep-Space Indigo**, pairing an indigo-blue
primary color with violet and restrained warm accents across dark and light
themes.

Approved logo assets are stored in `assets/branding` and switch automatically
between dark- and light-theme variants. The homepage includes direct community
Discord, PayPal, and Ko-fi support links.

See [`docs/monetization.md`](docs/monetization.md) for the affiliate disclosure,
product catalog, sponsor placement, and activation requirements.

## Local preview

Serve the repository with any static file server, then open `index.html` through
that server.
