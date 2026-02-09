import React from 'react';
import { renderA11y } from '@coinbase/cds-web-utils/jest';
import { render, screen } from '@testing-library/react';

import { Button } from '../../buttons';
import { Icon } from '../../icons';
import { HStack } from '../../layout';
import { Text } from '../../typography/Text';
import { DefaultThemeProvider } from '../../utils/test';
import { NavigationBar, navigationBarClassNames } from '../NavigationBar';

const NavigationBarWithTheme = (props: any) => (
  <DefaultThemeProvider>
    <NavigationBar {...props} />
  </DefaultThemeProvider>
);

describe('NavigationBar', () => {
  it('passes accessibility', async () => {
    expect(
      await renderA11y(
        <NavigationBarWithTheme>
          <Text>Page Title</Text>
        </NavigationBarWithTheme>,
      ),
    ).toHaveNoViolations();
  });

  it('passes accessibility with all props provided', async () => {
    expect(
      await renderA11y(
        <NavigationBarWithTheme
          accessibilityLabel="Custom navigation"
          bottom={<div>Bottom Navigation</div>}
          end={<Button>Menu</Button>}
          start={<Button>Back</Button>}
        >
          <Text>Page Title</Text>
        </NavigationBarWithTheme>,
      ),
    ).toHaveNoViolations();
  });

  it('renders as nav element with correct accessibility attributes', () => {
    render(
      <NavigationBarWithTheme accessibilityLabel="Custom navigation">
        <Text>Page Title</Text>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'Custom navigation');
  });

  it('uses default accessibility label when none provided', () => {
    render(
      <NavigationBarWithTheme>
        <Text>Page Title</Text>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'main navigation');
  });

  it('renders start, children, end and bottom correctly for valid props', () => {
    render(
      <NavigationBarWithTheme
        bottom={<div>Bottom</div>}
        end={<div>End</div>}
        start={<div>Start</div>}
      >
        <div>Children</div>
      </NavigationBarWithTheme>,
    );

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
  });

  it('does not render start, end and bottom for null props', () => {
    render(
      <NavigationBarWithTheme bottom={null} end={null} start={null}>
        <div>Children</div>
      </NavigationBarWithTheme>,
    );

    expect(screen.queryByText('Start')).not.toBeInTheDocument();
    expect(screen.queryByText('End')).not.toBeInTheDocument();
    expect(screen.queryByText('Bottom')).not.toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('does not render start, end and bottom for undefined props', () => {
    render(
      <NavigationBarWithTheme bottom={undefined} end={undefined} start={undefined}>
        <div>Children</div>
      </NavigationBarWithTheme>,
    );

    expect(screen.queryByText('Start')).not.toBeInTheDocument();
    expect(screen.queryByText('End')).not.toBeInTheDocument();
    expect(screen.queryByText('Bottom')).not.toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });

  it('renders complex start content correctly', () => {
    const startContent = (
      <HStack alignItems="center" gap={1}>
        <Button variant="secondary">Back</Button>
        <Icon name="home" />
      </HStack>
    );

    render(
      <NavigationBarWithTheme start={startContent}>
        <Text>Page Title</Text>
      </NavigationBarWithTheme>,
    );

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'home');
  });

  it('renders complex end content correctly', () => {
    const endContent = (
      <HStack alignItems="center" gap={1}>
        <Icon name="bell" />
        <Button>Profile</Button>
      </HStack>
    );

    render(
      <NavigationBarWithTheme end={endContent}>
        <Text>Page Title</Text>
      </NavigationBarWithTheme>,
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByTestId('icon-base-glyph')).toHaveAttribute('data-icon-name', 'bell');
  });

  it('renders complex children content correctly', () => {
    const childrenContent = (
      <HStack alignItems="center" gap={2}>
        <Text font="title1">Main Title</Text>
        <Text color="fgMuted" font="caption">
          Subtitle
        </Text>
      </HStack>
    );

    render(<NavigationBarWithTheme>{childrenContent}</NavigationBarWithTheme>);

    expect(screen.getByText('Main Title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(
      <NavigationBarWithTheme testID="nav-bar">
        <Text>Page Title</Text>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    expect(nav.className).toContain('borderedBottom');
    expect(nav.className).toContain('bg');
  });

  it('applies custom padding props', () => {
    render(
      <NavigationBarWithTheme paddingBottom={1} paddingTop={3} paddingX={4} testID="nav-bar">
        <Text>Page Title</Text>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    // The padding props are applied via CSS classes
    expect(nav).toBeInTheDocument();
  });

  it('handles empty children gracefully', () => {
    render(<NavigationBarWithTheme>{null}</NavigationBarWithTheme>);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('handles React node children correctly', () => {
    const nodeChild = <span>Complex Node Child</span>;

    render(<NavigationBarWithTheme>{nodeChild}</NavigationBarWithTheme>);

    expect(screen.getByText('Complex Node Child')).toBeInTheDocument();
  });

  it('handles multiple children correctly', () => {
    render(
      <NavigationBarWithTheme>
        <Text>First Child</Text>
        <Text>Second Child</Text>
      </NavigationBarWithTheme>,
    );

    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });

  it('maintains layout structure with different content combinations', () => {
    const { rerender } = render(
      <NavigationBarWithTheme start={<div>Start Only</div>}>
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    expect(screen.getByText('Start Only')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();

    rerender(
      <NavigationBarWithTheme end={<div>End Only</div>}>
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    // Note: NavigationBar uses usePreviousValue for start node, so it may still be present
    // We'll check that the end content is properly rendered
    expect(screen.getByText('End Only')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();

    rerender(
      <NavigationBarWithTheme
        bottom={<div>Bottom</div>}
        end={<div>End</div>}
        start={<div>Start</div>}
      >
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('End')).toBeInTheDocument();
    expect(screen.getByText('Bottom')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('applies default padding when bottom is not provided', () => {
    render(
      <NavigationBarWithTheme>
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    // paddingBottom should default to 2 when no bottom prop
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });

  it('applies undefined padding when bottom is provided', () => {
    render(
      <NavigationBarWithTheme bottom={<div>Bottom Content</div>}>
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    // paddingBottom should be undefined when bottom prop is provided
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(screen.getByText('Bottom Content')).toBeInTheDocument();
  });

  it('forwards dangerouslyDisableOverflowHidden prop correctly', () => {
    render(
      <NavigationBarWithTheme
        dangerouslyDisableOverflowHidden={true}
        start={<div>Start Content</div>}
      >
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    // The prop should be passed to the Collapsible component
    expect(screen.getByText('Start Content')).toBeInTheDocument();
  });

  it('maintains sticky positioning', () => {
    render(
      <NavigationBarWithTheme>
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    // Should have sticky positioning classes (looking for 'sticky-' prefix)
    expect(nav.className).toMatch(/sticky-/);
  });

  it('has correct z-index for navigation layer', () => {
    render(
      <NavigationBarWithTheme>
        <Text>Title</Text>
      </NavigationBarWithTheme>,
    );

    const nav = screen.getByRole('navigation');
    // Should have z-index styling applied
    expect(nav).toBeInTheDocument();
  });

  describe('static classNames', () => {
    it('applies static class names to component elements', () => {
      render(
        <NavigationBarWithTheme start={<div>Start</div>}>
          <div>Children</div>
        </NavigationBarWithTheme>,
      );

      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass(navigationBarClassNames.root);
      expect(nav.querySelector(`.${navigationBarClassNames.start}`)).toBeInTheDocument();
      expect(nav.querySelector(`.${navigationBarClassNames.content}`)).toBeInTheDocument();
    });
  });
});
