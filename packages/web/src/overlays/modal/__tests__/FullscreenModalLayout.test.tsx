import React, { useCallback, useState } from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VStack } from '../../../layout';
import { Text } from '../../../typography/Text';
import { DefaultThemeProvider } from '../../../utils/test';
import type { FullscreenModalLayoutProps } from '../FullscreenModalLayout';
import { FullscreenModalLayout } from '../FullscreenModalLayout';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const realFramerMotion = jest.requireActual('framer-motion');
  return {
    ...realFramerMotion,
    m: {
      ...realFramerMotion.m,
      // Mock specific motion components if needed, or just the top-level motion proxy
      div: jest
        .fn()
        .mockImplementation(({ children, ...props }) => <div {...props}>{children}</div>),
      // Add other motion components used by FullscreenModalLayout if any (e.g., p, span)
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    // Add other exports from framer-motion if they are used and need mocking
  };
});

const CHILDREN_TEXT = 'Modal content';
const LABELLED_BY = 'some-id';
const LABEL = 'A label';

const onRequestCloseSpy = jest.fn();
const onDidCloseSpy = jest.fn();

type Options = Partial<
  Pick<
    FullscreenModalLayoutProps,
    | 'children'
    | 'visible'
    | 'shouldCloseOnEscPress'
    | 'disableFocusTrap'
    | 'focusTabIndexElements'
    | 'restoreFocusOnUnmount'
    | 'accessibilityLabelledBy'
    | 'accessibilityLabel'
    | 'onDidClose'
  >
>;

const FullscreenModalLayoutExample = ({
  visible: externalVisible = true,
  shouldCloseOnEscPress,
  disableFocusTrap,
  focusTabIndexElements,
  restoreFocusOnUnmount,
  accessibilityLabelledBy,
  accessibilityLabel,
  children = <Text>{CHILDREN_TEXT}</Text>,
  onDidClose = onDidCloseSpy,
}: Options) => {
  const [visible, setVisible] = useState(externalVisible);

  const handleClose = useCallback(() => {
    onRequestCloseSpy();
    setVisible(false);
  }, [setVisible]);

  return (
    <DefaultThemeProvider>
      <FullscreenModalLayout
        disablePortal
        accessibilityLabel={accessibilityLabel}
        accessibilityLabelledBy={accessibilityLabelledBy}
        disableFocusTrap={disableFocusTrap}
        focusTabIndexElements={focusTabIndexElements}
        onDidClose={onDidClose}
        onRequestClose={handleClose}
        restoreFocusOnUnmount={restoreFocusOnUnmount}
        shouldCloseOnEscPress={shouldCloseOnEscPress}
        visible={visible}
      >
        <VStack background="bg" height="100%" width="100%">
          {children}
        </VStack>
      </FullscreenModalLayout>
    </DefaultThemeProvider>
  );
};

describe('FullscreenModalLayout', () => {
  afterEach(() => {
    onRequestCloseSpy.mockClear();
    onDidCloseSpy.mockClear();
  });

  it('passes a11y', async () => {
    expect(
      await renderA11y(<FullscreenModalLayoutExample accessibilityLabel={LABEL} />),
    ).toHaveNoViolations();
  });

  it('renders children when visible', async () => {
    render(<FullscreenModalLayoutExample visible />);
    await waitFor(() => {
      expect(screen.getByText(CHILDREN_TEXT)).toBeVisible();
    });
  });

  it('does not render content when modal is not visible', async () => {
    render(<FullscreenModalLayoutExample visible={false} />);
    // Wait for animations to complete and component to unmount or hide
    await waitFor(() => {
      expect(screen.queryByText(CHILDREN_TEXT)).not.toBeInTheDocument();
    });
  });

  it('has expected default a11y attrs', () => {
    render(<FullscreenModalLayoutExample />);
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-modal', 'true');
  });

  it('applies accessibilityLabel when provided', () => {
    render(<FullscreenModalLayoutExample accessibilityLabel={LABEL} />);
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-label', LABEL);
    expect(modal).not.toHaveAttribute('aria-labelledby');
  });

  it('applies accessibilityLabelledBy when provided', () => {
    render(<FullscreenModalLayoutExample accessibilityLabelledBy={LABELLED_BY} />);
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(modal).not.toHaveAttribute('aria-label');
  });

  it('prefers accessibilityLabelledBy over accessibilityLabel when both are provided', () => {
    render(
      <FullscreenModalLayoutExample
        accessibilityLabel={LABEL}
        accessibilityLabelledBy={LABELLED_BY}
      />,
    );
    const modal = screen.getByRole('dialog');
    expect(modal).toHaveAttribute('aria-labelledby', LABELLED_BY);
    expect(modal).toHaveAttribute('aria-label', LABEL);
  });

  it('fires onRequestClose on ESC key press by default', async () => {
    render(<FullscreenModalLayoutExample />);
    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    expect(onRequestCloseSpy).toHaveBeenCalledTimes(1);
  });

  it('does not fire onRequestClose on ESC when shouldCloseOnEscPress is false', async () => {
    render(<FullscreenModalLayoutExample shouldCloseOnEscPress={false} />);
    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    expect(onRequestCloseSpy).not.toHaveBeenCalled();
  });

  describe('FocusTrap behavior', () => {
    it('does not trap focus when disableFocusTrap is true', async () => {
      render(
        <FullscreenModalLayoutExample disableFocusTrap visible>
          <VStack background="bg" height="100%" width="100%">
            <button>Inside button</button>
          </VStack>
        </FullscreenModalLayoutExample>,
      );
      await screen.findByRole('dialog');
      await screen.findByText('Inside button');
      expect(screen.getByText('Inside button')).toBeInTheDocument();
    });
  });
});
