import React, { forwardRef, memo, useMemo } from 'react';
import type { IconName, SharedProps, ValidateProps } from '@coinbase/cds-common/types';
import type { IconSize, IconSourcePixelSize } from '@coinbase/cds-common/types/IconSize';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { isDevelopment } from '@coinbase/cds-utils/env';
import { css, type LinariaClassName } from '@linaria/core';

import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps, type BoxDefaultElement, type BoxProps } from '../layout/Box';

const COMPONENT_STATIC_CLASSNAME = 'cds-Icon';

export type IconBaseProps = SharedProps &
  Pick<
    BoxBaseProps,
    | 'padding'
    | 'paddingX'
    | 'paddingY'
    | 'paddingTop'
    | 'paddingEnd'
    | 'paddingBottom'
    | 'paddingStart'
  > & {
    /**
     * Size for a given icon.
     * @default m
     */
    size?: IconSize;
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /**
     * Fallback element to render if unable to find an icon with matching name
     * @default null
     * */
    fallback?: null | React.ReactNode;
    /**
     * Toggles the active and inactive state of the navigation icon
     * @default false
     */
    active?: boolean;
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
  };

export type IconProps = IconBaseProps &
  BoxProps<BoxDefaultElement> & {
    /** Custom inline styles for individual elements of the Icon component */
    styles?: {
      /** Outer Box wrapper element */
      root?: React.CSSProperties;
      /** Inner icon glyph element */
      icon?: React.CSSProperties;
    };
    /** Custom class names for individual elements of the Icon component */
    classNames?: {
      /** Outer Box wrapper element */
      root?: string;
      /** Inner icon glyph element */
      icon?: string;
    };
  };

const iconCss = css`
  color: currentColor;
  font-family: 'CoinbaseIcons';
  font-weight: 400;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  line-height: 1;
  flex-shrink: 0;
  display: block;
  text-decoration: none;

  > * {
    transition: fill 150ms ease-in-out;
  }
`;
const sizeCss: {
  [key in IconSize]: LinariaClassName;
} = {
  xs: css`
    width: var(--iconSize-xs);
    height: var(--iconSize-xs);
    font-size: var(--iconSize-xs);
  `,
  s: css`
    width: var(--iconSize-s);
    height: var(--iconSize-s);
    font-size: var(--iconSize-s);
  `,
  m: css`
    width: var(--iconSize-m);
    height: var(--iconSize-m);
    font-size: var(--iconSize-m);
  `,
  l: css`
    width: var(--iconSize-l);
    height: var(--iconSize-l);
    font-size: var(--iconSize-l);
  `,
};

const getIconSourceSize = (iconSize: number): IconSourcePixelSize => {
  if (iconSize <= 12) return 12;
  if (iconSize <= 16) return 16;
  return 24;
};

export const Icon = memo(
  forwardRef(
    (
      {
        accessibilityLabel,
        color = 'fgPrimary',
        dangerouslySetColor,
        fallback = null,
        name,
        size = 'm',
        testID,
        className,
        classNames,
        style,
        styles,
        active,
        ...props
      }: IconProps,
      ref: React.Ref<HTMLElement>,
    ) => {
      const theme = useTheme();

      const iconSize = theme.iconSize[size];
      const sourceSize = getIconSourceSize(iconSize);

      const rootStyle = useMemo(
        () => ({
          ...(dangerouslySetColor ? { color: dangerouslySetColor } : {}),
          ...style,
          ...styles?.root,
        }),
        [dangerouslySetColor, style, styles?.root],
      );

      const iconName = `${name}-${sourceSize}-${active ? 'active' : 'inactive'}`;
      const glyph = glyphMap[iconName as keyof typeof glyphMap];

      if (glyph === undefined) {
        if (isDevelopment()) {
          console.error(
            `Unable to find glyph for icon name "${name}" with glyph key "${iconName}"`,
          );
        }
        return fallback;
      }

      const glyphTestId = testID ? `${testID}-glyph` : 'icon-base-glyph';

      return (
        <Box
          className={cx(COMPONENT_STATIC_CLASSNAME, className, classNames?.root)}
          color={color}
          position="relative"
          style={rootStyle}
          testID={testID}
          {...(props satisfies ValidateProps<
            typeof props,
            Omit<IconProps, keyof BoxProps<BoxDefaultElement>>
          >)}
        >
          <span
            ref={ref}
            aria-hidden={!accessibilityLabel}
            aria-label={accessibilityLabel}
            className={cx(iconCss, sizeCss[size], classNames?.icon)}
            data-icon-name={name}
            data-testid={glyphTestId}
            role="img"
            style={styles?.icon}
            title={accessibilityLabel}
            translate="no"
          >
            {glyph}
          </span>
        </Box>
      );
    },
  ),
);

Icon.displayName = 'Icon';

export { getIconSourceSize };
