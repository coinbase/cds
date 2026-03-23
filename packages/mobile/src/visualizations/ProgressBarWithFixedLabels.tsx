import React, { memo, useMemo } from 'react';
import { I18nManager, type StyleProp, type TextStyle, View, type ViewStyle } from 'react-native';
import type { PaddingProps, Placement } from '@coinbase/cds-common/types';

import { Box, VStack } from '../layout';

import { getProgressBarLabelParts, type ProgressBarLabel } from './getProgressBarLabelParts';
import { type ProgressBarProps } from './ProgressBar';
import { ProgressTextLabel } from './ProgressTextLabel';

export type ProgressBarWithFixedLabelsProps = Pick<
  ProgressBarProps,
  'disableAnimateOnMount' | 'disabled' | 'testID'
> & {
  /** Label that is pinned to the start of the container. If a number is used then it will format it as a percentage. */
  startLabel?: ProgressBarLabel;
  /** Label that is pinned to the end of the container. If a number is used then it will format it as a percentage. */
  endLabel?: ProgressBarLabel;
  /**
   * Position of label relative to the bar
   * @default beside
   * */
  labelPlacement?: Extract<Placement, 'above' | 'below' | 'beside'>;
  style?: StyleProp<ViewStyle>;
  /** Custom styles for individual elements of the ProgressBarWithFixedLabels component */
  styles?: {
    /** Root element */
    root?: StyleProp<ViewStyle>;
    /** Label container element */
    labelContainer?: StyleProp<ViewStyle>;
    /** Start label element */
    startLabel?: StyleProp<TextStyle>;
    /** End label element */
    endLabel?: StyleProp<TextStyle>;
  };
};

export type ProgressBarFixedLabelBesideProps = Pick<
  ProgressBarProps,
  'disableAnimateOnMount' | 'style'
> & {
  label: ProgressBarLabel;
  visuallyDisabled: boolean;
};

export type ProgressBarFixedLabelContainerProps = Omit<
  ProgressBarWithFixedLabelsProps,
  'labelPlacement' | 'progress' | 'disabled' | 'style'
> &
  Pick<PaddingProps, 'paddingBottom' | 'paddingTop'> & {
    visuallyDisabled: boolean;
  };

export type ProgressBarFixedLabelProps = Pick<
  ProgressBarProps,
  'disableAnimateOnMount' | 'style'
> & {
  position: 'start' | 'end';
  label: ProgressBarLabel;
  visuallyDisabled: boolean;
};

const ProgressBarFixedLabelBeside = memo(
  ({ label, visuallyDisabled, disableAnimateOnMount, style }: ProgressBarFixedLabelBesideProps) => {
    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    return (
      <ProgressTextLabel
        color="fg"
        disableAnimateOnMount={disableAnimateOnMount}
        disabled={visuallyDisabled}
        renderLabel={renderLabel}
        style={style}
        value={labelNum}
      />
    );
  },
);

const ProgressBarFixedLabel = memo(
  ({
    label,
    position,
    visuallyDisabled,
    disableAnimateOnMount,
    style,
  }: ProgressBarFixedLabelProps) => {
    return (
      <View testID={`cds-progress-bar-fixed-label-${position}`}>
        <ProgressBarFixedLabelBeside
          disableAnimateOnMount={disableAnimateOnMount}
          label={label}
          style={style}
          visuallyDisabled={visuallyDisabled}
        />
      </View>
    );
  },
);

const ProgressBarFixedLabelContainer = memo(
  ({
    startLabel,
    endLabel,
    visuallyDisabled,
    disableAnimateOnMount,
    paddingBottom,
    paddingTop,
    styles,
  }: ProgressBarFixedLabelContainerProps) => {
    const nodes: React.ReactElement[] = [];

    if (typeof startLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="start-label"
          disableAnimateOnMount={disableAnimateOnMount}
          label={startLabel}
          position="start"
          style={styles?.startLabel}
          visuallyDisabled={visuallyDisabled}
        />,
      );
    } else {
      // pushes an end label to the end if no start label is available to push it
      nodes.push(<View key="end-label-spacer" />);
    }

    if (typeof endLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="end-label"
          disableAnimateOnMount={disableAnimateOnMount}
          label={endLabel}
          position="end"
          style={styles?.endLabel}
          visuallyDisabled={visuallyDisabled}
        />,
      );
    } else {
      // pushes a start label to the start if there is no end label available to push it
      nodes.push(<View key="start-label-spacer" />);
    }

    if (I18nManager.isRTL) {
      nodes.reverse();
    }

    return (
      <Box
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        paddingBottom={paddingBottom}
        paddingTop={paddingTop}
        style={styles?.labelContainer}
        testID="cds-progress-label-container"
        width="100%"
      >
        {nodes}
      </Box>
    );
  },
);

export const ProgressBarWithFixedLabels: React.FC<
  React.PropsWithChildren<ProgressBarWithFixedLabelsProps>
> = memo(
  ({
    startLabel,
    endLabel,
    labelPlacement = 'beside',
    disableAnimateOnMount,
    disabled = false,
    children,
    testID,
    style,
    styles,
  }) => {
    const rootStyle = useMemo(() => [style, styles?.root], [style, styles?.root]);

    const startLabelEl = typeof startLabel !== 'undefined' && (
      <Box flexGrow={0} flexShrink={0} paddingEnd={1}>
        <ProgressBarFixedLabelBeside
          disableAnimateOnMount={disableAnimateOnMount}
          label={startLabel}
          style={styles?.startLabel}
          visuallyDisabled={disabled}
        />
      </Box>
    );

    const endLabelEl = typeof endLabel !== 'undefined' && (
      <Box flexGrow={0} flexShrink={0} paddingStart={1}>
        <ProgressBarFixedLabelBeside
          disableAnimateOnMount={disableAnimateOnMount}
          label={endLabel}
          style={styles?.endLabel}
          visuallyDisabled={disabled}
        />
      </Box>
    );

    const leftEl = I18nManager.isRTL ? endLabelEl : startLabelEl;
    const rightEl = I18nManager.isRTL ? startLabelEl : endLabelEl;

    return (
      <VStack style={rootStyle} testID={testID}>
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer
            disableAnimateOnMount={disableAnimateOnMount}
            endLabel={endLabel}
            paddingBottom={1}
            startLabel={startLabel}
            styles={styles}
            visuallyDisabled={disabled}
          />
        )}

        <Box alignItems="center" flexDirection="row" flexShrink={0} flexWrap="nowrap" width="100%">
          {labelPlacement === 'beside' && leftEl}
          {children}
          {labelPlacement === 'beside' && rightEl}
        </Box>

        {labelPlacement === 'below' && (
          <ProgressBarFixedLabelContainer
            disableAnimateOnMount={disableAnimateOnMount}
            endLabel={endLabel}
            paddingTop={1}
            startLabel={startLabel}
            styles={styles}
            visuallyDisabled={disabled}
          />
        )}
      </VStack>
    );
  },
);
