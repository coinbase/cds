## Overview

This is the Coinbase Design System (CDS) - a cross-platform component library.
Primary language: TypeScript
Package manager: yarn
Task runner & monorepo tooling: Nx
Runtime: NodeJS (see .nvmrc for version)

CDS ships on four product platforms across three toolchains:

| Product platform | Implementation         | Toolchain |
| ---------------- | ---------------------- | --------- |
| Web              | React                  | Node      |
| Mobile           | React Native           | Node      |
| Native Android   | Kotlin/Jetpack Compose | Gradle    |
| Native iOS       | Swift/SwiftUI          | Xcode     |

This root file contains repository-wide guidance. A package-level `AGENTS.md` is authoritative for
work in that package and may add stricter local rules. In particular, read
`packages/cds-android/AGENTS.md` before Kotlin work and `packages/cds-ios/AGENTS.md` before Swift
work.

## Agent Guidelines

- NEVER make commits without being instructed to do so directly
- Never commit secrets or credentials, log restricted PII, or remove or weaken security controls
- Ask focused clarifying questions when ambiguity would materially change the implementation
- ALWAYS look for relevant skills and rules you can apply before beginning your work

## Core Commands

- `yarn install` - Install dependencies
- `yarn nx release plan` - Writes an nx release version plan describing your change
- `yarn release` - Applies pending version plans, writing new versions and CHANGELOG entries. Wraps `nx release --skip-publish`; publishing is CI's job. See `docs/release.md`
- `yarn clean` - Removes all build artifacts, deletes .nx folder and resets the Nx daemon
- `yarn nx reset` - Reset Nx daemon cache

## Verification

After writing code, validate the smallest relevant scope:

- Node: run tests for the modified files, typecheck and lint the modified projects, then run
  `yarn nx format:write`
- Gradle: run the changed project's `test` and `build` targets; Prettier does not format Kotlin
- Xcode: run `cds-ios:test` and the changed project's `build` target; Prettier does not format Swift
- Documentation only: run `yarn nx format:write` and verify changed commands and links

See [`docs/testing.md`](docs/testing.md) for exact commands.

## Nx and toolchains

**ALWAYS** run Nx commands using the formats demonstrated by the commands below.

- `yarn nx show projects` - Show all projects in the workspace (project names differ from package names)
- `yarn nx affected --target=test` - Run tests only for affected projects
- `yarn nx run <project>:build` - Build any project through its assigned toolchain
- `yarn nx run <project>:test` - Run tests for a specific project
- `yarn nx run <project>:test --testNamePattern=<pattern>` - Run tests matching pattern
- `yarn nx format:write` - Formats all files in the workspace with Prettier
- `yarn nx run <project>:lint` - Lint a specific project
- `yarn nx run <project>:typecheck` - Check for type errors in a specific project
- `yarn nx run-many --target=<target1>,<target2>` - Run targets for all projects
- `yarn nx run-many --target=<target1>,<target2> --projects=<project1>,<project2>` - Run targets for specific projects

Every project has exactly one of `toolchain:node`, `toolchain:gradle`, or `toolchain:xcode`. Common
targets use `build` and, where supported, `test`. Specialized targets such as `launch` and
`xcframework` remain project-specific. See [`docs/nx.md`](docs/nx.md) for why the root target
defaults remain Node-oriented, and [`docs/`](docs/README.md) for setup and CI architecture.

## Architecture

- Platform implementations live in `packages/web`, `packages/mobile`, `packages/cds-android`, and
  `packages/cds-ios`.
- Shared Node functionality lives in `packages/common`; Kotlin and Swift cannot import TypeScript
  packages.
- Development apps are `apps/storybook`, `apps/expo-app`, `apps/android-app`, and
  `apps/ios-gallery`.
- `android/` is the Gradle root. `ios/` is the Xcode workspace umbrella.
- Components generally colocate implementation, tests, stories, and Figma bindings where the
  toolchain supports them.

## Native package guidance

- For Kotlin/Compose implementation rules, API boundaries, token details, and releases, follow
  [`packages/cds-android/AGENTS.md`](packages/cds-android/AGENTS.md).
- For Swift/SwiftUI implementation rules, API boundaries, token details, and releases, follow
  [`packages/cds-ios/AGENTS.md`](packages/cds-ios/AGENTS.md).
- Load the `jetpack-best-practices` skill when writing Compose.
- Do not copy package-local consumer or release rules into this root file.

## Skills

Repository-specific skills live in `skills/` and `.claude/skills/`. Load the relevant skill before
working in its domain. Skills under `skills/` use a `README.md` and may include an `evals/`
directory with benchmark test cases.

### After running skill evals

If a skill has evals and you run them, update the skill's `README.md` with a `## Performance` section containing the latest benchmark results:

- Overall summary table: pass rate, avg time, avg tokens — with/without skill and the delta
- Per-eval breakdown table showing each task name and pass rates for each configuration
- A callout of the biggest gains (where the skill adds the most value)
- The iteration number and date for traceability

See `skills/cds-code/README.md` for a reference example.

## Standards & Best Practices

### General

- We prefer quality over quantity for unit tests: focus on high-quality tests that provide outsized value before writing exhaustive test cases for coverage.
- Prefer constants over magic numbers: replace hard-coded values with descriptively named constants in camelCase
- Use meaningful names: variables and functions should reveal their purpose
- Code is self-documenting: code shouldn't need comments unless it is unusually complex in which case add brief comments where appropriate
- NEVER use exports marked as deprecated in the codebase when writing code or a plan.

### React

- Always memoize CDS components with `memo` HOC
- Use `useMemo` for expensive computations or for computed/conditional styles
- Use `useCallback` for event handlers passed as props to other components
- Use `useEffect` only for side effects (e.g API calls, subscriptions, browser API calls, etc.)
- Consult React's docs if you feel you need a useEffect for something else (https://react.dev/learn/you-might-not-need-an-effect)
