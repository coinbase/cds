import React, { forwardRef, memo, useMemo } from 'react';
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
import { css } from '@linaria/core';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box, type BoxDefaultElement, type BoxProps } from '../layout/Box';
import { Text } from '../typography/Text';

const nodeCss = css`
  display: inline-flex;
  align-items: center;
`;

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
      start,
      startIcon,
      startIconActive,
      end,
      endIcon,
      endIconActive,
      display = 'inline-flex',
      alignItems = 'center',
      gap = 0.5,
      justifyContent = 'center',
      paddingY = 0.25,
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
        color: `rgb(${theme.spectrum[customColor ?? foreground]})`,
      }),
      [background, customBackground, foreground, customColor, theme.spectrum],
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
        gap={gap}
        justifyContent={justifyContent}
        paddingX={tagHorizontalSpacing[intent]}
        paddingY={paddingY}
        style={boxStyles}
        testID={testID}
        {...props}
      >
        {start ? (
          <span className={nodeCss}>{start}</span>
        ) : startIcon ? (
          <span className={nodeCss}>
            <Icon active={startIconActive} color="currentColor" name={startIcon} size="xs" />
          </span>
        ) : null}

        <Text
          color="currentColor"
          display="inline"
          font={tagFontMap[intent]}
          overflow="truncate"
          testID={`${testID}--text`}
        >
          {children}
        </Text>

        {end ? (
          <span className={nodeCss}>{end}</span>
        ) : endIcon ? (
          <span className={nodeCss}>
            <Icon active={endIconActive} color="currentColor" name={endIcon} size="xs" />
          </span>
        ) : null}
      </Box>
    );
  }),
);
