import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { SubBrandLogoMark } from '../SubBrandLogoMark';

describe('SubBrandLogoMark', () => {
  it('renders title by type', () => {
    render(
      <DefaultThemeProvider>
        <SubBrandLogoMark type="analytics" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Coinbase analytics logo')).toBeTruthy();
  });
});
