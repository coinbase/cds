const ICON_SET_NAME = /^(ui|nav)\/[^/]+$/;

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
