import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Grid, type GridDefaultElement, type GridProps } from '../Grid';
import { GridColumn } from '../GridColumn';

const DEFAULT_CLASS = 'grid';

function expectClassName<K extends keyof GridProps<GridDefaultElement>>(
  prop: K,
  values: NonNullable<GridProps<GridDefaultElement>[K]>[],
) {
  values.forEach((value) => {
    it(`will set "${value}" class name for \`${prop}\` prop`, () => {
      const { rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);

      rerender(
        <Grid columnMin="0px" {...{ [prop]: value }}>
          Child
        </Grid>,
      );

      expect(screen.getByText('Child').className).toContain(value.trim());
    });
  });
}

describe('Grid', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <Grid background="bg" columns={12} padding={2}>
          Child
        </Grid>,
      ),
    ).toHaveNoViolations();
  });

  (['article', 'aside', 'div', 'footer', 'header', 'main', 'section'] as const).forEach((tag) => {
    it(`can render as a "${tag}" element using the \`as\` prop`, () => {
      const { container } = render(
        <Grid as={tag} columns={12}>
          Child
        </Grid>,
      );

      // Using DOM traversing for this test is imperative to confirm that correct HTML elements are created with the Grid `as` prop.
      // - Emily Seibert, 10/25/2022
      // eslint-disable-next-line testing-library/no-container
      expect(container.querySelectorAll(tag)).toHaveLength(1);
    });
  });

  it('can pass a `role` attribute', () => {
    render(
      <Grid as="main" columns={12} role="main">
        Child
      </Grid>,
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
      const { rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);

      rerender(
        <Grid bordered columnMin="0px">
          Child
        </Grid>,
      );

      expect(screen.getByText('Child').className).toContain('bordered');
    });
    it(`will set border radius class name for \`borderRadius\` prop`, () => {
      const { rerender } = render(<Grid columnMin="0px">Child</Grid>);

      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);

      rerender(
        <Grid borderRadius={200} columnMin="0px">
          Child
        </Grid>,
      );

      expect(screen.getByText('Child').className).toContain('200');
    });
  });

  describe('opacity', () => {
    it('will set styles based on related props', () => {
      render(
        <Grid columns={12} opacity={0.4}>
          Child
        </Grid>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--gridTemplateColumns: repeat(12, minmax(0, 1fr)); --opacity: 0.4;',
      );
    });
  });

  describe('width', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Grid columns={12}>Child</Grid>);

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--gridTemplateColumns: repeat(12, minmax(0, 1fr));',
      );

      rerender(
        <Grid columns={12} maxWidth="789rem" minWidth="66%" width="321px">
          Child
        </Grid>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--gridTemplateColumns: repeat(12, minmax(0, 1fr)); --width: 321px; --minWidth: 66%; --maxWidth: 789rem;',
      );
    });
  });

  describe('height', () => {
    it('will set styles based on related props', () => {
      const { rerender } = render(<Grid columns={12}>Child</Grid>);

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--gridTemplateColumns: repeat(12, minmax(0, 1fr));',
      );

      rerender(
        <Grid columns={12} height="321px" maxHeight="789rem" minHeight="66%">
          Child
        </Grid>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--gridTemplateColumns: repeat(12, minmax(0, 1fr)); --height: 321px; --minHeight: 66%; --maxHeight: 789rem;',
      );
    });
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

  describe('overflow', () => {
    expectClassName('overflow', ['hidden', 'scroll', 'visible']);
  });

  describe('styles', () => {
    const style = { opacity: 0.4, padding: '2px 4px' };
    it('can be set _dangerously_', () => {
      render(
        <Grid columns={12} style={style}>
          Child
        </Grid>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        '--gridTemplateColumns: repeat(12, minmax(0, 1fr)); opacity: 0.4; padding: 2px 4px;',
      );
    });
  });

  describe('explicit columns', () => {
    it('renders columns className', () => {
      render(<Grid columns={12}>Child</Grid>);

      expect(screen.getByText('Child').className).toContain('gridTemplateColumns');
      expect(screen.getByText('Child').className).toContain(DEFAULT_CLASS);
    });
  });

  describe('implicit columns', () => {
    it('applies implicit column styling when passed a columnMin', () => {
      const columnMin = '100px';
      render(<Grid columnMin={columnMin}>Child</Grid>);

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        `--gridTemplateColumns: repeat(auto-fill, minmax(${columnMin}, 1fr));`,
      );
    });
    it('applies implicit column styling when passed a columnMin and columnMax', () => {
      const columnMin = '100px';
      const columnMax = '200px';
      render(
        <Grid columnMax={columnMax} columnMin={columnMin}>
          Child
        </Grid>,
      );

      expect(screen.getByText('Child')).toHaveAttribute(
        'style',
        `--gridTemplateColumns: repeat(auto-fill, minmax(${columnMin}, ${columnMax}));`,
      );
    });
  });

  describe('responsive styles', () => {
    it('applies flex styles for different breakpoints', () => {
      const responsiveJustify = {
        phone: 'flex-start',
        tablet: 'space-around',
        desktop: 'flex-end',
      } as const;

      render(<Grid justifyContent={responsiveJustify}>Child</Grid>);

      const grid = screen.getByText('Child');
      const { className } = grid;

      expect(className).toContain('flex-start');
      expect(className).toContain('space-around');
      expect(className).toContain('flex-end');
    });

    it('applies visibility styles for different breakpoints', () => {
      const responsiveVisibility = {
        phone: 'hidden',
        tablet: 'visible',
      } as const;

      render(<Grid visibility={responsiveVisibility}>Child</Grid>);

      const grid = screen.getByText('Child');
      const { className } = grid;

      expect(className).toContain('hidden');
      expect(className).toContain('visible');
    });
  });

  const DEFAULT_COLUMN_CLASS = 'flex';

  describe('GridColumn', () => {
    it('renders the colStart className', () => {
      render(<GridColumn colStart={2}>Child</GridColumn>);

      const element = screen.getByText('Child');
      expect(element.className).toContain(DEFAULT_COLUMN_CLASS);
      expect(element.className).toContain('gridColumnStart');
    });
    it('renders the colEnd className', () => {
      render(<GridColumn colEnd={2}>Child</GridColumn>);

      const element = screen.getByText('Child');
      expect(element.className).toContain(DEFAULT_COLUMN_CLASS);
      expect(element.className).toContain('gridColumnEnd');
    });
    it('renders the colSpan style', () => {
      render(<GridColumn colSpan={2}>Child</GridColumn>);

      const element = screen.getByText('Child');
      expect(element).toHaveAttribute(
        'style',
        '--gridColumnStart: auto; --gridColumnEnd: auto; --gridColumn: auto / span 2;',
      );
    });
    it('renders the gridColumn style', () => {
      render(<GridColumn gridColumn="2 / 4">Child</GridColumn>);

      const element = screen.getByText('Child');
      expect(element).toHaveAttribute(
        'style',
        '--gridColumnStart: auto; --gridColumnEnd: auto; --gridColumn: 2 / 4;',
      );
    });
  });
});
