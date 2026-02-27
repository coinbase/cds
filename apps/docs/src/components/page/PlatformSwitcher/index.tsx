import { useCallback, useMemo, useRef } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs';
import { type Platform, usePlatformContext } from '@site/src/utils/PlatformContext';

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
      activeTab={activeTab}
      borderRadius={300}
      onChange={handlePlatformChange}
      tabs={tabs}
    />
  );
};
