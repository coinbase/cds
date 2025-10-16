import { forwardRef, memo } from 'react';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionComponent, type SelectOptionProps, type SelectType } from './Select';

type DefaultSelectAllOptionBase = <Type extends SelectType, T extends string = string>(
  props: SelectOptionProps<Type, T> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement;

const DefaultSelectAllOptionBase = memo(
  forwardRef(
    <Type extends SelectType, T extends string = string>(
      {
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
        styles,
        classNames,
      }: SelectOptionProps<Type, T>,
      ref: React.Ref<HTMLButtonElement>,
    ) => {
      return (
        <>
          <DefaultSelectOption
            ref={ref}
            accessory={accessory}
            blendStyles={blendStyles}
            className={className}
            classNames={classNames}
            compact={compact}
            detail={detail}
            disabled={disabled}
            label={label}
            media={media}
            onClick={onClick}
            selected={selected}
            style={style}
            styles={styles}
            type={type}
            value={'select-all' as T}
          />
          <Divider
            className={classNames?.selectAllDivider}
            paddingX={2}
            style={styles?.selectAllDivider}
          />
        </>
      );
    },
  ),
);

export const DefaultSelectAllOption = DefaultSelectAllOptionBase as DefaultSelectAllOptionBase;
