import { getLocalVariables, getPublishedVariables } from '@cds/figma-api';
import type {
  GetLocalVariablesResponse,
  GetPublishedVariablesResponse,
  LocalVariable,
  RGBA,
  VariableAlias,
} from '@figma/rest-api-spec';

import { ColorPalette, type PaletteColor } from '../colorPalette';

type ColorMode = 'light' | 'dark';

type VariableValue = LocalVariable['valuesByMode'][string];

const isAlias = (value: VariableValue): value is VariableAlias =>
  typeof value === 'object' && 'type' in value && value.type === 'VARIABLE_ALIAS';

const isColor = (value: VariableValue): value is RGBA =>
  typeof value === 'object' && 'r' in value && 'g' in value && 'b' in value;

const toHexByte = (fraction: number) =>
  Math.round(fraction * 255)
    .toString(16)
    .toUpperCase()
    .padStart(2, '0');

/** `{ r: 0, g: 0.32, b: 1, a: 1 }` -> `#0052FF`; a non-opaque alpha is appended as a fourth byte. */
export function rgbaToHex({ r, g, b, a }: RGBA) {
  const alpha = a === 1 ? '' : toHexByte(a);
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}${alpha}`;
}

/** `illustration/gray 3` -> `gray-3`. */
const toColorName = (variableName: string) =>
  variableName.slice(variableName.indexOf('/') + 1).replace(/\s+/g, '-');

const modeFromName = (modeName: string): ColorMode | undefined => {
  const lower = modeName.toLowerCase();
  if (lower.includes('light')) return 'light';
  if (lower.includes('dark')) return 'dark';
  return undefined;
};

/** Follows variable aliases until a concrete color is reached. */
function resolveColor(
  value: VariableValue,
  modeId: string,
  variables: Record<string, LocalVariable>,
  depth = 0,
): RGBA | undefined {
  if (depth > 10) throw new Error('Variable alias chain is too deep; is there a cycle?');
  if (!isAlias(value)) return isColor(value) ? value : undefined;

  const target = variables[value.id];
  if (!target) throw new Error(`Variable alias points at unknown variable ${value.id}`);
  const targetValue = target.valuesByMode[modeId] ?? Object.values(target.valuesByMode)[0];
  return resolveColor(targetValue, modeId, variables, depth + 1);
}

/**
 * Builds the palette from the Variables API responses: every published variable named
 * `<prefix>/...` whose collection has a light and a dark mode. Pure, so it is unit tested against
 * recorded responses.
 */
export function buildColorPalette(
  local: GetLocalVariablesResponse,
  published: GetPublishedVariablesResponse,
  prefix: string,
): ColorPalette {
  const { variables, variableCollections } = local.meta;
  const publishedIds = new Set(Object.keys(published.meta.variables));

  const paletteVariables = Object.values(variables).filter(
    (variable) =>
      publishedIds.has(variable.id) &&
      variable.resolvedType === 'COLOR' &&
      variable.name.toLowerCase().startsWith(`${prefix.toLowerCase()}/`),
  );

  const palette = paletteVariables.map((variable) => {
    const collection = variableCollections[variable.variableCollectionId];
    const modeIds: Partial<Record<ColorMode, string>> = {};
    for (const mode of collection.modes) {
      const colorMode = modeFromName(mode.name);
      if (colorMode) modeIds[colorMode] = mode.modeId;
    }

    const hexFor = (colorMode: ColorMode) => {
      const modeId = modeIds[colorMode];
      const color = modeId && resolveColor(variable.valuesByMode[modeId], modeId, variables);
      if (!color) {
        throw new Error(`Variable "${variable.name}" has no ${colorMode} color value`);
      }
      return rgbaToHex(color);
    };

    return { name: toColorName(variable.name), light: hexFor('light'), dark: hexFor('dark') };
  });

  return new ColorPalette(palette.sort((a, b) => a.name.localeCompare(b.name)));
}

/**
 * Fetches the illustration palette from the colors Figma file. The published endpoint tells us
 * which variables are published; the local endpoint carries their values.
 *
 * Requires Enterprise org access and the `file_variables:read` scope on the Figma token.
 */
export async function fetchColorPalette(fileId: string, prefix: string): Promise<ColorPalette> {
  const [local, published] = await Promise.all([
    getLocalVariables(fileId),
    getPublishedVariables(fileId),
  ]);

  const palette = buildColorPalette(local, published, prefix);
  if (palette.size === 0) {
    throw new Error(`No published color variables named "${prefix}/..." found in file ${fileId}`);
  }
  return palette;
}
