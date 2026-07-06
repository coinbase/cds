import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { TextFallback } from '../TextFallback';

describe('TextFallback', () => {
  it('renders with font-based height', () => {
    render(
      <DefaultThemeProvider>
        <TextFallback font="headline" testID="text-fallback" width={100} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('text-fallback')).toBeTruthy();
  });
});
