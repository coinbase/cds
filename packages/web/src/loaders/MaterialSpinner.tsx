import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';
import { m as motion } from 'framer-motion';

import { useMotionProps } from '../motion/useMotionProps';

const circleCss = css`
  stroke-dasharray: 180;
  transform-origin: center;
`;

export type MaterialSpinnerProp = {
  /** Size of the spinner */
  size: number;
  /** Color of the spinner */
  color: ThemeVars.Color;
} & SharedProps;

/**
 * @deprecated Use Spinner component instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v7
 */
export const MaterialSpinner = memo(({ size, color, testID }: MaterialSpinnerProp) => {
  const svgMotionProps = useMotionProps({
    animate: {
      rotate: [0, 360],
    },
    transition: { easing: 'linear', duration: 'slow4', repeat: Infinity },
  });

  const circleMotionProps = useMotionProps({
    initial: { strokeDashoffset: 0 },
    animate: {
      rotate: [0, 135, 360],
      strokeDashoffset: [180, 45, 180],
    },
    transition: {
      easing: 'global',
      duration: 'slow4',
      repeat: Infinity,
      times: [0, 0.5, 1],
    },
  });

  const style = useMemo(() => ({ stroke: `var(--color-${color})` }), [color]);

  return (
    <motion.svg
      data-testid={testID}
      height={`${size}px`}
      style={style}
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
      {...svgMotionProps}
    >
      <motion.circle
        cx="33"
        cy="33"
        fill="none"
        r="30"
        strokeLinecap="round"
        strokeWidth="6"
        {...circleMotionProps}
        className={circleCss}
      />
    </motion.svg>
  );
});

MaterialSpinner.displayName = 'MaterialSpinner';
