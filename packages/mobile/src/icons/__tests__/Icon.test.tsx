import * as ReactNative from 'react-native';
import { render, screen } from '@testing-library/react-native';

import type { ComponentConfig } from '../../core/componentConfig';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { IconProps } from '../Icon';
import { Icon } from '../Icon';

const testID = 'test-icon';
const IconExample = (props: Omit<IconProps, 'name' | 'size'>) => (
  <DefaultThemeProvider>
    <Icon name="copy" size="m" {...props} />
  </DefaultThemeProvider>
);

describe('Icon', () => {
  it('passes accessibility', async () => {
    render(<IconExample testID={testID} />);

    expect(screen.getByTestId(testID)).toBeAccessible();
  });

  it('sets accessibility attributes and labels', () => {
    render(<IconExample accessibilityHint="An icon hint" accessibilityLabel="An icon label" />);

    expect(screen.getByRole('image')).toHaveProp('accessible', true);
    expect(screen.getByLabelText('An icon label')).toBeTruthy();
    expect(screen.getByHintText('An icon hint')).toBeTruthy();
  });

  describe('allowFontScaling', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    const mockFontScale = (fontScale: number) => {
      jest.spyOn(ReactNative, 'useWindowDimensions').mockReturnValue({
        fontScale,
        height: 812,
        scale: 2,
        width: 375,
      });
    };

    it('scales with device font settings by default', () => {
      mockFontScale(2);
      render(<IconExample accessibilityLabel="copy icon" />);

      expect(screen.getByLabelText('copy icon')).toHaveStyle({
        fontSize: 48,
        height: 48,
        width: 48,
        lineHeight: 48,
      });
    });

    it('uses the base icon size when allowFontScaling is disabled', () => {
      mockFontScale(2);
      render(<IconExample accessibilityLabel="copy icon" allowFontScaling={false} />);

      expect(screen.getByLabelText('copy icon')).toHaveStyle({
        fontSize: 24,
        height: 24,
        width: 24,
        lineHeight: 24,
      });
    });

    it('applies provider config defaults', () => {
      mockFontScale(2);
      const config: ComponentConfig = {
        Icon: {
          allowFontScaling: false,
        },
      };

      render(
        <DefaultThemeProvider>
          <ComponentConfigProvider value={config}>
            <Icon accessibilityLabel="copy icon" name="copy" size="m" />
          </ComponentConfigProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByLabelText('copy icon')).toHaveStyle({
        fontSize: 24,
        height: 24,
        width: 24,
        lineHeight: 24,
      });
    });

    it('allows local props to override provider defaults', () => {
      mockFontScale(2);
      const config: ComponentConfig = {
        Icon: {
          allowFontScaling: false,
        },
      };

      render(
        <DefaultThemeProvider>
          <ComponentConfigProvider value={config}>
            <Icon accessibilityLabel="copy icon" allowFontScaling name="copy" size="m" />
          </ComponentConfigProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByLabelText('copy icon')).toHaveStyle({
        fontSize: 48,
        height: 48,
        width: 48,
        lineHeight: 48,
      });
    });
  });
});
