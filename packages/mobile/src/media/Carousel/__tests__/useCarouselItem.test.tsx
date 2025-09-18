import { useCallback } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../../buttons';
import { Box } from '../../../layout';
import { Text } from '../../../typography/Text';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Carousel } from '../Carousel';
import { CarouselItemContext } from '../CarouselItemContext';
import { useCarouselItem } from '../useCarouselItem';

describe('useCarouselItem', () => {
  afterEach(cleanup);

  const MockCarouselItem = () => {
    const { id } = useCarouselItem();
    return (
      <Box height={200} width={200}>
        <Text font="body">{id}</Text>
      </Box>
    );
  };

  const MockCarousel = () => {
    const items = Array.from({ length: 4 }).map((_, i) => (
      <MockCarouselItem key={`carousel-item-${i}`} />
    ));

    return (
      <DefaultThemeProvider>
        <Carousel items={items} />
      </DefaultThemeProvider>
    );
  };

  it('logs an error if used outside of CarouselItemContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    renderHook(() => useCarouselItem());
    expect(spy).toHaveBeenCalledWith(
      'useCarouselItem: Cannot use `useCarouselItem` outside of Carousel component.',
    );
    spy.mockRestore();
  });

  it('returns an id value of -1 if used outside of CarouselItemContext', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation();
    const { result } = renderHook(() => useCarouselItem());
    expect(result.current.id).toBe('-1');
    spy.mockRestore();
  });

  it('returns an object with dismiss and id', () => {
    const dismissSpy = jest.fn();

    const Wrapper: React.FC<React.PropsWithChildren<unknown>> = ({ children }) => (
      <CarouselItemContext.Provider
        value={{
          id: 'item1',
          dismiss: dismissSpy,
        }}
      >
        {children}
      </CarouselItemContext.Provider>
    );
    const { result } = renderHook(() => useCarouselItem(), { wrapper: Wrapper });
    expect(result.current).toEqual({ id: 'item1', dismiss: dismissSpy });
  });

  it('returns the correct id', () => {
    render(<MockCarousel />);
    expect(screen.getByText('carousel-item-0')).not.toBeNull();
    expect(screen.getByText('carousel-item-1')).not.toBeNull();
    expect(screen.getByText('carousel-item-2')).not.toBeNull();
    expect(screen.getByText('carousel-item-3')).not.toBeNull();
  });

  it('handles dismiss', () => {
    const dismissSpy = jest.fn();
    const ChildWithPressable = () => {
      const { dismiss } = useCarouselItem();
      const handleDismiss = useCallback(() => dismiss(), [dismiss]);
      return (
        <Button onPress={handleDismiss} testID="DismissButton">
          Dismiss
        </Button>
      );
    };

    render(
      <DefaultThemeProvider>
        <CarouselItemContext.Provider
          value={{
            id: 'item1',
            dismiss: dismissSpy,
          }}
        >
          <ChildWithPressable />
        </CarouselItemContext.Provider>
      </DefaultThemeProvider>,
    );
    fireEvent.press(screen.getByTestId('DismissButton'));
    expect(dismissSpy).toHaveBeenCalled();
  });
});
