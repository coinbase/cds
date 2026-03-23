import React, { memo, useCallback } from 'react';
import { animateProgressBaseSpec } from '@coinbase/cds-common/animation/progress';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValues } from '@coinbase/cds-common/hooks/usePreviousValues';
import { durations } from '@coinbase/cds-common/motion/tokens';
import type { MotionDuration } from '@coinbase/cds-common/types';

import { Text } from '../typography/Text';

import { Counter } from './Counter';
import type { ProgressBaseProps } from './ProgressBar';

export type ProgressTextLabelProps = Pick<
  ProgressBaseProps,
  'disableAnimateOnMount' | 'disabled'
> & {
  value: number;
  renderLabel?: (num: number, disabled?: boolean) => React.ReactNode;
  color?: ThemeVars.Color;
  /**
   * Custom style for the text label.
   */
  style?: React.CSSProperties;
  /**
   * Custom class name for the text label.
   */
  className?: string;
};

export const ProgressTextLabel = memo(
  ({
    value,
    renderLabel,
    disableAnimateOnMount,
    disabled,
    color,
    style,
    className,
  }: ProgressTextLabelProps) => {
    const { getPreviousValue, addPreviousValue } = usePreviousValues<number>([
      disableAnimateOnMount ? value : 0,
    ]);

    addPreviousValue(value);

    const renderNum = useCallback(
      (num: number) => {
        const textValue = renderLabel ? renderLabel(num, disabled) : `${num}%`;

        // if the user supplied value returns a string use default formatting
        if (typeof textValue === 'string') {
          return (
            <Text
              noWrap
              tabularNumbers
              className={className}
              color={color ?? 'fg'}
              disabled={disabled}
              font="label2"
              style={style}
              textAlign="end"
            >
              {textValue}
            </Text>
          );
        }

        return textValue;
      },
      [color, disabled, renderLabel, style, className],
    );
    return (
      <Counter
        durationInMillis={durations[animateProgressBaseSpec.duration as MotionDuration]}
        endNum={value}
        renderNum={renderNum}
        startNum={getPreviousValue() ?? 0}
      />
    );
  },
);
