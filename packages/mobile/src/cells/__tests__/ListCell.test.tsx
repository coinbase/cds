import { Text } from 'react-native';
import { noop } from '@coinbase/cds-utils';
import { render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { CellHelperText } from '../CellHelperText';
import { CellMedia } from '../CellMedia';
import { ListCell } from '../ListCell';

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

describe('ListCell', () => {
  it('renders a Text component title', () => {
    render(
      <DefaultThemeProvider>
        <ListCell title={<Text>Title</Text>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Title')).toBeTruthy();
  });

  it('passes a11y with a Text component title', () => {
    render(
      <DefaultThemeProvider>
        <ListCell testID="listcell-with-title" title={<Text>Title</Text>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-title')).toBeAccessible();
  });

  it('renders a string title', () => {
    render(
      <DefaultThemeProvider>
        <ListCell testID="listcell-with-title" title="Title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Title')).toBeTruthy();
  });

  it('passes a11y with a string title', () => {
    render(
      <DefaultThemeProvider>
        <ListCell testID="listcell-with-title" title="Title" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-title')).toBeAccessible();
  });

  it('renders a Text component description', () => {
    render(
      <DefaultThemeProvider>
        <ListCell description={<Text>Description</Text>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Description')).toBeTruthy();
  });

  it('passes a11y with a Text component description', () => {
    render(
      <DefaultThemeProvider>
        <ListCell description={<Text>Description</Text>} testID="listcell-with-description" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-description')).toBeAccessible();
  });

  it('renders a string description', () => {
    render(
      <DefaultThemeProvider>
        <ListCell description="Description" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Description')).toBeTruthy();
  });

  it('passes a11y with a string description', () => {
    render(
      <DefaultThemeProvider>
        <ListCell description="Description" testID="listcell-with-description" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-description')).toBeAccessible();
  });

  it('renders a Text component detail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell detail={<Text>Detail</Text>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Detail')).toBeTruthy();
  });

  it('passes a11y with a Text component detail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell detail={<Text>Detail</Text>} testID="listcell-with-detail" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-detail')).toBeAccessible();
  });

  it('renders a string detail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell detail="Detail" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Detail')).toBeTruthy();
  });

  it('passes a11y with a string detail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell detail="Detail" testID="listcell-with-detail" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-detail')).toBeAccessible();
  });

  it('renders a Text component subdetail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell subdetail={<Text>Subdetail</Text>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Subdetail')).toBeTruthy();
  });

  it('passes a11y with a Text component subdetail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell subdetail={<Text>Subdetail</Text>} testID="listcell-with-subdetail" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-subdetail')).toBeAccessible();
  });

  it('renders a string subdetail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell subdetail="Subdetail" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Subdetail')).toBeTruthy();
  });

  it('passes a11y with a string subdetail', () => {
    render(
      <DefaultThemeProvider>
        <ListCell subdetail="Subdetail" testID="listcell-with-subdetail" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-subdetail')).toBeAccessible();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ListCell media={<CellMedia active name="add" testID="media" type="icon" />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('media')).toBeTruthy();
  });

  it('passes a11y with media', () => {
    render(
      <DefaultThemeProvider>
        <ListCell
          media={<CellMedia active name="add" testID="media" type="icon" />}
          testID="listcell-with-media"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('listcell-with-media')).toBeAccessible();
  });

  it('renders an accessory', () => {
    render(
      <DefaultThemeProvider>
        <ListCell accessory="arrow" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('accessory')).toBeTruthy();
  });

  it('renders a default accessory when selected', () => {
    render(
      <DefaultThemeProvider>
        <ListCell selected />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('accessory')).toBeTruthy();
  });

  it('does not render a default accessory when selected and `disableSelectionAccessory` is true', () => {
    render(
      <DefaultThemeProvider>
        <ListCell disableSelectionAccessory selected />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('accessory')).toBeFalsy();
  });

  it('passes a11y with accessory', () => {
    render(
      <DefaultThemeProvider>
        <ListCell accessory="arrow" testID="listcell-with-accessory" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-accessory')).toBeAccessible();
  });

  it('renders an action', () => {
    render(
      <DefaultThemeProvider>
        <ListCell action={<Button>Button</Button>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Button')).toBeTruthy();
  });

  it('passes a11y with action', () => {
    render(
      <DefaultThemeProvider>
        <ListCell action={<Button>Button</Button>} testID="listcell-with-action" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('listcell-with-action')).toBeAccessible();
  });

  it('renders helperText', () => {
    render(
      <DefaultThemeProvider>
        <ListCell helperText={<CellHelperText>Helper Text</CellHelperText>} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Helper Text')).toBeTruthy();
  });

  it('renders empty strings without crashing', () => {
    render(
      <DefaultThemeProvider>
        <ListCell action="" description="" detail="" subdetail="" title="" />
      </DefaultThemeProvider>,
    );

    expect(screen.container).not.toBeNull();
  });

  it('can set an accessibilityLabel and accessibilityHint when a pressable', () => {
    render(
      <DefaultThemeProvider>
        <ListCell
          accessibilityHint="Some hint"
          accessibilityLabel="Some label"
          onPress={noop}
          testID="listcell-with-a11y"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Some label')).toBeTruthy();
    expect(screen.getByHintText('Some hint')).toBeTruthy();
    expect(screen.getByTestId('listcell-with-a11y')).toBeAccessible();
  });

  it('applies styles to internal components', () => {
    const styles = {
      accessory: { borderRightWidth: 11 },
      contentContainer: { borderRightWidth: 2 },
      description: { color: 'rgb(7, 8, 9)' },
      end: { borderBottomWidth: 10 },
      helperText: { borderTopWidth: 7 },
      intermediary: { borderLeftWidth: 9 },
      mainContent: { borderLeftWidth: 4 },
      media: { borderTopWidth: 8 },
      pressable: { borderBottomWidth: 3 },
      root: { borderTopWidth: 1 },
      subtitle: { color: 'rgb(4, 5, 6)' },
      title: { color: 'rgb(1, 2, 3)' },
      titleStack: { marginTop: 5 },
      titleStackContainer: { marginBottom: 6 },
    } as const;

    const { toJSON } = render(
      <DefaultThemeProvider>
        <ListCell
          accessory="arrow"
          description="Description"
          detail="Detail"
          helperText={<CellHelperText>Helper Text</CellHelperText>}
          intermediary={<Text>Intermediary</Text>}
          media={<CellMedia active name="add" testID="media" type="icon" />}
          onPress={noop}
          styles={styles}
          subtitle="Subtitle"
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    const json = toJSON();

    expect(treeHasStyleProp(json, (s) => s.borderTopWidth === styles.root.borderTopWidth)).toBe(
      true,
    );
    expect(
      treeHasStyleProp(
        json,
        (s) => s.borderRightWidth === styles.contentContainer.borderRightWidth,
      ),
    ).toBe(true);
    expect(
      treeHasStyleProp(json, (s) => s.borderBottomWidth === styles.pressable.borderBottomWidth),
    ).toBe(true);
    expect(
      treeHasStyleProp(json, (s) => s.borderLeftWidth === styles.mainContent.borderLeftWidth),
    ).toBe(true);
    expect(treeHasStyleProp(json, (s) => s.marginTop === styles.titleStack.marginTop)).toBe(true);
    expect(
      treeHasStyleProp(json, (s) => s.marginBottom === styles.titleStackContainer.marginBottom),
    ).toBe(true);
    expect(
      treeHasStyleProp(json, (s) => s.borderTopWidth === styles.helperText.borderTopWidth),
    ).toBe(true);
    expect(treeHasStyleProp(json, (s) => s.borderTopWidth === styles.media.borderTopWidth)).toBe(
      true,
    );
    expect(
      treeHasStyleProp(json, (s) => s.borderLeftWidth === styles.intermediary.borderLeftWidth),
    ).toBe(true);
    expect(
      treeHasStyleProp(json, (s) => s.borderBottomWidth === styles.end.borderBottomWidth),
    ).toBe(true);
    expect(
      treeHasStyleProp(json, (s) => s.borderRightWidth === styles.accessory.borderRightWidth),
    ).toBe(true);
    expect(treeHasStyleProp(json, (s) => s.color === styles.title.color)).toBe(true);
    expect(treeHasStyleProp(json, (s) => s.color === styles.subtitle.color)).toBe(true);
    expect(treeHasStyleProp(json, (s) => s.color === styles.description.color)).toBe(true);
  });
});
