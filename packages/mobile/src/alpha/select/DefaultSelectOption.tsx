import { forwardRef, memo, useCallback, useMemo } from 'react';
import { type View } from 'react-native';
import { selectCellMobileSpacingConfig } from '@coinbase/cds-common/tokens/select';

import { Cell } from '../../cells/Cell';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

import type { SelectOptionProps, SelectType } from './Select';

const DefaultSelectOptionComponent = <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  {
    value,
    label,
    onPress,
    disabled,
    selected,
    indeterminate,
    compact,
    description,
    multiline,
    style,
    styles,
    type,
    accessibilityRole,
    background = 'transparent',
    ...props
  }: SelectOptionProps<Type, SelectOptionValue>,
  ref: React.Ref<View>,
) => {
  const labelNode = useMemo(
    () =>
      typeof label === 'string' ? (
        <Text ellipsize="tail" font="headline" numberOfLines={2} style={styles?.optionLabel}>
          {label}
        </Text>
      ) : (
        label
      ),
    [label, styles?.optionLabel],
  );

  const descriptionNode = useMemo(
    () =>
      typeof description === 'string' ? (
        <Text
          color="fgMuted"
          ellipsize="tail"
          font="body"
          numberOfLines={2}
          style={styles?.optionDescription}
        >
          {description}
        </Text>
      ) : (
        description
      ),
    [description, styles?.optionDescription],
  );

  const handlePress = useCallback(() => onPress?.(value), [onPress, value]);

  const multiSelectCheckedAccessibilityState = useMemo(() => {
    if (selected) return true;
    if (indeterminate) return 'mixed';
    return false;
  }, [selected, indeterminate]);

  // Note: Cell component doesn't support ref forwarding yet, so we can't pass the ref
  // TODO: Add ref support to Cell component and then pass ref here
  return (
    <Cell
      {...selectCellMobileSpacingConfig}
      accessibilityRole={accessibilityRole ?? (type === 'multi' ? 'checkbox' : 'menuitem')}
      accessibilityState={{
        checked: type === 'multi' ? multiSelectCheckedAccessibilityState : undefined,
        selected: type === 'single' ? selected : undefined,
        disabled,
      }}
      background={background}
      borderRadius={0}
      disabled={disabled}
      minHeight={compact ? 40 : 56}
      onPress={handlePress}
      priority="end"
      selected={selected}
      style={[style, styles?.optionCell]}
      {...props}
    >
      <VStack justifyContent="center" style={styles?.optionContent}>
        {labelNode}
        {descriptionNode}
      </VStack>
    </Cell>
  );
};

export const DefaultSelectOption = memo(forwardRef(DefaultSelectOptionComponent)) as <
  Type extends SelectType = 'single',
  SelectOptionValue extends string = string,
>(
  props: SelectOptionProps<Type, SelectOptionValue> & { ref?: React.Ref<View> },
) => React.ReactElement;
