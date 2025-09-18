import { useEffect } from 'react';

const postMessageType = 'GET_INTERNAL_CDS_THEME_FROM_EXTENSION';

export const useInternalCDSTheme = () => {
  useEffect(() => {
    // request the theme from the extension upon mount
    window.postMessage({ type: postMessageType }, '*');
  }, []);
};
