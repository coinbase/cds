import camelCase from 'lodash/camelCase';

/** Names in Figma are `[Type]/[name]`, e.g. `Spot Square/baseErrorMedium`. */
const camelCasePattern = /^[a-z0-9][a-zA-Z0-9]*$/;

/**
 * Splits a Figma component name into the illustration type and name, e.g.
 * `Spot Square/baseErrorMedium` -> `{ type: 'spotSquare', name: 'baseErrorMedium' }`.
 */
export function parseComponentName(figmaName: string) {
  const parts = figmaName.trim().split('/');
  if (parts.length !== 2) {
    throw new Error(
      `"${figmaName}" is not in [type]/[name] format. Update the Figma file to use this format.`,
    );
  }

  const [rawType, rawName] = parts;
  const type = camelCase(rawType);
  const name = rawName.trim();

  if (!camelCasePattern.test(name)) {
    throw new Error(
      `"${name}" is not camelCase. Update the Figma file with a camelCase name for ${type}/${name}.`,
    );
  }

  return { type, name };
}
