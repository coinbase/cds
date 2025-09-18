import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { InputStack, type InputStackBaseProps } from '../InputStack';

const InputStackBasic = (props: InputStackBaseProps) => {
  // {/*
  //  * Ensure that every compartment does what its suppose to
  //  */}
  return (
    <InputStack
      appendNode={
        <Box background="bgPrimary">
          <Text font="body">Append</Text>
        </Box>
      }
      borderStyle={{
        borderWidth: 1,
      }}
      endNode={
        <Box background="bgPositive">
          <Text font="body">EndContent</Text>
        </Box>
      }
      helperTextNode={
        <Box background="bgOverlay" height={30} width="100%">
          <Text font="body">helperText</Text>
        </Box>
      }
      labelNode={
        <Box background="bgAlternate" height={30} width="100%">
          <Text font="body">Label</Text>
        </Box>
      }
      prependNode={
        <Box background="bgPrimary">
          <Text font="body">Prepend</Text>
        </Box>
      }
      startNode={
        <Box background="bgPositive">
          <Text font="body">StartContent</Text>
        </Box>
      }
      variant="primary"
      {...props}
    />
  );
};

export default function InputStackScreen() {
  return (
    <ExampleScreen>
      <Example inline title="Input Stack">
        <InputStackBasic
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text font="body">Input</Text>
            </Box>
          }
        />
      </Example>
      <Example inline title="Input Stack Focused">
        <InputStackBasic
          focused
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text font="body">Input</Text>
            </Box>
          }
        />
      </Example>
      <Example inline title="Input Prepend Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <InputStack
          borderStyle={{
            borderWidth: 1,
          }}
          endNode={
            <Box background="bgPositive">
              <Text font="body">EndContent</Text>
            </Box>
          }
          helperTextNode={
            <Box background="bgOverlay" height={30} width="100%">
              <Text font="body">helperText</Text>
            </Box>
          }
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text font="body">Input</Text>
            </Box>
          }
          labelNode={
            <Box background="bgAlternate" height={30} width="100%">
              <Text font="body">Label</Text>
            </Box>
          }
          prependNode={
            <Box background="bgPrimary">
              <Text font="body">Prepend</Text>
            </Box>
          }
          startNode={
            <Box background="bgPositive">
              <Text font="body">StartContent</Text>
            </Box>
          }
          variant="primary"
        />
      </Example>
      <Example inline title="Input Append Only - Test for borderRadius">
        {/*
         * Ensure that every compartment does what its suppose to
         */}
        <InputStack
          appendNode={
            <Box background="bgPrimary">
              <Text font="body">Append</Text>
            </Box>
          }
          borderStyle={{
            borderWidth: 1,
          }}
          endNode={
            <Box background="bgPositive">
              <Text font="body">EndContent</Text>
            </Box>
          }
          helperTextNode={
            <Box background="bgOverlay" height={30} width="100%">
              <Text font="body">helperText</Text>
            </Box>
          }
          inputNode={
            <Box background="bgAlternate" flexGrow={2}>
              <Text font="body">Input</Text>
            </Box>
          }
          labelNode={
            <Box background="bgAlternate" height={30} width="100%">
              <Text font="body">Label</Text>
            </Box>
          }
          startNode={
            <Box background="bgPositive">
              <Text font="body">StartContent</Text>
            </Box>
          }
          variant="primary"
        />
      </Example>
    </ExampleScreen>
  );
}
