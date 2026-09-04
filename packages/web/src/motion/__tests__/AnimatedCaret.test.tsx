import { useCallback, useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Button } from '../../buttons';
import { VStack } from '../../layout';
import { DefaultThemeProvider } from '../../utils/test';
import { AnimatedCaret } from '../AnimatedCaret';

const rotates = [0, 90, 180, -90];
const MockAnimatedCaret = () => {
  const [rotateIndex, setRotateIndex] = useState(0);

  const handleRotate = useCallback(() => setRotateIndex((prevIndex) => prevIndex + 1), []);

  return (
    <DefaultThemeProvider>
      <VStack>
        <Button onClick={handleRotate}>Rotate</Button>
        <AnimatedCaret rotate={rotates[rotateIndex]} size="l" testID="mock-animated-caret" />
      </VStack>
    </DefaultThemeProvider>
  );
};

describe('AnimatedCaret', () => {
  it('rotates', async () => {
    render(<MockAnimatedCaret />);
    for await (const rotate of rotates.slice(1)) {
      fireEvent.click(screen.getByText('Rotate'));

      await waitFor(() => {
        expect(screen.getByTestId('mock-animated-caret-motion')).toHaveStyle({
          transform: `rotate(${rotate}deg) translateZ(0)`,
        });
      });
    }
  });
});
