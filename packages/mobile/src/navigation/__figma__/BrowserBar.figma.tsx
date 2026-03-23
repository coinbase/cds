import { useMemo } from 'react';
import { figma } from '@figma/code-connect';

import { Divider, HStack, VStack } from '../../layout';
import { BrowserBar, BrowserBarSearchInput } from '../../navigation';

figma.connect(
  BrowserBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4224',
  {
    imports: [
      "import { BrowserBar } from '@coinbase/cds-mobile/navigation/BrowserBar'",
      "import { BrowserBarSearchInput } from '@coinbase/cds-mobile/navigation/BrowserBarSearchInput'",
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
    ],
    props: {
      leftAction: figma.boolean('show left action', {
        true: figma.instance('↳ left action'),
        false: undefined,
      }),
      rightAction1: figma.boolean('show 1st right action', {
        true: figma.instance('↳ 1st right action'),
        false: undefined,
      }),
      rightAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('↳ 2nd right action'),
        false: undefined,
      }),
      rightAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('↳ 3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({ leftAction, rightAction1, rightAction2, rightAction3, divider }) {
      const end = useMemo(() => {
        if (rightAction1 || rightAction2 || rightAction3) {
          return (
            <HStack alignItems="center" gap={0.25}>
              {rightAction1}
              {rightAction2}
              {rightAction3}
            </HStack>
          );
        }
      }, [rightAction1, rightAction2, rightAction3]);
      return (
        <VStack>
          <BrowserBar end={end} start={leftAction}>
            <BrowserBarSearchInput onChangeText={() => {}} value="" />
          </BrowserBar>
          {divider}
        </VStack>
      );
    },
  },
);
