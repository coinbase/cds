import React, { memo, useCallback, useMemo } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabbedChipProps } from '@coinbase/cds-mobile/alpha/tabbed-chips/TabbedChips';
import { Chip } from '@coinbase/cds-mobile/chips/Chip';

/**
 * TabbedChips tab renderer stub — wired through {@link customerComponentConfig}.
 * Uses tab context for active state and selection; customize chip styling/behavior below.
 */
export const CustomTabComponent = memo(
  <TabId extends string = string>({
    label = '',
    id,
    Component: _Component,
    size,
    ...chipRenderProps
  }: TabbedChipProps<TabId>) => {
    const { activeTab, updateActiveTab } = useTabsContext();
    const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
    const handlePress = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);

    return (
      <Chip
        accessibilityLabel={label?.toString()}
        active={isActive}
        activeBackground="bgSecondary"
        background="bg"
        onPress={handlePress}
        size={size}
        {...chipRenderProps}
      >
        {label}
      </Chip>
    );
  },
);

CustomTabComponent.displayName = 'CustomTabComponent';
