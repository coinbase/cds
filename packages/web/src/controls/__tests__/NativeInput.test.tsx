import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { NativeInput } from '../NativeInput';

const TEST_ID = 'native-input';

describe('NativeInput Accessibility', () => {
  const accessibilityLabel = 'label';

  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <NativeInput accessibilityLabel="label" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('can pass `aria-label` attribute', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput accessibilityLabel={accessibilityLabel} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('aria-label', accessibilityLabel);
  });
});

describe('NativeInput', () => {
  it('can change type', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput testID={TEST_ID} type="number" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('type', 'number');
  });

  it('can mark as disabled', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput disabled testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });

  it('changes scheme style for input icons for dark colorScheme', () => {
    render(
      <DefaultThemeProvider activeColorScheme="dark">
        <NativeInput testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle('text-align: start;');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('color-scheme: dark;');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('font-size: var(--fontSize-body);');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('line-height: var(--lineHeight-body);');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('font-weight: var(--fontWeight-body);');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('font-family: var(--fontFamily-body);');
  });

  it('changes align style if override passed as align prop', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput align="center" testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle('text-align: center;');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('color-scheme: light;');
  });

  it('changes typography token when font is provided', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput font="label1" testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveStyle('font-size: var(--fontSize-label1);');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('line-height: var(--lineHeight-label1);');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('font-weight: var(--fontWeight-label1);');
    expect(screen.getByTestId(TEST_ID)).toHaveStyle('font-family: var(--fontFamily-label1);');
  });
});

describe('NativeInput events', () => {
  it('fires `onClick` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <NativeInput onClick={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onFocus` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <NativeInput onFocus={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    fireEvent.focus(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onBlur` when clicking outside of input', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <NativeInput onBlur={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    fireEvent.blur(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('text changes with `onChange`', () => {
    render(
      <DefaultThemeProvider>
        <NativeInput testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    const input = screen.getByTestId(TEST_ID);

    fireEvent.change(input, { target: { value: 'desired text' } });

    expect(input).toHaveValue('desired text');
  });
});
