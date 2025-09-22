import React, { memo, useMemo } from 'react';
import type { ColorScheme } from '@cbhq/cds-common/core/theme';
import type { StackNavigationOptions } from '@react-navigation/stack';
import { createStackNavigator, HeaderStyleInterpolators } from '@react-navigation/stack';

import { ExamplesListScreen } from './ExamplesListScreen';
import { ExamplesSearchProvider } from './ExamplesSearchProvider';
import { IconSheetScreen } from './IconSheetScreen';
import type { PlaygroundRoute } from './PlaygroundRoute';
import { createStaticRoute, initialRouteKey, searchRouteKey } from './staticRoutes';
import { transformRouteToNavComponent } from './transformRouteToNavComponent';
import { useExampleNavigatorProps } from './useExampleNavigatorProps';

const Stack = createStackNavigator();

type PlaygroundProps = {
  routes?: PlaygroundRoute[];
  listScreenTitle?: string;
  setColorScheme?: React.Dispatch<React.SetStateAction<ColorScheme>>;
};

const PlaygroundContent = memo(
  ({ routes = [], listScreenTitle, setColorScheme }: PlaygroundProps) => {
    const navigatorProps = useExampleNavigatorProps({ setColorScheme });

    const routeKeys = useMemo(() => {
      return routes.map(({ key }) => key);
    }, [routes]);

    const { key: listScreenKey, ...listScreenProps } = useMemo(() => {
      let options: StackNavigationOptions = {};

      if (listScreenTitle) {
        options = { ...options, title: listScreenTitle };
      }

      return {
        ...transformRouteToNavComponent({
          route: createStaticRoute(initialRouteKey, ExamplesListScreen),
          options,
        }),
        initialParams: { routeKeys },
      };
    }, [listScreenTitle, routeKeys]);

    const { key: searchScreenKey, ...searchScreenProps } = useMemo(() => {
      return {
        ...transformRouteToNavComponent({
          route: createStaticRoute(searchRouteKey, ExamplesListScreen),
        }),
        initialParams: { routeKeys },
      };
    }, [routeKeys]);

    const exampleScreens = useMemo(
      () =>
        [...routes].map((route) => {
          const { key, ...routeProps } = transformRouteToNavComponent({
            route,
          });
          return <Stack.Screen key={key} {...routeProps} />;
        }),
      [routes],
    );

    return (
      <Stack.Navigator {...navigatorProps}>
        <Stack.Screen key={listScreenKey} {...listScreenProps} />
        <Stack.Screen key={searchScreenKey} {...searchScreenProps} />
        <Stack.Screen
          key="IconSheet"
          component={IconSheetScreen}
          initialParams={routeKeys}
          name="DebugIconSheet"
          options={{
            title: 'Icon Sheet',
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          }}
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
