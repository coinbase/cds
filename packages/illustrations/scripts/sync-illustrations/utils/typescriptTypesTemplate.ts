/**
 * Tagged template for generated TypeScript types: an interpolated array is sorted and joined into
 * a string-literal union.
 *
 * ```ts
 * typescriptTypesTemplate`type PaletteName = ${['foreground', 'background']};`;
 * // -> type PaletteName = 'background'|'foreground';
 * ```
 */
export function typescriptTypesTemplate(strings: TemplateStringsArray, ...expr: unknown[]): string {
  expr.forEach((item) => {
    if (!Array.isArray(item)) return;

    const union = item
      .sort((prevKey: string | number, nextKey: string | number): number => {
        if (typeof prevKey === 'string' && typeof nextKey === 'string') {
          return prevKey.localeCompare(nextKey);
        }
        if (typeof prevKey === 'number' && typeof nextKey === 'number') {
          return prevKey - nextKey;
        }
        return -1;
      })
      .map((val) => (typeof val === 'string' ? `'${val}'` : `${val}`))
      .join('|');

    Object.defineProperty(item, 'toString', {
      value() {
        return union;
      },
    });
  });

  // `|| ''` rather than `?? ''` to match the upstream sync byte for byte.
  return strings.reduce((acc, string, i) => `${acc}${string}${expr[i] || ''}`, '');
}
