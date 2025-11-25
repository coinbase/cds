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
        contentNode,
        startNode,
        endNode: customEndNode,
        compact,
        blendStyles,
        maxSelectedOptionsToShow = 6,
        hiddenSelectedOptionsLabel = 'more',
        removeSelectedOptionAccessibilityLabel = 'Remove',
        accessibilityLabel,
        ariaHaspopup,
        styles,
        classNames,
        ...props
      }: SelectControlProps<Type, SelectOptionValue>,
      ref: React.Ref<HTMLElement>,
    ) => {
      type ValueType = Type extends 'multi'
        ? SelectOptionValue | SelectOptionValue[] | null
        : SelectOptionValue | null;
      const shouldShowCompactLabel = compact && label;
      const isMultiSelect = type === 'multi';
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
          typeof label === 'string' ? (
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
        [label, classNames?.controlLabelNode, styles?.controlLabelNode],
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

        const option = !isMultiSelect ? optionsMap.get(value as SelectOptionValue) : undefined;
        const label = option?.label ?? option?.description ?? option?.value ?? placeholder;
        const content = hasValue ? label : placeholder;
        return typeof content === 'string' ? (
          <Text
            as="p"
            color={hasValue ? 'fg' : 'fgMuted'}
            display="block"
            font="body"
            overflow="truncate"
          >
            {content}
          </Text>
        ) : (
          content
        );
      }, [
        hasValue,
        isMultiSelect,
        optionsMap,
        placeholder,
        value,
        maxSelectedOptionsToShow,
        hiddenSelectedOptionsLabel,
        removeSelectedOptionAccessibilityLabel,
        handleUnselectValue,
      ]);

      const inputNode = useMemo(
        () => (
          // We don't offer control over setting the role since this must always be a button
          <Pressable
            ref={controlPressableRef}
            noScaleOnPress
            accessibilityLabel={accessibilityLabel}
            aria-haspopup={ariaHaspopup}
            background="transparent"
            blendStyles={interactableBlendStyles}
            borderWidth={0}
            className={cx(noFocusOutlineCss, classNames?.controlInputNode)}
            disabled={disabled}
            flexGrow={1}
            focusable={false}
            minHeight={compact ? COMPACT_HEIGHT : DEFAULT_HEIGHT}
            onClick={() => setOpen((s) => !s)}
            paddingStart={1}
            style={styles?.controlInputNode}
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
              <HStack alignItems="center" height="100%" paddingStart={1} width="40%">
                <InputLabel color="fg" overflow="truncate">
                  {label}
                </InputLabel>
              </HStack>
            ) : null}
            <HStack
              alignItems="center"
              borderRadius={200}
              justifyContent="space-between"
              width={shouldShowCompactLabel ? '60%' : '100%'}
            >
              <VStack
                ref={valueNodeContainerRef}
                alignItems="flex-start"
                className={classNames?.controlValueNode}
                flexGrow={1}
                flexShrink={1}
                flexWrap="wrap"
                gap={1}
                justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
                overflow="auto"
                paddingX={1}
                paddingY={compact ? 1 : 1.5}
                style={styles?.controlValueNode}
              >
                {valueNode}
                {contentNode}
              </VStack>
            </HStack>
          </Pressable>
        ),
        [
          accessibilityLabel,
          ariaHaspopup,
          interactableBlendStyles,
          classNames?.controlInputNode,
          classNames?.controlStartNode,
          classNames?.controlValueNode,
          disabled,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          startNode,
          shouldShowCompactLabel,
          label,
          compact,
          valueNode,
          contentNode,
          setOpen,
        ],
      );

      const endNode = useMemo(
        () => (
          <Pressable
            aria-hidden
            onClick={() => setOpen((s) => !s)}
            style={{ flexGrow: 1 }}
            tabIndex={-1}
          >
            <HStack
              alignItems="center"
              className={classNames?.controlEndNode}
              flexGrow={1}
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
          disabled={disabled}
          endNode={endNode}
          helperTextNode={helperTextNode}
          inputNode={inputNode}
          labelNode={shouldShowCompactLabel ? null : labelNode}
          variant={variant}
          {...props}
        />
      );
    },
  ),
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlBase;
