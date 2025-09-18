import { TextInput as RNTextInput } from 'react-native';
import TestRenderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import type { InputStackProps } from '../InputStack';
import { InputStack } from '../InputStack';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'input';

function expectAttribute<
  K extends keyof Pick<InputStackProps, 'width' | 'disabled' | 'variant' | 'height'>,
>(prop: K, values: readonly NonNullable<InputStackProps[K]>[]) {
  const input = <RNTextInput value="15" />;

  values.forEach((value) => {
    it(`will set "${value}" for \`${prop}\` prop`, async () => {
      const inputRenderer = TestRenderer.create(
        <DefaultThemeProvider>
          <InputStack testID={TEST_ID} {...{ [prop]: value }} inputNode={input} />
        </DefaultThemeProvider>,
      );

      const inputStackInstance = await inputRenderer.root.findByProps({ testID: TEST_ID });
      expect(inputStackInstance.props[prop]).toEqual(value);
    });
  });
}

describe('width', () => {
  expectAttribute('width', ['10%', '50%', '100%']);
});

describe('height', () => {
  expectAttribute('height', ['10%', '50%', '100%']);
});

describe('disabled', () => {
  expectAttribute('disabled', [false, true]);
});

describe('variant', () => {
  expectAttribute('variant', ['foreground', 'foregroundMuted', 'negative', 'positive', 'primary']);
});

describe('styles', () => {
  it('renders a custom borderStyle', async () => {
    const borderStyle = {
      borderRadius: 8,
      borderWidth: 1,
    };

    render(
      <DefaultThemeProvider>
        <InputStack borderStyle={borderStyle} inputNode={<NativeInput />} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    await screen.findByTestId(`${TEST_ID}-input-area`);

    expect(screen.getByTestId(`${TEST_ID}-input-area`)).toHaveStyle(borderStyle);
  });
});
