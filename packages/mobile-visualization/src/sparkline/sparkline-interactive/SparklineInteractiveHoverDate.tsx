import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import type { ChartScrubParams } from '@coinbase/cds-common/types/Chart';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';

import type { SparklineInteractiveBaseProps } from './SparklineInteractive';
import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';
import { useSparklineInteractiveConstants } from './useSparklineInteractiveConstants';

type Props<Period extends string> = Pick<
  SparklineInteractiveBaseProps<Period>,
  'formatHoverDate'
> & {
  shouldTakeUpHeight: boolean;
};

export function setTransform(
  x: number,
  elWidth: number,
  containerWidth: number,
  transform: Animated.ValueXY,
  gutter: number,
) {
  let newX = x - elWidth / 2;
  newX = Math.max(gutter, newX);
  newX = Math.min(newX, containerWidth - elWidth - gutter);

  transform.setValue({ x: newX, y: 0 });
}

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  caption: {
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
  },
});

const MAX_MEASURE_ITERATIONS = 5;

export type SparklineInteractiveHoverDateRefProps<Period extends string> = {
  update: (params: ChartScrubParams<Period>) => void;
};

const SparklineInteractiveHoverDateWithGeneric = forwardRef(
  <Period extends string>(
    { formatHoverDate, shouldTakeUpHeight }: Props<Period>,
    ref: React.ForwardedRef<SparklineInteractiveHoverDateRefProps<Period>>,
  ) => {
    const theme = useTheme();
    const { hoverDateOpacity, gutter } = useSparklineInteractiveContext();
    const { SparklineInteractiveMinMaxLabelHeight, chartWidth } = useSparklineInteractiveConstants(
      {},
    );
    const transform = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [displayText, setDisplayText] = useState('');
    const textRef = useRef<Text | null>(null);

    // period => number mapping
    const measuredWidth = useRef<Record<string, number>>({});
    const measureIterations = useRef<Record<string, number>>({});
    // if we have no gutter the min/max label needs some space so it's not right up against the edge of the screen
    const minGutter = gutter === 0 ? theme.space['1'] : 0;

    useImperativeHandle(ref, () => ({
      update: (params: ChartScrubParams<Period>) => {
        const {
          point: { x, date },
          period,
        } = params;

        // the second conditional is to let typescript know x is always defined after this line
        if (!Number.isFinite(x) || x === undefined) {
          return;
        }

        const text = formatHoverDate?.(date, period);
        if (!text) {
          return;
        }

        setDisplayText(text);

        measureIterations.current[period] = measureIterations.current[period] ?? 0;
        if (measureIterations.current[period] > MAX_MEASURE_ITERATIONS) {
          const currWidth = measuredWidth.current[period];
          setTransform(x, currWidth, chartWidth, transform, minGutter);
        } else {
          const measure = () => {
            textRef.current?.measure((ox, oy, width) => {
              measureIterations.current[period] += 1;
              measuredWidth.current[period] = Math.max(width, measuredWidth.current[period] ?? 0);
              setTransform(x, measuredWidth.current[period], chartWidth, transform, minGutter);
            });
          };

          if (typeof requestAnimationFrame === 'function') {
            requestAnimationFrame(measure);
          } else {
            setTimeout(measure, 0);
          }
        }
      },
    }));

    const rootStyle = useMemo(() => {
      return {
        position: shouldTakeUpHeight ? 'relative' : 'absolute',
        opacity: hoverDateOpacity,
        backgroundColor: theme.color.bg,
        height: SparklineInteractiveMinMaxLabelHeight,
        ...styles.outer,
      } as const;
    }, [
      SparklineInteractiveMinMaxLabelHeight,
      hoverDateOpacity,
      shouldTakeUpHeight,
      theme.color.bg,
    ]);

    const innerStyle = useMemo(() => {
      return {
        ...styles.caption,
        transform: transform.getTranslateTransform(),
      };
    }, [transform]);

    const textStyle = useMemo(() => {
      return {
        fontSize: theme.fontSize.label2,
        lineHeight: theme.lineHeight.label2,
        fontFamily: theme.fontFamily.label2,
        color: theme.color.fgMuted,
      };
    }, [
      theme.color.fgMuted,
      theme.fontFamily.label2,
      theme.fontSize.label2,
      theme.lineHeight.label2,
    ]);

    return (
      <Animated.View pointerEvents="none" style={rootStyle}>
        <Animated.View style={innerStyle}>
          <Text
            ref={textRef}
            accessibilityHint="Hover date label"
            accessibilityLabel="Hover date label"
            style={textStyle}
          >
            {displayText}
          </Text>
        </Animated.View>
      </Animated.View>
    );
  },
);

type ForwardRefWithPeriod<Period extends string> = React.ForwardRefExoticComponent<
  Props<Period> & { ref?: React.Ref<SparklineInteractiveHoverDateRefProps<Period>> }
>;

export const SparklineInteractiveHoverDate =
  SparklineInteractiveHoverDateWithGeneric as ForwardRefWithPeriod<any>;
