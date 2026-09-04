import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import type { TextProps } from '../Text';
import { Text } from '../Text';

const TextExamplesScreen = ({
  component: TextComponent,
  extraExample,
}: {
  component: React.ComponentType<React.PropsWithChildren<TextProps>>;
  extraExample?: React.ReactNode;
}) => {
  return (
    <ExampleScreen>
      <Example accessibilityRole="header" title="Mono">
        <TextComponent mono>Mono font</TextComponent>
      </Example>
      <Example title="Colors">
        <Box>
          <TextComponent>Default foreground</TextComponent>
        </Box>

        <Box>
          <TextComponent color="fgMuted">Muted foreground</TextComponent>
        </Box>

        <Box>
          <TextComponent color="fgPrimary">Primary foreground</TextComponent>
        </Box>

        <Box background="bgPrimary" padding={1}>
          <TextComponent color="fgInverse">Foreground ON primary</TextComponent>
        </Box>

        <Box background="bgSecondary" padding={1}>
          <TextComponent color="fg">Foreground ON secondary</TextComponent>
        </Box>

        <Box>
          <TextComponent color="fgPositive">Positive foreground</TextComponent>
        </Box>

        <Box background="bgPositive" padding={1}>
          <TextComponent color="fgInverse">Foreground ON positive</TextComponent>
        </Box>

        <Box>
          <TextComponent color="fgNegative">Negative foreground</TextComponent>
        </Box>

        <Box background="bgNegative" padding={1}>
          <TextComponent color="fgInverse">Foreground ON negative</TextComponent>
        </Box>
      </Example>

      <Example title="Alignment">
        <Box>
          <TextComponent align="start">Align start</TextComponent>
        </Box>

        <Box>
          <TextComponent align="center">Align center</TextComponent>
        </Box>

        <Box>
          <TextComponent align="end">Align end</TextComponent>
        </Box>

        <Box>
          <TextComponent align="justify">
            Align justify (iOS only, will start align on Android)
          </TextComponent>
        </Box>
      </Example>

      <Example title="Casing">
        <Box>
          <TextComponent textTransform="uppercase">Uppercased text</TextComponent>
        </Box>

        <Box>
          <TextComponent textTransform="lowercase">Lowercased text</TextComponent>
        </Box>

        <Box>
          <TextComponent textTransform="capitalize">Capitalized text</TextComponent>
        </Box>
      </Example>

      <Example title="Ellipsize">
        <Box>
          <TextComponent ellipsize="head">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </TextComponent>
        </Box>

        <Box>
          <TextComponent ellipsize="middle">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </TextComponent>
        </Box>

        <Box>
          <TextComponent ellipsize="tail">
            Truncate. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo
            nulla. Nam eu blandit dui, a dignissim mi.
          </TextComponent>
        </Box>

        <Box>
          <TextComponent ellipsize="clip">
            Clip. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eu justo nulla.
            Nam eu blandit dui, a dignissim mi.
          </TextComponent>
        </Box>
      </Example>

      <Example title="Slashed zeros">
        <Box>
          <TextComponent>$1,305.00</TextComponent>
        </Box>
      </Example>

      <Example title="Tabular numbers">
        <Box>
          <TextComponent tabularNumbers>91.23450</TextComponent>
          <TextComponent tabularNumbers>11.98762</TextComponent>
        </Box>
      </Example>

      <Example title="Disabled">
        <Box>
          <TextComponent disabled>Hello</TextComponent>
        </Box>
      </Example>

      {extraExample}

      <Example title="Inherited Font">
        <Box>
          <TextComponent>
            This Text element uses one font family and the inner Text element - Hello World inherits
            it but overrides the font size
            <TextComponent fontSize="legal"> Hello World</TextComponent>
          </TextComponent>
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default TextExamplesScreen;
