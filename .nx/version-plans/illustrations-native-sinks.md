---
illustrations: patch
---

Add two native sinks to the `sync-illustrations` tooling: `IosAssetCatalogSink` (an asset catalog with light/dark SVG appearances and `<Type>Name` enums for `CDSDesignSystem`) and `AndroidVectorDrawableSink` (light and dark vector drawables and `<Type>Name` companion properties for `:cds`), active when `SYNC_ILLUSTRATIONS_NATIVE_REPO` points at a mobile-skunkworks checkout. Internal tooling only; the published `esm`/`dts` output is unchanged for consumers.
