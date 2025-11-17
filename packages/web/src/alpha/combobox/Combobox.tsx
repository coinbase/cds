import { forwardRef, memo, useMemo, useRef, useState } from 'react';
import type { InputVariant, SharedAccessibilityProps } from '@coinbase/cds-common';
import Fuse from 'fuse.js';

import type { AriaHasPopupType } from '../../hooks/useA11yControlledVisibility';
import type { InteractableBlendStyles } from '../../system/Interactable';
import {
  defaultAccessibilityRoles,
  Select,
  type SelectDropdownComponent,
  type SelectDropdownProps,
  type SelectEmptyDropdownContentComponent,
  type SelectOption,
  type SelectOptionComponent,
  type SelectRef,
} from '../select/Select';

import { DefaultComboboxControl } from './DefaultComboboxControl';

export type ComboboxControlProps<T extends string = string> = {
  /** Array of options to display in the combobox dropdown */
  options: SelectOption<T>[];
  /** Current value(s) - always an array for multi-select */
  value: T[];
  /** Change handler - accepts single value or array for multi-select */
  onChange: (value: T | T[]) => void;
  /** Whether the dropdown is currently open */
  open: boolean;
  /** Function to update the dropdown open state */
  setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  /** Search text value */
  searchText: string;
  /** Search text change handler */
  onSearch: (searchText: string) => void;
  /** Label displayed above the control */
  label?: React.ReactNode;
  /** Placeholder text displayed in the search input */
  placeholder?: React.ReactNode;
  /** Helper text displayed below the combobox */
  helperText?: React.ReactNode;
  /** Whether the combobox is disabled */
  disabled?: boolean;
  /** Input variant for styling */
  variant?: InputVariant;
  /** Label variant for positioning */
  labelVariant?: 'inside' | 'outside';
  /** Node displayed at the start of the control */
  startNode?: React.ReactNode;
  /** Node displayed at the end of the control */
  endNode?: React.ReactNode;
  /** Whether to use compact styling */
  compact?: boolean;
  /** Maximum number of selected options to show before truncating */
  maxSelectedOptionsToShow?: number;
  /** Label to show for showcasing count of hidden selected options */
  hiddenSelectedOptionsLabel?: string;
  /** Accessibility label for each chip in a multi-select */
  removeSelectedOptionAccessibilityLabel?: string;
  /** ARIA haspopup attribute value */
  ariaHaspopup?: AriaHasPopupType;
  /** Custom styles for different parts of the control */
  styles?: {
    controlStartNode?: React.CSSProperties;
    controlInputNode?: React.CSSProperties;
    controlValueNode?: React.CSSProperties;
    controlLabelNode?: React.CSSProperties;
    controlHelperTextNode?: React.CSSProperties;
    controlEndNode?: React.CSSProperties;
  };
  /** Custom class names for different parts of the control */
  classNames?: {
    controlStartNode?: string;
    controlInputNode?: string;
    controlValueNode?: string;
    controlLabelNode?: string;
    controlHelperTextNode?: string;
    controlEndNode?: string;
  };
  /** Accessibility label for the combobox */
  accessibilityLabel?: string;
  /** Test ID for the combobox */
  testID?: string;
};

export type ComboboxControlComponent<T extends string = string> = React.FC<
  ComboboxControlProps<T> & { ref?: React.Ref<HTMLElement> }
>;

export type ComboboxBaseProps<T extends string = string> = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel'
> &
  Pick<
    ComboboxControlProps<T>,
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
    | 'ariaHaspopup'
  > &
  Pick<SelectDropdownProps<'multi', T>, 'accessory' | 'media' | 'end'> &
  Pick<
    SelectDropdownProps<'multi'>,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'hideSelectAll'
    | 'accessibilityRoles'
  > & {
    /** Array of options to display in the combobox dropdown */
    options: SelectOption<T>[];
    /** Current selected values (always an array for multi-select) */
    value: T[];
    /** Controlled open state of the dropdown */
    open?: boolean;
    /** Callback to update the open state */
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Change handler for selection changes */
    onChange: (value: T | T[]) => void;
    /** Controlled search text value */
    searchText?: string;
    /** Search text change handler */
    onSearch?: (searchText: string) => void;
    /** Custom filter function for searching options */
    filterFunction?: (options: SelectOption<T>[], searchText: string) => SelectOption<T>[];
    /** Default search text value for uncontrolled mode */
    defaultSearchText?: string;
    /** Whether clicking outside the dropdown should close it */
    disableClickOutsideClose?: boolean;
    /** Whether to use compact styling */
    compact?: boolean;
    /** Initial open state when component mounts (uncontrolled mode) */
    defaultOpen?: boolean;
    /** Maximum number of selected options to show before truncating */
    maxSelectedOptionsToShow?: number;
    /** Custom component to render the dropdown container */
    SelectDropdownComponent?: SelectDropdownComponent<'multi', T>;
    /** Custom component to render the combobox control */
    ComboboxControlComponent?: ComboboxControlComponent<T>;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<'multi', T>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<'multi', T>;
    /** Custom component to render when no options are available */
    SelectEmptyDropdownContentsComponent?: SelectEmptyDropdownContentComponent;
    /** Inline styles for the root element */
    style?: React.CSSProperties;
    /** CSS class name for the root element */
    className?: string;
    /** Test ID for the root element */
    testID?: string;
  };

/**
 * Props for the Combobox component
 */
export type ComboboxProps<T extends string = string> = ComboboxBaseProps<T> & {
  /** Custom styles for different parts of the combobox */
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
  };
  /** Custom class names for different parts of the combobox */
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
  };
};

export type ComboboxRef = SelectRef;

type ComboboxComponent = <T extends string = string>(
  props: ComboboxProps<T> & { ref?: React.Ref<ComboboxRef> },
) => React.ReactElement;

const ComboboxBase = memo(
  forwardRef(
    <T extends string = string>(
      {
        value,
        options,
        onChange,
        open: openProp,
        setOpen: setOpenProp,
        disabled,
        disableClickOutsideClose,
        placeholder,
        helperText,
        hiddenSelectedOptionsLabel,
        removeSelectedOptionAccessibilityLabel,
        compact,
        label,
        labelVariant,
        accessibilityLabel,
        accessibilityRoles = defaultAccessibilityRoles,
        ariaHaspopup = 'listbox',
        selectAllLabel,
        emptyOptionsLabel,
        clearAllLabel,
        hideSelectAll,
        defaultOpen,
        startNode,
        endNode,
        variant,
        maxSelectedOptionsToShow,
        accessory,
        media,
        end,
        searchText: searchTextProp,
        onSearch: onSearchProp,
        defaultSearchText = '',
        filterFunction,
        SelectOptionComponent,
        SelectAllOptionComponent,
        SelectDropdownComponent,
        ComboboxControlComponent = DefaultComboboxControl,
        SelectEmptyDropdownContentsComponent,
        style,
        styles,
        className,
        classNames,
        testID,
        ...props
      }: ComboboxProps<T>,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const controlRef = useRef<SelectRef>(null);

      const [searchTextInternal, setSearchTextInternal] = useState(defaultSearchText);
      const searchText = searchTextProp ?? searchTextInternal;
      const setSearchText = onSearchProp ?? setSearchTextInternal;

      if (
        (typeof searchTextProp === 'undefined' && typeof onSearchProp !== 'undefined') ||
        (typeof searchTextProp !== 'undefined' && typeof onSearchProp === 'undefined')
      )
        throw Error(
          'Combobox component must be fully controlled or uncontrolled: "searchText" and "onSearch" props must be provided together or not at all',
        );

      const [openInternal, setOpenInternal] = useState(defaultOpen ?? false);
      const open = openProp ?? openInternal;
      const setOpen = setOpenProp ?? setOpenInternal;

      if (
        (typeof openProp === 'undefined' && typeof setOpenProp !== 'undefined') ||
        (typeof openProp !== 'undefined' && typeof setOpenProp === 'undefined')
      )
        throw Error(
          'Combobox component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
        );

      const fuse = useMemo(
        () =>
          new Fuse(options, {
            keys: ['label', 'description'],
            threshold: 0.3,
          }),
        [options],
      );

      const filteredOptions = useMemo(() => {
        if (searchText.length === 0) return options;
        if (filterFunction) return filterFunction(options, searchText);
        return fuse.search(searchText).map((result) => result.item);
      }, [filterFunction, fuse, options, searchText]);

      return (
        <div ref={ref}>
          <DefaultComboboxControl
            ref={controlRef.current?.refs.setReference}
            accessibilityLabel={accessibilityLabel}
            ariaHaspopup={ariaHaspopup}
            classNames={classNames}
            compact={compact}
            disabled={disabled}
            endNode={endNode}
            helperText={helperText}
            hiddenSelectedOptionsLabel={hiddenSelectedOptionsLabel}
            label={label}
            labelVariant={labelVariant}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            onChange={(value) => onChange?.(value as T | T[])}
            onSearch={setSearchText}
            open={open}
            options={options}
            placeholder={placeholder}
            removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
            searchText={searchText}
            setOpen={setOpen}
            startNode={startNode}
            styles={styles}
            value={value}
            variant={variant}
          />
          <Select
            ref={controlRef}
            SelectControlComponent={() => null}
            SelectDropdownComponent={SelectDropdownComponent}
            SelectEmptyDropdownContentsComponent={SelectEmptyDropdownContentsComponent}
            SelectOptionComponent={SelectOptionComponent}
            accessibilityLabel={accessibilityLabel}
            accessibilityRoles={accessibilityRoles}
            accessory={accessory}
            className={className}
            classNames={classNames}
            clearAllLabel={clearAllLabel}
            compact={compact}
            defaultOpen={defaultOpen}
            disableClickOutsideClose={disableClickOutsideClose}
            disabled={disabled}
            emptyOptionsLabel={emptyOptionsLabel}
            end={end}
            endNode={endNode}
            helperText={helperText}
            hiddenSelectedOptionsLabel={hiddenSelectedOptionsLabel}
            hideSelectAll={hideSelectAll}
            label={label}
            labelVariant={labelVariant}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            media={media}
            onChange={(value) => onChange?.(value as T | T[])}
            open={open}
            options={filteredOptions}
            placeholder={placeholder}
            removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
            selectAllLabel={selectAllLabel}
            setOpen={setOpen}
            startNode={startNode}
            style={style}
            styles={styles}
            testID={testID}
            type="multi"
            value={value}
            variant={variant}
          />
        </div>
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
