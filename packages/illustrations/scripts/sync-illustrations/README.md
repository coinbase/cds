# sync-illustrations: design

How the illustration sync is built and why. For running it, token setup, troubleshooting and
scratch runs, see [`packages/illustrations/DOCS.md`](../../DOCS.md).

## What the sync does

Designers publish illustration components in the
[CDS Illustrations Figma library](https://www.figma.com/design/LmkJatvMRVzNgfiIkJDb99). The sync
turns that library into everything the repo derives from it: `packages/illustrations/src/__generated__`
(SVG and PNG assets for the CDN, JS modules for web and mobile, and the TypeScript data (`names`,
`versionMap`, `descriptionMap`, `<Type>Name` unions) the components and the docsite are built on)
and web's illustration stories and, when a native checkout is configured, the illustration assets
of the native CDS packages (see _Native sinks_). It is run with `yarn nx run illustrations:sync-illustrations`,
which writes files into the working tree and a report (`SYNC_REPORT_PATH`); the Sync Figma Assets workflow
turns those into the branch, the version plan, the release and the push (see _The shell_).

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
  `__stories__`; `IosAssetCatalogSink` and `AndroidVectorDrawableSink` fill the native CDS packages;
- `artifacts/` are pure helpers sinks build files from: PNG rasterization, module wrappers,
  TypeScript data files, a prettier-style printer, the native SVG preparation and the vector
  drawable converter;
- `index.ts`, the shell, is the nx target: config, CLI args, writing the manifest and the report,
  the summary, and the native checkout's release branch (`git.ts`).

Inside the engine the steps are plain functions over plain data, one module each. The two
abstractions, source and sink, sit at the two places where the outside world varies.

```
index.ts                 shell: CLI args, native release branch, manifest, report, summary
config.ts                the source, the sinks, paths, flags
selectSinks.ts           --select-sinks: the interactive choice of sinks for one run
nativeRepo.ts            native module paths and layout, assertNativeCheckout
git.ts                   ReleaseBranch: start / publish / abandon illustrations/YYYY-MM-DD,
                           runOnReleaseBranches: the branch of the native checkout the run writes to
sync.ts                  engine: runSync(source, manifest, sinks) -> SyncOutcome
  selectComponents.ts      dedupe, incremental filter    -> which nodes to download
  optimizeSvg.ts           svgo config, color normalization and check, viewBox size
  hashSvg.ts               the manifest hash of the light SVG
  diffIllustrations.ts     reconcile fetched vs manifest -> IllustrationDiff
illustration.ts          the domain records: Component, Illustration, sort orders
colorPalette.ts          ColorPalette: the colors, recolor(svg, fn), toDarkSvg, toRecord
manifest.ts              read/write manifest.json
mapConcurrently.ts       bounded-concurrency map
source/
  IllustrationSource.ts    the source contract
  FigmaSource.ts           production: fetchComponents + fetchSvgs + fetchColorPalette
  InMemorySource.ts        tests: plain data, mutated between runs
sinks/
  Sink.ts                  the sink contract: accepts, has, apply(SinkChanges)
  IllustrationsPackageSink.ts   src/__generated__ of this package
  WebStoriesSink.ts        packages/web/src/illustrations/__stories__
  IosAssetCatalogSink.ts   CDSDesignSystem: Illustrations.xcassets, Illustrations/Generated/<Type>Name.swift
  AndroidVectorDrawableSink.ts  :cds: res/drawable/cds_*_{light,dark}.xml, illustrations/.../generated/<Type>Names.kt
  files.ts                 write / remove / exists / relative import helpers
artifacts/
  png.ts                   rasterizePng
  modules.ts               renderCjsModule, renderEsmModule, renderSvgJsMap, renderSvgEsmMap
  typescriptData.ts        renderNameType, renderNames, renderDescriptionMap, renderVersionMap
  source.ts                prettier-style printer for the generated TypeScript
  nativeSvg.ts             toNativeSvg (validation, mask -> clip, approximations), the stamp, the
                             generated-file header, the approximation list
  vectorDrawable.ts        toVectorDrawable: prepared SVG -> Android <vector> XML
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
runSync({ source, manifest, sinks, fullCompare, dryRun, allOrNothing, log }): Promise<SyncOutcome>

type SyncOutcome = { duplicates: DuplicateComponent[]; invalid: InvalidComponent[] } & (
  | { status: 'nothing-to-sync' } // every component matches its manifest entry, nothing missing
  | { status: 'no-changes' } // downloaded, but every hash and description matched
  | {
      status: 'synced';
      diff: IllustrationDiff;
      palette: ColorPalette;
      backfilled: Illustration[];
      sinkResults: SinkResult[]; // per sink: written, removed, failures, published
    }
);
```

The engine fetches, reconciles, plans every sink, then commits each plan that may publish, then returns what the caller needs to
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
call. The sync downloads only components that are new, renamed (a different `type/name` for the same node), or whose `updated_at` differs from the `lastUpdated`
the manifest recorded for that component, so a normal run touches a handful of SVGs. Each component
is compared with its own record, so no run depends on the clock or on the previous run having finished. `--full-compare` downloads everything and is how pipeline changes (a new svgo
setting, a palette change) are applied across the whole set.

The same step drops **duplicate `type/name`** components, which the real file does contain. It keeps
the node the manifest already knows (so the choice is stable from run to run), otherwise the oldest,
and warns about the rest.

A published component whose type is not in `illustrationTypes` (`profile.ts`) is not synced either: the source lists it as invalid with the category **new type**, and what was published for it stays.

A published component whose name is not `[type]/[camelCaseName]` does not stop the sync either. The source
lists it separately (`listComponents` returns `{ components, invalid }`), the sync skips it, and it is
reported as an **invalid name**. What was published for it before stays untouched, so renaming a
component to something unusable in Figma never deletes the illustration.

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

### Native sinks

The native CDS packages live in mobile-skunkworks: `CDSDesignSystem` (SwiftUI) and `:cds`
(Compose). Each ships the five illustration components over fixed light and dark vector assets in
the platform's own format; the component picks the set from the CDS color scheme, never from the
system appearance, and custom themes do not recolor illustrations (the React Native default,
`applyTheme` off). The sync is the assets' only source; the generated files are committed there and
never edited by hand. Both sinks join `config.sinks` only when `SYNC_ILLUSTRATIONS_NATIVE_REPO`
points at a checkout (see _Configuration and scratch runs_).

| Sink                        | module (in the native repo)                                | Files                                                                                                                                                                                                                                   |
| --------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IosAssetCatalogSink`       | `modules/ios/CDS/CDSDesignSystem/Sources/CDSDesignSystem/` | `Resources/Illustrations.xcassets/<type>/<name>.imageset/{Contents.json,<name>-light.svg,<name>-dark.svg}` plus the catalog and type-folder `Contents.json` (`catalogDir`); `Illustrations/Generated/<Type>Name.swift` (`generatedDir`) |
| `AndroidVectorDrawableSink` | `modules/android/cds/`                                     | `src/main/res/drawable/cds_<type_snake>_<name_snake>_{light,dark}.xml` (`drawableDir`); `illustrations/src/main/kotlin/com/coinbase/cds/illustrations/generated/<Type>Names.kt` (`kotlinDir`)                                           |

- **One preparation, two formats.** Both sinks start from `toNativeSvg` (`artifacts/nativeSvg.ts`),
  which validates the light SVG against what both renderers can express, rewrites the constructs
  they lack (below), and derives the dark SVG with `palette.toDarkSvg`. iOS ships that SVG as is,
  with `width`/`height` restored from the viewBox because the asset catalog reads the intrinsic size
  from them; `actool` renders it with CoreSVG. Android converts each of the two SVGs with
  `toVectorDrawable` (`artifacts/vectorDrawable.ts`).
- **Asset catalog.** Type folders set `provides-namespace`, so the asset name is
  `pictogram/wallet`. Each image set declares the dark file as the `luminosity: dark` appearance and
  `preserves-vector-representation`. `Contents.json` is written in Xcode's own layout so Xcode never
  rewrites it.
- **Vector drawables.** `android:width`/`height` in dp and the viewport come from the viewBox; the
  root carries `tools:ignore="VectorRaster,VectorPath"` because several illustrations exceed lint's
  size and path-length advice by design. Two drawables per illustration, not one `drawable-night`
  variant, because the CDS color scheme is independent of the system's.
- **No version in file names.** The package version is the version. Instead every asset file starts
  with one comment holding the header and a stamp, `cds-illustration <type> <name> <version>
<hash>`, and `has()` is true only when every asset file of the illustration exists and its stamp
  matches the manifest entry. A checkout that missed a run, or whose files were wiped, is repaired by
  backfill on the next run. `actool` and `aapt2` drop comments, so the stamp costs nothing at runtime.
- **Generated code is set-derived.** `<Type>Name.swift` is
  `public enum <Type>Name: String, CaseIterable, Sendable`, one case per name, the Figma name as raw
  value. `<Type>Names.kt` has one `public val <Type>Name.Companion.<name>: <Type>Name` per
  illustration, built from the two `R.drawable` ids (so R8 drops unreferenced names and resource
  shrinking drops their drawables), plus `<Type>Name.Companion.all`, a lazy map by Figma name for
  galleries and catalog tests. The `<Type>Name` classes themselves are hand-written in the module.
  Both files are rewritten from `illustrations` on every apply.
- **Naming stays in each sink.** A leading digit gets a `_` prefix (`2fa` -> `_2fa`); Swift
  keywords (`private`, `protocol`, `public`, …) and Kotlin hard keywords (`object`, `in`, …) are
  backticked. Drawable names are `cds_` + snake-cased type and name + theme. Each sink fails the run
  when two names would collide: as identifiers, as image sets on a case-insensitive file system
  (iOS), or with the generated `all` property (Android).
- **Header.** Every generated file starts with the same two comment lines, naming how it was made
  and where to read more, never a date or a commit (which would churn every file).
- **Validate, then publish.** A sink's `plan(changes)` prepares every asset and every code file
  without touching the file system and returns a `SinkPlan`: what it would write and remove, the
  illustrations it could not produce (`failures`, each with a message that names the illustration,
  the reason and its Figma link), and a `commit()` that writes. The engine plans every sink before
  it commits any, so everything is validated before the first file changes. Sinks that cannot fail
  an illustration individually inherit a `plan` that has no failures and commits with `apply`.
- **Failed illustrations stay out, coherently.** A failed illustration is never half written: both
  appearances convert or neither is written. Its previous files are kept, not removed as stale, its
  entry stays in the generated catalog only if those previous files exist, and a failed new asset
  never gets a catalog entry pointing at a missing resource. The manifest still records the new
  version, but the sink's stamp stays stale, so the next run backfills it and reports the failure
  again until the art is fixed. A drawable whose stamp is current but whose `pathData` is over
  Android's limit does not count as present, so it is regenerated and validated rather than
  skipped.
- **Android path limit.** aapt2 replaces a string longer than 32,767 characters, in UTF-8 bytes or
  UTF-16 units, with `STRING_TOO_LARGE`, and Compose then crashes parsing it. `toVectorDrawable`
  measures the final `android:pathData` of every path and clip path in each appearance and throws
  `PathDataTooLongError`; the sink reports the appearance, measured length, limit, output resource
  and the start of the path. It does not simplify or split geometry.

### What the native renderers draw

Both formats are strict subsets of SVG. `toNativeSvg` admits exactly the constructs below and fails
the run, naming the construct and the component's Figma URL, on anything else: radial gradients,
`objectBoundingBox` gradients, `gradientTransform`, filters, images, patterns, `use`, text, other
masks, other blend modes, unknown attributes or style properties, multi-shape or transformed clip
shapes. The format is extended deliberately, never by dropping something a designer drew. The
table is step R of CDS-2954: what the census of the 1,597 published illustrations uses, and how
each renderer handles it (documentation plus the CoreSVG support notes; the on-device spike and the
side-by-side Figma comparison are P5 of that plan).

| SVG construct (count in the library)                              | iOS, CoreSVG (asset catalog SVG)                     | Android, vector drawable                                                                        |
| ----------------------------------------------------------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `path` (17,032), relative commands, arcs, shorthands              | drawn                                                | drawn; `pathData` is SVG path grammar                                                           |
| `circle` (214), `ellipse` (7), `rect` (12, mostly rounded)        | drawn                                                | converted to arc path data per the SVG spec                                                     |
| `fill-rule="evenodd"` (3,603)                                     | drawn                                                | `android:fillType="evenOdd"`                                                                    |
| strokes: width, cap, join, miter limit (171)                      | drawn                                                | `strokeWidth`, `strokeLineCap`, `strokeLineJoin`, `strokeMiterLimit`                            |
| `fill-opacity` (82), `opacity` on a shape (8)                     | drawn                                                | `fillAlpha`/`strokeAlpha`; exact unless the shape is both filled and stroked (`shape-opacity`)  |
| `opacity` on a group (1: `heroSquare/cbmega`)                     | drawn                                                | folded into each shape's alpha; overlaps composite darker (`group-opacity`, approximation list) |
| `transform` on shapes (65: `rotate`, `matrix` reflections)        | drawn                                                | `<group android:rotation/scaleX/scaleY/translateX/translateY>`; skews fail                      |
| `clipPath` with one shape (338), `clip-rule`                      | drawn                                                | `<clip-path android:pathData android:fillType>` in a `<group>`                                  |
| `mask`, single opaque shape (2: `buy`, `stressTestedColdStorage`) | not supported: rewritten as `clipPath` before export | same rewrite; a `userSpaceOnUse` mask region becomes an outer rectangular clip                  |
| `linearGradient`, `userSpaceOnUse`, `stop-opacity` (4: `usdj`)    | drawn                                                | inline `<aapt:attr><gradient android:type="linear">` with the stop opacity in the color alpha   |
| `stroke-dasharray` (1: `heroSquare/primeDeFi`)                    | drawn                                                | no dashes: solid stroke (`stroke-dasharray`, approximation list)                                |
| `mix-blend-mode:screen` (1: `heroSquare/usdj`)                    | not supported: dropped, painted normally             | same (`mix-blend-mode`, approximation list)                                                     |
| very long path data (up to 72 KB in one `d`, 247 KB files)        | drawn                                                | compiles; lint's `VectorPath` advice is suppressed                                              |

**Approximation list.** `approximationList` in `artifacts/nativeSvg.ts` names every illustration
that ships with a known drawing difference, with the feature, the platforms and the reason. The
converters call `requireApproximation` whenever they have to approximate; an illustration not on the
list fails the run, and `assertApproximationsApplied` fails it too when an entry is no longer
needed, so the list stays true to the art. The run prints it. Today:

| Illustration           | Feature            | Platforms    | What is lost                                                                                     |
| ---------------------- | ------------------ | ------------ | ------------------------------------------------------------------------------------------------ |
| `heroSquare/usdj`      | `mix-blend-mode`   | iOS, Android | the highlight gradient across the coin is painted normally instead of with `screen`              |
| `heroSquare/primeDeFi` | `stroke-dasharray` | Android      | one dashed outline (4 on, 4 off) is solid                                                        |
| `heroSquare/cbmega`    | `group-opacity`    | Android      | three shapes at 92% group opacity are each 92%; where they overlap the result is slightly darker |

**Not-exportable list.** `notExportableList` in the same file names the illustrations whose art
neither renderer can draw exactly and that the native packages therefore do not ship yet, with the
reason. Both native sinks leave them out through `accepts`, so they are neither exported nor named
in the generated enums, and the run prints the list. The whole-library test keeps it exact: every
entry must still fail to convert and nothing else may fail. The fix is in Figma; once the construct
is flattened and the entry removed, the illustration joins the next sync by backfill. Today:
`spotRectangle/insto` (a mask with a black cut-out: clips cannot subtract) and `spotSquare/lowRisk`
(a mask of three shapes: a union clip neither converter expresses exactly).

**Android-only list.** `androidNotExportableList` names the illustrations only the Android package
leaves out. aapt2 caps a resource string at `MAX_PATH_DATA` (32,767) characters and Compose crashed
loading a longer `android:pathData`, so `toVectorDrawable` refuses such a path and the Android sink
skips the listed illustrations while iOS ships them; the whole-library test checks each entry still
exceeds the limit. Today: `heroSquare/arrowsUpDown` (a 67,990-character path) and `heroSquare/mcLoad`
(71,551), both removed from the Android package in mobile-skunkworks `3917156368`. The longest path
that ships is 30,006 characters.

**`<use>` elements.** svgo's `reusePaths` turns repeated identical paths into one `<path>` in
`<defs>` and `<use>` elements (the `insto*` illustrations). Vector drawables have no equivalent, so
`toNativeSvg` inlines each `<use>` as a copy of its shape, with the `<use>`'s attributes applied
where the shape sets none, as SVG inheritance would; the `<defs>` shapes and the `xlink` namespace
are dropped afterwards. A positioned or transformed `<use>`, or one of anything but a shape, fails.

**Suspect list for P5.** The illustrations whose rendering the side-by-side comparison with Figma
must confirm on device: the three above; the two rewritten masks (`heroSquare/buy`,
`spotRectangle/stressTestedColdStorage`); the 65 transformed circles and ellipses on Android (group
decomposition); `heroSquare/usdj` for gradient fidelity on both platforms; and the two largest files
(`heroSquare/arrowsUpDown`, `heroSquare/mcLoad`) for compile and first-draw time on both.

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
`runSync`, writes the new manifest when the diff has changes, and prints the summary. It writes the
sync report (`@cds/figma-api/syncReport`) for the workflow, which owns this repository's branch,
version plan, release and push. For the native checkout, `ReleaseBranch` (`git.ts`) gives a release
its git workflow: `start` requires
a clean tree and creates `illustrations/YYYY-MM-DD` from the latest default branch, `publish`
commits and pushes what the run produced, `abandon` discards the run and deletes the branch. The
branch is abandoned when the sync throws, when Figma had nothing new, or when nothing changed, so a
failed or empty run never leaves a half-written tree behind. Scratch runs and `--no-git` skip the
branch and just write files.

`--select-sinks` (`selectSinks.ts`) asks on the terminal which of `config.sinks` to write to before
any branch is started or anything is fetched; the engine then runs with that subset and the native
release branch is only started when a native sink is selected. The manifest still records the run,
so the illustrations a skipped sink missed are backfilled by a later run that includes it. Without
the flag, every configured sink is written.

With a native checkout configured, `runOnReleaseBranches` starts a `ReleaseBranch` there (so a dirty
native tree stops the run before anything is written), runs the sync, and publishes or abandons it.
The checkout is validated (`assertNativeCheckout`: a git checkout with both native modules) before
anything is fetched, with or without git. The pull request there is opened by hand; `publish` prints
the branch and the title to use.

### Failures, `--all-or-nothing` and `--dry-run`

An illustration that cannot be exported does not stop the run by default. Each sink publishes the
illustrations that validate and skips the ones that fail, and the run reports every failure, not
the first. The process exits nonzero whenever any illustration was rejected, even though the valid
assets were written, so CI and wrapper scripts must treat a nonzero exit as "published, but fix
these in Figma". A failure of a whole sink, such as a name collision in its catalog, still aborts the
run before anything is written.

`--all-or-nothing` changes that per sink: a sink with any failed illustration publishes no files,
no catalog changes and no removals, and the other sinks publish as usual. The transaction boundary
is one sink's output set. There is no rollback across sinks, and none after an unexpected
file-system error partway through a write; validation, not the file system, is what the guarantee
covers.

`--dry-run` runs the same download, conversion and validation, including the Android string limit,
then writes nothing: no assets, catalogs or manifest, no deletions, and no release branch. It prints what each sink would write, remove and reject, and exits nonzero when anything
would be rejected, so it works as a CI check. It combines with `--all-or-nothing`, which then
reports the sinks that would publish nothing.

## Configuration and scratch runs

`config.ts` is one object: the `source` (a `FigmaSource` over the illustrations and colors file
ids), the `sinks` (an `IllustrationsPackageSink` with its CSS variable prefix and a `WebStoriesSink`,
plus the two native sinks when `SYNC_ILLUSTRATIONS_NATIVE_REPO` is set), the paths, the `git` flag
and the `nativeRepo` to release into. `SYNC_ILLUSTRATIONS_NATIVE_REPO` is an environment variable
because the checkout's location is machine specific; when it is unset the sync behaves exactly as
it did before the native sinks existed. Two environment variables redirect a run for testing:
`SYNC_ILLUSTRATIONS_SCRATCH_DIR` writes everything (generated files, stories, manifest, version
plan, and the native output under `native/` when `SYNC_ILLUSTRATIONS_NATIVE_REPO` is set, which
then leaves the native checkout alone) under a scratch directory and turns the git workflow off;
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
   deletion, an export with an unsupported color (rejected, nothing written), `fullCompare`, a sink
   added mid-way (backfilled on an incremental run), a wiped sink directory, idempotence, the
   native sinks added mid-way, and a native asset with a stale stamp.
   Assertions cover the files on disk, the generated TypeScript, the returned diff and the
   manifest. This is where the sync's behaviour is specified.
2. **Pure modules on their own inputs** (`selectComponents`, `diffIllustrations`, the artifact
   helpers and printer, `manifest`, `runOnReleaseBranches` with recording
   stand-ins for `ReleaseBranch`), including the reconciliation table above case by case. The
   native preparation is tested rewrite by rewrite and rejection by rejection (`nativeSvg.test.ts`),
   the vector drawable converter construct by construct and over every published illustration in
   both palettes (`vectorDrawable.test.ts`), and the native sinks are pinned byte for byte to
   `__fixtures__/{iosSink,androidSink}/`, rendered from `__fixtures__/nativeSamples.ts`.
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
  `--full-compare` to propagate. Applying every sink from the manifest's set with no download would be a
  small addition to the shell if that becomes frequent.
- **No deletion of a type's index files when its last illustration is deleted.** `src/index.ts`
  statically exports every type, so an empty type would already be a hand-edit.
