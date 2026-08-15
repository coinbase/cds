export const stringToObject = (str: string): Record<string, unknown> => {
  const object: Record<string, unknown> = {};
  const propStrings = str.split(',');

  for (const propString of propStrings) {
    const [propName, propValue] = propString.trim().split('=');
    const prop = propName.trim();

    // Convert numeric strings to number
    if (/^-?\d+$/.test(propValue)) {
      const numericValue = Number(propValue);
      object[prop] = numericValue;
    } else if (['true', 'false'].includes(propValue)) {
      // Convert string booleans to boolean
      const isTrue = propValue === 'true';
      object[prop] = isTrue;
    } else {
      // Otherwise return the original value
      object[prop] = propValue;
    }
  }

  return object;
};
