import React, { useEffect, useRef, useState } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Box } from '../../layout/Box';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import type { CarouselImperativeHandle } from '../Carousel';
import { Carousel } from '../Carousel';
import { CarouselItem } from '../CarouselItem';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const realFramerMotion = jest.requireActual('framer-motion');

  // Helper to create a mock MotionValue with all required methods
  const createMockMotionValue = (initialValue: number) => ({
    get: jest.fn(() => initialValue),
    set: jest.fn(),
    on: jest.fn(() => () => {}), // Returns unsubscribe function
    onChange: jest.fn(() => () => {}),
    clearListeners: jest.fn(),
  });

  return {
    ...realFramerMotion,
    LazyMotion: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    domMax: {},
    m: {
      ...realFramerMotion.m,
      div: jest.fn().mockImplementation(({ children, ...props }) => {
        // Filter out framer-motion specific props that shouldn't be passed to DOM
        const {
          animate,
          initial,
          drag,
          dragControls,
          dragConstraints,
          dragTransition,
          whileDrag,
          _dragX,
          style,
          ...domProps
        } = props;
        return (
          <div {...domProps} style={style}>
            {children}
          </div>
        );
      }),
    },
    // Mock the animate function for animating MotionValues directly
    animate: jest.fn((motionValue, target, options) => {
      // Simulate the animation by setting the value immediately
      if (motionValue && typeof motionValue.set === 'function') {
        motionValue.set(target);
      }
      return { stop: jest.fn() };
    }),
    useAnimation: () => ({
      start: jest.fn(),
      stop: jest.fn(),
      set: jest.fn(),
    }),
    useMotionValue: (initialValue: number) => createMockMotionValue(initialValue),
    useTransform: (value: { get: () => number }, transformer: (v: number) => number) => {
      // Return a mock MotionValue that applies the transformer
      const transformedValue = transformer(value.get());
      return createMockMotionValue(transformedValue);
    },
    useDragControls: () => ({
      start: jest.fn(),
    }),
    useMotionValueEvent: jest.fn(),
  };
});

// Mock ResizeObserver with proper functionality
const mockResizeObserver = jest.fn();
let resizeCallbacks: Array<(entries: any[]) => void> = [];

const containerWidth = 800;
const defaultItemWidth = 200;

mockResizeObserver.mockImplementation((callback) => {
  resizeCallbacks.push(callback);
  return {
    observe: jest.fn((element) => {
      // Mock element dimensions immediately
      Object.defineProperty(element, 'offsetWidth', { value: containerWidth, writable: true });
      Object.defineProperty(element, 'offsetHeight', { value: 400, writable: true });
      Object.defineProperty(element, 'offsetLeft', { value: 0, writable: true });
      Object.defineProperty(element, 'offsetTop', { value: 0, writable: true });

      // For carousel items, set specific positions
      if (element.getAttribute && element.getAttribute('data-testid')?.includes('carousel-item')) {
        const itemIndex = parseInt(element.getAttribute('data-testid').split('-').pop() || '0');
        Object.defineProperty(element, 'offsetLeft', {
          value: itemIndex * defaultItemWidth,
          writable: true,
        });
        Object.defineProperty(element, 'offsetWidth', { value: defaultItemWidth, writable: true });
      }

      // Trigger callback immediately to simulate dimensions being available
      setTimeout(() => {
        act(() => {
          callback([
            {
              target: element,
              contentRect: { width: containerWidth, height: 400 },
            },
          ]);
        });
      }, 0);
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(() => {
      resizeCallbacks = [];
    }),
  };
});

window.ResizeObserver = mockResizeObserver;

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
            <CarouselItem key={itemId} id={itemId} width={itemWidth}>
              <Box data-testid={`carousel-item-content-${itemId}`} height={100} width={itemWidth}>
                <Text>Item {index + 1}</Text>
              </Box>
            </CarouselItem>
          );
        })}
      </Carousel>
    </DefaultThemeProvider>
  );
};

describe('Carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Item 3')).toBeInTheDocument();
    });

    it('renders with title', () => {
      render(<TestCarouselWithItems itemCount={3} title="My Carousel" />);

      expect(screen.getByText('My Carousel')).toBeInTheDocument();
    });

    it('renders with custom title component', () => {
      const customTitle = <Text data-testid="custom-title">Custom Title</Text>;
      render(<TestCarouselWithItems itemCount={3} title={customTitle} />);

      expect(screen.getByTestId('custom-title')).toBeInTheDocument();
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('shows navigation by default', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByTestId('carousel-previous-button')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-next-button')).toBeInTheDocument();
    });

    it('hides navigation when hideNavigation is true', () => {
      render(<TestCarouselWithItems hideNavigation itemCount={3} />);

      expect(screen.queryByTestId('carousel-previous-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-next-button')).not.toBeInTheDocument();
    });

    it('shows pagination by default', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      // Look for the carousel container
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('hides pagination when hidePagination is true', () => {
      render(<TestCarouselWithItems hidePagination itemCount={3} />);

      // With hidePagination, navigation should still show but pagination should be hidden
      expect(screen.getByTestId('carousel-previous-button')).toBeInTheDocument();
    });
  });

  describe('Navigation State', () => {
    it('disables previous button on first page', () => {
      render(<TestCarouselWithItems itemCount={5} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      expect(previousButton).toBeDisabled();
    });

    it('shows navigation buttons correctly', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      const previousButton = screen.getByTestId('carousel-previous-button');

      expect(nextButton).toBeInTheDocument();
      expect(previousButton).toBeInTheDocument();
    });

    it('navigates to next page when next button is clicked', async () => {
      const user = userEvent.setup();
      render(<TestCarouselWithItems itemCount={5} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      const previousButton = screen.getByTestId('carousel-previous-button');

      expect(previousButton).toBeDisabled();

      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      expect(previousButton).toBeDisabled();

      await user.click(nextButton);

      await waitFor(() => {
        expect(previousButton).not.toBeDisabled();
      });
    });

    it('navigates to previous page when previous button is clicked', async () => {
      const user = userEvent.setup();
      render(<TestCarouselWithItems itemCount={5} />);

      const nextButton = screen.getByTestId('carousel-next-button');
      const previousButton = screen.getByTestId('carousel-previous-button');

      await waitFor(() => {
        expect(previousButton).toBeDisabled();
      });
      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      await user.click(nextButton);

      await waitFor(() => {
        expect(previousButton).not.toBeDisabled();
      });

      await user.click(previousButton);

      await waitFor(() => {
        expect(previousButton).toBeDisabled();
      });
    });
  });

  describe('Custom Components', () => {
    it('renders custom navigation component', () => {
      const CustomNavigation = ({ onGoPrevious, onGoNext }: any) => (
        <VStack>
          <button data-testid="custom-prev" onClick={onGoPrevious}>
            Custom Prev
          </button>
          <button data-testid="custom-next" onClick={onGoNext}>
            Custom Next
          </button>
        </VStack>
      );

      render(<TestCarouselWithItems NavigationComponent={CustomNavigation} itemCount={3} />);

      expect(screen.getByTestId('custom-prev')).toBeInTheDocument();
      expect(screen.getByTestId('custom-next')).toBeInTheDocument();
    });

    it('renders custom pagination component', () => {
      const CustomPagination = ({ totalPages, activePageIndex }: any) => (
        <Text data-testid="custom-pagination">
          Custom Pagination: {activePageIndex + 1} of {totalPages}
        </Text>
      );

      render(<TestCarouselWithItems PaginationComponent={CustomPagination} itemCount={5} />);

      expect(screen.getByTestId('custom-pagination')).toBeInTheDocument();
    });

    it('passes correct props to custom navigation component', () => {
      const mockNavigation = jest.fn(
        ({ onGoNext, onGoPrevious, disableGoNext, disableGoPrevious }) => (
          <VStack>
            <button
              data-testid="custom-prev"
              onClick={disableGoPrevious ? undefined : onGoPrevious}
            >
              Previous
            </button>
            <button data-testid="custom-next" onClick={disableGoNext ? undefined : onGoNext}>
              Next
            </button>
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
    it('passes a11y', async () => {
      expect(await renderA11y(<TestCarouselWithItems itemCount={3} />)).toHaveNoViolations();
    });

    it('has proper carousel role and attributes', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      const carousel = screen.getByRole('group');
      expect(carousel).toHaveAttribute('aria-roledescription', 'carousel');
    });

    it('has aria-live="polite" on slides container when autoplay is disabled', async () => {
      render(<TestCarouselWithItems itemCount={3} />);

      const carousel = screen.getByRole('group');
      await waitFor(() => {
        expect(carousel.querySelector('[aria-live]')).not.toBeNull();
      });

      const slidesContainer = carousel.querySelector('[aria-live]');
      expect(slidesContainer).toHaveAttribute('aria-live', 'polite');
      expect(slidesContainer).toHaveAttribute('aria-atomic', 'true');
    });

    it('has aria-live="off" on slides container when autoplay is playing', async () => {
      render(<TestCarouselWithItems autoplay itemCount={5} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const carousel = screen.getByRole('group');
      const slidesContainer = carousel.querySelector('[aria-live]');

      expect(slidesContainer).toHaveAttribute('aria-live', 'off');
      expect(slidesContainer).toHaveAttribute('aria-atomic', 'true');
    });

    it('has aria-live="polite" on slides container when autoplay is stopped', async () => {
      render(<TestCarouselWithItems autoplay itemCount={5} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      act(() => {
        autoplayButton.click();
      });

      const carousel = screen.getByRole('group');
      const slidesContainer = carousel.querySelector('[aria-live]');

      expect(slidesContainer).toHaveAttribute('aria-live', 'polite');
      expect(slidesContainer).toHaveAttribute('aria-atomic', 'true');
    });

    it('applies custom accessibility labels', () => {
      render(
        <TestCarouselWithItems
          itemCount={3}
          nextPageAccessibilityLabel="Go to next set of items"
          previousPageAccessibilityLabel="Go to previous set of items"
        />,
      );

      expect(screen.getByLabelText('Go to next set of items')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to previous set of items')).toBeInTheDocument();
    });

    it('applies default accessibility labels', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByLabelText('Previous page')).toBeInTheDocument();
      expect(screen.getByLabelText('Next page')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      render(<TestCarouselWithItems itemCount={5} />);

      const nextButton = screen.getByTestId('carousel-next-button');

      expect(nextButton).toBeDisabled();
      expect(nextButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Styling', () => {
    it('applies custom styles', () => {
      render(
        <TestCarouselWithItems
          itemCount={3}
          style={{ backgroundColor: 'red' }}
          styles={{
            root: { padding: '20px' },
            carousel: { gap: '10px' },
          }}
        />,
      );

      const carousel = screen.getByRole('group');
      expect(carousel).toHaveStyle('background-color: red');
      expect(carousel).toHaveStyle('padding: 20px');
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('applies custom class names', () => {
      render(
        <TestCarouselWithItems
          className="custom-carousel"
          classNames={{
            root: 'custom-root',
            carousel: 'custom-carousel-content',
          }}
          itemCount={3}
        />,
      );

      const carousel = screen.getByRole('group');
      expect(carousel).toHaveClass('custom-carousel');
      expect(carousel).toHaveClass('custom-root');

      const carouselContainer = carousel.querySelector('div[style*="position: relative"]');
      const carouselContent = carouselContainer?.querySelector('div');
      expect(carouselContent).toHaveClass('custom-carousel-content');
    });

    it('renders items with correct test IDs', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByTestId('carousel-item-content-item-0')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-item-content-item-1')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-item-content-item-2')).toBeInTheDocument();
    });
  });

  describe('Dynamic Content', () => {
    it('handles dynamic item addition', async () => {
      const DynamicCarousel = () => {
        const [itemCount, setItemCount] = useState(2);

        return (
          <DefaultThemeProvider>
            <VStack>
              <button data-testid="add-items" onClick={() => setItemCount(4)}>
                Add Items
              </button>
              <TestCarouselWithItems itemCount={itemCount} />
            </VStack>
          </DefaultThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<DynamicCarousel />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.queryByText('Item 3')).not.toBeInTheDocument();

      await user.click(screen.getByTestId('add-items'));

      expect(screen.getByText('Item 3')).toBeInTheDocument();
      expect(screen.getByText('Item 4')).toBeInTheDocument();
    });

    it('renders empty carousel gracefully', () => {
      render(
        <DefaultThemeProvider>
          <Carousel />
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();
      expect(screen.queryByText(/Item \d+/)).not.toBeInTheDocument();

      const carousel = screen.getByRole('group');
      const paginationDots = carousel.querySelectorAll('button[aria-label*="Go to page"]');
      expect(paginationDots).toHaveLength(0);
    });

    it('handles single item carousel', async () => {
      render(<TestCarouselWithItems itemCount={1} />);

      expect(screen.getByTestId('carousel-next-button')).toBeDisabled();
      expect(screen.getByTestId('carousel-previous-button')).toBeDisabled();

      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.queryByText('Item 2')).not.toBeInTheDocument();

      expect(screen.getByTestId('carousel-item-content-item-0')).toBeInTheDocument();
      expect(screen.queryByTestId('carousel-item-content-item-1')).not.toBeInTheDocument();

      await waitFor(() => {
        const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
        expect(paginationDots).toHaveLength(1);
      });
    });
  });

  describe('Snap Modes', () => {
    const snapModeItemPageCount = (itemCount: number) => {
      return Math.max(1, itemCount - Math.ceil(containerWidth / defaultItemWidth) + 1);
    };

    const snapModePageCount = (itemCount: number) => {
      return Math.ceil((itemCount * defaultItemWidth) / containerWidth);
    };

    it('uses page snap mode by default', async () => {
      const itemCount = 12;
      const expectedPages = snapModePageCount(itemCount);

      render(<TestCarouselWithItems itemCount={itemCount} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();

      await waitFor(() => {
        const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
        expect(paginationDots).toHaveLength(expectedPages);
      });

      await waitFor(() => {
        expect(screen.getByTestId('carousel-next-button')).not.toBeDisabled();
      });
    });

    it('switches to item snap mode when specified', async () => {
      const itemCount = 6;
      const expectedPages = snapModeItemPageCount(itemCount);

      render(<TestCarouselWithItems itemCount={itemCount} snapMode="item" />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();

      await waitFor(() => {
        const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
        expect(paginationDots).toHaveLength(expectedPages);
      });

      await waitFor(() => {
        expect(screen.getByTestId('carousel-next-button')).not.toBeDisabled();
      });
    });

    it('calculates pages correctly for page snap mode', async () => {
      // Test with different item counts to verify page calculation
      const testCases = [
        { items: 1, expectedPages: snapModePageCount(1) },
        { items: 3, expectedPages: snapModePageCount(3) },
        { items: 4, expectedPages: snapModePageCount(4) },
        { items: 5, expectedPages: snapModePageCount(5) },
        { items: 8, expectedPages: snapModePageCount(8) },
        { items: 9, expectedPages: snapModePageCount(9) },
        { items: 12, expectedPages: snapModePageCount(12) },
        { items: 13, expectedPages: snapModePageCount(13) },
      ];

      for (const { items, expectedPages } of testCases) {
        const { unmount } = render(<TestCarouselWithItems itemCount={items} snapMode="page" />);

        await waitFor(() => {
          const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
          expect(paginationDots).toHaveLength(expectedPages);
        });

        unmount();
      }
    });

    it('calculates pages correctly for item snap mode', async () => {
      // Test with different item counts to verify page calculation
      const testCases = [
        { items: 1, expectedPages: snapModeItemPageCount(1) },
        { items: 3, expectedPages: snapModeItemPageCount(3) },
        { items: 4, expectedPages: snapModeItemPageCount(4) },
        { items: 5, expectedPages: snapModeItemPageCount(5) },
        { items: 8, expectedPages: snapModeItemPageCount(8) },
        { items: 9, expectedPages: snapModeItemPageCount(9) },
        { items: 12, expectedPages: snapModeItemPageCount(12) },
        { items: 13, expectedPages: snapModeItemPageCount(13) },
      ];

      for (const { items, expectedPages } of testCases) {
        const { unmount } = render(<TestCarouselWithItems itemCount={items} snapMode="item" />);

        await waitFor(() => {
          const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
          expect(paginationDots).toHaveLength(expectedPages);
        });

        unmount();
      }
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

    it('memoizes component properly', () => {
      const { rerender } = render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();

      rerender(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });
  });

  describe('Component Integration', () => {
    it('handles title and navigation together', () => {
      render(<TestCarouselWithItems itemCount={3} title="Test Carousel" />);

      expect(screen.getByText('Test Carousel')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-previous-button')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-next-button')).toBeInTheDocument();
    });

    it('handles title without navigation', () => {
      render(<TestCarouselWithItems hideNavigation itemCount={3} title="Test Carousel" />);

      expect(screen.getByText('Test Carousel')).toBeInTheDocument();
      expect(screen.queryByTestId('carousel-previous-button')).not.toBeInTheDocument();
      expect(screen.queryByTestId('carousel-next-button')).not.toBeInTheDocument();
    });

    it('handles different item widths', () => {
      const { rerender } = render(<TestCarouselWithItems itemCount={3} itemWidth={150} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();

      rerender(<TestCarouselWithItems itemCount={3} itemWidth={300} />);

      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('handles title with pagination', () => {
      render(<TestCarouselWithItems itemCount={5} title="Test Carousel" />);

      expect(screen.getByText('Test Carousel')).toBeInTheDocument();
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('handles navigation without title', () => {
      render(<TestCarouselWithItems itemCount={3} />);

      expect(screen.getByTestId('carousel-previous-button')).toBeInTheDocument();
      expect(screen.getByTestId('carousel-next-button')).toBeInTheDocument();
    });
  });

  describe('Imperative Handle', () => {
    it('exposes activePageIndex through ref', async () => {
      const TestCarouselWithRef = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);
        const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);

        const handleGetCurrentPage = () => {
          if (carouselRef.current) {
            setCurrentPageIndex(carouselRef.current.activePageIndex);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <button data-testid="get-current-page" onClick={handleGetCurrentPage}>
                Get Current Page
              </button>
              {currentPageIndex !== null && (
                <Text data-testid="current-page-display">Current Page: {currentPageIndex}</Text>
              )}
              <Carousel ref={carouselRef}>
                {Array.from({ length: 5 }, (_, index) => (
                  <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                    <Box height={100} width={200}>
                      <Text>Item {index + 1}</Text>
                    </Box>
                  </CarouselItem>
                ))}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<TestCarouselWithRef />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('get-current-page'));

      expect(screen.getByTestId('current-page-display')).toHaveTextContent('Current Page: 0');
    });

    it('allows programmatic navigation through goToPage method', async () => {
      const TestCarouselWithRef = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);
        const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);

        const handleGoToPage = (pageIndex: number) => {
          if (carouselRef.current) {
            carouselRef.current.goToPage(pageIndex);
          }
        };

        const handleGetCurrentPage = () => {
          if (carouselRef.current) {
            setCurrentPageIndex(carouselRef.current.activePageIndex);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <button data-testid="go-to-page-2" onClick={() => handleGoToPage(2)}>
                Go to Page 2
              </button>
              <button data-testid="go-to-first-page" onClick={() => handleGoToPage(0)}>
                Go to First Page
              </button>
              <button data-testid="get-current-page" onClick={handleGetCurrentPage}>
                Get Current Page
              </button>
              {currentPageIndex !== null && (
                <Text data-testid="current-page-display">Current Page: {currentPageIndex}</Text>
              )}
              <Carousel ref={carouselRef}>
                {Array.from({ length: 8 }, (_, index) => (
                  <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                    <Box height={100} width={200}>
                      <Text>Item {index + 1}</Text>
                    </Box>
                  </CarouselItem>
                ))}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<TestCarouselWithRef />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('go-to-page-2'));

      await user.click(screen.getByTestId('get-current-page'));

      const currentPageDisplay = screen.getByTestId('current-page-display');
      const currentPageText = currentPageDisplay.textContent;

      expect(currentPageText).toMatch(/Current Page: [1-9]/);

      const currentPageIndex = parseInt(currentPageText!.split(': ')[1]);

      await user.click(screen.getByTestId('go-to-first-page'));

      await user.click(screen.getByTestId('get-current-page'));

      expect(screen.getByTestId('current-page-display')).toHaveTextContent('Current Page: 0');

      const newPageIndex = parseInt(
        screen.getByTestId('current-page-display').textContent!.split(': ')[1],
      );
      expect(newPageIndex).toBe(0);
      expect(newPageIndex).not.toBe(currentPageIndex);
    });

    it('clamps goToPage index to valid range', async () => {
      const TestCarouselWithRef = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);
        const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);

        const handleGoToPage = (pageIndex: number) => {
          if (carouselRef.current) {
            carouselRef.current.goToPage(pageIndex);
          }
        };

        const handleGetCurrentPage = () => {
          if (carouselRef.current) {
            setCurrentPageIndex(carouselRef.current.activePageIndex);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <button data-testid="go-to-negative-page" onClick={() => handleGoToPage(-1)}>
                Go to Page -1
              </button>
              <button data-testid="go-to-large-page" onClick={() => handleGoToPage(999)}>
                Go to Page 999
              </button>
              <button data-testid="get-current-page" onClick={handleGetCurrentPage}>
                Get Current Page
              </button>
              {currentPageIndex !== null && (
                <Text data-testid="current-page-display">Current Page: {currentPageIndex}</Text>
              )}
              <Carousel ref={carouselRef}>
                {Array.from({ length: 6 }, (_, index) => (
                  <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                    <Box height={100} width={200}>
                      <Text>Item {index + 1}</Text>
                    </Box>
                  </CarouselItem>
                ))}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<TestCarouselWithRef />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('go-to-negative-page'));
      await user.click(screen.getByTestId('get-current-page'));
      expect(screen.getByTestId('current-page-display')).toHaveTextContent('Current Page: 0');

      await user.click(screen.getByTestId('go-to-large-page'));
      await user.click(screen.getByTestId('get-current-page'));

      const displayedPage = screen.getByTestId('current-page-display').textContent;
      expect(displayedPage).toMatch(/Current Page: \d+/);

      const pageNumber = parseInt(displayedPage!.split(': ')[1]);
      expect(pageNumber).toBeGreaterThanOrEqual(0);
      expect(pageNumber).toBeLessThan(10);
    });
  });

  describe('Render Props', () => {
    it('supports render props pattern in CarouselItem', () => {
      render(
        <DefaultThemeProvider>
          <Carousel>
            <CarouselItem id="render-props-item" width={200}>
              {({ isVisible }) => (
                <Box data-testid="render-props-content">
                  <Text>Content</Text>
                  <Text data-testid="visibility-indicator">{isVisible ? 'visible' : 'hidden'}</Text>
                </Box>
              )}
            </CarouselItem>
          </Carousel>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('render-props-content')).toBeInTheDocument();
      expect(screen.getByTestId('visibility-indicator')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('supports both regular children and render props', () => {
      render(
        <DefaultThemeProvider>
          <Carousel>
            <CarouselItem id="regular-item" width={200}>
              <Box data-testid="regular-content">
                <Text>Regular Content</Text>
              </Box>
            </CarouselItem>
            <CarouselItem id="render-props-item" width={200}>
              {({ isVisible }: { isVisible: boolean }) => (
                <Box data-testid="render-props-content">
                  <Text>Render Props Content</Text>
                  <Text data-testid="visibility-status">{isVisible ? 'visible' : 'hidden'}</Text>
                </Box>
              )}
            </CarouselItem>
          </Carousel>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('regular-content')).toBeInTheDocument();
      expect(screen.getByTestId('render-props-content')).toBeInTheDocument();
      expect(screen.getByText('Regular Content')).toBeInTheDocument();
      expect(screen.getByText('Render Props Content')).toBeInTheDocument();
      expect(screen.getByTestId('visibility-status')).toBeInTheDocument();
    });
  });

  describe('Looping', () => {
    it('enables looping when loop prop is true', async () => {
      render(<TestCarouselWithItems loop itemCount={5} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      expect(previousButton).not.toBeDisabled();
    });

    it('disables both navigation buttons when totalPages <= 1 with loop enabled', async () => {
      render(<TestCarouselWithItems loop itemCount={2} itemWidth={defaultItemWidth} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      expect(nextButton).toBeDisabled();
      expect(previousButton).toBeDisabled();
    });

    it('allows navigating from first to last page when looping', async () => {
      const onChangePage = jest.fn();
      const user = userEvent.setup();

      render(<TestCarouselWithItems loop itemCount={5} onChangePage={onChangePage} />);

      const previousButton = screen.getByTestId('carousel-previous-button');

      await waitFor(() => {
        expect(previousButton).not.toBeDisabled();
      });

      await user.click(previousButton);

      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalled();
      });
    });

    it('allows navigating from last to first page when looping', async () => {
      const onChangePage = jest.fn();
      const user = userEvent.setup();

      render(
        <TestCarouselWithItems loop itemCount={5} onChangePage={onChangePage} snapMode="item" />,
      );

      const nextButton = screen.getByTestId('carousel-next-button');

      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      for (let i = 0; i < 4; i++) {
        await user.click(nextButton);
      }

      onChangePage.mockClear();

      await user.click(nextButton);

      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalledWith(0);
      });
    });

    it('renders correctly with loop and different snap modes', () => {
      const { unmount: unmountItem } = render(
        <TestCarouselWithItems loop itemCount={5} snapMode="item" />,
      );
      expect(screen.getAllByText('Item 1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Item 5').length).toBeGreaterThanOrEqual(1);
      unmountItem();

      const { unmount: unmountPage } = render(
        <TestCarouselWithItems loop itemCount={5} snapMode="page" />,
      );
      expect(screen.getAllByText('Item 1').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Item 5').length).toBeGreaterThanOrEqual(1);
      unmountPage();
    });

    it('works with different drag modes when looping', async () => {
      const testCases = ['free', 'snap'] as const;
      const user = userEvent.setup();

      for (const dragMode of testCases) {
        const onChangePage = jest.fn();
        const { unmount } = render(
          <TestCarouselWithItems loop drag={dragMode} itemCount={5} onChangePage={onChangePage} />,
        );

        const nextButton = screen.getByTestId('carousel-next-button');

        await waitFor(() => {
          expect(nextButton).not.toBeDisabled();
        });

        await user.click(nextButton);

        await waitFor(() => {
          expect(onChangePage).toHaveBeenCalled();
        });

        unmount();
      }
    });

    it('does not enable looping when content fits in viewport', () => {
      render(<TestCarouselWithItems loop itemCount={1} />);

      const previousButton = screen.getByTestId('carousel-previous-button');
      const nextButton = screen.getByTestId('carousel-next-button');

      expect(nextButton).toBeDisabled();
      expect(previousButton).toBeDisabled();
    });
  });

  describe('Callback Props', () => {
    it('calls onChangePage when page changes via navigation', async () => {
      const onChangePage = jest.fn();
      const user = userEvent.setup();

      render(<TestCarouselWithItems itemCount={5} onChangePage={onChangePage} />);

      const nextButton = screen.getByTestId('carousel-next-button');

      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      await user.click(nextButton);

      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalledWith(expect.any(Number));
      });

      expect(onChangePage).toHaveBeenCalled();
    });

    it('calls onChangePage when page changes via pagination', async () => {
      const onChangePage = jest.fn();
      const user = userEvent.setup();

      render(<TestCarouselWithItems itemCount={8} onChangePage={onChangePage} />);

      await waitFor(() => {
        const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
        expect(paginationDots.length).toBeGreaterThan(1);
      });

      const paginationDots = screen.getAllByRole('button', { name: /go to page/i });
      expect(paginationDots.length).toBeGreaterThan(1);

      await user.click(paginationDots[1]);

      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalled();
      });
    });

    it('does not call onChangePage when setting same page multiple times', async () => {
      const onChangePage = jest.fn();

      const TestCarouselWithProgrammaticNavigation = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);

        const handleGoToSamePage = () => {
          if (carouselRef.current) {
            carouselRef.current.goToPage(0);
            carouselRef.current.goToPage(0);
            carouselRef.current.goToPage(0);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <button data-testid="go-to-same-page" onClick={handleGoToSamePage}>
                Go to Same Page Multiple Times
              </button>
              <Carousel ref={carouselRef} onChangePage={onChangePage}>
                {Array.from({ length: 5 }, (_, index) => (
                  <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                    <Box height={100} width={200}>
                      <Text>Item {index + 1}</Text>
                    </Box>
                  </CarouselItem>
                ))}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<TestCarouselWithProgrammaticNavigation />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('go-to-same-page'));

      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('calls onDragStart and onDragEnd when drag is enabled', async () => {
      const onDragStart = jest.fn();
      const onDragEnd = jest.fn();

      render(
        <TestCarouselWithItems
          drag="snap"
          itemCount={5}
          onDragEnd={onDragEnd}
          onDragStart={onDragStart}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      expect(onDragStart).toBeDefined();
      expect(onDragEnd).toBeDefined();
    });

    it('does not call drag callbacks when drag is disabled', async () => {
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

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      expect(onDragStart).toBeDefined();
      expect(onDragEnd).toBeDefined();
    });

    it('updateActivePageIndex supports function updaters', async () => {
      const onChangePage = jest.fn();

      const TestCarouselWithFunctionUpdater = () => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);

        const handleClampToMax = () => {
          if (carouselRef.current) {
            // This simulates the internal behavior where we clamp to max pages
            const currentPage = carouselRef.current.activePageIndex;
            const maxPage = carouselRef.current.totalPages - 1;

            // Go to a high page number that should get clamped
            carouselRef.current.goToPage(999);
          }
        };

        return (
          <DefaultThemeProvider>
            <VStack>
              <button data-testid="clamp-to-max" onClick={handleClampToMax}>
                Clamp to Max Page
              </button>
              <Carousel ref={carouselRef} onChangePage={onChangePage}>
                {Array.from({ length: 8 }, (_, index) => (
                  <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                    <Box height={100} width={200}>
                      <Text>Item {index + 1}</Text>
                    </Box>
                  </CarouselItem>
                ))}
              </Carousel>
            </VStack>
          </DefaultThemeProvider>
        );
      };

      const user = userEvent.setup();
      render(<TestCarouselWithFunctionUpdater />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      await user.click(screen.getByTestId('clamp-to-max'));

      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalled();
      });

      const lastCall = onChangePage.mock.calls[onChangePage.mock.calls.length - 1];
      const [newPageIndex] = lastCall;
      expect(newPageIndex).toBeGreaterThanOrEqual(0);
      expect(newPageIndex).toBeLessThan(10);
    });

    it('does not cause excessive rerenders when onChangePage is an inline function', async () => {
      let renderCount = 0;

      const TestCarouselWithInlineCallback = () => {
        renderCount++;

        return (
          <DefaultThemeProvider>
            <Carousel onChangePage={(pageIndex) => console.log('Page changed:', pageIndex)}>
              {Array.from({ length: 5 }, (_, index) => (
                <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                  <Box height={100} width={200}>
                    <Text>Item {index + 1}</Text>
                  </Box>
                </CarouselItem>
              ))}
            </Carousel>
          </DefaultThemeProvider>
        );
      };

      const { rerender } = render(<TestCarouselWithInlineCallback />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const initialRenderCount = renderCount;

      rerender(<TestCarouselWithInlineCallback />);

      expect(renderCount - initialRenderCount).toBeLessThan(5);
    });

    it('has stable updateActivePageIndex when onChangePage is memoized', async () => {
      const onChangePage = jest.fn();
      let updateActivePageIndexRef1: any;
      let updateActivePageIndexRef2: any;

      const TestCarouselWithStableCallback = ({
        callback,
      }: {
        callback: (pageIndex: number) => void;
      }) => {
        const carouselRef = useRef<CarouselImperativeHandle>(null);

        useEffect(() => {
          if (carouselRef.current) {
            if (!updateActivePageIndexRef1) {
              updateActivePageIndexRef1 = carouselRef.current;
            } else {
              updateActivePageIndexRef2 = carouselRef.current;
            }
          }
        });

        return (
          <DefaultThemeProvider>
            <Carousel ref={carouselRef} onChangePage={callback}>
              {Array.from({ length: 5 }, (_, index) => (
                <CarouselItem key={`item-${index}`} id={`item-${index}`} width={200}>
                  <Box height={100} width={200}>
                    <Text>Item {index + 1}</Text>
                  </Box>
                </CarouselItem>
              ))}
            </Carousel>
          </DefaultThemeProvider>
        );
      };

      const { rerender } = render(<TestCarouselWithStableCallback callback={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      rerender(<TestCarouselWithStableCallback callback={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      expect(updateActivePageIndexRef1).toBeDefined();
      expect(updateActivePageIndexRef2).toBeDefined();
    });
  });

  describe('Autoplay', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('does not autoplay by default', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems itemCount={5} onChangePage={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('enables autoplay when autoplay prop is true', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });
      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalledWith(1);
      });
    });

    it('respects custom autoplayInterval', async () => {
      const onChangePage = jest.fn();
      render(
        <TestCarouselWithItems
          autoplay
          autoplayInterval={5000}
          itemCount={5}
          onChangePage={onChangePage}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      act(() => {
        jest.advanceTimersByTime(4000);
      });

      expect(onChangePage).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalledWith(1);
      });
    });

    it('shows autoplay toggle button when autoplay is enabled', async () => {
      render(<TestCarouselWithItems autoplay itemCount={5} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      expect(screen.getByTestId('carousel-autoplay-button')).toBeInTheDocument();
    });

    it('applies custom autoplay accessibility labels and toggles them on click', async () => {
      render(
        <TestCarouselWithItems
          autoplay
          itemCount={5}
          startAutoplayAccessibilityLabel="Resume slideshow"
          stopAutoplayAccessibilityLabel="Pause slideshow"
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      expect(screen.getByLabelText('Pause slideshow')).toBeInTheDocument();

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      act(() => {
        autoplayButton.click();
      });
      expect(screen.getByLabelText('Resume slideshow')).toBeInTheDocument();

      act(() => {
        autoplayButton.click();
      });
      expect(screen.getByLabelText('Pause slideshow')).toBeInTheDocument();
    });

    it('applies default autoplay accessibility labels and toggles them on click', async () => {
      render(<TestCarouselWithItems autoplay itemCount={5} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      expect(screen.getByLabelText('Pause Carousel')).toBeInTheDocument();

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      act(() => {
        autoplayButton.click();
      });
      expect(screen.getByLabelText('Play Carousel')).toBeInTheDocument();

      act(() => {
        autoplayButton.click();
      });
      expect(screen.getByLabelText('Pause Carousel')).toBeInTheDocument();
    });

    it('toggles autoplay when toggle button is clicked', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const autoplayButton = screen.getByTestId('carousel-autoplay-button');
      act(() => {
        autoplayButton.click();
      });

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(5000);
      });

      expect(onChangePage).not.toHaveBeenCalled();

      act(() => {
        autoplayButton.click();
      });

      act(() => {
        jest.advanceTimersByTime(5000);
      });
      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalled();
      });
    });

    it('resets autoplay progress when manually navigating via next button', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const nextButton = screen.getByTestId('carousel-next-button');
      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      act(() => {
        nextButton.click();
      });

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(2500);
      });
      expect(onChangePage).not.toHaveBeenCalled();

      act(() => {
        jest.advanceTimersByTime(500);
      });
      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalled();
      });
    });

    it('resets autoplay progress when manually navigating via previous button', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay loop itemCount={5} onChangePage={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const prevButton = screen.getByTestId('carousel-previous-button');
      await waitFor(() => {
        expect(prevButton).not.toBeDisabled();
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      act(() => {
        prevButton.click();
      });

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(2500);
      });
      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('resets autoplay progress when clicking pagination dots', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={8} onChangePage={onChangePage} />);

      await waitFor(() => {
        const paginationDots = screen.queryAllByRole('button', { name: /go to page/i });
        expect(paginationDots.length).toBeGreaterThan(1);
      });

      act(() => {
        jest.advanceTimersByTime(1500);
      });

      const paginationDots = screen.getAllByRole('button', { name: /go to page/i });
      act(() => {
        paginationDots[1].click();
      });

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(onChangePage).not.toHaveBeenCalled();
    });

    it('continues autoplay after manual navigation (does not stop)', async () => {
      const onChangePage = jest.fn();
      render(<TestCarouselWithItems autoplay itemCount={5} onChangePage={onChangePage} />);

      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
      });

      const nextButton = screen.getByTestId('carousel-next-button');
      await waitFor(() => {
        expect(nextButton).not.toBeDisabled();
      });

      act(() => {
        nextButton.click();
      });

      onChangePage.mockClear();

      act(() => {
        jest.advanceTimersByTime(5000);
      });
      await waitFor(() => {
        expect(onChangePage).toHaveBeenCalled();
      });
    });
  });
});
