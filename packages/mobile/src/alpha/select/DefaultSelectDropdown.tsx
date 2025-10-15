import { forwardRef, memo, useCallback, useMemo } from 'react';
import { type GestureResponderEvent, ScrollView } from 'react-native';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls/Checkbox';
import { Radio } from '../../controls/Radio';
import { VStack } from '../../layout/VStack';
import type { DrawerRefBaseProps } from '../../overlays/drawer/Drawer';
import { Tray } from '../../overlays/tray/Tray';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';
import type { SelectDropdownProps, SelectType } from './Select';

const DefaultSelectDropdownComponent = <
  Type extends SelectType = 'single',
  T extends string = string,
>(
  {
    type,
    options,
    value,
    onChange,
    open,
    setOpen,
    controlRef,
    disabled,
    styles,
    compact,
    label,
    detail,
    selectAllLabel = 'Select all',
    emptyOptionsLabel = 'No options available',
    clearAllLabel = 'Clear all',
    hideSelectAll,
    accessory,
    media,
    SelectOptionComponent = DefaultSelectOption,
    SelectAllOptionComponent = DefaultSelectAllOption,
    SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents,
    accessibilityRoles,
    ...props
  }: SelectDropdownProps<Type, T>,
  ref: React.Ref<DrawerRefBaseProps>,
) => {
  type ValueType = Type extends 'multi' ? T | T[] : T | null;
  const isMultiSelect = type === 'multi';

  const isAllOptionsSelected = isMultiSelect
    ? (value as string[]).length === options.filter((o) => o.value !== null).length
    : false;
  const isSomeOptionsSelected = isMultiSelect ? (value as string[]).length > 0 : false;

  const toggleSelectAll = useCallback(() => {
    if (isAllOptionsSelected) onChange(null as ValueType);
    else onChange(options.map((o) => o.value).filter((o) => o !== null) as ValueType);
  }, [isAllOptionsSelected, onChange, options]);
  const handleClearAll = useCallback(
    (e: GestureResponderEvent) => {
      e.stopPropagation();
      onChange(null as ValueType);
    },
    [onChange],
  );

  const indeterminate = useMemo(() => {
    return !isAllOptionsSelected && isSomeOptionsSelected ? true : false;
  }, [isAllOptionsSelected, isSomeOptionsSelected]);

  const SelectAllOption = useMemo(
    () => (
      <SelectAllOptionComponent
        key="select-all"
        accessibilityRole={accessibilityRoles?.option}
        accessory={accessory}
        blendStyles={styles?.optionBlendStyles}
        compact={compact}
        detail={
          detail ?? (
            <Button compact transparent onPress={handleClearAll} role="option">
              {clearAllLabel}
            </Button>
          )
        }
        disabled={disabled}
        indeterminate={indeterminate}
        label={String(selectAllLabel + ' (' + options.filter((o) => o.value !== null).length + ')')}
        media={
          media ?? (
            <Checkbox
              checked={isAllOptionsSelected}
              indeterminate={!isAllOptionsSelected && isSomeOptionsSelected ? true : false}
              tabIndex={-1}
            />
          )
        }
        onPress={toggleSelectAll}
        selected={isAllOptionsSelected}
        style={styles?.option}
        styles={{
          optionCell: styles?.optionCell,
          optionContent: styles?.optionContent,
          optionLabel: styles?.optionLabel,
          optionDescription: styles?.optionDescription,
          selectAllDivider: styles?.selectAllDivider,
        }}
        type={type}
        value={'select-all' as T}
      />
    ),
    [
      SelectAllOptionComponent,
      accessibilityRoles?.option,
      accessory,
      styles?.optionBlendStyles,
      styles?.option,
      styles?.optionCell,
      styles?.optionContent,
      styles?.optionLabel,
      styles?.optionDescription,
      styles?.selectAllDivider,
      compact,
      detail,
      handleClearAll,
      clearAllLabel,
      disabled,
      indeterminate,
      selectAllLabel,
      options,
      media,
      isAllOptionsSelected,
      isSomeOptionsSelected,
      toggleSelectAll,
      type,
    ],
  );

  if (!open) return null;

  return (
    <Tray
      ref={ref}
      disableCapturePanGestureToDismiss={true}
      onCloseComplete={() => setOpen(false)}
      onDismiss={() => setOpen(false)}
      style={styles?.dropdown}
      title={label}
      verticalDrawerPercentageOfView={0.9}
    >
      <VStack>
        <ScrollView showsVerticalScrollIndicator={true}>
          <VStack>
            {!hideSelectAll && isMultiSelect && SelectAllOption}
            {options.length > 0 ? (
              options.map(
                ({ Component, media: optionMedia, accessory: optionAccessory, ...option }) => {
                  const RenderedSelectOption = Component ?? SelectOptionComponent;
                  const selected =
                    option.value !== null && isMultiSelect
                      ? (value as string[]).includes(option.value)
                      : value === option.value;
                  const defaultMedia = isMultiSelect ? (
                    <Checkbox
                      checked={selected}
                      onPress={() => {
                        onChange(option.value as ValueType);
                      }}
                    />
                  ) : (
                    <Radio
                      checked={selected}
                      onPress={() => {
                        onChange(option.value as ValueType);
                        setOpen(false);
                      }}
                    />
                  );
                  return (
                    <RenderedSelectOption
                      key={option.value}
                      accessibilityRole={accessibilityRoles?.option}
                      accessory={optionAccessory ?? accessory}
                      blendStyles={styles?.optionBlendStyles}
                      compact={compact}
                      disabled={option.disabled || disabled}
                      media={optionMedia ?? media ?? defaultMedia}
                      onPress={(newValue) => {
                        onChange(newValue as ValueType);
                        if (!isMultiSelect) setOpen(false);
                      }}
                      selected={selected}
                      style={styles?.option}
                      styles={{
                        optionCell: styles?.optionCell,
                        optionContent: styles?.optionContent,
                        optionLabel: styles?.optionLabel,
                        optionDescription: styles?.optionDescription,
                        selectAllDivider: styles?.selectAllDivider,
                      }}
                      type={type}
                      {...option}
                    />
                  );
                },
              )
            ) : (
              <SelectEmptyDropdownContentsComponent
                label={emptyOptionsLabel}
                styles={{
                  emptyContentsContainer: styles?.emptyContentsContainer,
                  emptyContentsText: styles?.emptyContentsText,
                }}
              />
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Tray>
  );
};

export const DefaultSelectDropdown = memo(forwardRef(DefaultSelectDropdownComponent)) as <
  Type extends SelectType = 'single',
  T extends string = string,
>(
  props: SelectDropdownProps<Type, T> & { ref?: React.Ref<DrawerRefBaseProps> },
) => React.ReactElement;
