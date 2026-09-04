import { render, screen } from '@testing-library/react';

import { MockSidebar } from '../__stories__/NavigationStorySetup';

jest.mock('../../hooks/useDimensions', () => ({
  useDimensions: jest.fn(() => {
    return {
      width: 1280,
      height: 100,
      observe: jest.fn(),
    };
  }),
}));

describe('Sidebar', () => {
  it('should render primary sidebar by default', () => {
    render(<MockSidebar />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByLabelText('Coinbase logo')).toBeInTheDocument();
    expect(screen.getByText('Coinbase One')).toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toHaveStyle({ '--width': '240px' });
    expect(screen.getByTestId('sidebar-logo')).not.toHaveClass('center');
    expect(screen.getByTestId('sidebar-end')).not.toHaveClass('center');
  });

  it('should render collapsed style when collapsed is set to true', () => {
    render(<MockSidebar collapsed />);

    expect(screen.queryByText('Coinbase One')).not.toBeInTheDocument();
    expect(screen.getByTestId('sidebar')).toHaveStyle({ '--width': '87px' });
    expect(screen.getByTestId('sidebar-logo')).not.toHaveClass('center');
    expect(screen.getByTestId('sidebar-end')).not.toHaveClass('center');
  });

  it('should render condensed sidebar when variant equals to condensed', () => {
    render(<MockSidebar variant="condensed" />);

    expect(screen.getByTestId('sidebar')).toHaveStyle({ '--width': '88px' });
    expect(screen.getByTestId('sidebar-logo').classList.toString()).toContain('center');
    expect(screen.getByTestId('sidebar-end').classList.toString()).toContain('center');
  });
});
