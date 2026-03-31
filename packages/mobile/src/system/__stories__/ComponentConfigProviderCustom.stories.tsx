import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { ComponentConfigProvider, ThemeProvider } from '..';

import { customComponentConfig } from './componentConfigStickerSheet/customComponentConfig';
import { customTheme } from './componentConfigStickerSheet/customTheme';
import { StickerSheet } from './componentConfigStickerSheet/StickerSheet';

const ComponentConfigProviderCustomStory = () => {
  return (
    <ExampleScreen>
      <Example title="ComponentConfigProviderCustom">
        <ThemeProvider activeColorScheme="dark" theme={customTheme}>
          <ComponentConfigProvider value={customComponentConfig}>
            <StickerSheet />
          </ComponentConfigProvider>
        </ThemeProvider>
      </Example>
    </ExampleScreen>
  );
};

export default ComponentConfigProviderCustomStory;
