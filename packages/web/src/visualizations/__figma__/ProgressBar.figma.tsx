import { figma } from '@figma/code-connect';

import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=64-746&m=dev',
  {
    imports: [
      "import { ProgressBar } from '@coinbase/cds-web/visualizations/ProgressBar'",
      "import { ProgressBarWithFloatLabel } from '@coinbase/cds-web/visualizations/ProgressBarWithFloatLabel'",
    ],
    props: {
      weight: figma.enum('weight', {
        normal: 'normal',
        heavy: 'heavy',
        thin: 'thin',
      }),
      disabled: figma.boolean('disabled'),
      progress: figma.enum('progress', {
        '100%': 1,
        '75%': 0.75,
        '50%': 0.5,
        '25%': 0.25,
        '0%': 0,
      }),
      floatLabel: figma.enum('progress', {
        '100%': 100,
        '75%': 75,
        '50%': 50,
        '25%': 25,
        '0%': 0,
      }),
      labelPlacement: figma.enum('label placement', {
        'float above': 'above',
        'float below': 'below',
      }),
    },
    example: ({ floatLabel, progress, labelPlacement, ...props }) => (
      <ProgressBarWithFloatLabel
        label={floatLabel}
        labelPlacement={labelPlacement}
        progress={progress}
      >
        <ProgressBar progress={progress} {...props} />
      </ProgressBarWithFloatLabel>
    ),
  },
);

figma.connect(
  ProgressBar,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=64-746&m=dev',
  {
    imports: [
      "import { ProgressBar } from '@coinbase/cds-web/visualizations/ProgressBar'",
      "import { ProgressBarWithFloatLabel } from '@coinbase/cds-web/visualizations/ProgressBarWithFloatLabel'",
    ],
    props: {
      weight: figma.enum('weight', {
        normal: 'normal',
        heavy: 'heavy',
        thin: 'thin',
      }),
      disabled: figma.boolean('disabled'),
      progress: figma.enum('progress', {
        '100%': 1,
        '75%': 0.75,
        '50%': 0.5,
        '25%': 0.25,
        '0%': 0,
      }),
      labelPlacement: figma.enum('label placement', {
        'fixed above': 'above',
        'fixed below': 'below',
        'side-by-side': 'beside',
      }),
      showStartLabel: figma.boolean('show start label'),
      showEndLabel: figma.boolean('show end label'),
    },
    example: ({ showStartLabel, showEndLabel, progress, labelPlacement, ...props }) => {
      const startLabel = showStartLabel ? progress : undefined;
      const endLabel = showEndLabel ? progress : undefined;
      return (
        <ProgressBarWithFixedLabels
          endLabel={endLabel}
          labelPlacement={labelPlacement}
          startLabel={startLabel}
        >
          <ProgressBar progress={progress} {...props} />
        </ProgressBarWithFixedLabels>
      );
    },
  },
);
