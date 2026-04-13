import React, { forwardRef, memo, useEffect, useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import type { ScrollViewProps } from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  animateInMaxSizeConfig,
  animateInOpacityConfig,
  animateOutMaxSizeConfig,
  animateOutOpacityConfig,
} from '@coinbase/cds-common/animation/collapsible';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import type { CollapsibleDirection, PaddingProps, SharedProps } from '@coinbase/cds-common/types';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useContentSize } from '../hooks/useContentSize';
import { useTheme } from '../hooks/useTheme';
import { convertMotionConfigs } from '../motion/convertMotionConfig';
import { withMotionTiming } from '../motion/withMotionTiming';

const ReanimatedView = Animated.createAnimatedComponent(View);

export type CollapsibleBaseProps = SharedProps &
  PaddingProps & {
    /**
     * Expand/collapse state of the content.
     * @default true
     */
    collapsed: boolean;
    /**
     * Collapsible content
     */
    children: React.ReactNode;
    /**
     * Direction the content should expand/collapse to
     * @default vertical
     */
    direction?: CollapsibleDirection;
    /**
     * RN ScrollView props. Use with caution as it might break default settings.
     */
    scrollViewProps?: ScrollViewProps;
    /**
     * Max height of the content. Overflow content will be scrollable.
     */
    maxHeight?: number;
    /**
     * Max width of the content. Overflow content will be scrollable.
     */
    maxWidth?: number;
  };

export type CollapsibleProps = CollapsibleBaseProps;

export const Collapsible = memo(
  forwardRef((_props: CollapsibleProps, forwardedRef: React.ForwardedRef<View>) => {
    const mergedProps = useComponentConfig('Collapsible', _props);
    const {
      children,
      collapsed = true,
      direction = 'vertical',
      maxHeight,
      maxWidth,
      testID,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingEnd,
      paddingBottom,
      paddingStart,
      scrollViewProps,
    } = mergedProps;
    const theme = useTheme();
    // TO DO: Remove this after refactoring useContentSize to default values to null on initial render
    const hasMounted = useRef(false);
    useEffect(() => void (hasMounted.current = true), []);
    const isUnmountedExpanded = !collapsed && !hasMounted.current;

    const [{ height: contentHeight, width: contentWidth }, handleContentSizeChange] =
      useContentSize();

    const [animateInMaxSize, animateOutMaxSize, animateInOpacity, animateOutOpacity] =
      convertMotionConfigs([
        animateInMaxSizeConfig[direction],
        animateOutMaxSizeConfig[direction],
        animateInOpacityConfig[direction],
        animateOutOpacityConfig[direction],
      ]);

    const heightAnimatedValue = useSharedValue(animateInMaxSize.fromValue);
    const opacityAnimatedValue = useSharedValue(animateInOpacity.fromValue);

    const spacingStyles = {
      paddingTop: theme.space[paddingTop ?? paddingY ?? padding ?? 0],
      paddingEnd: theme.space[paddingEnd ?? paddingX ?? padding ?? 0],
      paddingBottom: theme.space[paddingBottom ?? paddingY ?? padding ?? 0],
      paddingStart: theme.space[paddingStart ?? paddingX ?? padding ?? 0],
    };

    const prevCollapsed = usePreviousValue(collapsed);

    // build props base on direction
    const { shouldEnableScroll, animateToSize, horizontal } = useMemo(() => {
      if (direction === 'vertical') {
        return {
          shouldEnableScroll: maxHeight ? contentHeight > maxHeight : false,
          animateToSize: maxHeight && maxHeight < contentHeight ? maxHeight : contentHeight,
          horizontal: false,
        };
      }

      return {
        shouldEnableScroll: maxWidth ? contentWidth > maxWidth : false,
        animateToSize: maxWidth && maxWidth < contentWidth ? maxWidth : contentWidth,
        horizontal: true,
      };
    }, [contentHeight, contentWidth, direction, maxHeight, maxWidth]);

    useAnimatedReaction(
      () => collapsed,
      (_collapsed) => {
        if (
          contentHeight === null ||
          contentHeight === 0 ||
          contentWidth === null ||
          contentWidth === 0
        ) {
          return;
        }

        // skip initial animation if initial expanded
        const shouldSkipAnimation = !_collapsed && !prevCollapsed;

        heightAnimatedValue.value = shouldSkipAnimation
          ? animateToSize
          : withMotionTiming(
              _collapsed
                ? animateOutMaxSize
                : // Using object spread here will crash react-native-reanimated with the resulting transpiled code

                  Object.assign({}, animateInMaxSize, { toValue: animateToSize }),
            );

        opacityAnimatedValue.value = shouldSkipAnimation
          ? animateInOpacity.toValue
          : withMotionTiming(_collapsed ? animateOutOpacity : animateInOpacity);
      },
      [collapsed, contentHeight, contentWidth],
    );

    /*
     * The following code is to avoid doing computed property names inside the
     * useAnimatedStyle because it crashes:
     *
     * [animateInMaxSize.property]: heightAnimatedValue.value  // this crashes
     *
     * We created an issue in Reanimated about this.
     * https://github.com/software-mansion/react-native-reanimated/issues/4162
     * */
    const animatedInMaxSizeHeight = useAnimatedStyle(() => ({
      height: heightAnimatedValue.value as number,
    }));
    const animatedInMaxSizeWidth = useAnimatedStyle(() => ({
      width: heightAnimatedValue.value as number,
    }));
    const animatedInMaxSize =
      animateInMaxSize.property === 'height' ? animatedInMaxSizeHeight : animatedInMaxSizeWidth;

    const animatedStyles = useAnimatedStyle(() => ({
      opacity: Number(opacityAnimatedValue.value),
    }));

    const animatedContainerStyles = useMemo(
      () => [styles.container, animatedStyles, animatedInMaxSize],
      [animatedStyles, animatedInMaxSize],
    );

    const containerStyles = isUnmountedExpanded ? styles.container : animatedContainerStyles;

    return (
      <ReanimatedView
        ref={forwardedRef}
        aria-expanded={!collapsed}
        style={containerStyles}
        testID={testID}
      >
        <ScrollView
          nestedScrollEnabled // for Android
          contentContainerStyle={spacingStyles}
          horizontal={horizontal}
          onContentSizeChange={handleContentSizeChange}
          scrollEnabled={shouldEnableScroll}
          {...scrollViewProps}
        >
          {children}
        </ScrollView>
      </ReanimatedView>
    );
  }),
);

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
});
