import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';

import { DefaultThemeProvider } from '../../utils/testHelpers';
import { BrowserBarContext } from '../BrowserBar';
import { BrowserBarSearchInput, type BrowserBarSearchInputProps } from '../BrowserBarSearchInput';

describe('BrowserBarSearchInput', () => {
  const mockSetHideStart = jest.fn();
  const mockSetHideEnd = jest.fn();
  const defaultProps: BrowserBarSearchInputProps = {
    value: '',
    onChangeText: jest.fn(),
  };

  const renderWithContext = (props: BrowserBarSearchInputProps) => {
    return render(
      <DefaultThemeProvider>
        <BrowserBarContext.Provider
          value={{
            isWithinBrowserBar: true,
            setHideStart: mockSetHideStart,
            setHideEnd: mockSetHideEnd,
            hideStart: false,
            hideEnd: false,
          }}
        >
          <BrowserBarSearchInput {...props} />
        </BrowserBarContext.Provider>
      </DefaultThemeProvider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (defaultProps.onChangeText as jest.Mock).mockClear();
  });

  it('renders the search input', () => {
    renderWithContext({
      ...defaultProps,
      placeholder: 'Search...',
    });
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeDefined();
  });

  describe('with expandOnFocus={true} (default)', () => {
    it('calls setHideStart and setHideEnd on focus', () => {
      const onFocus = jest.fn();
      renderWithContext({
        ...defaultProps,
        testID: 'search-input',
        onFocus,
      });

      fireEvent(screen.getByTestId('search-input'), 'focus');

      expect(mockSetHideStart).toHaveBeenCalledWith(true);
      expect(mockSetHideEnd).toHaveBeenCalledWith(true);
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('calls setHideStart and setHideEnd to false on blur', () => {
      const onBlur = jest.fn();
      renderWithContext({
        ...defaultProps,
        testID: 'search-input',
        onBlur,
      });

      fireEvent(screen.getByTestId('search-input'), 'blur');

      expect(mockSetHideStart).toHaveBeenCalledWith(false);
      expect(mockSetHideEnd).toHaveBeenCalledWith(false);
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('with expandOnFocus={false}', () => {
    it('does not call setHideStart and setHideEnd on focus', () => {
      renderWithContext({
        ...defaultProps,
        testID: 'search-input',
        expandOnFocus: false,
      });

      fireEvent(screen.getByTestId('search-input'), 'focus');

      expect(mockSetHideStart).not.toHaveBeenCalled();
      expect(mockSetHideEnd).not.toHaveBeenCalled();
    });
  });
});
