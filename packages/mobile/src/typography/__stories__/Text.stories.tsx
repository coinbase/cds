import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../Text';

const TextScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <Text font="display1">Display1</Text>
        <Text font="display2">Display2</Text>
        <Text font="display3">Display3</Text>
        <Text font="title1">Title1</Text>
        <Text font="title2">Title2</Text>
        <Text font="title3">Title3</Text>
        <Text font="title4">Title4</Text>
        <Text font="label1">Label1</Text>
        <Text font="label2">Label2</Text>
        <Text font="headline">Headline</Text>
        <Text font="body">Body</Text>
        <Text font="caption">Caption</Text>
        <Text font="legal">Legal</Text>
      </Example>
      <Example title="Mono">
        <Text mono font="display1">
          Display1
        </Text>
        <Text mono font="display2">
          Display2
        </Text>
        <Text mono font="display3">
          Display3
        </Text>
        <Text mono font="title1">
          Title1
        </Text>
        <Text mono font="title2">
          Title2
        </Text>
        <Text mono font="title3">
          Title3
        </Text>
        <Text mono font="title4">
          Title4
        </Text>
        <Text mono font="label1">
          Label1
        </Text>
        <Text mono font="label2">
          Label2
        </Text>
        <Text mono font="headline">
          Headline
        </Text>
        <Text mono font="body">
          Body
        </Text>
        <Text mono font="caption">
          Caption
        </Text>
        <Text mono font="legal">
          Legal
        </Text>
      </Example>
    </ExampleScreen>
  );
};

export default TextScreen;
