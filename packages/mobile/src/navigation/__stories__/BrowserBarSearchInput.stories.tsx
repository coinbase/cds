import { useState } from 'react';
import { View } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { BrowserBar } from '../BrowserBar';
import { BrowserBarSearchInput } from '../BrowserBarSearchInput';
import { NavBarIconButton } from '../NavBarIconButton';

const BrowserBarSearchInputScreen = () => {
  const DefaultExample = () => {
    const [value, setValue] = useState('');
    return (
      <BrowserBar start={<NavBarIconButton name="backArrow" />}>
        <BrowserBarSearchInput
          onChangeText={setValue}
          placeholder="Search or enter address"
          value={value}
        />
      </BrowserBar>
    );
  };

  const NoExpandExample = () => {
    const [value, setValue] = useState('');
    return (
      <BrowserBar paddingX={0} start={<NavBarIconButton name="backArrow" />}>
        <BrowserBarSearchInput
          expandOnFocus={false}
          onChangeText={setValue}
          placeholder="Search..."
          value={value}
        />
      </BrowserBar>
    );
  };

  const CustomActionExample = () => {
    const [value, setValue] = useState('Custom Actions');
    return (
      <BrowserBar paddingX={0}>
        <BrowserBarSearchInput
          onBlur={() => console.log('onBlur')}
          onChangeText={setValue}
          onFocus={() => console.log('onFocus')}
          placeholder="Search..."
          value={value}
        />
      </BrowserBar>
    );
  };

  return (
    <ExampleScreen>
      <Example title="Default (expands on focus)">
        <DefaultExample />
      </Example>
      <Example title="Does not expand on focus">
        <NoExpandExample />
      </Example>
      <Example title="With custom onFocus/onBlur">
        <CustomActionExample />
      </Example>
    </ExampleScreen>
  );
};

export default BrowserBarSearchInputScreen;
