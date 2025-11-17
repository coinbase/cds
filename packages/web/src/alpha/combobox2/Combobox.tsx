import { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';

import { TextInput, type TextInputProps } from '../../controls/TextInput';
import {
  Select,
  type SelectControlProps,
  type SelectOption,
  type SelectProps,
  type SelectRef,
} from '../select/Select';

import { DefaultComboboxSelectControl } from './DefaultComboboxControl';

type ComboboxSelectControlProps<Type extends 'single' | 'multi' = 'single'> =
  SelectControlProps<Type> & {
    searchText: string;
    onSearch: (text: string) => void;
  };

export type ComboboxSelectControlComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  ComboboxSelectControlProps<Type> & { ref: React.Ref<SelectRef> }
>;

type ComboboxProps<Type extends 'single' | 'multi' = 'single'> = Omit<
  SelectProps<Type>,
  'SelectControlComponent'
> &
  Pick<TextInputProps, 'align' | 'helperText'> & {
    searchText?: string;
    onSearch?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    defaultSearchText?: string;
    SelectControlComponent?: ComboboxSelectControlComponent<Type>;
    filterFunction?: (options: SelectOption[], searchText: string) => SelectOption[];
  };

type ComboboxComponent = <Type extends 'single' | 'multi' = 'single'>(
  props: ComboboxProps<Type> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const ComboboxBase = memo(
  forwardRef(
    <Type extends 'single' | 'multi' = 'single'>(
      {
        type,
        options,
        value,
        onChange,
        searchText: searchTextProp,
        onSearch: onSearchProp,
        defaultSearchText = '',
        disabled,
        placeholder,
        defaultOpen,
        SelectOptionComponent,
        SelectDropdownComponent,
        // TO DO: Remove SelectControlComponent and add Combobox subcomponent props
        SelectControlComponent = DefaultComboboxSelectControl as ComboboxSelectControlComponent<Type>,
        filterFunction,
        // TO DO: Handle these props
        ...props
      }: ComboboxProps<Type>,
      ref: React.Ref<SelectRef>,
    ) => {
      const internalRef = useRef<SelectRef>(null);
      const [open, setOpen] = useState(defaultOpen ?? false);
      const [searchTextInternal, setSearchTextInternal] = useState(defaultSearchText);
      const searchText = searchTextProp ?? searchTextInternal;

      const handleSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => setSearchTextInternal(event.target.value),
        [],
      );

      const onSearch = onSearchProp ?? handleSearch;

      const fuse = useMemo(() => new Fuse(options, { keys: ['label'] }), [options]);

      const filteredOptions = useMemo(() => {
        if (searchText.length === 0) return options;
        if (filterFunction) return filterFunction(options, searchText);
        return fuse.search(searchText).map((result) => result.item);
      }, [filterFunction, fuse, options, searchText]);

      return (
        <div>
          <TextInput
            ref={internalRef.current?.refs.setReference}
            onBlur={() => setOpen(false)}
            onChange={onSearch}
            onFocus={() => setOpen(true)}
            value={searchText}
          />
          <Select
            ref={internalRef}
            SelectControlComponent={() => null}
            SelectDropdownComponent={SelectDropdownComponent}
            SelectOptionComponent={SelectOptionComponent}
            defaultOpen={defaultOpen}
            disabled={disabled}
            onChange={onChange}
            open={open}
            options={filteredOptions}
            placeholder={placeholder}
            setOpen={setOpen}
            type={type}
            value={value}
          />
        </div>
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
