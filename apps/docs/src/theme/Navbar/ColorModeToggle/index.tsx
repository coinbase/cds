import React, { type ReactNode, useCallback } from 'react';
import { IconButton } from '@coinbase/cds-web/buttons';
import { useThemeConfig } from '@docusaurus/theme-common';
import { translate } from '@docusaurus/Translate';
import type { Props } from '@theme/ColorModeToggle';

import { useUnifiedTheme } from '../../Layout/Provider/UnifiedThemeContext';

export default function NavbarColorModeToggle({ className }: Props): ReactNode {
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { docsColorScheme, setUnifiedColorScheme } = useUnifiedTheme();
  const isDarkMode = docsColorScheme === 'dark';

  const label = translate({
    message: `${docsColorScheme} mode, adjust viewing mode`,
    id: 'theme.colorToggle.ariaLabel',
    description: 'The ARIA label for the navbar color mode toggle',
  });

  const handleClick = useCallback(() => {
    setUnifiedColorScheme(isDarkMode ? 'light' : 'dark');
  }, [isDarkMode, setUnifiedColorScheme]);

  if (disabled) {
    return null;
  }

  return (
    <IconButton
      accessibilityLabel={label}
      aria-label={label}
      className={className}
      name={isDarkMode ? 'moon' : 'light'}
      onClick={handleClick}
      title={label}
      value={docsColorScheme}
    />
  );
}
