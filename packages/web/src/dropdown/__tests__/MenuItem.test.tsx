import { fireEvent, render, screen } from '@testing-library/react';

import { SelectProvider } from '../../controls/selectContext';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { MenuItem } from '../MenuItem';

describe('MenuItem', () => {
  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <MenuItem value="1">
          <Text as="p" display="block" font="title2">
            Item1
          </Text>
        </MenuItem>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText('Item1')).toBeTruthy();
  });

  it('triggers on press', () => {
    const onClick = jest.fn();
    const handleCloseMenu = jest.fn();

    render(
      <SelectProvider value={{ handleCloseMenu }}>
        <DefaultThemeProvider>
          <MenuItem onClick={onClick} testID="test-menu-item" value="1">
            <Text as="p" display="block" font="title2">
              Item1
            </Text>
          </MenuItem>
        </DefaultThemeProvider>
      </SelectProvider>,
    );

    fireEvent.click(screen.getByTestId('test-menu-item'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(handleCloseMenu).toHaveBeenCalledTimes(1);
  });

  it('disables close on option change', () => {
    const onClick = jest.fn();
    const handleCloseMenu = jest.fn();

    render(
      <SelectProvider value={{ handleCloseMenu }}>
        <DefaultThemeProvider>
          <MenuItem disableCloseOnOptionChange onClick={onClick} testID="test-menu-item" value="1">
            <Text as="p" display="block" font="title2">
              Item1
            </Text>
          </MenuItem>
        </DefaultThemeProvider>
      </SelectProvider>,
    );

    fireEvent.click(screen.getByTestId('test-menu-item'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(handleCloseMenu).toHaveBeenCalledTimes(0);
  });
});
