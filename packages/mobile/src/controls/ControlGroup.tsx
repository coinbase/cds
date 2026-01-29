import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common';
import { isDevelopment } from '@coinbase/cds-utils';

import { Group, type GroupProps } from '../layout';

export type ControlGroupOption<ControlComponentProps> = Omit<
  ControlComponentProps,
  'onChange' | 'checked' | 'value'
>;

export type ControlGroupProps<
  ControlValue extends string,
  ControlComponentProps extends { value?: ControlValue },
> = Omit<GroupProps, 'children' | 'onChange'> &
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
    onChange?: (value: ControlValue | undefined, checked?: boolean) => void;
  };

const ControlGroupWithRef = forwardRef(function ControlGroup<
  ControlValue extends string,
  ControlComponentProps extends { value?: ControlValue },
>(
  {
    ControlComponent,
    options,
    label,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    onChange,
    value,
    testID,
    gap = 2,
    role = 'group',
    ...restProps
  }: ControlGroupProps<ControlValue, ControlComponentProps>,
  ref: React.ForwardedRef<View>,
) {
  if (isDevelopment() && !label && !ariaLabelledby && !ariaLabel) {
    console.warn('Please specify a label or aria-labelledby for the ControlGroup.');
  }

  const isMultiSelect = Array.isArray(value);

  return (
    <Group
      ref={ref}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      gap={gap}
      role={role}
      testID={testID}
      {...restProps}
    >
      {label}
      {options.map((optionProps) => {
        const optionValue = optionProps.value;
        const isChecked = isMultiSelect ? value.includes(optionValue) : value === optionValue;

        return (
          <ControlComponent
            key={optionValue}
            checked={isChecked}
            onChange={onChange}
            testID={testID ? `${testID}-${optionValue}` : undefined}
            value={optionValue}
            {...(optionProps as ControlComponentProps)}
          />
        );
      })}
    </Group>
  );
}) as unknown as <
  ControlValue extends string,
  ControlComponentProps extends { value?: ControlValue },
>(
  props: ControlGroupProps<ControlValue, ControlComponentProps> & { ref?: React.Ref<View> },
) => React.ReactElement;

export const ControlGroup = memo(ControlGroupWithRef) as typeof ControlGroupWithRef &
  React.MemoExoticComponent<typeof ControlGroupWithRef>;
