import { useCallback, useState } from 'react';
import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../../buttons';
import { Text } from '../../../typography/Text';
import { DefaultThemeProvider } from '../../../utils/test';
import { Modal, type ModalProps } from '../Modal';
import { ModalBody } from '../ModalBody';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader, type ModalHeaderProps } from '../ModalHeader';

const TITLE = 'Basic Modal';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

const modalTitleText = '2FA Test Title';
const modalButtonText = 'Open 2FA Modal';

const ExampleModalScreen = ({
  disableFocusTrap,
  onRequestClose,
  shouldCloseOnEscPress,
}: {
  disableFocusTrap?: boolean;
  onRequestClose?: () => void;
  shouldCloseOnEscPress?: boolean;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handleOnRequestClose = useCallback(() => {
    console.log("We'll spy on this");
    onRequestClose?.();
  }, [onRequestClose]);

  return (
    <>
      <Modal
        disableFocusTrap={disableFocusTrap}
        onRequestClose={handleOnRequestClose}
        shouldCloseOnEscPress={shouldCloseOnEscPress}
        visible={isVisible}
      >
        <ModalHeader title={modalTitleText} />
      </Modal>
      <Button onClick={handleModalOpen}>{modalButtonText}</Button>
    </>
  );
};
/** END YUBIKEY EDGE CASE CONFIG */

type LoremIpsumProps = {
  title?: string;
  concise?: boolean;
  repeat?: number;
};

const LoremIpsum = ({ title, concise, repeat }: LoremIpsumProps) => {
  return (
    <>
      <Text as="p" display="block" font="label1" paddingBottom={1} renderEmptyNode={false}>
        {title}
      </Text>
      {concise ? null : (
        <Text as="p" display="block" font="body" paddingBottom={3}>
          {repeat ? loremIpsum.repeat(repeat) : loremIpsum}
        </Text>
      )}
    </>
  );
};

type MockModalProps = {
  triggerRef?: React.RefObject<HTMLButtonElement>;
  focusTrigger?: () => void;
  onBackButtonClick?: () => void;
};

const MockModal = ({
  onRequestClose,
  onDidClose,
  onBackButtonClick,
  title = 'Basic Modal',
  visible: externalVisible = false,
  testID,
  triggerRef,
  focusTrigger,
  accessibilityLabelledBy,
  accessibilityLabel,
  backAccessibilityLabel,
  backAccessibilityHint,
  closeAccessibilityLabel,
  closeAccessibilityHint,
}: Partial<ModalProps & MockModalProps & ModalHeaderProps>) => {
  const [visible, setVisible] = useState(externalVisible);

  const handleClose = useCallback(() => {
    onRequestClose?.();
    setVisible(false);
  }, [onRequestClose]);

  const handleDidClose = useCallback(() => {
    onDidClose?.();
    focusTrigger?.();
  }, [onDidClose, focusTrigger]);

  return (
    <>
      <Button ref={triggerRef} onClick={() => setVisible(true)} testID="modal-trigger">
        Open Modal
      </Button>
      <Modal
        disablePortal
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        onDidClose={handleDidClose}
        onRequestClose={handleClose}
        testID={testID}
        visible={visible}
      >
        <ModalHeader
          backAccessibilityHint={backAccessibilityHint}
          backAccessibilityLabel={backAccessibilityLabel}
          closeAccessibilityHint={closeAccessibilityHint}
          closeAccessibilityLabel={closeAccessibilityLabel}
          onBackButtonClick={onBackButtonClick}
          title={title}
        />
        <ModalBody>
          <LoremIpsum />
        </ModalBody>
        <ModalFooter
          primaryAction={
            <Button onClick={() => setVisible(false)} testID="modal-footer-save">
              Save
            </Button>
          }
          secondaryAction={
            <Button onClick={() => setVisible(false)} variant="secondary">
              Cancel
            </Button>
          }
          testID="modal-footer"
        />
      </Modal>
    </>
  );
};

describe('Modal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('passes a11y', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MockModal visible backAccessibilityLabel="Back" closeAccessibilityLabel="Close" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes a11y when visible', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MockModal backAccessibilityLabel="Back" closeAccessibilityLabel="Close" />
        </DefaultThemeProvider>,
        {
          async afterRender() {
            fireEvent.click(screen.getByRole('button'));

            return waitFor(() => screen.getByRole('dialog'));
          },
        },
      ),
    ).toHaveNoViolations();
  });

  it('passes a11y when title is not provided', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <MockModal visible accessibilityLabel={LABEL} closeAccessibilityLabel="Close" title="" />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('has expected default a11y attrs', () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-modal', 'true');
    expect(modal).toHaveAttribute('aria-labelledby', expect.stringMatching(/:r[0-9].*/));
    expect(screen.getByText(TITLE)).toHaveAttribute('id', expect.stringMatching(/:r[0-9].*/));
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabelledBy is provided', () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible accessibilityLabelledBy={LABELLED_BY} />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('overrides default a11y attrs when accessibilityLabel is provided', () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible accessibilityLabel={LABEL} />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).not.toHaveAttribute('aria-labelledby');
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('overrides accessibilityLabel with accessibilityLabelledBy when both are provided', () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible accessibilityLabel={LABEL} accessibilityLabelledBy={LABELLED_BY} />
      </DefaultThemeProvider>,
    );

    const modal = screen.getByRole('dialog');

    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(screen.getByText(TITLE)).not.toHaveAttribute('id');
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('shows modal on click', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    const modal = await screen.findByRole('dialog');
    expect(modal).toBeVisible();
  });

  it('triggers close on overlay click', async () => {
    const onRequestClose = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockModal onRequestClose={onRequestClose} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    fireEvent.click(screen.getByTestId('modal-overlay'));

    // wait for animation to finish
    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers close on close button click', async () => {
    const onRequestClose = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockModal closeAccessibilityLabel="Close" onRequestClose={onRequestClose} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    fireEvent.click(screen.getByLabelText('Close'));

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('triggers close on ESC key press', async () => {
    const onRequestClose = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockModal onRequestClose={onRequestClose} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on ESC key press when `shouldCloseOnEscPress` is false', async () => {
    const onRequestClose = jest.fn();
    render(
      <DefaultThemeProvider>
        <ExampleModalScreen onRequestClose={onRequestClose} shouldCloseOnEscPress={false} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    await screen.findByRole('dialog');
    const user = userEvent.setup();
    await user.keyboard('{Escape}');

    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('triggers back action on back button click', async () => {
    const onBackButtonPress = jest.fn();
    render(
      <DefaultThemeProvider>
        <MockModal
          visible
          backAccessibilityLabel="Back"
          onBackButtonClick={onBackButtonPress}
          onRequestClose={jest.fn()}
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByLabelText('Back'));

    expect(onBackButtonPress).toHaveBeenCalledTimes(1);
  });

  it('renders modal title', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible onRequestClose={jest.fn()} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText(TITLE)).not.toBeVisible();

    await waitFor(() => expect(screen.getByText(TITLE)).toBeVisible());
  });

  it('renders modal body', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible onRequestClose={jest.fn()} />
      </DefaultThemeProvider>,
    );

    const text = loremIpsum.trim();
    expect(screen.getByText(text)).not.toBeVisible();

    await waitFor(() => expect(screen.getByText(text)).toBeVisible());
  });

  it('renders modal footer', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal visible onRequestClose={jest.fn()} />
      </DefaultThemeProvider>,
    );

    await waitFor(() => expect(screen.getByTestId('modal-footer')).toBeVisible());
  });

  it('should have correct styles at the end of animation', async () => {
    render(
      <DefaultThemeProvider>
        <MockModal />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));
    // initial styles
    expect(screen.getByTestId('modal-overlay-motion')).toHaveStyle({ opacity: 0 });
    expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({ opacity: 0 });
    expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({
      transform: 'scale(0.98) translateZ(0)',
    });

    // animated styles
    await waitFor(() => {
      expect(screen.getByTestId('modal-overlay-motion')).toHaveStyle({ opacity: 1 });
    });
    await waitFor(() => {
      expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({ opacity: 1 });
    });
    await waitFor(() => {
      expect(screen.getByTestId('modal-dialog-motion')).toHaveStyle({
        transform: 'none',
      });
    });
  });

  it('disableFocusTrap allows tabbing away from the modal', async () => {
    const user = userEvent.setup();
    const spy = jest.spyOn(console, 'log').mockImplementation();
    render(
      <DefaultThemeProvider>
        <ExampleModalScreen disableFocusTrap />
      </DefaultThemeProvider>,
    );

    const modalButton = screen.getByText(modalButtonText);

    // Sanity check
    await waitFor(() => expect(screen.queryByText(modalTitleText)).not.toBeInTheDocument());

    // Open the modal
    fireEvent.click(modalButton);

    // Make sure the modal is open before simulating a yubikey tap
    await waitFor(() => expect(screen.getByText(modalTitleText)).toBeVisible());

    // Simulate yubikey tap
    await user.keyboard(`{Tab}{Tab}{Tab}{Tab}{Tab}{Enter}`);
    await waitFor(() => expect(screen.getByText(modalTitleText)).toBeVisible());
    expect(spy).not.toHaveBeenCalled();
  });

  it('sets accessible labels on close button', () => {
    render(
      <DefaultThemeProvider>
        <>
          <span id="close-hint">Close button hint</span>
          <MockModal closeAccessibilityHint="close-hint" closeAccessibilityLabel="Close" />
        </>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByLabelText('Close')).toHaveAccessibleDescription('Close button hint');
  });

  it('sets accessible labels on back button', () => {
    render(
      <DefaultThemeProvider>
        <>
          <span id="back-hint">Back button hint</span>
          <MockModal
            backAccessibilityHint="back-hint"
            backAccessibilityLabel="Back"
            onBackButtonClick={jest.fn()}
          />
        </>
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(screen.getByLabelText('Back')).toHaveAccessibleDescription('Back button hint');
  });
});
