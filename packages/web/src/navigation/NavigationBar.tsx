import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { Collapsible } from '../collapsible/Collapsible';
import { cx } from '../cx';
import { type BoxBaseProps, type BoxProps, HStack, VStack } from '../layout';
import type { ResponsiveProp } from '../styles/styleProps';
import type { StylesAndClassNames } from '../types';

export const navigationBarDefaultElement = 'nav';

export type NavigationBarDefaultElement = typeof navigationBarDefaultElement;

/**
 * Static class names for NavigationBar component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const navigationBarClassNames = {
  /** Root nav element containing the entire navigation bar */
  root: 'cds-NavigationBar',
  /** Container for the start slot (e.g., back button) */
  start: 'cds-NavigationBar-start',
  /** Container for the main children content (e.g., title) */
  content: 'cds-NavigationBar-content',
} as const;

export type NavigationBarBaseProps = BoxBaseProps & {
  /**
   * Node (ie Back button) to display at the start of the nav bar
   */
  start?: React.ReactNode;
  /**
   * Node (icons, avatar, etc) to display at the end of the nav bar
   */
  end?: React.ReactNode;
  /**
   * The  bottom content. Use to render tabs
   */
  bottom?: React.ReactNode;
  /**
   * The middle content. Use the children to render the page title
   */
  children?: React.ReactNode;
  /**
   * Accessibility label for the nav bar
   * @default 'main navigation'
   */
  accessibilityLabel?: string;
  /**
   * @default 2
   */
  paddingX?: ThemeVars.Space;
  /**
   * @default 2
   */
  paddingTop?: ThemeVars.Space;
  /**
   * @default 2 if bottom is not provided
   */
  paddingBottom?: ThemeVars.Space;
  /**
   * Space between bottom of the nav bar and the rest of its content
   * @default 2
   */
  rowGap?: ResponsiveProp<ThemeVars.Space>;
  /**
   * Space between the start, children, and end of the nav bar
   * @default 2
   */
  columnGap?: ResponsiveProp<ThemeVars.Space>;
  /**
   * Disable the `overflow: hidden` style from being injected to the child Col
   */
  dangerouslyDisableOverflowHidden?: boolean;
};

export type NavigationBarProps = NavigationBarBaseProps &
  StylesAndClassNames<typeof navigationBarClassNames> &
  Omit<BoxProps<NavigationBarDefaultElement>, 'children'>;

export const NavigationBar = memo(
  ({
    start,
    children,
    end,
    bottom,
    accessibilityLabel = 'main navigation',
    background = 'bg',
    paddingX = 2,
    paddingTop = 2,
    paddingBottom = bottom ? undefined : 2,
    position = 'sticky',
    top = 0,
    left = 0,
    right = 0,
    width = '100%',
    dangerouslyDisableOverflowHidden,
    columnGap,
    rowGap = 1,
    className,
    classNames,
    style,
    styles,
    testID,
    ...props
  }: NavigationBarProps) => {
    const prevStart = usePreviousValue<NavigationBarProps['start']>(start);
    const startNode = useMemo(() => start || prevStart, [start, prevStart]);
    return (
      <VStack
        borderedBottom
        accessibilityLabel={accessibilityLabel}
        as="nav"
        background={background}
        className={cx(navigationBarClassNames.root, className, classNames?.root)}
        gap={rowGap}
        left={left}
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
        paddingX={paddingX}
        position={position}
        right={right}
        style={{ ...style, ...styles?.root }}
        testID={testID}
        top={top}
        width={width}
        zIndex={zIndex.navigation}
        {...props}
      >
        <HStack alignItems="center" gap={columnGap ?? { base: 2, phone: 1 }} overflow="auto">
          <Collapsible
            collapsed={!start}
            dangerouslyDisableOverflowHidden={dangerouslyDisableOverflowHidden}
            direction="horizontal"
          >
            <HStack
              alignItems="center"
              className={cx(navigationBarClassNames.start, classNames?.start)}
              paddingEnd={columnGap ?? { base: 2, phone: 1 }}
              style={styles?.start}
            >
              {startNode}
            </HStack>
          </Collapsible>
          <HStack
            alignItems="center"
            className={cx(navigationBarClassNames.content, classNames?.content)}
            flexGrow={1}
            gap={1}
            style={styles?.content}
          >
            {children}
          </HStack>
          {end}
        </HStack>
        {bottom}
      </VStack>
    );
  },
);

NavigationBar.displayName = 'NavigationBar';
