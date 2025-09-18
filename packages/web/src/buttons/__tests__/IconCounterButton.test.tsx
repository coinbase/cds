import '@testing-library/jest-dom';

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { IconCounterButton } from '../IconCounterButton';

describe('IconCounterButton', () => {
  it('renders without crashing', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(
      <DefaultThemeProvider>
        <IconCounterButton icon="heart" onClick={handleClick} />
      </DefaultThemeProvider>,
    );

    fireEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders custom icon', () => {
    const CustomIcon = () => <div data-testid="custom-icon">Custom Icon</div>;
    render(
      <DefaultThemeProvider>
        <IconCounterButton icon={<CustomIcon />} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('displays the correct icon', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'heart');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <DefaultThemeProvider>
        <IconCounterButton ref={ref} active icon="heart" />
      </DefaultThemeProvider>,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('passes testId correctly', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active icon="heart" testID="icon-counter-button-test-id" />
      </DefaultThemeProvider>,
    );

    expect(screen.getByTestId('icon-counter-button-test-id')).toBeInTheDocument();
  });

  it('displays the count correctly when count is less than 1000', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active count={999} icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('999')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1000', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active count={1000} icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('1K')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1500', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active count={1500} icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('1.5K')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1000000', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active count={1000000} icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('1M')).toBeInTheDocument();
  });

  it('displays the count correctly when count is 1500000', () => {
    render(
      <DefaultThemeProvider>
        <IconCounterButton active count={1500000} icon="heart" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('1.5M')).toBeInTheDocument();
  });
});
