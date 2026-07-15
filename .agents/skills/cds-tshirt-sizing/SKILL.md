---
name: cds-tshirt-sizing
description: |
  Produces a single cross-platform implementation plan for adopting a t-shirt `size` prop
  (xs/s/m/l) on a CDS component and deprecating its legacy `compact` boolean, starting from a
  Linear issue. Drives the whole discovery flow: read the Linear issue, inspect the Figma
  component set, extract per-size style differences, verify the default size, locate the web +
  mobile components, analyze the current `compact` behavior, then write the plan.
  Use when asked to "adopt the size prop", "add t-shirt sizing", "t-shirt <component>",
  "deprecate compact in favor of size", or when handed a CDS t-shirt sizing Linear issue.
license: Apache-2.0
metadata:
  version: '1.0.0'
---

# CDS T-Shirt Sizing Skill

Turns a **Linear issue for a component that needs to adopt the `size` property** into a single,
cross-platform (web + mobile) implementation **plan**. This skill produces a plan document — it
does not implement the change unless the user explicitly asks you to proceed afterward.

## Input

A Linear issue ID or URL (e.g. `CDS-2168`) for a CDS component adopting the t-shirt `size` prop.

## Guiding principles (apply throughout — these are non-negotiable defaults)

1. **Default `size` is `l`.** The largest size preserves the component's current default geometry.
2. **`compact` is deprecated but must keep working exactly as today.** No behavior change for
   existing callers that have not adopted `size`.
3. **`size` wins over `compact`.** When both are provided, `compact` is ignored.
4. **Never add fixed sizes/heights.** `size` must never introduce a hard-coded `height`,
   `minHeight`, `width`, or any fixed dimension. Dimensions stay **derived from content + spacing**
   (padding + font/line-height); `size` only tunes those spacing/typography inputs. Any heights in
   the spec table are _computed outcomes_, not values to set.
5. **Do not share size/property maps via `cds-common`.** Web and mobile style-prop value types
   differ, so a shared map cannot be strongly typed against both. Define the size config
   **independently in each package**, typed to that package's style-prop types.
6. **Deprecating `compact` always targets `v10`** (`@deprecationExpectedRemoval v10`) for this
   class of work — no need to reconfirm.
7. **One plan, not two.** Write a single cross-platform plan document covering both packages.

## Workflow

Follow these steps in order.

### Step 1 — Read the Linear issue and extract the Figma link

- Fetch the issue with the Linear MCP `get_issue` tool (load it via `ToolSearch` if deferred).
- The description contains a **Figma link** (often a markdown `[Figma](...)` link). Extract it.
- Note the component name and any acceptance criteria.

### Step 2 — Locate and verify the Figma component set

From the Figma URL, extract the `fileKey` and `nodeId`:

- `.../design/:fileKey/:fileName?node-id=1-2` → fileKey `:fileKey`, nodeId `1:2`.
- **Branch URL** `.../design/:fileKey/branch/:branchKey/:fileName?node-id=...` → use the
  **`branchKey`** as the fileKey.

Then:

- Call `get_metadata` with that fileKey + nodeId (frameworks `react`, languages `typescript`).
- The link may point directly at the component/component set, or at a containing frame/section. If
  it's a container, **find the primary component/component set node whose name matches the
  component** in the issue.
- `get_metadata` output can exceed the token limit and be **saved to a file** — read/grep that file
  instead. Variants appear as `<symbol>` nodes named in Figma variant format
  (`prop=value, prop=value, ...`). Note the file is **JSON with escaped quotes** (`name=\"...\"`),
  so grep patterns must account for `\"`.
- **Verify the `size` property exists** on the variants (usually `s`/`m`/`l`, sometimes also `xs`).
  Count the distinct `size=` values. **If no `size` property exists, STOP and tell the user** — the
  component isn't ready for this work.

### Step 3 — Extract the per-size differences

Compare a **controlled set** of variants: hold every other variant property constant and vary only
`size`.

- Grep the metadata file for the variant node ids of one fixed configuration across all sizes
  (e.g. `variant=primary, state=default, width=full, ..., icon=none` for each `size=`).
- For each size's node id, call `get_design_context` (`excludeScreenshot: true`).
  - If it returns a **Code Connect prompt** instead of code, re-call with
    `disableCodeConnect: true` to get the raw generated styles.
- From each variant capture: `paddingX`, `paddingY` (spacing tokens), `borderRadius`, `font`
  (font-size / line-height), and `iconSize`. Compute the resulting height
  (`paddingY×2 + line-height`) as a _derived_ value.

Reference facts for CDS token mapping:

- The `space` scale is base-8 and supports fractional keys: `0.75`→6px, `1`→8px, `1.5`→12px,
  `2`→16px, `3`→24px, `4`→32px.
- `borderRadius` tokens seen: `700`→40px, `900`→56px.
- Font tokens: `headline`→16/24, `label1`→14/20 (both valid `Text` `font` values).

### Step 4 — Determine the default size

The **default variant of a Figma component set is its first child** (index 0 — the first
`<symbol>` listed under the component set). Record its `size` value. For t-shirt work this is
normally **`l`** (which must equal the component's current default height — see Step 6).

### Step 5 — Locate the component in web and mobile packages

- Find the component `.tsx` in `packages/web/src/**` and `packages/mobile/src/**` (exclude
  `__tests__`/`__stories__`).
- Record the file paths. **It's fine if it exists in only one package.**
- **If it exists in neither package, STOP and let the user know** — there is nothing to modify.

### Step 6 — Analyze current implementation & verify the default height

For each package's component:

- Does it have a **`compact`** prop? Determine exactly what it toggles (typically `paddingX`,
  `paddingY`, `borderRadius`, `iconSize`, and on **mobile** `feedback`). Note whether `font` is
  affected.
- Compute the **current default state's height** (no `compact`) from its `paddingY` + default
  `font` line-height, and check it against Figma **`size=l`**.
  - Confirm there is no fixed/min height (e.g. mobile intrinsic, web `height="fit-content"`).
  - **If they don't match, call this out explicitly in the plan** as a discrepancy.
- Also confirm which size the current `compact` maps to (usually `s`).

### Step 7 — Write the single cross-platform plan

Write **one** markdown plan document (see `examples/Button.size-tshirt.plan.md` for a complete,
worked example to mirror). It must contain every section below:

- **References** — the Linear issue link, the Figma link, and the component set node id.
- **Goal** — add `size` (xs/s/m/l) to both packages; deprecate `compact`; BC is top priority.
- **Rules** — restate the guiding principles (default `l`; `compact` deprecated but unchanged;
  `size` wins; **no fixed sizes/heights**).
- **Current state (verified)** — the current inline geometry table + notes (space scale, fonts,
  any pre-existing deprecated helpers not to extend).
- **Height verification vs `size=l`** — the Step 6 result; explicitly state MATCH or the mismatch.
- **Target size spec table** — `size` × `paddingX` / `paddingY` / `borderRadius` / `font` / text /
  _derived_ height, with a callout that height is a derived outcome, never set.
- **Implementation**:
  - Per-package size config (**not** `cds-common`) with the rationale (differing style-prop types),
    typed locally with `satisfies Record<ButtonSize, {...}>`.
  - Resolution logic identical in both packages:
    `const resolvedSize = size ?? (compact ? 's' : 'l')` then read the config; fold into the
    existing destructure defaults preserving precedence (explicit prop > `padding` shorthand >
    size-derived default). Make `font` size-derived.
  - Mobile `feedback`: tie the default to `resolvedSize` (small sizes → `light`) so the compact and
    default paths stay byte-for-byte unchanged; flag it as the one non-geometric effect.
  - Add the `size` prop to `ButtonBaseProps` (both packages), `@default l`.
- **Deprecate `compact`** — via the `deprecate-cds-api` skill; JSDoc `@deprecated Use \`size="s"\`
  instead`+`@deprecationExpectedRemoval v10`; run `lint` so the deprecation lint rule passes.
- **Backward-compat & stability risks** — including an **informational** (out-of-scope) note
  listing sibling/related components that `Pick` the deprecated prop (they'll be updated
  separately), plus `font`/`feedback`/`flush` interaction notes.
- **Testing**:
  - Unit: default→`l` geometry; each of xs/s/m/l; `compact` alone still exact; `size`+`compact`→
    size wins; explicit style props still override; mobile `feedback` mapping.
  - **One-off standalone stories** — a **new dedicated story file per package** (do **not** edit the
    existing `Button.stories.tsx`). Both platforms render the **same** examples (no code reuse
    required): **default**, deprecated **`compact`**, each **size variant** (xs/s/m/l), and a
    **`compact` + `size` combo** proving `size` wins. Label each example.
- **Docs** — follow existing conventions in the example `.mdx` files:
  - **Remove** the deprecated `### Compact` section (under `## Sizing`) in both `_webExamples.mdx`
    and `_mobileExamples.mdx`.
  - **Add** a `### Size` section demonstrating xs/s/m/l (labeled `jsx live` block; web `onClick`,
    mobile `onPress`), noting `size` defaults to `l` and `size="s"` replaces `compact`.
  - **Scrub** incidental `compact` usages elsewhere (Loading / icon examples) → `size="s"`.
  - Props table is JSDoc-driven; do **not** add `size` / deprecation marketing into
    `webMetadata.json` / `mobileMetadata.json` `description` fields. Those strings are the
    component header blurb — leave them alone unless they **already** mention the deprecated
    `compact` prop. If they do, **remove** the `compact` mention (restore a neutral description);
    do not replace it with copy about `size`.
- **Figma Code Connect** — refresh `__figma__/<Component>.figma.ts` (both packages) using the
  `figma-code-connect` skill/refresh **with the component set node id**, prompting specifically to
  **add the `size` property** to the template.
- **Definition of done** and **Open questions** (e.g. per-size icon sizing to confirm from the
  `icon=` variants; mobile `feedback` mapping).

## Success criteria

- The plan is a **single** cross-platform document with **all** the sections above.
- The `size` default is `l`; `compact` is deprecated at **v10** but preserved exactly; `size` wins
  over `compact`.
- **No fixed heights/sizes** anywhere; dimensions stay content/spacing-derived.
- Size config is **per-package**, not shared via `cds-common`.
- Stories are **one-off standalone files**, not added to existing story files, and cover default /
  `compact` / xs-s-m-l / `compact`+`size`.
- Docs plan removes the deprecated `compact` section and adds a `size` section per existing
  conventions.
- The default-height vs `size=l` check is stated (match or explicit mismatch call-out).
- If the component isn't found in either package, or has no Figma `size` property, you **stopped**
  and told the user instead of guessing.

## Related skills

- `deprecate-cds-api` — apply the `@deprecated` / `@deprecationExpectedRemoval` JSDoc consistently.
- `figma-code-connect` — refresh the Code Connect template with the new `size` variant property.
- `components.write-docs` — write the docsite `size` section and remove the `compact` section.
- `cds-migrator-transform` — optional `compact` → `size="s"` codemod for consumers before removal.
