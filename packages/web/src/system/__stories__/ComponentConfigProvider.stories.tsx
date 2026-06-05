import { customComponentConfig } from '../../__stories__/componentConfigStickerSheet/customComponentConfig';
import { customTheme } from '../../__stories__/componentConfigStickerSheet/customTheme';
import { StickerSheet } from '../../__stories__/componentConfigStickerSheet/StickerSheet';
import { ComponentConfigProvider } from '../ComponentConfigProvider';
import { ThemeProvider } from '../ThemeProvider';

export default {
  title: 'Components/ComponentConfigProvider',
};

export const Default = () => <StickerSheet />;
Default.parameters = {
  a11y: {
    context: {
      include: ['body'],
      exclude: ['.no-a11y-checks'],
    },
  },
};

export const Custom = () => (
  <ThemeProvider activeColorScheme="dark" theme={customTheme}>
    <ComponentConfigProvider value={customComponentConfig}>
      <StickerSheet />
    </ComponentConfigProvider>
  </ThemeProvider>
);

Custom.parameters = { a11y: { disable: true } };
