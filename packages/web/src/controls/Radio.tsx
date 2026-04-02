import React, { forwardRef, memo } from 'react';
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
import { Box } from '../layout';
import { useMotionProps } from '../motion/useMotionProps';

import { Control, type ControlBaseProps } from './Control';

const DotSvg = ({
  color = 'black',
  width = 20,
  dotSize = (2 * width) / 3,
}: {
  color?: React.CSSProperties['color'];
  width?: number;
  dotSize?: number;
}) => {
  return (
    <svg fill="none" height={width} viewBox={`0 0 ${width} ${width}`} width={width}>
      <circle cx="50%" cy="50%" fill={color} r={dotSize / 2} />
    </svg>
  );
};

const baseCss = css`
  position: relative;
  appearance: radio;

  border-style: solid;
  border-radius: var(--borderRadius-1000);
  transition: border-color 0.2s linear;

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

export type RadioBaseProps<RadioValue extends string> = ControlBaseProps<RadioValue> & {
  /**
   * Sets the checked/active color of the radio.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;
  /**
   * Sets the border width of the radio.
   * @default 100
   */
  borderWidth?: ThemeVars.BorderWidth;
  /**
   * Sets the outer radio control size in pixels.
   * @default theme.controlSize.radioSize
   */
  controlSize?: number;
  /**
   * Sets the inner dot size in pixels.
   * @default 2/3 of controlSize
   */
  dotSize?: number;
};

export type RadioProps<RadioValue extends string> = RadioBaseProps<RadioValue>;

const RadioWithRef = forwardRef(function RadioWithRef<RadioValue extends string>(
  _props: RadioProps<RadioValue>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const mergedProps = useComponentConfig('Radio', _props);
  const {
    children,
    controlColor = 'bgPrimary',
    checked = false,
    background = 'bg',
    borderColor = checked ? controlColor : 'bgLineHeavy',
    borderWidth = 100,
    elevation,
    controlSize,
    dotSize,
    ...props
  } = mergedProps;
  const theme = useTheme();
  const iconWidth = controlSize ?? theme.controlSize.radioSize;

  const innerContainerMotionProps = useMotionProps({
    enterConfigs: [checkboxOpacityEnterConfig, checkboxScaleEnterConfig],
    exitConfigs: [checkboxOpacityExitConfig, checkboxScaleExitConfig],
    animate: checked ? 'enter' : 'exit',
  });

  return (
    <Control
      ref={ref}
      checked={checked}
      elevation={elevation}
      label={children}
      type="radio"
      {...props}
    >
      <Box
        alignItems="center"
        background={background}
        borderColor={borderColor}
        borderWidth={borderWidth}
        className={baseCss}
        data-filled={checked}
        flexShrink={0}
        justifyContent="center"
        role="presentation"
        style={{ width: iconWidth, height: iconWidth }}
      >
        <motion.div {...innerContainerMotionProps}>
          {checked && (
            // setting inner dot to match color of the radio outline
            <Box color={controlColor} testID="radio-icon">
              <DotSvg color="currentColor" dotSize={dotSize} width={iconWidth} />
            </Box>
          )}
        </motion.div>
      </Box>
    </Control>
  );
}) as <RadioValue extends string>(
  props: RadioProps<RadioValue> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Radio = memo(RadioWithRef) as typeof RadioWithRef &
  React.MemoExoticComponent<typeof RadioWithRef>;
