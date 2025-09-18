import humps from 'humps';
import type { CamelCase, KebabCase, PascalCase, SnakeCase, Split } from 'type-fest';

const { camelize, decamelize, pascalize } = humps;

export const camelCase = <T extends string>(str: T): CamelCase<T> => camelize(str) as CamelCase<T>;
export const pascalCase = <T extends string>(str: T) => pascalize(str) as PascalCase<typeof str>;
export const wordCase = <T extends string>(str: T) => decamelize(str, { separator: ' ' });

export const kebabCase = <T extends string>(str: T) =>
  decamelize(str, { separator: '-' }) as KebabCase<typeof str>;

export const snakeCase = <T extends string>(str: T) =>
  decamelize(str, { separator: '_' }) as SnakeCase<typeof str>;

export const toCssVar = <T extends string>(str: T) => {
  return `--${kebabCase(str)}` as const;
};

export const split = <T extends string, K extends string>(str: T, separator: K) => {
  return str.split(separator) as Split<T, K>;
};

export const toCssVarFn = <T extends string>(str: T) => {
  return `var(${toCssVar(str)})` as const;
};

export const capitalize = <T extends string>(str: T): Capitalize<T> => {
  return (str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)) as Capitalize<T>;
};

// @danger most cases should use useId from react
export const generateRandomId = <T extends string>(prefix?: T) => {
  return Math.random()
    .toString(36)
    .replace('0.', prefix ?? '');
};
