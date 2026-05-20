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

# Handle a wrapper package that re-exports CDS
npx @coinbase/cds-migrator ./src -p v8-to-v9 -ir '@acme/shared/cds=@coinbase/cds-web'
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

#### `-ps, --package-scope <scope>`

Limit scope-aware transforms (for example `button-variant-values`, `migrate-use-merge-refs`) to imports under a single npm scope. Omit this flag to rewrite every scope (for example both `@coinbase/cds-web` and `@acme/cds-web`).

```bash
# Only rewrite @coinbase/cds-* imports
npx @coinbase/cds-migrator ./src -t button-variant-values --package-scope coinbase

# Shorthand
npx @coinbase/cds-migrator ./src -t button-variant-values -ps coinbase

# Equivalent
npx @coinbase/cds-migrator ./src -t button-variant-values --package-scope @coinbase
```

#### `--import-mapping <mapping...>`

Rewrite an import source prefix **before** any transform regex runs. Use this when a wrapper or re-exporting package stands between your call sites and CDS (e.g. `@acme/shared/cds/buttons/Button` instead of `@coinbase/cds-web/buttons/Button`).

**Format:** `'<from>=<to>'` where `<from>` and `<to>` are import source prefixes. Pass the flag multiple times for multiple rewrites.

```bash
# Single rewrite
npx @coinbase/cds-migrator ./src -p v8-to-v9 -ir '@acme/shared/cds=@coinbase/cds-web'

# Multiple rewrites
npx @coinbase/cds-migrator ./src -p v8-to-v9 \
  -ir '@acme/shared/cds=@coinbase/cds-web' \
  -ir '@acme/ui/cds=@coinbase/cds-web'

# Combined with package scope
npx @coinbase/cds-migrator ./src -p v8-to-v9 -ps coinbase -ir '@acme/shared/cds=@coinbase/cds-web'
```

The rewrite applies **only to import matching**—it never changes the import path written to disk.

**Interaction with `--package-scope`:** `packageScope` constrains the regex used to match the **rewritten** path, so the `to` value must resolve to a path under that scope. If they disagree the rewrite silently has no effect:

```
# ✓ consistent — to resolves under the same scope as packageScope
-ps coinbase -ir '@acme/shared/cds=@coinbase/cds-web'

# ✗ mismatch — to is @coinbase but scope filter is @cbhq, match never fires
-ps cbhq -ir '@acme/shared/cds=@coinbase/cds-web'
```

When in doubt, omit `-ps` — the regex then matches any npm scope.

Rewrites are also accepted via `cds-migrator.config.json` (see [Repo Config File](#repo-config-file-cds-migratorconfig-json)). CLI values win on conflicts.

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

## Repo Config File (`cds-migrator.config.json`)

Place a `cds-migrator.config.json` at your repo root (or at the migration target path) to set standing defaults that apply on every run without requiring CLI flags. **Commit this file** so all team members benefit.

```json
{
  "packageScope": "cbhq",
  "importMappings": [{ "from": "@acme/shared/cds", "to": "@coinbase/cds-web" }]
}
```

**Fields:**

| Field            | Type             | Equivalent CLI flag | Description                                        |
| ---------------- | ---------------- | ------------------- | -------------------------------------------------- |
| `packageScope`   | `string`         | `-ps`               | Default npm scope filter                           |
| `importMappings` | `{ from, to }[]` | `--import-mapping`  | Import source prefix mappings for wrapper packages |

**Precedence:** CLI flags override config file values. If the same `from` key appears in both, the CLI value wins.

**Scope consistency:** If `packageScope` is set (here or via CLI), the `to` value of every `importMapping` must resolve to a path under that same scope — otherwise the rewrite fires but the resulting path won't match the transform regex and the file will be skipped silently. When in doubt, omit `packageScope` so the regex matches any npm scope.

The migrator searches for the config file at `<targetPath>/cds-migrator.config.json`, then falls back to `<cwd>/cds-migrator.config.json`. Throws if the file exists but contains malformed JSON.

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
- [Repo Config File](#repo-config-file-cds-migratorconfig-json) - `cds-migrator.config.json` reference
