import React from 'react';
import { View } from 'react-native';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { AnnouncementCard } from '../../../cards/AnnouncementCard';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import type { CarouselRef } from '../Carousel';
import { Carousel } from '../Carousel';

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaFrame: jest.fn().mockReturnValue({ width: 200 }),
  };
});

const mockScrollTo = jest.fn();
const mockScrollToEnd = jest.fn();

jest.mock('../../../hooks/useScrollTo', () => {
  return {
    useScrollTo: jest.fn(() => [
      { current: null },
      {
        scrollTo: mockScrollTo,
        scrollToEnd: mockScrollToEnd,
      },
    ]),
  };
});

describe('Carousel.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <Carousel
          showDismiss
          dismissButtonAccessibilityHint="Dismiss announcement"
          dismissButtonAccessibilityLabel="Dismiss"
          items={[
            <AnnouncementCard key="item1" description="Item1 description" title="Item1 title" />,
            <AnnouncementCard key="item2" description="Item2 description" title="Item2 title" />,
          ]}
          onDismissItem={jest.fn()}
          onDismissLastItem={jest.fn()}
          testID="mock-carousel"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('mock-carousel')).toBeAccessible();

    ['item1', 'item2'].forEach((key, index) => {
      expect(screen.queryByTestId(`CarouselItemDismiss-${key}`)).toBeAccessible();
      expect(screen.getAllByLabelText('Dismiss')[index]).toBeTruthy();
      expect(screen.getAllByHintText('Dismiss announcement')[index]).toBeTruthy();
    });
  });

  it('renders items', () => {
    render(
      <DefaultThemeProvider>
        <Carousel
          items={[
            <AnnouncementCard key="item1" description="Item1 description" title="Item1 title" />,
            <AnnouncementCard key="item2" description="Item2 description" title="Item2 title" />,
          ]}
          onDismissItem={jest.fn()}
          onDismissLastItem={jest.fn()}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Item1 title')).toBeTruthy();
    expect(screen.getByText('Item1 description')).toBeTruthy();
    expect(screen.getByText('Item2 title')).toBeTruthy();
    expect(screen.getByText('Item2 description')).toBeTruthy();
    expect(screen.queryByTestId('Carousel-progress')).toBeNull();
    expect(screen.queryByTestId('CarouselItemDismiss-item1')).toBeNull();
  });

  it('renders progress and dismiss', () => {
    render(
      <DefaultThemeProvider>
        <Carousel
          showDismiss
          showProgress
          items={[
            <AnnouncementCard key="item1" description="Item1 description" title="Item1 title" />,
            <AnnouncementCard key="item2" description="Item2 description" title="Item2 title" />,
          ]}
          onDismissItem={jest.fn()}
          onDismissLastItem={jest.fn()}
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('Carousel-progress')).toBeTruthy();
    expect(screen.getByTestId('CarouselItemDismiss-item1')).toBeTruthy();
    expect(screen.getByTestId('CarouselItemDismiss-item2')).toBeTruthy();
  });

  it('triggers onDismiss', async () => {
    const mockMeasureInWindow = jest
      .spyOn(View.prototype, 'measureInWindow')
      .mockImplementation((cb) => cb(0, 0, 1, 1));

    const onDismissItem = jest.fn();
    const onDismissLastItem = jest.fn();

    render(
      <DefaultThemeProvider>
        <Carousel
          showDismiss
          showProgress
          items={[
            <AnnouncementCard key="item1" description="Item1 description" title="Item1 title" />,
            <AnnouncementCard key="item2" description="Item2 description" title="Item2 title" />,
          ]}
          onDismissItem={onDismissItem}
          onDismissLastItem={onDismissLastItem}
        />
      </DefaultThemeProvider>,
    );

    // dismiss first item
    fireEvent.press(screen.getByTestId('CarouselItemDismiss-item1'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(onDismissItem).toHaveBeenCalledWith('item1');
    });

    await waitFor(() => {
      expect(onDismissLastItem).toHaveBeenCalledTimes(0);
    });

    // dismiss last item
    fireEvent.press(screen.getByTestId('CarouselItemDismiss-item2'));

    expect(mockMeasureInWindow).toHaveBeenCalledTimes(2);
    await waitFor(() => {
      expect(onDismissItem).toHaveBeenCalledWith('item2');
    });

    await waitFor(() => {
      expect(onDismissLastItem).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(mockScrollToEnd).toHaveBeenCalledTimes(1);
    });
  });

  it('triggers scroll', () => {
    const ref = React.createRef<CarouselRef>();

    render(
      <DefaultThemeProvider>
        <Carousel
          showDismiss
          showProgress
          carouselRef={ref as React.MutableRefObject<CarouselRef>}
          itemWidth={300}
          items={[
            <AnnouncementCard key="item1" description="Item1 description" title="Item1 title" />,
            <AnnouncementCard key="item2" description="Item2 description" title="Item2 title" />,
          ]}
          onDismissItem={jest.fn()}
          onDismissLastItem={jest.fn()}
        />
      </DefaultThemeProvider>,
    );

    ref.current?.scrollToId('item2');

    expect(mockScrollTo).toHaveBeenCalledWith({ x: 300 });
    expect(mockScrollTo).toHaveBeenCalledTimes(1);

    ref.current?.scrollTo({ x: 200 });

    expect(mockScrollTo).toHaveBeenCalledWith({ x: 200 });
    expect(mockScrollTo).toHaveBeenCalledTimes(2);

    ref.current?.scrollToEnd();
    expect(mockScrollToEnd).toHaveBeenCalledTimes(1);
  });
});
