import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  type AccessibilityRole,
  type StyleProp,
  type TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import type { InputVariant, SharedAccessibilityProps } from '@coinbase/cds-common';
import Fuse from 'fuse.js';

import type { BoxProps } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import type { DrawerRefBaseProps } from '../../overlays/drawer/Drawer';
import type { InteractableBlendStyles } from '../../system/Interactable';
import {
  DefaultSelectAllOption,
  DefaultSelectControl,
  DefaultSelectDropdown,
  DefaultSelectOption,
} from '../select';
import {
  defaultAccessibilityRoles,
  Select,
  type SelectControlComponent,
  type SelectDropdownComponent,
  type SelectDropdownProps,
  type SelectEmptyDropdownContentComponent,
  type SelectOption,
  type SelectOptionComponent,
  type SelectRef,
} from '../select/Select';

import { DefaultComboboxControl } from './DefaultComboboxControl';
import { DefaultComboboxDropdown } from './DefaultComboboxDropdown';

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
  /** Custom styles for different parts of the control */
  styles?: {
    controlStartNode?: StyleProp<ViewStyle>;
    controlInputNode?: StyleProp<ViewStyle>;
    controlValueNode?: StyleProp<ViewStyle>;
    controlLabelNode?: StyleProp<ViewStyle>;
    controlHelperTextNode?: StyleProp<ViewStyle>;
    controlEndNode?: StyleProp<ViewStyle>;
  };
  /** Accessibility label for the combobox */
  accessibilityLabel?: string;
  /** Test ID for the combobox */
  testID?: string;
};

export type ComboboxControlComponent<T extends string = string> = React.FC<
  ComboboxControlProps<T> & { ref?: React.Ref<TouchableOpacity> }
>;

export type ComboboxDropdownComponent<ComboboxOptionValue extends string = string> = React.FC<
  ComboboxDropdownProps<ComboboxOptionValue> & { ref?: React.Ref<DrawerRefBaseProps> }
>;

export type ComboboxDropdownProps<ComboboxOptionValue extends string = string> =
  SelectDropdownProps<'multi', ComboboxOptionValue> &
    Pick<ComboboxControlProps<ComboboxOptionValue>, 'searchText' | 'onSearch'> & {
      /** Custom component to render the control below the tray header */
      ComboboxControlComponent?: ComboboxControlComponent<ComboboxOptionValue>;
    };

export type ComboboxBaseProps<ComboboxOptionValue extends string = string> = Pick<
  SharedAccessibilityProps,
  'accessibilityLabel'
> &
  Pick<
    ComboboxControlProps<ComboboxOptionValue>,
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
  Pick<SelectDropdownProps<'multi', ComboboxOptionValue>, 'accessory' | 'media' | 'end'> &
  Pick<
    SelectDropdownProps<'multi'>,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'hideSelectAll'
    | 'accessibilityRoles'
  > & {
    /** Array of options to display in the combobox dropdown */
    options: SelectOption<ComboboxOptionValue>[];
    /** Current selected values (always an array for multi-select) */
    value: ComboboxOptionValue[];
    /** Controlled open state of the dropdown */
    open?: boolean;
    /** Callback to update the open state */
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    /** Change handler for selection changes */
    onChange: (value: ComboboxOptionValue | ComboboxOptionValue[]) => void;
    /** Controlled search text value */
    searchText?: string;
    /** Search text change handler */
    onSearch?: (searchText: string) => void;
    /** Custom filter function for searching options */
    filterFunction?: (
      options: SelectOption<ComboboxOptionValue>[],
      searchText: string,
    ) => SelectOption<ComboboxOptionValue>[];
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
    ComboboxDropdownComponent?: ComboboxDropdownComponent<ComboboxOptionValue>;
    /** Custom component to render the select control */
    SelectControlComponent?: SelectControlComponent<'multi', ComboboxOptionValue>;
    /** Custom component to render the combobox control */
    ComboboxControlComponent?: ComboboxControlComponent<ComboboxOptionValue>;
    /** Custom component to render individual options */
    SelectOptionComponent?: SelectOptionComponent<'multi', ComboboxOptionValue>;
    /** Custom component to render the "Select All" option */
    SelectAllOptionComponent?: SelectOptionComponent<'multi', ComboboxOptionValue>;
    /** Custom component to render when no options are available */
    SelectEmptyDropdownContentsComponent?: SelectEmptyDropdownContentComponent;
    /** Inline styles for the root element */
    style?: StyleProp<ViewStyle>;
    /** Test ID for the root element */
    testID?: string;
  };

/**
 * Props for the Combobox component
 */
export type ComboboxProps<ComboboxOptionValue extends string = string> =
  ComboboxBaseProps<ComboboxOptionValue> & {
    /** Custom styles for different parts of the combobox */
    styles?: {
      /** Styles for the root container */
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
  };

export type ComboboxRef = SelectRef;

type ComboboxComponent = <ComboboxOptionValue extends string = string>(
  props: ComboboxProps<ComboboxOptionValue> & { ref?: React.Ref<ComboboxRef> },
) => React.ReactElement;

const ComboboxBase = memo(
  forwardRef(
    <ComboboxOptionValue extends string = string>(
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
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        ComboboxDropdownComponent = DefaultComboboxDropdown,
        ComboboxControlComponent = DefaultComboboxControl,
        SelectControlComponent = DefaultSelectControl,
        SelectEmptyDropdownContentsComponent,
        style,
        styles,
        testID,
        ...props
      }: ComboboxProps<ComboboxOptionValue> & { ref?: React.Ref<ComboboxRef> },
      ref: React.Ref<ComboboxRef>,
    ) => {
      const [searchTextInternal, setSearchTextInternal] = useState(defaultSearchText);
      const searchText = searchTextProp ?? searchTextInternal;

      const [openInternal, setOpenInternal] = useState(defaultOpen ?? false);
      const open = openProp ?? openInternal;
      const setOpen = setOpenProp ?? setOpenInternal;
      if (
        (typeof searchTextProp === 'undefined' && typeof onSearchProp !== 'undefined') ||
        (typeof searchTextProp !== 'undefined' && typeof onSearchProp === 'undefined')
      )
        throw Error(
          'Combobox component must be fully controlled or uncontrolled: "searchText" and "onSearch" props must be provided together or not at all',
        );

      const handleSearch = useCallback((searchText: string) => {
        setSearchTextInternal(searchText);
      }, []);

      const onSearch = onSearchProp ?? handleSearch;

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

      const containerRef = useRef<View>(null);
      useImperativeHandle(ref, () =>
        Object.assign(containerRef.current as View, {
          open,
          setOpen,
          refs: { reference: containerRef, floating: null },
        }),
      );

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

      return (
        <View ref={ref}>
          <SelectControlComponent
            // accessibilityHint={accessibilityHint}
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
            onChange={(value) => onChange?.(value as ComboboxOptionValue | ComboboxOptionValue[])}
            open={open}
            options={options}
            placeholder={placeholder}
            removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
            setOpen={setOpen}
            startNode={startNode}
            style={styles?.control}
            styles={controlStyles}
            type="multi"
            value={value}
            variant={variant}
          />
          <ComboboxDropdownComponent
            ComboboxControlComponent={ComboboxControlComponent}
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
            onChange={(value) => onChange?.(value as ComboboxOptionValue | ComboboxOptionValue[])}
            onSearch={onSearch}
            open={open}
            options={filteredOptions}
            searchText={searchText}
            selectAllLabel={selectAllLabel}
            setOpen={setOpen}
            type="multi"
            // styles={dropdownStyles}
            value={value}
          />
        </View>
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
