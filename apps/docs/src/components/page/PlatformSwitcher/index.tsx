import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { SegmentedTabs } from '@coinbase/cds-web/tabs/SegmentedTabs';
import { type Platform, usePlatformContext } from '@site/src/utils/PlatformContext';

type PlatformSegmentedTabsProps = {
  accessibilityLabel?: string;
  onPlatformChange: (platform: Platform) => void;
  platform: Platform;
  supportsMobile?: boolean;
  supportsWeb?: boolean;
};

export const PlatformSegmentedTabs = ({
  accessibilityLabel = 'Select platform',
  onPlatformChange,
  platform,
  supportsMobile = true,
  supportsWeb = true,
}: PlatformSegmentedTabsProps) => {
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
      onPlatformChange(platform);
      setTimeout(
        () => segmentedTabsRef.current?.querySelector<HTMLElement>(`#${platform}`)?.focus(),
        1,
      );
    },
    [onPlatformChange],
  );

  return (
    <SegmentedTabs
      ref={segmentedTabsRef}
      accessibilityLabel={accessibilityLabel}
      activeTab={activeTab}
      borderRadius={300}
      onChange={handlePlatformChange}
      tabs={tabs}
    />
  );
};

type StandalonePlatformSwitcherProps = {
  children: ReactNode;
  defaultPlatform?: Platform;
};

type StandalonePlatformSwitcherContextValue = {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
};

const StandalonePlatformSwitcherContext =
  createContext<StandalonePlatformSwitcherContextValue | null>(null);

function useStandalonePlatformSwitcherContext() {
  const context = useContext(StandalonePlatformSwitcherContext);

  if (!context) {
    throw new Error(
      'StandalonePlatformSwitcher compound components must be rendered inside StandalonePlatformSwitcher.Root',
    );
  }

  return context;
}

function StandalonePlatformSwitcherRoot({
  children,
  defaultPlatform = 'web',
}: StandalonePlatformSwitcherProps) {
  const [platform, setPlatform] = useState<Platform>(defaultPlatform);
  const value = useMemo(() => ({ platform, setPlatform }), [platform]);

  return (
    <StandalonePlatformSwitcherContext.Provider value={value}>
      {children}
    </StandalonePlatformSwitcherContext.Provider>
  );
}

type StandalonePlatformSwitcherToggleProps = {
  accessibilityLabel?: string;
};

function StandalonePlatformSwitcherToggle({
  accessibilityLabel,
}: StandalonePlatformSwitcherToggleProps) {
  const { platform, setPlatform } = useStandalonePlatformSwitcherContext();

  return (
    <PlatformSegmentedTabs
      accessibilityLabel={accessibilityLabel}
      onPlatformChange={setPlatform}
      platform={platform}
    />
  );
}

type StandalonePlatformSwitcherContentProps = {
  children: ReactNode;
  platform: Platform;
};

function StandalonePlatformSwitcherContent({
  children,
  platform,
}: StandalonePlatformSwitcherContentProps) {
  const { platform: activePlatform } = useStandalonePlatformSwitcherContext();

  if (activePlatform !== platform) {
    return null;
  }

  return <>{children}</>;
}

export const StandalonePlatformSwitcher = {
  Content: StandalonePlatformSwitcherContent,
  Root: StandalonePlatformSwitcherRoot,
  Toggle: StandalonePlatformSwitcherToggle,
};

export const PlatformSwitcher = () => {
  const { supportsWeb, supportsMobile, platform, setPlatform } = usePlatformContext();

  return (
    <PlatformSegmentedTabs
      onPlatformChange={setPlatform}
      platform={platform}
      supportsMobile={supportsMobile}
      supportsWeb={supportsWeb}
    />
  );
};
