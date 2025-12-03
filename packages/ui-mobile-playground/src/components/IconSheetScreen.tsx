import { SvgXml } from 'react-native-svg';
import type { IconSourcePixelSize } from '@coinbase/cds-common/types';
import { useTheme } from '@coinbase/cds-mobile';
import { IconSheet } from '@coinbase/cds-mobile/icons/__stories__/IconSheet';

import { svgMap } from '../__generated__/iconSvgMap';

// we only have svg assets for sizes xs, s, and m
const getIconSourceSize = (iconSize: number): IconSourcePixelSize => {
  if (iconSize <= 12) return 12;
  if (iconSize <= 16) return 16;
  return 24;
};

export function IconSheetScreen() {
  const theme = useTheme();
  return (
    <IconSheet
      renderIcon={(iconName, iconSize) => {
        const size = theme.iconSize[iconSize];
        const sourceSize = getIconSourceSize(size);
        const key = `${iconName}-${sourceSize}-inactive`;

        if (!(key in svgMap)) {
          throw new Error(
            `Icon ${key} not found in iconSvgMap. You probably need to run the generateIconSvgMap script to update it.`,
          );
        }

        return (
          <SvgXml
            key={`${iconName}-${iconSize}`}
            accessibilityRole="image"
            height={size}
            width={size}
            xml={svgMap[key as keyof typeof svgMap].content}
          />
        );
      }}
    />
  );
}
