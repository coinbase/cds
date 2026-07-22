# cds-tshirt-sizing

Turns a **Linear issue for a CDS component that needs to adopt the `size` prop** into a single,
cross-platform (web + mobile) implementation **plan** — covering the new t-shirt `size` prop
(`xs`/`s`/`m`/`l`) and the deprecation of the legacy `compact` boolean.

## What it does

Given a Linear issue ID/URL, the skill walks the full discovery-to-plan flow:

1. **Read the Linear issue** and extract the embedded Figma link.
2. **Inspect the Figma component set** — resolve the fileKey/nodeId (handling branch URLs), find
   the component set node, and verify a `size` property exists.
3. **Extract per-size differences** — compare a controlled set of variants (holding everything but
   `size` constant) to capture padding, border radius, font, and icon size per size.
4. **Determine the default size** (the component set's first child — normally `l`).
5. **Locate the component** in the web and mobile packages (stops if found in neither).
6. **Analyze the current `compact` behavior** and verify the current default height matches
   Figma `size=l` (calls out any mismatch).
7. **Write a single cross-platform plan** following the worked example.

## Core principles it enforces

- Default `size` is **`l`**; `compact` is **deprecated but preserved exactly**; `size` **wins**
  when both are set.
- **Never** introduce fixed sizes/heights — dimensions stay content + spacing derived.
- Size/property maps are defined **per package**, never shared via `cds-common` (differing
  style-prop types can't be strongly typed by a shared map).
- Deprecating `compact` always targets **v10**.
- Verification stories live in each component's **main** story file (no separate `*Size.stories.tsx`).
- Docs **remove** the deprecated `compact` section and **add** a `size` section per existing
  conventions.

## Input

A Linear issue ID or URL (e.g. `CDS-2168`).

## Output

A single cross-platform plan markdown document. See
[`examples/Button.size-tshirt.plan.md`](./examples/Button.size-tshirt.plan.md) for a complete,
worked example (the Button adoption, CDS-2168).

## Related skills

`deprecate-cds-api`, `figma-code-connect`, `components.write-docs`, `cds-migrator-transform`.
