import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { Chip } from '../../chips/Chip';
import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { HStack } from '../../layout/HStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { findClosestNonDisabledNodeIndex } from '../../utils/findClosestNoneDisabledNodeIndex';

import type { SelectControlComponent } from './Select';

const variantColor: Record<string, ThemeVars.Color> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

export const DefaultSelectControl: SelectControlComponent<'single' | 'multi'> = memo(
  forwardRef(
    (
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
        compact,
        blendStyles,
        maxSelectedOptionsToShow = 6,
        ariaHaspopup,
        ...props
      },
      ref: React.Ref<HTMLElement>,
    ) => {
      const shouldShowCompactLabel = compact && label;
      const isMultiSelect = type === 'multi';
      const hasValue = value !== null && value.length > 0;

      const controlPressableRef = useRef<HTMLButtonElement>(null);
      const valueNodeContainerRef = useRef<HTMLDivElement>(null);

      const handleUnselectValue = useCallback(
        (e: React.MouseEvent, index: number) => {
          // Unselect the value
          e.stopPropagation();
          const currentValue = [...(value as string[])];
          const changedValue = currentValue[index];
          onChange?.(changedValue);

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

      const helperTextNode = useMemo(
        () =>
          typeof helperText === 'string' ? (
            <HelperText color={variant ? variantColor[variant] : 'fgMuted'} overflow="truncate">
              {helperText}
            </HelperText>
          ) : (
            helperText
          ),
        [helperText, variant],
      );

      const labelNode = useMemo(
        () =>
          typeof label === 'string' && labelVariant === 'inside' ? (
            <InputLabel color="fg" paddingBottom={0} paddingTop={1} paddingX={2}>
              {label}
            </InputLabel>
          ) : (
            label
          ),
        [label, labelVariant],
      );

      const interactableBlendStyles = useMemo(
        () =>
          isMultiSelect
            ? {
                hoveredBackground: 'rgba(0, 0, 0, 0)',
                hoveredOpacity: 1,
                ...blendStyles,
              }
            : blendStyles,
        [isMultiSelect, blendStyles],
      );

      const valueNode = useMemo(() => {
        if (hasValue && isMultiSelect) {
          const renderedValues =
            value.length <= maxSelectedOptionsToShow
              ? (value as string[])
              : (value as string[]).slice(0, maxSelectedOptionsToShow);
          // Optimization to avoid mapping through options array for every <InputChip> rendered
          const disabledOptionsIndexes = options
            .filter((option) => option.disabled)
            .map((option) => renderedValues.indexOf(option.value ?? ''));
          return (
            <>
              {renderedValues.map((v, index) => (
                <InputChip
                  key={v}
                  data-selected-value
                  disabled={disabledOptionsIndexes.includes(index)}
                  invertColorScheme={false}
                  maxWidth={200}
                  onClick={(event) => handleUnselectValue(event, index)}
                  value={v}
                />
              ))}
              {value.length - maxSelectedOptionsToShow > 0 && (
                <Chip>{`+${value.length - maxSelectedOptionsToShow} more`}</Chip>
              )}
            </>
          );
        }
        return (
          <Text
            as="p"
            color={hasValue ? 'fg' : 'fgMuted'}
            display="block"
            font="body"
            overflow="truncate"
          >
            {hasValue ? value : placeholder}
          </Text>
        );
      }, [
        hasValue,
        isMultiSelect,
        value,
        placeholder,
        maxSelectedOptionsToShow,
        options,
        handleUnselectValue,
      ]);

      const inputNode = useMemo(
        () => (
          // We don't offer control over setting the role since this must always be a button
          <Pressable
            ref={controlPressableRef}
            noScaleOnPress
            aria-haspopup={ariaHaspopup}
            background="transparent"
            blendStyles={interactableBlendStyles}
            disabled={disabled}
            minHeight={isMultiSelect ? 76 : undefined}
            onClick={() => setOpen((s) => !s)}
            paddingStart={1}
            width="100%"
          >
            {!!startNode && (
              <HStack
                alignItems="center"
                height="100%"
                justifyContent="center"
                minWidth={0}
                paddingX={1}
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
                flexGrow={1}
                flexShrink={1}
                flexWrap="wrap"
                gap={1}
                height="100%"
                justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
                overflow="auto"
                paddingTop={labelVariant === 'inside' ? 0 : compact ? 1 : 2}
                paddingX={1}
                paddingY={compact || labelVariant === 'inside' ? 1 : 2}
              >
                {valueNode}
              </HStack>
            </HStack>
          </Pressable>
        ),
        [
          ariaHaspopup,
          disabled,
          isMultiSelect,
          startNode,
          shouldShowCompactLabel,
          label,
          labelVariant,
          compact,
          valueNode,
          setOpen,
          interactableBlendStyles,
        ],
      );

      const animatedCaretNode = useMemo(
        () => (
          <HStack alignItems="center" paddingX={2}>
            <AnimatedCaret
              color={open ? (variant ? variantColor[variant] : 'fgPrimary') : 'fg'}
              rotate={open ? 0 : 180}
            />
          </HStack>
        ),
        [open, variant],
      );

      return (
        <InputStack
          ref={ref as React.Ref<HTMLDivElement>}
          blendStyles={interactableBlendStyles}
          disabled={disabled}
          endNode={animatedCaretNode}
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
