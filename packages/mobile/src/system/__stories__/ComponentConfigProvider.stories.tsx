import { Example, ExampleScreen } from '../../examples/ExampleScreen';

import { StickerSheet } from './componentConfigStickerSheet/StickerSheet';

const ComponentConfigProviderStory = () => {
  return (
    <ExampleScreen>
      <Example title="ComponentConfigProvider">
        <StickerSheet />
      </Example>
    </ExampleScreen>
  );
};

export default ComponentConfigProviderStory;
