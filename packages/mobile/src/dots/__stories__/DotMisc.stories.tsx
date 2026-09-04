import React, { useEffect, useState } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Icon } from '../../icons/Icon';
import { Box } from '../../layout/Box';
import { DotCount } from '../DotCount';

const DotCountDynamic = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => (prev === 0 ? Math.floor(Math.random() * 99) : 0));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box alignItems="flex-start" minHeight={100} padding={1}>
      <DotCount count={count}>
        <Icon name="airdrop" size="m" />
      </DotCount>
    </Box>
  );
};

const DotMiscScreen = () => {
  return (
    <ExampleScreen>
      <Example inline title="DotCount Dynamic">
        <DotCountDynamic />
      </Example>
    </ExampleScreen>
  );
};

export default DotMiscScreen;
