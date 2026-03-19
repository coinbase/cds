import React, { memo } from 'react';
import { Path, Svg } from 'react-native-svg';
import type { LogoWordmarkParams } from '@coinbase/cds-common/hooks/useLogo';
import { useLogoWordmark } from '@coinbase/cds-common/hooks/useLogo';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';

export type LogoWordmarkBaseProps = Omit<LogoWordmarkParams, 'colorScheme'>;

export const LogoWordmark = memo((_props: LogoWordmarkBaseProps) => {
  const mergedProps = useComponentConfig('LogoWordmark', _props);
  const { foreground } = mergedProps;
  const { activeColorScheme } = useTheme();
  const { viewBox, path, color } = useLogoWordmark({ foreground, colorScheme: activeColorScheme });

  return (
    <Svg viewBox={viewBox}>
      <Path d={path} fill={color} />
    </Svg>
  );
});

LogoWordmark.displayName = 'LogoWordmark';
