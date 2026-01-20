import React, { forwardRef, memo, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectControl } from './DefaultSelectControl';
import { DefaultSelectDropdown } from './DefaultSelectDropdown';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';
import { DefaultSelectOptionGroup } from './DefaultSelectOptionGroup';
import {
  isSelectOptionGroup,
  type SelectComponent,
  type SelectDropdownProps,
  type SelectProps,
  type SelectRef,
  type SelectType,
} from './types';

export const defaultAccessibilityRoles: SelectDropdownProps['accessibilityRoles'] = {
  option: 'menuitem',
};

// Re-export all types for backward compatibility
export type {
  SelectBaseProps,
  SelectComponent,
  SelectControlComponent,
  SelectControlProps,
  SelectDropdownComponent,
  SelectDropdownProps,
  SelectEmptyDropdownContentComponent,
  SelectEmptyDropdownContentProps,
  SelectOption,
  SelectOptionComponent,
  SelectOptionCustomUI,
  SelectOptionGroup,
  SelectOptionGroupComponent,
  SelectOptionGroupCustomUI,
  SelectOptionGroupProps,
  SelectOptionProps,
  SelectProps,
  SelectRef,
  SelectType,
} from './types';

export { isSelectOptionGroup };

const SelectBase = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
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
        labelVariant,
        accessibilityLabel = type === 'multi' ? 'Multi select control' : undefined,
        accessibilityHint,
        accessibilityRoles = defaultAccessibilityRoles,
        selectAllLabel,
        emptyOptionsLabel,
        clearAllLabel,
        hideSelectAll,
        defaultOpen,
        startNode,
        endNode,
        variant,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        removeSelectedOptionAccessibilityLabel,
        accessory,
        media,
        end,
        bordered = true,
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectDropdownComponent = DefaultSelectDropdown,
        SelectControlComponent = DefaultSelectControl,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents,
        SelectOptionGroupComponent = DefaultSelectOptionGroup,
        style,
        styles,
        testID,
        ...props
      }: SelectProps<Type, SelectOptionValue>,
      ref: React.Ref<SelectRef>,
    ) => {
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

      const rootStyles = useMemo(() => {
        return [style, styles?.root];
      }, [style, styles?.root]);

      const controlStyles = useMemo(
        () => ({
          controlStartNode: styles?.controlStartNode,
          controlInputNode: styles?.controlInputNode,
          controlValueNode: styles?.controlValueNode,
          controlLabelNode: styles?.controlLabelNode,
          controlHelperTextNode: styles?.controlHelperTextNode,
          controlEndNode: styles?.controlEndNode,
        }),
        [
          styles?.controlStartNode,
          styles?.controlInputNode,
          styles?.controlValueNode,
          styles?.controlLabelNode,
          styles?.controlHelperTextNode,
          styles?.controlEndNode,
        ],
      );

      const dropdownStyles = useMemo(
        () => ({
          root: styles?.dropdown,
          option: styles?.option,
          optionBlendStyles: styles?.optionBlendStyles,
          optionCell: styles?.optionCell,
          optionContent: styles?.optionContent,
          optionLabel: styles?.optionLabel,
          optionDescription: styles?.optionDescription,
          selectAllDivider: styles?.selectAllDivider,
          emptyContentsContainer: styles?.emptyContentsContainer,
          emptyContentsText: styles?.emptyContentsText,
          optionGroup: styles?.optionGroup,
        }),
        [
          styles?.dropdown,
          styles?.option,
          styles?.optionBlendStyles,
          styles?.optionCell,
          styles?.optionContent,
          styles?.optionLabel,
          styles?.optionDescription,
          styles?.selectAllDivider,
          styles?.emptyContentsContainer,
          styles?.emptyContentsText,
          styles?.optionGroup,
        ],
      );

      const containerRef = useRef<View>(null);
      useImperativeHandle(ref, () =>
        Object.assign(containerRef.current as View, {
          open,
          setOpen,
          refs: { reference: containerRef, floating: null },
        }),
      );

      return (
        <View ref={containerRef} style={rootStyles} testID={testID}>
          <SelectControlComponent
            accessibilityHint={accessibilityHint}
            accessibilityLabel={accessibilityLabel}
            blendStyles={styles?.controlBlendStyles}
            bordered={bordered}
            compact={compact}
            disabled={disabled}
            endNode={endNode}
            helperText={helperText}
            hiddenSelectedOptionsLabel={hiddenSelectedOptionsLabel}
            label={label}
            labelVariant={labelVariant}
            maxSelectedOptionsToShow={maxSelectedOptionsToShow}
            onChange={onChange}
            open={open}
            options={options}
            placeholder={placeholder}
            removeSelectedOptionAccessibilityLabel={removeSelectedOptionAccessibilityLabel}
            setOpen={setOpen}
            startNode={startNode}
            style={styles?.control}
            styles={controlStyles}
            type={type}
            value={value}
            variant={variant}
          />
          <SelectDropdownComponent
            SelectAllOptionComponent={SelectAllOptionComponent}
            SelectEmptyDropdownContentsComponent={SelectEmptyDropdownContentsComponent}
            SelectOptionComponent={SelectOptionComponent}
            SelectOptionGroupComponent={SelectOptionGroupComponent}
            accessibilityRoles={accessibilityRoles}
            accessory={accessory}
            clearAllLabel={clearAllLabel}
            compact={compact}
            controlRef={containerRef}
            disabled={disabled}
            emptyOptionsLabel={emptyOptionsLabel}
            end={end}
            hideSelectAll={hideSelectAll}
            label={label}
            media={media}
            onChange={onChange}
            open={open}
            options={options}
            selectAllLabel={selectAllLabel}
            setOpen={setOpen}
            styles={dropdownStyles}
            type={type}
            value={value}
          />
        </View>
      );
    },
  ),
);

export const Select = SelectBase as SelectComponent;
