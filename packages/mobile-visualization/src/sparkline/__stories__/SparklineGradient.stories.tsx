import React from 'react';
import { Dimensions } from 'react-native';
import { assets } from '@coinbase/cds-common/internal/data/assets';
import { prices, pricesWithScalingFactor } from '@coinbase/cds-common/internal/data/prices';
import { gutter } from '@coinbase/cds-common/tokens/sizing';
import { useSparklineArea } from '@coinbase/cds-common/visualizations/useSparklineArea';
import { useSparklinePath } from '@coinbase/cds-common/visualizations/useSparklinePath';
import { Cell } from '@coinbase/cds-mobile/cells/Cell';
import { CellMedia } from '@coinbase/cds-mobile/cells/CellMedia';
import { Example, ExampleScreen } from '@coinbase/cds-mobile/examples/ExampleScreen';
import { useTheme } from '@coinbase/cds-mobile/hooks/useTheme';
import { VStack } from '@coinbase/cds-mobile/layout';
import { Text } from '@coinbase/cds-mobile/typography';

import { SparklineArea } from '../SparklineArea';
import { SparklineGradient } from '../SparklineGradient';

const height = 320;

type SparklineGradientExampleProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  color: string;
  fill?: boolean;
};

const SparklineGradientExample = ({
  imageUrl,
  name,
  symbol,
  color,
  fill,
}: SparklineGradientExampleProps) => {
  const theme = useTheme();
  const chartHorizontalGutter = theme.space[gutter];
  const width = Dimensions.get('screen').width - chartHorizontalGutter * 2;
  const dimensions = { width, height };
  const path = useSparklinePath({ ...dimensions, data: prices });
  const area = useSparklineArea({ ...dimensions, data: prices });

  return (
    <VStack>
      <Cell media={<CellMedia source={imageUrl} type="image" />}>
        <VStack justifyContent="center">
          <Text ellipsize="tail" font="headline" numberOfLines={1}>
            {name}
          </Text>
          <Text ellipsize="tail" font="body" numberOfLines={1}>
            {symbol}
          </Text>
        </VStack>
      </Cell>
      <SparklineGradient {...dimensions} color={color} path={path}>
        {fill && <SparklineArea area={area} />}
      </SparklineGradient>
    </VStack>
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
  const dimensions = { width, height };
  const path = useSparklinePath({ ...dimensions, ...props });
  const area = useSparklineArea({ ...dimensions, ...props });

  return (
    <VStack>
      <Text ellipsize="tail" font="headline" numberOfLines={1}>
        Scale: {props.yAxisScalingFactor}
      </Text>
      <SparklineGradient
        {...dimensions}
        color="#F7931A"
        path={path}
        yAxisScalingFactor={props.yAxisScalingFactor}
      >
        {props.fill && <SparklineArea area={area} />}
      </SparklineGradient>
    </VStack>
  );
};

const PressableOpacityScreen = () => {
  return (
    <ExampleScreen>
      <Example title="SparklineGradient">
        <SparklineGradientExample {...assets.btc} />
        <SparklineGradientExample {...assets.eth} />
        <SparklineGradientExample {...assets.ltc} />
        <SparklineGradientExample {...assets.xrp} />
        <SparklineGradientExample {...assets.dai} />
        <SparklineGradientExample {...assets.sushi} />
      </Example>
      <Example title="SparklineGradientWithArea">
        <SparklineGradientExample {...assets.btc} fill />
        <SparklineGradientExample {...assets.eth} fill />
        <SparklineGradientExample {...assets.ltc} fill />
        <SparklineGradientExample {...assets.xrp} fill />
        <SparklineGradientExample {...assets.dai} fill />
        <SparklineGradientExample {...assets.sushi} fill />
      </Example>
      <Example title="SparklineGradientWithScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} />
        ))}
      </Example>
      <Example title="SparklineGradientWithAreaAndScale">
        {pricesWithScalingFactor.map((item) => (
          <SparklineScalingExample key={item.yAxisScalingFactor} {...item} fill />
        ))}
      </Example>
    </ExampleScreen>
  );
};

export default PressableOpacityScreen;
