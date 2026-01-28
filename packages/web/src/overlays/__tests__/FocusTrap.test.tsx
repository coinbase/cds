import { useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DefaultThemeProvider } from '../../utils/test';
import { LongModal } from '../__stories__/Modal.stories';
import { FocusTrap } from '../FocusTrap';

describe('FocusTrap', () => {
  it('focuses on the first focusable element when the trap is opened', () => {
    render(
      <DefaultThemeProvider>
        <FocusTrap>
          <div>
            <button data-testid="focus-element">Focus me</button>
          </div>
        </FocusTrap>
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('focus-element')).toHaveFocus();
  });

  it('handles only one focusable child', () => {
    render(
      <DefaultThemeProvider>
        <FocusTrap>
          <div>
            <button data-testid="focus-element">Focus me</button>
          </div>
        </FocusTrap>
      </DefaultThemeProvider>,
    );
    fireEvent.keyDown(screen.getByTestId('focus-element'), {
      key: 'Tab',
      code: 'Tab',
    });
    expect(screen.getByTestId('focus-element')).toHaveFocus();
  });

  it('keeps focus inside the focusable children when the trap is opened', () => {
    render(
      <DefaultThemeProvider>
        <button data-testid="outside-element">Outside</button>
        <FocusTrap>
          <div>
            <button data-testid="focus-element">Focus me</button>
          </div>
        </FocusTrap>
      </DefaultThemeProvider>,
    );
    fireEvent.keyDown(screen.getByTestId('outside-element'), {
      key: 'Tab',
      code: 'Tab',
    });
    expect(screen.getByTestId('focus-element')).toHaveFocus();

    fireEvent.keyDown(screen.getByTestId('focus-element'), {
      key: 'Tab',
      code: 'Tab',
    });
    expect(screen.getByTestId('focus-element')).toHaveFocus();
  });

  it('allows focus to escape when the trap is disabled', async () => {
    render(
      <DefaultThemeProvider>
        <button data-testid="outside-element">Outside</button>
        <FocusTrap disableAutoFocus disableFocusTrap>
          <div>
            <button data-testid="focus-element">Focus me</button>
          </div>
        </FocusTrap>
      </DefaultThemeProvider>,
    );

    screen.getByTestId('outside-element').focus();
    await userEvent.tab();
    expect(screen.getByTestId('focus-element')).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(screen.getByTestId('outside-element')).toHaveFocus();
  });

  it('focuses on the next interactive element in Modal when Tab is typed', async () => {
    render(
      <DefaultThemeProvider>
        <LongModal />
      </DefaultThemeProvider>,
    );
    fireEvent.keyDown(screen.getByTestId('modal-dialog-motion'), {
      key: 'Tab',
      code: 'Tab',
    });

    expect(screen.getByTestId('modal-body')).toHaveFocus();
  });
  it('focuses after a delay when using autoFocusDelay', async () => {
    jest.useFakeTimers();

    render(
      <FocusTrap autoFocusDelay={500}>
        <div>
          <div>Hello world</div>
          <a data-testid="focus-element" href="https://google.com">
            Click me
          </a>
        </div>
      </FocusTrap>,
    );

    const focusElement = screen.getByTestId('focus-element');

    // Initially, the input should not be focused
    expect(focusElement).not.toHaveFocus();

    // Fast-forward time by 200ms
    jest.advanceTimersByTime(200);

    // The input should still not be focused
    expect(focusElement).not.toHaveFocus();

    // Fast-forward time by a further 300ms
    jest.advanceTimersByTime(300);

    // Now, the input should be focused
    expect(focusElement).toHaveFocus();

    jest.useRealTimers();
  });

  it('restores focus to the previously focused element on unmount', () => {
    const initialFocusElement = document.createElement('button');
    document.body.appendChild(initialFocusElement);
    initialFocusElement.focus();

    const { unmount } = render(
      <FocusTrap restoreFocusOnUnmount>
        <button data-testid="trap-button">Trap Button</button>
      </FocusTrap>,
    );

    const trapButton = screen.getByTestId('trap-button');
    trapButton.focus();
    expect(trapButton).toHaveFocus();

    unmount();
    expect(initialFocusElement).toHaveFocus();

    document.body.removeChild(initialFocusElement);
  });

  it('includes the trigger in the focus trap when includeTriggerInFocusTrap is true', () => {
    const TestComponent = () => {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <button data-testid="trigger" onClick={() => setOpen(true)}>
            Open
          </button>
          {open && (
            <FocusTrap includeTriggerInFocusTrap>
              <div>
                <button data-testid="first">First</button>
                <button data-testid="second">Second</button>
              </div>
            </FocusTrap>
          )}
        </div>
      );
    };

    render(<TestComponent />);

    const trigger = screen.getByTestId('trigger');
    trigger.focus();
    fireEvent.click(trigger);

    // Trigger should stay in the focusable set once the trap is active
    expect(trigger).toHaveFocus();
    fireEvent.keyDown(trigger, { key: 'Tab', code: 'Tab' });
    expect(screen.getByTestId('first')).toHaveFocus();
    fireEvent.keyDown(screen.getByTestId('first'), { key: 'Tab', code: 'Tab', shiftKey: true });
    expect(trigger).toHaveFocus();
  });
});
