import type { FileExplanation } from '@cds/figma-api/changedFiles';

/** The paths, from the repository root, that the icon sync writes to. */
export const generatedPaths = [
  'packages/icons',
  'apps/expo-app/src/__generated__',
  'packages/web/src/icons/__figma__',
  'packages/mobile/src/icons/__figma__',
];

const ICON_SVG = /^packages\/icons\/src\/svgs\/(.+)-(?:12|16|24)-(?:active|inactive)\.svg$/;
const MANIFEST = /^packages\/icons\/manifest\.json$/;
const FROM_CHANGES = [
  /^packages\/icons\/src\/(?:IconName|names|descriptionMap|glyphMap)\.ts$/,
  /^packages\/icons\/src\/fonts\//,
  /^apps\/expo-app\/src\/__generated__\/iconSvgMap\.ts$/,
];
const CODE_CONNECT = /^packages\/(?:web|mobile)\/src\/icons\/__figma__\//;

/** Where a file the icon sync can write comes from; a file it does not write is not explained. */
export const explainIconFile = (file: string): FileExplanation | undefined => {
  const svg = ICON_SVG.exec(file);
  if (svg) return { item: svg[1] };
  if (MANIFEST.test(file)) return { derived: 'records' };
  if (FROM_CHANGES.some((pattern) => pattern.test(file))) return { derived: 'changes' };
  if (CODE_CONNECT.test(file)) return { derived: 'listing' };
  return undefined;
};
