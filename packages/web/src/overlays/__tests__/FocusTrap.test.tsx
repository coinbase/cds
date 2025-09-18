import useMeasure from 'react-use-measure';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Default as Dropdown } from '../../dropdown/__stories__/Dropdown.stories';
import { MediaQueryProvider } from '../../system/MediaQueryProvider';
import { DefaultThemeProvider } from '../../utils/test';
import { LongModal } from '../__stories__/Modal.stories';
import { FocusTrap } from '../FocusTrap';

jest.mock('react-use-measure');
const mockUseMeasure = (mocks: Partial<ReturnType<typeof useMeasure>>) => {
  (useMeasure as jest.Mock).mockReturnValue(mocks);
};
const mockDimensions: Partial<ReturnType<typeof useMeasure>> = [
  jest.fn(),
  {
    width: 230,
    x: 20,
    y: 64,
    height: 40,
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
];

const subjectTestID = 'subject-test';

const fruitOptions = ['Blueberry', 'Tomato', 'Apple', 'Banana', 'Pear', 'Guava', 'Pomegranate'];

describe('FocusTrap', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });
  // menu item interactions
  it('focuses on the next menu item when ArrowDown is typed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0], { timeout: 2000 });
    const secondOption = screen.getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    // expect second option to be focused
    expect(secondOption).toHaveFocus();
  });
  it('focuses on the previous menu item when ArrowUp is typed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);
    const secondOption = screen.getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    fireEvent.keyDown(secondOption, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });
  it('focuses on the first menu item when Home is typed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);
    const secondOption = screen.getAllByRole('menuitem')[1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    fireEvent.keyDown(secondOption, {
      key: 'Home',
      code: 'Home',
    });

    // expect second option to be focused
    expect(firstOption).toHaveFocus();
  });

  it('focuses on the first matching element after a US character is typed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown options={fruitOptions} subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = screen.getAllByRole('menuitem');

    const firstOption = await waitFor(() => menuItems[0]);
    const optionStartsWithA = menuItems[2];

    fireEvent.keyDown(firstOption, {
      key: 'a',
      code: '65',
    });

    // expect the option "Apple" option to be focused
    expect(optionStartsWithA).toHaveFocus();
  });

  it('keeps focus on the previous element when no matching element for typed US character', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown options={fruitOptions} subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const menuItems = screen.getAllByRole('menuitem');

    const firstOption = await waitFor(() => menuItems[0]);

    expect(firstOption).toHaveFocus();

    fireEvent.keyDown(firstOption, {
      key: 'c',
      code: '67',
    });

    expect(firstOption).toHaveFocus();
  });
  it('focuses on the last menu item when End is typed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);
    const secondOption = screen.getAllByRole('menuitem')[1];
    const lastOption = screen.getAllByRole('menuitem')[screen.getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });
    fireEvent.keyDown(secondOption, {
      key: 'End',
      code: 'End',
    });

    // expect last option to be focused
    expect(lastOption).toHaveFocus();
  });

  // initial focus
  it('focuses on the first option when the menu is opened by a keyboard interaction', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    // open the menu
    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });

  it('focuses on the first option when the menu is opened', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    // open the menu
    fireEvent.click(screen.getByTestId(subjectTestID));

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);

    // expect first option to be focused
    expect(firstOption).toHaveFocus();
  });

  it('does not auto focus on the first option when disableAutoFocus is true', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} value="Option 2" />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    // open the menu
    fireEvent.click(screen.getByTestId(subjectTestID));

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);

    // expect first option to be focused
    expect(firstOption).not.toHaveFocus();
  });

  it('when the first option is focused and ArrowUp is typed it focuses on the last option', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);
    const lastOption = screen.getAllByRole('menuitem')[screen.getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'ArrowUp',
      code: 'ArrowUp',
    });

    expect(lastOption).toHaveFocus();
  });
  it('when the last option is focused and ArrowDown is typed it focuses on the first option', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <Dropdown subjectTestID={subjectTestID} />
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.keyDown(screen.getByTestId(subjectTestID), {
      key: 'Enter',
      code: 'Enter',
    });

    const firstOption = await waitFor(() => screen.getAllByRole('menuitem')[0]);
    const lastOption = screen.getAllByRole('menuitem')[screen.getAllByRole('menuitem').length - 1];

    fireEvent.keyDown(firstOption, {
      key: 'End',
      code: 'End',
    });

    fireEvent.keyDown(lastOption, {
      key: 'ArrowDown',
      code: 'ArrowDown',
    });

    expect(firstOption).toHaveFocus();
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
});
