import type React from 'react';
import type { AccessibilityRole, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import type { BoxProps } from '../../layout';
import type { DrawerRefBaseProps, TrayProps } from '../../overlays';
import type { InteractableBlendStyles } from '../../system/Interactable';
import type { PressableProps } from '../../system/Pressable';

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
  Pick<CellBaseProps, 'accessory' | 'media' | 'end'> &
  Omit<PressableProps, 'value' | 'type' | 'onClick' | 'onPress'> & {
    /** Press handler for the option */
    onPress?: (value: SelectOptionValue | null) => void;
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether this option is currently selected */
    selected?: boolean;
    /** Whether the option is in an indeterminate state (for multi-select) */
    indeterminate?: boolean;
    /** Whether to allow multiline text in the option */
    multiline?: boolean;
    /** Accessibility role for the option element */
    accessibilityRole?: AccessibilityRole;
    /** Whether to use compact styling for the option */
    compact?: boolean;
    /** Style object for the option */
    style?: StyleProp<ViewStyle>;
    /** Custom styles for different parts of the option */
    styles?: {
      /** Styles for the option cell element */
      optionCell?: StyleProp<ViewStyle>;
      /** Styles for the option content wrapper */
      optionContent?: StyleProp<ViewStyle>;
      /** Styles for the option label element */
      optionLabel?: StyleProp<ViewStyle>;
      /** Styles for the option description element */
      optionDescription?: StyleProp<ViewStyle>;
      /** Styles for the select all divider element */
      selectAllDivider?: StyleProp<ViewStyle>;
    };
  };

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

export type SelectOptionComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectOptionProps<Type, SelectOptionValue> & {
    /** Ref forwarding currently not supported. This will be updated once Cell supports ref forwarding. */
    ref?: React.Ref<View>;
  }
>;

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
  accessibilityRole?: AccessibilityRole;
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
    optionGroup?: StyleProp<ViewStyle>;
    /** Styles for individual options */
    option?: StyleProp<ViewStyle>;
    /** Blend styles for option interactivity */
    optionBlendStyles?: InteractableBlendStyles;
    /** Styles for the option cell element */
    optionCell?: StyleProp<ViewStyle>;
    /** Styles for the option content wrapper */
    optionContent?: StyleProp<ViewStyle>;
    /** Styles for the option label element */
    optionLabel?: StyleProp<ViewStyle>;
    /** Styles for the option description element */
    optionDescription?: StyleProp<ViewStyle>;
    /** Styles for the select all divider element */
    selectAllDivider?: StyleProp<ViewStyle>;
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
    emptyContentsContainer?: StyleProp<ViewStyle>;
    /** Styles for the text element */
    emptyContentsText?: StyleProp<ViewStyle>;
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
 * Props for the select control component (the clickable input that opens the dropdown)
 */
export type SelectControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
  Omit<BoxProps, 'borderWidth' | 'onChange'> &
  Pick<
    InputStackBaseProps,
    | 'disabled'
    | 'startNode'
    | 'variant'
    | 'labelVariant'
    | 'testID'
    | 'endNode'
    | 'borderWidth'
    | 'focusedBorderWidth'
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
    /** Whether to use compact styling for the control */
    compact?: boolean;
    /** Style object for the control */
    style?: StyleProp<ViewStyle>;
    /** Custom styles for different parts of the control */
    styles?: {
      /** Styles for the start node element */
      controlStartNode?: StyleProp<ViewStyle>;
      /** Styles for the input node element */
      controlInputNode?: StyleProp<ViewStyle>;
      /** Styles for the value node element */
      controlValueNode?: StyleProp<ViewStyle>;
      /** Styles for the label node element */
      controlLabelNode?: StyleProp<ViewStyle>;
      /** Styles for the helper text node element */
      controlHelperTextNode?: StyleProp<ViewStyle>;
      /** Styles for the end node element */
      controlEndNode?: StyleProp<ViewStyle>;
    };
  };

export type SelectControlComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<TouchableOpacity>;
  }
>;

/**
 * Props for the dropdown component that contains the list of options
 */
export type SelectDropdownProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectState<Type, SelectOptionValue> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Omit<BoxProps, 'onChange'> &
  Pick<TrayProps, 'header' | 'footer' | 'onVisibilityChange'> &
  Pick<SelectOptionProps<Type, SelectOptionValue>, 'accessory' | 'media' | 'end'> & {
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
    controlRef: React.MutableRefObject<View | null>;
    /** Inline styles for the dropdown */
    style?: StyleProp<ViewStyle>;
    /** Custom styles for dropdown elements */
    styles?: {
      /** Styles for the dropdown root container */
      root?: StyleProp<ViewStyle>;
      /** Styles for individual options */
      option?: StyleProp<ViewStyle>;
      /** Blend styles for option interactivity */
      optionBlendStyles?: InteractableBlendStyles;
      /** Styles for the option cell element */
      optionCell?: StyleProp<ViewStyle>;
      /** Styles for the option content wrapper */
      optionContent?: StyleProp<ViewStyle>;
      /** Styles for the option group element */
      optionGroup?: StyleProp<ViewStyle>;
      /** Styles for the option label element */
      optionLabel?: StyleProp<ViewStyle>;
      /** Styles for the option description element */
      optionDescription?: StyleProp<ViewStyle>;
      /** Styles for the select all divider element */
      selectAllDivider?: StyleProp<ViewStyle>;
      /** Styles for the empty contents container element */
      emptyContentsContainer?: StyleProp<ViewStyle>;
      /** Styles for the empty contents text element */
      emptyContentsText?: StyleProp<ViewStyle>;
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
    /** Accessibility roles for dropdown elements */
    accessibilityRoles?: {
      /** Accessibility role for option elements */
      option?: AccessibilityRole;
    };
  };

export type SelectDropdownComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<
  SelectDropdownProps<Type, SelectOptionValue> & {
    ref?: React.Ref<DrawerRefBaseProps>;
  }
>;

export type SelectBaseProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
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
  Pick<SelectOptionProps<Type, SelectOptionValue>, 'accessory' | 'media' | 'end'> &
  Pick<
    SelectDropdownProps<Type, SelectOptionValue>,
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
    /** Inline styles for the root element */
    style?: StyleProp<ViewStyle>;
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
    /** Styles for the root element */
    root?: StyleProp<ViewStyle>;
    /** Styles for the control element */
    control?: StyleProp<ViewStyle>;
    /** Styles for the start node element */
    controlStartNode?: StyleProp<ViewStyle>;
    /** Styles for the input node element */
    controlInputNode?: StyleProp<ViewStyle>;
    /** Styles for the value node element */
    controlValueNode?: StyleProp<ViewStyle>;
    /** Styles for the label node element */
    controlLabelNode?: StyleProp<ViewStyle>;
    /** Styles for the helper text node element */
    controlHelperTextNode?: StyleProp<ViewStyle>;
    /** Styles for the end node element */
    controlEndNode?: StyleProp<ViewStyle>;
    /** Blend styles for control interactivity */
    controlBlendStyles?: InteractableBlendStyles;
    /** Styles for the dropdown container */
    dropdown?: StyleProp<ViewStyle>;
    /** Styles for individual options */
    option?: StyleProp<ViewStyle>;
    /** Styles for the option cell element */
    optionCell?: StyleProp<ViewStyle>;
    /** Styles for the option content wrapper */
    optionContent?: StyleProp<ViewStyle>;
    /** Styles for the option label element */
    optionLabel?: StyleProp<ViewStyle>;
    /** Styles for the option description element */
    optionDescription?: StyleProp<ViewStyle>;
    /** Blend styles for option interactivity */
    optionBlendStyles?: InteractableBlendStyles;
    /** Styles for the select all divider element */
    selectAllDivider?: StyleProp<ViewStyle>;
    /** Styles for the empty contents container element */
    emptyContentsContainer?: StyleProp<ViewStyle>;
    /** Styles for the empty contents text element */
    emptyContentsText?: StyleProp<ViewStyle>;
    /** Styles for the option group element */
    optionGroup?: StyleProp<ViewStyle>;
  };
};

export type SelectRef = View &
  Pick<SelectProps, 'open' | 'setOpen'> & {
    refs: {
      reference: React.RefObject<View>;
      floating: React.RefObject<View> | null;
    };
  };

/**
 * Type for the Select component function signature
 */
export type SelectComponent = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectProps<Type, SelectOptionValue> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;
