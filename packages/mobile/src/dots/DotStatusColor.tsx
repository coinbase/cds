import React, { memo, useMemo } from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type {
  DotOverlap,
  DotSize,
  DotVariant,
  PinPlacement,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import type { DotPinStylesKey } from '../hooks/useDotPinStyles';
import { useDotPinStyles } from '../hooks/useDotPinStyles';
import { useTheme } from '../hooks/useTheme';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

const variantColorMap: Record<DotVariant, ThemeVars.Color> = {
  primary: 'bgPrimary',
  foregroundMuted: 'fgMuted',
  positive: 'bgPositive',
  warning: 'bgWarning',
  negative: 'bgNegative',
};

export type DotStatusColorBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /** Position of dot relative to its parent */
    pin?: PinPlacement;
    /** Background color of dot */
    variant: DotVariant;
    /** Children of where the dot will anchor to */
    children?: React.ReactNode;
    /** Size of dot */
    size?: DotSize;
    /** Indicates what shape Dot is overlapping */
    overlap?: DotOverlap;
  };

export type DotStatusColorProps = DotStatusColorBaseProps;

export const DotStatusColor = memo((_props: DotStatusColorProps) => {
  const mergedProps = useComponentConfig('DotStatusColor', _props);
  const { variant, pin, size = 's', children, overlap, ...props } = mergedProps;
  const theme = useTheme();
  const iconSize = theme.iconSize[size];
  const [childrenSize, onLayout] = useDotsLayout();

  const transforms = useDotPinStyles(childrenSize, iconSize, overlap);

  const pinStyles = useMemo(() => {
    if (pin && transforms !== null) {
      const [vertical, horizontal] = (pin as string).split('-');

      return getTransform(
        transforms[horizontal as DotPinStylesKey],
        transforms[vertical as DotPinStylesKey],
      );
    }
    return {};
  }, [pin, transforms]);

  const dotContentStyles: ViewStyle = useMemo(() => {
    return {
      borderRadius: theme.borderRadius[1000],
      width: iconSize,
      height: iconSize,
      backgroundColor: theme.color[variantColorMap[variant]],
      alignItems: 'center',
      justifyContent: 'center',
      ...pinStyles,
    };
  }, [iconSize, theme.color, theme.borderRadius, pinStyles, variant]);

  // only check childrenSize when children is defined
  const shouldShow = children !== undefined ? childrenSize !== null : true;

  return (
    <View {...props}>
      <View onLayout={onLayout} testID={`${props.testID}-children`}>
        {children}
      </View>
      {shouldShow && <View style={dotContentStyles} testID="dotstatuscolor-inner-container" />}
    </View>
  );
});
