import { useMemo } from 'react';

export type TextInputSize = 's' | 'm' | 'l';

export type TextInputLabelPlacement =
  | 'outside'
  | 'inside-vertical'
  | 'inside-horizontal'
  | 'legacy-compact';

export type UseTextInputDensityParams = {
  compact?: boolean;
  size?: TextInputSize;
  labelVariant?: 'inside' | 'outside';
  hasLabel: boolean;
};

export type TextInputDensity = {
  useLegacyCompact: boolean;
  resolvedSize: TextInputSize;
  labelPlacement: TextInputLabelPlacement;
  /** Pass through to NativeInput only when legacy compact */
  nativeCompact: boolean;
  /** What to pass to InputStack as labelVariant */
  inputStackLabelVariant: 'inside' | 'outside';
  showLabelInStartSlot: boolean;
  showLabelInStack: boolean;
  /** data-size attribute for CSS paddingY; omitted on legacy compact */
  dataSize: TextInputSize | undefined;
};

/**
 * Resolves TextInput size / compact / label placement for web.
 * Size stays encapsulated in TextInput — NativeInput only receives legacy `compact`.
 */
export const useTextInputDensity = ({
  compact,
  size,
  labelVariant = 'outside',
  hasLabel,
}: UseTextInputDensityParams): TextInputDensity => {
  return useMemo(() => {
    const useLegacyCompact = Boolean(compact) && size === undefined;
    const resolvedSize: TextInputSize = size ?? 'l';

    let labelPlacement: TextInputLabelPlacement;
    if (useLegacyCompact) {
      labelPlacement = 'legacy-compact';
    } else if (labelVariant === 'inside' && hasLabel) {
      labelPlacement = resolvedSize === 'l' ? 'inside-vertical' : 'inside-horizontal';
    } else {
      labelPlacement = 'outside';
    }

    const showLabelInStartSlot =
      hasLabel && (labelPlacement === 'legacy-compact' || labelPlacement === 'inside-horizontal');
    const showLabelInStack = hasLabel && !showLabelInStartSlot;

    const inputStackLabelVariant = labelPlacement === 'inside-vertical' ? 'inside' : 'outside';

    return {
      useLegacyCompact,
      resolvedSize,
      labelPlacement,
      nativeCompact: useLegacyCompact,
      inputStackLabelVariant,
      showLabelInStartSlot,
      showLabelInStack,
      dataSize: useLegacyCompact ? undefined : resolvedSize,
    };
  }, [compact, size, labelVariant, hasLabel]);
};
