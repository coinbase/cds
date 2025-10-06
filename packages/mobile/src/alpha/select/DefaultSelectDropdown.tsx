import { forwardRef, memo, useCallback, useMemo } from 'react';
import { type GestureResponderEvent, ScrollView } from 'react-native';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls/Checkbox';
import { Radio } from '../../controls/Radio';
import { VStack } from '../../layout/VStack';
import { Tray } from '../../overlays/tray/Tray';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';
import type { SelectDropdownComponent } from './Select';

export const DefaultSelectDropdown: SelectDropdownComponent<'single' | 'multi'> = memo(
  forwardRef(
    (
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
        classNames,
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
      },
      ref,
    ) => {
      const isMultiSelect = type === 'multi';

      const isAllOptionsSelected = isMultiSelect
        ? (value as string[]).length === options.filter((o) => o.value !== null).length
        : false;
      const isSomeOptionsSelected = isMultiSelect ? (value as string[]).length > 0 : false;

      const toggleSelectAll = useCallback(() => {
        if (isAllOptionsSelected) onChange(null);
        else onChange(options.map((o) => o.value).filter((o) => o !== null));
      }, [isAllOptionsSelected, onChange, options]);
      const handleClearAll = useCallback(
        (e: GestureResponderEvent) => {
          e.stopPropagation();
          onChange(null);
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
            className={classNames?.option}
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
            label={String(
              selectAllLabel + ' (' + options.filter((o) => o.value !== null).length + ')',
            )}
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
            type={type}
            value="select-all"
          />
        ),
        [
          SelectAllOptionComponent,
          accessibilityRoles?.option,
          accessory,
          styles?.optionBlendStyles,
          styles?.option,
          classNames?.option,
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
                      return (
                        <RenderedSelectOption
                          key={option.value}
                          accessibilityRole={accessibilityRoles?.option}
                          accessory={optionAccessory ?? accessory}
                          blendStyles={styles?.optionBlendStyles}
                          className={classNames?.option}
                          compact={compact}
                          disabled={option.disabled || disabled}
                          media={
                            optionMedia ??
                            media ??
                            (isMultiSelect ? (
                              <Checkbox checked={selected} />
                            ) : (
                              <Radio checked={selected} />
                            ))
                          }
                          onPress={(newVal) => {
                            onChange(newVal);
                            if (!isMultiSelect) setOpen(false);
                          }}
                          selected={selected}
                          style={styles?.option}
                          type={type}
                          {...option}
                        />
                      );
                    },
                  )
                ) : (
                  <SelectEmptyDropdownContentsComponent label={emptyOptionsLabel} />
                )}
              </VStack>
            </ScrollView>
          </VStack>
        </Tray>
      );
    },
  ),
);
