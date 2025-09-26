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
        startNode,
        compact,
        style,
        blendStyles,
        className,
        maxSelectedOptionsToShow = 6,
        accessibilityLabel,
        ariaHaspopup,
        testID,
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
          // Otherwise focus the next value
          const valueNodes = Array.from(
            valueNodeContainerRef.current?.querySelectorAll('button') ?? [],
          );
          valueNodes.splice(index, 1);
          // Handle edge case where index mapped to the valueNode that will be removed
          if (index >= valueNodes.length) {
            index = valueNodes.length - 1;
          }

          let nextValueNodeToFocus = valueNodes[index];
          let endOfValueNodesReachedByIndex = false;
          // Loop up through the valueNodes to find the next enabled valueNode
          // If end of valueNodes is reached, loop back to the beginning
          while (nextValueNodeToFocus && nextValueNodeToFocus.disabled) {
            if (index >= valueNodes.length - 1) {
              endOfValueNodesReachedByIndex = true;
            }
            if (endOfValueNodesReachedByIndex) {
              index -= 1;
            } else {
              index += 1;
            }
            nextValueNodeToFocus = valueNodes[index];
          }
          if (nextValueNodeToFocus) {
            nextValueNodeToFocus?.focus();
          } else {
            controlPressableRef.current?.focus();
          }
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
            blendStyles={blendStyles}
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
                paddingX={1}
                paddingY={compact ? 1 : 2}
              >
                {valueNode}
              </HStack>
              <HStack alignItems="center" paddingX={2}>
                <AnimatedCaret
                  color={open ? (variant ? variantColor[variant] : 'fgPrimary') : 'fg'}
                  rotate={open ? 0 : 180}
                />
              </HStack>
            </HStack>
          </Pressable>
        ),
        [
          blendStyles,
          ariaHaspopup,
          disabled,
          isMultiSelect,
          startNode,
          shouldShowCompactLabel,
          label,
          compact,
          valueNode,
          open,
          variant,
          setOpen,
        ],
      );

      return (
        <InputStack
          ref={ref as React.Ref<HTMLDivElement>}
          accessibilityLabel={accessibilityLabel}
          className={className}
          disabled={disabled}
          helperTextNode={helperTextNode}
          inputNode={inputNode}
          labelNode={shouldShowCompactLabel ? null : label}
          style={style}
          testID={testID}
          variant={variant}
        />
      );
    },
  ),
);
