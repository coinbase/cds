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
import type { BannerStyleVariant, BannerVariant } from '@coinbase/cds-common/types/BannerBaseProps';
import type { IconNameOf } from '@coinbase/cds-common/types/IconComponent';
import type { SharedProps } from '@coinbase/cds-common/types/SharedProps';
import { css } from '@linaria/core';

import { Collapsible } from '../collapsible/Collapsible';
import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import type { IconLike } from '../icons/createIcon';
import { Icon } from '../icons/Icon';
import { Box } from '../layout/Box';
import { HStack, type HStackDefaultElement, type HStackProps } from '../layout/HStack';
import { VStack } from '../layout/VStack';
import type { ResponsiveProps, StaticStyleProps } from '../styles/styleProps';
import { Pressable } from '../system/Pressable';
import type { StylesAndClassNames } from '../types';
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

/**
 * Static class names for Banner component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const bannerClassNames = {
  /** Persistent outer wrapper around both dismissible and non-dismissible variants. */
  root: 'cds-Banner',
  /** Main content container (`HStack`) for banner body. */
  content: 'cds-Banner-content',
  /** Start icon wrapper. */
  start: 'cds-Banner-start',
  /** Right-side body wrapper containing middle content and actions. */
  body: 'cds-Banner-body',
  /** Middle content wrapper containing title/message/label region. */
  middle: 'cds-Banner-middle',
  /** Label text element. */
  label: 'cds-Banner-label',
  /** Actions row element. */
  actions: 'cds-Banner-actions',
  /** Dismiss button wrapper element. */
  dismiss: 'cds-Banner-dismiss',
} as const;

export type BannerBaseProps<IconComponentType extends IconLike = typeof Icon> = SharedProps & {
  /** Sets the variant of the banner - which is responsible for foreground and background color assignment */
  variant: BannerVariant;
  /**
   * Name of icon to be shown in the banner. Accepted values are derived from
   * `IconComponent`, so they narrow to a custom icon set's names when one is
   * passed and stay the built-in `IconName` otherwise.
   */
  startIcon: IconNameOf<IconComponentType>;
  /**
   * Component used to render `startIcon`. Pass an icon component built with
   * `createIcon` to render icons from a set CDS does not ship; `startIcon` is then
   * type-checked against that set instead of the built-in names.
   *
   * Note that this reaches only `startIcon`. The dismiss button's `close` icon is
   * chosen by Banner itself and always renders from the built-in set.
   * @default Icon
   */
  IconComponent?: IconComponentType;
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

export type BannerProps<IconComponentType extends IconLike = typeof Icon> =
  BannerBaseProps<IconComponentType> &
    StylesAndClassNames<typeof bannerClassNames> &
    Omit<HStackProps<HStackDefaultElement>, 'children' | 'title'>;

/**
 * Unlike `IconButton`, `Banner` is not polymorphic, so it had no generic call
 * signature to extend — one has to be introduced purely to carry the icon set
 * through `memo(forwardRef(...))`, which erases type parameters. This is the
 * per-component cost of the pattern for the majority of CDS components.
 */
type BannerComponent = (<IconComponentType extends IconLike = typeof Icon>(
  props: BannerProps<IconComponentType>,
) => React.ReactNode) & { displayName?: string };

export const Banner = memo(
  forwardRef((_props: BannerProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const mergedProps = useComponentConfig('Banner', _props);
    const {
      variant,
      startIcon,
      IconComponent,
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
      classNames,
      styles,
      ...props
    } = mergedProps;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const titleId = useId();
    const ResolvedStartIcon: IconLike = IconComponent ?? Icon;

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
      <HStack
        ref={ref}
        background={background}
        borderRadius={borderRadius}
        className={cx(bannerClassNames.content, className, classNames?.content)}
        flexGrow={1}
        gap={1}
        minWidth={bannerMinWidth}
        paddingX={styleVariant === 'contextual' ? 2 : 3}
        paddingY={2}
        style={{ ...style, ...styles?.content }}
        testID={testID}
        {...props}
      >
        {/** Start */}
        <Box
          className={cx(bannerClassNames.start, classNames?.start)}
          paddingX={0.5}
          paddingY={0.25}
          style={styles?.start}
        >
          <ResolvedStartIcon
            accessibilityLabel={startIconAccessibilityLabel}
            active={startIconActive}
            color={iconColor}
            name={startIcon}
            size="s"
            testID={`${testID}-icon`}
          />
        </Box>
        <VStack
          className={cx(bannerClassNames.body, classNames?.body)}
          flexDirection={contentResponsiveConfig}
          flexGrow={1}
          gap={2}
          justifyContent="space-between"
          style={styles?.body}
          testID={`${testID}-inner-end-box`}
        >
          {/** Middle */}
          <VStack
            className={cx(bannerClassNames.middle, classNames?.middle)}
            gap={2}
            style={styles?.middle}
            testID={`${testID}-content-box`}
          >
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
              <Text
                className={cx(bannerClassNames.label, classNames?.label)}
                color="fgMuted"
                font="legal"
                numberOfLines={2}
                style={styles?.label}
              >
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
              className={cx(actionContainerCss, bannerClassNames.actions, classNames?.actions)}
              gap={2}
              style={styles?.actions}
              testID={`${testID}-action`}
            >
              {clonedPrimaryAction}
              {clonedSecondaryAction}
            </HStack>
          )}
        </VStack>
        {/** Dismissable action */}
        {showDismiss && (
          <Box
            alignItems="flex-start"
            className={cx(bannerClassNames.dismiss, classNames?.dismiss)}
            padding={0.5}
            style={styles?.dismiss}
          >
            <Pressable
              accessibilityLabel={closeAccessibilityLabel}
              background="transparent"
              borderRadius={1000}
              onClick={handleOnDismiss}
              role="button"
              testID={`${testID}-dismiss-btn`}
            >
              {/* Out of reach of `IconComponent`: this glyph is Banner's choice,
                  not the consumer's, so it always comes from the built-in set. */}
              <Icon color={iconButtonColor} name="close" size="s" />
            </Pressable>
          </Box>
        )}
      </HStack>
    );

    return (
      <Box
        className={cx(bannerClassNames.root, classNames?.root)}
        display="block"
        height="fit-content"
        position="relative"
        {...marginStyles}
        style={styles?.root}
        width={width}
      >
        {showDismiss ? (
          <Collapsible
            accessibilityLabelledBy={accessibilityLabelledBy}
            collapsed={isCollapsed}
            id={`${titleId}--controller`}
            testID={`${testID}-collapsible`}
          >
            {content}
          </Collapsible>
        ) : (
          content
        )}
        {styleVariant === 'global' && borderBox}
      </Box>
    );
  }),
) as unknown as BannerComponent;
