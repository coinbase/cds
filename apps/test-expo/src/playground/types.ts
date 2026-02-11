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
    // TODO: Revisit when React Navigation supports type-based augmentation.
    // We must disable these rules because:
    // 1. no-restricted-syntax (interfaces): React Navigation declares RootParamList as an
    //    interface and relies on declaration merging. Using `type RootParamList = ...`
    //    causes TS2300 "Duplicate identifier" since interface and type cannot coexist.
    // 2. @typescript-eslint/no-empty-object-type: The empty body (`extends X {}`) is the
    //    standard TypeScript augmentation pattern—we extend the base type with no extra
    //    members. An interface with only extends is equivalent to its supertype by design.
    // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-empty-object-type
    interface RootParamList extends PlaygroundStackParamList {}
  }
}
