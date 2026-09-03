/**
 * Small helpers for the sync, kept here so it stays self-contained, matching
 * `packages/icons/scripts/sync-icons`.
 */
export { existsOrCreateDir } from './existsOrCreateDir';
export { getAbsolutePath } from './getAbsolutePath';
export { pascalCase } from './pascalCase';
export { sortByAlphabet } from './sortByAlphabet';
export { createTokensTemplate, tokensSortedTemplate, tokensTemplate } from './tokensTemplate';
export type { SyncTask } from './types';
export { typescriptTypesTemplate } from './typescriptTypesTemplate';
export { writePrettyFile } from './writePrettyFile';
