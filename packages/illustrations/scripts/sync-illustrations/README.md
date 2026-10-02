# sync-illustrations: design

How the illustration sync is built and why. For running it, token setup, troubleshooting and
scratch runs, see [`packages/illustrations/DOCS.md`](../../DOCS.md).

## What the sync does

Designers publish illustration components in the
[CDS Illustrations Figma library](https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99). The sync
turns that library into everything the repo derives from it: `packages/illustrations/src/__generated__`
(SVG and PNG assets for the CDN, JS modules for web and mobile, and the TypeScript data (`names`,
`versionMap`, `descriptionMap`, `<Type>Name` unions) the components and the docsite are built on)
and web's illustration stories. It also writes an nx version plan so the package is released with
the right semver bump. It is run by hand with `yarn nx run illustrations:sync-illustrations`, which
does its work on a fresh `illustrations/YYYY-MM-DD` branch and pushes it (see _The shell_).

Three facts shape the design:

1. **Consumers address assets by `type/name/version`.** Web builds CDN URLs from `versionMap`
   (`.../spotIcon/light/wallet-3.svg`); mobile requires `svgJs/cjs/light/wallet-3.js` through
   `svgJsMap`. Every file path is a function of `type`, `name` and `version`, and the version must
   change whenever the artwork changes so CDN caches never serve stale content.
2. **Figma is the source of truth; the manifest is the memory.** Figma only says what exists now.
   To know what was added, changed, renamed or deleted since the last sync, and to keep versions
   monotonic, the sync persists `manifest.json` and reconciles against it.
3. **The light SVG is canonical; everything else is derived from it.** See the next section.

## The light SVG and the color palette

Design draws one version of each illustration: the light one. Its SVG export, after optimization, is
the **canonical artifact**. The manifest hash is computed from it, so a change to it (and only to it)
bumps the version. Every other form of the illustration is derived from it at sync time and never
drawn or stored separately:

- **dark SVG** — the light SVG with each palette color replaced by that color's dark value;
- **themeable SVG** — the light SVG with each palette color replaced by `var(--illustration-<name>)`,
  so web and mobile can theme it at runtime;
- **PNGs** — rasterizations of the light and dark SVGs;
- **JS modules** — the SVG strings wrapped for CommonJS and ESM.

The **color palette** is what makes the dark and themeable derivations possible. Illustrations are
drawn with a fixed set of 15 `illustration/*` color variables (`primary`, `gray`, `positive`,
`accent-1`, …), each with a light and a dark value, defined in the
[CDS colors Figma file](https://www.figma.com/design/AH4N0fma2EvI30IltjBGPy) and read through the
Variables API on every run (`source/fetchColorPalette`). In code it is the `ColorPalette` value
object (`colorPalette.ts`): the colors plus `recolor(lightSvg, replacement)`, a single-pass
substitution of every palette color in a light SVG. Because a light SVG only ever contains palette
colors as uppercase 6-digit hex, the dark variant is `recolor` with each color's dark value
(`toDarkSvg`) and the themeable variant is `recolor` with a CSS variable. The palette is recorded
in the manifest (`toRecord`) so a color change in Figma shows up in the same PR as the assets it
recolors. If the palette cannot be read the run fails; publishing light-only assets silently would
be worse.

Two consequences follow. Colors that are not in the palette are left as they are in every variant,
which is intended (a brand logo stays its brand color in dark mode). And a color written in any
form other than 6-digit hex would escape the substitution and ship with its light value, which is
why `optimizeSvg` rejects such colors (see _SVG processing_).

## Shape of the code

The sync is an **engine between a source and a set of sinks**, wrapped in a shell:

- an `IllustrationSource` answers three questions: what is published, give me these SVGs, what is
  the palette. Figma is the production implementation;
- `runSync`, the engine, reconciles what the source reports with the previous manifest, plans each
  sink's changes and applies them. It knows nothing about Figma, file formats, theming, git or the
  CLI;
- a `Sink` is a destination (a package, a repository, a directory) and owns how illustrations appear
  there. `IllustrationsPackageSink` fills `src/__generated__`; `WebStoriesSink` fills web's
  `__stories__`;
- `artifacts/` are pure helpers sinks build files from: PNG rasterization, module wrappers,
  TypeScript data files, a prettier-style printer;
- `index.ts`, the shell, is the nx target: config, CLI args, writing the manifest and version plan,
  the summary, and the release branch (`git.ts`).

Inside the engine the steps are plain functions over plain data, one module each. The two
abstractions, source and sink, sit at the two places where the outside world varies.

```
index.ts                 shell: CLI args, release branch, version plan, manifest, summary
config.ts                the source, the sinks, paths, flags
git.ts                   ReleaseBranch: start / publish / abandon illustrations/YYYY-MM-DD
sync.ts                  engine: runSync(source, manifest, sinks) -> SyncOutcome
  selectComponents.ts      dedupe, incremental filter    -> which nodes to download
  optimizeSvg.ts           svgo config, color normalization and check, viewBox size
  hashSvg.ts               the manifest hash of the light SVG
  diffIllustrations.ts     reconcile fetched vs manifest -> IllustrationDiff
illustration.ts          the domain records: Component, Illustration, sort orders
colorPalette.ts          ColorPalette: the colors, recolor(svg, fn), toDarkSvg, toRecord
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
  WebStoriesSink.ts        packages/web/src/illustrations/__stories__
  files.ts                 write / remove / exists / relative import helpers
artifacts/
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

This is everything the sync needs from the outside world. `FigmaSource` implements it with three
thin modules over `@cds/figma-api` (`/components`, `/images` + download, the Variables API); nothing
outside `source/` imports Figma types or clients.

The interface exists for testability, not polymorphism. With `InMemorySource` the whole pipeline
runs inside jest: a test builds components and raw SVGs, runs `runSync` with the real package sink
into a temp directory, mutates the source the way a designer would (rename, delete, redraw,
re-create a node, publish a duplicate name) and runs it again. Before the interface, those cases
could only be exercised against a published Figma library, with a manual publish between each
mutation. The source returns _raw_ exports so that optimization is covered by the same tests.

## The engine (`sync.ts`)

```ts
runSync({ source, manifest, sinks, syncAll, log }): Promise<SyncOutcome>

type SyncOutcome = { duplicates: Component[] } & (
  | { status: 'nothing-to-sync' } // no component updated since manifest.lastUpdated, nothing missing
  | { status: 'no-changes' } // downloaded, but every hash and description matched
  | { status: 'synced'; diff: IllustrationDiff; palette: ColorPalette; backfilled: Illustration[] }
);
```

The engine fetches, reconciles, plans and applies each sink, then returns what the caller needs to
record the run. It does **not** write the manifest or the version plan, touch git, or read
`process`. That keeps it callable from a test with nothing but a source, a manifest object and some
sinks, and makes `index.ts` the only module with side effects on the repository.

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

This is the one record that moves through the system: `diffIllustrations` produces it, the manifest
stores it, sinks receive it. It contains **no file paths**. Earlier versions stored every output path
in the manifest and rewrote those strings on rename and re-version; that is where the rename bug
lived (the replacement never matched the real paths). Deriving paths from `type/name/version` at
write time removes that class of bug and lets a destination change its layout without a manifest
migration.

`type/name` (`illustrationKey`) is the identity consumers see; `nodeId` is the identity Figma sees.
The diff uses both.

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

For each fetched component the previous entry is looked up by `nodeId`, falling back to `type/name`
(designers sometimes delete and re-create a component; it keeps its version history and
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

Previous entries not downloaded this run (incremental sync) but still in Figma are carried forward
untouched. Renames and deletions are breaking changes; the version plan marks the release `major`.

### Why the hash formula looks odd

`hash = sha256(JSON.stringify({ [nodeId]: lightSvg }))` is exactly what earlier versions computed,
kept on purpose: a different formula would make every hash "change" on the first run and bump 1,600
versions at once, invalidating every CDN URL.

## Incremental sync (`selectComponents`)

Figma's `/components` endpoint returns every published component with its `updated_at` in one cheap
call. The sync downloads only components updated after `manifest.lastUpdated`, so a normal run
touches a handful of SVGs. `--sync-all` downloads everything and is how pipeline changes (a new svgo
setting, a palette change) are applied across the whole set.

The same step drops **duplicate `type/name`** components, which the real file does contain. It keeps
the node the manifest already knows (so the choice is stable from run to run), otherwise the oldest,
and warns about the rest.

## SVG processing

- `optimizeSvg`: svgo with `preset-default`, 2-decimal precision, and `convertColors` set so every
  color (CSS names and `rgb()` included) comes out as **uppercase 6-digit hex**. A custom plugin then
  expands 3-digit hex (`#abc` → `#AABBCC`) and **rejects** any color attribute that is not 6-digit
  hex, `none` or `url(#id)`. An alpha hex (`#0052FF80`), `currentColor`, `rgba()` or `var()` would
  escape palette substitution and ship with its light color in every variant, and nothing downstream
  (hash, diff, review of a one-line SVG) would notice. Figma never exports those forms, so the check
  costs nothing on a healthy file; when it fires, the run stops before any sink is touched and the
  error names the attribute, the value, the component and its Figma URL. Gradients are fine:
  `url(#…)` passes through and gradient stops are substituted like any fill.
- `ColorPalette.recolor`: one regex pass replaces every palette color with whatever the caller
  returns for it (dark value, CSS variable, anything else). One pass matters: chained `replace`
  calls could re-replace a value an earlier substitution produced (the palette has near-duplicates
  such as `#FFFFFF`/`#FFFFFE`).

## Sinks (`sinks/`) and artifacts (`artifacts/`)

A sink is a **destination**, not a file format: the illustrations package today, a mirror in another
repository tomorrow. It owns the layout, the set of files and the theming of that destination, and
receives its work once per run:

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

The engine owns the planning so the invariants hold for every sink: removal before write, version
bumps replacing old files, and **backfill**. Before downloading, the engine asks each sink `has()`
for every illustration and adds the missing ones to the download set and to that sink's `write`.
Adding a sink, or wiping its directory, is repaired by the next ordinary run; a run with nothing
updated and nothing missing does nothing. `apply` must be idempotent: on any run that found work,
every sink is applied, possibly with empty `remove`/`write`, so set-derived files refresh after a
description-only change. Sinks are independent and nothing after the source's three calls touches
the network, so they are applied concurrently.

A sink receives only the **light SVG** and the **palette**. How a destination expresses a theme is
its own business: the package sink uses `palette.toDarkSvg` for its dark files and
`palette.recolor` with `var(--<prefix>-<name>)` for its themeable ones, because its consumers are
web and React Native; a native asset catalog would recolor to something else. The CSS-variable
naming is therefore the sink's detail, not a shared helper. `artifacts/` holds the shared pure
helpers for the rest (PNG, module wrappers, data files). They return content; sinks decide paths.
Two sinks wanting the same artifact compute it twice, which is cheap for everything except PNG; a
per-run memo in `rasterizePng` is the fix if a second PNG consumer appears.

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

### `WebStoriesSink`

Writes web's `<Type>.stories.tsx` (the example illustration and the percy sheets) into
`packages/web/src/illustrations/__stories__`. The stories depend only on each type's set of names,
so the sink is the minimal set-derived sink: `has()` is always true (there is no per-illustration
file to restore, so it never triggers a download) and `apply` rewrites every type's file from
`illustrations`, ignoring `remove`, `write` and `palette`. The template is emitted already in
prettier's style; a test asserts the committed stories are exactly what the committed manifest
renders to, so the two cannot drift.

This used to be a separate script that the sync shelled out to, and briefly a web nx target chained
by a repo-level workflow script. Both needed a second step to run after the sync; as a sink it is
one more line in `config.sinks` and shares the sync's guarantees (nothing written on failure, all
destinations updated by one run). The trade-off is that tooling in this package knows web's story
API (`getIllustrationSheet`, `IllustrationExample`, the per-type scale), confined to this one file.

A further destination is another `Sink` subclass plus one line in `config.sinks`; the e2e test's
`MirrorSink` (flat, light-only SVGs in another directory, about 20 lines) is the smallest example.

### Generated TypeScript is printed, not formatted

The data-file renderers print TypeScript with `artifacts/source.ts`, a small printer that follows
the repo's prettier rules (100-column width, prettier's quote preference, `quoteProps: as-needed`
with Unicode-aware identifiers, prettier's arrow-function breaking). Running prettier at sync time
was dropped because prettier 3 cannot load under jest's CommonJS environment, and `__generated__` is
prettier-ignored anyway. The printer's output is verified byte-for-byte against the
prettier-formatted files previous syncs committed.

### Sort orders are part of the contract

- `versionMap` and `descriptionMap`: by `createdAt`. The percy stories iterate `versionMap`, so a
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
rename or version bump diffs as a change to one stable entry, a deleted component as a removed
entry, a node design re-created as a new key. An array sorted by name would show a rename as one
entry removed and another added, which is exactly what a rename is not. Entries are written in
`type`, then `name` order (JSON preserves it because node ids are never integer-like keys) with a
fixed field order, so unrelated edits never reorder the file. Entries hold no file paths (see _The
`Illustration` record_).

`colors` is the palette the assets were derived with (see _The light SVG and the color palette_).

## The shell (`index.ts`, `git.ts`)

`index.ts` is the only module with side effects on the repository. It reads the manifest, calls
`runSync`, writes the version plan and the new manifest when the diff has changes, and prints the
summary. Around that, `ReleaseBranch` (`git.ts`) gives a release its git workflow: `start` requires
a clean tree and creates `illustrations/YYYY-MM-DD` from the latest default branch, `publish`
commits and pushes what the run produced, `abandon` discards the run and deletes the branch. The
branch is abandoned when the sync throws, when Figma had nothing new, or when nothing changed, so a
failed or empty run never leaves a half-written tree behind. Scratch runs and `--no-git` skip the
branch and just write files.

## Configuration and scratch runs

`config.ts` is one object: the `source` (a `FigmaSource` over the illustrations and colors file
ids), the `sinks` (an `IllustrationsPackageSink` with its CSS variable prefix and a `WebStoriesSink`),
the paths and the `git` flag. Two environment variables redirect a run for testing:
`SYNC_ILLUSTRATIONS_SCRATCH_DIR` writes everything (generated files, stories, manifest, version
plan) under a scratch directory and turns the git workflow off;
`SYNC_ILLUSTRATIONS_FIGMA_FILE_ID` points the source at another file, normally the test fixture
library that mirrors the real file's layout. Scratch runs are the integration check for
`FigmaSource` against the real API; the engine's behaviour is tested in memory.

## Testing strategy

Three layers, none of which mocks a module:

1. **End to end in memory** (`sync.test.ts`): `runSync` with an `InMemorySource`, the real
   `IllustrationsPackageSink` and `WebStoriesSink` and a small `MirrorSink` writing to temp
   directories, run repeatedly
   while the source is mutated: first publish, no-op run, description-only change, artwork change,
   rename, case-only rename (rejected), node re-created under the same name, duplicate name,
   deletion, an export with an unsupported color (rejected, nothing written), `syncAll`, a sink
   added mid-way (backfilled on an incremental run), a wiped sink directory, idempotence.
   Assertions cover the files on disk, the generated TypeScript, the returned diff and the
   manifest. This is where the sync's behaviour is specified.
2. **Pure modules on their own inputs** (`selectComponents`, `diffIllustrations`, the artifact
   helpers and printer, `generateVersionPlan`, `manifest`), including the reconciliation table above
   case by case.
3. **Adapters and formats against recorded production data**: the real `/components` response
   (trimmed, keeping duplicate names, both `Hero Square/` and `HeroSquare/` prefixes and a name with
   a leading space), the real variables responses, raw SVG exports exactly as Figma returns them
   (including the first gradient illustration), the exact files a previous sync committed to
   `src/__generated__`, and the committed web stories against the committed manifest. Optimization,
   palette substitution, hashing and every output format are asserted byte-for-byte against those
   artefacts.

What the tests cannot cover is the Figma API itself; that is what scratch runs against the test
fixture library are for.

## Things deliberately not done

- **No `getFileNodes` call.** The previous sync fetched every node's full tree to read the frame
  size. Width and height now come from the SVG viewBox, which is what renders, and the slowest Figma
  call is gone.
- **No stored output paths** in the manifest (see _The `Illustration` record_).
- **No per-item retry or partial-failure handling.** A failed download or a rejected SVG fails the
  run before anything is written; rerun it after the fix. A half-written `__generated__` would be
  worse than a clean failure, and the shell abandons the release branch on failure.
- **No "refresh sinks without Figma" command.** Set-derived files (data files, stories) are only
  rewritten by a run that found work, so a template change in a sink needs a Figma change or
  `--sync-all` to propagate. Applying every sink from the manifest's set with no download would be a
  small addition to the shell if that becomes frequent.
- **No deletion of a type's index files when its last illustration is deleted.** `src/index.ts`
  statically exports every type, so an empty type would already be a hand-edit.
