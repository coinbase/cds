import React, { memo, useCallback, useMemo } from 'react';
import { periodLabelMap } from '@coinbase/cds-common/tokens/sparkline';
import { getAccessibleColor } from '@coinbase/cds-common/utils/getAccessibleColor';
import { useTheme } from '@coinbase/cds-web/hooks/useTheme';
import { Box, HStack } from '@coinbase/cds-web/layout';
import { Pressable } from '@coinbase/cds-web/system/Pressable';
import { TextLabel1 } from '@coinbase/cds-web/typography/TextLabel1';

export type SparklineInteractivePeriodSelectorProps<Period extends string> = {
  selectedPeriod: Period;
  setSelectedPeriod: (period: Period) => void;
  periods: { label: string; value: Period }[];
  color: string;
};

export type SparklineInteractivePeriodProps<Period extends string> = {
  period: { label: string; value: Period };
  selectedPeriod: Period;
  setSelectedPeriod: SparklineInteractivePeriodSelectorProps<Period>['setSelectedPeriod'];
  color: string;
};

function SparklineInteractivePeriodWithGeneric<Period extends string>({
  period,
  selectedPeriod,
  setSelectedPeriod,
  color,
}: SparklineInteractivePeriodProps<Period>) {
  const periodLabel = periodLabelMap[period.label] ?? period.label;
  const isSelected = period.value === selectedPeriod;

  const handleOnClick = useCallback(() => {
    setSelectedPeriod(period.value);
  }, [period, setSelectedPeriod]);

  const background = useMemo(() => (isSelected ? 'bgPrimaryWash' : 'transparent'), [isSelected]);

  return (
    <Box alignItems="center" height="fit-content" justifyContent="center">
      <Pressable
        accessibilityLabel={periodLabel}
        aria-pressed={isSelected}
        background={background}
        borderRadius={200}
        onClick={handleOnClick}
      >
        <TextLabel1
          noWrap
          as="span"
          dangerouslySetColor={isSelected ? color : 'var(--color-fgMuted)'}
          display="block"
          paddingX={2}
          paddingY={1}
        >
          {period.label}
        </TextLabel1>
      </Pressable>
    </Box>
  );
}

const SparklineInteractivePeriod = memo(
  SparklineInteractivePeriodWithGeneric,
) as typeof SparklineInteractivePeriodWithGeneric;

export const SparklineInteractivePeriodSelector = <Period extends string>({
  selectedPeriod,
  setSelectedPeriod,
  periods,
  color,
}: SparklineInteractivePeriodSelectorProps<Period>) => {
  const theme = useTheme();
  const accessibleForeground =
    color !== 'auto'
      ? color
      : getAccessibleColor({
          background: theme.color.bg,
          foreground: 'auto',
          enhanced: true,
        });

  return (
    <HStack justifyContent="space-between" paddingX={1} width="100%">
      {periods.map((period) => (
        <SparklineInteractivePeriod
          key={period.value}
          color={accessibleForeground}
          period={period}
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      ))}
    </HStack>
  );
};
