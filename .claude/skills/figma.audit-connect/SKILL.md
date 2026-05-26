---
name: figma.audit-connect
description: Examines a Figma Code Connect mapping file and provides a report on the mapping's accuracy and completeness
model: claude-sonnet-4-6
argument-hint: [Component name or path to component's code connect mapping file]
disable-model-invocation: true
---

## Task: Audit Figma Code Connect Mapping

Audit the specified Figma Code Connect mapping file.

Before starting, load the `figma.connect-best-practices` SKILL — it contains the canonical rules for every property mapping type (`figma.boolean`, `figma.enum`, `figma.string`, `figma.textContent`, `figma.instance`, `figma.children`, `figma.nestedProps`) and common pitfalls. Do not duplicate that guidance here; refer to it.

### Inputs

You will be provided with a name or path to a Figma Code Connect mapping file.
Code Connect files (`.figma.tsx`) are colocated with their corresponding components in this repo, typically within the component's local `__figma__` directory.

Search for the mapping file and end your task if you cannot find it.

Within the current mapping file:

- Study all the property mappings defined in `props: { ... }` of each `figma.connect()` call
- Note which Figma variants are covered (indicated by `variant: { ... }`)
- Note the Figma URL(s) used — you will need these to call the MCP tools

### Steps

1. **Retrieve Figma component data**

   Call the Figma MCP **`get_context_for_code_connect`** tool with the fileKey and nodeId from the Figma URL in the mapping file. This is the primary tool for Code Connect authoring. It returns:
   - Every component property with its exact name, type (`BOOLEAN`, `VARIANT`, `TEXT`), and key
   - All variant option values for `VARIANT` properties
   - The full descendant tree showing which layers reference which properties, and which variants each descendant appears in

   This output is the ground truth for your audit. Use it to understand:
   - What the exact Figma property names are (they often contain spaces and ordinal words like "show 3rd step")
   - Which properties are direct vs. exposed from child layers (the `↳` prefix indicates nested/exposed properties)
   - Which component set variants exist and what their option values are
   - Which descendant layers are text nodes vs. instance nodes

2. **Optional: `get_design_context` for visual context**

   If you need to visually inspect what the component looks like (e.g. to understand a variant you're unsure about), call `get_design_context` with `disableCodeConnect: true`. This returns a screenshot and reference code. It is not a substitute for `get_context_for_code_connect` — it does not return structured property metadata — but it can help when the property names alone aren't enough to understand the design intent.

3. **Secondary checks with `get_metadata`**

   Use `get_metadata` **only** as a targeted follow-up for specific layer-type verification — not as a general overview tool. The specific case where it's needed:

   **For every `figma.textContent('LayerName')` in the mapping file:** call `get_metadata` on that layer's node ID (found in the `descendants` of the `get_context_for_code_connect` output). Confirm the response shows `<text ...>`. If it shows `<instance>`, `<frame>`, `<symbol>`, or any other non-text type, `figma.textContent()` will fail silently at runtime — flag this as an error and suggest a hardcoded placeholder string instead.

4. **Read the React component source**
   - Find and read the component's TypeScript source file and any relevant sub-component source files
   - Study the available React props

5. **Analyze Property Coverage**

   Using the `get_context_for_code_connect` output as your source of truth, create a mapping analysis table where each row is a Figma property:

   | Figma Property | Type | Related React Prop(s) | Mapped? | Mapping Method | Notes |
   | -------------- | ---- | --------------------- | ------- | -------------- | ----- |

   For each Figma property, indicate:
   - ✅ Fully mapped
   - ⚠️ Partially mapped (explain gap)
   - ❌ Not mapped (explain why it should or shouldn't be)

   Also check variant coverage: does the mapping file have a `figma.connect()` call for every combination of `VARIANT` properties? Missing variant connects will cause Figma to show the wrong snippet for some design states.

6. **Check for common mistakes** (reference `figma.connect-best-practices` for full detail)
   - `figma.string('propName')` used on a TEXT property that doesn't appear in the component's formal variant names — this passes TypeScript but fails publish with "property does not exist"
   - `figma.textContent('LayerName')` used on a layer that is an `<instance>` not a `<text>` node
   - `figma.children('LayerName')` where the layer name differs across variants — needs split `figma.connect()` calls with `variant: { ... }` filters
   - Properties with the `↳` prefix mapped directly with `figma.string()` instead of `figma.nestedProps()`
   - Boolean props using `figma.boolean('disabled')` when `disabled` is actually a _value_ of a `state` enum, not its own property
   - **Intermediate props that aren't real component props** — e.g. `show3rd: figma.boolean('show 3rd step')` where `show3rd` is not a React prop. These should be assembled into a real prop value using `figma.boolean()` branching instead
   - **`example` function with a body** — an `example` that builds intermediate variables before returning JSX is a sign that the props design needs refactoring. The `example` should almost always be a direct JSX return. Note: `figma.boolean()` returns an opaque descriptor, not a JS boolean — `figma.boolean('x') ? a : b` always evaluates as truthy and cannot be used for conditional logic outside `figma.boolean()`'s own `true`/`false` branches

7. **Generate Report**

   Provide a summary with:
   - **Coverage**: X/Y Figma properties mapped
   - **Missing Mappings**: Unmapped properties that should be mapped, with suggested mapping method
   - **Missing Variants**: Component variant combinations not covered by the current `figma.connect()` calls
   - **Incorrect Mappings**: Mappings whose type or method doesn't match the actual Figma property type
   - **Unnecessary Mappings**: Mappings that don't correspond to any Figma property
   - **Recommended Changes**: Prioritized list of improvements with concrete code snippets
