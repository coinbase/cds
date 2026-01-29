import React, { forwardRef, memo, useId } from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { isDevelopment } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Box, type BoxProps } from '../layout';
import { Text } from '../typography';

// Styles for container reset
const containerCss = css`
  border: none;
  margin: 0;
  padding: 0;
  min-width: 0;
`;

export type ControlGroupOption<P> = Omit<P, 'onChange' | 'checked' | 'value'>;

export type ControlGroupProps<
  ControlValue extends string,
  ControlComponentProps extends { value?: ControlValue },
> = Omit<BoxProps<'div'>, 'children' | 'onChange' | 'as'> &
  SharedProps & {
    /** The control component to render for each option. */
    ControlComponent: React.ComponentType<ControlComponentProps>;
    /** Control options for the group. */
    options: (ControlGroupOption<ControlComponentProps> & { value: ControlValue })[];
    /** Set a label for the group. */
    label?: React.ReactNode;
    /** Current selected value(s). Use a string for single-select (e.g., RadioGroup) and an array of strings for multi-select (e.g., CheckboxGroup). */
    value: ControlValue | ControlValue[];
    /** Handle change events. */
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    /** The role for the group. Use 'radiogroup' for radio buttons, 'group' for other controls. */
    role?: 'group' | 'radiogroup';
    /** The direction of the group. */
    direction?: 'horizontal' | 'vertical';
    /** The name of the group. */
    name?: string;
  };

const ControlGroupWithRef = forwardRef(function ControlGroup<
  ControlValue extends string,
  ControlComponentProps extends { value?: ControlValue },
>(
  {
    ControlComponent: ControlComponent,
    options,
    label,
    'aria-labelledby': ariaLabelledby,
    onChange,
    value,
    direction = 'vertical',
    testID,
    gap = 2,
    name,
    role = 'group',
    ...restProps
  }: ControlGroupProps<ControlValue, ControlComponentProps>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const generatedId = useId();
  const labelId = `${generatedId}-label`;

  if (isDevelopment() && !label && !ariaLabelledby) {
    console.warn('Please specify a label or aria-labelledby for the ControlGroup.');
  }

  const isMultiSelect = Array.isArray(value);

  return (
    <Box
      ref={ref}
      aria-labelledby={ariaLabelledby || (label ? labelId : undefined)}
      className={cx(containerCss, restProps.className)}
      flexDirection={direction === 'horizontal' ? 'row' : 'column'}
      gap={gap}
      role={role}
      testID={testID}
      {...restProps}
    >
      {label &&
        (typeof label === 'string' ? (
          <Text font="headline" id={labelId}>
            {label}
          </Text>
        ) : (
          label
        ))}
      {options.map((optionProps) => {
        const optionValue = optionProps.value;
        if (!optionValue) {
          if (isDevelopment()) {
            console.warn('Each option in ControlGroup must have a `value` prop.', optionProps);
          }
          return null;
        }

        const isChecked = isMultiSelect ? value.includes(optionValue) : value === optionValue;

        return (
          <ControlComponent
            key={optionValue}
            checked={isChecked}
            name={name}
            onChange={onChange}
            testID={testID ? `${testID}-${optionValue}` : undefined}
            value={optionValue}
            {...(optionProps as ControlComponentProps)}
          />
        );
      })}
    </Box>
  );
}) as <ControlValue extends string, ControlComponentProps extends { value?: ControlValue }>(
  props: ControlGroupProps<ControlValue, ControlComponentProps> & {
    ref?: React.Ref<HTMLDivElement>;
  },
) => React.ReactElement;

export const ControlGroup = memo(ControlGroupWithRef) as typeof ControlGroupWithRef &
  React.MemoExoticComponent<typeof ControlGroupWithRef>;
