import React, { memo, useMemo } from 'react';
import { type IconName, type IconSize } from '@coinbase/cds-common';
import { names } from '@coinbase/cds-icons/names';

import { useTheme } from '../../hooks/useTheme';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { getIconSourceSize, Icon } from '../Icon';

type SvgFromFigmaProps = { active?: boolean; name: IconName; size: IconSize };

function SvgFromFigma({ active, name, size }: SvgFromFigmaProps) {
  const theme = useTheme();
  const iconSize = theme.iconSize[size];
  const isDarkMode = theme.activeColorScheme === 'dark';
  const sourceSize = getIconSourceSize(iconSize);
  const svgName = `${name}-${sourceSize}-${active ? 'active' : 'inactive'}`;
  const svgPath = `@coinbase/cds-icons/svgs/${svgName}.svg`;
  const style = useMemo(() => ({ filter: isDarkMode ? 'invert(100%)' : undefined }), [isDarkMode]);
  return <img alt={name} height={iconSize} src={svgPath} style={style} width={iconSize} />;
}

type IconSheetProps = {
  startIndex?: number;
  endIndex?: number;
};

export const IconSheet = memo(function IconSheet({ startIndex, endIndex }: IconSheetProps) {
  return (
    <VStack gap={2}>
      <Text as="p" display="block" font="legal">
        Odd icon rows use the icon font and even icon rows use the SVG assets.
      </Text>
      <HStack flexWrap="wrap" gap={2} paddingBottom={2}>
        {names.slice(startIndex, endIndex).map((name) => (
          <HStack key={name} flexWrap="wrap" gap={2}>
            <VStack gap={2}>
              <HStack alignItems="center" gap={2}>
                {(['xs', 's', 'm', 'l'] as const).map((size) => (
                  <Icon key={size} color="fg" name={name} size={size} />
                ))}
              </HStack>
              <HStack alignItems="center" gap={2}>
                {(['xs', 's', 'm', 'l'] as const).map((size) => (
                  <SvgFromFigma key={size} name={name} size={size} />
                ))}
              </HStack>
              <HStack alignItems="center" gap={2}>
                {(['xs', 's', 'm', 'l'] as const).map((size) => (
                  <Icon key={size} active color="fg" name={name} size={size} />
                ))}
              </HStack>
              <HStack alignItems="center" gap={2}>
                {(['xs', 's', 'm', 'l'] as const).map((size) => (
                  <SvgFromFigma key={size} active name={name} size={size} />
                ))}
              </HStack>
            </VStack>
          </HStack>
        ))}
      </HStack>
    </VStack>
  );
});
