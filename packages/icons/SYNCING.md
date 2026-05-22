# Syncing Icons

**WARNING: FOLLOW THESE INSTRUCTIONS EXACTLY. Copy and paste these commands directly into your terminal, editing them with the current date as necessary. DO NOT MESS AROUND.**

**IMPORTANT: If any icons are renamed or deleted, this is a BREAKING CHANGE. This MUST be published with an accompanying major version bump, migration guide, and a migrator script.**

1. Retrieve the team Figma API key from the [config service](https://config.cbhq.net/infra-buildkite-prod-use1/actions-context/frontend/cds-production?tab=active&q=figma-analytics-access-token) and set it in your environment

```sh
export FIGMA_ACCESS_TOKEN=VALUE-FROM-CONFIG-SERVICE
```

2. Make sure this repo has no uncommitted changes — the sync script will fail if it does

```sh
git status
```

3. Install dependencies

```sh
nvm use
yarn install
```

4. Run the icon sync script. The script will create a new `icons/YYYY-MM-DD` branch from `origin/master`, sync the icons from Figma, then commit and push the branch automatically

```sh
yarn nx run icons:sync-icons
```

5. Open a PR in [github.com/coinbase/cds](https://github.com/coinbase/cds). Title the PR exactly the same as the commit message: `feat: Publish icons YYYY-MM-DD`. Take note of the PR number for the next step

6. Update the icons package changelog by completing the prompts as shown below

```sh
yarn changelog icons
```

> - **Type of change?:** Choose **"Breaking"** for breaking changes, otherwise choose **"Update"**
> - **Changelog message?:** "Publish icons YYYY-MM-DD"
> - **PR number?:** Copy/paste your PR number
> - Skip the rest (press enter to use defaults)

7. Commit and push the changelog update to your PR

```sh
git add .
git commit -m 'Update changelog'
git push origin icons/YYYY-MM-DD
```

8. DM the icons DRI on Slack and share direct links to:

- the icon changelog in your PR
- the Web Visual Regression results in Percy

You can get the Percy link from the GitHub Actions "Visreg Web" job on your PR

9. Carefully review the two links you shared with the icons DRI. Does the changelog look correct? Do the visual regression results look correct?

**IMPORTANT: Breaking change releases are a big deal. They should be performed extremely rarely, and should ALWAYS be accompanied by a migration plan. You are responsible for any breaking changes that you release.**

10. DO NOT MERGE until the icons DRI has carefully reviewed and signed off on the changelog and the visual regression test results.

## Troubleshooting

**"There are no changes since the last update on XX/XX/XXXX"** — The script detected no icon changes in Figma since the last sync. Verify this is expected with design.

**Force a full re-sync** — If you need to re-sync all icons regardless of when they were last updated, pass the `--sync-all` flag:

```sh
yarn nx run icons:sync-icons -- --sync-all
```

**Repo is not clean** — The script requires a clean working tree. Stash or commit any pending changes before running the sync.
