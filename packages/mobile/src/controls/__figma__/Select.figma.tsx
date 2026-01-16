/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useToggler } from '@coinbase/cds-common';
import { figma } from '@figma/code-connect';

import { Tray } from '../../overlays/tray/Tray';
import { Select } from '../Select';
import { SelectOption } from '../SelectOption';

figma.connect(
  Select,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=247-13005&m=dev',
  {
    imports: [
      "import { Select } from '@coinbase/cds-mobile/controls/Select'",
      "import { SelectOption } from '@coinbase/cds-mobile/controls'",
    ],
    props: {
      startNode: figma.boolean('show start', {
        true: figma.instance('🔄 start'),
        false: undefined,
      }),
      label: figma.boolean('show label', {
        true: 'Label',
        false: undefined,
      }),
      helperText: figma.boolean('show helper text', {
        true: 'Assistive Message',
        false: undefined,
      }),
      variant: figma.enum('state', {
        positive: 'positive',
        negative: 'negative',
      }),
      placeholder: figma.string('inputText'),
      disabled: figma.boolean('disabled'),
      compact: figma.boolean('compact'),
    },
    example: (...props) => {
      const [isTrayVisible, { toggleOff, toggleOn }] = useToggler(false);
      const [selectedValue, setValue] = useState<string>();
      return (
        <Select onChange={setValue} onPress={toggleOn} value={selectedValue} {...props}>
          {isTrayVisible && (
            <Tray onCloseComplete={toggleOff}>
              {({ handleClose }) => (
                <SelectOption
                  key="Option 1"
                  onPress={handleClose}
                  title="Option 1"
                  value="Option 1"
                />
              )}
            </Tray>
          )}
        </Select>
      );
    },
  },
);
