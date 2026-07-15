# Plan: Add `size` prop to Button (web + mobile) & deprecate `compact`

Single cross-platform implementation plan for CDS-2168 (T‑Shirt: Button).

## References

- **Linear issue:** [CDS-2168 — CDS T‑Shirt: Button](https://linear.app/coinbase/issue/CDS-2168/cds-t-shirt-button)
- **Figma (Button component set, `node-id=89:3096`):** [✨ CDS Components](https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/branch/qVoSQfzuHLg3UwyEv5mKY9/%E2%9C%A8-CDS-Components?m=auto&node-id=89-3096&t=bAIsCQuzz3XZlKtb-1)

## Goal

Introduce a t‑shirt `size` prop (`xs | s | m | l`) to the `Button` component in both
`@coinbase/cds-web` and `@coinbase/cds-mobile`, driven by the Figma component set
(`node-id=89:3096`). Deprecate the existing `compact` boolean and point users to `size`.

**Backward compatibility is the top priority.** No visual or behavioral change for any
existing caller that has not adopted `size`.

## Rules (from the feature request)

1. `size` defaults to **`l`** (large).
2. `compact` is **deprecated** but must keep working **exactly** as today.
3. If **both** `size` and `compact` are provided, `compact` is **ignored** (`size` wins).
4. If only `compact` is provided, behavior is identical to today.
5. **No fixed sizes/heights, ever.** `size` must **never** introduce a hard-coded `height`,
   `minHeight`, `width`, or any fixed dimension. Button dimensions stay **derived from content +
   spacing** (padding + font/line-height); the `size` variant only tunes those spacing/typography
   inputs. The heights in the spec table below are _computed outcomes_, not values to set.

---

## Current state (verified)

Both components are structurally parallel and derive their geometry inline from `compact`:

| Prop default               | `compact` (true) | default (false) | Resolved px                  |
| -------------------------- | ---------------- | --------------- | ---------------------------- |
| `paddingX`                 | `2`              | `4`             | 16px / 32px                  |
| `paddingY`                 | `1`              | `2`             | 8px / 16px                   |
| `borderRadius`             | `700`            | `900`           | 40px / 56px                  |
| `iconSize`                 | `'s'`            | `'m'`           | —                            |
| `feedback` _(mobile only)_ | `'light'`        | `'normal'`      | press/haptic                 |
| `font`                     | `'headline'`     | `'headline'`    | 16/24 (unchanged by compact) |

- Web: `packages/web/src/buttons/Button.tsx`
- Mobile: `packages/mobile/src/buttons/Button.tsx`
- The `space` scale supports fractional keys (`0.75`, `1.5`) — needed for `xs`/`m`.
- Font tokens `headline` (16/24) and `label1` (14/20) both exist as valid `Text` `font` values.
- A **deprecated** helper `packages/common/src/utils/getButtonSpacingProps.ts` already encodes
  the `default`/`compact`/`flush` padding scale. Do **not** extend it (it is `@deprecated`,
  `@deprecationExpectedRemoval v10`); introduce a new size config instead.

### Height verification vs Figma `size=l` — ✅ MATCH

- Current default (no `compact`): `paddingY=2` (16px ×2) + `headline` line-height (24px) = **56px**.
- Figma `size=l` = **56px**. **They match**, so defaulting `size` to `l` preserves the current
  default height exactly.
- Current `compact` = `paddingY=1` (8px ×2) + 24px = **40px** = Figma `size=s`. So `compact`
  maps cleanly onto `size='s'` — no drift.
- Neither component sets a fixed height (mobile = intrinsic, web = `height="fit-content"`),
  so height is purely padding + line-height driven; the math above is authoritative.

> No discrepancy to flag — the current default state matches `size=l`.

---

## Target size specification (extrapolated from Figma)

Holding `variant=primary, state=default, width=full, transparent=false, icon=none`:

| size | `paddingX` (space) | `paddingY` (space) | `borderRadius` | `font`     | text  | height   |
| ---- | ------------------ | ------------------ | -------------- | ---------- | ----- | -------- |
| `xs` | `2` (16px)         | `0.75` (6px)       | `700` (40)     | `label1`   | 14/20 | **32px** |
| `s`  | `2` (16px)         | `1` (8px)          | `700` (40)     | `headline` | 16/24 | **40px** |
| `m`  | `3` (24px)         | `1.5` (12px)       | `900` (56)     | `headline` | 16/24 | **48px** |
| `l`  | `4` (32px)         | `2` (16px)         | `900` (56)     | `headline` | 16/24 | **56px** |

> The **height** column is a _derived outcome_ of `paddingY` + line-height, **not** a value that is
> ever set. Height must remain content/spacing-driven (see Rule 5). Mobile stays intrinsic and web
> keeps `height="fit-content"`; no size adds a fixed/min height or width.

Notes:

- `xs`/`s` share `paddingX` (16px) and `borderRadius` (40); they differ in `paddingY` and `font`.
- `s`/`m`/`l` share the `headline` type ramp; only `xs` drops to `label1` (14/20).
- **`icon` size per t‑shirt size still needs confirmation from Figma** (see Open questions).
  Proposed default preserving current behavior: `xs`/`s` → `'s'`, `m`/`l` → `'m'`.

---

## Implementation

### 1. Per-package size config (do **not** share via `cds-common`)

Define the size map **independently in each package** — `packages/web/src/buttons/` and
`packages/mobile/src/buttons/`. **Do not** put it in `cds-common`.

Rationale: the style-prop types differ between web and mobile (e.g. `paddingX`/`borderRadius`/
`font` accept package-specific value types, responsive shapes on web, etc.). A single shared map
in `common` could not be strongly typed against both — it would force `any`/loose types and lose
compile-time safety. Keeping a config per package lets each one be typed against its own
`ButtonBaseProps` / style-prop types, so a bad token value fails typecheck in that package.

Each package defines the same _values_ (the spec table is the shared source of truth on paper),
typed locally, e.g.:

```ts
// packages/web/src/buttons/Button.tsx  (and mobile equivalent, typed to that package)
const buttonSizes = {
  xs: { paddingX: 2, paddingY: 0.75, borderRadius: 700, iconSize: 's', font: 'label1' },
  s: { paddingX: 2, paddingY: 1, borderRadius: 700, iconSize: 's', font: 'headline' },
  m: { paddingX: 3, paddingY: 1.5, borderRadius: 900, iconSize: 'm', font: 'headline' },
  l: { paddingX: 4, paddingY: 2, borderRadius: 900, iconSize: 'm', font: 'headline' },
} as const satisfies Record<
  ButtonSize,
  {
    /* package-local style-prop types */
  }
>;

const defaultButtonSize: ButtonSize = 'l';
```

- The `ButtonSize` string-union type (`'xs' | 's' | 'm' | 'l'`) is a plain literal union and _is_
  safe to share if desired, but the simplest path is to declare it in each package alongside the
  map. Keep the two maps in sync manually; the spec table above is the reference.
- Rationale for the values: the `compact` geometry (`s` and `l` rows) is a strict subset of this
  map, which is what makes the backward-compat guarantee provable.

### 2. Resolution logic (identical in both packages)

```ts
const resolvedSize = size ?? (compact ? 's' : 'l'); // size wins → compact ignored when both set
const cfg = buttonSizes[resolvedSize];
```

Then fold `cfg` into the existing destructure defaults, preserving the current precedence
(explicit prop > `padding` shorthand > size-derived default):

- `borderRadius = borderRadius ?? cfg.borderRadius`
- `paddingX = paddingX ?? padding ?? cfg.paddingX` (web keeps its `padding ??` shorthand)
- `paddingY = paddingY ?? padding ?? cfg.paddingY`
- `font = font ?? cfg.font` ← **change**: default was hard-coded `'headline'`; now size-derived
- `iconSize = cfg.iconSize`

> Because `resolvedSize` for the compact-only path is `'s'`, and the `'s'` row is byte-for-byte
> the current compact geometry, and `'l'` equals the current default geometry, **every existing
> caller renders identically**.

### 3. Mobile-only: `feedback`

Current: `feedback = compact ? 'light' : 'normal'`. To preserve BC _and_ stay consistent, tie
the default to `resolvedSize`:

```ts
feedback = feedbackProp ?? (resolvedSize === 'xs' || resolvedSize === 's' ? 'light' : 'normal');
```

- compact-only → `resolvedSize='s'` → `'light'` (unchanged ✅)
- default → `'l'` → `'normal'` (unchanged ✅)
- new `size='s'`/`'xs'` → `'light'`; `size='m'`/`'l'` → `'normal'` (consistent)

This is the one spot where `compact`'s effect is _not_ purely geometric, so it is called out
explicitly. (See Open questions if product prefers `feedback` to remain literally `compact`-gated.)

### 4. Add the `size` prop to the public type (both packages)

Add to `ButtonBaseProps` in each package:

```ts
/**
 * Set the size of the button.
 * @default l
 */
size?: ButtonSize;
```

### 5. Deprecate `compact` (use the `deprecate-cds-api` skill)

In **both** `ButtonBaseProps` definitions:

```ts
/**
 * Reduce the inner padding within the button itself.
 * @deprecated Use `size="s"` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
compact?: boolean;
```

- Run the `deprecate-cds-api` skill so the JSDoc, version tags, and docsite metadata are applied
  consistently across every public export path.
- Finish with `yarn nx run web:lint` and `yarn nx run mobile:lint` so the
  `internal/deprecated-jsdoc-has-removal-version` rule passes.

---

## Backward-compatibility & stability risks (call-outs)

1. **Sibling components `Pick` `compact` from `ButtonBaseProps` (informational).**
   Out of scope for this effort — sibling/related components that compose `Button` or re-share its
   props will be handled separately. Noting them here only for awareness, since adding `@deprecated`
   to `ButtonBaseProps.compact` will propagate the tag into any type that re-exports it:
   - `IconButton` (web + mobile) — `Pick<ButtonBaseProps, ... | 'compact'>` (has its own independent
     `compact` semantics: `@default compact ? 's' : 'm'`, defaults `compact=true`; does not forward to `Button`)
   - `AvatarButton` (web + mobile) — `Pick<ButtonBaseProps, 'compact'>`
   - mobile `SlideButton` — references `compact`

   No action required in this ticket; their maintainers can migrate/shield as part of their own updates.

2. **`font` default now size-derived.** Changing the hard-coded `font = 'headline'` to
   `font ?? cfg.font` is a no-op for `s`/`m`/`l` (all `headline`) and only differs for the **new**
   `xs`. Verify no caller relies on the literal default when using the (previously nonexistent)
   small path. Low risk.

3. **`feedback` semantics (mobile).** See §3 — tying `feedback` to `resolvedSize` preserves BC for
   the compact and default paths but slightly redefines the trigger. Confirm with design/product.

4. **`flush` + `size` interaction.** Both platforms compute the negative flush margin from the
   resolved `paddingX`. Since flush margin now reads the size-derived `paddingX`, confirm flush
   still visually aligns for each size (esp. `m`/`l` with larger `paddingX`). Add a story/test.

5. **`getButtonSpacingProps` is deprecated and unused by `Button`.** Do not route new logic
   through it; leave it alone to avoid resurrecting a deprecated API.

6. **Migration path.** Consider a `packages/migrator` v9→v10 transform (`cds-migrator-transform`
   skill) that rewrites `compact` → `size="s"` and bare `<Button>` (no size) as-is (default `l`).
   This lets consumers clear deprecation warnings mechanically before removal.

---

## Testing

- **Unit (both packages):** `Button.test.tsx`
  - `size` default resolves to `l` geometry (radius 900, paddingX 4, paddingY 2, headline).
  - Each of `xs/s/m/l` produces the expected padding / radius / font / iconSize.
  - `compact` (alone) still yields the exact `s` geometry (radius 700, paddingX 2, paddingY 1).
  - `size` + `compact` together → `compact` ignored, `size` wins.
  - Mobile: `feedback` resolves `light` for `xs`/`s` and compact-only; `normal` for `m`/`l`.
  - Explicit `paddingX`/`paddingY`/`borderRadius`/`font`/`padding` still override size defaults.
- **Visual/stories (one-off, standalone):** create a **new dedicated story file** in each package
  for quick/efficient testing — **do not** add these to the existing `__stories__/Button.stories.tsx`.
  - Web: e.g. `packages/web/src/buttons/__stories__/ButtonSize.stories.tsx`
  - Mobile: e.g. `packages/mobile/src/buttons/__stories__/ButtonSize.stories.tsx`
  - Both platforms render the **same set of examples** (parity), but code does **not** need to be
    shared/reused between them — write each natively for its platform.
  - Examples to render, in this order:
    1. **Default** `<Button>` (no `size`, no `compact`) — should render as `l`.
    2. **Deprecated `compact`** `<Button compact>` — unchanged legacy behavior (renders as `s`).
    3. **Size variants** — one button each for `size="xs"`, `"s"`, `"m"`, `"l"`.
    4. **`compact` + `size` combo** — e.g. `<Button compact size="m">` to visually confirm
       **`size` wins** and `compact` is ignored (renders as `m`, not `s`).
  - Label each example so the rendered output is self-describing for visual review/visreg.
- Run only the touched files:
  `yarn nx run web:test --testNamePattern=Button` and `yarn nx run mobile:test --testNamePattern=Button`.

## Docs

Use the `components.write-docs` skill and follow the conventions already in the example files
(`jsx live` blocks, short intro sentence per section, `HStack`/`VStack` with `gap`, labeled
buttons). Both platforms mirror the same structure — web uses `onClick`, mobile uses `onPress`.

Files: `apps/docs/docs/components/inputs/Button/_webExamples.mdx` and `_mobileExamples.mdx`.

1. **Remove the deprecated `compact` section.** Delete the `### Compact` subsection under
   `## Sizing` in **both** example files (web + mobile) — we should not showcase a deprecated prop
   as a documented feature.
2. **Add a `### Size` subsection under `## Sizing`** (replacing the removed Compact section, same
   position) that documents and demonstrates the t‑shirt sizes, following the existing convention.
   Render one button per size in size order, labeled, e.g.:

   ```jsx live
   // web (_webExamples.mdx); mobile mirrors with onPress + RN layout
   <HStack gap={2} flexWrap="wrap" alignItems="center">
     <Button onClick={console.log} size="xs">
       Extra small
     </Button>
     <Button onClick={console.log} size="s">
       Small
     </Button>
     <Button onClick={console.log} size="m">
       Medium
     </Button>
     <Button onClick={console.log} size="l">
       Large (default)
     </Button>
   </HStack>
   ```

   Include a one-line intro noting `size` defaults to `l` and that it replaces `compact`
   (`size="s"` is the direct equivalent of the old `compact`).

3. **Scrub incidental `compact` usage from other examples** so no live example promotes the
   deprecated prop: update the `compact` occurrences in the **Loading**, **End Icon**, and
   **Start Icon** examples (both files) to `size="s"` (or drop the prop). This is a mechanical
   swap that keeps the visuals identical.
4. **Props table / metadata:** prop docs are JSDoc-driven, so the `@deprecated` tag on `compact`
   and the new `size` prop flow through automatically. Update
   `apps/docs/docs/components/inputs/Button/{web,mobile}Metadata.json` only if metadata needs it.
5. **Figma Code Connect:** refresh `__figma__/Button.figma.ts` (both packages) using the
   `figma-code-connect` skill/refresh with the Button component **node id `89:3096`**, prompting
   specifically that we want to **add the `size` property** to the Code Connect template (map the
   Figma `size` variant property → the new `size` prop).

## Definition of done

- [ ] `size` prop added (both packages), default `l`, geometry per spec table.
- [ ] `compact` deprecated with `@deprecationExpectedRemoval v10` (both packages) via skill.
- [ ] `size` + `compact` precedence + compact-only BC covered by tests.
- [ ] One-off standalone size stories added (new file per package, not in existing
      `Button.stories.tsx`): default, `compact`, `xs/s/m/l`, and `compact`+`size` (size wins).
- [ ] Docs updated (both `_webExamples.mdx` + `_mobileExamples.mdx`): deprecated `### Compact`
      section removed, `### Size` section added, incidental `compact` usages scrubbed.
- [ ] Docsite metadata + Figma Code Connect updated.
- [ ] `test`, `typecheck`, `lint`, and formatter run for `web` and `mobile`.

## Open questions

1. **Icon size per t‑shirt size** — confirm from the Figma `icon=leading/trailing` variants
   (proposed: `xs`/`s` → `'s'`, `m`/`l` → `'m'`).
2. **Mobile `feedback`** — should it follow `resolvedSize` (recommended) or remain literally
   gated on `compact`?
