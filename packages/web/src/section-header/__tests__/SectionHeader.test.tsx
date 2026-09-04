import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen } from '@testing-library/react';

import { SectionHeader, type SectionHeaderProps } from '../SectionHeader';

const defaultProps: SectionHeaderProps = {
  title: 'Title',
};

describe('SectionHeader', () => {
  it('renders title correctly', () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<SectionHeader title="Test Title" />)).toHaveNoViolations();
  });

  it('renders custom node for title', () => {
    const title = <div data-testid="custom-title">Custom Title</div>;
    render(<SectionHeader {...defaultProps} title={title} />);
    expect(screen.getByTestId('custom-title')).toBeInTheDocument();
  });

  it('renders start correctly', () => {
    const start = <img alt="Test Media" />;
    render(<SectionHeader {...defaultProps} start={start} />);
    expect(screen.getByAltText('Test Media')).toBeInTheDocument();
  });

  it('renders icon correctly', () => {
    const icon = <i data-testid="icon">icon</i>;
    render(<SectionHeader {...defaultProps} icon={icon} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders balance correctly', () => {
    render(<SectionHeader {...defaultProps} balance="Test Balance" />);
    expect(screen.getByText('Test Balance')).toBeInTheDocument();
  });

  it('renders custom node for balance', () => {
    const balance = <div data-testid="custom-balance">Custom Balance</div>;
    render(<SectionHeader {...defaultProps} balance={balance} />);
    expect(screen.getByTestId('custom-balance')).toBeInTheDocument();
  });

  it('renders description correctly', () => {
    render(<SectionHeader {...defaultProps} description="Test Description" />);
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders custom node for description', () => {
    const description = <div data-testid="custom-description">Custom Description</div>;
    render(<SectionHeader {...defaultProps} description={description} />);
    expect(screen.getByTestId('custom-description')).toBeInTheDocument();
  });

  it('renders end correctly', () => {
    const end = <div data-testid="end">end</div>;
    render(<SectionHeader {...defaultProps} end={end} />);
    expect(screen.getByTestId('end')).toBeInTheDocument();
  });

  it('sets aria-label correctly', () => {
    render(<SectionHeader {...defaultProps} accessibilityLabel="Test Aria Label" />);
    expect(screen.getByLabelText('Test Aria Label')).toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<SectionHeader {...defaultProps} ref={ref} />);
    expect(ref.current).not.toBeNull();
  });

  it('applies testID correctly', () => {
    const testID = 'section-header';
    render(<SectionHeader {...defaultProps} testID={testID} />);
    expect(screen.getByTestId(testID)).toBeInTheDocument();
  });
});
