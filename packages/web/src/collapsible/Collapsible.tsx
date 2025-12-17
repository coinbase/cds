import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { CollapsibleDirection, PaddingProps, SharedProps } from '@coinbase/cds-common/types';
import { m as motion } from 'framer-motion';

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
  forwardRef(
    (
      {
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
      }: CollapsibleProps,
      forwardedRef: React.ForwardedRef<HTMLDivElement>,
    ) => {
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

      // visibility is used to prevent child content from being focusable when collapsed
      const [visibility, setVisibility] = useState<
        Extract<React.CSSProperties['visibility'], 'visible' | 'hidden'>
      >(collapsed ? 'hidden' : 'visible');
      // update the visibility to "visible" when the content is expanding
      if (!collapsed && visibility !== 'visible') {
        setVisibility('visible');
      }

      // when the animation completes, set the visibility to "hidden" if the content should be collapsed
      // this is to prevent children of the Collapsible element from being focusable in this state
      const handleAnimationComplete = useCallback(() => {
        if (collapsed) {
          setVisibility('hidden');
        }
      }, [collapsed]);

      // merge visible style with the computed framer-motion styles
      const style = useMemo(() => {
        return {
          ...motionStyle,
          visibility,
        };
      }, [visibility, motionStyle]);

      return (
        <motion.div
          {...motionProps}
          ref={forwardedRef}
          aria-labelledby={accessibilityLabelledBy}
          className={COMPONENT_STATIC_CLASSNAME}
          data-testid={testID}
          id={id}
          onAnimationComplete={handleAnimationComplete}
          role={role}
          style={style}
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
    },
  ),
);
