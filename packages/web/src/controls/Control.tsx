import React, { forwardRef, memo, useMemo, useRef } from 'react';
import { useMergeRefs } from '@coinbase/cds-common/hooks/useMergeRefs';
import { usePrefixedId } from '@coinbase/cds-common/hooks/usePrefixedId';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { isDevelopment } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';
import { Interactable, type InteractableBaseProps } from '../system/Interactable';
import type { FilteredHTMLAttributes, StylesAndClassNames } from '../types';
import { Text } from '../typography/Text';
import { isRtl } from '../utils/isRtl';

/**
 * Static class names for Control component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const controlClassNames = {
  /** Persistent outer wrapper across labeled and unlabeled variants. */
  root: 'cds-Control',
  /** Native `<label>` wrapper element. */
  label: 'cds-Control-label',
  /** Interactable icon wrapper element. */
  icon: 'cds-Control-icon',
  /** Native input element. */
  input: 'cds-Control-input',
} as const;

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

export type ControlBaseProps<ControlValue extends string> = FilteredHTMLAttributes<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'color'
> &
  SharedProps &
  Partial<
    Pick<
      InteractableBaseProps,
      | 'background'
      | 'borderColor'
      | 'borderRadius'
      | 'borderWidth'
      | 'color'
      | 'elevation'
      | 'className'
      | 'style'
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
    value?: ControlValue;
    /** Accessibility label describing the element. */
    accessibilityLabel?: string;
    /** Enable indeterminate state. Useful when you want to indicate that sub-items of a control are partially filled. */
    indeterminate?: boolean;
    /** Style for the icon element */
    iconStyle?: React.CSSProperties;
    /** Style for the label element */
    labelStyle?: React.CSSProperties;
  };

export type ControlProps<ControlValue extends string> = ControlBaseProps<ControlValue> &
  StylesAndClassNames<typeof controlClassNames> & {
    label?: React.ReactNode;
    children: React.ReactNode;
  };

const ControlWithRef = forwardRef(function ControlWithRef<ControlValue extends string>(
  _props: ControlProps<ControlValue>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const mergedProps = useComponentConfig('Control', _props);
  const {
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
    className,
    style,
    classNames,
    styles,
    ...htmlProps
  } = mergedProps;
  if (isDevelopment() && !children && !ariaLabelledby) {
    console.warn(
      `Please provide an aria label for the control component ${value} either through the children or aria-labelledby prop.`,
    );
  }
  // Setup a11y IDs
  const [id1, id2] = usePrefixedId(['trigger', 'collapsible']);
  const labelId = ariaLabelledby ?? id1;
  const inputId = htmlProps.id ?? id2;

  const internalInputRef = useRef<HTMLInputElement>(undefined);
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
        className={cx(interactableCss, controlClassNames.icon, classNames?.icon)}
        disabled={disabled || readOnly}
        elevation={elevation}
        style={{ ...iconStyle, ...styles?.icon }}
        testID={testID ? `${testID}-parent` : undefined}
      >
        {/* eslint-disable-next-line jsx-a11y/role-supports-aria-props */}
        <input
          ref={inputRef}
          aria-checked={checked}
          aria-labelledby={labelId}
          aria-required={type !== 'checkbox' ? required : undefined}
          checked={checked}
          className={cx(inputBaseCss, pointerCss, controlClassNames.input, classNames?.input)}
          data-testid={testID}
          disabled={disabled}
          id={inputId}
          readOnly={readOnly}
          required={required}
          style={styles?.input}
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
      classNames?.icon,
      classNames?.input,
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
      styles?.icon,
      styles?.input,
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
        className={cx(pointerCss, controlClassNames.label, classNames?.label)}
        htmlFor={inputId}
        style={{ ...labelStyle, ...styles?.label }}
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
  }, [
    label,
    iconElement,
    inputId,
    labelStyle,
    color,
    disabled,
    readOnly,
    labelId,
    classNames?.label,
    styles?.label,
  ]);

  // If no label is provided, consumer should wrap the checkbox with <label> or provide a value for the aria-labelledby prop.
  return (
    <Box
      className={cx(controlClassNames.root, className, classNames?.root)}
      style={{ ...style, ...styles?.root }}
      width="fit-content"
    >
      {controlElement}
    </Box>
  );
}) as <ControlValue extends string>(
  props: ControlProps<ControlValue> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

export const Control = memo(ControlWithRef) as typeof ControlWithRef &
  React.MemoExoticComponent<typeof ControlWithRef>;
