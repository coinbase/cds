import React, { Children, forwardRef, isValidElement, memo, useMemo } from 'react';
import type { View, ViewProps } from 'react-native';
import type { SharedProps } from '@coinbase/cds-common';
import { isDevelopment } from '@coinbase/cds-utils';

import { Checkbox, type CheckboxProps } from './Checkbox';
import { ControlGroup } from './ControlGroup';

/**
 * @deprecated CheckboxGroup is deprecated. Use ControlGroup with accessibilityRole="combobox" instead.
 *
 * @example
 * // Instead of:
 * <CheckboxGroup selectedValues={new Set(['value1'])} onChange={onChange}>
 *   <Checkbox value="value1">Option 1</Checkbox>
 * </CheckboxGroup>
 *
 * // Use:
 * <ControlGroup
 *   accessibilityRole="combobox"
 *   ControlComponent={Checkbox}
 *   options={[{ value: 'value1', children: 'Option 1' }]}
 *   value={['value1']}
 *   onChange={(value) => onChange(value)}
 * />
 */
export type CheckboxGroupBaseProps<CheckboxValue extends string | number> = Omit<
  ViewProps,
  'children'
> &
  SharedProps & {
    /** Checkbox elements that are part of the checkbox group. */
    children: React.ReactElement[];
    /** Set a label summary for the group of checkboxes. */
    label?: React.ReactNode;
    /** Checkbox options that are checked. */
    selectedValues: Set<CheckboxValue>;
    /** Handle change events when user tap on the checkboxes */
    onChange?: (value?: CheckboxValue) => void;
  };

/**
 * @deprecated CheckboxGroup is deprecated. Use ControlGroup with accessibilityRole="combobox" instead.
 */
export type CheckboxGroupProps<CheckboxValue extends string> =
  CheckboxGroupBaseProps<CheckboxValue>;

// Follows behavior describe in https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html
const CheckboxGroupWithRef = forwardRef(function CheckboxGroupWithRef<CheckboxValue extends string>(
  {
    children,
    label,
    accessibilityLabel,
    onChange,
    selectedValues,
    testID,
    ...restProps
  }: CheckboxGroupProps<CheckboxValue>,
  ref: React.ForwardedRef<View>,
) {
  if (isDevelopment()) {
    console.warn(
      'CheckboxGroup is deprecated. Use ControlGroup with accessibilityRole="combobox" instead.',
    );
  }

  if (isDevelopment() && !label && !accessibilityLabel) {
    console.warn('Please specify an accessibility label for the checkbox group.');
  }

  // Convert children to ControlGroup options format
  const controlGroupOptions = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement<CheckboxProps<CheckboxValue>>(child)) {
        return null;
      }

      const { value, children: checkboxChildren, ...childProps } = child.props;
      if (isDevelopment() && typeof value === 'undefined') {
        console.error('Checkboxes inside CheckboxGroup should have values.');
        return null;
      }

      return {
        value: value as CheckboxValue,
        children: checkboxChildren,
        ...childProps,
      };
    }).filter(Boolean);
  }, [children]);

  // Convert Set to Array for ControlGroup
  const selectedValuesArray = Array.from(selectedValues);

  // Handle onChange signature conversion
  const handleChange = (value: CheckboxValue | undefined) => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <ControlGroup
      ref={ref}
      ControlComponent={Checkbox}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="combobox"
      gap={0}
      label={label}
      onChange={handleChange}
      options={controlGroupOptions || []}
      testID={testID}
      value={selectedValuesArray}
      {...restProps}
    />
  );
  // Make forwardRef result function stay generic function type
}) as <CheckboxValue extends string>(
  props: CheckboxGroupProps<CheckboxValue> & { ref?: React.Ref<View> },
) => React.ReactElement;

// Make memoized function stay generic function type
/**
 * @deprecated CheckboxGroup is deprecated. Use ControlGroup with accessibilityRole="combobox" instead.
 */
export const CheckboxGroup = memo(CheckboxGroupWithRef) as typeof CheckboxGroupWithRef &
  React.MemoExoticComponent<typeof CheckboxGroupWithRef>;
