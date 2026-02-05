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
import { KeyboardAvoidingView, Platform, type TextInput, View } from 'react-native';
import Fuse from 'fuse.js';

import { Button } from '../../buttons/Button';
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

import { DefaultComboboxControl } from './DefaultComboboxControl';

type ComboboxContextValue<
  Type extends SelectType = SelectType,
  SelectOptionValue extends string = string,
> = {
  options: SelectOptionList<Type, SelectOptionValue>;
  searchText: string;
  onSearch: (searchText: string) => void;
  hideSearchInput: boolean;
};

/**
 * Context used for Combobox props needed to render to the ComboboxControlComponent.
 * We use the any type here because the concrete type is not known at this point.
 * The unknown type does not satisfy the SelectType type.
 */
const ComboboxContext = createContext<ComboboxContextValue<any, any> | null>(null);

const useComboboxContext = <
  Type extends SelectType = SelectType,
  SelectOptionValue extends string = string,
>() => {
  const context = useContext(
    ComboboxContext as React.Context<ComboboxContextValue<Type, SelectOptionValue> | null>,
  );
  if (!context) {
    throw new Error('Combobox components must be used within ComboboxContext.Provider');
  }
  return context;
};

export type ComboboxControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = SelectControlProps<Type, SelectOptionValue> &
  Pick<ComboboxBaseProps<Type, SelectOptionValue>, 'hideSearchInput'> & {
    /** Search text value */
    searchText: string;
    /** Search text change handler */
    onSearch: (searchText: string) => void;
    /** Reference to the search input */
    searchInputRef: React.RefObject<TextInput>;
    /** Reference to the combobox control for positioning */
    controlRef: React.RefObject<ComboboxRef | null>;
    /** Custom SelectControlComponent to wrap */
    SelectControlComponent?: SelectControlComponent<Type, SelectOptionValue>;
  };

export type ComboboxControlComponent = <
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
    ComboboxControlComponent?: ComboboxControlComponent;
    ComboboxDropdownComponent?: SelectDropdownComponent;
  };

export type ComboboxRef = SelectRef;

type ComboboxComponent = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: ComboboxProps<Type, SelectOptionValue> & { ref?: React.Ref<ComboboxRef> },
) => React.ReactElement;

type ComboboxControlContextAdapterType = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: Omit<ComboboxControlProps<Type, SelectOptionValue>, 'onSearch' | 'searchText'> & {
    ComboboxControlComponent: ComboboxControlComponent;
  },
) => React.ReactElement;

/**
 * Wraps the ComboboxControlComponent with passed in props and the ComboboxContext values.
 * This allows the usage of all props when wanting to use a custom SelectControlComponent in Combobox.
 * Otherwise, a customer using a custom component would need to use props and context to get the
 * <ComboboxControlComponent> rendering correctly.
 */
const ComboboxControlContextAdapter = memo(
  <Type extends SelectType = 'single', SelectOptionValue extends string = string>({
    ComboboxControlComponent,
    ...props
  }: Omit<ComboboxControlProps<Type, SelectOptionValue>, 'onSearch' | 'searchText'> & {
    ComboboxControlComponent: ComboboxControlComponent;
  }) => {
    const { searchText, onSearch, hideSearchInput, options } = useComboboxContext<
      Type,
      SelectOptionValue
    >();
    return (
      <ComboboxControlComponent
        {...props}
        hideSearchInput={hideSearchInput}
        onSearch={onSearch}
        options={options}
        searchText={searchText}
      />
    );
  },
) as ComboboxControlContextAdapterType;

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
        align,
        accessibilityLabel = typeof label === 'string' ? label : 'Combobox control',
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
            <ComboboxControlContextAdapter
              {...props}
              ComboboxControlComponent={ComboboxControlComponent}
              SelectControlComponent={SelectControlComponent}
              controlRef={controlRef}
              searchInputRef={searchInputRef}
            />
          );
        },
        [ComboboxControlComponent, SelectControlComponent, searchInputRef],
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
                  accessibilityLabel={accessibilityLabel}
                  align={align}
                  endNode={endNode}
                  placeholder={placeholder}
                  startNode={startNode}
                  variant={variant}
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
          accessibilityLabel,
          align,
          closeButtonLabel,
          endNode,
          handleTrayVisibilityChange,
          label,
          placeholder,
          setOpen,
          startNode,
          variant,
        ],
      );

      return (
        <ComboboxContext.Provider
          value={{
            searchText,
            onSearch: setSearchText,
            hideSearchInput: hideSearchInput ?? false,
            options,
          }}
        >
          <Select
            ref={controlRef}
            SelectControlComponent={ComboboxControl}
            SelectDropdownComponent={ComboboxDropdown}
            accessibilityLabel={accessibilityLabel}
            align={align}
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
