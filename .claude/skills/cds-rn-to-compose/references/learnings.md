# Port learnings log

Append-only record of lessons from CDS RN → Compose ports. Read this at the start of every port and audit — it accumulates gotchas and patterns that are not yet (or should not be) in `SKILL.md`.

**Format for new entries** (add at the top, newest first):

```markdown
## YYYY-MM-DD — <ComponentName>

**Context:** [what happened during the port or audit]

**Learning:** [generalizable rule or pattern]

**Skill update:** [which file was updated, or "pending" if not yet promoted]

**Applies to:** [component types, e.g. "all interactive components", "list items"]
```

---

## 2026-09-08 — Theming via CompositionLocal

**Context:** Skill review — ensure ports use the established CDS theme delivery mechanism, not RN-style theme props.

**Learning:** Tokens flow through `CdsThemeProvider` → `LocalCdsTheme` → `CdsTheme.*` accessors. Style resolvers take resolved token values as parameters; `@Composable` entry points read the local once. `Modifier.Node` code uses `currentValueOf(LocalCdsTheme)`.

**Skill update:** Expanded Theming section in `SKILL.md`; updated mapping, audit checklist, discovery template.

**Applies to:** All `packages/cds-android` ports.

---

## 2026-09-08 — Button (post-audit fixes)

**Context:** Audit found interaction, test, docs, and API-boundary gaps; fixes applied in same session.

**Learnings:**

- Wire `hoverable` + `focusable` + `clickable` with the same hoisted `interactionSource` when `CdsInteractionDefaults` advertises hover/focus support.
- `ButtonColors` / `ButtonMetrics` must be `internal` — public style types invite Hyrum's Law coupling even when docs say otherwise.
- Test `interactionSource` press production and loading click-blocking explicitly.
- Document `interactionSource` and intentional RN scope deltas in component docs.

**Skill update:** Promoted Hyrum's Law / public API boundary section in `SKILL.md` and audit checklist.

**Applies to:** All `packages/cds-android` component ports.

---

## 2026-09-08 — Button (initial skill)

**Context:** First full CDS Android component port; established interaction, testing, and API patterns.

**Learnings:**

- RN `block` / `fullWidth` → caller `Modifier.fillMaxWidth()`, not a component prop.
- Icon props (`IconName`) → `@Composable (tint: Color, size: Dp) -> Unit` slots until a public Icon exists.
- `getInteractableStyles` / `Interactable` → `CdsInteractionDefaults.indication(shape)` + standard gesture modifiers; do not port the RN style pipeline.
- Disabled opacity (0.5) is separate from indication — apply `CdsInteractionDefaults.DisabledAlpha` on the component.
- Hoist `MutableInteractionSource` when customers may observe press/focus/hover; pass the same instance to gesture + indication.
- Only wire modifiers for interactions actually produced (`hoverable` required for hover feedback).
- Extract `resolve*Colors()` / `resolve*Metrics()` to `*Style.kt` for pure JUnit tests; use Robolectric for click, disabled, loading semantics.
- `semantics(mergeDescendants = true)` hides child `testTag`s — test icon slots by capturing slot lambda args instead.
- Do not widen `public` API for `apps/android-app`; fix consumer patterns instead.
- Compose Styles API is alpha — keep `*Style.kt` migration seam.

**Skill update:** Initial `SKILL.md` and reference files created from this port.

**Applies to:** All interactive CDS Android ports.
