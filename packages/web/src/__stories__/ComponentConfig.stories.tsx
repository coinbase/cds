import { ComponentConfigProvider, ThemeProvider } from '../system';

import { customComponentConfig } from './componentConfigStickerSheet/customComponentConfig';
import { customTheme } from './componentConfigStickerSheet/customTheme';
import { StickerSheet } from './componentConfigStickerSheet/StickerSheet';

export const Default = () => <StickerSheet />;
export const Custom = () => (
  <ThemeProvider activeColorScheme="dark" theme={customTheme}>
    <ComponentConfigProvider value={customComponentConfig}>
      <StickerSheet />
    </ComponentConfigProvider>
  </ThemeProvider>
);

export default {
  title: 'ComponentConfig',
  component: ComponentConfigProvider,
};
