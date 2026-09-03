/**
 * Case- and number-aware alphabetical comparator. Accepts either bare strings or
 * `Object.entries`-style tuples, so it can sort both name lists and keyed manifest entries.
 */
export function sortByAlphabet(
  prev: string | [string, unknown],
  next: string | [string, unknown],
): number {
  const prevValue = Array.isArray(prev) ? prev[0] : prev;
  const nextValue = Array.isArray(next) ? next[0] : next;

  return prevValue.localeCompare(nextValue, undefined, { numeric: true, sensitivity: 'base' });
}
