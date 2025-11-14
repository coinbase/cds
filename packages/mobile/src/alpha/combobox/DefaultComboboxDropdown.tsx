import { forwardRef, memo, useCallback, useMemo } from 'react';
import { type GestureResponderEvent, KeyboardAvoidingView, ScrollView } from 'react-native';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls/Checkbox';
import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import type { DrawerRefBaseProps } from '../../overlays/drawer/Drawer';
import { Tray } from '../../overlays/tray/Tray';
import { DefaultSelectAllOption } from '../select/DefaultSelectAllOption';
import { DefaultSelectEmptyDropdownContents } from '../select/DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from '../select/DefaultSelectOption';
import { defaultAccessibilityRoles } from '../select/Select';

import type { ComboboxDropdownProps } from './Combobox';

type DefaultComboboxDropdownBase = <ComboboxOptionValue extends string = string>(
  props: ComboboxDropdownProps<ComboboxOptionValue> & { ref?: React.Ref<DrawerRefBaseProps> },
) => React.ReactElement;

const DefaultComboboxDropdownComponent = memo(
  forwardRef(
    <ComboboxOptionValue extends string = string>(
      {
        type,
        options,
        value,
        searchText,
        onSearch,
        onChange,
        open,
        setOpen,
        controlRef,
        disabled,
        style,
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
        ComboboxControlComponent,
        accessibilityRoles = defaultAccessibilityRoles,
        ...props
      }: ComboboxDropdownProps<ComboboxOptionValue>,
      ref: React.Ref<DrawerRefBaseProps>,
    ) => {
      const dropdownStyles = useMemo(() => [style, styles?.root], [styles?.root, style]);
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

      const isSomeOptionsSelected = (value as string[]).length > 0;
      const isAllOptionsSelected =
        (value as string[]).length === options.filter((o) => o.value !== null).length;

      const toggleSelectAll = useCallback(() => {
        if (isAllOptionsSelected) onChange(null);
        else
          onChange(
            options
              .map((o) => o.value)
              .filter((o) => o !== null && !value?.includes(o)) as ComboboxOptionValue[],
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
                <Button
                  compact
                  transparent
                  accessibilityRole="menuitem"
                  flush="end"
                  onPress={handleClearAll}
                >
                  {clearAllLabel}
                </Button>
              )
            }
            indeterminate={indeterminate}
            label={`${selectAllLabel} (${options.filter((o) => o.value !== null).length})`}
            media={
              media ?? (
                <Checkbox
                  checked={isAllOptionsSelected}
                  indeterminate={indeterminate}
                  tabIndex={-1}
                />
              )
            }
            onPress={toggleSelectAll}
            selected={isAllOptionsSelected}
            style={styles?.option}
            styles={optionStyles}
            type={type}
            value={'select-all' as ComboboxOptionValue}
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
          style={dropdownStyles}
          title={label}
          verticalDrawerPercentageOfView={0.9}
        >
          <VStack>
            {ComboboxControlComponent && (
              <ComboboxControlComponent
                onChange={(value) =>
                  onChange?.(value as ComboboxOptionValue | ComboboxOptionValue[])
                }
                onSearch={onSearch}
                open={open}
                options={options}
                searchText={searchText}
                setOpen={setOpen}
                value={value}
              />
            )}
            <ScrollView showsVerticalScrollIndicator={true}>
              <VStack>
                {!hideSelectAll && options.length > 0 && SelectAllOption}
                {options.length > 0 ? (
                  options.map(
                    ({ Component, media: optionMedia, accessory: optionAccessory, ...option }) => {
                      const RenderedSelectOption = Component ?? SelectOptionComponent;
                      const selected =
                        option.value !== null &&
                        value.includes(option.value as ComboboxOptionValue);
                      /** onPress handlers are passed so that when the media is pressed,
                       * the onChange handler is called. Since the <RenderedSelectOption>
                       * has an accessibilityRole, the inner media won't be detected by a screen reader
                       * so this behavior matches web
                       * */
                      const defaultMedia = (
                        <Checkbox
                          checked={selected}
                          onPress={() => {
                            onChange(option.value as ComboboxOptionValue);
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
                            onChange(newValue as ComboboxOptionValue);
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

export const DefaultComboboxDropdown =
  DefaultComboboxDropdownComponent as DefaultComboboxDropdownBase;
