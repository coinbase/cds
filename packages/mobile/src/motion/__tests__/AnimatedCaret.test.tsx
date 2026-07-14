import { act, useCallback, useState } from 'react';
import { Animated } from 'react-native';
import { withTimeTravel } from '@coinbase/cds-common/jest/timeTravel';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { VStack } from '../../layout';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { AnimatedCaret } from '../AnimatedCaret';

const rotates = [0, 90, 180, -90];
const caretTestID = 'mock-animated-caret';

const MockAnimatedCaret = () => {
  const [rotateIndex, setRotateIndex] = useState(0);

  const handleRotate = useCallback(() => setRotateIndex((prevIndex) => prevIndex + 1), []);

  return (
    <DefaultThemeProvider>
      <VStack>
        <Button onPress={handleRotate} testID="mock-rotate-button">
          Rotate
        </Button>
        <AnimatedCaret rotate={rotates[rotateIndex]} testID={caretTestID} />
      </VStack>
    </DefaultThemeProvider>
  );
};

const getCaretTransform = () => screen.getByTestId(caretTestID).props.style.transform;

describe('AnimatedCaret', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <AnimatedCaret rotate={1} testID={caretTestID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(caretTestID)).toBeAccessible();
  });

  it('does not animate on mount', () => {
    render(
      <DefaultThemeProvider>
        <AnimatedCaret rotate={180} testID={caretTestID} />
      </DefaultThemeProvider>,
    );

    expect(Animated.timing).not.toHaveBeenCalled();
    expect(getCaretTransform()).toEqual([{ rotate: '180deg' }]);
  });

  it('animates when rotate changes after mount', () => {
    withTimeTravel((timeTravel) => {
      const { rerender } = render(
        <DefaultThemeProvider>
          <AnimatedCaret rotate={180} testID={caretTestID} />
        </DefaultThemeProvider>,
      );

      jest.clearAllMocks();

      rerender(
        <DefaultThemeProvider>
          <AnimatedCaret rotate={0} testID={caretTestID} />
        </DefaultThemeProvider>,
      );

      expect(Animated.timing).toHaveBeenCalled();
      act(() => timeTravel(500));
      expect(getCaretTransform()).toEqual([{ rotate: '0deg' }]);
    });
  });

  it('rotates', () => {
    withTimeTravel((timeTravel) => {
      render(<MockAnimatedCaret />);

      for (let i = 0; i < rotates.length - 1; i += 1) {
        fireEvent.press(screen.getByTestId('mock-rotate-button'));
        act(() => timeTravel(500));
        expect(getCaretTransform()).toEqual([{ rotate: `${rotates[i + 1]}deg` }]);
      }
    });
  });
});
