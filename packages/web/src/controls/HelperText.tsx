import React, { memo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { cx } from '../cx';
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
  /** Custom inline styles for individual elements of the HelperText component */
  styles?: {
    /** Root text element */
    root?: React.CSSProperties;
    /** Error icon element */
    icon?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the HelperText component */
  classNames?: {
    /** Root text element */
    root?: string;
    /** Error icon element */
    icon?: string;
  };
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
  style,
  styles,
  className,
  classNames,
  ...props
}: HelperTextProps) {
  const rootStyle = { ...style, ...styles?.root };
  // TODO: when we actually remove dangerouslySetColor:
  // when migrating from dangerouslySetColor to style.color,
  // root style/className color will not automatically style the error icon like dangerouslySetColor.
  // Consumers must set both styles.root and styles.icon (or classNames equivalents).
  // We need to have a migrator handle this or document in future migration guide.
  const iconStyle = styles?.icon;

  return (
    <Text
      className={cx(className, classNames?.root)}
      color={color}
      dangerouslySetColor={dangerouslySetColor}
      display="block"
      font="label2"
      id={id}
      style={rootStyle}
      textAlign={textAlign}
      {...props}
    >
      {color === 'fgNegative' && (
        <Box as="span" className={iconCss}>
          <Icon
            active
            accessibilityLabel={errorIconAccessibilityLabel}
            className={classNames?.icon}
            color="fgNegative"
            dangerouslySetColor={dangerouslySetColor}
            name="info"
            size="xs"
            style={iconStyle}
            testID={errorIconTestID}
          />
        </Box>
      )}
      {children}
    </Text>
  );
});
