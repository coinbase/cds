import { useContext } from 'react';
import { Text as RNText } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { render, screen } from '@testing-library/react-native';

import { Text } from '../../../typography/Text';
import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import { Tray, TrayContext } from '../Tray';

const titleText = 'Test Title';

describe('Tray', () => {
  it('renders the Tray and passes a11y', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <Tray onCloseComplete={onCloseCompleteSpy} testID="mock-tray">
            <Text font="body">{loremIpsum}</Text>
          </Tray>
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(loremIpsum)).toBeTruthy();
    expect(screen.getByTestId('mock-tray')).toBeAccessible();
  });
  it('renders a title', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
            {loremIpsum}
          </Tray>
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(titleText)).toBeTruthy();
  });

  it('renders a custom node for title', () => {
    const onCloseCompleteSpy = jest.fn();
    const customTitle = (
      <Text font="title2" testID="test-title">
        Test Title
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <Tray onCloseComplete={onCloseCompleteSpy} title={customTitle}>
            {loremIpsum}
          </Tray>
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-title')).toBeTruthy();
  });
  it('renders a HandleBar', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <Tray onCloseComplete={onCloseCompleteSpy}>{loremIpsum}</Tray>
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('handleBar')).toBeTruthy();
  });

  it('calls onVibilityChange callback on open and close', () => {
    const onVisibilityChangeSpy = jest.fn();
    const onCloseCompleteSpy = jest.fn();
    const { unmount } = render(
      <DefaultThemeProvider>
        <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
          <Tray onCloseComplete={onCloseCompleteSpy} onVisibilityChange={onVisibilityChangeSpy}>
            {loremIpsum}
          </Tray>
        </SafeAreaProvider>
      </DefaultThemeProvider>,
    );

    expect(onVisibilityChangeSpy).toHaveBeenCalledWith('visible');

    unmount();

    expect(onVisibilityChangeSpy).toHaveBeenCalledWith('hidden');
  });

  describe('header and footer', () => {
    it('renders a custom header', () => {
      const onCloseCompleteSpy = jest.fn();
      const customHeader = (
        <Text font="body" testID="test-header">
          Custom Header Content
        </Text>
      );
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray header={customHeader} onCloseComplete={onCloseCompleteSpy}>
              {loremIpsum}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('test-header')).toBeTruthy();
    });

    it('renders a custom footer', () => {
      const onCloseCompleteSpy = jest.fn();
      const customFooter = (
        <Text font="body" testID="test-footer">
          Custom Footer Content
        </Text>
      );
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray footer={customFooter} onCloseComplete={onCloseCompleteSpy}>
              {loremIpsum}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('test-footer')).toBeTruthy();
    });

    it('renders header as render function', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray
              header={({ handleClose: _handleClose }) => (
                <Text font="body" testID="header-render-fn">
                  Header from render function
                </Text>
              )}
              onCloseComplete={onCloseCompleteSpy}
            >
              {loremIpsum}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('header-render-fn')).toBeTruthy();
    });

    it('renders footer as render function', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray
              footer={({ handleClose: _handleClose }) => (
                <Text font="body" testID="footer-render-fn">
                  Footer from render function
                </Text>
              )}
              onCloseComplete={onCloseCompleteSpy}
            >
              {loremIpsum}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('footer-render-fn')).toBeTruthy();
    });

    it('renders children as render function', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray onCloseComplete={onCloseCompleteSpy}>
              {({ handleClose: _handleClose }) => (
                <Text font="body" testID="children-render-fn">
                  Children from render function
                </Text>
              )}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('children-render-fn')).toBeTruthy();
    });
  });

  describe('handleBarVariant', () => {
    it('renders with inside handleBarVariant', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray handleBarVariant="inside" onCloseComplete={onCloseCompleteSpy} title={titleText}>
              {loremIpsum}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('handleBar')).toBeTruthy();
      expect(screen.getByText(titleText)).toBeTruthy();
    });

    it('renders with outside handleBarVariant', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
            <Tray handleBarVariant="outside" onCloseComplete={onCloseCompleteSpy} title={titleText}>
              {loremIpsum}
            </Tray>
          </SafeAreaProvider>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('handleBar')).toBeTruthy();
      expect(screen.getByText(titleText)).toBeTruthy();
    });
  });

  it('renders correctly and provides the correct context value', () => {
    const verticalDrawerPercentageOfView = 0.75;
    const titleHeight = 0;

    // Create a test component that will consume the context value and render it
    const TestComponent = () => {
      const contextValue = useContext(TrayContext);
      return <RNText testID="context-value">{JSON.stringify(contextValue)}</RNText>;
    };

    render(
      <TrayContext.Provider value={{ verticalDrawerPercentageOfView, titleHeight }}>
        <TestComponent />
      </TrayContext.Provider>,
    );

    const contextValueElement = screen.getByTestId('context-value');

    expect(contextValueElement.props.children).toBe(
      JSON.stringify({ verticalDrawerPercentageOfView, titleHeight }),
    );
  });
});
