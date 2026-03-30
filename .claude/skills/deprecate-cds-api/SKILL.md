---
name: deprecate-cds-api
description: |
  Deprecates a CDS component, hook, or other exported symbol with consistent JSDoc, version tags,
  and docsite metadata across every public export path (web, mobile, common, visualization), not only
  the original package. Use whenever the user asks to deprecate a CDS component or API, mark something
  as deprecated, add @deprecated / @deprecationExpectedRemoval, or update deprecation warnings in
  apps/docs metadata under components or hooks (webMetadata.json / mobileMetadata.json / metadata.json).
  Also use when replacing a component or hook and sunsetting the old one.
allowed-tools: Read, Grep, Glob, StrReplace
argument-hint: '<SymbolName or path> — replacement (e.g. Tabs) — [optional notes]'
---

# Deprecate CDS public API

Automate the standard CDS deprecation workflow for symbols exported from `packages/web`, `packages/mobile`, `packages/common`, `packages/web-visualization`, or `packages/mobile-visualization`.

## Inputs to confirm first

1. **What is being deprecated?** Component name, hook, prop, or other exported symbol.
2. **What should consumers use instead?** The replacement must be named in JSDoc and in docs `warning` text.

---

## Step 0 — Discover every public export (all packages)

**Deprecate the symbol everywhere it is publicly reachable**, not only where it is first implemented.

1. For each CDS package (`web`, `mobile`, `common`, `web-visualization`, `mobile-visualization`), trace the symbol from that package’s `package.json` **`exports`** map → barrel / `index` files → the module that declares or re-exports the symbol.
2. **`Grep`** for the symbol name under `packages/<name>/src` (e.g. `export { Foo`, `export * from`, `Foo as`) to catch re-exports and alternate entry paths.
3. **Every** package that publicly exports the symbol must end up with deprecation coverage: primary implementation **and** any re-export site where your tooling or consumers would not see JSDoc from the source file (add JSDoc on the re-export line or duplicate the tags as needed so imports from `@coinbase/cds-web`, `@coinbase/cds-mobile`, `@coinbase/cds-common`, etc. all surface the deprecation).

Do **not** skip a package because the symbol is “originally” defined elsewhere—if consumers can import it from that package, it must be deprecated there too.

---

## Step 1 — JSDoc on the deprecated symbol

Add or extend JSDoc immediately above the deprecated export (component, function, type alias, const, interface field, etc.).

Use the **standard JSDoc tag `@deprecated`** (not `@deprecate`).

**Required shape:**

```ts
/**
 * …existing description if any…
 *
 * @deprecated <Clear guidance referencing the replacement>. This will be removed in a future major release.
 * @deprecationExpectedRemoval v<NEXT_MAJOR>
 */
```

Rules:

- The `@deprecated` line must end with exactly: `This will be removed in a future major release.` (same sentence as the rest of the deprecation message, as in existing CDS examples).
- `@deprecationExpectedRemoval` must be a single token like `v9` (lowercase `v` + major number only, no minor/patch).

---

## Step 2 — Next major version for `@deprecationExpectedRemoval`

**`packages/web`, `packages/mobile`, and `packages/common` always share the same semver.** Read the **`version`** field from any one of `packages/web/package.json`, `packages/mobile/package.json`, or `packages/common/package.json` — they match.

1. Take **`version`** (e.g. `8.60.0`).
2. Let **current major** be the first segment (`8` in `8.60.0`).
3. Set **`NEXT_MAJOR = current major + 1`** and use `@deprecationExpectedRemoval v<NEXT_MAJOR>` (e.g. current `8.x` → `v9`).

For symbols owned only by **`packages/web-visualization`** or **`packages/mobile-visualization`**, read that package’s `package.json` instead (those packages version independently from web/mobile/common).

---

## Step 3 — Consistency across export surfaces

- Use the **same** `@deprecated` guidance and **`@deprecationExpectedRemoval v<N>`** value everywhere the symbol is exported (adjust wording only if a platform’s API genuinely differs).
- **Components** and **hooks** that exist as separate web and mobile implementations: deprecate **both** when both packages export the symbol.
- **Shared** symbols in `packages/common` that are **also** re-exported from web or mobile: follow Step 0 — ensure deprecation is visible on **every** public import path (common barrels **and** web/mobile re-exports if applicable).
- **Visualization** packages: same rules whenever those packages export the symbol.

---

## Step 4 — Docsite metadata (`apps/docs/docs`)

Only when the symbol has **existing** docs under the docs app. **Do not** add new doc folders unless the docs workflow already expects them.

### Components (`apps/docs/docs/components/`)

1. Locate the folder, e.g. `apps/docs/docs/components/<category>/<ComponentName>/`.
2. If present, edit **`webMetadata.json`** and/or **`mobileMetadata.json`** (some components have both; some only one).
3. Add or update the top-level **`warning`** string:

```json
"warning": "This component is deprecated. Please use {replacement} instead."
```

Examples:

- `"Please use Tabs instead."`
- `"Please use MediaCard instead."`

Match the tone of existing deprecations when the replacement is not a single component name (e.g. “Use indeterminate ProgressCircle for loading indicators instead.”) — still keep the opening: **This component is deprecated.**

### Hooks (`apps/docs/docs/hooks/`)

1. Locate the hook folder, e.g. `apps/docs/docs/hooks/<hookName>/`.
2. Hooks may use **`webMetadata.json`** and **`mobileMetadata.json`**, or a single shared **`metadata.json`** — update whichever file(s) exist for that hook.
3. Add or update the top-level **`warning`** string using **hook** wording:

```json
"warning": "This hook is deprecated. Please use {replacement} instead."
```

Use the same `{replacement}` phrasing as in JSDoc. If the replacement is not a single hook name, adapt the sentence but keep the opening: **This hook is deprecated.**

---

## Step 5 — Verification checklist

- [ ] Every **public export path** across packages that expose the symbol has been found (Step 0) and carries deprecation (implementation and re-exports as needed).
- [ ] `@deprecated` includes replacement guidance and the exact closing sentence about future major removal.
- [ ] `@deprecationExpectedRemoval v<N>` reflects **next major** from current version (any of web/mobile/common `package.json` for core CDS; visualization packages use their own `package.json`).
- [ ] **Web + mobile** implementations and metadata (when applicable) are updated; nothing skipped because the symbol was “only” defined in common or another package.
- [ ] `warning` in metadata matches the replacement story: **this component is deprecated** for component docs, **this hook is deprecated** for hook docs (`apps/docs/docs/hooks/`).

---

## Reference examples in-repo

- JSDoc: search for `@deprecationExpectedRemoval` under `packages/web/src` (e.g. `TabNavigation.tsx`, `Spinner.tsx`).
- Metadata: search for `"warning": "This component is deprecated` under `apps/docs/docs/components`; hook docs live under `apps/docs/docs/hooks/` (use **This hook is deprecated** for hook `warning` text).
