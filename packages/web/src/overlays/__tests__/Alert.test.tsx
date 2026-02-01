import { useCallback, useState } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common/types';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Button } from '../../buttons';
import { DefaultThemeProvider } from '../../utils/test';
import { Alert, type AlertBaseProps } from '../Alert';

const TITLE = 'Alert title';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

const onPressConsole = () => console.log('pressed');

// Create type for the MockAlert props
type AlertA11yProps = Pick<
  SharedAccessibilityProps,
  'accessibilityLabelledBy' | 'accessibilityLabel'
>;

const MockAlert = ({
  visible: externalVisible,
  onRequestClose,
  title,
  body,
  pictogram,
  preferredActionLabel,
  onPreferredActionPress,
  dismissActionLabel,
  testID,
  accessibilityLabelledBy,
  accessibilityLabel,
}: Partial<AlertBaseProps> & AlertA11yProps) => {
  const [visible, setVisible] = useState(false);

  const toggleOn = useCallback(() => setVisible(true), []);
  const toggleOff = useCallback(() => setVisible(false), []);

  return (
    <>
      <Button onClick={toggleOn}>Show Alert</Button>
      <Alert
        disablePortal
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        body={body ?? 'Alert body type that can run over multiple lines, but should be kept short.'}
        dismissActionLabel={dismissActionLabel}
        onPreferredActionPress={onPreferredActionPress ?? onPressConsole}
        onRequestClose={onRequestClose ?? toggleOff}
        pictogram={pictogram ?? 'warning'}
        preferredActionLabel={preferredActionLabel ?? 'Save'}
        testID={testID}
        title={title ?? 'Alert title'}
        visible={externalVisible ?? visible}
      />
    </>
  );
};

describe('Alert', () => {
  it('passes a11y', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MockAlert visible />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes a11y when visible', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MockAlert />
        </DefaultThemeProvider>,
        {
          async afterRender() {
            fireEvent.click(screen.getByRole('button'));
            return waitFor(() => screen.getByRole('alertdialog'));
          },
        },
      ),
    ).toHaveNoViolations();
  });

  it('has expected default a11y attrs', () => {
    render(
      <DefaultThemeProvider>
        <MockAlert visible />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', expect.stringMatching(/«r[0-9]+»/));
    expect(screen.getByText(TITLE)).toHaveAttribute('id', expect.stringMatching(/«r[0-9]+»/));
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(
      <DefaultThemeProvider>
        <MockAlert visible accessibilityLabelledBy={LABELLED_BY} />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(
      <DefaultThemeProvider>
        <MockAlert visible accessibilityLabel={LABEL} />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('alertdialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(
      <DefaultThemeProvider>
        <MockAlert visible accessibilityLabel={LABEL} accessibilityLabelledBy={LABELLED_BY} />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('shows alert on press', async () => {
    render(
      <DefaultThemeProvider>
        <MockAlert />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByText('Show Alert'));

    const alert = await screen.findByRole('alertdialog');

    expect(alert).toBeTruthy();
  });

  it('renders title', async () => {
    const title = 'Test title';

    render(
      <DefaultThemeProvider>
        <MockAlert visible title={title} />
      </DefaultThemeProvider>,
    );

    const found = await screen.findByText(title);

    // need to use waitFor here or test is flaky for some reason
    await waitFor(() => expect(found).toBeVisible());
  });

  it('renders body', async () => {
    const body = 'Test body';

    render(
      <DefaultThemeProvider>
        <MockAlert visible body={body} />
      </DefaultThemeProvider>,
    );

    const found = await screen.findByText(body);

    // need to use waitFor here or test is flaky for some reason
    await waitFor(() => expect(found).toBeVisible());
  });

  it('renders preferred action', () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();

    render(
      <DefaultThemeProvider>
        <MockAlert
          visible
          onPreferredActionPress={onPreferredActionPress}
          onRequestClose={onRequestClose}
          preferredActionLabel="Save"
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByText('Save'));

    expect(onPreferredActionPress).toHaveBeenCalledTimes(1);
  });

  it('renders dismiss action', async () => {
    const onRequestClose = jest.fn();

    render(
      <DefaultThemeProvider>
        <MockAlert visible dismissActionLabel="Cancel" onRequestClose={onRequestClose} />
      </DefaultThemeProvider>,
    );

    expect(await screen.findByText('Cancel')).toBeTruthy();
  });

  it('renders both preferred and dismiss actions when provided', () => {
    const onPreferredActionPress = jest.fn();
    const onRequestClose = jest.fn();
    const preferredActionLabel = 'Confirm';
    const dismissActionLabel = 'Go Back';
    render(
      <DefaultThemeProvider>
        <MockAlert
          visible
          dismissActionLabel={dismissActionLabel}
          onPreferredActionPress={onPreferredActionPress}
          onRequestClose={onRequestClose}
          preferredActionLabel={preferredActionLabel}
        />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(preferredActionLabel)).toBeTruthy();
    expect(screen.getByText(dismissActionLabel)).toBeTruthy();
  });
});
