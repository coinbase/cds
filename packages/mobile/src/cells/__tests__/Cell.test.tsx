import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Cell } from '../Cell';

function flattenStyle(style: unknown): Array<Record<string, unknown>> {
  if (!style) return [];
  if (Array.isArray(style)) return style.flatMap(flattenStyle);
  if (typeof style === 'object') return [style as Record<string, unknown>];
  return [];
}

function treeHasStyleProp(
  tree: unknown,
  predicate: (style: Record<string, unknown>) => boolean,
): boolean {
  if (!tree) return false;

  if (Array.isArray(tree)) {
    return tree.some((node) => treeHasStyleProp(node, predicate));
  }

  if (typeof tree !== 'object') return false;

  const node = tree as {
    props?: { style?: unknown };
    children?: unknown[];
  };

  const styles = flattenStyle(node.props?.style);
  if (styles.some(predicate)) return true;

  return (node.children ?? []).some((child) => treeHasStyleProp(child, predicate));
}

describe('Cell', () => {
  it('applies styles.childrenContainer', () => {
    const marker = { borderLeftWidth: 321 };

    const { toJSON } = render(
      <DefaultThemeProvider>
        <Cell styles={{ childrenContainer: marker }} testID="cell">
          <Text>Child</Text>
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(treeHasStyleProp(toJSON(), (s) => s.borderLeftWidth === marker.borderLeftWidth)).toBe(
      true,
    );
  });
});
