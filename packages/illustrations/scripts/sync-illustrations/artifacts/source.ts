/**
 * Prints the handful of TypeScript shapes the generated data files are made of, formatted the way
 * prettier formats them (print width 100, single quotes, trailing commas). Generating the final
 * form directly keeps the sync free of a formatter and makes the output byte-for-byte testable.
 */

const printWidth = 100;

export const indentUnit = '  ';

export const fitsPrintWidth = (line: string) => line.length <= printWidth;

/** ECMAScript identifier names, Unicode included, as prettier checks them before unquoting a key. */
const isIdentifier = /^[$_\p{ID_Start}][$\u200C\u200D\p{ID_Continue}]*$/u;

/** Single-quoted, unless the value holds more single than double quotes (prettier's `singleQuote`). */
export function stringLiteral(value: string) {
  const escaped = value.replace(/\\/g, '\\\\');
  const singleQuotes = (value.match(/'/g) ?? []).length;
  const doubleQuotes = (value.match(/"/g) ?? []).length;
  return singleQuotes > doubleQuotes
    ? `"${escaped.replace(/"/g, '\\"')}"`
    : `'${escaped.replace(/'/g, "\\'")}'`;
}

/** Quotes an object key only when it is not a valid identifier, like prettier's `quoteProps: as-needed`. */
export const propertyKey = (key: string) => (isIdentifier.test(key) ? key : stringLiteral(key));

/**
 * `prefix body` on one line when it fits, otherwise the body on its own, further indented line, the
 * way prettier breaks a long arrow function: `light: () =>\n      require('...').content,`.
 */
export function arrowProperty(key: string, body: string, { indent, suffix }: Required<Layout>) {
  const prefix = `${propertyKey(key)}: () =>`;
  const inline = `${indent}${prefix} ${body}${suffix}`;
  if (fitsPrintWidth(inline)) return inline;
  return `${indent}${prefix}\n${indent}${indentUnit}${body}${suffix}`;
}

export type Layout = { indent?: string; prefix?: string; suffix?: string };

/**
 * `prefix[a, b]suffix` on one line when that fits the print width, otherwise one item per line.
 * `items` are already-printed expressions.
 */
export function arrayLiteral(
  items: string[],
  { indent = '', prefix = '', suffix = '' }: Layout = {},
) {
  const inline = `${indent}${prefix}[${items.join(', ')}]${suffix}`;
  if (items.length === 0 || inline.length <= printWidth) return inline;

  const lines = items.map((item) => `${indent}${indentUnit}${item},`);
  return `${indent}${prefix}[\n${lines.join('\n')}\n${indent}]${suffix}`;
}

/**
 * An object with one property per line, or on a single line when every value is a plain
 * expression and the result fits. Each value is either an already-printed expression or a printer
 * that receives the layout of its property line (`indent`, `key: ` prefix and `,` suffix) and
 * returns the whole line, so it can decide how to break the value itself.
 */
export function objectLiteral(
  entries: [key: string, value: string | ((layout: Required<Layout>) => string)][],
  { indent = '', prefix = '', suffix = '' }: Layout = {},
) {
  if (entries.length === 0) return `${indent}${prefix}{}${suffix}`;

  const plainValues = entries.every(([, value]) => typeof value === 'string');
  const inline = `${indent}${prefix}{ ${entries.map(([key, value]) => `${propertyKey(key)}: ${value}`).join(', ')} }${suffix}`;
  if (plainValues && fitsPrintWidth(inline)) return inline;

  const lines = entries.map(([key, value]) => {
    const layout = {
      indent: `${indent}${indentUnit}`,
      prefix: `${propertyKey(key)}: `,
      suffix: ',',
    };
    if (typeof value === 'function') return value(layout);
    return `${layout.indent}${layout.prefix}${value}${layout.suffix}`;
  });
  return `${indent}${prefix}{\n${lines.join('\n')}\n${indent}}${suffix}`;
}

/** `export type Name = 'a' | 'b';`, broken into one member per line when it does not fit. */
export function stringUnionType(name: string, members: string[]) {
  const literals = members.map(stringLiteral);
  const inline = `export type ${name} = ${literals.join(' | ')};`;
  if (inline.length <= printWidth) return inline;
  return `export type ${name} =\n${literals.map((literal) => `${indentUnit}| ${literal}`).join('\n')};`;
}
