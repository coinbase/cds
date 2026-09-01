// Mirrors the ~500ms buffer-reset window used by native `<select>` typeahead.
export const TYPEAHEAD_RESET_MS = 500;

const printableTypeaheadKeyRegex = /^[a-z0-9]$/i;

export function isPrintableTypeaheadKey(key: string): boolean {
  return printableTypeaheadKeyRegex.test(key);
}

type TypeaheadKeyEvent = Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey'>;

// Shared guard for both the closed-state (control onKeyDown) and open-state (window keydown)
// paths: a bare printable key with no modifier that would otherwise be a shortcut.
export function isTypeaheadKeyEvent(event: TypeaheadKeyEvent): boolean {
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  return isPrintableTypeaheadKey(event.key);
}

// Drops leading non-alphanumerics so icons or checkbox glyphs rendered before the label do not
// break prefix matching.
export function normalizeOptionText(text: string | null | undefined): string {
  return (text ?? '').toLowerCase().replace(/^[^a-z0-9]+/, '');
}

/**
 * Finds the option index to focus for the current buffer, mirroring native `<select>`:
 * a single (or repeated single) character cycles through options sharing that first letter
 * starting after the focused one, while a multi-character buffer keeps the focused option as
 * long as it still prefix-matches.
 */
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
