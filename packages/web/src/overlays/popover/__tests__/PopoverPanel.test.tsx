import { createRef } from 'react';
import useMeasure from 'react-use-measure';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import { MediaQueryProvider } from '../../../system/MediaQueryProvider';
import { DefaultThemeProvider } from '../../../utils/test';
import { PopoverPanel, type PopoverPanelRef } from '../PopoverPanel';

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

const triggerTestID = 'popover-panel-trigger';

describe('PopoverPanel', () => {
  beforeEach(() => {
    mockUseMeasure(mockDimensions);
  });

  it('renders a trigger and opens panel content when pressed', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <PopoverPanel content={<div>Panel body</div>} testID="panel-root">
            <button data-testid={triggerTestID} type="button">
              Open
            </button>
          </PopoverPanel>
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    expect(screen.getByTestId(triggerTestID)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId(triggerTestID));
    expect(await screen.findByText('Panel body')).toBeInTheDocument();
  });

  it('closes when ref.closePopover is called', async () => {
    const panelRef = createRef<PopoverPanelRef>();

    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <PopoverPanel ref={panelRef} content={<div>Panel body</div>} testID="panel-root">
            <button data-testid={triggerTestID} type="button">
              Open
            </button>
          </PopoverPanel>
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.click(screen.getByTestId(triggerTestID));
    expect(await screen.findByText('Panel body')).toBeInTheDocument();

    await act(async () => {
      panelRef.current?.closePopover();
    });

    await waitFor(() => {
      expect(screen.queryByText('Panel body')).not.toBeInTheDocument();
    });
  });

  it('closes when closePopover from a render content prop is invoked', async () => {
    render(
      <MediaQueryProvider>
        <DefaultThemeProvider>
          <PopoverPanel
            content={({ closePopover }) => (
              <button onClick={closePopover} type="button">
                Close inside
              </button>
            )}
            testID="panel-root"
          >
            <button data-testid={triggerTestID} type="button">
              Open
            </button>
          </PopoverPanel>
        </DefaultThemeProvider>
      </MediaQueryProvider>,
    );

    fireEvent.click(screen.getByTestId(triggerTestID));
    expect(await screen.findByText('Close inside')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Close inside'));
    await waitFor(() => {
      expect(screen.queryByText('Close inside')).not.toBeInTheDocument();
    });
  });
});
