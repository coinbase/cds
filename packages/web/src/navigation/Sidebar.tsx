import React, { Children, memo, useMemo } from 'react';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useDimensions } from '../hooks/useDimensions';
import { Box, type BoxBaseProps, type BoxProps, VStack } from '../layout';
import { breakpoints } from '../styles/media';

import { SidebarProvider } from './SidebarContext';

export const sidebarDefaultElement = 'nav';

export type SidebarDefaultElement = typeof sidebarDefaultElement;

// STYLES
const breakpointObserverCss = css`
  width: 100%;
  position: fixed;
  visibility: hidden;
  pointer-events: none;
  height: 0;
`;
const liCss = css`
  list-style: none;
`;
const ulCss = css`
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
`;

type BreakpointProps = {
  default: { collapsed: number; expanded: number };
  condensed: number;
};
const sidebarWidth: BreakpointProps = {
  default: { collapsed: 87, expanded: 240 },
  condensed: 88,
};
const breakpointConfig = {
  breakpoints: { collapsed: 0, expanded: breakpoints.tablet },
  updateOnBreakpointChange: true,
};

export type SidebarBaseProps = BoxBaseProps & {
  /**
   * The logo to display
   * @default undefined
   */
  logo?: React.ReactElement | ((isCollapsed: boolean) => React.ReactNode);
  /**
   * Children are expected to be an array of SidebarItems
   * @default undefined
   */
  children: React.ReactNode[];
  /**
   * Use collapsed to show only the logo
   * @default false
   */
  collapsed?: boolean;
  /**
   * When set, the sidebar will auto collapse at or below the tablet breakpoint (currently 768px)
   * @default false
   */
  autoCollapse?: boolean;
  /**
   * This node will be fixed to the bottom of the sidebar
   * This is a render prop, and will provide the collapsed state
   * @default undefined
   */
  renderEnd?: (isCollapsed: boolean) => React.ReactNode;
  variant?: 'default' | 'condensed';
  /** Custom class names for individual elements of the Sidebar component */
  classNames?: {
    /** Root sidebar container element */
    root?: string;
    /** Logo container element */
    logo?: string;
    /** Content container element (children list) */
    content?: string;
    /** End container element (renderEnd) */
    end?: string;
  };
  /** Custom styles for individual elements of the Sidebar component */
  styles?: {
    /** Root sidebar container element */
    root?: React.CSSProperties;
    /** Logo container element */
    logo?: React.CSSProperties;
    /** Content container element (children list) */
    content?: React.CSSProperties;
    /** End container element (renderEnd) */
    end?: React.CSSProperties;
  };
};

export type SidebarProps = SidebarBaseProps & Omit<BoxProps<SidebarDefaultElement>, 'children'>;

export const Sidebar: React.FC<SidebarProps> = memo(
  ({
    logo,
    children,
    collapsed,
    autoCollapse,
    testID,
    renderEnd,
    accessibilityLabel = 'Sidebar',
    width,
    variant = 'default',
    className,
    classNames,
    style,
    styles,
    ...props
  }) => {
    const { ref, currentBreakpoint } = useDimensions(breakpointConfig);
    /**
     * Calculates collapsed state which will be passed to the Sidebar Context Provider
     * Priority is as follows: First, respect what is set explicitly on SidebarItem,
     * Next, do what is set explicitly on Sidebar. And finally if autoCollapse is
     * set and we're within or outside the defined breakpoint, collapse or expand
     * */
    const computedCollapse =
      collapsed ?? (autoCollapse ? currentBreakpoint === 'collapsed' : false);
    const defaultWidth = computedCollapse
      ? sidebarWidth.default.collapsed
      : sidebarWidth.default.expanded;
    const computedWidth = variant === 'default' ? defaultWidth : sidebarWidth.condensed;

    const sidebarContext = useMemo(
      () => ({ collapsed: computedCollapse, variant }),
      [computedCollapse, variant],
    );

    const liWrappedChildren = useMemo(
      () => Children.map(children, (child) => <li className={liCss}>{child}</li>),
      [children],
    );

    // only center logo and end content on condensed sidebar
    const logoContainerProps = useMemo(
      () =>
        ({
          paddingTop: 1,
          paddingStart: variant === 'default' ? 1 : 0,
          paddingBottom: 4,
          alignSelf: variant === 'default' ? undefined : 'center',
          alignItems: variant === 'default' ? undefined : 'center',
        }) satisfies BoxBaseProps,
      [variant],
    );

    return (
      <SidebarProvider value={sidebarContext}>
        <VStack
          borderedEnd
          accessibilityLabel={accessibilityLabel}
          as={sidebarDefaultElement}
          background="bg"
          bottom="0"
          className={cx(className, classNames?.root)}
          height="100%"
          justifyContent="space-between"
          left="0"
          minWidth={computedWidth}
          paddingX={variant === 'default' ? 2 : 1.5}
          paddingY={2}
          position="sticky"
          style={{ ...style, ...styles?.root }}
          testID={testID}
          top="0"
          width={width ?? computedWidth}
          zIndex={zIndex.navigation}
          {...props}
        >
          <VStack>
            {logo && (
              <VStack
                {...logoContainerProps}
                className={classNames?.logo}
                style={styles?.logo}
                testID="sidebar-logo"
              >
                {typeof logo === 'function' ? logo(!!computedCollapse) : logo}
              </VStack>
            )}
            <VStack
              as="ul"
              className={cx(ulCss, classNames?.content)}
              gap={0.5}
              marginStart={variant === 'default' ? -0.5 : undefined}
              style={styles?.content}
            >
              {liWrappedChildren}
            </VStack>
          </VStack>
          {!!renderEnd && (
            <Box
              alignSelf={variant === 'default' ? 'flex-start' : 'center'}
              className={classNames?.end}
              paddingTop={4}
              style={styles?.end}
              testID="sidebar-end"
            >
              {renderEnd(!!computedCollapse)}
            </Box>
          )}
        </VStack>
        <span ref={ref} className={breakpointObserverCss} />
      </SidebarProvider>
    );
  },
);

Sidebar.displayName = 'Sidebar';
