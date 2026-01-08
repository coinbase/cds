## Task: Create Figma Code Connect Mapping

Objective: Create a new Code Connect mapping file for a specificed CDS component.

ALWAYS refresh your memory of the React Code Connect documentation here: https://developers.figma.com/docs/code-connect/react/ before starting this task.

### Inputs

You must be provided two pieces of information:

    1. a name or reference to a CDS React component
    2. a Figma URL

If you do not have either, MUST NEVER proceed with the task.

### Steps

1. **Retrieve Figma component data**
   - Use the Figma MCP `get_design_context` tool with the Figma URL you were provided
   - Study all Figma properties and variants
   - Before continuing:
     - Summarize & list the Component/Variants you found
     - Summarize & list the Properties you found for the Component/Variants

2. **Read the React component source**
   - Find and read the component's TypeScript source file, including any of its sub-components' source files
   - Study the React props for the component(s)

3. **Generate Code Connect Mapping File**
   - Create the mapping file for the component
   - Provide a brief description of the mappings you created when you are done.

## Code Connect Best Practices

In this repo, it is convention for Code Connect files (`*.figma.tsx`) to be colocated with their corresponding components, within a `__figma__` directory.

Example:

```
MyComponent/
  __tests__/
  __figma__/
    MyComponent.figma.tsx
  MyComponent.tsx
  index.ts
```

### Typical Code Connect Template

**Note**: NEVER use relative imports for components used in code connect examples. ALWAYS use the package import paths.

Template Code Connect file:

```tsx
import { figma } from '@figma/code-connect';
// Add React import for mobile components only
// import React from 'react';

import { ComponentName } from '@coinbase/package-name/path/to/ComponentName';

figma.connect(
  ComponentName,
  // FIGMA URL HERE,
  {
    imports: ["import { ComponentName } from '@coinbase/cds-package-name/path/to/ComponentName';"],
    props: {
      // MAP FIGMA PROPERTIES TO COMPONENT PROPS USING FIGMA CODE CONNECT API HERE
    },
    example: (props) => <ComponentName {...props} />,
  },
);
```

### Property Mapping Guidelines

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

- figma.string() - For text content

```tsx
label: figma.string('label'),
```

- figma.instance() - For instance-swap properties (component slots)

Use
figma.instance() returns the JSX from another figma.connect() call that you can use in the example.
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

### Understanding Nested Properties (Important)

In Figma's properties panel, you may see properties with the `↳` symbol (e.g., `↳ subtitle`). This indicates the property is **exposed from a child layer**, not defined directly on the parent component.

**Why this matters:** The Code Connect validation run during `figma connect publish` has limited coverage. It only validates these prop kinds:

- `figma.boolean()`, `figma.enum()`, `figma.string()` - validates the property name exists
- `figma.children()` - validates the layer name exists

These prop kinds are **NOT validated** at all:

- `figma.nestedProps()` - layer name and inner property mappings are not checked
- `figma.instance()` - layer/instance name is not checked
- `figma.textContent()` - layer name is not checked

Additionally, validation does **not recurse** into boolean `true`/`false` branch values.

This can result in technically incorrect mappings being published to Figma withoug being caught during validation.

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

**Tip:** When in doubt about whether a property is direct or nested, check if it has the `↳` symbol in Figma's properties panel. If it does, you likely need `figma.nestedProps()` or `figma.textContent()`.

### Multi-Variant Support

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
