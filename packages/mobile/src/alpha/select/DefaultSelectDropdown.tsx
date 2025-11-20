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
import { DefaultSelectOptionGroup } from './DefaultSelectOptionGroup';
import type { SelectDropdownProps, SelectOption, SelectOptionCustomUI, SelectType } from './Select';
import { defaultAccessibilityRoles, isSelectOptionGroup } from './Select';

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
        style,
        styles,
        compact,
        header,
        footer,
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
        SelectOptionGroupComponent = DefaultSelectOptionGroup,
        accessibilityRoles = defaultAccessibilityRoles,
        ...props
      }: SelectDropdownProps<Type, SelectOptionValue>,
      ref: React.Ref<DrawerRefBaseProps>,
    ) => {
      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;

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

      const optionGroupStyles = useMemo(
        () => ({
          optionGroup: styles?.optionGroup,
          option: styles?.option,
          optionBlendStyles: styles?.optionBlendStyles,
          optionCell: styles?.optionCell,
          optionContent: styles?.optionContent,
          optionLabel: styles?.optionLabel,
          optionDescription: styles?.optionDescription,
          selectAllDivider: styles?.selectAllDivider,
        }),
        [
          styles?.optionGroup,
          styles?.option,
          styles?.optionBlendStyles,
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

      // Flatten options for Select All logic, excluding disabled options and options from disabled groups
      const flatOptionsForSelectAll = useMemo(() => {
        if (disabled) return [];
        const result: Array<
          SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>
        > = [];
        options.forEach((option) => {
          if (isSelectOptionGroup<Type, SelectOptionValue>(option)) {
            // It's a group, add its enabled options if the group itself is not disabled
            if (!option.disabled) {
              option.options.forEach((groupOption) => {
                if (!groupOption.disabled) {
                  result.push(groupOption);
                }
              });
            }
          } else {
            // It's a single option, add if not disabled
            if (!option.disabled) {
              result.push(option);
            }
          }
        });
        return result;
      }, [options, disabled]);

      const isMultiSelect = type === 'multi';
      const isSomeOptionsSelected = isMultiSelect ? (value as string[]).length > 0 : false;
      // Only count non-disabled options when determining if all are selected
      const enabledOptionsCount = flatOptionsForSelectAll.filter((o) => o.value !== null).length;
      const isAllOptionsSelected = isMultiSelect
        ? enabledOptionsCount > 0 && (value as string[]).length === enabledOptionsCount
        : false;

      const toggleSelectAll = useCallback(() => {
        if (isAllOptionsSelected) onChange(null);
        else
          onChange(
            flatOptionsForSelectAll
              .map(({ value }) => value)
              .filter(
                (optionValue) => optionValue !== null && !value?.includes(optionValue),
              ) as ValueType,
          );
      }, [isAllOptionsSelected, onChange, flatOptionsForSelectAll, value]);

      const handleClearAll = useCallback(
        (event: GestureResponderEvent) => {
          event.stopPropagation();
          onChange(null);
        },
        [onChange],
      );

      const handleOptionPress = useCallback(
        (newValue: SelectOptionValue | null) => {
          onChange(newValue as ValueType);
          if (!isMultiSelect) setOpen(false);
        },
        [onChange, isMultiSelect, setOpen],
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
                  // This button is not accessible to users using screen readers since it's
                  // the child of a button. Clearing the a11y label ensures it isn't announced
                  // by a screen reader
                  accessibilityLabel=""
                  accessible={false}
                  flush="end"
                  onPress={handleClearAll}
                >
                  {clearAllLabel}
                </Button>
              )
            }
            indeterminate={indeterminate}
            label={`${selectAllLabel} (${flatOptionsForSelectAll.filter((o) => o.value !== null).length})`}
            media={
              media ?? (
                <Checkbox
                  checked={isAllOptionsSelected}
                  indeterminate={indeterminate}
                  onPress={toggleSelectAll}
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
          disabled,
          end,
          handleClearAll,
          clearAllLabel,
          indeterminate,
          selectAllLabel,
          flatOptionsForSelectAll,
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
          footer={footer}
          header={header}
          onCloseComplete={() => setOpen(false)}
          onDismiss={() => setOpen(false)}
          style={dropdownStyles}
          title={label}
          verticalDrawerPercentageOfView={0.9}
        >
          <ScrollView showsVerticalScrollIndicator={true}>
            {/* TO DO: can we remove this VStack? */}
            <VStack {...props}>
              {!hideSelectAll && isMultiSelect && options.length > 0 && SelectAllOption}
              {options.length > 0 ? (
                options.map((optionOrGroup) => {
                  // Check if it's a group (has 'options' property and 'label')
                  if (isSelectOptionGroup<Type, SelectOptionValue>(optionOrGroup)) {
                    const group = optionOrGroup;
                    return (
                      <SelectOptionGroupComponent
                        key={`group-${group.label}`}
                        SelectOptionComponent={SelectOptionComponent}
                        accessibilityRole={accessibilityRoles?.option}
                        accessory={accessory}
                        compact={compact}
                        disabled={group.disabled ?? disabled}
                        end={end}
                        label={group.label}
                        media={media}
                        onChange={onChange}
                        options={group.options}
                        setOpen={setOpen}
                        styles={optionGroupStyles}
                        type={type}
                        value={value}
                      />
                    );
                  }

                  const option = optionOrGroup;
                  const {
                    Component: optionComponent,
                    media: optionMedia,
                    accessory: optionAccessory,
                    end: optionEnd,
                    disabled: optionDisabled,
                    ...optionProps
                  } = option;
                  const RenderedComponent = optionComponent ?? SelectOptionComponent;
                  const selected =
                    optionProps.value !== null && isMultiSelect
                      ? (value as string[]).includes(optionProps.value)
                      : value === optionProps.value;
                  /** onPress handlers are passed so that when the media is pressed,
                   * the onChange handler is called. Since the <RenderedSelectOption>
                   * has an accessibilityRole, the inner media won't be detected by a screen reader
                   * so this behavior matches web
                   * */
                  const defaultMedia = isMultiSelect ? (
                    <Checkbox
                      aria-hidden
                      checked={selected}
                      onChange={() => handleOptionPress(optionProps.value)}
                      tabIndex={-1}
                      value={optionProps.value?.toString()}
                    />
                  ) : (
                    <Radio
                      aria-hidden
                      checked={selected}
                      onChange={() => handleOptionPress(optionProps.value)}
                      tabIndex={-1}
                      value={optionProps.value?.toString()}
                    />
                  );
                  return (
                    <RenderedComponent
                      key={optionProps.value}
                      accessibilityRole={accessibilityRoles?.option}
                      accessory={optionAccessory ?? accessory}
                      blendStyles={styles?.optionBlendStyles}
                      compact={compact}
                      disabled={optionDisabled || disabled}
                      end={optionEnd ?? end}
                      media={optionMedia ?? media ?? defaultMedia}
                      onPress={handleOptionPress}
                      selected={selected}
                      style={styles?.option}
                      styles={optionStyles}
                      type={type}
                      {...optionProps}
                    />
                  );
                })
              ) : (
                <SelectEmptyDropdownContentsComponent
                  label={emptyOptionsLabel}
                  styles={emptyDropdownContentsStyles}
                />
              )}
            </VStack>
          </ScrollView>
        </Tray>
      );
    },
  ),
);

export const DefaultSelectDropdown = DefaultSelectDropdownComponent as DefaultSelectDropdownBase;
