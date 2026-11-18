---
illustrations: patch
---

Make `sync-illustrations` validate before it publishes. Sinks now `plan` their changes first, the Android sink rejects `pathData` over aapt2's 32,767-character resource string limit with an actionable per-illustration report, and the run publishes the illustrations that validate while exiting nonzero for the rest. New flags: `--dry-run` (full validation, no writes) and `--all-or-nothing` (a sink with any failed illustration publishes nothing). Internal tooling only; the published `esm`/`dts` output is unchanged for consumers.
