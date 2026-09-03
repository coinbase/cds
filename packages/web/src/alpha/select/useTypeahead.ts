import { useCallback, useEffect, useRef } from 'react';

import { getBrowserGlobals } from '../../utils/browser';

import {
  getTypeaheadMatchIndex,
  isTypeaheadKeyEvent,
  normalizeOptionText,
  TYPEAHEAD_RESET_MS,
} from './typeahead';

type ElementRef = { current: HTMLElement | null };

export type UseTypeaheadOptions = {
  /** Open state of the Select. */
  open: boolean;
  /** Setter used to open the Select when typing while closed. */
  setOpen: (open: boolean) => void;
  /** Ref to the control (reference) element. */
  referenceRef: ElementRef;
  /** Ref to the floating dropdown element that hosts the options. */
  floatingRef: ElementRef;
  /** Role used to query option elements within the dropdown. */
  optionRole: string;
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
  open,
  setOpen,
  referenceRef,
  floatingRef,
  optionRole,
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

    const floatingEl = floatingRef.current;
    if (!floatingEl) return;

    const optionElements = Array.from(
      floatingEl.querySelectorAll<HTMLElement>(`[role="${optionRole}"]`),
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
  }, [floatingRef, optionRole]);

  const onControlKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // When open, the window listener owns typeahead.
      if (disabled || readOnly || open || !isTypeaheadKeyEvent(event)) return;

      appendToTypeaheadBuffer(event.key);
      pendingTypeaheadRef.current = true;
      setOpen(true);
    },
    [disabled, readOnly, open, setOpen, appendToTypeaheadBuffer],
  );

  useEffect(() => {
    if (!open || !pendingTypeaheadRef.current) return;
    pendingTypeaheadRef.current = false;
    focusTypeaheadMatch();
  }, [open, focusTypeaheadMatch]);

  // Window listener needed: focus moves into the portaled dropdown, past the control's handler.
  useEffect(() => {
    if (!open || disabled || readOnly) return;
    const globals = getBrowserGlobals();
    if (!globals) return;
    const { window: browserWindow, document: browserDocument } = globals;

    const handleWindowKeyDown = (event: KeyboardEvent) => {
      if (!isTypeaheadKeyEvent(event)) return;

      const controlElement = referenceRef.current;
      const floatingElement = floatingRef.current;
      const activeElement = browserDocument.activeElement;
      const withinSelect =
        (!!controlElement && controlElement.contains(activeElement)) ||
        (!!floatingElement && floatingElement.contains(activeElement));
      if (!withinSelect) return;

      appendToTypeaheadBuffer(event.key);
      focusTypeaheadMatch();
    };

    browserWindow.addEventListener('keydown', handleWindowKeyDown);
    return () => browserWindow.removeEventListener('keydown', handleWindowKeyDown);
  }, [
    open,
    disabled,
    readOnly,
    referenceRef,
    floatingRef,
    appendToTypeaheadBuffer,
    focusTypeaheadMatch,
  ]);

  useEffect(
    () => () => {
      if (typeaheadResetTimeoutRef.current) clearTimeout(typeaheadResetTimeoutRef.current);
    },
    [],
  );

  return { onControlKeyDown };
}
