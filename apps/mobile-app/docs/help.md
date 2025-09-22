# Help

## Debugging Tools

1. How do I run `gradlew` locally for Android debugging?
   Our expo builds are 'managed', and therefore are built in a temp directory outside of our repo that is cleaned at the end of an `eas` command. This means we do not keep `/ios` or `/android` directories in our `mobile-app`.

To generate a local android directory to run `gradle`:

- `yarn workspace mobile-app expo prebuild --platform android`
- `cd apps/mobile-app/android`
- Run gradle command. You can always find the gradle commands executed for debug and release builds in [eas.json](/apps/mobile-app/eas.json). For debug, you can run `./gradlew :app:assembleDebug :app:assembleAndroidTest -DtestBuildType=debug`. For release, you can run `./gradlew :app:assembleRelease :app:assembleAndroidTest -DtestBuildType=release`
- `yarn clean-expo` from root when you're done! Leaving the `android` directory will impact future builds.

2. How do I run `pod` locally for iOS debugging?
   Our expo builds are 'managed', and therefore are built in a temp directory outside of our repo that is cleaned at the end of an `eas` command. This means we do not keep `/ios` or `/android` directories in our `mobile-app`.

To generate a local ios directory to run `pod`, you can run the prebuild command from expo. This will call `pod install` for you and show you a local failure:

- `yarn workspace mobile-app expo prebuild --platform ios`
- `yarn clean-expo` from root when you're done! Leaving the `ios` directory will impact future builds.

3. Access expo build output directly for logs & to debug build failures.

Our expo builds are 'managed', and therefore are built in a temp directory outside of our repo that is cleaned at the end of an `eas` command. In order to see the build output or logs generated from the `yarn nx run mobile-app:build:<config>`, you need to skip expo cleanup. This can also be used for `launch`

- Go to our [build script](/apps/mobile-app/scripts/build.mjs)
- Prepend `export EAS_LOCAL_BUILD_SKIP_CLEANUP=1 && ` prior to `eas build`...
- Run build like normal
- At the end of the build, you'll see an output `Skipping cleanup, /var/folders/.... won't be removed.`
- `cd /var/folders/...`
- `open .` to see it in your file system
- You can find build logs (these are the same as Xcode logs for iOS builds) at: `logs/CDS-CDS.log` within the temp directory
- You can find build output in `build` within the temp directory.
- If packages are successfully built, the `build/packages/<packagename>/lib` directory of each package will have content.

## Common Errors

1. `yarn nx run mobile-app:build:ios-debug` is throwing a `Error: spawn pod ENOENT` error.

- Run `yarn workspace mobile-app run expo prebuild -p ios --clean`
- `yarn clean-expo`
- `yarn nx run mobile-app:build:ios-debug` should work as expected

2. `yarn nx run mobile-app:build:android-debug` is throwing this error `mobile-app/android directory not found`

- Run `mkdir apps/mobile-app/android`
- `yarn nx run mobile-app:build:android-debug` should work as expected
- Delete the `mobile-app/android` directory

3. An error like "You are on eas-cli@3.7.2 which does not satisfy the CLI version constraint in eas.json (3.8.1)"

Look up the `cli.version` in `apps/mobile-app/eas.json`.

```shell
npm -g install eas-cli@<version>
```

4. I'm getting a fastlane build error:

```shell
Error: Fastlane build failed with unknown error. See logs for the "Run fastlane" and "Xcode Logs" phases for more information.
Fastlane errors in most cases are not printed at the end of the output, so you may not find any useful information in the last lines of output when looking for an error message.
```

This error can occur for a number of reasons. See debugging section above for how to access our iOS App Logs.

5. Android build failure. Gradle build failed with unknown error. See logs for "Run gradlew" phase for more information.

This error can occur for a number of reasons. See debugging section above for how to run gradle locally.

6. Pod Install error.

This error can occur for a number of reasons. See debugging section above for how to run pod install locally.

7. No development build (com.ui-systems.debug-ios-hermes) for this project is installed. Please make and install development build on the device first.

This error occurs because mobile-app/ios directory was present at the time of launching the build onto a simulator. This interferes with expos naming of the app on the device.

To resolve from root:
`yarn clean-expo`

8. I'm seeing this build error in my CDS log file in the expo temp directory:

```shell
[31mError: While resolving module `@cbhq/cds-icons/names`, the Haste package `@cbhq/cds-icons` was found. However the module `names` could not be found within the package. Indeed, none of these files exist:
```

This error can be caused by two things:

- The packages are incorrectly built. All packages should be built in the preinstall `eas-build-pre-install` script found in the `mobile-app/package.json` file. If the package has an empty or missing `lib` in the expo temp directory, it didn't correctly build.
- Metro error. Package exports are processed from the metro.config.js for local development. You can verify through `yarn.lock`.

9. I'm seeing lots of warnings about watchman recrawling. How can I remove these from my terminal output?

- Shutdown watchman

```shell
watchman shutdown-server
```

- Delete running watch list

```shell
watchman watch-del-all
```

- Update homebrew

```shell
brew update
```

- Re-install watchman with latest version

```shell
brew reinstall watchman
```

- Print watchman location (to be used in steps below)

```shell
which watchman
```

- Open System Settings > Privacy & Security > Full Disk Access
- Ensure that your Terminal or iTerm (if applicable) and Visual Studio Code are added to list
- Click the plus button at the bottom of the window so we can add `Watchman` to the list
- Select Macintosh HD in the folders list
- Press `shift + Command + .` at the same time to see all the directories list
- Drill into the directory that `which watchman` printed and find all executables prefixed with `watchman` and add each one to have Full Disk Access list
  - even if `watchman*` processes were previously provided full-disk-access, make sure to re-add access after reinstalling watchman
- Run `yarn nx run mobile-app:start` multiple times to confirm you are no longer seeing the warning

10. Expo is throwing this error while I'm running a build or launch command (`yarn nx run mobile-app:<build|launch>:<build type>`): Props Authentication Token not found, Props token or EXPO login error.

Approaches to resolve:

- Run the following in the root directory

```shell
cd apps/mobile-app && eas build --local --non-interactive --json --clear-cache --platform ios --profile debug
```

11. Cocoapods is not setup or the following error is thrown: Cocoapods is not available, make sure it's installed and in your PATH.

- Run `gem install cocoapods`
