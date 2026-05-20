# Changelog

## 1.0.0 (05/20/2026 PST)

Initial release of `@coinbase/cds-migrator`.

### ✨ New features

- **CLI** (`cds-migrate`) with interactive prompts, preset mode (`-p`), direct transform mode (`-t`), dry-run (`-d`), partial selection (`--partial`), package-scope filtering (`-ps`), and skip-confirmation (`--skip-confirmation`) flags.
- **Migration history** tracking via `.cds-migration-history.json` — prevents duplicate runs across the team. Clear with `--clear-history`.
- **`migration.log`** written after every run with a full record of successes, warnings, and manual TODOs.
- **`TODO(cds-migration):` comments** inserted automatically wherever a transform cannot safely rewrite code automatically.
- **`v8-to-v9-web` preset** — seven transforms for upgrading from CDS v8 to v9 on web:
  - `button-variant-values` — remaps `Button`/`IconButton` `variant` prop values: `tertiary → inverse`, `foregroundMuted → secondary`; flags dynamic expressions for manual review.
  - `migrate-use-merge-refs-import` — migrates `useMergeRefs` import from `@coinbase/cds-common/hooks/useMergeRefs` to `utils/mergeRefs`, renames the binding, and merges duplicate imports.
  - `migrate-layout-types-web` — migrates layout types from `@coinbase/cds-common` to `@coinbase/cds-web`.
  - `migrate-visualization-imports` — migrates `@coinbase/cds-web-visualization` imports to `@coinbase/cds-web/visualizations` sub-paths.
  - `migrate-interactable-css-vars` — renames `--interactable-*` CSS custom properties to `--inter-*` in JS/TS files.
  - `migrate-interactable-css-vars-css` — same rename in CSS/SCSS/HTML files.
  - `theme-provider-isolated` — adds the `isolated` prop to all `ThemeProvider` usages to preserve v8 CSS-variable injection behaviour.
- **`v8-to-v9-mobile` preset** — counterpart transforms for React Native.
- **Shared utilities** for transform authors: `transformLogger`, `addTodoComment`, `hasMigrationTodo`, `getPackageScopeFromOptions`.
- **Import mappings** (`--import-mapping`): teach transforms to recognise call sites that import CDS through a wrapper or re-exporting package. Pass `'<from>=<to>'` on the CLI (repeatable) or declare `importMappings` in a `cds-migrator.config.json` file at your repo root. CLI values win on conflicts; rewrites affect only import matching and never mutate the AST.
- **Repo config file** (`cds-migrator.config.json`): persist standing defaults (`packageScope`, `importMappings`) so every migration run picks them up automatically without extra flags. The file is resolved from the migration target path first, then from `cwd`.
