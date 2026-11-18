# CDS Illustrations Contributing Documentation

## Illustration Assets

Each illustration is drawn once in Figma, as a light-mode component in the
[CDS Illustrations library](https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99). That light SVG is
the canonical artifact; every other form is derived from it by the sync:

- **SVG** — the light original, a dark variant, and a themeable variant whose fills are CSS variables
- **PNG** — light and dark rasterizations, used where SVG is not an option
- **JS/ESM modules** — the SVG strings wrapped for the web and mobile packages, with lazy maps

When a native checkout is configured, the sync also exports every illustration to the native CDS
packages in mobile-skunkworks (`CDSDesignSystem` on iOS, `:cds` on Android) as fixed light and dark
vector assets in each platform's format (an asset catalog with SVG appearances, vector drawables)
plus generated name types. See _Syncing the native packages_ below.

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

4. Run the illustration sync. It creates a new `illustrations/YYYY-MM-DD` branch from `origin/master`, writes the generated assets, web's illustration stories, the manifest and a version plan, then commits and pushes the branch. If it fails or nothing changed, the branch is deleted again

```sh
yarn nx run illustrations:sync-illustrations
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

### Syncing the native packages

The same run can update the illustrations of the native CDS packages. Point it at a local checkout
of mobile-skunkworks, which must have no uncommitted changes either:

```sh
export SYNC_ILLUSTRATIONS_NATIVE_REPO=/path/to/mobile-skunkworks
yarn nx run illustrations:sync-illustrations
```

The run first checks that the path is a git checkout with `modules/ios/CDS/CDSDesignSystem` and
`modules/android/cds`, then creates an `illustrations/YYYY-MM-DD` branch from `origin/main` there
as well. It writes `Sources/CDSDesignSystem/{Resources/Illustrations.xcassets,Illustrations/Generated}`
in the iOS module and `{src/main/res/drawable,illustrations/src/main/kotlin/…/generated}` in the
Android module (the paths live in `scripts/sync-illustrations/nativeRepo.ts`) and commits and pushes
the branch when anything changed. Each repository is published on its own: if only the native
checkout was missing files, only its branch is pushed.

Open the native PR by hand in mobile-skunkworks with the title the run prints
(`feat: Sync CDS illustrations YYYY-MM-DD`), next to the cds PR from step 5. The native files are
generated: review them like `src/__generated__`, never edit them. The run ends by printing the
illustrations the native packages draw with a known difference (the approximation list in the sync
README) and those they do not ship because the art uses a mask neither platform can draw (the
not-exportable list, plus an Android-only list for paths over Android's 32,767-character resource
string limit); check that nothing new appeared in any of them.

A checkout that missed a run is repaired by the next one: every native asset is stamped with the
illustration's version and hash, and the sync rewrites any that are missing or stale. To export
the full set into a new checkout, run once with the variable set; there is nothing else to do.

Without `SYNC_ILLUSTRATIONS_NATIVE_REPO` the sync behaves exactly as before.

### Syncing Illustrations Troubleshooting

**"There are no changes since the last update on XX/XX/XXXX"** — The script detected no illustration changes in Figma since the last sync. Verify this is expected with design.

**Force a full re-sync** — If you need to re-sync all illustrations regardless of when they were last updated, pass the `--sync-all` flag:

```sh
yarn nx run illustrations:sync-illustrations --sync-all
```

**Repo is not clean** — The sync requires a clean working tree so that it can create the release branch. Stash or commit any pending changes before running it.

**Writing to some destinations only** — Pass `--select-sinks` to be asked, before anything is
fetched, which of the configured destinations (the illustrations package, the web stories, the
native packages when `SYNC_ILLUSTRATIONS_NATIVE_REPO` is set) this run writes to; answer with the
listed numbers or names, or press enter for all. Without the flag every destination is written, as
usual. The manifest records the run either way, so a destination left out is repaired by backfill on
the next run that includes it:

```sh
yarn nx run illustrations:sync-illustrations --select-sinks
```

**Checking without publishing** — Pass `--dry-run` to download, convert and validate everything the
real run would, including Android's 32,767-character limit on path data, and write nothing: no
assets, catalogs, manifest, version plan or branches. It lists what each destination would write,
remove and reject, and exits nonzero if any illustration would be rejected:

```sh
yarn nx run illustrations:sync-illustrations --dry-run
```

**Illustrations that fail validation** — By default a destination publishes the illustrations that
validate, skips the ones that do not, and the run reports every rejected illustration with its
reason and Figma link. The exit code is nonzero when anything was rejected, even though the valid
assets were written; ask design to fix the rejected illustrations and re-run. Pass
`--all-or-nothing` to make a destination with any rejected illustration publish nothing at all
(files, catalogs and removals); other destinations still publish. The boundary is one destination:
there is no rollback across destinations or after a file-system error during writing.

**Syncing without the release branch** — Pass `--no-git` to write into the current branch instead of creating and pushing `illustrations/YYYY-MM-DD`, for example to inspect a `--sync-all` locally. Scratch runs (below) never touch git.

**"`<type>/<name>` has an SVG the sync cannot publish"** — A layer uses a color theming cannot
handle (an alpha hex such as `#0052FF80`, `currentColor`, `rgba()`, `var()`); the message names the
attribute, the value and links to the node in Figma. Nothing was published. Figma itself never
exports these forms, so the usual cause is a pasted or hand-edited SVG; express transparency with a
layer opacity (exported as `fill-opacity`) rather than a color alpha, republish the library and
re-run.

**"`<type>/<name>` cannot be exported to the native packages"** or **"cannot be drawn as an
Android vector drawable"** — The illustration uses something the native renderers do not support
(a radial gradient, a filter, an image, a blend mode, dashes, a mask that is not a plain opaque
shape, a skewing transform, …); the message names the reason and links to the node in Figma.
The illustration is skipped; by default the rest still publish (see _Illustrations that fail
validation_). Ask design to flatten it in Figma. Until then, either add the illustration to
the not-exportable list in `scripts/sync-illustrations/artifacts/nativeSvg.ts` so the native
packages ship without it (the Android-only list if the reason is a path over Android's resource
string limit), or, if the difference is acceptable, to the approximation list (see _What the native
renderers draw_ in the sync README). The same test that runs on every illustrations PR
converts the whole library, so a newly published construct shows up there first.

**"SYNC_ILLUSTRATIONS_NATIVE_REPO=… is not a native CDS checkout"** — The path is wrong, not a git
checkout, or missing one of the native modules. Fix the path, or unset the variable to sync without
the native packages.

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

The scratch directory receives `__generated__/`, `web-stories/`, `manifest.json` and
`version-plans/`, plus `native/` (laid out like mobile-skunkworks) when
`SYNC_ILLUSTRATIONS_NATIVE_REPO` is set; the native checkout itself is not touched in a scratch
run. Run again
after editing and re-publishing the library to see the incremental diff. Omit
`SYNC_ILLUSTRATIONS_FIGMA_FILE_ID` to scratch-run against the real file (reads only). Remember that
the `/components` endpoint only lists _published_ components, so publish the library after each
edit.
