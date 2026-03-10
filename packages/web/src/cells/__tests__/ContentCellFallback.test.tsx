import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';
import { render, screen } from '@testing-library/react';

import { Fallback } from '../../layout/Fallback';
import { ContentCellFallback } from '../ContentCellFallback';
import { MediaFallback } from '../MediaFallback';

jest.mock('../../layout/Fallback', () => ({
  Fallback: jest.fn(() => <div>Fallback</div>),
}));

jest.mock('../MediaFallback', () => ({
  MediaFallback: jest.fn(),
}));

describe('ContentCellFallback', () => {
  beforeEach(jest.clearAllMocks);

  it('should render MediaFallback if media is provided', () => {
    (MediaFallback as unknown as jest.Mock).mockImplementationOnce(
      ({ type }) => `MediaFallback ${type}`,
    );

    render(<ContentCellFallback media="image" />);
    expect(screen.getByText('MediaFallback image')).toBeInTheDocument();
  });

  it('should render fallback for meta', () => {
    render(<ContentCellFallback disableRandomRectWidth meta rectWidthVariant={1} />);
    const fallback = screen.getByText('Fallback');
    expect(fallback).toBeInTheDocument();
    expect(Fallback).toHaveBeenCalledWith(
      {
        'aria-hidden': true,
        disableRandomRectWidth: true,
        height: 18,
        percentage: true,
        rectWidthVariant: getRectWidthVariant(1, 0),
        width: 50,
      },
      {},
    );
  });

  it('should render fallback for title', () => {
    render(<ContentCellFallback disableRandomRectWidth title rectWidthVariant={1} />);
    const fallback = screen.getByText('Fallback');
    expect(fallback).toBeInTheDocument();
    expect(Fallback).toHaveBeenCalledWith(
      {
        'aria-hidden': true,
        disableRandomRectWidth: true,
        height: 18,
        percentage: true,
        rectWidthVariant: getRectWidthVariant(1, 1),
        width: 45,
      },
      {},
    );
  });

  it('should render fallback for subtitle', () => {
    render(<ContentCellFallback disableRandomRectWidth subtitle rectWidthVariant={1} />);
    const fallback = screen.getByText('Fallback');
    expect(fallback).toBeInTheDocument();
    expect(Fallback).toHaveBeenCalledWith(
      {
        'aria-hidden': true,
        disableRandomRectWidth: true,
        height: 16,
        percentage: true,
        rectWidthVariant: getRectWidthVariant(1, 2),
        paddingTop: 0.5,
        width: 35,
      },
      {},
    );
  });

  it('should render fallback for description', () => {
    render(<ContentCellFallback description disableRandomRectWidth rectWidthVariant={1} />);
    const fallback = screen.getByText('Fallback');
    expect(fallback).toBeInTheDocument();
    expect(Fallback).toHaveBeenCalledWith(
      {
        'aria-hidden': true,
        disableRandomRectWidth: true,
        height: 24,
        percentage: true,
        paddingTop: 0.5,
        rectWidthVariant: getRectWidthVariant(1, 3),
        width: 65,
      },
      {},
    );
  });
});
