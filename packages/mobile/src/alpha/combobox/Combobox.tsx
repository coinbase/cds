import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, type TextInput, View } from 'react-native';
import Fuse from 'fuse.js';

import { Button } from '../../buttons/Button';
import { NativeInput } from '../../controls/NativeInput';
import { useTheme } from '../../hooks/useTheme';
import { Box } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { DefaultSelectControl } from '../select/DefaultSelectControl';
import { DefaultSelectDropdown } from '../select/DefaultSelectDropdown';
import {
  Select,
  type SelectBaseProps,
  type SelectControlComponent,
  type SelectControlProps,
  type SelectDropdownProps,
  type SelectOption,
  type SelectProps,
  type SelectRef,
  type SelectType,
} from '../select/Select';
import type { SelectDropdownComponent, SelectOptionList } from '../select/types';

const ComboboxContext = createContext<{
  searchText: string;
  onSearch: (searchText: string) => void;
  searchInputRef: React.RefObject<TextInput>;
}>({
  searchText: '',
  onSearch: () => {},
  searchInputRef: { current: null },
});

const hasSelectedValue = (currentValue: unknown): boolean =>
  currentValue !== null &&
  typeof currentValue !== 'undefined' &&
  !(Array.isArray(currentValue) && currentValue.length === 0);

export type ComboboxControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectControlProps<Type, SelectOptionValue> &
  Pick<ComboboxBaseProps<Type, SelectOptionValue>, 'hideSearchInput'> & {
    /** Custom SelectControlComponent to wrap */
    SelectControlComponent?: SelectControlComponent<Type, SelectOptionValue>;
  };

type ComboboxControlComponentType = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: ComboboxControlProps<Type, SelectOptionValue>,
) => React.ReactElement;

export type ComboboxBaseProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectBaseProps<Type, SelectOptionValue> & {
  /** Controlled search text value */
  searchText?: string;
  /** Search text change handler */
  onSearch?: (searchText: string) => void;
  /** Custom filter function for searching options */
  filterFunction?: (
    options: SelectOptionList<Type, SelectOptionValue>,
    searchText: string,
  ) => SelectOption<SelectOptionValue>[];
  /** Default search text value for uncontrolled mode */
  defaultSearchText?: string;
  /** Hide the search input */
  hideSearchInput?: boolean;
  /** Label for close button when combobox is open (mobile only) */
  closeButtonLabel?: string;
};

export type ComboboxProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = ComboboxBaseProps<Type, SelectOptionValue> &
  Pick<SelectProps<Type, SelectOptionValue>, 'styles'> & {
    ComboboxControlComponent?: ComboboxControlComponentType;
    ComboboxDropdownComponent?: SelectDropdownComponent;
  };

export type ComboboxRef = SelectRef;

type ComboboxComponent = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: ComboboxProps<Type, SelectOptionValue> & { ref?: React.Ref<ComboboxRef> },
) => React.ReactElement;

/**
 * A control component for Combobox that wraps a SelectControlComponent with search input functionality.
 * Can be used standalone or as part of Combobox.
 */
export const DefaultComboboxControl = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>({
  SelectControlComponent = DefaultSelectControl,
  value,
  placeholder,
  hideSearchInput,
  options,
  open,
  setOpen,
  disabled,
  ...props
}: ComboboxControlProps<Type, SelectOptionValue>) => {
  const theme = useTheme();
  const { searchText, onSearch, searchInputRef } = useContext(ComboboxContext);
  const hasValue = hasSelectedValue(value);
  const shouldRenderSearchInput = !hideSearchInput && (!hasValue || open);

  return (
    <SelectControlComponent
      disabled={disabled}
      open={open}
      options={options}
      setOpen={setOpen}
      value={value}
      {...props}
      contentNode={
        shouldRenderSearchInput ? (
          <NativeInput
            ref={searchInputRef}
            disabled={disabled || !open}
            onChangeText={onSearch}
            onPress={() => !disabled && setOpen(true)}
            placeholder={typeof placeholder === 'string' ? placeholder : undefined}
            style={{
              flex: 0,
              flexGrow: 1,
              flexShrink: 1,
              minWidth: 0,
              padding: 0,
              height: hasValue ? 24 : 48,
              marginTop: hasValue ? 0 : -24,
              marginBottom: hasValue ? -12 : -24,
              paddingTop: hasValue ? 8 : 0,
              // This is constrained by the parent container's width. The width is large
              // to ensure it grows to fill the control
              width: 300,
            }}
            value={searchText}
          />
        ) : null
      }
      placeholder={null}
      styles={{
        ...props.styles,
        controlEndNode: {
          ...StyleSheet.flatten(props.styles?.controlEndNode),
          alignItems: hasValue && shouldRenderSearchInput ? 'flex-end' : 'center',
        },
        controlValueNode: {
          ...StyleSheet.flatten(props.styles?.controlValueNode),
          paddingBottom: hasValue && shouldRenderSearchInput ? theme.space[1.5] : 0,
        },
      }}
    />
  );
};

const ComboboxBase = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
      {
        type = 'single' as Type,
        value,
        onChange,
        options,
        open: openProp,
        setOpen: setOpenProp,
        label,
        placeholder,
        disabled,
        variant,
        startNode,
        endNode,
        accessibilityLabel = 'Combobox control',
        defaultOpen,
        searchText: searchTextProp,
        onSearch: onSearchProp,
        defaultSearchText = '',
        closeButtonLabel = 'Done',
        filterFunction,
        SelectControlComponent = DefaultSelectControl,
        ComboboxControlComponent = DefaultComboboxControl,
        SelectDropdownComponent = DefaultSelectDropdown,
        hideSearchInput,
        ...props
      }: ComboboxProps<Type, SelectOptionValue>,
      ref: React.Ref<ComboboxRef>,
    ) => {
      const [searchTextInternal, setSearchTextInternal] = useState(defaultSearchText);
      const searchText = searchTextProp ?? searchTextInternal;
      const setSearchText = onSearchProp ?? setSearchTextInternal;
      if ((typeof searchTextProp === 'undefined') !== (typeof onSearchProp === 'undefined')) {
        throw Error(
          'Combobox component must be fully controlled or uncontrolled: "searchText" and "onSearch" props must be provided together or not at all',
        );
      }

      const [openInternal, setOpenInternal] = useState(defaultOpen ?? false);
      const open = openProp ?? openInternal;
      const setOpen = setOpenProp ?? setOpenInternal;
      if ((typeof openProp === 'undefined') !== (typeof setOpenProp === 'undefined'))
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

      const handleChange = useCallback(
        (
          value: Type extends 'multi'
            ? SelectOptionValue | SelectOptionValue[] | null
            : SelectOptionValue | null,
        ) => {
          onChange?.(value);
        },
        [onChange],
      );

      const controlRef = useRef<ComboboxRef>(null);
      useImperativeHandle(ref, () =>
        Object.assign(controlRef.current as ComboboxRef, {
          open,
          setOpen,
        }),
      );

      const searchInputRef = useRef<TextInput | null>(null);
      const handleTrayVisibilityChange = useCallback((visibility: 'visible' | 'hidden') => {
        if (visibility === 'visible') {
          searchInputRef.current?.focus();
        }
      }, []);

      const ComboboxControl = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => {
          return (
            <ComboboxControlComponent
              {...props}
              SelectControlComponent={SelectControlComponent}
              hideSearchInput={hideSearchInput}
            />
          );
        },
        [ComboboxControlComponent, SelectControlComponent, hideSearchInput],
      );

      const ComboboxDropdown = useCallback(
        (props: SelectDropdownProps<Type, SelectOptionValue>) => (
          <SelectDropdownComponent
            label={label}
            minHeight={500}
            {...props}
            footer={
              <KeyboardAvoidingView
                behavior="padding"
                keyboardVerticalOffset={Platform.OS === 'ios' ? 86 : 0}
              >
                <View
                  style={
                    Platform.OS === 'android' ? { overflow: 'hidden', paddingTop: 4 } : undefined
                  }
                >
                  <StickyFooter
                    background="bg"
                    elevation={2}
                    style={{ shadowOffset: { width: 0, height: -32 }, shadowOpacity: 0.05 }}
                  >
                    <Button compact onPress={() => setOpen(false)}>
                      {closeButtonLabel}
                    </Button>
                  </StickyFooter>
                </View>
              </KeyboardAvoidingView>
            }
            header={
              <Box paddingX={3}>
                <ComboboxControl
                  endNode={endNode}
                  placeholder={placeholder}
                  startNode={startNode}
                  {...props}
                  label={null}
                  styles={undefined}
                />
              </Box>
            }
            onVisibilityChange={handleTrayVisibilityChange}
          />
        ),
        [
          ComboboxControl,
          SelectDropdownComponent,
          closeButtonLabel,
          endNode,
          handleTrayVisibilityChange,
          label,
          setOpen,
          startNode,
        ],
      );

      return (
        <ComboboxContext.Provider value={{ searchText, onSearch: setSearchText, searchInputRef }}>
          <Select
            ref={controlRef}
            SelectControlComponent={ComboboxControl}
            SelectDropdownComponent={ComboboxDropdown}
            accessibilityLabel={accessibilityLabel}
            defaultOpen={defaultOpen}
            disabled={disabled}
            endNode={endNode}
            label={label}
            onChange={handleChange}
            open={open}
            options={filteredOptions}
            placeholder={placeholder}
            setOpen={setOpen}
            startNode={startNode}
            type={type}
            value={value}
            variant={variant}
            {...props}
          />
        </ComboboxContext.Provider>
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
