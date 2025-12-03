import { Text, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { VStack } from '../../layout';
import { Text as TypographyText } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Cell } from '../Cell';
import { CellMedia } from '../CellMedia';
import { ContentCell } from '../ContentCell';

describe('ContentCell', () => {
  it('errors if meta is provided without title/subtitle', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <DefaultThemeProvider>
        <ContentCell meta="Meta" />
      </DefaultThemeProvider>,
    );

    expect(spy).toHaveBeenCalledWith(
      'ContentCell: Cannot use `meta` without a `title` or `subtitle`.',
    );

    spy.mockRestore();
  });

  it('renders a title', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          title={
            <View testID="title">
              <Text>Title</Text>
            </View>
          }
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('title')).not.toBeNull();
  });

  it('Cell with title passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          testID="cell-with-title"
          title={
            <View testID="title">
              <Text>Title</Text>
            </View>
          }
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-with-title')).toBeAccessible();
  });

  it('Cell standalone disabled passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Cell disabled testID="cell-standalone">
          <Text>Cell</Text>
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-standalone')).toBeAccessible();
  });

  it('Cell with onPress and disabled passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Cell disabled onPress={() => {}} testID="cell-standalone">
          <Text>Cell</Text>
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-standalone')).toBeAccessible();
  });

  it('renders a subtitle', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          subtitle={
            <View testID="subtitle">
              <Text>Subtitle</Text>
            </View>
          }
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('subtitle')).not.toBeNull();
  });
  it('Cell with subtitle passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          subtitle={
            <View testID="subtitle">
              <Text>Subtitle</Text>
            </View>
          }
          testID="cell-with-subtitle"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-with-subtitle')).toBeAccessible();
  });

  it('renders a description', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          description={
            <View testID="description">
              <Text>Description</Text>
            </View>
          }
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('description')).not.toBeNull();
  });
  it('Cell with description passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          description={
            <View testID="description">
              <Text>Description</Text>
            </View>
          }
          testID="cell-with-description"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-with-description')).toBeAccessible();
  });

  it('renders meta', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          meta={
            <View testID="meta">
              <Text>Meta</Text>
            </View>
          }
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('meta')).not.toBeNull();
  });

  it('Cell with meta passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          meta={
            <View testID="meta">
              <Text>Meta</Text>
            </View>
          }
          testID="cell-with-meta"
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-with-meta')).toBeAccessible();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell media={<CellMedia active name="add" testID="media" type="icon" />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('media')).not.toBeNull();
  });

  it('Cell with media passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          media={<CellMedia active name="add" testID="media" type="icon" />}
          testID="cell-with-media"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-with-media')).toBeAccessible();
  });

  it('renders an accessory', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell accessory="arrow" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('accessory')).not.toBeNull();
  });

  it('Cell with accessory passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell accessory="arrow" testID="cell-with-accessory" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-with-accessory')).toBeAccessible();
  });

  it('renders empty strings without crashing', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell description="" meta="" subtitle="" title="" />
      </DefaultThemeProvider>,
    );

    expect(screen.container).not.toBeNull();
  });

  it('renders override nodes when provided', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          accessoryNode={<View testID="accessory-node" />}
          description="Default description"
          descriptionNode={
            <View testID="description-node">
              <Text>Description Node</Text>
            </View>
          }
          meta="Default meta"
          metaNode={
            <View testID="meta-node">
              <Text>Meta Node</Text>
            </View>
          }
          subtitle="Default subtitle"
          subtitleNode={
            <View testID="subtitle-node">
              <Text>Subtitle Node</Text>
            </View>
          }
          title="Default title"
          titleNode={
            <View testID="title-node">
              <Text>Title Node</Text>
            </View>
          }
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('title-node')).not.toBeNull();
    expect(screen.queryByText('Default title')).toBeNull();
    expect(screen.getByTestId('subtitle-node')).not.toBeNull();
    expect(screen.queryByText('Default subtitle')).toBeNull();
    expect(screen.getByTestId('description-node')).not.toBeNull();
    expect(screen.queryByText('Default description')).toBeNull();
    expect(screen.getByTestId('meta-node')).not.toBeNull();
    expect(screen.queryByText('Default meta')).toBeNull();
    expect(screen.getByTestId('accessory-node')).not.toBeNull();
  });

  it('uses condensed typography when spacingVariant is condensed', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell
          description="Description"
          spacingVariant="condensed"
          subtitle="Subtitle"
          title="Title"
        />
      </DefaultThemeProvider>,
    );

    const titleInstance = screen.getByText('Title').parent;
    const subtitleInstance = screen.getByText('Subtitle').parent;
    const descriptionInstance = screen.getByText('Description').parent;

    expect(titleInstance?.props.numberOfLines).toBe(2);
    expect(subtitleInstance?.props.font).toBe('label1');
    expect(descriptionInstance?.props.font).toBe('body');
  });

  it('limits title to a single line when description is present outside condensed spacing', () => {
    render(
      <DefaultThemeProvider>
        <ContentCell description="Description" spacingVariant="normal" title="Title" />
      </DefaultThemeProvider>,
    );

    const titleInstance = screen.getByText('Title').parent;

    expect(titleInstance?.props.numberOfLines).toBe(1);
  });

  it('applies styles prop to meta text', () => {
    const metaStyle = { color: 'purple' };

    render(
      <DefaultThemeProvider>
        <ContentCell meta="Meta" styles={{ meta: metaStyle }} title="Title" />
      </DefaultThemeProvider>,
    );

    const metaInstance = screen.getByText('Meta').parent;
    expect(metaInstance?.props.style).toBe(metaStyle);
  });
});
