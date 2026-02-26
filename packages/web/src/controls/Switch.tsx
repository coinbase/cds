import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { switchTransitionConfig } from '@coinbase/cds-common/motion/switch';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout/Box';
import { convertTransition } from '../motion/utils';

import { Control, type ControlBaseProps } from './Control';

const COMPONENT_STATIC_CLASSNAME = 'cds-Switch';

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
  top: 1px;
  left: 1px;
`;

export type SwitchProps = ControlBaseProps<string> & {
  /**
   * Label content rendered next to the switch control.
   *
   * @example
   * ```tsx
   * <Switch onChange={handleChange}>Dark mode</Switch>
   * ```
   */
  children?: React.ReactNode;
  /** Sets the checked/active color of the control.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;

  classNames?: {
    /** Persistent outer wrapper (`cds-Switch`) across all variants. */
    root?: string;
    /** Control wrapper className. */
    control?: string;
    /**
     * Inner alignment wrapper used only when `children` is provided (labeled variant).
     */
    switchNodeContainer?: string;
    /** Track wrapper className. */
    track?: string;
    /** Thumb wrapper className. */
    thumb?: string;
  };
  styles?: {
    /** Persistent outer wrapper (`cds-Switch`) across all variants. */
    root?: React.CSSProperties;
    /**
     * Control wrapper style.
     * Applied to the underlying `Control` element (same element that receives `style`).
     */
    control?: React.CSSProperties;
    /**
     * Inner alignment wrapper used only when `children` is provided (labeled variant).
     */
    switchNodeContainer?: React.CSSProperties;
    /** Track wrapper style. */
    track?: React.CSSProperties;
    /** Thumb wrapper style. */
    thumb?: React.CSSProperties;
  };
};

const MotionBox = motion(Box);

const thumbMotionVariants = {
  checked: {
    x: `calc(var(--controlSize-switchWidth) - var(--controlSize-switchThumbSize) - 2px)`,
  },
  unchecked: {
    x: 0,
  },
};

const SwitchWithRef = forwardRef<HTMLInputElement, SwitchProps>(function SwitchWithRef(
  {
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
  },
  ref,
) {
  const { activeColorScheme } = useTheme();
  const defaultControlColor = activeColorScheme === 'dark' ? 'fg' : 'fgInverse';
  const switchNode = (
    <Control
      ref={ref}
      borderRadius={1000}
      checked={checked}
      className={classNames?.control}
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
        className={cx(trackCss, classNames?.track)}
        data-filled={checked}
        justifyContent="flex-start"
        style={styles?.track}
        testID="switch-track"
      >
        <MotionBox
          animate={checked ? 'checked' : 'unchecked'}
          background={controlColor ?? defaultControlColor}
          borderRadius={1000}
          className={cx(thumbCss, classNames?.thumb)}
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
      className={cx(COMPONENT_STATIC_CLASSNAME, className, classNames?.root)}
      role="presentation"
      style={styles?.root}
      width="fit-content"
    >
      {children ? (
        <Box
          alignItems="center"
          className={classNames?.switchNodeContainer}
          minHeight="var(--controlSize-switchHeight)"
          style={styles?.switchNodeContainer}
        >
          {switchNode}
        </Box>
      ) : (
        switchNode
      )}
    </Box>
  );
});

export const Switch = memo(SwitchWithRef);
