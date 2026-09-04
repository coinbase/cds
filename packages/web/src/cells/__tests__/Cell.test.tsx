import { noop } from '@coinbase/cds-utils';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Cell } from '../Cell';
import { CellHelperText } from '../CellHelperText';

const CELL_TEXT = 'Some cell text';
const EXPECTED_TEXT = 'Some expected text';
const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

describe('Cell', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Cell>{CELL_TEXT}</Cell>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Cell onClick={noop}>{CELL_TEXT}</Cell>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <Cell href={URL}>{CELL_TEXT}</Cell>
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('sets an accessible label with accessibilityLabel when pressable', () => {
    render(
      <DefaultThemeProvider>
        <Cell accessibilityLabel={A11Y_TEXT} onClick={noop}>
          {CELL_TEXT}
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <DefaultThemeProvider>
        <span id={labelId}>{A11Y_TEXT}</span>
        <Cell accessibilityLabelledBy={labelId} onClick={noop}>
          {CELL_TEXT}
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <DefaultThemeProvider>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <Cell accessibilityHint={descriptionId} onClick={noop}>
          {CELL_TEXT}
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('renders children', () => {
    render(
      <DefaultThemeProvider>
        <Cell>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(CELL_TEXT)).toBeVisible();
  });

  it('renders media', () => {
    render(
      <DefaultThemeProvider>
        <Cell media={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders intermediary', () => {
    render(
      <DefaultThemeProvider>
        <Cell intermediary={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders detail', () => {
    render(
      <DefaultThemeProvider>
        <Cell detail={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders accessory', () => {
    render(
      <DefaultThemeProvider>
        <Cell accessory={<div>{EXPECTED_TEXT}</div>}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders bottomContent', () => {
    render(
      <DefaultThemeProvider>
        <Cell bottomContent={<CellHelperText>{EXPECTED_TEXT}</CellHelperText>}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByText(EXPECTED_TEXT)).toBeVisible();
  });

  it('renders button when onClick is defined', () => {
    render(
      <DefaultThemeProvider>
        <Cell onClick={noop}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyUp is defined', () => {
    render(
      <DefaultThemeProvider>
        <Cell onKeyUp={noop}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyDown is defined', () => {
    render(
      <DefaultThemeProvider>
        <Cell onKeyDown={noop}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <Cell href={URL}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <Cell href={URL}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <Cell href={URL} onClick={noop}>
          {CELL_TEXT}
        </Cell>
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(
      <DefaultThemeProvider>
        <Cell href={URL} onClick={noop}>
          {CELL_TEXT}
        </Cell>
      </DefaultThemeProvider>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(
      <DefaultThemeProvider>
        <Cell href={URL} target={target}>
          {CELL_TEXT}
        </Cell>
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onClick', () => {
    const onClickSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <Cell onClick={onClickSpy}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );
    fireEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyUp', () => {
    const onKeyUpSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <Cell onKeyUp={onKeyUpSpy}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );
    fireEvent.keyUp(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyUpSpy).toHaveBeenCalledTimes(1);
  });

  it('fires onKeyDown', () => {
    const onKeyDownSpy = jest.fn();

    render(
      <DefaultThemeProvider>
        <Cell onKeyDown={onKeyDownSpy}>{CELL_TEXT}</Cell>
      </DefaultThemeProvider>,
    );
    fireEvent.keyDown(screen.getByRole('button'), { charCode: 13 });

    expect(onKeyDownSpy).toHaveBeenCalledTimes(1);
  });
});
