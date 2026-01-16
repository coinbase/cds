import React from 'react';
import { figma } from '@figma/code-connect';

import { SparklineInteractive } from '../SparklineInteractive';

figma.connect(
  SparklineInteractive,
  'https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components?node-id=320-14858&m=dev',
  {
    imports: ["import { SparklineInteractive } from '@coinbase/cds-mobile-visualization'"],
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
          periods={periods}
          strokeColor="#cb51bb"
          {...props}
        />
      );
    },
  },
);
