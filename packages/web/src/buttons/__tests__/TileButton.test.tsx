import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { TileButton } from '../TileButton';

let mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('TileButton.test', () => {
  beforeEach(() => {
    mockConsoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });
  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('triggers press', () => {
    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <TileButton
          onClick={onClick}
          pictogram="add"
          testID="test-tile-button"
          title="test title"
        />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByTestId('test-tile-button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('logs warning in dev environment when title is empty', () => {
    process.env.NODE_ENV = 'development';

    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <TileButton onClick={onClick} pictogram="add" title="  " />
      </DefaultThemeProvider>,
    );

    expect(mockConsoleWarn).toHaveBeenCalledTimes(1);
  });

  it('does not log warning in a non dev environment', () => {
    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <TileButton onClick={onClick} pictogram="add" title="  " />
      </DefaultThemeProvider>,
    );

    expect(mockConsoleWarn).toHaveBeenCalledTimes(0);
  });

  it('does not log warning when title contains text', () => {
    process.env.NODE_ENV = 'development';

    const onClick = jest.fn();

    render(
      <DefaultThemeProvider>
        <TileButton onClick={onClick} pictogram="add" title="test title" />
      </DefaultThemeProvider>,
    );

    expect(mockConsoleWarn).toHaveBeenCalledTimes(0);
  });

  it('show overflow text', async () => {
    const onClick = jest.fn();

    const title = 'Private Client';
    render(
      <DefaultThemeProvider>
        <TileButton
          showOverflow
          onClick={onClick}
          pictogram="add"
          testID="test-tile-button"
          title={title}
        />
      </DefaultThemeProvider>,
    );

    const node = await screen.findByText(title);
    expect(node.getAttribute('class')).toContain('visibleCss');
  });

  it('show truncated text', async () => {
    const onClick = jest.fn();

    const title = 'Private Client';
    render(
      <DefaultThemeProvider>
        <TileButton
          onClick={onClick}
          pictogram="add"
          showOverflow={false}
          testID="test-tile-button"
          title={title}
        />
      </DefaultThemeProvider>,
    );

    const node = await screen.findByText(title);
    expect(node.getAttribute('class')).toContain('truncatedCss');
  });
});
