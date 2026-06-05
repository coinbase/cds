# Presets & Transforms Guide

Guide to creating presets, transforms, and using the migrator APIs.

## Creating Transforms

### Quick Start

### 1. Create Transform File

Create a file in `src/transforms/`:

```typescript
// src/transforms/my-transform.ts
import type { API, FileInfo } from 'jscodeshift';
import { addTodoComment, hasMigrationTodo, transformLogger } from '../utils/transform-utils';

// eslint-disable-next-line no-restricted-exports -- jscodeshift requires default export
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let hasChanges = false;

  // Your transformation logic here

  return hasChanges ? root.toSource() : null;
}
```

### 2. Test It

```bash
# Build
yarn nx run migrator:build

# Run directly (no preset needed!)
npx @coinbase/cds-migrator ./test -t my-transform --dry-run
```

### 3. (Optional) Add to Preset

If you want to include it in a preset:

```json
{
  "preset": "v8-to-v9",
  "transforms": [
    {
      "name": "my-transform",
      "description": "What it does (@coinbase/cds-web)",
      "file": "my-transform"
    }
  ]
}
```

## Transform Template

```typescript
import type { API, FileInfo } from 'jscodeshift';
import { addTodoComment, hasMigrationTodo, transformLogger } from '../utils/transform-utils';

// eslint-disable-next-line no-restricted-exports -- jscodeshift requires default export
export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let hasChanges = false;

  // 1. Find and transform automatically
  root.find(j.JSXAttribute, { name: { name: 'oldProp' } }).forEach((path) => {
    if (j.JSXIdentifier.check(path.value.name)) {
      path.value.name.name = 'newProp';
      hasChanges = true;

      transformLogger.success('Renamed oldProp to newProp', file.path);
    }
  });

  // 2. Add TODOs for complex cases
  root.find(j.JSXAttribute, { name: { name: 'complexProp' } }).forEach((path) => {
    if (!hasMigrationTodo(path.parent)) {
      addTodoComment(j, path, 'complexProp needs manual migration', 'See: https://...');
      transformLogger.warn('Manual migration required', file.path);
      hasChanges = true;
    }
  });

  // Return null if no changes (skip file write)
  return hasChanges ? root.toSource() : null;
}
```

## Available Utilities

### Transform Utilities

For use in transform files (from `transform-utils.ts`):

#### transformLogger

Simple console-based logger:

```typescript
transformLogger.success('Renamed prop', file.path, line);
transformLogger.warn('Could not migrate', file.path, line);
transformLogger.info('Processing file', file.path);
transformLogger.error('Transform failed', file.path, line);
```

#### addTodoComment()

Add a TODO comment to an AST node:

```typescript
addTodoComment(j, path, 'Manual migration needed', 'See docs...');
```

**Output:**

```tsx
// TODO(cds-migration): Manual migration needed
// See docs...
<Button deprecatedProp="value" />
```

#### hasMigrationTodo()

Check if a node already has a migration TODO:

```typescript
if (!hasMigrationTodo(path.parent)) {
  addTodoComment(j, path, 'Message');
}
```

### Advanced Utilities

For CLI/runner usage (rarely needed in transforms):

#### createLogger()

Creates the full logging system for `migration.log`:

```typescript
const logger = createLogger(process.cwd());
logger.info('Starting migration');
logger.success('Renamed prop', file, line);
```

#### History Tracking

```typescript
hasTransformBeenRun(targetPath, transformPath);
getAlreadyRunTransforms(targetPath, transformPaths);
recordTransformRun(targetPath, transformPath, dryRun);
```

#### Config Loading

```typescript
loadMigrationManifest(presetDir);
getSelectedTransforms(manifest, selection);
buildMigrationSummary(manifest, selection);
```

## Common Patterns

### Rename JSX Component

```typescript
root
  .find(j.JSXElement)
  .filter((path) => {
    const name = path.value.openingElement.name;
    return j.JSXIdentifier.check(name) && name.name === 'OldButton';
  })
  .forEach((path) => {
    const opening = path.value.openingElement;
    const closing = path.value.closingElement;

    if (j.JSXIdentifier.check(opening.name)) {
      opening.name.name = 'Button';
      transformLogger.success('Renamed OldButton to Button', file.path);
    }
    if (closing && j.JSXIdentifier.check(closing.name)) {
      closing.name.name = 'Button';
    }
  });
```

### Rename JSX Prop

```typescript
root
  .find(j.JSXElement, {
    openingElement: { name: { name: 'Button' } },
  })
  .find(j.JSXAttribute, { name: { name: 'variant' } })
  .forEach((path) => {
    if (j.JSXIdentifier.check(path.value.name)) {
      path.value.name.name = 'appearance';
      transformLogger.success('Renamed variant to appearance', file.path);
    }
  });
```

### Update Prop Values

```typescript
root.find(j.JSXAttribute, { name: { name: 'size' } }).forEach((path) => {
  const value = path.value.value;

  if (j.StringLiteral.check(value)) {
    const mapping = { sm: 'small', md: 'medium', lg: 'large' };
    const newValue = mapping[value.value];

    if (newValue) {
      value.value = newValue;
      transformLogger.success(`Updated size: ${value.value} → ${newValue}`, file.path);
    }
  }
});
```

### Update Imports

```typescript
root
  .find(j.ImportDeclaration, {
    source: { value: '@coinbase/cds-web' },
  })
  .forEach((path) => {
    path.value.specifiers?.forEach((specifier) => {
      if (j.ImportSpecifier.check(specifier) && specifier.imported.name === 'OldButton') {
        specifier.imported.name = 'Button';
        if (specifier.local) {
          specifier.local.name = 'Button';
        }
        transformLogger.success('Updated import: OldButton → Button', file.path);
      }
    });
  });
```

## Best Practices

### 1. Make Transforms Idempotent

Safe to run multiple times:

```typescript
// ✅ Good: Check before modifying
const hasImport =
  root.find(j.ImportDeclaration, {
    source: { value: '@coinbase/cds' },
  }).length > 0;

if (hasImport) return null;

// ❌ Bad: Always adds
root.find(j.Program).forEach((path) => {
  path.value.body.unshift(newImport);
});
```

### 2. Always Use transformLogger

```typescript
// ✅ Good
transformLogger.success('Renamed prop', file.path);

// ❌ Bad
console.log('Renamed prop'); // Output goes nowhere useful
```

### 3. Add TODOs for Complex Cases

```typescript
if (!canAutoMigrate) {
  addTodoComment(j, path, 'This requires manual migration', 'See documentation: ...');
  transformLogger.warn('Manual migration needed', file.path);
}
```

### 4. Return null for Unchanged Files

```typescript
if (!hasChanges) {
  return null; // Skip write
}
return root.toSource();
```

### 5. Check for Existing TODOs

```typescript
if (!hasMigrationTodo(path.parent)) {
  addTodoComment(j, path, 'Message');
}
```

### Run in Dry-Run

```bash
npx @coinbase/cds-migrator /tmp/migration-test/src -t my-transform --dry-run
```

### Verify Output

Check:

- ✅ Correct files were modified
- ✅ Changes are accurate
- ✅ TODOs added where needed
- ✅ No unintended side effects

## Transform Organization

### Subdirectories

Organize transforms by type:

```
src/transforms/
├── components/
│   ├── button-variant.ts
│   └── input-size.ts
├── hooks/
│   └── use-theme.ts
└── utils/
    └── format-currency.ts
```

### In manifest.json

```json
{
  "transforms": [
    {
      "name": "button-variant",
      "file": "components/button-variant"
    }
  ]
}
```

## Complete Example

```typescript
import type { API, FileInfo } from 'jscodeshift';
import { addTodoComment, hasMigrationTodo, transformLogger } from '../utils/transform-utils';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  let hasChanges = false;

  // 1. Simple rename - fully automatic
  root
    .find(j.JSXAttribute, { name: { name: 'variant' } })
    .filter((path) => {
      const element = path.parent.value.openingElement;
      return j.JSXIdentifier.check(element.name) && element.name.name === 'Button';
    })
    .forEach((path) => {
      if (j.JSXIdentifier.check(path.value.name)) {
        path.value.name.name = 'appearance';
        hasChanges = true;
        transformLogger.success('Renamed variant to appearance', file.path);
      }
    });

  // 2. Complex case - needs TODO
  root.find(j.JSXAttribute, { name: { name: 'complexProp' } }).forEach((path) => {
    if (!hasMigrationTodo(path.parent)) {
      addTodoComment(j, path, 'complexProp API has changed', 'See docs...');
      transformLogger.warn('Complex prop needs manual migration', file.path);
      hasChanges = true;
    }
  });

  return hasChanges ? root.toSource() : null;
}
```

## Resources

- [jscodeshift Documentation](https://github.com/facebook/jscodeshift)
- [AST Explorer](https://astexplorer.net/) - Visualize JavaScript/TypeScript AST
- [Preset Guide](./PRESET.md) - Creating presets
- [CLI Reference](./CLI_REFERENCE.md) - Running the migrator

## Troubleshooting

### "Transform not found"

Error: `Transform file /path/to/transform.js does not exist`

**Solution:** Check the transform filename in `src/transforms/` matches what you specified with `-t` flag (without extension).

### "No changes detected"

The transform runs but no files are modified.

**Debug:** Use AST Explorer to verify your selector matches the actual code structure.

### Transform runs on wrong files

**Solution:** Specify `extensions` in manifest.json:

```json
{
  "name": "jsx-only-transform",
  "file": "jsx-transform",
  "extensions": "jsx,tsx"
}
```

## See Also

- [Preset Guide](./PRESET.md) - Creating presets
- [CLI Reference](./CLI_REFERENCE.md) - Running the migrator
- [History](./HISTORY.md) - History tracking
