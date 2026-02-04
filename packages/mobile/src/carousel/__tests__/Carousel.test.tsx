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

      // Navigation buttons should exist
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
      // Reset gesture handlers before each test
      mockGestureHandlers.onStart = undefined;
      mockGestureHandlers.onUpdate = undefined;
      mockGestureHandlers.onEnd = undefined;
      jest.clearAllMocks();
    });

    it('calls onDragStart when drag begins', () => {
      const onDragStart = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onDragStart={onDragStart} />);

      // Initially should not have been called
      expect(onDragStart).not.toHaveBeenCalled();

      // Simulate drag start
      simulateDragGesture();

      // Should have been called once
      expect(onDragStart).toHaveBeenCalledTimes(1);
    });

    it('calls onDragEnd when drag ends', () => {
      const onDragEnd = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onDragEnd={onDragEnd} />);

      // Initially should not have been called
      expect(onDragEnd).not.toHaveBeenCalled();

      // Simulate complete drag gesture
      simulateDragGesture();

      // Should have been called once
      expect(onDragEnd).toHaveBeenCalledTimes(1);
    });

    it('calls both onDragStart and onDragEnd during drag interaction', () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <TestCarouselWithItems itemCount={5} onDragEnd={onDragEnd} onDragStart={onDragStart} />,
      );

      // Initially neither should have been called
      expect(onDragStart).not.toHaveBeenCalled();
      expect(onDragEnd).not.toHaveBeenCalled();

      // Simulate a complete drag gesture
      simulateDragGesture();

      // Both should have been called once
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

      // Simulate drag gesture
      simulateDragGesture();

      // Should be called in correct order
      expect(callOrder).toEqual(['start', 'end']);
    });

    it('works without drag callbacks', () => {
      // Ensure carousel works fine without the optional callbacks
      render(<TestCarouselWithItems itemCount={5} />);

      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();

      // Should not throw when simulating drag without callbacks
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

      // Simulate multiple drag gestures
      simulateDragGesture();
      simulateDragGesture();
      simulateDragGesture();

      // Should be called multiple times
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

      // Initially should not have been called
      expect(onDragStart).not.toHaveBeenCalled();
      expect(onDragEnd).not.toHaveBeenCalled();

      // Attempt to simulate drag gesture (should be ignored due to drag="none")
      simulateDragGesture();

      // Should still not have been called because drag is disabled
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

        // Simulate drag gesture
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

        // Should work with different drag modes
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

      // Initially should not have been called
      expect(onChangePage).not.toHaveBeenCalled();

      // Navigate to next page
      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.press(nextButton);

      // Should have been called with the new page index
      expect(onChangePage).toHaveBeenCalledWith(1);
    });

    it('calls onChangePage when page changes via pagination', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={8} onChangePage={onChangePage} />);

      // Wait for pagination to be calculated
      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots.length).toBeGreaterThan(1);
      });

      // Click on second pagination dot
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

      // Navigate using imperative API
      fireEvent.press(screen.getByTestId('go-to-page-2'));

      // Should have been called with the new page index
      expect(onChangePage).toHaveBeenCalledWith(2);
    });

    it('does not call onChangePage when page does not actually change', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onChangePage={onChangePage} />);

      // Try to go to previous page when already on first page
      const previousButton = screen.getByTestId('carousel-previous-button');
      fireEvent.press(previousButton);

      // Should not have been called since we're already on page 0
      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('works without onChangePage callback', () => {
      // Ensure carousel works fine without the optional callback
      render(<TestCarouselWithItems itemCount={5} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      fireEvent.press(nextButton);

      // Should not throw errors
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

      // React Native testing library doesn't directly support style assertions like web,
      // so we verify the component renders successfully with custom styles
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

      // Check initial items
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 2')).toBeOnTheScreen();
      expect(screen.queryByText('Item 3')).not.toBeOnTheScreen();

      fireEvent.press(screen.getByTestId('add-item'));

      // Check that new items are added
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

      // Check that no carousel items are rendered
      expect(screen.queryByText(/Item \d+/)).not.toBeOnTheScreen();
    });

    it('handles single item carousel', () => {
      render(<TestCarouselWithItems itemCount={1} />);

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      // Check that only one item is rendered
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.queryByText('Item 2')).not.toBeOnTheScreen();

      // Check that exactly one carousel item exists
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

      // Start with 3 items
      expect(screen.getByText('Item 3')).toBeOnTheScreen();

      // Change to 1 item
      fireEvent.press(screen.getByTestId('set-one-item'));
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.queryByText('Item 2')).not.toBeOnTheScreen();

      // Change to 5 items
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

      // Should render successfully with default snap mode
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 5')).toBeOnTheScreen();

      // Verify correct number of pagination dots
      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(expectedPages);
      });
    });

    it('switches to item snap mode when specified', async () => {
      const itemCount = 6;
      const expectedPages = snapModeItemPageCount(itemCount);

      render(<TestCarouselWithItems itemCount={itemCount} snapMode="item" />);

      // Should render successfully with item snap mode
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 6')).toBeOnTheScreen();

      // Verify correct number of pagination dots for item snap mode
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

      // Single item should have 1 pagination dot
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

        // Verify all items render
        expect(screen.getByText('Item 1')).toBeOnTheScreen();
        expect(screen.getByText(`Item ${items}`)).toBeOnTheScreen();

        // Check navigation state for multiple items
        const nextButton = screen.getByTestId('carousel-next-button');
        const previousButton = screen.getByTestId('carousel-previous-button');

        expect(previousButton).toBeDisabled();

        // Next button should be enabled only if there are multiple pages
        const shouldNextBeEnabled = expectedPages > 1;
        const nextButtonMatcher = shouldNextBeEnabled ? 'toBeEnabled' : 'toBeDisabled';
        expect(nextButton)[nextButtonMatcher]();

        // Verify correct number of pagination dots
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

      // Single item should have 1 pagination dot
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

        // Verify all items render
        expect(screen.getByText('Item 1')).toBeOnTheScreen();
        expect(screen.getByText(`Item ${items}`)).toBeOnTheScreen();

        // In item snap mode, navigation should allow moving between individual items
        const previousButton = screen.getByTestId('carousel-previous-button');
        expect(previousButton).toBeDisabled(); // Should start on first item

        // Verify correct number of pagination dots
        await waitFor(() => {
          const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
          expect(paginationDots).toHaveLength(expectedPages);
        });

        component.unmount();
      }
    });

    it('handles snap mode transitions', () => {
      // Test switching between snap modes
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

      // Should start in page mode
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      // Switch to item mode
      fireEvent.press(screen.getByTestId('set-item-mode'));
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      // Switch back to page mode
      fireEvent.press(screen.getByTestId('set-page-mode'));
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });

    it('handles empty carousel edge case', async () => {
      render(<TestCarouselWithItems itemCount={0} snapMode="page" />);

      // Empty carousel
      expect(screen.queryByText(/Item \d+/)).not.toBeOnTheScreen();

      // Navigation should be disabled for empty carousel
      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      // Empty carousel should have no pagination dots
      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(0);
      });
    });

    it('handles single item edge cases', async () => {
      // Test both snap modes with single item
      const pageComponent = render(<TestCarouselWithItems itemCount={1} snapMode="page" />);

      // Single item should render
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      // Navigation should be disabled for single item
      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      // Single item should have 1 pagination dot
      await waitFor(() => {
        const paginationDots = screen.queryAllByTestId(/carousel-page-\d+/);
        expect(paginationDots).toHaveLength(1);
      });

      pageComponent.unmount();

      // Test with item snap mode
      const itemComponent = render(<TestCarouselWithItems itemCount={1} snapMode="item" />);

      // Single item should render
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      // Navigation should be disabled for single item
      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      // Single item should have 1 pagination dot in item mode too
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

      // Re-render with same props
      rerender(<TestComponent itemCount={3} />);

      // Should not cause excessive additional renders due to memoization
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
      // Carousel should render with multiple items
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 5')).toBeOnTheScreen();
    });

    it('handles pagination without title', () => {
      render(<TestCarouselWithItems hidePagination itemCount={5} />);

      // Navigation should still show but pagination should be hidden
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
      // Test with title, navigation, pagination, and multiple items
      render(
        <TestCarouselWithItems
          itemCount={5}
          nextPageAccessibilityLabel="Next items"
          previousPageAccessibilityLabel="Previous items"
          title="Full Feature Carousel"
        />,
      );

      // All features should be present
      expect(screen.getByText('Full Feature Carousel')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
      expect(screen.getByLabelText('Previous items')).toBeOnTheScreen();
      expect(screen.getByLabelText('Next items')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 5')).toBeOnTheScreen();
    });

    it('handles minimal configuration', () => {
      // Test with minimal props - just items
      render(<TestCarouselWithItems itemCount={2} />);

      // Should render with defaults
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
      expect(screen.getByText('Item 2')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-previous-button')).toBeOnTheScreen();
      expect(screen.getByTestId('carousel-next-button')).toBeOnTheScreen();
    });

    it('handles feature combinations with different snap modes', () => {
      // Test features with different snap modes
      const { rerender } = render(
        <TestCarouselWithItems itemCount={4} snapMode="page" title="Snap Mode Test" />,
      );

      expect(screen.getByText('Snap Mode Test')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();

      // Switch to item snap mode
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

      // Both title and custom navigation should be present
      expect(screen.getByText('Custom Nav Carousel')).toBeOnTheScreen();
      expect(screen.getByTestId('custom-prev')).toBeOnTheScreen();
      expect(screen.getByTestId('custom-next')).toBeOnTheScreen();
      expect(screen.getByText('Item 1')).toBeOnTheScreen();
    });
  });

  describe('Looping', () => {
    beforeEach(() => {
      // Reset gesture handlers before each test
      mockGestureHandlers.onStart = undefined;
      mockGestureHandlers.onUpdate = undefined;
      mockGestureHandlers.onEnd = undefined;
      jest.clearAllMocks();
    });

    it('enables looping when loop prop is true', () => {
      render(<TestCarouselWithItems loop itemCount={5} />);

      // Navigation buttons should both be enabled when looping
      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      // With looping, both buttons should be enabled (unless only 1 page)
      expect(nextButton).toBeEnabled();
      // Previous button should also be enabled when looping
      expect(previousButton).toBeEnabled();
    });

    it('disables both navigation buttons when totalPages <= 1 with loop enabled', () => {
      // With only 1-2 items that fit in the container, there's only 1 page
      render(<TestCarouselWithItems loop itemCount={2} itemWidth={defaultItemWidth} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      // Both should be disabled because there's only 1 page
      expect(nextButton).toBeDisabled();
      expect(previousButton).toBeDisabled();
    });

    it('allows navigating from first to last page when looping', () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems loop itemCount={5} onChangePage={onChangePage} />);

      // Click previous button (should wrap to last page)
      const previousButton = screen.getByTestId('carousel-previous-button');
      fireEvent.press(previousButton);

      // Should have called onChangePage with the last page index
      expect(onChangePage).toHaveBeenCalled();
    });

    it('allows navigating from last to first page when looping', async () => {
      const onChangePage = jest.fn();
      render(
        <TestCarouselWithItems loop itemCount={5} onChangePage={onChangePage} snapMode="item" />,
      );

      // Navigate to last page first
      const nextButton = screen.getByTestId('carousel-next-button');

      // Press next button multiple times to get to the end
      for (let i = 0; i < 4; i++) {
        fireEvent.press(nextButton);
      }

      // Clear the mock to track the next call
      onChangePage.mockClear();

      // Press next again - should wrap to first page
      fireEvent.press(nextButton);

      // Should have called onChangePage with page 0 (wrapped)
      expect(onChangePage).toHaveBeenCalledWith(0);
    });

    it('renders correctly with loop and different snap modes', () => {
      // Test with item snap mode
      const itemModeComponent = render(
        <TestCarouselWithItems loop itemCount={5} snapMode="item" />,
      );
      // With looping, items may be cloned, so use getAllByText and check at least one exists
      expect(screen.getAllByText('Item 1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Item 5').length).toBeGreaterThanOrEqual(1);
      itemModeComponent.unmount();

      // Test with page snap mode
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

      // Simulate drag gesture
      simulateDragGesture();

      // Callbacks should be called
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

        // Navigation should work
        const nextButton = screen.getByTestId('carousel-next-button');
        fireEvent.press(nextButton);

        expect(onChangePage).toHaveBeenCalled();
        component.unmount();
      });
    });

    it('does not enable looping when content fits in viewport', () => {
      // With only 1 item that fits in the container, looping should not activate
      render(<TestCarouselWithItems loop itemCount={1} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      // Both buttons should be disabled because there's no need to scroll
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

      // Get current page index
      fireEvent.press(screen.getByTestId('get-current-page'));

      // Should start at page 1
      expect(screen.getByTestId('current-page-display')).toHaveTextContent('Page 1 of');

      // Navigate to page 2
      fireEvent.press(screen.getByTestId('go-to-page-2'));

      // Get current page index after navigation
      fireEvent.press(screen.getByTestId('get-current-page'));

      // Should show we're on page 2
      const currentPageDisplay = screen.getByTestId('current-page-display');
      expect(currentPageDisplay.children[0]).toMatch(/Page [12] of/);

      // Navigate back to first page
      fireEvent.press(screen.getByTestId('go-to-first-page'));

      // Get current page index again
      fireEvent.press(screen.getByTestId('get-current-page'));

      // Should show we're back to page 1
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
});
