import {
  getTypeaheadMatchIndex,
  isPrintableTypeaheadKey,
  normalizeOptionText,
  TYPEAHEAD_RESET_MS,
} from '../typeahead';

describe('typeahead helpers', () => {
  describe('isPrintableTypeaheadKey', () => {
    it.each(['a', 'Z', '5'])('treats single alphanumeric "%s" as printable', (key) => {
      expect(isPrintableTypeaheadKey(key)).toBe(true);
    });

    it.each(['Enter', 'ArrowDown', 'Escape', ' ', '-', 'ab'])(
      'treats "%s" as non-printable',
      (key) => {
        expect(isPrintableTypeaheadKey(key)).toBe(false);
      },
    );
  });

  describe('normalizeOptionText', () => {
    it('lowercases the text', () => {
      expect(normalizeOptionText('Banana')).toBe('banana');
    });

    it('strips leading non-alphanumeric characters', () => {
      expect(normalizeOptionText('  ✓ Banana')).toBe('banana');
    });

    it('handles nullish input', () => {
      expect(normalizeOptionText(null)).toBe('');
      expect(normalizeOptionText(undefined)).toBe('');
    });
  });

  describe('getTypeaheadMatchIndex', () => {
    const labels = ['apple', 'banana', 'blueberry', 'cherry'];

    it('returns -1 when there is no search or no options', () => {
      expect(getTypeaheadMatchIndex(labels, '', -1)).toBe(-1);
      expect(getTypeaheadMatchIndex([], 'a', -1)).toBe(-1);
    });

    it('finds the first prefix match when nothing is focused', () => {
      expect(getTypeaheadMatchIndex(labels, 'b', -1)).toBe(1);
    });

    it('cycles to the next match on a repeated single character', () => {
      // Focused on "banana" (index 1), pressing "b" again should move to "blueberry".
      expect(getTypeaheadMatchIndex(labels, 'b', 1)).toBe(2);
    });

    it('wraps around when cycling past the last match', () => {
      // Focused on "blueberry" (index 2), pressing "b" wraps back to "banana".
      expect(getTypeaheadMatchIndex(labels, 'b', 2)).toBe(1);
    });

    it('treats a repeated same character buffer as cycling', () => {
      expect(getTypeaheadMatchIndex(labels, 'bb', 1)).toBe(2);
    });

    it('performs a multi-character prefix match and keeps the current option when it still matches', () => {
      // Focused on "banana" (index 1) after typing "b"; refining to "ba" keeps "banana".
      expect(getTypeaheadMatchIndex(labels, 'ba', 1)).toBe(1);
    });

    it('moves to a different option when the refined buffer no longer matches the current one', () => {
      // Focused on "banana" (index 1); refining to "bl" should jump to "blueberry".
      expect(getTypeaheadMatchIndex(labels, 'bl', 1)).toBe(2);
    });

    it('returns -1 when nothing matches', () => {
      expect(getTypeaheadMatchIndex(labels, 'z', -1)).toBe(-1);
    });
  });

  it('exposes a reset timeout constant', () => {
    expect(TYPEAHEAD_RESET_MS).toBe(500);
  });
});
