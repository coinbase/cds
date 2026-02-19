import { Animated, Pressable } from 'react-native';
import { useEventHandler } from '@coinbase/cds-common/hooks/useEventHandler';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Box } from '../../layout';
import { HStack } from '../../layout/HStack';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Button } from '../Button';

jest.mock('@coinbase/cds-common/hooks/useEventHandler');
jest.mock('../../utils/debounce');

describe('Button', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Button testID="mock-btn">Child</Button>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-btn')).toBeAccessible();
  });

  it('renders an animated view', () => {
    render(
      <DefaultThemeProvider>
        <Button>Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders a pressable', () => {
    render(
      <DefaultThemeProvider>
        <Button>Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.UNSAFE_queryAllByType(Pressable)).toHaveLength(1);
  });

  it('renders children text', () => {
    render(
      <DefaultThemeProvider>
        <Button>Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Child')).not.toBeNull();
  });

  it('fires `onPress` when pressed', () => {
    const spy = jest.fn();
    const onEventHandlerMock = jest.fn();
    (useEventHandler as jest.Mock).mockReturnValue(onEventHandlerMock);
    render(
      <DefaultThemeProvider>
        <Button onPress={spy}>Child</Button>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByText('Child'));

    expect(spy).toHaveBeenCalled();
  });

  it('debounce with onPress', () => {
    const spy = jest.fn();
    const onEventHandlerMock = jest.fn();
    (useEventHandler as jest.Mock).mockReturnValue(onEventHandlerMock);
    render(
      <DefaultThemeProvider>
        <Button debounceTime={500} onPress={spy}>
          Child
        </Button>
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByText('Child'));
    fireEvent.press(screen.getByText('Child'));
    fireEvent.press(screen.getByText('Child'));
    expect(spy).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(500);

    fireEvent.press(screen.getByText('Child'));
    fireEvent.press(screen.getByText('Child'));
    fireEvent.press(screen.getByText('Child'));
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('debounce with changing onPress and disableDebounce', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const onEventHandlerMock = jest.fn();
    (useEventHandler as jest.Mock).mockReturnValue(onEventHandlerMock);
    const { rerender } = render(
      <DefaultThemeProvider>
        <Button debounceTime={500} onPress={spy1}>
          Child
        </Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByText('Child');
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    expect(spy1).toHaveBeenCalledTimes(1);

    rerender(
      <DefaultThemeProvider>
        <Button debounceTime={500} onPress={spy2}>
          Child
        </Button>
      </DefaultThemeProvider>,
    );
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    expect(spy2).not.toHaveBeenCalled();

    jest.advanceTimersByTime(500);

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    expect(spy2).toHaveBeenCalledTimes(1);

    rerender(
      <DefaultThemeProvider>
        <Button disableDebounce debounceTime={500} onPress={spy2}>
          Child
        </Button>
      </DefaultThemeProvider>,
    );
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    expect(spy2).toHaveBeenCalledTimes(4);
  });

  it('Wraps children with a text component when using a string as children', () => {
    render(
      <DefaultThemeProvider>
        <Button>Child</Button>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('text-headline')).not.toBeNull();
  });

  it('Does not wrap children with a text component when using a ReactNode as children', () => {
    render(
      <DefaultThemeProvider>
        <Button>
          <HStack gap={1}>
            <Text font="title1">Title</Text>
            <Text font="title2">Subtitle</Text>
          </HStack>
        </Button>
      </DefaultThemeProvider>,
    );

    expect(screen.queryByTestId('text-headline')).toBeNull();
  });

  it('renders a button with a ReactNode as endIcon', () => {
    const CustomIcon = () => (
      <Box testID="custom-react-node">
        <Text font="title1">Custom Icon</Text>
      </Box>
    );
    render(
      <DefaultThemeProvider>
        <Button end={<CustomIcon />}>
          <Text font="title1">Child</Text>
        </Button>
      </DefaultThemeProvider>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
    expect(screen.getByTestId('custom-react-node')).not.toBeNull();
  });

  it('passes font props to internal text', () => {
    render(
      <DefaultThemeProvider>
        <Button
          font="body"
          fontFamily="title4"
          fontSize="caption"
          fontWeight="label1"
          lineHeight="display3"
        >
          Child
        </Button>
      </DefaultThemeProvider>,
    );

    const text = screen.UNSAFE_getByType(Text);
    expect(text.props.font).toBe('body');
    expect(text.props.fontFamily).toBe('title4');
    expect(text.props.fontSize).toBe('caption');
    expect(text.props.fontWeight).toBe('label1');
    expect(text.props.lineHeight).toBe('display3');
  });
});
