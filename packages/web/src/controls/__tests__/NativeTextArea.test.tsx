import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { NativeTextArea } from '../NativeTextArea';
import { TextInput } from '../TextInput';

const TEST_ID = 'native-textarea';

describe('NativeTextArea Accessibility', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TextInput inputNode={<NativeTextArea />} label="label" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });
});

describe('NativeTextArea', () => {
  it('can mark as disabled', () => {
    render(
      <DefaultThemeProvider>
        <NativeTextArea disabled testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId(TEST_ID)).toHaveAttribute('disabled');
  });
});

describe('NativeTextArea events', () => {
  it('fires `onClick` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <NativeTextArea onClick={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onFocus` when clicked', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <NativeTextArea onFocus={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    fireEvent.focus(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('fires `onBlur` when clicking outside of input', () => {
    const spy = jest.fn();
    render(
      <DefaultThemeProvider>
        <NativeTextArea onBlur={spy} testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    fireEvent.blur(screen.getByRole('textbox'));

    expect(spy).toHaveBeenCalled();
  });

  it('text changes with `onChange`', () => {
    render(
      <DefaultThemeProvider>
        <NativeTextArea testID={TEST_ID} />
      </DefaultThemeProvider>,
    );

    const textarea = screen.getByTestId(TEST_ID);

    fireEvent.change(textarea, { target: { value: 'desired text' } });

    expect(textarea).toHaveValue('desired text');
  });
});
