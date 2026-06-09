import React, { memo } from 'react';
import type { StyleProp, View, ViewProps, ViewStyle } from 'react-native';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import { accordionMinWidth } from '@coinbase/cds-common/tokens/accordion';

import { VStack } from '../layout';

import { AccordionHeader, type AccordionHeaderBaseProps } from './AccordionHeader';
import { AccordionPanel, type AccordionPanelBaseProps } from './AccordionPanel';

export type AccordionItemBaseProps = Pick<ViewProps, 'style'> &
  Omit<AccordionHeaderBaseProps, 'collapsed' | 'style'> &
  Omit<AccordionPanelBaseProps, 'collapsed' | 'style'> & {
    headerRef?: React.RefObject<View | null>;
    panelRef?: React.RefObject<View | null>;
  };

export type AccordionItemStyles = {
  /** Root container element */
  root?: StyleProp<ViewStyle>;
  /** Header pressable element */
  header?: StyleProp<ViewStyle>;
  /** Collapsible panel container element */
  panel?: StyleProp<ViewStyle>;
};

export type AccordionItemProps = AccordionItemBaseProps & {
  /** Custom styles for individual elements of the AccordionItem component */
  styles?: AccordionItemStyles;
};

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
    styles,
  }: AccordionItemProps) => {
    const { activeKey } = useAccordionContext();
    const collapsed = activeKey !== itemKey;

    return (
      <VStack minWidth={accordionMinWidth} style={[style, styles?.root]} testID={testID}>
        <AccordionHeader
          ref={headerRef}
          collapsed={collapsed}
          itemKey={itemKey}
          media={media}
          onPress={onPress}
          style={styles?.header}
          subtitle={subtitle}
          testID={testID && `${testID}-header`}
          title={title}
        />
        <AccordionPanel
          ref={panelRef}
          collapsed={collapsed}
          itemKey={itemKey}
          style={styles?.panel}
          testID={testID && `${testID}-panel`}
        >
          {children}
        </AccordionPanel>
      </VStack>
    );
  },
);
