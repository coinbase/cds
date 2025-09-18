import { useCallback } from 'react';
import { ScrollView } from 'react-native';
import { renderHook } from '@testing-library/react-hooks';
import { cleanup, fireEvent, render, screen } from '@testing-library/react-native';

import { Button } from '../../buttons';
import { Box } from '../../layout';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { useScrollTo } from '../useScrollTo';

jest.mock('react-native/Libraries/Components/ScrollView/ScrollView');

describe('useScrollTo', () => {
  afterEach(cleanup);

  it('returns ref and scrollTo', () => {
    const { result } = renderHook(() => useScrollTo());
    expect(result.current[0]).not.toBeNull();
    expect(result.current[1]).not.toBeNull();
  });

  it('fires scrollTo on ScrollView', () => {
    const MockUsage = () => {
      const [scrollRef, { scrollTo }] = useScrollTo();
      const onPress = useCallback(() => scrollTo({ x: 400 }), [scrollTo]);
      return (
        <DefaultThemeProvider>
          <Box>
            <Button onPress={onPress} testID="Button">
              Scroll To
            </Button>
            <ScrollView ref={scrollRef} horizontal>
              <Box width={900} />
            </ScrollView>
          </Box>
        </DefaultThemeProvider>
      );
    };
    render(<MockUsage />);
    fireEvent.press(screen.getByTestId('Button'));
    expect(screen.UNSAFE_getByType(ScrollView).instance.scrollTo).toHaveBeenCalledWith({
      x: 400,
      y: 0,
      animated: true,
    });
  });

  it('fires scrollToEnd on ScrollView', () => {
    const MockUsage = () => {
      const [scrollRef, { scrollToEnd }] = useScrollTo();
      const onPress = useCallback(() => scrollToEnd(), [scrollToEnd]);
      return (
        <DefaultThemeProvider>
          <Box>
            <Button onPress={onPress} testID="Button">
              Scroll To
            </Button>
            <ScrollView ref={scrollRef} horizontal>
              <Box width={900} />
            </ScrollView>
          </Box>
        </DefaultThemeProvider>
      );
    };
    render(<MockUsage />);
    fireEvent.press(screen.getByTestId('Button'));
    expect(screen.UNSAFE_getByType(ScrollView).instance.scrollToEnd).toHaveBeenCalled();
  });
});
