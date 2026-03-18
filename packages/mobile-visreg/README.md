# @coinbase/mobile-visreg

Reusable Maestro + Percy visual regression testing package for CDS mobile apps.

Captures screenshots of component routes via deep-linking and uploads them to BrowserStack App Percy for visual comparison.

## Overview

- **Maestro** drives the app via deep-links (`<scheme>:///Debug<Route>`) for fast, direct navigation
- `takeScreenshot` saves PNGs to a local output directory
- `percy upload` sends the directory to App Percy for comparison
- Each consuming app gets Nx `visreg` and `visreg-upload` targets

## Prerequisites

- An iOS simulator (Xcode required)
- A [BrowserStack App Percy](https://percy.io) account and project token (`PERCY_TOKEN`)

Maestro CLI is installed automatically by the setup script.

## Local Dev Workflow

### 1. Install dependencies (one-time)

```bash
yarn install
```

### 2. Install Maestro (one-time)

```bash
yarn nx run mobile-visreg:setup
```

If `maestro` is not found on PATH after installation, add it:

```bash
export PATH="$PATH:$HOME/.maestro/bin"
```

Add that line to your shell profile (`~/.zshrc` or `~/.bashrc`) to make it permanent.

### 3. Build and install the target app

> **Important**: Use the **release** build, not debug. Debug builds use the Expo Dev Client shell which intercepts deep links before React Navigation can handle them, preventing navigation to component routes.

```bash
# test-expo
yarn nx run test-expo:build --configuration=ios-release
yarn nx run test-expo:launch --configuration=ios-release

# OR mobile-app
yarn nx run mobile-app:build --configuration=ios-release
yarn nx run mobile-app:launch --configuration=ios-release
```

### 4. Capture screenshots

```bash
yarn nx run test-expo:visreg
# OR
yarn nx run mobile-app:visreg-local
```

Screenshots are saved to `apps/<app>/visreg-screenshots/`.

### 5. Upload to Percy

```bash
export PERCY_TOKEN=app_xxxxxxxxxxxxxxxx
yarn nx run test-expo:visreg-upload
```

## Comparing two apps (test-expo vs mobile-app)

The primary use case for this package is verifying that `test-expo` (new infrastructure) renders identically to `mobile-app` (existing infrastructure). Percy is used as the comparison engine.

**Workflow:**

1. Upload `mobile-app` screenshots as the **baseline** (associated with `master`):

```bash
# Build and capture mobile-app
yarn nx run mobile-app:build --configuration=ios-release
yarn nx run mobile-app:launch --configuration=ios-release
yarn nx run mobile-app:visreg-local

# Upload as the master baseline
PERCY_TOKEN=app_xxxxxxxxxxxxxxxx PERCY_BRANCH=master yarn nx run mobile-app:visreg-upload
```

2. Upload `test-expo` screenshots as a **branch build** to compare against:

```bash
# Build and capture test-expo
yarn nx run test-expo:build --configuration=ios-release
yarn nx run test-expo:launch --configuration=ios-release
yarn nx run test-expo:visreg

# Upload as a branch — Percy will diff against master
PERCY_TOKEN=app_xxxxxxxxxxxxxxxx PERCY_BRANCH=test-expo-migration yarn nx run test-expo:visreg-upload
```

3. Open the Percy dashboard to review diffs. Any visual differences between the two apps will be highlighted.

> **Note**: Both upload commands must use the same `PERCY_TOKEN` (same Percy project) for the comparison to work.

### Single-route iteration

For fast iteration on a single component:

```bash
cd packages/mobile-visreg
maestro test flows/capture-route.yaml \
  --env APP_ID=com.anonymous.test-expo,SCHEME=testexpo,ROUTE_NAME=Button
```

Or via run.mjs:

```bash
node src/run.mjs \
  --appId com.anonymous.test-expo \
  --scheme testexpo \
  --route Button \
  --output ./screenshots
```

## BrowserStack App Percy Setup

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
yarn nx run test-expo:visreg-upload
```

### 6. Review builds

Visit the project dashboard at percy.io. The first upload establishes the baseline. Subsequent uploads are compared against the baseline, with visual diffs highlighted for review.

### 7. Baseline management

- Builds on the default branch (master) auto-approve and become the new baseline
- Builds on feature branches compare against the latest master baseline
- Set `PERCY_BRANCH` to control which branch the build is associated with
- Set `PERCY_TARGET_BRANCH` to control the comparison baseline (defaults to master)

### Useful environment variables

| Variable               | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `PERCY_TOKEN`          | Required. Project write-only API token                   |
| `PERCY_BRANCH`         | Branch name for this build (default: current git branch) |
| `PERCY_TARGET_BRANCH`  | Baseline branch to compare against (default: master)     |
| `PERCY_COMMIT`         | Git commit SHA to associate with the build               |
| `PERCY_PARALLEL_TOTAL` | Number of parallel shards (for parallel uploads)         |

## Package structure

```
packages/mobile-visreg/
  src/
    config.mjs            # Curated route list + settings
    generate-flows.mjs    # Generates flows/capture-all.yaml
    run.mjs               # Orchestrator CLI
    setup.mjs             # Maestro installer
    upload.mjs            # Percy upload CLI
  flows/
    capture-route.yaml    # Single-route flow template
    capture-all.yaml      # Generated — do not edit (git-ignored)
```

## Verification

1. Build either app (iOS release), install on simulator
2. Verify deep-linking: `xcrun simctl openurl booted testexpo:///DebugButton`
3. Run `yarn nx run test-expo:visreg` — verify screenshots appear in `visreg-screenshots/`
4. Verify screenshots show the correct component (not the list or a blank screen)
5. Upload with a Percy token — verify the build appears in the Percy dashboard
