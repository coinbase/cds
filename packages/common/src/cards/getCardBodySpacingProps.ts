import type { PaddingProps } from '../types';

export const getCardBodySpacingProps = ({
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingEnd,
  paddingBottom,
  paddingStart,
  compact,
}: {
  compact?: boolean;
} & PaddingProps): Pick<
  PaddingProps,
  'paddingTop' | 'paddingBottom' | 'paddingStart' | 'paddingEnd'
> => {
  if (compact)
    return {
      paddingBottom: paddingBottom ?? paddingY ?? padding ?? 1,
      paddingTop: paddingTop ?? paddingY ?? padding ?? 2,
      paddingStart: paddingStart ?? paddingX ?? padding ?? 2,
      paddingEnd: paddingEnd ?? paddingX ?? padding ?? 2,
    };
  return {
    paddingBottom: paddingBottom ?? paddingY ?? padding ?? 3,
    paddingTop: paddingTop ?? paddingY ?? padding ?? 3,
    paddingStart: paddingStart ?? paddingX ?? padding ?? 3,
    paddingEnd: paddingEnd ?? paddingX ?? padding ?? 3,
  };
};
