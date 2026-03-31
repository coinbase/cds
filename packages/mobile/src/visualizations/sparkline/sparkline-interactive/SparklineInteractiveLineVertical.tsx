import React, { memo, useMemo } from 'react';
import { Animated as RNAnimated, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { Line, Svg } from 'react-native-svg';
import { maskOpacity } from '@coinbase/cds-common/tokens/sparkline';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';
import { useSparklineInteractiveLineStyles } from './useSparklineInteractiveLineStyles';

type SparklineInteractiveLineVerticalMobileProps = {
  color: string;
  showHoverDate: boolean;
};

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },
});

const SparklineInteractiveDottedLine = memo(
  ({ color, showHoverDate }: SparklineInteractiveLineVerticalMobileProps) => {
    const theme = useTheme();
    const { markerXPosition, compact } = useSparklineInteractiveContext();
    const { lineProps } = useSparklineInteractiveLineStyles();
    const {
      chartHeight,
      SparklineInteractiveMinMaxLabelHeight,
      chartVerticalLineWidth,
      chartWidth,
    } = useSparklineInteractiveConstants({ compact });

    const dottedLineHeight =
      chartHeight + SparklineInteractiveMinMaxLabelHeight * (showHoverDate ? 1 : 2);

    const lineStyles = useMemo(() => {
      return {
        width: chartVerticalLineWidth,
        height: dottedLineHeight,
        top: showHoverDate ? 0 : -SparklineInteractiveMinMaxLabelHeight,
        zIndex: 2,
      };
    }, [
      SparklineInteractiveMinMaxLabelHeight,
      chartVerticalLineWidth,
      dottedLineHeight,
      showHoverDate,
    ]);

    const animatedTranslateX = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: markerXPosition.value,
        },
      ],
    }));

    const dottedLinePositionStyles = useMemo(
      () => [lineStyles, animatedTranslateX],
      [lineStyles, animatedTranslateX],
    );

    const maskStyles = useMemo(() => {
      return {
        ...StyleSheet.absoluteFillObject,
        height: dottedLineHeight,
        width: chartWidth,
        top: showHoverDate ? 0 : -SparklineInteractiveMinMaxLabelHeight,
        backgroundColor: theme.color.bg,
        opacity: maskOpacity,
        zIndex: 1,
      };
    }, [
      SparklineInteractiveMinMaxLabelHeight,
      chartWidth,
      dottedLineHeight,
      showHoverDate,
      theme.color.bg,
    ]);

    const maskPositionStyles = useMemo(
      () => [maskStyles, animatedTranslateX],
      [maskStyles, animatedTranslateX],
    );

    return (
      <>
        <Animated.View style={dottedLinePositionStyles}>
          <Svg>
            <Line {...lineProps} stroke={color} y2={dottedLineHeight} />
          </Svg>
        </Animated.View>
        <Animated.View style={maskPositionStyles} />
      </>
    );
  },
);

export const SparklineInteractiveLineVertical = memo(
  ({ color, showHoverDate }: SparklineInteractiveLineVerticalMobileProps) => {
    const { markerOpacity } = useSparklineInteractiveContext();

    const rootStyle = useMemo(() => {
      return {
        ...styles.wrapper,
        opacity: markerOpacity,
      };
    }, [markerOpacity]);

    return (
      <RNAnimated.View pointerEvents="none" style={rootStyle}>
        <SparklineInteractiveDottedLine color={color} showHoverDate={showHoverDate} />
      </RNAnimated.View>
    );
  },
);
