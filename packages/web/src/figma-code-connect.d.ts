// Makes the ambient `figma` module (used by Code Connect `.figma.ts` template
// files) available to this package's TypeScript program. Loaded via a
// triple-slash reference rather than the `types` compiler option so that the
// default `@types/*` packages (node, jest, etc.) remain auto-included.
/// <reference types="@figma/code-connect/figma-types" />
