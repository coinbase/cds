import { render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { StickyFooter } from '../StickyFooter';

jest.mock('../../hooks/useSafeBottomPadding', () => {
  return {
    useSafeBottomPadding: jest.fn().mockReturnValue(0),
  };
});

describe('StickyFooter', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <StickyFooter />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('sticky-footer')).toBeAccessible();
  });
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <StickyFooter>
          <Button>Action</Button>
        </StickyFooter>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Action')).toBeTruthy();
  });
});
