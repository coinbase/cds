/* eslint-disable react-hooks/rules-of-hooks */

import React from 'react';
import { figma } from '@figma/code-connect';

import { Sparkline } from '../Sparkline';

figma.connect(
  Sparkline,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=320-15040&m=dev',
  {
    imports: [
      "import { Sparkline } from '@coinbase/cds-web-visualization'",
      "import { useSparklinePath } from '@coinbase/cds-common/visualizations/useSparklinePath'",
    ],
    example: () => {
      const data = [20, 30, 5, 45, 0];
      // @ts-expect-error: useSparklinePath is not typed correctly
      const path = useSparklinePath({ height: 200, width: 200, data });
      return <Sparkline color="auto" height={200} path={path} width={400} />;
    },
  },
);
