import { useCallback } from 'react';
import { Linking } from 'react-native';

import type { OpenWebBrowserOptions } from '../utils/openWebBrowser';
import { openWebBrowser } from '../utils/openWebBrowser';

import { useTheme } from './useTheme';

export const useWebBrowserOpener = () => {
  const theme = useTheme();
  return useCallback(
    async (url: string, options?: Partial<OpenWebBrowserOptions>) => {
      if (url.startsWith('https://') || url.startsWith('http://')) {
        // Use custom handling for web URLs
        await openWebBrowser(url, {
          theme: options?.theme ?? theme,
          ...options,
        });
        return;
      }

      // Handle other schemes such as mailto, tel, and sms
      try {
        await Linking.openURL(url);
      } catch (err) {
        // TODO: replace these with Bugsnag one day

        console.error(`Cannot open URL ${url}`, err);
      }
    },
    [theme],
  );
};
