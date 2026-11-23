import type { RejectedCategory, ReleaseBump } from '@cds/figma-api/syncReport';
import { parseVariantName } from '@cds/figma-api/variantName';

import { profile } from './profile';

/**
 * What differs between the icon syncs of two packages: the rules of what is taken from Figma and
 * a few facts about the package. The sync itself is the same code in both.
 */
export type SyncProfile = {
  /** The package the sync updates. It is also the `nx release` project and the branch prefix. */
  target: string;
  /** What the commit title and the version plan call the package, when it is not `target`. */
  label?: string;
  /** The Figma file the icons come from, linked in the pull request body. */
  figmaFile?: (fileId: string) => { name: string; url: string };
  /** The script that generated a file, named in the header of every generated file. */
  scriptName: string;
  /** The icon name in the name of a component set, or what is wrong with the name. */
  iconName: (figmaName: string) => { name: string } | { problem: string };
  variants: {
    /** The sizes every icon set has, as they are written in the name of a variant. */
    sizes: readonly string[];
    /** Whether the manifest records a size as a number; otherwise as text. */
    sizeIsNumber: boolean;
  };
  /** Whether the package publishes the description of an icon, so a new one is a change. */
  publishesDescriptions: boolean;
  /** The bump the version plan asks for with a breaking change (a delete or a rename), and without. */
  bump: { breaking: ReleaseBump; otherwise: ReleaseBump };
  /** Where the sync writes, from the repository root, for the check on changed files. */
  generated: {
    packageDir: string;
    /** The folders and files to compare before and after a run. */
    paths: string[];
    /** Files made from all icons, which change when an icon does. */
    fromChanges: string[];
    /** Files made from the Figma listing, such as Code Connect. */
    fromListing: string[];
  };
};

/** An icon set the sync skipped because designers need to fix it in Figma. */
export type Rejection = {
  name: string;
  nodeId: string;
  message: string;
  category: RejectedCategory;
  /** For a name clash: the node it clashes with. */
  duplicateNodeId?: string;
};

export type Size = number | string;

export type IconVariant = { size: Size; active: boolean };

const SAFE_ICON_NAME = /^[A-Za-z0-9_-]+$/;
const SAFE_SIZE = /^\d{1,3}$/;

/** An icon name is a file name and a font glyph name, so it keeps to letters, numbers, "-" and "_". */
export const isSafeIconName = (name: string) => SAFE_ICON_NAME.test(name);

/** The icon name of a component set name, or what is wrong with it. */
export const iconNameOf = (figmaName: string): { name: string } | { problem: string } => {
  const parsed = profile.iconName(figmaName);
  if ('problem' in parsed) return parsed;
  if (isSafeIconName(parsed.name)) return parsed;
  return {
    problem: `Icon set "${figmaName}" has a name with characters that are not allowed; use only letters, numbers, "-" and "_". Rename it in Figma.`,
  };
};

export const duplicateProblem = (iconName: string) =>
  `Icon set "${iconName}" is skipped because the Figma file has two icon sets with the icon name "${iconName}", ignoring capitalization. Rename one of them.`;

const sizeLabel = (size: Size) => `size=${size}`;
const variantLabel = ({ size, active }: IconVariant) => `${sizeLabel(size)}, active=${active}`;

const expectedVariantLabels = () =>
  profile.variants.sizes.flatMap((size) =>
    [true, false].map((active) => variantLabel({ size, active })),
  );

/** The size and state an icon component is named after, such as "size=24, active=false", or what is wrong. */
export const parseIconVariant = (
  iconName: string,
  componentName: string,
): IconVariant | { problem: string } => {
  const { size, active } = parseVariantName(componentName);
  const where = `"${componentName}" in icon set "${iconName}"`;
  const format = 'Name icon components like "size=24, active=false".';
  if (size === undefined) return { problem: `${where} is missing a "size" property. ${format}` };
  if (typeof size !== 'string' || !SAFE_SIZE.test(size)) {
    return { problem: `${where} has a "size" that is not a whole number of pixels. ${format}` };
  }
  if (active === undefined) {
    return { problem: `${where} is missing an "active" property. ${format}` };
  }
  if (typeof active !== 'boolean') {
    return { problem: `${where} has an "active" that is not true or false. ${format}` };
  }
  return { size: profile.variants.sizeIsNumber ? Number(size) : size, active };
};

/**
 * What is wrong with the variants of an icon set as a whole: every icon set needs exactly the
 * sizes of the profile, each with active true and false, so a partial set never ships.
 */
export const iconVariantsProblem = (iconName: string, variants: readonly IconVariant[]) => {
  const counts = new Map<string, number>();
  for (const variant of variants) {
    const label = variantLabel(variant);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  const expected = expectedVariantLabels();
  const quoted = (labels: string[]) => labels.map((label) => `"${label}"`).join(', ');
  const missing = expected.filter((label) => !counts.has(label));
  const twice = [...counts].filter(([, count]) => count > 1).map(([label]) => label);
  const unexpected = [...counts.keys()].filter((label) => !expected.includes(label));

  const problems = [
    ...(variants.length === 0 ? ['it has no variants'] : []),
    ...(variants.length > 0 && missing.length > 0 ? [`it is missing ${quoted(missing)}`] : []),
    ...(twice.length > 0 ? [`it has ${quoted(twice)} more than once`] : []),
    ...(unexpected.length > 0 ? [`it has the unexpected ${quoted(unexpected)}`] : []),
  ];
  if (problems.length === 0) return undefined;

  return `Icon set "${iconName}" is skipped because ${problems.join(' and ')}. Every icon set needs exactly the sizes ${profile.variants.sizes.join(', ')}, each with active true and false.`;
};

/** The name of the SVG file of an icon: its name, size and state. */
export const svgNameOf = (iconName: string, size: Size, active: boolean) =>
  `${iconName}-${size}-${active ? 'active' : 'inactive'}`;
