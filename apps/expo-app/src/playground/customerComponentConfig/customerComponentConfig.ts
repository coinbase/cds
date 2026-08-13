import type { SelectChipBaseProps } from '@coinbase/cds-mobile/alpha/select-chip/SelectChip';
import type { TabbedChipsBaseProps } from '@coinbase/cds-mobile/alpha/tabbed-chips/TabbedChips';
import type { InputChipBaseProps } from '@coinbase/cds-mobile/chips/ChipProps';
import type { CheckboxCellBaseProps } from '@coinbase/cds-mobile/controls/CheckboxCell';
import type { RadioCellBaseProps } from '@coinbase/cds-mobile/controls/RadioCell';
import type { ComponentConfig, ConfigResolver } from '@coinbase/cds-mobile/core/componentConfig';

import { CustomTabComponent } from './customTabComponent';

const inputChipStyleConfigResolver: ConfigResolver<InputChipBaseProps> = (props) =>
  props.active
    ? {
        activeBackground: 'bgSecondary',
        borderWidth: 100,
        borderColor: 'bgSecondary',
      }
    : {
        background: 'bg',
        borderWidth: 100,
        borderColor: 'bgLine',
      };

const selectChipStyleConfigResolver: ConfigResolver<SelectChipBaseProps> = (props) =>
  props.active
    ? {
        activeBackground: 'bgSecondary',
        borderWidth: 100,
        borderColor: 'bgSecondary',
      }
    : {
        background: 'bg',
        borderWidth: 100,
        borderColor: 'bgLine',
      };

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
  InputChip: inputChipStyleConfigResolver,
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
  SelectChip: selectChipStyleConfigResolver,
  TabbedChips: {
    TabComponent: CustomTabComponent,
  } satisfies ConfigResolver<TabbedChipsBaseProps>,
  DateInput: {
    borderRadius: 400,
  },
  CheckboxCell: {
    borderRadius: 400,
  },
  RadioCell: {
    borderRadius: 400,
  },
};
