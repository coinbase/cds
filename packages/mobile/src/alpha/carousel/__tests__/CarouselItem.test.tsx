import React from 'react';
import { Animated, Text, View } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { CarouselItem } from '../CarouselItem';

describe('CarouselItem.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('triggers onMount', () => {
    const onMount = jest.fn();
    render(
      <DefaultThemeProvider>
        <CarouselItem
          id="item1"
          index={0}
          onMount={onMount}
          paddingEnd={2}
          totalItems={3}
          width={50}
          xOffset={new Animated.Value(10)}
        >
          <Text>test</Text>
        </CarouselItem>
      </DefaultThemeProvider>,
    );

    fireEvent(screen.getByTestId('CarouselItemWrapper-item1'), 'layout', {
      nativeEvent: { layout: { height: 100 } },
    });

    expect(onMount).toHaveBeenCalledTimes(1);
  });

  it('triggers onDismiss', async () => {
    const mockMeasureInWindow = jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation((cb) => cb(0, 0, 1, 1));

    const onDismiss = jest.fn();
    const onDismissLastItem = jest.fn();

    render(
      <DefaultThemeProvider>
        <CarouselItem
          showDismiss
          id="item1"
          index={0}
          onDismiss={onDismiss}
          onDismissLastItem={onDismissLastItem}
          onMount={jest.fn()}
          paddingEnd={2}
          progressOpacity={new Animated.Value(0.5)}
          totalItems={2}
          width={50}
          xOffset={new Animated.Value(10)}
        >
          <Text>test</Text>
        </CarouselItem>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(onDismissLastItem).toHaveBeenCalledTimes(0);
    });
  });

  it('triggers onDismissLastItem', async () => {
    const mockMeasureInWindow = jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation((cb) => cb(0, 0, 1, 1));

    const onDismiss = jest.fn();
    const onDismissLastItem = jest.fn();

    render(
      <DefaultThemeProvider>
        <CarouselItem
          showDismiss
          id="item1"
          index={0}
          onDismiss={onDismiss}
          onDismissLastItem={onDismissLastItem}
          onMount={jest.fn()}
          paddingEnd={2}
          progressOpacity={new Animated.Value(0)}
          totalItems={1}
          width={50}
          xOffset={new Animated.Value(10)}
        >
          <Text>test</Text>
        </CarouselItem>
      </DefaultThemeProvider>,
    );

    fireEvent.press(screen.getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(onDismissLastItem).toHaveBeenCalledTimes(1);
    });
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <CarouselItem
          showDismiss
          dismissButtonAccessibilityHint="Dismiss this item"
          dismissButtonAccessibilityLabel="Dismiss"
          id="item1"
          index={0}
          onMount={jest.fn()}
          paddingEnd={2}
          totalItems={3}
          width={50}
          xOffset={new Animated.Value(10)}
        >
          <Text>test</Text>
        </CarouselItem>
      </DefaultThemeProvider>,
    );

    const carouselItem = screen.getByTestId('CarouselItemWrapper-item1');
    expect(carouselItem).toBeTruthy();
    expect(carouselItem).toBeAccessible();

    const dismissBtn = screen.getByTestId('CarouselItemDismiss-item1');
    expect(dismissBtn).toBeTruthy();
    expect(dismissBtn).toBeAccessible();
    expect(screen.getByLabelText('Dismiss')).toBeTruthy();
    expect(screen.getByHintText('Dismiss this item')).toBeTruthy();
  });
});
