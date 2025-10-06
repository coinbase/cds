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
import type { SelectDropdownComponent } from './Select';
import { defaultAccessibilityRoles } from './Select';

const initialStyle = { opacity: 0, y: 0 };
const animateStyle = { opacity: 1, y: 4 };

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
        detail,
        SelectOptionComponent = DefaultSelectOption,
        SelectAllOptionComponent = DefaultSelectAllOption,
        SelectEmptyDropdownContentsComponent = DefaultSelectEmptyDropdownContents,
        accessibilityLabel = 'Select dropdown',
        accessibilityRoles = defaultAccessibilityRoles,
        ...props
      },
      ref: React.Ref<HTMLElement>,
    ) => {
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
        if (isAllOptionsSelected) onChange(null);
        else onChange(options.map((o) => o.value).filter((o) => o !== null));
      }, [isAllOptionsSelected, onChange, options]);
      const handleClearAll = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          onChange(null);
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
            type={type}
            value="select-all"
          />
        ),
        [
          SelectAllOptionComponent,
          accessory,
          styles?.optionBlendStyles,
          styles?.option,
          classNames?.option,
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
            <div
              ref={ref as React.Ref<HTMLDivElement>}
              aria-label={accessibilityLabel}
              aria-multiselectable={isMultiSelect}
              className={className}
              role={accessibilityRoles?.dropdown}
              style={dropdownStyles}
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
                    {!hideSelectAll && isMultiSelect && SelectAllOption}
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
                          return (
                            <RenderedSelectOption
                              key={option.value}
                              accessibilityRole={accessibilityRoles?.option}
                              accessory={optionAccessory ?? accessory}
                              blendStyles={styles?.optionBlendStyles}
                              className={classNames?.option}
                              compact={compact}
                              detail={detail}
                              disabled={option.disabled || disabled}
                              media={
                                optionMedia ??
                                media ??
                                (isMultiSelect ? (
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
                                ))
                              }
                              onClick={(newVal) => {
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
                  </Box>
                </motion.div>
              </FocusTrap>
            </div>
          )}
        </AnimatePresence>
      );
    },
  ),
);
