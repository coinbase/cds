---
name: jetpack-best-practices
description: USE THIS when writing or reviewing Jetpack Compose / Kotlin code in packages/cds-android or apps/android-app - @Composable APIs, Modifier parameters, CompositionLocal, state hoisting, or naming. Not for React or React Native work.
---

# Jetpack Compose API guidelines

`references/compose-api-guidelines.md` is the official AOSP Compose API guidelines document,
vendored verbatim. **Read it before writing or reviewing a Compose API.** It is the authority here;
do not invent house style that contradicts it, and do not paraphrase it from memory.

## How the requirement levels apply to us

The document assigns different requirement levels to different audiences. CDS Android is
**"Library development based on Jetpack Compose"** — we publish `@Composable` functions and
supporting types for other teams to consume. Read the MUST/SHOULD/MAY markers for that audience,
not the app-development ones. In practice we hold close to the framework-development bar, because
anything we ship publicly is expensive to change later.

## The rules that come up most in this codebase

These are the ones worth checking on every change. The document explains each in full.

- **Every element accepts and respects a `Modifier` parameter.** It is the first optional
  parameter, defaults to `Modifier`, is applied to the outermost layout node the element emits, and
  is used exactly once. Never accept a `Modifier` and drop it.
- **Composables that emit UI return `Unit`** and are named as PascalCase nouns (`Button`,
  `SlideButton`) — they declare a piece of UI rather than performing an action.
- **Hoist state.** Prefer stateless composables taking a value plus an `onValueChange` callback
  over ones that own their state internally.
- **`CompositionLocal` is for cross-cutting context, not for passing parameters.** In this
  codebase that means theme. A local should have a sensible default and should not be how a caller
  configures a specific component.
- **Parameter order:** required parameters, then `modifier`, then other optional parameters, then a
  trailing `@Composable` content lambda if there is one.
- **Default values belong in the signature**, so callers can see them and override any one of them
  independently.

## Boundary rules specific to CDS Android

Complementary to the guidelines, not covered by them. `packages/cds-android/AGENTS.md` is the full
version:

- `:cds` compiles with Kotlin explicit API mode. Every `public` declaration is a customer promise —
  make it a decision, not a compiler-satisfying reflex, and default to `internal`.
- Read tokens through `CdsTheme.colors` / `CdsTheme.space`; author themes with `cdsTheme { }`.
  `LocalCdsTheme` is public only so custom `Modifier` nodes can read theme outside composition.
- Never widen a declaration's visibility just to make `apps/android-app` compile.

## Related reading

The separate [component API guidelines](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/docs/compose-component-api-guidelines.md)
go deeper on designing individual components (slots, state holders, styling). Not vendored here;
consult it when designing a new component from scratch.
