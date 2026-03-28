import React, { memo } from 'react';
import { G, Path, Svg } from 'react-native-svg';
import type { SubBrandLogoMarkParams } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { useSubBrandLogoMark } from '@coinbase/cds-common/hooks/useSubBrandLogo';

import { useTheme } from '../hooks/useTheme';

export type SubBrandLogoMarkProps = SubBrandLogoMarkParams;

export const SubBrandLogoMark = memo((props: Omit<SubBrandLogoMarkProps, 'colorScheme'>) => {
  const { activeColorScheme } = useTheme();
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark({
    ...props,
    colorScheme: activeColorScheme,
  });

  return (
    <Svg viewBox={viewBox}>
      <G>
        <Path d={logoPath} fill={logoColor} />
        <Path d={typePath} fill={typeColor} />
      </G>
    </Svg>
  );
});

SubBrandLogoMark.displayName = 'SubBrandLogoMark';
