import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { CellAccessory } from '../CellAccessory';

describe('CellAccessory', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <CellAccessory type="more" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders a more', () => {
    render(
      <DefaultThemeProvider>
        <CellAccessory type="more" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'more');
  });

  it('renders an arrow', () => {
    render(
      <DefaultThemeProvider>
        <CellAccessory type="arrow" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'caretRight');
  });

  it('renders a selected', () => {
    render(
      <DefaultThemeProvider>
        <CellAccessory type="selected" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'checkmark');
  });
});
