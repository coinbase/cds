import { memo, useCallback, useMemo } from 'react';
import { selectCellMobileSpacingConfig } from '@coinbase/cds-common/tokens/select';

import { Cell } from '../../cells/Cell';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

import type { SelectOptionComponent, SelectOptionProps, SelectType } from './Select';

export const DefaultSelectOptionComponent = <Type extends SelectType, T extends string = string>({
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
  accessory,
  media,
  type,
  accessibilityRole,
  styles,
  ...props
}: SelectOptionProps<Type, T>) => {
  const labelNode = useMemo(
    () =>
      typeof label === 'string' ? (
        <Text
          ellipsize={description ? 'tail' : multiline ? undefined : 'tail'}
          font="headline"
          numberOfLines={description ? 1 : multiline ? undefined : 2}
          style={styles?.optionLabel}
        >
          {label}
        </Text>
      ) : (
        label
      ),
    [label, description, multiline, styles?.optionLabel],
  );

  const descriptionNode = useMemo(
    () =>
      description &&
      (typeof description === 'string' ? (
        <Text
          color="fgMuted"
          ellipsize={multiline ? undefined : 'tail'}
          font="body"
          numberOfLines={multiline ? undefined : description && label ? 1 : 2}
          style={styles?.optionDescription}
        >
          {description}
        </Text>
      ) : (
        description
      )),
    [description, multiline, label, styles?.optionDescription],
  );

  const handlePress = useCallback(() => onPress?.(value), [onPress, value]);

  const multiSelectCheckedAccessibilityState = useMemo(() => {
    if (selected) return true;
    if (indeterminate) return 'mixed';
    return false;
  }, [selected, indeterminate]);

  return (
    <Cell
      {...selectCellMobileSpacingConfig}
      accessibilityRole={accessibilityRole ?? (type === 'multi' ? 'checkbox' : 'menuitem')}
      accessibilityState={{
        checked: type === 'multi' ? multiSelectCheckedAccessibilityState : undefined,
        selected: type === 'single' ? selected : undefined,
        disabled,
      }}
      accessory={accessory}
      background={type === 'multi' || disabled || value === null ? 'transparent' : undefined}
      borderRadius={0}
      detailWidth="fit-content"
      disabled={disabled}
      maxHeight={multiline ? undefined : compact ? 56 : 64}
      media={media}
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

export const DefaultSelectOption = memo(DefaultSelectOptionComponent) as <
  Type extends SelectType,
  T extends string = string,
>(
  props: SelectOptionProps<Type, T>,
) => ReturnType<SelectOptionComponent<Type, T>>;
