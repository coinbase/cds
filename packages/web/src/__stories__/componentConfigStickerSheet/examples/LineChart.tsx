import { memo } from 'react';
import { Box } from '@coinbase/cds-web/layout/Box';

export const LineChartBasicExample = memo(() => {
  const width = 392;
  const height = 150;
  const points = ['0,120', '72,72', '144,110', '216,40', '288,125', '360,60'];

  return (
    <Box
      bordered
      alignItems="center"
      background="bg"
      borderColor="bgLine"
      borderRadius={200}
      height={height}
      justifyContent="center"
      width={width}
    >
      <svg
        aria-label="Line chart preview"
        height="120"
        role="img"
        viewBox="0 0 360 140"
        width="360"
      >
        <polyline
          fill="none"
          points={points.join(' ')}
          stroke="var(--color-bgPrimary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="4"
        />
      </svg>
    </Box>
  );
});
