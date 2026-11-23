import { parseVariantName } from '@cds/figma-api/variantName';

const ICON_SET_NAME = /^(ui|nav)\/[^/]+$/;

/** The properties of a variant name that are numbers in this profile: `size` is a number of pixels. */
const numericVariantProps = ['size'];

/** Reads the properties of an icon component name such as `size=24, active=false`. */
export const parseIconVariantName = (componentName: string) =>
  parseVariantName(componentName, numericVariantProps);

/** What is wrong with an icon set's name in Figma, or undefined when it is valid. */
export const iconSetNameProblem = (figmaName: string) =>
  ICON_SET_NAME.test(figmaName.trim())
    ? undefined
    : `Icon set "${figmaName}" is not named "ui/<name>" or "nav/<name>". Rename the icon set in Figma.`;

/**
 * What is wrong with an icon component's properties, or undefined when it is valid. Components are
 * named after their properties, like "size=24, active=false".
 */
export const iconPropsProblem = (
  iconName: string,
  componentName: string,
  { size, active }: Record<string, unknown>,
) => {
  const where = `"${componentName}" in icon set "${iconName}"`;
  const format = 'Name icon components like "size=24, active=false".';
  if (size === undefined) return `${where} is missing a "size" property. ${format}`;
  if (typeof size !== 'number') return `${where} has a "size" that is not a number. ${format}`;
  if (active === undefined) return `${where} is missing an "active" property. ${format}`;
  if (typeof active !== 'boolean') {
    return `${where} has an "active" that is not true or false. ${format}`;
  }
  return undefined;
};

/** The variants every icon set has: each size, active and inactive. */
export const iconVariants = { sizes: [12, 16, 24], states: [true, false] } as const;

type Variant = { size: number; active: boolean };

const variantLabel = ({ size, active }: Variant) => `size=${size}, active=${active}`;

const expectedVariantLabels = iconVariants.sizes.flatMap((size) =>
  iconVariants.states.map((active) => variantLabel({ size, active })),
);

/**
 * What is wrong with the variants of an icon set as a whole, or undefined when it has exactly the
 * expected ones: none missing, none twice, none that should not be there.
 */
export const iconVariantsProblem = (setName: string, variants: readonly Variant[]) => {
  const counts = new Map<string, number>();
  for (const variant of variants) {
    const label = variantLabel(variant);
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  const quoted = (labels: string[]) => labels.map((label) => `"${label}"`).join(', ');
  const missing = expectedVariantLabels.filter((label) => !counts.has(label));
  const twice = [...counts].filter(([, count]) => count > 1).map(([label]) => label);
  const unexpected = [...counts.keys()].filter((label) => !expectedVariantLabels.includes(label));

  const problems = [
    ...(variants.length === 0 ? ['it has no variants'] : []),
    ...(variants.length > 0 && missing.length > 0 ? [`it is missing ${quoted(missing)}`] : []),
    ...(twice.length > 0 ? [`it has ${quoted(twice)} more than once`] : []),
    ...(unexpected.length > 0 ? [`it has the unexpected ${quoted(unexpected)}`] : []),
  ];
  if (problems.length === 0) return undefined;

  const sizes = iconVariants.sizes.join(', ');
  return `Icon set "${setName}" is skipped because ${problems.join(' and ')}. Every icon set needs exactly the sizes ${sizes}, each with active true and false.`;
};

/**
 * What is wrong with an icon set whose icon name is already taken by another icon set, which is
 * the one kept. The icon name is the part after "ui/" or "nav/".
 */
export const iconDuplicateProblem = (setName: string, iconName: string, otherIconName: string) =>
  otherIconName === iconName
    ? `Icon set "${setName}" is skipped because the Figma file has two icon sets with the icon name "${iconName}" (the part after "ui/" or "nav/"). Rename one of them.`
    : `Icon set "${setName}" is skipped because its icon name "${iconName}" differs only in capitalization from "${otherIconName}" in another icon set of the Figma file. Rename one of them.`;
