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
    return routeKeys.find((key) => key.toLowerCase() === filter.toLowerCase()) ?? null;
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
        title={item}
      />
    ),
    [navigate],
  );

  const data = useMemo(() => {
    const sorted = [...routeKeys, 'IconSheet'].sort().filter((key) => key !== 'Examples');

    if (!isOpen || filter === '') return sorted;

    return sorted.filter((key) => {
      // Exclude the exact match from the list — it's shown as the shortcut button above.
      if (exactMatch && key === exactMatch) return false;
      return key.toLowerCase().includes(filter.toLowerCase());
    });
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
