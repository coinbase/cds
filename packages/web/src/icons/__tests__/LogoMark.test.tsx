import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { LogoMark } from '../LogoMark';

describe('LogoMark', () => {
  it('renders', () => {
    render(
      <DefaultThemeProvider>
        <LogoMark />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByText('Coinbase logo')).toBeTruthy();
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <LogoMark />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });
});
