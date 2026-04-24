# Illustrations

Use this guide when the task needs CDS illustrations.

## Find illustrations

- Start with script search:
  - `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query>`
  - `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --limit 12`
  - `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --all`
  - `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --variant Pictogram`
  - `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --project-root /absolute/path/to/app`
- Use CDS docs (or CDS MCP `list-cds-routes`) when you need to browse the full catalog

## Variants

- Component names: `Pictogram`, `SpotIcon`, `SpotSquare`, `SpotRectangle`, `HeroSquare`
- CLI `--variant` accepts any casing (`Pictogram` and `pictogram` both work)

## Dimension guidance

- `Pictogram`: `48x48` (default), `64x64`
- `SpotIcon`: `32x32` (default), `24x24`
- `SpotSquare`: `96x96` (default)
- `SpotRectangle`: `240x120` (default)
- `HeroSquare`: `240x240` (default), `200x200`

Pick the closest supported `dimension` for the layout instead of inventing new values.
