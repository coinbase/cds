import React from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Spinner } from '../Spinner';

const SpinnerScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default Spinner">
        <Spinner />
      </Example>
      <Example title="Large Spinner">
        <Spinner size="large" />
      </Example>
    </ExampleScreen>
  );
};

export default SpinnerScreen;
