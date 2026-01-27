import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  checkboxOpacityEnterConfig,
  checkboxOpacityExitConfig,
  checkboxScaleEnterConfig,
  checkboxScaleExitConfig,
} from '@coinbase/cds-common/motion/checkbox';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout';
import { useMotionProps } from '../motion/useMotionProps';

import { Control, type ControlBaseProps } from './Control';

const checkboxCss = css`
  position: relative;
  width: var(--controlSize-checkboxSize);
  height: var(--controlSize-checkboxSize);

  border-style: solid;

  transition:
    border-color,
    background-color 0.1s linear;

  /* Disable default focus ring before adding custom focus ring styles */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-color: var(--color-bgPrimary);
    outline-offset: 2px;
  }
`;

export type CheckboxProps<T extends string> = ControlBaseProps<T> & {
  /** Sets the checked/active color of the control.
   * @default fgInverse
   */
  controlColor?: ThemeVars.Color;
  /**
   * Optional.Sets the border width of the control.
   * @default 100
   */
  borderWidth?: ThemeVars.BorderWidth;
};

const CheckboxWithRef = forwardRef(function CheckboxWithRef<T extends string>(
  {
    children,
    checked,
    indeterminate,
    controlColor = 'fgInverse',
    background = checked || indeterminate ? 'bgPrimary' : 'bg',
    borderColor = checked || indeterminate ? 'bgPrimary' : 'bgLineHeavy',
    borderRadius,
    borderWidth = 100,
    elevation,
    ...props
  }: CheckboxProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const filled = checked || indeterminate;
  const theme = useTheme();
  const checkboxSize = theme.controlSize.checkboxSize;
  const iconPadding = checkboxSize / 5;
  const iconSize = checkboxSize - iconPadding;

  const innerContainerMotionProps = useMotionProps({
    enterConfigs: [checkboxOpacityEnterConfig, checkboxScaleEnterConfig],
    exitConfigs: [checkboxOpacityExitConfig, checkboxScaleExitConfig],
    animate: filled ? 'enter' : 'exit',
  });

  const iconStyle = useMemo(
    () => ({
      icon: {
        width: iconSize,
        height: iconSize,
        fontSize: iconSize,
        opacity: filled ? 1 : 0,
      } as const,
    }),
    [iconSize, filled],
  );

  return (
    <Control
      ref={ref}
      aria-label={props.accessibilityLabel}
      borderRadius={borderRadius}
      borderWidth={borderWidth}
      checked={checked}
      elevation={elevation}
      label={children}
      type="checkbox"
      {...props}
    >
      <Box
        key={theme.activeColorScheme}
        alignItems="center"
        background={background}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        className={checkboxCss}
        data-filled={filled}
        flexShrink={0}
        justifyContent="center"
        role="presentation"
        testID="checkbox-outer"
      >
        <motion.div {...innerContainerMotionProps} data-testid="checkbox-inner">
          <Icon
            color={controlColor}
            name={checked ? 'checkmark' : 'minus'}
            size="s"
            styles={iconStyle}
            testID="checkbox-icon"
          />
        </motion.div>
      </Box>
    </Control>
  );
}) as <T extends string>(
  props: CheckboxProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;
