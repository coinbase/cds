# CDS Illustrations Contributing Documentation

## Illustration Assets

Each illustration is published in several forms, all generated from one Figma component:

- **SVG** — light and dark variants, plus a themeable variant whose fills are CSS variables
- **PNG** — light and dark rasterizations, used where SVG is not an option
- **JS/ESM maps** — lazily-required SVG strings consumed by the web and mobile packages

Assets are versioned per illustration rather than per release: an illustration's files are named
`<name>-<version>` and the version increments whenever its artwork changes. `versionMap.ts` records
the current version for each name, which is how consumers build CDN URLs such as
`https://static-assets.coinbase.com/design-system/illustrations/pictogram/light/someIllustration-2.svg`.
This is also why renaming an illustration resets its version to `0`.

Colors come from a separate Figma file through the
[Variables API](https://developers.figma.com/docs/rest-api/#variables), which supplies the light and
dark value of every illustration color. The sync uses those pairs to derive the dark variant from
the light artwork design provides, and to substitute CSS variables for the themeable variant.
Reading them requires Enterprise org access and the `file_variables:read` scope on the token.

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

4. Run the illustration sync script. The script will create a new `illustrations/YYYY-MM-DD` branch from `origin/master`, sync the illustrations from Figma, regenerate the docsite stories, then commit and push the branch automatically

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

### Syncing Illustrations Troubleshooting

**"There are no changes since the last update on XX/XX/XXXX"** — The script detected no illustration changes in Figma since the last sync. Verify this is expected with design.

**Force a full re-sync** — If you need to re-sync all illustrations regardless of when they were last updated, pass the `--sync-all` flag:

```sh
yarn nx run illustrations:sync-illustrations -- --sync-all
```

**Repo is not clean** — The script requires a clean working tree. Stash or commit any pending changes before running the sync.

**An illustration's light and dark variants look identical** — The illustration uses a color that the Variables API did not return a dark value for, so the sync fell back to the light fill. Ask design to bind the layer to a published illustration color variable rather than a raw hex value.

**"Cannot read properties of undefined (reading 'styles')"** — The Figma token is missing the scopes the sync needs. Retrieve a current token from the Config Service.

**Names must be `[type]/[name]` in camelCase** — The sync derives an illustration's type and name by splitting its Figma name on `/`, and rejects anything that is not camelCase, or a rename that only changes case. Fix the name in Figma and re-run.

## Testing

The sync's helpers and its version plan generator are unit tested:

```sh
yarn nx run illustrations:test
```
