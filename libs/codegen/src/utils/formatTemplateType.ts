export function formatTemplateType(type: unknown): string {
  if (type === null) {
    return 'null';
  }

  switch (typeof type) {
    case 'number':
    case 'boolean':
    case 'undefined':
      return String(type);

    case 'string':
      return `"${type}"`;

    default:
      return JSON.stringify(type);
  }
}
