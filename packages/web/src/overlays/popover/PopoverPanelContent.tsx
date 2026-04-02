import React, { forwardRef, memo } from 'react';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@coinbase/cds-common/animation/dropdown';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { Placement } from '@popperjs/core';
import { m as motion } from 'framer-motion';

import { cx } from '../../cx';
import { VStack } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';

const popoverPanelContentClassName = 'cds-popover-panel-content';

export type PopoverPanelContentProps = {
  height?: React.CSSProperties['height'];
  placement?: Placement;
  width?: React.CSSProperties['width'];
  maxHeight?: React.CSSProperties['maxHeight'];
  maxWidth?: React.CSSProperties['maxWidth'];
  minWidth?: React.CSSProperties['minWidth'];
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const MotionVStack = motion(VStack);

export const PopoverPanelContent = memo(
  forwardRef<HTMLDivElement, PopoverPanelContentProps>(
    ({ children, placement, minWidth = 'min-content', style, className, ...props }, ref) => {
      const isHorizontal = placement?.includes('left') || placement?.includes('right');
      const translate = isHorizontal ? 'x' : 'y';

      const motionProps = useMotionProps({
        enterConfigs: [
          animateDropdownOpacityInConfig,
          { ...animateDropdownTransformInConfig, property: translate },
        ],
        exitConfigs: [
          animateDropdownOpacityOutConfig,
          { ...animateDropdownTransformOutConfig, property: translate },
        ],
        exit: 'exit',
      });

      return (
        <MotionVStack
          ref={ref}
          bordered
          background="bg"
          borderRadius={400}
          className={cx(popoverPanelContentClassName, className)}
          elevation={2}
          minWidth={minWidth}
          overflow="auto"
          role="dialog"
          style={style}
          tabIndex={0}
          zIndex={zIndex.dropdown}
          {...props}
          {...motionProps}
        >
          {children}
        </MotionVStack>
      );
    },
  ),
);
