# @cbhq/cds-icons

CDS icons used in @cbhq/cds-web and @cbhq/cds-mobile.

## Installation

```shell
yarn add @cbhq/cds-icons
```

## Contributing

### Figma Links

- [CDS Icon Figma components](https://www.figma.com/file/1J3XC4iA2xRzlnC3y0pl1N/%E2%9D%8C-Icons?node-id=513%3A3971&t=ctB9WBiSSu6wOe3o-0)

### Releasing Icons

1. Sync the latest Figma icon components

```shell
yarn nx run icons:release
```

- **IMPORTANT:** If any icons are renamed or deleted, this update will be a breaking change for consumers. Please ensure that you publish a migration guide and a migrator script along with this release to aid consumers with migration.

2. Commit the changes with a message in the following format: `feat: Publish icons mm/dd/yyyy`

3. Open a PR with the changes

4. Bump the package version and update the changelog

```shell
yarn changelog icons
```

- When prompted, do the following:
  - Type of change?: "Update" or "Breaking"
  - Changelog message?: Copy/paste your PR title (just the part after `feat:`)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

5. Run `yarn release` to generate website changelogs.

6. Commit and push the changes to your existing PR

7. When the Percy diffs are ready, share them with the Icons DRI for approval. Merge your PR once the DRI has signed off.

<!-- 8. TODO: add a step to check deployment status -->

9. After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://npmjs.com/package/@cbhq/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://npmjs.com/package/@cbhq/ui/repos/tree/General/cb-npm-master/@cbhq/cds-icons/-/@cbhq/cds-icons-1.0.0.tgz).

### Gotchas

- You may see the task complete without any changes and the message: "There are no changes since the last update on XX/XX/XXXX". Verify this is expected with design.
