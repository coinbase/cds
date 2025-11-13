import React, { forwardRef, memo, useCallback, useMemo, useRef } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { Chip } from '../../chips/Chip';
import { InputChip } from '../../chips/InputChip';
import { HelperText } from '../../controls/HelperText';
import { InputLabel } from '../../controls/InputLabel';
import { InputStack } from '../../controls/InputStack';
import { NativeInput } from '../../controls/NativeInput';
import { cx } from '../../cx';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { AnimatedCaret } from '../../motion/AnimatedCaret';
import { Pressable } from '../../system/Pressable';
import type { SelectOption } from '../select/Select';

import type { ComboboxControlComponent, ComboboxControlProps } from './Combobox';

const noFocusOutlineCss = css`
  &:focus,
  &:focus-visible,
  &:focus-within {
    outline: none;
  }
`;

const nativeInputContainerCss = css`
  padding-top: var(--space-1);
  padding-bottom: var(--space-1);
  padding-inline-start: var(--space-1);
  padding-inline-end: var(--space-1);
`;

const variantColor: Record<string, ThemeVars.Color> = {
  foreground: 'fg',
  positive: 'fgPositive',
  negative: 'fgNegative',
  primary: 'fgPrimary',
  foregroundMuted: 'fgMuted',
  secondary: 'fgMuted',
};

const DefaultComboboxControlComponent = <T extends string = string>(
  {
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
    maxSelectedOptionsToShow = 6,
    hiddenSelectedOptionsLabel = 'more',
    removeSelectedOptionAccessibilityLabel = 'Remove',
    searchText,
    onSearch,
    styles,
    classNames,
    ariaHaspopup = 'listbox',
    ...props
  }: ComboboxControlProps<T>,
  ref: React.Ref<HTMLElement>,
) => {
  const shouldShowCompactLabel = compact && label;
  const hasValue = value.length > 0;

  const inputRef = useRef<HTMLInputElement>(null);
  const valueNodeContainerRef = useRef<HTMLDivElement>(null);

  const handleUnselectValue = useCallback(
    (event: React.MouseEvent, index: number) => {
      event.stopPropagation();
      const currentValue = [...value];
      const changedValue = currentValue[index];
      onChange?.(changedValue);

      // Keep focus on the input after removing a chip
      setTimeout(() => inputRef.current?.focus(), 0);
    },
    [onChange, value],
  );

  const handleInputClick = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      setOpen(true);
    },
    [setOpen],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(event.target.value);
    },
    [onSearch],
  );

  const handleInputKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      event.stopPropagation();
      if (event.key === 'Enter') {
        setOpen(!open);
      }
      // Edge case where FocusTrap behavior would cause focus to shift out of the combobox rather than on the last item
      if (event.shiftKey && event.key === 'Tab' && open) {
        event.preventDefault();
      }
    },
    [open, setOpen],
  );

  const helperTextNode = useMemo(
    () =>
      typeof helperText === 'string' ? (
        <HelperText
          className={classNames?.controlHelperTextNode}
          color={variant ? variantColor[variant] : 'fgMuted'}
          overflow="truncate"
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
          onClick={handleInputClick}
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
      handleInputClick,
      classNames?.controlLabelNode,
      styles?.controlLabelNode,
    ],
  );

  const chipsNode = useMemo(() => {
    if (!hasValue) return null;

    const valuesToShow =
      value.length <= maxSelectedOptionsToShow ? value : value.slice(0, maxSelectedOptionsToShow);
    const optionsToShow = valuesToShow
      .map((value) => options.find((option) => option.value === value))
      .filter(Boolean) as SelectOption[];

    return (
      <HStack
        ref={valueNodeContainerRef}
        alignItems="center"
        className={classNames?.controlValueNode}
        flexWrap="wrap"
        gap={1}
        padding={2}
        paddingBottom={0}
        style={styles?.controlValueNode}
      >
        {optionsToShow.map((option, index) => (
          <InputChip
            key={option.value}
            data-selected-value
            accessibilityLabel={`${removeSelectedOptionAccessibilityLabel} ${option.label ?? option.description ?? option.value ?? ''}`}
            disabled={option.disabled}
            invertColorScheme={false}
            maxWidth={200}
            onClick={(event) => handleUnselectValue(event, index)}
            tabIndex={open ? -1 : 0}
          >
            {option.label ?? option.description ?? option.value ?? ''}
          </InputChip>
        ))}
        {value.length - maxSelectedOptionsToShow > 0 && (
          <Chip>{`+${value.length - maxSelectedOptionsToShow} ${hiddenSelectedOptionsLabel}`}</Chip>
        )}
      </HStack>
    );
  }, [
    hasValue,
    value,
    maxSelectedOptionsToShow,
    classNames?.controlValueNode,
    styles?.controlValueNode,
    hiddenSelectedOptionsLabel,
    options,
    removeSelectedOptionAccessibilityLabel,
    open,
    handleUnselectValue,
  ]);

  const inputNode = useMemo(
    () => (
      <VStack
        className={cx(noFocusOutlineCss, classNames?.controlInputNode)}
        gap={0}
        style={styles?.controlInputNode}
        width="100%"
      >
        {chipsNode}
        <HStack alignItems="center" width="100%">
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
            flexGrow={1}
            paddingBottom={1}
            paddingTop={value.length > 0 ? 0 : 1}
            paddingX={1}
            width="100%"
          >
            <NativeInput
              ref={inputRef}
              tab-index
              aria-haspopup={ariaHaspopup}
              containerSpacing={nativeInputContainerCss}
              disabled={disabled}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onKeyDown={handleInputKeyDown}
              placeholder={placeholder as string}
              value={searchText}
            />
          </HStack>
        </HStack>
      </VStack>
    ),
    [
      classNames?.controlInputNode,
      classNames?.controlStartNode,
      styles?.controlInputNode,
      styles?.controlStartNode,
      chipsNode,
      startNode,
      shouldShowCompactLabel,
      label,
      value.length,
      ariaHaspopup,
      disabled,
      handleInputChange,
      handleInputClick,
      handleInputKeyDown,
      placeholder,
      searchText,
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
};

export const DefaultComboboxControl = memo(forwardRef(DefaultComboboxControlComponent)) as <
  T extends string = string,
>(
  props: ComboboxControlProps<T> & { ref?: React.Ref<HTMLElement> },
) => ReturnType<ComboboxControlComponent<T>>;
