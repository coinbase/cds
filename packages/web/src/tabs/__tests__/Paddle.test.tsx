import { render } from '@testing-library/react';

import { IconButton } from '../../buttons/IconButton';
import { DefaultThemeProvider } from '../../utils/test';
import { Paddle } from '../Paddle';

jest.mock('../../buttons/IconButton', () => ({
  ...jest.requireActual('../../buttons/IconButton'),
  IconButton: jest.fn(() => null),
}));

const mockIconButton = IconButton as unknown as jest.Mock;

const renderPaddle = (size?: 'xs' | 's' | 'm' | 'l') => {
  render(
    <DefaultThemeProvider>
      <Paddle
        accessibilityLabel="Next"
        direction="right"
        onClick={jest.fn()}
        show
        size={size}
        variant="secondary"
      />
    </DefaultThemeProvider>,
  );

  return mockIconButton.mock.calls[0][0];
};

describe('Paddle', () => {
  beforeEach(() => {
    mockIconButton.mockClear();
  });

  describe('size', () => {
    it('forwards the provided size to the paddle icon button', () => {
      expect(renderPaddle('xs').size).toBe('xs');
    });

    // Consumers like TabNavigation rely on the IconButton default, so an unset
    // size must not be coerced to a concrete value here.
    it('leaves size unset when no size is provided', () => {
      expect(renderPaddle().size).toBeUndefined();
    });
  });
});
