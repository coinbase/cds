import React, { isValidElement, memo, useCallback, useMemo, useState } from 'react';
import type { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { variants } from '@coinbase/cds-common/tokens/banner';
import type { BannerStyleVariant, BannerVariant } from '@coinbase/cds-common/types/BannerBaseProps';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';

import { Collapsible } from '../collapsible/Collapsible';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import type { HStackProps } from '../layout/HStack';
import { HStack } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import { Pressable } from '../system/Pressable';
import { Link, type LinkProps } from '../typography/Link';
import { Text } from '../typography/Text';

export type BannerBaseProps = SharedProps & {
  /** Sets the variant of the banner - which is responsible for foreground and background color assignment */
  variant: BannerVariant;
  /** Name of icon to be shown in the banner */
  startIcon: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Provide a CDS Link component to be used as a primary action. It will inherit colors depending on the provided variant */
  primaryAction?: React.ReactNode;
  /** Provide a CDS Link component to be used as a secondary action. It will inherit colors depending on the provided tone */
  secondaryAction?: React.ReactNode;
  /** Title of banner. Indicates the intent of this banner */
  title?: React.ReactNode;
  /** Message of banner */
  children?: React.ReactNode;
  /**
   * Determines whether banner can be dismissed or not. Banner is not dismisable when styleVariant is set to global.
   * @default true
   * */
  showDismiss?: boolean;
  /** A callback fired when banner is dismissed */
  onClose?: () => void;
  /** Indicates the max number of lines after which body text will be truncated */
  numberOfLines?: number;
  /** Use for supplemental data */
  label?: React.ReactNode;
  /**
   * Determines the banner style and indicates the suggested positioning for the banner
   * @default 'contextual'
   * */
  styleVariant?: BannerStyleVariant;
  /** Accessibility label for start icon on the banner */
  startIconAccessibilityLabel?: string;
  /** Accessibility label for close button on the banner
   * @default 'close'
   */
  closeAccessibilityLabel?: string;
  /**
   * Determines whether banner has a border or not
   * @default true
   * */
  bordered?: boolean;
  /**
   * Determines banner's border radius
   *
   * @default 400 for contextual, undefined for global and inline
   * */
  borderRadius?: ThemeVars.BorderRadius;
};

/**
 * Canonical props type for Banner.
 *
 * Note: docs docgen expects a `${ComponentName}Props` export (for Banner -> BannerProps)
 * to generate styles selector metadata used by the docs Styles tab.
 */
export type BannerProps = BannerBaseProps &
  Omit<HStackProps, 'children'> & {
    /** Slot-level styles for Banner. */
    styles?: {
      /** Persistent outer wrapper around both dismissible and non-dismissible variants. */
      root?: StyleProp<ViewStyle>;
      /** Main content container (`HStack`) for banner body. */
      content?: StyleProp<ViewStyle>;
      /** Start icon wrapper. */
      start?: StyleProp<ViewStyle>;
      /** Right-side body wrapper containing middle content and actions. */
      body?: StyleProp<ViewStyle>;
      /** Middle content wrapper containing title/message/label region. */
      middle?: StyleProp<ViewStyle>;
      /**
       * Label text style.
       * Applies only when `label` is a string rendered by Banner.
       * If `label` is a custom node, style that node directly.
       */
      label?: StyleProp<TextStyle>;
      /**
       * Actions row style.
       * Applies only when at least one action (`primaryAction` or `secondaryAction`) is rendered.
       */
      actions?: StyleProp<ViewStyle>;
      /**
       * Dismiss button wrapper style.
       * Applies only when `showDismiss` is true.
       */
      dismiss?: StyleProp<ViewStyle>;
    };
  };
/**
 * @deprecated Use `BannerProps` instead. This will be removed in a future major release.
 * @deprecationExpectedRemoval v10
 */
export type MobileBannerProps = BannerProps;

export const Banner = memo(function Banner({
  ref: forwardedRef,
  ..._props
}: BannerProps & {
  ref?: React.Ref<View>;
}) {
  const mergedProps = useComponentConfig('Banner', _props);
  const {
    variant,
    startIcon,
    startIconActive,
    onClose,
    primaryAction,
    secondaryAction,
    title,
    children,
    showDismiss = false,
    testID,
    numberOfLines = 3,
    style,
    label,
    styleVariant = 'contextual',
    startIconAccessibilityLabel,
    closeAccessibilityLabel = 'close',
    borderRadius = styleVariant === 'contextual' ? 400 : undefined,
    margin,
    marginX,
    marginY,
    marginTop,
    marginEnd,
    marginBottom,
    marginStart,
    styles,
    ...props
  } = mergedProps;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const theme = useTheme();

  // Events
  const handleOnDismiss = useCallback(() => {
    setIsCollapsed(true);
    onClose?.();
  }, [onClose]);

  // Setup color configs
  const {
    iconColor,
    textColor,
    background,
    primaryActionColor,
    secondaryActionColor,
    iconButtonColor,
    borderColor,
  } = variants[variant];

  const clonedPrimaryAction = useMemo(() => {
    if (!isValidElement(primaryAction)) return null;

    if (primaryAction.type === Link) {
      return React.cloneElement(primaryAction, {
        font: 'label1',
        color: primaryActionColor,
        testID: `${testID}-action--primary`,
        ...(primaryAction.props as LinkProps),
      });
    } else {
      return React.cloneElement(primaryAction, {
        testID: `${testID}-action--primary`,
        ...(primaryAction.props as any), // we don't know the type of element this ReactNode is
      });
    }
  }, [primaryAction, primaryActionColor, testID]);

  const clonedSecondaryAction = useMemo(() => {
    if (!isValidElement(secondaryAction)) return null;

    if (secondaryAction.type === Link) {
      return React.cloneElement(secondaryAction, {
        font: 'label1',
        color: secondaryActionColor,
        testID: `${testID}-action--secondary`,
        ...(secondaryAction.props as LinkProps),
      });
    } else {
      return React.cloneElement(secondaryAction, {
        testID: `${testID}-action--secondary`,
        ...(secondaryAction.props as any), // we don't know the type of element this ReactNode is
      });
    }
  }, [secondaryAction, secondaryActionColor, testID]);

  const marginStyles = useMemo(
    () => ({
      margin,
      marginX,
      marginY,
      marginTop,
      marginEnd,
      marginBottom,
      marginStart,
    }),
    [margin, marginX, marginY, marginTop, marginEnd, marginBottom, marginStart],
  );

  const borderBox = (
    <Box pin="left" style={{ backgroundColor: theme.color[borderColor] }} width={4} />
  );

  const content = (
    <HStack
      ref={forwardedRef}
      background={background}
      borderRadius={borderRadius}
      gap={1}
      paddingX={styleVariant === 'contextual' ? 2 : 3}
      paddingY={2}
      style={[style, styles?.content]}
      testID={testID}
      {...props}
    >
      {/** Start */}
      <Box
        accessibilityLabel={startIconAccessibilityLabel}
        accessibilityRole="image"
        accessible={!!startIconAccessibilityLabel}
        style={styles?.start}
      >
        <Icon
          active={startIconActive}
          color={iconColor}
          name={startIcon}
          paddingX={0.5}
          paddingY={0.25}
          size="s"
          testID={`${testID}-icon`}
        />
      </Box>
      <VStack
        flexGrow={1}
        flexShrink={1}
        gap={2}
        justifyContent="space-between"
        style={styles?.body}
        testID={`${testID}-inner-end-box`}
      >
        {/** Middle */}
        <VStack gap={2} style={styles?.middle} testID={`${testID}-content-box`}>
          <VStack gap={0.5}>
            {typeof title === 'string' ? (
              <Text color={textColor} font="label1" numberOfLines={2}>
                {title}
              </Text>
            ) : (
              title
            )}
            {typeof children === 'string' ? (
              <Text color={textColor} font="label2" numberOfLines={numberOfLines}>
                {children}
              </Text>
            ) : (
              children
            )}
          </VStack>
          {typeof label === 'string' ? (
            <Text color="fgMuted" font="legal" numberOfLines={1} style={styles?.label}>
              {label}
            </Text>
          ) : (
            label
          )}
        </VStack>
        {/** Actions */}
        {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
          <HStack alignItems="center" gap={2} style={styles?.actions} testID={`${testID}-action`}>
            {clonedPrimaryAction}
            {clonedSecondaryAction}
          </HStack>
        )}
      </VStack>
      {/** Dismissable action */}
      {showDismiss && (
        <Box alignItems="flex-start" padding={0.5} style={styles?.dismiss}>
          <Pressable
            accessibilityLabel={closeAccessibilityLabel}
            accessibilityRole="button"
            background="transparent"
            borderRadius={1000}
            hitSlop={{ top: 15, left: 15, bottom: 15, right: 15 }}
            onPress={handleOnDismiss}
            testID={`${testID}-dismiss-btn`}
          >
            <Icon color={iconButtonColor} name="close" size="s" />
          </Pressable>
        </Box>
      )}
    </HStack>
  );

  return (
    <Box {...marginStyles} style={styles?.root}>
      {showDismiss ? (
        <Collapsible collapsed={isCollapsed} testID={`${testID}-collapsible`}>
          {content}
        </Collapsible>
      ) : (
        content
      )}
      {styleVariant === 'global' && borderBox}
    </Box>
  );
});
