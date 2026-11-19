---
icons: patch
illustrations: patch
---

Add a machine-readable report to the icons and illustrations syncs, and a Sync Figma Assets workflow that runs them and opens a pull request. Set `SYNC_REPORT_PATH` to write a JSON report of the changes and of the assets the sync rejected, with a Figma link and a fix for each. `sync-icons` now collects every malformed icon set instead of stopping at the first, and skips them rather than failing the sync. Internal tooling only; the published `esm`/`dts` output is unchanged for consumers.
