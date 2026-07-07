import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { switchTransitionConfig } from '@coinbase/cds-common/motion/switch';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { convertTransition } from '../motion/utils';
import type { StylesAndClassNames } from '../types';

import { Control, type ControlBaseProps } from './Control';

/**
 * Static class names for Switch component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const switchClassNames = {
  /** Persistent outer wrapper across all variants. */
  root: 'cds-Switch',
  /** Underlying `Control` wrapper element. */
  control: 'cds-Switch-control',
  /** Track wrapper element. */
  track: 'cds-Switch-track',
  /** Thumb wrapper element. */
  thumb: 'cds-Switch-thumb',
} as const;

const trackCss = css`
  width: var(--controlSize-switchWidth);
  height: var(--controlSize-switchHeight);
  flex-shrink: 0;
  padding: 1px;

  transition:
    border-color,
    background-color 0.2s linear;

  &[data-filled='true'] {
    justify-content: flex-end;
  }
`;

const thumbCss = css`
  width: var(--controlSize-switchThumbSize);
  height: var(--controlSize-switchThumbSize);
  border: 0.5px solid var(--color-bgLine);

  position: absolute;
  /* Inset that keeps the thumb centered within the track regardless of the
   * configured track/thumb sizes (CDS default themes resolve this to 1px). */
  top: calc((var(--controlSize-switchHeight) - var(--controlSize-switchThumbSize)) / 2);
  left: calc((var(--controlSize-switchHeight) - var(--controlSize-switchThumbSize)) / 2);
`;

export type SwitchBaseProps = ControlBaseProps<string> & {
  /** Sets the checked/active color of the control.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;
};

export type SwitchProps = SwitchBaseProps &
  StylesAndClassNames<typeof switchClassNames> & {
    /**
     * Label content rendered next to the switch control.
     *
     * @example
     * ```tsx
     * <Switch onChange={handleChange}>Dark mode</Switch>
     * ```
     */
    children?: React.ReactNode;
  };

const MotionBox = motion(Box);

const thumbMotionVariants = {
  checked: {
    // Travel = trackWidth - 2*inset - thumbSize, which simplifies to
    // trackWidth - trackHeight when the thumb is centered with equal insets.
    x: `calc(var(--controlSize-switchWidth) - var(--controlSize-switchHeight))`,
  },
  unchecked: {
    x: 0,
  },
};

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(
  function SwitchWithRef(_props, ref) {
    const mergedProps = useComponentConfig('Switch', _props);
    const {
      children,
      checked,
      disabled,
      elevation,
      controlColor,
      background = checked ? 'bgPrimary' : 'bgTertiary',
      borderColor,
      borderRadius = 1000,
      borderWidth,
      value,
      className,
      style,
      classNames,
      styles,
      ...props
    } = mergedProps;
    const { activeColorScheme } = useTheme();
    const defaultControlColor = activeColorScheme === 'dark' ? 'fg' : 'fgInverse';
    const switchNode = (
      <Control
        ref={ref}
        borderRadius={1000}
        checked={checked}
        className={cx(switchClassNames.control, classNames?.control)}
        disabled={disabled}
        label={children}
        role="switch"
        style={{ ...style, ...styles?.control }}
        type="checkbox"
        value={value}
        {...props}
      >
        <Box
          alignItems="center"
          background={background}
          borderColor={borderColor}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          className={cx(trackCss, switchClassNames.track, classNames?.track)}
          data-filled={checked}
          justifyContent="flex-start"
          style={styles?.track}
          testID="switch-track"
        >
          <MotionBox
            animate={checked ? 'checked' : 'unchecked'}
            background={controlColor ?? defaultControlColor}
            borderRadius={1000}
            className={cx(thumbCss, switchClassNames.thumb, classNames?.thumb)}
            data-testid="switch-thumb"
            elevation={elevation}
            initial={false}
            style={styles?.thumb}
            testID="switch-thumb"
            transition={convertTransition(switchTransitionConfig)}
            variants={thumbMotionVariants}
          />
        </Box>
      </Control>
    );

    return (
      <Box
        alignItems={children ? 'center' : undefined}
        className={cx(switchClassNames.root, className, classNames?.root)}
        minHeight={children ? 'var(--controlSize-switchHeight)' : undefined}
        role="presentation"
        style={styles?.root}
        width="fit-content"
      >
        {switchNode}
      </Box>
    );
  },
);

export const Switch = memo(SwitchWithRef);
