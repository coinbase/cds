import React, { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { LogoMarkParams } from '@coinbase/cds-common/hooks/useLogo';
import { useLogoMark } from '@coinbase/cds-common/hooks/useLogo';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';

export type LogoMarkBaseProps = Omit<LogoMarkParams, 'colorScheme'>;

export const LogoMark = memo((_props: LogoMarkBaseProps) => {
  const mergedProps = useComponentConfig('LogoMark', _props);
  const { size, foreground } = mergedProps;
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
