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
import Fuse from 'fuse.js';

import type { SelectOptionList } from '../select';
import { DefaultSelectControl } from '../select/DefaultSelectControl';
import type {
  SelectBaseProps,
  SelectControlComponent,
  SelectControlProps,
  SelectOption,
  SelectProps,
  SelectRef,
  SelectType,
} from '../select/Select';
import { Select } from '../select/Select';

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
  /** Custom ComboboxControlComponent to wrap SelectControlComponent. This component must be a stable reference */
  ComboboxControlComponent?: ComboboxControlComponent;
};

export type ComboboxProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = ComboboxBaseProps<Type, SelectOptionValue> &
  Pick<SelectProps<Type, SelectOptionValue>, 'styles' | 'classNames'>;

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
        accessibilityLabel,
        controlAccessibilityLabel,
        defaultOpen,
        searchText: searchTextProp,
        onSearch: onSearchProp,
        defaultSearchText = '',
        filterFunction,
        SelectControlComponent = DefaultSelectControl,
        ComboboxControlComponent = DefaultComboboxControl,
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

      const fallbackAccessibilityLabel = typeof label === 'string' ? label : 'Combobox dropdown';
      const fallbackControlAccessibilityLabel =
        typeof label === 'string' ? label : 'Combobox control';

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

      const ComboboxControl = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => (
          <ComboboxControlContextAdapter
            {...props}
            ComboboxControlComponent={ComboboxControlComponent}
            SelectControlComponent={SelectControlComponent}
            controlRef={controlRef}
          />
        ),
        [SelectControlComponent, ComboboxControlComponent],
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
            accessibilityLabel={accessibilityLabel ?? fallbackAccessibilityLabel}
            controlAccessibilityLabel={
              controlAccessibilityLabel ?? fallbackControlAccessibilityLabel
            }
            defaultOpen={defaultOpen}
            label={label}
            onChange={handleChange}
            open={open}
            options={filteredOptions}
            setOpen={setOpen}
            type={type}
            value={value}
            {...props}
          />
        </ComboboxContext.Provider>
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
