import { render, screen } from '@testing-library/react';

import { Pictogram } from '../../illustrations';
import { RemoteImage } from '../../media';
import { DefaultThemeProvider } from '../../utils/test';
import { Tile } from '../Tile';

const MockPictogram = () => <Pictogram name="add" />;

describe('Tile.test', () => {
  it('renders title', () => {
    render(
      <DefaultThemeProvider>
        <Tile title="test title">
          <MockPictogram />
        </Tile>
      </DefaultThemeProvider>,
    );

    const node = screen.getByText('test title');
    expect(node).toBeTruthy();
    expect(node.getAttribute('class')).toContain('truncatedCss');
  });

  it('renders count', () => {
    render(
      <DefaultThemeProvider>
        <Tile count={4} title="test title">
          <MockPictogram />
        </Tile>
      </DefaultThemeProvider>,
    );

    const node = screen.getByText('4');
    expect(node).toBeTruthy();
  });

  it('overflows text', () => {
    render(
      <DefaultThemeProvider>
        <Tile showOverflow title="test title">
          <MockPictogram />
        </Tile>
      </DefaultThemeProvider>,
    );

    const node = screen.getByText('test title');
    expect(node.getAttribute('class')).toContain('visibleCss');
  });

  it('renders pictogram', () => {
    render(
      <DefaultThemeProvider>
        <Tile title="test title">
          <MockPictogram />
        </Tile>
      </DefaultThemeProvider>,
    );

    const node = screen.getByRole('img');
    expect(node).toBeTruthy();
    expect(node).toBeInTheDocument();
    expect(node).toHaveAttribute('src', expect.stringContaining('add'));
  });

  it('renders remote image', () => {
    render(
      <DefaultThemeProvider>
        <Tile title="test title">
          <RemoteImage source="test-image-src" />
        </Tile>
      </DefaultThemeProvider>,
    );

    const node = screen.getByRole('img');
    expect(node).toBeTruthy();
    expect(node).toBeInTheDocument();
    expect(node).toHaveAttribute('src', 'test-image-src');
  });
});
