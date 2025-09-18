export function sortByAlphabet(prev: string, next: string) {
  /** @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator/Collator */
  return prev.localeCompare(next, undefined, { numeric: true, sensitivity: 'base' });
}
