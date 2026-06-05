import React from 'react';
import type { View } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider, treeHasStyleProp } from '../../utils/testHelpers';
import type { MobileBannerProps } from '../Banner';
import { Banner } from '../Banner';

const TEST_ID = 'test-banner';

const MockBanner = ({
  title = 'Failure Message',
  startIcon = 'info',
  variant = 'warning',
  testID = TEST_ID,
  ...props
}: Partial<MobileBannerProps>) => (
  <DefaultThemeProvider>
    <Banner startIcon={startIcon} testID={testID} title={title} variant={variant} {...props}>
      <Text font="body">Banner content</Text>
    </Banner>
  </DefaultThemeProvider>
);

describe('Banner', () => {
  it('renders a Banner', () => {
    render(<MockBanner />);

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });

  it('inner-end-box should be an VStack', () => {
    render(<MockBanner />);

    const innerEndBox = screen.getByTestId(`${TEST_ID}-inner-end-box`);

    expect(innerEndBox).toHaveStyle({
      flexDirection: 'column',
    });
  });

  it('keeps a stable root wrapper regardless of dismiss state', () => {
    const { rerender, toJSON } = render(<MockBanner />);

    const visibleTree = toJSON();
    expect(visibleTree).toBeTruthy();
    expect(Array.isArray(visibleTree)).toBe(false);
    expect(visibleTree).toHaveProperty('type', 'View');

    rerender(<MockBanner showDismiss />);

    const dismissibleTree = toJSON();
    expect(dismissibleTree).toBeTruthy();
    expect(Array.isArray(dismissibleTree)).toBe(false);
    expect(dismissibleTree).toHaveProperty('type', 'View');
  });

  it('applies styles.root and styles.content', () => {
    const { toJSON } = render(
      <MockBanner
        styles={{
          content: { borderBottomWidth: 2 },
          root: { borderTopWidth: 1 },
        }}
      />,
    );

    const tree = toJSON();
    expect(treeHasStyleProp(tree, (s) => s.borderTopWidth === 1)).toBe(true);
    expect(treeHasStyleProp(tree, (s) => s.borderBottomWidth === 2)).toBe(true);
  });
});

describe('Banner actions', () => {
  it('fires `onClose` when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} testID={TEST_ID} />);

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dismiss-btn`);

    fireEvent.press(dismissBtn);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Bannner collapses when dismiss icon button is pressed', () => {
    const spy = jest.fn();
    render(<MockBanner showDismiss onClose={spy} />);

    const dismissBtn = screen.getByTestId(`${TEST_ID}-dismiss-btn`);

    // Before dismiss is pressed, banner should be visible
    expect(screen.UNSAFE_getByProps({ collapsed: false })).toBeTruthy();

    fireEvent.press(dismissBtn);
    expect(spy).toHaveBeenCalledTimes(1);

    // After dismiss is pressed, banner should be collapsed
    expect(screen.UNSAFE_getByProps({ collapsed: true })).toBeTruthy();
  });

  it('Banner forwardRef works as expected', () => {
    const ref = React.createRef<View>();
    render(
      <DefaultThemeProvider>
        <Banner
          ref={ref}
          startIcon="cashUSD"
          testID={TEST_ID}
          title="Banner title"
          variant="warning"
        >
          <Text font="body">Content</Text>
        </Banner>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toBeTruthy();
  });
});
