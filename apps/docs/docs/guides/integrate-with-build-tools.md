---
id: integrate-with-build-tools
title: Integrate With Build Tools
---

# Integrating with Build Tools

CDS is designed to seamlessly integrate with modern build tools for both web and React Native applications. This page provides guidance on configuring your build environment to fully leverage CDS's capabilities, such as CSS imports for web and optimized theming for React Native.

## Web Integration

### Prerequisites

Ensure your web project meets the following requirements:

- **Node.js**: Version 16 or later.
- **React**: Version 17 or later.
- **Build Tool**: Webpack, Vite, or similar.

### Enabling CSS Imports

CDS web components rely on static CSS files for styling, generated using [Linaria](https://github.com/callstack/linaria). Your build tool must support importing CSS files.

#### Webpack Configuration

If you're using Webpack, ensure the following loader is configured for CSS:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader', // Injects styles into DOM
          'css-loader', // Resolves CSS imports
        ],
      },
    ],
  },
};
```

#### Vite Configuration

For Vite, CSS imports work out of the box. If you have a custom setup, ensure the `vite-plugin-css` plugin is included:

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      css: {},
    },
  },
});
```

### Using the ThemeProvider

Wrap your application with the `ThemeProvider` to apply theming:

```tsx
import { ThemeProvider } from '@cbhq/cds-web';
import App from './App';

ReactDOM.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
```

## React Native Integration

### Prerequisites

Ensure your React Native project meets the following requirements:

- **React Native**: Version 0.64 or later.
- **Metro Bundler**: Included with React Native.

### Theming Setup

CDS uses a React Context for theming in React Native. Install the CDS mobile package:

```bash
npm install @cbhq/cds-mobile
```

Wrap your application with the `ThemeProvider`:

```tsx
import { ThemeProvider } from '@cbhq/cds-mobile';
import App from './App';

export default function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
```

### Customizing Metro Bundler

If you encounter issues with module resolution, update your `metro.config.js` file:

```javascript
const { getDefaultConfig } = require('expo/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    assetExts: [
      ...getDefaultConfig(__dirname).resolver.assetExts,
      'css', // Add support for .css files if needed
    ],
  },
};
```

## Common Issues and Solutions

### CSS Files Not Found (Web)

If you encounter an error like `Module not found: Can't resolve '*.css'`:

1. Ensure `css-loader` and `style-loader` are installed:
   ```bash
   npm install css-loader style-loader --save-dev
   ```
2. Verify your build tool configuration includes a CSS loader.

### ThemeProvider Errors (React Native)

If the `ThemeProvider` throws an error:

1. Ensure `@cbhq/cds-mobile` is installed.
2. Verify that the `ThemeProvider` wraps your root component.

### Incompatible Dependencies

If you encounter dependency conflicts, ensure your project dependencies match the supported versions for CDS:

- React: `>=17.0.0`
- React Native: `>=0.64.0`
- Node.js: `>=16.0.0`

## Optimizing Builds

### Tree Shaking

CDS components are designed to be tree-shakable. To ensure unused components are removed from your production bundle:

- Use the `import` syntax to import components individually:

  ```tsx
  import { Button } from '@cbhq/cds-web';
  ```

- Enable tree shaking in your build tool configuration (e.g., Webpack’s `mode: 'production'`).

### Minification

Use tools like Terser for JavaScript minification and CSSNano for CSS minification to reduce the size of your production build.

## Best Practices

- **Use the Latest Version**: Keep CDS and its dependencies up to date to benefit from new features and bug fixes.
- **Verify Compatibility**: Test your build after integrating CDS to ensure all configurations are working as expected.
- **Monitor Bundle Size**: Use tools like Webpack Bundle Analyzer to check for any unexpected increases in bundle size.

## Next Steps

- [Styling](#): Learn how to style components using `StyleProps`.
- [API Overview](#): Explore the full range of CDS utilities and APIs.
- [Theming](#): Understand how to customize your application’s theme.

Seamlessly integrate CDS with your build tools and unlock the power of the Coinbase Design System to create performant and visually consistent applications!
