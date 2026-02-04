import React, { createContext, useCallback, useContext, useMemo, useRef } from 'react';
import { ScrollView } from 'react-native';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import type { PaddingProps } from '@coinbase/cds-common/types';

import { useTheme } from '../hooks/useTheme';
import type { BoxBaseProps, BoxProps } from '../layout/Box';
import { Box } from '../layout/Box';
import { Divider } from '../layout/Divider';
import { VStack } from '../layout/VStack';
import { Text } from '../typography/Text';

type ExampleRenderChildren = () => NonNullable<JSX.Element>;
export type ExampleProps = {
  children: ExampleRenderChildren | React.ReactNode[] | React.ReactNode;
  inline?: boolean;
  title?: string;
  hideDivider?: boolean;
  titlePadding?: PaddingProps;
} & Omit<BoxProps, 'children'>;

const ExampleContext = createContext<{
  registerExample: () => number;
}>({ registerExample: () => 0 });

export const Example = ({
  children,
  inline,
  title,
  titlePadding,
  hideDivider,
  ...props
}: ExampleProps) => {
  const { registerExample } = useContext(ExampleContext);

  // Register exactly once during first render
  const exampleNumberRef = useRef<number>();
  if (exampleNumberRef.current === undefined) {
    exampleNumberRef.current = registerExample();
  }

  const exampleLabel = `Example ${exampleNumberRef.current}`;

  return (
    <VStack
      accessibilityLabel={exampleLabel}
      alignItems={inline ? 'flex-start' : undefined}
      background="bg"
      gap={2}
      paddingBottom={3}
      {...props}
    >
      {!!title && (
        <Text color="fgPrimary" font="title3" {...titlePadding}>
          {title}
        </Text>
      )}

      {typeof children === 'function' ? children() : children}
      {!hideDivider && <Divider background="bgLine" />}
    </VStack>
  );
};

export const ExampleScreen = React.forwardRef<ScrollView, React.PropsWithChildren<BoxBaseProps>>(
  ({ children, ...boxProps }, ref) => {
    const theme = useTheme();

    // Use ref to track count - this avoids stale closure issues when multiple
    // Example components mount simultaneously
    const exampleCountRef = useRef(0);
    const registerExample = useCallback(() => {
      exampleCountRef.current += 1;
      return exampleCountRef.current;
    }, []);

    const context = useMemo(() => ({ registerExample }), [registerExample]);
    return (
      <ExampleContext.Provider value={context}>
        <Box
          borderedTop
          background="bg"
          borderColor="bgLineHeavy"
          paddingX={gutter}
          testID="mobile-playground-screen"
          {...boxProps}
        >
          <ScrollView
            ref={ref}
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="always"
            persistentScrollbar={false}
            showsVerticalScrollIndicator={false}
            style={{
              backgroundColor: theme.color.bg,
              height: '100%',
              paddingTop: theme.space[2],
            }}
          >
            {children}
          </ScrollView>
        </Box>
      </ExampleContext.Provider>
    );
  },
);
ExampleScreen.displayName = 'ExampleScreen';
