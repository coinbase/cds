# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is the Coinbase Design System (CDS) - a TypeScript monorepo using Nx for task orchestration and yarn as the package manager. The design system provides consistent UI components for both web (React) and mobile (React Native) platforms.

## Core Commands

### Development Commands
- `yarn install` - Install dependencies
- `yarn clean` - Clean all build artifacts and reset Nx daemon
- `yarn nx run <project>:build` - Build a specific project
- `yarn nx run <project>:test` - Run tests for a specific project
- `yarn nx run <project>:lint` - Lint a specific project
- `yarn nx run <project>:typecheck` - Type check a specific project
- `yarn nx run-many --target=<target1>,<target2>` - Run targets for all projects
- `yarn nx run-many --target=<target1>,<target2> --projects=<project1>,<project2>` - Run targets for specific projects

### Testing Commands
- `yarn nx run <project>:test --testPathPattern=<filename>` - Run specific test file
- `yarn nx run <project>:test --testNamePattern=<pattern>` - Run tests matching pattern
- `yarn nx run-many --target=test --projects=<project1>,<project2>` - Run tests for multiple projects

Example:
```bash
yarn nx run mobile:test --testPathPattern=IconButton.test.tsx
yarn nx run web:test --testPathPattern=Button.test
```

### Storybook Development
- `yarn nx run storybook:dev` - Start Storybook dev server
- `yarn nx run storybook:build` - Build Storybook for production

### Documentation Site Development
- `yarn nx run docs:dev` - Start Docusaurus dev server on port 3000
- `yarn nx run docs:build` - Build documentation site for production
- `yarn nx run docs:start` - Serve built documentation site

### Build Commands
- `yarn nx run <package>:build:dev` - Development build (faster, no optimizations)
- `yarn nx run <package>:build:prod` - Production build (includes optimizations and CDS7 exports)
- `yarn nx run-many --target=build --projects=web,mobile` - Build multiple packages in parallel

### Workspace Commands
- `yarn nx graph` - Visualize project dependencies
- `yarn nx affected --target=test` - Run tests only for affected projects
- `yarn nx reset` - Reset Nx daemon cache

## Architecture

### Monorepo Structure
The codebase uses Nx for build orchestration with the following project types:
- **Packages**: Publishable npm packages in the `packages/` directory (e.g., `@cbhq/cds-web`, `@cbhq/cds-mobile`)
- **Libraries**: Non-published local npm packages in the `libs/` directory (e.g., `@cbhq/cds-web`, `@cbhq/cds-mobile`)
- **Applications**: Development and testing apps in the `apps/` directory (Storybook, mobile-app, docs)
- **Tools**: Build tools and utilities for the monorepo in the `tools/` directory

### Key Packages/Apps:
- **`packages/web/`** - React web components (`@cbhq/cds-web`)
- **`packages/mobile/`** - React Native mobile components (`@cbhq/cds-mobile`)
- **`packages/common/`** - Shared functionality and types (`@cbhq/cds-common`)
- **`packages/icons/`** - Icon definitions and data (`@cbhq/cds-icons`)
- **`packages/illustrations/`** - Illustration assets (`@cbhq/illustrations`)
- **`packages/web-visualization/`** - Web visualization components built with D3
- **`packages/mobile-visualization/`** - Mobile visualization components built with D3 and react-native-svg
- **`apps/docs/`** - Public documentation website (Docusaurus)
- **`apps/storybook/`** - Component development and testing environment for cds-web
- **`apps/mobile-app/`** - Sample React Native app for testing components from cds-mobile

### Component Architecture
- **Platform-specific implementations**: Separate implementations for web (React) and mobile (React Native)
- **Shared functionality**: Common business logic in `packages/common` used across packages
- **Theme system**: CDS design tokens are themable and applied via CSS variables (web) and styles (react-native) through a ThemeProvider which takes a theme object
- **Design tokens**: Components utilize "style props" (e.g. background) that accept CDS design tokens (e.g. "bgPrimary")
- **Component structure**: Each component has its own folder with the component, tests, stories, and Figma bindings

## Development Guidelines

### Component Development Structure
Each component should follow this folder structure:
```
component-category/
├── ComponentName.tsx       # Main component file
├── index.ts               # Barrel file
├── __stories__/           # Storybook stories
├── __tests__/             # Unit tests  
├── __figma__/             # Figma Code Connect bindings
```

### Code Quality Standards
- **Components must be memoized**: Always wrap components with `React.memo`
- **Props documentation**: Every prop must have JSDoc comments
- **Type exports**: Export both `BaseProps` and `Props` types (e.g., `ButtonBaseProps`, `ButtonProps`)
- **Platform-specific styling**: Use Linaria for web, `StyleSheet.create` for mobile
- **React best practices**: Use `useMemo` for expensive computations, `useCallback` for event handlers

### Testing Requirements
- **Unit tests**: Required for all components and utilities
- **Test after changes**: ALWAYS run tests for modified files
- **Type checking**: ALWAYS run typecheck after modifications
- **Lint checking**: Run lint checks before finalizing changes

### AI Assistant Guidelines
- **Follow project standards**: Always follow established coding standards and best practices for the platform you are working on (web/mobile)
- **Minimize unnecessary changes**: Avoid stylistic modifications unrelated to the task
- **Test after changes**: ALWAYS run tests for the specific file(s) you modified
- **Type check after changes**: ALWAYS run typecheck on the package(s) you modified
- **Never commit automatically**: NEVER make commits without being instructed to do so directly
- **NX task execution**: Always run tasks via nx in the following format: `yarn nx run [project-name]:[task-name]`

### Additional Resources
- **Coding standards**: `.cursor/rules/coding_standards.mdc`
- **Web development**: `.cursor/rules/web.mdc`
- **Mobile development**: `.cursor/rules/mobile.mdc`
- **Nx workspace rules**: `.cursor/rules/nx-rules.mdc`
