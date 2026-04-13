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

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout';
import { useMotionProps } from '../motion/useMotionProps';

import { Control, type ControlBaseProps } from './Control';

const checkboxCss = css`
  position: relative;
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

export type CheckboxBaseProps<CheckboxValue extends string> = ControlBaseProps<CheckboxValue> & {
  /**
   * Sets the checked/active color of the checkbox.
   * @default fgInverse
   */
  controlColor?: ThemeVars.Color;
  /**
   * Sets the border width of the checkbox.
   * @default 100
   */
  borderWidth?: ThemeVars.BorderWidth;
  /**
   * Sets the outer checkbox control size in pixels.
   * @default theme.controlSize.checkboxSize
   */
  controlSize?: number;
};

export type CheckboxProps<CheckboxValue extends string> = CheckboxBaseProps<CheckboxValue>;

const CheckboxWithRef = forwardRef(function CheckboxWithRef<CheckboxValue extends string>(
  _props: CheckboxProps<CheckboxValue>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const mergedProps = useComponentConfig('Checkbox', _props);
  const {
    children,
    checked,
    indeterminate,
    controlColor = 'fgInverse',
    background = checked || indeterminate ? 'bgPrimary' : 'bg',
    borderColor = checked || indeterminate ? 'bgPrimary' : 'bgLineHeavy',
    borderRadius = 100,
    borderWidth = 100,
    elevation,
    controlSize,
    ...props
  } = mergedProps;
  const filled = checked || indeterminate;
  const theme = useTheme();
  const checkboxSize = controlSize ?? theme.controlSize.checkboxSize;
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
        style={{ width: checkboxSize, height: checkboxSize }}
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
}) as <CheckboxValue extends string>(
  props: CheckboxProps<CheckboxValue> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Checkbox = memo(CheckboxWithRef) as typeof CheckboxWithRef &
  React.MemoExoticComponent<typeof CheckboxWithRef>;
