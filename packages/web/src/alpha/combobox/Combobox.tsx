import {
  createContext,
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Fuse from 'fuse.js';

import { NativeInput } from '../../controls/NativeInput';
import { NAVIGATION_KEYS } from '../../overlays/FocusTrap';
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

const ComboboxContext = createContext<{
  searchText: string;
  onSearch: (searchText: string) => void;
}>({
  searchText: '',
  onSearch: () => {},
});

const hasSelectedValue = (currentValue: unknown): boolean =>
  currentValue !== null &&
  typeof currentValue !== 'undefined' &&
  !(Array.isArray(currentValue) && currentValue.length === 0);

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

export type ComboboxControlProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = Omit<SelectControlProps<Type, SelectOptionValue>, 'options'> &
  Pick<ComboboxBaseProps<Type, SelectOptionValue>, 'hideSearchInput'> & {
    /** Reference to the combobox control for positioning */
    controlRef: React.RefObject<ComboboxRef | null>;
    /** Full options list (not filtered) for displaying selected values */
    options: SelectOptionList<Type, SelectOptionValue>;
    /** Custom SelectControlComponent to wrap */
    SelectControlComponent?: SelectControlComponent<Type, SelectOptionValue>;
  };

type ComboboxControlComponentType = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: ComboboxControlProps<Type, SelectOptionValue>,
) => React.ReactElement;

export type ComboboxProps<
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
> = ComboboxBaseProps<Type, SelectOptionValue> &
  Pick<SelectProps<Type, SelectOptionValue>, 'styles' | 'classNames'> & {
    ComboboxControlComponent?: ComboboxControlComponentType;
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
export const DefaultComboboxControl = memo(
  <Type extends SelectType = 'single', SelectOptionValue extends string = string>({
    SelectControlComponent = DefaultSelectControl,
    value,
    placeholder,
    controlRef,
    hideSearchInput,
    options,
    open,
    setOpen,
    ...props
  }: ComboboxControlProps<Type, SelectOptionValue>) => {
    const { searchText, onSearch } = useContext(ComboboxContext);
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    const hasValue = hasSelectedValue(value);
    const shouldShowSearchInput = !hideSearchInput && (!hasValue || open);

    useEffect(() => {
      if (shouldShowSearchInput) {
        searchInputRef.current?.focus();
      }
    }, [shouldShowSearchInput]);

    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
      },
      [onSearch],
    );

    const handleOpen = useCallback(() => {
      setOpen(true);
    }, [setOpen]);

    return (
      <SelectControlComponent
        ref={controlRef.current?.refs.setReference}
        open={open}
        options={options}
        setOpen={setOpen}
        value={value}
        {...props}
        contentNode={
          shouldShowSearchInput ? (
            <NativeInput
              ref={searchInputRef}
              onChange={handleSearchChange}
              onClick={(event) => hasValue && event.stopPropagation()}
              onKeyDown={(event) => {
                if (!NAVIGATION_KEYS.includes(event.key)) {
                  event.stopPropagation();
                }
                if (
                  event.key === 'Enter' ||
                  (!NAVIGATION_KEYS.includes(event.key) && !event.shiftKey)
                ) {
                  handleOpen();
                }
              }}
              placeholder={typeof placeholder === 'string' ? placeholder : undefined}
              style={{
                paddingLeft: 0,
                paddingRight: 0,
                height: hasValue ? 24 : 48,
                width: '100%',
              }}
              tabIndex={0}
              value={searchText}
            />
          ) : null
        }
        placeholder={null}
        styles={{
          ...props.styles,
          controlEndNode: {
            ...props.styles?.controlEndNode,
            alignItems: hasValue && shouldShowSearchInput ? 'flex-end' : 'center',
          },
          controlValueNode: {
            ...props.styles?.controlValueNode,
            paddingTop: hasValue ? 'var(--space-1_5)' : 0,
            paddingBottom: hasValue ? 'var(--space-1_5)' : 0,
          },
        }}
        tabIndex={shouldShowSearchInput ? -1 : 0}
      />
    );
  },
) as ComboboxControlComponentType;

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
          <ComboboxControlComponent
            {...props}
            controlRef={controlRef}
            hideSearchInput={hideSearchInput}
            options={options}
          />
        ),
        [ComboboxControlComponent, hideSearchInput, controlRef, options],
      );

      return (
        <ComboboxContext.Provider value={{ searchText, onSearch: setSearchText }}>
          <Select
            ref={controlRef}
            SelectControlComponent={ComboboxControl}
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
        </ComboboxContext.Provider>
      );
    },
  ),
);

export const Combobox = ComboboxBase as ComboboxComponent;
