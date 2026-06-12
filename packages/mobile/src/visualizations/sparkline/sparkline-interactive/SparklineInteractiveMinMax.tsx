import React, { memo, useCallback, useMemo, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { LayoutChangeEvent } from 'react-native';
import type {
  ChartDataPoint,
  ChartFormatAmount,
  ChartXFunction,
} from '@coinbase/cds-common/types/Chart';

import { useLayout } from '../../../hooks/useLayout';
import { useTheme } from '../../../hooks/useTheme';
import { Text } from '../../../typography/Text';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useMinMaxTransform } from './useMinMaxTransform';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

type SparklineInteractiveMinMaxContentProps = {
  x: number;
};

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    alignItems: 'center',
  },
  caption: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

const SparklineInteractiveMinMaxContent: React.FunctionComponent<
  React.PropsWithChildren<SparklineInteractiveMinMaxContentProps>
> = memo(({ x, children }) => {
  const theme = useTheme();
  const [minMaxLayout, onMinMaxLayout] = useLayout();
  const opacity = useRef(new Animated.Value(0)).current;
  const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  useMinMaxTransform({ minMaxLayout, x, transform, opacity });

  // Only do the layout if there is a new child.
  // This prevents jitter in the case where children is
  // set to undefined, then returned to the previous value,
  // as is the case for privacy mode (where we hide the value)
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (!children) {
        return;
      }

      return onMinMaxLayout(event);
    },
    [onMinMaxLayout, children],
  );

  const rootStyle = useMemo(() => {
    return {
      ...styles.caption,
      height: theme.lineHeight.label2,
      opacity,
      transform: transform.getTranslateTransform(),
    };
  }, [opacity, theme.lineHeight.label2, transform]);

  const textLabelStyle = useMemo(() => {
    return {
      ...styles.caption,
      backgroundColor: theme.color.bg,
    };
  }, [theme.color.bg]);

  return (
    <Animated.View pointerEvents="none" style={rootStyle}>
      <Text color="fgMuted" font="label2" onLayout={onLayout} padding={0} style={textLabelStyle}>
        {children}
      </Text>
    </Animated.View>
  );
});

export type SparklineInteractiveMinMaxProps = {
  dataPoint: ChartDataPoint | undefined;
  formatMinMaxLabel: ChartFormatAmount;
  xFunction: ChartXFunction;
};

export const SparklineInteractiveMinMax: React.FunctionComponent<
  React.PropsWithChildren<SparklineInteractiveMinMaxProps>
> = memo(({ formatMinMaxLabel, dataPoint, xFunction }) => {
  const theme = useTheme();
  const { minMaxOpacity } = useSparklineInteractiveContext();
  const { SparklineInteractiveMinMaxLabelHeight } = useSparklineInteractiveConstants({});

  const rootStyle = useMemo(() => {
    return {
      ...styles.outer,
      opacity: minMaxOpacity,
      backgroundColor: theme.color.bg,
      height: SparklineInteractiveMinMaxLabelHeight,
    };
  }, [SparklineInteractiveMinMaxLabelHeight, minMaxOpacity, theme.color.bg]);

  return (
    <Animated.View pointerEvents="none" style={rootStyle}>
      {!!dataPoint && (
        <SparklineInteractiveMinMaxContent x={xFunction(dataPoint.date)}>
          {formatMinMaxLabel(dataPoint.value)}
        </SparklineInteractiveMinMaxContent>
      )}
    </Animated.View>
  );
});
