import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import Fuse from 'fuse.js';

import { Button } from '../../buttons/Button';
import { NativeInput } from '../../controls/NativeInput';
import { Box } from '../../layout';
import { StickyFooter } from '../../sticky-footer/StickyFooter';
import { DefaultSelectControl } from '../select/DefaultSelectControl';
import { DefaultSelectDropdown } from '../select/DefaultSelectDropdown';
import {
  Select,
  type SelectBaseProps,
  type SelectControlProps,
  type SelectDropdownProps,
  type SelectOption,
  type SelectProps,
  type SelectRef,
  type SelectType,
} from '../select/Select';
import type { SelectOptionList } from '../select/types';

export type ComboboxControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectControlProps<Type, SelectOptionValue> & {
  /** Search text value */
  searchText: string;
  /** Search text change handler */
  onSearch: (searchText: string) => void;
};

export type ComboboxControlComponent<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = React.FC<ComboboxControlProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLElement> }>;

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
  Pick<SelectProps<Type, SelectOptionValue>, 'styles'>;

export type ComboboxRef = SelectRef;

type ComboboxComponent = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: ComboboxProps<Type, SelectOptionValue> & { ref?: React.Ref<ComboboxRef> },
) => React.ReactElement;

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
        SelectDropdownComponent = DefaultSelectDropdown,
        hideSearchInput,
        ...props
      }: ComboboxProps<Type, SelectOptionValue>,
      ref: React.Ref<ComboboxRef>,
    ) => {
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

      // Store in refs to avoid recreating ComboboxControl on every search text change
      const searchTextRef = useRef(searchText);
      searchTextRef.current = searchText;
      const setSearchTextRef = useRef(setSearchText);
      setSearchTextRef.current = setSearchText;
      const valueRef = useRef(value);
      valueRef.current = value;
      const optionsRef = useRef(options);
      optionsRef.current = options;

      const handleSearchChange = useCallback((text: string) => {
        setSearchTextRef.current(text);
      }, []);

      const ComboboxControlComponent = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => {
          const hasValue =
            valueRef.current !== null &&
            !(Array.isArray(valueRef.current) && valueRef.current.length === 0);

          return (
            <SelectControlComponent
              {...props}
              contentNode={
                hideSearchInput ? null : (
                  <NativeInput
                    disabled={disabled || !open}
                    onChangeText={handleSearchChange}
                    onPress={() => !disabled && setOpen(true)}
                    placeholder={typeof placeholder === 'string' ? placeholder : undefined}
                    style={{
                      flex: 0,
                      flexGrow: 1,
                      flexShrink: 1,
                      minWidth: 0,
                      padding: 0,
                      paddingTop: valueRef.current?.length && valueRef.current?.length > 0 ? 8 : 0,
                      paddingBottom: 12,
                      // This is constrained by the parent container's width. The width is large
                      // to ensure it grows to fill the control
                      width: 300,
                    }}
                    value={searchTextRef.current}
                  />
                )
              }
              options={optionsRef.current}
              placeholder={null}
              styles={{
                controlValueNode: { marginBottom: hideSearchInput ? 0 : -12 },
                controlEndNode: {
                  alignItems: hasValue && !hideSearchInput ? 'flex-end' : 'center',
                },
              }}
              variant={variant}
            />
          );
        },
        [
          SelectControlComponent,
          disabled,
          handleSearchChange,
          hideSearchInput,
          open,
          placeholder,
          setOpen,
          variant,
        ],
      );

      // Store filtered options in a ref to avoid recreating the dropdown
      // when the filtered options change. Recreating the dropdown would
      // cause the tray inside to close and reopen
      const filteredOptionsRef = useRef(filteredOptions);
      filteredOptionsRef.current = filteredOptions;

      const ComboboxDropdownComponent = useCallback(
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
                <ComboboxControlComponent
                  endNode={endNode}
                  startNode={startNode}
                  {...props}
                  label={null}
                  styles={undefined}
                />
              </Box>
            }
            options={filteredOptionsRef.current}
          />
        ),
        [
          ComboboxControlComponent,
          SelectDropdownComponent,
          closeButtonLabel,
          endNode,
          label,
          setOpen,
          startNode,
        ],
      );

      return (
        <Select
          ref={controlRef}
          SelectControlComponent={ComboboxControlComponent}
          SelectDropdownComponent={ComboboxDropdownComponent}
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
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
