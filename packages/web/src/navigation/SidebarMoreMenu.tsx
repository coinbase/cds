import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { sidebarMenuMaxWidth, sidebarMenuMinWidth } from '@coinbase/cds-common/tokens/menu';
import type { SharedProps } from '@coinbase/cds-common/types';

import type { DropdownBaseProps, DropdownProps } from '../dropdown';
import { Dropdown } from '../dropdown';
import { useA11yControlledVisibility } from '../hooks/useA11yControlledVisibility';
import { useComponentConfig } from '../hooks/useComponentConfig';
import type { PopoverContentPositionConfig } from '../overlays/popover/PopoverProps';
import { Tooltip } from '../overlays/tooltip/Tooltip';

import { useSidebarContext } from './SidebarContext';
import type { SidebarItemBaseProps, SidebarItemProps } from './SidebarItem';
import { SidebarItem } from './SidebarItem';

export type SidebarMoreMenuBaseProps = SharedProps &
  Pick<DropdownBaseProps, 'value' | 'onBlur' | 'disablePortal' | 'onChange'> &
  Pick<SidebarItemBaseProps, 'active' | 'tooltipContent' | 'Component' | 'borderRadius'> & {
    children: React.ReactNode;
    /**
     * Title of the menu trigger. Use this prop to localize the trigger title.
     * @default More
     */
    triggerTitle?: string;
  };
export type SidebarMoreMenuProps = SidebarMoreMenuBaseProps & Pick<SidebarItemProps, 'onClick'>;

const defaultContentPosition: PopoverContentPositionConfig = {
  gap: 3,
  placement: 'right-start',
};

export const SidebarMoreMenu = memo(function SidebarMoreMenu(_props: SidebarMoreMenuProps) {
  const mergedProps = useComponentConfig('SidebarMoreMenu', _props);
  const {
    children,
    active,
    onClick,
    value,
    tooltipContent,
    disablePortal,
    triggerTitle = 'More',
    Component,
    borderRadius,
    ...props
  } = mergedProps;
  const [visible, setVisible] = useState(false);
  const { collapsed } = useSidebarContext();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { triggerAccessibilityProps, controlledElementAccessibilityProps } =
    useA11yControlledVisibility(visible, {
      accessibilityLabel: triggerTitle,
      hasPopupType: 'menu',
    });

  const baseTrigger = useMemo(
    () => (
      <SidebarItem
        ref={triggerRef}
        Component={Component}
        active={active}
        borderRadius={borderRadius}
        icon="moreVertical"
        onClick={onClick}
        testID="sidebar-more-menu-trigger"
        title={triggerTitle}
        {...triggerAccessibilityProps}
      />
    ),
    [onClick, active, triggerTitle, triggerAccessibilityProps, Component, borderRadius],
  );

  const trigger = useMemo(() => {
    return collapsed && tooltipContent ? (
      <Tooltip content={tooltipContent} disablePortal={disablePortal} placement="right">
        {baseTrigger}
      </Tooltip>
    ) : (
      baseTrigger
    );
  }, [collapsed, tooltipContent, disablePortal, baseTrigger]);

  const handleCloseMenu = useCallback(() => {
    triggerRef.current?.focus();
    setVisible(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <Dropdown
      content={children}
      contentPosition={defaultContentPosition}
      controlledElementAccessibilityProps={controlledElementAccessibilityProps}
      disablePortal={disablePortal}
      maxWidth={sidebarMenuMaxWidth}
      minWidth={sidebarMenuMinWidth}
      onCloseMenu={handleCloseMenu}
      onOpenMenu={handleOpenMenu}
      value={value}
      {...props}
    >
      {trigger}
    </Dropdown>
  );
});
