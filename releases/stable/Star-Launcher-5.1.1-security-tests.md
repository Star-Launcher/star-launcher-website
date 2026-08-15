# Star-Launcher 5.1.1 release security tests

Built: 2026-08-15T17:14:00.4735217Z

- Executable SHA-256: `36389e1881534ff4b317008f3a0602691b69d30ead03624d825e39a1e50cc663`
- Portable ZIP SHA-256: `4beeff7ffe68388657e5a5907e8100d6cf89283afc5b38f9646186f3a3d8e55e`
- Portable ZIP bytes: `7955488`
- Target: .NET Framework 4.8 / Windows x64
- Package contents: Star-Launcher.exe, README.md, release-manifest.json, SHA256SUMS.txt

## Automated results

- 5.0 structural and compatibility checks: passed
- Self-update download, extraction, replacement, rollback, and preservation checks: passed
- Controller installer host, publisher, signature, and command-injection regression checks: passed

These are deterministic project tests, not an independent security audit. Independent malware-scan evidence must be tied to the same hashes before publication.
