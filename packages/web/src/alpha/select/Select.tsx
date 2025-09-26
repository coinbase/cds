import { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { flip, useFloating, type UseFloatingReturn } from '@floating-ui/react-dom';

import type { CellBaseProps } from '../../cells/Cell';
import type { InputStackBaseProps } from '../../controls/InputStack';
import { cx } from '../../cx';
import type { AriaHasPopupType } from '../../hooks/useA11yControlledVisibility';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useHasMounted } from '../../hooks/useHasMounted';
import { Portal } from '../../overlays/Portal';
import { modalContainerId } from '../../overlays/PortalProvider';
import type { InteractableBlendStyles } from '../../system/Interactable';

import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectOption } from './DefaultSelectOption';

export const defaultAccessibilityRoles: SelectProps['accessibilityRoles'] = {
  dropdown: 'listbox',
  option: 'option',
};

// TO DO: Should we allow more customization here?
export type SelectOption = {
  value: string | null;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
};

export type SelectOptionProps<Type extends 'single' | 'multi' = 'single'> = SelectOption &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<SelectProps, 'compact' | 'style' | 'className'> & {
    onClick?: (value: string | null) => void;
    type?: Type;
    selected?: boolean;
    multiline?: boolean;
    blendStyles?: InteractableBlendStyles;
    accessibilityRole?: string;
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
  'disabled' | 'startNode' | 'variant' | 'testID'
> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Pick<
    SelectProps,
    'options' | 'label' | 'placeholder' | 'helperText' | 'compact' | 'style' | 'className'
  > &
  SelectState<Type> & {
    type?: Type;
    open: boolean;
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    maxSelectedOptionsToShow?: number;
    blendStyles?: InteractableBlendStyles;
    ariaHaspopup?: AriaHasPopupType;
  };

export type SelectControlComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectControlProps<Type> & {
    ref: React.Ref<HTMLElement>;
  }
>;

export type SelectDropdownProps<Type extends 'single' | 'multi' = 'single'> = SelectState<Type> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<
    SelectProps,
    | 'selectAllLabel'
    | 'emptyOptionsLabel'
    | 'clearAllLabel'
    | 'SelectEmptyOptionsComponent'
    | 'disabled'
    | 'hideSelectAll'
    | 'accessibilityRoles'
    | 'style'
    | 'className'
    | 'compact'
  > & {
    type?: Type;
    options: (SelectOption &
      Pick<CellBaseProps, 'accessory' | 'media'> & { Component?: SelectOptionComponent<Type> })[];
    open: boolean;
    setOpen: (open: boolean | ((open: boolean) => boolean)) => void;
    controlRef: React.MutableRefObject<HTMLElement | null>;
    styles?: {
      root?: React.CSSProperties;
      option?: React.CSSProperties;
      optionBlendStyles?: InteractableBlendStyles;
    };
    classNames?: {
      root?: string;
      option?: string;
    };
    SelectOptionComponent?: SelectOptionComponent<Type>;
    SelectAllOptionComponent?: SelectOptionComponent<Type>;
  };

export type SelectDropdownComponent<Type extends 'single' | 'multi' = 'single'> = React.FC<
  SelectDropdownProps<Type> & {
    ref: React.Ref<HTMLElement>;
  }
>;

export type SelectProps<Type extends 'single' | 'multi' = 'single'> = Pick<
  InputStackBaseProps,
  'startNode' | 'variant' | 'disabled'
> &
  Pick<CellBaseProps, 'accessory' | 'media' | 'detail'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  SelectState<Type> & {
    type?: Type;
    options: SelectOption[];
    open?: boolean;
    setOpen?: (open: boolean | ((open: boolean) => boolean)) => void;
    disableClickOutsideClose?: boolean;
    placeholder?: React.ReactNode;
    helperText?: React.ReactNode;
    selectAllLabel?: string;
    emptyOptionsLabel?: string;
    clearAllLabel?: string;
    hideSelectAll?: boolean;
    label?: React.ReactNode;
    accessibilityRoles?: {
      dropdown?: AriaHasPopupType;
      option?: string;
    };
    compact?: boolean;
    defaultOpen?: boolean;
    maxSelectedOptionsToShow?: number;
    SelectDropdownComponent?: SelectDropdownComponent<Type>;
    SelectControlComponent?: SelectControlComponent<Type>;
    SelectOptionComponent?: SelectOptionComponent<Type>;
    SelectAllOptionComponent?: SelectOptionComponent<Type>;
    SelectEmptyOptionsComponent?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    styles?: {
      root?: React.CSSProperties;
      control?: React.CSSProperties;
      dropdown?: React.CSSProperties;
      option?: React.CSSProperties;
      optionBlendStyles?: InteractableBlendStyles;
      controlBlendStyles?: InteractableBlendStyles;
    };
    classNames?: {
      root?: string;
      control?: string;
      dropdown?: string;
      option?: string;
    };
    testID?: string;
  };

export type SelectRef = HTMLElement &
  Pick<SelectProps, 'open' | 'setOpen'> & {
    refs: UseFloatingReturn['refs'];
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
        accessibilityLabel,
        accessibilityRoles = defaultAccessibilityRoles,
        selectAllLabel,
        emptyOptionsLabel,
        clearAllLabel,
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
        style,
        styles,
        className,
        classNames,
        testID,
        ...props
      }: SelectProps<Type>,
      ref: React.Ref<SelectRef>,
    ) => {
      const hasMounted = useHasMounted();
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

      const rootStyles = useMemo(
        () => ({
          ...style,
          ...styles?.root,
        }),
        [style, styles?.root],
      );

      const { refs, floatingStyles } = useFloating({
        open,
        middleware: [flip()],
      });

      useClickOutside(() => !disableClickOutsideClose && setOpen(false), {
        ref: refs.floating,
        excludeRefs: [refs.reference as React.MutableRefObject<HTMLElement>],
      });

      const containerRef = useRef<HTMLElement>(null);

      useImperativeHandle(ref, () =>
        Object.assign(containerRef.current as HTMLElement, {
          open,
          setOpen,
          refs,
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
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className={cx(classNames?.root, className)}
          data-testid={testID}
          style={rootStyles}
        >
          <SelectControlComponent
            ref={refs.setReference}
            accessibilityLabel={accessibilityLabel}
            ariaHaspopup={accessibilityRoles?.dropdown}
            blendStyles={styles?.controlBlendStyles}
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
          <Portal containerId={modalContainerId}>
            <SelectDropdownComponent
              ref={refs.setFloating}
              SelectAllOptionComponent={SelectAllOptionComponent}
              SelectEmptyOptionsComponent={SelectEmptyOptionsComponent}
              SelectOptionComponent={SelectOptionComponent}
              accessibilityLabel={accessibilityLabel}
              accessibilityRoles={accessibilityRoles}
              accessory={accessory}
              classNames={{
                root: classNames?.dropdown,
                option: classNames?.option,
              }}
              clearAllLabel={clearAllLabel}
              compact={compact}
              controlRef={refs.reference as React.MutableRefObject<HTMLElement>}
              detail={detail}
              disabled={disabled}
              emptyOptionsLabel={emptyOptionsLabel}
              hideSelectAll={hideSelectAll}
              media={media}
              onChange={onChange}
              open={hasMounted && open}
              options={options}
              selectAllLabel={selectAllLabel}
              setOpen={setOpen}
              styles={{
                root: { ...floatingStyles, ...styles?.dropdown },
                option: styles?.option,
                optionBlendStyles: styles?.optionBlendStyles,
              }}
              type={type}
              value={sortedValue}
            />
          </Portal>
        </div>
      );
    },
  ),
);

export const Select = SelectBase as SelectComponent;
