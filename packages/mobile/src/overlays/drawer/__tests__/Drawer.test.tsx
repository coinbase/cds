import { useCallback, useState } from 'react';
import { Modal } from 'react-native';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';
import { drawerAnimationDefaultDuration } from '@coinbase/cds-common/animation/drawer';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { durations } from '@coinbase/cds-common/motion/tokens';
import { delay } from '@coinbase/cds-common/utils/delay';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import { Button } from '../../../buttons';
import { VStack } from '../../../layout/VStack';
import { Text } from '../../../typography/Text';
import { DefaultThemeProvider, SAFE_AREA_METRICS } from '../../../utils/testHelpers';
import type { DrawerBaseProps } from '../Drawer';
import { Drawer } from '../Drawer';

// We're using the drawers animation time here just to be extra close to the implementation
const DURATION: number = Number(durations[drawerAnimationDefaultDuration ?? 'moderate3']) + 10;

type LoremIpsumProps = {
  title?: string;
  concise?: boolean;
  repeat?: number;
};

const LoremIpsum = ({ title, concise, repeat }: LoremIpsumProps) => {
  return (
    <>
      <Text font="label1" paddingBottom={1} renderEmptyNode={false}>
        {title}
      </Text>
      {concise ? null : (
        <Text font="body" paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </Text>
      )}
    </>
  );
};

const MockDrawer = ({
  onCloseComplete,
  pin = 'bottom',
  preventDismissGestures,
}: Partial<DrawerBaseProps>) => {
  const [isVisible, setIsVisible] = useState(false);
  const setIsVisibleOn = useCallback(() => setIsVisible(true), [setIsVisible]);

  const handleRequestClose = () => {
    onCloseComplete?.();
    setIsVisible(false);
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Button onPress={setIsVisibleOn} testID="open-drawer-button">
        Open Drawer
      </Button>
      {isVisible ? (
        <Drawer
          onCloseComplete={handleRequestClose}
          pin={pin}
          preventDismissGestures={preventDismissGestures}
          visible={isVisible}
        >
          {({ handleClose }) => (
            <VStack padding={2}>
              <LoremIpsum />
              <Button onPress={handleClose} testID="close-drawer-button">
                Close Drawer
              </Button>
            </VStack>
          )}
        </Drawer>
      ) : null}
    </SafeAreaProvider>
  );
};

const MockDrawerWithSafeArea = ({ ...props }) => {
  return (
    <SafeAreaProvider initialMetrics={SAFE_AREA_METRICS}>
      <DefaultThemeProvider>
        <MockDrawer {...props} />
      </DefaultThemeProvider>
    </SafeAreaProvider>
  );
};

// TODO: figure out how to write tests for overlay press (doesn't capture press event) and status bar visibility (no testId's or way of selecting)
describe('Drawer', () => {
  beforeAll(() => {
    jest.useRealTimers();
  });
  it('renders the Drawer', () => {
    render(<MockDrawerWithSafeArea />);

    expect(screen.UNSAFE_queryAllByType(Modal)).toBeTruthy();
  });
  it('opens the Drawer when trigger is pressed', () => {
    render(<MockDrawerWithSafeArea />);

    fireEvent.press(screen.getByTestId('open-drawer-button'));

    expect(screen.getByText(loremIpsum)).toBeTruthy();
  });
  it('closes the Drawer when the close button is pressed', async () => {
    const onCloseComplete = jest.fn();
    render(<MockDrawerWithSafeArea onCloseComplete={onCloseComplete} />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    fireEvent.press(screen.getByText('Close Drawer'));
    // wait for animation to finish
    await waitFor(() => expect(onCloseComplete).toHaveBeenCalledTimes(1));
  });
  it('has a HandleBar by default for bottom pinned Drawer', () => {
    render(<MockDrawerWithSafeArea pin="bottom" />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    expect(screen.getByTestId('handleBar')).toBeTruthy();
  });
  it('closes the drawer when HandleBar accessibility action is triggered', async () => {
    const onCloseComplete = jest.fn();
    render(<MockDrawerWithSafeArea onCloseComplete={onCloseComplete} pin="bottom" />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    const handleBar = screen.getByTestId('handleBar');
    fireEvent(handleBar, 'onAccessibilityAction', {
      nativeEvent: { actionName: 'activate' },
    });

    // wait for animation to finish
    await waitFor(() => expect(onCloseComplete).toHaveBeenCalledTimes(1));
  });
  it('does not close the drawer on overlay press when preventDismissGestures is true', async () => {
    const onCloseComplete = jest.fn();
    render(<MockDrawerWithSafeArea preventDismissGestures onCloseComplete={onCloseComplete} />);

    fireEvent.press(screen.getByText('Open Drawer'));
    expect(screen.getByText(loremIpsum)).toBeTruthy();

    fireEvent(screen.getByTestId('drawer-overlay'), 'onTouchStart');

    // Make sure the drawer is still visible after the expected animation duration
    await delay(DURATION);
    expect(onCloseComplete).not.toHaveBeenCalled();
  });
});
