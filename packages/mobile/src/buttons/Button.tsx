import React, { forwardRef, isValidElement, memo, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  type PressableStateCallbackType,
  StyleSheet,
  type View,
} from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import type {
  ButtonVariant,
  IconName,
  SharedAccessibilityProps,
  SharedProps,
} from '@coinbase/cds-common/types';
import { getButtonSpacingProps } from '@coinbase/cds-common/utils/getButtonSpacingProps';

import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';

export const styles = StyleSheet.create({
  inline: {
    width: 'auto',
    minWidth: 64,
  },
  block: {
    width: '100%',
    maxWidth: '100%',
  },
  text: {
    flexShrink: 1,
  },
  icon: {
    flexShrink: 0,
  },
});

export type ButtonBaseProps = SharedProps &
  Pick<SharedAccessibilityProps, 'accessibilityLabel'> &
  PressableBaseProps & {
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: ButtonVariant;
    /** Mark the button as disabled. */
    disabled?: boolean;
    /** Mark the button as loading and display a spinner. */
    loading?: boolean;
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
  };

export type ButtonProps = ButtonBaseProps;

export const Button = memo(
  forwardRef(function Button(
    {
      variant = 'primary',
      loading,
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
      numberOfLines = 1,
      font = 'headline',
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      background,
      color,
      style,
      wrapperStyles,
      feedback = compact ? 'light' : 'normal',
      borderColor,
      borderWidth = 100,
      borderRadius = compact ? 700 : 900,
      accessibilityLabel,
      accessibilityHint,
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<View>,
  ) {
    const theme = useTheme();
    const iconSize = compact ? 's' : 'm';
    const hasIcon = Boolean(startIcon || endIcon);

    const variantMap = transparent ? transparentVariants : variants;

    const variantStyle = variantMap[variant];

    const colorValue = color ?? variantStyle.color;
    const backgroundValue = background ?? variantStyle.background;
    const borderColorValue = borderColor ?? variantStyle.borderColor;

    const sizingStyle = block ? styles.block : styles.inline;
    const justifyContent = flush ? 'flex-start' : hasIcon ? 'space-between' : 'center';

    const minHeight = interactableHeight[compact ? 'compact' : 'regular'];

    const { paddingX, paddingY, marginStart, marginEnd } = getButtonSpacingProps({
      compact,
      flush,
    });

    const pressableStyle = useCallback(
      (state: PressableStateCallbackType) => [
        sizingStyle,
        typeof style === 'function' ? style(state) : style,
      ],
      [sizingStyle, style],
    );

    const childrenNode = useMemo(
      () =>
        isValidElement<{ children?: React.ReactNode }>(children) &&
        Boolean(children.props.children) ? (
          children
        ) : (
          <Text
            align="center"
            color={colorValue}
            font={font}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            numberOfLines={numberOfLines}
            selectable={false}
            style={styles.text}
            testID="text-headline"
          >
            {children}
          </Text>
        ),
      [children, colorValue, font, fontFamily, fontSize, fontWeight, lineHeight, numberOfLines],
    );

    return (
      <Pressable
        ref={ref}
        accessibilityHint={loading ? 'Button is loading' : accessibilityHint}
        accessibilityLabel={loading ? 'loading' : accessibilityLabel}
        background={backgroundValue}
        block={block}
        borderColor={borderColorValue}
        borderRadius={borderRadius}
        borderWidth={borderWidth}
        feedback={feedback}
        loading={loading}
        marginEnd={marginEnd}
        marginStart={marginStart}
        noScaleOnPress={noScaleOnPress}
        style={pressableStyle}
        transparentWhileInactive={transparent}
        wrapperStyles={wrapperStyles}
        {...props}
      >
        <HStack
          alignItems="center"
          flexWrap="nowrap"
          justifyContent={justifyContent}
          minHeight={minHeight}
          paddingX={paddingX}
          paddingY={paddingY}
          style={sizingStyle}
        >
          {loading ? (
            <ActivityIndicator color={theme.color[colorValue]} size="small" />
          ) : (
            <>
              {start ??
                (startIcon ? (
                  <Icon
                    active={startIconActive}
                    color={colorValue}
                    name={startIcon}
                    paddingEnd={1}
                    size={iconSize}
                    style={styles.icon}
                  />
                ) : null)}
              {childrenNode}

              {end ??
                (endIcon ? (
                  <Icon
                    active={endIconActive}
                    color={colorValue}
                    name={endIcon}
                    paddingStart={1}
                    size={iconSize}
                    style={styles.icon}
                  />
                ) : null)}
            </>
          )}
        </HStack>
      </Pressable>
    );
  }),
);

Button.displayName = 'Button';
