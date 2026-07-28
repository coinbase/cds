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
  type SelectSize,
  type SelectType,
} from './Select';
import { defaultSelectSize } from './types';

const selectSizeVerticalSpaceVar: Record<SelectSize, string> = {
  s: 'var(--space-1)',
  m: 'var(--space-1_5)',
  l: 'var(--space-2)',
};

// A multi-select's selected-value chips add their own height, so the vertical padding is
// tightened per size to keep the overall field height aligned with the single-select scale.
const multiSelectVerticalSpaceVar: Record<SelectSize, string> = {
  s: 'var(--space-0_5)',
  m: 'var(--space-1)',
  l: 'var(--space-1_5)',
};

// Multi-select value chips always use the compact `xs` size (even at size `l`) so several chips —
// and a stacked inside label — stay within the field's natural height.
const multiSelectValueChipSize = 'xs';

const noFocusOutlineCss = css`
  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
  }
`;

const selectedOptionChipContentCss = css`
  min-width: 0;

  & > :not(:last-child) {
    min-width: 0;
    max-width: 100%;
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
  props: SelectControlProps<Type, SelectOptionValue> & {
    ref?: React.Ref<HTMLElement>;
  },
) => React.ReactElement;

const DefaultSelectControlComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        role = 'button',
        type,
        options,
        value,
        onChange,
        open,
        placeholder,
        disabled,
        readOnly,
        setOpen,
        variant,
        helperText,
        label,
        labelVariant: labelVariantProp,
        contentNode,
        startNode,
        endNode: customEndNode,
        compact,
        size,
        blendStyles,
        align = 'start',
        font = 'body',
        labelColor = 'fg',
        labelFont = 'label1',
        bordered = true,
        borderWidth = bordered ? 100 : 0,
        focusedBorderWidth = bordered ? undefined : 200,
        inputBackground = !disabled && readOnly ? 'bgSecondary' : 'bg',
        borderRadius,
        maxSelectedOptionsToShow = 6,
        hiddenSelectedOptionsLabel = 'more',
        removeSelectedOptionAccessibilityLabel = 'Remove',
        accessibilityLabel,
        ariaHaspopup,
        tabIndex = 0,
        onKeyDown,
        styles,
        classNames,
        ...props
      }: SelectControlProps<Type, SelectOptionValue>,
      ref: React.Ref<HTMLElement>,
    ) => {
      const isInteractionBlocked = disabled || readOnly;
      const disableFocusedStyle = !bordered && focusedBorderWidth === 200;

      const handleToggleOpen = useCallback(() => {
        if (isInteractionBlocked) return;
        setOpen((currentOpen) => !currentOpen);
      }, [isInteractionBlocked, setOpen]);

      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;
      const isMultiSelect = type === 'multi';
      // `size` wins over the deprecated `compact` for geometry.
      const resolvedSize = size ?? (compact ? 's' : defaultSelectSize);
      // The deprecated `compact` only forces label placement when the caller did NOT set an explicit
      // `size`; once `size` is provided, placement follows the normal `labelVariant` rules.
      const useLegacyCompact = Boolean(compact) && size === undefined;
      const labelVariant = useLegacyCompact ? undefined : labelVariantProp;
      const hasLabel = !!label;

      // Label placement mirrors TextInput: `compact` (set alone) forces an inside label; otherwise
      // placement follows `labelVariant`. An inside label sits horizontally in the start slot at every
      // size EXCEPT `l`, where it stacks vertically above the value. Multi-select is the one exception:
      // its value chips can't share a row with an inline label, so legacy compact multi-select keeps
      // its label outside (only an explicit `inside` labelVariant places a multi-select's label inside).
      const isCompactLabel = useLegacyCompact && !isMultiSelect;
      const wantsInsideLabel = hasLabel && (isCompactLabel || labelVariant === 'inside');
      const insideVerticalLabel = wantsInsideLabel && !isCompactLabel && resolvedSize === 'l';
      const insideHorizontalLabel = wantsInsideLabel && !insideVerticalLabel;
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

      const matchedOption = useMemo(() => {
        if (isMultiSelect || value === null || Array.isArray(value)) return undefined;
        return optionsMap.get(value as SelectOptionValue);
      }, [isMultiSelect, optionsMap, value]);

      const isShowingPlaceholder = matchedOption === undefined;

      const singleValueContent = useMemo(() => {
        if (!matchedOption) return placeholder;
        return matchedOption.label ?? matchedOption.description ?? matchedOption.value;
      }, [matchedOption, placeholder]);

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

      const labelNode = useMemo(() => {
        if (insideVerticalLabel || insideHorizontalLabel) return null;

        if (typeof label === 'string') {
          return (
            <InputLabel
              className={classNames?.controlLabelNode}
              color={labelColor}
              font={labelFont}
              paddingY={0.5}
              style={styles?.controlLabelNode}
            >
              {label}
            </InputLabel>
          );
        }

        return label;
      }, [
        insideVerticalLabel,
        insideHorizontalLabel,
        classNames?.controlLabelNode,
        styles?.controlLabelNode,
        label,
        labelColor,
        labelFont,
      ]);

      const inlineLabelNode = useMemo(() => {
        if (!insideVerticalLabel && !insideHorizontalLabel) return null;

        if (typeof label === 'string') {
          return (
            <InputLabel
              className={classNames?.controlLabelNode}
              color={labelColor}
              font={labelFont}
              paddingY={0}
              style={styles?.controlLabelNode}
            >
              {label}
            </InputLabel>
          );
        }

        return label;
      }, [
        insideVerticalLabel,
        insideHorizontalLabel,
        classNames?.controlLabelNode,
        styles?.controlLabelNode,
        label,
        labelColor,
        labelFont,
      ]);

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
                    data-selected-value
                    accessibilityLabel={`${removeSelectedOptionAccessibilityLabel} ${accessibilityLabel}`}
                    borderWidth={0}
                    classNames={{ content: selectedOptionChipContentCss }}
                    disabled={option.disabled}
                    invertColorScheme={false}
                    maxWidth={200}
                    onClick={
                      isInteractionBlocked
                        ? undefined
                        : (event) => handleUnselectValue(event, index)
                    }
                    size={multiSelectValueChipSize}
                  >
                    {option.label ?? option.description ?? option.value ?? ''}
                  </InputChip>
                );
              })}
              {value.length - maxSelectedOptionsToShow > 0 && (
                <InputChip
                  borderWidth={0}
                  end={null}
                  invertColorScheme={false}
                  size={multiSelectValueChipSize}
                >
                  {`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}
                </InputChip>
              )}
            </HStack>
          );
        }

        return typeof singleValueContent === 'string' ? (
          <Text
            as="p"
            color={isShowingPlaceholder ? 'fgMuted' : 'fg'}
            display="block"
            font={font}
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
        isShowingPlaceholder,
        singleValueContent,
        font,
        align,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        optionsMap,
        removeSelectedOptionAccessibilityLabel,
        handleUnselectValue,
        isInteractionBlocked,
      ]);

      const inputNode = useMemo(
        () => (
          <Pressable
            ref={controlPressableRef}
            noScaleOnPress
            accessibilityLabel={computedControlAccessibilityLabel}
            aria-expanded={open}
            aria-haspopup={ariaHaspopup}
            aria-readonly={readOnly}
            as={role === 'combobox' ? 'div' : 'button'}
            background="transparent"
            blendStyles={interactableBlendStyles}
            borderWidth={0}
            className={cx(noFocusOutlineCss, classNames?.controlInputNode)}
            disabled={disabled}
            flexGrow={1}
            flexShrink={1}
            focusable={false}
            minWidth={0}
            onClick={handleToggleOpen}
            onKeyDown={onKeyDown}
            role={role}
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
                paddingEnd={2}
                style={styles?.controlStartNode}
              >
                {startNode}
              </HStack>
            )}
            {insideHorizontalLabel ? (
              <HStack alignItems="center" flexShrink={0} paddingEnd={1}>
                {inlineLabelNode}
              </HStack>
            ) : null}
            {insideVerticalLabel ? (
              <VStack flexGrow={1} minWidth={0} width="100%">
                {inlineLabelNode}
                <HStack alignItems="center" flexGrow={1} minWidth={0} width="100%">
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
                    style={styles?.controlValueNode}
                  >
                    {valueNode}
                    {contentNode}
                  </VStack>
                </HStack>
              </VStack>
            ) : (
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
                  style={styles?.controlValueNode}
                >
                  {valueNode}
                  {contentNode}
                </VStack>
              </HStack>
            )}
          </Pressable>
        ),
        [
          computedControlAccessibilityLabel,
          ariaHaspopup,
          open,
          role,
          interactableBlendStyles,
          classNames?.controlInputNode,
          classNames?.controlStartNode,
          classNames?.controlValueNode,
          disabled,
          readOnly,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          tabIndex,
          onKeyDown,
          startNode,
          insideHorizontalLabel,
          insideVerticalLabel,
          inlineLabelNode,
          align,
          valueNode,
          contentNode,
          handleToggleOpen,
        ],
      );

      const endNode = useMemo(
        () => (
          <Pressable aria-hidden flexShrink={0} onClick={handleToggleOpen} tabIndex={-1}>
            <HStack
              alignItems="center"
              className={classNames?.controlEndNode}
              flexGrow={1}
              height="100%"
              justifyContent={insideVerticalLabel ? 'flex-end' : undefined}
              paddingStart={2}
              style={styles?.controlEndNode}
            >
              {customEndNode ? customEndNode : <AnimatedCaret color="fg" rotate={open ? 0 : 180} />}
            </HStack>
          </Pressable>
        ),
        [
          classNames?.controlEndNode,
          insideVerticalLabel,
          styles?.controlEndNode,
          customEndNode,
          open,
          handleToggleOpen,
        ],
      );

      const inputStackStyles = useMemo(() => {
        let verticalSpaceVar: string;
        if (insideVerticalLabel) {
          // A vertically-stacked inside label (size `l`) tightens the padding so the stacked label +
          // value fit the same 58px field an outside label produces. A multi-select with chips
          // (taller than a single text line) tightens further.
          verticalSpaceVar = isMultiSelect && hasValue ? 'var(--space-0_25)' : 'var(--space-0_75)';
        } else if (isMultiSelect && hasValue) {
          verticalSpaceVar = multiSelectVerticalSpaceVar[resolvedSize];
        } else {
          verticalSpaceVar = selectSizeVerticalSpaceVar[resolvedSize];
        }
        return {
          paddingTop: verticalSpaceVar,
          paddingBottom: verticalSpaceVar,
          paddingLeft: 'var(--space-2)',
          paddingRight: 'var(--space-2)',
        };
      }, [insideVerticalLabel, resolvedSize, isMultiSelect, hasValue]);

      return (
        <InputStack
          ref={ref}
          blendStyles={interactableBlendStyles}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          disableFocusedStyle={disableFocusedStyle}
          disabled={disabled}
          endNode={endNode}
          focused={open && !readOnly}
          focusedBorderWidth={focusedBorderWidth}
          helperTextNode={helperTextNode}
          inputBackground={inputBackground}
          inputNode={inputNode}
          labelNode={labelNode}
          labelVariant={insideVerticalLabel ? 'inside' : 'outside'}
          styles={{ input: inputStackStyles }}
          variant={variant}
          {...props}
        />
      );
    },
  ),
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlBase;
