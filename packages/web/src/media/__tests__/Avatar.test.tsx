import '@testing-library/jest-dom';

import type { AvatarSize } from '@coinbase/cds-common/types/AvatarSize';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { cleanup, render, screen } from '@testing-library/react';

import type { ComponentConfig } from '../../core/componentConfig';
import { ComponentConfigProvider } from '../../system';
import { Avatar } from '../Avatar';

const src = 'https://images.coinbase.com/avatar?s=56';

describe('Avatar', () => {
  it('passes accessibility', async () => {
    expect(await renderA11y(<Avatar alt="Test Name" src={src} />)).toHaveNoViolations();
  });

  it('renders an image with alt text', () => {
    const name = 'Test Name';
    render(<Avatar alt={name} src={src} />);

    const imgNode = screen.queryByAltText(name);
    expect(imgNode).toBeTruthy();
    expect((imgNode as HTMLImageElement).src).toEqual(src);
  });

  it('has a border color', () => {
    render(<Avatar alt="TestName" borderColor="bgPositive" src={src} testID="avatar-component" />);
    const box = screen.getByTestId('avatar-component');

    expect(box.className).toContain('avatarCss');
    expect(box).toHaveAttribute('data-bordered', 'true');
    expect(box.style.getPropertyValue('--avatar-borderColor')).toBe('var(--color-bgPositive)');
    expect(box.className).toContain('circle');
  });

  it('renders with different sizes', () => {
    const sizes: AvatarSize[] = ['m', 'l', 'xl', 'xxl', 'xxxl'];

    sizes.forEach((size) => {
      render(<Avatar alt="TestName" size={size} src={src} testID="avatar-component" />);
      const img = screen.getByRole('img');
      expect(img).toHaveStyle({
        '--width': `var(--avatarSize-${size})`,
        '--height': `var(--avatarSize-${size})`,
      });
      cleanup();
    });
  });

  it('handles shapes', () => {
    render(<Avatar alt="TestName" src={src} testID="avatar-component" />);
    const box = screen.getByTestId('avatar-component');
    expect(box).toBeTruthy();
    expect(box).toHaveAttribute('data-shape', 'circle');
    expect(box.className).toContain('circle');

    render(<Avatar alt="TestName" shape="square" src={src} testID="avatar-square-component" />);
    const square = screen.getByTestId('avatar-square-component');
    expect(square).toBeTruthy();
    expect(square).toHaveAttribute('data-shape', 'square');
    expect(square.className).toContain('square');

    render(<Avatar alt="TestName" shape="hexagon" src={src} testID="avatar-hexagon-component" />);
    const hexagon = screen.getByTestId('avatar-hexagon-component');
    expect(hexagon).toBeTruthy();
    expect(hexagon).toHaveAttribute('data-shape', 'hexagon');
    expect(hexagon.className).toContain('hexagon');
  });

  it('when passed a name prop and no src is provided it shows a fallback color and first letter of name prop', () => {
    const testID = 'avatar-component';
    render(<Avatar alt="" colorScheme="pink" name="TestName" testID={testID} />);

    const wrapper = screen.getByTestId(`${testID}-wrapper`);
    expect(wrapper).toHaveAttribute('data-colorscheme', 'pink');

    const fallbackBox = screen.getByTestId(`${testID}-fallback`);
    expect(fallbackBox).toBeTruthy();
    expect(fallbackBox.textContent).toBe('T');
    expect(fallbackBox.className).toContain('currentColor');
  });

  it('when passed an empty string for src it shows a fallback image', () => {
    const name = 'Test Name';
    render(<Avatar alt={name} src="" />);

    const imgNode = screen.queryByAltText(name);

    expect(imgNode).toBeTruthy();
    expect((imgNode as HTMLImageElement).src).toMatch(/^data:image/);
  });

  it('renders a transparent border if there is a name prop and uses the fallback color treatment', () => {
    const testID = 'avatar-component';
    render(
      <Avatar alt="" borderColor="bgPositive" colorScheme="pink" name="TestName" testID={testID} />,
    );

    const box = screen.getByTestId(testID);
    expect(box).toBeTruthy();
    expect(box.style.getPropertyValue('--avatar-borderColor')).not.toBe('var(--color-bgPositive)');
    expect(box.style.getPropertyValue('--avatar-borderColor')).toBe('var(--color-transparent)');

    const fallbackBox = screen.getByTestId(`${testID}-fallback`);
    expect(fallbackBox).toBeTruthy();
    expect(fallbackBox.textContent).toBe('T');
    expect(fallbackBox.className).toContain('currentColor');
  });

  it('capitalizes first letter of avatar name', () => {
    const name = 'testName';
    render(<Avatar alt="" name={name} testID="avatar-component" />);

    const letter = screen.getByText('t');
    expect(letter).toBeTruthy();
    const style = letter.getAttribute('style');
    expect(style).toContain('--transform: uppercase');
  });

  it('applies provider config defaults', () => {
    const config: ComponentConfig = {
      Avatar: {
        shape: 'square',
      },
    };
    render(
      <ComponentConfigProvider value={config}>
        <Avatar alt="TestName" src={src} testID="avatar-component" />
      </ComponentConfigProvider>,
    );

    expect(screen.getByTestId('avatar-component')).toHaveAttribute('data-shape', 'square');
  });

  it('allows local props to override provider defaults', () => {
    const config: ComponentConfig = {
      Avatar: {
        shape: 'square',
      },
    };
    render(
      <ComponentConfigProvider value={config}>
        <Avatar alt="TestName" shape="circle" src={src} testID="avatar-component" />
      </ComponentConfigProvider>,
    );

    expect(screen.getByTestId('avatar-component')).toHaveAttribute('data-shape', 'circle');
  });
});
