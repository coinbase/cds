import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { CarouselAutoplayContext } from '../CarouselContext';
import { DefaultCarouselPagination } from '../DefaultCarouselPagination';

// Mock @react-spring/native
jest.mock('@react-spring/native', () => ({
  animated: {
    View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  useSpring: () => ({
    width: 24,
    backgroundColor: '#000',
  }),
}));

const mockAutoplayContext = {
  isEnabled: false,
  isStopped: true,
  isPaused: false,
  isPlaying: false,
  progress: { to: () => 0 } as any,
  interval: 5000,
  start: jest.fn(),
  stop: jest.fn(),
  toggle: jest.fn(),
  reset: jest.fn(),
  pause: jest.fn(),
  resume: jest.fn(),
  getRemainingTime: jest.fn(() => 5000),
};

const renderPagination = (props: Partial<React.ComponentProps<typeof DefaultCarouselPagination>>) =>
  render(
    <DefaultThemeProvider>
      <CarouselAutoplayContext.Provider value={mockAutoplayContext}>
        <DefaultCarouselPagination
          activePageIndex={0}
          onPressPage={jest.fn()}
          totalPages={3}
          {...props}
        />
      </CarouselAutoplayContext.Provider>
    </DefaultThemeProvider>,
  );

describe('DefaultCarouselPagination', () => {
  describe('paginationAccessibilityLabel', () => {
    it('uses default function that includes page number when not provided', () => {
      renderPagination({ totalPages: 3 });

      expect(screen.getByLabelText('Go to page 1')).toBeOnTheScreen();
      expect(screen.getByLabelText('Go to page 2')).toBeOnTheScreen();
      expect(screen.getByLabelText('Go to page 3')).toBeOnTheScreen();
    });

    it('uses string as-is for all indicators when string is provided', () => {
      renderPagination({
        totalPages: 3,
        paginationAccessibilityLabel: 'Select page',
      });

      const buttons = screen.getAllByLabelText('Select page');
      expect(buttons).toHaveLength(3);
    });

    it('calls function with page index when function is provided', () => {
      renderPagination({
        totalPages: 3,
        paginationAccessibilityLabel: (index: number) => `Slide ${index + 1} of 3`,
      });

      expect(screen.getByLabelText('Slide 1 of 3')).toBeOnTheScreen();
      expect(screen.getByLabelText('Slide 2 of 3')).toBeOnTheScreen();
      expect(screen.getByLabelText('Slide 3 of 3')).toBeOnTheScreen();
    });
  });
});
