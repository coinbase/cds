import { useCallback, useState } from 'react';
import type { SharedAccessibilityProps } from '@coinbase/cds-common';
import { renderA11y } from '@coinbase/cds-web-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Text } from '../../../typography/Text';
import { DefaultThemeProvider } from '../../../utils/test';
import type { FullscreenModalProps } from '../FullscreenModal';
import { FullscreenModal } from '../FullscreenModal';

const TITLE = 'Modal title';
const PRIMARY_CONTENT = 'Primary content';
const SECONDARY_CONTENT = 'Secondary content';
const CLOSE_BUTTON_LABEL = 'Close button';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

const onRequestCloseSpy = jest.fn();

type Options = Pick<SharedAccessibilityProps, 'accessibilityLabelledBy' | 'accessibilityLabel'> &
  Partial<
    Pick<
      FullscreenModalProps,
      'closeAccessibilityLabel' | 'shouldCloseOnEscPress' | 'visible' | 'disableFocusTrap'
    >
  >;

const FullscreenModalExample = ({
  visible: externalVisible = true,
  shouldCloseOnEscPress,
  disableFocusTrap,
  accessibilityLabelledBy,
  accessibilityLabel,
  closeAccessibilityLabel,
}: Options) => {
  const [visible, setVisible] = useState(externalVisible);

  const primaryContent = (
    <Text as="p" display="block" font="body">
      {PRIMARY_CONTENT}
    </Text>
  );
  const secondaryContent = (
    <Text as="p" display="block" font="body">
      {SECONDARY_CONTENT}
    </Text>
  );

  const handleClose = useCallback(() => {
    onRequestCloseSpy();
    setVisible(false);
  }, [setVisible]);

  return (
    <DefaultThemeProvider>
      <FullscreenModal
        disablePortal
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        closeAccessibilityLabel={closeAccessibilityLabel}
        disableFocusTrap={disableFocusTrap}
        onRequestClose={handleClose}
        primaryContent={primaryContent}
        secondaryContent={secondaryContent}
        shouldCloseOnEscPress={shouldCloseOnEscPress}
        title={TITLE}
        visible={visible}
      />
    </DefaultThemeProvider>
  );
};

describe('FullscreenModal', () => {
  afterEach(() => {
    onRequestCloseSpy.mockClear();
  });

  it('passes a11y', async () => {
    expect(
      await renderA11y(<FullscreenModalExample closeAccessibilityLabel={CLOSE_BUTTON_LABEL} />),
    ).toHaveNoViolations();
  });

  it('has expected default a11y attrs', () => {
    render(<FullscreenModalExample />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', expect.stringMatching(/«r[0-9]+»/));
    expect(screen.getByText(TITLE)).toHaveAttribute('id', expect.stringMatching(/«r[0-9]+»/));
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(<FullscreenModalExample visible accessibilityLabelledBy={LABELLED_BY} />);

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(<FullscreenModalExample visible accessibilityLabel={LABEL} />);

    const modal = screen.getByRole('dialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(
      <FullscreenModalExample
        visible
        accessibilityLabel={LABEL}
        accessibilityLabelledBy={LABELLED_BY}
      />,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('renders content when modal is visible', async () => {
    render(
      <FullscreenModalExample
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
      expect(screen.getByText(PRIMARY_CONTENT)).toBeVisible();
    });
    await waitFor(async () => {
      expect(screen.getByText(SECONDARY_CONTENT)).toBeVisible();
    });
  });

  it('does not render content when modal is not visible', () => {
    render(<FullscreenModalExample visible={false} />);

    expect(screen.queryByText(TITLE)).toBeNull();
    expect(screen.queryByText(PRIMARY_CONTENT)).toBeNull();
    expect(screen.queryByText(SECONDARY_CONTENT)).toBeNull();
  });

  it('fires close method on close button click', () => {
    render(<FullscreenModalExample closeAccessibilityLabel={CLOSE_BUTTON_LABEL} />);

    fireEvent.click(screen.getByLabelText(CLOSE_BUTTON_LABEL));

    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('fires close method on ESC key press', async () => {
    render(<FullscreenModalExample />);

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('does not fire close method on ESC key press when `shouldCloseOnEscPress` is false', async () => {
    render(<FullscreenModalExample shouldCloseOnEscPress={false} />);

    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestCloseSpy).not.toHaveBeenCalled();
  });

  it('disables focus trap when `disableFocusTrap` is true', async () => {
    render(<FullscreenModalExample disableFocusTrap />);

    const user = userEvent.setup();
    await user.keyboard(`{Tab}{Enter}`);

    expect(onRequestCloseSpy).not.toHaveBeenCalled();
  });
  it('passes a custom closeAccessibilityLabel', () => {
    render(<FullscreenModalExample closeAccessibilityLabel={CLOSE_BUTTON_LABEL} />);

    expect(screen.getByLabelText(CLOSE_BUTTON_LABEL)).toBeInTheDocument();
  });
  it('does not have a default closeAccessibilityLabel', () => {
    render(<FullscreenModalExample />);

    expect(screen.queryByLabelText(CLOSE_BUTTON_LABEL)).not.toBeInTheDocument();
  });
});
