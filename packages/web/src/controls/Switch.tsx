import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { switchTransitionConfig } from '@coinbase/cds-common/motion/switch';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

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
  /** Sets the checked/active color of the control.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;
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
      disabled={disabled}
      label={children}
      role="switch"
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
        className={trackCss}
        data-filled={checked}
        justifyContent="flex-start"
        testID="switch-track"
      >
        <MotionBox
          animate={checked ? 'checked' : 'unchecked'}
          background={controlColor ?? defaultControlColor}
          borderRadius={1000}
          className={thumbCss}
          data-testid="switch-thumb"
          elevation={elevation}
          initial={false}
          testID="switch-thumb"
          transition={convertTransition(switchTransitionConfig)}
          variants={thumbMotionVariants}
        />
      </Box>
    </Control>
  );

  return children ? (
    <Box
      alignItems="center"
      className={COMPONENT_STATIC_CLASSNAME}
      minHeight="var(--controlSize-switchHeight)"
      role="presentation"
      width="fit-content"
    >
      {switchNode}
    </Box>
  ) : (
    switchNode
  );
});

export const Switch = memo(SwitchWithRef);
