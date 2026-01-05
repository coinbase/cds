## Overview

This is the Coinbase Design System (CDS) - a cross-platform React component library.
Primary language: Typescript
Package manager: yarn
Task runner & monorepo tooling: Nx
Runtime: NodeJS (see .nvmrc for version)

## Agent Guidelines

- NEVER make commits without being instructed to do so directly
- IMPORTANT: After you are done writing code, ALWAYS perform these tasks:
  1. run the unit for the **specific file(s)** you modified
  2. run typecheck on the **specific package(s)** you modified
  3. run the formatter
- For complex tasks, ask clarifying questions to the user before executing
- ALWAYS look for relevant skills and rules you can apply before beginning your work

## Core Commands

- `yarn install` - Install dependencies
- `yarn release` - Automates versioning of packages unaffected by changes to keep version numbers in sync
- `yarn clean` - Removes all build artifacts, deletes .nx folder and resets the Nx daemon
- `yarn nx reset` - Reset Nx daemon cache

## Nx Commands

**ALWAYS** run Nx commands using the formats demonstrated by the commands below.

- `yarn nx show projects` - Show all projects in the workspace (project names differ from package names)
- `yarn nx affected --target=test` - Run tests only for affected projects
- `yarn nx run <project>:test` - Run tests for a specific project
- `yarn nx run <project>:test --testNamePattern=<pattern>` - Run tests matching pattern
- `yarn nx format:write` - Formats all files in the workspace with Prettier
- `yarn nx run <project>:lint` - Lint a specific project
- `yarn nx run <project>:typecheck` - Check for type errors in a specific project
- `yarn nx run-many --target=<target1>,<target2>` - Run targets for all projects
- `yarn nx run-many --target=<target1>,<target2> --projects=<project1>,<project2>` - Run targets for specific projects

## Architecture

### General Architecture

- **Platform-specific implementations**: Separate implementations for web (React) and mobile (React Native)
- **Shared functionality**: Common business logic in `packages/common` used across other packages
- **Theme system**: CDS design tokens are themable and applied via CSS variables (web) and styles (react-native) through a ThemeProvider
- **Design tokens**: Design tokens (e.g. "bgPrimary", "fgMuted") can be used as values for special CDS component "style props" (e.g. "background")
- **Component structure**: Each component has its own folder with the component, tests, stories, and Figma bindings
- **Testing**: Tests are written in Typescript and run with Jest.

### Key Packages & Apps:

- **`packages/web/`** - React web components (`@coinbase/cds-web`)
- **`packages/mobile/`** - React Native mobile components (`@coinbase/cds-mobile`)
- **`packages/common/`** - Shared functionality and types (`@coinbase/cds-common`)
- **`packages/icons/`** - Icon definitions and data (`@coinbase/cds-icons`)
- **`packages/illustrations/`** - Illustration assets (`@coinbase/illustrations`)
- **`packages/web-visualization/`** - Web visualization components built with D3 (`@coinbase/cds-web-visualization`)
- **`packages/mobile-visualization/`** - Mobile visualization components built with D3 and react-native-skia (`@coinbase/cds-mobile-visualization`)
- **`apps/docs/`** - Public documentation website (Docusaurus)
- **`apps/storybook/`** - Component development and testing environment for cds-web
- **`apps/mobile-app/`** - Sample React Native app for testing components from cds-mobile

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
