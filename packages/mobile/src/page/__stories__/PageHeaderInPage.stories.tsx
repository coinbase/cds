import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button, ButtonGroup, IconButton } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Box, VStack } from '../../layout';
import { Text } from '../../typography/Text';
import { PageFooter } from '../PageFooter';
import { PageHeader } from '../PageHeader';

const exampleProps = {
  start: <IconButton name="backArrow" onPress={NoopFn} testID="header-back-button" />,
  title: <Text font="title3">Page Title</Text>,
  endButtons: (
    <ButtonGroup block accessibilityLabel="Group">
      <Button variant="secondary">Back</Button>
      <Button variant="primary">Next</Button>
    </ButtonGroup>
  ),
};
const PageHeaderInPage = () => {
  const inset = useSafeAreaInsets();

  return (
    <ExampleScreen paddingX={0}>
      <Example hideDivider height="100%">
        <VStack gap={0} width="100%">
          <PageHeader
            background="bg"
            end={<IconButton name="close" testID="header-back-button" />}
            position="sticky"
            start={exampleProps.start}
            title={exampleProps.title}
            top="0"
          />
          <VStack
            alignContent="center"
            alignItems="center"
            dangerouslySetBackground="#FADADD"
            flexGrow={1}
            flexShrink={1}
            height="500px"
            justifyContent="center"
            padding={10}
          >
            <Text font="title1">Primary Content</Text>
          </VStack>
        </VStack>
        <Box style={{ position: 'absolute', bottom: inset.bottom / 2, left: 0, right: 0 }}>
          <PageFooter action={exampleProps.endButtons} />
        </Box>
      </Example>
    </ExampleScreen>
  );
};

export default PageHeaderInPage;
