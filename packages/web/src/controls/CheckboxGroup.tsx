import React, {
  Children,
  type FieldsetHTMLAttributes,
  forwardRef,
  isValidElement,
  memo,
  useMemo,
} from 'react';
import type { SharedProps } from '@coinbase/cds-common/types';
import { isDevelopment } from '@coinbase/cds-utils';
import { css } from '@linaria/core';

import { cx } from '../cx';
import type { FilteredHTMLAttributes } from '../types';

import { Checkbox, type CheckboxProps } from './Checkbox';
import { ControlGroup } from './ControlGroup';

const checkboxCss = css`
  margin: 0;
  padding: 0;
  min-width: 0;
  border-width: 0;
`;

/**
 * @deprecated CheckboxGroup is deprecated. Use ControlGroup with role="group" instead.
 *
 * @example
 * // Instead of:
 * <CheckboxGroup selectedValues={new Set(['value1'])} onChange={onChange}>
 *   <Checkbox value="value1">Option 1</Checkbox>
 * </CheckboxGroup>
 *
 * // Use:
 * <ControlGroup
 *   role="group"
 *   ControlComponent={Checkbox}
 *   options={[{ value: 'value1', children: 'Option 1' }]}
 *   value={['value1']}
 *   onChange={onChange}xw
 * />
 */
export type CheckboxGroupBaseProps<CheckboxValue extends string | number> = FilteredHTMLAttributes<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'onChange'
> &
  SharedProps & {
    /** Checkbox elements that are part of the checkbox group. */
    children: React.ReactElement[];
    /** Set a label summary for the group of checkboxes. */
    label?: React.ReactNode;
    /** Checkbox options that are checked. */
    selectedValues: Set<CheckboxValue>;
    className?: string;
    /** Handle change event when pressing on a checkbox option. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    style?: React.CSSProperties;
  };

/**
 * @deprecated CheckboxGroup is deprecated. Use ControlGroup with role="group" instead.
 */
export type CheckboxGroupProps<CheckboxValue extends string> =
  CheckboxGroupBaseProps<CheckboxValue>;

// Follows behavior describe in https://www.w3.org/TR/wai-aria-practices/examples/checkbox/checkbox-2/checkbox-2.html
const CheckboxGroupWithRef = forwardRef(function CheckboxGroupWithRef<CheckboxValue extends string>(
  {
    children,
    className,
    label,
    'aria-labelledby': ariaLabelledby,
    selectedValues,
    onChange,
    name,
    style,
    testID,
    role = 'group',
    id,
    ...props
  }: CheckboxGroupProps<CheckboxValue>,
  ref: React.ForwardedRef<HTMLFieldSetElement>,
) {
  if (isDevelopment()) {
    console.warn('CheckboxGroup is deprecated. Use ControlGroup with role="group" instead.');

    if (!label && !ariaLabelledby) {
      console.warn('Please specify an aria label for the checkbox group.');
    }
  }

  // Convert children to ControlGroup options format
  const controlGroupOptions = useMemo(() => {
    return Children.map(children, (child) => {
      if (!isValidElement<CheckboxProps<CheckboxValue>>(child) || child.type !== Checkbox) {
        return null;
      }

      const { value, children: checkboxChildren, id, ...childProps } = child.props;
      if (isDevelopment() && typeof value === 'undefined') {
        console.error('Checkboxes inside CheckboxGroup should have values.');
        return null;
      }

      const checkboxId = id ?? ['checkbox-group', name, value].join('-');

      return {
        value: value as CheckboxValue,
        children: checkboxChildren,
        id: checkboxId,
        ...childProps,
      };
    }).filter(Boolean);
  }, [children, name]);

  // Convert Set to Array for ControlGroup
  const selectedValuesArray = Array.from(selectedValues);

  return (
    <ControlGroup
      ref={ref as React.Ref<HTMLDivElement>}
      ControlComponent={Checkbox}
      aria-labelledby={ariaLabelledby}
      className={cx(checkboxCss, className)}
      gap={0}
      hidden={props.hidden}
      id={id}
      label={label}
      name={name}
      onChange={onChange}
      options={controlGroupOptions || []}
      role={role as 'group' | 'radiogroup'}
      style={style}
      tabIndex={props.tabIndex}
      testID={testID}
      value={selectedValuesArray}
    />
  );
}) as <CheckboxValue extends string>(
  props: CheckboxGroupProps<CheckboxValue> & { ref?: React.Ref<HTMLFieldSetElement> },
) => React.ReactElement;

export const CheckboxGroup = memo(CheckboxGroupWithRef) as typeof CheckboxGroupWithRef &
  React.MemoExoticComponent<typeof CheckboxGroupWithRef>;
