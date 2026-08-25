---
name: dev.cds-android
description: USE THIS when asked to work on the native Android (Kotlin/Jetpack Compose) CDS package in packages/cds-android or the demo app in apps/android-app. Not for packages/mobile, which is React Native.
---

# CDS Android Package Guidelines

Native Android CDS: Kotlin + Jetpack Compose, published as the AAR `com.coinbase.cds:cds`. This is
a different platform from `packages/mobile` — that one is React Native. They share a design
language and nothing else.

Also load **`jetpack-best-practices`** before writing Compose APIs, and read
`packages/cds-android/AGENTS.md`, which is the source of truth for the module boundary.

## Toolchain

Gradle, not Yarn. JDK 21 and the Android SDK are required and are **not** installed by
`yarn install`.

|             |                                                                     |
| ----------- | ------------------------------------------------------------------- |
| Gradle root | `android/` (wrapper, plugin classpath, `gradle/libs.versions.toml`) |
| Library     | Gradle `:cds` → `packages/cds-android` → Nx `cds-android`           |
| Demo app    | Gradle `:app` → `apps/android-app` → Nx `android-app`               |

```sh
yarn nx run cds-android:assemble        # AAR
yarn nx run cds-android:test            # JUnit
yarn nx run android-app:launch          # install + start on device/emulator
./android/gradlew -p android <task>     # anything Nx does not wrap
```

There is no `build`, `typecheck`, or `lint` target, and this is deliberate: those names are wired
to JavaScript CI jobs running on machines with no JDK or Android SDK. Do not add targets with
those names. There is also no Kotlin linter configured yet — match the surrounding formatting,
which is Android Studio's.

Open **`android/`** in Android Studio, never the repo root.

## Explicit API mode

`:cds` compiles with `explicitApi()`, so the compiler rejects declarations whose visibility was
inherited rather than chosen.

- Default to `internal` / `private`. `public` means "customer API" and is expensive to walk back.
- When the compiler demands a modifier, decide whether the symbol belongs on the customer API.
  Adding `public` to make the error go away is the failure mode this setting exists to catch.
- **Never widen visibility so `apps/android-app` compiles.** The demo app is a consumer; if it
  cannot do something with the public API, either the API is missing something real or the app is
  wrong.

## Theming

```kotlin
// Reading tokens: companion accessors on CdsTheme.
Box(
    Modifier
        .background(CdsTheme.colors.bg)
        .padding(CdsTheme.space.x2),
)

// Authoring a theme: the cdsTheme DSL, overriding only what you need.
val AcmeTheme: CdsTheme = cdsTheme {
    id = "acme"
    lightColors { bgPrimary = Color(0xFF7B3FE4) }
    darkColors { bgPrimary = Color(0xFFAE8AFB) }
}

// Providing it.
CdsThemeProvider(theme = AcmeTheme, colorScheme = CdsColorScheme.Light) { App() }
```

- Token types have **internal constructors** on purpose. Do not add public ones, and do not
  reintroduce a `copy()`-based or config-object API — those types are gone.
- `LocalCdsTheme` is public and read-only so custom `Modifier` nodes
  (`CompositionLocalConsumerModifierNode`) can read theme outside composition. That is its only
  justification. Ordinary composables use `CdsTheme.*`. Do not make it writable or narrow it back
  to `internal`.

Design rationale: `packages/cds-android/src/main/java/com/coinbase/cds/theme/README.md`.
Consumer-facing guides: `packages/cds-android/docs/`.

## Testing

Unit tests live in `packages/cds-android/src/test/`. They host a composition directly on
`androidx.compose.runtime` (see `HeadlessComposition.kt`) rather than pulling in Robolectric or the
Compose UI test artifacts — theme behavior needs a composition but not a UI tree or a device. Keep
new token/theme tests in that style; do not add Robolectric to make a test easier.

## Things that will bite you

- **Do not import `@coinbase/cds-common`** or add npm dependencies. Kotlin cannot consume them.
  `package.json` here is a stub for Yarn/Nx bookkeeping; real dependencies go in `build.gradle.kts`
  and `android/gradle/libs.versions.toml`.
- **Tokens are a hand-port** of the shared set and can drift from web/RN. Codegen is the plan; do
  not paper over it with a runtime dependency.
- **`compileSdk` is 36 for the library, 37 for the app.** AGP writes the library value into AAR
  metadata and hard-fails consumers below it, so bumping it forces every consuming app to move.
- **Versioning is independent.** Gradle owns `0.0.1`; it has nothing to do with the 9.x
  npm versions and must never enter `yarn release`.
