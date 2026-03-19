import React, { memo } from 'react';
import { G, Path, Svg } from 'react-native-svg';
import type { SubBrandLogoMarkParams } from '@coinbase/cds-common/hooks/useSubBrandLogo';
import { useSubBrandLogoMark } from '@coinbase/cds-common/hooks/useSubBrandLogo';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';

export type SubBrandLogoMarkBaseProps = Omit<SubBrandLogoMarkParams, 'colorScheme'>;
export type SubBrandLogoMarkProps = SubBrandLogoMarkBaseProps;

export const SubBrandLogoMark = memo((_props: SubBrandLogoMarkProps) => {
  const mergedProps = useComponentConfig('SubBrandLogoMark', _props);
  const { activeColorScheme } = useTheme();
  const { logoColor, typeColor, viewBox, logoPath, typePath } = useSubBrandLogoMark({
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

SubBrandLogoMark.displayName = 'SubBrandLogoMark';
