import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { CollapsibleDirection } from '@coinbase/cds-common/types/CollapsibleBaseProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { PaddingProps } from '@coinbase/cds-common/types/SpacingProps';
import { m as motion } from 'framer-motion';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { HStack } from '../layout/HStack';

import { useCollapsibleMotionProps } from './useCollapsibleMotionProps';

const COMPONENT_STATIC_CLASSNAME = 'cds-Collapsible';

export type CollapsibleBaseProps = SharedProps &
  PaddingProps &
  Pick<BoxProps<BoxDefaultElement>, 'role' | 'id' | 'accessibilityLabelledBy'> & {
    /**
     * Expand/collapse state of the content.
     * @default true
     */
    collapsed: boolean;
    /**
     * Collapsible content
     */
    children: React.ReactNode;
    /**
     * Direction the content should expand/collapse to
     * @default vertical
     */
    direction?: CollapsibleDirection;
    /**
     * This option may break animation. Only use this if your container has fixed height or width.
     * @danger This is a migration escape hatch. It is not intended to be used normally.
     */
    dangerouslyDisableOverflowHidden?: boolean;
    /**
     * Max height of the content. Overflow content will be scrollable.
     */
    maxHeight?: BoxProps<BoxDefaultElement>['maxHeight'];
    /**
     * Max width of the content. Overflow content will be scrollable.
     */
    maxWidth?: BoxProps<BoxDefaultElement>['maxWidth'];
  };

export type CollapsibleProps = CollapsibleBaseProps;

export const Collapsible = memo(
  forwardRef((_props: CollapsibleProps, forwardedRef: React.ForwardedRef<HTMLDivElement>) => {
    const mergedProps = useComponentConfig('Collapsible', _props);
    const {
      children,
      collapsed = true,
      maxHeight,
      maxWidth,
      accessibilityLabelledBy,
      direction = 'vertical',
      testID,
      id,
      role = 'region',
      dangerouslyDisableOverflowHidden = false,
      // Spacing
      padding,
      paddingBottom,
      paddingEnd,
      paddingX,
      paddingStart,
      paddingTop,
      paddingY,
    } = mergedProps;
    const { style: motionStyle, ...motionProps } = useCollapsibleMotionProps({
      collapsed,
      direction,
      dangerouslyDisableOverflowHidden,
    });

    const sizeProps = useMemo(() => {
      return direction === 'horizontal'
        ? {
            maxWidth,
            // prevent horizontal scrollbar when animating
            display: 'inline-flex' as const,
          }
        : { maxHeight };
    }, [direction, maxWidth, maxHeight]);

    // display: none is applied after the collapse animation completes so the element no longer
    // participates in layout and its children are not focusable. It is restored immediately when
    // expanding so the animation has content to reveal.
    const [isDisplayNone, setIsDisplayNone] = useState(collapsed);
    if (!collapsed && isDisplayNone) {
      setIsDisplayNone(false);
    }

    const handleAnimationComplete = useCallback(() => {
      if (collapsed) {
        setIsDisplayNone(true);
      }
    }, [collapsed]);

    const style = useMemo(() => {
      return isDisplayNone ? { ...motionStyle, display: 'none' } : motionStyle;
    }, [motionStyle, isDisplayNone]);

    return (
      // TODO: Remove type assertion after upgrading framer-motion to v11+ for React 19 compatibility
      <motion.div
        {...({
          ...motionProps,
          ref: forwardedRef,
          'aria-labelledby': accessibilityLabelledBy,
          className: COMPONENT_STATIC_CLASSNAME,
          'data-testid': testID,
          id: id,
          onAnimationComplete: handleAnimationComplete,
          role: role,
          style: style,
        } as React.ComponentProps<typeof motion.div>)}
      >
        <Box display="block" paddingTop={paddingTop}>
          <Box
            overflow={maxWidth || maxHeight ? 'auto' : undefined}
            {...sizeProps}
            padding={padding}
            paddingBottom={paddingBottom}
            paddingEnd={paddingEnd}
            paddingStart={paddingStart}
            paddingX={paddingX}
            paddingY={paddingY}
          >
            {children}
          </Box>
        </Box>
      </motion.div>
    );
  }),
);
