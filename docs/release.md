# Release

CDS npm packages are versioned with [nx release version plans](https://nx.dev/recipes/nx-release/file-based-versioning-version-plans).

Instead of editing `package.json` and `CHANGELOG.md` by hand, you commit a small markdown file describing your change. `nx release` reads the accumulated plans, derives the version bump and the changelog entry from them, and deletes the plans it consumed.

Native Android (`packages/cds-android`) and native iOS (`packages/cds-ios`) are **not** part of this flow. They version independently through Gradle and SwiftPM, and are excluded because `release.groups` in `nx.json` is an allowlist that does not name them.

## Releasing in your PR

This is the normal path. Both steps run locally.

```sh
# 1. Describe your change
yarn nx release plan

# 2. Apply pending plans: writes package.json + CHANGELOG.md, deletes the consumed plans
yarn release
```

Commit the plan file together with the resulting `package.json` and `CHANGELOG.md` changes. When your PR merges, [`publish.yml`](../.github/workflows/publish.yml) sees the changed `packages/*/package.json` and publishes to npm.

To limit a release to specific packages, pass `--projects`. This only accepts packages that version independently; nx rejects the filter if it names a member of a fixed group, so target the `cds` group with `--group` instead. The same applies to `yarn nx release plan`.

```sh
yarn release --projects=icons
yarn release --group=cds
```

Preview without touching any files:

```sh
yarn release --dry-run
```

## Deferring a release

You can also commit only the plan and skip `yarn release`. Plans accumulate on `master` until someone runs `yarn release`, which then batches every pending plan into one version per package. This is useful when several PRs should ship as a single release.

## Writing a version plan by hand

`yarn nx release plan` is a generator, but the file is plain markdown: YAML frontmatter mapping names to bump types, followed by the changelog message.

```md
---
web: minor
---

Feat: add `size` prop to Button.
```

A single plan can cover several packages:

```md
---
icons: patch
utils: patch
---

Fix: correct the exported type of `IconName`.
```

## Release groups

`nx.json` defines two groups, which control how a plan is interpreted.

| Group        | Relationship  | Projects                                                                                                                        |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `cds`        | `fixed`       | `web`, `mobile`, `common`, `mcp-server`                                                                                         |
| `standalone` | `independent` | `icons`, `illustrations`, `lottie-files`, `eslint-plugin-cds`, `migrator`, `utils`, `web-visualization`, `mobile-visualization` |

The `cds` group is versioned in lockstep, so all four packages always share one version. Naming any single member bumps the whole group, and you can name the group itself instead:

```md
---
cds: minor
---

Feat: add `size` prop to Button.
```

Packages in `standalone` version independently. Bumping one does not bump the others.

## CI

On every pull request, the **Validate** job runs [`validateVersionPlans.mjs`](../tools/ci/validators/validateVersionPlans.mjs). For each publishable package with meaningful source changes, it passes when either:

- a pending version plan names the package or its release group, or
- the package's `package.json` version already changed in the branch, meaning you released in the PR.

Documentation, tests, stories, and Figma bindings never require a plan. If a package should not be published at all, add `"private": true` to its `package.json`.

## Things worth knowing

- `.nx/` is gitignored except for `/.nx/version-plans`, so plan files are tracked while the nx cache, workspace data, and daemon files are not.
- Conventional-commit inference is off. The version plan is the only thing that determines the bump, so a `feat:` or `fix:` prefix on your commit has no effect on versioning.
- `nx release` does not commit, tag, or push. It only edits files, and you commit them yourself. CI cannot push to `master`, so there is no automated release workflow.
- `yarn release` is the one script worth keeping as a wrapper, because it supplies `--skip-publish`. That flag cannot be set in `nx.json`, and without it `nx release --yes` would publish to npm straight from your machine. Publishing belongs to [`publish.yml`](../.github/workflows/publish.yml), which runs once your version bump lands on `master`.
- `updateDependents` is set to `never`. Releasing `utils` does not cascade a bump into the packages that depend on it. Internal dependencies use the `workspace:^` protocol, so no version ranges need rewriting.
- Generated changelog entries omit commit authors and commit references, and each package keeps its own `CHANGELOG.md`. There is no workspace-level changelog.
- New entries are prepended to the top of `CHANGELOG.md`, which is why each file's title and registry link live in a footer at the bottom.
- `packages/illustrations/CHANGELOG.md` is the one exception, and still keeps its title in a header. The illustrations Figma sync lives in the internal `frontend/cds` repo and splices its entry in at the `<!-- template-start -->` marker, so removing that marker would make the sync silently write nothing. Give that file the same footer treatment once the sync is ported into this repo or updated to write a version plan.
