/**
 * Reads the properties of a Figma variant name such as `size=24, active=false`. `true` and
 * `false` become booleans. A value stays text unless its property is listed in `numeric`, where a
 * whole number becomes a number: a sync lists the properties its profile declares as numbers, so
 * one profile can keep `size` as text and another turn it into a number.
 */
export const parseVariantName = (
  name: string,
  numeric: readonly string[] = [],
): Record<string, unknown> => {
  const properties: Record<string, unknown> = {};
  for (const property of name.split(',')) {
    const [rawName, value] = property.trim().split('=');
    const propertyName = rawName.trim();
    if (value === 'true') properties[propertyName] = true;
    else if (value === 'false') properties[propertyName] = false;
    else if (value !== undefined && numeric.includes(propertyName) && /^-?\d+$/.test(value)) {
      properties[propertyName] = Number(value);
    } else properties[propertyName] = value;
  }
  return properties;
};
