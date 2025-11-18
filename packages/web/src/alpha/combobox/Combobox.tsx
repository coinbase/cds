import { forwardRef, memo, useCallback, useMemo, useRef, useState } from 'react';
import Fuse from 'fuse.js';

import { NativeInput } from '../../controls/NativeInput';
import { DefaultSelectControl } from '../select/DefaultSelectControl';
import {
  Select,
  type SelectBaseProps,
  type SelectControlProps,
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
      const controlRef = useRef<ComboboxRef>(null);

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

      // const control = (
      //   <ComboboxControlComponent
      //     ref={controlRef.current?.refs.setReference}
      //     accessibilityLabel={accessibilityLabel}
      //     ariaHaspopup={accessibilityRoles?.dropdown}
      //     classNames={classNames}
      //     compact={compact}
      //     disabled={disabled}
      //     endNode={endNode}
      //     helperText={helperText}
      //     hiddenSelectedOptionsLabel={hiddenSelectedOptionsLabel}
      //     label={label}
      //     labelVariant={labelVariant}
      //     maxSelectedOptionsToShow={maxSelectedOptionsToShow}
      //     onChange={(value) => onChange?.(value)}
      //     onSearch={setSearchText}
      //     open={open}
      //     options={options}
      //     placeholder={placeholder}
      //     removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
      //     searchText={searchText}
      //     setOpen={setOpen}
      //     startNode={startNode}
      //     styles={styles}
      //     value={value}
      //     variant={variant}
      //   />
      // );

      const ComboboxControl = useCallback(
        (props: SelectControlProps<Type, SelectOptionValue>) => (
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
                style={{ padding: 0 }}
              />
            }
            options={options}
            placeholder={null}
          />
        ),
        [SelectControlComponent, options, placeholder, setOpen, setSearchText],
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
          {...props}
        />
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
