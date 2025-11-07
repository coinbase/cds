import { forwardRef, memo } from 'react';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionProps, type SelectType } from './Select';

type DefaultSelectAllOptionBase = <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectOptionProps<Type, SelectOptionValue> & { ref?: React.Ref<HTMLButtonElement> },
) => React.ReactElement;

const DefaultSelectAllOptionComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        accessory,
        blendStyles,
        className,
        compact,
        end,
        disabled,
        label,
        media,
        onClick,
        selected,
        style,
        type,
        styles,
        classNames,
      }: SelectOptionProps<Type, SelectOptionValue>,
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
            disabled={disabled}
            end={end}
            label={label}
            media={media}
            onClick={onClick}
            selected={selected}
            style={style}
            styles={styles}
            type={type}
            value={'select-all' as SelectOptionValue}
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

export const DefaultSelectAllOption = DefaultSelectAllOptionComponent as DefaultSelectAllOptionBase;
