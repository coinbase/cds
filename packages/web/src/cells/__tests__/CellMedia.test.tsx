import { imageSize, mediaSize } from '@coinbase/cds-common/tokens/cell';
import { glyphMap } from '@coinbase/cds-icons/glyphMap';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Pictogram } from '../../illustrations/Pictogram';
import { DefaultThemeProvider } from '../../utils/test';
import { CellMedia } from '../CellMedia';

describe('CellMedia', () => {
  it('icon passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <CellMedia name="arrowUp" type="icon" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('asset passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia source="some/image/path" type="asset" />),
    ).toHaveNoViolations();
  });

  it('avatar passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia source="some/image/path" type="avatar" />),
    ).toHaveNoViolations();
  });

  it('image passes accessibility', async () => {
    expect(
      await renderA11y(<CellMedia source="some/image/path" type="image" />),
    ).toHaveNoViolations();
  });

  it('pictogram passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('icon sets an accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia accessibilityLabel="Icon label" name="arrowUp" type="icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('Icon label')).toBeVisible();
  });

  it('asset sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Asset label" source="some/image/path" type="asset" />);

    expect(screen.getByAltText('Asset label')).toBeVisible();
  });

  it('avatar sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Avatar label" source="some/image/path" type="avatar" />);

    expect(screen.getByAltText('Avatar label')).toBeVisible();
  });

  it('image sets an accessible label', () => {
    render(<CellMedia accessibilityLabel="Image label" source="some/image/path" type="image" />);

    expect(screen.getByAltText('Image label')).toBeVisible();
  });

  it('pictogram sets an accessible label on CellMedia', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityLabel="Pictogram label"
          illustration={<Pictogram name="2fa" />}
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram sets an accessible label on Pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia illustration={<Pictogram alt="Pictogram label" name="2fa" />} type="pictogram" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('Pictogram label')).toBeVisible();
  });

  it('pictogram CellMedia accessible label overrides Pictogram accessible label', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia
          accessibilityLabel="CellMedia label"
          illustration={<Pictogram alt="Pictogram label" name="2fa" />}
          type="pictogram"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByAltText('CellMedia label')).toBeVisible();
  });

  it('renders an icon', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia name="arrowUp" type="icon" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(glyphMap['arrowUp-16-inactive'])).toBeVisible();
  });

  it('renders an asset', () => {
    render(<CellMedia source="some/image/path" type="asset" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image.className).toMatch('circle');
  });

  it('renders an avatar', () => {
    render(<CellMedia source="some/image/path" type="avatar" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image.className).toMatch('circle');
  });

  it('renders an image', () => {
    render(<CellMedia source="some/image/path" type="image" />);
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('src', 'some/image/path');
    expect(image.className).toMatch('squircle');
  });

  it('renders a pictogram', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('img')).toHaveAttribute('src', expect.stringContaining('2fa'));
  });

  it('sets icon size', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia name="arrowUp" type="icon" />
      </DefaultThemeProvider>,
    );

    const icon = screen.getByTestId('icon-base-glyph');
    expect(icon).toHaveAttribute('data-icon-name', 'arrowUp');
    expect(icon.className).toContain('iconCss');
  });

  it('sets asset size', () => {
    render(<CellMedia source="some/image/path" type="asset" />);
    const image = screen.getByRole('img');

    expect(image).toHaveStyle({
      '--width': `${mediaSize}px`,
      '--height': `${mediaSize}px`,
    });
  });

  it('sets avatar size', () => {
    render(<CellMedia source="some/image/path" type="avatar" />);
    const image = screen.getByRole('img');

    expect(image).toHaveStyle({
      '--width': `${mediaSize}px`,
      '--height': `${mediaSize}px`,
    });
  });

  it('sets image size', () => {
    render(<CellMedia source="some/image/path" type="image" />);
    const image = screen.getByRole('img');

    expect(image).toHaveStyle({
      '--width': `${imageSize}px`,
      '--height': `${imageSize}px`,
    });
  });

  it('sets pictogram size', () => {
    render(
      <DefaultThemeProvider>
        <CellMedia illustration={<Pictogram name="2fa" />} type="pictogram" />
      </DefaultThemeProvider>,
    );
    const image = screen.getByRole('img');

    expect(image).toHaveAttribute('width', String(imageSize));
    expect(image).toHaveAttribute('height', String(imageSize));
  });
});
