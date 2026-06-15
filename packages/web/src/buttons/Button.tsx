import React, { forwardRef, memo, useMemo } from 'react';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { ButtonVariant } from '@coinbase/cds-common/types/ButtonBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useResolveResponsiveProp } from '../hooks/useResolveResponsiveProp';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';
import { ProgressCircle } from '../visualizations/ProgressCircle';

const COMPONENT_STATIC_CLASSNAME = 'cds-Button';

/** @deprecated Use progressCircleSize instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export const spinnerHeight = 2.5;

const defaultProgressCircleSize = 24;

const baseCss = css`
  text-decoration: none;
  display: inline-flex;
  height: fit-content;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  position: relative;
  white-space: nowrap;
  appearance: none;
  outline: 0;
  overflow: visible;
  text-transform: none;
`;

const blockCss = css`
  display: flex;
  width: 100%;
  max-width: 100%;
  white-space: normal;
`;

const spinnerContainerCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const startNodeCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-start;
  margin-inline-end: var(--space-1);
`;

const endNodeCss = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  justify-content: flex-end;
  margin-inline-start: var(--space-1);
`;

const iconCss = css`
  justify-content: space-between;
`;

const unsetNoWrapCss = css`
  white-space: unset;
`;

const hiddenCss = css`
  visibility: hidden;
`;

const middleNodeCss = css`
  display: flex;
  position: relative;
`;

const flushCss = css`
  min-width: unset;
`;

export const buttonDefaultElement = 'button';

export type ButtonDefaultElement = typeof buttonDefaultElement;

export type ButtonBaseProps = Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Size of the loading progress circle in px.
       * @default 24
       */
      progressCircleSize?: number;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>;

export type ButtonProps<AsComponent extends React.ElementType = ButtonDefaultElement> =
  Polymorphic.Props<AsComponent, ButtonBaseProps>;

type ButtonComponent = (<AsComponent extends React.ElementType = ButtonDefaultElement>(
  props: ButtonProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Button: ButtonComponent = memo(
  forwardRef<React.ReactElement<ButtonBaseProps>, ButtonBaseProps>(
    <AsComponent extends React.ElementType>(
      _props: ButtonProps<AsComponent>,
      ref?: Polymorphic.Ref<AsComponent>,
    ) => {
      const mergedProps = useComponentConfig('Button', _props);
      const {
        as,
        variant = 'primary',
        loading,
        progressCircleSize = defaultProgressCircleSize,
        transparent,
        block,
        compact,
        children,
        start,
        startIcon,
        startIconActive,
        end,
        endIcon,
        endIconActive,
        flush,
        noScaleOnPress,
        numberOfLines,
        font = 'headline',
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        background,
        color,
        className,
        borderColor,
        borderWidth = 0, // remove Pressable's default transparent border
        borderRadius = compact ? 700 : 900,
        accessibilityLabel,
        padding,
        paddingX = padding ?? (compact ? 2 : 4),
        paddingY = padding ?? (compact ? 1 : 2),
        margin = 0,
        minWidth = 'auto',
        style,
        textAlign = 'center',
        ...props
      } = mergedProps;
      const theme = useTheme();
      const Component = (as ?? buttonDefaultElement) satisfies React.ElementType;
      const iconSize = compact ? 's' : 'm';
      const hasIcon = Boolean(startIcon ?? endIcon);

      const variantMap = transparent ? transparentVariants : variants;
      const variantStyle = variantMap[variant];

      const colorValue = color ?? variantStyle.color;
      const backgroundValue = background ?? variantStyle.background;
      const borderColorValue = borderColor ?? variantStyle.borderColor;

      const resolvedPaddingX = useResolveResponsiveProp(paddingX);

      const pressableStyle = useMemo(() => {
        if (!flush || !resolvedPaddingX) return style;
        const paddingPx = theme.space[resolvedPaddingX];
        return {
          ...style,
          ...(flush === 'start'
            ? { marginInlineStart: -paddingPx, marginInlineEnd: paddingPx }
            : { marginInlineStart: paddingPx, marginInlineEnd: -paddingPx }),
        };
      }, [flush, resolvedPaddingX, theme.space, style]);

      return (
        <Pressable
          ref={ref}
          aria-label={accessibilityLabel ?? (loading ? 'Loading' : undefined)}
          as={Component}
          background={backgroundValue}
          borderColor={borderColorValue}
          borderRadius={borderRadius}
          borderWidth={borderWidth}
          className={cx(
            COMPONENT_STATIC_CLASSNAME,
            baseCss,
            numberOfLines && unsetNoWrapCss,
            hasIcon && iconCss,
            block && blockCss,
            flush && flushCss,
            className,
          )}
          color={colorValue}
          data-block={block}
          data-compact={compact}
          data-flush={flush}
          data-transparent={transparent}
          data-variant={variant}
          loading={loading}
          margin={margin}
          minWidth={minWidth}
          noScaleOnPress={noScaleOnPress}
          padding={padding}
          paddingX={paddingX}
          paddingY={paddingY}
          style={pressableStyle}
          transparentWhileInactive={transparent}
          {...props}
        >
          {start ? (
            <span className={startNodeCss}>{start}</span>
          ) : startIcon ? (
            <span className={startNodeCss}>
              <Icon
                active={startIconActive}
                color="currentColor"
                name={startIcon}
                size={iconSize}
              />
            </span>
          ) : null}

          <span className={middleNodeCss}>
            {loading && (
              <span className={spinnerContainerCss}>
                <ProgressCircle
                  indeterminate
                  accessibilityLabel="Loading"
                  color="currentColor"
                  size={progressCircleSize}
                  weight="thin"
                />
              </span>
            )}
            <Text
              color="currentColor"
              display="inline"
              font={font}
              fontFamily={fontFamily}
              fontSize={fontSize}
              fontWeight={fontWeight}
              lineHeight={lineHeight}
              numberOfLines={numberOfLines}
              textAlign={textAlign}
            >
              <span className={cx(loading && hiddenCss)}>{children}</span>
            </Text>
          </span>

          {end ? (
            <span className={endNodeCss}>{end}</span>
          ) : endIcon ? (
            <span className={endNodeCss}>
              <Icon active={endIconActive} color="currentColor" name={endIcon} size={iconSize} />
            </span>
          ) : null}
        </Pressable>
      );
    },
  ),
);
