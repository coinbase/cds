import React, { forwardRef, memo } from 'react';
import type { AccessibilityProps, View } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common';
import { entries } from '@coinbase/cds-utils';
import { isDevelopment } from '@coinbase/cds-utils/env';

import { type BoxBaseProps } from '../layout';
import type { GroupBaseProps } from '../layout/Group';

import { ControlGroup } from './ControlGroup';
import { Radio, type RadioBaseProps, type RadioProps } from './Radio';

export { Radio, type RadioBaseProps, type RadioProps };

/**
 * @deprecated RadioGroup is deprecated. Use ControlGroup with accessibilityRole="radiogroup" instead.
 *
 * @example
 * // Instead of:
 * <RadioGroup options={{ value1: 'Label 1' }} value={value} onChange={onChange} />
 *
 * // Use:
 * <ControlGroup
 *   accessibilityRole="radiogroup"
 *   ControlComponent={Radio}
 *   options={[{ value: 'value1', children: 'Label 1' }]}
 *   value={value}
 *   onChange={(value) => onChange(value)}
 * />
 */
export type RadioGroupBaseProps<RadioValue extends string> = Omit<
  AccessibilityProps,
  'accessibilityLabelledBy'
> &
  SharedProps &
  Pick<GroupBaseProps<BoxBaseProps>, 'direction' | 'gap'> & {
    /**
     * Multiple choice options for the radio group. The object key represents
     * the radio input value and the object value represents the radio option label.
     */
    options: Record<RadioValue, string | React.ReactNode>;
    /** Set a label summary for the group of radios. */
    label?: React.ReactNode;
    /** Currently selected value. */
    value?: RadioValue;
    /** Handle change event when pressing on a radio option. */
    onChange?: RadioProps<RadioValue>['onChange'];
    /** Sets the checked/active color of each control in the group.
     * @default bgPrimary
     */
    controlColor?: RadioProps<RadioValue>['controlColor'];
    /** A11Y label to indicate order of radio buttons when focused on one button */
    radioAccessibilityLabel?: string;
  };

/**
 * @deprecated RadioGroup is deprecated. Use ControlGroup with accessibilityRole="radiogroup" instead.
 */
export type RadioGroupProps<RadioValue extends string> = RadioGroupBaseProps<RadioValue>;

const RadioGroupWithRef = forwardRef(function RadioGroup<RadioValue extends string>(
  {
    label,
    value,
    onChange,
    options,
    testID,
    controlColor = 'bgPrimary',
    accessibilityLabel,
    accessibilityHint,
    radioAccessibilityLabel,
    ...props
  }: RadioGroupProps<RadioValue>,
  ref: React.ForwardedRef<View>,
) {
  if (isDevelopment()) {
    console.warn(
      'RadioGroup is deprecated. Use ControlGroup with accessibilityRole="radiogroup" instead.',
    );
  }

  const accessibilityLabelValue =
    typeof label === 'string' && accessibilityLabel === undefined ? label : accessibilityLabel;

  if (
    isDevelopment() &&
    radioAccessibilityLabel &&
    (!radioAccessibilityLabel.includes('{{number}}') ||
      !radioAccessibilityLabel.includes('{{total}}'))
  ) {
    console.error(
      `radioAccessibilityLabel must include "{{number}}" and "{{total}}": ${radioAccessibilityLabel}`,
    );
  }

  // Convert Record<T, string | React.ReactNode> to ControlGroup options format
  const controlGroupOptions = entries<Record<RadioValue, string | React.ReactNode>>(options).map(
    ([optionValue, option], index) => {
      // Handle mobile-specific accessibility label for radio groups
      let accessibilityLabel: string | undefined;
      if (typeof option === 'string' && radioAccessibilityLabel) {
        accessibilityLabel = `${option}. ${radioAccessibilityLabel
          ?.replace('{{number}}', (index + 1).toString())
          .replace('{{total}}', Object.keys(options).length.toString())}`;
      }

      return {
        value: optionValue as RadioValue,
        children: option,
        accessibilityLabel,
        controlColor,
      };
    },
  );

  // Handle onChange signature conversion
  const handleChange = (newValue: RadioValue | undefined) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <ControlGroup
      ref={ref}
      ControlComponent={Radio}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityRole="radiogroup"
      label={label}
      onChange={handleChange}
      options={controlGroupOptions}
      testID={testID}
      value={value ?? ('' as RadioValue)}
      {...props}
    />
  );
  // Make forwardRef result function stay generic function type
}) as <RadioValue extends string>(
  props: RadioGroupProps<RadioValue> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
/**
 * @deprecated RadioGroup is deprecated. Use ControlGroup with accessibilityRole="radiogroup" instead.
 */
export const RadioGroup = memo(RadioGroupWithRef) as typeof RadioGroupWithRef &
  React.MemoExoticComponent<typeof RadioGroupWithRef>;
