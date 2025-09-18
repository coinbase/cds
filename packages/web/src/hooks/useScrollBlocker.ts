import { useCallback, useRef } from 'react';

import { isSSR } from '../utils/browser';

export const useScrollBlocker = () => {
  const scroll = useRef(false);

  const blockScroll = useCallback((shouldBlock: boolean) => {
    if (isSSR()) return;

    const html = document.documentElement;
    const { body } = document;

    if (!body?.style) return;

    // block scroll
    if (shouldBlock && !scroll.current) {
      const scrollBarWidth = window.innerWidth - html.clientWidth;
      const bodyPaddingRight =
        parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0;

      body.style.position = 'relative';
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

      scroll.current = true;
    }

    // allow scroll
    if (!shouldBlock && scroll.current) {
      body.style.position = '';
      body.style.overflow = '';
      body.style.paddingRight = '';

      scroll.current = false;
    }
  }, []);

  return blockScroll;
};
