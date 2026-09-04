import React, { memo } from 'react';
import { G, Path, Svg } from 'react-native-svg';
import type { SubBrandLogoWordmarkParams } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { useSubBrandLogoWordmark } from '@coinbase/cds-common/hooks/useSubBrandLogo';

import { useTheme } from '../hooks/useTheme';

export type SubBrandLogoWordmarkProps = SubBrandLogoWordmarkParams;

export const SubBrandLogoWordmark = memo(
  (props: Omit<SubBrandLogoWordmarkProps, 'colorScheme'>) => {
    const { activeColorScheme } = useTheme();
    const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoWordmark({
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
  },
);

SubBrandLogoWordmark.displayName = 'SubBrandLogoWordmark';
