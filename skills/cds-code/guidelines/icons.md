# Icons

Use this guide when the task needs CDS icons.

## Find icons

Use the discovery script (`scripts/discover-cds-icons.mjs`) to list all availabe icons in the installed version of CDS.

Sample usage:

- `node skills/cds-code/scripts/discover-cds-icons.mjs <query>`
- `node skills/cds-code/scripts/discover-cds-icons.mjs <query> --limit 10`
- `node skills/cds-code/scripts/discover-cds-icons.mjs <query> --all`
- `node skills/cds-code/scripts/discover-cds-icons.mjs <query> --project-root /absolute/path/to/app`

If you are unable to run the script, retrieve the `Icon` page from the CDS docs.

## Size guidance

- Supported sizes: `xs`, `s`, `m`, `l`
- `Icon` default size is `m`
- `IconButton` defaults to `s` when `compact` and `m` when not compact
- Navigation/sidebar icon usage is usually `m`
- Dense inline usage (for example caret affordances) is commonly `s`

## Active state guidance

- Use `active` only for selected/toggled states (for example selected bottom nav item, selected sidebar row, toggled `IconButton`)
- Selected icons are often paired with selected color treatment in the surrounding component state
