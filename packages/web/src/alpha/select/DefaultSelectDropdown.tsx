import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { AnimatePresence, m as motion } from 'framer-motion';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls/Checkbox';
import { Radio } from '../../controls/Radio';
import { cx } from '../../cx';
import { Box } from '../../layout/Box';
import { FocusTrap } from '../../overlays/FocusTrap';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';
import { DefaultSelectOptionGroup } from './DefaultSelectOptionGroup';
import type { SelectDropdownProps, SelectOption, SelectOptionCustomUI, SelectType } from './Select';
import { defaultAccessibilityRoles, isSelectOptionGroup } from './Select';

const initialStyle = { opacity: 0, y: 0 };
const animateStyle = { opacity: 1, y: 4 };

type DefaultSelectDropdownBase = <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectDropdownProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const DefaultSelectDropdownComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
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
        className,
        classNames,
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
        SelectOptionGroupComponent = DefaultSelectOptionGroup,
        accessibilityLabel = 'Select dropdown',
        accessibilityRoles = defaultAccessibilityRoles,
        ...props
      }: SelectDropdownProps<Type, SelectOptionValue>,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;

      const [containerWidth, setContainerWidth] = useState<number | null>(null);
      const dropdownStyles = useMemo(
        () => ({
          width:
            containerWidth !== null
              ? containerWidth
              : controlRef.current?.getBoundingClientRect().width,
          zIndex: zIndex.dropdown,
          ...style,
          ...styles?.root,
        }),
        [styles?.root, containerWidth, controlRef, style],
      );

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

      const optionClassNames = useMemo(
        () => ({
          optionCell: classNames?.optionCell,
          optionContent: classNames?.optionContent,
          optionLabel: classNames?.optionLabel,
          optionDescription: classNames?.optionDescription,
          selectAllDivider: classNames?.selectAllDivider,
        }),
        [
          classNames?.optionCell,
          classNames?.optionContent,
          classNames?.optionLabel,
          classNames?.optionDescription,
          classNames?.selectAllDivider,
        ],
      );

      const emptyDropdownContentsStyles = useMemo(
        () => ({
          emptyContentsContainer: styles?.emptyContentsContainer,
          emptyContentsText: styles?.emptyContentsText,
        }),
        [styles?.emptyContentsContainer, styles?.emptyContentsText],
      );

      const emptyDropdownContentsClassNames = useMemo(
        () => ({
          emptyContentsContainer: classNames?.emptyContentsContainer,
          emptyContentsText: classNames?.emptyContentsText,
        }),
        [classNames?.emptyContentsContainer, classNames?.emptyContentsText],
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

      const optionGroupClassNames = useMemo(
        () => ({
          optionGroup: classNames?.optionGroup,
          option: classNames?.option,
          optionCell: classNames?.optionCell,
          optionContent: classNames?.optionContent,
          optionLabel: classNames?.optionLabel,
          optionDescription: classNames?.optionDescription,
          selectAllDivider: classNames?.selectAllDivider,
        }),
        [
          classNames?.optionGroup,
          classNames?.option,
          classNames?.optionCell,
          classNames?.optionContent,
          classNames?.optionLabel,
          classNames?.optionDescription,
          classNames?.selectAllDivider,
        ],
      );

      // Flatten options to handle nested groups for select all logic
      // Only include non-disabled options (exclude options from disabled groups and individually disabled options)
      const flatOptionsForSelectAll = useMemo(() => {
        // If the entire dropdown is disabled, no options should be selectable
        if (disabled) return [];

        const result: Array<
          SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>
        > = [];
        options.forEach((option) => {
          if (isSelectOptionGroup<Type, SelectOptionValue>(option)) {
            // It's a group, check if the group is disabled
            const isGroupDisabled = option.disabled ?? false;
            if (!isGroupDisabled) {
              // Only add options from non-disabled groups, and filter out individually disabled options
              result.push(
                ...(
                  option.options as Array<
                    SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>
                  >
                ).filter((groupOption) => !groupOption.disabled),
              );
            }
          } else {
            // It's a single option, only add if not disabled
            if (!option.disabled) {
              result.push(option);
            }
          }
        });
        return result;
      }, [options, disabled]);

      const isMultiSelect = type === 'multi';
      const isSomeOptionsSelected = isMultiSelect
        ? (value as SelectOptionValue[]).length > 0
        : false;
      // Only count non-disabled options when determining if all are selected
      const enabledOptionsCount = flatOptionsForSelectAll.filter((o) => o.value !== null).length;
      const isAllOptionsSelected = isMultiSelect
        ? enabledOptionsCount > 0 && (value as SelectOptionValue[]).length === enabledOptionsCount
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
        (event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          onChange(null);
        },
        [onChange],
      );

      const handleOptionClick = useCallback(
        (newValue: SelectOptionValue | null) => {
          onChange(
            newValue as Type extends 'multi'
              ? SelectOptionValue | SelectOptionValue[] | null
              : SelectOptionValue | null,
          );
          if (!isMultiSelect) setOpen(false);
        },
        [onChange, isMultiSelect, setOpen],
      );

      const handleEscPress = useCallback(() => setOpen(false), [setOpen]);

      useEffect(() => {
        if (!controlRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
          setContainerWidth(entries[0].contentRect.width);
        });
        resizeObserver.observe(controlRef.current);
        return () => resizeObserver.disconnect();
      }, [controlRef]);

      const indeterminate = !isAllOptionsSelected && isSomeOptionsSelected ? true : false;
      const shouldShowSelectAll = !hideSelectAll && isMultiSelect && options.length > 0;
      const hasOptions = options.length > 0;

      return (
        <AnimatePresence>
          {open && (
            <Box
              ref={ref}
              aria-label={accessibilityLabel}
              aria-multiselectable={isMultiSelect}
              className={cx(classNames?.root, className)}
              display="block"
              role={accessibilityRoles?.dropdown}
              style={dropdownStyles}
              {...props}
            >
              <FocusTrap
                disableAutoFocus
                focusTabIndexElements
                includeTriggerInFocusTrap
                respectNegativeTabIndex
                restoreFocusOnUnmount
                onEscPress={handleEscPress}
              >
                <motion.div animate={animateStyle} exit={initialStyle} initial={initialStyle}>
                  <Box
                    bordered
                    borderRadius={400}
                    elevation={2}
                    flexDirection="column"
                    maxHeight={252}
                    overflow="auto"
                  >
                    {shouldShowSelectAll && (
                      <SelectAllOptionComponent
                        key="select-all"
                        accessibilityRole={accessibilityRoles?.option}
                        accessory={accessory}
                        className={classNames?.option}
                        classNames={optionClassNames}
                        compact={compact}
                        disabled={disabled}
                        end={
                          end ?? (
                            <Button
                              compact
                              transparent
                              onClick={handleClearAll}
                              role="option"
                              style={{ margin: 'var(--space-0_5)' }}
                              width="fit-content"
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
                              readOnly
                              checked={isAllOptionsSelected}
                              iconStyle={{ opacity: 1 }}
                              indeterminate={indeterminate}
                              tabIndex={-1}
                            />
                          )
                        }
                        onClick={toggleSelectAll}
                        selected={isAllOptionsSelected || isSomeOptionsSelected}
                        style={styles?.option}
                        styles={optionStyles}
                        type={type}
                        value={'select-all' as SelectOptionValue}
                      />
                    )}
                    {options.map((optionOrGroup) => {
                      // Check if it's a group (has 'options' property and 'label')
                      if (isSelectOptionGroup<Type, SelectOptionValue>(optionOrGroup)) {
                        const group = optionOrGroup;

                        return (
                          <SelectOptionGroupComponent
                            key={`group-${group.label}`}
                            SelectOptionComponent={SelectOptionComponent}
                            accessibilityRole={accessibilityRoles?.option}
                            accessory={accessory}
                            classNames={optionGroupClassNames}
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
                          ? (value as SelectOptionValue[]).includes(optionProps.value)
                          : value === optionProps.value;
                      const defaultMedia = isMultiSelect ? (
                        <Checkbox
                          aria-hidden
                          readOnly
                          checked={selected}
                          iconStyle={{ opacity: 1 }}
                          tabIndex={-1}
                        />
                      ) : (
                        <Radio
                          aria-hidden
                          readOnly
                          checked={selected}
                          iconStyle={{ opacity: 1 }}
                          tabIndex={-1}
                        />
                      );

                      return (
                        <RenderedComponent
                          key={optionProps.value}
                          accessibilityRole={accessibilityRoles?.option}
                          accessory={optionAccessory ?? accessory}
                          className={classNames?.option}
                          classNames={optionClassNames}
                          compact={compact}
                          disabled={optionDisabled || disabled}
                          end={optionEnd ?? end}
                          media={optionMedia ?? media ?? defaultMedia}
                          onClick={handleOptionClick}
                          selected={selected}
                          style={styles?.option}
                          styles={optionStyles}
                          type={type}
                          {...optionProps}
                        />
                      );
                    })}
                    {!hasOptions && (
                      <SelectEmptyDropdownContentsComponent
                        classNames={emptyDropdownContentsClassNames}
                        label={emptyOptionsLabel}
                        styles={emptyDropdownContentsStyles}
                      />
                    )}
                  </Box>
                </motion.div>
              </FocusTrap>
            </Box>
          )}
        </AnimatePresence>
      );
    },
  ),
);

export const DefaultSelectDropdown = DefaultSelectDropdownComponent as DefaultSelectDropdownBase;
