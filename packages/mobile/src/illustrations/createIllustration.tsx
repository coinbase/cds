import React, { memo, useMemo } from 'react';
import type { AccessibilityProps } from 'react-native';
import { SvgXml } from 'react-native-svg';
import type { IllustrationVariant } from '@coinbase/cds-common/types/IllustrationNames';
import type {
  HeroSquareDimension,
  PictogramDimension,
  SpotIconDimension,
  SpotRectangleDimension,
  SpotSquareDimension,
} from '@coinbase/cds-common/types/IllustrationProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { convertDimensionToSize } from '@coinbase/cds-common/utils/convertDimensionToSize';
import { convertSizeWithMultiplier } from '@coinbase/cds-common/utils/convertSizeWithMultiplier';
import { getDefaultSizeObjectForIllustration } from '@coinbase/cds-common/utils/getDefaultSizeObjectForIllustration';
import type {
  HeroSquareName,
  PictogramName,
  SpotIconName,
  SpotRectangleName,
  SpotSquareName,
} from '@coinbase/cds-illustrations';
import { isDevelopment } from '@coinbase/cds-utils';

import { useTheme } from '../hooks/useTheme';

export type IllustrationNamesMap = {
  heroSquare: HeroSquareName;
  spotRectangle: SpotRectangleName;
  pictogram: PictogramName;
  spotSquare: SpotSquareName;
  spotIcon: SpotIconName;
};

export type IllustrationDimensionsMap = {
  heroSquare: HeroSquareDimension;
  spotSquare: SpotSquareDimension;
  spotRectangle: SpotRectangleDimension;
  pictogram: PictogramDimension;
  spotIcon: SpotIconDimension;
};

export type IllustrationBaseProps<T extends keyof IllustrationNamesMap> = SharedProps & {
  /** Name of illustration as defined in Figma */
  name: IllustrationNamesMap[T];
  /**
   * HeroSquare Default:  240x240
   * SpotSquare Default: 96x96
   * Pictogram Default: 48x48
   * SpotRectangle Default: 240x120
   *
   */
  dimension?: IllustrationDimensionsMap[T];
  /** Multiply the width & height while maintaining aspect ratio */
  scaleMultiplier?: number;
  /**
   * Fallback element to render if unable to find an illustration with the matching name
   * @default null
   * */
  fallback?: null | React.ReactElement;
};

type IllustrationConfigShape = Record<string, { light: () => string; dark: () => string }>;

export type IllustrationA11yProps = Pick<
  AccessibilityProps,
  'accessibilityLabel' | 'accessibilityHint'
>;

export type IllustrationBasePropsWithA11y<Type extends IllustrationVariant> =
  IllustrationBaseProps<Type> & IllustrationA11yProps;

export function createIllustration<
  Variant extends IllustrationVariant,
  Config extends IllustrationConfigShape,
>(variant: Variant, config: Config) {
  const defaultSize = getDefaultSizeObjectForIllustration(variant);

  type IllustrationProps = IllustrationBasePropsWithA11y<Variant>;

  const Illustration = memo(function Illustration({
    fallback = null,
    name,
    dimension,
    scaleMultiplier,
    testID,
    accessibilityHint,
    accessibilityLabel,
  }: IllustrationProps) {
    const { activeColorScheme } = useTheme();
    const requireFn = config[name]?.[activeColorScheme];

    const xml = useMemo(() => requireFn?.(), [requireFn]);

    const style = useMemo(() => {
      let size = defaultSize;
      if (dimension) {
        size = convertDimensionToSize(dimension);
      }
      if (scaleMultiplier) {
        size = convertSizeWithMultiplier(size, scaleMultiplier);
      }
      return size;
    }, [dimension, scaleMultiplier]);

    if (!xml) {
      if (isDevelopment()) {
        console.error(`Unable to find illustration with name: ${name}`);
      }
      return fallback;
    }

    return (
      <SvgXml
        accessibilityHint={accessibilityHint}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="image"
        accessible={!!accessibilityLabel}
        style={style}
        testID={testID}
        xml={xml}
      />
    );
  });

  Illustration.displayName = `Illustration`;
  return Illustration;
}
