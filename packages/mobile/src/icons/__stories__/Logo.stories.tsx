import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { ThemeProvider } from '../../system/ThemeProvider';
import { defaultTheme } from '../../themes/defaultTheme';
import { LogoMark } from '../LogoMark';
import { LogoWordmark } from '../LogoWordmark';
import { SubBrandLogoMark } from '../SubBrandLogoMark';
import { SubBrandLogoWordmark } from '../SubBrandLogoWordmark';

const LogoScreen = () => {
  return (
    <ExampleScreen>
      <Example title="LogoMark">
        <HStack>
          <Box paddingEnd={2}>
            <LogoMark size={16} />
          </Box>
          <Box paddingEnd={2}>
            <LogoMark size={24} />
          </Box>
          <Box paddingEnd={2}>
            <LogoMark size={32} />
          </Box>
        </HStack>
        <HStack>
          <Box paddingEnd={2}>
            <LogoMark foreground size={16} />
          </Box>
          <Box paddingEnd={2}>
            <LogoMark foreground size={24} />
          </Box>
          <Box paddingEnd={2}>
            <LogoMark foreground size={32} />
          </Box>
        </HStack>
      </Example>

      <Example title="LogoWordmark">
        <VStack>
          <Box height={30} padding={1}>
            <LogoWordmark />
          </Box>
          <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
            <Box background="bg" height={30} padding={1}>
              <LogoWordmark foreground />
            </Box>
          </ThemeProvider>
          <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
            <Box background="bg" height={30} padding={1}>
              <LogoWordmark foreground />
            </Box>
          </ThemeProvider>
        </VStack>
      </Example>
      <Example title="SubBrandLogoMark">
        <VStack>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="analytics" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="ventures" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="assetHub" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="commerce" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="wallet" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="internationalExchange" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="account" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="card" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="cloud" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="nft" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="pay" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="help" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="tracer" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="exchange" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="one" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark type="business" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark foreground type="privateClient" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoMark foreground type="base" />
          </Box>
        </VStack>
      </Example>

      <Example title="SubBrandLogoWordmark">
        <VStack>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="analytics" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="ventures" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="assetHub" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="commerce" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="wallet" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="internationalExchange" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="account" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="card" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="cloud" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="nft" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="derivativesExchange" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="pay" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="help" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="tracer" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="exchange" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="one" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark type="business" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark foreground type="privateClient" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark foreground type="advanced" />
          </Box>
          <Box height={50} padding={1}>
            <SubBrandLogoWordmark foreground type="prime" />
          </Box>
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default LogoScreen;
