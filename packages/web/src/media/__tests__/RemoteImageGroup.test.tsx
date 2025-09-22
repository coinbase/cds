import '@testing-library/jest-dom';

import type { Shape } from '@cbhq/cds-common/types';
import { renderA11y } from '@cbhq/cds-web-utils';
import { render, screen } from '@testing-library/react';

import { DefaultThemeProvider } from '../../utils/test';
import { RemoteImage } from '../RemoteImage';
import { RemoteImageGroup, type RemoteImageGroupProps } from '../RemoteImageGroup';

const src = 'https://images.coinbase.com/avatar?s=56';
const TEST_ID = 'remote-image-test-id';
const SIZE = 40;

const RemoteImageGroupDefaults = ({ ...props }: RemoteImageGroupProps) => (
  <DefaultThemeProvider>
    <RemoteImageGroup shape="circle" size={SIZE} testID={TEST_ID} {...props}>
      <RemoteImage alt="Test RemoteImage" source={src} />
      <RemoteImage alt="Test RemoteImage" source={src} />
      <RemoteImage alt="Test RemoteImage" source={src} />
      <RemoteImage alt="Test RemoteImage" source={src} />
    </RemoteImageGroup>
  </DefaultThemeProvider>
);

describe('RemoteImageGroup', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<RemoteImageGroupDefaults />)).toHaveNoViolations();
  });
});

describe('renders correct default', () => {
  it('renders correct default size if not specified - default size = 24x24', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImageGroup shape="circle" testID={TEST_ID}>
          <RemoteImage source={src} />
        </RemoteImageGroup>
      </DefaultThemeProvider>,
    );
    const box: HTMLElement | null = screen.getByTestId(TEST_ID);
    expect(box).toBeTruthy();

    const children = screen.queryAllByRole('img');
    children.forEach((child) => {
      expect(child).toHaveStyle('--width: 24px');
      expect(child).toHaveStyle('--height: 24px');
    });
  });

  it('renders correct default shape if not specified - default shape = circle', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImageGroup testID={TEST_ID}>
          <RemoteImage source={src} />
        </RemoteImageGroup>
      </DefaultThemeProvider>,
    );
    const box: HTMLElement | null = screen.getByTestId(TEST_ID);
    expect(box).toBeTruthy();

    const children = screen.queryAllByRole('img');
    children.forEach((child) => {
      expect(child).toHaveAttribute('data-shape', 'circle');
    });
  });
});

describe('renders different shapes', () => {
  const SHAPES = ['circle', 'squircle', 'square', 'rectangle'] as Shape[];

  SHAPES.map((shape) => {
    return it(`all child elements have this ${shape} and size ${SIZE}x${SIZE}`, () => {
      render(<RemoteImageGroupDefaults shape={shape} />);

      const box: HTMLElement | null = screen.getByTestId(TEST_ID);
      expect(box).toBeTruthy();

      const children = screen.queryAllByRole('img');
      let allChildrenHaveParentShape = true;
      let allChildHaveParentWidth = true;
      let allChildHaveParentHeight = true;

      let prevShape: string | null = null;
      children.forEach((child) => {
        if (!allChildrenHaveParentShape) return;

        const childShape = child?.getAttribute('data-shape');
        const childWidth = child.style.getPropertyValue('--width');
        const childHeight = child.style.getPropertyValue('--height');

        allChildrenHaveParentShape = childShape === prevShape || prevShape === null;
        prevShape = childShape;
        allChildHaveParentHeight = childWidth === `${SIZE}px`;
        allChildHaveParentWidth = childHeight === `${SIZE}px`;
      });

      expect(allChildrenHaveParentShape).toBe(true);
      expect(allChildHaveParentWidth).toBe(true);
      expect(allChildHaveParentHeight).toBe(true);
    });
  });
});
