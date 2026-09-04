import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Toast } from '../Toast';

const TEXT = 'Toast copy';
const MOCK_A11Y_LABEL = 'We can jam';
const MOCK_CLOSE_LABEL = 'We can slam';
const MOCK_A11Y_PROPS = { accessibilityLabel: MOCK_CLOSE_LABEL };
const mockAction = {
  label: 'Action',
  onPress: jest.fn(),
  testID: 'toast-action',
};

describe('Toast', () => {
  it('passes a11y', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Toast text="toast copy" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders text and close button', async () => {
    render(
      <DefaultThemeProvider>
        <Toast text={TEXT} />
      </DefaultThemeProvider>,
    );

    await waitFor(async () => {
      expect(screen.getByText(TEXT)).toBeVisible();
    });
    await waitFor(async () => {
      expect(await screen.findByTestId('cds-toast-close-button')).toBeVisible();
    });
    await waitFor(async () => {
      expect(await screen.findByTestId('cds-toast-close-button')).toHaveAccessibleName('close');
    });
  });

  it('renders action', () => {
    render(
      <DefaultThemeProvider>
        <Toast action={mockAction} text={TEXT} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId(mockAction.testID));
    expect(mockAction.onPress).toHaveBeenCalledTimes(1);
  });

  it('has correct styles at the end of animation', async () => {
    render(
      <DefaultThemeProvider>
        <Toast action={mockAction} testID="mock-toast" text={TEXT} />
      </DefaultThemeProvider>,
    );

    await waitFor(() =>
      expect(screen.getByTestId('mock-toast-motion')).toHaveStyle({
        opacity: 1,
        transform: 'none',
      }),
    );
  });

  it('has the correct a11y role', async () => {
    render(
      <DefaultThemeProvider>
        <Toast testID="mock-toast" text={TEXT} />
      </DefaultThemeProvider>,
    );

    expect(await screen.findByTestId('mock-toast')).toHaveAttribute('role', 'alert');
  });

  it('can provide a11y props', async () => {
    render(
      <DefaultThemeProvider>
        <Toast
          accessibilityLabel={MOCK_A11Y_LABEL}
          action={mockAction}
          closeButtonAccessibilityProps={MOCK_A11Y_PROPS}
          testID="mock-toast"
          text={TEXT}
        />
      </DefaultThemeProvider>,
    );

    expect(await screen.findByTestId('mock-toast-close-button')).toHaveAccessibleName(
      MOCK_CLOSE_LABEL,
    );
    expect(await screen.findByTestId('mock-toast')).toHaveAccessibleName(MOCK_A11Y_LABEL);
  });
});
