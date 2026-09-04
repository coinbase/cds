import React from 'react';
import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import type { ButtonProps } from '../../buttons';
import type { ComponentConfig } from '../../core/componentConfig';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { DefaultThemeProvider } from '../../utils/testHelpers';
import { ComponentConfigProvider } from '../ComponentConfigProvider';

const ButtonSpy = ({ testID, ...props }: Record<string, any>) => {
  const mergedProps = useComponentConfig('Button', props);
  return <Text testID={testID}>{JSON.stringify(mergedProps)}</Text>;
};

const getProps = (testID: string) => {
  const el = screen.getByTestId(testID);
  return JSON.parse(el.props.children as string);
};

describe('ComponentConfigProvider (mobile)', () => {
  it('returns local props unchanged when no provider is present', () => {
    render(
      <DefaultThemeProvider>
        <ButtonSpy testID="btn" variant="primary" />
      </DefaultThemeProvider>,
    );
    expect(getProps('btn')).toEqual({ variant: 'primary' });
  });

  it('merges static config with local props', () => {
    const config: ComponentConfig = {
      Button: { variant: 'secondary', compact: true },
    };
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={config}>
          <ButtonSpy testID="btn" />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );
    const props = getProps('btn');
    expect(props.variant).toBe('secondary');
    expect(props.compact).toBe(true);
  });

  it('local props override config defaults', () => {
    const config: ComponentConfig = {
      Button: { variant: 'secondary' },
    };
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={config}>
          <ButtonSpy testID="btn" variant="primary" />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );
    expect(getProps('btn').variant).toBe('primary');
  });

  it('supports functional config resolvers', () => {
    const config: ComponentConfig = {
      Button: (props: ButtonProps) => ({
        borderRadius: props.compact ? 700 : 900,
      }),
    };
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={config}>
          <ButtonSpy compact testID="btn" />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );
    expect(getProps('btn').borderRadius).toBe(700);
  });

  it('nested providers are isolated and do not inherit parent config', () => {
    const parentConfig: ComponentConfig = {
      Button: { variant: 'secondary' },
    };
    const childConfig: ComponentConfig = {};
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={parentConfig}>
          <ButtonSpy testID="parent-btn" />
          <ComponentConfigProvider value={childConfig}>
            <ButtonSpy testID="child-btn" />
          </ComponentConfigProvider>
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );
    expect(getProps('parent-btn').variant).toBe('secondary');
    expect(getProps('child-btn')).toEqual({});
  });
});
