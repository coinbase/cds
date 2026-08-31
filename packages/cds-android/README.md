# @coinbase/cds-android

Native Android CDS: Kotlin and Jetpack Compose. Published as the AAR `com.coinbase.cds:cds`.

This is one of four CDS platforms, alongside web (React), mobile (React Native), and native iOS
(SwiftUI). It shares their design language but none of their implementation toolchain — it is a
Gradle library module, not a TypeScript package.

**Using CDS in an app?** Installation is below; then read [`docs/`](docs/README.md) for token usage,
custom themes, and the full token reference. Everything after "Setup" is about developing the
package itself.

## Installing in a Compose app

CDS Android ships as an **AAR attached to a GitHub Release**. There is no Maven repository yet, so
you install a file rather than a coordinate — `implementation("com.coinbase.cds:cds:0.0.1")` will
not resolve. See [Why not a Maven coordinate?](#why-not-a-maven-coordinate) for the reason.

### 1. Download the AAR

Download `cds-release.aar` from the [releases page](https://github.com/coinbase/cds/releases) and
drop it into your app module at `app/libs/cds-release.aar`.

### 2. Configure your app module

A file-based AAR carries no POM, so **none of CDS's dependencies come with it** — you declare
Compose yourself. The versions below are the floor CDS was compiled against; newer is fine.

```kotlin
// app/build.gradle.kts
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose") // CDS components are @Composable
}

android {
    compileSdk = 36
    defaultConfig { minSdk = 26 }
    buildFeatures { compose = true }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
}

dependencies {
    implementation(files("libs/cds-release.aar"))

    // CDS's own dependencies. The BOM keeps these versions aligned with each other.
    implementation(platform("androidx.compose:compose-bom:2026.02.01"))
    implementation("androidx.compose.runtime:runtime")
    implementation("androidx.compose.foundation:foundation")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.animation:animation-core")
}
```

Requirements, and what happens if you miss one:

| Requirement                 | Why                          | If it is lower                                                             |
| --------------------------- | ---------------------------- | -------------------------------------------------------------------------- |
| `compileSdk` **36+**        | CDS is compiled against 36   | AGP fails the build with an explicit AAR-metadata error                    |
| `minSdk` **26+**            | CDS's floor                  | Manifest merger error                                                      |
| Kotlin **2.0+**             | CDS publishes 2.0 metadata   | Compiler cannot read the AAR's Kotlin metadata                             |
| Java **11** bytecode        | CDS targets 11               | Class version error at compile time                                        |
| Compose BOM **2026.02.01+** | CDS links against these APIs | `NoSuchMethodError` / `NoClassDefFoundError` at runtime, not at build time |

That last row is the one to watch. Because the AAR has no POM, Gradle cannot see CDS's version
requirements and so cannot resolve a conflict or warn you. Resolving Compose _lower_ than CDS was
built against compiles fine and fails on device. Keeping the BOM at or above the version above is
what prevents it.

### 3. Provide a theme

Wrap your app in `CdsThemeProvider`. Every CDS component reads its tokens from there.

```kotlin
setContent {
    CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light) {
        App()
    }
}
```

From here, [`docs/using-tokens.md`](docs/using-tokens.md) covers reading tokens in your own
composables, and [`docs/custom-themes.md`](docs/custom-themes.md) covers theming CDS to your brand.

### Upgrading

Download the new AAR and replace the file. There is no version bump and no automatic upgrade —
also no transitive version conflicts, since Gradle sees a plain file. Re-check the Compose BOM
floor in each release's notes.

### Why not a Maven coordinate?

A GitHub Release is a **file host, not a Maven repository**. Release assets live in a flat
namespace (`.../releases/download/<tag>/cds-release.aar`), while Gradle's Maven resolver requests
nested paths like `com/coinbase/cds/cds/0.0.1/cds-0.0.1.pom`. GitHub cannot serve that layout, so
no `repositories { }` entry can make coordinate-based resolution work against Releases.

Getting to `implementation("com.coinbase.cds:cds:…")` — with real dependency resolution, so the
Compose floor is enforced by Gradle instead of by this table — requires an actual Maven host.
GitHub Packages is the usual next step. The `maven-publish` block in `build.gradle.kts` is already
configured for that day; it just is not wired to a remote repository yet.

### Migrating to Maven later

When CDS moves to a Maven repository, the coordinates will be the ones already in `build.gradle.kts`
— `com.coinbase.cds:cds` — so the switch is small. It is not automatic, though, and one step is
easy to get wrong in a way that does not fail loudly.

**Replace the file dependency, do not add alongside it.** This is the one that bites.

```kotlin
dependencies {
-   implementation(files("libs/cds-release.aar"))
+   implementation("com.coinbase.cds:cds:<version>")
}
```

Leaving both lines in place puts **two copies of CDS on the classpath**. Gradle cannot deduplicate
them, because a file dependency has no coordinates to compare against the module — so conflict
resolution never fires. That surfaces either as a duplicate-class error when D8 merges, or, worse,
as two distinct `LocalCdsTheme` instances: one gets provided, the other gets read, and every token
lookup silently falls back to defaults.

**Then delete the vendored binary.** Remove `app/libs/cds-release.aar` and untrack it, along with
any `*.aar` entry you added to `.gitignore` for it.

**Then prune the Compose dependencies you copied from step 2.** Once a POM exists, CDS's own
Compose dependencies resolve transitively with real version constraints. Keep whichever ones your
app uses directly and drop the rest. Pay attention to any `strictly` or forced version you applied
to Compose: it will now participate in resolution against CDS's requirements, and holding Compose
below CDS's floor produces the runtime `NoSuchMethodError` described above.

**Record which version you have.** Every release ships the same filename, `cds-release.aar`, so a
file on disk carries no version information. Note the release tag next to the dependency now and
migrating is mechanical rather than guesswork:

```kotlin
implementation(files("libs/cds-release.aar")) // CDS v0.0.1
```

## Setup

You only need this if you are changing Kotlin code. Contributors working on the JavaScript
packages can skip it entirely; the Android build is not part of `yarn install`.

1. **JDK 21.** The build pins it in `android/gradle/gradle-daemon-jvm.properties`, and Gradle will
   provision it on first run if your machine has no JDK 21. This is the JDK that _compiles_ the
   code — unrelated to the app's runtime, which is ART. The bytecode target stays Java 11.
2. **Android SDK.** Either install Android Studio, or install the standalone command-line tools and
   set `ANDROID_HOME`. Required packages:
   - Platform **36** (this library's `compileSdk`) and platform **37** (the demo app's)
   - `platform-tools` (gives you `adb`)
   - An emulator system image, if you are not using a physical device
3. **Accept licenses:** `sdkmanager --licenses`

`local.properties` is generated per-machine and stays untracked; `ANDROID_HOME` is enough.

## Building

From the repo root:

```sh
yarn nx run cds-android:build  # AAR -> build/outputs/aar/cds-release.aar
yarn nx run cds-android:test   # JUnit unit tests
yarn nx run android-app:launch # build + install + start the demo app
```

The root CI workflow classifies changes to this package, `apps/android-app`, or `android/` as
Gradle work and calls [`.github/workflows/android.yml`](../../.github/workflows/android.yml).
Tag any new Android Nx project `toolchain:gradle`.

There is no dev server. Unlike Expo, where Metro stays resident and serves JavaScript to a native
shell, Compose compiles into the APK — so `launch` installs, starts the app, and exits. Re-run it
to pick up changes; see [Android Studio](#android-studio) for the faster loop.

Anything Nx does not wrap goes straight to Gradle. Note the `-p android`: the wrapper lives in the
Gradle root, not the repo root.

```sh
./android/gradlew -p android :cds:assembleRelease
./android/gradlew -p android tasks
```

### Android Studio

**File → Open → `android/`**, not the repo root. Opening the repo root makes Studio try to index
the entire JavaScript monorepo and it will not find a Gradle build.

`android/settings.gradle.kts` remaps each module's `projectDir`, so `:cds` and `:app` show up as
normal modules pointing at `packages/cds-android` and `apps/android-app`. You are editing the real
files in place, not copies.

Studio is where the fast iteration loop lives, since the CLI can only rebuild and reinstall.
[`android/README.md`](../../android/README.md#working-in-android-studio) covers what you get.

## Layout

The Gradle root is deliberately `android/` rather than the repo root, which stays Yarn + Nx:

| Path                    | Role                                                                      |
| ----------------------- | ------------------------------------------------------------------------- |
| `android/`              | Gradle root: wrapper, plugin classpath, `libs.versions.toml`, module list |
| `packages/cds-android/` | The library, Gradle module `:cds`, Nx project `cds-android`               |
| `apps/android-app/`     | Demo app, Gradle module `:app`, Nx project `android-app`                  |

The demo app depends on `project(":cds")` — source, not a published artifact — so library changes
show up immediately without a publish step.

## Cutting a release

Publishing is manual. Follow [docs/releasing.md](docs/releasing.md) for the full checklist:
bump the Gradle version, add a [`CHANGELOG.md`](CHANGELOG.md) entry, build the AAR, and attach
it to a GitHub Release tagged `android-v<version>`. Do not use `yarn release` or
`yarn nx release plan`.

## Follow-ups

Known gaps, roughly in the order they are worth picking up.

### Linting with compose-rules

There is no Kotlin linter wired up. ktlint was tried during the migration and rejected: its default
`ktlint_official` style disagrees with how this Compose code is written in thousands of places,
including flagging every PascalCase `@Composable`, so adopting it would have meant reformatting the
entire codebase in a migration that was supposed to change no behavior.

[compose-rules](https://mrmans0n.github.io/compose-rules/) is the option to evaluate instead. It is
a Compose-aware ruleset (available for both ktlint and Detekt) that checks things we actually care
about — modifier parameters present and correctly ordered, no state passed where a lambda belongs,
composables not returning values — rather than generic Kotlin formatting. Pair it with an
`.editorconfig` set to the `intellij_idea` code style so the style checks match Android Studio's
formatter instead of fighting it.

When this lands, add a `lint` Gradle task but **do not** name the Nx target `lint` — see the target
naming note in `AGENTS.md`.

### Opt-in annotations for unstable API

Explicit API mode gives us two states: `internal` (invisible) and `public` (a permanent promise).
There is no way today to ship something consumers can use while reserving the right to change it,
which means any API we are unsure about has to be withheld entirely.

Kotlin's [opt-in requirements](https://kotlinlang.org/docs/opt-in-requirements.html) are the
missing third state. We declare a marker annotation:

```kotlin
@RequiresOptIn(
    level = RequiresOptIn.Level.ERROR,
    message = "This CDS API is experimental and may change without a major version bump.",
)
public annotation class ExperimentalCdsApi
```

Anything marked with it is a compile error for consumers unless they explicitly write
`@OptIn(ExperimentalCdsApi::class)`. That makes the instability impossible to depend on by
accident, and it makes the eventual breaking change defensible — which is exactly the Hyrum's Law
problem the JavaScript packages have. Decisions still to make: whether one marker is enough or we
want separate ones per subsystem, and whether `ERROR` or `WARNING` is the right level to start at.

### Token codegen

Kotlin cannot import `@coinbase/cds-common`, so the token values here are a hand-maintained port
and will drift from web and React Native. The fix is a shared token source that generates all three
platforms; until then, treat drift as expected rather than as a bug in any one package.
