import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { debounce } from '../../utils/debounce';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { IconButton } from '../IconButton';

jest.mock('../../utils/debounce');

(debounce as jest.Mock).mockImplementation((fn) => fn);

const name = 'allTimeHigh';

describe('IconButton', () => {
  it('passes accessibility', async () => {
    render(
      <DefaultThemeProvider>
        <IconButton accessibilityLabel="test-label" name={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeAccessible();
  });

  it('renders an accessibility label', () => {
    render(
      <DefaultThemeProvider>
        <IconButton accessibilityLabel="test-label" name={name} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByLabelText('test-label')).toBeTruthy();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton name={name} onPress={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(spy).toHaveBeenCalled();
  });

  it('disables user interaction when disabled', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton disabled name={name} onPress={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(spy).not.toHaveBeenCalled();
    expect(screen.getByRole('button')).toBeAccessible({
      // disable 'disabled-state-required' since it's flagging passing disabled
      // to Interactable and unclear if we're lacking a11y affordances here
      customViolationHandler: (violations) => {
        return violations.filter(
          (v) =>
            v.problem !== "This component has a disabled state but it isn't exposed to the user",
        );
      },
    });
  });

  it('disables user interaction when loading', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconButton loading accessibilityLabel="click me" name={name} onPress={spy} />
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByRole('button'));

    expect(spy).not.toHaveBeenCalled();
    // Check that the accessibility label includes ", loading" when loading is true
    expect(screen.getByLabelText('click me, loading')).toBeTruthy();
    // we want to check that loading state maps to busy accessibility state but
    // that's not actually covered by react-native-accessibility-engine yet
    expect(screen.getByRole('button')).toBeAccessible();
  });

  it('passes down testID', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} testID="test-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-test-id')).toBeTruthy();
  });

  it('does not render ProgressCircle when not loading', () => {
    render(
      <DefaultThemeProvider>
        <IconButton name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('icon-button-progress-circle')).toBeNull();
  });

  it('renders ProgressCircle when loading', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-button-progress-circle')).toBeTruthy();
  });

  it('renders Icon with overridden iconSize', () => {
    const { UNSAFE_getAllByType } = render(
      <DefaultThemeProvider>
        <>
          <IconButton accessibilityLabel="extra-small icon" iconSize="xs" name={name} />
          <IconButton accessibilityLabel="medium icon" iconSize="m" name={name} />
        </>
      </DefaultThemeProvider>,
    );

    const [xsIcon, mediumIcon] = UNSAFE_getAllByType(Text);

    expect(xsIcon.props.style[0].fontSize).toBeLessThan(mediumIcon.props.style[0].fontSize);
  });

  it('handles loading state without accessibility label', () => {
    render(
      <DefaultThemeProvider>
        <IconButton loading name={name} testID="icon-button" />
      </DefaultThemeProvider>,
    );

    const button = screen.getByRole('button');
    // Should be "loading" when no accessibility label is provided
    expect(button.props.accessibilityLabel).toBe(', loading');
  });

  describe('size', () => {
    const getGeometry = () => {
      const node = screen
        .UNSAFE_getAllByProps({})
        .find(
          (n) =>
            n.props &&
            n.props.feedback !== undefined &&
            n.props.padding !== undefined &&
            n.props.borderRadius !== undefined,
        );
      return {
        padding: node?.props.padding,
        borderRadius: node?.props.borderRadius,
        feedback: node?.props.feedback,
      };
    };

    it('defaults to the "s" geometry (padding 1.5, feedback light) via compact-by-default', () => {
      render(
        <DefaultThemeProvider>
          <IconButton name={name} />
        </DefaultThemeProvider>,
      );
      expect(getGeometry()).toEqual({ padding: 1.5, borderRadius: 1000, feedback: 'light' });
    });

    it('resolves each t-shirt size to the expected geometry', () => {
      const cases = [
        { size: 'xs', expected: { padding: 1, borderRadius: 1000, feedback: 'light' } },
        { size: 's', expected: { padding: 1.5, borderRadius: 1000, feedback: 'light' } },
        { size: 'm', expected: { padding: 1.5, borderRadius: 1000, feedback: 'normal' } },
        { size: 'l', expected: { padding: 2, borderRadius: 1000, feedback: 'normal' } },
      ] as const;

      cases.forEach(({ size, expected }) => {
        const { unmount } = render(
          <DefaultThemeProvider>
            <IconButton name={name} size={size} />
          </DefaultThemeProvider>,
        );
        expect(getGeometry()).toEqual(expected);
        unmount();
      });
    });

    it('renders `compact` alone as the "s" geometry (padding 1.5, feedback light)', () => {
      render(
        <DefaultThemeProvider>
          <IconButton compact name={name} />
        </DefaultThemeProvider>,
      );
      expect(getGeometry()).toEqual({ padding: 1.5, borderRadius: 1000, feedback: 'light' });
    });

    it('renders `compact={false}` as the "l" geometry (padding 2, feedback normal)', () => {
      render(
        <DefaultThemeProvider>
          <IconButton compact={false} name={name} />
        </DefaultThemeProvider>,
      );
      expect(getGeometry()).toEqual({ padding: 2, borderRadius: 1000, feedback: 'normal' });
    });

    it('lets `size` win over `compact` for geometry', () => {
      render(
        <DefaultThemeProvider>
          <IconButton compact name={name} size="m" />
        </DefaultThemeProvider>,
      );
      expect(getGeometry()).toEqual({ padding: 1.5, borderRadius: 1000, feedback: 'normal' });
    });

    it('lets explicit style props override the size-derived defaults', () => {
      render(
        <DefaultThemeProvider>
          <IconButton feedback="heavy" name={name} padding={3} size="xs" />
        </DefaultThemeProvider>,
      );
      const geometry = getGeometry();
      expect(geometry.padding).toBe(3);
      expect(geometry.feedback).toBe('heavy');
    });
  });

  it('applies styles.icon to the inner icon glyph', () => {
    const customIconStyle = { fontSize: 99 };
    const { UNSAFE_getAllByType } = render(
      <DefaultThemeProvider>
        <IconButton name={name} styles={{ icon: customIconStyle }} />
      </DefaultThemeProvider>,
    );

    const [iconText] = UNSAFE_getAllByType(Text);
    // Mobile Icon builds iconStyle as [baseStyles, styles?.icon]
    expect(iconText.props.style[1]).toEqual(customIconStyle);
  });
});
