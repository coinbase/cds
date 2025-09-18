import React, { useCallback, useState } from 'react';

import { VStack } from '../../layout';
import { InputIconButton } from '../InputIconButton';
import { SearchInput } from '../SearchInput';

export default {
  title: 'Components/Inputs/SearchInput',
  component: SearchInput,
};

const Basic = () => {
  const [text, setText] = useState('Value');

  return (
    <SearchInput
      accessibilityLabel="Search"
      onChangeText={setText}
      onClear={() => {}}
      placeholder="Placeholder"
      value={text}
    />
  );
};

const HideStartIcon = () => {
  const [text, setText] = useState('');

  return (
    <SearchInput
      hideStartIcon
      accessibilityLabel="Search"
      onChangeText={setText}
      onClear={() => {}}
      value={text}
    />
  );
};

const HideEndIcon = () => {
  const [text, setText] = useState('');

  return (
    <SearchInput
      hideEndIcon
      accessibilityLabel="Search"
      onChangeText={setText}
      onClear={() => {}}
      value={text}
    />
  );
};

const Compact = () => {
  const [text, setText] = useState('');

  return (
    <SearchInput
      compact
      accessibilityLabel="searchbox"
      onChangeText={setText}
      onClear={() => {}}
      value={text}
    />
  );
};

const Disabled = () => {
  const [text, setText] = useState('');

  return (
    <SearchInput
      disabled
      accessibilityLabel="Search"
      onChangeText={setText}
      onClear={() => {}}
      value={text}
    />
  );
};

const CustomEndNode = ({ end }: { end: React.ReactNode }) => {
  const [text, setText] = useState('');

  return (
    <SearchInput
      accessibilityLabel="Search"
      end={end}
      onChangeText={setText}
      onClear={() => {}}
      value={text}
    />
  );
};

export const Default = () => (
  <VStack gap={2}>
    <Basic />
    <Disabled />
    <Compact />
    <HideStartIcon />
    <HideEndIcon />
    <CustomEndNode
      end={
        <InputIconButton
          active
          accessibilityHint="Warning text"
          accessibilityLabel="Warning text"
          name="warning"
          onClick={() => {}}
          testID="custom-close-iconbtn"
        />
      }
    />
  </VStack>
);

/**
 * This tests how the SearchInput will work when
 * onChange and onChangeText are used together
 */
export const OnChangeExample = () => {
  const [text, setText] = useState('');

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
    },
    [setText],
  );

  return (
    <div>
      <SearchInput
        accessibilityLabel="Search"
        onChange={handleOnChange}
        onChangeText={setText}
        value={text}
      />
      <p>{text}</p>
    </div>
  );
};
