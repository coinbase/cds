import type { ComponentConfig } from '@coinbase/cds-mobile/core/componentConfig';

/**
 * Customer component config under test.
 * Only includes props currently expressible via AccordionItem BaseProps.
 */
export const customerComponentConfig: ComponentConfig = {
  Accordion: {
    showItemSeparators: false,
  },
  AccordionItem: {
    showHeaderBorder: true,
    tertiaryTitle: 'New title level',
    paddingX: 3,
    paddingY: 1,
    borderRadius: 400,
  },
  TextInput: {
    borderRadius: 400,
  },
  Tabs: {
    gap: 3,
    activeColor: 'fg',
    activeBackground: 'fg',
  },
  SegmentedTabs: {
    equalWidth: true,
    activeBackground: 'bg',
    activeColor: 'fg',
    padding: 0.5,
  },
  Select: {
    borderRadius: 400,
  },
  DateInput: {
    borderRadius: 400,
  },
};
