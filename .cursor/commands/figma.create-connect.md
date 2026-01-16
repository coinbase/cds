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
   - ALWAYS call the Figma MCP: `get_metadata` tool with the Figma URL you were provided
   - Also cal Figma MCP: `get_design_context` with the code connect disabled option enabled to get even more metadata
   - Study all Figma properties and variants
   - Before continuing:
     - Summarize & list the Component/Variants you found
     - Summarize & list the Properties you found for the Component/Variants

2. **Read the React component source**
   - Find and read the component's TypeScript source file, including any of its sub-components' source files
   - Study the React props for the component(s)

3. **Generate Code Connect Mapping File**
   - ALWAYS reference the guidelines for writing code connect mappings here: .cursor/rules/code-connect.mdc
   - Create the mapping file for the component
   - Provide a brief description of the mappings you created when you are done.
   - ALWAYS check to make sure there are no EsLint errors or warnings in your new mapping file.

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

## Typical Code Connect Template

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
    imports: ["import { ComponentName } from '@coinbase/cds-package-name/path/to/ComponentName'"],
    props: {
      // MAP FIGMA PROPERTIES TO COMPONENT PROPS USING FIGMA CODE CONNECT API HERE
    },
    example: (props) => <ComponentName {...props} />,
  },
);
```
