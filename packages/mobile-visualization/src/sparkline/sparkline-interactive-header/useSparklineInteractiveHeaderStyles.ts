import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { getAdjustedFontScale } from '@coinbase/cds-mobile/utils/getAdjustedFontScale';

import type { SparklineInteractiveSubHead } from './SparklineInteractiveHeader';

export type SparklineInteractiveSubHeadIconColor = SparklineInteractiveSubHead['variant'];

// The – character width is larger than the width of the + character.
// To prevent layout jank and jumping around we set a fixed width for
// this component. Because of accessible font scaling we first get the
// active font size and then calculate the character width, which for the –
// character is 0.6em.
const useSubIconWidth = () => {
  const theme = useTheme();
  const label1FontSize = theme.fontSize.label1;
  return useCallback(
    (color: SparklineInteractiveSubHeadIconColor) => {
      const activeWidth = label1FontSize * 0.6;
      // Hide if color is muted aka 0% change so icon is flushed to far left
      return color === 'foregroundMuted' ? 0 : activeWidth;
    },
    [label1FontSize],
  );
};

const variantColorMap: Record<SparklineInteractiveSubHeadIconColor, ThemeVars.Color> = {
  positive: 'fgPositive',
  negative: 'fgNegative',
  foregroundMuted: 'fgMuted',
};

export const styles = StyleSheet.create({
  // Inputs need to have these styles to make it appear as Text component
  inputReset: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
    lineHeight: undefined,
  },
  fullWidth: {
    width: '100%',
  },
  tabularNumbers: {
    fontVariant: ['tabular-nums'],
  },
});

export function useSparklineInteractiveHeaderStyles() {
  const theme = useTheme();
  const typography = {
    title1: {
      fontSize: theme.fontSize.title1,
      lineHeight: theme.lineHeight.title1,
      fontFamily: theme.fontFamily.title1,
    },
    label1: {
      fontSize: theme.fontSize.label1,
      lineHeight: theme.lineHeight.label1,
      fontFamily: theme.fontFamily.label1,
    },
    label2: {
      fontSize: theme.fontSize.label2,
      lineHeight: theme.lineHeight.label2,
      fontFamily: theme.fontFamily.label2,
    },
  };
  const fontSize = {
    title1: typography.title1.fontSize,
  };
  const lineHeight = {
    title1: typography.title1.lineHeight,
    label1: typography.label1.lineHeight,
  };

  const getSubIconWidth = useSubIconWidth();
  return useMemo(() => {
    return {
      // TITLE STYLES - the large price text
      title: (text: string): StyleProp<TextStyle> => {
        const { length } = text;
        // We manually decrease fontSize if length of new value
        // is greater than 12 characters long
        const { fontSize: titleFontSize } = getAdjustedFontScale(
          { fontSize: fontSize.title1 },
          length,
          12,
        );

        return [
          typography.title1,
          styles.tabularNumbers,
          styles.inputReset,
          styles.fullWidth,
          {
            fontSize: titleFontSize,
            color: theme.color.fg,
            height: lineHeight.title1,
          },
        ];
      },
      // LABEL STYLES - the small text above price
      label: [
        typography.label1,
        styles.inputReset,
        styles.fullWidth,
        {
          height: lineHeight.label1,
          color: theme.color.fgMuted,
        },
      ] as StyleProp<TextStyle>,
      // SUBHEAD ICON STYLES - the + or - after price and in front of percent change)
      subHeadIcon: (color: SparklineInteractiveSubHeadIconColor): StyleProp<TextStyle> => [
        typography.label1,
        styles.inputReset,
        {
          color: theme.color[variantColorMap[color]],
          width: getSubIconWidth(color),
          marginRight: theme.space[0.5] / 2,
          textAlign: 'left',
        },
      ],
      // SUBHEAD STYLES - the percent change text
      subHead: (
        color: SparklineInteractiveSubHeadIconColor,
        useFullWidth = true,
      ): StyleProp<TextStyle> =>
        [
          typography.label1,
          styles.tabularNumbers,
          ...(useFullWidth ? [styles.fullWidth] : [{ width: 'auto' }]),
          styles.inputReset,
          {
            color: theme.color[variantColorMap[color]],
          },
        ] as any,
      subHeadAccessory: (): StyleProp<TextStyle> => [
        typography.label2,
        styles.inputReset,
        {
          color: theme.color.fgMuted,
          marginLeft: theme.space[0.5],
          textAlign: 'left',
        },
      ],
    } as const;
  }, [
    typography.label1,
    typography.title1,
    typography.label2,
    lineHeight.label1,
    lineHeight.title1,
    theme.color,
    theme.space,
    fontSize.title1,
    getSubIconWidth,
  ]);
}
