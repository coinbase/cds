import { memo, useMemo } from 'react';
import type { View } from 'react-native';
import { getMediaChipSpacingProps } from '@coinbase/cds-common/chips/getMediaChipSpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';

import { Chip } from './Chip';
import type { ChipBaseProps, ChipProps } from './ChipProps';

export type MediaChipBaseProps = ChipBaseProps;
export type MediaChipProps = MediaChipBaseProps & ChipProps;

export const MediaChip = memo(function MediaChip({
  ref,
  ..._props
}: MediaChipProps & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('MediaChip', _props);
  const {
    start,
    children,
    end,
    compact,
    size,
    padding,
    paddingX,
    paddingY,
    paddingTop,
    paddingBottom,
    paddingStart,
    paddingEnd,
    ...props
  } = mergedProps;
  // Spacing is driven by `size`; deprecated `compact` falls back to its legacy `xs` size.
  const resolvedSize = size ?? (compact ? 'xs' : 's');
  const spacingProps = useMemo(() => {
    const defaults = getMediaChipSpacingProps({
      size: resolvedSize,
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
    resolvedSize,
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
    <Chip
      ref={ref}
      compact={compact}
      end={end}
      size={size}
      start={start}
      {...spacingProps}
      {...props}
    >
      {children}
    </Chip>
  );
});
