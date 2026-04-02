import React from 'react';
import { measurePerformance } from 'reassure';

import { Button } from '../../buttons/Button';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';
import { DefaultThemeProvider } from '../../utils/test';

const buttonCount = 1000;

const ButtonList = () => {
  return (
    <>
      {Array.from({ length: buttonCount }, (_, index) => (
        <Button key={index}>Child</Button>
      ))}
    </>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <DefaultThemeProvider>{children}</DefaultThemeProvider>
);

describe('Button component-config performance (web)', () => {
  it('no provider', async () => {
    await measurePerformance(
      <Wrapper>
        <ButtonList />
      </Wrapper>,
    );
  });

  it('provider customization', async () => {
    await measurePerformance(
      <Wrapper>
        <ComponentConfigProvider value={{ Button: { compact: true } }}>
          <ButtonList />
        </ComponentConfigProvider>
      </Wrapper>,
    );
  });
});
