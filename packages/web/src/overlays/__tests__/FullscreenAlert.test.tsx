import { useCallback, useState } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../utils/test';
import type { FullscreenAlertProps } from '../FullscreenAlert';
import { FullscreenAlert } from '../FullscreenAlert';

const TITLE = 'Modal title';
const BODY = 'Body content';
const CLOSE_BUTTON_LABEL = 'Close button';
const PREFERRED_ACTION_LABEL = 'Preferred action';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

const onRequestCloseSpy = jest.fn();

type Options = {
  visible?: boolean;
} & Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'> &
  Pick<FullscreenAlertProps, 'closeAccessibilityLabel'>;

const FullscreenAlertExample = ({
  visible: externalVisible = true,
  accessibilityLabelledBy,
  accessibilityLabel,
  closeAccessibilityLabel,
}: Options) => {
  const [visible, setVisible] = useState(externalVisible);

  const handleClose = useCallback(() => {
    onRequestCloseSpy();
    setVisible(false);
  }, [setVisible]);

  return (
    <DefaultThemeProvider>
      <FullscreenAlert
        disablePortal
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        body={BODY}
        closeAccessibilityLabel={closeAccessibilityLabel}
        onRequestClose={handleClose}
        preferredActionLabel={PREFERRED_ACTION_LABEL}
        title={TITLE}
        visible={visible}
      />
    </DefaultThemeProvider>
  );
};

describe('FullscreenAlert', () => {
  afterEach(() => {
    onRequestCloseSpy.mockClear();
  });

  it('passes a11y', async () => {
    expect(
      await renderA11y(<FullscreenAlertExample closeAccessibilityLabel={CLOSE_BUTTON_LABEL} />),
    ).toHaveNoViolations();
  });

  it('has expected correct a11y attrs', () => {
    render(<FullscreenAlertExample />);

    const modal = screen.getByRole('alertdialog');
    const modalId = modal.getAttribute('aria-labelledBy');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(screen.getByText(TITLE)).toHaveAttribute('id', modalId);
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(<FullscreenAlertExample visible accessibilityLabelledBy={LABELLED_BY} />);

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(<FullscreenAlertExample visible accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('alertdialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(
      <FullscreenAlertExample
        visible
        accessibilityLabel={LABEL}
        accessibilityLabelledBy={LABELLED_BY}
      />,
    );

    const modal = screen.getByRole('alertdialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('renders content when modal is visible', async () => {
    render(
      <FullscreenAlertExample
        visible
        accessibilityLabel={LABEL}
        accessibilityLabelledBy={LABELLED_BY}
      />,
    );

    await waitFor(async () => {
      await screen.findByText(TITLE);
    });

    await waitFor(async () => {
      expect(screen.getByText(TITLE)).toBeVisible();
    });
    await waitFor(async () => {
      expect(screen.getByText(BODY)).toBeVisible();
    });
    await waitFor(async () => {
      expect(screen.getByText(PREFERRED_ACTION_LABEL)).toBeVisible();
    });

    expect(await screen.findByText(TITLE)).toBeVisible();
    expect(await screen.findByText(BODY)).toBeVisible();
    expect(await screen.findByText(PREFERRED_ACTION_LABEL)).toBeVisible();
  });

  it('does not render content when modal is not visible', () => {
    render(<FullscreenAlertExample visible={false} />);

    expect(screen.queryByText(TITLE)).toBeNull();
    expect(screen.queryByText(BODY)).toBeNull();
    expect(screen.queryByText(PREFERRED_ACTION_LABEL)).toBeNull();
  });

  it('fires close method on close button click', () => {
    render(<FullscreenAlertExample closeAccessibilityLabel={CLOSE_BUTTON_LABEL} />);

    fireEvent.click(screen.getByLabelText(CLOSE_BUTTON_LABEL));

    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('fires close method on ESC key press', async () => {
    render(<FullscreenAlertExample />);

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });
});
