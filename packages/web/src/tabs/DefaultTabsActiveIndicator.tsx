import { memo } from 'react';
import { m as motion } from 'framer-motion';

import { Box } from '../layout/Box';

import { type TabsActiveIndicatorProps, tabsTransitionConfig } from './Tabs';

const MotionBox = motion(Box);

/**
 * Default underline-style indicator for `Tabs`. Pass as
 * `TabsActiveIndicatorComponent={DefaultTabIndicator}` with `TabComponent={DefaultTab}`.
 */
export const DefaultTabsActiveIndicator = memo(
  ({
    activeTabRect,
    background = 'bgPrimary',
    className,
    style,
    testID,
    ...props
  }: TabsActiveIndicatorProps) => {
    const { width, x } = activeTabRect;

    if (!width) return null;

    return (
      <MotionBox
        animate={{ width, x }}
        background={background}
        bottom={0}
        className={className}
        height={2}
        initial={{ width: 0, x }}
        left={0}
        overflow="hidden"
        position="absolute"
        style={{ ...style, pointerEvents: 'none' }}
        testID={testID}
        transition={tabsTransitionConfig}
        zIndex={0}
      />
    );
  },
);

DefaultTabsActiveIndicator.displayName = 'DefaultTabsActiveIndicator';
