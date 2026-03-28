import { forwardRef, memo, useMemo } from 'react';
import type { View } from 'react-native';
import { getMediaChipSpacingProps } from '@coinbase/cds-common/chips/getMediaChipSpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';

import { Chip } from './Chip';
import type { ChipBaseProps, ChipProps } from './ChipProps';

export type MediaChipBaseProps = ChipBaseProps;
export type MediaChipProps = MediaChipBaseProps & ChipProps;

export const MediaChip = memo(
  forwardRef(function MediaChip(_props: MediaChipProps, ref: React.ForwardedRef<View>) {
    const mergedProps = useComponentConfig('MediaChip', _props);
    const {
      start,
      children,
      end,
      compact,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      ...props
    } = mergedProps;
    const spacingProps = useMemo(() => {
      const defaults = getMediaChipSpacingProps({
        compact: !!compact,
        start: !!start,
        end: !!end,
        children: !!children,
      });
      return {
        padding: padding ?? defaults.padding,
        paddingX: paddingX ?? defaults.paddingX,
        paddingY: paddingY ?? defaults.paddingY,
        paddingTop: paddingTop ?? defaults.paddingTop,
        paddingBottom: paddingBottom ?? defaults.paddingBottom,
        paddingStart: paddingStart ?? defaults.paddingStart,
        paddingEnd: paddingEnd ?? defaults.paddingEnd,
      };
    }, [
      compact,
      start,
      end,
      children,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
    ]);
    return (
      <Chip ref={ref} compact={compact} end={end} start={start} {...spacingProps} {...props}>
        {children}
      </Chip>
    );
  }),
);
