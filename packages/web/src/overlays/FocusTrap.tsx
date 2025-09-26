import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactElement, RefObject } from 'react';
import { FOCUSABLE_ELEMENTS } from '@coinbase/cds-common/tokens/overlays';
import { debounce } from '@coinbase/cds-common/utils/debounce';

import { getBrowserGlobals } from '../utils/browser';

export type FocusTrapProps = {
  children: ReactElement;
  onEscPress?: () => void;
  /**
   * Use for editable Search Input components to ensure focus is correctly applied
   */
  disableTypeFocus?: boolean;
  /**
   * Disables the focus trap to allow normal keyboard navigation.
   */
  disableFocusTrap?: boolean;
  /**
   * If `true`, the focus trap will include the trigger in the focus trap.
   */
  includeTriggerInFocusTrap?: boolean;
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * @default false
   */
  disableAutoFocus?: boolean;
  /**
   * If `true`, the focus trap will restore focus to the previously focused element when it unmounts.
   * @default false
   */
  restoreFocusOnUnmount?: boolean;
  /**
   * If `true`, the focus trap will respect negative `tabIndex` values, removing them from the list of focusable elements.
   * @default false
   */
  respectNegativeTabIndex?: boolean;
  /**
   * If `true`, the focus trap will include all elements with `tabIndex` values in the list of focusable elements.
   * @default false
   */
  focusTabIndexElements?: boolean;
  /**
   * The amount of time in milliseconds to wait before auto-focusing the first focusable element.
   * @default undefined
   */
  autoFocusDelay?: number;
};

const DEBOUNCE_MS = 50;
const NAVIGATION_KEYS = ['Tab', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
const ALPHABET_KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
const FOCUSABLE_ELEMENTS_INCLUDING_TABINDEX = `${FOCUSABLE_ELEMENTS}, [tabindex]`;

export const FocusTrap = memo(function FocusTrap({
  children,
  onEscPress,
  disableTypeFocus,
  disableFocusTrap,
  includeTriggerInFocusTrap,
  disableAutoFocus,
  respectNegativeTabIndex,
  focusTabIndexElements,
  autoFocusDelay,
  restoreFocusOnUnmount,
}: FocusTrapProps) {
  const isFocused = useRef(false);
  const childrenRef = useRef<HTMLElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);
  previouslyFocusedElement.current ??= getBrowserGlobals()?.document?.activeElement as HTMLElement;

  // Restore focus when the trap is unmounted
  useEffect(() => {
    return () => {
      if (
        restoreFocusOnUnmount &&
        previouslyFocusedElement.current &&
        previouslyFocusedElement.current !== document?.activeElement
      ) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [restoreFocusOnUnmount]);

  /** START KEYSTROKE HISTORY
   * Track keystrokes with a short memory */
  const keystrokeHistory = useRef<string>('');
  const debouncedKeystrokeReset = useMemo(
    () =>
      debounce(() => {
        keystrokeHistory.current = '';
      }, DEBOUNCE_MS),
    [],
  );
  const updateKeystrokeHistory = useCallback(
    (key: KeyboardEvent['key']) => {
      // Update the keystroke history
      keystrokeHistory.current = keystrokeHistory.current.concat(key);
      debouncedKeystrokeReset();
    },
    [debouncedKeystrokeReset],
  );
  /** END KEYSTROKE HISTORY */

  // trap focus for accessibility
  const handleKeyboardNavigation = useCallback(
    (event: KeyboardEvent, element: RefObject<HTMLElement>['current']) => {
      const document = getBrowserGlobals()?.document;
      const activeElement = document?.activeElement as HTMLElement;

      if (!element || !document) return;

      let focusableElements = Array.from(
        element.querySelectorAll(
          focusTabIndexElements ? FOCUSABLE_ELEMENTS_INCLUDING_TABINDEX : FOCUSABLE_ELEMENTS,
        ),
      );
      if (includeTriggerInFocusTrap && previouslyFocusedElement.current) {
        focusableElements = [previouslyFocusedElement.current, ...focusableElements];
      }
      if (respectNegativeTabIndex) {
        focusableElements = focusableElements.filter(
          (element) => !((element as HTMLElement)?.tabIndex < 0),
        );
      }

      const menuItems = element.querySelectorAll('[role="menuitem"]');
      const optionItems = element.querySelectorAll('[role="option"]');
      const activeElementIsMenuItem =
        activeElement && Array.from(menuItems).includes(activeElement);
      const activeElementIsOption =
        activeElement && Array.from(optionItems).includes(activeElement);
      const activeElementIsMenuItemOrOption = activeElementIsMenuItem || activeElementIsOption;

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const secondElement = focusableElements[1] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      const activeElementIndex = activeElement
        ? focusableElements.indexOf(activeElement)
        : undefined;

      const secondElementIsMenuItemOrOption =
        secondElement.role === 'menuitem' || secondElement.role === 'option';

      // bring focus inside modal
      if (
        !isFocused.current &&
        // check if focus is inside modal
        !focusableElements.includes(activeElement)
      ) {
        // don't focus if arrow keys are used, instead allow scroll via keyboard
        if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !includeTriggerInFocusTrap) {
          return;
        }
        event.preventDefault();
        firstElement.focus();
        isFocused.current = true;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
      }

      if (
        activeElementIsMenuItemOrOption ||
        secondElementIsMenuItemOrOption ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowDown'
      ) {
        event.preventDefault();
      }

      const focusPrevElement = () => {
        if (activeElementIndex) {
          const previousElement = focusableElements[activeElementIndex - 1] as HTMLElement;
          previousElement.focus();
        }
      };

      // force active element to loop back to beginning of list
      const handleLastElement = () => {
        if (
          (!event.shiftKey && event.key === 'Tab') ||
          (event.key === 'ArrowDown' && activeElementIsMenuItemOrOption)
        ) {
          firstElement.focus();
          return;
        }
        if (
          (event.shiftKey && event.key === 'Tab') ||
          (event.key === 'ArrowUp' && activeElementIsMenuItemOrOption)
        ) {
          focusPrevElement();
        }
      };

      const handleFirstElement = () => {
        // force active element to loop back to end of list
        if (
          (event.shiftKey && event.key === 'Tab') ||
          (event.key === 'ArrowUp' &&
            (activeElementIsMenuItemOrOption || secondElementIsMenuItemOrOption))
        ) {
          lastElement.focus();
          return;
        }
        if (
          event.key === 'Tab' ||
          (event.key === 'ArrowDown' &&
            (activeElementIsMenuItemOrOption || secondElementIsMenuItemOrOption))
        ) {
          secondElement.focus();
        }
      };

      if (event.key === 'Home') {
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (
        !disableTypeFocus &&
        activeElementIsMenuItemOrOption &&
        ALPHABET_KEYS.includes(event.key)
      ) {
        event.preventDefault();

        const elementWithMatchingFirstLetter = focusableElements.find((el: Element) => {
          const textContentFirstLetter = el.textContent?.at(0)?.toLowerCase();
          const eventKeyLowerCase = event.key.toLowerCase();

          return textContentFirstLetter === eventKeyLowerCase;
        });

        if (elementWithMatchingFirstLetter) {
          (elementWithMatchingFirstLetter as HTMLElement).focus();
        }
      }

      if (activeElement === lastElement) {
        handleLastElement();
        return;
      }

      if (activeElement === firstElement) {
        handleFirstElement();
        return;
      }

      if (
        ((event.key === 'ArrowDown' && activeElementIsMenuItemOrOption) || event.key === 'Tab') &&
        activeElementIndex
      ) {
        const nextElement = focusableElements[activeElementIndex + 1] as HTMLElement;
        nextElement.focus();
      }

      if (
        ((event.key === 'ArrowUp' && activeElementIsMenuItemOrOption) ||
          (event.key === 'Tab' && event.shiftKey)) &&
        activeElementIndex
      ) {
        focusPrevElement();
      }
    },
    [focusTabIndexElements, disableTypeFocus, respectNegativeTabIndex, includeTriggerInFocusTrap],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Update the keystroke history
      updateKeystrokeHistory(event.key);

      if (
        !disableFocusTrap &&
        (NAVIGATION_KEYS.includes(event.key) || ALPHABET_KEYS.includes(event.key))
      ) {
        handleKeyboardNavigation(event, childrenRef.current);
      }

      // Swallow the event, in case someone is listening on the body.
      event.stopPropagation();
    },
    [updateKeystrokeHistory, disableFocusTrap, handleKeyboardNavigation],
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        void onEscPress?.();
        isFocused.current = false;
      }
    },
    [onEscPress],
  );

  useEffect(() => {
    getBrowserGlobals()?.window.addEventListener('keydown', handleKeyDown);
    getBrowserGlobals()?.window.addEventListener('keyup', handleKeyUp);
    return () => {
      getBrowserGlobals()?.window.removeEventListener('keydown', handleKeyDown);
      getBrowserGlobals()?.window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const document = getBrowserGlobals()?.document;
    const elements = childrenRef.current;

    if (!document || !elements || disableAutoFocus) {
      return;
    }

    const focusableElements = elements.querySelectorAll(FOCUSABLE_ELEMENTS);

    if (focusableElements?.length) {
      const elementToAutoFocus = focusableElements[0] as HTMLElement;
      if (typeof autoFocusDelay !== 'number') elementToAutoFocus.focus();
      else setTimeout(() => elementToAutoFocus.focus(), autoFocusDelay);
    }
  }, [disableAutoFocus, autoFocusDelay, includeTriggerInFocusTrap]);

  // only works for single child
  const onlyChild = React.Children.only(children);

  if (!onlyChild) {
    return <>{children}</>;
  }

  return React.cloneElement(children, { ref: childrenRef });
});
