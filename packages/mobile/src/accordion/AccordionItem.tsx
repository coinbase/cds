import React, { memo } from 'react';
import type { View, ViewProps } from 'react-native';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import { accordionMinWidth } from '@coinbase/cds-common/tokens/accordion';

import { VStack } from '../layout';

import { AccordionHeader, type AccordionHeaderBaseProps } from './AccordionHeader';
import { AccordionPanel, type AccordionPanelBaseProps } from './AccordionPanel';

export type AccordionItemBaseProps = Pick<ViewProps, 'style'> &
  Omit<AccordionHeaderBaseProps, 'collapsed'> &
  Omit<AccordionPanelBaseProps, 'collapsed'> & {
    headerRef?: React.RefObject<View>;
    panelRef?: React.RefObject<View>;
  };

export type AccordionItemProps = AccordionItemBaseProps;

/**
 * A component that represents a single item within an Accordion.
 * It composes together an AccordionHeader and a collapsible AccordionPanel.
 * Accepts a unique `itemKey` prop to uniquely identify one item from another within the same Accordion.
 */
export const AccordionItem = memo(
  ({
    itemKey,
    title,
    subtitle,
    children,
    onPress,
    media,
    testID,
    headerRef,
    panelRef,
    style,
  }: AccordionItemProps) => {
    const { activeKey } = useAccordionContext();
    const collapsed = activeKey !== itemKey;

    return (
      <VStack minWidth={accordionMinWidth} style={style} testID={testID}>
        <AccordionHeader
          ref={headerRef}
          collapsed={collapsed}
          itemKey={itemKey}
          media={media}
          onPress={onPress}
          subtitle={subtitle}
          testID={testID && `${testID}-header`}
          title={title}
        />
        <AccordionPanel
          ref={panelRef}
          collapsed={collapsed}
          itemKey={itemKey}
          testID={testID && `${testID}-panel`}
        >
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
