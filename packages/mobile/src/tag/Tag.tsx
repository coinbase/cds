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
  IconName,
  SharedAccessibilityProps,
  SharedProps,
  TagColorScheme,
  TagEmphasis,
  TagIntent,
} from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
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
    /** Set the start node */
    start?: React.ReactNode;
    /** Icon to render at the start of the tag. */
    startIcon?: IconName;
    /** Whether the start icon is active */
    startIconActive?: boolean;
    /** Set the end node */
    end?: React.ReactNode;
    /** Icon to render at the end of the tag. */
    endIcon?: IconName;
    /** Whether the end icon is active */
    endIconActive?: boolean;
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
        start,
        startIcon,
        startIconActive,
        end,
        endIcon,
        endIconActive,
        alignItems = 'center',
        flexDirection = 'row',
        gap = 0.5,
        justifyContent = 'center',
        paddingY = 0.25,
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
          flexDirection={flexDirection}
          gap={gap}
          justifyContent={justifyContent}
          paddingX={tagHorizontalSpacing[intent]}
          paddingY={paddingY}
          testID={testID}
          {...props}
        >
          {start ? (
            start
          ) : startIcon ? (
            <Icon active={startIconActive} dangerouslySetColor={color} name={startIcon} size="xs" />
          ) : null}

          <Text
            dangerouslySetColor={color}
            font={tagFontMap[intent]}
            numberOfLines={1}
            testID={`${testID}--text`}
          >
            {children}
          </Text>

          {end ? (
            end
          ) : endIcon ? (
            <Icon active={endIconActive} dangerouslySetColor={color} name={endIcon} size="xs" />
          ) : null}
        </Box>
      );
    },
  ),
);
