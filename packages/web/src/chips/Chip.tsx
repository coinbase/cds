import { forwardRef, Fragment, memo, useMemo } from 'react';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import { chipMaxWidth } from '@coinbase/cds-common/tokens/chip';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Box } from '../layout/Box';
import type { HStackProps } from '../layout/HStack';
import { HStack } from '../layout/HStack';
import type { PressableProps } from '../system/Pressable';
import { Pressable } from '../system/Pressable';
import { InvertedThemeProvider } from '../system/ThemeProvider';
import { Text } from '../typography/Text';

import type { ChipProps, ChipSize } from './ChipProps';
export type { ChipProps, ChipSize };

const chipSizes = {
  xs: { paddingX: 1.5, paddingY: 0.75, font: 'label1', borderRadius: 700 },
  s: { paddingX: 2, paddingY: 1, font: 'headline', borderRadius: 700 },
} as const satisfies Record<
  ChipSize,
  {
    paddingX: NonNullable<HStackProps<'div'>['paddingX']>;
    paddingY: NonNullable<HStackProps<'div'>['paddingY']>;
    font: NonNullable<ChipProps['font']>;
    borderRadius: NonNullable<ChipProps['borderRadius']>;
  }
>;

const defaultChipSize: ChipSize = 's';

const transitionCss = css`
  transition: background ${durations.fast3}ms cubic-bezier(${curves.global.join(',')});
`;

/**
 * This is a basic Chip component used to create all Chip components.
 * When onClick is provided, the ref will be typed as HTMLButtonElement.
 * When onClick is not provided, the ref will be typed as HTMLDivElement.
 */
export const Chip = memo(
  forwardRef(function Chip(
    _props: ChipProps,
    ref: React.ForwardedRef<HTMLButtonElement | HTMLDivElement>,
  ) {
    const mergedProps = useComponentConfig('Chip', _props);
    // Geometry is driven by `size`; deprecated `compact` falls back to its legacy `xs` size.
    const sizeConfig =
      chipSizes[mergedProps.size ?? (mergedProps.compact ? 'xs' : defaultChipSize)];
    const {
      as,
      alignItems = 'center',
      width = 'fit-content',
      height = 'fit-content',
      compact,
      size: _size,
      gap = 1,
      start,
      end,
      paddingX = sizeConfig.paddingX,
      paddingY = sizeConfig.paddingY,
      padding,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      justifyContent,
      children,
      maxWidth = chipMaxWidth,
      active = false,
      activeBackground,
      activeColor,
      invertColorScheme,
      inverted,
      numberOfLines = 1,
      testID,
      contentStyle,
      borderRadius = sizeConfig.borderRadius,
      background = 'bgSecondary',
      style,
      className,
      styles,
      classNames,
      font = sizeConfig.font,
      color = 'fg',
      onClick,
      ...props
    } = mergedProps;

    const hasActiveColorOverrides = activeBackground !== undefined || activeColor !== undefined;
    const activeUsesThemeInversion = active && !hasActiveColorOverrides;
    const shouldInvert = Boolean(invertColorScheme ?? inverted) || activeUsesThemeInversion;
    const WrapperComponent = shouldInvert ? InvertedThemeProvider : Fragment;

    const resolvedBackground =
      active && activeBackground !== undefined ? activeBackground : background;
    const resolvedColor = active && activeColor !== undefined ? activeColor : color;

    const containerProps = {
      background: resolvedBackground,
      borderRadius,
      className: cx(transitionCss, className, classNames?.root),
      style: { ...style, ...styles?.root },
      testID,
      width,
      height,
      maxWidth,
    };

    const content = useMemo(() => {
      return (
        <HStack
          alignItems={alignItems}
          className={classNames?.content}
          gap={gap}
          justifyContent={justifyContent}
          maxWidth={maxWidth}
          padding={padding}
          paddingBottom={paddingBottom}
          paddingEnd={paddingEnd}
          paddingStart={paddingStart}
          paddingTop={paddingTop}
          paddingX={paddingX}
          paddingY={paddingY}
          style={{ ...contentStyle, ...styles?.content }}
        >
          {start}
          {typeof children === 'string' ? (
            <Text color={resolvedColor} flexShrink={1} font={font} numberOfLines={numberOfLines}>
              {children}
            </Text>
          ) : children ? (
            <Box color={resolvedColor} flexShrink={1}>
              {children}
            </Box>
          ) : null}
          {end}
        </HStack>
      );
    }, [
      alignItems,
      classNames?.content,
      gap,
      justifyContent,
      maxWidth,
      padding,
      paddingBottom,
      paddingEnd,
      paddingStart,
      paddingTop,
      paddingX,
      paddingY,
      contentStyle,
      styles?.content,
      start,
      children,
      resolvedColor,
      font,
      numberOfLines,
      end,
    ]);

    return (
      <WrapperComponent {...(shouldInvert && inverted ? { display: 'content' } : {})}>
        {onClick ? (
          <Pressable
            ref={ref as React.ForwardedRef<HTMLButtonElement>}
            onClick={onClick}
            {...containerProps}
            {...(props as Partial<PressableProps<'button'>>)}
          >
            {content}
          </Pressable>
        ) : (
          <HStack
            ref={ref as React.ForwardedRef<HTMLDivElement>}
            {...containerProps}
            {...(props as Partial<HStackProps<'div'>>)}
          >
            {content}
          </HStack>
        )}
      </WrapperComponent>
    );
  }),
);
