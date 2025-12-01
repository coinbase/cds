import React, { forwardRef, memo } from 'react';
import type { View } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  tagBorderRadiusMap,
  tagEmphasisColorMap,
  tagFontMap,
  tagHorizontalSpacing,
} from '@coinbase/cds-common/tokens/tags';
import type {
  SharedAccessibilityProps,
  SharedProps,
  TagColorScheme,
  TagEmphasis,
  TagIntent,
} from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';
import { Box, type BoxProps } from '../layout';
import { Text } from '../typography/Text';

export type TagBaseProps = SharedProps &
  SharedAccessibilityProps & {
    /** Children to render within the Tag. */
    children: React.ReactNode;
    /**
     * Specify the intent of the Tag
     * @default informational
     */
    intent?: TagIntent;
    /**
     * Specify the emphasis of the Tag.
     * @default 'low' when informational intent, 'high' when promotional intent
     */
    emphasis?: TagEmphasis;
    /**
     * Specify the colorScheme of the Tag
     * @default blue
     */
    colorScheme?: TagColorScheme;
    /** @danger Custom background color */
    background?: ThemeVars.SpectrumColor;
    /** @danger Custom text color */
    color?: ThemeVars.SpectrumColor;
    /** Setting a custom max width for this tag will enable text truncation */
    maxWidth?: BoxProps['maxWidth'];
  };

export type TagProps = TagBaseProps &
  Omit<BoxProps, 'color' | 'background' | 'children' | 'maxWidth'>;

export const Tag = memo(
  forwardRef(
    (
      {
        children,
        intent = 'informational',
        emphasis = intent === 'informational' ? 'low' : 'high',
        colorScheme = 'blue',
        background: customBackground,
        color: customColor,
        alignItems = 'center',
        justifyContent = 'center',
        testID = 'cds-tag',
        ...props
      }: TagProps,
      forwardedRef: React.ForwardedRef<View>,
    ) => {
      const theme = useTheme();
      const { background, foreground } = tagEmphasisColorMap[emphasis][colorScheme];
      const backgroundColor = `rgb(${theme.spectrum[customBackground ?? background]})`;
      const color = `rgb(${theme.spectrum[customColor ?? foreground]})`;

      return (
        <Box
          ref={forwardedRef}
          alignItems={alignItems}
          background="bg"
          borderRadius={tagBorderRadiusMap[intent]}
          dangerouslySetBackground={backgroundColor}
          justifyContent={justifyContent}
          paddingX={tagHorizontalSpacing[intent]}
          paddingY={0.25}
          testID={testID}
          {...props}
        >
          <Text
            dangerouslySetColor={color}
            font={tagFontMap[intent]}
            numberOfLines={1}
            testID={`${testID}--text`}
          >
            {children}
          </Text>
        </Box>
      );
    },
  ),
);
