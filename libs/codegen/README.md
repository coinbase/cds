# Codegen

A collection of code generation scripts for the CDS monorepo.

## Nx Targets

### `yarn nx run codegen:mobile-routes`

Scans all mobile story files (`packages/**/mobile/src/**/__stories__/*.stories.tsx`) and generates the route table for `apps/expo-app/src/routes.ts`.

Run this when adding or removing mobile component stories.

**Source:** `src/playground/prepareRoutes.ts`

---

### `yarn nx run codegen:icon-svg-map`

Reads every SVG file from `packages/icons/src/svgs/` and generates a static map at `apps/expo-app/src/__generated__/iconSvgMap.ts`. The map keys are `iconName-size-state` (e.g. `account-24-active`) and each value holds the raw SVG string, used by expo-app to render icons directly via `react-native-svg`.

Run this when icons are added, removed, or updated in `packages/icons`.

**Source:** `src/icons/generateIconSvgMap.ts`

---

### `yarn nx run codegen:update-packages-generic-bump`

Syncs the version numbers of `web`, `mobile`, `common`, and `mcp-server` packages to the highest version among them, and inserts a corresponding entry into each out-of-date `CHANGELOG.md`. Used during the release process to keep versions in lockstep.

**Source:** `src/release/updatePkgsForGenericBump.ts`

---

## Utilities

Shared helpers used internally by codegen scripts (`src/utils/`):

- `getSourcePath` — resolves an absolute path from the monorepo root, using `PROJECT_CWD` or `NX_MONOREPO_ROOT` env vars
- `writeFile` — renders an EJS template (or raw string) and writes the output, optionally running Prettier
- `buildTemplates` — batch wrapper around `writeFile` for running multiple template renders
- `writePrettyFile` — writes a file and formats it with Prettier
- `getHeaderCommentForFileType` — returns the appropriate "DO NOT MODIFY" header comment for a given file extension
- `getPrettierParser` — returns the Prettier parser for a given file extension
- `sortAlphabetically` — sorts an array of strings alphabetically
- `logError` — standardized error logging
