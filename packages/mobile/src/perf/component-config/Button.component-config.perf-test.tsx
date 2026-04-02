import { measurePerformance } from 'reassure';

import { Button } from '../../buttons/Button';
import { ComponentConfigProvider } from '../../system/ComponentConfigProvider';
import { DefaultThemeProvider } from '../../utils/testHelpers';

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

describe('Button component-config performance (mobile)', () => {
  jest.setTimeout(20000);

  it('no provider', async () => {
    await measurePerformance(
      <DefaultThemeProvider>
        <ButtonList />
      </DefaultThemeProvider>,
    );
  });

  it('provider customization', async () => {
    await measurePerformance(
      <DefaultThemeProvider>
        <ComponentConfigProvider value={{ Button: { compact: true } }}>
          <ButtonList />
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );
  });
});
