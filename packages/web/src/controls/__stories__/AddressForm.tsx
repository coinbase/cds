import React, { useCallback, useState } from 'react';

import { Button } from '../../buttons';
import { HStack, VStack } from '../../layout';
import { Text } from '../../typography';
import { TextInput } from '../TextInput';

export const AddressForm = ({ ...props }) => {
  const gap = 3;
  const [onClick, setOnClick] = useState(false);

  const hanldeOnClick = useCallback(() => {
    setOnClick(!onClick);
  }, [onClick]);

  return (
    <form {...props} method="get">
      <VStack gap={gap}>
        <TextInput
          helperText="Please enter your primary address."
          label="Street address"
          placeholder="4321 Jade Palace"
        />
        <TextInput aria-required="true" label="Unit #" />
        <HStack gap={gap}>
          <TextInput label="City/town" width="70%" />
          <TextInput label="State" width="30%" />
        </HStack>
        <HStack gap={gap}>
          <TextInput label="Postal code" width="40%" />
          <TextInput label="Country" width="60%" />
        </HStack>
        <Button onClick={hanldeOnClick} testID="save-btn" type="submit">
          Save
        </Button>
        {onClick && (
          <Text as="h1" display="block" font="title1">
            Submit button was clicked
          </Text>
        )}
      </VStack>
    </form>
  );
};
