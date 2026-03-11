# @coinbase/cds-illustrations

CDS illustrations used in @coinbase/cds-web and @coinbase/cds-mobile.

## Installation

```shell
yarn add @coinbase/cds-illustrations
```

## Contributing

### Figma Links

- [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations)
- [CDS Illustration Figma light styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6)
- [CDS Illustration Figma dark styles](https://www.figma.com/file/etJaiHq7aFlJFICLKIrcK7/%F0%9F%8C%9A--Illustration-Dark-Styles?t=NAycPBCIl5jp15ou-6)

### Summary

The [CDS Illustrations Figma components](https://www.figma.com/file/LmkJatvMRVzNgfiIkJDb99/%E2%9C%A8-Illustrations) are composed of vectors which leverage the [CDS Figma Illustration light color styles](https://www.figma.com/file/skPXKFmI64GqqEkOaBSHcL/%F0%9F%8C%9E--Illustration-Light-Styles?t=NAycPBCIl5jp15ou-6) to power their color fills. This allows design to create a single light mode version, and engineering handles creating the dark mode version through the CDS Figma plugin or through code generation.

In order for engineering to generate a dark mode version of an illustration asset, we need to pull information about the light and dark mode color styles from Figma (`yarn nx run figma-styles:sync`). The CDS Illustration color styles should not change often and can be run on an as-needed basis.

### Releasing Illustrations

1. (**optional**) Sync the latest illustration Figma color styles if they were changed. **You do not need to do a version bump for any changes**.

```shell
yarn nx run figma-styles:sync-illustration-dark-styles
yarn nx run figma-styles:sync-illustration-light-styles
```

2. Sync the latest Figma illustration components.

```shell
yarn nx run illustrations:release
```

- **IMPORTANT:** If any illustrations are renamed or deleted, this update will be a breaking change for consumers. Please ensure that you publish a migration guide and a migrator script along with this release to aid consumers with migration.

3. Commit the changes with a message in the following format: `feat: Publish illustrations mm/dd/yyyy`

4. Open a PR with the changes

5. Bump the package version and update the changelog

```shell
yarn changelog illustrations
```

- When prompted, do the following:
  - Type of change?: "Update" or "Breaking"
  - Changelog message?: Copy/paste your PR title (just the part after `feat:`)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

6. Run `yarn release` to generate website changelogs.

7. Commit and push the changes to your existing PR

8. When the Percy diffs are ready, share them with the Illustrations DRI for approval. Merge your PR once the DRI has signed off.

<!-- TODO: add a step to check deployment status -->

If not, manually trigger the builds if necessary and/or deploy the targets as needed when the build is complete. **_NOTE:_** If you're releasing both icons and illustrations at the same time, you only need to deploy to `production::cds-docs` once, so just pick whichever commit is the most recent and deploy from there.

9.  After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://npmjs.com/package/@coinbase/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://npmjs.com/package/@coinbase/ui/repos/tree/General/cb-npm-master/@coinbase/cds-illustrations/-/@coinbase/cds-illustrations-0.0.1.tgz).

### Gotchas

- It is important to note that if an illustration asset is referencing a color style which was _not_ present the last time the color syncs were run, then the `yarn nx run figma-styles:sync-*` commands will need to be run again before running `yarn nx run illustrations:release`.

- The `illustrations:release` command calls `illustrations:sync` which requires a `lightModeManifestFile` and `darkModeManifestFile` as inputs in `project.json` when generating the svg assets on the fly. If those files are stale, the executor will fallback to the hex value of the color style used (which will always be a light mode fill since that is the only asset design provides), thus making the light and dark mode images the same.

- The release script assumes that each light mode color style synced with `figma-styles:sync-illustration-light-styles` is assigned a unique hex value in Figma. If there are duplicate hex values (check the [light mode manifest](../figma-styles/__generated__/illustration/light/manifest.json)), dark mode variants generated during the `illustrations:release` task may not have the correct colors.

- If seeing this error: "Cannot read properties of undefined ('styles')", you need to update your FIGMA token to the new value.

- You may see the task complete without any changes and the message: "There are no changes since the last update on XX/XX/XXXX". Verify this is expected with design.
