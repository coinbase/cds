import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import type { Theme } from '../core/theme';

export type TextInputSize = 's' | 'm' | 'l';

export type TextInputLabelPlacement =
  | 'outside'
  | 'inside-vertical'
  | 'inside-horizontal'
  | 'legacy-compact';

export const textInputSizePaddingY: Record<TextInputSize, ThemeVars.Space> = {
  s: 1,
  m: 1.5,
  l: 2,
};

export type UseTextInputDensityParams = {
  compact?: boolean;
  size?: TextInputSize;
  labelVariant?: 'inside' | 'outside';
  hasLabel: boolean;
  hasStart: boolean;
  theme: Pick<Theme, 'space'>;
};

export type TextInputDensity = {
  useLegacyCompact: boolean;
  resolvedSize: TextInputSize;
  labelPlacement: TextInputLabelPlacement;
  containerSpacing: ViewStyle;
  nativeCompact?: boolean;
  inputStackLabelVariant: 'inside' | 'outside';
  showLabelInStartSlot: boolean;
  showLabelInStack: boolean;
};

export const useTextInputDensity = ({
  compact,
  size,
  labelVariant = 'outside',
  hasLabel,
  hasStart,
  theme,
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

    const containerSpacing: ViewStyle = {
      ...(hasStart && { paddingStart: theme.space[0.5] }),
      ...(labelPlacement === 'inside-vertical' && {
        paddingBottom: theme.space[1],
        paddingTop: 0,
      }),
      ...(!useLegacyCompact &&
        resolvedSize !== 'l' && {
          paddingVertical: theme.space[textInputSizePaddingY[resolvedSize]],
        }),
    };

    return {
      useLegacyCompact,
      resolvedSize,
      labelPlacement,
      containerSpacing,
      nativeCompact: useLegacyCompact ? true : undefined,
      inputStackLabelVariant,
      showLabelInStartSlot,
      showLabelInStack,
    };
  }, [compact, size, labelVariant, hasLabel, hasStart, theme.space]);
};
