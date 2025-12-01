import React, { useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import type { ListRenderItem } from 'react-native';
import type { CellSpacing } from '@coinbase/cds-mobile/cells/Cell';
import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { useNavigation, useRoute } from '@react-navigation/native';
import includes from 'lodash/includes';

import { SearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import { initialRouteKey, searchRouteKey } from './staticRoutes';

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

export function ExamplesListScreen() {
  const searchFilter = useContext(SearchFilterContext);

  // React Navigation Route Param typing is not clean because our routes are dynamic
  const routeKeys = (useRoute().params as { routeKeys: string[] } | undefined)?.routeKeys ?? [];
  const { navigate } = useNavigation();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      const handlePress = () => {
        // typing not clean due to dynamic routes
        navigate(keyToRouteName(item) as never);
      };

      return (
        <ListCell
          compact
          accessory="arrow"
          innerSpacing={innerSpacingConfig}
          onPress={handlePress}
          title={item}
        />
      );
    },
    [navigate],
  );

  const data = [...routeKeys, 'IconSheet']
    .sort()
    .filter((key) => key !== initialRouteKey && key !== searchRouteKey)
    .filter((key) => {
      if (searchFilter !== '') {
        return includes(key.toLowerCase(), searchFilter.toLowerCase());
      }
      return true;
    });

  return (
    <Box background="bg" flexGrow={1} testID="mobile-playground-home-screen">
      <FlatList
        ItemSeparatorComponent={null}
        data={data}
        initialNumToRender={14}
        renderItem={renderItem}
        testID="mobile-playground-home-flatlist"
      />
    </Box>
  );
}
