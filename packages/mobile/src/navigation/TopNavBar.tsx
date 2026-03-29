import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { Collapsible } from '../collapsible/Collapsible';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { HStack, type HStackProps, VStack } from '../layout';

export const TopNavBarContext = React.createContext<{ isWithinTopNavBar: boolean }>({
  isWithinTopNavBar: false,
});

export type NavBarStartProps = Omit<HStackProps, 'children'> & {
  children?: React.ReactNode;
  /**
   * The space after the children node
   * When the component collapses, the gap between nav start and nav children also collapses,
   * and the nav bar middle content can expand to the start of the nav bar
   * @default 1
   */
  paddingEnd?: ThemeVars.Space;
};

export type NavBarEndProps = Omit<HStackProps, 'children'> & {
  children?: React.ReactNode;
  /**
   * The space before the children node
   * When the component collapses, the gap between nav end and nav children also collapses,
   * and the nav bar middle content can expand to the end of the nav bar
   * @default 1
   */
  paddingStart?: ThemeVars.Space;
};

export type NavigationBarBaseProps = {
  start?: React.ReactNode;
  end?: React.ReactNode;
  /**
   * The bottom content. Use to render tabs
   */
  bottom?: React.ReactNode;
  /**
   * The middle content. Use the children to render the page title
   */
  children?: React.ReactNode;
  /**
   * Accessibility label for the nav bar
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
  /*
   * @default 2
   */
  paddingBottom?: ThemeVars.Space;
  /**
   * The gap between the bottom content and the top nav bar
   * @default 2
   */
  columnGap?: ThemeVars.Space;
  /**
   * The gap between the start, middle (children), and end elements
   * @default 0
   */
  rowGap?: ThemeVars.Space;
};

export type NavigationBarProps = NavigationBarBaseProps;

export const NavBarStart = memo(
  ({
    children,
    flexBasis = 0,
    flexGrow = 1,
    flexShrink = 0,
    justifyContent = 'flex-start',
    paddingEnd = 1,
    ...props
  }: NavBarStartProps) => {
    // store the previous children to enable collapsing animation
    const prevChildren = usePreviousValue<NavBarStartProps['children']>(children);
    const childrenNode = children || prevChildren;

    return (
      <HStack
        alignItems="center"
        flexBasis={flexBasis}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        justifyContent={justifyContent}
      >
        <Collapsible collapsed={!children} direction="horizontal">
          <HStack alignItems="center" paddingEnd={paddingEnd} {...props}>
            {childrenNode}
          </HStack>
        </Collapsible>
      </HStack>
    );
  },
);

NavBarStart.displayName = 'NavBarStart';

export const NavBarEnd = memo(
  ({
    children,
    flexBasis = 0,
    flexGrow = 1,
    flexShrink = 0,
    justifyContent = 'flex-end',
    paddingStart = 1,
    ...props
  }: NavBarEndProps) => {
    // store the previous children to enable collapsing animation
    const prevChildren = usePreviousValue<NavBarEndProps['children']>(children);
    const childrenNode = children || prevChildren;

    return (
      <HStack
        alignItems="center"
        flexBasis={flexBasis}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        justifyContent={justifyContent}
      >
        <Collapsible collapsed={!children} direction="horizontal">
          <HStack alignItems="center" paddingStart={paddingStart} {...props}>
            {childrenNode}
          </HStack>
        </Collapsible>
      </HStack>
    );
  },
);

NavBarEnd.displayName = 'NavBarEnd';

export const TopNavBar = memo((_props: NavigationBarProps) => {
  const mergedProps = useComponentConfig('TopNavBar', _props);
  const {
    start,
    end,
    children,
    bottom,
    accessibilityLabel = 'main navigation',
    rowGap = 0,
    columnGap = 2,
    paddingX = 3,
    paddingTop = 2,
    paddingBottom = bottom ? undefined : 2,
  } = mergedProps;
  return (
    <TopNavBarContext.Provider value={{ isWithinTopNavBar: true }}>
      <VStack
        accessibilityLabel={accessibilityLabel}
        background="bg"
        gap={rowGap}
        left={0}
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
        paddingX={paddingX}
        position="sticky"
        right={0}
        top={0}
        width="100%"
        zIndex={zIndex.navigation}
      >
        <HStack alignItems="center">
          {/* Always render start container */}
          <NavBarStart paddingEnd={columnGap}>{start}</NavBarStart>

          {/* Middle content */}
          {children}

          {/* Always render end container */}
          <NavBarEnd paddingStart={columnGap}>{end}</NavBarEnd>
        </HStack>
        {bottom}
      </VStack>
    </TopNavBarContext.Provider>
  );
});

TopNavBar.displayName = 'TopNavBar';
