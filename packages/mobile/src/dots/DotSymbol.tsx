import React, { memo, useMemo } from 'react';
import {
  type ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import type {
  DotOverlap,
  DotSize,
  IconName,
  PinPlacement,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import type { DotPinStylesKey } from '../hooks/useDotPinStyles';
import { useDotPinStyles } from '../hooks/useDotPinStyles';
import { useTheme } from '../hooks/useTheme';
import { Icon, type IconProps } from '../icons/Icon';
import { Box, type BoxBaseProps } from '../layout/Box';
import { RemoteImage } from '../media/RemoteImage';

import { getTransform } from './dotStyles';
import { useDotsLayout } from './useDotsLayout';

export type DotSymbolBaseProps = SharedProps &
  Pick<
    SharedAccessibilityProps,
    'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
  > & {
    /** Icon name to add to the dot. */
    iconName?: IconName;
    /** Size of the dot */
    size?: DotSize;
    /** Whether the icon is active */
    active?: boolean;
    /** The color of the icon */
    color?: IconProps['color'];
    background?: BoxBaseProps['background'];
    borderColor?: BoxBaseProps['borderColor'];
    /** Position of the dot */
    pin?: PinPlacement;
    /** The element that the dot will anchor to */
    children?: React.ReactNode;
    /** Indicates what shape dot is overlapping */
    overlap?: DotOverlap;
    /** Add an arbitrary ReactNode to the dot instead of an icon. */
    symbol?: React.ReactNode;
    /** Image source path */
    source?: ImageSourcePropType | string;
    style?: StyleProp<ViewStyle>;
    iconStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
  };

export type DotSymbolProps = DotSymbolBaseProps;

export const DotSymbol = memo((_props: DotSymbolProps) => {
  const mergedProps = useComponentConfig('DotSymbol', _props);
  const {
    children,
    symbol,
    pin,
    source,
    overlap,
    iconName,
    size = 's',
    active,
    color = 'fgInverse',
    background = 'bgPrimary',
    borderColor = 'bgSecondary',
    style,
    iconStyle,
    imageStyle,
    ...props
  } = mergedProps;
  const theme = useTheme();
  const iconSize = theme.iconSize[size];
  const [childrenSize, onChildrenLayout] = useDotsLayout();
  const dotIsIcon = iconName !== undefined;
  const transforms = useDotPinStyles(
    childrenSize,
    dotIsIcon
      ? // iconSize + border + spacing
        iconSize + 4 + 4
      : iconSize,
    overlap,
  );

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

  // TODO: These should be tokens, i don't know what the name
  // of the token will be called though. No design direction yet
  const imageBorderStyle = useMemo(() => {
    return {
      borderColor: theme.color[borderColor],
      borderWidth: 1,
    };
  }, [theme.color, borderColor]);

  // TODO: These should be tokens, i don't know what the name
  // of the token will be called though. No design direction yet
  const iconBorderStyle = useMemo(() => {
    return {
      borderWidth: 2,
    };
  }, []);

  // only check childrenSize when children is defined
  const shouldShow = children !== undefined ? childrenSize !== null : true;

  return (
    <View {...props} style={style}>
      <View onLayout={onChildrenLayout} testID={`${props.testID}-children`}>
        {children}
      </View>
      {shouldShow && (
        <View style={pinStyles} testID="dotsymbol-inner-container">
          {source !== undefined && (
            <RemoteImage
              darkModeEnhancementsApplied
              height={iconSize}
              resizeMode="cover"
              shape="circle"
              source={typeof source === 'string' ? { uri: source } : source}
              style={[imageBorderStyle, imageStyle]}
              testID="dotsymbol-remote-image"
              width={iconSize}
            />
          )}
          {iconName !== undefined && (
            <Box
              background={background}
              borderColor={borderColor}
              borderRadius={1000}
              padding={0.5}
              style={[iconBorderStyle, iconStyle]}
            >
              <Icon active={active} color={color} name={iconName} size={size} />
            </Box>
          )}
          {symbol}
        </View>
      )}
    </View>
  );
});
