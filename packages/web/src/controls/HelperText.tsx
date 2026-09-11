import React, { memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';

import { cx } from '../cx';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
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

export const HelperText = memo(function HelperTex({
  color,
  errorIconAccessibilityLabel,
  errorIconTestID,
  styles,
  classNames,
  ...props
}: HelperTextProps) {
  const rootStyle = { ...props.style, ...styles?.root };
  // TODO: when we actually remove dangerouslySetColor:
  // when migrating from dangerouslySetColor to style.color,
  // root style/className color will not automatically style the error icon like dangerouslySetColor.
  // Consumers must set both styles.root and styles.icon (or classNames equivalents).
  // We need to have a migrator handle this or document in future migration guide.
  const iconStyle = useMemo(
    () => ({
      // Sit on the first line of label2, matching nested-text alignment.
      marginTop: 'calc((var(--lineHeight-label2) - var(--iconSize-xs)) / 2)',
      ...styles?.icon,
    }),
    [styles?.icon],
  );
  const justifyContent =
    props.textAlign === 'end' ? 'flex-end' : props.textAlign === 'center' ? 'center' : 'flex-start';

  if (color === 'fgNegative') {
    return (
      <HStack alignItems="flex-start" gap={0.5} justifyContent={justifyContent}>
        <Icon
          active
          accessibilityLabel={errorIconAccessibilityLabel}
          className={classNames?.icon}
          color="fgNegative"
          dangerouslySetColor={props.dangerouslySetColor}
          name="info"
          size="xs"
          style={iconStyle}
          testID={errorIconTestID}
        />
        <Text
          color={color}
          display="block"
          font="label2"
          {...props}
          className={cx(props.className, classNames?.root)}
          flexShrink={1}
          style={rootStyle}
        />
      </HStack>
    );
  }

  return (
    <Text
      color={color}
      display="block"
      font="label2"
      {...props}
      className={cx(props.className, classNames?.root)}
      style={rootStyle}
    />
  );
});
