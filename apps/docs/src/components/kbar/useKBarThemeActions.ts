import { useMemo } from 'react';
import decreasePriorityIfCategory from '@site/src/utils/decreasePriorityIfCategory';

import { useUnifiedTheme } from '../../theme/Layout/Provider/UnifiedThemeContext';

export default function useKBarThemeActions() {
  const { setUnifiedColorScheme } = useUnifiedTheme();

  return useMemo(
    () =>
      [
        {
          id: 'colorModePreference',
          name: 'Change color mode…',
          keywords: 'dark light',
          icon: 'gear',
          section: 'Preferences',
        },
        {
          id: 'darkPreference',
          name: 'Dark',
          keywords: 'color mode',
          parent: 'colorModePreference',
          icon: 'moon',
          perform: () => setUnifiedColorScheme('dark'),
        },
        {
          id: 'lightPreference',
          name: 'Light',
          keywords: 'color mode',
          parent: 'colorModePreference',
          icon: 'light',
          perform: () => setUnifiedColorScheme('light'),
        },
      ].map(decreasePriorityIfCategory),
    [setUnifiedColorScheme],
  );
}
