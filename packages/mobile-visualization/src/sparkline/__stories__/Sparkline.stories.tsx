import React from 'react';
import { Dimensions } from 'react-native';
import { assets } from '@cbhq/cds-common/internal/data/assets';
import { prices, pricesWithScalingFactor } from '@cbhq/cds-common/internal/data/prices';
import { gutter } from '@cbhq/cds-common/tokens/sizing';
import { useSparklineArea } from '@cbhq/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@cbhq/cds-common/visualizations/useSparklinePath';
import { Cell } from '@cbhq/cds-mobile/cells/Cell';
import { CellMedia } from '@cbhq/cds-mobile/cells/CellMedia';
import { Example, ExampleScreen } from '@cbhq/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@cbhq/cds-mobile/hooks/useTheme';
import { HStack } from '@cbhq/cds-mobile/layout/HStack';
import { VStack } from '@cbhq/cds-mobile/layout/VStack';
import { TextBody } from '@cbhq/cds-mobile/typography/TextBody';
import { TextHeadline } from '@cbhq/cds-mobile/typography/TextHeadline';

import { Sparkline } from '../Sparkline';
import { SparklineArea } from '../SparklineArea';

type SparklineExampleProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  color: string;
};

const SparklineExample = ({ imageUrl, name, symbol, color }: SparklineExampleProps) => {
  const dimensions = { width: 64, height: 20 };
  const path = useSparklinePath({ ...dimensions, data: prices });
  return (
    <Cell
      detail={
        <HStack alignItems="center">
          <Sparkline {...dimensions} color={color} path={path} />
          <VStack
            alignContent="flex-end"
            alignItems="flex-end"
            justifyContent="center"
            paddingStart={2}
          >
            <TextBody align="end" numberOfLines={1}>
              $2,874.49
            </TextBody>
            <TextBody align="end" color="fgMuted" numberOfLines={1}>
              +36.08%
            </TextBody>
          </VStack>
        </HStack>
      }
      media={<CellMedia source={imageUrl} title="Title" type="image" />}
    >
      <VStack justifyContent="center">
        <TextHeadline ellipsize="tail" numberOfLines={1}>
          {name}
        </TextHeadline>
        <TextBody ellipsize="tail" numberOfLines={1}>
          {symbol}
        </TextBody>
      </VStack>
    </Cell>
  );
};

type SparklineCompactExampleProps = {
  yAxisScalingFactor: number;
  data: string[];
  fill?: boolean;
};

const SparklineScalingExample: React.FC<React.PropsWithChildren<SparklineCompactExampleProps>> = (
  props,
) => {
  const theme = useTheme();
  const chartHorizontalGutter = theme.space[gutter];
  const width = Dimensions.get('screen').width - chartHorizontalGutter * 2;
  const dimensions = { width, height: 320 };
  const path = useSparklinePath({ ...dimensions, ...props });
  const area = useSparklineArea({ ...dimensions, ...props });

  return (
    <VStack>
      <TextHeadline ellipsize="tail" numberOfLines={1}>
        Scale: {props.yAxisScalingFactor}
      </TextHeadline>
      <Sparkline
        {...dimensions}
        color="#F7931A"
        path={path}
        yAxisScalingFactor={props.yAxisScalingFactor}
      >
        {props.fill && <SparklineArea area={area} />}
      </Sparkline>
    </VStack>
  );
};

const PressableOpacityScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Sparkline">
        <VStack marginX={-2}>
          <SparklineExample {...assets.btc} />
          <SparklineExample {...assets.eth} />
          <SparklineExample {...assets.xrp} />
          <SparklineExample {...assets.dai} />
          <SparklineExample {...assets.sushi} />
        </VStack>
      </Example>
      <Example title="SparklineWithScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} />
        ))}
      </Example>
      <Example title="SparklineWithScaleAndFill">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} fill />
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default PressableOpacityScreen;
