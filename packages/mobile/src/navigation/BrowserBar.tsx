import React, { createContext, memo, useContext, useEffect, useState } from 'react';
import type { SharedProps } from '@coinbase/cds-common';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { type BoxBaseProps, HStack, type HStackProps } from '../layout';

import { NavBarEnd, NavBarStart } from './TopNavBar';

export type BrowserBarBaseProps = SharedProps &
  Omit<BoxBaseProps, 'children'> & {
    children: React.ReactNode;
    /**
     * start node
     */
    start?: React.ReactNode;
    /**
     * end node
     */
    end?: React.ReactNode;
  };

export type BrowserBarProps = BrowserBarBaseProps & Omit<HStackProps, 'children'>;

export const BrowserBarContext = createContext<{
  hideStart: boolean;
  hideEnd: boolean;
  setHideStart: React.Dispatch<React.SetStateAction<boolean>>;
  setHideEnd: React.Dispatch<React.SetStateAction<boolean>>;
  isWithinBrowserBar: boolean;
}>({
  hideStart: false,
  hideEnd: false,
  setHideStart: () => {},
  setHideEnd: () => {},
  isWithinBrowserBar: false,
});

export const useBrowserBarContext = () => {
  const context = useContext(BrowserBarContext);

  useEffect(() => {
    if (!context.isWithinBrowserBar) {
      console.warn(
        'UseBrowserBarContext must be used within a BrowserBar for optimal functionality and consistent styling.',
      );
    }
  }, [context.isWithinBrowserBar]);

  return context;
};

export const BrowserBar = memo((_props: BrowserBarProps) => {
  const mergedProps = useComponentConfig('BrowserBar', _props);
  const {
    start,
    end,
    paddingX = 3,
    paddingTop = 1,
    paddingBottom = 1,
    gap = 1,
    testID,
    children,
    ...props
  } = mergedProps;
  const [hideStart, setHideStart] = useState(false);
  const [hideEnd, setHideEnd] = useState(false);
  return (
    <BrowserBarContext.Provider
      value={{ hideStart, hideEnd, setHideStart, setHideEnd, isWithinBrowserBar: true }}
    >
      <HStack
        alignItems="center"
        // gap is instead passed to paddingEnd and paddingStart of NavBarStart and NavBarEnd to ensure that
        // when the start and end node collapse, the gap between the start and end node and the children
        // also collapse, and the nav bar middle content can expand to the full width of the browser bar
        gap={0}
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
        paddingX={paddingX}
        testID={testID}
        {...props}
      >
        <NavBarStart flexBasis="auto" flexGrow={0} paddingEnd={gap}>
          {hideStart ? null : start}
        </NavBarStart>
        <HStack flexBasis={0} flexGrow={1} flexShrink={0}>
          {children}
        </HStack>
        <NavBarEnd flexBasis="auto" flexGrow={0} paddingStart={gap}>
          {hideEnd ? null : end}
        </NavBarEnd>
      </HStack>
    </BrowserBarContext.Provider>
  );
});

BrowserBar.displayName = 'BrowserBar';
