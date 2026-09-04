import { useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { HStack } from '../../layout';
import { Pressable } from '../../system/Pressable';
import { Text } from '../../typography/Text';
import { BrowserBar } from '../BrowserBar';
import { BrowserBarSearchInput } from '../BrowserBarSearchInput';
import { NavBarIconButton } from '../NavBarIconButton';

const DefaultExample = () => {
  const [value, setValue] = useState('');
  return (
    <Example title="Browser Bar">
      <BrowserBar
        end={
          <HStack alignItems="center" gap={0.25}>
            <NavBarIconButton name="browser" />
            <Pressable
              alignItems="center"
              background="transparent"
              height={40}
              justifyContent="center"
              width={40}
            >
              <HStack
                alignItems="center"
                borderColor="fg"
                borderRadius={100}
                borderWidth={200}
                height={24}
                justifyContent="center"
                width={24}
              >
                <Text color="fg" font="label2">
                  4
                </Text>
              </HStack>
            </Pressable>
            <NavBarIconButton name="more" />
          </HStack>
        }
        paddingX={0}
        start={<NavBarIconButton name="backArrow" />}
      >
        <BrowserBarSearchInput onChangeText={setValue} value={value} />
      </BrowserBar>
    </Example>
  );
};

const ExampleWithoutExpandOnFocus = () => {
  const [value, setValue] = useState('');
  return (
    <Example title="Browser Bar without expand on focus">
      <BrowserBar
        end={
          <HStack alignItems="center" gap={0.25}>
            <NavBarIconButton name="browser" />
            <Pressable
              alignItems="center"
              background="transparent"
              height={40}
              justifyContent="center"
              width={40}
            >
              <HStack
                alignItems="center"
                borderColor="fg"
                borderRadius={100}
                borderWidth={200}
                height={24}
                justifyContent="center"
                width={24}
              >
                <Text color="fg" font="label2">
                  4
                </Text>
              </HStack>
            </Pressable>
          </HStack>
        }
        paddingX={0}
        start={<NavBarIconButton name="backArrow" />}
      >
        <BrowserBarSearchInput
          disableBackArrow
          expandOnFocus={false}
          onChangeText={setValue}
          value={value}
        />
      </BrowserBar>
    </Example>
  );
};

const ExampleWithoutEnd = () => {
  const [value, setValue] = useState('');
  return (
    <Example title="Browser Bar without end">
      <BrowserBar paddingX={0} start={<NavBarIconButton name="backArrow" />}>
        <BrowserBarSearchInput onChangeText={setValue} value={value} />
      </BrowserBar>
    </Example>
  );
};

const BrowserBarScreen = () => {
  return (
    <ExampleScreen>
      <DefaultExample />
      <ExampleWithoutExpandOnFocus />
      <ExampleWithoutEnd />
    </ExampleScreen>
  );
};

export default BrowserBarScreen;
