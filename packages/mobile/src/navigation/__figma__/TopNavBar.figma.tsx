import { figma } from '@figma/code-connect';

import { Divider, HStack, VStack } from '../../layout';
import {
  BrowserBar,
  BrowserBarSearchInput,
  NavigationSubtitle,
  NavigationTitle,
  NavigationTitleSelect,
} from '../../navigation';
import { TopNavBar } from '../TopNavBar';

figma.connect(
  TopNavBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4137',
  {
    variant: {
      type: 'title + subtitle',
    },
    imports: [
      "import { TopNavBar } from '@coinbase/cds-mobile/navigation/TopNavBar'",
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
      "import { NavigationTitle } from '@coinbase/cds-mobile/navigation/NavigationTitle'",
      "import { NavigationSubtitle } from '@coinbase/cds-mobile/navigation/NavigationSubtitle'",
    ],
    props: {
      title: figma.string('↳ title'),
      subtitle: figma.boolean('↳ show subtitle', {
        true: figma.string('↳ subtitle'),
        false: undefined,
      }),

      startAction: figma.boolean('show left action', {
        true: figma.instance('left action'),
        false: undefined,
      }),
      endAction1: figma.boolean('show right action', {
        true: figma.instance('right action'),
        false: undefined,
      }),
      endAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('2nd right action'),
        false: undefined,
      }),
      endAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({
      startAction,
      title,
      subtitle,
      endAction1,
      endAction2,
      endAction3,
      divider,
    }) {
      return (
        <VStack>
          <TopNavBar
            end={
              <HStack alignItems="center" gap={0.25}>
                {endAction3}
                {endAction2}
                {endAction1}
              </HStack>
            }
            start={startAction}
          >
            <VStack alignItems="center">
              <NavigationTitle>{title}</NavigationTitle>
              <NavigationSubtitle>{subtitle}</NavigationSubtitle>
            </VStack>
          </TopNavBar>
          {divider}
        </VStack>
      );
    },
  },
);

figma.connect(
  TopNavBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4137',
  {
    variant: {
      type: 'dropdown',
    },
    imports: [
      "import { TopNavBar } from '@coinbase/cds-mobile/navigation/TopNavBar'",
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
      "import { NavigationTitleSelect } from '@coinbase/cds-mobile/navigation/NavigationTitleSelect'",
    ],
    props: {
      title: figma.string('↳ title'),
      startAction: figma.boolean('show left action', {
        true: figma.instance('left action'),
        false: undefined,
      }),
      endAction1: figma.boolean('show right action', {
        true: figma.instance('right action'),
        false: undefined,
      }),
      endAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('2nd right action'),
        false: undefined,
      }),
      endAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({ startAction, title, endAction1, endAction2, endAction3, divider }) {
      return (
        <VStack>
          <TopNavBar
            end={
              <HStack alignItems="center" gap={0.25}>
                {endAction3}
                {endAction2}
                {endAction1}
              </HStack>
            }
            start={startAction}
          >
            <NavigationTitleSelect
              onChange={() => {}}
              options={[{ id: 'title', label: title }]}
              value="title"
            />
          </TopNavBar>
          {divider}
        </VStack>
      );
    },
  },
);

figma.connect(
  TopNavBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4137',
  {
    variant: {
      type: 'with search',
    },
    imports: [
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
      "import { BrowserBar } from '@coinbase/cds-mobile/navigation/BrowserBar'",
      "import { BrowserBarSearchInput } from '@coinbase/cds-mobile/navigation/BrowserBarSearchInput'",
    ],
    props: {
      startAction: figma.boolean('show left action', {
        true: figma.instance('left action'),
        false: undefined,
      }),
      endAction1: figma.boolean('show right action', {
        true: figma.instance('right action'),
        false: undefined,
      }),
      endAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('2nd right action'),
        false: undefined,
      }),
      endAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({ startAction, endAction1, endAction2, endAction3, divider }) {
      return (
        <VStack>
          <BrowserBar
            end={
              <HStack alignItems="center" gap={0.25}>
                {endAction3}
                {endAction2}
                {endAction1}
              </HStack>
            }
            start={startAction}
          >
            <BrowserBarSearchInput onChangeText={() => {}} value="Search" />
          </BrowserBar>
          {divider}
        </VStack>
      );
    },
  },
);

figma.connect(
  TopNavBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4137',
  {
    variant: {
      type: 'empty',
    },
    imports: [
      "import { TopNavBar } from '@coinbase/cds-mobile/navigation/TopNavBar'",
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
    ],
    props: {
      startAction: figma.boolean('show left action', {
        true: figma.instance('left action'),
        false: undefined,
      }),
      endAction1: figma.boolean('show right action', {
        true: figma.instance('right action'),
        false: undefined,
      }),
      endAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('2nd right action'),
        false: undefined,
      }),
      endAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({ startAction, endAction1, endAction2, endAction3, divider }) {
      return (
        <VStack>
          <TopNavBar
            end={
              <HStack alignItems="center" gap={0.25}>
                {endAction3}
                {endAction2}
                {endAction1}
              </HStack>
            }
            start={startAction}
          />
          {divider}
        </VStack>
      );
    },
  },
);

figma.connect(
  TopNavBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4137',
  {
    variant: {
      type: 'stepper',
    },
    imports: [
      "import { TopNavBar } from '@coinbase/cds-mobile/navigation/TopNavBar'",
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
    ],
    props: {
      startAction: figma.boolean('show left action', {
        true: figma.instance('left action'),
        false: undefined,
      }),
      endAction1: figma.boolean('show right action', {
        true: figma.instance('right action'),
        false: undefined,
      }),
      endAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('2nd right action'),
        false: undefined,
      }),
      endAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({ startAction, endAction1, endAction2, endAction3, divider }) {
      return (
        <VStack>
          <TopNavBar
            end={
              <HStack alignItems="center" gap={0.25}>
                {endAction3}
                {endAction2}
                {endAction1}
              </HStack>
            }
            start={startAction}
          />
          {divider}
        </VStack>
      );
    },
  },
);

figma.connect(
  TopNavBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=49598-4137',
  {
    variant: {
      type: 'Market Selector',
    },
    imports: [
      "import { TopNavBar } from '@coinbase/cds-mobile/navigation/TopNavBar'",
      "import { Divider } from '@coinbase/cds-mobile/layout/Divider'",
      "import { VStack } from '@coinbase/cds-mobile/layout/VStack'",
      "import { HStack } from '@coinbase/cds-mobile/layout/HStack'",
    ],
    props: {
      children: figma.children('SelectChip'),
      startAction: figma.boolean('show left action', {
        true: figma.instance('left action'),
        false: undefined,
      }),
      endAction1: figma.boolean('show right action', {
        true: figma.instance('right action'),
        false: undefined,
      }),
      endAction2: figma.boolean('show 2nd right action', {
        true: figma.instance('2nd right action'),
        false: undefined,
      }),
      endAction3: figma.boolean('show 3rd right action', {
        true: figma.instance('3rd right action'),
        false: undefined,
      }),
      divider: figma.boolean('show divider', {
        true: <Divider />,
        false: undefined,
      }),
    },
    example: function Example({
      children,
      startAction,
      endAction1,
      endAction2,
      endAction3,
      divider,
    }) {
      return (
        <VStack>
          <TopNavBar
            end={
              <HStack alignItems="center" gap={0.25}>
                {endAction3}
                {endAction2}
                {endAction1}
              </HStack>
            }
            start={startAction}
          >
            {children}
          </TopNavBar>
          {divider}
        </VStack>
      );
    },
  },
);
