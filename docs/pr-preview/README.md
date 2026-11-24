# PR Preview Deployment System

Automatically deploys live previews of documentation and Storybook for every pull request.

---

## Quick Start

### For PR Authors

1. Open a PR
2. **Check the preview checkboxes** in PR description:
   - `- [x] Deploy documentation preview`
   - `- [x] Deploy Storybook preview`
3. Wait ~3-5 minutes
4. Check PR comments for preview links
5. Previews auto-update on new commits
6. Auto-cleanup on PR close

### For Maintainers

**One-time setup:**

1. Enable GitHub Pages (Settings → Pages → gh-pages branch, root folder)
2. Test locally: `yarn preview:selector:test`
3. Open a test PR to verify end-to-end

---

## How It Works

```
PR opened → Check checkboxes → Build selected previews → Deploy to gh-pages → Post links → Clean up on close
```

**Storage:** All builds stored in `gh-pages` branch:

- Selector: `/` (root)
- Docs: `/pr-{number}/docs/`
- Storybook: `/pr-{number}/storybook/`

**URLs:**

- Selector: `https://coinbase.github.io/cds/`
- Docs: `https://coinbase.github.io/cds/pr-{number}/docs/`
- Storybook: `https://coinbase.github.io/cds/pr-{number}/storybook/`

---

## Components

**1. GitHub Actions Workflows**

- `preview-deploy.yml` - Deploys on PR open/update
- `preview-cleanup.yml` - Cleans up on PR close
- `preview-manual-cleanup.yml` - Manual cleanup tool

**2. PR Selector App** (`apps/preview-selector`)

- React + TypeScript with CDS components
- Search, filter, and sort PRs
- Links to docs and storybook

**3. Helper Scripts** (`.github/scripts/`)

- `update-manifest.mjs` - Updates manifest
- `remove-from-manifest.mjs` - Removes from manifest
- `clean-manifest.sh` - Cleanup tool

---

## Configuration

### Docusaurus BaseUrl

```typescript
// apps/docs/docusaurus.config.ts
baseUrl: process.env.BASE_URL || '/',
```

Workflow sets: `BASE_URL=/cds/pr-{number}/docs/`

### Image Paths

Use `useBaseUrl` for absolute paths:

```typescript
import useBaseUrl from '@docusaurus/useBaseUrl';

const baseUrl = useBaseUrl('/');
<img src={`${baseUrl}img/logo.svg`} />
```

**Example:** `apps/docs/docs/home/Home.tsx`

---

## Local Testing PR Selector APP

```bash
# Test docs build
yarn preview:build-test
yarn preview:serve-test

# Develop selector with mock data
yarn preview:selector:dev

# Test selector with mock data
yarn preview:selector:test
```

**Mock data:** Edit `apps/preview-selector/src/mockData.ts`

---

## Troubleshooting

### Preview not deploying

- Check workflow logs in Actions tab
- Verify checkboxes are checked
- Ensure workflow completed successfully

### Images not loading

- Use `useBaseUrl` hook for all absolute image paths
- See `apps/docs/docs/home/Home.tsx` for example

### Selector showing old version

- Clear browser cache (Cmd+Shift+R)
- Wait 2-3 minutes for GitHub Pages rebuild
- Check gh-pages branch to verify files updated

### Clean up manifest

```bash
git checkout gh-pages
git pull origin gh-pages

# Edit manifest.json - remove unwanted entries

git add manifest.json
git commit -m "Clean up manifest"
git push origin gh-pages
git checkout -
```

## File Structure

```
.github/
├── PULL_REQUEST_TEMPLATE.md    # PR template with checkboxes
├── workflows/
│   ├── preview-deploy.yml      # Auto-deploy
│   ├── preview-cleanup.yml     # Auto-cleanup
│   └── preview-manual-cleanup.yml
└── scripts/
    ├── update-manifest.mjs
    ├── remove-from-manifest.mjs
    └── clean-manifest.sh

apps/
├── preview-selector/           # React selector app
│   ├── src/
│   │   ├── App.tsx
│   │   ├── types.ts
│   │   ├── mockData.ts
│   │   └── utils.ts
│   └── project.json
└── docs/
    ├── docusaurus.config.ts    # BASE_URL support
    └── docs/home/Home.tsx      # useBaseUrl example

docs/pr-preview/
└── README.md                   # This file
```
