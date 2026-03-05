import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { fireEvent, render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { Card, type CardProps } from '../Card';

const noop = () => {};
const CARD_TEXT = 'Some cell text';
const URL = 'https://www.google.com';
const A11Y_TEXT = 'Some accessible text';

const TestCard = (props: CardProps) => {
  return (
    <DefaultThemeProvider>
      <Card {...props} />
    </DefaultThemeProvider>
  );
};

describe('Card', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<TestCard>{CARD_TEXT}</TestCard>)).toHaveNoViolations();
  });

  it('passes accessibility when a button', async () => {
    expect(await renderA11y(<TestCard onClick={noop}>{CARD_TEXT}</TestCard>)).toHaveNoViolations();
  });

  it('passes accessibility when a link', async () => {
    expect(await renderA11y(<TestCard href={URL}>{CARD_TEXT}</TestCard>)).toHaveNoViolations();
  });

  it('sets an accessible label with accessibilityLabel when pressable', () => {
    render(
      <TestCard accessibilityLabel={A11Y_TEXT} onClick={noop}>
        {CARD_TEXT}
      </TestCard>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible label with accessibilityLabelledBy when pressable', () => {
    const labelId = 'label-id';

    render(
      <>
        <span id={labelId}>{A11Y_TEXT}</span>
        <TestCard accessibilityLabelledBy={labelId} onClick={noop}>
          {CARD_TEXT}
        </TestCard>
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleName(A11Y_TEXT);
  });

  it('sets an accessible description with accessibilityHint when pressable', () => {
    const descriptionId = 'description-id';

    render(
      <>
        <span id={descriptionId}>{A11Y_TEXT}</span>
        <TestCard accessibilityHint={descriptionId} onClick={noop}>
          {CARD_TEXT}
        </TestCard>
      </>,
    );

    expect(screen.getByRole('button')).toHaveAccessibleDescription(A11Y_TEXT);
  });

  it('renders children', () => {
    render(<TestCard>{CARD_TEXT}</TestCard>);

    expect(screen.getByText(CARD_TEXT)).toBeVisible();
  });

  it('renders button when onClick is defined', () => {
    render(<TestCard onClick={noop}>{CARD_TEXT}</TestCard>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders button when onKeyPress is defined', () => {
    render(<TestCard onKeyDown={noop}>{CARD_TEXT}</TestCard>);

    expect(screen.getByRole('button')).toBeVisible();
  });

  it('renders link when to is set with a url', () => {
    render(<TestCard href={URL}>{CARD_TEXT}</TestCard>);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when href is set with a url', () => {
    render(<TestCard href={URL}>{CARD_TEXT}</TestCard>);

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but to is set with a url', () => {
    render(
      <TestCard href={URL} onClick={noop}>
        {CARD_TEXT}
      </TestCard>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('renders link when pressable callback is defined but href is set with a url', () => {
    render(
      <TestCard href={URL} onClick={noop}>
        {CARD_TEXT}
      </TestCard>,
    );

    const link = screen.getByRole('link');

    expect(link).toBeVisible();
    expect(link).toHaveAttribute('href', URL);
  });

  it('sets target on link when target is defined', () => {
    const target = '_blank';

    render(
      <TestCard href={URL} target={target}>
        {CARD_TEXT}
      </TestCard>,
    );

    expect(screen.getByRole('link')).toHaveAttribute('target', target);
  });

  it('fires onClick', () => {
    const onClickSpy = jest.fn();

    render(<TestCard onClick={onClickSpy}>{CARD_TEXT}</TestCard>);
    fireEvent.click(screen.getByRole('button'));

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});
