import { useEffect, useRef } from 'react';

import { CartesianChart } from '../CartesianChart';

export default {
  component: CartesianChart,
  title: 'Components/Chart/TestinCharts',
};

export const ElementSize = () => {
  const gRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (gRef.current) {
      console.log('got bounding box', gRef.current.getBBox());
    }
  }, [gRef]);

  return (
    <svg height={300} width={300}>
      <g ref={gRef}>
        <rect fill="red" height={200} width={200} x={100} y={100} />
        <rect fill="blue" height={100} width={100} x={50} y={50} />
      </g>
    </svg>
  );
};
