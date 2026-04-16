import React, { forwardRef, memo } from 'react';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@coinbase/cds-common/animation/dropdown';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { m as motion } from 'framer-motion';

import { cx } from '../../cx';
import { VStack, type VStackBaseProps } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';

import type { Placement } from './PopoverProps';

const popoverPanelContentClassName = 'cds-popover-panel-content';

export type PopoverPanelContentBaseProps = Pick<
  VStackBaseProps,
  | 'height'
  | 'width'
  | 'maxHeight'
  | 'maxWidth'
  | 'minWidth'
  | 'borderRadius'
  | 'background'
  | 'overflow'
> & {
  placement?: Placement;
};

export type PopoverPanelContentProps = PopoverPanelContentBaseProps & {
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
};

const MotionVStack = motion(VStack);

export const PopoverPanelContent = memo(
  forwardRef<HTMLDivElement, PopoverPanelContentProps>(
    (
      {
        children,
        placement,
        minWidth = 'min-content',
        borderRadius = 400,
        background = 'bg',
        overflow = 'auto',
        style,
        className,
        ...props
      },
      ref,
    ) => {
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
          background={background}
          borderRadius={borderRadius}
          className={cx(popoverPanelContentClassName, className)}
          elevation={2}
          minWidth={minWidth}
          overflow={overflow}
          role="dialog"
          style={style}
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
