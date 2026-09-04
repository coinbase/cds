import React, { useCallback } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { SelectOption } from '../SelectOption';

export default function SelectOptionScreen() {
  const handleOptionPress = useCallback(() => {
    console.log('pressed');
  }, []);
  return (
    <ExampleScreen>
      <Example title="Default">
        <SelectOption description="Description" onPress={handleOptionPress} value="Title" />
      </Example>
      <Example title="Default with description">
        <SelectOption
          description="Description"
          onPress={handleOptionPress}
          title="Title"
          value="Title"
        />
      </Example>
      <Example title="Default with description and selected">
        <SelectOption
          description="Description"
          onPress={handleOptionPress}
          title="Title"
          value="Title"
        />
      </Example>
      {/** I have an example here to test that title and description can take reactNode. If they take reactNode, we must specify the accessibilityLabel and accessibilityHint */}
      <Example title="Set title and description to be ReactNodes">
        <SelectOption
          accessibilityHint="Hint"
          accessibilityLabel="Title"
          description={<Text font="title1">Description</Text>}
          onPress={handleOptionPress}
          title={<Text font="title1">Title</Text>}
          value="Title"
        />
      </Example>
      <Example title="Multi line">
        <SelectOption
          multiline
          description="This is a really long description that will be multiple lines long"
          title="Title"
          value="test"
        />
      </Example>
    </ExampleScreen>
  );
}
