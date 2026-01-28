import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { cx } from '../../cx';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { findClosestNonDisabledNodeIndex } from '../../utils/findClosestNonDisabledNodeIndex';

import {
  isSelectOptionGroup,
  type SelectControlProps,
  type SelectOption,
  type SelectType,
} from './Select';

// The height is smaller for the inside label variant since the label takes
// up space above the input.
const LABEL_VARIANT_INSIDE_HEIGHT = 32;
const COMPACT_HEIGHT = 40;
const DEFAULT_HEIGHT = 56;

const noFocusOutlineCss = css`
  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
  }
`;

const variantColor: Record<string, ThemeVars.Color> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

type DefaultSelectControlBase = <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectControlProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLElement> },
) => React.ReactElement;

const DefaultSelectControlComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        type,
        options,
        value,
        onChange,
        open,
        placeholder,
        disabled,
        setOpen,
        variant,
        helperText,
        label,
        labelVariant,
        contentNode,
        startNode,
        endNode: customEndNode,
        compact,
        blendStyles,
        align = 'start',
        bordered = true,
        borderWidth = bordered ? 100 : 0,
        focusedBorderWidth = bordered ? undefined : 200,
        maxSelectedOptionsToShow = 6,
        hiddenSelectedOptionsLabel = 'more',
        removeSelectedOptionAccessibilityLabel = 'Remove',
        accessibilityLabel,
        ariaHaspopup,
        tabIndex = 0,
        styles,
        classNames,
        ...props
      }: SelectControlProps<Type, SelectOptionValue>,
      ref: React.Ref<HTMLElement>,
    ) => {
      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;
      const isMultiSelect = type === 'multi';
      const shouldShowCompactLabel = compact && label && !isMultiSelect;
      const hasValue = value !== null && !(Array.isArray(value) && value.length === 0);

      // Map of options to their values
      // If multiple options share the same value, the first occurrence wins (matches native HTML select behavior)
      const optionsMap = useMemo(() => {
        const map = new Map<SelectOptionValue, SelectOption<SelectOptionValue>>();
        const isDev = process.env.NODE_ENV !== 'production';

        options.forEach((option, optionIndex) => {
          if (isSelectOptionGroup<Type, SelectOptionValue>(option)) {
            option.options.forEach((groupOption, groupOptionIndex) => {
              if (groupOption.value !== null) {
                const value = groupOption.value as SelectOptionValue;
                // Only set if not already present (first wins)
                if (!map.has(value)) {
                  map.set(value, groupOption);
                } else if (isDev) {
                  console.warn(
                    `[Select] Duplicate option value detected: "${value}". ` +
                      `The first occurrence will be used for display. ` +
                      `Found duplicate in group "${option.label}" at index ${groupOptionIndex}. ` +
                      `First occurrence was at option index ${optionIndex}.`,
                  );
                }
              }
            });
          } else {
            // It's a single option
            const singleOption = option as SelectOption<SelectOptionValue>;
            if (singleOption.value !== null) {
              const value = singleOption.value;
              if (!map.has(value)) {
                map.set(value, singleOption);
              } else if (isDev) {
                const existingOption = map.get(value);
                console.warn(
                  `[Select] Duplicate option value detected: "${value}". ` +
                    `The first occurrence will be used for display. ` +
                    `Found duplicate at option index ${optionIndex}. ` +
                    `First occurrence label: "${existingOption?.label ?? existingOption?.value ?? 'unknown'}".`,
                );
              }
            }
          }
        });
        return map;
      }, [options]);

      const singleValueContent = useMemo(() => {
        const option = !isMultiSelect ? optionsMap.get(value as SelectOptionValue) : undefined;
        const label = option?.label ?? option?.description ?? option?.value ?? placeholder;
        return hasValue ? label : placeholder;
      }, [hasValue, isMultiSelect, optionsMap, placeholder, value]);

      const computedControlAccessibilityLabel = useMemo(() => {
        // For multi-select, set the label to the content of each selected value and the hidden selected options label
        if (isMultiSelect) {
          const selectedValues = (value as SelectOptionValue[])
            .map((v) => {
              const option = optionsMap.get(v);
              return option?.label ?? option?.description ?? option?.value ?? v;
            })
            .slice(0, maxSelectedOptionsToShow)
            .join(', ');
          return `${accessibilityLabel}, ${(value as SelectOptionValue[]).length > 0 ? selectedValues : (placeholder ?? '')}${(value as SelectOptionValue[]).length > maxSelectedOptionsToShow ? ', ' + hiddenSelectedOptionsLabel : ''}`;
        }
        // If value is React node, fallback to only using passed in accessibility label
        return `${accessibilityLabel ?? ''}${typeof singleValueContent === 'string' ? ', ' + singleValueContent : ''}`;
      }, [
        accessibilityLabel,
        hiddenSelectedOptionsLabel,
        isMultiSelect,
        maxSelectedOptionsToShow,
        optionsMap,
        placeholder,
        singleValueContent,
        value,
      ]);

      const controlPressableRef = useRef<HTMLButtonElement>(null);
      const valueNodeContainerRef = useRef<HTMLDivElement>(null);
      const handleUnselectValue = useCallback(
        (event: React.MouseEvent, index: number) => {
          // Unselect the value
          event.stopPropagation();
          const currentValue = [...(value as SelectOptionValue[])];
          const changedValue = currentValue[index];
          onChange?.(changedValue as ValueType);

          // Shift focus from the valueNode that will be removed
          // If there will be no values left after removing, focus the control
          if (currentValue.length === 1) return controlPressableRef.current?.focus();
          if (!valueNodeContainerRef.current) return;
          // Otherwise focus the next value
          const valueNodes = Array.from(
            valueNodeContainerRef.current.querySelectorAll('[data-selected-value]'),
          ) as HTMLElement[];

          const focusIndex = findClosestNonDisabledNodeIndex(valueNodes, index);
          if (focusIndex === null) return controlPressableRef.current?.focus();
          (valueNodes[focusIndex] as HTMLElement)?.focus();
        },
        [onChange, value],
      );

      const interactableBlendStyles = useMemo(
        () =>
          isMultiSelect
            ? {
                hoveredBackground: 'rgba(0, 0, 0, 0)',
                hoveredOpacity: 1,
                pressedBackground: 'rgba(0, 0, 0, 0)',
                ...blendStyles,
              }
            : blendStyles,
        [isMultiSelect, blendStyles],
      );

      const helperTextNode = useMemo(
        () =>
          typeof helperText === 'string' ? (
            <HelperText
              className={classNames?.controlHelperTextNode}
              color={variant ? variantColor[variant] : 'fgMuted'}
              style={styles?.controlHelperTextNode}
            >
              {helperText}
            </HelperText>
          ) : (
            helperText
          ),
        [helperText, variant, classNames?.controlHelperTextNode, styles?.controlHelperTextNode],
      );

      const labelNode = useMemo(
        () =>
          labelVariant === 'inside' ? (
            <Pressable noScaleOnPress onClick={() => setOpen((s) => !s)} tabIndex={-1}>
              <InputLabel
                className={classNames?.controlLabelNode}
                color="fg"
                paddingBottom={0}
                paddingStart={2}
                style={styles?.controlLabelNode}
              >
                {label}
              </InputLabel>
            </Pressable>
          ) : typeof label === 'string' ? (
            <InputLabel
              className={classNames?.controlLabelNode}
              color="fg"
              style={styles?.controlLabelNode}
            >
              {label}
            </InputLabel>
          ) : (
            label
          ),
        [labelVariant, classNames?.controlLabelNode, styles?.controlLabelNode, label, setOpen],
      );

      const valueNode = useMemo(() => {
        if (hasValue && isMultiSelect) {
          const valuesToShow =
            value.length <= maxSelectedOptionsToShow
              ? (value as SelectOptionValue[])
              : (value as SelectOptionValue[]).slice(0, maxSelectedOptionsToShow);
          const optionsToShow = valuesToShow
            .map((value) => optionsMap.get(value))
            .filter((option): option is SelectOption<SelectOptionValue> => option !== undefined);
          return (
            <HStack flexWrap="wrap" gap={1}>
              {optionsToShow.map((option, index) => {
                const accessibilityLabel =
                  typeof option.label === 'string'
                    ? option.label
                    : typeof option.description === 'string'
                      ? option.description
                      : (option.value ?? '');
                return (
                  <InputChip
                    key={option.value}
                    compact
                    data-selected-value
                    accessibilityLabel={`${removeSelectedOptionAccessibilityLabel} ${accessibilityLabel}`}
                    borderWidth={0}
                    disabled={option.disabled}
                    invertColorScheme={false}
                    maxWidth={200}
                    onClick={(event) => handleUnselectValue(event, index)}
                  >
                    {option.label ?? option.description ?? option.value ?? ''}
                  </InputChip>
                );
              })}
              {value.length - maxSelectedOptionsToShow > 0 && (
                <InputChip compact borderWidth={0} end={null} invertColorScheme={false}>
                  {`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}
                </InputChip>
              )}
            </HStack>
          );
        }

        return typeof singleValueContent === 'string' ? (
          <Text
            as="p"
            color={hasValue ? 'fg' : 'fgMuted'}
            display="block"
            font="body"
            overflow="truncate"
            textAlign={align}
            width="100%"
          >
            {singleValueContent}
          </Text>
        ) : (
          singleValueContent
        );
      }, [
        hasValue,
        isMultiSelect,
        singleValueContent,
        align,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        optionsMap,
        removeSelectedOptionAccessibilityLabel,
        handleUnselectValue,
      ]);

      const inputNode = useMemo(
        () => (
          // We don't offer control over setting the role since this must always be a button
          <Pressable
            ref={controlPressableRef}
            noScaleOnPress
            accessibilityLabel={computedControlAccessibilityLabel}
            aria-haspopup={ariaHaspopup}
            background="transparent"
            blendStyles={interactableBlendStyles}
            borderWidth={0}
            className={cx(noFocusOutlineCss, classNames?.controlInputNode)}
            disabled={disabled}
            flexGrow={1}
            flexShrink={1}
            focusable={false}
            minHeight={
              labelVariant === 'inside'
                ? LABEL_VARIANT_INSIDE_HEIGHT
                : compact
                  ? COMPACT_HEIGHT
                  : DEFAULT_HEIGHT
            }
            minWidth={0}
            onClick={() => setOpen((s) => !s)}
            paddingStart={1}
            style={styles?.controlInputNode}
            tabIndex={tabIndex}
          >
            {!!startNode && (
              <HStack
                alignItems="center"
                className={classNames?.controlStartNode}
                height="100%"
                justifyContent="center"
                minWidth={0}
                paddingX={1}
                style={styles?.controlStartNode}
              >
                {startNode}
              </HStack>
            )}
            {shouldShowCompactLabel ? (
              <HStack alignItems="center" paddingX={1}>
                {labelNode}
              </HStack>
            ) : null}
            <HStack
              alignItems="center"
              flexGrow={1}
              flexShrink={1}
              height="100%"
              justifyContent="space-between"
              minWidth={0}
              width="100%"
            >
              <VStack
                ref={valueNodeContainerRef}
                alignItems={align}
                className={classNames?.controlValueNode}
                flexGrow={1}
                flexShrink={1}
                flexWrap="wrap"
                gap={1}
                justifyContent="flex-start"
                minWidth={0}
                overflow="hidden"
                paddingX={1}
                paddingY={labelVariant === 'inside' && !isMultiSelect ? 0 : compact ? 1 : 1.5}
                style={styles?.controlValueNode}
              >
                {valueNode}
                {contentNode}
              </VStack>
            </HStack>
          </Pressable>
        ),
        [
          computedControlAccessibilityLabel,
          ariaHaspopup,
          interactableBlendStyles,
          classNames?.controlInputNode,
          classNames?.controlStartNode,
          classNames?.controlValueNode,
          disabled,
          labelVariant,
          compact,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          tabIndex,
          startNode,
          shouldShowCompactLabel,
          labelNode,
          align,
          isMultiSelect,
          valueNode,
          contentNode,
          setOpen,
        ],
      );

      const endNode = useMemo(
        () => (
          <Pressable aria-hidden flexShrink={0} onClick={() => setOpen((s) => !s)} tabIndex={-1}>
            <HStack
              alignItems="center"
              className={classNames?.controlEndNode}
              flexGrow={1}
              height="100%"
              justifyContent={labelVariant === 'inside' ? 'flex-end' : undefined}
              paddingX={2}
              paddingY={compact ? 1 : 1.5}
              style={styles?.controlEndNode}
            >
              {customEndNode ? (
                customEndNode
              ) : (
                <AnimatedCaret
                  color={!open ? 'fg' : variant ? variantColor[variant] : 'fgPrimary'}
                  rotate={open ? 0 : 180}
                />
              )}
            </HStack>
          </Pressable>
        ),
        [
          classNames?.controlEndNode,
          labelVariant,
          compact,
          styles?.controlEndNode,
          customEndNode,
          open,
          variant,
          setOpen,
        ],
      );

      return (
        <InputStack
          ref={ref}
          blendStyles={interactableBlendStyles}
          borderWidth={borderWidth}
          disabled={disabled}
          endNode={endNode}
          focusedBorderWidth={focusedBorderWidth}
          helperTextNode={helperTextNode}
          inputNode={inputNode}
          labelNode={shouldShowCompactLabel ? null : labelNode}
          labelVariant={labelVariant}
          variant={variant}
          {...props}
        />
      );
    },
  ),
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlBase;
