import { useCallback, useMemo } from 'react';
import { ScrollView } from 'react-native';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../../buttons';
import { Box } from '../../../layout';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Carousel } from '../Carousel';
import { useCarousel } from '../useCarousel';

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView');

describe('useCarousel', () => {
  afterEach(cleanup);

  const scrollToValue = 2;

  const MockCarousel = ({ length }: { length: number }) => {
    const carouselRef = useCarousel();
    const handleLogLength = useCallback(
      () => console.log(`Carousel length: ${carouselRef.current.length}`),
      [carouselRef],
    );
    const handleScrollTo = useCallback(
      () => carouselRef.current.scrollToId(scrollToValue),
      [carouselRef],
    );
    const handleScrollToEnd = useCallback(() => carouselRef.current.scrollToEnd(), [carouselRef]);
    const items = useMemo(
      () =>
        Array.from({ length }).map((_, i) => (
          <Box key={`carousel-item-${i}`} height={200} width={200} />
        )),
      [length],
    );

    return (
      <DefaultThemeProvider>
        <Button disableDebounce onPress={handleLogLength} testID="LogLength">
          Log Length
        </Button>
        <Button onPress={handleScrollTo} testID="ScrollTo">
          Trigger ScrollTo
        </Button>
        <Button onPress={handleScrollToEnd} testID="ScrollToEnd">
          Trigger ScrollToEnd
        </Button>
        <Carousel carouselRef={carouselRef} items={items} />
      </DefaultThemeProvider>
    );
  };

  it('exposes length of carousel items', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation();
    render(<MockCarousel length={3} />);
    fireEvent.press(screen.getByTestId('LogLength'));
    expect(spy).toHaveBeenCalledWith('Carousel length: 3');

    screen.rerender(<MockCarousel length={4} />);

    fireEvent.press(screen.getByTestId('LogLength'));
    expect(spy).toHaveBeenCalledWith('Carousel length: 4');
  });

  it('exposes scrollToId', async () => {
    render(<MockCarousel length={3} />);
    fireEvent.press(screen.getByTestId('ScrollTo'));
    expect(screen.UNSAFE_getByType(ScrollView).instance.scrollTo).toHaveBeenCalled();
  });

  it('exposes scrollToEnd', async () => {
    render(<MockCarousel length={3} />);
    fireEvent.press(screen.getByTestId('ScrollToEnd'));
    expect(screen.UNSAFE_getByType(ScrollView).instance.scrollToEnd).toHaveBeenCalled();
  });
});
