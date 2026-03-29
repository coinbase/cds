import React, { memo } from 'react';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import { accordionMinWidth } from '@coinbase/cds-common/tokens/accordion';

import { VStack } from '../layout/VStack';

import { AccordionHeader, type AccordionHeaderBaseProps } from './AccordionHeader';
import { AccordionPanel, type AccordionPanelBaseProps } from './AccordionPanel';

export type AccordionItemBaseProps = Omit<AccordionHeaderBaseProps, 'collapsed'> &
  Pick<AccordionPanelBaseProps, 'maxHeight' | 'children'> & {
    headerRef?: React.RefObject<HTMLButtonElement>;
    panelRef?: React.RefObject<HTMLDivElement>;
    style?: React.CSSProperties;
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
    onClick,
    media,
    testID,
    headerRef,
    panelRef,
    maxHeight,
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
          onClick={onClick}
          subtitle={subtitle}
          testID={testID && `${testID}-header`}
          title={title}
        />
        <AccordionPanel
          ref={panelRef}
          collapsed={collapsed}
          itemKey={itemKey}
          maxHeight={maxHeight}
          testID={testID && `${testID}-panel`}
        >
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
