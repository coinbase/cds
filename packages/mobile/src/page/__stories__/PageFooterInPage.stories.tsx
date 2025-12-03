import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button, ButtonGroup } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { PageFooter } from '../PageFooter';

const exampleProps = {
  end: <Icon active accessibilityLabel="Show info" name="info" size="s" />,
  endButton: <Button accessibilityLabel="Go Next">Next</Button>,
  endButtons: (
    <ButtonGroup accessibilityLabel="Group">
      <Button accessibilityLabel="Cancel" onPress={NoopFn} variant="secondary">
        Cancel
      </Button>
      <Button accessibilityLabel="Delete" onPress={NoopFn} variant="negative">
        Delete
      </Button>
    </ButtonGroup>
  ),
  endButtons2: (
    <ButtonGroup block accessibilityLabel="Group">
      <Button accessibilityLabel="Go Back" variant="secondary">
        Back
      </Button>
      <Button accessibilityLabel="Go Next" variant="primary">
        Next
      </Button>
    </ButtonGroup>
  ),
};

const PageFooterInPageScreen = () => {
  const inset = useSafeAreaInsets();

  return (
    <ExampleScreen paddingX={0}>
      <Example hideDivider height="100%">
        <VStack
          alignContent="center"
          alignItems="center"
          dangerouslySetBackground="#FADADD"
          gap={0}
          justifyContent="center"
          left={0}
          padding={10}
        >
          <Text font="title1">Primary Content</Text>
        </VStack>
        <Box style={{ position: 'absolute', bottom: inset.bottom / 2, left: 0, right: 0 }}>
          <PageFooter action={exampleProps.endButtons2} />
        </Box>
      </Example>
    </ExampleScreen>
  );
};
export default PageFooterInPageScreen;
