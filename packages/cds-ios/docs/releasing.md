# Publishing cds-ios

How to cut a version of the iOS `CDSDesignSystem` package and attach the XCFramework to a GitHub
Release.

This is a **manual** process — the direct parallel of
[Android's release flow](../../cds-android/docs/releasing.md). There is no iOS publish pipeline, and
this package is not part of `yarn release` or `yarn nx release plan`. Those tools version the npm
packages and must never touch iOS.

iOS versions independently of the `@coinbase/cds-*` 9.x line **and** of `com.coinbase.cds:cds`
(Android). Do not sync them.

## What a release is

A release is a GitHub Release tagged `ios-v<version>` with `CDSDesignSystem.xcframework.zip`
attached. Consumers add it as a binary Swift package target:

```swift
// Package.swift
.binaryTarget(
    name: "CDSDesignSystem",
    url: "https://github.com/coinbase/cds/releases/download/ios-v0.0.1/CDSDesignSystem.xcframework.zip",
    checksum: "<the checksum printed by the build script>"
)
```

### Why an XCFramework and not a plain SwiftPM version tag

SwiftPM resolves source packages from **bare SemVer git tags** (`1.2.3`) and requires the
`Package.swift` at the **repo root**. Neither holds here: this is a monorepo whose iOS manifest
lives at `packages/cds-ios/`, and bare version tags would collide with the npm/Android tag lines.
Distributing a **binary XCFramework** via `.binaryTarget(url:checksum:)` sidesteps both — resolution
is by URL + checksum, not by SPM version matching — so the `ios-v` prefix is safe, exactly like
Android's `android-v`.

There is no manifest version baked into the artifact (Swift has no Gradle `version` field). The
version lives in the git tag and this package's [`CHANGELOG.md`](../CHANGELOG.md).

## 1. Choose the SemVer bump

CDS follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). While the version is `0.x`,
the public API is still unstable, so a breaking change bumps minor instead of major.

| Kind of change                  | Examples                                                                     | Bump on `0.x`              | Bump on `1.0.0+` |
| ------------------------------- | ---------------------------------------------------------------------------- | -------------------------- | ---------------- |
| Breaking public API             | Removed/renamed `public` symbol; raised deployment target; changed signature | minor                      | major            |
| New public API or visual change | New token, new public type, intended visual update                           | patch                      | minor            |
| Bugfix                          | Incorrect token value, crash, behavioral fix with no API change              | patch                      | patch            |
| Docs or internal-only           | README, doc comments, tests, build scripts that don't change the artifact    | none — skip, or bump patch | same             |

"Public API" means `public` declarations in the `CDSDesignSystem` target. The first version is
`0.0.1`.

## 2. Add a changelog entry

Edit [`packages/cds-ios/CHANGELOG.md`](../CHANGELOG.md) by hand. Insert a new
`## <version> (<date> PST)` section **immediately below** `<!-- template-start -->` so the newest
version stays at the top. Group bullets under `#### 💥 Breaking`, `#### 🚀 Updates`, `#### 🐞 Fixes`,
`#### 📘 Misc`, in the voice of the other CDS changelogs (`Feat: …`, `Fix: …`), and link the PR.

On the **first** version, and whenever a floor changes, include a `#### Requirements` block (iOS
deployment target, Swift/Xcode version). Read the deployment target from
[`Package.swift`](../Package.swift).

Do not change `packages/cds-ios/package.json` — it is a Yarn/Nx stub (`private: true`, `0.0.0`) and
is not the artifact version. Land the changelog on `master` before building the artifact you attach.

## 3. Build the XCFramework

After the changelog has landed on `master`:

```sh
git checkout master
git pull

yarn nx run cds-ios:test
yarn nx run cds-ios:xcframework   # or: packages/cds-ios/scripts/build-xcframework.sh
```

The script archives the device and simulator slices with `BUILD_LIBRARY_FOR_DISTRIBUTION=YES`,
combines them into `CDSDesignSystem.xcframework`, zips it, and prints the SwiftPM **checksum**.
Outputs land in `packages/cds-ios/.build/xcframework/`:

- `CDSDesignSystem.xcframework.zip` — the release asset
- the printed checksum — consumers pin this in `.binaryTarget(checksum:)`

Record the checksum; you will paste it into the release notes.

## 4. Publish

Check that this version has not already been published:

```sh
gh release view ios-v0.0.1
```

If it succeeds, stop — do not overwrite an existing release. If it fails with "release not found",
create it. Replace `0.0.1` with the version you set, attach the zip, and paste the matching
changelog section plus the checksum into `--notes`:

```sh
gh release create ios-v0.0.1 \
  packages/cds-ios/.build/xcframework/CDSDesignSystem.xcframework.zip \
  --title "cds-ios 0.0.1" \
  --notes "$(cat <<'EOF'
## 0.0.1 (8/27/2026 PST)

#### 🚀 Updates

- Initial public theme API.

#### Requirements

- iOS 17+ / macOS 14+
- Swift 6, Xcode 16+

#### Integrity

- `CDSDesignSystem.xcframework.zip` checksum: `<paste checksum here>`
EOF
)"
```

The tag **must** be `ios-v<version>`. Bare tags look like SwiftPM/npm versions and would collide
with the 9.x packages and Android's `android-v` line.

Confirm the release at https://github.com/coinbase/cds/releases. The asset name should be
`CDSDesignSystem.xcframework.zip` — the filename the install docs tell consumers to download.

## Checklist

- [ ] SemVer bump chosen from the table above
- [ ] New section at the top of `CHANGELOG.md` (below `<!-- template-start -->`)
- [ ] Requirements restated if any floor changed
- [ ] `packages/cds-ios/package.json` left alone
- [ ] Changelog PR merged to `master`
- [ ] `yarn nx run cds-ios:test` and `yarn nx run cds-ios:xcframework` from `master`
- [ ] Checksum recorded
- [ ] No existing `ios-v<version>` release
- [ ] `gh release create` with `CDSDesignSystem.xcframework.zip` and the changelog + checksum notes
