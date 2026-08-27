# cds-android

Native Android CDS: Kotlin + Jetpack Compose, published as the AAR `com.coinbase.cds:cds`. Gradle
module `:cds`, Nx project `cds-android`.

This is a **library**, not application code. Everything public here is a promise to consumers that
is expensive to take back, so the default answer to "should this be public?" is no.

## The API boundary

`:cds` compiles with Kotlin [explicit API mode](https://kotlinlang.org/docs/whatsnew14.html#explicit-api-mode-for-library-authors),
so the compiler rejects any declaration whose visibility was inherited rather than chosen.

- Default to `internal` or `private`. Reach for `public` only when the symbol is meant for
  customers.
- When the compiler tells you to add a visibility modifier, that is the moment to decide whether
  the symbol belongs on the customer API - not a formality to satisfy with `public`.
- **Never widen visibility to make `apps/android-app` compile.** The demo app is a consumer. If it
  cannot express something with the public API, either the API is genuinely missing something or
  the app is doing something it should not.
- Changing the signature of an existing `public` declaration is a breaking change.
- The public surface lives in `com.coinbase.cds.theme`. Components under
  `com.coinbase.cds.components.*` are temporarily `internal` for the first release — they were
  experiments and are not customer API yet. Anything under `components/internal/` stays off-limits
  to consumers by construction.

## Theming

- **Reading tokens:** `CdsTheme.colors.bgPrimary`, `CdsTheme.space.x2`, and the other companion
  accessors on `CdsTheme`.
- **Authoring a theme:** the `cdsTheme { }` builder. Token types have internal constructors on
  purpose - do not add public ones, and do not reintroduce a `copy()`-based or config-object API.
- `LocalCdsTheme` is public and read-only so custom `Modifier` nodes
  (`CompositionLocalConsumerModifierNode`) can read theme outside of composition. That is its only
  reason to be public: ordinary composables should use `CdsTheme.*`. Do not make it writable, and
  do not narrow it back to `internal`.

Rationale for the theme design is in `src/main/java/com/coinbase/cds/theme/README.md`, and the
consumer-facing guides are in `docs/`.

## Compose conventions

Follow the `jetpack-best-practices` skill (the official AOSP Compose API guidelines). The rules
that get violated most often here: every element accepts and respects a `Modifier` parameter,
`Modifier` is the first optional parameter, and composables that emit UI return `Unit`.

## Boundaries with the rest of the monorepo

- Do not add Yarn/npm dependencies to this package. Its `package.json` is a stub that exists only
  so Yarn workspaces and the Nx CI helpers can see the project; the real dependency list is
  `build.gradle.kts` plus `android/gradle/libs.versions.toml`.
- Do not import `@coinbase/cds-common`. Kotlin cannot consume it. Tokens here are a hand-port of
  the shared set; keeping them in sync is manual until token codegen exists.
- `compileSdk` is deliberately **36** here while the demo app is on 37. AGP records this in the AAR
  metadata and hard-fails consumers compiling against anything lower, so raising it forces every
  consuming app to move. Raise it only when this module actually needs a newer API.
- Gradle owns the version (`0.0.1` in `build.gradle.kts`). It is unrelated to the 9.x npm
  versions and must never be pulled into `yarn release`. Cutting a release is manual; follow
  [`docs/releasing.md`](docs/releasing.md) and record the version in [`CHANGELOG.md`](CHANGELOG.md).

## Commands

Run from the repo root:

```sh
yarn nx run cds-android:assemble   # AAR -> packages/cds-android/build/outputs/aar/
yarn nx run cds-android:test       # JUnit; headless composition, no Robolectric
```

CI runs the same Gradle test task (`.github/workflows/android.yml`) on PRs and pushes that touch
this package, `apps/android-app`, or `android/`. Do not add Gradle jobs to the JavaScript `ci.yml`.

`build/`, `.gradle/`, `.idea/`, and `local.properties` are generated and stay untracked.
