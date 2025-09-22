# @cbhq/ui-mobile-visreg

This package contains the logic to utilize visreg in your CI.

## Releasing UI Mobile Visreg

1. Commit your changes & open a PR

2. Bump the package version and update the changelog

```shell
yarn bump-version ui-mobile-visreg
```

- When prompted, do the following:
  - Type of change?: Select what makes the most sense
  - Changelog message?: Short and sweet description :)
  - PR number?: Copy/paste your PR number
  - Skip the rest (press enter to use defaults)

3. Commit and push the changes to your existing PR. Get reviews & merge.

<!-- 4. TODO: add a step to check deployment status -->

5. After the deploy has succeeded, verify that the new package was published at the [production Coinbase NPM registry](https://npmjs.com/package/@cbhq/ui/repos/tree/General/cb-npm-master). It usually takes about 10 min or so for the package to be uploaded. Look for the version number at the bottom of the artifact list in the [package directory](https://npmjs.com/package/@cbhq/ui/repos/tree/General/cb-npm-master/@cbhq/ui-mobile-visreg/-/@cbhq/ui-mobile-visreg-1.0.0-rc.1.tgz).
