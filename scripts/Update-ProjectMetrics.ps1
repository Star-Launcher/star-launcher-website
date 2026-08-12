[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)]
    [ValidateNotNullOrEmpty()]
    [string]$Event,

    [string]$ManualInputPath,

    [string]$OutputRoot,

    [switch]$DryRun
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$projectRoot = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
if ([string]::IsNullOrWhiteSpace($OutputRoot)) {
    $OutputRoot = Join-Path $projectRoot "metrics"
}
if ([string]::IsNullOrWhiteSpace($ManualInputPath)) {
    $ManualInputPath = Join-Path $projectRoot "metrics\metrics-input.local.json"
}

$snapshotPath = Join-Path $OutputRoot "snapshots.csv"
$releasePath = Join-Path $OutputRoot "github-release-downloads.csv"
$githubReleaseUrl =
    "https://api.github.com/repos/Star-Launcher/star-launcher-website/releases?per_page=100"
$discordInviteUrl =
    "https://discord.com/api/v10/invites/bwC6ezpp6A?with_counts=true&with_expiration=true"
$headers = @{
    "Accept" = "application/vnd.github+json"
    "User-Agent" = "Star-Launcher-Metrics-Collector"
}

function Get-PropertyValue($object, [string]$name) {
    if ($null -eq $object) { return $null }
    $property = $object.PSObject.Properties[$name]
    if ($null -eq $property) { return $null }
    return $property.Value
}

function Assert-OptionalNonNegativeNumber($object, [string]$name) {
    $value = Get-PropertyValue $object $name
    if ($null -eq $value) { return }
    if ($value -isnot [ValueType] -or [decimal]$value -lt 0) {
        throw "$name must be null or a non-negative number."
    }
}

function Convert-ToCsvValue($value) {
    if ($null -eq $value) { return "" }
    return $value
}

function Add-CsvRows([string]$path, [object[]]$rows) {
    if ($rows.Count -eq 0) { return }
    if (Test-Path -LiteralPath $path) {
        $csvLines = @($rows | ConvertTo-Csv -NoTypeInformation)
        $csvLines | Select-Object -Skip 1 |
            Add-Content -LiteralPath $path -Encoding UTF8
    }
    else {
        $rows | Export-Csv -LiteralPath $path -NoTypeInformation -Encoding UTF8
    }
}

$manual = $null
if (Test-Path -LiteralPath $ManualInputPath) {
    $manual = Get-Content -LiteralPath $ManualInputPath -Raw | ConvertFrom-Json
    $allowed = @(
        "reportingPeriod", "websiteZipRequests", "updateFeedRequests",
        "websiteVisits", "websitePageViews", "paypalDonationCount",
        "paypalGross", "paypalFeesAndRefunds", "paypalNet",
        "kofiDonationCount", "kofiGross", "kofiFeesAndRefunds", "kofiNet",
        "currency", "discordExactMembers", "notes")
    foreach ($property in $manual.PSObject.Properties) {
        if ($allowed -notcontains $property.Name) {
            throw "Unsupported manual-input property: $($property.Name). " +
                "Only aggregate fields from metrics-input.example.json are allowed."
        }
    }
    foreach ($name in @(
        "websiteZipRequests", "updateFeedRequests", "websiteVisits",
        "websitePageViews", "paypalDonationCount", "paypalGross",
        "paypalFeesAndRefunds", "paypalNet", "kofiDonationCount", "kofiGross",
        "kofiFeesAndRefunds", "kofiNet", "discordExactMembers")) {
        Assert-OptionalNonNegativeNumber $manual $name
    }
    $manualPeriod = [string](Get-PropertyValue $manual "reportingPeriod")
    if (-not [string]::IsNullOrWhiteSpace($manualPeriod) -and
        $manualPeriod -notmatch '^\d{4}-(0[1-9]|1[0-2])$') {
        throw "reportingPeriod must use YYYY-MM."
    }
    $currency = [string](Get-PropertyValue $manual "currency")
    if (-not [string]::IsNullOrWhiteSpace($currency) -and
        $currency -notmatch '^[A-Z]{3}$') {
        throw "currency must be a three-letter uppercase code such as USD."
    }
    $notes = [string](Get-PropertyValue $manual "notes")
    if ($notes.Length -gt 500) { throw "notes must contain no more than 500 characters." }
    if ($notes -match '(?i)\b(email|address|transaction\s*id|username|ip\s*address|password|token|cookie)\b\s*[:=]') {
        throw "notes appears to contain a prohibited identifying or credential field."
    }
}

$releases = Invoke-RestMethod -Headers $headers -Uri $githubReleaseUrl
$releaseRows = @()
foreach ($release in $releases) {
    if ($release.draft -or $release.prerelease) { continue }
    foreach ($asset in @($release.assets)) {
        $assetName = [string]$asset.name
        if ($assetName -notmatch '\.zip$') { continue }
        $releaseRows += [pscustomobject]@{
            tag = [string]$release.tag_name
            published_date = ([DateTimeOffset]$release.published_at).ToString("yyyy-MM-dd")
            asset_name = $assetName
            cumulative_downloads = [int]$asset.download_count
        }
    }
}
if ($releaseRows.Count -eq 0) {
    throw "GitHub returned no stable ZIP release assets."
}

$discord = Invoke-RestMethod -Headers $headers -Uri $discordInviteUrl
$now = [DateTimeOffset]::UtcNow
$eastern = [TimeZoneInfo]::FindSystemTimeZoneById("Eastern Standard Time")
$local = [TimeZoneInfo]::ConvertTime($now, $eastern)
$snapshotId = $now.ToString("yyyyMMdd'T'HHmmss'Z'")
$reportingPeriod = $local.ToString("yyyy-MM")
if ($null -ne $manual) {
    $manualPeriod = [string](Get-PropertyValue $manual "reportingPeriod")
    if (-not [string]::IsNullOrWhiteSpace($manualPeriod)) {
        $reportingPeriod = $manualPeriod
    }
}

$latestRelease = $releaseRows |
    Sort-Object @{ Expression = { [Version]($_.tag.TrimStart('v')) }; Descending = $true } |
    Select-Object -First 1
$exactDiscordMembers = Get-PropertyValue $manual "discordExactMembers"
$discordMembers = if ($null -ne $exactDiscordMembers) {
    [int]$exactDiscordMembers
} else {
    [int]$discord.approximate_member_count
}
$discordIsApproximate = $null -eq $exactDiscordMembers

$snapshot = [pscustomobject][ordered]@{
    snapshot_id = $snapshotId
    captured_utc = $now.ToString("yyyy-MM-dd'T'HH:mm:ss'Z'")
    captured_local = $local.ToString("yyyy-MM-dd'T'HH:mm:sszzz")
    reporting_period = $reportingPeriod
    event = $Event.Trim()
    github_zip_downloads_cumulative =
        ($releaseRows | Measure-Object cumulative_downloads -Sum).Sum
    github_latest_tag = $latestRelease.tag
    github_latest_zip_downloads_cumulative = $latestRelease.cumulative_downloads
    website_zip_requests_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "websiteZipRequests")
    update_feed_requests_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "updateFeedRequests")
    website_visits_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "websiteVisits")
    website_page_views_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "websitePageViews")
    paypal_donation_count_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "paypalDonationCount")
    paypal_gross_period = Convert-ToCsvValue (Get-PropertyValue $manual "paypalGross")
    paypal_fees_refunds_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "paypalFeesAndRefunds")
    paypal_net_period = Convert-ToCsvValue (Get-PropertyValue $manual "paypalNet")
    kofi_donation_count_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "kofiDonationCount")
    kofi_gross_period = Convert-ToCsvValue (Get-PropertyValue $manual "kofiGross")
    kofi_fees_refunds_period = Convert-ToCsvValue `
        (Get-PropertyValue $manual "kofiFeesAndRefunds")
    kofi_net_period = Convert-ToCsvValue (Get-PropertyValue $manual "kofiNet")
    currency = if ($null -ne $manual -and
        -not [string]::IsNullOrWhiteSpace([string](Get-PropertyValue $manual "currency"))) {
        [string](Get-PropertyValue $manual "currency")
    } else { "USD" }
    discord_members = $discordMembers
    discord_members_approximate = $discordIsApproximate.ToString().ToLowerInvariant()
    discord_online_approximate = [int]$discord.approximate_presence_count
    source = "GitHub Releases API and Discord invite API" +
        $(if ($null -ne $manual) { "; sanitized manual aggregate input" } else { "" })
    notes = if ($null -ne $manual) { [string](Get-PropertyValue $manual "notes") } else { "" }
}

$releaseSnapshots = @($releaseRows | ForEach-Object {
    [pscustomobject][ordered]@{
        snapshot_id = $snapshotId
        captured_utc = $now.ToString("yyyy-MM-dd'T'HH:mm:ss'Z'")
        tag = $_.tag
        published_date = $_.published_date
        asset_name = $_.asset_name
        cumulative_downloads = $_.cumulative_downloads
    }
})

if ($DryRun) {
    Write-Host "METRICS_DRY_RUN_OK"
    $snapshot | ConvertTo-Json -Depth 3
    $releaseSnapshots | Format-Table tag, asset_name, cumulative_downloads -AutoSize
    exit 0
}

New-Item -ItemType Directory -Path $OutputRoot -Force | Out-Null
Add-CsvRows $snapshotPath @($snapshot)
Add-CsvRows $releasePath $releaseSnapshots
Write-Host "METRICS_SNAPSHOT_OK"
Write-Host "SNAPSHOT_ID=$snapshotId"
Write-Host "SNAPSHOTS=$snapshotPath"
Write-Host "RELEASE_DOWNLOADS=$releasePath"
