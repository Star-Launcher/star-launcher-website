# Star-Launcher Project Metrics Ledger

Status: Running internal ledger; review before public publication
Owner: KCJones
Created: 2026-08-11
Reporting timezone: America/New_York
Update cadence: Monthly, plus a snapshot after each stable release

The authoritative structured records are:

- [`../metrics/snapshots.csv`](../metrics/snapshots.csv)
- [`../metrics/github-release-downloads.csv`](../metrics/github-release-downloads.csv)

Collection instructions and the sanitized input contract are in
[`../metrics/README.md`](../metrics/README.md). This document explains the metrics
and presents the initial human-readable baseline. A complete redundant working copy
is also kept as `PROJECT_METRICS.md` in the companion Star-Launcher project folder.

## Rules

- Record aggregate values only. Do not record donor names, email addresses, IP
  addresses, Discord usernames, or other personal information.
- Preserve prior rows. Corrections should be added as a dated note rather than
  silently rewriting history.
- Use the definitions below consistently. If a provider changes its measurement,
  record the change before comparing periods.
- Record unavailable values as `Not available`, not zero.
- Keep GitHub-hosted downloads and website/updater downloads separate to avoid
  double counting.
- Treat update-feed requests as checks, not unique users or installations.
- Treat the Discord public invite count as an approximation.

## Metric definitions and sources

| Metric | Definition | Primary source | Access needed |
|---|---|---|---|
| GitHub release ZIP downloads | GitHub `download_count` for each stable ZIP asset at the snapshot time. Checksum downloads are excluded. Replacing an asset may reset its count. | Public GitHub Releases API | None |
| Website ZIP requests | Requests for `/downloads/Star-Launcher-*.zip`, separated by version. Includes updater and manual traffic served by the website. | Cloudflare traffic/log analytics | Cloudflare Analytics read access or export |
| Active-update checks | Requests for `/releases/latest.json`. This measures checks, not unique active users; automatic and manual checks may both contribute. | Cloudflare traffic/log analytics | Cloudflare Analytics read access or export |
| Website visits | Cloudflare Web Analytics `Visits` for the reporting period. This is a provider-defined visit/session measure, not a count of unique people. | Cloudflare Web Analytics | Cloudflare Analytics read access or export |
| Website page views | Total page views during the reporting period. | Cloudflare Web Analytics | Cloudflare Analytics read access or export |
| Donation count | Completed PayPal and Ko-fi contributions during the reporting period, excluding refunds. | PayPal and Ko-fi exports | Aggregate transaction export or read-only reports |
| Donation gross | Total completed contributions before platform/payment fees and refunds, reported in USD or separated by currency. | PayPal and Ko-fi exports | Aggregate transaction export or read-only reports |
| Donation net | Gross contributions minus platform/payment fees and refunds. Do not subtract project expenses here. | PayPal and Ko-fi exports | Aggregate transaction export or read-only reports |
| Discord members | Total server membership at snapshot time. The public invite value is approximate. At the current server size, use the exact count visible to the owner in Discord's server UI. | Discord server UI or public invite API | Owner-provided monthly count; Server Insights only if the server later becomes eligible |
| Discord online | Approximate online/presence count at snapshot time. Do not interpret as monthly active members. | Discord public invite API | None |

## Monthly summary

| Period | GitHub ZIP downloads during period | Website ZIP requests | Update-feed requests | Website visits | Page views | Donation count | Donation gross | Donation net | Closing Discord members | Notes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-08-05 through Aug 11 (7-day baseline) | Not available as a true period delta; first cumulative baseline below | Not available | Not available | 133 | 143 | Not available | Not available | Not available | Approx. 3 | Cloudflare Web Analytics; bots excluded; donation metrics still required |

## Cumulative GitHub release baseline

Captured: 2026-08-11 23:02 America/New_York / 2026-08-12 03:02 UTC
Source: Public GitHub Releases API
Scope: Stable `.zip` release assets only; `.sha256` assets excluded

| Release | Published | Cumulative ZIP downloads at snapshot |
|---|---:|---:|
| v4.0.3 | 2026-07-31 | 8 |
| v4.0.4 | 2026-08-01 | 3 |
| v4.0.5 | 2026-08-02 | 29 |
| v5.0.0 | 2026-08-11 | 1 |
| v5.0.1 | 2026-08-11 | 2 |
| **Total shown releases** |  | **43** |

GitHub download counts are cumulative asset counters, not unique people. Earlier
releases that are not represented by GitHub Release assets are not included. The
website also hosts versioned ZIP files, so these values do not represent total
Star-Launcher downloads.

## Community baseline

Captured: 2026-08-11 23:02 America/New_York / 2026-08-12 03:02 UTC

| Metric | Value | Source and limitation |
|---|---:|---|
| Discord members | Approx. 3 | Public Discord invite API; approximate snapshot |
| Discord online | Approx. 2 | Public Discord invite API; presence snapshot, not monthly activity |

## Website, update, and donation baseline

These values cannot be recovered reliably from the public website or repository.
Enter the first provider-backed baseline after access or exports are available.

| Metric | Current baseline | Required input |
|---|---|---|
| Website ZIP requests by version | Not available | Cloudflare request/path report |
| Requests to `/releases/latest.json` | Not available | Cloudflare request/path report |
| Website visits | 133 | Cloudflare Web Analytics, Last 7 days (EDT), Aug 5-11, bots excluded |
| Website page views | 143 | Cloudflare Web Analytics, Last 7 days (EDT), Aug 5-11, bots excluded |
| PayPal donation count/gross/fees/net | Not available | Monthly PayPal aggregate export |
| Ko-fi donation count/gross/fees/net | Not available | Monthly Ko-fi aggregate export |

## Snapshot log

Add one row for each monthly or post-release snapshot. Cumulative counters become
period counts only after subtracting the preceding comparable snapshot.

| Snapshot date | Event | GitHub cumulative ZIP downloads | Discord members | Discord online | Recorder | Notes |
|---|---|---:|---:|---:|---|---|
| 2026-08-11 23:02 EDT | Initial baseline after v5.0.1 | 43 | Approx. 3 | Approx. 2 | Codex/public APIs | First snapshot; no Cloudflare or donation data available |
| 2026-08-11 23:17 EDT | Cloudflare Web Analytics baseline | 43 | Approx. 3 | Approx. 2 | Codex/Cloudflare dashboard | Last 7 days: 133 visits and 143 page views; bots excluded; exact ZIP/update-feed request counts unavailable |

## Collection procedure

1. Capture GitHub asset counts without replacing or re-uploading release assets.
2. Export Cloudflare values for the exact calendar month and record its timezone.
3. Separate homepage/download-page traffic from ZIP and update-feed requests.
4. Export PayPal and Ko-fi totals, remove all identifying fields, and record count,
   gross, fees/refunds, and net by platform.
5. Record the exact Discord closing membership visible to the server owner. Until
   an exact count is supplied, label the public invite count as approximate. Use
   Server Insights exports only if the server later becomes eligible.
6. Add the new snapshot row and calculate period deltas from the preceding comparable
   snapshot.
7. Add a note for outages, release-asset replacements, campaign spikes, or provider
   definition changes.

## Collection automation

- `scripts/Update-ProjectMetrics.ps1` appends public GitHub and Discord snapshots
  and validates optional sanitized aggregate inputs.
- Cloudflare can later be queried with a narrowly scoped read-only analytics token,
  or its aggregate values can be entered through the ignored local input file.
- Donation platforms should use monthly sanitized exports unless a safe read-only
  aggregate API is available.
- Do not put API tokens, cookies, exports containing personal information, or raw
  traffic logs in the repository.
