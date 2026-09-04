import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { LogoWordmark } from '../LogoWordmark';

describe('LogoWordmark', () => {
  it('renders', () => {
    render(
      <DefaultThemeProvider>
        <LogoWordmark />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('img')).toBeTruthy();
    expect(screen.getByText('Coinbase logo')).toBeTruthy();
  });
});
