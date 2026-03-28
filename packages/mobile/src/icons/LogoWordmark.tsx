import React, { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { LogoWordmarkParams } from '@coinbase/cds-common/hooks/useLogo';
import { useLogoWordmark } from '@coinbase/cds-common/hooks/useLogo';

import { useTheme } from '../hooks/useTheme';

export const LogoWordmark = memo(({ foreground }: Omit<LogoWordmarkParams, 'colorScheme'>) => {
  const { activeColorScheme } = useTheme();
  const { viewBox, path, color } = useLogoWordmark({ foreground, colorScheme: activeColorScheme });

  return (
    <Svg viewBox={viewBox}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
