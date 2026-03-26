# @coinbase/mobile-visreg

Shared visual regression (visreg) testing package for CDS mobile apps. Orchestrates [Maestro](https://maestro.mobile.dev/) flows to screenshot component routes via deep-linking and uses [BrowserStack App Percy](https://percy.io) to upload and compare them visually across builds.

## Responsibilities

This package is responsible for:

- **Defining which component routes are visreg-enabled** via `config/enabled-routes.mjs` (an explicit opt-in list — new routes are not included automatically)
- **Generating Maestro flow YAML** that sequences all enabled routes into a single capture run (`src/generate-flows.mjs`)
- **Orchestrating screenshot capture** by driving the target app through deep-links, waiting for animations to settle, and calling Maestro's `takeScreenshot` for each route (`src/run.mjs`)
- **Uploading screenshots to Percy** for visual comparison across branches/builds (`src/upload.mjs`)
- **Installing Maestro CLI** on developer machines (`src/setup.mjs`)

## How it works

1. Maestro launches the app on a simulator and navigates to each component route via deep-link (`<scheme>:///Debug<Route>`)
2. After animations settle, `takeScreenshot` saves a PNG named `<RouteName>_<platform>` to the output directory
3. The `upload` target sends the full screenshot directory to BrowserStack App Percy
4. Percy diffs the new screenshots against the baseline (typically `master`) and surfaces any visual regressions in its dashboard

## Package structure

```
packages/mobile-visreg/
  config/
    enabled-routes.mjs      # Explicit opt-in list of routes to visreg
  src/
    config.mjs              # Re-exports enabled routes + default settings
    generate-flows.mjs      # Generates flows/capture-all.yaml from the route list
    run.mjs                 # Orchestrator CLI — generates flows, invokes Maestro
    setup.mjs               # Maestro CLI installer
    upload.mjs              # Percy upload CLI
  flows/
    capture-route.yaml      # Single-route Maestro flow (used for --route iteration)
    capture-route-steps.yaml # Sub-flow used by capture-all.yaml for each route
    capture-all.yaml        # Auto-generated — do not edit (git-ignored)
  visreg-screenshots/       # Local screenshot output directory (git-ignored)
```

## Nx targets

All targets are run from the repo root via `yarn nx run mobile-visreg:<target>`.

| Target    | Command                             | Description                                            |
| --------- | ----------------------------------- | ------------------------------------------------------ |
| `setup`   | `yarn nx run mobile-visreg:setup`   | Install Maestro CLI (one-time)                         |
| `ios`     | `yarn nx run mobile-visreg:ios`     | Capture screenshots from the CDS mobile app on iOS     |
| `android` | `yarn nx run mobile-visreg:android` | Capture screenshots from the CDS mobile app on Android |
| `upload`  | `yarn nx run mobile-visreg:upload`  | Upload screenshots to BrowserStack App Percy           |

## Prerequisites

- **macOS with Xcode** — required for the iOS simulator
- **Android Studio** — required for the Android emulator
- **Maestro CLI** — installed via `yarn nx run mobile-visreg:setup`
- **BrowserStack App Percy account** — a project token (`PERCY_TOKEN`) is needed to upload

If `maestro` is not found on PATH after installation, add it to your shell:

```bash
export PATH="$PATH:$HOME/.maestro/bin"
```

Add that line to your shell profile (`~/.zshrc` or `~/.bashrc`) to make it permanent.

## Local dev workflow

### 1. Install dependencies (one-time)

```bash
yarn install
```

### 2. Install Maestro (one-time)

```bash
yarn nx run mobile-visreg:setup
```

### 3. Build and install the target app

> **Important**: Use the **release** build, not debug. Debug builds use the Expo Dev Client shell which intercepts deep links before React Navigation can handle them, preventing navigation to component routes.

```bash
yarn nx run mobile-app:build:ios-release
yarn nx run mobile-app:launch:ios-release
```

### 4. Capture screenshots

```bash
# iOS
yarn nx run mobile-visreg:ios

# Android
yarn nx run mobile-visreg:android
```

Screenshots are saved to `packages/mobile-visreg/visreg-screenshots/`.

### 5. Upload to Percy

```bash
export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx
yarn nx run mobile-visreg:upload
```

## Adding new component routes

Routes must be explicitly opted in to visreg. To add a new route:

1. Open `config/enabled-routes.mjs`
2. Add the route name (must match the debug route name registered in the app) to the `enabledRoutes` array
3. Verify the deep-link works: `xcrun simctl openurl booted cds:///Debug<RouteName>`
4. Run `yarn nx run mobile-visreg:ios` and confirm a screenshot is captured for the new route

## Single-route iteration

For fast iteration on a single component, run only that route without regenerating the full flow:

```bash
# Via the Maestro CLI directly
cd packages/mobile-visreg
maestro test flows/capture-route.yaml \
  --env APP_ID=com.ui-systems.ios-release-hermes \
  --env SCHEME=cds \
  --env ROUTE_NAME=Button \
  --env PLATFORM_SUFFIX=_ios

# Via run.mjs
node src/run.mjs \
  --appId com.ui-systems.ios-release-hermes \
  --scheme cds \
  --route Button \
  --output ./visreg-screenshots
```

## BrowserStack App Percy setup

### 1. Sign in

Go to [percy.io](https://percy.io) and sign in with your BrowserStack credentials.

### 2. Create a new project

- Click **"Create new project"**
- Select platform: **"Mobile App"**
- Name: e.g. `CDS Mobile Visreg`
- Baseline management: **Git** (recommended)
- Optionally link to the GitHub repository

### 3. Copy the `PERCY_TOKEN`

After project creation, Percy shows a write-only token starting with `app_`. Copy it.

### 4. Set the token locally

```bash
export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx
```

### 5. Upload screenshots

```bash
yarn nx run mobile-visreg:upload
```

### 6. Review builds

Visit the project dashboard at percy.io. The first upload establishes the baseline. Subsequent uploads are compared against the baseline, with visual diffs highlighted for review.

### Baseline management

- Builds on the default branch (`master`) auto-approve and become the new baseline
- Builds on feature branches compare against the latest `master` baseline
- Set `PERCY_BRANCH` to control which branch the build is associated with
- Set `PERCY_TARGET_BRANCH` to control the comparison baseline (defaults to `master`)

### Useful environment variables

| Variable               | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `PERCY_TOKEN`          | Required. Project write-only API token                   |
| `PERCY_BRANCH`         | Branch name for this build (default: current git branch) |
| `PERCY_TARGET_BRANCH`  | Baseline branch to compare against (default: `master`)   |
| `PERCY_COMMIT`         | Git commit SHA to associate with the build               |
| `PERCY_PARALLEL_TOTAL` | Number of parallel shards (for parallel uploads)         |

## Verification checklist

1. Build the iOS release app and install it on a simulator
2. Verify deep-linking: `xcrun simctl openurl booted cds:///DebugButton`
3. Run `yarn nx run mobile-visreg:ios` — confirm screenshots appear in `visreg-screenshots/`
4. Verify screenshots show the correct component (not the component list or a blank screen)
5. Set `PERCY_TOKEN` and run `yarn nx run mobile-visreg:upload` — verify the build appears in the Percy dashboard
