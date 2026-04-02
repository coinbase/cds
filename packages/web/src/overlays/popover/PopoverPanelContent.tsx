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
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { VStack, type VStackBaseProps } from '../../layout/VStack';
import { useMotionProps } from '../../motion/useMotionProps';

import type { Placement } from './PopoverProps';

const popoverPanelContentClassName = 'cds-popover-panel-content';

export type PopoverPanelContentBaseProps = Pick<
  VStackBaseProps,
  'height' | 'width' | 'maxHeight' | 'maxWidth' | 'minWidth'
> & {
  placement?: Placement;
  children: React.ReactNode;
};

export type PopoverPanelContentProps = PopoverPanelContentBaseProps & {
  style?: React.CSSProperties;
  className?: string;
};

const MotionVStack = motion(VStack);

export const PopoverPanelContent = memo(
  forwardRef<HTMLDivElement, PopoverPanelContentProps>((_props, ref) => {
    const mergedProps = useComponentConfig('PopoverPanelContent', _props);
    const {
      children,
      placement,
      minWidth = 'min-content',
      style,
      className,
      ...props
    } = mergedProps;
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
  }),
);
