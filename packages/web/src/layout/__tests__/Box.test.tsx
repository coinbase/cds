import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Box, type BoxDefaultElement, type BoxProps } from '../Box';

const DEFAULT_CLASS = 'flex';

function expectClassName<K extends keyof BoxProps<BoxDefaultElement>>(
  prop: K,
  values: NonNullable<BoxProps<BoxDefaultElement>[K]>[],
) {
  values.forEach((value) => {
    it(`will set "${value}" class name for \`${prop}\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);

      rerender(<Box {...{ [prop]: value }}>Child</Box>);

      expect(screen.getByText('Child').className).toContain(value.trim());
    });
  });
}

describe('Box', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Box background="bg" padding={2}>
          Child
        </Box>,
      ),
    ).toHaveNoViolations();
  });

  it('overrides accessibilityLabel if aria-label is provided', () => {
    render(
      <Box accessibilityLabel="custom label" aria-label="label" as="main" role="main">
        Child
      </Box>,
    );

    expect(screen.getByLabelText('label')).toBeTruthy();
  });

  it('overrides accessibilityLabelledBy if aria-labelledby provided', () => {
    render(
      <Box accessibilityLabelledBy="custom-id" aria-labelledby="id" as="main" role="main">
        Child
      </Box>,
    );

    expect(screen.getByText('Child')).toHaveAttribute('aria-labelledby', 'id');
  });

  (['article', 'aside', 'div', 'footer', 'header', 'main', 'section'] as const).forEach((tag) => {
    it(`can render as a "${tag}" element using the \`as\` prop`, () => {
      const { container } = render(<Box as={tag}>Child</Box>);

      // We want to check that a certain HTML element is generated, which requires DOM traversing.
      // - Emily Seibert, 10/25/2022
      // eslint-disable-next-line testing-library/no-container
      expect(container.querySelectorAll(tag)).toHaveLength(1);
    });
  });

  it('can pass a `role` attribute', () => {
    render(
      <Box as="main" role="main">
        Child
      </Box>,
    );

    expect(screen.getByRole('main')).not.toBeNull();
  });

  describe('background', () => {
    expectClassName('background', [
      'bg',
      'bgAlternate',
      'bgOverlay',
      'bgPrimary',
      'bgSecondary',
      'bgPositive',
      'bgNegative',
    ]);
  });

  describe('border', () => {
    it(`will set border class name for \`bordered\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);

      rerender(<Box bordered>Child</Box>);

      expect(screen.getByText('Child').className).toContain('bordered');
    });

    it(`will set border radius class name for \`borderRadius\` prop`, () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);

      rerender(<Box borderRadius={200}>Child</Box>);
      expect(screen.getByText('Child').className).toContain('200');
    });
  });

  describe('opacity', () => {
    it('will set styles based on related props', () => {
      render(<Box opacity={0.4}>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('style', '--opacity: 0.4;');
    });
  });

  describe('width', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box maxWidth="789rem" minWidth="66%" width="321px">
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--width: 321px; --minWidth: 66%; --maxWidth: 789rem;',
      );
    });
  });

  describe('height', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box height="321px" maxHeight="789rem" minHeight="66%">
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--height: 321px; --minHeight: 66%; --maxHeight: 789rem;',
      );
    });
  });

  describe('position', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box bottom="8rem" left="1000%" position="absolute" right="30px" top="25%" zIndex={200}>
          Child
        </Box>,
      );

      const child = screen.getByText('Child');
      expect(child.className).toContain('absolute');
      expect(child).toHaveAttribute(
        'style',
        '--zIndex: 200; --top: 25%; --bottom: 8rem; --left: 1000%; --right: 30px;',
      );
    });
  });

  describe('flex', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Box>Child</Box>);

      expect(screen.getByText('Child')).not.toHaveAttribute('style');

      rerender(
        <Box flexBasis="50%" flexGrow={2} flexShrink={3}>
          Child
        </Box>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--flexBasis: 50%; --flexShrink: 3; --flexGrow: 2;',
      );
    });

    describe('align content', () => {
      expectClassName('alignContent', [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'space-between',
        'space-around',
      ]);
    });

    describe('align items', () => {
      expectClassName('alignItems', ['flex-start', 'flex-end', 'center', 'stretch', 'baseline']);
    });

    describe('align self', () => {
      expectClassName('alignSelf', [
        'flex-start',
        'flex-end',
        'center',
        'stretch',
        'auto',
        'baseline',
      ]);
    });

    describe('direction', () => {
      expectClassName('flexDirection', ['row', 'row-reverse', 'column', 'column-reverse']);
    });

    describe('wrap', () => {
      expectClassName('flexWrap', ['wrap', 'wrap-reverse', 'nowrap']);
    });

    describe('justify content', () => {
      expectClassName('justifyContent', [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
      ]);
    });
  });

  describe('overflow', () => {
    expectClassName('overflow', ['hidden', 'scroll', 'visible']);
  });

  describe('pin', () => {
    it('renders "top" pin', async () => {
      render(<Box pin="top">Child</Box>);

      expect(screen.getByText('Child').className).toContain('top');
    });

    it('renders "bottom" pin', async () => {
      render(<Box pin="bottom">Child</Box>);

      expect(screen.getByText('Child').className).toContain('bottom');
    });

    it('renders "right" pin', async () => {
      render(<Box pin="right">Child</Box>);

      expect(screen.getByText('Child').className).toContain('right');
    });

    it('renders "left" pin', async () => {
      render(<Box pin="left">Child</Box>);

      expect(screen.getByText('Child').className).toContain('left');
    });

    it('renders "all" pin', async () => {
      render(<Box pin="all">Child</Box>);

      expect(screen.getByText('Child').className).toContain('all');
    });
  });

  describe('styles', () => {
    const style = { opacity: 0.4, padding: '2px 4px' };
    it('can be set _dangerously_', () => {
      render(<Box style={style}>Child</Box>);

      expect(screen.getByText('Child')).toHaveAttribute('style', 'opacity: 0.4; padding: 2px 4px;');
    });
  });

  describe('responsive styles', () => {
    it('applies flex styles for different breakpoints', () => {
      const responsiveJustify = {
        phone: 'flex-start',
        tablet: 'space-around',
        desktop: 'flex-end',
      } as const;

      render(<Box justifyContent={responsiveJustify}>Child</Box>);

      const box = screen.getByText('Child');
      const { className } = box;

      expect(className).toContain('flex-start');
      expect(className).toContain('space-around');
      expect(className).toContain('flex-end');
    });

    it('applies visibility styles for different breakpoints', () => {
      const responsiveVisibility = {
        phone: 'hidden',
        tablet: 'visible',
      } as const;
      render(<Box visibility={responsiveVisibility}>Child</Box>);

      const box = screen.getByText('Child');
      const { className } = box;

      expect(className).toContain('hidden');
      expect(className).toContain('visible');
    });
  });
});
