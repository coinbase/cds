/** Converts a camelCase or space-separated string to PascalCase (`heroSquare` -> `HeroSquare`). */
export function pascalCase(str: string): string {
  return str
    .split(' ')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('');
}
