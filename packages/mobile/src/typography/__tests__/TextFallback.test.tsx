import * as ReactNative from 'react-native';
import { render } from '@testing-library/react-native';

import { defaultTheme } from '../../themes/defaultTheme';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Fallback } from '../../layout/Fallback';
import { TextFallback } from '../TextFallback';

jest.mock('../../layout/Fallback', () => ({
  Fallback: jest.fn(() => null),
}));

const MockedFallback = jest.mocked(Fallback);

const mockFontScale = (fontScale: number) => {
  jest.spyOn(ReactNative, 'useWindowDimensions').mockReturnValue({
    fontScale,
    height: 812,
    scale: 2,
    width: 375,
  });
};

describe('TextFallback', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it('renders with font-based height', () => {
    render(
      <DefaultThemeProvider>
        <TextFallback font="headline" testID="text-fallback" width={100} />
      </DefaultThemeProvider>,
    );

    expect(MockedFallback).toHaveBeenCalled();
  });

  describe('allowFontScaling', () => {
    it('scales fallback size with the device font scale by default', () => {
      mockFontScale(2);

      render(
        <DefaultThemeProvider>
          <TextFallback font="headline" width={100} />
        </DefaultThemeProvider>,
      );

      expect(MockedFallback).toHaveBeenCalledWith(
        expect.objectContaining({
          height: defaultTheme.fontSize.headline * 2,
          style: [
            {
              paddingTop:
                (defaultTheme.lineHeight.headline * 2 - defaultTheme.fontSize.headline * 2) / 2,
              paddingBottom:
                (defaultTheme.lineHeight.headline * 2 - defaultTheme.fontSize.headline * 2) / 2,
            },
            undefined,
          ],
        }),
        undefined,
      );
    });

    it('uses the base font size when allowFontScaling is disabled', () => {
      mockFontScale(2);

      render(
        <DefaultThemeProvider>
          <TextFallback allowFontScaling={false} font="headline" width={100} />
        </DefaultThemeProvider>,
      );

      expect(MockedFallback).toHaveBeenCalledWith(
        expect.objectContaining({
          height: defaultTheme.fontSize.headline,
          style: [
            {
              paddingTop: (defaultTheme.lineHeight.headline - defaultTheme.fontSize.headline) / 2,
              paddingBottom:
                (defaultTheme.lineHeight.headline - defaultTheme.fontSize.headline) / 2,
            },
            undefined,
          ],
        }),
        undefined,
      );
    });
  });
});
