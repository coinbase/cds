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

import { useTheme } from '../hooks/useTheme';
import { Box } from '../layout';
import { useMotionProps } from '../motion/useMotionProps';

import { Control, type ControlBaseProps } from './Control';

const DotSvg = ({
  color = 'black',
  width = 20,
}: {
  color?: React.CSSProperties['color'];
  width?: number;
}) => {
  return (
    <svg fill="none" height={width} viewBox={`0 0 ${width} ${width}`} width={width}>
      <circle cx="50%" cy="50%" fill={color} r={width / 3} />
    </svg>
  );
};

const baseCss = css`
  position: relative;
  appearance: radio;
  width: var(--controlSize-radioSize);
  height: var(--controlSize-radioSize);

  border-style: solid;
  border-width: var(--borderWidth-100);
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

export type RadioProps<RadioValue extends string> = ControlBaseProps<RadioValue> & {
  /** Sets the checked/active color of the control.
   * @default bgPrimary
   */
  controlColor?: ThemeVars.Color;
};

const RadioWithRef = forwardRef(function RadioWithRef<RadioValue extends string>(
  {
    children,
    controlColor = 'bgPrimary',
    checked = false,
    background = 'bg',
    borderColor = checked ? controlColor : 'bgLineHeavy',
    elevation,
    ...props
  }: RadioProps<RadioValue>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const theme = useTheme();
  const iconWidth = theme.controlSize.radioSize;

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
        className={baseCss}
        data-filled={checked}
        flexShrink={0}
        justifyContent="center"
        role="presentation"
      >
        <motion.div {...innerContainerMotionProps}>
          {checked && (
            // setting inner dot to match color of the radio outline
            <Box color={controlColor} testID="radio-icon">
              <DotSvg color="currentColor" width={iconWidth} />
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
