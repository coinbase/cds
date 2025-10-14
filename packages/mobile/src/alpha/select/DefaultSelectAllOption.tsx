import { memo } from 'react';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionComponent, type SelectOptionProps, type SelectType } from './Select';

export const DefaultSelectAllOptionComponent = <
  Type extends SelectType,
  T extends string = string,
>({
  accessory,
  blendStyles,
  compact,
  detail,
  disabled,
  label,
  media,
  onPress,
  selected,
  style,
  type,
  styles,
}: SelectOptionProps<Type, T>) => {
  return (
    <>
      <DefaultSelectOption
        key="select-all"
        accessory={accessory}
        blendStyles={blendStyles}
        compact={compact}
        detail={detail}
        disabled={disabled}
        label={label}
        media={media}
        onPress={onPress}
        selected={selected}
        style={style}
        styles={styles}
        type={type}
        value={'select-all' as T}
      />
      <Divider paddingX={2} style={styles?.selectAllDivider} />
    </>
  );
};

export const DefaultSelectAllOption = memo(DefaultSelectAllOptionComponent) as <
  Type extends SelectType,
  T extends string = string,
>(
  props: SelectOptionProps<Type, T>,
) => ReturnType<SelectOptionComponent<Type, T>>;
