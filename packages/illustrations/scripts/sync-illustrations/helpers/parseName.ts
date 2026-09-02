import camelCase from 'lodash/camelCase';

export function parseName(node: { document: { name: string } }) {
  const parts = node.document.name.trim().split('/');
  if (parts.length < 2) {
    throw new Error(
      `${node.document.name} is not in [type]/[name] format. Update the Figma file to use this format.`,
    );
  }

  const [originalType, originalName] = parts;
  const type = camelCase(originalType);
  const name = originalName;

  // Regular expression to match camel case pattern; allows a lowercase letter or number as the first character
  const camelCasePattern = /^[a-z0-9][a-zA-Z0-9]*$/;

  if (!camelCasePattern.test(name)) {
    throw new Error(
      `Name is not in camelCase: ${name}. Update the Figma file with a new camelCase name for ${type}/${name}.`,
    );
  }

  return {
    type,
    name,
  };
}
