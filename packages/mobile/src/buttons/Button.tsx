import React, { isValidElement, memo, useCallback, useMemo } from 'react';
import { type PressableStateCallbackType, StyleSheet, type View } from 'react-native';
import { transparentVariants, variants } from '@coinbase/cds-common/tokens/button';
import type { ButtonVariant } from '@coinbase/cds-common/types/ButtonBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types/SharedAccessibilityProps';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import type { NegativeSpace } from '@coinbase/cds-common/types/SpacingProps';

import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { HStack } from '../layout/HStack';
import { Pressable, type PressableBaseProps } from '../system/Pressable';
import { Text } from '../typography/Text';
import { ProgressCircle } from '../visualizations/ProgressCircle';

const defaultProgressCircleSize = 24;

export const styles = StyleSheet.create({
  inline: {
    width: 'auto',
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
  };

export type ButtonProps = ButtonBaseProps;

export const Button = memo(function Button({
  ref,
  ..._props
}: ButtonProps & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('Button', _props);
  const {
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
    borderWidth = 0, // remove Pressable's default transparent border
    borderRadius = compact ? 700 : 900,
    accessibilityLabel,
    accessibilityHint,
    padding,
    paddingStart,
    paddingEnd,
    paddingTop,
    paddingBottom,
    paddingX = compact ? 2 : 4,
    paddingY = compact ? 1 : 2,
    ...props
  } = mergedProps;
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

  const flushMargin = flush ? (-paddingX as NegativeSpace) : undefined;

  const pressableStyle = useCallback(
    (state: PressableStateCallbackType) => [
      sizingStyle,
      typeof style === 'function' ? style(state) : style,
    ],
    [sizingStyle, style],
  );

  const childrenNode = useMemo(
    () =>
      isValidElement(children) && Boolean((children.props as Record<string, unknown>).children) ? (
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
      marginEnd={flush === 'end' ? flushMargin : undefined}
      marginStart={flush === 'start' ? flushMargin : undefined}
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
        padding={padding}
        paddingBottom={paddingBottom}
        paddingEnd={paddingEnd}
        paddingStart={paddingStart}
        paddingTop={paddingTop}
        paddingX={paddingX}
        paddingY={paddingY}
        style={sizingStyle}
      >
        {loading ? (
          <ProgressCircle
            indeterminate
            color={colorValue}
            size={progressCircleSize}
            weight="thin"
          />
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
});

Button.displayName = 'Button';
