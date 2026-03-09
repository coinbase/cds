import React, { forwardRef } from 'react';
import {
  animateInOpacityConfig,
  animateOutOpacityConfig,
} from '@coinbase/cds-common/animation/overlay';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { m as motion } from 'framer-motion';

import { VStack, type VStackDefaultElement, type VStackProps } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';

export type OverlayProps = {
  onClick?: React.MouseEventHandler;
  /** Animate overlay
   * @default false
   */
  animated?: boolean;
} & VStackProps<VStackDefaultElement> &
  SharedProps;

export const OverlayContent = forwardRef<HTMLDivElement, OverlayProps>(
  ({ onClick, animated = false, ...props }, forwardedRef) => {
    const motionProps = useMotionProps({
      enterConfigs: [animateInOpacityConfig],
      exitConfigs: [animateOutOpacityConfig],
      exit: 'exit',
    });

    const content = (
      <VStack ref={forwardedRef} background="bgOverlay" onClick={onClick} pin="all" {...props} />
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
