// ~500ms buffer reset, matching native `<select>`.
export const TYPEAHEAD_RESET_MS = 500;

const printableTypeaheadKeyRegex = /^[a-z0-9]$/i;

export function isPrintableTypeaheadKey(key: string): boolean {
  return printableTypeaheadKeyRegex.test(key);
}

type TypeaheadKeyEvent = Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey'>;

// Bare printable key, no modifier (shared by closed and open paths).
export function isTypeaheadKeyEvent(event: TypeaheadKeyEvent): boolean {
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  return isPrintableTypeaheadKey(event.key);
}

// Strip leading non-alphanumerics (e.g. icon/checkbox glyphs) so prefixes match.
export function normalizeOptionText(text: string | null | undefined): string {
  return (text ?? '').toLowerCase().replace(/^[^a-z0-9]+/, '');
}

// Native `<select>` semantics: a single (or repeated) char cycles options by first letter;
// a multi-char buffer keeps the focused option while it still prefix-matches.
export function getTypeaheadMatchIndex(
  labels: string[],
  search: string,
  currentIndex: number,
): number {
  const total = labels.length;
  if (!search || total === 0) return -1;

  const isRepeatedChar = search.length > 1 && [...search].every((char) => char === search[0]);
  const query = isRepeatedChar ? search[0] : search;

  const startOffset = query.length === 1 ? 1 : 0;
  const startFrom = currentIndex < 0 ? 0 : currentIndex + startOffset;

  for (let i = 0; i < total; i++) {
    const index = (startFrom + i) % total;
    if (labels[index].startsWith(query)) return index;
  }

  return -1;
}
