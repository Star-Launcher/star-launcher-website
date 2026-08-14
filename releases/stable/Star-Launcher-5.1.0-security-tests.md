# Star-Launcher 5.1.0 release security tests

Built: 2026-08-14T18:50:38.1455764Z

- Executable SHA-256: `0bf996366e9c196585e7b55f5580d2d392e2165af51b0772903125697be3d1f1`
- Portable ZIP SHA-256: `3133e4c238da1f567429cdcd5c425604dcce0f1943d7e8abd9cac9352daf6c54`
- Portable ZIP bytes: `7954316`
- Target: .NET Framework 4.8 / Windows x64
- Package contents: Star-Launcher.exe, README.md, release-manifest.json, SHA256SUMS.txt

## Automated results

- 5.0 structural and compatibility checks: passed
- Self-update download, extraction, replacement, rollback, and preservation checks: passed
- Controller installer host, publisher, signature, and command-injection regression checks: passed

These are deterministic project tests, not an independent security audit. Independent malware-scan evidence must be tied to the same hashes before publication.
