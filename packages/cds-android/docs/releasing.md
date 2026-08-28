# Publishing cds-android

How to cut a version of `com.coinbase.cds:cds` and attach the AAR to a GitHub Release.

This is a **manual** process. There is no Android publish pipeline, and this package is not part
of `yarn release` or `yarn nx release plan`. Those tools version the npm packages and must never
touch Android.

Android versions independently of the `@coinbase/cds-*` 9.x line. Do not sync the two.

## What a release is

A release is a GitHub Release tagged `android-v<version>` with `cds-release.aar` attached.
Consumers download that file — there is no Maven repository yet, so
`implementation("com.coinbase.cds:cds:<version>")` will not resolve. See
[Installing in a Compose app](../README.md#installing-in-a-compose-app).

The version consumers see is the Gradle publication version, **not**
`packages/cds-android/package.json`. That file is a Yarn/Nx stub (`private: true`, `0.0.0`)
and is not the artifact version.

## 1. Choose the SemVer bump

CDS follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html). While the version is
`0.x`, the public API is still unstable, so a breaking change bumps minor instead of major.

| Kind of change                  | Examples                                                                                           | Bump on `0.x`                                                                        | Bump on `1.0.0+` |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------- |
| Breaking public API             | Removed or renamed `public` symbol; raised `minSdk`; incompatible signature change                 | minor                                                                                | major            |
| New public API or visual change | New token, new public composable, intended visual update                                           | patch                                                                                | minor            |
| Bugfix                          | Incorrect token value, crash, behavioral fix with no API change                                    | patch                                                                                | patch            |
| Docs or internal-only           | README, KDoc, `internal` components, tests, build scripts that do not change the AAR consumers use | none — skip a release, or bump patch and file under Misc if you still want a version | same             |

"Public API" means `public` declarations in `:cds`. Changing an `internal` type is not a
consumer-facing break. Raising `compileSdk` is not a SemVer break by itself, but it forces every
consuming app to move — call it out in the changelog and in the GitHub Release notes.

Stay on `0.x` until the public surface is something we will not casually break. The first
version is `0.0.1`.

## 2. Bump the version

Edit **one** field: `version` on the `release` Maven publication in
[`packages/cds-android/build.gradle.kts`](../build.gradle.kts).

```kotlin
register<MavenPublication>("release") {
    groupId = "com.coinbase.cds"
    artifactId = "cds"
    version = "0.0.1" // change this
    afterEvaluate { from(components["release"]) }
}
```

Do not change `packages/cds-android/package.json`.

Do this in the same PR as the changelog entry (either the PR that contains the change, or a
small follow-up that only versions). Merge that PR before you build the AAR you will attach —
the release should come from `master`.

## 3. Add a changelog entry

Edit [`packages/cds-android/CHANGELOG.md`](../CHANGELOG.md) by hand. Do not run
`yarn nx release plan` or `yarn release`.

Insert a new `## <version> (<date> PST)` section **immediately below**
`<!-- template-start -->`, so the newest version stays at the top. Use today's date, for
example `8/25/2026 PST`.

Group bullets under the same headings the npm packages use:

| Heading            | Use it for                                                  |
| ------------------ | ----------------------------------------------------------- |
| `#### 💥 Breaking` | Backwards-incompatible public API or floor changes          |
| `#### 🚀 Updates`  | New API, visual changes, other user-facing additions        |
| `#### 🐞 Fixes`    | Bugfixes                                                    |
| `#### 📘 Misc`     | Docs-only or other notes that still shipped in this version |

Write one bullet per change, in the voice of the other CDS changelogs (`Feat: …`, `Fix: …`).
Link the PR when you have one:

```md
- Feat: add `CdsControlSize.x48`. [[#123](https://github.com/coinbase/cds/pull/123)]
```

Omit headings you have nothing for. Do not leave an empty `## Unreleased` section — every
entry is a real version.

Because a file AAR has no POM, the changelog (and the GitHub Release notes copied from it)
is the only place consumers learn about dependency floors. On the **first** version, and
again whenever a floor changes, include a `#### Requirements` block:

```md
#### Requirements

- `compileSdk` 36, `minSdk` 26
- Kotlin 2.0+
- Java 11 bytecode
- Compose BOM 2026.02.01 or newer
```

Read the current Compose BOM from `android/gradle/libs.versions.toml` (`composeBom`). Read
`compileSdk` and `minSdk` from `packages/cds-android/build.gradle.kts`.

## 4. Build and publish

After the version and changelog have landed on `master`:

```sh
git checkout master
git pull

yarn nx run cds-android:test
yarn nx run cds-android:build
```

The AAR is `packages/cds-android/build/outputs/aar/cds-release.aar`. Confirm that path exists
before creating the release.

Check that this version has not already been published:

```sh
gh release view android-v0.0.1
```

If that command succeeds, stop — do not overwrite an existing release. If it fails with
"release not found", create it. Replace `0.0.1` with the version you just set, and paste the
matching changelog section (including Requirements) into `--notes`:

```sh
gh release create android-v0.0.1 \
  packages/cds-android/build/outputs/aar/cds-release.aar \
  --title "cds-android 0.0.1" \
  --notes "$(cat <<'EOF'
## 0.0.1 (8/25/2026 PST)

#### 🚀 Updates

- Initial public theme API.

#### Requirements

- `compileSdk` 36, `minSdk` 26
- Kotlin 2.0+
- Java 11 bytecode
- Compose BOM 2026.02.01 or newer
EOF
)"
```

The tag **must** be `android-v<version>`. Unprefixed tags look like npm versions and will
collide with any future git tagging of the 9.x packages.

Confirm the release at https://github.com/coinbase/cds/releases. The asset name should be
`cds-release.aar` — that is the filename the install docs tell consumers to download.

## Checklist

- [ ] SemVer bump chosen from the table above
- [ ] `version` updated in `packages/cds-android/build.gradle.kts`
- [ ] `packages/cds-android/package.json` left alone
- [ ] New section at the top of `CHANGELOG.md` (below `<!-- template-start -->`)
- [ ] Requirements restated if any floor changed
- [ ] Version PR merged to `master`
- [ ] `yarn nx run cds-android:test` and `yarn nx run cds-android:build` from `master`
- [ ] No existing `android-v<version>` release
- [ ] `gh release create` with `cds-release.aar` and the changelog notes
