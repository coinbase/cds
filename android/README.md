# android/

The Gradle root for the native Android CDS package. It holds **no source code** — only the build
setup that the two Kotlin modules share.

Those modules live where Nx expects them, not here:

| Gradle module | Directory               | Nx project    |
| ------------- | ----------------------- | ------------- |
| `:cds`        | `packages/cds-android/` | `cds-android` |
| `:app`        | `apps/android-app/`     | `android-app` |

`settings.gradle.kts` reassigns each module's `projectDir` to bridge the two layouts, so a single
Gradle build spans both folders while `packages/` and `apps/` keep their monorepo meaning.

## Why the Gradle root is not the repo root

Gradle expects to own the directory it builds from, and the repo root already belongs to Yarn and
Nx. Putting `settings.gradle.kts` there would mean one tool's conventions sitting on top of
another's: Gradle would scan the whole JavaScript workspace, and every Android contributor would be
pointing their tooling at a directory full of unrelated `package.json` files. Keeping the Gradle
root in `android/` gives the Android build a home of its own and leaves the repo root untouched.

## Contents

| Path                                        | Role                                                              |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `settings.gradle.kts`                       | Module list, `projectDir` remapping, and repository configuration |
| `build.gradle.kts`                          | Declares the shared plugin classpath; applies nothing itself      |
| `gradle/libs.versions.toml`                 | Version catalog — the single source for dependency versions       |
| `gradle/gradle-daemon-jvm.properties`       | Pins the build to JDK 21, downloading it if the machine lacks one |
| `gradle.properties`                         | Daemon JVM args, configuration cache, Kotlin code style           |
| `gradlew`, `gradlew.bat`, `gradle/wrapper/` | The Gradle wrapper                                                |

The wrapper — including `gradle-wrapper.jar` — is committed on purpose. It is what lets `./gradlew`
bootstrap the correct Gradle version on a machine with no Gradle installed, so it has to be present
before the build can run. This is standard Gradle practice.

`build/`, `.gradle/`, `.kotlin/`, and `local.properties` are all generated and ignored.

## Building

From the **repo root**, either through Nx or straight to Gradle:

```sh
yarn nx run cds-android:assemble      # AAR
yarn nx run cds-android:test          # JUnit
yarn nx run android-app:launch        # build + install + start the demo app

./android/gradlew -p android :cds:assembleRelease
./android/gradlew -p android tasks
```

The `-p android` is what points Gradle at this directory. Without it, Gradle looks in the current
directory, finds no `settings.gradle.kts`, and fails.

CI runs `:cds:test` from [`.github/workflows/android.yml`](../.github/workflows/android.yml) when
these paths change. That workflow is separate from the JavaScript `CI` pipeline on purpose: it
needs JDK 21 and the Android SDK, which those runners do not have.

## Working in Android Studio

**File → Open → this `android/` folder.** Not the repo root — Studio would find no Gradle build
there and would try to index the entire JavaScript monorepo.

Studio is the better environment for Kotlin work, and the gap is wider than it is for the
JavaScript packages. From the terminal you can only rebuild and reinstall, because Compose compiles
into the APK and there is no dev server to hot-reload it. Opening `android/` gets you:

- **`@Preview`** — render a composable in the IDE with no emulator at all. For design-system work
  this is the primary loop, and it has no command-line equivalent.
- **Live Edit** — patch composable bodies in the running app without a rebuild.
- **Apply Changes** — push edits Live Edit cannot handle without a full reinstall.
- Kotlin completion and refactoring that understand the version catalog and the Compose compiler.
- The debugger, Logcat, and the Layout Inspector.

Because of the `projectDir` remapping, `:cds` and `:app` appear as ordinary modules and you are
editing the real files in `packages/` and `apps/` — not copies. Edits made in Studio and edits made
in your terminal editor are the same files.

Everything still works from the terminal; you just trade the fast feedback loop for a full rebuild
on each change.

## More

- [`packages/cds-android/README.md`](../packages/cds-android/README.md) — setup, JDK and SDK
  requirements, installing CDS in an app, and the API boundary
- [`AGENTS.md`](../AGENTS.md) — conventions for agents working in this repo
