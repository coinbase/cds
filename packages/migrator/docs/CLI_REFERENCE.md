# CLI Reference

Complete reference for the CDS Migrator CLI.

## Installation

```bash
# Install as dev dependency (recommended)
yarn add -D @coinbase/cds-migrator

# Or use npx without installing
npx @coinbase/cds-migrator
```

## How It Works

The CLI prompts only for missing information:

- Provide all args → runs immediately
- Provide some args → prompts for the rest
- Provide no args → prompts for everything

## Quick Reference

```bash
# Run entire preset (default)
npx @coinbase/cds-migrator ./src -p v8-to-v9

# Select specific transforms
npx @coinbase/cds-migrator ./src -p v8-to-v9 --partial

# Run transforms directly (no preset!)
npx @coinbase/cds-migrator ./src -t button-variant-values

# Multiple transforms
npx @coinbase/cds-migrator ./src -t button-variant -t input-size

# Dry-run mode
npx @coinbase/cds-migrator ./src -p v8-to-v9 --dry-run

# Clear history
npx @coinbase/cds-migrator ./src --clear-history
```

Use `npx` for one-off usage without installing, or `yarn cds-migrate` if you've installed the package.

---

## CLI Arguments & Flags

### Positional Argument

#### `[path]`

Target path to migrate (optional, defaults to `./src`).

```bash
# Explicit path
npx @coinbase/cds-migrator ./my-app/src -p v8-to-v9

# Default path
npx @coinbase/cds-migrator -p v8-to-v9  # Uses ./src
```

### Selection Flags

#### `-p, --preset <name>`

Run transforms from a preset. **Runs all by default.**

```bash
# Run all transforms
npx @coinbase/cds-migrator ./src -p v8-to-v9

# Select specific transforms
npx @coinbase/cds-migrator ./src -p v8-to-v9 --partial
```

**Available presets:** See [README](../README.md#how-it-works).

#### `--partial`

Select specific transforms from a preset using multi-select checkbox.

```bash
npx @coinbase/cds-migrator ./src -p v8-to-v9 --partial
```

**Prompt shows:**

```
? Which transforms do you want to run? (spacebar to select)
  ◯ button-variant-values
  ◉ input-size-values
  ◯ use-theme-return-type
```

#### `-t, --transform <transforms...>`

Run transforms directly - no preset needed:

```bash
# Single transform
npx @coinbase/cds-migrator ./src -t button-variant-values

# Multiple transforms
npx @coinbase/cds-migrator ./src -t button-variant -t input-size
```

**Transforms are standalone files** in `src/transforms/` that run independently.

#### `--clear-history`

Clear migration history for a path.

```bash
# With confirmation
npx @coinbase/cds-migrator ./src --clear-history

# Skip confirmation
npx @coinbase/cds-migrator ./src --clear-history --skip-confirmation
```

### Mode Flags

#### `-d, --dry-run`

Preview changes without modifying files.

```bash
# Dry-run (safe to test)
npx @coinbase/cds-migrator ./src -p v8-to-v9 --dry-run

# Apply changes (no flag)
npx @coinbase/cds-migrator ./src -p v8-to-v9
```

#### `--skip-confirmation`

Automatically filter out already-run transforms without prompting.

```bash
# For automation
npx @coinbase/cds-migrator ./src -p v8-to-v9 --skip-confirmation
```

**Use for:** CI/CD pipelines, scripts, repeated operations.

#### `-h, --help`

Show help message with all flags.

```bash
npx @coinbase/cds-migrator --help
```

#### `-V, --version`

Show package version.

```bash
npx @coinbase/cds-migrator --version
```

---

## Troubleshooting

### "Warning: Some transforms have already been run"

Options:

1. Use `--skip-confirmation` (auto-filters duplicates)
2. Use `--clear-history` first to reset
3. Choose "Skip" when prompted interactively

```bash
# Auto-filter duplicates
npx @coinbase/cds-migrator ./src -p v8-to-v9 --skip-confirmation
```

### Invalid Preset

Available presets are listed in the [README](../README.md#how-it-works).

Currently available: `v8-to-v9`

## See Also

- [Presets & Transforms](./PRESETS_AND_TRANSFORMS.md) - Creating presets and transforms
- [History Guide](./HISTORY.md) - Advanced history tracking
