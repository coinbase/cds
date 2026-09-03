import { sortByAlphabet } from './sortByAlphabet';

function isPrimitiveArray(items: unknown[]): items is (string | number)[] {
  return items.every((val) => typeof val === 'string' || typeof val === 'number');
}

type CreateTokensTemplateOptions = {
  sort?: boolean;
  sortMapKeys?: boolean;
  sortObjectKeys?: boolean;
  sortSetValues?: boolean;
  sortArrayValues?: boolean;
};

/**
 * Builds a tagged template function that stringifies interpolated Maps, Sets, objects and arrays
 * into source-ready literals, optionally sorting them.
 *
 * ```ts
 * const lightStyles = new Map([['foreground', 'foreground_id']]);
 * tokensTemplate`export const light = ${lightStyles};`;
 * // -> export const light = {"foreground":"foreground_id"};
 * ```
 */
export function createTokensTemplate({
  sort = true,
  sortMapKeys = sort,
  sortObjectKeys = sort,
  sortSetValues = sort,
  sortArrayValues = sort,
}: CreateTokensTemplateOptions) {
  return function template(strings: TemplateStringsArray, ...expr: unknown[]): string {
    /**
     * Tagged templates stringify each interpolation themselves, so rather than building the value
     * here we attach a `toString` to the original expression and let concatenation pick it up.
     */
    expr.forEach((item) => {
      let result: unknown;

      if (
        item &&
        typeof item === 'object' &&
        !(item instanceof Map) &&
        !(item instanceof Set) &&
        !Array.isArray(item)
      ) {
        result = sortObjectKeys
          ? Object.fromEntries(Object.entries(item).sort(sortByAlphabet))
          : item;
      }

      if (item instanceof Map) {
        const entries = [...(item as Map<string, unknown>).entries()];
        result = Object.fromEntries(sortMapKeys ? entries.sort(sortByAlphabet) : entries);
      }

      if (item instanceof Set) {
        const values = [...(item as Set<string>).values()];
        result = sortSetValues ? values.sort(sortByAlphabet) : values;
      }

      if (Array.isArray(item)) {
        result = isPrimitiveArray(item) && sortArrayValues ? [...item].sort() : item;
      }

      if (result && typeof result !== 'string') {
        Object.defineProperty(item, 'toString', {
          value() {
            return JSON.stringify(result);
          },
        });
      }
    });

    // `|| ''` rather than `?? ''` to match the upstream sync byte for byte.
    return strings.reduce((acc, string, i) => `${acc}${string}${expr[i] || ''}`, '');
  };
}

export const tokensSortedTemplate = createTokensTemplate({});

export const tokensTemplate = createTokensTemplate({ sort: false });
