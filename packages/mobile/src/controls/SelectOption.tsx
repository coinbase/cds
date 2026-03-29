import React, { memo, useCallback } from 'react';
import type { GestureResponderEvent } from 'react-native';
import { selectCellMobileSpacingConfig } from '@coinbase/cds-common/tokens/select';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';

import { Cell, type CellBaseProps } from '../cells/Cell';
import { CellAccessory } from '../cells/CellAccessory';
import type { ListCellBaseProps } from '../cells/ListCell';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

import { useSelectContext } from './SelectContext';

const selectOptionMinHeight = 56;

const selectOptionMaxHeight = 64;

export type SelectOptionBaseProps = Omit<CellBaseProps, 'children' | 'selected'> &
  Pick<ListCellBaseProps, 'title' | 'description' | 'multiline'> &
  Pick<SharedAccessibilityProps, 'accessibilityLabel' | 'accessibilityHint'> & {
    onPress?: (() => void) | ((event: GestureResponderEvent) => void);
    /** Unique identifier for each option */
    value: string;
  };

export type SelectOptionProps = SelectOptionBaseProps;

export const SelectOption = memo((_props: SelectOptionProps) => {
  const mergedProps = useComponentConfig('SelectOption', _props);
  const {
    title,
    description,
    multiline,
    onPress,
    value,
    accessibilityLabel,
    accessibilityHint,
    ...props
  } = mergedProps;
  const { value: selectedValue, onChange, handleClose } = useSelectContext();

  const selected = value === selectedValue;

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event);
      onChange?.(value);
      handleClose?.();
    },
    [onPress, onChange, value, handleClose],
  );

  const accessibilityLabelValue =
    typeof title === 'string' && accessibilityLabel === undefined ? title : accessibilityLabel;

  const accessibilityHintValue =
    typeof description === 'string' && accessibilityHint === undefined
      ? description
      : accessibilityHint;

  const accessibilityState = selected ? { selected: true } : undefined;

  return (
    <Cell
      {...selectCellMobileSpacingConfig}
      accessibilityHint={accessibilityHintValue}
      accessibilityLabel={accessibilityLabelValue}
      accessibilityState={accessibilityState}
      accessory={selected ? <CellAccessory type="selected" /> : undefined}
      borderRadius={0}
      maxHeight={multiline ? undefined : selectOptionMaxHeight}
      minHeight={selectOptionMinHeight}
      onPress={handlePress}
      selected={selected}
      {...props}
    >
      <VStack justifyContent="center">
        {!!title && (
          <Text ellipsize="tail" font="headline" numberOfLines={description ? 1 : 2}>
            {title}
          </Text>
        )}

        {!!description && (
          <Text
            color="fgMuted"
            ellipsize={multiline ? undefined : 'tail'}
            font="body"
            numberOfLines={multiline ? undefined : title ? 1 : 2}
          >
            {description}
          </Text>
        )}
      </VStack>
    </Cell>
  );
});

SelectOption.displayName = 'SelectOption';
