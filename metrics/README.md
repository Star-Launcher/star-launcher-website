# Star-Launcher Metrics Data

This folder contains aggregate, privacy-preserving project metrics. It must never
contain donor identities, email addresses, transaction IDs, IP addresses, Discord
usernames, raw traffic logs, account credentials, API tokens, or cookies.

## Files

- `snapshots.csv` is the authoritative high-level ledger. One row represents one
  monthly or post-release snapshot.
- `github-release-downloads.csv` preserves per-release cumulative GitHub ZIP counts
  for each snapshot so period deltas can be calculated later.
- `metrics-input.example.json` is the only supported shape for optional sanitized
  Cloudflare, donation, and exact Discord aggregates. Cloudflare Web Analytics
  `Visits` must be recorded as visits, not unique people.

Local inputs belong in `metrics-input.local.json`. That filename, `private/`, and
`exports/` are ignored by Git. Provider exports should be sanitized outside the
repository; only aggregate values should be copied into the local input file.

## Capture a snapshot

From the website repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\Update-ProjectMetrics.ps1 `
  -Event "Monthly close"
```

The collector always reads public GitHub release counts and the public Discord
invite estimate. If `metrics/metrics-input.local.json` exists, it also validates
and records the supplied aggregate values.

Use `-DryRun` to fetch and validate without changing either CSV:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\Update-ProjectMetrics.ps1 `
  -Event "Validation" -DryRun
```

## Monthly procedure

1. Copy `metrics-input.example.json` to `metrics-input.local.json`.
2. Enter only aggregate Cloudflare, PayPal, Ko-fi, and exact Discord values.
3. Run the collector with `-DryRun` and review the output.
4. Run it again without `-DryRun` to append the snapshot.
5. Review the two new CSV sections and `git diff --check`.
6. Preserve unavailable values as blank; never substitute zero.

GitHub download counts are cumulative counters and may reset if an asset is deleted
and uploaded again. Update-feed requests are checks, not installations or unique
users. Discord public invite counts are approximate.
