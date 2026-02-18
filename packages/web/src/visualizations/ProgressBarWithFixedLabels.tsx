import React, { memo } from 'react';
import type { PaddingProps, Placement } from '@coinbase/cds-common/types';

import { cx } from '../cx';
import { Box } from '../layout/Box';
import { VStack } from '../layout/VStack';
import { isRtl } from '../utils/isRtl';

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
  style?: React.CSSProperties;
  className?: string;
  /** Custom styles for individual elements of the ProgressBarWithFixedLabels component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Label container element */
    labelContainer?: React.CSSProperties;
    /** Start label element */
    startLabel?: React.CSSProperties;
    /** End label element */
    endLabel?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the ProgressBarWithFixedLabels component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Label container element */
    labelContainer?: string;
    /** Start label element */
    startLabel?: string;
    /** End label element */
    endLabel?: string;
  };
};

export type ProgressBarFixedLabelContainerProps = Omit<
  ProgressBarWithFixedLabelsProps,
  'labelPlacement' | 'progress' | 'disabled' | 'style' | 'className'
> &
  Pick<PaddingProps, 'paddingBottom' | 'paddingTop'> & {
    visuallyDisabled: boolean;
  };

export type ProgressBarFixedLabelBesideProps = Pick<
  ProgressBarProps,
  'disableAnimateOnMount' | 'style' | 'className'
> & {
  label: ProgressBarLabel;
  visuallyDisabled: boolean;
};

export type ProgressBarFixedLabelProps = Pick<
  ProgressBarProps,
  'disableAnimateOnMount' | 'style' | 'className'
> & {
  position: 'start' | 'end';
  label: ProgressBarLabel;
  visuallyDisabled: boolean;
};

const ProgressBarFixedLabelBeside = memo(
  ({
    label,
    visuallyDisabled,
    disableAnimateOnMount,
    style,
    className,
  }: ProgressBarFixedLabelBesideProps) => {
    const { value: labelNum, render: renderLabel } = getProgressBarLabelParts(label);

    return (
      <ProgressTextLabel
        className={className}
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
    className,
  }: ProgressBarFixedLabelProps) => {
    return (
      <span data-testid={`cds-progress-bar-fixed-label-${position}`}>
        <ProgressBarFixedLabelBeside
          className={className}
          disableAnimateOnMount={disableAnimateOnMount}
          label={label}
          style={style}
          visuallyDisabled={visuallyDisabled}
        />
      </span>
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
    classNames,
  }: ProgressBarFixedLabelContainerProps) => {
    const nodes: React.ReactElement[] = [];
    if (typeof startLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="start-label"
          className={classNames?.startLabel}
          disableAnimateOnMount={disableAnimateOnMount}
          label={startLabel}
          position="start"
          style={styles?.startLabel}
          visuallyDisabled={visuallyDisabled}
        />,
      );
    } else {
      // pushes an end label to the end if no start label is available to push it
      nodes.push(<div key="end-label-spacer" />);
    }

    if (typeof endLabel !== 'undefined') {
      nodes.push(
        <ProgressBarFixedLabel
          key="end-label"
          className={classNames?.endLabel}
          disableAnimateOnMount={disableAnimateOnMount}
          label={endLabel}
          position="end"
          style={styles?.endLabel}
          visuallyDisabled={visuallyDisabled}
        />,
      );
    } else {
      // pushes a start label to the start if there is no end label available to push it
      nodes.push(<div key="start-label-spacer" />);
    }

    if (isRtl()) {
      nodes.reverse();
    }

    return (
      <Box
        alignItems="center"
        className={classNames?.labelContainer}
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
    className,
    styles,
    classNames,
  }) => {
    const startLabelEl = typeof startLabel !== 'undefined' && (
      <Box flexGrow={0} flexShrink={0} paddingEnd={1}>
        <ProgressBarFixedLabelBeside
          className={classNames?.startLabel}
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
          className={classNames?.endLabel}
          disableAnimateOnMount={disableAnimateOnMount}
          label={endLabel}
          style={styles?.endLabel}
          visuallyDisabled={disabled}
        />
      </Box>
    );

    const leftEl = isRtl() ? endLabelEl : startLabelEl;
    const rightEl = isRtl() ? startLabelEl : endLabelEl;

    return (
      <VStack
        className={cx(className, classNames?.root)}
        style={{ ...style, ...styles?.root }}
        testID={testID}
        width="100%"
      >
        {labelPlacement === 'above' && (
          <ProgressBarFixedLabelContainer
            classNames={classNames}
            disableAnimateOnMount={disableAnimateOnMount}
            endLabel={endLabel}
            paddingBottom={1}
            startLabel={startLabel}
            styles={styles}
            visuallyDisabled={disabled}
          />
        )}

        <Box alignItems="center" flexShrink={0} flexWrap="nowrap" width="100%">
          {labelPlacement === 'beside' && leftEl}
          {children}
          {labelPlacement === 'beside' && rightEl}
        </Box>

        {labelPlacement === 'below' && (
          <ProgressBarFixedLabelContainer
            classNames={classNames}
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
