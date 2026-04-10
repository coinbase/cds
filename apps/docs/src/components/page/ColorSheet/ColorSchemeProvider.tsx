import { memo, useCallback } from 'react';
import { Switch } from '@cbhq/cds-web/controls';
import { VStack } from '@cbhq/cds-web/layout';
import { ThemeProvider } from '@cbhq/cds-web/system';
import { defaultTheme } from '@cbhq/cds-web/themes/defaultTheme';
import { useDocsTheme } from '@site/src/theme/Layout/Provider/UnifiedThemeContext';

type ColorSchemeProviderProps = {
  children: React.ReactNode;
};

export const ColorSchemeProvider = memo(({ children }: ColorSchemeProviderProps) => {
  const { colorScheme, setColorScheme } = useDocsTheme();

  const handleToggle = useCallback(() => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
  }, [colorScheme, setColorScheme]);

  return (
    <VStack gap={2}>
      <Switch
        accessibilityLabel="Toggle color scheme"
        checked={colorScheme === 'dark'}
        onChange={handleToggle}
      >
        Dark Color Scheme
      </Switch>
      <ThemeProvider activeColorScheme={colorScheme} theme={defaultTheme}>
        {children}
      </ThemeProvider>
    </VStack>
  );
});
