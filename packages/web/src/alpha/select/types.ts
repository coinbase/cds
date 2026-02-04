import type React from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import type { AriaHasPopupType } from '../../hooks/useA11yControlledVisibility';
import type { BoxDefaultElement, BoxProps } from '../../layout/Box';
import type { PressableDefaultElement, PressableProps } from '../../system';
import type { InteractableBlendStyles } from '../../system/Interactable';

export type SelectType = 'single' | 'multi';

/**
 * Configuration for a single option in the Select component
 */
export type SelectOption<SelectOptionValue extends string = string> = {
  /** The value associated with this option */
  value: SelectOptionValue | null;
  /** The label displayed for the option */
  label?: React.ReactNode;
  /** Additional description text shown below the label */
  description?: React.ReactNode;
  /** Whether this option is disabled and cannot be selected */
  disabled?: boolean;
};

/**
 * Props for individual option components within the Select dropdown
 */
export type SelectOptionProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectOption<SelectOptionValue> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'end' | 'background'> &
  Omit<PressableProps<PressableDefaultElement>, 'value' | 'type' | 'onClick'> & {
    /** Click handler for the option */
    onClick?: (value: SelectOptionValue | null) => void;
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether this option is currently selected */
    selected?: boolean;
    /** Whether the option is in an indeterminate state (for multi-select) */
    indeterminate?: boolean;
    /** Whether to allow multiline text in the option */
    multiline?: boolean;
    /** ARIA role for the option element */
    accessibilityRole?: string;
    /** Whether to use compact styling for the option */
    compact?: boolean;
    /** Inline styles for the option */
    style?: React.CSSProperties;
    /** Custom styles for different parts of the option */
    styles?: {
      /** Styles for the option cell element */
      optionCell?: React.CSSProperties;
      /** Styles for the option content wrapper */
      optionContent?: React.CSSProperties;
      /** Styles for the option label element */
      optionLabel?: React.CSSProperties;
      /** Styles for the option description element */
      optionDescription?: React.CSSProperties;
      /** Styles for the select all divider element */
      selectAllDivider?: React.CSSProperties;
    };
    /** CSS class name for the option */
    className?: string;
    /** Custom class names for different parts of the option */
    classNames?: {
      /** Class name for the option cell element */
      optionCell?: string;
      /** Class name for the option content wrapper */
      optionContent?: string;
      /** Class name for the option label element */
      optionLabel?: string;
      /** Class name for the option description element */
      optionDescription?: string;
      /** Class name for the select all divider element */
      selectAllDivider?: string;
    };
  };

export type SelectOptionComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectOptionProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLButtonElement>;
  }
>;

/**
 * Custom UI to render for an option in the Select component options array
 */
export type SelectOptionCustomUI<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SelectOptionProps<Type>, 'accessory' | 'media' | 'end'> & {
  /** Custom component to render the option */
  Component?: SelectOptionComponent<Type, SelectOptionValue>;
};

/**
 * Configuration for a group of options in the Select component
 */
export type SelectOptionGroup<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = {
  /** The label displayed for the group header */
  label: string;
  /** The options within this group */
  options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
  /** Whether this group is disabled */
  disabled?: boolean;
};

/**
 * Props for the option group component in the Select dropdown
 */
export type SelectOptionGroupProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = {
  /** The label for this group */
  label: string;
  /** The options within this group */
  options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
  /** Component to render individual options */
  SelectOptionComponent: SelectOptionComponent<Type, SelectOptionValue>;
  /** Current selected value(s) */
  value: Type extends 'multi' ? SelectOptionValue[] : SelectOptionValue | null;
  /** Handler for option selection */
  onChange: (
    value: Type extends 'multi'
      ? SelectOptionValue | SelectOptionValue[] | null
      : SelectOptionValue | null,
  ) => void;
  /** Function to update the dropdown open state */
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  /** Whether this is for single or multi-select */
  type?: Type;
  /** Accessibility role for options */
  accessibilityRole?: string;
  /** Accessory element to display with options */
  accessory?: React.ReactElement;
  /** Media element to display with options */
  media?: React.ReactElement;
  /** End element to display with options */
  end?: React.ReactNode;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Whether the options should be compact */
  compact?: boolean;
  /** Custom styles for the option group and options */
  styles?: {
    /** Styles for the option group element */
    optionGroup?: React.CSSProperties;
    /** Styles for individual options */
    option?: React.CSSProperties;
    /** Blend styles for option interactivity */
    optionBlendStyles?: InteractableBlendStyles;
    /** Styles for the option cell element */
    optionCell?: React.CSSProperties;
    /** Styles for the option content wrapper */
    optionContent?: React.CSSProperties;
    /** Styles for the option label element */
    optionLabel?: React.CSSProperties;
    /** Styles for the option description element */
    optionDescription?: React.CSSProperties;
    /** Styles for the select all divider element */
    selectAllDivider?: React.CSSProperties;
  };
  /** Custom class names for the option group and options */
  classNames?: {
    /** Class name for the option group element */
    optionGroup?: string;
    /** Class name for individual options */
    option?: string;
    /** Class name for the option cell element */
    optionCell?: string;
    /** Class name for the option content wrapper */
    optionContent?: string;
    /** Class name for the option label element */
    optionLabel?: string;
    /** Class name for the option description element */
    optionDescription?: string;
    /** Class name for the select all divider element */
    selectAllDivider?: string;
  };
};

export type SelectOptionGroupComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<SelectOptionGroupProps<Type, SelectOptionValue>>;

/**
 * Custom UI to render for an option group in the Select component options array
 */
export type SelectOptionGroupCustomUI<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = {
  /** Custom component to render the option group */
  Component?: SelectOptionGroupComponent<Type, SelectOptionValue>;
};

/**
 * Array of options for the Select component. Can be individual options or groups with `label` and `options`
 */
export type SelectOptionList<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = (
  | (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)
  | (SelectOptionGroup<Type, SelectOptionValue> &
      SelectOptionGroupCustomUI<Type, SelectOptionValue>)
)[];

/**
 * Type guard to check if an option is a group
 */
export function isSelectOptionGroup<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  option:
    | (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)
    | (SelectOptionGroup<Type, SelectOptionValue> &
        SelectOptionGroupCustomUI<Type, SelectOptionValue>),
): option is SelectOptionGroup<Type, SelectOptionValue> &
  SelectOptionGroupCustomUI<Type, SelectOptionValue> {
  return 'options' in option && Array.isArray(option.options) && 'label' in option;
}

export type SelectEmptyDropdownContentProps = {
  label: string;
  /** Custom styles for different parts of the empty dropdown content */
  styles?: {
    /** Styles for the container element */
    emptyContentsContainer?: React.CSSProperties;
    /** Styles for the text element */
    emptyContentsText?: React.CSSProperties;
  };
  /** Custom class names for different parts of the empty dropdown content */
  classNames?: {
    /** Class name for the container element */
    emptyContentsContainer?: string;
    /** Class name for the text element */
    emptyContentsText?: string;
  };
};

export type SelectEmptyDropdownContentComponent = React.FC<SelectEmptyDropdownContentProps>;

type SelectState<Type extends SelectType = 'single', SelectOptionValue extends string = string> = {
  value: Type extends 'multi' ? SelectOptionValue[] : SelectOptionValue | null;
  onChange: (
    value: Type extends 'multi'
      ? SelectOptionValue | SelectOptionValue[] | null
      : SelectOptionValue | null,
  ) => void;
};

/**
 * Props for the dropdown component that contains the list of options
 */
export type SelectDropdownProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectState<Type, SelectOptionValue> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Omit<BoxProps<BoxDefaultElement>, 'onChange'> &
  Pick<SelectOptionProps<Type>, 'accessory' | 'media' | 'end'> & {
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Array of options with their configuration and optional custom components. Can be individual options or groups with `label` and `options` */
    options: SelectOptionList<Type, SelectOptionValue>;
    /** Whether the dropdown is currently open */
    open: boolean;
    /** Function to update the dropdown open state */
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Label displayed above the dropdown */
    label?: React.ReactNode;
    /** Whether the dropdown is disabled */
    disabled?: boolean;
    /** Label for the "Select All" option in multi-select mode */
    selectAllLabel?: string;
    /** Label displayed when there are no options available */
    emptyOptionsLabel?: string;
    /** Label for the "Clear All" option in multi-select mode */
    clearAllLabel?: string;
    /** Whether to hide the "Select All" option in multi-select mode */
    hideSelectAll?: boolean;
    /** Reference to the control element for positioning */
    controlRef: React.MutableRefObject<HTMLElement | null>;
    /** Optional header content to render at the top of the dropdown */
    header?: React.ReactNode;
    /** Optional footer content to render at the bottom of the dropdown */
    footer?: React.ReactNode;
    /** Inline styles for the dropdown */
    style?: React.CSSProperties;
    /** Custom styles for dropdown elements */
    styles?: {
      /** Styles for the dropdown root container */
      root?: React.CSSProperties;
      /** Styles for individual options */
      option?: React.CSSProperties;
      /** Blend styles for option interactivity */
      optionBlendStyles?: InteractableBlendStyles;
      /** Styles for the option cell element */
      optionCell?: React.CSSProperties;
      /** Styles for the option content wrapper */
      optionContent?: React.CSSProperties;
      /** Styles for the option label element */
      optionLabel?: React.CSSProperties;
      /** Styles for the option description element */
      optionDescription?: React.CSSProperties;
      /** Styles for the select all divider element */
      selectAllDivider?: React.CSSProperties;
      /** Styles for the empty contents container element */
      emptyContentsContainer?: React.CSSProperties;
      /** Styles for the empty contents text element */
      emptyContentsText?: React.CSSProperties;
      /** Styles for the option group element */
      optionGroup?: React.CSSProperties;
    };
    /** CSS class name for the dropdown */
    className?: string;
    /** Custom class names for dropdown elements */
    classNames?: {
      /** Class name for the dropdown root container */
      root?: string;
      /** Class name for individual options */
      option?: string;
      /** Class name for the option cell element */
      optionCell?: string;
      /** Class name for the option content wrapper */
      optionContent?: string;
      /** Class name for the option label element */
      optionLabel?: string;
      /** Class name for the option description element */
      optionDescription?: string;
      /** Class name for the select all divider element */
      selectAllDivider?: string;
      /** Class name for the empty contents container element */
      emptyContentsContainer?: string;
      /** Class name for the empty contents text element */
      emptyContentsText?: string;
      /** Class name for the option group element */
      optionGroup?: string;
    };
    /** Whether to use compact styling for the dropdown */
    compact?: boolean;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render when no options are available */
    SelectEmptyDropdownContentsComponent?: SelectEmptyDropdownContentComponent;
    /** Custom component to render group headers */
    SelectOptionGroupComponent?: SelectOptionGroupComponent<Type, SelectOptionValue>;
    /** Accessibility roles for dropdown and option elements */
    accessibilityRoles?: {
      /** ARIA role for the dropdown element */
      dropdown?: AriaHasPopupType;
      /** ARIA role for option elements */
      option?: string;
    };
  };

export type SelectDropdownComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectDropdownProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLElement>;
  }
>;

/**
 * Props for the select control component (the clickable input that opens the dropdown)
 */
export type SelectControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Omit<BoxProps<BoxDefaultElement>, 'borderWidth' | 'onChange'> &
  Pick<
    InputStackBaseProps,
    'disabled' | 'startNode' | 'variant' | 'labelVariant' | 'testID' | 'endNode'
  > &
  SelectState<Type, SelectOptionValue> & {
    /**
     * Alignment of the value node.
     * @default 'start'
     */
    align?: 'start' | 'center' | 'end';
    /**
     * Determines if the control should have a default border.
     * @note focusedBorderWidth on the control still shows a border when focused by default.
     * @default true
     */
    bordered?: boolean;
    /**
     * Width of the border.
     * @default 100 when bordered is true, 0 otherwise
     */
    borderWidth?: InputStackBaseProps['borderWidth'];
    /**
     * Additional border width when focused.
     * @default 200 when bordered is false, undefined otherwise
     */
    focusedBorderWidth?: InputStackBaseProps['focusedBorderWidth'];
    /** Array of options to display in the select dropdown. Can be individual options or groups with `label` and `options` */
    options: SelectOptionList<Type, SelectOptionValue>;
    /** Label displayed above the control */
    label?: React.ReactNode;
    /** Placeholder text displayed when no option is selected */
    placeholder?: React.ReactNode;
    /** Helper text displayed below the select */
    helperText?: React.ReactNode;
    /** Content node displayed below the selected values */
    contentNode?: React.ReactNode;
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether the dropdown is currently open */
    open: boolean;
    /** Function to update the dropdown open state */
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
    /** Label to show for showcasing count of hidden selected options */
    hiddenSelectedOptionsLabel?: string;
    /** Accessibility label for each chip in a multi-select */
    removeSelectedOptionAccessibilityLabel?: string;
    /** Blend styles for control interactivity */
    blendStyles?: InteractableBlendStyles;
    /** ARIA haspopup attribute value */
    ariaHaspopup?: AriaHasPopupType;
    /** Whether to use compact styling for the control */
    compact?: boolean;
    /** Inline styles for the control */
    style?: React.CSSProperties;
    /** Custom styles for different parts of the control */
    styles?: {
      /** Styles for the start node element */
      controlStartNode?: React.CSSProperties;
      /** Styles for the input node element */
      controlInputNode?: React.CSSProperties;
      /** Styles for the value node element */
      controlValueNode?: React.CSSProperties;
      /** Styles for the label node element */
      controlLabelNode?: React.CSSProperties;
      /** Styles for the helper text node element */
      controlHelperTextNode?: React.CSSProperties;
      /** Styles for the end node element */
      controlEndNode?: React.CSSProperties;
    };
    /** CSS class name for the control */
    className?: string;
    /** Custom class names for different parts of the control */
    classNames?: {
      /** Class name for the start node element */
      controlStartNode?: string;
      /** Class name for the input node element */
      controlInputNode?: string;
      /** Class name for the value node element */
      controlValueNode?: string;
      /** Class name for the label node element */
      controlLabelNode?: string;
      /** Class name for the helper text node element */
      controlHelperTextNode?: string;
      /** Class name for the end node element */
      controlEndNode?: string;
    };
  };

export type SelectControlComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLElement>;
  }
>;

export type SelectBaseProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  SelectState<Type, SelectOptionValue> &
  Pick<
    SelectControlProps<Type, SelectOptionValue>,
    | 'label'
    | 'placeholder'
    | 'helperText'
    | 'hiddenSelectedOptionsLabel'
    | 'removeSelectedOptionAccessibilityLabel'
    | 'startNode'
    | 'variant'
    | 'disabled'
    | 'labelVariant'
    | 'endNode'
    | 'align'
    | 'bordered'
  > &
  Pick<SelectOptionProps<Type>, 'accessory' | 'media' | 'end'> &
  Pick<
    SelectDropdownProps<Type>,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'hideSelectAll'
    | 'accessibilityRoles'
  > & {
    /** Whether the select allows single or multiple selections */
    type?: Type;
    /** Array of options to display in the select dropdown. Can be individual options or groups with `label` and `options` */
    options: SelectOptionList<Type, SelectOptionValue>;
    /** Controlled open state of the dropdown */
    open?: boolean;
    /** Callback to update the open state */
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Whether clicking outside the dropdown should close it */
    disableClickOutsideClose?: boolean;
    /** Whether to use compact styling for the select */
    compact?: boolean;
    /** Initial open state when component mounts (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
    /** Custom component to render the dropdown container */
    SelectDropdownComponent?: SelectDropdownComponent<Type, SelectOptionValue>;
    /** Custom component to render the select control */
    SelectControlComponent?: SelectControlComponent<Type, SelectOptionValue>;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<Type, SelectOptionValue>;
    /** Custom component to render when no options are available */
    SelectEmptyDropdownContentsComponent?: SelectEmptyDropdownContentComponent;
    /** Custom component to render group headers */
    SelectOptionGroupComponent?: SelectOptionGroupComponent<Type, SelectOptionValue>;
    /** Accessibility label for the control */
    controlAccessibilityLabel?: string;
    /** Inline styles for the root element */
    style?: React.CSSProperties;
    /** CSS class name for the root element */
    className?: string;
    /** Test ID for the root element */
    testID?: string;
  };

/**
 * Props for the Select component
 */
export type SelectProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectBaseProps<Type, SelectOptionValue> & {
  /** Custom styles for different parts of the select */
  styles?: {
    /** Styles for the root container */
    root?: React.CSSProperties;
    /** Styles for the control element */
    control?: React.CSSProperties;
    /** Styles for the start node element */
    controlStartNode?: React.CSSProperties;
    /** Styles for the input node element */
    controlInputNode?: React.CSSProperties;
    /** Styles for the value node element */
    controlValueNode?: React.CSSProperties;
    /** Styles for the label node element */
    controlLabelNode?: React.CSSProperties;
    /** Styles for the helper text node element */
    controlHelperTextNode?: React.CSSProperties;
    /** Styles for the end node element */
    controlEndNode?: React.CSSProperties;
    /** Blend styles for control interactivity */
    controlBlendStyles?: InteractableBlendStyles;
    /** Styles for the dropdown container */
    dropdown?: React.CSSProperties;
    /** Styles for individual options */
    option?: React.CSSProperties;
    /** Styles for the option cell element */
    optionCell?: React.CSSProperties;
    /** Styles for the option content wrapper */
    optionContent?: React.CSSProperties;
    /** Styles for the option label element */
    optionLabel?: React.CSSProperties;
    /** Styles for the option description element */
    optionDescription?: React.CSSProperties;
    /** Blend styles for option interactivity */
    optionBlendStyles?: InteractableBlendStyles;
    /** Styles for the select all divider element */
    selectAllDivider?: React.CSSProperties;
    /** Styles for the empty contents container element */
    emptyContentsContainer?: React.CSSProperties;
    /** Styles for the empty contents text element */
    emptyContentsText?: React.CSSProperties;
    /** Styles for the option group element */
    optionGroup?: React.CSSProperties;
  };
  /** Custom class names for different parts of the select */
  classNames?: {
    /** Class name for the root container */
    root?: string;
    /** Class name for the control element */
    control?: string;
    /** Class name for the start node element */
    controlStartNode?: string;
    /** Class name for the input node element */
    controlInputNode?: string;
    /** Class name for the value node element */
    controlValueNode?: string;
    /** Class name for the label node element */
    controlLabelNode?: string;
    /** Class name for the helper text node element */
    controlHelperTextNode?: string;
    /** Class name for the end node element */
    controlEndNode?: string;
    /** Class name for the dropdown container */
    dropdown?: string;
    /** Class name for individual options */
    option?: string;
    /** Class name for the option cell element */
    optionCell?: string;
    /** Class name for the option content wrapper */
    optionContent?: string;
    /** Class name for the option label element */
    optionLabel?: string;
    /** Class name for the option description element */
    optionDescription?: string;
    /** Class name for the select all divider element */
    selectAllDivider?: string;
    /** Class name for the empty contents container element */
    emptyContentsContainer?: string;
    /** Class name for the empty contents text element */
    emptyContentsText?: string;
    /** Class name for the option group element */
    optionGroup?: string;
  };
};
