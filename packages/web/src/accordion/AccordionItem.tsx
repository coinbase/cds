import React, { memo } from 'react';
import { useAccordionContext } from '@coinbase/cds-common/accordion/AccordionProvider';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { accordionMinWidth } from '@coinbase/cds-common/tokens/accordion';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';
import type { StylesAndClassNames } from '../types';

import { AccordionHeader, type AccordionHeaderBaseProps } from './AccordionHeader';
import { AccordionPanel, type AccordionPanelBaseProps } from './AccordionPanel';

/**
 * Static class names for AccordionItem component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const accordionItemClassNames = {
  /** Root element */
  root: 'cds-AccordionItem',
  /** Header pressable element */
  header: 'cds-AccordionItem-header',
  /** Collapsible panel container element */
  panel: 'cds-AccordionItem-panel',
} as const;

export type AccordionItemBaseProps = Omit<AccordionHeaderBaseProps, 'collapsed'> &
  Pick<AccordionPanelBaseProps, 'maxHeight' | 'children'> & {
    headerRef?: React.RefObject<HTMLButtonElement | null>;
    panelRef?: React.RefObject<HTMLDivElement | null>;
    /**
     * Show a border between the header and panel.
     * @default false
     */
    showHeaderBorder?: boolean;
    /** Border radius of the accordion item root container */
    borderRadius?: ThemeVars.BorderRadius;
  };

export type AccordionItemProps = AccordionItemBaseProps &
  StylesAndClassNames<typeof accordionItemClassNames> & {
    className?: string;
    style?: React.CSSProperties;
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
    onClick,
    media,
    testID,
    headerRef,
    panelRef,
    maxHeight,
    style,
    styles,
    className,
    classNames,
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
      className={cx(accordionItemClassNames.root, className, classNames?.root)}
      minWidth={accordionMinWidth}
      overflow={borderRadius !== undefined ? 'hidden' : undefined}
      style={{ ...style, ...styles?.root }}
      testID={testID}
      width="100%"
    >
      <AccordionHeader
        ref={headerRef}
        background={background}
        caretSize={caretSize}
        className={cx(accordionItemClassNames.header, classNames?.header)}
        collapsed={collapsed}
        itemKey={itemKey}
        media={media}
        onClick={onClick}
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
        className={cx(accordionItemClassNames.panel, classNames?.panel)}
        collapsed={collapsed}
        itemKey={itemKey}
        maxHeight={maxHeight}
        style={styles?.panel}
        testID={testID && `${testID}-panel`}
      >
        {children}
      </AccordionPanel>
    </VStack>
  );
});
