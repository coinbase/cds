---
name: figma.connect-best-practices
description: Guidelines for writing Figma Code Connect property mappings. Use this skill when working on Figma Code Connect files, which typically end in .figma.tsx.
---

# Guidelines for writing Figma Code Connect mappings

## Property Mapping Guidelines

- figma.enum() - For dropdowns/variants

```tsx
variant: figma.enum('variant', {
  'Figma Display Name': 'codeValue',
  'Primary': 'primary',
  'Secondary': 'secondary',
}),
```

- figma.boolean() - For boolean properties

```tsx
disabled: figma.boolean('disabled'),
loading: figma.boolean('loading'),
```

- figma.boolean() for conditional properties\

In some cases, you only want to render a certain prop if it matches some value in Figma.
You can do this either by passing a partial mapping object, or setting the value to undefined.

```tsx
// Don't render the prop if 'Has label' in figma is `false`
figma.boolean('has label', {
  true: figma.string('label'),
  false: undefined,
});
```

- figma.string() - For text properties (component properties with text values)

```tsx
label: figma.string('label'),
```

**CRITICAL: Before using `figma.string('propName')`, confirm the property name is a real Figma component property.** The `get_design_context` tool generates a props interface that includes both formal component properties AND text layer values — you cannot tell them apart by looking at the generated code alone. A string property is only valid if its name appears in the variant names returned by `get_metadata` (e.g. `name="..., label=foo, ..."`) or is otherwise explicitly listed as a component property. If it doesn't appear there, it is a text layer value and `figma.string()` will fail validation with "The property does not exist on the Figma component". Use `figma.textContent()` or a hardcoded placeholder instead.

- figma.textContent() - For text layer content (when text is stored in a layer, not a property)

A common pattern in Figma design systems is to override text content directly on instances rather than using component properties. Use `figma.textContent()` to extract the actual text from a named text layer.

```tsx
// Extract text from a layer named 'Title'
title: figma.textContent('Title'),
```

**Key difference**: Use `figma.string()` when text is controlled by a Figma component property. Use `figma.textContent()` when text lives as content in a text layer that designers override directly.

**CRITICAL: `figma.textContent()` only works on actual TEXT layers — never on component instances.**

Before using `figma.textContent('LayerName')`, always call `get_metadata` on that layer's node ID to verify its type. In the metadata response, the node must appear as a `<text>` element. If it appears as `<instance>`, `<symbol>`, `<frame>`, or any other non-text type, `figma.textContent()` will fail at runtime in Figma with a "Layer not found" error even though the layer name is correct.

When the target layer is a component instance (e.g. a reusable text component), use a hardcoded placeholder string instead:

```tsx
// ❌ Wrong: 'string.label' is a component instance, not a text layer
label: figma.boolean('show label', {
  true: figma.textContent('string.label'),
  false: undefined,
}),

// ✅ Correct: use a placeholder string when the layer is an instance
label: figma.boolean('show label', {
  true: 'Your label here.',
  false: undefined,
}),
```

- figma.instance() - For instance-swap properties (component slots)

`figma.instance()` returns the JSX from another figma.connect() call that you can use in the example.
This is useful for components that accept a node of another React component as a prop.

In the example below, Button accepts an instance of Icon as the icon prop.
We would need to have another call to figma.connect() for the `Icon` component somewhere in our code connect setup.

```tsx
figma.connect(Button, 'https://...', {
  props: {
    icon: figma.instance('Icon'),
  },
  example: ({ icon }) => {
    return <Button icon={icon}>Instance prop Example</Button>;
  },
});
```

**Exposed instance-swap properties (the `↳` prefix):** When `get_context_for_code_connect` returns an INSTANCE_SWAP property whose name begins with `↳` (e.g. `↳ start`, `↳ startCompact`, `↳ media`), pass the **full name including the `↳` character** to `figma.instance()`:

```tsx
// ↳ start is an exposed (nested) instance-swap property
startNode: figma.boolean('show start', {
  true: figma.instance('↳ start'),   // ✅ include the ↳
  false: undefined,
}),

// ❌ Wrong: stripping the ↳ means the property name doesn't match
startNode: figma.boolean('show start', {
  true: figma.instance('start'),
  false: undefined,
}),
```

Do **not** use `figma.nestedProps()` for INSTANCE_SWAP properties — `figma.nestedProps()` is only for nested TEXT or VARIANT properties. The `↳` prefix on an INSTANCE_SWAP simply means it is exposed from a child layer; `figma.instance('↳ name')` is the correct and complete mapping.

**When the same slot uses different instance-swap properties across variants** (e.g. `↳ start` in the non-compact variant and `↳ startCompact` in the compact variant), split into separate `figma.connect()` calls with `variant: { ... }` filters:

```tsx
// Non-compact: uses the ↳ start slot
figma.connect(SelectChip, URL, {
  variant: { compact: 'false' },
  props: {
    startNode: figma.boolean('show start', {
      true: figma.instance('↳ start'),
      false: undefined,
    }),
  },
  example: (props) => <SelectChip {...props} />,
});

// Compact: uses the ↳ startCompact slot
figma.connect(SelectChip, URL, {
  variant: { compact: 'true' },
  props: {
    startNode: figma.boolean('show start', {
      true: figma.instance('↳ startCompact'),
      false: undefined,
    }),
  },
  example: (props) => <SelectChip {...props} />,
});
```

- figma.children() - For child instances by layer name

Use this property mapping when your React component accepts children. `figma.children` maps a Figma layer name to the `children` prop.

```tsx
// Maps child instances that aren't bound to an instance-swap prop
icon: figma.children('IconLayer'),
```

- figma.nestedProps() - For accessing properties from child component layers

```tsx
// Access properties from a nested instance layer named 'Avatar'
avatar: figma.nestedProps('Avatar', {
  size: figma.enum('size', { ... }),
  src: figma.string('src'),
}),
// In example: use avatar.size, avatar.src
```

## Understanding Nested Properties (Important)

In Figma's properties panel, you may see properties with the `↳` symbol (e.g., `↳ subtitle`). This indicates the property is **exposed from a child layer**, not defined directly on the parent component.

**Why this matters:** The Code Connect validation run during `figma connect publish` has limited coverage. It only validates these prop kinds:

- `figma.boolean()`, `figma.enum()`, `figma.string()` - validates the property name exists
- `figma.children()` - validates the layer name exists

These prop kinds are **NOT validated** at all:

- `figma.nestedProps()` - layer name and inner property mappings are not checked
- `figma.textContent()` - layer name is not checked

`figma.instance()` behavior depends on context: when used at the top level of `props`, it may be validated against formal Figma instance-swap component properties. When nested inside a `figma.boolean()` branch, validation behavior is inconsistent across CLI versions — treat it as potentially validated. If you receive a "property not found" error for an instance name, replace it with a hardcoded JSX placeholder.

Additionally, validation does **not recurse** into boolean `true`/`false` branch values.

This can result in technically incorrect mappings being published to Figma without being caught during validation.

**Incorrect approach** (will pass validation but fail at runtime):

```tsx
// ❌ Wrong: 'subtitle' should be a nested property, not a direct component property
subtitle: figma.boolean('show subtitle', {
  true: figma.string('subtitle'),
  false: undefined,
}),
```

**Correct approach using figma.nestedProps():**

```tsx
// ✅ Correct: Use nestedProps to access properties from the child layer
subtitle: figma.boolean('show subtitle', {
  true: figma.nestedProps('subtitle', {
    text: figma.string('subtitle'),
  }),
  false: { text: undefined },
}),
// In example: use subtitle.text
```

**Tip:** When in doubt about whether a property is direct or nested, check if it has the `↳` symbol in Figma's properties panel or in the `get_context_for_code_connect` output. If it does, pick the mapping based on the property **type**:

- `↳` + **TEXT** → `figma.textContent('layerName')` (verify the layer is a `<text>` node first)
- `↳` + **VARIANT/BOOLEAN** → `figma.nestedProps('layerName', { ... })`
- `↳` + **INSTANCE_SWAP** → `figma.instance('↳ propertyName')` (include the `↳` in the string)

## Multi-Variant Support

For components with multiple variants in Figma, create separate figma.connect() calls:

```tsx
// Default variant
figma.connect(ComponentName, 'figma-url', {
  /* props */
});

// Specific variant
figma.connect(ComponentName, 'figma-url', {
  variant: { 'show suffix': true },
  props: {
    /* variant-specific props */
  },
  example: (props) => <ComponentName {...props} />,
});
```

**Use variant-specific connects when child layer names differ across variants.**

`figma.children('LayerName')` only matches layers with that exact name. If different variants use different layer names for the same logical prop (e.g. `Button` for the single-action variant and `ButtonGroup` for the multi-action variant), a single `figma.children()` call will silently produce nothing for the non-matching variants. Split into separate connects with `variant: { ... }` filters:

```tsx
// ❌ Wrong: 'ButtonGroup' doesn't exist in the single-action variant
figma.connect(Footer, url, {
  props: { action: figma.children('ButtonGroup') },
  example: ({ action }) => <Footer action={action} />,
});

// ✅ Correct: separate connects for each variant
figma.connect(Footer, url, {
  variant: { '# of actions': '1' },
  props: { action: figma.children('Button') },
  example: ({ action }) => <Footer action={action} />,
});

figma.connect(Footer, url, {
  variant: { '# of actions': '2' },
  props: { action: figma.children('ButtonGroup') },
  example: ({ action }) => <Footer action={action} />,
});
```

## Common Mapping Mistakes

### 1. Using `figma.string()` for text layer content instead of a component property

**Problem**: Using `figma.string('propName')` when `propName` is text layer content, not a formal Figma component property. This passes TypeScript checks but fails at publish time with "The property does not exist on the Figma component".

**How this happens**: `get_design_context` generates a props interface that includes BOTH formal component properties AND text layer values (e.g. `value?: string` for a text layer showing "USD"). There is no visual difference in the generated code — you must verify externally.

**How to detect**: Check whether the property name appears in the variant names from `get_metadata`. Formal component properties appear in variant names like `name="..., label=foo, ..."`. If the name is absent from all variant names, it is a text layer value, not a component property.

```tsx
// ❌ Wrong: 'value' is text layer content, not a component property
//           → fails publish: "The property 'value' does not exist on the Figma component"
label: figma.string('value');

// ✅ Correct: use figma.textContent() if the layer is a <text> node
label: figma.textContent('value');

// ✅ Also correct: hardcode a placeholder when the property isn't mappable
label: 'Select an option';
```

### 2. Property Values vs Properties

**Problem**: Treating an enum property value as a separate property.

```tsx
// ❌ Wrong: 'disabled' might be a value of 'state', not its own property
disabled: figma.boolean('disabled');

// ✅ Correct: Map from the state enum
disabled: figma.enum('state', {
  disabled: true,
  default: false,
  focused: false,
  hovered: false,
  pressed: false,
});
```

### 3. Using `figma.textContent()` on a Component Instance

**Problem**: `figma.textContent()` is called with a layer name that belongs to a component instance, not a raw text layer. The mapping appears valid but fails at runtime in Figma with "Layer not found".

**How to detect**: Call `get_metadata` on the layer node ID. If the response shows `<instance ...>` instead of `<text ...>`, `figma.textContent()` will not work.

```tsx
// ❌ Wrong: 'string.label' is a component instance — textContent silently fails
label: figma.boolean('show label', {
  true: figma.textContent('string.label'),
  false: undefined,
}),

// ✅ Correct: use a hardcoded placeholder string
label: figma.boolean('show label', {
  true: 'Your label here.',
  false: undefined,
}),
```

### 4. Property Name Formatting

**Problem**: Property names in Figma often have spaces or special characters and must match exactly.

```tsx
// ❌ Wrong: camelCase doesn't match Figma property name
showStart: figma.boolean('showStart');

// ✅ Correct: Use exact Figma property name with spaces
startNode: figma.boolean('show start', {
  true: figma.instance('↳ start'), // include ↳ if that's how the property appears in Figma
  false: undefined,
});
```

### 5. Intermediate props that aren't real component props

**Problem**: Adding entries to `props` that don't correspond to real React component props, then assembling the actual value in the `example` body. This makes the `example` harder to read and the intermediate keys are misleading.

```tsx
// ❌ Wrong: show3rd, showTitle are not Stepper props — they're intermediate values
props: {
  showTitle: figma.boolean('show title'),
  show3rd: figma.boolean('show 3rd step'),
},
example: ({ showTitle, show3rd }) => {
  const label = showTitle ? 'Title' : undefined;
  const steps = [{ id: 'step-1', label }, ...(show3rd ? [{ id: 'step-3', label }] : [])];
  return <Stepper steps={steps} />;
},
```

**Correct approach**: assemble the full prop value inside `figma.boolean()` branching so `example` receives a real component prop:

```tsx
// ✅ Correct: steps is a real Stepper prop; example is a direct JSX return
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

**Note**: `figma.boolean()` returns an opaque descriptor, not a JS boolean. You cannot write `figma.boolean('x') ? a : b` — the descriptor is always truthy. All branching must live inside the `figma.boolean()` call's `true`/`false` values.

**Goal**: The `example` function should be a direct JSX return in the vast majority of cases. If you find yourself writing a function body with intermediate variables, the `props` design needs rethinking.
