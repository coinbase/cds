/**
 * These utils are adapted from the reakit-utils source code and are not safe to run in an SSR environment
 * https://github.com/ariakit/ariakit/blob/96f5dd52704444862d16167db3c82fb89838e3ae/packages/reakit-utils/src/index.ts
 */

/**
 * Checks whether `element` is visible or not.
 *
 * @example
 * isVisible(document.querySelector("button"));
 */
function isVisible(element: Element) {
  const htmlElement = element as HTMLElement;
  return (
    htmlElement.offsetWidth > 0 ||
    htmlElement.offsetHeight > 0 ||
    element.getClientRects().length > 0
  );
}

const focusableSelectors = `input:not([type='hidden']):not([disabled]), select:not([disabled]),
  textarea:not([disabled]), a[href], button:not([disabled]), [tabindex],
  iframe, object, embed, area[href], audio[controls], video[controls],
  [contenteditable]:not([contenteditable='false'])`;

/**
 * Checks whether `element` is focusable or not.
 *
 * @example
 * isFocusable(document.querySelector("input")); // true
 * isFocusable(document.querySelector("input[tabindex='-1']")); // true
 * isFocusable(document.querySelector("input[hidden]")); // false
 * isFocusable(document.querySelector("input:disabled")); // false
 */
function isFocusable(element: Element): boolean {
  return element.matches(focusableSelectors) && isVisible(element);
}

/**
 * Checks if `element` has focus within. Elements that are referenced by
 * `aria-activedescendant` are also considered.
 *
 * @example
 * hasFocusWithin(document.getElementById("id"));
 */
function hasFocusWithin(element: Element): boolean {
  const { activeElement } = document;
  if (!activeElement) return false;
  if (element.contains(activeElement)) return true;
  const activeDescendant = activeElement.getAttribute('aria-activedescendant');
  if (!activeDescendant) return false;
  if (activeDescendant === element.id) return true;
  return Boolean(element.querySelector(`#${activeDescendant}`));
}

function focusIfNeeded(element: HTMLElement) {
  if (!hasFocusWithin(element) && isFocusable(element)) element.focus();
}

const buttonInputTypes = ['button', 'color', 'file', 'image', 'reset', 'submit'];

/**
 * Checks whether `element` is a native HTML button element.
 *
 * @example
 * isButton(document.querySelector("button")); // true
 * isButton(document.querySelector("input[type='button']")); // true
 * isButton(document.querySelector("div")); // false
 * isButton(document.querySelector("input[type='text']")); // false
 * isButton(document.querySelector("div[role='button']")); // false
 *
 * @returns {boolean}
 */
function isButton(element: Element) {
  if (element.tagName === 'BUTTON') return true;
  if (element.tagName === 'INPUT')
    return buttonInputTypes.includes((element as HTMLInputElement).type);
  return false;
}

/**
 * Returns `true` if `event` has been fired within a React Portal element.
 */
function isPortalEvent(event: React.SyntheticEvent<Element, Event>): boolean {
  return !event.currentTarget.contains(event.target as Element);
}

function isSafariOrFirefoxOnMac() {
  const { userAgent } = window.navigator;
  return (
    userAgent.includes('Mac') &&
    !userAgent.includes('Chrome') &&
    (userAgent.includes('Safari') || userAgent.includes('Firefox'))
  );
}

export function isNativeClick(event: React.KeyboardEvent) {
  if (!event.isTrusted) return false;
  return (
    isButton(event.currentTarget) ||
    event.currentTarget.tagName === 'INPUT' ||
    event.currentTarget.tagName === 'TEXTAREA' ||
    event.currentTarget.tagName === 'A' ||
    event.currentTarget.tagName === 'SELECT'
  );
}

export function handleButtonFocusOnSafariOrFirefoxOnMac(event: React.MouseEvent<HTMLElement>) {
  const element = event.currentTarget;
  // Safari and Firefox on MacOS don't focus on buttons on mouse down
  // like other browsers/platforms. Instead, they focus on the closest
  // focusable ancestor element, which is ultimately the body element. So
  // we make sure to give focus to the tabbable element on mouse down so
  // it works consistently across browsers.
  if (!isSafariOrFirefoxOnMac()) return;
  if (isPortalEvent(event)) return;
  if (!isButton(element)) return;
  let focusImmediately = () => {};
  // We can't focus right away after on mouse down, otherwise it would
  // prevent drag events from happening. So we schedule the focus to the
  // next animation frame.
  const raf = requestAnimationFrame(() => {
    element.removeEventListener('mouseup', focusImmediately, true);
    focusIfNeeded(element);
  });
  // If mouseUp happens before the next animation frame (which is common
  // on touch screens or by just tapping the trackpad on MacBook's), we
  // cancel the animation frame and immediately focus on the element.
  focusImmediately = () => {
    cancelAnimationFrame(raf);
    focusIfNeeded(element);
  };
  // By listening to the event in the capture phase, we make sure the
  // focus event is fired before the onMouseUp and onMouseUpCapture React
  // events, which is aligned with the default browser behavior.
  element.addEventListener('mouseup', focusImmediately, {
    once: true,
    capture: true,
  });
}

export function isNativeTabbable(element: Element) {
  return ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'].includes(element.tagName);
}

export function supportsDisabledAttribute(element: Element) {
  return ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName);
}

type GetTabIndexOptions = {
  disabled?: boolean;
  focusable?: boolean;
  supportsDisabled: boolean;
  nativeTabbable: boolean;
  tabIndex?: number;
};

export function getTabIndex({
  disabled,
  focusable,
  supportsDisabled,
  nativeTabbable,
  tabIndex,
}: GetTabIndexOptions) {
  if (disabled && !focusable) {
    // Anchor, audio and video tags don't support the `disabled` attribute. We
    // must pass tabIndex={-1} so they don't receive focus on tab.
    if (nativeTabbable && !supportsDisabled) return -1;

    // Elements that support the `disabled` attribute don't need tabIndex.
    return;
  }

  // If the element is enabled and it's natively tabbable, we don't need to
  // specify a tabIndex attribute unless it's explicitly set by the user.
  if (nativeTabbable) return tabIndex;

  // If the element is enabled and is not natively tabbable, we have to fallback
  // tabIndex={0}.
  return tabIndex || 0;
}
