import { fireEvent, render, screen } from '@testing-library/react-native';

import { Icon } from '../../icons/Icon';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { DotSymbol } from '../DotSymbol';

const DOTSYMBOL_TESTID = 'dot-symbol-test';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('DotSymbol', () => {
  it('passes a11y', () => {
    render(
      <DefaultThemeProvider>
        <DotSymbol source={{ uri: src }} testID={DOTSYMBOL_TESTID} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(DOTSYMBOL_TESTID)).toBeAccessible();
  });

  it('renders a DotSymbol', () => {
    render(
      <DefaultThemeProvider>
        <DotSymbol source={{ uri: src }} testID={DOTSYMBOL_TESTID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(DOTSYMBOL_TESTID)).toBeTruthy();
  });

  it('renders an image', () => {
    render(
      <DefaultThemeProvider>
        <DotSymbol source={{ uri: src }} testID={DOTSYMBOL_TESTID} />
      </DefaultThemeProvider>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSYMBOL_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: 12, width: 12 } },
    });

    expect(screen.getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });

  it('renders an image when source is a string', () => {
    render(
      <DefaultThemeProvider>
        <DotSymbol source={src} testID={DOTSYMBOL_TESTID} />
      </DefaultThemeProvider>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSYMBOL_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: 12, width: 12 } },
    });

    expect(screen.getByTestId('dotsymbol-remote-image').props.source).toEqual({ uri: src });
  });

  it('passes a11y for DotSymbol that have a children', () => {
    render(
      <DefaultThemeProvider>
        <DotSymbol pin="bottom-start" source={src} testID={DOTSYMBOL_TESTID}>
          <Icon name="airdrop" size="l" />
        </DotSymbol>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId(DOTSYMBOL_TESTID)).toBeAccessible();
  });

  it('Placed in the correct position relative to its children', () => {
    const iconSize = 24;
    const dotSize = 16;

    render(
      <DefaultThemeProvider>
        <DotSymbol pin="bottom-start" source={src} testID={DOTSYMBOL_TESTID}>
          <Icon name="airdrop" size="l" />
        </DotSymbol>
      </DefaultThemeProvider>,
    );

    // Trigger onLayout for the icon
    fireEvent(screen.getByTestId(`${DOTSYMBOL_TESTID}-children`), 'layout', {
      nativeEvent: { layout: { height: iconSize, width: iconSize } },
    });

    expect(screen.getByTestId('dotsymbol-inner-container')).toHaveStyle({
      position: 'absolute',
      transform: [
        {
          translateX: -(dotSize / 2),
        },
        {
          translateY: iconSize - dotSize / 2,
        },
      ],
    });
  });
});
