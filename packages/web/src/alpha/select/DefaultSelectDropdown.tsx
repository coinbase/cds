import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
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
import type { SelectDropdownProps, SelectType } from './Select';
import { defaultAccessibilityRoles } from './Select';

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
        (event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          onChange(null);
        },
        [onChange],
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

      const SelectAllOption = useMemo(
        () => (
          <SelectAllOptionComponent
            key="select-all"
            accessibilityRole={accessibilityRoles?.option}
            accessory={accessory}
            blendStyles={styles?.optionBlendStyles}
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
            label={`${selectAllLabel} (${options.filter((o) => o.value !== null).length})`}
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
        ),
        [
          SelectAllOptionComponent,
          accessibilityRoles?.option,
          accessory,
          styles?.optionBlendStyles,
          styles?.option,
          classNames?.option,
          optionClassNames,
          compact,
          disabled,
          end,
          handleClearAll,
          clearAllLabel,
          indeterminate,
          selectAllLabel,
          options,
          media,
          isAllOptionsSelected,
          toggleSelectAll,
          isSomeOptionsSelected,
          optionStyles,
          type,
        ],
      );

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
                    {!hideSelectAll && isMultiSelect && options.length > 0 && SelectAllOption}
                    {options.length > 0 ? (
                      options.map(
                        ({
                          Component,
                          media: optionMedia,
                          accessory: optionAccessory,
                          end: optionEnd,
                          ...option
                        }) => {
                          const RenderedSelectOption = Component ?? SelectOptionComponent;
                          const selected =
                            option.value !== null && isMultiSelect
                              ? (value as string[]).includes(option.value)
                              : value === option.value;
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
                            <RenderedSelectOption
                              key={option.value}
                              accessibilityRole={accessibilityRoles?.option}
                              accessory={optionAccessory ?? accessory}
                              blendStyles={styles?.optionBlendStyles}
                              className={classNames?.option}
                              classNames={optionClassNames}
                              compact={compact}
                              disabled={option.disabled || disabled}
                              end={optionEnd ?? end}
                              media={optionMedia ?? media ?? defaultMedia}
                              onClick={(newValue) => {
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
