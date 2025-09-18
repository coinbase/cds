/**
 * This hook works around a bug in the @storybook-community/storybook-dark-mode package:
 * https://github.com/storybook-community/storybook-dark-mode/issues/28
 */
import { DARK_MODE_EVENT_NAME } from '@storybook-community/storybook-dark-mode';
import { addons, useEffect, useParameter, useState } from 'storybook/preview-api';

// To make the initial state correct, we have to import the store directly from node_modules
// since it's not exported in the package.
import { store } from '../../../node_modules/@storybook-community/storybook-dark-mode/esm/dark_mode_toggle.js';

const chan = addons.getChannel();

/**
 * Returns the current state of storybook's dark-mode
 */
export function useDarkMode(): boolean {
  const docs = useParameter<{ theme?: { base: 'light' | 'dark' } }>('docs');
  const [isDark, setIsDark] = useState(store().current === 'dark');

  useEffect(() => {
    const handleEvent = (newIsDark: boolean) => {
      if (isDark === newIsDark) return;
      setIsDark(newIsDark);
    };
    chan.on(DARK_MODE_EVENT_NAME, handleEvent);
    return () => chan.off(DARK_MODE_EVENT_NAME, handleEvent);
  }, [isDark]);

  if (docs?.theme?.base) {
    return docs.theme.base === 'dark';
  }

  return isDark;
}
