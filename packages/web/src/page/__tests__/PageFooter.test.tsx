import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils';
import { render, screen } from '@testing-library/react';

import { Button } from '../../buttons';
import * as useBreakpoints from '../../hooks/useBreakpoints';
import { Box } from '../../layout';
import { DefaultThemeProvider } from '../../utils/test';
import { PageFooter, type PageFooterProps } from '../PageFooter';

const defaultProps: PageFooterProps = {
  action: <Box>End</Box>,
  background: 'bgPrimaryWash',
};

describe('PageFooter', () => {
  beforeEach(() => {
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockImplementation(() => ({
      isPhone: false,
      isPhonePortrait: false,
      isPhoneLandscape: false,
      isTablet: false,
      isTabletPortrait: false,
      isTabletLandscape: false,
      isDesktop: true,
      isDesktopSmall: true,
      isDesktopLarge: false,
      isExtraWide: false,
    }));
  });

  it('passes accessibility', async () => {
    expect(await renderA11y(<PageFooter {...defaultProps} />)).toHaveNoViolations();
  });

  it('justifies content to the center on mobile devices', () => {
    jest.spyOn(useBreakpoints, 'useBreakpoints').mockImplementation(() => ({
      isPhone: true,
      isPhonePortrait: true,
      isPhoneLandscape: false,
      isTablet: false,
      isTabletPortrait: false,
      isTabletLandscape: false,
      isDesktop: false,
      isDesktopSmall: false,
      isDesktopLarge: false,
      isExtraWide: false,
    }));
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('contentinfo').className).toContain('center');
  });

  it('justifies content to the flex-end on desktop', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter {...defaultProps} />
      </DefaultThemeProvider>,
    );

    expect(screen.getByRole('contentinfo').className).toContain('flex-end');
  });

  it('renders the action component correctly', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter action={<Button>Save</Button>} />
      </DefaultThemeProvider>,
    );
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('applies the background prop correctly', () => {
    render(<PageFooter {...defaultProps} />);
    expect(screen.getByRole('contentinfo')).toHaveStyle('background: bgPrimaryWash');
  });

  it('renders legalText below the action', () => {
    render(
      <DefaultThemeProvider>
        <PageFooter action={<Button>Save</Button>} legalText="Legal text" />
      </DefaultThemeProvider>,
    );
    expect(screen.getByText('Legal text')).toBeInTheDocument();
  });
});
