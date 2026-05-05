import React, { forwardRef, memo, useCallback, useMemo, useState } from 'react';
import type { CollapsibleDirection, PaddingProps, SharedProps } from '@coinbase/cds-common/types';
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
    /**
     * Controls how the element is hidden after the collapse animation completes.
     *
     * - `'visibility-hidden'` (default) — applies `visibility: hidden`. The element remains
     *   in the layout flow and continues to occupy space, but its children are not focusable.
     * - `'display-none'` — applies `display: none`. The element is fully removed from the
     *   layout flow (e.g. no longer contributes flex gap) and its children are not focusable.
     *
     * @default 'visibility-hidden'
     */
    collapsedStyle?: 'visibility-hidden' | 'display-none';
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
      collapsedStyle = 'visibility-hidden',
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

    // Tracks the hidden state after the collapse animation completes.
    // Initialized to collapsed so the element starts in the correct hidden state.
    // Restored immediately when expanding so the animation has content to reveal.
    const [isHidden, setIsHidden] = useState(collapsed);
    if (!collapsed && isHidden) {
      setIsHidden(false);
    }

    const handleAnimationComplete = useCallback(() => {
      if (collapsed) {
        setIsHidden(true);
      }
    }, [collapsed]);

    const style = useMemo(() => {
      if (!isHidden) return motionStyle;
      return {
        ...motionStyle,
        ...(collapsedStyle === 'display-none'
          ? { display: 'none' }
          : { visibility: 'hidden' as const }),
      };
    }, [motionStyle, isHidden, collapsedStyle]);

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
  }),
);
