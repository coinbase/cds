import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { CellSpacing } from '../Cell';
import { ListCellFallback } from '../ListCellFallback';

describe('ListCellFallback', () => {
  it('renders a ListCellFallback component', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback testID="list-cell-fallback" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback')).toBeTruthy();
  });

  it('renders a Fallback component if description is passed', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback description />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback-description')).toBeTruthy();
  });

  it('renders a Fallback component if detail is passed', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback detail />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback-detail')).toBeTruthy();
  });

  it('renders a Fallback component if subdetail is passed', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback subdetail />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback-subdetail')).toBeTruthy();
  });

  it('renders a Fallback component if title is passed', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback title />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback-title')).toBeTruthy();
  });

  it('renders a MediaFallback component if media is passed', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback media="asset" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback-media')).toBeTruthy();
  });

  it('renders a Fallback component if helperText is passed', () => {
    render(
      <DefaultThemeProvider>
        <ListCellFallback helperText />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback-helper-text')).toBeTruthy();
  });

  it('renders ListCellFallback component with innerSpacing and outerSpacing', () => {
    const innerSpacing: CellSpacing = {
      paddingX: 3,
      paddingY: 4,
    };
    const outerSpacing: CellSpacing = {
      paddingX: 0,
      paddingY: 2,
    };

    render(
      <DefaultThemeProvider>
        <ListCellFallback
          innerSpacing={innerSpacing}
          outerSpacing={outerSpacing}
          testID="list-cell-fallback"
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('list-cell-fallback')).toHaveStyle(
      `padding: ${outerSpacing.paddingY}px ${innerSpacing.paddingX}px;`,
    );
  });
});
