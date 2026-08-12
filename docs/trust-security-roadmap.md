# Star-Launcher Public Trust and Security Roadmap

Status: Working plan for review
Owner: KCJones
Created: 2026-08-11
Review cadence: Review at every stable release and at least quarterly

## Purpose

This roadmap turns Star-Launcher's existing release safeguards into public,
plain-language evidence. The goal is to let users understand what the application
does, what it does not do, how releases are produced, and how security concerns are
handled without requiring the application source to be public.

The roadmap does not claim that software is risk-free. Each published statement
must be supported by the current source, build process, release artifact, or an
independent review.

## Current foundation

The following controls already exist and should be documented more visibly:

- Portable releases contain a deliberately limited file set.
- Stable ZIPs and executables have published SHA-256 checksums.
- The updater validates release metadata, HTTPS location, file size, and checksum
  before replacing release files.
- The updater preserves user data and has rollback and path-traversal protections.
- Star-Launcher does not automate credentials, CAPTCHA, two-factor authentication,
  Windows UAC approval, gameplay, or anti-cheat bypasses.
- Optional controller tools, game launchers, and companion applications are not
  bundled.
- User configuration is stored locally under `%APPDATA%\Star-Launcher`.
- Release tests cover version comparison, malformed metadata, hostile ZIP paths,
  replacement failures, rollback, and preservation of unrelated files.

## Publication set

### 1. Security and privacy overview

Create a public website page answering, in plain language:

- What Star-Launcher can launch or change.
- What data is stored locally and where.
- What network requests the application makes.
- Whether telemetry, advertising trackers, crash reporting, or account systems are
  present.
- Which actions may cause Windows UAC prompts and why.
- How browser links, Steam launch commands, local executables, and the RSI Launcher
  integration are handled.
- What remains under the user's control during a launch.
- How to remove all saved Star-Launcher data.

Before publication, confirm every statement with a focused source-code and runtime
network audit. Avoid broad claims such as "completely safe" or "collects nothing"
unless the exact scope is defined.

### 2. Vulnerability reporting policy

Add a public `SECURITY.md` and website Security page containing:

- A dedicated security-reporting email address.
- A request not to post unpatched vulnerabilities publicly.
- The supported release versions.
- What information is useful in a report.
- An acknowledgement target, proposed as three business days.
- A status-update target, proposed as every seven days while investigating.
- Coordinated-disclosure expectations.
- A statement that passwords, authentication codes, personal data, or unrelated
  system files must never be included in a report.

Also publish `/.well-known/security.txt` after the reporting address and policy URL
are final.

### 3. Release verification guide

Expand the existing download verification instructions into a dedicated guide:

- Identify the official website and GitHub organization.
- Explain how to compare a ZIP's SHA-256 value with the published checksum.
- Explain the portable package's expected four-file contents.
- Describe how the in-app updater validates downloads.
- Tell users not to disable Windows security or accept repackaged downloads.
- Publish the expected executable identity for each stable version.

### 4. Build and dependency transparency

For every stable release, publish:

- A Software Bill of Materials (SBOM), preferably SPDX JSON or CycloneDX JSON.
- The .NET Framework target and Windows architecture.
- The build-tool versions used for the release.
- A dependency and third-party component inventory.
- A separate artwork/trademark attribution record so third-party game artwork is
  never represented as Star-Launcher's licensed source code.
- A machine-readable release manifest, ZIP checksum, and executable checksum.

The current project has no NuGet dependency set, which should make the first SBOM
small, but Windows/.NET runtime dependencies and bundled assets still need accurate
descriptions.

### 5. Signed releases

Obtain an Authenticode code-signing certificate and sign `Star-Launcher.exe` before
packaging. Add signature verification to the release checklist and document:

- The exact publisher name users should see.
- The certificate authority and certificate validity period.
- The timestamping service.
- What users should do if a signature is absent or invalid.

Code signing does not prove that software is bug-free, but it provides publisher
identity and tamper evidence that checksums alone do not provide.

### 6. Development and AI transparency

Publish a concise development statement that explains:

- AI tools may assist implementation and documentation.
- Feature decisions, release approval, testing, packaging, and publication remain
  under human direction.
- Stable releases must pass documented deterministic tests.
- AI output is not treated as a security review.
- Security-sensitive behavior receives focused human review and, when practical,
  independent review.

Keep human decision records, specifications, commit history, asset sources, and
test results for future licensing or acquisition diligence.

### 7. Independent review

Commission a scoped review after the public documentation and signing process are
in place. Initial review scope should prioritize:

- Self-update download, extraction, replacement, and rollback.
- Path validation and local executable launching.
- User-controlled administrator launches.
- RSI Launcher UI automation boundaries.
- Local data storage and reset behavior.
- Network endpoints and absence/presence of telemetry.

Publish the reviewer, scope, date, unresolved findings by severity, and remediation
status. Do not describe a narrow review as a complete audit.

### 8. Incident response and change control

Maintain an internal incident checklist covering triage, containment, fixed-build
production, key/certificate revocation, website and Discord notification, and a
post-incident report. Publicly document:

- Which release is currently supported.
- How security updates are announced.
- How a compromised or withdrawn release would be identified.
- How users can verify the replacement release.

## Recommended order

### Phase 1: Documentation baseline

1. Complete the application data-flow and network audit.
2. Publish Security and Privacy, Vulnerability Reporting, Release Verification,
   and AI Development Transparency pages.
3. Add `SECURITY.md` and `/.well-known/security.txt`.
4. Link these materials from Download, FAQ, and the website footer.

### Phase 2: Release evidence

1. Generate an SBOM during packaging.
2. Publish a third-party components and asset-attribution inventory.
3. Add a per-release test summary and verification manifest.
4. Add automated checks that prevent publication when evidence files disagree.

### Phase 3: Strong identity and outside review

1. Purchase and configure Authenticode signing.
2. Protect signing credentials outside the repository and document recovery.
3. Commission the focused independent review.
4. Publish findings and remediation status.

### Phase 4: Ongoing transparency

1. Update the project metrics ledger monthly.
2. Review security and privacy claims with every stable release.
3. Publish material incidents and corrective actions.
4. Reassess source publication only after the business and licensing strategy is
   deliberate.

## Success criteria

- A new user can verify the official download without reading source code.
- The public can determine what data leaves the computer and why.
- Security reports have a private, documented path and response expectations.
- Every stable release has matching checksums, manifest, SBOM, test summary, and
  signature information.
- Public metrics use stable definitions and distinguish measurements from estimates.
- Claims about AI assistance describe the actual human review and test process.

## Access and decisions required

- Choose or create a dedicated security-reporting email address.
- Obtain access to Cloudflare Web Analytics or provide monthly exports.
- Provide PayPal and Ko-fi aggregate exports without donor-identifying information.
- Provide the exact server member count from Discord's server UI each month. Server
  Insights exports can replace this manual count only if the server later meets
  Discord's eligibility requirements.
- Decide whether project metrics will be public, internal, or published as a reduced
  aggregate transparency report.
- Decide whether to purchase an Authenticode certificate and under what legal
  publisher name.
- Select an independent reviewer and define a review budget.
