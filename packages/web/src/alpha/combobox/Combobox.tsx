import { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';

import { NativeInput } from '../../controls/NativeInput';
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
      const optionsRef = useRef(options);
      optionsRef.current = options;

      const ComboboxControl = useMemo(
        () => (props: SelectControlProps<Type, SelectOptionValue>) => (
          <SelectControlComponent
            ref={controlRef.current?.refs.setReference}
            {...props}
            contentNode={
              <NativeInput
                onChange={(event) => setSearchText(event.target.value)}
                onKeyDown={(event) => {
                  event.stopPropagation();
                  if (
                    event.key === 'Enter' ||
                    (event.key.length === 1 && /[a-zA-Z0-9]/.test(event.key))
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
                value={searchTextRef.current}
              />
            }
            options={optionsRef.current}
            placeholder={null}
          />
        ),
        [SelectControlComponent, placeholder, setOpen, setSearchText],
      );

      return (
        <Select
          ref={controlRef}
          SelectControlComponent={ComboboxControl}
          accessibilityLabel={accessibilityLabel}
          defaultOpen={defaultOpen}
          onChange={(value) => onChange?.(value)}
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
