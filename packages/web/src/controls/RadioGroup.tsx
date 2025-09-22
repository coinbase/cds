import React, { forwardRef, memo } from 'react';
import type { SharedAccessibilityProps, SharedProps, ThemeVars } from '@cbhq/cds-common';
import { isDevelopment } from '@cbhq/cds-utils';

import type { BoxBaseProps } from '../layout';
import type { GroupBaseProps } from '../layout/Group';
import type { FilteredHTMLAttributes } from '../types';

import { ControlGroup } from './ControlGroup';
import { Radio, type RadioProps } from './Radio';
import { useHandleRadioSelect } from './useHandleRadioSelect';

export { Radio, type RadioProps, useHandleRadioSelect };

/**
 * @deprecated RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.
 *
 * @example
 * // Instead of:
 * <RadioGroup options={{ value1: 'Label 1' }} value={value} onChange={onChange} name="radio" />
 *
 * // Use:
 * <ControlGroup
 *   role="radiogroup"
 *   ControlComponent={Radio}
 *   options={[{ value: 'value1', children: 'Label 1' }]}
 *   value={value}
 *   onChange={(e) => onChange(e.target.value)}
 *   name="radio"
 * />
 */
export type RadioGroupBaseProps<T extends string> = FilteredHTMLAttributes<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'color'
> &
  SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabelledBy'> &
  Pick<GroupBaseProps<BoxBaseProps>, 'direction' | 'gap'> & {
    /**
     * Multiple choice options for the radio group. The object key represents
     * the radio input value and the object value represents the radio option label.
     */
    options: Record<T, string | React.ReactNode>;
    /** Set a label summary for the group of radios. */
    label?: React.ReactNode;
    /** Currently selected value. */
    value?: T;
    /** Field name of the multiple choice radio group. */
    name: string;
    /** Handle change event when pressing on a radio option. */
    onChange?: (value: T) => void;
    /** Sets the checked/active color of each control in the group.
     * @default bgPrimary
     */
    controlColor?: ThemeVars.Color;
  };

/**
 * @deprecated RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.
 */
export type RadioGroupProps<T extends string> = RadioGroupBaseProps<T>;

const RadioGroupWithRef = forwardRef(function RadioGroup<T extends string>(
  {
    label,
    value,
    onChange,
    options,
    name,
    testID,
    controlColor = 'bgPrimary',
    role = 'radiogroup',
    ...props
  }: RadioGroupProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  if (isDevelopment()) {
    console.warn('RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.');
  }

  const handleSelect = useHandleRadioSelect<T>(onChange);

  // Convert Record<T, string | React.ReactNode> to ControlGroup options format
  const controlGroupOptions = Object.entries<string | React.ReactNode>(options).map(
    ([optionValue, optionLabel]) => ({
      value: optionValue as T,
      children: optionLabel,
      id: `${name}-${optionValue}`,
      controlColor,
    }),
  );

  if (isDevelopment()) {
    console.warn('RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.');
  }

  return (
    <ControlGroup
      ref={ref}
      ControlComponent={Radio}
      label={label}
      name={name}
      onChange={handleSelect}
      options={controlGroupOptions}
      role={role as 'group' | 'radiogroup'}
      testID={testID}
      value={value || ''}
      {...props}
    />
  );
}) as <T extends string>(
  props: RadioGroupProps<T> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactElement;

/**
 * @deprecated RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.
 */
export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;
