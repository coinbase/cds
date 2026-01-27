import { useCallback, useContext, useMemo } from 'react';
import { Pressable, SectionList } from 'react-native';
import type { SectionListRenderItem } from 'react-native';
import type { CellSpacing } from '@coinbase/cds-mobile/cells/Cell';
import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
import { Icon } from '@coinbase/cds-mobile/icons/Icon';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { Text } from '@coinbase/cds-mobile/typography/Text';
import { useNavigation, useRoute } from '@react-navigation/native';
import includes from 'lodash/includes';

import { SearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import { useRecentItemsContext } from './RecentItemsProvider';
import { initialRouteKey, searchRouteKey } from './staticRoutes';

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

type Section = {
  title: string;
  data: string[];
};

export function ExamplesListScreen() {
  const searchFilter = useContext(SearchFilterContext);
  const { recentItems, addRecentItem, removeRecentItem } = useRecentItemsContext();

  // React Navigation Route Param typing is not clean because our routes are dynamic
  const routeKeys = (useRoute().params as { routeKeys: string[] } | undefined)?.routeKeys ?? [];
  const { navigate } = useNavigation();

  const handleNavigate = useCallback(
    (item: string) => {
      // Add to recent items
      addRecentItem(item);
      // typing not clean due to dynamic routes
      navigate(keyToRouteName(item) as never);
    },
    [navigate, addRecentItem],
  );

  const renderRecentItem: SectionListRenderItem<string, Section> = useCallback(
    ({ item }) => {
      const handleRemove = () => {
        removeRecentItem(item);
      };

      return (
        <ListCell
          compact
          accessoryNode={
            <Pressable
              accessibilityLabel="Remove from recent"
              accessibilityRole="button"
              onPress={handleRemove}
            >
              <Icon color="fgMuted" name="close" size="s" />
            </Pressable>
          }
          innerSpacing={innerSpacingConfig}
          onPress={() => handleNavigate(item)}
          title={item}
        />
      );
    },
    [handleNavigate, removeRecentItem],
  );

  const renderAllItem: SectionListRenderItem<string, Section> = useCallback(
    ({ item }) => {
      return (
        <ListCell
          compact
          accessory="arrow"
          innerSpacing={innerSpacingConfig}
          onPress={() => handleNavigate(item)}
          title={item}
        />
      );
    },
    [handleNavigate],
  );

  const allItems = useMemo(
    () =>
      [...routeKeys, 'IconSheet']
        .sort()
        .filter((key) => key !== initialRouteKey && key !== searchRouteKey)
        .filter((key) => {
          if (searchFilter !== '') {
            return includes(key.toLowerCase(), searchFilter.toLowerCase());
          }
          return true;
        }),
    [routeKeys, searchFilter],
  );

  const sections: Section[] = useMemo(() => {
    const result: Section[] = [];

    // Only show recent section if there are recent items and no search filter
    if (recentItems.length > 0 && searchFilter === '') {
      // Filter recent items to only include valid route keys
      const validRecentItems = recentItems.filter(
        (item) => routeKeys.includes(item) || item === 'IconSheet',
      );

      if (validRecentItems.length > 0) {
        result.push({
          title: 'Recent',
          data: validRecentItems,
        });
      }
    }

    result.push({
      title: 'All',
      data: allItems,
    });

    return result;
  }, [recentItems, allItems, searchFilter, routeKeys]);

  const renderItem: SectionListRenderItem<string, Section> = useCallback(
    ({ item, section }) => {
      if (section.title === 'Recent') {
        return renderRecentItem({ item, section, index: 0, separators: {} as any });
      }
      return renderAllItem({ item, section, index: 0, separators: {} as any });
    },
    [renderRecentItem, renderAllItem],
  );

  const renderSectionHeader = useCallback(({ section }: { section: Section }) => {
    return (
      <Box background="bg" paddingBottom={0.5} paddingTop={1} paddingX={2}>
        <Text color="fgMuted" font="label2">
          {section.title}
        </Text>
      </Box>
    );
  }, []);

  return (
    <Box background="bg" flexGrow={1} testID="mobile-playground-home-screen">
      <SectionList
        ItemSeparatorComponent={null}
        initialNumToRender={14}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        stickySectionHeadersEnabled={false}
        testID="mobile-playground-home-sectionlist"
      />
    </Box>
  );
}
