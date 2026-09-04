import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { Box } from '../../../layout';
import { Text } from '../../../typography/Text';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Carousel } from '../Carousel';

describe('Carousel', () => {
  const itemSize = 200;
  const itemsLength = 3;
  const onReadySpy = jest.fn();

  const MockCarousel = () => {
    const items = Array.from({ length: itemsLength }).map((_, index) => (
      <Box key={`item${index}`} height={itemSize} width={itemSize}>
        <Text font="body">CarouselItem</Text>
      </Box>
    ));
    return (
      <DefaultThemeProvider>
        <Carousel items={items} onReady={onReadySpy} />
      </DefaultThemeProvider>
    );
  };

  afterEach(cleanup);

  it('passes a11y', () => {
    render(<MockCarousel />);
    expect(screen.getByTestId('Carousel')).toBeAccessible();
  });

  it('renders children', () => {
    render(<MockCarousel />);
    const items = screen.queryAllByText('CarouselItem');
    expect(items).toHaveLength(itemsLength);
  });

  it('handles onReady', async () => {
    render(<MockCarousel />);
    expect(onReadySpy).not.toHaveBeenCalled();
    await waitFor(async () =>
      Promise.all([
        ...Array.from({ length: itemsLength }).map(async (_, i) => {
          fireEvent(screen.getByTestId(`CarouselItemWrapper-item${i}`), 'onLayout', {
            nativeEvent: { layout: { x: itemSize * i } },
          });
        }),
        ...Array.from({ length: itemsLength }).map(async (_, i) => {
          fireEvent(screen.getByTestId(`CarouselItemInner-item${i}`), 'onLayout', {
            nativeEvent: { layout: { width: itemSize } },
          });
        }),
      ]),
    );
    expect(onReadySpy).toHaveBeenCalled();
  });

  it('does apply paddingEnd if it is not the last item', () => {
    render(<MockCarousel />);
    expect(screen.getByTestId(`CarouselItemInner-item0`)).toHaveStyle({
      paddingEnd: 24,
    });
  });

  it('does not apply paddingEnd to the last item', () => {
    render(<MockCarousel />);
    expect(screen.getByTestId(`CarouselItemInner-item${itemsLength - 1}`)).toHaveStyle({
      paddingEnd: 0,
    });
  });
});
