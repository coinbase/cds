import { memo } from 'react';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionComponent, type SelectType } from './Select';

const DefaultSelectAllOptionBase = <Type extends SelectType = 'single', T extends string = string>({
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
}: Parameters<SelectOptionComponent<Type, T>>[0]) => {
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
        value={'select-all'}
      />
      <Divider paddingX={2} style={styles?.selectAllDivider} />
    </>
  );
};

export const DefaultSelectAllOption = memo(DefaultSelectAllOptionBase) as SelectOptionComponent;
