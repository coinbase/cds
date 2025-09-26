import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { AccessibilityRole, StyleProp, ViewStyle } from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import type { InteractableBlendStyles } from '../../system/Interactable';

import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectOption } from './DefaultSelectOption';

/**
 * Configuration for a single option in the Select component
 */
export type SelectOption = {
  /** The value associated with this option */
  value: string | null;
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
export type SelectOptionProps<Type extends 'single' | 'multi' = 'single'> = SelectOption &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<SelectProps, 'compact'> & {
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether this option is currently selected */
    selected: boolean;
    /** Whether the option is in an indeterminate state (for multi-select) */
    indeterminate?: boolean;
    /** Handler for when the option selection changes */
    onChange: (value: string | null) => void;
    /** Whether to allow multiline text in the option */
    multiline?: boolean;
    /** Style object for the option */
    style?: StyleProp<ViewStyle>;
    /** Blend styles for option interactivity */
    blendStyles?: InteractableBlendStyles;
    /** CSS class name for the option */
    className?: string;
    /** Accessibility role for the option element */
    accessibilityRole?: AccessibilityRole;
  };

export type SelectOptionComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectOptionProps<Type>
>;

type SelectState<Type extends 'single' | 'multi' = 'single'> = {
  value: Type extends 'multi' ? string[] : string | null;
  onChange: (value: Type extends 'multi' ? string | string[] : string | null) => void;
};

/**
 * Props for the select control component (the clickable input that opens the dropdown)
 */
export type SelectControlProps<Type extends 'single' | 'multi' = 'single'> = Pick<
  InputStackBaseProps,
  'disabled' | 'startNode' | 'variant'
> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
  SelectState<Type> &
  Pick<SelectProps, 'options' | 'label' | 'placeholder' | 'helperText' | 'compact'> & {
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Whether the dropdown is currently open */
    open: boolean;
    /** Function to update the dropdown open state */
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    /** CSS class name for the control */
    className?: string;
    /** Style object for the control */
    style?: StyleProp<ViewStyle>;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
  };

export type SelectControlComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectControlProps<Type> & {
    ref: React.Ref<any>;
  }
>;

/**
 * Props for the dropdown component that contains the list of options
 */
export type SelectDropdownProps<Type extends 'single' | 'multi' = 'single'> = SelectState<Type> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<
    SelectProps,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'SelectEmptyOptionsComponent'
    | 'label'
    | 'disabled'
    | 'compact'
    | 'hideSelectAll'
  > & {
    /** Whether this is for single or multi-select */
    type?: Type;
    /** Array of options with their configuration and optional custom components */
    options: (SelectOption &
      Pick<CellBaseProps, 'accessory' | 'media'> & { Component?: SelectOptionComponent<Type> })[];
    /** Whether the dropdown is currently open */
    open: boolean;
    /** Function to update the dropdown open state */
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Reference to the control element for positioning */
    controlRef: React.MutableRefObject<any>;
    /** Custom styles for dropdown elements */
    styles?: {
      /** Styles for the dropdown container */
      dropdown?: StyleProp<ViewStyle>;
      /** Styles for individual options */
      option?: StyleProp<ViewStyle>;
      /** Blend styles for option interactivity */
      optionBlendStyles?: InteractableBlendStyles;
    };
    /** Custom class names for dropdown elements */
    classNames?: {
      /** Class name for individual options */
      option?: string;
    };
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<Type>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<Type>;
    /** Accessibility roles for dropdown elements */
    accessibilityRoles?: {
      /** Accessibility role for option elements */
      option?: AccessibilityRole;
    };
  };

export type SelectDropdownComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectDropdownProps<Type> & {
    ref: React.Ref<any>;
  }
>;

/**
 * Props for the Select component
 */
export type SelectProps<Type extends 'single' | 'multi' = 'single'> = Pick<
  InputStackBaseProps,
  'startNode' | 'variant'
> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
  SelectState<Type> & {
    /** Whether the select allows single or multiple selections */
    type?: Type;
    /** Array of options to display in the select dropdown */
    options: SelectOption[];
    /** Controlled open state of the dropdown */
    open?: boolean;
    /** Callback to update the open state */
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Whether the select is disabled */
    disabled?: boolean;
    /** Whether clicking outside the dropdown should close it */
    disableClickOutsideClose?: boolean;
    /** Placeholder text displayed when no option is selected */
    placeholder?: React.ReactNode;
    /** Helper text displayed below the select */
    helperText?: React.ReactNode;
    /** Label for the "Select All" option in multi-select mode */
    selectAllLabel?: string;
    /** Label displayed when there are no options available */
    emptyOptionsLabel?: string;
    /** Whether to hide the "Select All" option in multi-select mode */
    hideSelectAll?: boolean;
    /** Label for the "Clear All" option in multi-select mode */
    clearAllLabel?: string;
    /** Label displayed above the select input */
    label?: React.ReactNode;
    /** Whether to use compact styling for the select */
    compact?: boolean;
    /** Initial open state when component mounts (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
    /** Custom component to render the dropdown container */
    SelectDropdownComponent?: SelectDropdownComponent<Type>;
    /** Custom component to render the select control */
    SelectControlComponent?: SelectControlComponent<Type>;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<Type>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<Type>;
    /** Custom component to render when no options are available */
    SelectEmptyOptionsComponent?: React.ReactNode;
    /** Custom styles for different parts of the select */
    styles?: {
      /** Styles for the control element */
      control?: StyleProp<ViewStyle>;
      /** Styles for the dropdown container */
      dropdown?: StyleProp<ViewStyle>;
      /** Styles for individual options */
      option?: StyleProp<ViewStyle>;
      /** Blend styles for option interactivity */
      optionBlendStyles?: InteractableBlendStyles;
    };
    /** Custom class names for different parts of the select */
    classNames?: {
      /** Class name for the control element */
      control?: string;
      /** Class name for individual options */
      option?: string;
    };
    /** Accessibility roles for option elements */
    accessibilityRoles?: {
      /** Accessibility role for option elements */
      option?: AccessibilityRole;
    };
  };

export type SelectRef = any &
  Pick<SelectProps, 'open' | 'setOpen'> & {
    refs: any;
  };

type SelectComponent = <Type extends 'single' | 'multi' = 'single'>(
  props: SelectProps<Type> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;

const SelectBase = memo(
  forwardRef(
    <Type extends 'single' | 'multi' = 'single'>(
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
        clearAllLabel,
        selectAllLabel,
        emptyOptionsLabel,
        hideSelectAll,
        defaultOpen,
        startNode,
        variant,
        maxSelectedOptionsToShow,
        accessory,
        media,
        detail,
        SelectOptionComponent = DefaultSelectOption as SelectOptionComponent<Type>,
        SelectAllOptionComponent,
        SelectDropdownComponent = DefaultSelectDropdown as SelectDropdownComponent<Type>,
        SelectControlComponent = DefaultSelectControl as SelectControlComponent<Type>,
        SelectEmptyOptionsComponent,
        styles,
        classNames,
        accessibilityLabel,
        accessibilityHint,
        accessibilityRoles,
        ...props
      }: SelectProps<Type>,
      ref: React.Ref<SelectRef>,
    ) => {
      const isMultiSelect = type === 'multi';

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

      const controlRef = useRef<any>(null);

      useImperativeHandle(ref, () =>
        Object.assign(controlRef.current, {
          open,
          setOpen,
          refs: { reference: controlRef, floating: null },
        }),
      );

      // Sort order of value array to match options array order
      const sortedValue = useMemo(() => {
        if (!isMultiSelect) return value;
        return (value as string[]).sort((a, b) => {
          const aIndex = options.findIndex((o) => o.value === a);
          const bIndex = options.findIndex((o) => o.value === b);
          return aIndex - bIndex;
        });
      }, [isMultiSelect, value, options]) as Type extends 'multi' ? string[] : string | null;

      return (
        <>
          <SelectControlComponent
            ref={controlRef}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            className={classNames?.control}
            compact={compact}
            disabled={disabled}
            helperText={helperText}
            label={label}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            onChange={onChange}
            open={open}
            options={options}
            placeholder={placeholder}
            setOpen={setOpen}
            startNode={startNode}
            style={styles?.control}
            type={type}
            value={sortedValue}
            variant={variant}
          />
          <SelectDropdownComponent
            ref={() => {}}
            SelectAllOptionComponent={SelectAllOptionComponent}
            SelectEmptyOptionsComponent={SelectEmptyOptionsComponent}
            SelectOptionComponent={SelectOptionComponent}
            accessibilityRoles={accessibilityRoles}
            accessory={accessory}
            classNames={{
              option: classNames?.option,
            }}
            clearAllLabel={clearAllLabel}
            compact={compact}
            controlRef={controlRef}
            detail={detail}
            disabled={disabled}
            emptyOptionsLabel={emptyOptionsLabel}
            hideSelectAll={hideSelectAll}
            label={label}
            media={media}
            onChange={onChange}
            open={open}
            options={options}
            selectAllLabel={selectAllLabel}
            setOpen={setOpen}
            styles={{
              dropdown: styles?.dropdown,
              option: styles?.option,
              optionBlendStyles: styles?.optionBlendStyles,
            }}
            type={type}
            value={sortedValue}
          />
        </>
      );
    },
  ),
);

export const Select = SelectBase as SelectComponent;
