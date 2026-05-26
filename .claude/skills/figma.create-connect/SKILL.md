---
name: figma.create-connect
description: Creates a new Figma Code Connect mapping file for a CDS component
model: claude-sonnet-4-6
argument-hint: [Component name or path to component file] [Figma URL w/ Node ID]
disable-model-invocation: true
---

## Task: Create Figma Code Connect Mapping

Objective: Create a new Code Connect mapping file for a specified CDS component.

Before starting, load the `figma.connect-best-practices` SKILL — it contains the canonical rules for every property mapping type and common mistakes to avoid. Do not duplicate that guidance here; refer to it throughout.

### Inputs

You must be provided two pieces of information:

1. A name or reference to a CDS React component
2. A Figma URL containing a `node-id` parameter

If you do not have either, MUST NEVER proceed with the task.

### Steps

1. **Retrieve Figma component data**

   Call the Figma MCP **`get_context_for_code_connect`** tool with the fileKey and nodeId extracted from the Figma URL. This is the primary and correct tool for Code Connect authoring. It returns everything you need:
   - Every component property with its exact name, type (`BOOLEAN`, `VARIANT`, `TEXT`), and key
   - All variant option values (the possible values for each `VARIANT` property)
   - The full descendant tree showing which layers reference which properties
   - Which variants each descendant appears in

   Before continuing, summarize what you found:
   - List all `VARIANT` properties and their options — these determine how many `figma.connect()` calls you need
   - List all `BOOLEAN` and `TEXT` properties — these become your `props` mappings
   - Note any properties with the `↳` prefix — these are exposed from child layers. The correct mapping depends on the property **type**:
     - `↳` + **INSTANCE_SWAP** → `figma.instance('↳ propertyName')` (include the `↳` in the string)
     - `↳` + **TEXT** → `figma.textContent('layerName')` (verify it is a `<text>` node via `get_metadata`)
     - `↳` + **VARIANT/BOOLEAN** → `figma.nestedProps('layerName', { ... })`

2. **Optional: `get_design_context` for visual context**

   If you need to see what the component looks like before writing mappings, call `get_design_context` with `disableCodeConnect: true`. This returns a screenshot and reference code. It does not return structured property metadata, so it does not replace Step 1 — use it only as a visual aid when the property names alone aren't enough to understand the design.

3. **Secondary check: verify `textContent` layer types**

   For any descendant text layers you plan to use with `figma.textContent()`, call `get_metadata` on that layer's node ID to confirm it is a `<text>` node and not an `<instance>` or other type. If it is an instance, use a hardcoded placeholder string instead.

4. **Read the React component source**
   - Find and read the component's TypeScript source file and any relevant sub-component source files
   - Understand which React props are available and how they relate to the Figma properties

5. **Plan variant coverage**

   Each unique combination of `VARIANT` property values that produces meaningfully different code should get its own `figma.connect()` call with a `variant: { ... }` filter. Common patterns:
   - A `platform` variant (e.g. `'📱 mobile'` vs `'🖥️ desktop'`) often maps to different defaults or sub-components
   - A `type` variant (e.g. `'stepper'` vs `'progressor'`) often maps to different props being null or present
   - If child layer names differ across variants, you must split those variants into separate `figma.connect()` calls (a single `figma.children('LayerName')` only matches one name)

6. **Generate the Code Connect mapping file**

   Write the `.figma.tsx` file following the conventions below. Reference `figma.connect-best-practices` for the correct mapping method for each property type.

   **Key mapping decisions:**
   - `VARIANT` properties → `figma.enum()`
   - `BOOLEAN` properties → `figma.boolean()`, with conditional values where needed
   - `TEXT` properties that are formal component properties → `figma.string()`
   - Text content in layers (not formal properties) → `figma.textContent()` (only if layer is confirmed `<text>` type)
   - `↳`-prefixed **INSTANCE_SWAP** properties → `figma.instance('↳ propertyName')`
   - `↳`-prefixed **TEXT** properties → `figma.textContent('layerName')` (verify `<text>` node type)
   - `↳`-prefixed **VARIANT/BOOLEAN** properties → `figma.nestedProps('layerName', { ... })`
   - Direct instance-swap slots (no `↳`) → `figma.instance('propertyName')`
   - Child layers by name → `figma.children()`

   **Props must be real component props:** Every key in `props` must correspond to an actual prop of the React component. Never create intermediate props (e.g. `show3rd`, `showTitle`) that exist only to carry Figma state into the `example` body — these are not valid component props and confuse the code hint. If Figma properties need to be combined or assembled before use, do the assembly inside a `figma.boolean()` (or other `figma.*`) value, not as separate top-level props.

   **Example should return JSX directly:** The `example` function should be a direct JSX return in the vast majority of cases — no function body, no intermediate variables. If you find yourself writing `example: (props) => { const x = ...; return <Component />; }`, stop and reconsider the props design.

   **Assembling complex props from Figma booleans:** When a Figma boolean controls a structural difference (e.g. whether labels appear), map it to the full assembled value inside `figma.boolean()`:

   ```tsx
   props: {
     steps: figma.boolean('show title', {
       true: [{ id: 'step-1', label: 'Title' }, { id: 'step-2', label: 'Title' }, { id: 'step-3', label: 'Title' }],
       false: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }],
     }),
   },
   example: ({ steps }) => (
     <Stepper activeStepId="step-2" direction="horizontal" steps={steps} />
   ),
   ```

   Note: `figma.boolean()` returns an opaque descriptor, not a JS boolean. You cannot use it in a conditional expression like `figma.boolean('x') ? a : b` — that will always be truthy. The `true`/`false` branching must be inside the `figma.boolean()` call itself.

   After writing the file, briefly describe the mappings you created and any decisions you made.

7. **Lint check**

   Run `yarn nx run <project>:lint` on the package containing the new file and fix any errors or warnings before reporting completion.

### File Location Convention

Code Connect files (`*.figma.tsx`) are colocated with their component, inside a `__figma__` directory:

```
MyComponent/
  __tests__/
  __figma__/
    MyComponent.figma.tsx
  MyComponent.tsx
  index.ts
```

### Code Connect File Template

**NEVER use relative imports** in Code Connect files. Always use the package import path.

**Web component:**

```tsx
import { figma } from '@figma/code-connect';
import { ComponentName } from '@coinbase/cds-web/path-to-component';

const FIGMA_URL = 'https://www.figma.com/design/...';

figma.connect(ComponentName, FIGMA_URL, {
  variant: { 'Variant Property': 'value' },
  imports: ["import { ComponentName } from '@coinbase/cds-web/path-to-component'"],
  props: {
    // prop mappings
  },
  example: (props) => <ComponentName {...props} />,
});

// Additional figma.connect() calls for other variants...
```

**Mobile component** (add React import):

```tsx
import React from 'react';
import { figma } from '@figma/code-connect';
import { ComponentName } from '@coinbase/cds-mobile/path-to-component';

const FIGMA_URL = 'https://www.figma.com/design/...';

figma.connect(ComponentName, FIGMA_URL, {
  variant: { 'Variant Property': 'value' },
  imports: ["import { ComponentName } from '@coinbase/cds-mobile/path-to-component'"],
  props: {
    // prop mappings
  },
  example: (props) => <ComponentName {...props} />,
});
```
