# CDS Documentation Site

The documentation site is a Docusaurus app for CDS guides, component documentation, examples, and API reference.

## Prerequisites

Follow the repository [setup instructions](../../README.md#setup) to select Node.js and install dependencies. Run the commands below from the repository root.

## Local Development

```sh
yarn nx run docs:dev
```

The development site starts at `http://localhost:3000`. It watches documentation, examples, and site configuration changes. The Nx target also builds the local Docusaurus plugins it depends on.

## Build and Preview

Create a production build with:

```sh
yarn nx run docs:build
```

The static site is written to `apps/docs/dist`. The build also generates and validates the LLM documentation under `apps/docs/dist/llms`.

Serve the built site locally with:

```sh
yarn nx run docs:serve
```

This target depends on `docs:build`, so it rebuilds the site when the output is not current.

## Files and Maintenance

- Add or update guides and component documentation under `apps/docs/docs`.
- Add or update blog posts under `apps/docs/blog`.
- Update `apps/docs/sidebars.ts` when adding or reorganizing documentation pages.
- Update `apps/docs/docusaurus.config.ts` for site configuration, navigation, plugins, or build behavior.
- Update `apps/docs/docgen.config.js` when adding a component API source entry.
- Update theme components and styles under `apps/docs/src` and static assets under `apps/docs/static`.
- Run `yarn nx run docs:peer-dependencies` after package peer dependency changes to synchronize component metadata. The build checks this with `docs:peer-dependencies-check`.
- Use `yarn nx run docs:clear` to remove Docusaurus's local cache when debugging stale development output.

The `.docusaurus` directory and `apps/docs/dist` are generated outputs. Do not edit them directly. The component metadata dependency versions are synchronized by the peer-dependencies target; edit the package peer dependencies or other metadata fields instead of changing generated version values by hand.

## Validation

Run the focused checks before submitting documentation changes:

```sh
yarn nx run docs:test
yarn nx run docs:typecheck
yarn nx run docs:lint
yarn nx run docs:lint-styles
yarn nx run docs:build
yarn nx format:write
```

If `docs:build` reports changed component metadata, run `yarn nx run docs:peer-dependencies`, review the metadata changes, and run the build again. If the site appears stale during development, run `yarn nx run docs:clear` and restart `docs:dev`.
