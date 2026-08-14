# Star-Launcher 5.1.0 release security tests

Built: 2026-08-14T19:30:12.8902827Z

- Executable SHA-256: `b02e47bf9f0caa0ef08b7a01d336a6d7356a32ecee78f4bd828b8302df2fbaf2`
- Portable ZIP SHA-256: `2cf5b4219666d1395f2172ff0ebb83c646641e22fa7f41b158b6a94eab7d0849`
- Portable ZIP bytes: `7954423`
- Target: .NET Framework 4.8 / Windows x64
- Package contents: Star-Launcher.exe, README.md, release-manifest.json, SHA256SUMS.txt

## Automated results

- 5.0 structural and compatibility checks: passed
- Responsive card background, group ordering, and column geometry checks: 91 passed
- Self-update download, extraction, replacement, rollback, and preservation checks: passed
- Controller installer host, publisher, signature, and command-injection regression checks: passed

These are deterministic project tests, not an independent security audit. Independent malware-scan evidence must be tied to the same hashes before publication.
