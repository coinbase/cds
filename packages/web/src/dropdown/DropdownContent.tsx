import React, { forwardRef, memo } from 'react';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@coinbase/cds-common/animation/dropdown';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { DimensionValue } from '@coinbase/cds-common/types';
import type { Placement } from '@popperjs/core';
import { m as motion } from 'framer-motion';

import { VStack } from '../layout/VStack';
import { useMotionProps } from '../motion/useMotionProps';

import type { DropdownProps } from './DropdownProps';

const dropdownStaticClassName = 'cds-dropdown';

export type DropdownContentProps = {
  height?: DimensionValue;
  placement?: Placement;
} & Pick<DropdownProps, 'width' | 'maxHeight' | 'maxWidth' | 'minWidth' | 'children'>;

const MotionVStack = motion(VStack);

export const DropdownContent = memo(
  forwardRef<HTMLDivElement, DropdownContentProps>(
    ({ children, placement, minWidth = 'min-content', ...props }, ref) => {
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
          className={dropdownStaticClassName}
          elevation={2}
          minWidth={minWidth}
          overflow="auto"
          role="menu"
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
