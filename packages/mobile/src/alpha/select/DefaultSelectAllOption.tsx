import { forwardRef, memo } from 'react';
import { type View } from 'react-native';

import { Divider } from '../../layout/Divider';

import { DefaultSelectOption } from './DefaultSelectOption';
import { type SelectOptionProps, type SelectType } from './Select';

type DefaultSelectAllOptionBase = <
  Type extends SelectType,
  SelectOptionValue extends string = string,
>(
  props: SelectOptionProps<Type, SelectOptionValue> & { ref?: React.Ref<View> },
) => React.ReactElement;

const DefaultSelectAllOptionComponent = memo(
  forwardRef(
    <Type extends SelectType, SelectOptionValue extends string = string>(
      {
        accessory,
        blendStyles,
        compact,
        end,
        disabled,
        label,
        media,
        onPress,
        selected,
        style,
        type,
        styles,
      }: SelectOptionProps<Type, SelectOptionValue>,
      ref: React.Ref<View>,
    ) => {
      // Note: DefaultSelectOption doesn't support ref yet because Cell doesn't support ref forwarding
      // TODO: Pass ref when Cell component supports ref forwarding
      return (
        <>
          <DefaultSelectOption
            key="select-all"
            ref={ref}
            accessory={accessory}
            blendStyles={blendStyles}
            compact={compact}
            disabled={disabled}
            end={end}
            label={label}
            media={media}
            onPress={onPress}
            selected={selected}
            style={style}
            styles={styles}
            type={type}
            value={'select-all' as SelectOptionValue}
          />
          <Divider paddingX={2} style={styles?.selectAllDivider} />
        </>
      );
    },
  ),
);

export const DefaultSelectAllOption = DefaultSelectAllOptionComponent as DefaultSelectAllOptionBase;
