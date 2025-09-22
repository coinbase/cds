import { act, useCallback, useState } from 'react';
import { withTimeTravel } from '@cbhq/cds-common/jest/timeTravel';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { VStack } from '../../layout';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { AnimatedCaret } from '../AnimatedCaret';

const rotates = [0, 90, 180, -90];
const MockAnimatedCaret = () => {
  const [rotateIndex, setRotateIndex] = useState(0);

  const handleRotate = useCallback(() => setRotateIndex((prevIndex) => prevIndex + 1), []);

  return (
    <DefaultThemeProvider>
      <VStack>
        <Button onPress={handleRotate} testID="mock-rotate-button">
          Rotate
        </Button>
        <AnimatedCaret rotate={rotates[rotateIndex]} testID="mock-animated-caret" />
      </VStack>
    </DefaultThemeProvider>
  );
};

describe('AnimatedCaret', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <AnimatedCaret rotate={1} testID="mock-animated-caret" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('mock-animated-caret')).toBeAccessible();
  });

  it('rotates', () => {
    withTimeTravel((timeTravel) => {
      render(<MockAnimatedCaret />);

      for (let i = 0; i < rotates.length - 1; i += 1) {
        fireEvent.press(screen.getByTestId('mock-rotate-button'));
        act(() => timeTravel(500));
        expect(screen.getByTestId('mock-animated-caret').props.style.transform).toEqual([
          { rotate: `${rotates[i + 1]}deg` },
        ]);
      }
    });
  });
});
