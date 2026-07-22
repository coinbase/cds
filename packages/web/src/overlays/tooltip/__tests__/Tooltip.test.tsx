import { tooltipMaxWidth } from '@coinbase/cds-common/tokens/tooltip';
import type { BaseTooltipPlacement } from '@coinbase/cds-common/types';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../../../buttons/Button';
import { ComponentConfigProvider } from '../../../system';
import { DefaultThemeProvider } from '../../../utils/test';
import { PortalProvider } from '../../PortalProvider';
import { Tooltip } from '../Tooltip';
import type { TooltipProps } from '../TooltipProps';

const tooltipTestID = 'tooltip-test';
const richContentTestID = 'rich-content';
const richContentWidth = 320;
const richContentHeight = 480;

const StoryExample = ({
  placement = 'top',
  tooltipProps,
}: {
  disabled?: boolean;
  placement?: BaseTooltipPlacement;
  tooltipProps?: Partial<TooltipProps>;
}) => {
  return (
    <DefaultThemeProvider>
      <PortalProvider>
        <Tooltip
          content="This is the content in the tooltip!"
          placement={placement}
          testID={tooltipTestID}
          {...tooltipProps}
        >
          <Button>Button</Button>
        </Tooltip>
      </PortalProvider>
    </DefaultThemeProvider>
  );
};

describe('Tooltip', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<StoryExample />)).toHaveNoViolations();
  });

  it('passes accessibility when open', async () => {
    expect(
      await renderA11y(<StoryExample />, {
        async afterRender() {
          fireEvent.mouseEnter(screen.getByRole('button'));
          const tooltip = await screen.findByTestId(tooltipTestID);
          return tooltip;
        },
      }),
    ).toHaveNoViolations();
  });

  it('renders the button with a tooltip but does not show content', () => {
    render(<StoryExample />);

    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument();
  });

  it('does not override the button accessible name with tooltip content', () => {
    render(<StoryExample />);

    const button = screen.getByRole('button', { name: 'Button' });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveAccessibleName('This is the content in the tooltip!');
  });

  it('associates the trigger with the tooltip via aria-describedby when open', async () => {
    render(<StoryExample />);
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);

    const tooltip = await screen.findByTestId(tooltipTestID);
    expect(tooltip).toHaveAttribute('role', 'tooltip');
    expect(button).toHaveAttribute('aria-describedby', tooltip.id);
  });

  it('shows tooltip content on hover', async () => {
    render(<StoryExample />);
    const button = screen.getByRole('button');

    expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument();

    fireEvent.mouseEnter(button as Element);

    expect(await screen.findByTestId(tooltipTestID)).toBeInTheDocument();
  });

  it('keeps the default max width for string content', async () => {
    render(<StoryExample />);

    fireEvent.mouseEnter(screen.getByRole('button'));

    const tooltip = await screen.findByTestId(tooltipTestID);
    expect(tooltip).toHaveStyle({
      '--maxWidth': `${tooltipMaxWidth}px`,
      '--width': 'max-content',
    });
  });

  it('does not apply the default text max width to React node content', async () => {
    render(
      <StoryExample
        tooltipProps={{
          content: <div style={{ minWidth: 320 }}>Rich content</div>,
        }}
      />,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    const tooltip = await screen.findByTestId(tooltipTestID);
    expect(tooltip).toHaveStyle({ '--width': 'max-content' });
    expect(tooltip.style.getPropertyValue('--maxWidth')).toBe('');
  });

  it('sizes to fit arbitrarily tall and wide React node content', async () => {
    render(
      <StoryExample
        tooltipProps={{
          content: (
            <div
              data-testid={richContentTestID}
              style={{ height: richContentHeight, width: richContentWidth }}
            >
              Rich content
            </div>
          ),
        }}
      />,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    const tooltip = await screen.findByTestId(tooltipTestID);
    const richContent = screen.getByTestId(richContentTestID);
    expect(getComputedStyle(richContent).width).toBe(`${richContentWidth}px`);
    expect(getComputedStyle(richContent).height).toBe(`${richContentHeight}px`);
    expect(tooltip).toHaveStyle({ '--width': 'max-content' });
    expect(tooltip.style.getPropertyValue('--maxWidth')).toBe('');
  });

  it('delays showing tooltip content based on openDelay', async () => {
    jest.useFakeTimers();
    render(<StoryExample tooltipProps={{ openDelay: 300 }} />);
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(await screen.findByTestId(tooltipTestID)).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('delays hiding tooltip content based on closeDelay', async () => {
    jest.useFakeTimers();
    render(<StoryExample tooltipProps={{ closeDelay: 150 }} />);
    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    expect(await screen.findByTestId(tooltipTestID)).toBeInTheDocument();

    fireEvent.mouseLeave(button);
    expect(screen.getByTestId(tooltipTestID)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(screen.getByTestId(tooltipTestID)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(100);
    });

    await waitFor(() => expect(screen.queryByTestId(tooltipTestID)).not.toBeInTheDocument());

    jest.useRealTimers();
  });

  it('applies Tooltip defaults from ComponentConfigProvider', async () => {
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider
          value={{
            Tooltip: {
              background: 'bgSecondary',
              font: 'body',
            },
          }}
        >
          <PortalProvider>
            <Tooltip content="Configured tooltip" testID={tooltipTestID}>
              <Button>Button</Button>
            </Tooltip>
          </PortalProvider>
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    const tooltip = await screen.findByTestId(tooltipTestID);
    expect(tooltip).toHaveStyle({ backgroundColor: 'var(--color-bgSecondary)' });
    expect(screen.getByText('Configured tooltip')).toHaveStyle({
      '--text-textTransform': 'var(--textTransform-body)',
    });
  });

  it('keeps local Tooltip props higher precedence than provider defaults', async () => {
    render(
      <DefaultThemeProvider>
        <ComponentConfigProvider
          value={{
            Tooltip: {
              background: 'bgSecondary',
              font: 'body',
            },
          }}
        >
          <PortalProvider>
            <Tooltip
              background="bgPrimary"
              content="Configured tooltip"
              font="label2"
              testID={tooltipTestID}
            >
              <Button>Button</Button>
            </Tooltip>
          </PortalProvider>
        </ComponentConfigProvider>
      </DefaultThemeProvider>,
    );

    fireEvent.mouseEnter(screen.getByRole('button'));

    const tooltip = await screen.findByTestId(tooltipTestID);
    expect(tooltip).toHaveStyle({ backgroundColor: 'var(--color-bgPrimary)' });
    expect(screen.getByText('Configured tooltip')).toHaveStyle({
      '--text-textTransform': 'var(--textTransform-label2)',
    });
  });

  it('focuses after a delay when using autoFocusDelay', async () => {
    jest.useFakeTimers();

    render(
      <DefaultThemeProvider>
        <Tooltip
          autoFocusDelay={500}
          content={
            <div>
              <a data-testid="focus-element" href="https://google.com">
                Click me
              </a>
            </div>
          }
        >
          <div data-testid="content-element">Hello world</div>
        </Tooltip>
      </DefaultThemeProvider>,
    );

    const contentElement = screen.getByTestId('content-element');

    await userEvent.hover(contentElement);

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
});
