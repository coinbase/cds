# Contributing to CDS

Thank you for your interest in contributing to the Coinbase Design System! While we are not actively soliciting contributions, we welcome issue reports and are open to reviewing pull requests from the community.

## Reporting Issues

If you encounter a bug, have a feature request, or notice something that could be improved, please [open an issue](https://github.com/coinbase/cds/issues/new). Include a clear description, steps to reproduce (for bugs), and screenshots if applicable.

## Development Setup

1. [Fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
2. Follow the [contributor setup guide](docs/setup.md) for Node, Gradle, or Xcode
3. [Setup a GPG key](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key) for signing commits

The [contributor hub](docs/README.md) also covers validation commands and CI behavior.

## Making Changes

CDS has separate implementations for web, React Native, native Android, and native iOS. When
fixing bugs or adding features, check whether the change applies to more than one platform. See
all available [packages](https://github.com/coinbase/cds/tree/master/packages).

When making changes:

- Update [documentation](https://github.com/coinbase/cds/tree/master/apps/docs) if appropriate
- Update [Storybook](https://github.com/coinbase/cds/tree/master/apps/storybook) if there are visual changes
- Add or update tests
- Follow the [testing and validation guide](docs/testing.md) for every changed project

## Submitting a Pull Request

### From a Forked Repository

1. Ensure your fork is up to date with the upstream `master` branch
2. Create a new branch from `master` for your changes
3. Push your branch to your fork
4. Open a pull request from your fork's branch to `coinbase/cds:master`
5. Fill out the PR template completely

For detailed instructions, see [GitHub's guide on creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).

### PR Title Convention

PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>
```

**Examples:**

- `feat: add new Button variant`
- `fix: resolve ListCell tap handler issue on mobile`
- `chore: update dependencies`

### PR Requirements

Fill out the [pull request template](https://github.com/coinbase/cds/blob/master/.github/PULL_REQUEST_TEMPLATE.md) completely, including:

- What changed and why
- Before/after screenshots for UI changes
- How it was tested (unit tests, manual testing on web/iOS/Android)

### Version and Changelog

Versioning and release procedures differ by package and toolchain. Follow the
[versioning and release guide](docs/release.md); do not apply Node release commands to native
Android or native iOS artifacts.

CDS versions packages with [nx release version plans](docs/release.md). Instead of editing `package.json` and `CHANGELOG.md` by hand, you commit a small markdown file describing your change, and `nx release` derives the version bump and changelog entry from it.

Use the [Versioning section in README](README.md#versioning) when choosing whether a change is major, minor, or patch.

```sh
# Write a version plan describing your change
yarn nx release plan
```

The generator will prompt you for:

- **Changed package(s)** (web, mobile, common, etc.)
- **Type of change** (major, minor, or patch)
- **Changelog message**

Then apply the plan, which writes the new version and changelog entry:

```sh
yarn release
```

Commit both the plan and the resulting `package.json` and `CHANGELOG.md` changes. CI fails if you changed a publishable package without either a version plan or a version bump.

See [the release guide](docs/release.md) for the full workflow, including how to defer a release to a later batch.

### Review

Request a review from a maintainer, who will trigger CI and review your changes.

---

Thank you for contributing to CDS! If you have questions, feel free to open an issue for discussion.
