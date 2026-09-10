# UI testing: Compose UI Test and Maestro

CDS Android components should be testable from **in-process Compose UI tests** (Robolectric / instrumentation) and from **black-box Maestro flows** without widening the public API with RN-style `testID` props.

Official references:

- [Maestro — Jetpack Compose](https://docs.maestro.dev/get-started/supported-platform/android/jetpack) — black-box selectors, semantics-first philosophy
- [Maestro — Core selectors](https://docs.maestro.dev/reference/selectors/core-selectors) — `id` requires `testTagsAsResourceId` for Compose
- [Compose testing interoperability](https://developer.android.com/develop/ui/compose/testing/interoperability) — `testTagsAsResourceId` for UiAutomator / external tools
- [Compose semantics](https://developer.android.com/develop/ui/compose/accessibility) — `contentDescription`, roles, progress

## Selector priority (Maestro)

Maestro recommends matching **user-visible** properties first for refactoring resilience:

| Priority | Maestro selector | Compose source | When to use |
| -------- | ---------------- | -------------- | ----------- |
| 1 | `tapOn: "Confirm"` | Visible label text (`BasicText`, `Button` label) | Unique, stable copy; preferred for buttons with text |
| 2 | `tapOn: { description: "…" }` | `contentDescription` / semantics label | Icon-only controls, loading state, custom a11y labels |
| 3 | `tapOn: { id: "confirm" }` | `Modifier.testTag("confirm")` + `testTagsAsResourceId` | Duplicate labels, lists, scroll targets, visreg anchors |

Do **not** add a dedicated `testID` parameter on CDS composables. RN `testID` maps to caller-controlled `modifier = Modifier.testTag("…")` on the component root — same pattern as internal `Text`.

## In-process tests (Robolectric / `createComposeRule`)

```kotlin
Button(
    text = "Confirm",
    onClick = {},
    modifier = Modifier.testTag("confirm"),
)

composeRule.onNodeWithTag("confirm").performClick()
```

Also assert via visible text and semantics when that is what customers and Maestro will use:

```kotlin
composeRule.onNodeWithText("Confirm").performClick()
composeRule.onNodeWithContentDescription("Submit").assertIsNotEnabled() // loading
```

## Maestro (black-box)

Maestro does **not** see `Modifier.testTag` unless the app enables resource-id mapping once near the root:

```kotlin
import androidx.compose.ui.semantics.semantics
import androidx.compose.ui.semantics.testTagsAsResourceId

CdsThemeProvider(theme = theme, colorScheme = colorScheme) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .semantics { testTagsAsResourceId = true },
    ) {
        // All nested Modifier.testTag values are selectable as id: in Maestro
    }
}
```

`apps/android-app` enables this in `MainActivity` so gallery and component demos are Maestro-ready.

Maestro flow example:

```yaml
- tapOn: "Primary" # text match when unique
- tapOn:
    id: gallery-button-primary-interactive
- tapOn:
    description: "Submit" # contentDescription from Button label when loading
```

**Note:** IDs may not appear in Maestro Studio's inspector even when flows work — use `maestro hierarchy` to verify tags if Studio omits them.

## Component author rules

1. **Apply `modifier` on the outermost interactive node** so caller `testTag` lands on the same semantics node as `role`, `contentDescription`, and gestures.
2. **`semantics(mergeDescendants = true)`** merges child semantics into the parent — child `testTag`s are **not** independently queryable. Test icon slots by capturing slot lambda args, not nested tags.
3. **Preserve label text in semantics when loading** so text and `description` selectors keep working (`contentDescription = text` on Button).
4. **Do not bake app-specific tags into library components** — callers and gallery screens supply tags.
5. **Gallery / visreg anchors** — tag navigation chrome and one representative instance per state matrix row (interactive, disabled, loading) with stable `gallery-*` ids.

### Naming conventions

| Context | Pattern | Example |
| ------- | ------- | ------- |
| Gallery navigation | `gallery-<area>` | `gallery-home`, `gallery-nav-back` |
| Gallery component screen | `gallery-component-<name>` | `gallery-component-button` |
| Gallery demo instance | `gallery-<component>-<variant>` | `gallery-button-loading` |
| Customer screen | caller-defined, stable | `checkout-confirm` |

Use lowercase kebab-case for multi-word tags. Avoid dynamic values (user ids, timestamps, prices).

## Port checklist (testing)

- [ ] RN `testID` mapped to documented `Modifier.testTag` usage (no new prop)
- [ ] Robolectric test uses `onNodeWithTag` when documenting tag contract
- [ ] Maestro-viable: unique text or `contentDescription` for primary flows; `testTag` for ambiguous cases
- [ ] Demo app root sets `testTagsAsResourceId = true`
- [ ] Gallery tags stable ids for visreg / Maestro entry points
