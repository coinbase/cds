/**
 * @todo Add fbjs utils as dependency and replace with canUseDOM
 * @link https://github.com/facebook/fbjs/blob/main/packages/fbjs/src/core/ExecutionEnvironment.js
 */
export function isBrowser() {
  return !!(typeof window !== 'undefined' && window?.document?.createElement);
}

export function isSSR() {
  return !isBrowser();
}

export function onSSR(callback: () => void, otherwise?: () => void) {
  return isSSR() ? callback() : otherwise?.();
}

export function onBrowser(callback: () => void, otherwise?: () => void) {
  return isBrowser() ? callback() : otherwise?.();
}
/**
 * Gets browser builtin globals in an server-side-rendering-safe way
 *
 * @returns The globals if in a browser environment, or undefined if in a
 * SSR environment
 */
export function getBrowserGlobals() {
  return isSSR() ? undefined : { window, document };
}
