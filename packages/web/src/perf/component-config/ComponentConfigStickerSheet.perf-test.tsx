import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { measurePerformance } from 'reassure';

import { Button } from '../../buttons/Button';
import { IconButton } from '../../buttons/IconButton';
import { ListCell } from '../../cells/ListCell';
import { Chip } from '../../chips/Chip';
import { SearchInput } from '../../controls/SearchInput';
import { TextInput } from '../../controls/TextInput';
import type { ComponentConfig } from '../../core/componentConfig';
import type { ThemeConfig } from '../../core/theme';
import { DotCount } from '../../dots/DotCount';
import { Icon } from '../../icons/Icon';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';
import { ThemeProvider } from '../../system/ThemeProvider';
import { Tag } from '../../tag/Tag';
import { defaultTheme } from '../../themes/defaultTheme';
import { Text } from '../../typography/Text';

const updateIterations = 50;

const customPerfTheme: ThemeConfig = {
  ...defaultTheme,
  id: 'component-config-perf-baseline-theme',
  lightColor: {
    ...defaultTheme.lightColor,
    bgAlternate: defaultTheme.lightColor.bgSecondary,
  },
  darkColor: {
    ...defaultTheme.darkColor,
    bgAlternate: defaultTheme.darkColor.bgSecondary,
  },
};

const customComponentConfig: ComponentConfig = {
  Button: (props) => ({
    borderRadius: 200,
    height: props.compact ? 24 : 32,
    font: props.compact ? 'label1' : 'headline',
  }),
  IconButton: (props) => ({
    borderRadius: 200,
    height: props.compact ? 24 : 32,
    width: props.compact ? 24 : 32,
  }),
  TextInput: (props) => ({
    bordered: false,
    inputBackground: 'bgAlternate',
    font: props.compact ? 'label2' : 'body',
    variant: 'foregroundMuted',
    focusedBorderWidth: 100,
  }),
  SearchInput: (props) => ({
    borderRadius: 200,
    height: props.compact ? 24 : 32,
  }),
  Chip: {
    borderRadius: 200,
  },
  ListCell: (props) => {
    const spacingVariant = props.spacingVariant ?? (props.compact ? 'compact' : 'normal');
    return spacingVariant === 'normal' ? { minHeight: '36px' } : {};
  },
};

const ComplexStickerSheetLike = ({ tick = 0 }: { tick?: number }) => (
  <VStack alignItems="center" background="bgAlternate" gap={2} padding={2}>
    <HStack gap={2}>
      <VStack gap={2} width={420}>
        <HStack gap={1}>
          {Array.from({ length: 12 }, (_, i) => (
            <Button key={`primary-${i}`} variant="primary">
              Primary
            </Button>
          ))}
        </HStack>
        <HStack gap={1}>
          {Array.from({ length: 12 }, (_, i) => (
            <Button key={`secondary-${i}`} compact variant="secondary">
              Secondary
            </Button>
          ))}
        </HStack>
        <VStack gap={1}>
          {Array.from({ length: 8 }, (_, i) => (
            <TextInput key={`input-${i}`} label={`Label ${i}`} placeholder="Input value" />
          ))}
        </VStack>
        <VStack gap={1}>
          {Array.from({ length: 8 }, (_, i) => (
            <SearchInput
              key={`search-${i}`}
              label={`Search ${i}`}
              onChangeText={() => {}}
              placeholder="Search value"
            />
          ))}
        </VStack>
        <VStack gap={1}>
          {Array.from({ length: 8 }, (_, i) => (
            <ListCell
              key={`cell-${i}`}
              accessibilityLabel={`List row ${i}`}
              description="$100"
              media={<Avatar name="A" size="m" />}
              onClick={() => {}}
              subtitle="Subtitle"
              title={`Row ${i}`}
            />
          ))}
        </VStack>
      </VStack>
      <VStack gap={2} width={600}>
        <HStack gap={1}>
          {Array.from({ length: 16 }, (_, i) => (
            <IconButton
              key={`icon-${i}`}
              accessibilityLabel={`Icon button ${i}`}
              name="add"
              variant="tertiary"
            />
          ))}
        </HStack>
        <HStack flexWrap="wrap" gap={1}>
          {Array.from({ length: 24 }, (_, i) => (
            <Chip key={`chip-${i}`} accessibilityLabel={`Chip ${i}`} onClick={() => {}}>
              Chip {i}
            </Chip>
          ))}
        </HStack>
        <HStack gap={1}>
          {Array.from({ length: 20 }, (_, i) => (
            <Tag key={`tag-${i}`} intent={i % 2 === 0 ? 'informational' : 'promotional'}>
              Tag {i}
            </Tag>
          ))}
        </HStack>
        <HStack gap={1}>
          {Array.from({ length: 10 }, (_, i) => (
            <DotCount key={`dot-${i}`} count={i + 1}>
              <Icon name="bell" size="l" />
            </DotCount>
          ))}
        </HStack>
        <Text font="title3">Complex story-like surface</Text>
      </VStack>
    </HStack>
  </VStack>
);

const BaselineHarness = () => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    <ComplexStickerSheetLike />
  </ThemeProvider>
);

const CustomThemeNoProviderHarness = () => (
  <ThemeProvider activeColorScheme="dark" theme={customPerfTheme}>
    <ComplexStickerSheetLike />
  </ThemeProvider>
);

const CustomThemeNoProviderStateUpdateHarness = () => {
  const [tick, setTick] = React.useState(0);
  return (
    <>
      <button data-testid="update-page-state-no-provider" onClick={() => setTick((v) => v + 1)}>
        Update page state
      </button>
      <ThemeProvider activeColorScheme="dark" theme={customPerfTheme}>
        <ComplexStickerSheetLike tick={tick} />
      </ThemeProvider>
    </>
  );
};

const CustomHarness = () => (
  <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
    <ComponentConfigProvider value={customComponentConfig}>
      <ComplexStickerSheetLike />
    </ComponentConfigProvider>
  </ThemeProvider>
);

const UnrelatedConfigUpdateHarness = () => {
  const [tick, setTick] = React.useState(0);

  const value = React.useMemo<ComponentConfig>(
    () => ({
      ...customComponentConfig,
      // Toggling a key that is not rendered by StickerSheet isolates cross-key churn.
      Tour: tick % 2 === 0 ? {} : {},
    }),
    [tick],
  );

  return (
    <>
      <button data-testid="update-unrelated-config" onClick={() => setTick((v) => v + 1)}>
        Update unrelated config
      </button>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <ComponentConfigProvider value={value}>
          <ComplexStickerSheetLike />
        </ComponentConfigProvider>
      </ThemeProvider>
    </>
  );
};

const TargetedConfigUpdateHarness = () => {
  const [tick, setTick] = React.useState(0);

  const value = React.useMemo<ComponentConfig>(
    () => ({
      ...customComponentConfig,
      // Intentionally churn a hot key used broadly in StickerSheet.
      Button: (props) => ({
        borderRadius: tick % 2 === 0 ? 200 : 300,
        height: props.compact ? 24 : 32,
        font: props.compact ? 'label1' : 'headline',
      }),
    }),
    [tick],
  );

  return (
    <>
      <button data-testid="update-targeted-config" onClick={() => setTick((v) => v + 1)}>
        Update targeted config
      </button>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <ComponentConfigProvider value={value}>
          <ComplexStickerSheetLike />
        </ComponentConfigProvider>
      </ThemeProvider>
    </>
  );
};

const RandomStateUpdateHarness = () => {
  const [tick, setTick] = React.useState(0);

  return (
    <>
      <button data-testid="update-random-state" onClick={() => setTick((v) => v + 1)}>
        Update random state
      </button>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <ComponentConfigProvider value={customComponentConfig}>
          <ComplexStickerSheetLike tick={tick} />
        </ComponentConfigProvider>
      </ThemeProvider>
    </>
  );
};

describe('ComponentConfig StickerSheet performance tests', () => {
  jest.setTimeout(60000);

  it('renders StickerSheet baseline (no provider)', async () => {
    await measurePerformance(<BaselineHarness />);
  });

  it('renders StickerSheet custom story (theme + component config)', async () => {
    await measurePerformance(<CustomHarness />);
  });

  it('renders custom theme with no provider', async () => {
    await measurePerformance(<CustomThemeNoProviderHarness />);
  });

  it('updates page state 50 times with custom theme and no provider', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.click(screen.getByTestId('update-page-state-no-provider'));
      }
    };

    await measurePerformance(<CustomThemeNoProviderStateUpdateHarness />, { scenario });
  });

  it('updates unrelated config key 50 times', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.click(screen.getByTestId('update-unrelated-config'));
      }
    };

    await measurePerformance(<UnrelatedConfigUpdateHarness />, { scenario });
  });

  it('updates targeted config key 50 times', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.click(screen.getByTestId('update-targeted-config'));
      }
    };

    await measurePerformance(<TargetedConfigUpdateHarness />, { scenario });
  });

  it('updates random local state 50 times (provider enabled)', async () => {
    const scenario = async () => {
      for (let i = 0; i < updateIterations; i += 1) {
        fireEvent.click(screen.getByTestId('update-random-state'));
      }
    };

    await measurePerformance(<RandomStateUpdateHarness />, { scenario });
  });
});
