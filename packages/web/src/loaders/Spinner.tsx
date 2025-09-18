import React, { memo, useMemo } from 'react';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';

export type SpinnerBaseProps = {
  /**
   * The font size of the spinner in pixels - used to calculate the width, height, and borderWidth. Width and height are 10em while borderWidth is 1.1em.
   */
  size: number;
};

export type SpinnerProps = SpinnerBaseProps & BoxProps<BoxDefaultElement>;

const baseCss = css`
  position: relative;
  border: 1.1em solid;
  border-radius: 50%;
  width: 10em;
  height: 10em;
  border-top-color: var(--color-bgAlternate);
  border-right-color: var(--color-bgAlternate);
  border-left-color: var(--color-bgAlternate);
  animation: spin 1000ms linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const spinnerStatusCss = css`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const Spinner = memo(
  ({
    color = 'fgMuted',
    size,
    style,
    className,
    accessibilityLabel,
    testID,
    ...props
  }: SpinnerProps) => {
    const spinnerStyle = useMemo(
      () => ({
        fontSize: `${size}px`,
        ...style,
      }),
      [size, style],
    );
    return (
      <Box
        aria-describedby="spinnerStatus"
        className={cx(baseCss, className)}
        color={color}
        data-testid={testID}
        role="status"
        style={spinnerStyle}
        {...props}
      >
        <div aria-live="polite" className={spinnerStatusCss} id="spinnerStatus">
          {accessibilityLabel}
        </div>
      </Box>
    );
  },
);

Spinner.displayName = 'Spinner';
