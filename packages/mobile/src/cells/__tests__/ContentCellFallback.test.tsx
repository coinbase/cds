import { Text } from 'react-native';
import { getRectWidthVariant } from '@cbhq/cds-common/utils/getRectWidthVariant';
import { render, screen } from '@testing-library/react-native';

import { Fallback } from '../../layout';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { ContentCellFallback } from '../ContentCellFallback';
import { MediaFallback } from '../MediaFallback';

jest.mock('../../layout/Fallback', () => ({
  Fallback: jest.fn(),
}));

jest.mock('../MediaFallback', () => ({
  MediaFallback: jest.fn(),
}));

describe('ContentCellFallback', () => {
  beforeEach(jest.clearAllMocks);
  beforeAll(() => (Fallback as unknown as jest.Mock).mockReturnValue(<Text>Fallback</Text>));

  it('should render MediaFallback if media is provided', () => {
    (MediaFallback as unknown as jest.Mock).mockImplementationOnce(({ type }) => (
      <Text>{`MediaFallback ${type}`}</Text>
    ));

    render(
      <DefaultThemeProvider>
        <ContentCellFallback media="image" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('MediaFallback image')).toBeDefined();
  });

  it('should render description fallback', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback description disableRandomRectWidth rectWidthVariant={1} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 24,
        width: 110,
        paddingTop: 0.5,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 0),
      },
      {},
    );
  });

  it('should render meta fallback', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback disableRandomRectWidth meta subtitle title rectWidthVariant={1} />
      </DefaultThemeProvider>,
    );
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 20,
        width: 50,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 1),
      },
      {},
    );
  });

  it('should render title fallback', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback disableRandomRectWidth title rectWidthVariant={1} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 20,
        width: 90,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 2),
      },
      {},
    );
  });

  it('should render subtitle fallback', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback disableRandomRectWidth subtitle rectWidthVariant={1} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      {
        height: 20,
        width: 90,
        disableRandomRectWidth: true,
        rectWidthVariant: getRectWidthVariant(1, 2),
      },
      {},
    );
  });
});
