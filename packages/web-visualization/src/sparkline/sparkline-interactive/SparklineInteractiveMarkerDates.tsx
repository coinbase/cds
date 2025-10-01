import React, { memo, useCallback, useMemo, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import { fadeDuration } from '@coinbase/cds-common/tokens/sparkline';
import { useDateLookup } from '@coinbase/cds-common/visualizations/useDateLookup';
import { cubicBezier } from '@coinbase/cds-web/animation/convertMotionConfig';
import { HStack } from '@coinbase/cds-web/layout';
import { TextLabel2 } from '@coinbase/cds-web/typography/TextLabel2';
import { css } from '@linaria/core';
import times from 'lodash/times';

import type { ChartFormatDate, ChartGetMarker } from './SparklineInteractive';

const fadeInCss = css`
  && {
    animation: cdsSparklineInteractiveFadeIn ${fadeDuration}ms ${cubicBezier('global')};
    opacity: 1;
  }

  @keyframes cdsSparklineInteractiveFadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const labelWidth = 125;
const noPointerEvents = { pointerEvents: 'none' } as const;

const SparklineInteractiveMarkerDate: React.FunctionComponent<
  React.PropsWithChildren<{
    getFormattedDate: (xPosition: number) => string;
  }>
> = memo(({ getFormattedDate }) => {
  const [xPos, setXPos] = useState<number>(0);
  const setupRef = useCallback((ref: HTMLSpanElement | null) => {
    if (ref) {
      setXPos(ref.offsetLeft + ref.offsetWidth / 2);
    }
  }, []);

  const dateStr = getFormattedDate(xPos);

  // take up space while loading so when it finishes loading there is no jump
  const fallback = <span style={{ visibility: 'hidden' }}>-</span>;
  return (
    <span ref={setupRef}>
      <TextLabel2 as="span" color="fgMuted" textAlign="center">
        {dateStr || fallback}
      </TextLabel2>
    </span>
  );
});

export type SparklineInteractiveMarkerDatesProps<Period extends string> = {
  getMarker: ChartGetMarker;
  formatDate: ChartFormatDate<Period>;
  selectedPeriod: Period;
  timePeriodGutter?: ThemeVars.Space;
};

function SparklineInteractiveMarkerDatesWithGeneric<Period extends string>({
  formatDate,
  selectedPeriod,
  getMarker,
  timePeriodGutter = 2,
}: SparklineInteractiveMarkerDatesProps<Period>) {
  const [numberOfLabels, setNumberOfLabels] = useState(0);
  const getFormattedDate = useDateLookup({
    getMarker,
    formatDate,
    selectedPeriod,
  });

  const setupRef = useCallback((ref: HTMLDivElement) => {
    if (ref) {
      const numberOfLabelsFromWidth = Math.floor(ref.offsetWidth / labelWidth);
      setNumberOfLabels(Math.max(numberOfLabelsFromWidth, 4));
    }
  }, []);

  const markers = useMemo(() => {
    return times(numberOfLabels).map((_, i) => {
      return <SparklineInteractiveMarkerDate key={i} getFormattedDate={getFormattedDate} />;
    });
  }, [getFormattedDate, numberOfLabels]);

  return (
    <HStack
      key={selectedPeriod}
      ref={setupRef}
      className={fadeInCss}
      justifyContent="space-between"
      paddingX={timePeriodGutter}
      style={noPointerEvents}
      width="100%"
    >
      {markers}
    </HStack>
  );
}

export const SparklineInteractiveMarkerDates = memo(
  SparklineInteractiveMarkerDatesWithGeneric,
) as typeof SparklineInteractiveMarkerDatesWithGeneric;
