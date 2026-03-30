import React, { memo, useMemo } from 'react';
import { handleBarHeight } from '@coinbase/cds-common/tokens/drawer';
import { css } from '@linaria/core';

import { cx } from '../../cx';
import { Box, type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../../layout';
import { Pressable } from '../../system/Pressable';

// Fixed pixel values used intentionally — handle size should not scale with theme density.
const HANDLE_WIDTH = 32;
const HANDLE_OPACITY = 0.4;

const containerBaseCss = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: var(--space-2);
  padding-bottom: var(--space-2);
`;

const containerPressableCss = css`
  width: 100%;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const handleCss = css`
  width: ${HANDLE_WIDTH}px;
  height: ${handleBarHeight}px;
  border-radius: var(--borderRadius-1000);
  opacity: ${HANDLE_OPACITY};
`;

/**
 * A draggable handle indicator for overlay components like Tray.
 * @note Web only supports inside handlebar.
 */
export type HandleBarBaseProps = Omit<BoxBaseProps, 'children' | 'background'> & {
  /**
   * Callback fired when the handlebar is closed via keyboard (Enter/Space) or click.
   * When provided, the handle element becomes a focusable button and drag styling is enabled.
   */
  onClose?: () => void;
};

export type HandleBarProps = Omit<BoxProps<BoxDefaultElement>, 'children' | 'background'> &
  HandleBarBaseProps & {
    /** Custom class names for individual elements of the HandleBar component */
    classNames?: {
      /** Root container element */
      root?: string;
      /** Handle element */
      handle?: string;
    };
    /** Custom styles for individual elements of the HandleBar component */
    styles?: {
      /** Root container element */
      root?: React.CSSProperties;
      /** Handle element */
      handle?: React.CSSProperties;
    };
  };

export const HandleBar = memo(
  ({
    testID = 'handleBar',
    onClose,
    accessibilityLabel,
    accessibilityHint,
    classNames,
    styles,
    className,
    style,
    ...props
  }: HandleBarProps) => {
    const rootStyle = useMemo(
      () => (style || styles?.root ? { ...style, ...styles?.root } : undefined),
      [style, styles?.root],
    );

    const handleClassName = cx(handleCss, classNames?.handle);
    return (
      <Box
        className={cx(
          containerBaseCss,
          onClose && containerPressableCss,
          classNames?.root ?? className,
        )}
        data-testid={testID}
        style={rootStyle}
        {...props}
      >
        {onClose ? (
          <Pressable
            noScaleOnPress
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            background="bgInverse"
            borderColor="transparent"
            className={handleClassName}
            onClick={onClose}
            style={styles?.handle}
          />
        ) : (
          <Box
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            background="bgInverse"
            className={handleClassName}
            style={styles?.handle}
          />
        )}
      </Box>
    );
  },
);
