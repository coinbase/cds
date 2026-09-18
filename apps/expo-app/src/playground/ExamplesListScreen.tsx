import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { FlatList } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CellSpacing } from '@coinbase/cds-mobile/cells/Cell';
import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { useNavigation } from '@react-navigation/native';

import { SearchContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import type { ExamplesListScreenProps } from './types';

const innerSpacingConfig: CellSpacing = { paddingX: 1 };
const pinnedRouteKeys = ['CustomerComponentConfig'];
// Friendly display labels for pinned route keys that don't read well as raw PascalCase.
const pinnedRouteLabels: Record<string, string> = {
  CustomerComponentConfig: 'Retail Theme / Config',
};

export function ExamplesListScreen({ route }: ExamplesListScreenProps) {
  const { filter, isOpen, resetSearch, closeSearch } = useContext(SearchContext);
  const routeKeys = useMemo(() => route.params?.routeKeys ?? [], [route.params?.routeKeys]);
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();

  // Reset search when returning to this screen from a component example.
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', resetSearch);
    return unsubscribe;
  }, [navigation, resetSearch]);

  // Exact match: the route key whose name equals the search query exactly (case-insensitive).
  // Shown as a shortcut button above the filtered list when search is active.
  const exactMatch = useMemo(() => {
    if (!isOpen || filter.length === 0) return null;
    const searchableKeys = [...routeKeys, 'IconSheet', ...pinnedRouteKeys];
    return searchableKeys.find((key) => key.toLowerCase() === filter.toLowerCase()) ?? null;
  }, [isOpen, filter, routeKeys]);

  const navigate = useCallback(
    (key: string) => {
      closeSearch();
      navigation.navigate(keyToRouteName(key) as never);
    },
    [navigation, closeSearch],
  );

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => (
      <ListCell
        compact
        accessibilityLabel={`Navigate to ${item} example`}
        accessory="arrow"
        innerSpacing={innerSpacingConfig}
        onPress={() => navigate(item)}
        title={pinnedRouteLabels[item] ?? item}
      />
    ),
    [navigate],
  );

  const data = useMemo(() => {
    const filterBySearch = (key: string) => {
      if (!isOpen || filter === '') return true;
      // Exclude the exact match from the list — it's shown as the shortcut button above.
      if (exactMatch && key === exactMatch) return false;
      return key.toLowerCase().includes(filter.toLowerCase());
    };

    const pinnedData = pinnedRouteKeys.filter(filterBySearch);
    const sortedData = [...routeKeys, 'IconSheet']
      .sort()
      .filter((key) => key !== 'Examples')
      .filter((key) => !pinnedRouteKeys.includes(key))
      .filter(filterBySearch);

    return [...pinnedData, ...sortedData];
  }, [routeKeys, isOpen, filter, exactMatch]);

  return (
    <Box background="bg" flexGrow={1} testID="mobile-playground-home-screen">
      {exactMatch !== null && (
        <ListCell
          compact
          accessibilityLabel={`Go to ${exactMatch}`}
          accessory="arrow"
          innerSpacing={innerSpacingConfig}
          onPress={() => navigate(exactMatch)}
          testID="exact-match-button"
          title={`Go to: ${exactMatch}`}
        />
      )}
      <FlatList
        ItemSeparatorComponent={null}
        contentContainerStyle={{ paddingBottom: bottom }}
        data={data}
        initialNumToRender={14}
        renderItem={renderItem}
        testID="mobile-playground-home-flatlist"
      />
    </Box>
  );
}
