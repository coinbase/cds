import { useCallback, useMemo, useRef } from 'react';
import type { TabValue } from '@cbhq/cds-common/tabs/useTabs';
import { TabsActiveIndicator } from '@cbhq/cds-web/tabs';
import { SegmentedTabs } from '@cbhq/cds-web/tabs/SegmentedTabs';
import type { SegmentedTabsActiveIndicatorProps } from '@cbhq/cds-web/tabs/SegmentedTabsActiveIndicator';
import { type Platform, usePlatformContext } from '@site/src/utils/PlatformContext';

const SegmentedTabsActiveIndicator = ({ ...props }: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={300} {...props} />;
};

export const PlatformSwitcher = () => {
  const { supportsWeb, supportsMobile, platform, setPlatform } = usePlatformContext();
  const segmentedTabsRef = useRef<HTMLElement>(null);

  const tabs = useMemo<TabValue[]>(
    () => [
      ...(supportsWeb ? [{ id: 'web', label: supportsMobile ? 'Web' : 'Web Only' }] : []),
      ...(supportsMobile
        ? [
            {
              id: 'mobile',
              label: supportsWeb ? 'Mobile' : 'Mobile Only',
            },
          ]
        : []),
    ],
    [supportsMobile, supportsWeb],
  );

  const activeTab = tabs.find(({ id }) => id === platform) ?? null;

  const handlePlatformChange = useCallback(
    (tab: TabValue | null) => {
      if (!tab) return;
      const platform = tab.id as Platform;
      setPlatform(platform);
      setTimeout(
        () => segmentedTabsRef.current?.querySelector<HTMLElement>(`#${platform}`)?.focus(),
        1,
      );
    },
    [setPlatform],
  );

  return (
    <SegmentedTabs
      ref={segmentedTabsRef}
      TabsActiveIndicatorComponent={SegmentedTabsActiveIndicator}
      activeTab={activeTab}
      borderRadius={300}
      onChange={handlePlatformChange}
      tabs={tabs}
    />
  );
};
