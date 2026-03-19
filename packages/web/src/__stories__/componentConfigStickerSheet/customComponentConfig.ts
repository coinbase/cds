import type { ComponentConfig } from '../../core/componentConfig';

export const customComponentConfig: ComponentConfig = {
  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/buttons/Button.tsx#45-99
   *   uses data-variant/data-transparent selectors for variant shells and disabled opacity.
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/buttons/Button.tsx#112-137
   *   forces spinner sizing via *[role='status'] and !important.
   * @customComponentConfig.ts (4-11)
   */
  Button: (props) => ({
    borderRadius: 200,
    height: props.compact ? '24px' : '32px',
    font: props.compact ? 'label1' : 'headline',
  }),

  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/buttons/IconButtonCSSContainer.tsx#60-150
   *   relies on global class and spinner selectors for icon button internals, which cannot be represented in ComponentConfig.
   * @customComponentConfig.ts (28-46)
   */
  IconButton: (props) => {
    const isCompact = props.compact ?? true;
    return {
      borderRadius: 200,
      height: isCompact ? '24px' : '32px',
      width: isCompact ? '24px' : '32px',
      ...(props.variant === 'tertiary'
        ? {
            background: 'bgAlternate',
            color: 'fg',
            borderColor: 'bgAlternate',
          }
        : {}),
    };
  },

  /**
   * Advanced parity gap:
   * - TextInput.tsx#68-167
   *   uses nested selectors, focus-outline targeting, and compact placeholder overrides.
   */
  TextInput: {
    bordered: false,
    inputBackground: 'bgAlternate',
    variant: 'foregroundMuted',
  },

  Switch: (props) => ({
    background: props.checked ? 'bgPrimary' : undefined,
    controlColor: props.checked ? 'bgAlternate' : 'fg',
  }),

  Tooltip: {
    invertColorScheme: false,
  },

  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/overlays/Tooltip.tsx#20-27
   *   sets TooltipContent background through wrapper descendant selectors.
   * @customComponentConfig.ts (71-79)
   */
  TooltipContent: {
    background: 'bgSecondary',
  },

  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/controls/Radio.tsx#36-48
   *   targets role/testid descendants for border radius, border-width behavior, and icon scale.
   * @customComponentConfig.ts (81-92)
   */
  Radio: (props) => ({
    background: 'bg',
    borderWidth: props.checked ? 200 : 100,
    borderColor: props.checked ? 'bgPrimary' : 'bgLinePrimarySubtle',
    controlColor: 'bgPrimary',
  }),

  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/controls/Checkbox.tsx#45-48
   *   sets exact 2px radius on div[role='presentation'] via selector.
   * @customComponentConfig.ts (94-105)
   */
  Checkbox: (props) => ({
    borderWidth: 200,
    controlColor: 'fg',
    background: props.checked ? 'bgSecondary' : undefined,
    borderColor: props.checked ? 'bgSecondary' : 'bgLinePrimarySubtle',
  }),

  /**
   * Advanced parity note:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/overlays/ModalHeader.tsx#65-153
   *   is a custom composition, not a direct CDS ModalHeader wrapper, so only padding defaults are mirrored.
   * @customComponentConfig.ts (107-116)
   */
  ModalHeader: {
    paddingX: 4,
    paddingY: 3,
  } as unknown as NonNullable<ComponentConfig['ModalHeader']>,

  ModalFooter: {
    paddingX: 4,
    paddingY: 4,
  } as unknown as NonNullable<ComponentConfig['ModalFooter']>,

  ModalBody: {
    paddingX: 4,
  },

  Table: {
    variant: 'default',
  },

  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/tabs/SegmentedTabs.tsx#29-54
   *   uses data-testid/role/aria-selected descendant selectors and !important text color overrides.
   * @customComponentConfig.ts (131-141)
   */
  SegmentedTabs: {
    activeBackground: 'bgSecondary',
    background: 'bgAlternate',
    borderRadius: 300,
  },

  SegmentedTab: {
    activeColor: 'fg',
    borderRadius: 200,
    color: 'fgMuted',
    font: 'headline',
  },

  Chip: {
    borderRadius: 200,
  },

  Link: {
    underline: true,
  },

  ControlGroup: {
    gap: 1,
  },

  ListCell: (props) => {
    const spacingVariant = props.spacingVariant ?? (props.compact ? 'compact' : 'normal');
    return spacingVariant === 'normal' ? { minHeight: '36px' } : {};
  },

  /**
   * Advanced parity gap:
   * - /Users/huntercopp/sources/coinbase-www/packages/advanced-components-web/src/components/controls/SearchInput.tsx#157-193
   *   sets borderRadius through internal TextInput wiring, but SearchInputBaseProps does not expose borderRadius in ComponentConfig.
   * @customComponentConfig.ts (167-173)
   */
  SearchInput: {},
};
