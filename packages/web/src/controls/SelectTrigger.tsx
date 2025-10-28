import React, { forwardRef, memo } from 'react';
import { useInputVariant } from '@coinbase/cds-common/hooks/useInputVariant';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import type { InputVariant } from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { VStack } from '../layout';
import { HStack } from '../layout/HStack';
import { AnimatedCaret } from '../motion/AnimatedCaret';
import { Pressable } from '../system/Pressable';
import { Text } from '../typography/Text';

import { TextInputFocusVariantContext } from './context';
import { InputLabel } from './InputLabel';
import type { SelectBaseProps } from './Select';
import { SelectStack } from './SelectStack';

const selectTriggerMinHeight = 56;
const selectTriggerCompactMinHeight = 40;
const selectTriggerInsideLabelMinHeight = 62;

export type SelectTriggerProps = Omit<
  SelectBaseProps,
  'children' | 'focused' | 'width' | 'onChange' | 'onPress'
> & {
  triggerHasFocus: boolean;
  /** Select Dropdown menu is opened */
  visible?: boolean;
  /** Event handler for when the Select Input trigger is pressed */
  onClick?: () => void;
};

const pressableOverridesCss = css`
  padding-top: 0;
  padding-bottom: 0;
  padding-inline-end: 0;
  /* stylelint-disable a11y/content-property-no-static-value */
  &.focus-visible {
    &::before {
      content: none;
    }
  }
  /* stylelint-enable a11y/content-property-no-static-value */
`;

export const SelectTrigger = memo(
  forwardRef<HTMLElement, SelectTriggerProps>(function SelectTrigger(
    {
      compact,
      placeholder,
      disabled,
      label,
      value,
      variant,
      triggerHasFocus,
      helperText,
      onClick,
      startNode,
      visible,
      labelVariant = 'outside',
      ...props
    },
    ref,
  ) {
    const [accessibilityLabelId, accessibilityDescriptionId] = usePrefixedId([
      'label',
      'description',
    ]);
    const focusedVariant = useInputVariant(triggerHasFocus, variant as InputVariant);
    const minHeight = compact
      ? selectTriggerCompactMinHeight
      : labelVariant === 'inside'
        ? selectTriggerInsideLabelMinHeight
        : selectTriggerMinHeight;
    const shouldShowCompactLabel = compact && label;
    // this corrects for when value is initialized with an empty string, coerce it to undefined
    const sanitizedValue = value === '' ? undefined : value;

    const textNode = (
      <Text
        as="p"
        color={sanitizedValue ? 'fg' : 'fgMuted'}
        display="block"
        font="body"
        overflow="truncate"
        textAlign={shouldShowCompactLabel ? 'end' : 'start'}
      >
        {sanitizedValue ?? placeholder}
      </Text>
    );

    return (
      <SelectStack
        ref={ref}
        accessibilityDescriptionId={accessibilityDescriptionId}
        accessibilityLabelId={accessibilityLabelId}
        compact={compact}
        disabled={disabled}
        focused={triggerHasFocus}
        helperText={helperText}
        label={label}
        labelVariant={labelVariant}
        variant={variant}
      >
        <Pressable
          noScaleOnPress
          background="transparent"
          borderWidth={0}
          className={pressableOverridesCss}
          minHeight={minHeight}
          minWidth={0}
          onClick={onClick}
          paddingStart={startNode ? 0 : 2}
          tabIndex={0}
          width="100%"
          {...props}
        >
          {!!startNode && (
            <HStack alignItems="center" height="100%" justifyContent="center" minWidth={0}>
              {startNode}
            </HStack>
          )}
          {shouldShowCompactLabel ? (
            <HStack alignItems="center" height="100%" maxWidth="40%" paddingEnd={1}>
              <InputLabel color="fg" id={accessibilityLabelId} overflow="truncate">
                {label}
              </InputLabel>
            </HStack>
          ) : null}
          <HStack
            alignItems="center"
            borderRadius={200}
            height="100%"
            justifyContent="space-between"
            minWidth={0}
            width="100%"
          >
            <HStack
              flexGrow={1}
              flexShrink={1}
              height="100%"
              justifyContent={shouldShowCompactLabel ? 'flex-end' : 'flex-start'}
              minWidth={0}
              paddingY={compact || labelVariant === 'inside' ? 1 : 2}
            >
              {!compact && labelVariant === 'inside' ? (
                <VStack width="100%">
                  <InputLabel color="fg" id={accessibilityLabelId} overflow="truncate" paddingY={0}>
                    {label}
                  </InputLabel>
                  {textNode}
                </VStack>
              ) : (
                textNode
              )}
            </HStack>
            <HStack alignItems="center">
              <TextInputFocusVariantContext.Provider value={focusedVariant ?? undefined}>
                <AnimatedCaret paddingX={2} rotate={visible ? 0 : 180} />
              </TextInputFocusVariantContext.Provider>
            </HStack>
          </HStack>
        </Pressable>
      </SelectStack>
    );
  }),
);
