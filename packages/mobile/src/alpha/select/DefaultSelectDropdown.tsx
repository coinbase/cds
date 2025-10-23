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
import { defaultAccessibilityRoles } from './Select';

type DefaultSelectDropdownBase = <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectDropdownProps<Type, SelectOptionValue> & { ref?: React.Ref<DrawerRefBaseProps> },
) => React.ReactElement;

const DefaultSelectDropdownComponent = memo(
  forwardRef(
    <Type extends SelectType = 'single', SelectOptionValue extends string = string>(
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
        end,
        selectAllLabel = 'Select all',
        emptyOptionsLabel = 'No options available',
        clearAllLabel = 'Clear all',
        hideSelectAll,
        accessory,
        media,
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents,
        accessibilityRoles = defaultAccessibilityRoles,
        ...props
      }: SelectDropdownProps<Type, SelectOptionValue>,
      ref: React.Ref<DrawerRefBaseProps>,
    ) => {
      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;

      const optionStyles = useMemo(
        () => ({
          optionCell: styles?.optionCell,
          optionContent: styles?.optionContent,
          optionLabel: styles?.optionLabel,
          optionDescription: styles?.optionDescription,
          selectAllDivider: styles?.selectAllDivider,
        }),
        [
          styles?.optionCell,
          styles?.optionContent,
          styles?.optionLabel,
          styles?.optionDescription,
          styles?.selectAllDivider,
        ],
      );

      const emptyDropdownContentsStyles = useMemo(
        () => ({
          emptyContentsContainer: styles?.emptyContentsContainer,
          emptyContentsText: styles?.emptyContentsText,
        }),
        [styles?.emptyContentsContainer, styles?.emptyContentsText],
      );

      const isMultiSelect = type === 'multi';
      const isSomeOptionsSelected = isMultiSelect ? (value as string[]).length > 0 : false;
      const isAllOptionsSelected = isMultiSelect
        ? (value as string[]).length === options.filter((o) => o.value !== null).length
        : false;

      const toggleSelectAll = useCallback(() => {
        if (isAllOptionsSelected) onChange(null);
        else
          onChange(
            options
              .map((o) => o.value)
              .filter((o) => o !== null && !value?.includes(o)) as ValueType,
          );
      }, [isAllOptionsSelected, onChange, options, value]);

      const handleClearAll = useCallback(
        (event: GestureResponderEvent) => {
          event.stopPropagation();
          onChange(null);
        },
        [onChange],
      );

      const indeterminate = !isAllOptionsSelected && isSomeOptionsSelected ? true : false;

      const SelectAllOption = useMemo(
        () => (
          <SelectAllOptionComponent
            key="select-all"
            accessibilityRole={accessibilityRoles?.option}
            accessory={accessory}
            blendStyles={styles?.optionBlendStyles}
            compact={compact}
            disabled={disabled}
            end={
              end ?? (
                <Button compact transparent accessibilityRole="menuitem" onPress={handleClearAll}>
                  {clearAllLabel}
                </Button>
              )
            }
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
            styles={optionStyles}
            type={type}
            value={'select-all' as SelectOptionValue}
          />
        ),
        [
          SelectAllOptionComponent,
          accessibilityRoles?.option,
          accessory,
          styles?.optionBlendStyles,
          styles?.option,
          compact,
          end,
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
          optionStyles,
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
          style={styles?.root}
          title={label}
          verticalDrawerPercentageOfView={0.9}
        >
          <VStack>
            <ScrollView showsVerticalScrollIndicator={true}>
              <VStack>
                {!hideSelectAll && isMultiSelect && options.length > 0 && SelectAllOption}
                {options.length > 0 ? (
                  options.map(
                    ({ Component, media: optionMedia, accessory: optionAccessory, ...option }) => {
                      const RenderedSelectOption = Component ?? SelectOptionComponent;
                      const selected =
                        option.value !== null && isMultiSelect
                          ? (value as string[]).includes(option.value)
                          : value === option.value;
                      /** onPress handlers are passed so that when the media is pressed,
                       * the onChange handler is called. Since the <RenderedSelectOption>
                       * has an accessibilityRole, the inner media won't be detected by a screen reader
                       * so this behavior matches web
                       * */
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
                          end={end}
                          media={optionMedia ?? media ?? defaultMedia}
                          onPress={(newValue) => {
                            onChange(newValue as ValueType);
                            if (!isMultiSelect) setOpen(false);
                          }}
                          selected={selected}
                          style={styles?.option}
                          styles={optionStyles}
                          type={type}
                          {...option}
                        />
                      );
                    },
                  )
                ) : (
                  <SelectEmptyDropdownContentsComponent
                    label={emptyOptionsLabel}
                    styles={emptyDropdownContentsStyles}
                  />
                )}
              </VStack>
            </ScrollView>
          </VStack>
        </Tray>
      );
    },
  ),
);

export const DefaultSelectDropdown = DefaultSelectDropdownComponent as DefaultSelectDropdownBase;
