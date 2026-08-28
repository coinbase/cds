# Versioning and releases

Versioning is owned by each distribution toolchain. Do not apply Node package release commands to
native artifacts.

## Node packages

Node packages use Nx release version plans. Describe the affected package or release group, bump
type, and changelog message:

```sh
yarn nx release plan
yarn release
```

Commit the version plan together with the generated `package.json` and `CHANGELOG.md` changes. You
may defer `yarn release` when several plans should ship together. See [`docs/release.md`](../release.md)
for release groups, project filters, dry runs, and CI validation.

These commands do not version Android or iOS.

## Native Android

Android versions independently in Gradle and publishes an AAR from a GitHub release. Follow
[`packages/cds-android/docs/releasing.md`](../../packages/cds-android/docs/releasing.md).

## Native iOS

iOS versions independently through `ios-v<version>` tags and publishes an XCFramework from a
GitHub release. Follow
[`packages/cds-ios/docs/releasing.md`](../../packages/cds-ios/docs/releasing.md).
