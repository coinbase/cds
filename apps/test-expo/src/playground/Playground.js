import React, { memo, useContext, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import { IconButton } from '@coinbase/cds-mobile/buttons/IconButton';
import { TextInput } from '@coinbase/cds-mobile/controls/TextInput';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { Spacer } from '@coinbase/cds-mobile/layout/Spacer';
import { TextHeadline } from '@coinbase/cds-mobile/typography/TextHeadline';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ExamplesListScreen } from './ExamplesListScreen';
import { ExamplesSearchProvider, SearchFilterContext, SetSearchFilterContext, } from './ExamplesSearchProvider';
import { IconSheetScreen } from './IconSheetScreen';
import { keyToRouteName } from './keyToRouteName';
const initialRouteName = keyToRouteName('Examples');
const searchRouteName = keyToRouteName('Search');
const Stack = createNativeStackNavigator();
const iconButtonHeight = interactableHeight.regular;
const titleOverrides = {
    Examples: 'CDS',
    Text: 'Text (all)',
};
const HeaderContent = memo(({ isSearch, showBackButton, showSearch, title, onGoBack, onGoBackFromSearch, onGoToSearch, onToggleTheme, onSearchChange, searchFilter, isDark, }) => {
    const { top } = useSafeAreaInsets();
    const style = useMemo(() => ({ marginTop: top }), [top]);
    const iconButtonPlaceholder = <Box height={iconButtonHeight}/>;
    const leftHeaderButton = showSearch ? (<Box marginX={-1}>
        <IconButton transparent name="search" onPress={onGoToSearch}/>
      </Box>) : showBackButton ? (<Box marginX={-1}>
        <IconButton transparent name="backArrow" onPress={onGoBack}/>
      </Box>) : (iconButtonPlaceholder);
    const rightHeaderButton = isSearch ? (iconButtonPlaceholder) : (<Box marginX={-1}>
        <IconButton transparent name={isDark ? 'moon' : 'light'} onPress={onToggleTheme}/>
      </Box>);
    return (<Box animated background="bg" style={style}>
        <HStack alignItems="center" justifyContent="center" paddingX={2} paddingY={1}>
          {leftHeaderButton}
          <Spacer />
          <Box alignItems="center" pointerEvents={isSearch ? undefined : 'none'} position="absolute" width="100%">
            {isSearch ? (<TextInput accessibilityHint="Search for component" accessibilityLabel="Search for component" label="" onChange={onSearchChange} placeholder="Search" start={<IconButton transparent name="backArrow" onPress={onGoBackFromSearch}/>} value={searchFilter}/>) : (<TextHeadline align="center">{title}</TextHeadline>)}
          </Box>
          <Spacer />
          {rightHeaderButton}
        </HStack>
      </Box>);
});
const PlaygroundContent = memo(({ routes = [], listScreenTitle, setColorScheme }) => {
    const theme = useTheme();
    const searchFilter = useContext(SearchFilterContext);
    const setFilter = useContext(SetSearchFilterContext);
    const routeKeys = useMemo(() => routes.map(({ key }) => key), [routes]);
    const screenOptions = useMemo(() => ({
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: theme.color.bg,
        },
        headerShadowVisible: false,
        header: ({ navigation, route, options }) => {
            const routeName = route.name;
            const isSearch = routeName === searchRouteName;
            const showSearch = routeName === initialRouteName;
            const canGoBack = navigation.canGoBack();
            const isFocused = navigation.isFocused();
            const showBackButton = isFocused && canGoBack && !isSearch;
            const handleGoBack = () => navigation.goBack();
            const handleGoBackFromSearch = () => {
                setFilter('');
                navigation.goBack();
            };
            const handleGoToSearch = () => navigation.navigate(searchRouteName);
            const handleToggleTheme = () => setColorScheme?.((s) => (s === 'dark' ? 'light' : 'dark'));
            const handleSearchChange = (e) => setFilter(e.nativeEvent.text);
            return (<HeaderContent isDark={theme.activeColorScheme === 'dark'} isSearch={isSearch} onGoBack={handleGoBack} onGoBackFromSearch={handleGoBackFromSearch} onGoToSearch={handleGoToSearch} onSearchChange={handleSearchChange} onToggleTheme={handleToggleTheme} searchFilter={searchFilter} showBackButton={showBackButton} showSearch={showSearch} title={options.title ?? routeName}/>);
        },
    }), [theme.color.bg, theme.activeColorScheme, searchFilter, setFilter, setColorScheme]);
    const exampleScreens = useMemo(() => [...routes].map((route) => {
        const { key, getComponent } = route;
        const name = keyToRouteName(key);
        const title = titleOverrides[key] ?? key;
        return (<Stack.Screen key={key} component={getComponent()} name={name} options={{ title }}/>);
    }), [routes]);
    return (<Stack.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
        <Stack.Screen component={ExamplesListScreen} initialParams={{ routeKeys }} name="DebugExamples" options={{ title: listScreenTitle ?? 'CDS' }}/>
        <Stack.Screen component={ExamplesListScreen} initialParams={{ routeKeys }} name="DebugSearch" options={{ title: 'Search' }}/>
        <Stack.Screen component={IconSheetScreen} name="DebugIconSheet" options={{ title: 'Icon Sheet' }}/>
        {exampleScreens}
      </Stack.Navigator>);
});
export const Playground = memo((props) => {
    return (<ExamplesSearchProvider>
      <PlaygroundContent {...props}/>
    </ExamplesSearchProvider>);
});
//# sourceMappingURL=Playground.js.map