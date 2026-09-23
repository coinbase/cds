# PR Preview Selector

Modern React-based selector page for browsing PR preview deployments of the CDS documentation.

## Overview

This app provides a unified interface for viewing all active PR previews. It's deployed to the root of GitHub Pages and allows users to search, filter, and navigate to specific PR documentation and Storybook previews.

## Development

```bash
# Start dev server (with hot reload)
yarn nx run preview-selector:dev
# Opens at http://localhost:5173

# Build for production
yarn nx run preview-selector:build

# Preview production build
yarn nx run preview-selector:preview

# Type check
yarn nx run preview-selector:typecheck

# Test locally with mock data
yarn nx run preview-selector:test-local
```

## Mock Data for Development

The `public/manifest_mock.json` file contains mock PR data for local development.

The selector automatically uses:

- **Production:** `/cds/manifest.json` (real PR data from workflow)
- **Development:** `/cds/manifest_mock.json` (fallback when real manifest not found)

**Edit `public/manifest_mock.json` to test different scenarios:**

```json
{
  "previews": [
    {
      "pr": 123,
      "title": "Your PR title here",
      "previews": {
        "docs": "/cds/pr-123/docs/",
        "storybook": "/cds/pr-123/storybook/"
      }
    }
  ]
}
```

**Set `null` to hide a preview type:**

```json
"previews": {
  "docs": "/cds/pr-123/docs/",
  "storybook": null  ← Docs only, no storybook button
}
```

The dev server automatically serves `public/manifest_mock.json` at `/cds/manifest_mock.json`.

The selector tries to fetch `/cds/manifest.json` first (production), and falls back to `/cds/manifest_mock.json` (development) if not found.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CDS Components** - Uses `@coinbase/cds-web` for styling
- **Nx** - Integrated with monorepo tooling

## Structure

```
apps/preview-selector/
├── public/
│   └── manifest.json      # Mock data for local dev (EDIT THIS!)
├── src/
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Main component
│   ├── App.css            # Styles
│   ├── index.css          # Global styles
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Helper functions
│   └── vite-env.d.ts      # Vite type definitions
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── project.json           # Nx project config
├── package.json           # Dependencies
└── README.md              # This file
```

## Features

- 🔍 **Real-time search** - Filter PRs by number, title, branch, or author
- 📊 **Flexible sorting** - Sort by date or PR number
- 📱 **Responsive design** - Works on mobile and desktop
- 🎨 **CDS-styled** - Uses real CDS components (ThemeProvider, VStack, Button, etc.)
- ⚡ **Fast** - Built with Vite for optimal performance
- 🎯 **Dual previews** - Separate buttons for docs and storybook

## How It Works

1. Fetches `manifest.json` from `/cds/manifest.json`
2. Displays all active PR previews
3. Provides search and sort functionality
4. Shows separate buttons for docs and storybook previews
5. Links to individual PR preview URLs

In production, the manifest is automatically maintained by GitHub Actions workflows.

## Local Development Tips

### Testing Different Scenarios

Edit `public/manifest_mock.json` to test:

**Scenario 1: PR with both previews**

```json
{
  "pr": 100,
  "previews": {
    "docs": "/cds/pr-100/docs/",
    "storybook": "/cds/pr-100/storybook/"
  }
}
```

Shows: 📄 Docs and 📚 Storybook buttons

**Scenario 2: Docs only**

```json
{
  "pr": 200,
  "previews": {
    "docs": "/cds/pr-200/docs/",
    "storybook": null
  }
}
```

Shows: 📄 Docs button only

**Scenario 3: Storybook only**

```json
{
  "pr": 300,
  "previews": {
    "docs": null,
    "storybook": "/cds/pr-300/storybook/"
  }
}
```

Shows: 📚 Storybook button only

**Scenario 4: Many PRs**
Add 10-20 PRs to test search/sort performance.

**Scenario 5: Special characters**

```json
{
  "pr": 400,
  "title": "Test \"quotes\" & <html> 🚀 special chars"
}
```

Tests XSS prevention and rendering.

### Hot Reload

The dev server watches for changes:

- Edit `public/manifest_mock.json` → Page auto-refreshes with new data
- Edit `src/App.tsx` → Hot module replacement
- Edit `src/App.css` → Instant style updates

## Deployment

The app is automatically built and deployed by GitHub Actions:

- **Source:** `apps/preview-selector/`
- **Build command:** `yarn nx run preview-selector:build`
- **Output:** `apps/preview-selector/dist/`
- **Deployed to:** gh-pages branch root
- **URL:** `https://coinbase.github.io/cds/`

## CDS Components Used

- `ThemeProvider` - Provides CDS theme
- `MediaQueryProvider` - Responsive breakpoints
- `VStack` / `HStack` / `Box` - Layout primitives
- `Text` - Typography with semantic colors
- `Button` - Primary and Secondary variants
- `TextInput` - Search input

All properly themed with `defaultTheme` and dark mode.

## Documentation

For complete system documentation, see: [../../docs/preview/README.md](../../docs/preview/README.md)
