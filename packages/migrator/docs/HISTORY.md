# Migration History - Advanced Guide

Detailed information about migration history tracking, team collaboration, and advanced usage.

> **Quick reference:** See [README](../README.md#migration-history) for basic usage and [Presets & Transforms](./PRESETS_AND_TRANSFORMS.md#advanced-apis) for the programmatic API.

## History File Format

```json
{
  "entries": [
    {
      "transform": "button-variant-values",
      "timestamp": "2026-03-05T14:00:00.000Z"
    }
  ],
  "lastUpdated": "2026-03-05T14:05:00.000Z"
}
```

- `transform`: File path relative to `src/transforms/`
- `timestamp`: ISO timestamp when applied
- File location indicates which directory was migrated
- Dry-run mode doesn't update history

## Team Collaboration

### Multiple Developers

1. **Developer A** runs migration and commits:

   ```bash
   npx @coinbase/cds-migrator ./src -p v8-to-v9
   git add .cds-migration-history.json
   git commit -m "Run v8-to-v9 migration"
   ```

2. **Developer B** pulls and tries same migration:
   - Migrator detects it was already run
   - Shows warning with history
   - Recommends skipping

### Multiple Directories

Each directory tracks independently:

```
project/
├── src/.cds-migration-history.json      # Independent
└── legacy/.cds-migration-history.json   # Independent
```

## Clearing History

### CLI Command

```bash
# With confirmation
npx @coinbase/cds-migrator ./src --clear-history

# Skip confirmation
npx @coinbase/cds-migrator ./src --clear-history --skip-confirmation
```

### When to Clear

**Failed Migration:**

```bash
# Migration failed midway
npx @coinbase/cds-migrator ./src -p v8-to-v9
# Some transforms succeeded, others didn't

# Clear and retry
npx @coinbase/cds-migrator ./src --clear-history --skip-confirmation
npx @coinbase/cds-migrator ./src -p v8-to-v9
```

**Testing:**

```bash
# Test
npx @coinbase/cds-migrator ./test-dir -p v8-to-v9

# Clear for next test
npx @coinbase/cds-migrator ./test-dir --clear-history --skip-confirmation
```

**After Rollback:**

```bash
git reset --hard HEAD~1
npx @coinbase/cds-migrator ./src --clear-history --skip-confirmation
```

### Bulk Clear

```bash
#!/bin/bash
for dir in ./src ./lib ./packages; do
  npx @coinbase/cds-migrator "$dir" --clear-history --skip-confirmation
done
```

### Manual Deletion

```bash
# Direct file deletion
rm ./src/.cds-migration-history.json
```

## Troubleshooting

### Re-running a Transform

**Options:**

1. Choose "Re-run all" when prompted
2. Clear history first
3. Manually edit `.cds-migration-history.json` to remove specific entries

### Out of Sync History

If team members have conflicting history:

1. Review both files
2. Merge entries manually
3. Keep most complete version
4. Resolve through code review

### Transform Not Recorded

**Causes:**

- Dry-run mode (by design)
- Crash before saving
- File permission issues

**Fix:** Manually add entry to history file

## Best Practices

### ✅ Do

- Commit `.cds-migration-history.json` to version control
- Review history before migrations
- Use `--dry-run` first
- Skip already-run transforms (default)

### ❌ Don't

- Delete history file without reason
- Re-run transforms unnecessarily
- Ignore duplicate warnings
- Add to `.gitignore`

## Configuration

### Disable History Tracking

History is always enabled. To skip tracking:

1. Use `--dry-run` mode (doesn't record)
2. Or delete history file after run (not recommended)

### Custom History Location

History file is always in the target directory. This ensures:

- Each directory migrates independently
- History travels with code
- No global state

## See Also

- [CLI Reference](./CLI_REFERENCE.md) - Complete CLI usage
- [Presets & Transforms](./PRESETS_AND_TRANSFORMS.md) - Creating presets and transforms
