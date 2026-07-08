# @coinbase/mobile-visreg

Visual regression testing for CDS mobile components. Runs Maestro flows on [BrowserStack App Automate](https://www.browserstack.com/app-automate) real devices, captures screenshots, and uploads them to [BrowserStack App Percy](https://percy.io) for visual comparison across branches.

## How it works

1. `browserstack-run.mjs` uploads the app binary and a zip of the Maestro flows to BrowserStack, triggers a Maestro build on a real iOS or Android device, polls until it finishes, and downloads the captured screenshots into `maestro-test-output/screenshots/`.
2. Each flow opens the inline search, types the route name, taps the exact-match shortcut to navigate to that component's screen, takes a screenshot, and taps the back button to return to the list.
3. `upload.mjs` pushes the screenshot directory to Percy for visual diff against the baseline.

## Package structure

```
packages/mobile-visreg/
  config/
    enabled-routes.mjs          # Explicit opt-in list of routes + overlay route set
  src/
    config.mjs                  # Re-exports enabled routes + default settings
    generate-flows.mjs          # Generates flows/capture-all.yaml from the route list
    browserstack.mjs            # BrowserStack App Automate REST API client
    browserstack-run.mjs        # Orchestrator CLI — uploads app+flows, triggers build, downloads screenshots
    recover-screenshots.mjs     # Downloads screenshots from an existing build (use after interruption)
    upload.mjs                  # Percy upload CLI
  flows/
    capture-route-steps.yaml         # Sub-flow for normal routes
    capture-overlay-route-steps.yaml # Sub-flow for overlay routes (modal, tray, drawer, etc.)
    capture-all.yaml                 # Auto-generated — do not edit (git-ignored)
  scripts/
    shouldRunVisreg.mjs         # CI gate — exits 1 if no relevant files changed
```

## Nx targets

| Target                 | Command                                          | Description                                              |
| ---------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| `browserstack-ios`     | `yarn nx run mobile-visreg:browserstack-ios`     | Run visreg on a BrowserStack real iOS device             |
| `browserstack-android` | `yarn nx run mobile-visreg:browserstack-android` | Run visreg on a BrowserStack real Android device         |
| `upload`               | `yarn nx run mobile-visreg:upload`               | Upload screenshots to BrowserStack App Percy             |
| `recover-screenshots`  | `yarn nx run mobile-visreg:recover-screenshots`  | Download screenshots from an existing BrowserStack build |

---

## Environment setup (first-time)

Before running visreg — locally or in CI — you need credentials for BrowserStack and Percy.

### 1. BrowserStack account

Mobile visreg runs on BrowserStack App Automate's real-device cloud.

- Sign up or log in at [browserstack.com](https://www.browserstack.com).
- For CI, use a **dedicated service account** (e.g. a team/org account) rather than personal credentials — BrowserStack credentials are account-level, not project-scoped.
- Find your credentials under **Account → Settings → Access Key** or at [app-automate.browserstack.com](https://app-automate.browserstack.com).

```bash
export BROWSERSTACK_USERNAME=your_username
export BROWSERSTACK_ACCESS_KEY=your_access_key
```

### 2. Percy project

Screenshots are uploaded to BrowserStack App Percy for visual diffing.

- Sign in at [percy.io](https://percy.io) with your BrowserStack credentials.
- Create a new project → **Mobile App** → name it (e.g. `CDS Mobile Visreg`).
- Copy the write-only token shown after creation (starts with `app_`).

```bash
export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx
```

Percy tokens are **project-scoped** (not personal) — the same token can be used by any CI job or team member.

### 3. GitHub repository secrets (CI)

Add these three secrets to the GitHub repository (Settings → Secrets and variables → Actions):

| Secret                    | Value                              |
| ------------------------- | ---------------------------------- |
| `BROWSERSTACK_USERNAME`   | BrowserStack account username      |
| `BROWSERSTACK_ACCESS_KEY` | BrowserStack account access key    |
| `PERCY_TOKEN_MOBILE`      | Percy write-only token (`app_...`) |

`GITHUB_TOKEN` is provided automatically by GitHub Actions — no setup needed.

### 4. Committed device artifacts

CI patches a fresh JS bundle into a committed native artifact rather than doing a full native rebuild on every run. The following files must be committed to the repo:

| File                                                     | Built on          | Command                                                         |
| -------------------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| `apps/expo-app/prebuilds/ios-release-device/expoapp.ipa` | macOS (Xcode)     | `yarn nx run expo-app:build --configuration=ios-release-device` |
| `apps/expo-app/prebuilds/android-release/expoapp.apk`    | any (Android SDK) | `yarn nx run expo-app:build --configuration=android-release`    |

Rebuild and re-commit these only when native dependencies or Expo config change — JS-only changes use `patch-bundle` instead (see below). See [`apps/expo-app/docs/building-mobile.md`](/apps/expo-app/docs/building-mobile.md) for details.

---

## Running visreg

```bash
# 1. Patch a fresh JS bundle into the committed device artifact
yarn nx run expo-app:patch-bundle --configuration=ios-device   # iOS
yarn nx run expo-app:patch-bundle --configuration=android      # Android

# 2. Run the suite on a real BrowserStack device
yarn nx run mobile-visreg:browserstack-ios
yarn nx run mobile-visreg:browserstack-android
# → screenshots land in packages/mobile-visreg/maestro-test-output/screenshots/
# → BrowserStack dashboard URL is printed to the console

# 3. Upload to Percy
export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx
yarn nx run mobile-visreg:upload
```

### Recovering screenshots after an interruption

If the run script was interrupted (e.g. machine sleep) after the BrowserStack build completed, screenshots are still available for 60 days. Use the recovery script:

```bash
# List recent builds and their IDs
yarn nx run mobile-visreg:recover-screenshots

# Download screenshots from a specific build
yarn nx run mobile-visreg:recover-screenshots --args="--buildId <id>"

# Then upload to Percy as normal
yarn nx run mobile-visreg:upload
```

---

## CI behaviour

Mobile visreg runs automatically in CI (`.github/workflows/visreg-mobile.yml`) with the following trigger logic:

| Event                                 | Runs?                                                                            |
| ------------------------------------- | -------------------------------------------------------------------------------- |
| Push to `master`                      | Always                                                                           |
| `workflow_dispatch`                   | Always                                                                           |
| PR (non-draft) against `master`       | If `packages/mobile/src/**/*.{ts,tsx}` changed, or `visreg-mobile` label applied |
| PR (draft) with `visreg-mobile` label | Yes — label is an explicit opt-in override                                       |
| PR (draft) without label              | Skipped                                                                          |
| PR converted draft → ready            | Fires and evaluates normally                                                     |

Both iOS and Android run in parallel on `ubuntu-latest`. No macOS runner, simulator, or Maestro CLI install is required in CI — BrowserStack handles all device execution.

---

## Adding new component routes

Routes must be explicitly opted in. To add one:

1. Open `config/enabled-routes.mjs` and add the route key to `enabledRoutes`.
2. If the route opens an overlay (modal, tray, drawer, alert), add it to `overlayRoutes` as well and verify what button text closes it (the flow tries `Cancel` then `Close`).
3. Confirm the route key exactly matches what `ExamplesListScreen` in `apps/expo-app` renders as the `ListCell` title.

## Changing target devices

Edit the `--devices` flag in the `browserstack-ios` / `browserstack-android` targets in `project.json`. Format: `"Device Name-OSVersion"` — e.g. `"iPhone 16-18"`, `"Google Pixel 8-14.0"`. Available devices are listed in the [BrowserStack device list](https://www.browserstack.com/list-of-browsers-and-platforms/app_automate).

## Percy baselines

- The first build after setup establishes the baseline.
- Builds on `master` auto-approve and become the new baseline.
- PR builds compare against the latest `master` baseline.
- Real-device screenshots differ from simulator screenshots — switching or changing the target device will require re-approving baselines.

### Useful Percy environment variables

| Variable               | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `PERCY_TOKEN`          | Required. Project write-only token (`app_...`)           |
| `PERCY_BRANCH`         | Branch name for this build (default: current git branch) |
| `PERCY_TARGET_BRANCH`  | Baseline branch to compare against (default: `master`)   |
| `PERCY_PARALLEL_NONCE` | Unique run ID when uploading from parallel jobs          |
| `PERCY_PARALLEL_TOTAL` | Number of parallel jobs contributing to one Percy build  |
