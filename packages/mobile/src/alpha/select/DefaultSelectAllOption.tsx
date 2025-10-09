import { memo } from 'react';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionComponent } from './Select';

export const DefaultSelectAllOption: SelectOptionComponent<'single' | 'multi'> = memo(
  ({
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
  }) => {
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
          value="select-all"
        />
        <Divider paddingX={2} style={styles?.selectAllDivider} />
      </>
    );
  },
);
