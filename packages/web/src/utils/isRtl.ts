import { isBrowser } from './browser';

export const isRtl = (element?: HTMLElement) => {
  if (!isBrowser()) {
    return false;
  }
  return (element ?? document.documentElement).dir === 'rtl';
};
