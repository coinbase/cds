import { memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useTheme } from '../hooks/useTheme';
import { Fallback, type FallbackBaseProps, type FallbackProps } from '../layout/Fallback';

export type TextFallbackBaseProps = Omit<FallbackBaseProps, 'height'> & {
  /** Font token used to size the fallback to match text line height. */
  font: ThemeVars.FontSize;
};

export type TextFallbackProps = Omit<FallbackProps, 'height'> & Pick<TextFallbackBaseProps, 'font'>;

/**
 * Loading placeholder sized to match a typography font token's line height.
 */
export const TextFallback = memo(function TextFallback({
  font,
  style,
  ...props
}: TextFallbackProps) {
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  const { height, paddingVertical } = useMemo(() => {
    const fontSize = theme.fontSize[font] * fontScale;
    const lineHeight = theme.lineHeight[font] * fontScale;
    const lineHeightOffset = lineHeight - fontSize;

    return {
      height: fontSize,
      paddingVertical: Math.max(lineHeightOffset, 0) / 2,
    };
  }, [font, fontScale, theme]);

  return (
    <Fallback
      height={height}
      style={[{ paddingTop: paddingVertical, paddingBottom: paddingVertical }, style]}
      {...props}
    />
  );
});
