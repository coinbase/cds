import { Text } from 'react-native';
import { getRectWidthVariant } from '@coinbase/cds-common/utils/getRectWidthVariant';
import { render, screen } from '@testing-library/react-native';

import { Fallback } from '../../layout';
import { DefaultThemeProvider, theme as defaultTheme } from '../../utils/testHelpers';
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
      expect.objectContaining({
        disableRandomRectWidth: true,
        height: defaultTheme.lineHeight.body,
        paddingTop: 0.5,
        rectWidthVariant: getRectWidthVariant(1, 3),
        width: 110,
      }),
      {},
    );
  });

  it('should render meta fallback', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback disableRandomRectWidth meta subtitle title rectWidthVariant={1} />
      </DefaultThemeProvider>,
    );
    const calls = (Fallback as unknown as jest.Mock).mock.calls;
    const metaCall = calls.find(([props]) => props.width === 50);

    expect(metaCall?.[0]).toMatchObject({
      disableRandomRectWidth: true,
      height: defaultTheme.lineHeight.label2,
      rectWidthVariant: getRectWidthVariant(1, 0),
      width: 50,
    });
  });

  it('should render title fallback', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback disableRandomRectWidth title rectWidthVariant={1} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Fallback')).toBeDefined();
    expect(Fallback).toHaveBeenCalledWith(
      expect.objectContaining({
        disableRandomRectWidth: true,
        height: defaultTheme.lineHeight.headline,
        rectWidthVariant: getRectWidthVariant(1, 1),
        width: 90,
      }),
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
      expect.objectContaining({
        disableRandomRectWidth: true,
        height: defaultTheme.lineHeight.label2,
        rectWidthVariant: getRectWidthVariant(1, 2),
        width: 90,
      }),
      {},
    );
  });

  it('should adjust typography heights for condensed spacing', () => {
    render(
      <DefaultThemeProvider>
        <ContentCellFallback
          description
          disableRandomRectWidth
          subtitle
          rectWidthVariant={1}
          spacingVariant="condensed"
        />
      </DefaultThemeProvider>,
    );

    const calls = (Fallback as unknown as jest.Mock).mock.calls;
    expect(calls).toHaveLength(2);

    const [subtitleCall, descriptionCall] = calls;

    expect(subtitleCall[0]).toMatchObject({
      height: defaultTheme.lineHeight.label1,
      rectWidthVariant: getRectWidthVariant(1, 2),
    });

    expect(descriptionCall[0]).toMatchObject({
      height: defaultTheme.lineHeight.label2,
      rectWidthVariant: getRectWidthVariant(1, 3),
    });
  });
});
