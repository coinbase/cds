# sync-illustrations: design

This document explains how the illustration sync is built and why. For how to run it, token setup,
troubleshooting and scratch runs against the test fixture file, see
[`packages/illustrations/DOCS.md`](../../DOCS.md).

## What the sync does

Designers publish illustration components in a Figma library. The sync turns that library into the
contents of `packages/illustrations/src/__generated__`: SVG and PNG assets for the CDN, JS modules
for web and mobile, and the TypeScript data (`names`, `versionMap`, `descriptionMap`, `<Type>Name`
unions) the components and the docsite are built on. It writes an nx version plan so the package is
released with the right semver bump. It is run by hand, through the repo-level
`yarn sync-illustrations`, which wraps it in the git workflow and regenerates web's illustration
stories afterwards (see _Around the sync_ below).

Three facts shape the design:

1. **Consumers address assets by `type/name/version`.** Web builds CDN URLs from
   `versionMap` (`.../spotIcon/light/wallet-3.svg`), mobile requires `svgJs/cjs/light/wallet-3.js`
   through `svgJsMap`. Every file path is therefore a pure function of an illustration's `type`,
   `name` and `version`, and the version must change whenever the artwork changes so that CDN
   caches never serve stale content.
2. **Figma is the source of truth, the manifest is the memory.** Figma only tells us what exists
   now. To know what was added, changed, renamed or deleted since the last sync, and to keep version
   numbers monotonic, the sync persists `manifest.json` and reconciles against it.
3. **There is one light design; everything else is derived.** Design provides a light SVG using a
   fixed palette of 15 `illustration/*` color variables. Each destination derives what it needs from
   that SVG and the palette: the illustrations package makes a dark variant by swapping each palette
   color for its dark value and a themeable one by swapping it for `var(--illustration-<name>)`;
   another destination may want neither.

## Shape of the code

The sync is an **engine between a source and a set of sinks**, wrapped in a release workflow:

- an `IllustrationSource` answers three questions (what is published, give me these SVGs, what is
  the palette); Figma is the production implementation;
- `runSync` (the engine) reconciles what the source reports with the manifest of the previous run,
  plans each sink's changes and applies them; it knows nothing about Figma, file formats, theming,
  git or the CLI;
- a `Sink` is a destination — a package, a repository, a directory — and owns everything about how
  illustrations appear there; `IllustrationsPackageSink` is the one that exists today;
- `artifacts/` are pure helpers sinks build their files from: palette-color replacement, PNG
  rasterization, module wrappers, the TypeScript data files, a prettier-style printer;
- `index.ts` (the shell) is the nx target: config, CLI args, recording the run (manifest, version
  plan) and the summary. Git and other packages' concerns live outside, in the repo-level script.

Inside the engine the steps are plain functions over plain data, one module each. The two
abstractions, source and sink, sit exactly at the two places where the outside world varies.

```
index.ts                 shell: CLI args, version plan, manifest, summary
config.ts                the source, the sinks, paths, flags
sync.ts                  engine: runSync(source, manifest, sinks) -> SyncOutcome
  selectComponents.ts      dedupe, incremental filter    -> which nodes to download
  optimizeSvg.ts           svgo config, hex normalization, viewBox size
  hashSvg.ts               the manifest hash of the light SVG
  diffIllustrations.ts     reconcile fetched vs manifest -> IllustrationDiff
illustration.ts          the domain records: Component, Illustration, ColorPalette, sort orders
manifest.ts              read/write manifest.json
generateVersionPlan.ts   nx version plan markdown
mapConcurrently.ts       bounded-concurrency map
source/
  IllustrationSource.ts    the source contract
  FigmaSource.ts           production: fetchComponents + fetchSvgs + fetchColorPalette
  InMemorySource.ts        tests: plain data, mutated between runs
sinks/
  Sink.ts                  the sink contract: accepts, has, apply(SinkChanges)
  IllustrationsPackageSink.ts   src/__generated__ of this package
  files.ts                 write / remove / exists / relative import helpers
artifacts/
  paletteColors.ts         replacePaletteColors, toDarkSvg, toCssVariableSvg
  png.ts                   rasterizePng
  modules.ts               renderCjsModule, renderEsmModule, renderSvgJsMap, renderSvgEsmMap
  typescriptData.ts        renderNameType, renderNames, renderDescriptionMap, renderVersionMap
  source.ts                prettier-style printer for the generated TypeScript
__tests__/               tests + recorded Figma fixtures
```

### Data flow

```
                                   manifest.json ────────────────────────────┐
                                                                             │
source.listComponents() ─► selectComponents ─► source.fetchSvgs() ─► optimize + hash ─► diffIllustrations
                                 │                     ▲                                     │
source.fetchPalette() ───────────┼─────────────────────┼──────────────┐                      │
                                 │        sink.has() ──┘ (missing)    │                      ▼
                                 │                                    └──► per sink: SinkChanges
                                 │                                           { remove, write, illustrations, palette }
                                 │                                                           │
                                 │                                                   sink.apply(changes)
                                 │                                                           │
                                 └─ duplicates ─────────────────────────────► SyncOutcome ◄──┘
                                                                                  │
                                                       index.ts: version plan, manifest.json, summary
```

## The source (`source/`)

```ts
type IllustrationSource = {
  listComponents(): Promise<Component[]>; // cheap metadata for every published component
  fetchSvgs(nodeIds: string[], onProgress?): Promise<Map<string, string>>; // raw SVG exports
  fetchPalette(): Promise<ColorPalette>; // light + dark value per color
};
```

This is the complete surface the sync needs from the outside world. `FigmaSource` implements it
with three thin modules over `@cds/figma-api` (`/components`, `/images` + download, the Variables
API); nothing outside `source/` imports Figma types or clients.

The interface exists for testability, not polymorphism. With `InMemorySource` the **entire
pipeline runs inside jest**: a test constructs components and raw SVGs, runs `runSync` with the
real package sink into a temp directory, mutates the source the way a designer would (rename, delete,
re-draw, re-create a node, publish a duplicate name) and runs it again. Before the interface, those
behaviours could only be exercised against a published Figma library, which meant a manual
publish step between every mutation. The source returns _raw_ exports so that optimization, which
is part of the sync's behaviour, is covered by those tests too.

## The engine (`sync.ts`)

```ts
runSync({ source, manifest, outputs, cssVariablePrefix, syncAll, log }): Promise<SyncOutcome>

type SyncOutcome = { duplicates: Component[] } & (
  | { status: 'nothing-to-sync' } // no component updated since manifest.lastUpdated
  | { status: 'no-changes' } // downloaded, but every hash and description matched
  | { status: 'synced'; diff: IllustrationDiff; palette: ColorPalette }
);
```

The engine fetches, reconciles, plans and applies each sink, then hands back everything the caller
needs to record the run. It deliberately does **not** write the manifest or the version plan, touch
git, or read `process`: that keeps it callable from a test (or from another tool) with nothing but a
source, a manifest object and some sinks, and it makes `index.ts` the only module with side
effects on the repository.

## The `Illustration` record

```ts
type Illustration = {
  nodeId: string; // Figma node id
  type: string; // 'spotIcon'  (camelCased from the Figma name prefix "Spot Icon/…")
  name: string; // 'wallet'    (the Figma name suffix)
  description: string; // comma-separated keywords, drives docsite search
  hash: string; // sha256 of the optimized light SVG; a change bumps version
  version: number; // part of every asset file name
  width: number; // from the SVG viewBox
  height: number;
  createdAt: string; // preserved across node re-creation
  lastUpdated: string;
};
```

This is the only record that moves through the system: `diffIllustrations` produces it, the
manifest stores it, and sinks receive it. Notably it contains **no file paths**. Earlier
versions of the sync stored every output path in the manifest and rewrote those strings on rename
and re-version, which is where the rename bug lived (the string replacement never matched the real
paths). Deriving paths from `type/name/version` at the point of writing removes that whole class of
bug and lets a destination change its layout without a manifest migration.

`type/name` (`illustrationKey`) is the identity consumers see; `nodeId` is the identity Figma
sees. The diff uses both (below).

## Reconciliation (`diffIllustrations`)

A pure function from `(previous manifest entries, fetched components, set of all remote node ids)`
to an `IllustrationDiff`:

```ts
type IllustrationDiff = {
  results: { added; updated; renamed; deleted }; // for the version plan and summary
  removals: Illustration[]; // previous entries whose files must go
  writes: Illustration[]; // illustrations whose files must be (re)written
  illustrations: Illustration[]; // the complete set after this sync
};
```

For each fetched component, the previous entry is looked up by `nodeId`, falling back to
`type/name` (designers sometimes delete and re-create a component; it keeps its version history and
`createdAt`). Then, in order:

| Situation                 | Outcome                                                                    |
| ------------------------- | -------------------------------------------------------------------------- |
| no previous entry         | **added** at version 0                                                     |
| type changed              | **deleted** old + **added** new (types have separate unions and CDN paths) |
| name changed, case-only   | throws (file systems and the name union would collide)                     |
| name changed              | **renamed**: version reset to 0, old files removed, keeps `createdAt`      |
| hash changed              | **updated**: version + 1, old files removed                                |
| only description changed  | **updated**: no version bump, no asset writes, indexes refresh             |
| unchanged                 | carried forward                                                            |
| previous entry, node gone | **deleted**, files removed                                                 |

Previous entries that were not downloaded this run (incremental sync) but still exist in Figma are
carried forward untouched. Renames and deletions are breaking changes; the version plan marks the
release `major`.

### Why the hash formula looks odd

`hash = sha256(JSON.stringify({ [nodeId]: lightSvg }))`. This is exactly what earlier versions of
the sync computed, kept on purpose: a different formula would make every illustration's hash
"change" on the first run and bump 1,600 versions at once, invalidating every CDN URL.

## Incremental sync (`selectComponents`)

Figma's `/components` endpoint returns every published component with its `updated_at` in one
cheap call. The sync downloads only the components updated after `manifest.lastUpdated`, so a
normal run touches a handful of SVGs; `--sync-all` downloads everything and is the way to pick up
pipeline changes (a new svgo setting, a palette change) across the whole set.

The same step drops **duplicate `type/name`** components, which the real file does contain. It
keeps the node the manifest already knows (so the choice is stable run to run), otherwise the
oldest, and warns about the rest.

## SVG processing

- `optimizeSvg`: svgo with `preset-default`, 2-decimal precision, and `convertColors` configured
  so every color comes out as an **uppercase 6-digit hex**. A custom plugin normalizes 3-digit hex
  (`#abc` → `#AABBCC`) and leaves non-hex values (`none`, `url(#gradient)`, `currentColor`) alone;
  earlier versions threw on gradients, which made `--sync-all` crash on the real file.
- `artifacts/paletteColors`: a single regex pass replaces every palette color with whatever the sink
  asks for (dark value, CSS variable, anything else). Single pass matters: chained `replace` calls
  could re-replace a value an earlier substitution produced (the palette contains near-duplicates
  such as `#FFFFFF`/`#FFFFFE`). Colors outside the palette pass through unchanged.
- `source/fetchColorPalette` (part of `FigmaSource`): reads the published `illustration/*` variables from the colors file via the
  Variables API (local + published, following aliases), and fails hard if a mode or the variables
  are missing. Publishing light-only assets silently would be worse than a failed run.

## Sinks (`sinks/`) and artifacts (`artifacts/`)

A sink is a **destination**, not a file format: the illustrations package today, a mirror in
another repository tomorrow. It owns the layout, the set of files and the theming of that
destination, and is handed its resolved work once per run:

```ts
abstract class Sink {
  accepts(illustration): boolean; // optional `include` predicate
  abstract has(illustration): Promise<boolean>; // are all my files for it present?
  abstract apply(changes: SinkChanges): Promise<void>;
}

type SinkChanges = {
  remove: Illustration[]; // stale: superseded, renamed, deleted
  write: { illustration: Illustration; svg: string }[]; // changed + missing; the light SVG
  illustrations: Illustration[]; // complete current set, for indexes
  palette: ColorPalette;
};
```

The engine owns the planning so that the invariants hold for every sink without each re-deriving
them: removal before write, version bumps replacing old files, and **backfill** — before
downloading, the engine asks each sink `has()` for every illustration and adds the missing ones to
the download set and to that sink's `write`. Adding a sink (or wiping its directory) is therefore
repaired by the next ordinary run, and a run with nothing updated and nothing missing does nothing.
`apply` must be idempotent: on any run that found work, every sink is applied, possibly with empty
`remove`/`write`, so that set-derived files refresh after e.g. a description-only change.

What a sink receives is deliberately minimal. The **light SVG** is design's source of truth and
what the hash is computed from; the **palette** is a fact about the design system. How a
destination expresses a theme is its own business: the package sink derives a dark SVG and a
CSS-variable SVG because its consumers are web and React Native; a native asset catalog would
derive something else. `artifacts/` holds the shared, pure helpers for those derivations
(`replacePaletteColors` and its two common cases, `rasterizePng`, module wrappers, the data-file
renderers). They return content; sinks decide paths. Two sinks wanting the same artifact compute it
twice, which is cheap for all of them except PNG; a per-run memo in `rasterizePng` is the fix if a
second PNG consumer ever appears.

### `IllustrationsPackageSink`

Fills `src/__generated__`, the one package every CDS platform consumes:

| Files                                                                       | Consumer             |
| --------------------------------------------------------------------------- | -------------------- |
| `<type>/svg/{light,dark}/<name>-<v>.svg`                                    | CDN                  |
| `<type>/png/{light,dark}/<name>-<v>.png`                                    | CDN                  |
| `<type>/svgJs/cjs/{light,dark,themeable}/<name>-<v>.js`, `data/svgJsMap.ts` | `cds-mobile`         |
| `<type>/svgJs/esm/themeable/<name>-<v>.js`, `data/svgEsmMap.ts`             | `cds-web`            |
| `<type>/types/<Type>Name.ts`, `data/{names,versionMap,descriptionMap}.ts`   | web, mobile, docsite |

Asset files carry the version so the CDN can cache them forever. `has()` checks all eight asset
files; the data files are rebuilt from the full set on every `apply`.

A second destination is a new `Sink` subclass plus one line in `config.sinks`; the e2e test's
`MirrorSink` (flat, light-only SVGs in another directory, about 20 lines) shows the shape.

### Generated TypeScript is printed, not formatted

The data-file renderers print TypeScript with `artifacts/source.ts`, a small printer that
follows the repo's prettier rules (100-column width, single quotes with prettier's quote
preference, `quoteProps: as-needed` with Unicode-aware identifiers, prettier's arrow-function
breaking). Running prettier at sync time was dropped because prettier 3 cannot load under jest's
CommonJS environment, and `__generated__` is prettier-ignored anyway. The printer's output is
verified byte-for-byte against the prettier-formatted files previous syncs committed.

### Sort orders are part of the contract

- `versionMap` and `descriptionMap`: by `createdAt` — the percy stories iterate `versionMap`, so a
  new illustration must append rather than shift every snapshot.
- `svgJsMap` / `svgEsmMap`: by name, numeric-aware (`a1, a2, a10`).
- `names` and `<Type>Name`: default string sort.

## Manifest

```json
{
  "lastUpdated": "2026-10-01T18:11:50.000Z",
  "colors": { "primary": { "light": "#0052FF", "dark": "#578BFA" }, "...": {} },
  "items": {
    "4390:695": { "type": "spotIcon", "name": "2fa", "hash": "...", "version": 1, "...": "" }
  }
}
```

`items` is keyed by Figma node id, the one identity that survives everything the sync tracks: a
rename or a version bump diffs as a change to a single stable entry (`name` or `version` and
`hash` lines), a deleted component as a removed entry, and a node design re-created as a new key.
An array sorted by name would show a rename as one entry removed and another added, which is
exactly what a rename is not. Entries are written in `type`, then `name` order (JSON preserves it
because node ids are never integer-like keys) with a fixed field order, so unrelated edits never
reorder the file. The entry holds no file paths; see _The `Illustration` record_.

`colors` is recorded so a palette change in Figma shows up in the same PR as the assets it recolors.
Earlier versions stored the Figma style metadata per color; only the two hex values are needed.

## Around the sync

The sync target writes files and exits. Everything that happens around it is owned elsewhere:

- **Git workflow** — `scripts/syncIllustrations.ts` at the repo root (`yarn sync-illustrations`)
  creates the `illustrations/YYYY-MM-DD` branch from the default branch, runs the sync target, runs
  `web:generate-illustration-stories`, then commits and pushes, or deletes the branch again when a
  step failed or nothing changed.
- **Docsite stories** — `packages/web/scripts/generateIllustrationStories.ts` renders web's
  `<Type>.stories.tsx` from the `names` the illustrations package publishes. It is web's artifact
  derived from web's dependency, so it lives in web with its own nx target, not in this sync. It used
  to be shelled out to from here, which tied the sync to one specific destination.

This keeps the sync free of knowledge about git or other packages, and makes each piece runnable on
its own: the sync target for a scratch run, the stories target after a manual edit, the workflow
script for a release.

## Configuration and scratch runs

`config.ts` is a single object: the `source` (a `FigmaSource` over the two Figma file ids), the
`sinks` (an `IllustrationsPackageSink` with its CSS variable prefix) and the paths. Two environment variables redirect the whole run
for testing: `SYNC_ILLUSTRATIONS_SCRATCH_DIR` writes everything (generated files, manifest, version
plan) under a scratch directory; `SYNC_ILLUSTRATIONS_FIGMA_FILE_ID` points the source at another
file, normally the test fixture library that mirrors the real file's layout. Scratch runs are the
integration check for `FigmaSource` and the real API; behavioural testing of the engine belongs in
the in-memory tests below.

## Testing strategy

Three layers, none of which mocks a module:

1. **End to end in memory** (`sync.test.ts`): `runSync` with an `InMemorySource`, the real
   `IllustrationsPackageSink` and a small `MirrorSink` writing to temp directories, run repeatedly
   while the source is mutated: first publish, no-op run, description-only change, artwork change,
   rename, case-only rename (rejected), node re-created under the same name, duplicate name,
   deletion, `syncAll`, a sink added mid-way (backfilled on an incremental run), a wiped sink
   directory, idempotence. Assertions cover the files on disk, the generated TypeScript, the
   returned diff and the manifest. This is where the sync's behaviour is specified.
2. **Pure modules on their own inputs** (`selectComponents`, `diffIllustrations`, the artifact
   helpers and printer, `generateVersionPlan`, `manifest`), including the reconciliation table
   above case by case.
3. **Adapters and formats against recorded production data**: the real `/components` response
   (trimmed, keeping duplicate names, both `Hero Square/` and `HeroSquare/` prefixes and a name with
   a leading space), the real variables responses, raw SVG exports exactly as Figma returns them,
   and the exact files a previous sync committed to `src/__generated__`. Optimization, theming,
   hashing and every output format are asserted byte-for-byte against those artefacts.

What the tests cannot cover is the Figma API itself; that is what scratch runs against the test
fixture library are for.

## Things deliberately not done

- **No `getFileNodes` call.** The previous sync fetched every node's full tree to read the frame
  size. Width and height now come from the SVG viewBox, which is what actually renders, and the
  slowest Figma call is gone.
- **No stored output paths** in the manifest (see _The `Illustration` record_).
- **No per-item retry/partial-failure handling.** A failed download fails the run; CI reruns it. A
  half-written `__generated__` would be worse than a clean failure, and the branch is deleted on
  non-zero exit.
- **No deletion of a type's index files when its last illustration is deleted.** `src/index.ts`
  statically exports every type, so an empty type would already be a hand-edit.
