import type { NativeStackScreenProps } from '@react-navigation/native-stack';

type RouteParams = { routeKeys: string[] } | undefined;

export type PlaygroundStackParamList = {
  DebugExamples: { routeKeys: string[] };
  DebugSearch: { routeKeys: string[] };
  DebugIconSheet: undefined;
} & {
  [key: string]: RouteParams;
};

export type ExamplesListScreenProps = NativeStackScreenProps<
  PlaygroundStackParamList,
  'DebugExamples' | 'DebugSearch'
>;

export type IconSheetScreenProps = NativeStackScreenProps<
  PlaygroundStackParamList,
  'DebugIconSheet'
>;

declare global {
  namespace ReactNavigation {
    // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-empty-object-type
    interface RootParamList extends PlaygroundStackParamList {}
  }
}
