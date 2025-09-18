import { render, screen } from '@testing-library/react';

import { ListCellFallback } from '../ListCellFallback';

describe('ListCellFallback', () => {
  it('renders a ListCellFallback component', () => {
    render(<ListCellFallback testID="list-cell-fallback" />);
    expect(screen.getByTestId('list-cell-fallback')).toBeTruthy();
  });

  it('renders a Fallback component if description is passed', () => {
    render(<ListCellFallback description />);
    expect(screen.getByTestId('list-cell-fallback-description')).toBeTruthy();
  });

  it('renders a Fallback component if detail is passed', () => {
    render(<ListCellFallback detail />);
    expect(screen.getByTestId('list-cell-fallback-detail')).toBeTruthy();
  });

  it('renders a Fallback component if subdetail is passed', () => {
    render(<ListCellFallback subdetail />);
    expect(screen.getByTestId('list-cell-fallback-detail')).toBeTruthy();
  });

  it('renders a Fallback component if title is passed', () => {
    render(<ListCellFallback title />);
    expect(screen.getByTestId('list-cell-fallback-title')).toBeTruthy();
  });

  it('renders a MediaFallback component if media is passed', () => {
    render(<ListCellFallback media="asset" />);
    expect(screen.getByTestId('list-cell-fallback-media')).toBeTruthy();
  });

  it('renders a Fallback component if helperText is passed', () => {
    render(<ListCellFallback helperText />);
    expect(screen.getByTestId('list-cell-fallback-helper-text')).toBeTruthy();
  });
});
