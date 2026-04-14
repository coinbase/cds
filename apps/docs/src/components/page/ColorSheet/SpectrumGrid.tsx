import { memo, useCallback, useMemo } from 'react';
import { useTheme } from '@coinbase/cds-web';
import { Grid } from '@coinbase/cds-web/layout';
import { Tooltip } from '@coinbase/cds-web/overlays/tooltip/Tooltip';
import { useToast } from '@coinbase/cds-web/overlays/useToast';
import { Pressable } from '@coinbase/cds-web/system';

const SPECTRUM_COLOR_FAMILIES = [
  'blue',
  'teal',
  'green',

  'chartreuse',
  'yellow',
  'orange',
  'red',
  'pink',
  'purple',
  'indigo',
  'gray',
] as const;

const SPECTRUM_STEPS = [
  '0',
  '5',
  '10',
  '15',
  '20',
  '30',
  '40',
  '50',
  '60',
  '70',
  '80',
  '90',
  '100',
] as const;

type ColorFamily = (typeof SPECTRUM_COLOR_FAMILIES)[number];
type SpectrumStep = (typeof SPECTRUM_STEPS)[number];
type SpectrumKey = `${ColorFamily}${SpectrumStep}`;

type SpectrumCellProps = {
  family: string;
  step: string;
  rgbValue: string;
};

const SpectrumCell = memo(({ family, step, rgbValue }: SpectrumCellProps) => {
  const toast = useToast();
  const cssColor = `rgb(${rgbValue})`;
  const label = `${family.charAt(0).toUpperCase() + family.slice(1)}${step}`;

  const handlePress = useCallback(() => {
    void navigator.clipboard.writeText(cssColor).then(() => {
      toast.show(`Copied ${cssColor}`);
    });
  }, [cssColor, toast]);

  return (
    <Tooltip content={label} placement="top">
      <Pressable
        accessibilityLabel={`Copy ${label}: ${cssColor}`}
        aspectRatio="3 / 2"
        blendStyles={{
          background: cssColor,
        }}
        onClick={handlePress}
        width="100%"
      />
    </Tooltip>
  );
});

export const SpectrumGrid = memo(() => {
  const { spectrum } = useTheme();

  const stepRows = useMemo(
    () =>
      SPECTRUM_STEPS.map((step) => ({
        step,
        cells: SPECTRUM_COLOR_FAMILIES.map((family) => ({
          family,
          value: spectrum[`${family}${step}` as SpectrumKey],
        })),
      })),
    [spectrum],
  );

  return (
    <Grid borderRadius={200} columns={SPECTRUM_COLOR_FAMILIES.length} overflow="hidden">
      {stepRows.map(({ step, cells }) =>
        cells.map(({ family, value }) => (
          <SpectrumCell key={`${family}${step}`} family={family} rgbValue={value} step={step} />
        )),
      )}
    </Grid>
  );
});
