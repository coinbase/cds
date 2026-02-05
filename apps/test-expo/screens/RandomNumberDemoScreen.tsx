import { useState, useCallback } from 'react';
import { Text } from '@coinbase/cds-mobile/typography';
import { VStack } from '@coinbase/cds-mobile/layout';
import { Button } from '@coinbase/cds-mobile/buttons';
import { RollingNumber } from '@coinbase/cds-mobile/numbers';

export function RandomNumberDemoScreen() {
  const [number, setNumber] = useState(1000);

  const handlePress = useCallback(() => {
    setNumber(Math.floor(Math.random() * 10000));
  }, []);

  return (
    <VStack
      gap={4}
      padding={4}
      alignItems="center"
      justifyContent="center"
      style={{ flex: 1 }}
    >
      <Text font="title1">Rolling Number</Text>
      <RollingNumber value={number} font="display1" />
      <Button onPress={handlePress}>Generate Number</Button>
    </VStack>
  );
}
