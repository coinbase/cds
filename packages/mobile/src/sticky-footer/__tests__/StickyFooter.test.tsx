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

  it('applies default padding values', () => {
    render(
      <DefaultThemeProvider>
        <StickyFooter />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('sticky-footer')).toHaveStyle({
      paddingTop: 24,
      paddingStart: 24,
      paddingEnd: 24,
    });
    expect(screen.getByTestId('sticky-footer')).not.toHaveStyle({ paddingBottom: 16 });
  });

  it('applies compact top padding', () => {
    render(
      <DefaultThemeProvider>
        <StickyFooter compact />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('sticky-footer')).toHaveStyle({
      paddingTop: 16,
      paddingStart: 24,
      paddingEnd: 24,
    });
    expect(screen.getByTestId('sticky-footer')).not.toHaveStyle({ paddingBottom: 16 });
  });
});
