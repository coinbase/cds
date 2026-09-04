import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { AndroidNavigationBar } from '../AndroidNavigationBar';

describe('AndroidNavigationBar.test', () => {
  it('returns null', () => {
    render(
      <DefaultThemeProvider>
        <AndroidNavigationBar />
      </DefaultThemeProvider>,
    );

    expect(screen.toJSON()).toBeNull();
  });
});
