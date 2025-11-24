import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { KeyboardAvoidingView } from 'react-native';
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
    options: SelectOption<SelectOptionValue>[],
    searchText: string,
  ) => SelectOption<SelectOptionValue>[];
  /** Default search text value for uncontrolled mode */
  defaultSearchText?: string;
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
        accessibilityLabel = 'Combobox control',
        defaultOpen,
        searchText: searchTextProp,
        onSearch: onSearchProp,
        defaultSearchText = '',
        closeButtonLabel = 'Done',
        filterFunction,
        SelectControlComponent = DefaultSelectControl,
        SelectDropdownComponent = DefaultSelectDropdown,
        ...props
      }: ComboboxProps<Type, SelectOptionValue>,
      ref: React.Ref<ComboboxRef>,
    ) => {
      const hasValue = value !== null && !(Array.isArray(value) && value.length === 0);

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
      const valueRef = useRef(value);
      valueRef.current = value;

      const ComboboxControlComponent = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => (
          <SelectControlComponent
            {...props}
            contentNode={
              <NativeInput
                disabled={disabled || !open}
                onChangeText={(text) => setSearchText(text)}
                onPress={() => !disabled && setOpen(true)}
                placeholder={typeof placeholder === 'string' ? placeholder : undefined}
                style={{
                  flex: 0,
                  padding: 0,
                  paddingTop: valueRef.current?.length && valueRef.current?.length > 0 ? 8 : 0,
                }}
                value={searchTextRef.current}
              />
            }
            placeholder={null}
            styles={{
              controlEndNode: { alignItems: hasValue ? 'flex-end' : 'center', flex: 1 },
            }}
            variant={variant}
          />
        ),
        [
          SelectControlComponent,
          disabled,
          hasValue,
          open,
          placeholder,
          setOpen,
          setSearchText,
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
              <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={86}>
                <StickyFooter background="bg">
                  <Button compact onPress={() => setOpen(false)}>
                    {closeButtonLabel}
                  </Button>
                </StickyFooter>
              </KeyboardAvoidingView>
            }
            header={
              <Box paddingX={3}>
                <ComboboxControlComponent {...props} label={null} styles={undefined} />
              </Box>
            }
            options={filteredOptionsRef.current}
          />
        ),
        [ComboboxControlComponent, SelectDropdownComponent, closeButtonLabel, label, setOpen],
      );

      return (
        <Select
          ref={controlRef}
          SelectControlComponent={ComboboxControlComponent}
          SelectDropdownComponent={ComboboxDropdownComponent}
          accessibilityLabel={accessibilityLabel}
          defaultOpen={defaultOpen}
          disabled={disabled}
          label={label}
          onChange={(value) => onChange?.(value)}
          open={open}
          options={options}
          placeholder={placeholder}
          setOpen={setOpen}
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
