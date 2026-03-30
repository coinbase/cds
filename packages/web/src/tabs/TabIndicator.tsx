import React, { forwardRef, memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { SharedProps } from '@coinbase/cds-common/types';
import { m as motion } from 'framer-motion';

import { Box } from '../layout/Box';

import { useAnimateTabIndicator } from './hooks/useAnimateTabIndicator';

const MotionBox = motion(Box);

export type TabIndicatorProps = SharedProps & {
  /** The width of the active TabLabel. */
  width: number;
  /** The xPosition of the active TabLabel. */
  x: number;
  /** This should always match the background color of the parent container
   * @default: 'bg'
   */
  background?: ThemeVars.Color;
};

export const TabIndicator = memo(
  forwardRef(
    (
      { width, x, background = 'bg', testID, ...props }: TabIndicatorProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const { widthMotionProps, xMotionProps } = useAnimateTabIndicator({ width, x });

      return (
        <Box ref={ref} testID={testID} {...props}>
          <MotionBox
            animate={xMotionProps.animate}
            background="bgPrimary"
            height={2}
            initial={false}
            overflow="hidden"
            testID="cds-tab-indicator-inner-bar-container"
            transition={xMotionProps.transition}
            width={width}
          >
            <MotionBox
              animate={widthMotionProps.animate}
              background={background}
              height={2}
              initial={false}
              testID="cds-tab-indicator-inner-bar"
              transition={widthMotionProps.transition}
              width="100%"
            />
          </MotionBox>
        </Box>
      );
    },
  ),
);

TabIndicator.displayName = 'TabIndicator';
