---
name: cds-design-to-code
description: |
  Turns frontend designs from Figma into CDS-first React or React Native code.
  Use this skill whenever the user shares a Figma URL such as
  `figma.com/design/...?...node-id=...` while working in a frontend application context.
license: Apache-2.0
metadata:
  author: ruikun.hao@coinbase.com
  version: '1.0.0'
---

# CDS Design To Code

This skill provides a structured workflow for translating Figma designs into CDS-first production code with high visual fidelity. It bridges the Figma MCP server with the Coinbase Design System, ensuring that designs are implemented using real CDS components and conventions rather than raw Figma HTML output.

The goal is not to copy the Figma output literally. The goal is to use Figma MCP as the design source, then adapt that output into the target project's real CDS component stack.

## When to use

- Use when the user shares a Figma URL like `figma.com/design/...?node-id=...` and wants it implemented.
- Use when translating a Figma design into CDS-first React or React Native code.
- Use when the user asks to "implement this design" or "build this from Figma."
- Do not use when there is no Figma design to reference -- use the `cds-code` skill instead for general CDS UI work.
- Do not use for design feedback or critique without an implementation request.

## Prerequisites

- **`cds-code` skill** -- this skill depends on `cds-code` for component selection, styling rules, doc lookup workflow, and code quality standards. If `cds-code` is not installed, tell the user to install it first.
- **Figma MCP server** must be connected and accessible. Verify by checking whether `get_design_context` is available as an MCP tool.
- **CDS MCP server** must be connected for doc lookups via `list-cds-routes` and `get-cds-doc`.
- User must provide a Figma URL in the format: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

If the Figma MCP server is missing or the `get_design_context` tool is not available:

1. Tell the user that this workflow depends on the Figma MCP server and its `get_design_context` tool.
2. Suggest they configure a Figma MCP server in their project (e.g. via `.cursor/mcp.json` or their agent's MCP settings).
3. Continue only if you still have enough reliable design context from the prompt, screenshot, or pasted reference code.
4. If the design source is too incomplete to implement safely, stop and explain the blocker clearly.

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Parse the Figma URL

When the user provides a Figma URL, extract the file key and node ID.

**URL format:** `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

**Extract:**

- **File key:** `:fileKey` (the segment after `/design/`)
- **Node ID:** `1-2` (the value of the `node-id` query parameter)

**Branch URLs:** `figma.com/design/:fileKey/branch/:branchKey/:fileName` -- use `branchKey` as the file key.

**Example:**

- URL: `https://figma.com/design/kL9xQn2VwM8pYrTb4ZcHjF/DesignSystem?node-id=42-15`
- File key: `kL9xQn2VwM8pYrTb4ZcHjF`
- Node ID: `42-15`

Convert `node-id=123-456` into `nodeId: "123:456"` when the tool requires colon-separated format.

Prefer the exact node the user shared. Do not widen the request to a larger parent frame unless you have a concrete reason.

### Step 2: Fetch Design Context

Call `get_design_context` with the extracted file key and node ID.

```
get_design_context(fileKey=":fileKey", nodeId="1-2")
```

Use these defaults unless the user explicitly asks otherwise:

- `disableCodeConnect: false` -- Code Connect is the highest-value signal from Figma MCP
- Keep screenshots enabled

Pass accurate client context when you know it:

- `clientFrameworks`: `react` for web React apps, `react-native` for React Native apps
- `clientLanguages`: `typescript`, `javascript`, or the known project languages

**If the response is too large or truncated:**

1. Keep the original user node as the source-of-truth entry point.
2. Run `get_metadata(fileKey=":fileKey", nodeId="1-2")` to get the high-level node map and discover child node IDs.
3. Identify the most relevant child frame or section for the requested implementation scope.
4. Re-run `get_design_context` on the narrower child node.
5. Tell the user briefly that you narrowed to a child section because the original node was too large.

Do not treat `get_metadata` as a replacement for `get_design_context`. It is only a way to navigate large trees when the initial node is too broad.

**Staying narrow:** Figma MCP becomes less helpful when the selected node contains many unrelated frames. Stay on the specific node the user provided, prefer a clearly scoped child frame over a giant parent screen if the tool becomes noisy, and keep Code Connect enabled. If the tool still reports many unmapped frames, check whether the returned screenshot and code are still actionable before bouncing the problem back to the user.

### Step 3: Capture Visual Reference

Run `get_screenshot` with the same file key and node ID.

```
get_screenshot(fileKey=":fileKey", nodeId="1-2")
```

This screenshot is the visual source of truth throughout implementation. Keep it accessible for comparison during the visual verification step.

### Step 4: Download Required Assets

Download any assets (images, icons, SVGs) returned by the Figma MCP server.

- If the Figma MCP server returns a `localhost` source for an image or SVG, use that source directly.
- Do not import or add new icon packages -- all assets should come from the Figma payload.
- Do not create placeholders if a `localhost` source is provided.

### Step 5: Ground the Target Platform

Before translating the design into CDS code, ground yourself in the target app.

1. Identify whether the user is targeting `web` or `mobile`.
2. Confirm that choice from repo context when the project is available.
3. Only then decide which CDS platform docs to read.

Do not guess the platform from the Figma design alone when the repo tells you more.

If both web and mobile exist and the target is genuinely ambiguous, ask one concise clarifying question.

**Read the CDS coding standards:** Before writing any CDS code, read the `cds-code` skill for the full set of CDS-first coding standards including layout defaults, styling defaults, component selection guidance, package mapping, and theme usage. That skill is the canonical reference for how to write CDS code -- this skill focuses on the Figma-to-CDS bridge.

### Step 6: Translate to CDS Components

This is the core translation step. The Figma MCP response is a mixed-confidence input -- treat each part accordingly.

**Confidence hierarchy:**

| Source                          | Confidence | How to use                                                                                                                                                                           |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CodeConnectSnippet`            | Highest    | Preserve the component choice. It maps to a real component chosen by the design system team. Keep the composition close to the snippet after fixing imports, props, and data wiring. |
| Screenshot                      | High       | Use for layout hierarchy, spacing rhythm, and visual intent verification.                                                                                                            |
| Default HTML / Tailwind classes | Lower      | Structural hints that must be adapted into CDS components. Never ship raw Figma HTML in a CDS app.                                                                                   |

**CDS doc lookup:** Follow the `cds-code` skill's setup and component selection steps to discover and read CDS docs before choosing imports, props, or composition patterns.

**Translating fallback HTML and Tailwind classes:**

When parts of the Figma response fall back to raw HTML or Tailwind-like classes, use them as evidence, not as the final implementation. Look for clues:

- Layout classes like `flex`, `flex-row`, `flex-col`, `items-start`, `justify-between`
- Spacing classes like `gap-[8px]`, `px-[var(--spacing/...)]`, `pb-[16px]`
- Semantic names in `data-name` attributes like `SectionHeader`, `List`, `Card`, `Row`, `Header`
- Repeated structures that imply a CDS collection or cell pattern

Translate those clues into CDS primitives and components:

- `flex-row` -> `HStack`
- `flex-col` -> `VStack`
- Padding and gap values -> CDS spacing props or tokens, not raw Tailwind classes
- `data-name` hints -> check CDS docs before inventing custom UI

Example: a fallback wrapper like `flex flex-col gap-[8px] px-[8px]` likely wants a `VStack` with `gap` and `paddingX`. A `data-name="SectionHeader"` is a strong signal to check whether CDS already has a `SectionHeader` component.

Do not guess the final component tree from CSS alone when CDS docs can confirm the intended abstraction.

**Props before `style`:**

When translating Figma values to CDS code, always check the target component's prop table before reaching for `style`. Figma MCP output often includes raw CSS values for font size, weight, color, alignment, and transforms. Do not copy those values into a `style` prop when the CDS component already has a dedicated prop.

For example, Figma may output a label with `font-size: 10px`, `font-weight: 500`, `text-transform: uppercase`, `color: var(--palette/foregroundmuted)`. The correct translation is to find the matching CDS `font` token (e.g. `font="caption"`), then use `color="fgMuted"` and `textTransform="uppercase"` as props -- not to dump everything into `style`. Using `style` for these values bypasses the CDS font family and theme wiring, causing the text to render in the wrong typeface.

Only use `style` for values that have no CDS prop equivalent (e.g. `cursor`, `transform`, `letterSpacing`, exact pixel dimensions). See the "Avoid unnecessary `style` overrides" section in the `cds-code` skill for the full rule and examples.

### Step 7: Achieve Visual Parity

Strive for high visual fidelity with the Figma design. Do not stop after the first implementation pass when you have tooling to inspect the result.

After writing or updating the code:

1. Render the target UI locally when possible.
2. Use the Figma screenshot from Step 3 as the visual source of truth.
3. Inspect the rendered implementation visually in the browser tooling.
4. Compare at a matching viewport as closely as possible.
5. Fix the most obvious visual mismatches before finishing.

Pay special attention to:

- Section widths and content stretch behavior
- Spacing between nav, tabs, chips, cards, and footer
- Corner radius, border, and shadow treatment
- Typography hierarchy, truncation, and wrapping
- Scroll containers, clipping, and overflow behavior
- Active and inactive states for tabs, chips, and nav items
- Colors matching design tokens exactly
- Responsive behavior following Figma constraints

Prefer a short corrective loop: implement, visually compare, correct the largest differences, re-check once more.

Do not claim visual fidelity based only on reading code or DOM structure. If browser inspection is available, use it.

### Step 8: Validate Against Figma

Before marking complete, validate the implementation against the Figma screenshot.

**Validation checklist:**

- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font, size, weight, line height)
- [ ] Colors match design tokens
- [ ] CDS components used wherever one exists
- [ ] Code Connect mappings preserved from Figma MCP response
- [ ] No raw Tailwind classes left in the final output (unless the target project uses them)
- [ ] Interactive states work as designed (hover, active, disabled)
- [ ] Responsive behavior follows Figma constraints
- [ ] Assets render correctly
- [ ] Imports and props match CDS docs
- [ ] No `style` overrides for values that have a CDS prop (font, color, textAlign, padding, gap, etc.)
- [ ] Accessibility standards met

## Implementation Rules

Follow the `cds-code` skill for all component selection, styling, and code quality rules. When a Code Connect snippet already uses CDS components cleanly, preserve that mapping rather than re-deriving it.

## Common Issues and Solutions

### Issue: Figma output is truncated

The design is too complex for a single response. Use `get_metadata` to get the node structure, then fetch specific child nodes individually with `get_design_context`.

### Issue: Design doesn't match after implementation

Compare side-by-side with the screenshot from Step 3. Check spacing, colors, and typography values in the design context data. Run the corrective loop from Step 7.

### Issue: Assets not loading

Verify the Figma MCP server's assets endpoint is accessible. The server serves assets at `localhost` URLs -- use them directly without modification.

### Issue: Code Connect returns unexpected components

The Code Connect snippet maps to a real component chosen by the design system team. Preserve it unless the target repo clearly documents a different import path. If the snippet already uses CDS components, it is often nearly copy-pasteable after fixing imports, props, and data wiring.

### Issue: Mostly fallback HTML with few Code Connect mappings

This is normal for designs with many unmapped elements. Use the fallback HTML as structural evidence, translate layout classes to CDS primitives, and use `data-name` hints to look up CDS components before inventing custom markup.

### Issue: Design token values differ between Figma and CDS

When CDS tokens differ from Figma values, prefer CDS tokens for consistency. Adjust spacing or sizing minimally to maintain visual fidelity.

## Communication Style

Be concise and implementation-oriented.

- Mention when the design source was high confidence versus inferred.
- Call out when you preserved a Code Connect mapping directly.
- If you had to infer a CDS replacement from fallback HTML, explain the reasoning briefly.
- Ask clarifying questions only when the ambiguity would materially change the shipped UI.

Avoid turning the workflow into a long design critique unless the user asked for one.
