import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Fuse from 'fuse.js';

import { NativeInput } from '../../controls/NativeInput';
import { NAVIGATION_KEYS } from '../../overlays/FocusTrap';
import { DefaultSelectControl } from '../select/DefaultSelectControl';
import type {
  SelectBaseProps,
  SelectControlProps,
  SelectOption,
  SelectProps,
  SelectRef,
  SelectType,
} from '../select/Select';
import { Select } from '../select/Select';
import type { SelectOptionList } from '../select';

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
        placeholder,
        accessibilityLabel = 'Combobox control',
        defaultOpen,
        searchText: searchTextProp,
        onSearch: onSearchProp,
        defaultSearchText = '',
        filterFunction,
        SelectControlComponent = DefaultSelectControl,
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

      // Store in refs to avoid recreating ComboboxControl on every search text change
      const searchTextRef = useRef(searchText);
      searchTextRef.current = searchText;
      const setSearchTextRef = useRef(setSearchText);
      setSearchTextRef.current = setSearchText;
      const valueRef = useRef(value);
      valueRef.current = value;
      const optionsRef = useRef(options);
      optionsRef.current = options;

      const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTextRef.current(event.target.value);
      }, []);

      const ComboboxControlComponent = useMemo(
        () => (props: SelectControlProps<Type, SelectOptionValue>) => {
          const hasValue =
            valueRef.current !== null &&
            !(Array.isArray(valueRef.current) && valueRef.current.length === 0);

          return (
            <SelectControlComponent
              ref={controlRef.current?.refs.setReference}
              {...props}
              contentNode={
                hideSearchInput ? null : (
                  <NativeInput
                    onChange={handleSearchChange}
                    onKeyDown={(event) => {
                      if (!NAVIGATION_KEYS.includes(event.key)) {
                        event.stopPropagation();
                      }
                      if (
                        event.key === 'Enter' ||
                        (!NAVIGATION_KEYS.includes(event.key) && !event.shiftKey)
                      ) {
                        setOpen(true);
                      }
                    }}
                    placeholder={typeof placeholder === 'string' ? placeholder : undefined}
                    style={{
                      padding: 0,
                      paddingTop: valueRef.current?.length && valueRef.current?.length > 0 ? 8 : 0,
                      width: '100%',
                    }}
                    tabIndex={0}
                    value={searchTextRef.current}
                  />
                )
              }
              options={optionsRef.current}
              placeholder={null}
              styles={{
                controlEndNode: {
                  alignItems: hasValue && !hideSearchInput ? 'flex-end' : 'center',
                },
              }}
              tabIndex={-1}
            />
          );
        },
        [SelectControlComponent, handleSearchChange, hideSearchInput, placeholder, setOpen],
      );

      return (
        <Select
          ref={controlRef}
          SelectControlComponent={ComboboxControlComponent}
          accessibilityLabel={accessibilityLabel}
          defaultOpen={defaultOpen}
          onChange={handleChange}
          open={open}
          options={filteredOptions}
          placeholder={placeholder}
          setOpen={setOpen}
          type={type}
          value={value}
          {...props}
        />
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
