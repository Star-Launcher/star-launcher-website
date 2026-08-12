# Star-Launcher 5.0.2 release security tests

Built: 2026-08-12T03:58:27.9117117Z

- Executable SHA-256: `795fdeb38530aaa40f1f1597de41c62fa91c0af89d895be066e5bc0ba2297b92`
- Portable ZIP SHA-256: `86250247312e4418e2abdb989841fddf898ba0f378dfb00408d04c24307a3d2d`
- Portable ZIP bytes: `1307449`
- Target: .NET Framework 4.8 / Windows x64
- Package contents: Star-Launcher.exe, README.md, release-manifest.json, SHA256SUMS.txt

## Automated results

- 5.0 structural and compatibility checks: passed
- Self-update download, extraction, replacement, rollback, and preservation checks: passed
- Controller installer host, publisher, signature, and command-injection regression checks: passed

These are deterministic project tests, not an independent security audit. Independent malware-scan evidence must be tied to the same hashes before publication.
