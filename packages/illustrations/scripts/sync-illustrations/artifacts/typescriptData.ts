import { byCreatedAt, type Illustration } from '../illustration';

import { arrayLiteral, objectLiteral, stringLiteral, stringUnionType } from './source';

/**
 * The TypeScript data artifacts every consumer of the illustrations package shares: the
 * `<Type>Name` union and, per type, the `names`, `descriptionMap` and `versionMap` modules.
 * Content only; the sink decides paths and passes the import specifiers it resolved.
 */

/** `heroSquare` -> `HeroSquare` */
export const pascalCase = (type: string) => `${type.charAt(0).toUpperCase()}${type.slice(1)}`;

/** The name of the string-literal union of every illustration name of a type, e.g. `HeroSquareName`. */
export const nameTypeOf = (type: string) => `${pascalCase(type)}Name`;

export type DataFileOptions = {
  type: string;
  /** Import specifier of the module declaring `<Type>Name`, relative to the data file. */
  nameTypeImport: string;
  header: string;
};

/**
 * Maps each description keyword to the illustrations that carry it. The docsite search matches a
 * query against these keywords as well as against illustration names.
 */
export function buildDescriptionMap(illustrations: Illustration[]) {
  const map: Record<string, string[]> = {};
  for (const { name, description } of illustrations) {
    for (const keyword of description.split(',').map((part) => part.trim())) {
      map[keyword] ??= [];
      if (!map[keyword].includes(name)) map[keyword].push(name);
    }
  }
  return map;
}

/** `types/<Type>Name.ts`: the string-literal union of every name, alphabetically. */
export const renderNameType = (type: string, illustrations: Illustration[], header: string) =>
  `${header}

${stringUnionType(
  nameTypeOf(type),
  illustrations.map(({ name }) => name).sort((a, b) => a.localeCompare(b)),
)}
`;

/** `data/names.ts`: every name, default sort order. */
export const renderNames = (
  illustrations: Illustration[],
  { type, nameTypeImport, header }: DataFileOptions,
) => `${header}

import type { ${nameTypeOf(type)} } from '${nameTypeImport}';

/**
 * An array of all ${pascalCase(type)} illustrations.
 * This is being used to display a sheet of all ${pascalCase(type)} illustration on the CDS website.
 */
${arrayLiteral(
  illustrations
    .map(({ name }) => name)
    .sort()
    .map(stringLiteral),
  { prefix: `const names: ${nameTypeOf(type)}[] = `, suffix: ';' },
)}

export default names;
`;

/** `data/descriptionMap.ts`: keyword -> names, in createdAt order. */
export const renderDescriptionMap = (
  illustrations: Illustration[],
  { type, header }: Omit<DataFileOptions, 'nameTypeImport'>,
) => `${header}

/**
 * Mapping of descriptions to associated illustrations.
 * This is being used on the search portion of the ${pascalCase(type)} page on the CDS website.
 * The search query filters the shown illustrations based on matches with name or description.
 */
${objectLiteral(
  Object.entries(buildDescriptionMap([...illustrations].sort(byCreatedAt))).map(
    ([keyword, names]) => [keyword, (layout) => arrayLiteral(names.map(stringLiteral), layout)],
  ),
  { prefix: 'const descriptionMap: Record<string, string[]> = ', suffix: ';' },
)}

export default descriptionMap;
`;

/** `data/versionMap.ts`: name -> version, in createdAt order (the percy stories depend on it). */
export const renderVersionMap = (
  illustrations: Illustration[],
  { type, nameTypeImport, header }: DataFileOptions,
) => `${header}

import type { ${nameTypeOf(type)} } from '${nameTypeImport}';

/**
 * Currently used on web for interpolating the URL to CDN hosted asset using the name and version number.
 *
 * For example, given the following ${pascalCase(type)} versionMap, '{ someIllustration: 2 }', and
 * JSX such as '<${pascalCase(type)} name="someIllustration />' will result in an image with the following URL:
 *
 * 'https://static-assets.coinbase.com/design-system/illustrations/${type}/light/someIllustration-2.svg
 *
 * In addition, this file is used to populate ${pascalCase(type)} stories in percy, so the sort order based on createdAt is important.
 */
${objectLiteral(
  [...illustrations]
    .sort(byCreatedAt)
    .map(({ name, version }): [string, string] => [name, String(version)]),
  { prefix: `const versionMap: Record<${nameTypeOf(type)}, number> = `, suffix: ';' },
)}

export default versionMap;
`;
