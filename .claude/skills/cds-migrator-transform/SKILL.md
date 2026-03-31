---
name: cds-migrator-transform
description: |
  End-to-end workflow for adding a jscodeshift migration to packages/migrator: clarify symbol and
  target behavior, decide web vs mobile vs shared transforms, research real usage with Sourcegraph MCP,
  split automatable vs manual cases (confirm with user), implement codemods and TODO markers, add
  fixtures and tests, register presets when applicable. Use when the user asks to add a CDS migrator
  transform, codemod, jscodeshift migration, major-upgrade migration (e.g. v8-to-v9), or a
  **standalone** codemod not tied to a version bump. Also when migrating consumer imports/APIs for a
  CDS release.
allowed-tools: Read, Grep, Glob, StrReplace, Bash(yarn nx run:*), call_mcp_tool
argument-hint: '<symbol or API change> — <target behavior> — [preset or standalone] — [web|mobile|both] — [optional: Sourcegraph scope / repos / queries the user supplies]'
---

# CDS migrator transform (jscodeshift)

Adds or updates a **jscodeshift** transform under `packages/migrator/src/transforms/`.

**Where to put files** is **not** always a “version” folder. Choose a subdirectory (or root) that fits the work:

- **Major / preset migrations** often use a version-style folder (`v9/`, `v10/`, …) aligned with a preset such as `v8-to-v9`.
- **Other codemods** (rename, internal API move, one-off cleanup) can live under any clear grouping the team agrees on (`v9/` still, a feature folder, or directly under `transforms/` like `example-transform.ts`).

Follow the steps in order unless the user already locked scope.

## Prerequisites

- **Nx + yarn**: run migrator commands as `yarn nx run migrator:<target>` (see repo `AGENTS.md`).
- **Sourcegraph MCP (strongly recommended)**: Before calling Sourcegraph tools, read the tool schema under `mcps/user-sourcegraph/tools/` (e.g. `sourcegraph_search.json`, `sourcegraph_fetch_file.json`). If Sourcegraph is not configured, tell the user to add the **Sourcegraph** MCP server in Cursor MCP settings and authenticate if required, then continue with workspace `grep` or whatever source the user provides. **Do not invent search queries or repo filters in this skill**—use the symbols, repositories, queries, or links the **user** gives you; if they omitted search context, ask what to search before assuming scope.

---

## 1 — Define the migration

Capture explicitly:

1. **Symbol(s)** to migrate (export name, import path, prop name, type name, etc.).
2. **Desired outcome**: rename, change import path/module, replace expression, map enum/string values, add local type alias, etc.
3. **Preset (if any) and on-disk location**: whether this ships in a preset (`packages/migrator/src/presets/<preset>/manifest.json`) or runs **only via `-t <name>`** without a preset entry. Pick the directory under `transforms/` for the new files (versioned `v9/` / `v10/`, or another name, or `transforms/` root). **Align the manifest `file` field with that path** when you add an entry (see step 7).

If anything is ambiguous, ask the user before coding.

---

## 2 — Platform scope: one transform or two?

1. **Web-only** (e.g. CSS, DOM, `@coinbase/cds-web`): single transform, typically under `transforms/<subdir>/<name>-web.ts` or a neutral name if only web is affected.
2. **Mobile-only** (e.g. React Native, `@coinbase/cds-mobile`): single transform for mobile.
3. **Both** with **different** replacement rules (e.g. `DimensionValue` → web local alias vs RN import): **two** transforms (`…-web.ts`, `…-mobile.ts`) plus optional **`…-shared.ts`** for pure helpers (no jscodeshift import in shared if workers load it—keep shared logic environment-safe; follow existing layout-type splits).
4. **Both** with **identical** AST changes: one transform is enough.

Document in the transform file header **what** is migrated and **what is not** (re-exports, `require`, dynamic import, etc.).

---

## 3 — Research usage (Sourcegraph + repo)

1. **Inputs from the user**: They should supply what to look for—symbol names, old/new APIs, repos or orgs to include, example file paths, or concrete Sourcegraph queries. **Follow that source of truth**; do not rely on fixed query templates in this skill.
2. **Sourcegraph MCP**: Run searches and fetches using the user’s queries and scope. Read MCP tool schemas first. Use `sourcegraph_fetch_file` when line previews are not enough.
3. **This monorepo**: Supplement with `grep` / `Glob` under `packages/` when the migration touches CDS itself or when the user asks for in-repo usage.

Record a short list of **patterns you actually saw** in the results (import style, re-exports, edge cases)—derived from discovery, not from a checklist in this doc.

---

## 4 — Case matrix and user confirmation

From research, build a table:

| Case | Example | Automate in codemod? | If not: strategy               |
| ---- | ------- | -------------------- | ------------------------------ |
| …    | …       | Yes / No             | TODO comment / skip / doc only |

**Stop and confirm with the user** which rows to automate vs leave manual/TODO-only before implementing non-trivial logic. Call out gaps that **their** search surfaced but the AST transform will not handle (re-exports, dynamic imports, etc., as applicable).

---

## 5 — Implement transforms

**Location**: `packages/migrator/src/transforms/<subdir>/<name>.ts`, or `transforms/<name>.ts` at the transforms root. The manifest `file` value (when used) must be the path **relative to `transforms/`** without extension, e.g. `v9/my-transform`, `v10/my-transform`, or `my-oneoff/my-transform`.

**Patterns**:

- Default export: `export default function transformer(file, api, options)`; eslint may require `// eslint-disable-next-line no-restricted-exports` for default export.
- Import **`transformLogger`**, **`addTodoComment`**, **`hasMigrationTodo`** from `transform-utils`. Typical depths: **`../../utils/transform-utils`** from `transforms/<subdir>/<name>.ts`; **`../utils/transform-utils`** from `transforms/<name>.ts`. If you nest deeper under `transforms/`, add one `../` per extra level.
- **Package scope from jscodeshift `options`**: When matching or rewriting **`@<scope>/cds-…`** import paths, use **`getPackageScopeFromOptions(options)`** from **`../../utils/package-scope`** (same depth pattern as `transform-utils`). The cds-migrator CLI forwards **`--packageScope`** / **`-ps`** into `options.packageScope` (`coinbase` or `@coinbase` both normalize to `@coinbase`). **If set**, only rewrite modules under that scope; **if omitted**, match any scope (e.g. regex like `@…/cds-common/…`). State this in the transform’s file header so consumers know they can narrow runs. Reference: `packages/migrator/src/transforms/v9/migrate-use-merge-refs.ts` and `packages/migrator/src/utils/package-scope.ts`.
- Prefer **constants** and small helpers; for shared module strings (e.g. allowed import sources), centralize in a `*-shared.ts` sibling when web/mobile share rules.
- **Idempotency**: second run should no-op when migration is complete.
- **TODO path**: for dynamic or ambiguous AST, insert a standard CDS migration TODO via `addTodoComment` and log with `transformLogger.warn`.

Reference examples in-repo: major-style folder `transforms/v9/` (`migrate-use-merge-refs.ts`, `button-variant-values.ts`, `migrate-layout-types-*.ts`); root-level `example-transform.ts` shows a transform not under a version subfolder.

---

## 6 — Tests and fixtures

1. **Fixtures directory**: colocate with the transform, e.g. `packages/migrator/src/transforms/<subdir>/__testfixtures__/<suite-name>/` with paired `*.input.tsx` and `*.output.tsx` (names aligned with scenario). Deeper trees may need different relative paths in tests.
2. **Tests**: `packages/migrator/src/transforms/<subdir>/__tests__/<name>.test.ts` using `readTransformFixture` from `../../../test-utils/readTransformFixture` when `__tests__/` is one level under `transforms/<subdir>/` (three hops up to `src/`). **Re-check** `readTransformFixture` and any local imports if `<subdir>` depth changes.
3. Mock **`console.log` / `console.warn`** if transforms log during tests (see existing migrator tests).
4. Cover: happy paths that match **patterns the user’s research identified**, every scope or import shape they asked you to support, idempotency, no-op when nothing to migrate, edge cases the user approved. For **scope-aware** transforms, pass **`packageScope`** in the third argument to `applyTransform` when testing the narrowed behavior (e.g. `applyTransform(transform, { packageScope: '@coinbase' }, { source }, { parser: 'tsx' })`).
5. **`__testfixtures__` is in `.prettierignore`**—outputs must match the codemod exactly; do not rely on Prettier rewriting fixtures.

**Run until green**:

```bash
yarn nx run migrator:test --testPathPattern='<your-test-pattern>'
yarn nx run migrator:typecheck
yarn nx format:write --files=<changed non-fixture files>
```

---

## 7 — Preset manifest

**Only if** this codemod should appear in a preset (major upgrade bundle, curated migration set, etc.): add an entry to `packages/migrator/src/presets/<preset>/manifest.json`:

- **`name`**: stable CLI identifier.
- **`description`**: short, user-facing.
- **`file`**: path relative to `transforms/` without extension—must match where the file actually lives (e.g. `v9/my-transform`, `v10/my-transform`, or `some-group/my-transform`).

**Non-version / standalone codemods** may **omit** the preset entirely and still be run with the migrator CLI (e.g. `-t <name>`). See `packages/migrator/docs/PRESETS_AND_TRANSFORMS.md`. If omitted from any preset, say so in the PR/summary.

---

## Checklist (before finishing)

- [ ] User confirmed automatable vs manual cases.
- [ ] Web/mobile split matches real replacement behavior.
- [ ] Coverage matches **sources, scopes, and cases** the user specified (anything out of scope is documented).
- [ ] Tests + fixtures added; `migrator:test` and `migrator:typecheck` pass; formatting applied to non-fixture sources.
- [ ] If the transform is preset-backed: manifest entry added and `file` matches the real path under `transforms/` (no mismatch between folder name and `file`). If standalone: team knows how to invoke it (CLI / docs).
- [ ] Transform header documents limitations (`export … from`, `require`, dynamic import, etc.).
- [ ] If the transform is **scope-aware**: behavior with and without `options.packageScope` / CLI `-ps` is documented and covered by tests where relevant.
