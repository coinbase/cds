import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import { accordionVisibleMaxHeight } from '@coinbase/cds-common/animation/accordion';
import { accordionSpacing } from '@coinbase/cds-common/tokens/accordion';
import type { SharedProps } from '@coinbase/cds-common/types';

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

export type AccordionPanelProps = AccordionPanelBaseProps;

/**
 * Renders a collapsible element to use as the primary content container for an AccordionItem.
 * Accepts a unique `itemKey` prop to uniquely identify one panel from another.
 */
export const AccordionPanel = memo(
  forwardRef(
    (
      { children, collapsed = true, testID }: AccordionPanelProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      return (
        <Collapsible
          ref={forwardedRef}
          collapsed={collapsed}
          maxHeight={accordionVisibleMaxHeight}
          testID={testID}
          {...accordionSpacing}
        >
          {children}
        </Collapsible>
      );
    },
  ),
);
