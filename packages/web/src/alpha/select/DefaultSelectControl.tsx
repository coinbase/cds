import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { Chip } from '../../chips/Chip';
import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { cx } from '../../cx';
import { HStack } from '../../layout/HStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { findClosestNonDisabledNodeIndex } from '../../utils/findClosestNonDisabledNodeIndex';

import type { SelectControlProps, SelectOption, SelectType } from './Select';

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
          typeof label === 'string' && labelVariant === 'inside' ? (
            <Pressable
              noScaleOnPress
              className={classNames?.controlLabelNode}
              disabled={disabled}
              onClick={() => setOpen((s) => !s)}
              style={styles?.controlLabelNode}
              tabIndex={-1}
            >
              <InputLabel color="fg" paddingBottom={0} paddingTop={1} paddingX={2}>
                {label}
              </InputLabel>
            </Pressable>
          ) : (
            label
          ),
        [
          label,
          labelVariant,
          disabled,
          setOpen,
          classNames?.controlLabelNode,
          styles?.controlLabelNode,
        ],
      );

      const valueNode = useMemo(() => {
        if (hasValue && isMultiSelect) {
          const valuesToShow =
            value.length <= maxSelectedOptionsToShow
              ? (value as string[])
              : (value as string[]).slice(0, maxSelectedOptionsToShow);
          const optionsToShow = valuesToShow
            .map((value) => options.find((option) => option.value === value))
            .filter(Boolean) as SelectOption[];
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
                <Chip>{`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}</Chip>
              )}
            </HStack>
          );
        }

        const option = options.find((option) => option.value === value);
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
        options,
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
            className={cx(noFocusOutlineCss, classNames?.controlInputNode)}
            disabled={disabled}
            focusable={false}
            minHeight={isMultiSelect ? 76 : undefined}
            onClick={() => setOpen((s) => !s)}
            paddingStart={1}
            style={styles?.controlInputNode}
            width="100%"
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
              <HStack alignItems="center" height="100%" maxWidth="40%" padding={1}>
                <InputLabel color="fg" overflow="truncate">
                  {label}
                </InputLabel>
              </HStack>
            ) : null}
            <HStack
              alignItems="center"
              borderRadius={200}
              height="100%"
              justifyContent="space-between"
              width="100%"
            >
              <HStack
                ref={valueNodeContainerRef}
                alignItems="center"
                className={classNames?.controlValueNode}
                flexGrow={1}
                flexShrink={1}
                flexWrap="wrap"
                gap={1}
                height="100%"
                justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
                overflow="auto"
                paddingTop={labelVariant === 'inside' ? 0 : compact ? 1 : 2}
                paddingX={1}
                paddingY={labelVariant === 'inside' || compact ? 1 : 2}
                style={styles?.controlValueNode}
              >
                {valueNode}
              </HStack>
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
          isMultiSelect,
          styles?.controlInputNode,
          styles?.controlStartNode,
          styles?.controlValueNode,
          startNode,
          shouldShowCompactLabel,
          label,
          labelVariant,
          compact,
          valueNode,
          setOpen,
        ],
      );

      const endNode = useMemo(
        () => (
          <HStack
            alignItems="center"
            className={classNames?.controlEndNode}
            paddingX={2}
            style={styles?.controlEndNode}
          >
            <Pressable aria-hidden onClick={() => setOpen((s) => !s)} tabIndex={-1}>
              {customEndNode ? (
                customEndNode
              ) : (
                <AnimatedCaret
                  color={!open ? 'fg' : variant ? variantColor[variant] : 'fgPrimary'}
                  rotate={open ? 0 : 180}
                />
              )}
            </Pressable>
          </HStack>
        ),
        [open, variant, setOpen, customEndNode, classNames?.controlEndNode, styles?.controlEndNode],
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
          labelVariant={labelVariant}
          variant={variant}
          {...props}
        />
      );
    },
  ),
);

export const DefaultSelectControl = DefaultSelectControlComponent as DefaultSelectControlBase;
