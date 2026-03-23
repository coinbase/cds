import React, { forwardRef, memo, useCallback, useMemo } from 'react';
import {
  type GestureResponderEvent,
  Pressable,
  type PressableProps,
  type StyleProp,
  type View,
  type ViewStyle,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import { type TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { accessibleOpacityDisabled } from '@coinbase/cds-common/tokens/interactable';

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';
import { Text, type TextBaseProps } from '../typography/Text';

import { tabsSpringConfig } from './Tabs';

export type SegmentedTabProps<TabId extends string = string> = TabValue<TabId> &
  Pick<TextBaseProps, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight'> &
  Omit<PressableProps, 'children' | 'disabled' | 'onPress' | 'style'> & {
    /**
     * Text color when the SegmentedTab is active.
     * @default negativeForeground
     */
    activeColor?: ThemeVars.Color;
    /**
     * Text color when the SegmentedTab is inactive.
     * @default foreground
     */
    color?: ThemeVars.Color;
    /** Callback that is fired when the SegmentedTab is pressed. */
    onPress?: (id: TabId, event: GestureResponderEvent) => void;
    style?: StyleProp<ViewStyle>;
  };

const AnimatedTextHeadline = Animated.createAnimatedComponent(Text);

type SegmentedTabFC = <TabId extends string = string>(
  props: SegmentedTabProps<TabId> & { ref?: React.ForwardedRef<View> },
) => React.ReactElement;

const SegmentedTabComponent = memo(
  forwardRef(
    <TabId extends string = string>(
      {
        id,
        label,
        disabled: disabledProp,
        onPress,
        color = 'fg',
        activeColor = 'fgInverse',
        style,
        'aria-selected': ariaSelected,
        accessibilityRole = 'button',
        testID,
        font = 'headline',
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        ...props
      }: SegmentedTabProps<TabId>,
      ref: React.ForwardedRef<View>,
    ) => {
      const { activeTab, updateActiveTab, disabled: allTabsDisabled } = useTabsContext<TabId>();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(
        (event: GestureResponderEvent) => {
          updateActiveTab(id);
          onPress?.(id, event);
        },
        [id, onPress, updateActiveTab],
      );

      const theme = useTheme();
      const activeColorRgbaString = theme.color[activeColor];
      const inactiveColorRgbaString = theme.color[color];
      const animatedColor = useSharedValue(
        isActive ? activeColorRgbaString : inactiveColorRgbaString,
      );

      animatedColor.value = withSpring(
        isActive ? activeColorRgbaString : inactiveColorRgbaString,
        tabsSpringConfig,
      );

      const animatedTextStyles = useAnimatedStyle(
        () => ({ color: animatedColor.value }),
        [animatedColor],
      );

      const pressableStyle = useMemo(
        () => ({
          borderRadius: theme.borderRadius[1000],
          opacity: disabledProp && !allTabsDisabled ? accessibleOpacityDisabled : undefined,
        }),
        [theme.borderRadius, disabledProp, allTabsDisabled],
      );

      return (
        <Pressable
          ref={ref}
          accessibilityRole={accessibilityRole}
          aria-selected={ariaSelected ?? isActive}
          disabled={isDisabled}
          onPress={handlePress}
          style={[pressableStyle, style]}
          testID={testID}
          {...props}
        >
          <Box alignItems="center" paddingX={2} paddingY={1}>
            {typeof label === 'string' ? (
              <AnimatedTextHeadline
                animated
                font={font}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                style={animatedTextStyles}
                testID={`${testID}-label`}
              >
                {label}
              </AnimatedTextHeadline>
            ) : (
              label
            )}
          </Box>
        </Pressable>
      );
    },
  ),
);

SegmentedTabComponent.displayName = 'SegmentedTab';

export const SegmentedTab = SegmentedTabComponent as SegmentedTabFC;
