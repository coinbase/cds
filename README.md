# Coinbase Design System

<p align="center">
  <img src="apps/docs/static/img/docusaurus-social-card.jpg" alt="Coinbase Design System">
</p>

Welcome to the Coinbase Design System (CDS)!

Please visit our website https://cds.coinbase.com for the latest documentation.

## Setup

1. **Clone the repository**

```sh
git clone git@github.com:coinbase/cds.git
cd cds
```

2. **Use the correct Node.js version**

We suggest [nvm](https://github.com/nvm-sh/nvm/tree/master) to manage Node.js versions. If you have it installed, you can use these commands to set our current Node.js version.

```sh
nvm install
nvm use
corepack enable
```

3. **Install dependencies**

```sh
yarn install
```

## Quick Start

Run one of the available apps to get started:

### Storybook (Web)

```sh
yarn nx run storybook:dev
```

### Documentation Site

```sh
yarn nx run docs:dev
```

### Mobile App

```sh
yarn nx run expo-app:ios
yarn nx run expo-app:android
```

See [apps/expo-app/README.md](apps/expo-app/README.md) for details.

## PR Preview Deployments

All pull requests automatically get a live preview of the documentation site deployed to GitHub Pages. This makes it easy to review documentation changes before merging.

**For PR Authors:** No setup required! Just open a PR and check the comments for your preview link.

**For Maintainers:** See [docs/pr-preview/](docs/pr-preview/) for setup and configuration.

## Contributing

We welcome contributions to the Coinbase Design System! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our development process, coding standards, and how to submit pull requests.

## Versioning

CDS generally follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

We aim to preserve type/public API compatibility across minor and patch releases.
Visual changes are allowed in minor releases.
Review changelog entries and validate UI when upgrading.

## Security

For information about reporting security vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the terms described in [LICENSE](LICENSE).
