import React, { useCallback } from 'react';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { ProgressBar } from '../ProgressBar';
import { ProgressBarWithFixedLabels } from '../ProgressBarWithFixedLabels';
import { ProgressBarWithFloatLabel } from '../ProgressBarWithFloatLabel';
import { ProgressContainerWithButtons } from '../ProgressContainerWithButtons';

const renderStartLabelNum = (num: number) => {
  return <Text font="label1">${num.toLocaleString()}</Text>;
};

const renderEndLabelNum = (num: number) => {
  return (
    <Text align="end" font="label2">
      ${num.toLocaleString()}&nbsp;left
    </Text>
  );
};

const renderCustomStringLabel: (num: number) => string = (num: number) => {
  return `$${num.toLocaleString()}`;
};

const AnimationCallbacksExample = () => {
  const [animationStatus, setAnimationStatus] = React.useState<string>('Ready');

  const handleAnimationStart = useCallback(() => {
    setAnimationStatus('Animating...');
  }, []);

  const handleAnimationEnd = useCallback(() => {
    setAnimationStatus('Animation Ended');
  }, []);

  return (
    <ProgressContainerWithButtons>
      {({ calculateProgress }) => (
        <VStack gap={2}>
          <Text font="label1">Animation Status: {animationStatus}</Text>
          <ProgressBarWithFloatLabel
            label={Math.round(calculateProgress(0.2) * 100)}
            labelPlacement="above"
            progress={calculateProgress(0.2)}
          >
            <ProgressBar
              onAnimationEnd={handleAnimationEnd}
              onAnimationStart={handleAnimationStart}
              progress={calculateProgress(0.2)}
            />
          </ProgressBarWithFloatLabel>
        </VStack>
      )}
    </ProgressContainerWithButtons>
  );
};

const ProgressBarScreen = () => {
  return (
    <ExampleScreen>
      <Example title="Default">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar
                accessibilityLabel="default progressbar"
                progress={calculateProgress(0)}
              />
              <ProgressBar
                accessibilityLabel="default progressbar"
                progress={calculateProgress(0.2)}
              />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Thin">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} weight="thin" />
              <ProgressBar progress={calculateProgress(0.2)} weight="thin" />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Semiheavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} weight="semiheavy" />
              <ProgressBar progress={calculateProgress(0.2)} weight="semiheavy" />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Heavy">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar progress={calculateProgress(0)} weight="heavy" />
              <ProgressBar progress={calculateProgress(0.2)} weight="heavy" />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelAbove">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0) * 100)}
                labelPlacement="above"
                progress={calculateProgress(0)}
              >
                <ProgressBar progress={calculateProgress(0)} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="above"
                progress={calculateProgress(0.2)}
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelBelow">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0) * 100)}
                labelPlacement="below"
                progress={calculateProgress(0)}
              >
                <ProgressBar progress={calculateProgress(0)} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
                progress={calculateProgress(0.2)}
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelAtBoundsBelow">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
                startLabel={0}
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="below"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="LabelBeside">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="beside"
                startLabel={0}
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.2) * 100)}
                labelPlacement="beside"
              >
                <ProgressBar progress={calculateProgress(0.2)} />
              </ProgressBarWithFixedLabels>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disabled">
        <VStack gap={2}>
          <ProgressBarWithFixedLabels disabled labelPlacement="beside" startLabel={50}>
            <ProgressBar disabled progress={0.5} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels disabled endLabel={10} labelPlacement="beside">
            <ProgressBar disabled progress={0.1} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels disabled endLabel={20} labelPlacement="beside" startLabel={0}>
            <ProgressBar disabled progress={0.2} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels disabled endLabel={50} labelPlacement="beside" startLabel={0}>
            <ProgressBar disabled progress={0.5} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFloatLabel disabled label={70} progress={0.7}>
            <ProgressBar disabled progress={0.7} />
          </ProgressBarWithFloatLabel>
        </VStack>
      </Example>
      <Example title="Colors">
        <VStack gap={2}>
          <ProgressBar color="bgPositive" progress={0.5} />
          <ProgressBar color="bgNegative" progress={0.5} />
          <ProgressBar color="bgPrimary" progress={0.5} />
          <ProgressBar color="bgWarning" progress={0.5} />
          <ProgressBar color="fg" progress={0.5} />
          <ProgressBar disabled color="fg" progress={0.5} />
        </VStack>
      </Example>
      <Example title="CustomLabel">
        <ProgressContainerWithButtons hideIncrease>
          {() => (
            <VStack gap={2}>
              <ProgressBarWithFixedLabels
                endLabel={{ value: 35500, render: renderEndLabelNum }}
                labelPlacement="above"
                startLabel={{ value: 12500, render: renderStartLabelNum }}
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFixedLabels>
              <ProgressBarWithFloatLabel
                label={{ value: 12500, render: renderStartLabelNum }}
                labelPlacement="above"
                progress={0.6}
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="CustomLabelString">
        <ProgressContainerWithButtons hideIncrease>
          {() => (
            <VStack gap={2}>
              <ProgressBarWithFloatLabel
                label={{ value: 35500, render: renderCustomStringLabel }}
                labelPlacement="above"
                progress={0.6}
              >
                <ProgressBar progress={0.6} />
              </ProgressBarWithFloatLabel>
              <ProgressBarWithFloatLabel
                disabled
                label={{ value: 35500, render: renderCustomStringLabel }}
                labelPlacement="above"
                progress={0.6}
              >
                <ProgressBar disabled progress={0.6} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Disable Mount Animation">
        <ProgressContainerWithButtons hideIncrease>
          {() => <ProgressBar disableAnimateOnMount progress={0.8} />}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Animation Callbacks">
        <AnimationCallbacksExample />
      </Example>
      <Example title="Custom Styles">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={2}>
              <ProgressBar
                progress={calculateProgress(0.6)}
                styles={{
                  progress: { backgroundColor: 'orange' },
                }}
              />
              <ProgressBar
                progress={calculateProgress(0.3)}
                styles={{
                  root: { height: 32, borderRadius: 16 },
                  progress: { borderRadius: 16 },
                }}
              />
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
      <Example title="Custom Styles with Labels">
        <ProgressContainerWithButtons>
          {({ calculateProgress }) => (
            <VStack gap={4}>
              <Text font="label1">Fixed Labels with Custom Styles</Text>
              <ProgressBarWithFixedLabels
                endLabel={Math.round(calculateProgress(0.7) * 100)}
                labelPlacement="above"
                startLabel={0}
                styles={{
                  startLabel: { color: 'red' },
                  endLabel: { color: 'green' },
                }}
              >
                <ProgressBar
                  progress={calculateProgress(0.7)}
                  styles={{
                    root: { height: 24 },
                    progress: { borderRadius: 12 },
                  }}
                />
              </ProgressBarWithFixedLabels>

              <Text font="label1">Float Label with Custom Styles</Text>
              <ProgressBarWithFloatLabel
                label={Math.round(calculateProgress(0.4) * 100)}
                labelPlacement="above"
                progress={calculateProgress(0.4)}
                styles={{
                  label: { color: 'blue' },
                }}
              >
                <ProgressBar progress={calculateProgress(0.4)} />
              </ProgressBarWithFloatLabel>
            </VStack>
          )}
        </ProgressContainerWithButtons>
      </Example>
    </ExampleScreen>
  );
};

export default ProgressBarScreen;
