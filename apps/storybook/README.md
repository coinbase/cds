# CDS Storybook

Storybook is the development environment and interactive component catalog for CDS web components. Stories live with their components in `packages/web` and are discovered by `apps/storybook/.storybook/main.ts`.

## Prerequisites

Follow the repository [setup instructions](../../README.md#setup) to select Node.js and install dependencies. Run the Nx commands below from the repository root.

## Local Development

```sh
yarn nx run storybook:dev
```

Storybook starts at `http://localhost:6006` and reloads as component, story, or Storybook configuration files change. Use the Nx target rather than invoking the Storybook CLI directly; the configuration resolves aliases from the monorepo root.

## Build and Preview

Create a production build with:

```sh
yarn nx run storybook:build
```

The static site is written to `apps/storybook/dist`. To preview that static output, first build it and then serve the directory:

```sh
yarn dlx http-server apps/storybook/dist --port 6006
```

## Files and Maintenance

- Add or update `*.stories.tsx` or `*.stories.mdx` files under `packages/web`.
- Update `apps/storybook/.storybook/main.ts` for Storybook addons, Vite configuration, aliases, or story discovery.
- Update `apps/storybook/.storybook/preview.ts` for global decorators, parameters, and toolbar controls.
- Update `apps/storybook/.storybook/manager.tsx` for the Storybook manager UI.
- Keep stories focused on useful component states and interactions, including accessibility behavior.
- `apps/storybook/dist` and bundle-analysis output are generated files. Do not edit or commit them.

## Validation

Run the focused checks before submitting Storybook changes:

```sh
yarn nx run storybook:test-a11y
yarn nx run storybook:typecheck
yarn nx run storybook:lint
yarn nx run storybook:build
yarn nx format:write
```

The accessibility target runs the stories in a headless Chromium browser. On a new checkout, install the browser from the Storybook workspace if it is not already available:

```sh
cd apps/storybook
yarn exec playwright install chromium
cd ../..
```

If the test runner reports missing Linux browser libraries, install the dependencies required by Playwright for the current operating system and rerun the target. If a build fails after changing a package alias or Storybook setting, rerun it through `yarn nx run storybook:build` so Nx supplies the monorepo environment.
