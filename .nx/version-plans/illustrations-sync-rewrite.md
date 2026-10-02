---
illustrations: patch
---

Rewrite the `sync-illustrations` tooling as source → engine → sinks, fixing the rename, gradient-fill and short-hex handling of the old script, and regenerate `manifest.json` in the new keyed format. Internal tooling and devDependency changes only; the published `esm`/`dts` output is unchanged for consumers.
