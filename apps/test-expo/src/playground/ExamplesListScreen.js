import React, { useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { useNavigation } from '@react-navigation/native';
import { SearchFilterContext } from './ExamplesSearchProvider';
import { keyToRouteName } from './keyToRouteName';
import { initialRouteKey, searchRouteKey } from './staticRoutes';
const innerSpacingConfig = { paddingX: 1 };
export function ExamplesListScreen({ route }) {
    const searchFilter = useContext(SearchFilterContext);
    const routeKeys = route.params?.routeKeys ?? [];
    const { navigate } = useNavigation();
    const renderItem = useCallback(({ item }) => {
        const handlePress = () => {
            navigate(keyToRouteName(item));
        };
        return (<ListCell compact accessory="arrow" innerSpacing={innerSpacingConfig} onPress={handlePress} title={item}/>);
    }, [navigate]);
    const data = [...routeKeys, 'IconSheet']
        .sort()
        .filter((key) => key !== initialRouteKey && key !== searchRouteKey)
        .filter((key) => {
        if (searchFilter !== '') {
            return key.toLowerCase().includes(searchFilter.toLowerCase());
        }
        return true;
    });
    return (<Box background="bg" flexGrow={1} testID="mobile-playground-home-screen">
      <FlatList ItemSeparatorComponent={null} data={data} initialNumToRender={14} renderItem={renderItem} testID="mobile-playground-home-flatlist"/>
    </Box>);
}
//# sourceMappingURL=ExamplesListScreen.js.map