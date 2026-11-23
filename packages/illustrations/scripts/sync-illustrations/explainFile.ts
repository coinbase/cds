import type { FileExplanation } from '@cds/figma-api/changedFiles';

/** The paths, from the repository root, that the illustration sync writes to in this repository. */
export const generatedPaths = ['packages/illustrations'];

const PACKAGE = 'packages/illustrations';
const ASSET = new RegExp(
  `^${PACKAGE}/src/__generated__/([^/]+)/(?:svg|png|svgJs)/(?:.+/)?(.+)-\\d+\\.(?:svg|png|js)$`,
);
const FROM_CHANGES = new RegExp(`^${PACKAGE}/src/__generated__/[^/]+/(?:data|types)/`);

/** Where a file the illustration sync can write comes from; a file it does not write is not explained. */
export const explainIllustrationFile = (file: string): FileExplanation | undefined => {
  const asset = ASSET.exec(file);
  if (asset) return { item: asset[2], group: asset[1] };
  if (file === `${PACKAGE}/manifest.json`) return { derived: 'records' };
  if (FROM_CHANGES.test(file)) return { derived: 'changes' };
  return undefined;
};
