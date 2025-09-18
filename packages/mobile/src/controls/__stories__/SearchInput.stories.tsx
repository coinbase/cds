import React, { useCallback, useRef, useState } from 'react';
import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Text } from '../../typography/Text';
import { InputIconButton } from '../InputIconButton';
import { SearchInput } from '../SearchInput';

const Basic = () => {
  const [text, setText] = useState('');
  return <SearchInput editable={__DEV__} onChangeText={setText} value={text} />;
};

const Compact = () => {
  const [text, setText] = useState('');
  return <SearchInput compact editable={__DEV__} onChangeText={setText} value={text} />;
};

const HideStartIcon = () => {
  const [text, setText] = useState('');
  return <SearchInput hideStartIcon editable={__DEV__} onChangeText={setText} value={text} />;
};

const HideEndIcon = () => {
  const [text, setText] = useState('');
  return <SearchInput hideEndIcon editable={__DEV__} onChangeText={setText} value={text} />;
};

const CustomEndNode = ({ end }: { end: React.ReactNode }) => {
  const [text, setText] = useState('');
  return <SearchInput editable={__DEV__} end={end} onChangeText={setText} value={text} />;
};

const Disabled = () => {
  const [text, setText] = useState('');

  return <SearchInput disabled accessibilityLabel="Search" onChangeText={setText} value={text} />;
};

const CustomRef = () => {
  const [text, setText] = useState('');
  const ref = useRef(null);

  return <SearchInput ref={ref} editable={__DEV__} onChangeText={setText} value={text} />;
};

/**
 * This tests how the SearchInput will work when
 * onChange and onChangeText are used together
 */
const OnChangeExample = () => {
  const [text, setText] = useState('');

  const handleOnChange = useCallback((e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    console.log(e.nativeEvent.text);
  }, []);

  const handleOnBack = useCallback(() => {
    console.log('onBack callback fired');
  }, []);

  return (
    <>
      <SearchInput
        editable={__DEV__}
        onBack={handleOnBack}
        onChange={handleOnChange}
        onChangeText={setText}
        value={text}
      />
      {!!text && <Text font="label1">{text}</Text>}
    </>
  );
};

const DisableBackArrow = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput
        disableBackArrow
        editable={__DEV__}
        onChangeText={setText}
        onSearch={handleOnSearch}
        value={text}
      />
      {!!text && <Text font="label1">{text}</Text>}
    </>
  );
};

const SetCustomSearchStartIcon = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput
        editable={__DEV__}
        onChangeText={setText}
        onSearch={handleOnSearch}
        startIcon="search"
        value={text}
      />
      {!!text && <Text font="label1">{text}</Text>}
    </>
  );
};

const SetCustomBackArrowStartIcon = () => {
  const [text, setText] = useState('');

  const handleOnSearch = useCallback((str: string) => {
    console.log(str);
  }, []);

  return (
    <>
      <SearchInput
        editable={__DEV__}
        onChangeText={setText}
        onSearch={handleOnSearch}
        startIcon="backArrow"
        value={text}
      />
      {!!text && <Text font="label1">{text}</Text>}
    </>
  );
};

const SearchInputScreen = () => {
  return (
    <ExampleScreen>
      <Example title="OnChange Example">
        <OnChangeExample />
      </Example>
      <Example title="Hidden Start Icon">
        <HideStartIcon />
      </Example>
      <Example title="Hidden End Icon">
        <HideEndIcon />
      </Example>
      <Example title="Disabled Back Arrow">
        <DisableBackArrow />
      </Example>
      <Example title="Basic">
        <Basic />
      </Example>
      <Example title="Disabled">
        <Disabled />
      </Example>
      <Example title="Custom Ref">
        <CustomRef />
      </Example>
      <Example title="Compact">
        <Compact />
      </Example>
      <Example title="Custom Start Icon - Search">
        <SetCustomSearchStartIcon />
      </Example>
      <Example title="Custom Start Icon - Back arrow">
        <SetCustomBackArrowStartIcon />
      </Example>
      <Example title="Custom End Node">
        <CustomEndNode
          end={
            <InputIconButton
              active
              accessibilityHint="Warning text"
              accessibilityLabel="Warning text"
              name="warning"
              onPress={() => console.log()}
              testID="custom-close-iconbtn"
            />
          }
        />
      </Example>
    </ExampleScreen>
  );
};

export default SearchInputScreen;
