import React, { forwardRef, isValidElement, memo, useCallback, useMemo, useState } from 'react';
import type { View, ViewStyle } from 'react-native';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { variants } from '@coinbase/cds-common/tokens/banner';
import type {
  BannerStyleVariant,
  BannerVariant,
  IconName,
  SharedProps,
} from '@coinbase/cds-common/types';
import { isDevelopment } from '@coinbase/cds-utils';

import { Collapsible } from '../collapsible/Collapsible';
import { useTheme } from '../hooks/useTheme';
import { Icon } from '../icons';
import type { HStackProps } from '../layout';
import { Box, HStack, VStack } from '../layout';
import { Pressable } from '../system/Pressable';
import type { LinkProps } from '../typography';
import { Link } from '../typography';
import { Text } from '../typography/Text';

const variantStyleProps: Record<BannerStyleVariant, HStackProps> = {
  contextual: {
    paddingX: 2,
    borderRadius: 400,
  },
  global: {
    paddingX: 3,
    borderRadius: undefined,
  },
  inline: {
    paddingX: 3,
    borderRadius: undefined,
  },
};

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
   * @default 400
   * */
  borderRadius?: ThemeVars.BorderRadius;
};

export type MobileBannerProps = BannerBaseProps & Omit<HStackProps, 'children'>;

export const Banner = memo(
  forwardRef(function Banner(
    {
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
      borderRadius = 400,
      margin,
      marginX,
      marginY,
      marginTop,
      marginEnd,
      marginBottom,
      marginStart,
      ...props
    }: MobileBannerProps,
    forwardedRef: React.ForwardedRef<View>,
  ) {
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
          ...primaryAction.props,
        });
      } else {
        return React.cloneElement(primaryAction, {
          testID: `${testID}-action--primary`,
          ...primaryAction.props,
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
          ...secondaryAction.props,
        });
      } else {
        return React.cloneElement(secondaryAction, {
          testID: `${testID}-action--secondary`,
          ...secondaryAction.props,
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
      <Box dangerouslySetBackground={theme.color[borderColor]} pin="left" width={4} />
    );

    const content = (
      <Box {...(showDismiss ? {} : marginStyles)}>
        <HStack
          ref={forwardedRef}
          background={background}
          borderRadius={borderRadius}
          gap={1}
          paddingY={2}
          style={style}
          testID={testID}
          {...variantStyleProps[styleVariant]}
          {...props}
        >
          {/** Start */}
          <Box
            accessibilityLabel={startIconAccessibilityLabel}
            accessibilityRole="image"
            accessible={!!startIconAccessibilityLabel}
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
            testID={`${testID}-inner-end-box`}
          >
            {/** Middle */}
            <VStack gap={2} testID={`${testID}-content-box`}>
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
                <Text color="fgMuted" font="legal" numberOfLines={1}>
                  {label}
                </Text>
              ) : (
                label
              )}
            </VStack>
            {/** Actions */}
            {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
              <HStack alignItems="center" gap={2} testID={`${testID}-action`}>
                {clonedPrimaryAction}
                {clonedSecondaryAction}
              </HStack>
            )}
          </VStack>
          {/** Dismissable action */}
          {showDismiss && (
            <Box alignItems="flex-start" padding={0.5}>
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
        {styleVariant === 'global' && !showDismiss && borderBox}
      </Box>
    );

    return showDismiss ? (
      <Box {...marginStyles}>
        <Collapsible collapsed={isCollapsed} testID={`${testID}-collapsible`}>
          {content}
        </Collapsible>
        {styleVariant === 'global' && borderBox}
      </Box>
    ) : (
      content
    );
  }),
);
