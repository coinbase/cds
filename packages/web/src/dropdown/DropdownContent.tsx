import { forwardRef, memo } from 'react';
import {
  animateDropdownOpacityInConfig,
  animateDropdownOpacityOutConfig,
  animateDropdownTransformInConfig,
  animateDropdownTransformOutConfig,
} from '@coinbase/cds-common/animation/dropdown';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { DimensionValue } from '@coinbase/cds-common/types';
import { m as motion } from 'framer-motion';

import { VStack } from '../layout/VStack';
import { useMotionProps } from '../motion/useMotionProps';
import type { Placement } from '../overlays/popover/PopoverProps';

import type { DropdownProps } from './DropdownProps';

const dropdownStaticClassName = 'cds-dropdown';

/**
 * @deprecated Use PopoverPanelContent within a PopoverPanel for interactive overlay content, or Select / SelectChip when presenting a list of selectable options. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type DropdownContentProps = {
  height?: DimensionValue;
  placement?: Placement;
} & Pick<DropdownProps, 'width' | 'maxHeight' | 'maxWidth' | 'minWidth' | 'children'>;

const MotionVStack = motion(VStack);

/**
 * @deprecated Use PopoverPanelContent within a PopoverPanel for interactive overlay content, or Select / SelectChip when presenting a list of selectable options. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
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
