# Illustrations

Use this guide when the task needs CDS illustrations.

## Find illustrations

Use the discovery script (`scripts/discover-cds-illustrations.mjs`) to list all availabe illustrations in the installed version of CDS.

Sample usage:

- `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query>`
- `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --limit 12`
- `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --all`
- `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --variant Pictogram`
- `node skills/cds-code/scripts/discover-cds-illustrations.mjs <query> --project-root /absolute/path/to/app`

If you are unable to run the script, retrieve the appropriate pages from the CDS docs.

## Variants

Components: `Pictogram`, `SpotIcon`, `SpotSquare`, `SpotRectangle`, `HeroSquare`

## Dimension guidance

- `Pictogram`: `48x48` (default), `64x64`
- `SpotIcon`: `32x32` (default), `24x24`
- `SpotSquare`: `96x96` (default)
- `SpotRectangle`: `240x120` (default)
- `HeroSquare`: `240x240` (default), `200x200`

Pick the closest supported `dimension` for the layout instead of inventing new values.
