import React from 'react';
import { render, screen } from '@testing-library/react';

import type { ComponentConfig } from '../../core/componentConfig';
import { useComponentConfig } from '../../hooks/useComponentConfig';
import { defaultTheme } from '../../themes/defaultTheme';
import { ComponentConfigProvider } from '../ComponentConfigProvider';
import { ThemeProvider } from '../ThemeProvider';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
    {children}
  </ThemeProvider>
);

const ButtonSpy = ({ testID, ...props }: Record<string, any>) => {
  const mergedProps = useComponentConfig('Button', props);
  return <div data-props={JSON.stringify(mergedProps)} data-testid={testID} />;
};

const getProps = (testID: string) => {
  const el = screen.getByTestId(testID);
  return JSON.parse(el.getAttribute('data-props')!);
};

describe('ComponentConfigProvider', () => {
  it('returns local props unchanged when no provider is present', () => {
    render(
      <Wrapper>
        <ButtonSpy testID="btn" variant="primary" />
      </Wrapper>,
    );
    expect(getProps('btn')).toEqual({ variant: 'primary' });
  });

  it('merges static config with local props', () => {
    const config: ComponentConfig = {
      Button: { variant: 'secondary', compact: true },
    };
    render(
      <Wrapper>
        <ComponentConfigProvider value={config}>
          <ButtonSpy testID="btn" />
        </ComponentConfigProvider>
      </Wrapper>,
    );
    const props = getProps('btn');
    expect(props.variant).toBe('secondary');
    expect(props.compact).toBe(true);
  });

  it('local props override config defaults', () => {
    const config: ComponentConfig = {
      Button: { variant: 'secondary', compact: true },
    };
    render(
      <Wrapper>
        <ComponentConfigProvider value={config}>
          <ButtonSpy compact={false} testID="btn" variant="primary" />
        </ComponentConfigProvider>
      </Wrapper>,
    );
    const props = getProps('btn');
    expect(props.variant).toBe('primary');
    expect(props.compact).toBe(false);
  });

  it('supports functional config resolvers', () => {
    const config: ComponentConfig = {
      Button: (props) => ({
        compact: true,
        borderRadius: props.compact ? 700 : 900,
      }),
    };
    render(
      <Wrapper>
        <ComponentConfigProvider value={config}>
          <ButtonSpy compact testID="btn-compact" />
          <ButtonSpy testID="btn-default" />
        </ComponentConfigProvider>
      </Wrapper>,
    );
    expect(getProps('btn-compact').borderRadius).toBe(700);
    expect(getProps('btn-default').borderRadius).toBe(900);
  });

  it('nested providers are isolated and do not inherit parent config', () => {
    const parentConfig: ComponentConfig = {
      Button: { variant: 'secondary' },
    };
    const childConfig: ComponentConfig = {};
    render(
      <Wrapper>
        <ComponentConfigProvider value={parentConfig}>
          <ButtonSpy testID="parent-btn" />
          <ComponentConfigProvider value={childConfig}>
            <ButtonSpy testID="child-btn" />
          </ComponentConfigProvider>
        </ComponentConfigProvider>
      </Wrapper>,
    );
    expect(getProps('parent-btn').variant).toBe('secondary');
    expect(getProps('child-btn')).toEqual({});
  });

  it('child provider overrides parent config for Button', () => {
    const parentConfig: ComponentConfig = {
      Button: { variant: 'secondary', compact: true },
    };
    const childConfig: ComponentConfig = {
      Button: { variant: 'positive' },
    };
    render(
      <Wrapper>
        <ComponentConfigProvider value={parentConfig}>
          <ButtonSpy testID="parent-btn" />
          <ComponentConfigProvider value={childConfig}>
            <ButtonSpy testID="child-btn" />
          </ComponentConfigProvider>
        </ComponentConfigProvider>
      </Wrapper>,
    );
    expect(getProps('parent-btn').variant).toBe('secondary');
    expect(getProps('parent-btn').compact).toBe(true);
    expect(getProps('child-btn').variant).toBe('positive');
  });

  it('local className overrides provider className', () => {
    const config: ComponentConfig = {
      Button: { className: 'theme-btn' },
    };
    render(
      <Wrapper>
        <ComponentConfigProvider value={config}>
          <ButtonSpy className="local-btn" testID="btn" />
        </ComponentConfigProvider>
      </Wrapper>,
    );
    expect(getProps('btn').className).toBe('local-btn');
  });

  it('returns local props when provider has undefined value', () => {
    render(
      <Wrapper>
        <ComponentConfigProvider>
          <ButtonSpy testID="btn" variant="primary" />
        </ComponentConfigProvider>
      </Wrapper>,
    );
    expect(getProps('btn')).toEqual({ variant: 'primary' });
  });
});
