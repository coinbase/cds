# Nx workspace configuration

The root [`nx.json`](../nx.json) still defines Node-oriented defaults for common targets such as
`build`, `test`, `typecheck`, and `lint`. For example, the default `build` outputs include
`cjs`, `dist`, `esm`, and `lib`, while the default `test` output is Jest coverage.

These defaults predate the native Android and iOS projects. They remain global because this
workspace currently uses Nx 20.8.2, which cannot scope `targetDefaults` by project tag. Scoping by
executor does not solve the problem because both Node and native projects primarily use
`nx:run-commands`.

## Why toolchain tags are required today

Nx 20 cannot use the tags to select `targetDefaults`, but CI already depends on them:

1. The change classifier maps a changed project root to its `toolchain:*` tag and selects the Node,
   Gradle, or Xcode workflow.
2. The Node workflow positively filters `nx affected` to `toolchain:node`, preventing native
   `build` and `test` targets from running on Node-only Linux jobs.
3. The validator rejects missing or conflicting tags so a new project cannot silently enter the
   wrong workflow or receive no build and test coverage.

The tags describe execution requirements rather than product platforms. For example, both web and
React Native projects use `toolchain:node`, while platform-neutral repository tooling can use the
same tag without claiming to be a web project. See [`docs/ci.md`](ci.md) for the routing behavior.

## Current safeguard

Native projects use the same capability names, including `build` and `test`, but explicitly
override every incompatible Node default:

- command and working directory
- task dependencies
- inputs and outputs
- cache behavior

Every project must also declare exactly one `toolchain:node`, `toolchain:gradle`, or
`toolchain:xcode` tag. `tools/ci/validators/validateProjectTags.mjs` enforces the tag assignment and
ensures native targets override the Node defaults they would otherwise inherit.

This is an intentional compatibility layer, not the desired final configuration.

## Planned replacement

[CDS-2618](https://linear.app/coinbase/issue/CDS-2618/upgrade-nx-20-to-nx-23-and-adopt-toolchain-filtered-target-defaults)
tracks upgrading Nx and its coordinated Jest and ESLint dependencies. After that upgrade:

1. Scope shared target defaults with `filter.projects` and the `toolchain:*` tags.
2. Remove native overrides that exist only to neutralize Node defaults.
3. Keep project-specific commands and outputs local where implementations genuinely differ.
4. Simplify the validator to enforce toolchain identity and valid platform pairings.
