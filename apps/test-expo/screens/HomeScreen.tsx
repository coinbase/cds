import { useCallback } from 'react';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@coinbase/cds-mobile/typography';
import { VStack } from '@coinbase/cds-mobile/layout';
import { Button } from '@coinbase/cds-mobile/buttons';
import type { RootStackParamList } from '../App';

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToRandomNumber = useCallback(() => {
    navigation.navigate('RandomNumberDemo');
  }, [navigation]);

  const navigateToModal = useCallback(() => {
    navigation.navigate('ModalDemo');
  }, [navigation]);

  return (
    <VStack
      gap={4}
      padding={4}
      alignItems="center"
      justifyContent="center"
      style={{ flex: 1 }}
    >
      <Text font="display1">CDS Demo</Text>
      <Text font="body">Select a demo:</Text>
      <Button onPress={navigateToRandomNumber}>Rolling Number Demo</Button>
      <Button onPress={navigateToModal}>Modal Demo</Button>
    </VStack>
  );
}
