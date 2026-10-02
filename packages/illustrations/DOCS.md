# CDS Illustrations Contributing Documentation

## Illustration Assets

Each illustration is drawn once in Figma, as a light-mode component in the
[CDS Illustrations library](https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99). That light SVG is
the canonical artifact; every other form is derived from it by the sync:

- **SVG** — the light original, a dark variant, and a themeable variant whose fills are CSS variables
- **PNG** — light and dark rasterizations, used where SVG is not an option
- **JS/ESM modules** — the SVG strings wrapped for the web and mobile packages, with lazy maps

The dark and themeable variants are produced by color substitution. Illustrations use a fixed
palette of 15 `illustration/*` color variables, each with a light and a dark value, defined in the
[CDS colors Figma file](https://www.figma.com/design/AH4N0fma2EvI30IltjBGPy) and read through the
[Variables API](https://developers.figma.com/docs/rest-api/#variables) on every run (this needs
Enterprise org access and the `file_variables:read` scope on the token). The sync swaps each light
palette color in the SVG for its dark value to make the dark variant, and for
`var(--illustration-<name>)` to make the themeable one. Colors outside the palette are left as
drawn in every variant.

Assets are versioned per illustration, not per release: files are named `<name>-<version>` and the
version increments whenever the artwork changes. `versionMap.ts` records the current version of each
name, which is how consumers build CDN URLs such as
`https://static-assets.coinbase.com/design-system/illustrations/pictogram/light/someIllustration-2.svg`.
This is also why renaming an illustration resets its version to `0`.

## Syncing Illustrations

**WARNING: FOLLOW THESE INSTRUCTIONS EXACTLY. Copy and paste these commands directly into your terminal, editing them with the current date as necessary. DO NOT MESS AROUND.**

**IMPORTANT: If any illustrations are renamed or deleted, this is a BREAKING CHANGE. This MUST be published with an accompanying major version bump, migration guide, and a migrator script.**

1. Retrieve the team Figma API key from the Config Service and set it in your environment.

```sh
export FIGMA_ACCESS_TOKEN=VALUE-FROM-CONFIG-SERVICE
```

2. Make sure this repo has no uncommitted changes — the sync script will fail if it does

```sh
git status
```

3. Install dependencies

```sh
nvm use
yarn install
```

4. Run the illustration sync workflow from the repo root. It creates a new `illustrations/YYYY-MM-DD` branch from `origin/master`, runs `illustrations:sync-illustrations` (assets, manifest, version plan), runs `web:generate-illustration-stories` (the docsite stories built from the new names), then commits and pushes the branch. If a step fails or nothing changed, the branch is deleted again

```sh
yarn sync-illustrations
```

5. Open a PR in [github.com/coinbase/cds](https://github.com/coinbase/cds). Title the PR exactly the same as the commit message: `feat: Publish illustrations YYYY-MM-DD`. Take note of the PR number for the next step

6. Review the version plan that `sync-illustrations` wrote to `.nx/version-plans/illustrations-YYYY-MM-DD.md`. It lists the added, updated, renamed, and deleted illustrations grouped by type, and selects `major` when any illustration was renamed or deleted and `minor` otherwise. Edit the bump or the wording if you disagree with it. See [the release guide](../../docs/release.md) for how version plans work.

7. Release the illustrations package so the plan is applied to `package.json` and `CHANGELOG.md`

```sh
yarn release --projects=illustrations
```

8. Commit and push the version plan and release to your PR

```sh
git add .
git commit -m 'Update changelog'
git push origin illustrations/YYYY-MM-DD
```

9. DM the illustrations DRI on Slack and share direct links to:

- the illustration changelog in your PR
- the Web Visual Regression results in Percy

You can get the Percy link from the GitHub Actions "Visreg Web" job on your PR

10. Carefully review the two links you shared with the illustrations DRI. Does the changelog look correct? Do the visual regression results look correct?

**IMPORTANT: Breaking change releases are a big deal. They should be performed extremely rarely, and should ALWAYS be accompanied by a migration plan. You are responsible for any breaking changes that you release.**

11. DO NOT MERGE until the illustrations DRI has carefully reviewed and signed off on the changelog and the visual regression test results.

### Syncing Illustrations Troubleshooting

**"There are no changes since the last update on XX/XX/XXXX"** — The script detected no illustration changes in Figma since the last sync. Verify this is expected with design.

**Force a full re-sync** — If you need to re-sync all illustrations regardless of when they were last updated, pass the `--sync-all` flag:

```sh
yarn sync-illustrations --sync-all
```

**Repo is not clean** — The workflow requires a clean working tree. Stash or commit any pending changes before running the sync.

**Running the pieces separately** — `yarn nx run illustrations:sync-illustrations` only syncs (no git); `yarn nx run web:generate-illustration-stories` only regenerates web's stories from the current illustrations. The workflow script chains them.

**"`<type>/<name>` has an SVG the sync cannot publish"** — A layer uses a color theming cannot
handle (an alpha hex such as `#0052FF80`, `currentColor`, `rgba()`, `var()`); the message names the
attribute, the value and links to the node in Figma. Nothing was published. Figma itself never
exports these forms, so the usual cause is a pasted or hand-edited SVG; express transparency with a
layer opacity (exported as `fill-opacity`) rather than a color alpha, republish the library and
re-run.

**An illustration's light and dark variants look identical** — Its layers use colors outside the illustration palette, which the sync leaves as drawn in every variant. Ask design to bind the layers to the published `illustration/*` color variables rather than raw hex values.

**"No published color variables named "illustration/..." found"** or a 403 from the variables endpoints — The Figma token is missing the `file_variables:read` scope or Enterprise access the sync needs. Retrieve a current token from the Config Service. The sync refuses to run without the palette rather than silently publishing light-only assets.

**Names must be `[type]/[name]` in camelCase** — The sync derives an illustration's type and name by splitting its Figma name on `/`, and rejects anything that is not camelCase, or a rename that only changes case. Fix the name in Figma and re-run.

**"Skipping components whose type/name is already taken"** — Two published components share a `[type]/[name]`. The sync keeps the one the manifest already knows (otherwise the oldest) and lists the rest; remove or rename the duplicates in Figma.

## How the sync works

The sync's design — the source/engine/sinks structure, the `Illustration` record, reconciliation
rules, sinks and artifacts, and the testing strategy — is documented in
[`scripts/sync-illustrations/README.md`](scripts/sync-illustrations/README.md). Read it before
changing the sync or adding an output destination.

## Testing

The sync's behaviour (add, update, rename, delete, duplicates, incremental runs) is tested end to
end against an in-memory source with the real package sink, and its formats are pinned byte
for byte to recorded Figma responses and the files previous syncs published:

```sh
yarn nx run illustrations:test
```

### Scratch runs against the test fixture file

[CDS Illustrations — sync-illustrations test fixture](https://www.figma.com/design/qtdIR0QTyK0NZcZoAeJmS8)
(Design Systems/Eng) is a published library laid out like the real file, one page per type with a
handful of `mock*` components, that can be freely edited to exercise additions, deletions, renames,
artwork and description changes. Point the sync target at it and at a scratch directory; nothing
under the package is touched:

```sh
export FIGMA_ACCESS_TOKEN=VALUE-FROM-CONFIG-SERVICE
export SYNC_ILLUSTRATIONS_SCRATCH_DIR=/tmp/illustrations-scratch
export SYNC_ILLUSTRATIONS_FIGMA_FILE_ID=qtdIR0QTyK0NZcZoAeJmS8
yarn nx run illustrations:sync-illustrations
```

The scratch directory receives `__generated__/`, `manifest.json` and `version-plans/`; run again
after editing and re-publishing the library to see the incremental diff. Omit
`SYNC_ILLUSTRATIONS_FIGMA_FILE_ID` to scratch-run against the real file (reads only). Remember that
the `/components` endpoint only lists _published_ components, so publish the library after each
edit.
