import React, { useRef, useState } from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Carousel, type CarouselImperativeHandle, useCarouselContext } from '../Carousel';
import { CarouselItem } from '../CarouselItem';

// Mock react-native-gesture-handler with gesture simulation capabilities
const mockGestureHandlers: {
  onStart?: () => void;
  onUpdate?: (event: { translationX: number }) => void;
  onEnd?: (event: { translationX: number; velocityX: number }) => void;
} = {};

type MockPanGesture = {
  onStart: jest.Mock;
  onUpdate: jest.Mock;
  onEnd: jest.Mock;
  runOnJS: jest.Mock;
  activeOffsetX: jest.Mock;
  activeOffsetY: jest.Mock;
  failOffsetX: jest.Mock;
  failOffsetY: jest.Mock;
};

const mockPanGesture: MockPanGesture = {
  onStart: jest.fn((handler: () => void): MockPanGesture => {
    mockGestureHandlers.onStart = handler;
    return mockPanGesture;
  }),
  onUpdate: jest.fn((handler: (event: { translationX: number }) => void): MockPanGesture => {
    mockGestureHandlers.onUpdate = handler;
    return mockPanGesture;
  }),
  onEnd: jest.fn(
    (handler: (event: { translationX: number; velocityX: number }) => void): MockPanGesture => {
      mockGestureHandlers.onEnd = handler;
      return mockPanGesture;
    },
  ),
  runOnJS: jest.fn().mockReturnThis(),
  activeOffsetX: jest.fn().mockReturnThis(),
  activeOffsetY: jest.fn().mockReturnThis(),
  failOffsetX: jest.fn().mockReturnThis(),
  failOffsetY: jest.fn().mockReturnThis(),
};

jest.mock('react-native-gesture-handler', () => ({
  Gesture: {
    Pan: () => mockPanGesture,
  },
  GestureDetector: ({ children }: { children: React.ReactNode }) => children,
}));

// Helper function to simulate drag gestures
const simulateDragGesture = (translationX = 100, velocityX = 0): void => {
  act(() => {
    if (mockGestureHandlers.onStart) {
      mockGestureHandlers.onStart();
    }
    if (mockGestureHandlers.onUpdate) {
      mockGestureHandlers.onUpdate({ translationX });
    }
    if (mockGestureHandlers.onEnd) {
      mockGestureHandlers.onEnd({ translationX, velocityX });
    }
  });
};

// Mock @react-spring/native
jest.mock('@react-spring/native', () => ({
  animated: {
    View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useSpring: () => ({
    x: {
      start: jest.fn(),
      set: jest.fn(),
      to: jest.fn(() => 0),
    },
  }),
}));

const containerWidth = 400;
const defaultItemWidth = 200;

// Mock useLayout hook to provide deterministic dimensions
jest.mock('../../hooks/useLayout', () => ({
  useLayout: () => {
    const mockOnLayout = jest.fn(() => {});
    return [{ width: containerWidth, height: 200, x: 0, y: 0 }, mockOnLayout];
  },
}));

const TestCarouselWithItems = ({
  itemCount = 3,
  itemWidth = defaultItemWidth,
  ...carouselProps
}: any) => {
  return (
    <DefaultThemeProvider>
      <Carousel {...carouselProps}>
        {Array.from({ length: itemCount }, (_, index) => {
          const itemId = `item-${index}`;
          return (
            <MockCarouselItem key={itemId} id={itemId} itemIndex={index} width={itemWidth}>
              <Box height={100} testID={`carousel-item-${itemId}`} width={itemWidth}>
                <Text>Item {index + 1}</Text>
              </Box>
            </MockCarouselItem>
          );
        })}
      </Carousel>
    </DefaultThemeProvider>
  );
};

const MockCarouselItem = ({ children, id, itemIndex, width = defaultItemWidth, ...props }: any) => {
  const { registerItem } = useCarouselContext();

  React.useEffect(() => {
    // Auto-register mock dimensions when component mounts
    const mockRect = {
      x: itemIndex * width,
      y: 0,
      width: width,
      height: 200,
    };

    registerItem(id, mockRect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, itemIndex, width]);

  return (
    <Box testID={`carousel-item-${id}`} width={width} {...props}>
      {children}
    </Box>
  );
};

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 2')).toBeOnTheScreen();
      expect(screen.getByText('Item 3')).toBeOnTheScreen();
    });

    it('renders with title', () => {
      render(<TestCarouselWithItems itemCount={3} title="My Carousel" />);

      expect(screen.getByText('My Carousel')).toBeOnTheScreen();
    });

    it('renders with custom title component', () => {
      const customTitle = <Text testID="custom-title">Custom Title</Text>;
      render(<TestCarouselWithItems itemCount={3} title={customTitle} />);

      expect(screen.getByTestId('custom-title')).toBeOnTheScreen();
      expect(screen.getByText('Custom Title')).toBeOnTheScreen();
    });

    it('shows navigation by default', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
    });

    it('hides navigation when hideNavigation is true', () => {
      render(<TestCarouselWithItems hideNavigation itemCount={3} />);

      expect(screen.queryByTestId('carousel-previous-button')).not.toBeOnTheScreen();
      expect(screen.queryByTestId('carousel-next-button')).not.toBeOnTheScreen();
    });

    it('shows pagination by default', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      // The pagination component should render even if no pages are calculated yet
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
    });

    it('hides pagination when hidePagination is true', () => {
      render(<TestCarouselWithItems hidePagination itemCount={3} />);

      // With hidePagination, we should not see the pagination container
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen(); // Navigation still shows
    });
  });

  describe('Navigation State', () => {
    it('disables previous button on first page', () => {
      render(<TestCarouselWithItems itemCount={5} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      expect(previousButton).toBeDisabled();
    });

    it('disables next button when no pages calculated', () => {
      render(<TestCarouselWithItems itemCount={1} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      expect(nextButton).toBeDisabled();
    });

    it('shows navigation buttons correctly', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      const previousButton = screen.getByTestId('carousel-previous-button');

      expect(nextButton).toBeOnTheScreen();
      expect(previousButton).toBeOnTheScreen();
    });
  });

  describe('Custom Components', () => {
    it('renders custom navigation component', () => {
      const CustomNavigation = ({ onGoPrevious, onGoNext }: any) => (
        <VStack>
          <Text onPress={onGoPrevious} testID="custom-prev">
            Custom Prev
          </Text>
          <Text onPress={onGoNext} testID="custom-next">
            Custom Next
          </Text>
        </VStack>
      );

      render(<TestCarouselWithItems NavigationComponent={CustomNavigation} itemCount={3} />);

      expect(screen.getByTestId('custom-prev')).toBeOnTheScreen();
      expect(screen.getByTestId('custom-next')).toBeOnTheScreen();
    });

    it('renders custom pagination component', () => {
      const CustomPagination = ({ totalPages, activePageIndex }: any) => (
        <Text testID="custom-pagination">
          Custom Pagination: {activePageIndex + 1} of {totalPages}
        </Text>
      );

      render(<TestCarouselWithItems PaginationComponent={CustomPagination} itemCount={5} />);

      expect(screen.getByTestId('custom-pagination')).toBeOnTheScreen();
    });

    it('passes correct props to custom navigation component', () => {
      const mockNavigation = jest.fn(
        ({ onGoNext, onGoPrevious, disableGoNext, disableGoPrevious }) => (
          <VStack>
            <Text onPress={disableGoPrevious ? undefined : onGoPrevious} testID="custom-prev">
              Previous
            </Text>
            <Text onPress={disableGoNext ? undefined : onGoNext} testID="custom-next">
              Next
            </Text>
          </VStack>
        ),
      );

      render(<TestCarouselWithItems NavigationComponent={mockNavigation} itemCount={5} />);

      expect(mockNavigation).toHaveBeenCalledWith(
        expect.objectContaining({
          onGoNext: expect.any(Function),
          onGoPrevious: expect.any(Function),
          disableGoNext: expect.any(Boolean),
          disableGoPrevious: expect.any(Boolean),
        }),
        {},
      );
    });
  });

  describe('Accessibility', () => {
    it('is accessible', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByText('Item 1')).toBeAccessible();
    });

    it('applies custom accessibility labels', () => {
      render(
        <TestCarouselWithItems
          itemCount={3}
          nextPageAccessibilityLabel="Go to next set of items"
          previousPageAccessibilityLabel="Go to previous set of items"
        />,
      );

      expect(screen.getByLabelText('Go to next set of items')).toBeOnTheScreen();
      expect(screen.getByLabelText('Go to previous set of items')).toBeOnTheScreen();
    });

    it('applies default accessibility labels', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByLabelText('Previous page')).toBeOnTheScreen();
      expect(screen.getByLabelText('Next page')).toBeOnTheScreen();
    });

    it('supports touch interactions', () => {
      render(<TestCarouselWithItems itemCount={5} />);

      const nextButton = screen.getByTestId('carousel-next-button');

      // Should be able to press the button without errors
      fireEvent.press(nextButton);
      expect(nextButton).toBeOnTheScreen();
    });
  });

  describe('Drag Callbacks', () => {
    beforeEach(() => {
      mockGestureHandlers.onStart = undefined;
      mockGestureHandlers.onUpdate = undefined;
      mockGestureHandlers.onEnd = undefined;
      jest.clearAllMocks();
    });

    it('calls onDragStart when drag begins', () => {
      const onDragStart = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onDragStart={onDragStart} />);

      expect(onDragStart).not.toHaveBeenCalled();

      simulateDragGesture();

      expect(onDragStart).toHaveBeenCalledTimes(1);
    });

    it('calls onDragEnd when drag ends', () => {
      const onDragEnd = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onDragEnd={onDragEnd} />);

      expect(onDragEnd).not.toHaveBeenCalled();

      simulateDragGesture();

      expect(onDragEnd).toHaveBeenCalledTimes(1);
    });

    it('calls both onDragStart and onDragEnd during drag interaction', () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <TestCarouselWithItems itemCount={5} onDragEnd={onDragEnd} onDragStart={onDragStart} />,
      );

      expect(onDragStart).not.toHaveBeenCalled();
      expect(onDragEnd).not.toHaveBeenCalled();

      simulateDragGesture();

      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
    });

    it('calls onDragStart and onDragEnd in correct order', () => {
      const callOrder: string[] = [];
      const onDragStart = jest.fn(() => callOrder.push('start'));
      const onDragEnd = jest.fn(() => callOrder.push('end'));

      render(
        <TestCarouselWithItems itemCount={5} onDragEnd={onDragEnd} onDragStart={onDragStart} />,
      );

      simulateDragGesture();

      expect(callOrder).toEqual(['start', 'end']);
    });

    it('works without drag callbacks', () => {
      render(<TestCarouselWithItems itemCount={5} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();

      expect(() => {
        act(() => {
          if (mockGestureHandlers.onStart) {
            mockGestureHandlers.onStart();
          }
          if (mockGestureHandlers.onUpdate) {
            mockGestureHandlers.onUpdate({ translationX: 100 });
          }
          if (mockGestureHandlers.onEnd) {
            mockGestureHandlers.onEnd({ translationX: 100, velocityX: 0 });
          }
        });
      }).not.toThrow();
    });

    it('handles multiple drag gestures', () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <TestCarouselWithItems itemCount={5} onDragEnd={onDragEnd} onDragStart={onDragStart} />,
      );

      simulateDragGesture();
      simulateDragGesture();
      simulateDragGesture();

      expect(onDragStart).toHaveBeenCalledTimes(3);
      expect(onDragEnd).toHaveBeenCalledTimes(3);
    });

    it('does not call drag callbacks when drag is disabled', () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <TestCarouselWithItems
          drag="none"
          itemCount={5}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        />,
      );

      expect(onDragStart).not.toHaveBeenCalled();
      expect(onDragEnd).not.toHaveBeenCalled();

      simulateDragGesture();

      expect(onDragStart).not.toHaveBeenCalled();
      expect(onDragEnd).not.toHaveBeenCalled();
    });

    it('handles drag callbacks with different drag modes', () => {
      const testCases = ['free', 'snap'] as const;

      testCases.forEach((dragMode) => {
        const onDragStart = jest.fn();
        const onDragEnd = jest.fn();

        const component = render(
          <TestCarouselWithItems
            drag={dragMode}
            itemCount={5}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
          />,
        );

        act(() => {
          if (mockGestureHandlers.onStart) {
            mockGestureHandlers.onStart();
          }
          if (mockGestureHandlers.onUpdate) {
            mockGestureHandlers.onUpdate({ translationX: 100 });
          }
          if (mockGestureHandlers.onEnd) {
            mockGestureHandlers.onEnd({ translationX: 100, velocityX: 0 });
          }
        });

        expect(onDragStart).toHaveBeenCalledTimes(1);
        expect(onDragEnd).toHaveBeenCalledTimes(1);

        component.unmount();
      });
    });
  });

  describe('Page Change Callback', () => {
    it('calls onChangePage when page changes via navigation', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onChangePage={onChangePage} />);

      expect(onChangePage).not.toHaveBeenCalled();

      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.press(nextButton);

      expect(onChangePage).toHaveBeenCalledWith(1);
    });

    it('calls onChangePage when page changes via pagination', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={8} onChangePage={onChangePage} />);

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots.length).toBeGreaterThan(1);
      });

      const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
      expect(paginationDots.length).toBeGreaterThan(1);

      fireEvent.press(paginationDots[1]);
      expect(onChangePage).toHaveBeenCalledWith(1);
    });

    it('calls onChangePage when using imperative goToPage', () => {
      const onChangePage = jest.fn();

      const TestCarouselWithImperativeRef = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);

        const handleGoToPage = () => {
          if (carouselRef.current) {
            carouselRef.current.goToPage(2);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <Text onPress={handleGoToPage} testID="go-to-page-2">
                Go to Page 2
              </Text>
              <Carousel ref={carouselRef} onChangePage={onChangePage}>
                {Array.from({ length: 8 }, (_, index) => {
                  const itemId = `item-${index}`;
                  return (
                    <MockCarouselItem key={itemId} id={itemId} itemIndex={index} width={200}>
                      <Box height={100} testID={`carousel-item-${itemId}`} width={200}>
                        <Text>Item {index + 1}</Text>
                      </Box>
                    </MockCarouselItem>
                  );
                })}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      render(<TestCarouselWithImperativeRef />);

      fireEvent.press(screen.getByTestId('go-to-page-2'));

      expect(onChangePage).toHaveBeenCalledWith(2);
    });

    it('does not call onChangePage when page does not actually change', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onChangePage={onChangePage} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      fireEvent.press(previousButton);

      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('works without onChangePage callback', () => {
      render(<TestCarouselWithItems itemCount={5} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.press(nextButton);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });
  });

  describe('Styling', () => {
    it('applies custom styles', () => {
      render(
        <TestCarouselWithItems
          itemCount={3}
          style={{ backgroundColor: 'red' }}
          styles={{
            root: { padding: 20 },
            carousel: { gap: 10 },
          }}
        />,
      );

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });

    it('renders items with correct test IDs', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getAllByTestId('carousel-item-item-0').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('carousel-item-item-1').length).toBeGreaterThan(0);
      expect(screen.getAllByTestId('carousel-item-item-2').length).toBeGreaterThan(0);
    });
  });

  describe('Dynamic Content', () => {
    it('handles dynamic item addition', () => {
      const DynamicCarousel = () => {
        const [itemCount, setItemCount] = useState(2);

        return (
          <DefaultThemeProvider>
            <VStack>
              <Text onPress={() => setItemCount((itemCount) => itemCount + 1)} testID="add-item">
                Add Item
              </Text>
              <TestCarouselWithItems itemCount={itemCount} />
            </VStack>
          </DefaultThemeProvider>
        );
      };

      render(<DynamicCarousel />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 2')).toBeOnTheScreen();
      expect(screen.queryByText('Item 3')).not.toBeOnTheScreen();

      fireEvent.press(screen.getByTestId('add-item'));

      expect(screen.getByText('Item 3')).toBeOnTheScreen();
      expect(screen.queryByText('Item 4')).not.toBeOnTheScreen();
    });

    it('renders empty carousel gracefully', () => {
      render(
        <DefaultThemeProvider>
          <Carousel />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();
      expect(screen.queryByText(/Item \d+/)).not.toBeOnTheScreen();
    });

    it('handles single item carousel', () => {
      render(<TestCarouselWithItems itemCount={1} />);

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.queryByText('Item 2')).not.toBeOnTheScreen();

      const carouselItems = screen.getAllByTestId(/carousel-item-item-/);
      expect(carouselItems.length).toBeGreaterThanOrEqual(1);
    });

    it('handles different item counts dynamically', () => {
      const DynamicItemCountCarousel = () => {
        const [itemCount, setItemCount] = useState(3);

        return (
          <DefaultThemeProvider>
            <VStack>
              <Text onPress={() => setItemCount(1)} testID="set-one-item">
                One Item
              </Text>
              <Text onPress={() => setItemCount(5)} testID="set-five-items">
                Five Items
              </Text>
              <TestCarouselWithItems itemCount={itemCount} />
            </VStack>
          </DefaultThemeProvider>
        );
      };

      render(<DynamicItemCountCarousel />);

      expect(screen.getByText('Item 3')).toBeOnTheScreen();

      fireEvent.press(screen.getByTestId('set-one-item'));
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.queryByText('Item 2')).not.toBeOnTheScreen();

      fireEvent.press(screen.getByTestId('set-five-items'));
      expect(screen.getByText('Item 5')).toBeOnTheScreen();
    });
  });

  describe('Snap Modes', () => {
    const snapModeItemPageCount = (itemCount: number) => {
      const itemsPerPage = Math.floor(containerWidth / defaultItemWidth);
      return Math.max(1, itemCount - itemsPerPage + 1);
    };

    const snapModePageCount = (itemCount: number) => {
      return Math.ceil((itemCount * defaultItemWidth) / containerWidth);
    };

    it('uses page snap mode by default', async () => {
      const itemCount = 5;
      const expectedPages = snapModePageCount(itemCount);

      render(<TestCarouselWithItems itemCount={itemCount} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 5')).toBeOnTheScreen();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(expectedPages);
      });
    });

    it('switches to item snap mode when specified', async () => {
      const itemCount = 6;
      const expectedPages = snapModeItemPageCount(itemCount);

      render(<TestCarouselWithItems itemCount={itemCount} snapMode="item" />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 6')).toBeOnTheScreen();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(expectedPages);
      });
    });

    it('calculates pages correctly for page snap mode with single item', async () => {
      render(<TestCarouselWithItems itemCount={1} snapMode="page" />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(1);
      });
    });

    it('calculates pages correctly for page snap mode with multiple items', async () => {
      const testCases = [2, 3, 5, 8];

      for (const items of testCases) {
        const expectedPages = snapModePageCount(items);
        const component = render(<TestCarouselWithItems itemCount={items} snapMode="page" />);

        expect(screen.getByText('Item 1')).toBeOnTheScreen();
        expect(screen.getByText(`Item ${items}`)).toBeOnTheScreen();

        const nextButton = screen.getByTestId('carousel-next-button');
        const previousButton = screen.getByTestId('carousel-previous-button');

        expect(previousButton).toBeDisabled();

        const shouldNextBeEnabled = expectedPages > 1;
        const nextButtonMatcher = shouldNextBeEnabled ? 'toBeEnabled' : 'toBeDisabled';
        expect(nextButton)[nextButtonMatcher]();

        await waitFor(() => {
          const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
          expect(paginationDots).toHaveLength(expectedPages);
        });

        component.unmount();
      }
    });

    it('calculates pages correctly for item snap mode with single item', async () => {
      render(<TestCarouselWithItems itemCount={1} snapMode="item" />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(1);
      });
    });

    it('calculates pages correctly for item snap mode with multiple items', async () => {
      const testCases = [2, 3, 5, 8];

      for (const items of testCases) {
        const expectedPages = snapModeItemPageCount(items);
        const component = render(<TestCarouselWithItems itemCount={items} snapMode="item" />);

        expect(screen.getByText('Item 1')).toBeOnTheScreen();
        expect(screen.getByText(`Item ${items}`)).toBeOnTheScreen();

        const previousButton = screen.getByTestId('carousel-previous-button');
        expect(previousButton).toBeDisabled();

        await waitFor(() => {
          const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
          expect(paginationDots).toHaveLength(expectedPages);
        });

        component.unmount();
      }
    });

    it('handles snap mode transitions', () => {
      const SnapModeTest = () => {
        const [snapMode, setSnapMode] = useState<'page' | 'item'>('page');

        return (
          <DefaultThemeProvider>
            <VStack>
              <Text onPress={() => setSnapMode('page')} testID="set-page-mode">
                Page Mode
              </Text>
              <Text onPress={() => setSnapMode('item')} testID="set-item-mode">
                Item Mode
              </Text>
              <TestCarouselWithItems itemCount={5} snapMode={snapMode} />
            </VStack>
          </DefaultThemeProvider>
        );
      };

      render(<SnapModeTest />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      fireEvent.press(screen.getByTestId('set-item-mode'));
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      fireEvent.press(screen.getByTestId('set-page-mode'));
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });

    it('handles empty carousel edge case', async () => {
      render(<TestCarouselWithItems itemCount={0} snapMode="page" />);

      expect(screen.queryByText(/Item \d+/)).not.toBeOnTheScreen();

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(0);
      });
    });

    it('handles single item edge cases', async () => {
      const pageComponent = render(<TestCarouselWithItems itemCount={1} snapMode="page" />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(1);
      });

      pageComponent.unmount();

      const itemComponent = render(<TestCarouselWithItems itemCount={1} snapMode="item" />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(1);
      });

      itemComponent.unmount();
    });
  });

  describe('Performance', () => {
    it('does not cause excessive re-renders', () => {
      const renderSpy = jest.fn();
      const TestComponent = (props: any) => {
        renderSpy();
        return <TestCarouselWithItems {...props} />;
      };

      const { rerender } = render(<TestComponent itemCount={3} />);

      const initialRenderCount = renderSpy.mock.calls.length;

      rerender(<TestComponent itemCount={3} />);

      expect(renderSpy.mock.calls.length).toBe(initialRenderCount + 1);
    });
  });

  describe('Component Integration', () => {
    it('handles title and navigation together', () => {
      render(<TestCarouselWithItems itemCount={3} title="Test Carousel" />);

      expect(screen.getByText('Test Carousel')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
    });

    it('handles title without navigation', () => {
      render(<TestCarouselWithItems hideNavigation itemCount={3} title="Test Carousel" />);

      expect(screen.getByText('Test Carousel')).toBeOnTheScreen();
      expect(screen.queryByTestId('carousel-previous-button')).not.toBeOnTheScreen();
      expect(screen.queryByTestId('carousel-next-button')).not.toBeOnTheScreen();
    });

    it('handles navigation without title', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
      expect(screen.queryByText('Test Carousel')).not.toBeOnTheScreen();
    });

    it('handles title with pagination', () => {
      render(<TestCarouselWithItems itemCount={5} title="Test Carousel" />);

      expect(screen.getByText('Test Carousel')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 5')).toBeOnTheScreen();
    });

    it('handles pagination without title', () => {
      render(<TestCarouselWithItems hidePagination itemCount={5} />);

      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });

    it('handles different item widths', () => {
      const { rerender } = render(<TestCarouselWithItems itemCount={3} itemWidth={150} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      rerender(<TestCarouselWithItems itemCount={3} itemWidth={300} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });

    it('handles all features together', () => {
      render(
        <TestCarouselWithItems
          itemCount={5}
          nextPageAccessibilityLabel="Next items"
          previousPageAccessibilityLabel="Previous items"
          title="Full Feature Carousel"
        />,
      );

      expect(screen.getByText('Full Feature Carousel')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
      expect(screen.getByLabelText('Previous items')).toBeOnTheScreen();
      expect(screen.getByLabelText('Next items')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 5')).toBeOnTheScreen();
    });

    it('handles minimal configuration', () => {
      render(<TestCarouselWithItems itemCount={2} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 2')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
    });

    it('handles feature combinations with different snap modes', () => {
      const { rerender } = render(
        <TestCarouselWithItems itemCount={4} snapMode="page" title="Snap Mode Test" />,
      );

      expect(screen.getByText('Snap Mode Test')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      rerender(<TestCarouselWithItems itemCount={4} snapMode="item" title="Snap Mode Test" />);

      expect(screen.getByText('Snap Mode Test')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });

    it('handles custom components with feature combinations', () => {
      const CustomNavigation = ({ onGoPrevious, onGoNext }: any) => (
        <VStack>
          <Text onPress={onGoPrevious} testID="custom-prev">
            Prev
          </Text>
          <Text onPress={onGoNext} testID="custom-next">
            Next
          </Text>
        </VStack>
      );

      render(
        <TestCarouselWithItems
          NavigationComponent={CustomNavigation}
          itemCount={3}
          title="Custom Nav Carousel"
        />,
      );

      expect(screen.getByText('Custom Nav Carousel')).toBeOnTheScreen();
      expect(screen.getByTestId('custom-prev')).toBeOnTheScreen();
      expect(screen.getByTestId('custom-next')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });
  });

  describe('Looping', () => {
    beforeEach(() => {
      mockGestureHandlers.onStart = undefined;
      mockGestureHandlers.onUpdate = undefined;
      mockGestureHandlers.onEnd = undefined;
      jest.clearAllMocks();
    });

    it('enables looping when loop prop is true', () => {
      render(<TestCarouselWithItems loop itemCount={5} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      expect(nextButton).toBeEnabled();
      expect(previousButton).toBeEnabled();
    });

    it('disables both navigation buttons when totalPages <= 1 with loop enabled', () => {
      render(<TestCarouselWithItems loop itemCount={2} itemWidth={defaultItemWidth} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      expect(nextButton).toBeDisabled();
      expect(previousButton).toBeDisabled();
    });

    it('allows navigating from first to last page when looping', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems loop itemCount={5} onChangePage={onChangePage} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      fireEvent.press(previousButton);

      expect(onChangePage).toHaveBeenCalled();
    });

    it('allows navigating from last to first page when looping', async () => {
      const onChangePage = jest.fn();
      render(
        <TestCarouselWithItems loop itemCount={5} onChangePage={onChangePage} snapMode="item" />,
      );

      const nextButton = screen.getByTestId('carousel-next-button');

      for (let i = 0; i < 4; i++) {
        fireEvent.press(nextButton);
      }

      onChangePage.mockClear();

      fireEvent.press(nextButton);

      expect(onChangePage).toHaveBeenCalledWith(0);
    });

    it('renders correctly with loop and different snap modes', () => {
      const itemModeComponent = render(
        <TestCarouselWithItems loop itemCount={5} snapMode="item" />,
      );
      expect(screen.getAllByText('Item 1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Item 5').length).toBeGreaterThanOrEqual(1);
      itemModeComponent.unmount();

      const pageModeComponent = render(
        <TestCarouselWithItems loop itemCount={5} snapMode="page" />,
      );
      expect(screen.getAllByText('Item 1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Item 5').length).toBeGreaterThanOrEqual(1);
      pageModeComponent.unmount();
    });

    it('handles drag callbacks when looping', () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <TestCarouselWithItems
          loop
          itemCount={5}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        />,
      );

      simulateDragGesture();

      expect(onDragStart).toHaveBeenCalledTimes(1);
      expect(onDragEnd).toHaveBeenCalledTimes(1);
    });

    it('works with different drag modes when looping', () => {
      const testCases = ['free', 'snap'] as const;

      testCases.forEach((dragMode) => {
        const onChangePage = jest.fn();
        const component = render(
          <TestCarouselWithItems loop drag={dragMode} itemCount={5} onChangePage={onChangePage} />,
        );

        const nextButton = screen.getByTestId('carousel-next-button');
        fireEvent.press(nextButton);

        expect(onChangePage).toHaveBeenCalled();
        component.unmount();
      });
    });

    it('does not enable looping when content fits in viewport', () => {
      render(<TestCarouselWithItems loop itemCount={1} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      expect(nextButton).toBeDisabled();
      expect(previousButton).toBeDisabled();
    });
  });

  describe('Imperative Handle', () => {
    it('exposes activePageIndex, totalPages, and goToPage through ref', async () => {
      const TestCarouselWithRef = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);
        const [currentPageInfo, setCurrentPageInfo] = useState<string>('');

        const handleGetCurrentPage = () => {
          if (carouselRef.current) {
            const { activePageIndex, totalPages } = carouselRef.current;
            setCurrentPageInfo(`Page ${activePageIndex + 1} of ${totalPages}`);
          }
        };

        const handleGoToPage = (pageIndex: number) => {
          if (carouselRef.current) {
            carouselRef.current.goToPage(pageIndex);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <Text onPress={handleGetCurrentPage} testID="get-current-page">
                Get Current Page
              </Text>
              <Text onPress={() => handleGoToPage(0)} testID="go-to-first-page">
                Go to First Page
              </Text>
              <Text onPress={() => handleGoToPage(1)} testID="go-to-page-2">
                Go to Page 2
              </Text>
              <Text testID="current-page-display">{currentPageInfo}</Text>
              <Carousel ref={carouselRef}>
                {Array.from({ length: 8 }, (_, index) => {
                  const itemId = `item-${index}`;
                  return (
                    <MockCarouselItem key={itemId} id={itemId} itemIndex={index} width={200}>
                      <Box height={100} testID={`carousel-item-${itemId}`} width={200}>
                        <Text>Item {index + 1}</Text>
                      </Box>
                    </MockCarouselItem>
                  );
                })}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      render(<TestCarouselWithRef />);

      fireEvent.press(screen.getByTestId('get-current-page'));

      expect(screen.getByTestId('current-page-display')).toHaveTextContent('Page 1 of');

      fireEvent.press(screen.getByTestId('go-to-page-2'));

      fireEvent.press(screen.getByTestId('get-current-page'));

      const currentPageDisplay = screen.getByTestId('current-page-display');
      expect(currentPageDisplay.children[0]).toMatch(/Page [12] of/);

      fireEvent.press(screen.getByTestId('go-to-first-page'));

      fireEvent.press(screen.getByTestId('get-current-page'));

      expect(screen.getByTestId('current-page-display')).toHaveTextContent('Page 1 of');
    });
  });

  describe('Render Props', () => {
    it('supports render props pattern in CarouselItem', () => {
      render(
        <DefaultThemeProvider>
          <Carousel>
            <CarouselItem id="render-props-item" width={200}>
              {({ isVisible }) => (
                <Box testID="render-props-content">
                  <Text>Content</Text>
                  <Text testID="visibility-indicator">{isVisible ? 'visible' : 'hidden'}</Text>
                </Box>
              )}
            </CarouselItem>
          </Carousel>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('render-props-content')).toBeOnTheScreen();
      expect(screen.getByTestId('visibility-indicator')).toBeOnTheScreen();
      expect(screen.getByText('Content')).toBeOnTheScreen();
    });

    it('supports both regular children and render props', () => {
      render(
        <DefaultThemeProvider>
          <Carousel>
            <CarouselItem id="regular-item" width={200}>
              <Box testID="regular-content">
                <Text>Regular Content</Text>
              </Box>
            </CarouselItem>
            <CarouselItem id="render-props-item" width={200}>
              {({ isVisible }: { isVisible: boolean }) => (
                <Box testID="render-props-content">
                  <Text>Render Props Content</Text>
                  <Text testID="visibility-status">{isVisible ? 'visible' : 'hidden'}</Text>
                </Box>
              )}
            </CarouselItem>
          </Carousel>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('regular-content')).toBeOnTheScreen();
      expect(screen.getByTestId('render-props-content')).toBeOnTheScreen();
      expect(screen.getByText('Regular Content')).toBeOnTheScreen();
      expect(screen.getByText('Render Props Content')).toBeOnTheScreen();
      expect(screen.getByTestId('visibility-status')).toBeOnTheScreen();
    });
  });

  describe('Autoplay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
      mockGestureHandlers.onStart = undefined;
      mockGestureHandlers.onUpdate = undefined;
      mockGestureHandlers.onEnd = undefined;
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('does not autoplay by default', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onChangePage={onChangePage} />);

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('enables autoplay when autoplay prop is true', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(onChangePage).toHaveBeenCalledWith(1);
    });

    it('respects custom autoplayInterval', () => {
      const onChangePage = jest.fn();
      render(
        <TestCarouselWithItems
          autoplay
          autoplayInterval={5000}
          itemCount={5}
          onChangePage={onChangePage}
        />,
      );

      act(() => {
        jest.advanceTimersByTime(4000);
      });

      expect(onChangePage).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(onChangePage).toHaveBeenCalledWith(1);
    });

    it('shows autoplay toggle button when autoplay is enabled', () => {
      render(<TestCarouselWithItems autoplay itemCount={5} />);

      expect(screen.getByTestId('carousel-autoplay-button')).toBeOnTheScreen();
    });

    it('applies custom autoplay accessibility labels and toggles them on press', () => {
      render(
        <TestCarouselWithItems
          autoplay
          itemCount={5}
          startAutoplayAccessibilityLabel="Resume slideshow"
          stopAutoplayAccessibilityLabel="Pause slideshow"
        />,
      );

      expect(screen.getByLabelText('Pause slideshow')).toBeOnTheScreen();

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      fireEvent.press(autoplayButton);
      expect(screen.getByLabelText('Resume slideshow')).toBeOnTheScreen();

      fireEvent.press(autoplayButton);
      expect(screen.getByLabelText('Pause slideshow')).toBeOnTheScreen();
    });

    it('applies default autoplay accessibility labels and toggles them on press', () => {
      render(<TestCarouselWithItems autoplay itemCount={5} />);

      expect(screen.getByLabelText('Pause Carousel')).toBeOnTheScreen();

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      fireEvent.press(autoplayButton);
      expect(screen.getByLabelText('Play Carousel')).toBeOnTheScreen();

      fireEvent.press(autoplayButton);
      expect(screen.getByLabelText('Pause Carousel')).toBeOnTheScreen();
    });

    it('toggles autoplay when toggle button is pressed', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      fireEvent.press(autoplayButton);

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(onChangePage).not.toHaveBeenCalled();

      fireEvent.press(autoplayButton);

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(onChangePage).toHaveBeenCalled();
    });

    it('resets autoplay progress when manually navigating via next button', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.press(nextButton);

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(onChangePage).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(onChangePage).toHaveBeenCalled();
    });

    it('resets autoplay progress when manually navigating via previous button', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay loop itemCount={5} onChangePage={onChangePage} />);

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      const prevButton = screen.getByTestId('carousel-previous-button');
      fireEvent.press(prevButton);

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('resets autoplay progress when clicking pagination dots', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={8} onChangePage={onChangePage} />);

      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots.length).toBeGreaterThan(1);
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
      fireEvent.press(paginationDots[1]);

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('continues autoplay after manual navigation (does not stop)', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.press(nextButton);

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(3000);
      });

      expect(onChangePage).toHaveBeenCalled();
    });

    it('loops to first page when autoplay reaches the last page', () => {
      const onChangePage = jest.fn();
      render(
        <TestCarouselWithItems
          autoplay
          autoplayInterval={1000}
          itemCount={3}
          onChangePage={onChangePage}
          snapMode="item"
        />,
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      expect(onChangePage).toHaveBeenCalledWith(0);
    });
  });
});
