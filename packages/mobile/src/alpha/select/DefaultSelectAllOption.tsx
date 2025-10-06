import { memo } from 'react';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionComponent } from './Select';

export const DefaultSelectAllOption: SelectOptionComponent<'single' | 'multi'> = memo(
  ({
    accessory,
    blendStyles,
    className,
    compact,
    detail,
    disabled,
    label,
    media,
    onPress,
    selected,
    style,
    type,
  }) => {
    return (
      <>
        <DefaultSelectOption
          key="select-all"
          accessory={accessory}
          blendStyles={blendStyles}
          className={className}
          compact={compact}
          detail={detail}
          disabled={disabled}
          label={label}
          media={media}
          onPress={onPress}
          selected={selected}
          style={style}
          type={type}
          value="select-all"
        />
        <Divider paddingX={2} />
      </>
    );
  },
);
