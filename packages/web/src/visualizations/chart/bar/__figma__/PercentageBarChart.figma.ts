// url=https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/CDS-Components?node-id=80632-2295
// source=packages/web/src/visualizations/chart/bar/PercentageBarChart.tsx
// component=PercentageBarChart
import figma from 'figma';

const instance = figma.selectedInstance;

// Figma "segments" VARIANT controls how many series (colored bar segments) appear.
// In code, this is represented by the length of the `series` array.
const segments = instance.getEnum('segments', {
  '2': 2,
  '3': 3,
  '4': 4,
});

// eslint-disable-next-line no-restricted-exports
export default {
  example:
    segments === 2
      ? figma.code`<PercentageBarChart
  height={16}
  series={[
    { id: 'a', data: 70, label: 'Segment A', color: 'var(--color-fgPositive)' },
    { id: 'b', data: 30, label: 'Segment B', color: 'var(--color-fgNegative)' },
  ]}
/>`
      : segments === 3
        ? figma.code`<PercentageBarChart
  height={16}
  series={[
    { id: 'a', data: 60, label: 'Segment A', color: 'var(--color-fgPositive)' },
    { id: 'b', data: 25, label: 'Segment B', color: 'var(--color-fgWarning)' },
    { id: 'c', data: 15, label: 'Segment C', color: 'var(--color-fgNegative)' },
  ]}
/>`
        : figma.code`<PercentageBarChart
  height={16}
  series={[
    { id: 'a', data: 55, label: 'Segment A', color: 'var(--color-fgPositive)' },
    { id: 'b', data: 25, label: 'Segment B', color: 'var(--color-fgWarning)' },
    { id: 'c', data: 15, label: 'Segment C', color: 'var(--color-fgNegative)' },
    { id: 'd', data: 5, label: 'Segment D', color: 'var(--color-fgMuted)' },
  ]}
/>`,
  imports: ['import { PercentageBarChart } from "@coinbase/cds-web/visualizations/chart"'],
  id: 'percentage-bar-chart',
  metadata: { nestable: false },
};
