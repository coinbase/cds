import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { Icon, type IconProps } from '../icons';
import { Box } from '../layout';
import { Tooltip } from '../overlays/tooltip/Tooltip';
import type { TooltipProps } from '../overlays/tooltip/TooltipProps';
import { Pressable, type PressableDefaultElement, type PressableProps } from '../system/Pressable';
import { Text } from '../typography';

import { useSidebarContext } from './SidebarContext';

const pressableCss = css`
  display: inline-block;
  padding: 0;
`;

type CustomSidebarItemProps = {
  isCollapsed?: boolean;
  color: ThemeVars.Color;
  title: string;
  active?: boolean;
  icon: IconProps['name'];
};

type ManagedPressableProps = Pick<
  PressableProps<PressableDefaultElement>,
  'background' | 'width' | 'transparentWhileInactive' | 'className' | 'borderWidth'
>;

type SidebarItemClassNames = {
  /** Persistent outer wrapper across tooltip/non-tooltip variants. */
  root?: string;
  /** Default content wrapper className. */
  content?: string;
  /** Icon wrapper className. */
  icon?: string;
  /**
   * Title text className.
   * Applies only when the title text is rendered (for example, hidden when collapsed in default variant).
   */
  title?: string;
};

type SidebarItemStyles = {
  /** Persistent outer wrapper across tooltip/non-tooltip variants. */
  root?: React.CSSProperties;
  /** Default content wrapper style. */
  content?: React.CSSProperties;
  /** Icon wrapper style. */
  icon?: React.CSSProperties;
  /**
   * Title text style.
   * Applies only when the title text is rendered (for example, hidden when collapsed in default variant).
   */
  title?: React.CSSProperties;
};

export type SidebarItemProps = {
  /**
   * The Navigation Icon this item represents
   * @default undefined
   */
  icon: IconProps['name'];
  /**
   * The title of the page this item represents
   * @default undefined
   */
  title: string;
  /**
   * Use collapsed to show only the logo
   * @default false
   */
  collapsed?: boolean;
  /**
   * Use the active prop to identify the current page
   * @default false
   */
  active?: boolean;
  /** Label or content to display when Sidebar is collapsed and sidebar more menu is hovered */
  tooltipContent?: React.ReactNode;
  /**
   * Optional presentational component to render for the SidebarItem.
   * By default, the SidebarItem will render as a row with an Icon and Headline Text element
   *
   * The component must implement the CustomSidebarItemProps props interface
   */
  Component?: React.ElementType<CustomSidebarItemProps>;
  className?: string;
  style?: React.CSSProperties;
  classNames?: SidebarItemClassNames;
  styles?: SidebarItemStyles;
} & Omit<PressableProps<PressableDefaultElement>, keyof ManagedPressableProps> &
  Pick<TooltipProps, 'disablePortal'>;

export const SidebarItem = memo(
  forwardRef(
    (
      {
        icon,
        title,
        collapsed,
        active,
        tooltipContent,
        disablePortal,
        borderRadius,
        accessibilityLabel = title,
        Component,
        className,
        style,
        classNames,
        styles,
        ...pressableProps
      }: SidebarItemProps,
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const color: ThemeVars.Color = active ? 'fgPrimary' : 'fg';
      const { collapsed: computedCollapsed, variant } = useSidebarContext();
      const isCollapsed = collapsed ?? computedCollapsed;
      const isDefaultVariant = variant === 'default';
      const defaultComponent = useMemo(
        () => (
          <Box
            alignItems="center"
            className={classNames?.content}
            flexDirection={isDefaultVariant ? 'row' : 'column'}
            gap={isDefaultVariant ? 2 : 0.5}
            paddingX={isDefaultVariant ? 2 : 0.5}
            paddingY={isDefaultVariant ? 2 : 1}
            style={styles?.content}
            testID={`sidebar-item-${variant}`}
          >
            <Icon
              active={active}
              color={color}
              name={icon}
              size="m"
              className={classNames?.icon}
              style={styles?.icon}
            />
            {(variant === 'condensed' || !isCollapsed) && (
              <Text
                className={classNames?.title}
                color={color}
                font={isDefaultVariant ? 'headline' : 'label1'}
                fontSize={isDefaultVariant ? 'inherit' : 'legal'}
                numberOfLines={isDefaultVariant ? undefined : 1}
                overflow={isDefaultVariant ? undefined : 'break'}
                style={styles?.title}
                textAlign={isDefaultVariant ? 'start' : 'center'}
              >
                {title}
              </Text>
            )}
          </Box>
        ),
        [
          active,
          color,
          icon,
          isCollapsed,
          isDefaultVariant,
          title,
          variant,
          classNames?.content,
          classNames?.icon,
          classNames?.title,
          styles?.content,
          styles?.icon,
          styles?.title,
        ],
      );

      const content = useMemo(
        () => (
          <Pressable
            ref={ref}
            className={pressableCss}
            {...pressableProps}
            accessibilityLabel={isCollapsed ? accessibilityLabel : undefined}
            aria-current={active ? 'page' : undefined}
            background="bgPrimaryWash"
            borderRadius={borderRadius ?? (isDefaultVariant ? 1000 : 400)}
            borderWidth={isDefaultVariant ? undefined : 0}
            transparentWhileInactive={!active}
            width="100%"
          >
            {Component ? (
              <Component
                active={active}
                color={color}
                icon={icon}
                isCollapsed={isCollapsed}
                title={title}
              />
            ) : (
              defaultComponent
            )}
          </Pressable>
        ),
        [
          ref,
          pressableProps,
          isCollapsed,
          accessibilityLabel,
          active,
          borderRadius,
          isDefaultVariant,
          Component,
          color,
          icon,
          title,
          defaultComponent,
        ],
      );

      return (
        <Box
          className={cx(className, classNames?.root)}
          style={{ ...style, ...styles?.root }}
          width="100%"
        >
          {tooltipContent && isCollapsed ? (
            <Tooltip content={tooltipContent} disablePortal={disablePortal} placement="right">
              {content}
            </Tooltip>
          ) : (
            content
          )}
        </Box>
      );
    },
  ),
);

SidebarItem.displayName = 'SidebarItem';
