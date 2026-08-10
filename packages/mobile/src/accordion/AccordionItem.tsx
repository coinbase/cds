import React, { memo } from 'react';
import type { StyleProp, View, ViewStyle } from 'react-native';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { accordionMinWidth } from '@coinbase/cds-common/tokens/accordion';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';

import { AccordionHeader, type AccordionHeaderBaseProps } from './AccordionHeader';
import { AccordionPanel, type AccordionPanelBaseProps } from './AccordionPanel';

export type AccordionItemBaseProps = Omit<AccordionHeaderBaseProps, 'collapsed'> &
  Omit<AccordionPanelBaseProps, 'collapsed'> & {
    headerRef?: React.RefObject<View | null>;
    panelRef?: React.RefObject<View | null>;
    /**
     * Show a border between the header and panel.
     * @default false
     */
    showHeaderBorder?: boolean;
    /** Border radius of the accordion item root container */
    borderRadius?: ThemeVars.BorderRadius;
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
  /** Custom style for the root element */
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the AccordionItem component */
  styles?: AccordionItemStyles;
};

/**
 * A component that represents a single item within an Accordion.
 * It composes together an AccordionHeader and a collapsible AccordionPanel.
 * Accepts a unique `itemKey` prop to uniquely identify one item from another within the same Accordion.
 */
export const AccordionItem = memo((_props: AccordionItemProps) => {
  const mergedProps = useComponentConfig('AccordionItem', _props);
  const {
    itemKey,
    title,
    subtitle,
    tertiaryTitle,
    children,
    onPress,
    media,
    testID,
    headerRef,
    panelRef,
    style,
    styles,
    showHeaderBorder = false,
    background,
    caretSize,
    borderRadius,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingStart,
    paddingEnd,
  } = mergedProps;
  const { activeKey } = useAccordionContext();
  const collapsed = activeKey !== itemKey;

  return (
    <VStack
      borderRadius={borderRadius}
      minWidth={accordionMinWidth}
      overflow={borderRadius !== undefined ? 'hidden' : undefined}
      style={[style, styles?.root]}
      testID={testID}
      width="100%"
    >
      <AccordionHeader
        ref={headerRef}
        background={background}
        caretSize={caretSize}
        collapsed={collapsed}
        itemKey={itemKey}
        media={media}
        onPress={onPress}
        padding={padding}
        paddingBottom={paddingBottom}
        paddingEnd={paddingEnd}
        paddingStart={paddingStart}
        paddingTop={paddingTop}
        paddingX={paddingX}
        paddingY={paddingY}
        style={styles?.header}
        subtitle={subtitle}
        tertiaryTitle={tertiaryTitle}
        testID={testID && `${testID}-header`}
        title={title}
      />
      {showHeaderBorder ? (
        <Divider
          paddingEnd={paddingEnd}
          paddingStart={paddingStart}
          paddingX={paddingX}
          testID={testID && `${testID}-divider`}
        />
      ) : null}
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
});
