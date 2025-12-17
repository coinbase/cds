import React, { memo, useMemo } from 'react';
import type { SharedProps } from '@coinbase/cds-common';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { usePreviousValue } from '@coinbase/cds-common/hooks/usePreviousValue';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';

import { Collapsible } from '../collapsible/Collapsible';
import { HStack, VStack } from '../layout';
import type { ResponsiveProp } from '../styles/styleProps';

const COMPONENT_STATIC_CLASSNAME = 'cds-NavigationBar';

export type NavigationBarProps = SharedProps & {
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
  children: React.ReactNode;
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
  /**
   * @default 2
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

export const NavigationBar = memo(
  ({
    start,
    children,
    end,
    bottom,
    accessibilityLabel = 'main navigation',
    paddingX = 2,
    paddingTop = 2,
    paddingBottom = bottom ? undefined : 2,
    dangerouslyDisableOverflowHidden,
    columnGap,
    rowGap = 1,
  }: NavigationBarProps) => {
    const prevStart = usePreviousValue<NavigationBarProps['start']>(start);
    const startNode = useMemo(() => start || prevStart, [start, prevStart]);
    return (
      <VStack
        borderedBottom
        accessibilityLabel={accessibilityLabel}
        as="nav"
        background="bg"
        className={COMPONENT_STATIC_CLASSNAME}
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
        <HStack
          alignItems="center"
          gap={columnGap ?? { base: 2, phone: 1 }}
          justifyContent="space-between"
          overflow="auto"
        >
          <HStack alignItems="center" flexGrow={1} flexShrink={0} justifyContent="flex-start">
            <Collapsible
              collapsed={!start}
              dangerouslyDisableOverflowHidden={dangerouslyDisableOverflowHidden}
              direction="horizontal"
            >
              <HStack alignItems="center" paddingEnd={columnGap ?? { base: 2, phone: 1 }}>
                {startNode}
              </HStack>
            </Collapsible>
            <HStack alignItems="center" flexGrow={1} gap={1}>
              {children}
            </HStack>
          </HStack>
          {end}
        </HStack>
        {bottom}
      </VStack>
    );
  },
);

NavigationBar.displayName = 'NavigationBar';
