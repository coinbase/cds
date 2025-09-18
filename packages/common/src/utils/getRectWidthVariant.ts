export const getRectWidthVariant = (variant: number | undefined, increment: number) =>
  variant === undefined ? undefined : variant + increment;
