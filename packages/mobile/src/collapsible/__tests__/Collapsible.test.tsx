import { useCallback, useId, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { Collapsible } from '../Collapsible';

jest.mock('../../hooks/useContentSize', () => ({
  useContentSize: () => [{ width: 300, height: 700 }, () => null],
}));

const MockCollapsible = ({ defaultCollapsed = true }: { defaultCollapsed?: boolean }) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const collapsibleId = useId();
  const toggleCollapsed = useCallback(() => setCollapsed((prev) => !prev), [setCollapsed]);
  return (
    <DefaultThemeProvider>
      <Button
        disableDebounce
        aria-controls={collapsibleId}
        aria-expanded={!collapsed}
        onPress={toggleCollapsed}
        testID="mock-collapse-trigger"
      >
        Click me!
      </Button>
      <Collapsible collapsed={collapsed} testID="mock-collapse">
        <Text font="body">Collapsible Content</Text>
      </Collapsible>
    </DefaultThemeProvider>
  );
};

describe('Collapsible', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders collapsed content', () => {
    render(<MockCollapsible />);

    const view = screen.getByTestId('mock-collapse');

    expect(view).toHaveAnimatedStyle({ height: 0, opacity: 0 });

    expect(screen.UNSAFE_queryByProps({ collapsed: true })).toBeTruthy();
    expect(screen.getByText('Collapsible Content')).toBeTruthy();
  });

  it('expands and collapses', () => {
    render(<MockCollapsible />);

    const style = { opacity: 0 };

    const view = screen.getByTestId('mock-collapse');
    // TODO: figure out how to trigger layout event in scroll view content container
    // const scrollView = screen.getByTestId('mock-collapse-scroll-view');

    // fireEvent(scrollView, 'layout', {
    //   nativeEvent: { layout: { height: 20, width: 100 } },
    // });

    expect(view).toHaveAnimatedStyle(style);

    // expand
    fireEvent.press(screen.getByTestId('mock-collapse-trigger'));
    jest.advanceTimersByTime(350);
    style.opacity = 1;
    expect(view).toHaveAnimatedStyle(style);

    // collapse
    fireEvent.press(screen.getByTestId('mock-collapse-trigger'));
    jest.advanceTimersByTime(300);
    style.opacity = 0;
    expect(view).toHaveAnimatedStyle(style);
  });

  it('skips animation if initially expanded', () => {
    render(<MockCollapsible defaultCollapsed={false} />);

    const style = { opacity: 1 };
    const view = screen.getByTestId('mock-collapse');
    jest.advanceTimersByTime(0);
    expect(view).not.toHaveAnimatedStyle(style);

    // collapse
    fireEvent.press(screen.getByTestId('mock-collapse-trigger'));
    jest.advanceTimersByTime(300);
    style.opacity = 0;
    expect(view).toHaveAnimatedStyle(style);
  });
});
