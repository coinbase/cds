import React, { forwardRef, memo, useMemo } from 'react';
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
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { Text } from '../typography/Text';

export const tagStaticClassName = 'cds-tag';

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
    maxWidth?: BoxProps<BoxDefaultElement>['maxWidth'];
  };

export type TagProps = TagBaseProps &
  Omit<BoxProps<BoxDefaultElement>, 'color' | 'background' | 'children' | 'maxWidth'>;

export const Tag = memo(
  forwardRef(function Tag(
    {
      children,
      intent = 'informational',
      emphasis = intent === 'informational' ? 'low' : 'high',
      colorScheme = 'blue',
      background: customBackground,
      color: customColor,
      display = 'inline-flex',
      alignItems = 'center',
      justifyContent = 'center',
      testID = tagStaticClassName,
      ...props
    }: TagProps,
    forwardedRef: React.ForwardedRef<HTMLDivElement>,
  ) {
    const theme = useTheme();
    const { background, foreground } = tagEmphasisColorMap[emphasis][colorScheme];
    const boxStyles = useMemo(
      () => ({
        backgroundColor: `rgb(${theme.spectrum[customBackground ?? background]})`,
      }),
      [background, customBackground, theme.spectrum],
    );
    const textStyles = useMemo(
      () => ({
        color: `rgb(${theme.spectrum[customColor ?? foreground]})`,
      }),
      [foreground, customColor, theme.spectrum],
    );

    return (
      <Box
        ref={forwardedRef}
        alignItems={alignItems}
        background="bg"
        borderRadius={tagBorderRadiusMap[intent]}
        className={tagStaticClassName}
        data-testid={testID}
        display={display}
        justifyContent={justifyContent}
        paddingX={tagHorizontalSpacing[intent]}
        paddingY={0.25}
        style={boxStyles}
        testID={testID}
        {...props}
      >
        <Text
          display="inline"
          font={tagFontMap[intent]}
          overflow="truncate"
          style={textStyles}
          testID={`${testID}--text`}
        >
          {children}
        </Text>
      </Box>
    );
  }),
);
