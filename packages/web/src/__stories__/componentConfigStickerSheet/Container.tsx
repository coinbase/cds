import { memo } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Box, type BoxDefaultElement, type BoxProps } from '@coinbase/cds-web/layout/Box';
import { VStack } from '@coinbase/cds-web/layout/VStack';
import { Text } from '@coinbase/cds-web/typography/Text';

export const Container = memo(
  ({
    title,
    background = 'bg',
    alignSelf = 'stretch',
    alignItems = 'center',
    justifyContent = 'center',
    flexWrap = 'wrap',
    flexGrow = 0,
    flexShrink = 0,
    width = '100%',
    style,
    ...props
  }: BoxProps<BoxDefaultElement>) => {
    const theme = useTheme();
    const isDarkMode = theme.activeColorScheme === 'dark';
    const borderColor = isDarkMode ? '#2f2f2f' : '#e1e1e1';
    return (
      <VStack
        alignSelf={alignSelf}
        background={background}
        flexGrow={flexGrow}
        flexShrink={flexShrink}
        justifyContent={justifyContent}
        style={{ borderRadius: 8, position: 'relative' }}
        width={width}
      >
        {title && (
          <Box
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: 8,
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 200,
                fontFamily: 'var(--defaultFont-sans)',
              }}
            >
              {title}
            </Text>
          </Box>
        )}
        <Box
          alignItems={alignItems}
          alignSelf={alignSelf}
          flexGrow={flexGrow}
          flexShrink={flexShrink}
          flexWrap={flexWrap}
          justifyContent={justifyContent}
          style={{
            marginTop: title ? 36 : 0,
            gap: 16,
            padding: 16,
            ...style,
          }}
          width={width}
          {...props}
        />
      </VStack>
    );
  },
);
