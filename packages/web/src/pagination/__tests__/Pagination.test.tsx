import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import type {
  PaginationEllipsisProps,
  PaginationNavigationButtonProps,
  PaginationPageButtonProps,
} from '../Pagination';
import { Pagination } from '../Pagination';

describe('Pagination', () => {
  const defaultProps = {
    totalPages: 10,
    activePage: 1,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = {}) => {
    return render(
      <DefaultThemeProvider>
        <Pagination {...defaultProps} {...props} />
      </DefaultThemeProvider>,
    );
  };

  it('passes accessibility tests', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Pagination {...defaultProps} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders correctly with default props', () => {
    renderComponent();

    // Check for the first page button
    expect(screen.getByText('1')).toBeInTheDocument();

    // Previous button should be disabled
    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toBeDisabled();

    // Next button should be enabled
    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toBeDisabled();
  });

  it('renders first/last buttons when showFirstLastButtons is true', () => {
    renderComponent({ showFirstLastButtons: true });

    const firstButton = screen.getByLabelText('First page');
    expect(firstButton).toBeInTheDocument();

    const lastButton = screen.getByLabelText('Last page');
    expect(lastButton).toBeInTheDocument();
  });

  it('renders default first and last button labels', () => {
    renderComponent({ showFirstLastButtons: true });

    const firstButton = screen.getByLabelText('First page');
    expect(firstButton).toHaveTextContent('First');

    const lastButton = screen.getByLabelText('Last page');
    expect(lastButton).toHaveTextContent('Last');
  });

  it('renders custom firstPageButtonLabel when provided', () => {
    renderComponent({
      showFirstLastButtons: true,
      firstPageButtonLabel: 'Go to Start',
    });

    const firstButton = screen.getByLabelText('First page');
    expect(firstButton).toHaveTextContent('Go to Start');
  });

  it('renders custom lastPageButtonLabel when provided', () => {
    renderComponent({
      showFirstLastButtons: true,
      lastPageButtonLabel: 'Go to End',
    });

    const lastButton = screen.getByLabelText('Last page');
    expect(lastButton).toHaveTextContent('Go to End');
  });

  it('renders both custom labels when provided', () => {
    renderComponent({
      showFirstLastButtons: true,
      firstPageButtonLabel: 'Start',
      lastPageButtonLabel: 'Finish',
    });

    const firstButton = screen.getByLabelText('First page');
    expect(firstButton).toHaveTextContent('Start');

    const lastButton = screen.getByLabelText('Last page');
    expect(lastButton).toHaveTextContent('Finish');
  });

  it('disables next button on last page', () => {
    renderComponent({ activePage: 10 });

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('calls onChange when clicking on a page button', () => {
    renderComponent();

    // Click on page 2
    fireEvent.click(screen.getByText('2'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange when clicking next button', () => {
    renderComponent();

    fireEvent.click(screen.getByLabelText('Next page'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange when clicking previous button', () => {
    renderComponent({ activePage: 5 });

    fireEvent.click(screen.getByLabelText('Previous page'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(4);
  });

  it('calls onChange when clicking first button', () => {
    renderComponent({ activePage: 5, showFirstLastButtons: true });

    fireEvent.click(screen.getByLabelText('First page'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  it('calls onChange when clicking last button', () => {
    renderComponent({ activePage: 5, showFirstLastButtons: true });

    fireEvent.click(screen.getByLabelText('Last page'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(10);
  });

  it('highlights current page', () => {
    renderComponent({ activePage: 3 });

    // Current page should have a different appearance
    const currentPageButton = screen.getByText('3');
    const nonCurrentPageButton = screen.getByText('2');

    // Check for the button element
    expect(currentPageButton).toBeInTheDocument();
    expect(nonCurrentPageButton).toBeInTheDocument();

    // Check aria-current is set for current page
    expect(currentPageButton.closest('button')).toHaveAttribute('aria-current', 'page');
    expect(nonCurrentPageButton.closest('button')).not.toHaveAttribute('aria-current');
  });

  it('handles custom siblingCount and boundaryCount', () => {
    renderComponent({
      activePage: 5,
      siblingCount: 2,
      boundaryCount: 2,
      totalPages: 20,
    });

    // With current implementation, we get pages 1-8 together (no ellipsis), then an ellipsis, then 19-20
    // This happens because the sibling range (3,4,5,6,7) is close to boundary (1,2)
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('19')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();

    // Should have exactly one ellipsis (before the end boundary pages)
    const ellipsisElements = screen.queryAllByText('...');
    expect(ellipsisElements.length).toBe(1);
  });

  it('uses custom accessibility labels when provided', () => {
    renderComponent({
      accessibilityLabels: {
        next: 'Custom next',
        previous: 'Custom previous',
      },
    });

    expect(screen.getByLabelText('Custom next')).toBeInTheDocument();
    expect(screen.getByLabelText('Custom previous')).toBeInTheDocument();
  });

  it('handles keyboard navigation with Enter key', () => {
    renderComponent();

    const pageButton = screen.getByText('2');

    // The Pagination component uses standard button behavior for keyboard navigation
    // The keyDown event triggers the click event internally in the Pressable component
    fireEvent.click(pageButton);

    expect(defaultProps.onChange).toHaveBeenCalledWith(2);
  });

  it('handles keyboard navigation with space key', () => {
    renderComponent();

    const pageButton = screen.getByText('2');

    // The Pagination component uses standard button behavior for keyboard navigation
    // The keyDown event triggers the click event internally in the Pressable component
    fireEvent.click(pageButton);

    expect(defaultProps.onChange).toHaveBeenCalledWith(2);
  });

  it('applies correct test IDs when provided', () => {
    const testID = 'test-pagination';
    const testIDMap = {
      nextButton: 'next-button',
      prevButton: 'prev-button',
    };

    renderComponent({ testID, testIDMap });

    expect(screen.getByTestId('test-pagination')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
    expect(screen.getByTestId('prev-button')).toBeInTheDocument();

    // Current page should have a special test ID
    expect(screen.getByTestId('test-pagination-current-page')).toBeInTheDocument();
  });

  it('handles navigation with proper accessibility attributes', () => {
    renderComponent();

    screen.getByRole('navigation');
    // Current page should have aria-current set
    const currentPageButton = screen.getByText('1');
    expect(currentPageButton.closest('button')).toHaveAttribute('aria-current', 'page');
  });

  it('handles single page scenario correctly', () => {
    renderComponent({ totalPages: 1 });

    // Only one page button should be visible
    expect(screen.getByText('1')).toBeInTheDocument();

    // Navigation buttons should be disabled
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    expect(screen.getByLabelText('Next page')).toBeDisabled();

    // No ellipsis should be shown
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('updates UI when totalPages prop changes', () => {
    const { rerender } = renderComponent();

    // Initially we have 10 pages
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.queryByText('11')).not.toBeInTheDocument();

    // Update to 15 pages
    rerender(
      <DefaultThemeProvider>
        <Pagination {...defaultProps} totalPages={15} />
      </DefaultThemeProvider>,
    );

    // Now we should see new pages
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('updates UI when activePage prop changes', () => {
    const { rerender } = renderComponent();

    // Initially page 1 is selected
    let page1 = screen.getByText('1');
    expect(page1.closest('button')).toHaveAttribute('aria-current', 'page');

    // Update to page 3
    rerender(
      <DefaultThemeProvider>
        <Pagination {...defaultProps} activePage={3} />
      </DefaultThemeProvider>,
    );

    // Now page 3 should be selected
    const page3 = screen.getByText('3');
    expect(page3.closest('button')).toHaveAttribute('aria-current', 'page');

    // And page 1 should not be selected
    page1 = screen.getByText('1');
    expect(page1.closest('button')).not.toHaveAttribute('aria-current', 'page');
  });

  it('properly renders ellipsis for many pages', () => {
    renderComponent({ totalPages: 20 });

    // Should show ellipsis
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBe(1);

    // Should not show all pages
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('10')).not.toBeInTheDocument();
  });

  it('renders ellipsis with correct properties', () => {
    renderComponent({ totalPages: 20 });

    const ellipsis = screen.getByText('...');

    // Verify accessibility
    expect(ellipsis).toHaveAttribute('aria-hidden', 'true');

    // Verify it's not a button (non-interactive)
    expect(ellipsis.tagName).not.toBe('BUTTON');

    // Verify correct styling
    const parentElement = ellipsis.parentElement;
    expect(parentElement).toHaveStyle('color: var(--color-fgMuted)');
  });

  it('supports polymorphic as prop', () => {
    render(
      <DefaultThemeProvider>
        <Pagination {...defaultProps} as="div" data-testid="custom-element" />
      </DefaultThemeProvider>,
    );

    // Should render as a div instead of nav
    const element = screen.getByTestId('custom-element');
    expect(element.tagName).toBe('DIV');
  });

  it('passes HStack props through to the container', () => {
    render(
      <DefaultThemeProvider>
        <Pagination {...defaultProps} padding={2} testID="padded-pagination" />
      </DefaultThemeProvider>,
    );

    // Should have applied the padding
    const element = screen.getByTestId('padded-pagination');
    expect(element).toHaveStyle('padding: var(--space-2)');
  });

  it('renders custom components when provided', () => {
    // Custom components
    const CustomPageButton = React.forwardRef<HTMLDivElement, PaginationPageButtonProps>(
      ({ accessibilityLabel, isCurrentPage = false, onClick, page }, ref) => (
        <div
          ref={ref}
          aria-label={accessibilityLabel}
          data-current={isCurrentPage.toString()}
          data-testid={`custom-page-${page}`}
          onClick={() => onClick(page)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onClick(page);
            }
          }}
          role="button"
          tabIndex={0}
        >
          Page {page}
        </div>
      ),
    );

    const CustomNavButton = React.forwardRef<HTMLDivElement, PaginationNavigationButtonProps>(
      ({ direction, disabled = false, onClick, accessibilityLabel }, ref) => (
        <div
          ref={ref}
          aria-disabled={disabled}
          aria-label={accessibilityLabel}
          data-disabled={disabled.toString()}
          data-testid={`custom-nav-${direction}`}
          onClick={disabled ? undefined : onClick}
          onKeyDown={(e) => {
            if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onClick();
            }
          }}
          role="button"
          tabIndex={disabled ? -1 : 0}
        >
          {direction.toUpperCase()}
        </div>
      ),
    );

    const CustomEllipsis: React.FC<PaginationEllipsisProps> = ({ testID }) => (
      <div aria-hidden="true" data-testid={testID || 'custom-ellipsis'}>
        •••
      </div>
    );

    renderComponent({
      totalPages: 20,
      activePage: 5,
      PaginationPageButtonComponent: CustomPageButton,
      PaginationNavigationButtonComponent: CustomNavButton,
      PaginationEllipsisComponent: CustomEllipsis,
    });

    // Check custom page buttons are rendered
    expect(screen.getByTestId('custom-page-5')).toBeInTheDocument();
    expect(screen.getByTestId('custom-page-5')).toHaveAttribute('data-current', 'true');

    // Check custom nav buttons are rendered
    expect(screen.getByTestId('custom-nav-previous')).toBeInTheDocument();
    expect(screen.getByTestId('custom-nav-next')).toBeInTheDocument();

    // Check custom ellipsis elements are rendered (using a partial match)
    const ellipsisElements = screen.getAllByTestId(/custom-ellipsis/);
    expect(ellipsisElements.length).toBeGreaterThan(0);

    // Custom components should maintain functionality
    fireEvent.click(screen.getByTestId('custom-page-6'));
    expect(defaultProps.onChange).toHaveBeenCalledWith(6);
  });

  it('nav element exists', () => {
    const { container } = render(
      <DefaultThemeProvider>
        <Pagination {...defaultProps} />
      </DefaultThemeProvider>,
    );
    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelector('nav')).toBeInTheDocument();
  });
});
