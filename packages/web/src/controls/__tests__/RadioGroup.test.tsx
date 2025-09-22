import { renderA11y } from '@cbhq/cds-web-utils/jest';
import { fireEvent, render, screen, within } from '@testing-library/react';

import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { Radio, RadioGroup } from '../RadioGroup';

const options = {
  btc: 'Bitcoin',
  eth: 'Ethereum',
  dai: 'Dai',
  usdc: (
    <Text as="span" font="label1">
      Custom ReactNode
    </Text>
  ),
};

const onChange = jest.fn();

describe('RadioGroup.test', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders radio', () => {
    render(
      <DefaultThemeProvider>
        <Radio onChange={jest.fn()} testID="test-radio" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-radio')).toBeTruthy();
  });

  it('renders checked radio', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked onChange={jest.fn()} testID="test-radio" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-radio')).toBeTruthy();
  });

  it('has default color when checked', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked onChange={jest.fn()} testID="test-radio" />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByTestId('test-radio-parent');
    const outlineElement = within(radio).getByRole('presentation');

    expect(outlineElement).toHaveStyle({
      borderColor: 'var(--color-bgPrimary)',
    });

    const dotElement = within(radio).getByTestId('radio-icon');
    expect(dotElement).toHaveStyle({
      color: 'var(--color-bgPrimary)',
    });
  });

  it('applies custom controlColor prop when checked', () => {
    render(
      <DefaultThemeProvider>
        <Radio checked controlColor="bgPositive" onChange={jest.fn()} testID="test-radio" />
      </DefaultThemeProvider>,
    );

    const radio = screen.getByTestId('test-radio-parent');
    const outlineElement = within(radio).getByRole('presentation');

    expect(outlineElement).toHaveStyle({
      borderColor: 'var(--color-bgPositive)',
    });

    const dotElement = within(radio).getByTestId('radio-icon');
    expect(dotElement).toHaveStyle({
      color: 'var(--color-bgPositive)',
    });
  });

  it('renders options', () => {
    render(
      <DefaultThemeProvider>
        <RadioGroup name="radio-group" onChange={onChange} options={options} value="btc" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('radiogroup')).toBeTruthy();
    expect(screen.getByRole('radiogroup').childNodes).toHaveLength(4);
  });

  it('renders label', () => {
    render(
      <DefaultThemeProvider>
        <RadioGroup
          label={
            <Text as="span" font="headline">
              Choose a currency
            </Text>
          }
          name="radio-group"
          onChange={onChange}
          options={options}
          value="btc"
        />
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Choose a currency')).toBeTruthy();
  });

  it('triggers onChange', () => {
    render(
      <DefaultThemeProvider>
        <RadioGroup
          label={
            <Text as="span" font="headline">
              Choose a currency
            </Text>
          }
          name="radio-group"
          onChange={onChange}
          options={options}
          testID="test-radio-group"
          value="btc"
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('test-radio-group-eth'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('eth');
  });

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <RadioGroup
            aria-labelledby="choose-a-currency"
            label={
              <Text as="span" font="headline" id="choose-a-currency">
                Choose a currency
              </Text>
            }
            name="radio-group"
            onChange={onChange}
            options={options}
            testID="test-radio-group"
            value="btc"
          />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });
});
