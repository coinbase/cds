# CDS Component Priority Rules

## Component Usage Hierarchy

- CDS is the primary design system for React and React Native in this project.
- The JS package is `@coinbase/cds-web` for web React apps and `@coinbase/cds-mobile` for mobile React Native apps.
- ALWAYS prioritize CDS components over ANY other UI components when a CDS equivalent exists. For React Native this includes React Native built-ins. For web this includes any HTML native elements.
- NEVER suggest using alternative UI libraries or components without first confirming a CDS component doesn't exist for the use case.
- ALWAYS use CDS components even if other local components or screens in the codebase are not currently using them - the goal is to standardize on CDS.

## Component Research Order

1. FIRST check if there's a CDS component that satisfies the requirement - this is MANDATORY.
2. ONLY if no suitable CDS component exists, then consider native React Native components.
3. ONLY if neither CDS nor native components work, suggest custom implementations.

## Documentation Location

- ALWAYS use the cds mcp server's list-cds-routes mcp tool to list all CDS routes before trying to use a component.
- ALWAYS inspect the documentation for a component with the get-cds-route mcp tool before using it to understand how to import and how to use it.
- ALWAYS check examples in the documentation before implementing.
- THOROUGHLY read all relevant documentation before making component suggestions.
- CAREFULLY review the component APIs, props, and usage examples in the documentation.

## Implementation Guidelines

- MAINTAIN consistent styling and behavior with existing CDS implementations in the codebase.
- FOLLOW CDS-specific theming and styling patterns.
- RESPECT CDS component hierarchy and composition patterns.
- DO NOT mix CDS and non-CDS component styling approaches unless absolutely necessary.

## When Suggesting Code

- ALWAYS import from @coinbase/cds-mobile for mobile or @coinbase/cds-web for web explicitly.
- INCLUDE complete imports in your code examples.
- DEMONSTRATE proper usage of CDS theming and styling.
- SHOW prop usage according to CDS documentation.

## Lint Errors

- If there's a lint error, do not discard other components that don't have lint errors.
