import { memo } from 'react';

import { Checkbox } from '../../controls/Checkbox';
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
    onClick,
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
          onClick={onClick}
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
