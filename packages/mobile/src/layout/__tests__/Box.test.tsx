import { Animated, StyleSheet, Text, View } from 'react-native';
import { zIndex } from '@coinbase/cds-common/tokens/zIndex';
import { render, screen } from '@testing-library/react-native';

import { LinearGradient } from '../../gradients/LinearGradient';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import type { BoxProps } from '../Box';
import { Box as BoxComponent } from '../Box';
import { OverflowGradient } from '../OverflowGradient';

const Box = (props: BoxProps) => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    <BoxComponent {...props} />
  </ThemeProvider>
);

describe('Box', () => {
  it('renders a view', () => {
    render(
      <Box testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.UNSAFE_queryAllByType(View)).toHaveLength(1);
  });

  it('renders an animated view', () => {
    render(
      <Box animated testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.UNSAFE_queryAllByType(Animated.View)).toHaveLength(1);
  });

  it('renders no background by default', async () => {
    render(
      <Box testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).not.toHaveProperty('backgroundColor');
  });

  it('renders alternate background', async () => {
    render(
      <Box background="bgAlternate" testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      backgroundColor: defaultTheme.lightColor.bgAlternate,
    });
  });

  it('can dangerously override styles', async () => {
    render(
      <Box style={{ backgroundColor: '#000' }} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toHaveStyle({
      backgroundColor: '#000',
    });
  });

  it('renders borders and radius', async () => {
    render(
      <Box bordered borderRadius={200} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      borderColor: defaultTheme.lightColor.bgLine,
      borderRadius: 8,
      borderWidth: 1,
    });
  });

  it('renders elevation 1 styles', async () => {
    render(
      <Box elevation={1} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      elevation: 2,
      shadowColor: '#5B616E',
      shadowOpacity: 0.12,
      shadowRadius: 12,
    });
  });

  it('renders elevation 2 styles', async () => {
    render(
      <Box elevation={2} testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      elevation: 8,
      shadowColor: '#000000',
      shadowOpacity: 0.12,
      shadowRadius: 24,
    });
  });

  it('renders a boxShadow token without a native elevation', async () => {
    const boxShadow = [
      { offsetX: 0, offsetY: 8, blurRadius: 24, color: 'rgba(0, 0, 0, 0.12)' },
    ] as const;

    render(
      <ThemeProvider
        activeColorScheme="light"
        theme={{
          ...defaultTheme,
          shadow: { elevation1: { boxShadow }, elevation2: { boxShadow } },
        }}
      >
        <BoxComponent elevation={1} testID="parent">
          <Text>Child</Text>
        </BoxComponent>
      </ThemeProvider>,
    );

    await screen.findByTestId('parent');

    const style = StyleSheet.flatten(screen.getByTestId('parent').props.style);

    expect(style.boxShadow).toEqual(boxShadow);
    // A boxShadow renders on Android by itself; a native elevation would draw a second shadow.
    expect(style).not.toHaveProperty('elevation');
    expect(style).not.toHaveProperty('shadowColor');
    expect(style).not.toHaveProperty('shadowRadius');
    expect(style).not.toHaveProperty('shadowOpacity');
    expect(style).not.toHaveProperty('shadowOffset');
  });

  it('renders width styles', async () => {
    render(
      <Box maxWidth={789} minWidth="66%" testID="parent" width={321}>
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      width: 321,
      maxWidth: 789,
      minWidth: '66%',
    });
  });

  it('renders height styles', async () => {
    render(
      <Box height={321} maxHeight={789} minHeight="66%" testID="parent">
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      height: 321,
      maxHeight: 789,
      minHeight: '66%',
    });
  });

  it('renders position styles', async () => {
    render(
      <Box
        bottom={8}
        left="1000%"
        position="absolute"
        right={30}
        testID="parent"
        top={25}
        zIndex={zIndex.alert}
      >
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      bottom: 8,
      left: '1000%',
      position: 'absolute',
      right: 30,
      top: 25,
      zIndex: 7,
    });
  });

  it('renders flex styles', async () => {
    render(
      <Box
        alignContent="space-around"
        alignItems="center"
        alignSelf="auto"
        flexBasis="50%"
        flexDirection="column-reverse"
        flexGrow={2}
        flexShrink={3}
        flexWrap="nowrap"
        justifyContent="space-evenly"
        testID="parent"
      >
        <Text>Child</Text>
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.getByTestId('parent')).toHaveStyle({
      alignContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'auto',
      flexBasis: '50%',
      flexDirection: 'column-reverse',
      flexGrow: 2,
      flexShrink: 3,
      flexWrap: 'nowrap',
      justifyContent: 'space-evenly',
    });
  });

  it('renders an overflow gradient', async () => {
    render(
      <Box testID="parent">
        <Text>Child</Text>
        <OverflowGradient />
      </Box>,
    );

    await screen.findByTestId('parent');

    expect(screen.getByTestId('parent')).toBeAccessible();

    expect(screen.UNSAFE_queryAllByType(LinearGradient)).toHaveLength(1);
  });

  describe('spacing', () => {
    it('renders all', async () => {
      render(
        <Box padding={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        padding: 8,
      });
    });

    it('renders horizontal', async () => {
      render(
        <Box paddingX={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingStart: 8,
        paddingEnd: 8,
      });
    });

    it('renders vertical', async () => {
      render(
        <Box paddingY={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 8,
      });
    });

    it('renders start/end', async () => {
      render(
        <Box paddingEnd={2} paddingStart={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingStart: 8,
        paddingEnd: 16,
      });
    });

    it('renders individual', async () => {
      render(
        <Box paddingBottom={2} paddingEnd={4} paddingStart={3} paddingTop={1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toBeAccessible();

      expect(screen.getByTestId('parent')).toHaveStyle({
        paddingTop: 8,
        paddingBottom: 16,
        paddingStart: 24,
        paddingEnd: 32,
      });
    });
  });

  describe('offset', () => {
    it('renders all', async () => {
      render(
        <Box margin={-1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        margin: -8,
      });
    });

    it('renders horizontal', async () => {
      render(
        <Box marginX={-1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginStart: -8,
        marginEnd: -8,
      });
    });

    it('renders vertical', async () => {
      render(
        <Box marginY={-1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -8,
      });
    });

    it('renders start/end', async () => {
      render(
        <Box marginEnd={-2} marginStart={-1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginStart: -8,
        marginEnd: -16,
      });
    });

    it('renders individual', async () => {
      render(
        <Box marginBottom={-2} marginEnd={-4} marginStart={-3} marginTop={-1} testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        marginTop: -8,
        marginBottom: -16,
        marginStart: -24,
        marginEnd: -32,
      });
    });
  });

  describe('pin', () => {
    it('renders "top" pin', async () => {
      render(
        <Box pin="top" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      });
    });

    it('renders "bottom" pin', async () => {
      render(
        <Box pin="bottom" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      });
    });

    it('renders "right" pin', async () => {
      render(
        <Box pin="right" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
      });
    });

    it('renders "left" pin', async () => {
      render(
        <Box pin="left" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
      });
    });

    it('renders "all" pin', async () => {
      render(
        <Box pin="all" testID="parent">
          <Text>Child</Text>
        </Box>,
      );

      await screen.findByTestId('parent');

      expect(screen.getByTestId('parent')).toHaveStyle({
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      });
    });
  });
});
