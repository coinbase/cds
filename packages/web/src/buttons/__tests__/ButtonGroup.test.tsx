import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';

describe('ButtonGroup.test', () => {
  it('renders list', () => {
    render(
      <DefaultThemeProvider>
        <ButtonGroup accessibilityLabel="Group">
          <Button>Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toBeTruthy();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });
  it('renders vertical when direction is vertical list', () => {
    render(
      <DefaultThemeProvider>
        <ButtonGroup accessibilityLabel="Group" direction="vertical">
          <Button>Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toBeTruthy();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('renders block buttons', () => {
    render(
      <DefaultThemeProvider>
        <ButtonGroup block accessibilityLabel="Group">
          <Button>Save</Button>
          <Button variant="secondary">Cancel</Button>
        </ButtonGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.getAllByRole('listitem')).toBeTruthy();
    expect(screen.getAllByRole('button')).toBeTruthy();
  });

  it('renders null children', () => {
    render(
      <DefaultThemeProvider>
        <ButtonGroup block accessibilityLabel="Group">
          {null}
          {null}
        </ButtonGroup>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('list')).toBeTruthy();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
