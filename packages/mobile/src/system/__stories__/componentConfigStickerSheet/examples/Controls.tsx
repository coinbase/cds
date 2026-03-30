import { memo, useState } from 'react';

import { Checkbox } from '../../../../controls/Checkbox';
import { Radio } from '../../../../controls/Radio';
import { Switch } from '../../../../controls/Switch';
import { HStack } from '../../../../layout';

export const ControlsExample = memo(() => {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isRadioChecked, setIsRadioChecked] = useState(true);

  return (
    <HStack alignItems="center" gap={1} justifyContent="center">
      <Switch checked={isSwitchChecked} onChange={() => setIsSwitchChecked((v) => !v)}>
        Switch
      </Switch>
      <Checkbox checked={isCheckboxChecked} onChange={() => setIsCheckboxChecked((v) => !v)}>
        Checkbox
      </Checkbox>
      <Radio checked={isRadioChecked} onChange={() => setIsRadioChecked((v) => !v)}>
        Radio
      </Radio>
    </HStack>
  );
});
