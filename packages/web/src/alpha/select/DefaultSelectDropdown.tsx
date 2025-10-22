import { forwardRef, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, m as motion } from 'framer-motion';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls/Checkbox';
import { Radio } from '../../controls/Radio';
import { Box } from '../../layout/Box';
import { FocusTrap } from '../../overlays/FocusTrap';

import { DefaultSelectAllOption } from './DefaultSelectAllOption';
import { DefaultSelectEmptyDropdownContents } from './DefaultSelectEmptyDropdownContents';
import { DefaultSelectOption } from './DefaultSelectOption';
import type { SelectDropdownComponent, SelectDropdownProps, SelectType } from './Select';
import { defaultAccessibilityRoles } from './Select';

const initialStyle = { opacity: 0, y: 0 };
const animateStyle = { opacity: 1, y: 4 };

type DefaultSelectDropdownBase = <Type extends SelectType, T extends string = string>(
  props: SelectDropdownProps<Type, T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement;

const DefaultSelectDropdownBase = memo(
  forwardRef(
    <Type extends SelectType, T extends string = string>(
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
        selectAllLabel = 'Select all',
        emptyOptionsLabel = 'No options available',
        clearAllLabel = 'Clear all',
        hideSelectAll,
        accessory,
        media,
        label,
        detail,
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents,
        accessibilityLabel = 'Select dropdown',
        accessibilityRoles = defaultAccessibilityRoles,
        ...props
      }: SelectDropdownProps<Type, T>,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      type ValueType = Type extends 'multi' ? T | T[] : T | null;
      const isMultiSelect = type === 'multi';
      const [containerWidth, setContainerWidth] = useState<number | null>(null);

      useEffect(() => {
        if (!controlRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
          setContainerWidth(entries[0].contentRect.width);
        });
        resizeObserver.observe(controlRef.current);
        return () => resizeObserver.disconnect();
      }, [controlRef]);

      const dropdownStyles = useMemo(
        () => ({
          width:
            containerWidth !== null
              ? containerWidth
              : controlRef.current?.getBoundingClientRect().width,
          ...style,
          ...styles?.root,
        }),
        [style, styles?.root, containerWidth, controlRef],
      );

      const isAllOptionsSelected = isMultiSelect
        ? (value as string[]).length === options.filter((o) => o.value !== null).length
        : false;
      const isSomeOptionsSelected = isMultiSelect ? (value as string[]).length > 0 : false;

      const toggleSelectAll = useCallback(() => {
        if (isAllOptionsSelected) onChange(null as ValueType);
        else onChange(options.map((o) => o.value).filter((o) => o !== null) as ValueType);
      }, [isAllOptionsSelected, onChange, options]);
      const handleClearAll = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onChange(null as ValueType);
        },
        [onChange],
      );

      const handleEscPress = useCallback(() => setOpen(false), [setOpen]);

      const SelectAllOption = useMemo(
        () => (
          <SelectAllOptionComponent
            key="select-all"
            accessory={accessory}
            blendStyles={styles?.optionBlendStyles}
            className={classNames?.option}
            classNames={{
              optionCell: classNames?.optionCell,
              optionContent: classNames?.optionContent,
              optionLabel: classNames?.optionLabel,
              optionDescription: classNames?.optionDescription,
              selectAllDivider: classNames?.selectAllDivider,
            }}
            compact={compact}
            detail={
              detail ?? (
                <Button
                  compact
                  transparent
                  onClick={handleClearAll}
                  role="option"
                  style={{ margin: 'var(--space-1)' }}
                >
                  {clearAllLabel}
                </Button>
              )
            }
            disabled={disabled}
            label={`${selectAllLabel} (${options.filter((o) => o.value !== null).length})`}
            media={
              media ?? (
                <Checkbox
                  readOnly
                  checked={isAllOptionsSelected}
                  iconStyle={{ opacity: 1 }}
                  indeterminate={!isAllOptionsSelected && isSomeOptionsSelected ? true : false}
                  tabIndex={-1}
                />
              )
            }
            onClick={toggleSelectAll}
            selected={isAllOptionsSelected || isSomeOptionsSelected}
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
          accessory,
          styles?.optionBlendStyles,
          styles?.option,
          styles?.optionCell,
          styles?.optionContent,
          styles?.optionLabel,
          styles?.optionDescription,
          styles?.selectAllDivider,
          classNames?.option,
          classNames?.optionCell,
          classNames?.optionContent,
          classNames?.optionLabel,
          classNames?.optionDescription,
          classNames?.selectAllDivider,
          compact,
          detail,
          disabled,
          selectAllLabel,
          options,
          media,
          toggleSelectAll,
          isAllOptionsSelected,
          type,
          handleClearAll,
          clearAllLabel,
          isSomeOptionsSelected,
        ],
      );

      return (
        <AnimatePresence>
          {open && (
            <Box
              ref={ref}
              aria-label={accessibilityLabel}
              aria-multiselectable={isMultiSelect}
              className={className}
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
                              classNames={{
                                optionCell: classNames?.optionCell,
                                optionContent: classNames?.optionContent,
                                optionLabel: classNames?.optionLabel,
                                optionDescription: classNames?.optionDescription,
                                selectAllDivider: classNames?.selectAllDivider,
                              }}
                              compact={compact}
                              detail={detail}
                              disabled={option.disabled || disabled}
                              media={optionMedia ?? media ?? defaultMedia}
                              onClick={(newValue) => {
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
                        classNames={{
                          emptyContentsContainer: classNames?.emptyContentsContainer,
                          emptyContentsText: classNames?.emptyContentsText,
                        }}
                        label={emptyOptionsLabel}
                        styles={{
                          emptyContentsContainer: styles?.emptyContentsContainer,
                          emptyContentsText: styles?.emptyContentsText,
                        }}
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

export const DefaultSelectDropdown = DefaultSelectDropdownBase as DefaultSelectDropdownBase;
