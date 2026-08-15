---
name: cds-migrator-transform
description: |
  Use when a CDS change in **cds-web**, **cds-common**, **cds-mobile**, **web-visualization**, or
  **mobile-visualization** needs a **jscodeshift** migration in `packages/migrator` to update callers or
  mitigate breaking API or import moves (add or change a transform, tests, or preset entry).
allowed-tools: Read, Grep, Glob, StrReplace, Bash(yarn nx run:*), call_mcp_tool
argument-hint: '<symbol or API change> — <target behavior> — [preset or standalone] — [web|mobile|both] — [optional: Sourcegraph scope / repos / queries the user supplies]'
---

# CDS migrator transform (jscodeshift)

Adds or updates a **jscodeshift** transform under `packages/migrator/src/transforms/`.

**Where to put files** is **not** always a “version” folder. Choose a subdirectory (or root) that fits the work:

- **Major / preset migrations** often use a version-style folder (`v9/`, `v10/`, …) aligned with a preset such as `v8-to-v9`.
- **Other codemods** (rename, internal API move, one-off cleanup) can live under any clear grouping the team agrees on (`v9/` still, a feature folder, or directly under `transforms/`).

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
3. **Both** with **different** replacement rules (e.g. `DimensionValue` → web local alias vs RN import): **two** transforms (`…-web.ts`, `…-mobile.ts`).
4. **Both** with **identical** AST changes: one transform is enough.

Document in the transform file header **what** is migrated and **what is not** (re-exports, `require`, dynamic import, etc.).

---

## 3 — Research usage (Sourcegraph + repo)

1. **Inputs from the user**: They should supply what to look for—symbol names, old/new APIs, repos or orgs to include, example file paths, or concrete Sourcegraph queries. **Follow that source of truth**; do not rely on fixed query templates in this skill.
2. **Sourcegraph MCP**: Run searches and fetches using the user’s queries and scope. Read MCP tool schemas first. Use `sourcegraph_fetch_file` when line previews are not enough.
3. **This monorepo**: Supplement with `grep` / `Glob` under `packages/` when the migration touches CDS itself or when the user asks for in-repo usage.

Record a short list of **patterns you actually saw** in the results (import style, re-exports, edge cases)—derived from discovery, not from a checklist in this doc.

**OSS hygiene**: Research may reference internal repos or paths. Anything **committed** to this repo (fixtures, test comments, JSDoc) must stay **generic**: neutral component names, no internal hostnames or file paths, no product codenames. Describe fixtures as “representative pattern” or “composite example” only—see §6.

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

- Default export: `export default function transformer(file, api, options)` (required by jscodeshift; `no-restricted-exports` is off for `packages/migrator/src/transforms/**/*.ts` in root `eslint.config.mjs`).
- Import **`transformLogger`**, **`addTodoComment`**, **`hasMigrationTodo`** from `transform-utils`. Typical depths: **`../../utils/transform-utils`** from `transforms/<subdir>/<name>.ts`; **`../utils/transform-utils`** from `transforms/<name>.ts`. If you nest deeper under `transforms/`, add one `../` per extra level.
- **Package scope from jscodeshift `options`**: When matching or rewriting **`@<scope>/cds-…`** import paths, use **`getPackageScopeFromOptions(options)`** from **`../../utils/package-scope`** (same depth pattern as `transform-utils`). The cds-migrator CLI forwards **`--packageScope`** / **`-ps`** into `options.packageScope` (`coinbase` or `@coinbase` both normalize to `@coinbase`). **If set**, only rewrite modules under that scope; **if omitted**, match any scope (e.g. regex like `@…/cds-common/…`). State this in the transform’s file header so consumers know they can narrow runs. Reference: `packages/migrator/src/transforms/v9/migrate-use-merge-refs.ts` and `packages/migrator/src/utils/package-scope.ts`.
- **Import mappings from jscodeshift `options`**: When a transform matches imports by their source path, **apply import mappings before running the regex** so that consumers who proxy CDS through a wrapper package (e.g. `@acme/shared/cds → @coinbase/cds-web`) are also covered. Use **`getImportMappingsFromOptions(options)`** and **`applyImportMappings(src, rewrites)`** from **`../../utils/import-mapping`** (same depth pattern as `transform-utils`). The CLI passes mappings via **`--import-mapping '<from>=<to>'`** (repeatable flag) or via a **`cds-migrator.config.json`** file at the repo root / target path (`"importMappings": [{ "from": "...", "to": "..." }]`); CLI values win on conflicts. Apply the rewrite only for **matching**—never mutate the actual `source.value` in the AST unless the transform is explicitly rewriting import paths. Reference: `packages/migrator/src/transforms/v9/button-variant-values.ts` and `packages/migrator/src/utils/import-mapping.ts`.
- Prefer **constants** and small helpers in the transform file. Use **`packages/migrator/src/utils/`** for shared plumbing (logging, package scope, import mappings, import helpers); keep **migration-specific** rules and rewrites in the transform itself rather than in extra modules that only exist to share logic between codemods.
- **Idempotency**: second run should no-op when migration is complete.
- **TODO path**: for dynamic or ambiguous AST, insert a standard CDS migration TODO via `addTodoComment` and log with `transformLogger.warn`.

Reference examples in-repo: `transforms/v9/` (`migrate-use-merge-refs.ts`, `button-variant-values.ts`, `migrate-layout-types-*.ts`).

---

## 6 — Tests and fixtures

**Goal**: exhaustive **behavior** coverage with **minimal** on-disk goldens. Follow what `transforms/v9/__tests__/` does today.

### Inline-first (default)

1. **Test file**: `packages/migrator/src/transforms/<subdir>/__tests__/<name>.test.ts`.
2. **Most cases** live **inline** as string sources. Prefer **`runInlineTest(transform, options, { path: '…', source: \`…\` }, expectedString, tsxTestOptions)`** from **`jscodeshift/src/testUtils`** for the full transformed output (or **`''`** when the codemod should no-op). Avoid **`applyTransform`** + fragment `expect`s unless there is a rare reason not to pin an exact golden.
3. **Imports**: **`tsxTestOptions`** from **`../../../test-utils/codemodTestUtils`** (path depth matches one `__tests__/` folder under `transforms/<subdir>/`). That module currently exports only **`tsxTestOptions`** (`{ parser: 'tsx' }`).
4. Mock **`console.log` / `console.warn`** when transforms log during tests (see existing v9 tests).

Cover: patterns from the user’s research, **idempotency**, **no-op** when nothing migrates, **scope-aware** behavior (`packageScope` / `-ps`) via `runInlineTest(transform, { packageScope: '@coinbase' }, …)`.

### Paired file fixtures (sparingly)

Use **at most one or two** paired **`foo.input.tsx` / `foo.output.tsx`** per transform suite for **larger composite** examples (multi-import layouts, full component excerpts). Everything else stays inline.

1. **Directory**: `packages/migrator/src/transforms/<subdir>/__testfixtures__/<suite-name>/` (e.g. `<suite-name>` matches the transform id: `button-variant-values`, `migrate-use-merge-refs`).
2. **Run paired tests** with **`runTest(__dirname, '<transform-name>', {}, '<suite-name>/<base>', tsxTestOptions)`** — the prefix is **`suite-folder/base`** without extension.
3. **List E2E cases explicitly** in the test file, e.g. `const E2E_PAIRED_PREFIXES = ['button-variant-values/e2e-survey-confirmation-panel', …] as const` and **`it.each(E2E_PAIRED_PREFIXES)('%s', (prefix) => { runTest(…); })`**. Do not assume a filesystem discovery helper exists.

### OSS-safe comments

- Fixture files and test JSDoc must **not** cite internal hosts, confidential repos, real consumer file paths, or product-specific component names used in research.
- Prefer short comments like **“Representative pattern: …”** or **“Composite … props”** and **fictional** export names (`SurveyConfirmationPanel`, `ChatToolbarActions`, not internal codenames).
- Sourcegraph remains valuable **during development**; keep findings out of committed strings unless they are already public (e.g. this monorepo).

### Prettier

**`__testfixtures__` is in `.prettierignore`**—golden outputs must match the codemod’s **`toSource()`** exactly.

**Run until green**:

```bash
yarn nx run migrator:test --testPathPattern='<your-test-pattern>'
yarn nx run migrator:typecheck
yarn nx format:write --projects=migrator
# or format only non-fixture sources, e.g.:
# yarn nx format:write --files=<changed files excluding __testfixtures__>
yarn nx run migrator:lint
```

Reference tests: `transforms/v9/__tests__/button-variant-values.test.ts`, `migrate-use-merge-refs.test.ts`, `migrate-layout-types-web.test.ts`, `migrate-layout-types-mobile.test.ts`.

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
- [ ] Tests: **inline cases** for edges + **0–2** paired E2E fixtures; **OSS-safe** names/comments; `migrator:test`, `migrator:lint`, and `migrator:typecheck` pass; formatting applied (non-fixture sources as needed).
- [ ] If the transform is preset-backed: manifest entry added and `file` matches the real path under `transforms/` (no mismatch between folder name and `file`). If standalone: team knows how to invoke it (CLI / docs).
- [ ] Transform header documents limitations (`export … from`, `require`, dynamic import, etc.).
- [ ] If the transform is **scope-aware**: behavior with and without `options.packageScope` / CLI `-ps` is documented and covered by tests where relevant.
- [ ] If the transform **matches import paths**: `applyImportMappings` is called before the regex so wrapper/re-exporting packages are handled; behavior with and without `--import-mapping` / `cds-migrator.config.json` is documented and covered by tests where relevant.
