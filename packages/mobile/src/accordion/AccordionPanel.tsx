import React, { memo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import { accordionVisibleMaxHeight } from '@coinbase/cds-common/animation/accordion';
import { accordionSpacing } from '@coinbase/cds-common/tokens/accordion';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { Collapsible, type CollapsibleBaseProps } from '../collapsible/Collapsible';

export type AccordionPanelBaseProps = SharedProps &
  Pick<CollapsibleBaseProps, 'collapsed' | 'children'> & {
    /**
     * Key of the accordion item.
     * This should be unique inside the same Accordion
     * unless you want multiple items to be controlled at the same time.
     */
    itemKey: string;
  };

export type AccordionPanelProps = AccordionPanelBaseProps & {
  /** Custom style applied to the collapsible panel container */
  style?: StyleProp<ViewStyle>;
};

/**
 * Renders a collapsible element to use as the primary content container for an AccordionItem.
 * Accepts a unique `itemKey` prop to uniquely identify one panel from another.
 */
export const AccordionPanel = memo(
  ({
    ref: forwardedRef,
    children,
    collapsed = true,
    testID,
    style,
  }: AccordionPanelProps & {
    ref?: React.Ref<View>;
  }) => {
    return (
      <Collapsible
        ref={forwardedRef}
        collapsed={collapsed}
        maxHeight={accordionVisibleMaxHeight}
        style={style}
        testID={testID}
        {...accordionSpacing}
      >
        {children}
      </Collapsible>
    );
  },
);
