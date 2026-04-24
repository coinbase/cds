# Icons

Use this guide when the task needs CDS icons.

## Find icons

- Start with script search:
  - `node skills/cds-code/scripts/discover-cds-icons.mjs <query>`
  - `node skills/cds-code/scripts/discover-cds-icons.mjs <query> --limit 10`
  - `node skills/cds-code/scripts/discover-cds-icons.mjs <query> --all`
  - `node skills/cds-code/scripts/discover-cds-icons.mjs <query> --project-root /absolute/path/to/app`
- Browse the full icon list in CDS docs if needed: [https://cds.coinbase.com/components/media/Icon/#icons](https://cds.coinbase.com/components/media/Icon/#icons)

If the script is unavailable, use **cds-docs** (`skills/cds-docs`): route index → Icon docs.

## Size guidance

- Supported sizes: `xs`, `s`, `m`, `l`
- `Icon` default size is `m`
- `IconButton` defaults to `s` when `compact` and `m` when not compact
- Navigation/sidebar icon usage is usually `m`
- Dense inline usage (for example caret affordances) is commonly `s`

## Active state guidance

- Use `active` only for selected/toggled states (for example selected bottom nav item, selected sidebar row, toggled `IconButton`)
- Selected icons are often paired with selected color treatment in the surrounding component state
