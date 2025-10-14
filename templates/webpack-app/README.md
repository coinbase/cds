# Coinbase Design System - Webpack Template

A customizable Webpack application template integrated with the Coinbase Design System (CDS).

## Installation

Use `gitpick` to create a new project from this template:

```sh
npx -y gitpick coinbase/cds/tree/master/templates/webpack-app cds-webpack
cd cds-webpack
```

## Setup

We suggest [nvm](https://github.com/nvm-sh/nvm/tree/master) to manage Node.js versions. If you have it installed, you can use these commands to set the correct Node.js version. Using corepack ensures you have your package manager setup.

```sh
nvm install
nvm use
corepack enable
yarn
```

## Development

- `yarn dev` - Run the app in development mode
- `yarn build` - Build the app for production
- `yarn start` - Run the production build

## Documentation

Visit [cds.coinbase.com](https://cds.coinbase.com) for the latest CDS documentation and component examples.
