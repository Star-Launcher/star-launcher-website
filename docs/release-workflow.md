# Star-Launcher release workflow

This repository hosts the public website, portable downloads, and the static
release metadata consumed by Star-Launcher.

## Public endpoints

- Latest stable metadata: `https://star-launcher.com/releases/latest.json`
- Versioned stable metadata:
  `https://star-launcher.com/releases/stable/{version}.json`
- Versioned download:
  `https://star-launcher.com/downloads/Star-Launcher-{version}.zip`
- Release notes:
  `https://star-launcher.com/pages/release-notes.html`

`latest.json` always describes the newest stable release. A historical copy of
the same metadata is retained under `releases/stable/`.

## Metadata contract

The updater reads a small UTF-8 JSON document over HTTPS:

| Field | Purpose |
| --- | --- |
| `schemaVersion` | Integer version of this JSON contract. |
| `version` | Semantic application version used for comparison. |
| `displayVersion` | Human-readable release label. |
| `channel` | Release channel; currently `stable`. |
| `releaseDate` | Release date in `YYYY-MM-DD` format. |
| `downloadUrl` | Absolute HTTPS URL for the portable ZIP. |
| `releaseNotesUrl` | Absolute HTTPS URL for the matching notes. |
| `checksumSha256` | Lowercase SHA-256 hash of the ZIP. |
| `fileSizeBytes` | Expected ZIP size in bytes. |
| `minimumVersion` | Oldest application version allowed to use this update. |

Unknown fields should be ignored by the desktop application so the feed can be
extended without breaking older clients. A client should reject an unsupported
`schemaVersion`, a non-HTTPS URL, a channel it did not request, a mismatched
file size, or a mismatched checksum.

## Publishing a stable release

1. Build and test the portable ZIP.
2. Name it `Star-Launcher-{version}.zip`.
3. Calculate its SHA-256 checksum.
4. Add the ZIP and matching `.sha256` file under `downloads/`.
5. Add `releases/stable/{version}.json` with the final URLs, size, and checksum.
6. Update `releases/latest.json` with the same stable-release metadata.
7. Add a version-specific section to the public release notes.
8. Update the Download page and homepage version details.
9. Validate the JSON, download, file size, and checksum before deployment.

Publish the versioned files before updating `latest.json`. This prevents the
application from discovering an update whose download is not available yet.
Vercel is configured to revalidate `latest.json` on every request while caching
versioned metadata and downloads as immutable files.

## Future beta channel

If beta releases are introduced, keep them opt-in and separate:

- `releases/beta/latest.json`
- `releases/beta/{version}.json`

The stable feed must never point to a beta package. No beta directory or
website controls are needed until beta distribution is approved.
