import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import type { AccessibilityRole, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import type { BoxProps } from '../../layout';
import type { DrawerRefBaseProps } from '../../overlays';
import type { InteractableBlendStyles } from '../../system/Interactable';
import type { PressableProps } from '../../system/Pressable';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';

export const defaultAccessibilityRoles: SelectDropdownProps['accessibilityRoles'] = {
  option: 'menuitem',
};

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
  Omit<PressableProps, 'value' | 'type' | 'onClick'> & {
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
    'disabled' | 'startNode' | 'variant' | 'labelVariant' | 'testID' | 'endNode'
  > &
  SelectState<Type, SelectOptionValue> & {
    /** Array of options to display in the select dropdown */
    options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
    /** Label displayed above the control */
    label?: React.ReactNode;
    /** Placeholder text displayed when no option is selected */
    placeholder?: React.ReactNode;
    /** Helper text displayed below the select */
    helperText?: React.ReactNode;
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
  Pick<SelectOptionProps<Type, SelectOptionValue>, 'accessory' | 'media' | 'end'> & {
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Array of options with their configuration and optional custom components */
    options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
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
    /** Array of options to display in the select dropdown */
    options: (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)[];
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
  };
};

export type SelectRef = View &
  Pick<SelectProps, 'open' | 'setOpen'> & {
    refs: { reference: React.RefObject<View>; floating: React.RefObject<View> | null };
  };

type SelectComponent = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectProps<Type, SelectOptionValue> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;

const SelectBase = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      {
        value,
        type = 'single' as Type,
        options,
        onChange,
        open: openProp,
        setOpen: setOpenProp,
        disabled,
        disableClickOutsideClose,
        placeholder,
        helperText,
        compact,
        label,
        labelVariant,
        accessibilityLabel = type === 'multi' ? 'Multi select control' : undefined,
        accessibilityHint,
        accessibilityRoles = defaultAccessibilityRoles,
        selectAllLabel,
        emptyOptionsLabel,
        clearAllLabel,
        hideSelectAll,
        defaultOpen,
        startNode,
        endNode,
        variant,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        removeSelectedOptionAccessibilityLabel,
        accessory,
        media,
        end,
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectDropdownComponent = DefaultSelectDropdown,
        SelectControlComponent = DefaultSelectControl,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents as SelectEmptyDropdownContentComponent,
        style,
        styles,
        testID,
        ...props
      }: SelectProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
      const [openInternal, setOpenInternal] = useState(defaultOpen ?? false);
      const open = openProp ?? openInternal;
      const setOpen = setOpenProp ?? setOpenInternal;

      if (
        (typeof openProp === 'undefined' && typeof setOpenProp !== 'undefined') ||
        (typeof openProp !== 'undefined' && typeof setOpenProp === 'undefined')
      )
        throw Error(
          'Select component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
        );

      const rootStyles = useMemo(() => {
        return [style, styles?.root];
      }, [style, styles?.root]);

      const controlStyles = useMemo(
        () => ({
          controlStartNode: styles?.controlStartNode,
          controlInputNode: styles?.controlInputNode,
          controlValueNode: styles?.controlValueNode,
          controlLabelNode: styles?.controlLabelNode,
          controlHelperTextNode: styles?.controlHelperTextNode,
          controlEndNode: styles?.controlEndNode,
        }),
        [
          styles?.controlStartNode,
          styles?.controlInputNode,
          styles?.controlValueNode,
          styles?.controlLabelNode,
          styles?.controlHelperTextNode,
          styles?.controlEndNode,
        ],
      );

      const dropdownStyles = useMemo(
        () => ({
          root: styles?.dropdown,
          option: styles?.option,
          optionBlendStyles: styles?.optionBlendStyles,
          optionCell: styles?.optionCell,
          optionContent: styles?.optionContent,
          optionLabel: styles?.optionLabel,
          optionDescription: styles?.optionDescription,
          selectAllDivider: styles?.selectAllDivider,
          emptyContentsContainer: styles?.emptyContentsContainer,
          emptyContentsText: styles?.emptyContentsText,
        }),
        [
          styles?.dropdown,
          styles?.option,
          styles?.optionBlendStyles,
          styles?.optionCell,
          styles?.optionContent,
          styles?.optionLabel,
          styles?.optionDescription,
          styles?.selectAllDivider,
          styles?.emptyContentsContainer,
          styles?.emptyContentsText,
        ],
      );

      const containerRef = useRef<View>(null);
      useImperativeHandle(ref, () =>
        Object.assign(containerRef.current as View, {
          open,
          setOpen,
          refs: { reference: containerRef, floating: null },
        }),
      );

      return (
        <View ref={containerRef} style={rootStyles} testID={testID}>
          <SelectControlComponent
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            blendStyles={styles?.controlBlendStyles}
            compact={compact}
            disabled={disabled}
            endNode={endNode}
            helperText={helperText}
            hiddenSelectedOptionsLabel={hiddenSelectedOptionsLabel}
            label={label}
            labelVariant={labelVariant}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            onChange={onChange}
            open={open}
            options={options}
            placeholder={placeholder}
            removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
            setOpen={setOpen}
            startNode={startNode}
            style={styles?.control}
            styles={controlStyles}
            type={type}
            value={value}
            variant={variant}
          />
          <SelectDropdownComponent
            SelectAllOptionComponent={SelectAllOptionComponent}
            SelectEmptyDropdownContentsComponent={SelectEmptyDropdownContentsComponent}
            SelectOptionComponent={SelectOptionComponent}
            accessibilityRoles={accessibilityRoles}
            accessory={accessory}
            clearAllLabel={clearAllLabel}
            compact={compact}
            controlRef={containerRef}
            disabled={disabled}
            emptyOptionsLabel={emptyOptionsLabel}
            end={end}
            hideSelectAll={hideSelectAll}
            label={label}
            media={media}
            onChange={onChange}
            open={open}
            options={options}
            selectAllLabel={selectAllLabel}
            setOpen={setOpen}
            styles={dropdownStyles}
            type={type}
            value={value}
          />
        </View>
      );
    },
  ),
);

export const Select = SelectBase as SelectComponent;
