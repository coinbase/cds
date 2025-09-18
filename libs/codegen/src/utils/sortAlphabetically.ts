export function sortByAlphabet(prev: string | [string, unknown], next: string | [string, unknown]) {
  const prevValue = Array.isArray(prev) ? prev[0] : prev;
  const nextValue = Array.isArray(next) ? next[0] : next;
  return prevValue.localeCompare(nextValue);
}
