import React, { memo } from 'react';
import type { ThemeVars } from '@cbhq/cds-common/core/theme';
import { css } from '@linaria/core';

import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { Text, type TextDefaultElement, type TextProps } from '../typography/Text';

export type HelperTextProps = {
  /** Color of helper text. negative color will render an icon */
  color?: ThemeVars.Color;
  /** Used to associate the helper text with an input */
  id?: string;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
} & TextProps<TextDefaultElement>;

const iconCss = css`
  display: inline-block;
  padding-inline-end: var(--space-0_5);
`;

export const HelperText = memo(function HelperTex({
  color,
  id,
  errorIconAccessibilityLabel,
  errorIconTestID,
  children,
  dangerouslySetColor,
  textAlign = 'start',
  ...props
}: HelperTextProps) {
  return (
    <Text
      color={color}
      dangerouslySetColor={dangerouslySetColor}
      display="block"
      font="label2"
      id={id}
      textAlign={textAlign}
      {...props}
    >
      {color === 'fgNegative' && (
        <Box as="span" className={iconCss}>
          <Icon
            active
            accessibilityLabel={errorIconAccessibilityLabel}
            color="fgNegative"
            dangerouslySetColor={dangerouslySetColor}
            name="info"
            size="xs"
            testID={errorIconTestID}
          />
        </Box>
      )}
      {children}
    </Text>
  );
});
