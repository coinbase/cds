/**
 * Time in milliseconds after the last keystroke before the typeahead search buffer resets,
 * mirroring the ~500ms window used by native `<select>` elements.
 */
export const TYPEAHEAD_RESET_MS = 500;

/** Matches the single printable characters that contribute to the typeahead buffer. */
const printableTypeaheadKeyRegex = /^[a-z0-9]$/i;

/**
 * Whether a keyboard key should be appended to the typeahead search buffer. Only single
 * alphanumeric characters qualify so that navigation keys (arrows, Enter, Escape, etc.) keep
 * their existing behavior.
 */
export function isPrintableTypeaheadKey(key: string): boolean {
  return printableTypeaheadKeyRegex.test(key);
}

/**
 * Normalizes an option's text for prefix matching: lowercases it and drops any leading
 * non-alphanumeric characters (e.g. icons or checkbox glyphs rendered before the label).
 */
export function normalizeOptionText(text: string | null | undefined): string {
  return (text ?? '').toLowerCase().replace(/^[^a-z0-9]+/, '');
}

/**
 * Finds the index of the option that should receive focus for the current typeahead buffer,
 * mirroring native `<select>` semantics.
 *
 * - A single character (or the same character pressed repeatedly) cycles through every option
 *   whose label starts with that character, beginning after the currently focused option.
 * - A multi-character buffer performs a prefix match and keeps the current option focused while
 *   it still matches, so refining the search does not jump away unexpectedly.
 *
 * @param labels Normalized option labels, in DOM order.
 * @param search The accumulated, lowercased search buffer.
 * @param currentIndex Index of the currently focused option, or -1 when none is focused.
 * @returns The matching option index, or -1 when nothing matches.
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

  // Single-character searches cycle to the next match; multi-character searches allow the
  // current option to stay focused while it still matches the refined buffer.
  const startOffset = query.length === 1 ? 1 : 0;
  const startFrom = currentIndex < 0 ? 0 : currentIndex + startOffset;

  for (let i = 0; i < total; i++) {
    const index = (startFrom + i) % total;
    if (labels[index].startsWith(query)) return index;
  }

  return -1;
}
