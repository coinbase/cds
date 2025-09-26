import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { AccessibilityRole, StyleProp, ViewStyle } from 'react-native';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import type { InteractableBlendStyles } from '../../system/Interactable';

import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectOption } from './DefaultSelectOption';

export type SelectOption = {
  value: string | null;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type SelectOptionProps<Type extends 'single' | 'multi' = 'single'> = SelectOption &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<SelectProps, 'compact'> & {
    type?: Type;
    selected: boolean;
    indeterminate?: boolean;
    onChange: (value: string | null) => void;
    multiline?: boolean;
    style?: StyleProp<ViewStyle>;
    blendStyles?: InteractableBlendStyles;
    className?: string;
    accessibilityRole?: AccessibilityRole;
  };

export type SelectOptionComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectOptionProps<Type>
>;

type SelectState<Type extends 'single' | 'multi' = 'single'> = {
  value: Type extends 'multi' ? string[] : string | null;
  onChange: (value: Type extends 'multi' ? string | string[] : string | null) => void;
};

export type SelectControlProps<Type extends 'single' | 'multi' = 'single'> = Pick<
  InputStackBaseProps,
  'disabled' | 'startNode' | 'variant'
> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
  SelectState<Type> &
  Pick<SelectProps, 'options' | 'label' | 'placeholder' | 'helperText' | 'compact'> & {
    type?: Type;
    open: boolean;
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    className?: string;
    style?: StyleProp<ViewStyle>;
    maxSelectedOptionsToShow?: number;
  };

export type SelectControlComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectControlProps<Type> & {
    ref: React.Ref<any>;
  }
>;

export type SelectDropdownProps<Type extends 'single' | 'multi' = 'single'> = SelectState<Type> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<
    SelectProps,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'SelectEmptyOptionsComponent'
    | 'label'
    | 'disabled'
    | 'compact'
    | 'hideSelectAll'
  > & {
    type?: Type;
    options: (SelectOption &
      Pick<CellBaseProps, 'accessory' | 'media'> & { Component?: SelectOptionComponent<Type> })[];
    open: boolean;
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    controlRef: React.MutableRefObject<any>;
    styles?: {
      dropdown?: StyleProp<ViewStyle>;
      option?: StyleProp<ViewStyle>;
      optionBlendStyles?: InteractableBlendStyles;
    };
    classNames?: {
      option?: string;
    };
    SelectOptionComponent?: SelectOptionComponent<Type>;
    SelectAllOptionComponent?: SelectOptionComponent<Type>;
    accessibilityRoles?: {
      option?: AccessibilityRole;
    };
  };

export type SelectDropdownComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectDropdownProps<Type> & {
    ref: React.Ref<any>;
  }
>;

export type SelectProps<Type extends 'single' | 'multi' = 'single'> = Pick<
  InputStackBaseProps,
  'startNode' | 'variant'
> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> &
  SelectState<Type> & {
    type?: Type;
    options: SelectOption[];
    open?: boolean;
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    disabled?: boolean;
    disableClickOutsideClose?: boolean;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    selectAllLabel?: string;
    emptyOptionsLabel?: string;
    hideSelectAll?: boolean;
    clearAllLabel?: string;
    label?: React.ReactNode;
    compact?: boolean;
    defaultOpen?: boolean;
    maxSelectedOptionsToShow?: number;
    SelectDropdownComponent?: SelectDropdownComponent<Type>;
    SelectControlComponent?: SelectControlComponent<Type>;
    SelectOptionComponent?: SelectOptionComponent<Type>;
    SelectAllOptionComponent?: SelectOptionComponent<Type>;
    SelectEmptyOptionsComponent?: React.ReactNode;
    styles?: {
      control?: StyleProp<ViewStyle>;
      dropdown?: StyleProp<ViewStyle>;
      option?: StyleProp<ViewStyle>;
      optionBlendStyles?: InteractableBlendStyles;
    };
    classNames?: {
      control?: string;
      option?: string;
    };
    accessibilityRoles?: {
      option?: AccessibilityRole;
    };
  };

export type SelectRef = any &
  Pick<SelectProps, 'open' | 'setOpen'> & {
    refs: any;
  };

type SelectComponent = <Type extends 'single' | 'multi' = 'single'>(
  props: SelectProps<Type> & { ref?: React.Ref<SelectRef> },
) => React.ReactElement;

const SelectBase = memo(
  forwardRef(
    <Type extends 'single' | 'multi' = 'single'>(
      {
        value,
        type = 'single' as Type,
        options,
        onChange,
        open: openProp,
        setOpen: setOpenProp,
        disabled,
        disableClickOutsideClose,
        placeholder,
        helperText,
        compact,
        label,
        clearAllLabel,
        selectAllLabel,
        emptyOptionsLabel,
        hideSelectAll,
        defaultOpen,
        startNode,
        variant,
        maxSelectedOptionsToShow,
        accessory,
        media,
        detail,
        SelectOptionComponent = DefaultSelectOption as SelectOptionComponent<Type>,
        SelectAllOptionComponent,
        SelectDropdownComponent = DefaultSelectDropdown as SelectDropdownComponent<Type>,
        SelectControlComponent = DefaultSelectControl as SelectControlComponent<Type>,
        SelectEmptyOptionsComponent,
        styles,
        classNames,
        accessibilityLabel,
        accessibilityHint,
        accessibilityRoles,
        ...props
      }: SelectProps<Type>,
      ref: React.Ref<SelectRef>,
    ) => {
      const isMultiSelect = type === 'multi';

      const [openInternal, setOpenInternal] = useState(defaultOpen ?? false);
      const open = openProp ?? openInternal;
      const setOpen = setOpenProp ?? setOpenInternal;

      if (
        (typeof openProp === 'undefined' && typeof setOpenProp !== 'undefined') ||
        (typeof openProp !== 'undefined' && typeof setOpenProp === 'undefined')
      )
        throw Error(
          'Select component must be fully controlled or uncontrolled: "open" and "setOpen" props must be provided together or not at all',
        );

      const controlRef = useRef<any>(null);

      useImperativeHandle(ref, () =>
        Object.assign(controlRef.current, {
          open,
          setOpen,
          refs: { reference: controlRef, floating: null },
        }),
      );

      // Sort order of value array to match options array order
      const sortedValue = useMemo(() => {
        if (!isMultiSelect) return value;
        return (value as string[]).sort((a, b) => {
          const aIndex = options.findIndex((o) => o.value === a);
          const bIndex = options.findIndex((o) => o.value === b);
          return aIndex - bIndex;
        });
      }, [isMultiSelect, value, options]) as Type extends 'multi' ? string[] : string | null;

      return (
        <>
          <SelectControlComponent
            ref={controlRef}
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            className={classNames?.control}
            compact={compact}
            disabled={disabled}
            helperText={helperText}
            label={label}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            onChange={onChange}
            open={open}
            options={options}
            placeholder={placeholder}
            setOpen={setOpen}
            startNode={startNode}
            style={styles?.control}
            type={type}
            value={sortedValue}
            variant={variant}
          />
          <SelectDropdownComponent
            ref={() => {}}
            SelectAllOptionComponent={SelectAllOptionComponent}
            SelectEmptyOptionsComponent={SelectEmptyOptionsComponent}
            SelectOptionComponent={SelectOptionComponent}
            accessibilityRoles={accessibilityRoles}
            accessory={accessory}
            classNames={{
              option: classNames?.option,
            }}
            clearAllLabel={clearAllLabel}
            compact={compact}
            controlRef={controlRef}
            detail={detail}
            disabled={disabled}
            emptyOptionsLabel={emptyOptionsLabel}
            hideSelectAll={hideSelectAll}
            label={label}
            media={media}
            onChange={onChange}
            open={open}
            options={options}
            selectAllLabel={selectAllLabel}
            setOpen={setOpen}
            styles={{
              dropdown: styles?.dropdown,
              option: styles?.option,
              optionBlendStyles: styles?.optionBlendStyles,
            }}
            type={type}
            value={sortedValue}
          />
        </>
      );
    },
  ),
);

export const Select = SelectBase as SelectComponent;
