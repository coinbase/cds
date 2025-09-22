import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { SharedProps } from '@cbhq/cds-common';
import { isDevelopment } from '@cbhq/cds-utils';

import { Group, type GroupProps } from '../layout';

export type ControlGroupOption<P> = Omit<P, 'onChange' | 'checked' | 'value'>;

export type ControlGroupProps<T extends string, P extends { value?: T }> = Omit<
  GroupProps,
  'children' | 'onChange'
> &
  SharedProps & {
    /** The control component to render for each option. */
    ControlComponent: React.ComponentType<P>;
    /** Control options for the group. */
    options: (ControlGroupOption<P> & { value: T })[];
    /** Set a label for the group. */
    label?: React.ReactNode;
    /** Current selected value(s). Use a string for single-select (e.g., RadioGroup) and an array of strings for multi-select (e.g., CheckboxGroup). */
    value: T | T[];
    /** Handle change events. */
    onChange?: (value: T | undefined, checked?: boolean) => void;
  };

const ControlGroupWithRef = forwardRef(function ControlGroup<
  T extends string,
  P extends { value?: T },
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
  }: ControlGroupProps<T, P>,
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
            {...(optionProps as P)}
          />
        );
      })}
    </Group>
  );
}) as unknown as <T extends string, P extends { value?: T }>(
  props: ControlGroupProps<T, P> & { ref?: React.Ref<View> },
) => React.ReactElement;

export const ControlGroup = memo(ControlGroupWithRef) as typeof ControlGroupWithRef &
  React.MemoExoticComponent<typeof ControlGroupWithRef>;
