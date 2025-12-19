import '@testing-library/jest-dom';

import type { Shape } from '@coinbase/cds-common/types';
import { renderA11y } from '@coinbase/cds-web-utils';
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

describe('marginStart positioning', () => {
  const remoteImageIndices = [0, 1, 2, 3];

  it('Position is correctly applied for size m. The first is not positioned and the following will have increasing left positioning', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImageGroup shape="circle" testID={TEST_ID}>
          {remoteImageIndices.map((index) => (
            <RemoteImage key={`remote-image-child-${index}`} alt="Test RemoteImage" source={src} />
          ))}
        </RemoteImageGroup>
      </DefaultThemeProvider>,
    );

    const remoteImage1 = screen.getByTestId(`${TEST_ID}-inner-box-0`);

    // First element should not have marginStart applied (no marginStart class)
    expect(remoteImage1.className).not.toMatch(/_-1--/);

    remoteImageIndices.slice(1).forEach((index) => {
      const imageChildren = screen.getByTestId(`${TEST_ID}-inner-box-${index}`);

      // Non-first elements should have marginStart={-1} which adds a Linaria class like "_-1--xxxxx"
      expect(imageChildren.className).toMatch(/_-1--/);
    });
  });

  it('Position is correctly applied for size xxl. The first is not positioned and the following will have increasing left positioning', () => {
    render(
      <DefaultThemeProvider>
        <RemoteImageGroup shape="circle" size="xxl" testID={TEST_ID}>
          {remoteImageIndices.map((index) => (
            <RemoteImage key={`remote-image-child-${index}`} alt="Test RemoteImage" source={src} />
          ))}
        </RemoteImageGroup>
      </DefaultThemeProvider>,
    );

    const remoteImage1 = screen.getByTestId(`${TEST_ID}-inner-box-0`);

    // First element should not have marginStart applied (no marginStart class)
    expect(remoteImage1.className).not.toMatch(/_-2--/);

    remoteImageIndices.slice(1).forEach((index) => {
      const imageChildren = screen.getByTestId(`${TEST_ID}-inner-box-${index}`);

      // Non-first elements should have marginStart={-2} which adds a Linaria class like "_-2--xxxxx"
      expect(imageChildren.className).toMatch(/_-2--/);
    });
  });
});
