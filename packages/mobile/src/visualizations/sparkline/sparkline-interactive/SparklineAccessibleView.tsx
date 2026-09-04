import React, { memo, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import chunk from 'lodash/chunk';

import type { SparklineInteractiveBaseProps } from './SparklineInteractive';

type SparklineAccessibleViewProps<Period extends string> = {
  selectedPeriod: Period;
} & Pick<SparklineInteractiveBaseProps<Period>, 'data'>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

/**
 * SparklineAccessibleView renders an accessible view for Sparkline Chart.
 *
 * It chunks the sparkline data into 10 (or fewer) pieces, rendering each as a View with
 * flex width proportional to the chunk size. The first data point in each chunk is used
 * to generate an accessibilityLabel with the date and value.
 *
 * @param data - The sparkline data mapped by time period
 * @param selectedPeriod - The currently selected time period
 */
export const SparklineAccessibleView = memo(function SparklineAccessibleView<
  Period extends string,
>({ data, selectedPeriod }: SparklineAccessibleViewProps<Period>) {
  const chunkedData = data ? chunk(data[selectedPeriod], data[selectedPeriod].length / 10) : [];
  // if the data is not evenly divisible by 10, the last chunk will be smaller than the rest
  // so we need to combine it with the previous chunk
  if (chunkedData.length === 11) {
    const lastChunk = chunkedData.pop();
    chunkedData[chunkedData.length - 1] = chunkedData[chunkedData.length - 1].concat(
      lastChunk ?? [],
    );
  }

  const getStyleByLength = useCallback(
    (length: number) => ({
      flex: length,
    }),
    [],
  );

  return (
    <View style={styles.container}>
      {chunkedData.map((dataChunk) => {
        // use the first data point in chunk for accessibility label
        const item = dataChunk[0];

        // only announce time for hour and day
        const shouldAnnounceTime = selectedPeriod === 'hour' || selectedPeriod === 'day';

        // Extract date formatting options
        const timeOptions: Intl.DateTimeFormatOptions = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        };

        const dateOptions: Intl.DateTimeFormatOptions = {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        };

        // TODO: localize date and time
        const dateTime = item.date.toLocaleString(
          'en-US',
          shouldAnnounceTime ? timeOptions : dateOptions,
        );

        const price = item.value.toFixed(2);

        return (
          <View
            key={String(item.date)}
            accessible
            accessibilityLabel={`${dateTime}, $${price}`}
            // variable width base on chunk length
            style={getStyleByLength(dataChunk.length)}
          />
        );
      })}
    </View>
  );
});
