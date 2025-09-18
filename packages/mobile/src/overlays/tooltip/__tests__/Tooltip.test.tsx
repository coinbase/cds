import { renderHook } from '@testing-library/react-hooks';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../../buttons';
import { useDimensions } from '../../../hooks/useDimensions';
import { DefaultThemeProvider } from '../../../utils/testHelpers';
import { Tooltip } from '../Tooltip';
import type { TooltipPlacement, TooltipProps, UseTooltipPositionParams } from '../TooltipProps';
import { useTooltipPosition } from '../useTooltipPosition';

import { basicCenterSubject } from './UseTooltipPositionTestData';

jest.mock('../../../hooks/useDimensions');
const mockUseDimensions = (mocks: ReturnType<typeof useDimensions>) => {
  (useDimensions as jest.Mock).mockReturnValue(mocks);
};

const mockPlatformAndroid = () => {
  jest.mock('react-native/Libraries/Utilities/Platform', () => {
    const Platform = jest.requireActual<Record<string, unknown>>(
      'react-native/Libraries/Utilities/Platform',
    );
    Platform.OS = 'android';
    return Platform;
  });
};

const createHookInstance = (options: UseTooltipPositionParams) => {
  return renderHook(
    () => {
      return useTooltipPosition(options);
    },
    { wrapper: DefaultThemeProvider },
  );
};

const contentText = 'Test content';
const subjectText = 'Open Tooltip';

const MockTooltip = ({ children, ...props }: Omit<TooltipProps, 'content'>) => (
  <DefaultThemeProvider>
    <Tooltip content={contentText} {...props}>
      {children}
    </Tooltip>
  </DefaultThemeProvider>
);

describe('Tooltip', () => {
  describe('useTooltipPosition', () => {
    describe('when tooltip does not break screen boundaries', () => {
      it('positions itself above subject', () => {
        mockUseDimensions(basicCenterSubject.dimensions);
        mockPlatformAndroid();

        const placement: TooltipPlacement = 'top';
        const { subjectLayout, tooltipLayout, expectedTop } = basicCenterSubject;

        const { result } = createHookInstance({
          placement,
          subjectLayout,
          tooltipLayout,
        });

        expect(result.current.opacity).toEqual(expectedTop.opacity);
        expect(result.current.start).toEqual(expectedTop.start);
        expect(result.current.top).toEqual(expectedTop.top);
      });
      it.todo('positions itself below subject');
    });

    describe('when tooltip must adjust for horizontal screen boundaries', () => {
      describe('on left', () => {
        it.todo('should correct above subject');
        it.todo('should correct below subject');
      });

      describe('on right', () => {
        it.todo('should correct above subject');
        it.todo('should correct below subject');
      });
    });
  });
  it('opens the Tooltip when the subject (as an element) is pressed and fires onOpenTooltip', async () => {
    const onOpenTooltip = jest.fn();
    render(
      <MockTooltip
        accessibilityHint="test-a11y-hint"
        accessibilityLabel="test-a11y-label"
        onOpenTooltip={onOpenTooltip}
      >
        <Button>{subjectText}</Button>
      </MockTooltip>,
    );

    // since the subject is wrapped in a TouchableOpacity which swallows events on children
    // have to getBy on the a11y label which ends up getting applied to the subject wrapper
    // when the subject is an element/node
    fireEvent.press(screen.getByAccessibilityHint('test-a11y-hint'));

    expect(await screen.findByText(contentText)).toBeTruthy();
    expect(onOpenTooltip).toHaveBeenCalled();
  });
});
