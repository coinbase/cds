import { forwardRef, Fragment, memo, type ReactNode, useMemo } from 'react';
import { getChipsSpacingProps } from '@coinbase/cds-common/chips/getChipsSpacingProps';
import { curves, durations } from '@coinbase/cds-common/motion/tokens';
import { chipMaxWidth } from '@coinbase/cds-common/tokens/chip';
import { css } from '@linaria/core';

import { cx } from '../cx';
import type { HStackProps } from '../layout';
import { Box, HStack } from '../layout';
import type { PressableProps } from '../system';
import { InvertedThemeProvider, Pressable } from '../system';
import { Text } from '../typography/Text';

import type { ChipProps } from './ChipProps';

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
    {
      as,
      alignItems = 'center',
      width = 'fit-content',
      height = 'fit-content',
      compact,
      gap = 0.75,
      start,
      end,
      paddingX,
      paddingY,
      padding,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      justifyContent,
      children,
      maxWidth = chipMaxWidth,
      inverted,
      numberOfLines = 1,
      testID,
      contentStyle,
      borderRadius = 700,
      background = 'bgSecondary',
      style,
      className,
      styles,
      classNames,
      font = compact ? 'label1' : 'headline',
      onClick,
      ...props
    }: ChipProps,
    ref: React.ForwardedRef<HTMLButtonElement | HTMLDivElement>,
  ) {
    const WrapperComponent = inverted ? InvertedThemeProvider : Fragment;

    const containerProps = {
      background,
      borderRadius,
      className: cx(transitionCss, className, classNames?.root),
      style: { ...style, ...styles?.root },
      testID,
      width,
      height,
      maxWidth,
    };

    const spacingProps = useMemo(() => {
      const defaults = getChipsSpacingProps({
        compact: !!compact,
        start: !!start,
        end: !!end,
        children: !!children,
      });
      return {
        gap: gap ?? defaults.gap,
        padding: padding ?? defaults.padding,
        paddingBottom: paddingBottom ?? defaults.paddingBottom,
        paddingEnd: paddingEnd ?? defaults.paddingEnd,
        paddingStart: paddingStart ?? defaults.paddingStart,
        paddingTop: paddingTop ?? defaults.paddingTop,
        paddingX: paddingX ?? defaults.paddingX,
        paddingY: paddingY ?? defaults.paddingY,
      };
    }, [
      compact,
      start,
      end,
      children,
      gap,
      padding,
      paddingBottom,
      paddingEnd,
      paddingStart,
      paddingTop,
      paddingX,
      paddingY,
    ]);

    const content = useMemo(() => {
      return (
        <HStack
          alignItems={alignItems}
          className={classNames?.content}
          justifyContent={justifyContent}
          maxWidth={maxWidth}
          {...spacingProps}
          style={{ ...contentStyle, ...styles?.content }}
        >
          {start}
          {typeof children === 'string' ? (
            <Text flexShrink={1} font={font} numberOfLines={numberOfLines}>
              {children}
            </Text>
          ) : children ? (
            <Box flexShrink={1}>{children}</Box>
          ) : null}
          {end}
        </HStack>
      );
    }, [
      alignItems,
      classNames?.content,
      justifyContent,
      maxWidth,
      spacingProps,
      contentStyle,
      styles?.content,
      start,
      children,
      font,
      numberOfLines,
      end,
    ]);

    return (
      <WrapperComponent {...(inverted ? { display: 'content' } : {})}>
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
