import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { TextFallback } from '../TextFallback';

const testID = 'text-fallback';

describe('TextFallback', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <DefaultThemeProvider>
          <TextFallback font="body" testID={testID} width={100} />
        </DefaultThemeProvider>,
      ),
    ).toHaveNoViolations();
  });

  it('renders with font-based height', () => {
    render(
      <DefaultThemeProvider>
        <TextFallback font="headline" testID={testID} width={100} />
      </DefaultThemeProvider>,
    );

    const fallback = screen.getByTestId(testID);
    expect(fallback).toHaveStyle({
      height: 'var(--fontSize-headline)',
      paddingTop: 'max((var(--lineHeight-headline) - var(--fontSize-headline)) / 2, 0px)',
      paddingBottom: 'max((var(--lineHeight-headline) - var(--fontSize-headline)) / 2, 0px)',
    });
  });
});
