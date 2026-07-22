import React, { useState } from 'react';

import { Button } from '../../buttons/Button';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useTheme } from '../../hooks/useTheme';
import { Icon } from '../../icons';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Tooltip } from '../../overlays/tooltip/Tooltip';
import { Text } from '../../typography/Text';
import { InputIcon } from '../InputIcon';
import { InputIconButton } from '../InputIconButton';
import { InputLabel } from '../InputLabel';
import type { TextInputProps } from '../TextInput';
import { TextInput } from '../TextInput';

const MockTextInput = ({ ...props }: TextInputProps) => {
  const [text, onChangeText] = useState('');

  return <TextInput editable={__DEV__} onChangeText={onChangeText} value={text} {...props} />;
};

const MockComplexInput = () => {
  const [text, onChangeText] = useState('');

  return (
    <HStack justifyContent="center">
      <TextInput
        accessibilityHint="Text Input field"
        accessibilityLabel="Text input field"
        editable={__DEV__}
        label="Test"
        onChangeText={onChangeText}
        value={text}
        width="50%"
      />
      <VStack paddingTop={1}>
        <Box paddingTop={3}>
          <Button>Hello</Button>
        </Box>
      </VStack>
    </HStack>
  );
};

const InputScreen = () => {
  const theme = useTheme();
  const customStyle = { backgroundColor: `rgb(${theme.spectrum.gray10})` };
  return (
    <ExampleScreen>
      <Example inline title="TextInput ForegroundMuted">
        <MockTextInput
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput ForegroundMuted accessibility label">
        <MockTextInput
          accessibilityLabel="Accessibility label for username"
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput ForegroundMuted accessibility label no helper text">
        <MockTextInput
          accessibilityLabel="Accessibility label for username"
          label="Username"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput ellipsis long text">
        <MockTextInput
          helperText="Use textAlign='unset' to workaround the issue where long text does not ellipsis correctly."
          label="Username"
          placeholder="john.doe@coinbase.com"
          textAlign="unset"
          value="https://github.com/coinbase/cds/blob/master/docs/commands.md!-|?/"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput Positive">
        <MockTextInput
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
          variant="positive"
        />
      </Example>
      <Example inline title="TextInput Negative">
        <MockTextInput
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
          variant="negative"
        />
        <MockTextInput
          align="end"
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
          variant="negative"
        />
      </Example>
      <Example inline title="TextInput ColorSurge">
        <MockTextInput
          enableColorSurge
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
          variant="foregroundMuted"
        />
        <MockTextInput
          enableColorSurge
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
          variant="positive"
        />
        <MockTextInput
          enableColorSurge
          helperText="username must start with an @ symbol"
          label="Username"
          placeholder="john.doe@coinbase.com"
          variant="negative"
        />
      </Example>
      <Example title="TextInput VStack FlexGrow">
        <VStack alignItems="flex-start" flexGrow={1}>
          <MockTextInput
            helperText="username must start with an @ symbol"
            label="Username"
            placeholder="john.doe@coinbase.com"
            variant="negative"
          />
          <MockTextInput
            helperText="username must start with an @ symbol"
            label="Username"
            placeholder="john.doe@coinbase.com"
            variant="negative"
          />
        </VStack>
      </Example>
      <Example inline title="TextInput startNode">
        <MockTextInput
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          start={<InputIconButton transparent name="search" />}
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput endNode">
        <MockTextInput
          end={<InputIcon active name="lightningBolt" />}
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput Height">
        <MockTextInput multiline height={300} label="Bitcoin" value="100" />
      </Example>
      <Example inline title="TextInput Min Height">
        <MockTextInput
          multiline
          label="Bitcoin"
          minHeight={50}
          value="
            A really really really really
            long piece of text of text of text 
            of text of text of text of text of text
            of text of text of text of text
          "
        />
      </Example>
      <Example inline title="TextArea">
        <MockTextInput
          multiline
          helperText="Write about yourself"
          label="Textarea"
          placeholder="I am amazing!"
          value="
            A really really really really
            long piece 
            of text
            displayed. A really really really really
            long piece 
            of text
            displayed. 
            A really really really really
            long piece 
            of text
            displayed
          "
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput endNode 50%">
        <MockTextInput
          end={<InputIcon active name="lightningBolt" />}
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          variant="foregroundMuted"
          width="50%"
        />
      </Example>
      <Example inline title="TextInput Start Align Input Text and HelperText">
        <MockTextInput
          align="start"
          helperText="HelperText"
          label="Search"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput End Align Input Text and HelperText">
        <MockTextInput
          align="end"
          helperText="HelperText"
          label="Search"
          placeholder="ex. Bitcoin"
        />
      </Example>
      <Example inline title="TextInput start icon">
        <MockTextInput
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          start={<InputIconButton transparent name="search" />}
        />
        <MockTextInput
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          start={<InputIconButton transparent name="search" />}
        />
      </Example>
      <Example inline title="TextInput start/end Node">
        <MockTextInput
          end={
            <Text
              accessibilityHint="Cancel"
              accessibilityLabel="Cancel"
              color="fgMuted"
              font="body"
              paddingEnd={2}
            >
              Cancel
            </Text>
          }
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          start={<InputIconButton transparent name="search" />}
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput suffix">
        <MockTextInput
          helperText="Search for assets here"
          label="Search"
          placeholder="ex. Bitcoin"
          suffix="DOGE"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput Disabled">
        <MockTextInput
          disabled
          editable={false}
          end={
            <Text
              accessibilityHint="Cancel"
              accessibilityLabel="Cancel"
              color="fgMuted"
              font="body"
              paddingEnd={2}
            >
              Cancel
            </Text>
          }
          label="One Time Password"
          placeholder="189-280-1111"
          start={<InputIconButton disabled transparent name="search" />}
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="TextInput No Label">
        <MockTextInput placeholder="189-280-1111" variant="foregroundMuted" />
      </Example>
      <Example inline title='size="s"'>
        <MockTextInput
          label="One Time Password"
          placeholder="189-280-1111"
          size="s"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title="Deprecated compact (renders as size s)">
        <MockTextInput
          compact
          label="One Time Password"
          placeholder="189-280-1111"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title='size="m"'>
        <MockTextInput
          label="One Time Password"
          placeholder="189-280-1111"
          size="m"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title='size="s" with start node'>
        <MockTextInput
          label="Start Node"
          placeholder="189-280-1111"
          size="s"
          start={
            <HStack accessibilityHint="Start Node" accessibilityLabel="Start Node">
              <Text font="body">Start Node</Text>
            </HStack>
          }
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title='size="s" with suffix'>
        <MockTextInput
          label="Suffix"
          placeholder="189-280-1111"
          size="s"
          suffix="Suffix"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title='size="s" with End Node'>
        <MockTextInput
          end={
            <Text accessibilityHint="Cancel" accessibilityLabel="Cancel" font="body">
              End Node
            </Text>
          }
          label="End Node"
          placeholder="189-280-1111"
          size="s"
          variant="foregroundMuted"
        />
      </Example>
      <Example inline title='size="s" Negative'>
        <MockTextInput
          helperText="Password is in an incorrect format"
          label="One Time Password"
          placeholder="189-280-1111"
          size="s"
          variant="negative"
        />
      </Example>
      <Example inline title='size="s" Positive'>
        <MockTextInput
          helperText="Password is looking good!"
          label="One Time Password"
          placeholder="189-280-1111"
          size="s"
          variant="positive"
        />
      </Example>
      <Example inline title='size="s" Start Align Input Text and HelperText'>
        <MockTextInput
          align="start"
          helperText="Password is looking good!"
          label="One Time Password"
          placeholder="189-280-1111"
          size="s"
        />
      </Example>
      <Example inline title='size="s" 50%'>
        <MockTextInput label="Bitcoin" placeholder="190" size="s" width="50%" />
        <MockTextInput size="s" />
      </Example>
      <Example inline title='size="s" Disabled'>
        <MockTextInput disabled editable={false} label="Bitcoin" size="s" />
      </Example>
      <Example inline title='size="s" with outside label'>
        <MockTextInput
          end={<InputIcon name="close" />}
          label="Amount"
          placeholder="0.00"
          size="s"
          suffix="USD"
        />
      </Example>
      <Example inline title="Accessibility Test">
        <MockTextInput
          accessibilityHint="Bitcoin search"
          accessibilityLabel="Bitcoin search"
          label="Bitcoin"
          size="s"
        />
      </Example>
      <Example>
        <MockComplexInput />
      </Example>
      <Example inline title="TextInput Custom Background">
        <MockTextInput label="Username" placeholder="john.doe@coinbase.com" style={customStyle} />
      </Example>
      <Example inline title="TextInput borderless variants">
        <MockTextInput
          bordered={false}
          helperText="Default borderless behavior with no focus border."
          label="Username"
          placeholder="john.doe@coinbase.com"
        />
        <MockTextInput
          bordered={false}
          focusedBorderWidth={200}
          helperText="Set focusedBorderWidth to opt into a focus border."
          label="Username with focus border"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="Read-Only TextInput">
        <MockTextInput readOnly label="Read-Only" placeholder="Placeholder" value="Some text" />
        <MockTextInput
          readOnly
          helperText="Helper Text"
          label="Read-Only with helperText"
          placeholder="Placeholder"
          value="Some text"
        />
        <TextInput
          readOnly
          accessibilityLabel="Text input field"
          label="Read-Only with Start Node"
          start={
            <Box paddingX={2}>
              <Icon color="fg" name="qrCode" size="m" />
            </Box>
          }
          value="Some text"
        />
        <TextInput
          readOnly
          accessibilityLabel="Text input field"
          end={
            <Box paddingX={2}>
              <Icon color="fg" name="qrCode" size="m" />
            </Box>
          }
          label="Read-Only with End Node"
          placeholder="Placeholder"
        />
        <MockTextInput
          readOnly
          bordered={false}
          label="Borderless Read-Only"
          placeholder="Placeholder"
        />
      </Example>
      <Example inline title="TextInput with inside label">
        <MockTextInput label="Username" labelVariant="inside" placeholder="john.doe@coinbase.com" />
      </Example>
      <Example inline title="TextInput with inside label and start node">
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          start={<InputIconButton transparent name="search" />}
        />
      </Example>
      <Example inline title="TextInput with inside label and end node">
        <MockTextInput
          end={<InputIconButton transparent name="lightningBolt" />}
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
        />
      </Example>
      <Example inline title="TextInput with inside label and both nodes">
        <MockTextInput
          end={<InputIconButton transparent name="close" />}
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          start={<InputIconButton transparent name="search" />}
        />
      </Example>
      <Example inline title='size="s" with inside label'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="s"
        />
      </Example>
      <Example inline title='size="m" with inside label'>
        <MockTextInput
          label="Username"
          labelVariant="inside"
          placeholder="john.doe@coinbase.com"
          size="m"
        />
      </Example>
      <Example inline title="TextInput with inside label and error state">
        <MockTextInput
          helperText="Error: Your favorite color is not orange"
          label="Error state"
          labelVariant="inside"
          placeholder="Enter your favorite color"
          variant="negative"
        />
      </Example>
      <Example inline title="TextInput with custom label">
        <MockTextInput
          accessibilityLabel="Display name"
          labelNode={
            <HStack alignItems="center">
              <InputLabel>Display name</InputLabel>
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" padding={0.75} size="xs" />
              </Tooltip>
            </HStack>
          }
          placeholder="Satoshi Nakamoto"
        />
        <MockTextInput
          accessibilityLabel="Amount"
          labelNode={
            <HStack alignItems="center" gap={0.5}>
              <InputLabel>Amount</InputLabel>
              <Text color="fgNegative" font="label1">
                *
              </Text>
            </HStack>
          }
          placeholder="0.00"
          size="s"
          suffix="USD"
        />
        <MockTextInput
          accessibilityLabel="Search"
          labelNode={
            <VStack justifyContent="center">
              <InputLabel>Search</InputLabel>
            </VStack>
          }
          placeholder="Search..."
          size="s"
          start={<InputIconButton transparent name="search" />}
        />
        <MockTextInput
          accessibilityLabel="Bio"
          labelNode={
            <HStack alignItems="center" gap={1}>
              <InputLabel paddingY={0}>Bio</InputLabel>
              <Text color="fgMuted" font="legal">
                (optional)
              </Text>
            </HStack>
          }
          labelVariant="inside"
          placeholder="Tell us about yourself"
        />
        <MockTextInput
          accessibilityLabel="Notes"
          labelNode={<InputLabel paddingY={0}>Notes</InputLabel>}
          labelVariant="inside"
          placeholder="Add a note"
          start={<InputIcon name="pencil" />}
        />
      </Example>
    </ExampleScreen>
  );
};

export default InputScreen;
