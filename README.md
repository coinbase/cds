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
yarn nx run mobile-app:start
```

## Contributing

We welcome contributions to the Coinbase Design System! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our development process, coding standards, and how to submit pull requests.

## Security

For information about reporting security vulnerabilities, please see our [Security Policy](SECURITY.md).

## License

This project is licensed under the terms described in [LICENSE](LICENSE).
