import React, { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common/types';

import { DotCount } from '../dots/DotCount';
import { useTheme } from '../hooks/useTheme';
import { HStack } from '../layout';
import type { TextProps } from '../typography/Text';
import { Text } from '../typography/Text';

import { useDotAnimation } from './hooks/useDotAnimation';
import type { TabProps } from './TabNavigation';

const COLORS = {
  primary: {
    active: 'fgPrimary',
    inactive: 'fg',
  },
  secondary: {
    active: 'fg',
    inactive: 'fgMuted',
  },
} as const;

export type TabLabelBaseProps = SharedProps &
  Pick<TabProps, 'variant' | 'count' | 'accessibilityLabel' | 'max' | 'Component'> & {
    /** Identify the active tab */
    active?: boolean;
    /** Display title to render as the TabLabel. */
    children: React.ReactNode;
    /** Callback to fire when pressed */
    onPress?: () => void;
  };

export type TabLabelProps = TabLabelBaseProps & TextProps;

export const TabLabel = memo(
  ({ active, variant = 'primary', count = 0, max, ...props }: TabLabelProps) => {
    const theme = useTheme();
    const shouldMeasureElement = useMemo(() => !active && variant !== 'primary', [active, variant]);
    const color = useMemo(() => COLORS[variant][active ? 'active' : 'inactive'], [active, variant]);
    const TextElement = useMemo(() => {
      if (variant === 'primary') return (props: TextProps) => <Text {...props} font="headline" />;
      if (active) return (props: TextProps) => <Text {...props} font="title3" />;

      return (props: TextProps) => <Text {...props} font="title4" />;
    }, [active, variant]);

    // Styles
    const dynamicStyles = useMemo(
      () =>
        // Only primary tabs need special spacing
        variant === 'primary' && {
          paddingTop: theme.space[2],
          paddingBottom: theme.space[2] - 2, // Account for the 2pt TabIndicator
        },
      [theme.space, variant],
    );

    // ⚡️ Side effects
    const lastCount = useRef(0);
    const { animateIn, animateOut, width, opacity } = useDotAnimation();
    useEffect(() => {
      // Animate dotBadge in
      if (count && lastCount.current !== count) animateIn(count);
      if (!count && lastCount.current !== count) animateOut(count);

      lastCount.current = count;
    }, [count, animateIn, animateOut]);

    // Memoized dot Styles
    const dotStyles = useMemo(
      () => ({ container: { width }, inner: { opacity, marginLeft: theme.space[0.5] } }),
      [opacity, theme.space, width],
    );

    return (
      <HStack alignItems="center">
        {shouldMeasureElement ? (
          <View>
            <TextElement {...props} color={color} style={dynamicStyles} />
            {/* This element is used to ensure the element width doesn't change when we change font-weight */}
            <Text {...props} aria-hidden font="title3" style={styles.hiddenElement} />
          </View>
        ) : (
          <TextElement {...props} color={color} style={dynamicStyles} />
        )}
        <Animated.View style={dotStyles.container}>
          <Animated.View style={dotStyles.inner}>
            <DotCount count={count} max={max} />
          </Animated.View>
        </Animated.View>
      </HStack>
    );
  },
);

TabLabel.displayName = 'TabLabel';

const styles = StyleSheet.create({
  hiddenElement: {
    opacity: 0,
    width: '100%',
    height: 0,
  },
});
