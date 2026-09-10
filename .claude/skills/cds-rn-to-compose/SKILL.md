---
name: cds-rn-to-compose
description: |
  Guide for porting CDS React Native components to Jetpack Compose in packages/cds-android, and for auditing existing Android ports for completeness and quality.
  USE THIS whenever the user asks to port, migrate, or bring a CDS mobile/RN component to Android/Compose/Kotlin, audit an Android CDS component against mobile parity, or review whether a cds-android port is done correctly.
  Also trigger for phrases like "RN to Compose", "mobile to Android CDS", "port Button/Chip/Card to cds-android", "public API boundary", or "does our Android Button match mobile".
  Stress strict internal-by-default visibility for everything except the customer-facing composable and its required types — guard against Hyrum's Law.
  Deliver design tokens via CdsThemeProvider and LocalCdsTheme (CompositionLocal), not component props or cds-common imports.
  After completing or auditing a port, update this skill with generalizable learnings so future ports get faster.
  Load jetpack-best-practices alongside this skill for Compose API shape; this skill covers CDS-specific porting workflow, parity rules, interactions, tokens, and testing.
---

# CDS React Native → Jetpack Compose

Port **product behavior and visual design** from `packages/mobile` into native Compose in `packages/cds-android`. Do not transliterate React Native mechanisms (`StyleSheet`, `ViewStyle`, `Pressable` props, `useComponentConfig`, `getInteractableStyles`) — map intent to Compose-native patterns.

**Authority stack (read in order):**

1. This skill — CDS porting workflow, parity, and audit rules
2. `packages/cds-android/AGENTS.md` — API boundary, theming, Gradle
3. `jetpack-best-practices` skill — AOSP Compose API guidelines
4. [Compose component API guidelines](https://android.googlesource.com/platform/frameworks/support/+/androidx-main/compose/docs/compose-component-api-guidelines.md) — slots, state, styling seams
5. Official Android docs linked in `references/compose-docs.md`

## Modes

Determine what the user needs before writing code:

| Mode      | Trigger                                                 | Output                                                        |
| --------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| **Port**  | "Port X to Android", "implement X in cds-android"       | Discovery notes → implementation → tests → gallery → docs     |
| **Audit** | "Review the Android port", "is X done?", "parity check" | Structured audit report using `references/audit-checklist.md` |

Default to **Port** when building; switch to **Audit** when reviewing existing Kotlin without a clear build ask.

At the **start** of every port or audit, read `references/learnings.md` for accumulated gotchas. At the **end**, follow [Phase 8: Improve this skill](#phase-8-improve-this-skill).

---

## Phase 1: Discovery (required before coding)

Produce a short discovery artifact (markdown in the PR or a comment). Use `references/discovery-template.md` as the outline.

### Source files to read

For component `<Name>` in `packages/mobile/src/.../<Name>.tsx`:

| Artifact              | Path pattern                                                                                             | Why                           |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Implementation        | `packages/mobile/src/**/<Name>.tsx`                                                                      | Props, behavior, composition  |
| Base props / types    | `packages/common/src/types/*<Name>*`                                                                     | Shared contract, deprecations |
| Tokens                | `packages/common/src/tokens/<name>.ts`                                                                   | Values to hand-port           |
| Stories               | `packages/mobile/src/**/__stories__/<Name>.stories.tsx`                                                  | Variant matrix, edge cases    |
| Tests                 | `packages/mobile/src/**/__tests__/<Name>.test.tsx`                                                       | Behavior worth preserving     |
| Interactable          | `packages/mobile/src/styles/getInteractableStyles.ts`, `system/Interactable.tsx`, `system/Pressable.tsx` | Press/hover/focus/disabled    |
| iOS parity (optional) | `packages/cds-ios/Sources/Components/<Name>.swift`                                                       | Prior native decisions        |
| Existing Android      | `packages/cds-android/src/main/java/com/coinbase/cds/components/**`                                      | POC or partial port           |

Search deprecations: grep `@deprecated` on props/types in mobile and common. **Do not port deprecated props** — document what was skipped and why.

### Discovery questions

Answer explicitly in the discovery artifact:

1. **Public API surface** — Which RN props are customer-facing vs internal? What is deprecated?
2. **Variants & sizes** — Enum or sealed types? Default values?
3. **Layout** — What is intrinsic vs caller-controlled? (e.g. RN `block` → caller uses `Modifier.fillMaxWidth()`, not a prop)
4. **Slots** — Icons, labels, custom content: use `@Composable` slot lambdas, not `IconName` strings, until a public Icon component exists
5. **Interactions** — Press, long-press, hover, focus, drag, toggle? See [Interaction analysis](#interaction-analysis)
6. **States** — enabled, loading, selected, error, transparent overlays?
7. **Accessibility** — roles, content descriptions, loading/disabled semantics, live regions
8. **Test IDs** — RN `testID` on root → caller `Modifier.testTag`; Maestro needs `testTagsAsResourceId` at app root. See `references/ui-testing.md`
9. **Tokens** — Map each visual value to `CdsTheme.*`; resolve via `LocalCdsTheme` / `CdsThemeProvider`, not props. Note gaps vs `@coinbase/cds-common`
10. **Out of scope** — `useComponentConfig`, haptics, debounce, `wrapperStyles`, RN-only style props
11. **Reuse** — Can `CdsInteractionDefaults`, internal `Text`, or another CDS component be composed?

---

## Phase 2: API design

### Compose API rules (CDS + AOSP)

- **Every composable accepts `modifier: Modifier = Modifier`** as the first optional parameter; apply it once on the outermost layout node. See [Modifier](https://developer.android.com/develop/ui/compose/modifiers).
- **UI composables return `Unit`**, named PascalCase nouns (`Button`, not `button` or `renderButton`).
- **Hoist state** — value + callback (`text`, `onClick`) or hoisted `MutableInteractionSource`; avoid hidden internal state customers need to observe.
- **Parameter order** — required → `modifier` → optional scalars → trailing `@Composable` slots.
- **Default values in the signature** so callers override independently.
- **Explicit API mode** — default `internal`; only `public` what customers need. Never widen visibility for `apps/android-app`. See `packages/cds-android/AGENTS.md`.

### Public API boundary (Hyrum's Law)

`:cds` is a published library. **Every `public` symbol is a contract** — customers will depend on it even if undocumented, because [Hyrum's Law](https://www.hyrumslaw.com/) says they will. Guard the surface aggressively:

**What belongs on the public API (typically):**

- The primary `@Composable` entry point (`Button`, future `Chip`, …)
- Supporting enums and value types callers must name in signatures (`ButtonVariant`, `ButtonSize`)
- Parameters and callbacks on those entry points (`onClick`, `interactionSource`, icon slots)
- Shared primitives meant for customer-built UI (`CdsInteractionDefaults`, theme types)

**What must stay `internal` (default for everything else):**

- Style resolvers and resolved value types (`resolveButtonColors`, `ButtonColors`, `ButtonMetrics`, `*Style.kt` helpers)
- Sub-composables used to assemble the public component (`Spinner`, internal `Text`, private `Row` layouts)
- Token plumbing, preview helpers, and gallery-only code
- Anything exported "just in case" or to unblock `apps/android-app` — fix the consumer instead

**Decision rule:** when Kotlin explicit API mode asks for a visibility modifier, that is the moment to decide whether customers need the symbol — not a reflex to write `public`. If only tests need access, keep it `internal` in the same module (tests compile against `internal`).

**Audit signal:** grep for `public` in new component files and challenge each occurrence. Style types should match `SlideButtonStyle.kt` (`internal data class`), not leak as public data classes.

### Styling: opinionated defaults, caller override

CDS components ship opinionated visual defaults from tokens. Callers override layout and extension points without a parallel RN `style` / `styles` API:

| RN pattern             | Compose pattern                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `style` / `styles.foo` | `modifier` for layout; optional parameters only where product requires (e.g. `transparent`, `maxLines`) |
| `block` / `fullWidth`  | Document `Modifier.fillMaxWidth()` — no width prop                                                      |
| Theme colors           | `CdsTheme.colors.*`, `CdsTheme.space.*`, etc. via `LocalCdsTheme` (see [Theming](#theming))             |
| Custom interactable    | `CdsInteractionDefaults.indication()` / `indication(shape)`                                             |

Extract pure resolvers (e.g. `resolveButtonColors()`) into testable functions in a `*Style.kt` file. **Do not use the alpha Compose Styles API** — keep a migration seam (`*Style.kt`, `CdsInteractionDefaults`) so Styles can replace internals later without public API churn.

### Do not port

- Deprecated props and variants (grep `@deprecated`)
- `useComponentConfig` / `ComponentConfigProvider` merging
- RN-specific types: `ViewStyle`, `StyleProp`, `StyleSheet`, `wrapperStyles`
- Platform hacks: haptics, debounce, `flush`, legacy color props (`foregroundMuted`, `compact`, etc.)
- Importing `@coinbase/cds-common` — Kotlin cannot consume it; hand-port token values and keep comments pointing to the TS source

Full mapping table: `references/rn-to-compose-mapping.md`.

---

## Phase 3: Interaction analysis

For every port, classify interactions before wiring modifiers.

### Step 1 — Inventory (from RN source)

| Kind            | RN signals                        | Compose wiring                                    |
| --------------- | --------------------------------- | ------------------------------------------------- |
| Press / tap     | `Pressable`, `onPress`, `onClick` | `Modifier.clickable`                              |
| Long press      | `onLongPress`                     | `combinedClickable`                               |
| Toggle / select | `selected`, checkbox patterns     | `toggleable` / `selectable`                       |
| Hover           | `Interactable`, hover styles      | `hoverable` (desktop/emulator)                    |
| Keyboard focus  | focus styles, `accessible`        | `focusable` + `CdsInteractionDefaults.indication` |
| Drag            | `draggable`, gestures             | `draggable` / gesture APIs                        |
| Scroll          | `ScrollView` children             | parent scroll; semantics for accessibility        |

### Step 2 — Produce events for customers

If customers might need to observe interaction state (pressed, focused, hovered), accept an optional hoisted source:

```kotlin
interactionSource: MutableInteractionSource = remember { MutableInteractionSource() }
```

Pass the **same instance** to the gesture modifier (`clickable`, `hoverable`, …) and to `CdsInteractionDefaults.indication(shape)`. Customers observe via `interactionSource.collectIsPressedAsState()` or `interactions.collect { }`. See [InteractionSource](https://developer.android.com/reference/kotlin/androidx/compose/foundation/interaction/InteractionSource).

**Rule:** Only wire modifiers for interactions the component actually **produces**. If `CdsInteractionDefaults` handles hover but the component never calls `hoverable`, hover feedback will never appear — either add the modifier or document the limitation.

Shared CDS affordances: `com.coinbase.cds.interaction` (`CdsInteractionDefaults`, `CdsInteractionTokens`). Document usage in `packages/cds-android/docs/interaction.md`.

### Step 3 — Disabled vs indication

- **Disabled opacity:** `CdsInteractionDefaults.DisabledAlpha` (0.5) on the component — not inside indication
- **Loading:** block clicks, show progress, set [semantics](https://developer.android.com/develop/ui/compose/accessibility) (`progressBarRangeInfo`, keep label for screen readers)

---

## Phase 4: Implementation

### File layout

```
packages/cds-android/src/main/java/com/coinbase/cds/
├── components/<name>/
│   ├── <Name>.kt           # public @Composable API (+ public enums)
│   └── <Name>Style.kt      # internal resolvers, metrics, colors
└── interaction/            # shared when interactive (already exists)
```

Keep assembly composables `internal` or inline in `<Name>.kt`. Do not publish helper composables customers could accidentally depend on.

### Theming

CDS Android delivers design tokens through Compose **[CompositionLocal](https://developer.android.com/develop/ui/compose/layering#compositionlocal)** — not through component props or `@coinbase/cds-common` imports.

**How tokens reach components:**

1. **`CdsThemeProvider`** wraps the app (or a subtree) and installs a resolved theme into **`LocalCdsTheme`**.
2. **`@Composable` components read tokens** via `CdsTheme.colors`, `CdsTheme.space`, `CdsTheme.typography`, `CdsTheme.borderRadius`. These accessors resolve against the nearest `CdsThemeProvider` above the call site — the Compose equivalent of mobile's `useTheme()`.
3. **Style resolvers stay pure** — `*Style.kt` functions take token values as parameters (e.g. `CdsColors`) so JUnit tests do not need composition. The public `@Composable` reads `CdsTheme.*` once and passes resolved values into the resolver.
4. **Custom `Modifier.Node` draw code** (e.g. `CdsIndication`) reads `currentValueOf(LocalCdsTheme)` when it cannot call `CdsTheme` accessors directly. `LocalCdsTheme` is public read-only for this reason only.

Do **not** thread colors or spacing through component parameters the way RN passes theme-derived values via props. Do **not** use `CompositionLocal` for per-component configuration — nest `CdsThemeProvider` when a subtree needs a different theme.

- Author custom themes with the `cdsTheme { }` builder
- Wrap tests, gallery, and previews in `CdsThemeProvider(theme = CdsDefaultTheme, colorScheme = CdsColorScheme.Light)`
- Do not add public token constructors or `copy()` theme APIs
- When porting from `@coinbase/cds-common/tokens/*`, hand-port values with a comment citing the TS path

Reference: `packages/cds-android/docs/using-tokens.md`, `packages/cds-android/src/main/java/com/coinbase/cds/theme/README.md`.

### Accessibility

Follow [Compose accessibility](https://developer.android.com/develop/ui/compose/accessibility):

- `Modifier.semantics` — `contentDescription`, `role`, disabled, progress
- Loading: indeterminate progress + retain text label in semantics
- Merge descendants only when it improves screen reader experience

### Test IDs (Compose UI Test + Maestro)

RN `testID` maps to **`modifier = Modifier.testTag("…")`** on the component root — do not add a separate `testID` parameter. Full rules: `references/ui-testing.md`.

| Tool                              | How callers tag               | How tests select                                                                                                         |
| --------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Robolectric / `createComposeRule` | `modifier.testTag("confirm")` | `onNodeWithTag("confirm")`                                                                                               |
| Maestro (black-box)               | same `testTag` on composables | `tapOn: { id: "confirm" }` **after** app enables `Modifier.semantics { testTagsAsResourceId = true }` once near the root |

**Maestro selector priority** ([Jetpack Compose guide](https://docs.maestro.dev/get-started/supported-platform/android/jetpack)): prefer visible **text**, then **accessibility description** (`contentDescription`), then **`id`** (`testTag`) for duplicates, lists, or visreg anchors.

- Apply caller `modifier` on the **outermost interactive node** so tags share semantics with `role` and gestures.
- `semantics(mergeDescendants = true)` hides nested `testTag`s — do not rely on child tags inside merged subtrees.
- Tag gallery navigation and one instance per representative state (`gallery-button-loading`, etc.) for future visreg/Maestro flows; keep library components free of app-specific ids.

### Internal composition

Prefer existing internal CDS pieces (`Text`, etc.) over duplicating typography. Keep internal components `internal` until promoted deliberately.

---

## Phase 5: Testing

Use **Robolectric + Compose UI Test (JUnit 4)** for component behavior — not only the headless `composeOnce` harness used for theme-only tests.

```sh
yarn nx run cds-android:test
yarn nx run cds-android:build
```

### What to test (high value)

| Layer                  | Tool                                     | Examples                                                               |
| ---------------------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| Pure resolvers         | JUnit                                    | `resolveButtonColors`, `resolveCdsInteractionVisualState` priority     |
| Composition & behavior | Robolectric + `createComposeRule()`      | click invokes callback, disabled blocks click, semantics               |
| Test tags              | Robolectric + `onNodeWithTag`            | caller `Modifier.testTag` on root is queryable                         |
| Interaction production | Robolectric + `MutableInteractionSource` | press emits `PressInteraction.Press`; add when component hoists source |
| Icon slots             | Capture lambda args                      | tint Color and size Dp passed to slots                                 |

### What not to over-test

- Every variant × size matrix (cover in pure resolver tests instead)
- Pixel-perfect screenshots unless the repo already has screenshot infra
- Duplicating framework behavior (e.g. that `clickable` exists)

Add Robolectric deps in `packages/cds-android/build.gradle.kts` and `android/gradle/libs.versions.toml` if missing (`isIncludeAndroidResources = true`).

---

## Phase 6: Demo app

Add or extend a gallery section in `apps/android-app`:

- All variants, sizes, states (disabled, loading, transparent)
- Icon slots, full width via `Modifier.fillMaxWidth()`, truncation
- Interactive demo (click counter) where relevant
- Stable `Modifier.testTag` on navigation chrome and representative demo instances (`gallery-*`) for visreg and Maestro — see `references/ui-testing.md`

Ensure `apps/android-app` enables `testTagsAsResourceId` at the activity root so Maestro can use `id:` selectors.

The demo app is a **consumer** — if it needs a non-public API, fix the API design instead of widening visibility.

---

## Phase 7: Documentation & changelog

- **KDoc** on the public `@Composable` and its types — API, modifier usage, interaction hoisting, test tags
- Do **not** add per-component files under `packages/cds-android/docs/` — that folder is for cross-cutting guides (tokens, themes, interaction, releasing) only
- `packages/cds-android/CHANGELOG.md` under the Gradle version
- Update `packages/cds-android/AGENTS.md` if public surface changes

---

## Phase 8: Improve this skill

This skill is a **living document**. Each port teaches something the next port should not rediscover. Treat skill maintenance as part of finishing a port — not optional cleanup.

### When to capture a learning

Record and potentially promote a learning when any of these happen:

- You hit a compile error or test failure that reveals a non-obvious Compose/CDS pattern
- The user corrects your approach during review
- An audit finds a gap that existing guidance did not cover
- You make an architectural choice (interaction wiring, test strategy, API shape) that future components should repeat
- You explicitly decide **not** to port something — the rationale may help the next agent

Skip one-off component trivia that does not generalize (e.g. "Chip uses `radius400`" belongs in that component's code/docs, not the skill).

### What to update (by scope)

| Scope                                 | Where                                                       | Example                                                     |
| ------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| Single port gotcha, not yet validated | `references/learnings.md`                                   | "Outlined variants need border token even when transparent" |
| Repeatable RN → Compose translation   | `references/rn-to-compose-mapping.md`                       | New row in interaction or styling table                     |
| Audit criterion                       | `references/audit-checklist.md`                             | New checkbox after a recurring gap                          |
| Workflow step or rule                 | `SKILL.md`                                                  | New phase sub-step, verification item                       |
| Best reference implementation         | [Example section](#example-button-reference-implementation) | Point to the newest high-quality port                       |
| Shared infrastructure                 | `packages/cds-android/docs/`, `AGENTS.md`                   | Interaction docs, public API list                           |

**Promotion path:** log in `learnings.md` first → after the pattern appears in **two or more** ports (or one port + one audit), promote it into `SKILL.md` or a reference file → trim the learning entry to point at the promoted location.

### How to write good updates

- **Generalize** — write rules for classes of components ("all toggleable controls"), not copy-paste from one file
- **Explain why** — future agents need the reasoning, not just the rule
- **Keep SKILL.md lean** — if a section grows past ~30 lines of component-specific detail, move it to `references/` and link from the skill
- **Do not contradict** `jetpack-best-practices`, `packages/cds-android/AGENTS.md`, or official Android docs; update the skill when repo policy changes
- **Remove stale guidance** when a better pattern replaces it (note the change in `learnings.md`)

### End-of-port skill checklist

Before marking the port done, ask:

- [ ] Did I read `references/learnings.md` at the start?
- [ ] Did I learn anything generalizable? If yes, append to `learnings.md`
- [ ] Should any learning be promoted to `SKILL.md`, mapping, or audit checklist now?
- [ ] Should the reference implementation example change?
- [ ] Did I tell the user what skill updates I made (if any)?

Only update skill files when the learning is clear. When unsure, log in `learnings.md` with **Skill update: pending** and promote after the next port confirms it.

---

## Audit workflow

When reviewing an existing port, read the RN discovery sources again and walk `references/audit-checklist.md`. Produce a report:

```markdown
# <Component> Android port audit

## Summary

[Pass / gaps / recommendations]

## API parity

| RN prop | Android | Status | Notes |

## Deprecations correctly omitted

...

## Interactions

...

## Tokens & visuals

...

## Tests

...

## Docs & demo

...
```

Flag: deprecated props ported, missing `modifier`, raw colors, public leakage, missing interaction observation, no behavior tests, Compose Styles API usage.

---

## Verification checklist

Before marking a port complete:

- [ ] Discovery artifact written; deprecated RN props excluded
- [ ] `modifier` accepted and applied once on outer node
- [ ] All visuals from `CdsTheme` tokens via `LocalCdsTheme` (no hard-coded design values; no theme props)
- [ ] Interactions classified; gesture modifiers match; `interactionSource` hoisted if observable
- [ ] Accessibility: roles, disabled, loading semantics
- [ ] Test IDs: RN `testID` documented as `Modifier.testTag`; Robolectric `onNodeWithTag` test; gallery tags for Maestro/visreg
- [ ] Pure style resolvers unit-tested
- [ ] Robolectric behavior tests for callbacks and semantics
- [ ] Interaction event tests when component hoists `MutableInteractionSource`
- [ ] Gallery section in `android-app`
- [ ] KDoc on public API + CHANGELOG
- [ ] `yarn nx run cds-android:test` and `cds-android:build` pass
- [ ] No Compose Styles API; no `@coinbase/cds-common` imports
- [ ] Public API reviewed for Hyrum's Law — no leaked style types or assembly composables
- [ ] Skill improved: learnings logged and promoted where appropriate (Phase 8)

---

## Reference files

| File                                  | When to read                                                       |
| ------------------------------------- | ------------------------------------------------------------------ |
| `references/learnings.md`             | **Every port/audit** — accumulated gotchas; append after each port |
| `references/discovery-template.md`    | Starting a new port                                                |
| `references/rn-to-compose-mapping.md` | Translating RN concepts                                            |
| `references/audit-checklist.md`       | Auditing a port                                                    |
| `references/compose-docs.md`          | Official Android doc links                                         |
| `references/ui-testing.md`            | Maestro + Compose UI Test tags, selector priority, gallery naming  |

## Example: Button (reference implementation)

- RN: `packages/mobile/src/buttons/Button.tsx`
- Android: `packages/cds-android/.../button/Button.kt`, `ButtonStyle.kt`
- Interaction: `CdsInteractionDefaults.indication(shape)` + hoisted `interactionSource`
- Tests: `ButtonTest.kt`, `ButtonStyleTest.kt`, `CdsInteractionStateTest.kt`
- Gallery: `apps/android-app/.../ButtonGallerySection.kt`
- KDoc: `Button.kt`; package docs: `interaction.md`
