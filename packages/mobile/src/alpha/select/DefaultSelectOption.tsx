import { memo, useCallback, useMemo } from 'react';
import { selectCellMobileSpacingConfig } from '@coinbase/cds-common/tokens/select';

import { Cell } from '../../cells/Cell';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';

import type { SelectOptionComponent } from './Select';

export const DefaultSelectOption: SelectOptionComponent<'single' | 'multi'> = memo(
  ({
    value,
    label,
    onChange,
    disabled,
    selected,
    indeterminate,
    compact,
    description,
    multiline,
    style,
    className,
    accessory,
    media,
    type,
    accessibilityRole,
    ...props
  }) => {
    const labelNode = useMemo(
      () =>
        typeof label === 'string' ? (
          <Text
            ellipsize={description ? 'tail' : multiline ? undefined : 'tail'}
            font="headline"
            numberOfLines={description ? 1 : multiline ? undefined : 2}
          >
            {label}
          </Text>
        ) : (
          label
        ),
      [label, description, multiline],
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
          >
            {description}
          </Text>
        ) : (
          description
        )),
      [description, multiline, label],
    );

    const handlePress = useCallback(() => onChange(value), [onChange, value]);

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
        style={style}
        {...props}
      >
        <VStack justifyContent="center">
          {labelNode}
          {descriptionNode}
        </VStack>
      </Cell>
    );
  },
);
