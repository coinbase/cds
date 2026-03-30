import React, { memo, useState } from 'react';

import { Checkbox } from '../../../../controls/Checkbox';
import { Radio } from '../../../../controls/Radio';
import { Switch } from '../../../../controls/Switch';
import { VStack } from '../../../../layout/VStack';
import { Text } from '../../../../typography/Text';

export const ControlsExample = memo(() => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isRadioChecked, setIsRadioChecked] = useState(true);
  const [isCustomRadioChecked, setIsCustomRadioChecked] = useState(false);

  return (
    <VStack gap={2} width="100%">
      <Switch checked={isSwitchChecked} onChange={() => setIsSwitchChecked((v) => !v)}>
        Switch
      </Switch>
      <Checkbox checked={isCheckboxChecked} onChange={() => setIsCheckboxChecked((v) => !v)}>
        Checkbox
      </Checkbox>
      <Radio checked={isRadioChecked} onChange={() => setIsRadioChecked((v) => !v)}>
        Radio
      </Radio>
    </VStack>
  );
});
