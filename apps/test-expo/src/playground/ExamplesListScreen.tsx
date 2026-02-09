import React, { useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import type { ListRenderItem } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { CellSpacing } from '@coinbase/cds-mobile/cells/Cell';
import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { useNavigation } from '@react-navigation/native';

import { SearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import type { ExamplesListScreenProps } from './types';

const initialRouteKey = 'Examples';
const searchRouteKey = 'Search';

const innerSpacingConfig: CellSpacing = { paddingX: 1 };

export function ExamplesListScreen({ route }: ExamplesListScreenProps) {
  const searchFilter = useContext(SearchFilterContext);
  const routeKeys = route.params?.routeKeys ?? [];
  const { navigate } = useNavigation();
  const { bottom } = useSafeAreaInsets();

  const renderItem: ListRenderItem<string> = useCallback(
    ({ item }) => {
      const handlePress = () => {
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
        return key.toLowerCase().includes(searchFilter.toLowerCase());
      }
      return true;
    });

  return (
    <Box
      background="bg"
      flexGrow={1}
      style={{ paddingBottom: bottom }}
      testID="mobile-playground-home-screen"
    >
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
