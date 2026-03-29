import React, { forwardRef, memo, useMemo } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { css } from '@linaria/core';

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
  Omit<PressableProps<PressableDefaultElement>, keyof ManagedPressableProps>;

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
          flexDirection={isDefaultVariant ? 'row' : 'column'}
          gap={isDefaultVariant ? 2 : 0.5}
          paddingX={isDefaultVariant ? 2 : 0.5}
          paddingY={isDefaultVariant ? 2 : 1}
          testID={`sidebar-item-${variant}`}
        >
          <Icon active={active} color={color} name={icon} size="m" />
          {(variant === 'condensed' || !isCollapsed) && (
            <Text
              color={color}
              font={isDefaultVariant ? 'headline' : 'label1'}
              fontSize={isDefaultVariant ? 'inherit' : 'legal'}
              numberOfLines={isDefaultVariant ? undefined : 1}
              overflow={isDefaultVariant ? undefined : 'break'}
              textAlign={isDefaultVariant ? 'start' : 'center'}
            >
              {title}
            </Text>
          )}
        </Box>
      ),
      [active, color, icon, isCollapsed, isDefaultVariant, title, variant],
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

    return tooltipContent && isCollapsed ? (
      <Tooltip content={tooltipContent} disablePortal={disablePortal} placement="right">
        {content}
      </Tooltip>
    ) : (
      content
    );
  }),
);

SidebarItem.displayName = 'SidebarItem';
