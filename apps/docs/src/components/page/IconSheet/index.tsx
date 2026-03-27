import React, { useCallback, useState } from 'react';
import type { TabValue } from '@coinbase/cds-common/tabs/useTabs';
import type { IconSize } from '@coinbase/cds-common/types';
import type { IconName } from '@coinbase/cds-common/types/IconName';
import { descriptionMap } from '@coinbase/cds-icons/descriptionMap';
import { names } from '@coinbase/cds-icons/names';
import { TileButton } from '@coinbase/cds-web/buttons/TileButton';
import { SearchInput, Switch } from '@coinbase/cds-web/controls';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Box, Grid } from '@coinbase/cds-web/layout';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { Text } from '@coinbase/cds-web/typography';
import { sortByAlphabet } from '@site/src/utils/sortByAlphabet';
import { throttle } from 'lodash';

import { SheetTabs } from '../SheetTabs';

// use a set to dedupe the icons that existed in both the navigation icons set and the ui icons set
const alphabeticallySortedNames = [...names].sort(sortByAlphabet);

const queryMatchesName = (query: string, name: string) => {
  const queryRe = new RegExp(query.trim().toLowerCase(), 'gi');
  const nameRe = new RegExp(name.toLowerCase(), 'gi');

  const matchedIconNames: string[] = [];

  if (query in descriptionMap) {
    matchedIconNames.push(...descriptionMap[query]);
  }

  return name.match(queryRe) !== null || matchedIconNames.join(' ').match(nameRe) !== null;
};

const iconSizes: IconSize[] = ['xs', 's', 'm', 'l'];

const IconTile = ({ name, size, active }: { name: IconName; size: IconSize; active: boolean }) => {
  const toast = useToast();
  const handleIconPress = useCallback(() => {
    if (navigator) {
      void navigator.clipboard.writeText(name).then(() => {
        toast.show('Copied to clipboard');
      });
    }
  }, [name, toast]);

  return (
    <TileButton showOverflow onClick={handleIconPress} title={name}>
      <Icon active={active} name={name} size={size} />
    </TileButton>
  );
};

export const IconSheet = ({ title }: { title?: React.ReactNode }) => {
  const [query, setQuery] = useState('');
  const [showIconActive, setShowIconActive] = useState(false);
  const [activeTab, setActiveTab] = useState<TabValue | null>({ id: 'm', label: 'm' });

  const handleActiveCheck = useCallback(() => {
    setShowIconActive((active) => !active);
  }, []);

  const searchOnChange = throttle((text: string) => {
    setQuery(text);
  }, 1000);

  const tabs = iconSizes.map((size) => ({ id: size, label: size }));

  const handleTabChange = useCallback((tab: TabValue | null) => {
    setActiveTab(tab);
  }, []);

  return (
    <Box background="bgAlternate" flexDirection="column" gap={2}>
      <SearchInput
        compact
        accessibilityLabel="Filter icons by name"
        clearIconAccessibilityLabel="Clear search"
        onChangeText={searchOnChange}
        placeholder="Search by name or description"
        startIconAccessibilityLabel="Search"
        type="text"
        value={query}
      />
      <Box flexDirection="column" gap={2} position="relative">
        <Box gap={4} paddingStart={2}>
          <Box gap={1}>
            <Text color="fgMuted" font="body">
              active prop:
            </Text>
            <Switch
              accessibilityLabel="Toggle icon active state"
              checked={showIconActive}
              onChange={handleActiveCheck}
            />
          </Box>
          <Box gap={1}>
            <Text color="fgMuted" font="body">
              size prop:
            </Text>
            <SheetTabs
              accessibilityLabel="Select icon size"
              activeTab={activeTab}
              onChange={handleTabChange}
              tabs={tabs}
            />
          </Box>
        </Box>
        {iconSizes.map((size) => {
          const filteredNames = alphabeticallySortedNames.filter((name) =>
            queryMatchesName(query, name),
          );
          const hasResults = filteredNames.length > 0;

          return (
            <Box
              key={size}
              background="bg"
              borderRadius={500}
              display={activeTab?.id === size ? 'block' : 'none'}
              padding={1}
            >
              {hasResults ? (
                <Grid columnMin="106px" gap={1} maxHeight={560} overflow="scroll" width="100%">
                  {filteredNames.map((name) => (
                    <IconTile key={name} active={showIconActive} name={name} size={size} />
                  ))}
                </Grid>
              ) : (
                <Box
                  alignItems="center"
                  display="flex"
                  justifyContent="center"
                  padding={4}
                  width="100%"
                >
                  <Text color="fg" font="legal">
                    No results found
                  </Text>
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
