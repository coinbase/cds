import React, { memo } from 'react';
import { G, Path, Svg } from 'react-native-svg';
import type { SubBrandLogoWordmarkParams } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { useSubBrandLogoWordmark } from '@coinbase/cds-common/hooks/useSubBrandLogo';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';

export type SubBrandLogoWordmarkBaseProps = Omit<SubBrandLogoWordmarkParams, 'colorScheme'>;
export type SubBrandLogoWordmarkProps = SubBrandLogoWordmarkBaseProps;

export const SubBrandLogoWordmark = memo((_props: SubBrandLogoWordmarkProps) => {
  const mergedProps = useComponentConfig('SubBrandLogoWordmark', _props);
  const { activeColorScheme } = useTheme();
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoWordmark({
    ...mergedProps,
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

SubBrandLogoWordmark.displayName = 'SubBrandLogoWordmark';
