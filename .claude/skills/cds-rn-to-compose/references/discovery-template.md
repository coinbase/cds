# Discovery: `<ComponentName>` RN → Compose

Copy this template into a PR description or working note. Fill every section before writing Kotlin.

## Source inventory

| Artifact | Path | Reviewed |
|----------|------|----------|
| RN implementation | `packages/mobile/src/.../<Component>.tsx` | [ ] |
| Common types | `packages/common/src/types/...` | [ ] |
| Tokens | `packages/common/src/tokens/...` | [ ] |
| Stories | `packages/mobile/src/**/__stories__/<Component>.stories.tsx` | [ ] |
| RN tests | `packages/mobile/src/**/__tests__/<Component>.test.tsx` | [ ] |
| iOS (if any) | `packages/cds-ios/Sources/Components/<Component>.swift` | [ ] |
| Existing Android | `packages/cds-android/...` | [ ] |

## Deprecated API (do not port)

List every `@deprecated` prop, variant, or type found in mobile/common:

| Symbol | Deprecation reason | Android action |
|--------|-------------------|----------------|
| | | Skip |

## Public API proposal

### Composable signature (draft)

```kotlin
@Composable
fun ComponentName(
    // required
    modifier: Modifier = Modifier,
    // ...
)
```

### Props mapping

| RN prop | Compose equivalent | Port? | Notes |
|---------|-------------------|-------|-------|
| `style` | `modifier` | Partial | Layout only |
| `block` | — | No | Caller `fillMaxWidth()` |
| | | | |

### Variants / sizes / enums

| RN | Kotlin type | Default |
|----|-------------|---------|
| | | |

## Layout & slots

- **Intrinsic size behavior:**
- **Icon/content slots:** `@Composable (tint: Color, size: Dp) -> Unit` or content lambda?
- **Caller-controlled layout:** document `Modifier` patterns (padding, fillMaxWidth, weight)

## Interaction analysis

| Interaction | Needed? | RN mechanism | Compose modifier | Customer observable? |
|-------------|---------|--------------|------------------|---------------------|
| Press | | `Pressable` | `clickable` | `MutableInteractionSource` |
| Hover | | `Interactable` | `hoverable` | |
| Focus | | focus styles | `focusable` | |
| Long press | | | `combinedClickable` | |
| Drag | | | | |
| Toggle | | | | |

**Indication:** `CdsInteractionDefaults.indication()` or `indication(shape)`?

**Disabled treatment:** `CdsInteractionDefaults.DisabledAlpha` + block gestures when disabled/loading

## States

| State | Visual | Behavioral | Semantics |
|-------|--------|------------|-----------|
| enabled | | | |
| disabled | | block input | `disabled()` |
| loading | | block input | progress + label |

## Test IDs

| RN | Android CDS | Notes |
|----|-------------|-------|
| `testID` on root | `modifier = Modifier.testTag("…")` | No dedicated prop |
| Maestro `id:` | same tag + app `testTagsAsResourceId` | See `references/ui-testing.md` |

**Maestro selector plan:** text match / `description` / `id` for each critical flow?

**Gallery tags:** stable `gallery-*` ids for visreg anchors?

## Token mapping

| Visual property | cds-common token | CdsTheme accessor | Delivery |
|-----------------|------------------|-------------------|----------|
| Background | | `CdsTheme.colors.*` | `LocalCdsTheme` via `CdsThemeProvider` |
| Foreground | | | |
| Padding | | `CdsTheme.space.*` | |
| Typography | | `CdsTheme.typography.*` | |
| Radius | | `CdsTheme.borderRadius.*` | |

**Token gaps:** (values missing from Android theme — file follow-up)

## Explicitly out of scope

- [ ] `useComponentConfig`
- [ ] Haptics / debounce / `flush`
- [ ] `wrapperStyles` / granular `styles` object
- [ ] Compose Styles API (alpha)
- [ ] Deprecated props listed above

## Reuse

- [ ] `CdsInteractionDefaults`
- [ ] Internal `Text` or other CDS components
- [ ] Shared style resolvers pattern (`*Style.kt`)

## Test plan

| Test | Type | Priority |
|------|------|----------|
| Style resolver token mapping | JUnit pure | High |
| onClick / callback | Robolectric | High |
| Disabled blocks interaction | Robolectric | High |
| Loading semantics | Robolectric | High |
| InteractionSource press events | Robolectric | If hoisted |
| Icon slot tint/size | Robolectric | If slots |

## Demo & docs

- Gallery section: `apps/android-app/.../<Component>GallerySection.kt`
- Doc: `packages/cds-android/docs/<component>.md`
- CHANGELOG entry

## Open questions

- 

## Skill feedback (Phase 8)

After the port, note anything that should be added to `references/learnings.md` or promoted into the skill:

| Learning | Generalizable? | Target file |
|----------|----------------|-------------|
| | Yes / No / Pending | `learnings.md` / `SKILL.md` / mapping / audit |
