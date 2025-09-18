import React, { useCallback, useState } from 'react';
import { Image } from 'react-native';
import { ethBackground } from '@cbhq/cds-common/internal/data/assets';
import { noop } from '@cbhq/cds-utils';

import { Button } from '../../buttons';
import { Checkbox } from '../../controls';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { SpotRectangle } from '../../illustrations';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../../visualizations';
import { Coachmark } from '../Coachmark';

const CoachmarkExamples = () => {
  const [checked, setChecked] = useState(false);
  const toggleChecked = useCallback(() => setChecked((prevChecked) => !prevChecked), []);

  return (
    <VStack gap={3}>
      <Coachmark
        action={<Button>Next</Button>}
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="Basic"
      />
      <Coachmark
        action={<Button>Next</Button>}
        checkbox={
          <Checkbox checked={checked} onChange={toggleChecked}>
            Don&apos;t show again
          </Checkbox>
        }
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="With checkbox"
      />
      <Coachmark
        action={<Button>Next</Button>}
        closeButtonAccessibilityLabel="Close"
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        onClose={noop}
        title="Dismissible"
      />
      <Coachmark
        action={<Button>Next</Button>}
        closeButtonAccessibilityLabel="Close"
        content={
          <VStack gap={2}>
            <Text color="fgMuted" font="caption">
              50%
            </Text>
            <ProgressBar progress={0.5} />
            <Text font="body">
              Add up to 3 lines of body copy. Deliver your message with clarity and impact
            </Text>
          </VStack>
        }
        media={
          <Image
            accessibilityIgnoresInvertColors
            source={{
              uri: ethBackground,
            }}
            style={{ width: '100%', height: 150 }}
          />
        }
        onClose={noop}
        title="Rich Content"
      />
      <Coachmark
        action={<Button>Next</Button>}
        content="This SpotRectangle is in a Box with bgPrimary background."
        media={
          <Box alignItems="center" background="bgPrimary" justifyContent="center" padding={4}>
            <SpotRectangle name="defiEarn" />
          </Box>
        }
        title="With a SpotRectangle"
      />
      <Coachmark
        action={<Button>Done</Button>}
        content="Add up to 3 lines of body copy. Deliver your message with clarity and impact"
        title="Custom width"
        width={250}
      />
    </VStack>
  );
};

const CoachmarkScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Coachmark">
        <CoachmarkExamples />
      </Example>
    </ExampleScreen>
  );
};

export default CoachmarkScreen;
