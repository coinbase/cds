import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { render, screen } from '@testing-library/react-native';

import { Pictogram } from '../../illustrations';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { CellMedia } from '../CellMedia';

describe('CellMedia', () => {
  it('icon passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia name="arrowUp" testID="cell-media-id" type="icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('asset passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia source="some/image/path" testID="cell-media-id" type="asset" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('avatar passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia source="some/image/path" testID="cell-media-id" type="avatar" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('image passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia source="some/image/path" testID="cell-media-id" type="image" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('pictogram passes accessibility', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          illustration={<Pictogram name="2fa" />}
          testID="cell-media-id"
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('cell-media-id')).toBeAccessible();
  });

  it('icon sets an accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityHint="Icon hint"
          accessibilityLabel="Icon label"
          name="arrowUp"
          type="icon"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Icon label')).toBeTruthy();
    expect(screen.getByHintText('Icon hint')).toBeTruthy();
  });

  it('asset sets an accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityHint="Asset hint"
          accessibilityLabel="Asset label"
          source="some/image/path"
          type="asset"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Asset label')).toBeTruthy();
    expect(screen.getByHintText('Asset hint')).toBeTruthy();
  });

  it('avatar sets an accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityHint="Avatar hint"
          accessibilityLabel="Avatar label"
          source="some/image/path"
          type="avatar"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Avatar label')).toBeTruthy();
    expect(screen.getByHintText('Avatar hint')).toBeTruthy();
  });

  it('image sets an accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityHint="Image hint"
          accessibilityLabel="Image label"
          source="some/image/path"
          type="image"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Image label')).toBeTruthy();
    expect(screen.getByHintText('Image hint')).toBeTruthy();
  });

  it('pictogram sets an accessible label on CellMedia', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityHint="Pictogram hint"
          accessibilityLabel="Pictogram label"
          illustration={<Pictogram name="2fa" />}
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Pictogram label')).toBeTruthy();
    expect(screen.getByHintText('Pictogram hint')).toBeTruthy();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          illustration={
            <Pictogram
              accessibilityHint="Pictogram hint"
              accessibilityLabel="Pictogram label"
              name="2fa"
            />
          }
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Pictogram label')).toBeTruthy();
    expect(screen.getByHintText('Pictogram hint')).toBeTruthy();
  });

  it('pictogram CellMedia accessible labels override Pictogram accessible labels', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityHint="CellMedia hint"
          accessibilityLabel="CellMedia label"
          illustration={
            <Pictogram
              accessibilityHint="Pictogram hint"
              accessibilityLabel="Pictogram label"
              name="2fa"
            />
          }
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('CellMedia label')).toBeTruthy();
    expect(screen.getByHintText('CellMedia hint')).toBeTruthy();
  });

  it('renders an icon', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia name="arrowUp" type="icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(glyphMap['arrowUp-24-inactive'])).toBeTruthy();
  });

  it('renders a pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia illustration={<Pictogram name="2fa" testID="pictogram-id" />} type="pictogram" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('pictogram-id')).toBeTruthy();
  });

  describe('at normal scale', () => {
    it('sets pictogram size', () => {
      render(
        <DefaultThemeProvider>
          <CellMedia
            illustration={<Pictogram name="2fa" testID="pictogram-id" />}
            type="pictogram"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 48, height: 48 });
    });

    it('sets pictogram size and cannot be overridden by Pictogram props', () => {
      render(
        <DefaultThemeProvider>
          <CellMedia
            illustration={
              <Pictogram dimension="64x64" name="2fa" scaleMultiplier={2} testID="pictogram-id" />
            }
            type="pictogram"
          />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('pictogram-id')).toHaveStyle({ width: 48, height: 48 });
    });
  });
});
