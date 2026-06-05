# @coinbase/cds-migrator

Code migration tools for the Coinbase Design System.

## Installation

```bash
# Install as dev dependency (recommended)
yarn add -D @coinbase/cds-migrator

# Or use npx without installing
npx @coinbase/cds-migrator
```

## Quick Start

### Your First Migration

**1. Run the CLI**

```bash
npx @coinbase/cds-migrator
# Or with path: npx @coinbase/cds-migrator ./src
```

**2. Follow the Prompts**

```
? Enter the path to your codebase: ./src
? Which migration preset do you need? v8 to v9
```

**That's it!** Runs all transforms by default. Use `--partial` to select specific ones.

**3. Review Changes**

The migrator will:

- Run transforms and display progress
- Create `migration.log` with details
- Add TODO comments where manual work is needed

**4. Commit**

```bash
git add .
git commit -m "Migrate from CDS v8 to v9"
```

### Common Workflows

**Quick & Complete:**

```bash
# Preview
npx @coinbase/cds-migrator ./src -p v8-to-v9 --dry-run

# Review log
cat migration.log

# Apply
npx @coinbase/cds-migrator ./src -p v8-to-v9
```

**One Transform:**

```bash
npx @coinbase/cds-migrator ./src -t button-variant-values --dry-run
```

**Multiple Transforms:**

```bash
npx @coinbase/cds-migrator ./src -t button-variant -t input-size --dry-run
```

## Features

- 🎯 **Smart Prompting** - Only prompts for missing information
- 📦 **Flexible Execution** - Use presets for grouped migrations or run transforms directly
- 📝 **History Tracking** - Automatically prevents duplicate migrations
- 🌊 **Dry-Run Mode** - Preview all changes before applying
- 📊 **Comprehensive Logging** - Track successes, warnings, and manual TODOs
- 💬 **TODO Comments** - Automatically marks code that needs manual review
- 🔀 **Import Rewrites** - Cover wrapper packages that re-export CDS so transforms apply to call sites that don't import from CDS directly

## How It Works

**Presets** are curated collections of related transforms (e.g., all transforms needed for v8→v9 migration). You can use a preset to run multiple transforms at once, or run individual transforms directly.

| Preset       | Description                                          | Status       |
| ------------ | ---------------------------------------------------- | ------------ |
| **v8-to-v9** | Component API updates, hook changes, utility updates | ✅ Available |

**Note:** Presets aren't just for version migrations - you can create presets for any collection of code transforms (deprecations, refactors, style updates, etc.).

## Usage

### Preset Mode

Run all transforms in a preset (default) or select specific ones:

```bash
# Run all transforms in preset (default)
npx @coinbase/cds-migrator ./src -p v8-to-v9

# Select specific transforms with multi-select
npx @coinbase/cds-migrator ./src -p v8-to-v9 --partial
```

### Direct Transform Mode

Run transforms directly without a preset:

```bash
# Single transform
npx @coinbase/cds-migrator ./src -t button-variant-values

# Multiple transforms
npx @coinbase/cds-migrator ./src -t button-variant-values -t input-size-values

# Transform in subdirectory
npx @coinbase/cds-migrator ./src -t components/button-variant
```

### Wrapper Packages / Import Rewrites

If your repo re-exports CDS through a wrapper package (e.g. `@acme/shared/cds/buttons/Button` instead of `@coinbase/cds-web/buttons/Button`), transforms will skip those call sites by default because they don't match the CDS package names.

Use `--import-mapping` to tell the migrator to treat one import prefix as another **before** testing any transform regex:

```bash
# One-off via CLI flag
npx @coinbase/cds-migrator ./src -p v8-to-v9 -ir '@acme/shared/cds=@coinbase/cds-web'

# Multiple rewrites
npx @coinbase/cds-migrator ./src -p v8-to-v9 \
  -ir '@acme/shared/cds=@coinbase/cds-web' \
  -ir '@acme/ui/cds=@coinbase/cds-web'
```

Or drop a **`cds-migrator.config.json`** at your repo root so every run picks it up automatically—no flag required:

```json
{
  "packageScope": "coinbase",
  "importMappings": [{ "from": "@acme/shared/cds", "to": "@coinbase/cds-web" }]
}
```

CLI flags always take precedence over the config file when the same `from` key appears in both. The rewrite affects only **import matching**—it never changes the import path written to disk.

### Fully Interactive

Omit flags to be prompted for everything:

```bash
npx @coinbase/cds-migrator
# Prompts for: path → preset → transforms (if --partial)
```

**Note:** Path is the first positional argument. The CLI prompts only for missing information.

## Documentation

### 📘 For Users

1. **[CLI Reference](./docs/CLI_REFERENCE.md)** - Complete CLI usage guide
2. **[History Guide](./docs/HISTORY.md)** - Advanced history tracking

### 🔧 For Contributors

1. **[Presets & Transforms](./docs/PRESETS_AND_TRANSFORMS.md)** - Creating presets, transforms, and APIs

## What Gets Created

After running a migration:

```
your-project/
├── src/
│   ├── .cds-migration-history.json  # ← Tracks applied migrations (commit this!)
│   └── ... (your modified files)
├── cds-migrator.config.json         # ← Optional: standing defaults (commit this!)
└── migration.log                    # ← Detailed log (review then delete)
```

## Migration History

The migrator automatically tracks which transforms have been run to prevent duplicates.

### How It Works

When you run a migration (not in dry-run mode):

1. Records which transform was run and when
2. Stores in `.cds-migration-history.json` in the target directory
3. Checks history before running to prevent duplicates

**The history file should be committed to version control** so team members don't re-run the same migrations.

### What Happens with Duplicates

If you try to run already-applied transforms:

```
⚠️  Warning: Some transforms have already been run on this path:
  • button-variant-values

? How would you like to proceed?
  ❯ Skip already-run transforms (recommended)
    Re-run all transforms
    Cancel
```

**Use `--skip-confirmation`** to auto-filter duplicates without prompting.

### Clearing History

```bash
# With confirmation
npx @coinbase/cds-migrator ./src --clear-history

# Skip confirmation
npx @coinbase/cds-migrator ./src --clear-history --skip-confirmation
```

**When to clear:**

- Failed migration that needs to be re-run
- Testing/development
- After rolling back code changes

**See [docs/HISTORY.md](./docs/HISTORY.md) for advanced usage.**

## Project Structure

```
packages/migrator/
├── docs/
│   ├── CLI_REFERENCE.md           # CLI usage guide
│   ├── PRESETS_AND_TRANSFORMS.md  # Creating presets and transforms
│   └── HISTORY.md                 # History tracking
├── src/
│   ├── cli.ts                     # Main CLI
│   ├── runner.ts                  # Migration executor
│   ├── types.ts                   # TypeScript types
│   ├── presets/                   # Preset configurations (auto-discovered!)
│   │   └── v8-to-v9/
│   │       └── manifest.json
│   ├── transforms/                # Jscodeshift codemods (e.g. versioned v9/)
│   │   └── v9/
│   │       └── migrate-use-merge-refs.ts
│   └── utils/                     # Shared utilities
│       ├── import-mapping.ts      #   Import prefix rewrites (-ir / config)
│       ├── package-scope.ts       #   Package scope filtering (-ps)
│       └── ...
└── package.json
```

## Development

### Build & Test

```bash
# Build the package
yarn nx run migrator:build

# Type check
yarn nx run migrator:typecheck

# Lint
yarn nx run migrator:lint

# Test the CLI
cd packages/migrator
node cjs/cli.js
```

### Adding New Presets

See [docs/PRESETS_AND_TRANSFORMS.md](./docs/PRESETS_AND_TRANSFORMS.md#creating-presets) for complete instructions.

Quick steps:

1. Create `src/presets/v9-to-v10/` directory
2. Add `manifest.json` with a flat list of transforms:
   ```json
   {
     "preset": "v9-to-v10",
     "description": "Migration from CDS v9 to v10",
     "transforms": [
       {
         "name": "my-transform",
         "description": "What it does (@package/name)",
         "file": "my-transform"
       }
     ]
   }
   ```
3. Create transform file in `src/transforms/my-transform.ts`

**Note:** Presets are auto-discovered from the `src/presets/` directory!

## License

See LICENSE in the root of the repository.
