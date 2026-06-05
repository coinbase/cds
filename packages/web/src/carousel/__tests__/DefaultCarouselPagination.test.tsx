import React from 'react';
import { render, screen } from '@testing-library/react';
import { domMax, LazyMotion } from 'framer-motion';

import { DefaultThemeProvider } from '../../utils/test';
import { CarouselAutoplayContext } from '../CarouselContext';
import { DefaultCarouselPagination } from '../DefaultCarouselPagination';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const realFramerMotion = jest.requireActual('framer-motion');

  return {
    ...realFramerMotion,
    motion: realFramerMotion.m,
    useTransform: (value: { get: () => number }, transformer: (v: number) => string) => {
      const transformedValue = transformer(value.get());
      return transformedValue;
    },
  };
});

const mockAutoplayContext = {
  isEnabled: false,
  isStopped: true,
  isPaused: false,
  isPlaying: false,
  progress: { get: () => 0 } as any,
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
      <LazyMotion features={domMax}>
        <CarouselAutoplayContext.Provider value={mockAutoplayContext}>
          <DefaultCarouselPagination
            activePageIndex={0}
            onClickPage={jest.fn()}
            totalPages={3}
            {...props}
          />
        </CarouselAutoplayContext.Provider>
      </LazyMotion>
    </DefaultThemeProvider>,
  );

describe('DefaultCarouselPagination', () => {
  describe('variant', () => {
    it('defaults to the dot variant', () => {
      renderPagination({ totalPages: 3 });

      expect(screen.getByTestId('carousel-pagination')).toHaveAttribute('data-variant', 'dot');
    });

    it('switches to the pill variant when requested', () => {
      renderPagination({ totalPages: 3, variant: 'pill' });

      expect(screen.getByTestId('carousel-pagination')).toHaveAttribute('data-variant', 'pill');
    });
  });

  describe('paginationAccessibilityLabel', () => {
    it('uses default function that includes page number when not provided', () => {
      renderPagination({ totalPages: 3 });

      expect(screen.getByLabelText('Go to page 1')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 2')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to page 3')).toBeInTheDocument();
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

      expect(screen.getByLabelText('Slide 1 of 3')).toBeInTheDocument();
      expect(screen.getByLabelText('Slide 2 of 3')).toBeInTheDocument();
      expect(screen.getByLabelText('Slide 3 of 3')).toBeInTheDocument();
    });
  });
});
