import React from 'react';
import { NoopFn } from '@coinbase/cds-common/utils/mockUtils';

import { Button, ButtonGroup } from '../../buttons';
import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons';
import { Divider } from '../../layout';
import { PageFooter } from '../PageFooter';

const exampleProps = {
  end: <Icon active name="info" size="s" />,
  endButton: <Button>Next</Button>,
  endButtons: (
    <ButtonGroup accessibilityLabel="Group">
      <Button onPress={NoopFn} variant="secondary">
        Cancel
      </Button>
      <Button onPress={NoopFn} variant="negative">
        Delete
      </Button>
    </ButtonGroup>
  ),
  endButtons2: (
    <ButtonGroup block accessibilityLabel="Group">
      <Button variant="secondary">Back</Button>
      <Button variant="primary">Next</Button>
    </ButtonGroup>
  ),
};

const PageFooterScreen = () => {
  return (
    <ExampleScreen paddingX={0}>
      <Example gap={0}>
        <PageFooter action={exampleProps.endButton} background="bgPrimaryWash" />
        <Divider />
        <PageFooter action={exampleProps.endButtons} />
        <Divider />
        <PageFooter action={exampleProps.endButtons2} />
      </Example>
    </ExampleScreen>
  );
};
export default PageFooterScreen;
