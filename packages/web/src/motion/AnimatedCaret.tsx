import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { animateRotateConfig } from '@coinbase/cds-common/motion/animatedCaret';
import type { InputVariant, SharedProps } from '@coinbase/cds-common/types';
import { m as motion, MotionConfig } from 'framer-motion';

import { useTextInputFocusVariantContent } from '../controls/context';
import { Icon, type IconProps } from '../icons/Icon';
import { HStack } from '../layout/HStack';

import { useMotionProps } from './useMotionProps';

export type AnimatedCaretBaseProps = SharedProps & {
  rotate: number;
};

export type AnimatedCaretProps = AnimatedCaretBaseProps & Partial<Omit<IconProps, 'name'>>;

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

export const AnimatedCaret = memo(function AnimatedCaret({
  rotate,
  size = 's',
  color = 'fgMuted',
  testID,
  padding,
  paddingBottom,
  paddingEnd,
  paddingX,
  paddingStart,
  paddingTop,
  paddingY,
  ...props
}: AnimatedCaretProps) {
  const motionProps = useMotionProps({
    enterConfigs: [{ ...animateRotateConfig, toValue: rotate }],
    initial: false,
  });
  const textInputVariant = useTextInputFocusVariantContent();
  const variant = textInputVariant ? variantColorMap[textInputVariant] : color;

  return (
    // HStack to limit rotate boundary
    <HStack
      padding={padding}
      paddingBottom={paddingBottom}
      paddingEnd={paddingEnd}
      paddingStart={paddingStart}
      paddingTop={paddingTop}
      paddingX={paddingX}
      paddingY={paddingY}
    >
      <MotionConfig reducedMotion="user">
        <motion.div {...motionProps} data-testid={`${testID}-motion`}>
          <Icon color={variant} name="caretUp" size={size} {...props} />
        </motion.div>
      </MotionConfig>
    </HStack>
  );
});
