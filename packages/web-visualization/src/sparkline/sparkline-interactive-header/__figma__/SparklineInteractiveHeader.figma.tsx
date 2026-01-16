import React from 'react';
import { figma } from '@figma/code-connect';

import { SparklineInteractive } from '../../sparkline-interactive/SparklineInteractive';
import { SparklineInteractiveHeader } from '../SparklineInteractiveHeader';

figma.connect(
  SparklineInteractiveHeader,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=320-14931&m=dev',
  {
    imports: [
      "import { SparklineInteractiveHeader } from '@coinbase/cds-web-visualization'",
      "import { SparklineInteractive } from '@coinbase/cds-web-visualization'",
    ],
    props: {
      compact: figma.boolean('compact'),
      disableScrubbing: figma.boolean('scrubbing', {
        false: true,
        true: false,
      }),
    },
    example: (props) => {
      const periods = [
        {
          label: '1H',
          value: 'hour',
        },
        {
          label: '1D',
          value: 'day',
        },
        {
          label: '1W',
          value: 'week',
        },
        {
          label: '1M',
          value: 'month',
        },
        {
          label: '1Y',
          value: 'year',
        },
        {
          label: 'All',
          value: 'all',
        },
      ];
      const data = {
        hour: [],
        day: [
          {
            value: 49259.38,
            date: new Date('2021-12-05T04:00:00.000Z'),
          },
          {
            value: 49163.79,
            date: new Date('2021-12-05T04:05:00.000Z'),
          },
          {
            value: 49146.66,
            date: new Date('2021-12-05T04:10:00.000Z'),
          },
          {
            value: 49083.92,
            date: new Date('2021-12-05T04:15:00.000Z'),
          },
          {
            value: 49115.3,
            date: new Date('2021-12-05T04:20:00.000Z'),
          },
          {
            value: 48992.14,
            date: new Date('2021-12-05T04:25:00.000Z'),
          },
          {
            value: 49075.75,
            date: new Date('2021-12-05T04:30:00.000Z'),
          },
          {
            value: 49025.78,
            date: new Date('2021-12-05T04:35:00.000Z'),
          },
          {
            value: 49066.23,
            date: new Date('2021-12-05T04:40:00.000Z'),
          },
          {
            value: 49247.82,
            date: new Date('2021-12-05T04:45:00.000Z'),
          },
        ],
        week: [],
        month: [],
        year: [],
        all: [],
      };

      const defaultSubHead = {
        percent: '1.35%',
        sign: 'upwardTrend',
        variant: 'positive',
        accessibilityLabel: 'on Sunday, December 5, 2021 at 10:55 PM, up',
        priceChange: '$21.36',
      };

      const header = (
        <SparklineInteractiveHeader
          defaultLabel="Portfolio balance"
          // @ts-expect-error: defaultSubHead is not part of the type definition
          defaultSubHead={defaultSubHead}
          defaultTitle="$10,023.82"
        />
      );

      return (
        <SparklineInteractive
          data={data}
          defaultPeriod="day"
          formatDate={(date) =>
            date.toLocaleString('en-US', {
              timeZone: 'America/New_York',
              hour: 'numeric',
              minute: 'numeric',
            })
          }
          headerNode={header}
          onPeriodChanged={() => {}}
          onScrub={() => {}}
          onScrubEnd={() => {}}
          periods={periods}
          strokeColor="#cb51bb"
          {...props}
        />
      );
    },
  },
);
