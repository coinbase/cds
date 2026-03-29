import React, { forwardRef, useMemo } from 'react';
import { getBlendedColor } from '@coinbase/cds-common/color/getBlendedColor';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import {
  accessibleOpacityDisabled,
  opacityDisabled,
  opacityHovered,
  opacityPressed,
} from '@coinbase/cds-common/tokens/interactable';
import { css } from '@linaria/core';

import type { Polymorphic } from '../core/polymorphism';
import type { Theme } from '../core/theme';
import { cx } from '../cx';
import { useTheme } from '../hooks/useTheme';
import { Box, type BoxBaseProps } from '../layout/Box';

import {
  interactableBackground,
  interactableBorderColor,
  interactableDisabledBackground,
  interactableDisabledBorderColor,
  interactableHoveredBackground,
  interactableHoveredBorderColor,
  interactableHoveredOpacity,
  interactablePressedBackground,
  interactablePressedBorderColor,
  interactablePressedOpacity,
} from './interactableCSSProperties';

const COMPONENT_STATIC_CLASSNAME = 'cds-Interactable';

const baseCss = css`
  appearance: none;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  background-color: var(${interactableBackground});
  border-color: var(${interactableBorderColor});

  /* Removes weird bonus padding in Firefox */
  &::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }

  &:hover {
    background-color: var(${interactableHoveredBackground});
    border-color: var(${interactableHoveredBorderColor});
    > * {
      opacity: var(${interactableHoveredOpacity});
    }
  }

  &:active,
  &[aria-pressed='true'] {
    background-color: var(${interactablePressedBackground});
    border-color: var(${interactablePressedBorderColor});
    > * {
      opacity: var(${interactablePressedOpacity});
    }
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: ${accessibleOpacityDisabled};
    cursor: default;
    pointer-events: none;
    touch-action: none;
    background-color: var(${interactableDisabledBackground});
    border-color: var(${interactableDisabledBorderColor});
  }

  /* Disable default focus ring before adding custom focus ring styles */
  &:focus {
    outline: none;
  }
  &:focus-visible {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 2px;
    outline-color: var(--color-bgPrimary);
  }
`;

const blockCss = css`
  display: block;
  width: 100%;
`;

const transparentActiveCss = css`
  &:active {
    background-color: var(--color-transparent);
    border-color: var(--color-transparent);
  }
`;

const transparentWhileInactiveCss = css`
  background-color: var(--color-transparent);
  border-color: var(--color-transparent);
  &:disabled,
  &[aria-disabled='true'] {
    background-color: var(--color-transparent);
    border-color: var(--color-transparent);
  }
`;

export const interactableDefaultElement = 'button';

export type InteractableDefaultElement = typeof interactableDefaultElement;

/**
 * Custom color overrides for different interaction states.
 * Base colors (background, borderColor) are used directly, while interaction
 * state colors (hovered, pressed, disabled) are used as alternative base colors
 * for blending calculations with blend strength and color scheme considerations.
 *
 * @example
 * ```tsx
 * <Interactable
 *   blendStyles={{
 *     background: '#ffffff',
 *     hoveredBackground: '#f5f5f5',
 *     pressedBackground: '#e0e0e0',
 *     borderColor: '#cccccc'
 *   }}
 * />
 * ```
 */
export type InteractableBlendStyles = {
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
};

export type InteractableBaseProps = Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>;

export type InteractableProps<AsComponent extends React.ElementType> = Polymorphic.Props<
  AsComponent,
  InteractableBaseProps
>;

type InteractableComponent = (<AsComponent extends React.ElementType = InteractableDefaultElement>(
  props: InteractableProps<AsComponent>,
) => Polymorphic.ReactReturn) &
  Polymorphic.ReactNamed;

export const Interactable: InteractableComponent = forwardRef<
  React.ReactElement<InteractableBaseProps>,
  InteractableBaseProps
>(
  <AsComponent extends React.ElementType>(
    {
      as,
      background = 'transparent',
      borderColor = background,
      borderWidth = 100,
      block,
      className,
      disabled,
      loading,
      pressed,
      style,
      blendStyles,
      transparentWhileInactive,
      transparentWhilePressed,
      ...props
    }: Polymorphic.Props<AsComponent, InteractableBaseProps>,
    ref: Polymorphic.Ref<AsComponent>,
  ) => {
    const Component = (as ?? interactableDefaultElement) satisfies React.ElementType;
    const theme = useTheme();

    const interactableStyle = useMemo(
      () => ({
        ...getInteractableStyles({
          theme,
          background,
          blendStyles,
          borderColor,
        }),
        ...style,
      }),
      [style, background, theme, blendStyles, borderColor],
    );

    return (
      <Box
        ref={ref}
        aria-busy={loading}
        aria-disabled={loading || disabled || undefined}
        aria-pressed={pressed}
        as={Component}
        borderWidth={borderWidth}
        className={cx(
          COMPONENT_STATIC_CLASSNAME,
          baseCss,
          block && blockCss,
          transparentWhileInactive && transparentWhileInactiveCss,
          transparentWhilePressed && transparentActiveCss,
          className,
        )}
        data-disabled={disabled}
        disabled={disabled}
        style={interactableStyle}
        {...props}
      />
    );
  },
);

export const getInteractableStyles = ({
  theme,
  background = 'transparent',
  borderColor = background,
  blendStyles,
}: {
  theme: Theme;
  background?: ThemeVars.Color;
  borderColor?: ThemeVars.Color;
  blendStyles?: InteractableBlendStyles;
}) => {
  const backgroundColor = blendStyles?.background ?? theme.color[background];
  const borderColorValue = blendStyles?.borderColor ?? theme.color[borderColor];
  const hoveredOpacity = blendStyles?.hoveredOpacity ?? opacityHovered;
  const pressedOpacity = blendStyles?.pressedOpacity ?? opacityPressed;
  const disabledOpacity = blendStyles?.disabledOpacity ?? opacityDisabled;

  return {
    [interactableBackground]: blendStyles?.background ?? `var(--color-${background})`,
    [interactableBorderColor]: blendStyles?.borderColor ?? `var(--color-${borderColor})`,
    /**
     * Apply an interactive background style. Blend the color with the background or backgroundInverse values
     */
    // Hover:
    [interactableHoveredBackground]: getBlendedColor({
      overlayColor: blendStyles?.hoveredBackground ?? backgroundColor,
      blendOpacity: hoveredOpacity,
      colorScheme: theme.activeColorScheme,
    }),
    [interactableHoveredBorderColor]: getBlendedColor({
      overlayColor: blendStyles?.hoveredBorderColor ?? borderColorValue,
      blendOpacity: hoveredOpacity,
      colorScheme: theme.activeColorScheme,
    }),
    [interactableHoveredOpacity]: hoveredOpacity,
    // Pressed:
    [interactablePressedBackground]: getBlendedColor({
      overlayColor: blendStyles?.pressedBackground ?? backgroundColor,
      blendOpacity: pressedOpacity,
      colorScheme: theme.activeColorScheme,
    }),
    [interactablePressedBorderColor]: getBlendedColor({
      overlayColor: blendStyles?.pressedBorderColor ?? borderColorValue,
      blendOpacity: pressedOpacity,
      colorScheme: theme.activeColorScheme,
    }),
    [interactablePressedOpacity]: pressedOpacity,
    // Disabled:
    [interactableDisabledBackground]: getBlendedColor({
      overlayColor: blendStyles?.disabledBackground ?? backgroundColor,
      blendOpacity: disabledOpacity,
      colorScheme: theme.activeColorScheme,
      skipContrastOptimization: true,
    }),
    [interactableDisabledBorderColor]: getBlendedColor({
      overlayColor: blendStyles?.disabledBorderColor ?? borderColorValue,
      blendOpacity: disabledOpacity,
      colorScheme: theme.activeColorScheme,
      skipContrastOptimization: true,
    }),
  };
};
