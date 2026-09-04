import React, { useCallback, useMemo } from 'react';
import { useTabsContext } from '@coinbase/cds-common/tabs/TabsContext';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import { Box, Divider, VStack } from '@coinbase/cds-web/layout';
import { Pressable } from '@coinbase/cds-web/system';
import { Tabs, TabsActiveIndicator, type TabsActiveIndicatorProps } from '@coinbase/cds-web/tabs';
import type { TOCItem } from '@docusaurus/mdx-loader';
import { useHistory, useLocation } from '@docusaurus/router';
import { usePlatformContext } from '@site/src/utils/PlatformContext';

import { TOCUpdater } from '../../../utils/toc/TOCManager';

const tabs = [
  { id: 'examples', label: 'Examples' },
  { id: 'api', label: 'API' },
];

type HookTabsContainerProps = {
  webApi?: React.ReactNode;
  mobileApi?: React.ReactNode;
  webExamples?: React.ReactNode;
  mobileExamples?: React.ReactNode;
  webApiToc?: TOCItem[];
  mobileApiToc?: TOCItem[];
  webExamplesToc?: TOCItem[];
  mobileExamplesToc?: TOCItem[];
};

const CustomTab = ({ id, label }: TabValue) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = activeTab?.id === id;
  return (
    <Pressable
      color={isActive ? 'fgPrimary' : 'fg'}
      font="headline"
      onClick={() => updateActiveTab(id)}
      paddingBottom={0.75}
      paddingTop={0.5}
    >
      {label}
    </Pressable>
  );
};

const CustomTabsActiveIndicator = (props: TabsActiveIndicatorProps) => {
  return <TabsActiveIndicator background="bgPrimary" bottom={0} height={2} {...props} />;
};

export const HookTabsContainer: React.FC<HookTabsContainerProps> = ({
  webExamples,
  mobileExamples,
  webApi,
  mobileApi,
  webExamplesToc,
  mobileExamplesToc,
  webApiToc,
  mobileApiToc,
}) => {
  const { platform } = usePlatformContext();

  const isWeb = platform === 'web';
  const isMobile = platform === 'mobile';

  const { search } = useLocation();
  const history = useHistory();

  const activeTab = useMemo(() => {
    const tabId = new URLSearchParams(search).get('tab');
    return tabs.find((tab) => tab.id === tabId) ?? tabs[0];
  }, [search]);

  const setActiveTab = useCallback(
    (tab: TabValue | null) => {
      const searchParams = new URLSearchParams(search);
      searchParams.set('tab', tab?.id ?? tabs[0].id);
      history.replace({ search: searchParams.toString() });
    },
    [history, search],
  );

  const shouldRenderExamples = activeTab?.id === tabs[0].id;
  const shouldRenderApi = activeTab?.id === tabs[1].id;

  return (
    <VStack as="section">
      <VStack
        background="bg"
        id="tabs-container"
        position="sticky"
        top="var(--ifm-navbar-height)"
        zIndex={1}
      >
        <Box
          background="bgAlternate"
          borderTopLeftRadius={500}
          borderTopRightRadius={500}
          paddingTop={1}
          paddingX={4}
        >
          <Tabs
            TabComponent={CustomTab}
            TabsActiveIndicatorComponent={CustomTabsActiveIndicator}
            accessibilityLabel="Component documentation sections"
            activeTab={activeTab}
            aria-controls={`tabpanel--${activeTab}`}
            gap={4}
            onChange={setActiveTab}
            tabs={tabs}
          />
        </Box>
        <Divider />
      </VStack>

      <VStack
        background="bgAlternate"
        borderBottomLeftRadius={500}
        borderBottomRightRadius={500}
        zIndex={0}
      >
        <VStack
          accessibilityLabelledBy="tab--examples-tab"
          hidden={!shouldRenderExamples}
          id="tabpanel--examples-tab"
          role="tabpanel"
        >
          {shouldRenderExamples && <TOCUpdater toc={isWeb ? webExamplesToc : mobileExamplesToc} />}
          {shouldRenderExamples && isWeb && webExamples}
          {shouldRenderExamples && isMobile && mobileExamples}
        </VStack>

        <VStack
          accessibilityLabelledBy="tab--api-tab"
          hidden={!shouldRenderApi}
          id="tabpanel--api-tab"
          role="tabpanel"
        >
          {shouldRenderApi && <TOCUpdater toc={isWeb ? webApiToc : mobileApiToc} />}
          {shouldRenderApi && isWeb && webApi}
          {shouldRenderApi && isMobile && mobileApi}
        </VStack>
      </VStack>
    </VStack>
  );
};
