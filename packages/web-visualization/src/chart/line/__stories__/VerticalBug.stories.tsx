import React from 'react';
import { LineChart } from '../LineChart';

export default {
  title: 'Visualization/Debug/LineChartVertical',
  component: LineChart,
};

export const Reproduction = () => (
  <LineChart
    showArea
    height={{ base: 200, tablet: 225, desktop: 250 }}
    series={[
      {
        id: 'prices',
        data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
      },
    ]}
    layout="vertical"
  />
);
