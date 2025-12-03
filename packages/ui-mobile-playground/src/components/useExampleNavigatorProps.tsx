import React, { useContext, useMemo } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ColorScheme } from '@coinbase/cds-common/core/theme';
import { interactableHeight } from '@coinbase/cds-common/tokens/interactableHeight';
import { IconButton } from '@coinbase/cds-mobile/buttons/IconButton';
import { TextInput } from '@coinbase/cds-mobile/controls/TextInput';
import { useLayout } from '@coinbase/cds-mobile/hooks/useLayout';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { Box } from '@coinbase/cds-mobile/layout/Box';
import { HStack } from '@coinbase/cds-mobile/layout/HStack';
import { Spacer } from '@coinbase/cds-mobile/layout/Spacer';
import { TextHeadline } from '@coinbase/cds-mobile/typography/TextHeadline';
import type { StackHeaderProps, StackNavigationOptions } from '@react-navigation/stack';

import { SearchFilterContext, SetSearchFilterContext } from './ExamplesSearchProvider';
import { initialRouteName, searchRouteName } from './staticRoutes';

type UseExampleNavigatorPropsOptions = {
  setColorScheme?: React.Dispatch<React.SetStateAction<ColorScheme>>;
};

const iconButtonHeight = interactableHeight.regular;

export function useExampleNavigatorProps({ setColorScheme }: UseExampleNavigatorPropsOptions) {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  const [headerSize, onLayout] = useLayout();
  const searchFilter = useContext(SearchFilterContext);
  const setFilter = useContext(SetSearchFilterContext);

  const style = useMemo(() => ({ marginTop: top }), [top]);

  const header = useMemo(() => {
    return ({ navigation, route, options }: StackHeaderProps) => {
      const isFocused = navigation.isFocused();
      const canGoBack = navigation.canGoBack();
      const goBack = () => {
        navigation.goBack();
      };
      const goBackFromSearch = () => {
        setFilter('');
        navigation.goBack();
      };
      const goToSearch = () => navigation.navigate(searchRouteName);
      const routeName = route.name;
      const titleForScene = options.title;
      const isSearch = routeName === searchRouteName;
      const showBackButton = isFocused && canGoBack && !isSearch;
      const showSearch = routeName === initialRouteName;

      const iconButtonPlaceholder = <Box height={iconButtonHeight} />;

      const leftHeaderButton = showSearch ? (
        <Box marginX={-1}>
          <IconButton transparent name="search" onPress={goToSearch} />
        </Box>
      ) : showBackButton ? (
        <Box marginX={-1}>
          <IconButton transparent name="backArrow" onPress={goBack} />
        </Box>
      ) : (
        iconButtonPlaceholder
      );

      const handleSearch = (e: NativeSyntheticEvent<TextInputChangeEventData>) =>
        setFilter(e.nativeEvent.text);

      const toggleDark = () => setColorScheme?.((s) => (s === 'dark' ? 'light' : 'dark'));

      const rightHeaderButton = isSearch ? (
        iconButtonPlaceholder
      ) : (
        <Box marginX={-1}>
          <IconButton
            transparent
            name={theme.activeColorScheme === 'dark' ? 'moon' : 'light'}
            onPress={toggleDark}
          />
        </Box>
      );

      return (
        <Box animated background="bg" onLayout={onLayout} style={style}>
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
                <TextInput
                  accessibilityHint="Search for component"
                  accessibilityLabel="Search for component"
                  label=""
                  onChange={handleSearch}
                  placeholder="Search"
                  start={<IconButton transparent name="backArrow" onPress={goBackFromSearch} />}
                  value={searchFilter}
                />
              ) : (
                <TextHeadline align="center">{titleForScene}</TextHeadline>
              )}
            </Box>
            <Spacer />
            {rightHeaderButton}
          </HStack>
        </Box>
      );
    };
  }, [onLayout, searchFilter, setFilter, style, theme.activeColorScheme, setColorScheme]);

  return useMemo(() => {
    const screenOptions: StackNavigationOptions = {
      headerBackAllowFontScaling: false,
      headerBackTitleVisible: false,
      headerTitleAllowFontScaling: false,
      headerStyle: {
        backgroundColor: theme.color.bg,
        borderWidth: 0,
        shadowColor: 'transparent',
        height: headerSize.height,
      },
      header,
      gestureDirection: 'horizontal',
    };

    return {
      initialRouteName,
      screenOptions,
    };
  }, [header, headerSize.height, theme.color.bg]);
}
