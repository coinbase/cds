# Android port audit checklist

Use when reviewing an existing `packages/cds-android` component against its `packages/mobile` source. Score each item: **Pass**, **Gap**, or **N/A**.

## 1. Discovery & scope

- [ ] RN source, stories, tests, and common tokens were consulted
- [ ] Deprecated RN props are **not** present on the Android API
- [ ] `useComponentConfig`, haptics, debounce, `wrapperStyles` were not ported
- [ ] Out-of-scope items are documented (not silently wrong)

## 2. API shape (Compose + CDS)

- [ ] `@Composable` returns `Unit`, PascalCase name
- [ ] `modifier: Modifier = Modifier` is first optional parameter
- [ ] Modifier applied exactly once on outermost layout node
- [ ] Parameter order: required → modifier → optional → composable slots
- [ ] Defaults live in the function signature
- [ ] Only intentional symbols are `public` (explicit API mode)
- [ ] Style resolvers, resolved types (`*Colors`, `*Metrics`), and assembly composables are `internal`
- [ ] No symbols widened to `public` only for tests or the demo app
- [ ] Demo app does not require widening internal APIs

Reference: `jetpack-best-practices` skill, `packages/cds-android/AGENTS.md`

## 3. Parity matrix

Build a table:

| RN prop / behavior | Android equivalent | Match? | Notes |
|------------------|-------------------|--------|-------|

Check variants, sizes, defaults, loading, disabled, transparent modes, icon slots, truncation, accessibility.

**Common gaps:**

- Missing variant or size enum value
- RN `block` incorrectly modeled as prop instead of modifier docs
- `IconName` instead of composable slots
- Loading still clickable
- Label lost in loading semantics

## 4. Theming & visuals

- [ ] Colors from `CdsTheme.colors.*` (resolved via `LocalCdsTheme`, not component props)
- [ ] Spacing from `CdsTheme.space.*`
- [ ] Typography from `CdsTheme.typography.*`
- [ ] Border radius from `CdsTheme.borderRadius.*`
- [ ] Components do not accept raw color/spacing props where RN used `useTheme()` — tokens come from CompositionLocal
- [ ] Tests/gallery wrap content in `CdsThemeProvider`
- [ ] Token values traceable to `@coinbase/cds-common` source (comment or doc)
- [ ] Transparent / inverse / semantic variants match token intent
- [ ] **No** Compose Styles API usage

## 5. Styling override model

- [ ] Opinionated defaults implemented in component
- [ ] Callers can override layout via `modifier` (padding, width, test tags)
- [ ] No RN-style `style` / `styles` props unless explicitly required by product
- [ ] Style logic extracted to testable `*Style.kt` resolvers where non-trivial

## 6. Interactions

- [ ] Interaction types identified (press, hover, focus, drag, toggle, long-press)
- [ ] Each produced interaction uses the correct Compose modifier
- [ ] `CdsInteractionDefaults.indication()` used for CDS feedback (not ad-hoc alpha hacks)
- [ ] Optional `interactionSource: MutableInteractionSource` hoisted when customers need observation
- [ ] Same `InteractionSource` passed to gesture + indication
- [ ] Disabled: `DisabledAlpha` + gestures blocked
- [ ] Loading: gestures blocked + correct semantics

If indication supports hover/focus but modifiers are missing, flag as **Gap**.

Docs: `packages/cds-android/docs/interaction.md`

## 7. Accessibility

- [ ] Correct `Role` in semantics
- [ ] `contentDescription` for icon-only or primary label
- [ ] `disabled()` when not interactive
- [ ] Loading: progress semantics + label retained
- [ ] `mergeDescendants` only when appropriate

Reference: https://developer.android.com/develop/ui/compose/accessibility

## 8. Tests

- [ ] `yarn nx run cds-android:test` passes
- [ ] Pure resolver tests for colors/metrics/state priority
- [ ] Robolectric + Compose UI tests for behavior (click, disabled, semantics)
- [ ] Caller `Modifier.testTag` queryable via `onNodeWithTag` (RN `testID` parity)
- [ ] Interaction event tests when `MutableInteractionSource` is hoisted
- [ ] Tests focus on regressions, not exhaustive variant grids
- [ ] No tests that only assert framework defaults

Reference: `references/ui-testing.md`, [Maestro Jetpack Compose](https://docs.maestro.dev/get-started/supported-platform/android/jetpack)

## 8b. UI testing hooks

- [ ] No dedicated `testID` prop — tags via `modifier.testTag` on root
- [ ] Maestro selector priority documented: text → description → id
- [ ] `apps/android-app` enables `testTagsAsResourceId` at activity root
- [ ] Gallery uses stable `gallery-*` tags on navigation and representative states
- [ ] `mergeDescendants` does not block intended tag placement

**Anti-patterns:**

- Only headless theme tests, no component behavior tests
- 20 tests duplicating the same assertion per variant
- No tests for disabled/loading/click paths

## 9. Demo & documentation

- [ ] Gallery section covers variants, states, sizes, edge cases
- [ ] `packages/cds-android/docs/<component>.md` exists and matches API
- [ ] `docs/README.md` index updated
- [ ] `CHANGELOG.md` mentions public API changes
- [ ] `AGENTS.md` public surface list accurate
- [ ] `interactionSource` documented if hoisted

## 10. Build & boundaries

- [ ] `yarn nx run cds-android:build` passes
- [ ] No `@coinbase/cds-common` imports
- [ ] No Yarn/npm deps added to cds-android
- [ ] Gradle version unchanged unless releasing

## 11. Skill maintenance

- [ ] `references/learnings.md` was read at audit start
- [ ] New generalizable learnings appended to `learnings.md` (if any)
- [ ] Repeatable patterns promoted to `SKILL.md` or reference files (if warranted)
- [ ] Reference implementation example still accurate

## Audit report template

```markdown
# <Component> port audit

**Verdict:** Ready / Needs work / Blocked

## Critical gaps
1.

## API parity
| RN | Android | Status |

## Interactions
...

## Tests
...

## Recommendations (ordered)
1.
```
