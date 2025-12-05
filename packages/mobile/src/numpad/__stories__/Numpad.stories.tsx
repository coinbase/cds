import { useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';

import { Banner } from '../../banner/Banner';
import { Button, ButtonGroup } from '../../buttons';
import { TextInput } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useSafeBottomPadding } from '../../hooks/useSafeBottomPadding';
import { useTheme } from '../../hooks/useTheme';
import { Box, HStack, VStack } from '../../layout';
import { Modal, ModalBody, ModalHeader } from '../../overlays';
import { Text } from '../../typography/Text';
import type { NumpadValue } from '../Numpad';
import { DELETE, Numpad, SEPARATOR } from '../Numpad';

const VALUE_MAX = 1000000;

const NumpadExample1 = () => {
  const [visible, setVisible] = useState(false);
  const setVisibleToOn = useCallback(() => setVisible(true), []);
  const setVisibleToOff = useCallback(() => setVisible(false), []);

  const [value, setValue] = useState('100');
  const safeBottomPadding = useSafeBottomPadding();

  const onPress = useCallback((value: NumpadValue) => {
    switch (value) {
      case DELETE:
        setValue((prev) => prev.slice(0, -1));
        break;
      case SEPARATOR:
        setValue((prev) => (prev.includes('.') ? prev : `${prev}.`));
        break;
      default:
        setValue((prev) => {
          const newValue = prev + value;
          return parseFloat(newValue) > VALUE_MAX ? prev : newValue;
        });
    }
  }, []);

  const onLongPress = useCallback((value: NumpadValue) => {
    switch (value) {
      case DELETE:
        setValue('');
        break;
      case SEPARATOR:
        if (!value.includes('.')) {
          setValue((prevValue) => `${prevValue}.00`);
        }
        break;
      default:
        setValue((prev) => {
          const newValue = prev + value;
          return parseFloat(newValue) > VALUE_MAX ? prev : newValue;
        });
    }
  }, []);

  const setValueCallback = useCallback((value: string) => () => setValue(value), []);

  const accessory = useMemo(() => {
    if (value === '')
      return (
        <Banner
          startIconActive
          bordered={false}
          numberOfLines={1}
          startIcon="error"
          title="Invalid Input"
          variant="warning"
        >
          <Text font="body">Enter an amount greater than zero.</Text>
        </Banner>
      );
    if (parseFloat(value) >= VALUE_MAX) {
      return (
        <Banner
          startIconActive
          bordered={false}
          numberOfLines={1}
          startIcon="error"
          title="You've reached the maximum value"
          variant="warning"
        >
          <Text font="body">Max ${VALUE_MAX}</Text>
        </Banner>
      );
    }

    return (
      <VStack paddingX={3}>
        <ButtonGroup block>
          <Button compact onPress={setValueCallback('5')} variant="secondary">
            $5
          </Button>
          <Button compact onPress={setValueCallback('10')} variant="secondary">
            $10
          </Button>
          <Button compact onPress={setValueCallback(VALUE_MAX.toString())} variant="secondary">
            Max
          </Button>
        </ButtonGroup>
      </VStack>
    );
  }, [setValueCallback, value]);

  return (
    <VStack>
      <Button onPress={setVisibleToOn}>Example 1</Button>
      <Modal onRequestClose={setVisibleToOff} visible={visible}>
        <ModalHeader title="BuyAsset Entry" />
        <ModalBody>
          <TextInput
            accessibilityLabel="Text input field"
            helperText="Max $1000000"
            label="Enter amount (USD)"
            placeholder="USD"
            value={value}
          />
        </ModalBody>
        <Box
          borderedTop
          bottom={0}
          paddingTop={2}
          position="absolute"
          style={{ paddingBottom: safeBottomPadding }}
        >
          <Numpad
            accessory={accessory}
            action={
              <VStack paddingX={2}>
                <Button onPress={setVisibleToOff}>Review order</Button>
              </VStack>
            }
            deleteAccessibilityLabel="delete"
            onLongPress={onLongPress}
            onPress={onPress}
            separatorAccessibilityLabel="period"
          />
        </Box>
      </Modal>
    </VStack>
  );
};

const NumpadExample2 = () => {
  // localState
  const [visible, setVisible] = useState(false);
  const setVisibleToOn = useCallback(() => setVisible(true), []);
  const setViisbleToOff = useCallback(() => setVisible(false), []);
  const [value, setValue] = useState('');

  // hooks
  const safeBottomPadding = useSafeBottomPadding();
  const theme = useTheme();

  // callbacks
  const onPress = useCallback((input: NumpadValue) => {
    if (input === DELETE) {
      setValue((preValue) => preValue.slice(0, -1));
    } else if (input !== SEPARATOR) {
      setValue((prevValue) => (prevValue.length < 4 ? prevValue + input : prevValue));
    }
  }, []);

  const onLongPress = useCallback((input: NumpadValue) => {
    if (input === DELETE) {
      setValue('');
    } else if (input !== SEPARATOR) {
      setValue((prevValue) => (prevValue.length < 4 ? prevValue + input : prevValue));
    }
  }, []);

  return (
    <VStack>
      <Button onPress={setVisibleToOn}>Example 2</Button>
      <Modal onRequestClose={setViisbleToOff} visible={visible}>
        <ModalHeader title="PinCode Entry" />
        <ModalBody>
          <VStack alignItems="center" gap={2} paddingTop={8}>
            <HStack>
              {Array.from({ length: 4 }).map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 16,
                    height: 16,
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor:
                      index < value.length ? theme.color.bgPrimary : theme.color.bgOverlay,
                    backgroundColor:
                      index < value.length ? theme.color.bgPrimary : theme.color.transparent,
                    margin: 5,
                  }}
                />
              ))}
            </HStack>
            <Text font="headline">Unlock with your PIN</Text>
          </VStack>
        </ModalBody>
        <Box bottom={0} position="absolute" style={{ paddingBottom: safeBottomPadding }}>
          <Numpad onLongPress={onLongPress} onPress={onPress} separator="" />
        </Box>
      </Modal>
    </VStack>
  );
};

const NumpadScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Numpad Examples">
        <VStack gap={2} padding={2}>
          <NumpadExample1 />
          <NumpadExample2 />
        </VStack>
      </Example>
    </ExampleScreen>
  );
};

export default NumpadScreen;
