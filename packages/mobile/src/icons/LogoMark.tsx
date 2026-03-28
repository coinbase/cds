import React, { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { LogoMarkParams } from '@coinbase/cds-common/hooks/useLogo';
import { useLogoMark } from '@coinbase/cds-common/hooks/useLogo';

import { useTheme } from '../hooks/useTheme';

export const LogoMark = memo(({ size, foreground }: Omit<LogoMarkParams, 'colorScheme'>) => {
  const { activeColorScheme } = useTheme();
  const { viewBox, width, height, path, color } = useLogoMark({
    size,
    foreground,
    colorScheme: activeColorScheme,
  });

  return (
    <Svg height={height} viewBox={viewBox} width={width}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoMark.displayName = 'LogoMark';
