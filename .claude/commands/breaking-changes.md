---
allowed-tools: Bash(git log:*), Bash(git show:*), Bash(git diff:*), Bash(git rev-parse:*), Read, Glob, Grep
description: Custom command
argument-hint: [Number of commits to review]
model: opus
---

## Your task

Analyze the previous $ARGUMENTS commits for breaking changes across the CDS public API surface.

## Scope

Only analyze changes within these packages:

- `packages/web/`
- `packages/mobile/`
- `packages/common/`
- `packages/web-visualization/`
- `packages/mobile-visualization/`

## Determining the public API surface

Each package is fully ESM. Inspect each package's `package.json` `"exports"` map to determine the public entry points. Every symbol (component, function, hook, constant, type, interface, enum) that is reachable through these export paths is part of the public API and subject to breaking change analysis.

Follow the export chain: `package.json exports` -> entry `index.ts` barrel file -> re-exported modules. Any symbol that a consumer could import via the package's published entry points is in scope.

## How to analyze

1. Use `git log --oneline -$ARGUMENTS -- <package-path>` for each package to identify relevant commits.
2. Use `git diff HEAD~$ARGUMENTS..HEAD -- <package-path>` and `git show <sha>` to inspect the actual changes.
3. For each changed file, determine if it is reachable from a public export path. If not, skip it.
4. For files that are part of the public API, classify each change using the categories below.

## Breaking change categories

### 1. Removal

A previously exported symbol (component, function, hook, type, interface, constant, enum) has been deleted or is no longer exported.

Examples:

- A component is removed from the barrel export
- A named export is deleted
- A type or interface is no longer re-exported

### 2. API change (props / function signature)

The call signature of a public function, hook, or component has changed in a way that would break existing consumers.

Examples:

- A required prop is added to a component
- A prop is renamed
- A prop's accepted values are narrowed (e.g., union type member removed)
- A function parameter is removed, reordered, or made required
- A hook's return type changes shape
- Default values are removed or changed in a way that alters behavior

### 3. Type definition change

A publicly exported type, interface, or enum has been modified in a way that would cause consumer TypeScript compilation to fail.

Examples:

- A property is removed from an exported interface
- A type union is narrowed
- An enum member is removed or renamed
- Generic type parameters are added, removed, or reordered
- A type is changed from a type alias to an interface (or vice versa) in a way that breaks assignability

### 4. Visual / layout change

A change to styles, spacing, sizing, or visual output that would shift the consumer's application layout or appearance without any API-level change.

Examples:

- Default margin, padding, or gap values changed
- Component dimensions (width, height, min/max) changed
- CSS display, position, or flex properties changed
- Default visual variants or theme token mappings changed
- Border, border-radius, or shadow values changed
- Font size, line height, or font weight defaults changed

### 5. DOM / element structure change (web packages only)

Applies to `packages/web/` and `packages/web-visualization/` only. Changes to the rendered HTML element tree that could break consumer CSS selectors or DOM queries targeting internal component structure.

Examples:

- Wrapper elements added or removed
- Element tag names changed (e.g., `div` -> `section`)
- Nesting order of child elements changed
- CSS class names or data attributes on internal elements removed or renamed
- `role` or `aria-*` attributes removed or changed

### 6. Behavioral change

A change in runtime behavior that could break consumer expectations even though the API signature remains the same.

Examples:

- Event handler calling conventions changed (e.g., different event object shape)
- State management or controlled/uncontrolled behavior changed
- Animation or transition behavior changed
- Focus management behavior changed
- Accessibility behavior changed (e.g., keyboard navigation patterns)

## Output format

Organize findings by package. Within each package, group by category. For each breaking change, include:

- **Entity**: The name of the affected component, type, function, hook, etc.
- **Category**: One of the categories above
- **Description**: A concise explanation of what changed and why it is breaking
- **File**: The file path where the change occurred
- **Commit**: The commit SHA that introduced the change

Use this structure:

---

### `packages/<package-name>/`

#### Removals

| Entity | Description | File | Commit |
| ------ | ----------- | ---- | ------ |
| ...    | ...         | ...  | ...    |

#### API Changes

| Entity | Description | File | Commit |
| ------ | ----------- | ---- | ------ |
| ...    | ...         | ...  | ...    |

_(Continue for each category that has findings. Omit empty categories.)_

---

_(Repeat for each package that has breaking changes. Omit packages with no breaking changes.)_

## Summary

After the per-package breakdown, provide a brief summary section:

1. **Total breaking changes** by category across all packages
2. **Highest-risk changes**: call out the changes most likely to cause widespread consumer breakage
3. **Migration notes**: brief guidance on what consumers would need to do to adapt to each breaking change

## Important guidelines

- Be thorough but precise. Do not flag internal refactors that do not affect the public API.
- When in doubt about whether something is publicly exported, trace the export chain from `package.json` exports -> barrel files -> source modules.
- For visual/layout changes, note the before and after values when possible.
- For DOM structure changes, describe the structural difference clearly enough that a consumer could update their CSS selectors.
- Do not speculate. Only report changes you can verify from the diff.
