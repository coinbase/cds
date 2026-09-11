import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import type { TextProps } from '../typography/Text';
import { Text } from '../typography/Text';

export type HelperTextProps = {
  /**
   * Determines the color of the text
   * @default fgMuted
   */
  color?: ThemeVars.Color;
  /** Accessibility label for the error icon */
  errorIconAccessibilityLabel?: string;
  /** Test ID for the error icon */
  errorIconTestID?: string;
  /** Custom styles for individual elements of the HelperText component */
  styles?: {
    /** Root text element */
    root?: TextProps['style'];
    /** Error icon element */
    icon?: TextProps['style'];
  };
} & TextProps;

export const HelperText = memo(function HelperText({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  styles,
  ...props
}: HelperTextProps) {
  const theme = useTheme();
  const rootStyle = [props.style, styles?.root];
  // TODO: when we actually remove dangerouslySetColor:
  // when migrating from dangerouslySetColor to style.color,
  // root style/className color will not automatically style the error icon like dangerouslySetColor.
  // Consumers must set both styles.root and styles.icon (or classNames equivalents).
  // We need to have a migrator handle this or document in future migration guide.
  const iconStyle = useMemo(
    () => [
      {
        // Sit on the first line of label2, matching nested-text alignment.
        marginTop: (theme.lineHeight.label2 - theme.iconSize.xs) / 2,
      },
      styles?.icon,
    ],
    [styles?.icon, theme.iconSize.xs, theme.lineHeight.label2],
  );
  const justifyContent =
    props.align === 'end' ? 'flex-end' : props.align === 'center' ? 'center' : 'flex-start';

  if (color === 'fgNegative') {
    return (
      <HStack alignItems="flex-start" gap={0.5} justifyContent={justifyContent}>
        <Icon
          active
          accessibilityLabel={errorIconAccessibilityLabel}
          allowFontScaling={false}
          color="fgNegative"
          dangerouslySetColor={
            typeof props.dangerouslySetColor === 'string' ? props.dangerouslySetColor : undefined
          }
          name="info"
          size="xs"
          style={iconStyle}
          testID={errorIconTestID}
        />
        <Text color={color} font="label2" {...props} flexShrink={1} style={rootStyle} />
      </HStack>
    );
  }

  return <Text color={color} font="label2" {...props} style={rootStyle} />;
});
