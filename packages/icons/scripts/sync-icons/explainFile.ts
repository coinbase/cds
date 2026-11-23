import type { FileExplanation } from '@cds/figma-api/changedFiles';

import { profile } from './profile';

const { packageDir, fromChanges, fromListing } = profile.generated;

const ICON_SVG = new RegExp(
  `^${packageDir}/src/svgs/(.+)-(?:${profile.variants.sizes.join('|')})-(?:active|inactive)\\.svg$`,
);
const startsWithAny = (file: string, prefixes: string[]) =>
  prefixes.some((prefix) => file === prefix || (prefix.endsWith('/') && file.startsWith(prefix)));

/** Where a file the icon sync can write comes from; a file it does not write is not explained. */
export const explainIconFile = (file: string): FileExplanation | undefined => {
  const svg = ICON_SVG.exec(file);
  if (svg) return { item: svg[1] };
  if (file === `${packageDir}/manifest.json`) return { derived: 'records' };
  if (startsWithAny(file, fromChanges)) return { derived: 'changes' };
  if (startsWithAny(file, fromListing)) return { derived: 'listing' };
  return undefined;
};
