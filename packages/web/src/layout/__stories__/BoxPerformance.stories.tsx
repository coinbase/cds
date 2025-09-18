import React from 'react';
import { withPerformance } from 'storybook-addon-performance';

import { Box } from '../Box';

export default {
  component: Box,
  title: 'Components/Box/Performance',
  decorators: [withPerformance],
  excludeStories: [
    'SingleDiv',
    'HundredCDSComponents',
    'HundredHTMLComponent',
    'ThousandCDSComponents',
    'ThousandHTMLComponent',
  ],
};

export const CDSBox = () => (
  <Box alignItems="center" justifyContent="space-between">
    <div>Left</div>
    <div>Right</div>
  </Box>
);

export const SingleDiv = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    <div>Left</div>
    <div>Right</div>
  </div>
);

function generateComponents(Component: React.ComponentType, count: number) {
  const components = [];
  for (let i = 0; i < count; i += 1) {
    components.push(<Component key={i} />);
  }
  return components;
}

export const HundredCDSComponents = () => {
  return generateComponents(CDSBox, 100);
};

export const HundredHTMLComponent = () => {
  return generateComponents(SingleDiv, 100);
};

export const ThousandCDSComponents = () => {
  return generateComponents(CDSBox, 1000);
};

export const ThousandHTMLComponent = () => {
  return generateComponents(SingleDiv, 1000);
};
