import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

describe('SubBrandLogoWordmark', () => {
  it('renders title by type', () => {
    render(
      <DefaultThemeProvider>
        <SubBrandLogoWordmark type="analytics" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
