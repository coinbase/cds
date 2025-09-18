type MediaQueryListenerCallback = (this: MediaQueryList, event: MediaQueryListEvent) => unknown;

export function addMediaQueryListener(
  mediaQueryList: MediaQueryList | undefined,
  callback: MediaQueryListenerCallback,
) {
  if (mediaQueryList?.addEventListener) {
    mediaQueryList.addEventListener('change', callback);
  } else if (mediaQueryList?.addListener) {
    // addListener is required for legacy browsers such as Safari 13
    mediaQueryList.addListener(callback);
  }
}

export function removeMediaQueryListener(
  mediaQueryList: MediaQueryList | undefined,
  callback: MediaQueryListenerCallback,
) {
  if (mediaQueryList?.removeEventListener) {
    mediaQueryList.removeEventListener('change', callback);
  } else if (mediaQueryList?.removeListener) {
    // removeListener is required for legacy browsers such as Safari 13
    mediaQueryList.removeListener(callback);
  }
}
