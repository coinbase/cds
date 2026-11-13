import { useCallback, useEffect, useRef } from 'react';

import { getBrowserGlobals } from '../../utils/browser';

// ~500ms buffer reset, matching native `<select>`.
export const TYPEAHEAD_RESET_MS = 500;

// Glyphs that can precede an option's label but are never typed to find it: whitespace, ASCII and
// Latin-1 punctuation/symbols, symbol blocks such as arrows and dingbats (e.g. "✓"), CJK
// punctuation, icon font glyphs (Private Use Area) and emoji with their presentation selector.
// Letters and digits of every script are kept. These are listed as ranges because Babel expands
// `\p{L}` into a multi-kilobyte regex for the older Safari versions in our browserslist.
const leadingNonTextRegex =
  /^(?:[\s\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E\u00A0-\u00BF\u00D7\u00F7\u2000-\u2BFF\u3000-\u303F\uE000-\uF8FF]|[\uD83C-\uD83E\uDB80-\uDBFF][\uDC00-\uDFFF]|\uFE0F)+/;

// A single character in any script, excluding the non-text glyphs above.
export function isPrintableTypeaheadKey(key: string): boolean {
  return [...key].length === 1 && !leadingNonTextRegex.test(key);
}

// Union accepts both React's synthetic event (control handler) and the native event (window listener).
// Bare printable key, no modifier (shared by closed and open paths).
export function isTypeaheadKeyEvent(event: React.KeyboardEvent | KeyboardEvent): boolean {
  if (event.ctrlKey || event.metaKey || event.altKey) return false;
  return isPrintableTypeaheadKey(event.key);
}

// Strip leading non-text glyphs (e.g. icon/checkbox glyphs) so prefixes match.
export function normalizeOptionText(text: string | null | undefined): string {
  return (text ?? '').toLowerCase().replace(leadingNonTextRegex, '');
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

type ElementRef = { current: HTMLElement | null };

export type UseTypeaheadOptions = {
  /** Whether the items container is visible (open). */
  areItemsVisible: boolean;
  /** Setter used to reveal items when typing while hidden. */
  setAreItemsVisible: (visible: boolean) => void;
  /** Ref to the trigger element. */
  triggerRef: ElementRef;
  /** Ref to the container element that hosts the items. */
  itemsContainerRef: ElementRef;
  /** Role used to query item elements within the container. */
  itemRole: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type UseTypeaheadResult = {
  /** Attach to the control's `onKeyDown`; handles the closed-state type-to-open path. */
  onControlKeyDown: (event: React.KeyboardEvent) => void;
};

/**
 * Native `<select>`-style typeahead for the Select (Alpha). Printable keys build a short-lived
 * buffer that focuses the matching option, both while closed (type-to-open) and open.
 */
export function useTypeahead({
  areItemsVisible,
  setAreItemsVisible,
  triggerRef,
  itemsContainerRef,
  itemRole,
  disabled,
  readOnly,
}: UseTypeaheadOptions): UseTypeaheadResult {
  const typeaheadBufferRef = useRef('');
  const typeaheadResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingTypeaheadRef = useRef(false);

  const appendToTypeaheadBuffer = useCallback((key: string) => {
    typeaheadBufferRef.current += key.toLowerCase();
    if (typeaheadResetTimeoutRef.current) clearTimeout(typeaheadResetTimeoutRef.current);
    typeaheadResetTimeoutRef.current = setTimeout(() => {
      typeaheadBufferRef.current = '';
    }, TYPEAHEAD_RESET_MS);
  }, []);

  const focusTypeaheadMatch = useCallback(() => {
    const search = typeaheadBufferRef.current;
    if (!search) return;

    const containerEl = itemsContainerRef.current;
    if (!containerEl) return;

    const optionElements = Array.from(
      containerEl.querySelectorAll<HTMLElement>(`[role="${itemRole}"]`),
    ).filter(
      (option) =>
        !(option as HTMLButtonElement).disabled && option.getAttribute('aria-disabled') !== 'true',
    );
    if (optionElements.length === 0) return;

    const labels = optionElements.map((option) => normalizeOptionText(option.textContent));
    const activeElement = getBrowserGlobals()?.document.activeElement as HTMLElement | null;
    const currentIndex = activeElement ? optionElements.indexOf(activeElement) : -1;

    const matchIndex = getTypeaheadMatchIndex(labels, search, currentIndex);
    if (matchIndex >= 0) optionElements[matchIndex].focus();
  }, [itemsContainerRef, itemRole]);

  const onControlKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // When items are visible, the window listener owns typeahead.
      if (disabled || readOnly || areItemsVisible || !isTypeaheadKeyEvent(event)) return;

      appendToTypeaheadBuffer(event.key);
      pendingTypeaheadRef.current = true;
      setAreItemsVisible(true);
    },
    [disabled, readOnly, areItemsVisible, setAreItemsVisible, appendToTypeaheadBuffer],
  );

  // After a type-to-open, focus the match once the dropdown (and its options) have rendered.
  useEffect(() => {
    if (!areItemsVisible || !pendingTypeaheadRef.current) return;
    pendingTypeaheadRef.current = false;
    focusTypeaheadMatch();
  }, [areItemsVisible, focusTypeaheadMatch]);

  // Window listener needed: focus moves into the portaled dropdown, past the control's handler.
  useEffect(() => {
    if (!areItemsVisible || disabled || readOnly) return;
    const globals = getBrowserGlobals();
    if (!globals) return;
    const { window: browserWindow, document: browserDocument } = globals;

    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (!isTypeaheadKeyEvent(event)) return;

      const triggerElement = triggerRef.current;
      const containerElement = itemsContainerRef.current;
      const activeElement = browserDocument.activeElement;
      const withinSelect =
        (!!triggerElement && triggerElement.contains(activeElement)) ||
        (!!containerElement && containerElement.contains(activeElement));
      if (!withinSelect) return;

      appendToTypeaheadBuffer(event.key);
      focusTypeaheadMatch();
    };

    browserWindow.addEventListener('keydown', handleWindowKeyDown);
    // A reset timeout is only ever pending during an open interaction, so clearing it here also
    // covers unmount (no dedicated cleanup-only effect needed).
    return () => {
      browserWindow.removeEventListener('keydown', handleWindowKeyDown);
      if (typeaheadResetTimeoutRef.current) clearTimeout(typeaheadResetTimeoutRef.current);
    };
  }, [
    areItemsVisible,
    disabled,
    readOnly,
    triggerRef,
    itemsContainerRef,
    appendToTypeaheadBuffer,
    focusTypeaheadMatch,
  ]);

  return { onControlKeyDown };
}
