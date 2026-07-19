import React, { memo, useContext, useMemo } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import { IconButton } from '@coinbase/cds-mobile/buttons/IconButton';
import { TextInput } from '@coinbase/cds-mobile/controls/TextInput';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { Spacer } from '@coinbase/cds-mobile/layout/Spacer';
import { Text } from '@coinbase/cds-mobile/typography/Text';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ExamplesListScreen } from './ExamplesListScreen';
import { ExamplesSearchProvider, SearchContext } from './ExamplesSearchProvider';
import { IconSheetScreen } from './IconSheetScreen';
import { keyToRouteName } from './keyToRouteName';
import type { PlaygroundRoute } from './PlaygroundRoute';
import type { PlaygroundStackParamList } from './types';

const initialRouteName = keyToRouteName('Examples');

const Stack = createNativeStackNavigator<PlaygroundStackParamList>();

const titleOverrides: Record<string, string> = {
  Examples: 'CDS',
  Text: 'Text (all)',
};

type PlaygroundProps = {
  routes?: PlaygroundRoute[];
  listScreenTitle?: string;
  setColorScheme?: React.Dispatch<React.SetStateAction<ColorScheme>>;
};

type HeaderProps = {
  isSearch: boolean;
  showBackButton: boolean;
  showSearch: boolean;
  title: string;
  onGoBack: () => void;
  onCloseSearch: () => void;
  onOpenSearch: () => void;
  onToggleTheme: () => void;
  onSearchChange: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  searchFilter: string;
  isDark: boolean;
};

const HeaderContent = memo(
  ({
    isSearch,
    showBackButton,
    showSearch,
    title,
    onGoBack,
    onCloseSearch,
    onOpenSearch,
    onToggleTheme,
    onSearchChange,
    searchFilter,
    isDark,
  }: HeaderProps) => {
    const { top } = useSafeAreaInsets();
    const style = useMemo(() => ({ paddingTop: top }), [top]);

    const iconButtonPlaceholder = (
      <Box opacity={0} pointerEvents="none">
        <IconButton transparent accessibilityLabel="Close" name="close" />
      </Box>
    );

    const leftHeaderButton = showSearch ? (
      <Box marginX={-1}>
        <IconButton
          transparent
          accessibilityLabel="Search for component"
          name="search"
          onPress={onOpenSearch}
          testID="search-button"
        />
      </Box>
    ) : showBackButton ? (
      <Box marginX={-1}>
        <IconButton
          transparent
          accessibilityLabel="Go back"
          name="backArrow"
          onPress={onGoBack}
          testID="nav-back-button"
        />
      </Box>
    ) : (
      iconButtonPlaceholder
    );

    const rightHeaderButton = isSearch ? (
      iconButtonPlaceholder
    ) : (
      <Box marginX={-1}>
        <IconButton
          transparent
          accessibilityLabel="Toggle dark mode"
          name={isDark ? 'moon' : 'light'}
          onPress={onToggleTheme}
        />
      </Box>
    );

    return (
      <Box animated background="bg" style={style}>
        <HStack alignItems="center" justifyContent="center" paddingX={2} paddingY={1}>
          {leftHeaderButton}
          <Spacer />
          <Box
            alignItems="center"
            pointerEvents={isSearch ? undefined : 'none'}
            position="absolute"
            width="100%"
          >
            {isSearch ? (
              /* eslint-disable jsx-a11y/no-autofocus -- opening the search panel
                 implies intent to type immediately; auto-focus is expected here */
              <TextInput
                autoFocus
                accessibilityHint="Search for component"
                accessibilityLabel="Search for component"
                label=""
                onChange={onSearchChange}
                placeholder="Search"
                start={
                  <IconButton
                    transparent
                    accessibilityLabel="Close search"
                    name="backArrow"
                    onPress={onCloseSearch}
                  />
                }
                value={searchFilter}
              />
            ) : (
              <Text align="center" font="headline">
                {title}
              </Text>
            )}
          </Box>
          <Spacer />
          {rightHeaderButton}
        </HStack>
      </Box>
    );
  },
);

const PlaygroundContent = memo(
  ({ routes = [], listScreenTitle, setColorScheme }: PlaygroundProps) => {
    const theme = useTheme();
    const { filter, isOpen, setFilter, openSearch, closeSearch } = useContext(SearchContext);

    const routeKeys = useMemo(() => routes.map(({ key }) => key), [routes]);

    const screenOptions = useMemo(
      (): NativeStackNavigationOptions => ({
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: theme.color.bg,
        },
        headerShadowVisible: false,
        header: ({ navigation, route, options }) => {
          const routeName = route.name;
          const isHomeScreen = routeName === initialRouteName;
          // Search mode: only on the home screen when isOpen is true.
          const isSearch = isHomeScreen && isOpen;
          const showSearch = isHomeScreen && !isOpen;
          const canGoBack = navigation.canGoBack();
          const isFocused = navigation.isFocused();
          const showBackButton = isFocused && canGoBack && !isSearch;

          const handleGoBack = () => navigation.goBack();
          const handleToggleTheme = () =>
            setColorScheme?.((s) => (s === 'dark' ? 'light' : 'dark'));
          const handleSearchChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
            setFilter(e.nativeEvent.text);

          return (
            <HeaderContent
              isDark={theme.activeColorScheme === 'dark'}
              isSearch={isSearch}
              onCloseSearch={closeSearch}
              onGoBack={handleGoBack}
              onOpenSearch={openSearch}
              onSearchChange={handleSearchChange}
              onToggleTheme={handleToggleTheme}
              searchFilter={filter}
              showBackButton={showBackButton}
              showSearch={showSearch}
              title={options.title ?? routeName}
            />
          );
        },
      }),
      [
        theme.color.bg,
        theme.activeColorScheme,
        filter,
        setFilter,
        setColorScheme,
        isOpen,
        openSearch,
        closeSearch,
      ],
    );

    const exampleScreens = useMemo(
      () =>
        [...routes].map((route) => {
          const { key, getComponent, options: routeOptions } = route;
          const name = keyToRouteName(key);
          const title = titleOverrides[key] ?? key;
          return (
            <Stack.Screen
              key={key}
              component={getComponent() as React.ComponentType<object>}
              name={name}
              options={{ title, ...routeOptions }}
            />
          );
        }),
      [routes],
    );

    return (
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={screenOptions}>
        <Stack.Screen
          component={ExamplesListScreen}
          initialParams={{ routeKeys }}
          name="DebugExamples"
          options={{ title: listScreenTitle ?? 'CDS' }}
        />
        <Stack.Screen
          component={IconSheetScreen}
          name="DebugIconSheet"
          options={{ title: 'Icon Sheet' }}
        />
        {exampleScreens}
      </Stack.Navigator>
    );
  },
);

export const Playground = memo((props: PlaygroundProps) => {
  return (
    <ExamplesSearchProvider>
      <PlaygroundContent {...props} />
    </ExamplesSearchProvider>
  );
});
