import { loremIpsum } from '@coinbase/cds-common/internal/data/loremIpsum';
import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Text } from '../../../typography/Text';
import { DefaultThemeProvider, waitForNotToHappen } from '../../../utils/test';
import { Tray, trayClassNames } from '../Tray';

const titleText = 'Test Title';

describe('Tray', () => {
  it('renders the Tray and passes a11y', async () => {
    const onCloseCompleteSpy = jest.fn();
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Tray onCloseComplete={onCloseCompleteSpy}>
            <Text font="body">{loremIpsum}</Text>
          </Tray>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders content', () => {
    const onCloseCompleteSpy = jest.fn();
    render(<Tray onCloseComplete={onCloseCompleteSpy}>{loremIpsum}</Tray>, {
      wrapper: ({ children }) => <DefaultThemeProvider>{children}</DefaultThemeProvider>,
    });
    expect(screen.getByText(/Lorem ipsum/)).toBeTruthy();
  });

  it('renders a title', () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(titleText)).toBeTruthy();
  });

  it('renders a custom node for title', () => {
    const onCloseCompleteSpy = jest.fn();
    const customTitle = (
      <Text font="title2" testID="test-title">
        Test Title
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <Tray onCloseComplete={onCloseCompleteSpy} title={customTitle}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-title')).toBeTruthy();
  });

  it('renders a custom footer', () => {
    const onCloseCompleteSpy = jest.fn();
    const customFooter = (
      <Text font="title2" testID="test-footer">
        Test Footer
      </Text>
    );
    render(
      <DefaultThemeProvider>
        <Tray footer={customFooter} onCloseComplete={onCloseCompleteSpy}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('test-footer')).toBeTruthy();
  });

  it('renders a close button which closes the tray', async () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('tray-close-button')).toBeTruthy();
    screen.getByTestId('tray-close-button').click();
    await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
  });

  it('renders an overlay which closes the tray on click', async () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('tray-overlay')).toBeTruthy();
    screen.getByTestId('tray-overlay').click();
    await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
  });

  it('closes the tray when esc is pressed', async () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
  });

  it('renders function as children with close handler', async () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tray preventDismiss onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {({ handleClose }) => <button onClick={handleClose}>custom close button</button>}
        </Tray>
      </DefaultThemeProvider>,
    );

    screen.getByText('custom close button').click();
    await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
  });

  it('renders a non-dismissable tray when preventDismiss is true', async () => {
    const onCloseCompleteSpy = jest.fn();
    render(
      <DefaultThemeProvider>
        <Tray preventDismiss onCloseComplete={onCloseCompleteSpy} title={titleText}>
          {({ handleClose }) => <button onClick={handleClose}>custom close button</button>}
        </Tray>
      </DefaultThemeProvider>,
    );

    // no close button
    expect(screen.queryByTestId('tray-close-button')).toBeFalsy();
    // overlay click does nothing
    screen.getByTestId('tray-overlay').click();
    // pressing escape does nothing
    const user = userEvent.setup();
    await user.keyboard('{Escape}');
    // tray slide out is 300ms so we need to wait for 350ms to ensure the tray is closed
    await waitForNotToHappen(() => expect(onCloseCompleteSpy).toHaveBeenCalled(), { timeout: 350 });
    expect(screen.getByText('custom close button')).toBeTruthy();
    // clicking the custom close button closes the tray
    screen.getByText('custom close button').click();
    await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
  });

  it('calls onVibilityChange callback on open and close', () => {
    const onVisibilityChangeSpy = jest.fn();
    const onCloseCompleteSpy = jest.fn();
    const { unmount } = render(
      <DefaultThemeProvider>
        <Tray onCloseComplete={onCloseCompleteSpy} onVisibilityChange={onVisibilityChangeSpy}>
          {loremIpsum}
        </Tray>
      </DefaultThemeProvider>,
    );

    expect(onVisibilityChangeSpy).toHaveBeenCalledWith('visible');

    unmount();

    expect(onVisibilityChangeSpy).toHaveBeenCalledWith('hidden');
  });

  describe('pin prop', () => {
    it('renders pinned to the right', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray onCloseComplete={onCloseCompleteSpy} pin="right" title={titleText}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('tray')).toBeTruthy();
      expect(screen.getByText(titleText)).toBeTruthy();
    });

    it('renders pinned to the left', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray onCloseComplete={onCloseCompleteSpy} pin="left" title={titleText}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('tray')).toBeTruthy();
    });

    it('renders pinned to the top', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray onCloseComplete={onCloseCompleteSpy} pin="top" title={titleText}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('tray')).toBeTruthy();
    });
  });

  describe('header and footer', () => {
    it('renders a custom header', () => {
      const onCloseCompleteSpy = jest.fn();
      const customHeader = (
        <Text font="body" testID="test-header">
          Custom Header Content
        </Text>
      );
      render(
        <DefaultThemeProvider>
          <Tray header={customHeader} onCloseComplete={onCloseCompleteSpy}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('test-header')).toBeTruthy();
    });

    it('renders header as render function with handleClose', async () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray
            header={({ handleClose }) => (
              <button data-testid="header-close-btn" onClick={handleClose}>
                Close from header
              </button>
            )}
            onCloseComplete={onCloseCompleteSpy}
          >
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('header-close-btn')).toBeTruthy();
      screen.getByTestId('header-close-btn').click();
      await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
    });

    it('renders footer as render function with handleClose', async () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray
            footer={({ handleClose }) => (
              <button data-testid="footer-close-btn" onClick={handleClose}>
                Close from footer
              </button>
            )}
            onCloseComplete={onCloseCompleteSpy}
          >
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('footer-close-btn')).toBeTruthy();
      screen.getByTestId('footer-close-btn').click();
      await waitFor(() => expect(onCloseCompleteSpy).toHaveBeenCalled());
    });
  });

  describe('handle bar', () => {
    it('renders handle bar when showHandleBar is true', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray showHandleBar onCloseComplete={onCloseCompleteSpy}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('handleBar')).toBeTruthy();
    });

    it('hides close button by default when showHandleBar is true', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray showHandleBar onCloseComplete={onCloseCompleteSpy} title={titleText}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('handleBar')).toBeTruthy();
      expect(screen.queryByTestId('tray-close-button')).toBeFalsy();
    });

    it('shows both handle bar and close button when hideCloseButton is false', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray
            showHandleBar
            hideCloseButton={false}
            onCloseComplete={onCloseCompleteSpy}
            title={titleText}
          >
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.getByTestId('handleBar')).toBeTruthy();
      expect(screen.getByTestId('tray-close-button')).toBeTruthy();
    });

    it('does not render handle bar for side-pinned trays', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray showHandleBar onCloseComplete={onCloseCompleteSpy} pin="right" title={titleText}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      expect(screen.queryByTestId('handleBar')).toBeFalsy();
    });
  });

  describe('accessibility', () => {
    const LABEL = 'Test Label';
    const LABELLED_BY = 'title-id';

    it('sets aria-labelledby when accessibilityLabelledBy is provided', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <span id={LABELLED_BY}>{LABEL}</span>
          <Tray accessibilityLabelledBy={LABELLED_BY} onCloseComplete={onCloseCompleteSpy}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      const tray = screen.getByTestId('tray');
      expect(tray).toHaveAttribute('aria-labelledby', LABELLED_BY);
    });

    it('uses accessibilityLabel when accessibilityLabelledBy is not provided', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray accessibilityLabel={LABEL} onCloseComplete={onCloseCompleteSpy}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      const tray = screen.getByTestId('tray');
      expect(tray).toHaveAttribute('aria-label', LABEL);
      expect(tray).not.toHaveAttribute('aria-labelledby');
    });

    it('supports both accessibilityLabelledBy and accessibilityLabel when both are provided', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <span id={LABELLED_BY}>{LABEL}</span>
          <Tray
            accessibilityLabel={LABEL}
            accessibilityLabelledBy={LABELLED_BY}
            onCloseComplete={onCloseCompleteSpy}
          >
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      const tray = screen.getByTestId('tray');
      expect(tray).toHaveAttribute('aria-labelledby', LABELLED_BY);
      expect(tray).toHaveAttribute('aria-label', LABEL);
    });

    it('uses opacity animation when reduceMotion is true', async () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray reduceMotion onCloseComplete={onCloseCompleteSpy}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      // Test "closed" opacity style by asserting the opacity style asynchronously before the animation completes
      expect(screen.getByTestId('tray')).toHaveStyle({ opacity: 0 });
      await waitFor(() => {
        expect(screen.getByTestId('tray')).toHaveStyle({ opacity: 1 });
      });
    });
  });

  describe('static classNames', () => {
    it('applies static class names to component elements', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray onCloseComplete={onCloseCompleteSpy} title={titleText}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      const root = document.querySelector(`.${trayClassNames.root}`);
      expect(root).toBeInTheDocument();

      const tray = screen.getByTestId('tray');
      expect(tray).toHaveClass(trayClassNames.container);
      expect(root?.querySelector(`.${trayClassNames.overlay}`)).toBeInTheDocument();
      expect(root?.querySelector(`.${trayClassNames.header}`)).toBeInTheDocument();
      expect(root?.querySelector(`.${trayClassNames.title}`)).toBeInTheDocument();
      expect(root?.querySelector(`.${trayClassNames.content}`)).toBeInTheDocument();
      expect(root?.querySelector(`.${trayClassNames.closeButton}`)).toBeInTheDocument();
    });

    it('applies static class names to handle bar elements', () => {
      const onCloseCompleteSpy = jest.fn();
      render(
        <DefaultThemeProvider>
          <Tray showHandleBar onCloseComplete={onCloseCompleteSpy}>
            {loremIpsum}
          </Tray>
        </DefaultThemeProvider>,
      );

      const root = document.querySelector(`.${trayClassNames.root}`);
      expect(root).toBeInTheDocument();
      expect(root?.querySelector(`.${trayClassNames.handleBar}`)).toBeInTheDocument();
      expect(root?.querySelector(`.${trayClassNames.handleBarHandle}`)).toBeInTheDocument();
    });
  });
});
