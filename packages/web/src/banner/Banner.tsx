import React, {
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useId,
  useMemo,
  useState,
} from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { BannerVariantStyle } from '@coinbase/cds-common/tokens/banner';
import { bannerMinWidth, variants } from '@coinbase/cds-common/tokens/banner';
import type {
  BannerStyleVariant,
  BannerVariant,
  IconName,
  SharedProps,
} from '@coinbase/cds-common/types';
import { css } from '@linaria/core';

import { Collapsible } from '../collapsible';
import { Icon } from '../icons/Icon';
import { Box, HStack, type HStackDefaultElement, type HStackProps, VStack } from '../layout';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';
import { Pressable } from '../system/Pressable';
import type { LinkDefaultElement, LinkProps } from '../typography/Link';
import { Link } from '../typography/Link';
import { Text } from '../typography/Text';

const actionContainerCss = css`
  white-space: nowrap;
`;

export const contentResponsiveConfig: ResponsiveProps<StaticStyleProps>['flexDirection'] = {
  phone: 'column',
  tablet: 'row',
  desktop: 'row',
} as const;

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
   * @default 400 for contextual, undefined for global and inline
   * */
  borderRadius?: ThemeVars.BorderRadius;
};

export type BannerProps = BannerBaseProps &
  Omit<HStackProps<HStackDefaultElement>, 'children' | 'title'>;

export const Banner = memo(
  forwardRef(
    (
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
        style,
        className,
        numberOfLines = 3,
        label,
        styleVariant = 'contextual',
        startIconAccessibilityLabel,
        closeAccessibilityLabel = 'close',
        borderRadius = styleVariant === 'contextual' ? 400 : undefined,
        margin,
        marginY,
        marginX,
        marginTop,
        marginBottom,
        marginStart,
        marginEnd,
        width = '100%',
        ...props
      }: BannerProps,
      ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
      const [isCollapsed, setIsCollapsed] = useState(false);
      const titleId = useId();

      const accessibilityLabelledBy = typeof title === 'string' ? titleId : undefined;

      // Setup color configs
      const {
        iconColor,
        textColor,
        background,
        primaryActionColor,
        secondaryActionColor,
        iconButtonColor,
        borderColor,
      }: BannerVariantStyle = variants[variant];

      // Events
      const handleOnDismiss = useCallback(() => {
        setIsCollapsed(true);
        onClose?.();
      }, [onClose]);

      const clonedPrimaryAction = useMemo(() => {
        if (!isValidElement<LinkProps<LinkDefaultElement>>(primaryAction)) return null;

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
        if (!isValidElement<LinkProps<LinkDefaultElement>>(secondaryAction)) return null;

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
          marginY,
          marginX,
          marginTop,
          marginBottom,
          marginStart,
          marginEnd,
        }),
        [margin, marginX, marginY, marginStart, marginEnd, marginTop, marginBottom],
      );

      const borderBox = useMemo(
        () => <Box background={borderColor} pin="left" width={4} />,
        [borderColor],
      );

      const content = (
        <Box
          position="relative"
          width={width}
          {...(!showDismiss && marginStyles)}
          height="fit-content"
        >
          <HStack
            ref={ref}
            background={background}
            borderRadius={borderRadius}
            className={className}
            flexGrow={1}
            gap={1}
            minWidth={bannerMinWidth}
            paddingX={styleVariant === 'contextual' ? 2 : 3}
            paddingY={2}
            style={style}
            testID={testID}
            {...props}
          >
            {/** Start */}
            <Box paddingX={0.5} paddingY={0.25}>
              <Icon
                accessibilityLabel={startIconAccessibilityLabel}
                active={startIconActive}
                color={iconColor}
                name={startIcon}
                size="s"
                testID={`${testID}-icon`}
              />
            </Box>
            <VStack
              flexDirection={contentResponsiveConfig}
              flexGrow={1}
              gap={2}
              justifyContent="space-between"
              testID={`${testID}-inner-end-box`}
            >
              {/** Middle */}
              <VStack gap={2} testID={`${testID}-content-box`}>
                <VStack gap={0.5}>
                  {typeof title === 'string' ? (
                    <Text color={textColor} font="label1" id={titleId} numberOfLines={2}>
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
                  <Text color="fgMuted" font="legal" numberOfLines={2}>
                    {label}
                  </Text>
                ) : (
                  label
                )}
              </VStack>
              {/** Actions */}
              {(!!clonedPrimaryAction || !!clonedSecondaryAction) && (
                <HStack
                  alignItems="center"
                  className={actionContainerCss}
                  gap={2}
                  testID={`${testID}-action`}
                >
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
                  background="transparent"
                  borderRadius={1000}
                  onClick={handleOnDismiss}
                  role="button"
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
        <Box
          display="block"
          height="fit-content"
          position="relative"
          width={width}
          {...marginStyles}
        >
          <Collapsible
            accessibilityLabelledBy={accessibilityLabelledBy}
            collapsed={isCollapsed}
            id={`${titleId}--controller`}
            testID={`${testID}-collapsible`}
          >
            {content}
          </Collapsible>
          {styleVariant === 'global' && borderBox}
        </Box>
      ) : (
        content
      );
    },
  ),
);
