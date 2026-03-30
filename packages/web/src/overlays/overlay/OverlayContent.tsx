import React, { forwardRef } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@coinbase/cds-common/animation/overlay';
import { m as motion } from 'framer-motion';

import type { BoxBaseProps } from '../../layout';
import { VStack, type VStackDefaultElement, type VStackProps } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';

export type OverlayBaseProps = BoxBaseProps & {
  /** Animate overlay
   * @default false
   */
  animated?: boolean;
};

export type OverlayProps = OverlayBaseProps &
  VStackProps<VStackDefaultElement> & {
    onClick?: React.MouseEventHandler;
  };

export const OverlayContent = forwardRef<HTMLDivElement, OverlayProps>(
  ({ onClick, animated = false, ...props }, forwardedRef) => {
    const motionProps = useMotionProps({
      enterConfigs: [animateInOpacityConfig],
      exitConfigs: [animateOutOpacityConfig],
      exit: 'exit',
    });

    const content = (
      <VStack background="bgOverlay" onClick={onClick} pin="all" {...props} ref={forwardedRef} />
    );

    return animated ? (
      <motion.div {...motionProps} data-testid={`${props.testID}-motion`}>
        {content}
      </motion.div>
    ) : (
      content
    );
  },
);

OverlayContent.displayName = 'OverlayContent';
