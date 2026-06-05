import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

import { cx } from '../cx';
import { useComponentConfig } from '../hooks/useComponentConfig';
import { Icon, type IconProps } from '../icons';
import { Box } from '../layout';
import { Tooltip } from '../overlays/tooltip/Tooltip';
import type { TooltipBaseProps, TooltipProps } from '../overlays/tooltip/TooltipProps';
import {
  Pressable,
  type PressableBaseProps,
  type PressableDefaultElement,
  type PressableProps,
} from '../system/Pressable';
import type { StylesAndClassNames } from '../types';
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

/**
 * Static class names for SidebarItem component parts.
 * Use these selectors to target specific elements with CSS.
 */
export const sidebarItemClassNames = {
  /** Persistent outer wrapper across tooltip/non-tooltip variants. */
  root: 'cds-SidebarItem',
  /** Default content wrapper element. */
  content: 'cds-SidebarItem-content',
  /** Icon wrapper element. */
  icon: 'cds-SidebarItem-icon',
  /** Title text element. */
  title: 'cds-SidebarItem-title',
} as const;

export type SidebarItemBaseProps = Pick<TooltipBaseProps, 'disablePortal'> &
  Omit<PressableBaseProps, keyof ManagedPressableProps> & {
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
  };

export type SidebarItemProps = SidebarItemBaseProps &
  StylesAndClassNames<typeof sidebarItemClassNames> &
  Omit<PressableProps<PressableDefaultElement>, keyof ManagedPressableProps> & {
    className?: string;
    style?: React.CSSProperties;
  };

export const SidebarItem = memo(
  forwardRef((_props: SidebarItemProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const mergedProps = useComponentConfig('SidebarItem', _props);
    const {
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
    } = mergedProps;
    const color: ThemeVars.Color = active ? 'fgPrimary' : 'fg';
    const { collapsed: computedCollapsed, variant } = useSidebarContext();
    const isCollapsed = collapsed ?? computedCollapsed;
    const isDefaultVariant = variant === 'default';
    const defaultComponent = useMemo(
      () => (
        <Box
          alignItems="center"
          className={cx(sidebarItemClassNames.content, classNames?.content)}
          flexDirection={isDefaultVariant ? 'row' : 'column'}
          gap={isDefaultVariant ? 2 : 0.5}
          paddingX={isDefaultVariant ? 2 : 0.5}
          paddingY={isDefaultVariant ? 2 : 1}
          style={styles?.content}
          testID={`sidebar-item-${variant}`}
        >
          <Icon
            active={active}
            className={cx(sidebarItemClassNames.icon, classNames?.icon)}
            color={color}
            name={icon}
            size="m"
            style={styles?.icon}
          />
          {(variant === 'condensed' || !isCollapsed) && (
            <Text
              className={cx(sidebarItemClassNames.title, classNames?.title)}
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
          accessibilityLabel={isCollapsed ? accessibilityLabel : undefined}
          aria-current={active ? 'page' : undefined}
          background="bgPrimaryWash"
          borderRadius={borderRadius ?? (isDefaultVariant ? 1000 : 400)}
          borderWidth={isDefaultVariant ? undefined : 0}
          className={pressableCss}
          transparentWhileInactive={!active}
          width="100%"
          {...pressableProps}
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
        className={cx(sidebarItemClassNames.root, className, classNames?.root)}
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
  }),
);

SidebarItem.displayName = 'SidebarItem';
