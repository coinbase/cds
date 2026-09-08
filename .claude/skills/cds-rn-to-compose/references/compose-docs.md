# Official Jetpack Compose documentation

Primary sources of truth for Compose patterns used in CDS Android ports. Prefer these over blog posts or outdated samples.

## Core concepts

| Topic | URL |
|-------|-----|
| Compose mental model | https://developer.android.com/develop/ui/compose/mental-model |
| Modifiers | https://developer.android.com/develop/ui/compose/modifiers |
| State | https://developer.android.com/develop/ui/compose/state |
| Side-effects | https://developer.android.com/develop/ui/compose/side-effects |

## API design

| Topic | URL |
|-------|-----|
| Compose API guidelines (AOSP) | https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/docs/compose-api-guidelines.md |
| Component API guidelines | https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/docs/compose-component-api-guidelines.md |
| List of Compose modifiers | https://developer.android.com/develop/ui/compose/modifiers-list |

## Interaction & input

| Topic | URL |
|-------|-----|
| Touch input / clickable | https://developer.android.com/develop/ui/compose/touch-input/pointer-input/tap-and-press |
| Focus | https://developer.android.com/develop/ui/compose/touch-input/focus |
| InteractionSource | https://developer.android.com/reference/kotlin/androidx/compose/foundation/interaction/InteractionSource |
| Indication | https://developer.android.com/reference/kotlin/androidx/compose/foundation/Indication |

## Layout & theming

| Topic | URL |
|-------|-----|
| Layout basics | https://developer.android.com/develop/ui/compose/layout/basics |
| Material theming (concepts; CDS uses CdsTheme) | https://developer.android.com/develop/ui/compose/designsystems/material |
| Custom design systems | https://developer.android.com/develop/ui/compose/designsystems |

## Accessibility

| Topic | URL |
|-------|-----|
| Accessibility overview | https://developer.android.com/develop/ui/compose/accessibility |
| Semantics | https://developer.android.com/reference/kotlin/androidx/compose/ui/semantics/SemanticsPropertyReceiver |

## Testing

| Topic | URL |
|-------|-----|
| Testing overview | https://developer.android.com/develop/ui/compose/testing |
| Compose UI testing cheatsheet | https://developer.android.com/develop/ui/compose/testing-cheatsheet |
| Interoperability (Robolectric) | https://developer.android.com/develop/ui/compose/testing#robolectric |

## Kotlin library authoring

| Topic | URL |
|-------|-----|
| Explicit API mode | https://kotlinlang.org/docs/whatsnew14.html#explicit-api-mode-for-library-authors |

## CDS-specific (repo)

| Topic | Path |
|-------|------|
| Android package rules | `packages/cds-android/AGENTS.md` |
| Theme design | `packages/cds-android/src/main/java/com/coinbase/cds/theme/README.md` |
| Interaction docs | `packages/cds-android/docs/interaction.md` |
| Jetpack best practices skill | `.claude/skills/jetpack-best-practices/SKILL.md` |

## Intentionally not used (yet)

| Topic | URL | Note |
|-------|-----|------|
| Compose Styles API | https://developer.android.com/develop/ui/compose/designsystems/styles | Alpha — CDS uses `*Style.kt` resolvers instead |
