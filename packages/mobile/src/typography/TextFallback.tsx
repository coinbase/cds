import { memo, useMemo } from 'react';
import { type TextProps as NativeTextProps, useWindowDimensions } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Fallback, type FallbackBaseProps, type FallbackProps } from '../layout/Fallback';

export type TextFallbackBaseProps = Omit<FallbackBaseProps, 'height'> & {
  /** Font token used to size the fallback to match text line height. */
  font: ThemeVars.FontSize;
};

export type TextFallbackProps = Omit<FallbackProps, 'height'> &
  Pick<TextFallbackBaseProps, 'font'> &
  Pick<NativeTextProps, 'allowFontScaling'>;

/**
 * Loading placeholder sized to match a typography font token's line height.
 */
export const TextFallback = memo(function TextFallback(_props: TextFallbackProps) {
  const mergedProps = useComponentConfig('TextFallback', _props);
  const { font, allowFontScaling = true, style, ...props } = mergedProps;
  const theme = useTheme();
  const { fontScale } = useWindowDimensions();

  const { height, paddingVertical } = useMemo(() => {
    const scale = allowFontScaling ? fontScale : 1;
    const fontSize = theme.fontSize[font] * scale;
    const lineHeight = theme.lineHeight[font] * scale;
    const lineHeightOffset = lineHeight - fontSize;

    return {
      height: fontSize,
      paddingVertical: Math.max(lineHeightOffset, 0) / 2,
    };
  }, [allowFontScaling, font, fontScale, theme]);

  const fallbackStyle = useMemo(
    () => [{ paddingTop: paddingVertical, paddingBottom: paddingVertical }, style],
    [paddingVertical, style],
  );

  return <Fallback height={height} style={fallbackStyle} {...props} />;
});
