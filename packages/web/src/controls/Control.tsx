import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { isDevelopment } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box } from '../layout/Box';
import { Interactable, type InteractableBaseProps } from '../system/Interactable';
import type { FilteredHTMLAttributes } from '../types';
import { Text } from '../typography/Text';
import { isRtl } from '../utils/isRtl';

const COMPONENT_STATIC_CLASSNAME = 'cds-Control';

const pointerCss = css`
  &:not(:disabled),
  &:not(:read-only) {
    cursor: pointer;
  }
`;

const inputBaseCss = css`
  margin: 0;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${zIndex.interactable};
`;

const interactableCss = css`
  height: fit-content;
  width: fit-content;
  position: relative;
  @supports selector(:has(:focus-visible)) {
    &:has(:focus-visible) {
      outline-style: solid;
      outline-width: 2px;
      outline-color: var(--color-bgPrimary);
      outline-offset: 1px;
    }
  }
  /* turn off control input opacity for hidden control in interactable */
  &:active,
  &:visited,
  &:focus,
  &:hover {
    > input:first-of-type {
      opacity: 0;
    }
  }
`;

export type ControlBaseProps<T extends string> = FilteredHTMLAttributes<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'color'
> &
  SharedProps &
  Partial<
    Pick<
      InteractableBaseProps,
      'background' | 'borderColor' | 'borderRadius' | 'borderWidth' | 'color' | 'elevation'
    >
  > & {
    /** Label for the control option. */
    children?: React.ReactNode;
    /** Set the control to selected/on. */
    checked?: boolean;
    /** Disable user interaction. */
    disabled?: boolean;
    /** Set the control to ready-only. Similar effect as disabled. */
    readOnly?: boolean;
    /** Value of the option. Useful for multiple choice. */
    value?: T;
    /** Accessibility label describing the element. */
    accessibilityLabel?: string;
    /** Enable indeterminate state. Useful when you want to indicate that sub-items of a control are partially filled. */
    indeterminate?: boolean;
    /** Style for the icon element */
    iconStyle?: React.CSSProperties;
    /** Style for the label element */
    labelStyle?: React.CSSProperties;
  };

export type ControlProps<T extends string> = ControlBaseProps<T> & {
  label?: React.ReactNode;
  children: React.ReactNode;
};

const ControlWithRef = forwardRef(function ControlWithRef<T extends string>(
  {
    type,
    checked,
    disabled,
    indeterminate,
    readOnly,
    required,
    value,
    children,
    label,
    'aria-labelledby': ariaLabelledby,
    background,
    borderColor,
    borderRadius,
    borderWidth,
    color = checked || indeterminate ? 'fg' : 'fgMuted',
    elevation,
    testID,
    iconStyle,
    labelStyle,
    ...htmlProps
  }: ControlProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  if (isDevelopment() && !children && !ariaLabelledby) {
    console.warn(
      `Please provide an aria label for the control component ${value} either through the children or aria-labelledby prop.`,
    );
  }
  // Setup a11y IDs
  const [id1, id2] = usePrefixedId(['trigger', 'collapsible']);
  const labelId = ariaLabelledby ?? id1;
  const inputId = htmlProps.id ?? id2;

  const internalInputRef = useRef<HTMLInputElement>();
  const inputRef = useMergeRefs(ref, internalInputRef);

  const iconElement = useMemo(
    () => (
      <Interactable
        transparentWhileInactive
        as="div"
        background={background}
        borderColor={borderColor}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        className={interactableCss}
        disabled={disabled || readOnly}
        elevation={elevation}
        style={iconStyle}
        testID={testID ? `${testID}-parent` : undefined}
      >
        {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
        <input
          ref={inputRef}
          aria-checked={checked}
          aria-labelledby={labelId}
          aria-required={type !== 'checkbox' ? required : undefined}
          checked={checked}
          className={cx(inputBaseCss, pointerCss)}
          data-testid={testID}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          type={type}
          value={value}
          {...htmlProps}
        />
        {children}
      </Interactable>
    ),
    [
      background,
      borderColor,
      borderRadius,
      borderWidth,
      checked,
      children,
      disabled,
      elevation,
      htmlProps,
      iconStyle,
      inputId,
      inputRef,
      labelId,
      readOnly,
      required,
      testID,
      type,
      value,
    ],
  );

  const controlElement = useMemo(() => {
    /**
     * If the control has label, the label's lineHeight doesn't match the icon size. We need to
     * wrap the icon with a container that match the lineHeight of the label typography and
     * center the icon inside the wrapper so that the icon will be aligned properly with the
     * first line of the label text.
     */
    if (!label) return iconElement;
    return (
      <label
        className={cx(COMPONENT_STATIC_CLASSNAME, pointerCss)}
        htmlFor={inputId}
        style={labelStyle}
      >
        <Box alignItems="flex-start" flexDirection={isRtl() ? 'row-reverse' : 'row'} gap={1}>
          <Box alignItems="center" height="var(--lineHeight-body)" role="presentation">
            {iconElement}
          </Box>
          <Text color={color} disabled={disabled || readOnly} font="body" id={labelId}>
            {label}
          </Text>
        </Box>
      </label>
    );
  }, [label, iconElement, inputId, labelStyle, color, disabled, readOnly, labelId]);

  // If no label is provided, consumer should wrap the checkbox with <label> or provide a value for the aria-labelledby prop.
  return controlElement;
}) as <T extends string>(
  props: ControlProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
