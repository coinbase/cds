import React, { forwardRef, memo, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import type { FunctionComponent, ReactNode } from 'react';
import { subheadIconSignMap } from '@coinbase/cds-common/tokens/sparkline';
import type {
  SharedProps,
  SparklineInteractiveHeaderSignVariant,
  SparklineInteractiveHeaderVariant,
} from '@coinbase/cds-common/types';
import { HStack, VStack } from '@coinbase/cds-mobile/layout';

import { useSparklineInteractiveHeaderStyles } from './useSparklineInteractiveHeaderStyles';

export * from '@coinbase/cds-common/types/SparklineInteractiveHeaderBaseProps';

export type SparklineInteractiveSubHead = {
  /**
   * Free form percentage change
   */
  percent: string;
  /**
   * Sign to denote the change in price
   */
  sign: SparklineInteractiveHeaderSignVariant;
  /**
   * The variant to use for the price and percentage change
   */
  variant: SparklineInteractiveHeaderVariant;
  /**
   * Show the dollar amount of price change
   */
  priceChange?: string;
  /**
   * The accessoryText to show after the price and / or percentage change. An example is "All time"
   */
  accessoryText?: string;
  /**
   * The accessibilityLabel to show for the price and / or percentage change. This should be localized
   * @example
   * // First, configure your i18n strings
   * const messages = defineMessages({
   *   subHeadPrefix: {
   *     id: `${i18nKey}.subHeadPrefix`,
   *     defaultMessage: 'Price increase in the amount of',
   *     description: 'A prefix to make it clear which direction the price action was moving',
   *   }
   * });
   *
   * // then  provide the translated string the accessibilityLabel prop
   * messages.subHeadPrefix
   */
  accessibilityLabel?: string;
};

export type SparklineInteractiveHeaderValues = {
  /**
   * Describes what the Header represents e.g. Bitcoin Price
   */
  label?: string;
  /**
   * Main content of header, this is usually the price
   */
  title?: React.ReactNode;
  /**
   * Provides additional information about the title, such as a price change
   */
  subHead?: SparklineInteractiveSubHead;
};

export type SparklineInteractiveHeaderRef = {
  update: (params: SparklineInteractiveHeaderValues) => void;
};

export type SparklineInteractiveHeaderProps = SharedProps & {
  /**
   * Default title, changing this prop has no effect once the default is rendered. If you use a ReactNode that is not a string, then you cannot use the text based label that supports updates.
   */
  defaultTitle: React.ReactNode;
  /**
   * Default label, changing this prop has no effect once the default is rendered.
   */
  defaultLabel?: string;
  /**
   * Default SubHead, changing this prop has no effect once the default is rendered.
   */
  defaultSubHead?: SparklineInteractiveSubHead;
  /**
   * Adds a label node that allows React components. If you use this node then you cannot use the text based label that supports updates.
   */
  labelNode?: React.ReactNode;
  /**
   * Reduce the font size used for the header itself.
   */
  compact?: boolean;
};

export const interpolateSubHeadText = (subHead: SparklineInteractiveSubHead) => {
  if (subHead.priceChange && subHead.percent) {
    return `${subHead.priceChange} (${subHead.percent})`;
  }
  if (subHead.priceChange) {
    return subHead.priceChange;
  }
  return '';
};

const Trailing: FunctionComponent<React.PropsWithChildren<unknown>> = ({ children }) => {
  if (children) {
    return (
      <VStack alignItems="center" flexShrink={0} justifyContent="center" paddingStart={2}>
        {children}
      </VStack>
    );
  }
  return null;
};

const SparklineInteractiveHeaderStable = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderMobileProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, trailing, labelNode }, forwardedRef) => {
      const valuesRef = useRef<SparklineInteractiveHeaderValues>({
        title: defaultTitle,
        label: defaultLabel,
        subHead: defaultSubHead,
      });

      const [labelText, setLabelText] = useState(defaultLabel ?? '');
      const [titleValue, setTitleValue] = useState<React.ReactNode>(defaultTitle);
      const [subHeadValue, setSubHeadValue] = useState<SparklineInteractiveSubHead | undefined>(
        defaultSubHead,
      );

      const styles = useSparklineInteractiveHeaderStyles();

      const updateLabel = useCallback((label: string) => {
        const prevLabel = valuesRef.current?.label;

        if (prevLabel !== label) {
          setLabelText(label);
          valuesRef.current = { ...valuesRef.current, label };
        }
      }, []);

      const updateTitle = useCallback(
        (title: React.ReactNode) => {
          const prevTitle = valuesRef.current?.title;

          if (prevTitle !== title && typeof title === 'string') {
            setTitleValue(title);
            valuesRef.current = { ...valuesRef.current, title };
          }
        },
        [],
      );

      const updateSubHead = useCallback(
        (subHead: SparklineInteractiveSubHead) => {
          const prevSubHead = valuesRef.current?.subHead;

          if (prevSubHead !== subHead) {
            setSubHeadValue(subHead);
            valuesRef.current = { ...valuesRef.current, subHead };
          }
        },
        [],
      );

      // update is triggered from a parent component.
      // We track the values of each input in a valuesRef object
      // so that we can avoid updating unnecessarily if previous
      // value is the same as the new value
      const update = useCallback(
        ({ label, title, subHead }: SparklineInteractiveHeaderValues) => {
          if (label) {
            updateLabel(label);
          }
          if (title) {
            updateTitle(title);
          }
          if (subHead) {
            updateSubHead(subHead);
          }
        },
        [updateLabel, updateSubHead, updateTitle],
      );

      useImperativeHandle(forwardedRef, () => {
        return {
          update,
        };
      }, [update]);

      const label = !!labelText && (
        <Text style={styles.label} testID="SparklineInteractiveHeaderLabel">
          {labelText}
        </Text>
      );

      const title = (
        <>
          <View>
            {typeof titleValue === 'string' ? (
              <Text style={styles.title(titleValue)} testID="SparklineInteractiveHeaderTitle">
                {titleValue}
              </Text>
            ) : (
              titleValue
            )}
          </View>
          {!!subHeadValue && (
            <HStack accessible alignItems="center" padding={0}>
              <Text
                style={styles.subHeadIcon(subHeadValue.variant)}
                testID="SparklineInteractiveHeaderSubHeadIcon"
              >
                {subheadIconSignMap[subHeadValue.sign]}
              </Text>
              <Text
                style={styles.subHead(
                  subHeadValue.variant,
                  subHeadValue.accessoryText === undefined,
                )}
                testID="SparklineInteractiveHeaderSubHead"
              >
                {interpolateSubHeadText(subHeadValue)}
              </Text>
              {!!subHeadValue.accessoryText && (
                <Text style={styles.subHeadAccessory()} testID="SparklineInteractiveHeaderSubHead">
                  {subHeadValue.accessoryText}
                </Text>
              )}
            </HStack>
          )}
        </>
      );

      const trendA11yLabel = defaultSubHead
        ? `${defaultSubHead?.variant === 'positive' ? 'up' : 'down'}`
        : '';

      const headerA11yLabel = `${defaultLabel}, ${defaultTitle}, ${trendA11yLabel} ${defaultSubHead?.priceChange}, ${defaultSubHead?.percent}`;

      return (
        <HStack
          accessibilityHint="The price and difference for this time period"
          accessibilityLabel="Asset summary"
          accessibilityRole="header"
          aria-live="polite"
          justifyContent="space-between"
          padding={0}
          testID={testID}
        >
          <VStack accessible accessibilityLabel={headerA11yLabel} flexShrink={1} padding={0}>
            {labelNode ?? label}
            {title}
          </VStack>
          <Trailing>{trailing}</Trailing>
        </HStack>
      );
    },
  ),
);

type SparklineInteractiveHeaderMobileProps = {
  /**
   * Adds content next to the header. This is useful for interactive buttons
   */
  trailing?: ReactNode;
} & SparklineInteractiveHeaderProps;

export const SparklineInteractiveHeader = memo(
  forwardRef<SparklineInteractiveHeaderRef, SparklineInteractiveHeaderMobileProps>(
    ({ defaultLabel, defaultTitle, defaultSubHead, testID, trailing, labelNode }, ref) => {
      return (
        <SparklineInteractiveHeaderStable
          // All updates after initial load should be handled imperatively
          // via update function in forwarded ref to prevent overriding
          // values unexpectedly. This is why we use ref here so that the
          // default value is stable and never updates on re-renders
          ref={ref}
          defaultLabel={useRef(defaultLabel).current}
          defaultSubHead={useRef(defaultSubHead).current}
          defaultTitle={useRef(defaultTitle).current}
          labelNode={labelNode}
          testID={testID}
          trailing={trailing}
        />
      );
    },
  ),
);
