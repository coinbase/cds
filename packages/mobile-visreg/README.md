# @coinbase/mobile-visreg

Visual regression testing for CDS mobile components. Runs Maestro flows on BrowserStack App Automate real devices, captures screenshots, and uploads them to BrowserStack App Percy for visual comparison.

## How it works

1. `browserstack-run.mjs` uploads the app binary and a zip of the Maestro flows to BrowserStack, triggers a build on a real device, polls until it finishes, and downloads screenshots into `maestro-test-output/screenshots/`.
2. Each flow scrolls the debug screen list to a component route, taps it, takes a screenshot, and taps the `nav-back-button` to return to the list.
3. `upload.mjs` uploads the screenshot directory to Percy for visual comparison against the baseline.

## Package structure

```
packages/mobile-visreg/
  config/
    enabled-routes.mjs       # Explicit opt-in list of routes + overlay route set
  src/
    config.mjs               # Re-exports enabled routes + default settings
    generate-flows.mjs       # Generates flows/capture-all.yaml from the route list
    browserstack.mjs         # BrowserStack App Automate REST API client
    browserstack-run.mjs     # Orchestrator CLI — uploads app+flows, runs, downloads screenshots
    upload.mjs               # Percy upload CLI
  flows/
    capture-route-steps.yaml         # Sub-flow for normal routes
    capture-overlay-route-steps.yaml # Sub-flow for overlay routes (modal, tray, drawer, etc.)
    capture-all.yaml                 # Auto-generated — do not edit (git-ignored)
  scripts/
    shouldRunVisreg.mjs      # CI gate — exits 1 if no relevant files changed
```

## Nx targets

| Target                 | Command                                          | Description                                      |
| ---------------------- | ------------------------------------------------ | ------------------------------------------------ |
| `browserstack-ios`     | `yarn nx run mobile-visreg:browserstack-ios`     | Run visreg on a BrowserStack real iOS device     |
| `browserstack-android` | `yarn nx run mobile-visreg:browserstack-android` | Run visreg on a BrowserStack real Android device |
| `upload`               | `yarn nx run mobile-visreg:upload`               | Upload screenshots to BrowserStack App Percy     |

## Prerequisites

- A **BrowserStack App Automate** account with credentials in your environment:
  ```bash
  export BROWSERSTACK_USERNAME=your_username
  export BROWSERSTACK_ACCESS_KEY=your_access_key
  ```
- Committed device artifacts in `apps/expo-app/prebuilds/`:
  - iOS: `ios-release-device/expoapp.ipa`
  - Android: `android-release/expoapp.apk`
- `unzip` and `zip` on PATH (present on macOS and GitHub Ubuntu runners).

## Running visreg

```bash
# 1. Patch a fresh JS bundle into the committed device artifact
yarn nx run expo-app:patch-bundle --configuration=ios-device     # iOS
yarn nx run expo-app:patch-bundle --configuration=android        # Android

# 2. Run the suite on BrowserStack
yarn nx run mobile-visreg:browserstack-ios
yarn nx run mobile-visreg:browserstack-android
# → screenshots land in packages/mobile-visreg/maestro-test-output/screenshots/
# → BrowserStack dashboard URL is printed to the console

# 3. Upload to Percy
export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx
yarn nx run mobile-visreg:upload
```

## Adding new component routes

Routes must be explicitly opted in. To add one:

1. Open `config/enabled-routes.mjs` and add the route key to `enabledRoutes`.
2. If the route opens an overlay (modal, tray, drawer, alert), also add it to `overlayRoutes`.
3. Verify the route name matches what `ExamplesListScreen` renders as the `ListCell` title (the route key itself, e.g. `"Button"`).

## Changing target devices

Edit the `--devices` flag in the `browserstack-ios` / `browserstack-android` targets in `project.json`. Format: `"Device Name-OSVersion"`, e.g. `"iPhone 16-18"`.

## BrowserStack App Percy setup

1. Go to [percy.io](https://percy.io) and sign in with your BrowserStack credentials.
2. Create a new project → **Mobile App** → copy the write-only token (`app_...`).
3. Set `PERCY_TOKEN` and run `yarn nx run mobile-visreg:upload`.
4. The first upload establishes the baseline. Subsequent uploads are compared against it.

### Useful Percy environment variables

| Variable               | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `PERCY_TOKEN`          | Required. Project write-only API token                   |
| `PERCY_BRANCH`         | Branch name for this build (default: current git branch) |
| `PERCY_TARGET_BRANCH`  | Baseline branch to compare against (default: `master`)   |
| `PERCY_PARALLEL_NONCE` | Unique identifier for parallel shards                    |
| `PERCY_PARALLEL_TOTAL` | Number of parallel shards                                |
