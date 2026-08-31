# Testing and validation

Run validation for the projects you changed before requesting review. Nx project names can differ
from package names; list them with:

```sh
yarn nx show projects
```

## Node projects

Use the targets supported by each changed project:

```sh
yarn nx run <project>:test
yarn nx run <project>:typecheck
yarn nx run <project>:lint
yarn nx run <project>:build
```

When iterating, narrow Jest tests with `--testNamePattern=<pattern>`. Before handing off a change,
format the workspace:

```sh
yarn nx format:write
```

To validate all affected Node projects locally, the CI-equivalent pattern is:

```sh
yarn nx affected --exclude='*,!tag:toolchain:node' --target=test --base=<base> --head=<head>
```

Replace `test` with `lint`, `typecheck`, or `build` as needed. A project only runs a target it
defines.

## Gradle projects

Use the shared `build` and `test` target names:

```sh
yarn nx run cds-android:test
yarn nx run cds-android:build
yarn nx run android-app:test
yarn nx run android-app:build
```

Use `yarn nx run android-app:launch` only when you need to install and open the demo app on an
emulator or device. Prettier does not format Kotlin; use Android Studio's formatter.

## Xcode projects

Validate the library and gallery with:

```sh
yarn nx run cds-ios:test
yarn nx run cds-ios:build
yarn nx run ios-gallery:build
```

Use `yarn nx run ios-gallery:launch` for Simulator testing. The specialized
`yarn nx run cds-ios:xcframework` target builds the distributable artifact and is only needed for
release validation. Prettier does not format Swift; follow Xcode's formatter.

## Documentation-only changes

Run `yarn nx format:write`. If commands, links, or setup steps changed, verify them against the
relevant project configuration or package-local guide.
