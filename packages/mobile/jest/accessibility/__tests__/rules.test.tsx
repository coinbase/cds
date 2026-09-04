// we need to access the custom type definitions for the accessibility matcher
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../../../src/jest.d.ts" />
import React from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { checkAccessibility } from '../engine';

// Note: When using checkAccessibility, we need to pass a component from the React tree,
// not just the host component. RNTL's screen.getByTestId returns the host component,
// so for violation checking we often need to use a container wrapper.

describe('Accessibility Rules', () => {
  describe('pressable-role-required', () => {
    it('fails when pressable has no role', () => {
      render(
        <View testID="container">
          <TouchableOpacity testID="button">
            <Text>Click me</Text>
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.length).toBeGreaterThan(0);
      expect(violations.some((v) => v.problem.includes("user hasn't been informed"))).toBe(true);
    });

    it('passes when pressable has button role', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityLabel="Click me" accessibilityRole="button">
            <Text>Click me</Text>
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });

    it('passes with link role', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityLabel="Go to page" accessibilityRole="link">
            <Text>Link</Text>
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('pressable-accessible-required', () => {
    it('fails when pressable has accessible=false', () => {
      render(
        <View testID="container">
          <Pressable accessibilityRole="button" accessible={false}>
            <Text>Click me</Text>
          </Pressable>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.some((v) => v.problem.includes('not accessible'))).toBe(true);
    });

    it('passes when accessible is not set (defaults to true)', () => {
      render(
        <View testID="container">
          <Pressable accessibilityLabel="Click me" accessibilityRole="button">
            <Text>Click me</Text>
          </Pressable>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('pressable-label-required', () => {
    it('fails when pressable has no label and no text', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityRole="button">
            <View />
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.some((v) => v.problem.includes('no text content'))).toBe(true);
    });

    it('passes when pressable has accessibilityLabel', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityLabel="Submit" accessibilityRole="button">
            <View />
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });

    it('passes when pressable has text content', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityRole="button">
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('checked-state-required', () => {
    it('fails when checkbox has no checked state', () => {
      render(
        <View testID="container">
          <Pressable accessibilityLabel="Accept terms" accessibilityRole="checkbox">
            <Text>Accept</Text>
          </Pressable>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.some((v) => v.problem.includes('checked state'))).toBe(true);
    });

    it('passes when checkbox has checked state', () => {
      render(
        <View testID="container">
          <Pressable
            accessibilityLabel="Accept terms"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: false }}
          >
            <Text>Accept</Text>
          </Pressable>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });

    it('passes with mixed checked state', () => {
      render(
        <View testID="container">
          <Pressable
            accessibilityLabel="Select all"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: 'mixed' }}
          >
            <Text>Select All</Text>
          </Pressable>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('link-role-required', () => {
    it('fails when clickable text has no link role', () => {
      render(
        <View testID="container">
          <Text onPress={() => {}}>Click me</Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.some((v) => v.problem.includes('clickable'))).toBe(true);
    });

    it('passes when clickable text has link role', () => {
      render(
        <View testID="container">
          <Text accessibilityRole="link" onPress={() => {}}>
            Click me
          </Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });

    it('passes when text is not clickable', () => {
      render(
        <View testID="container">
          <Text>Just text</Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('link-role-misused', () => {
    it('fails when non-clickable text has link role', () => {
      render(
        <View testID="container">
          <Text accessibilityRole="link">Not a link</Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.some((v) => v.problem.includes("'link' role"))).toBe(true);
    });

    it('passes when text with link role is clickable', () => {
      render(
        <View testID="container">
          <Text accessibilityRole="link" onPress={() => {}}>
            A link
          </Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('no-empty-text', () => {
    it('fails when text has no content', () => {
      render(
        <View testID="container">
          <Text>{''}</Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.some((v) => v.problem.includes("doesn't contain text"))).toBe(true);
    });

    it('passes when text has content', () => {
      render(
        <View testID="container">
          <Text>Hello</Text>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations).toHaveLength(0);
    });
  });

  describe('hidden components', () => {
    it('skips hidden components with accessibilityElementsHidden', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityElementsHidden>
            <View />
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      // The button has accessibility issues (no role, no label) but should be skipped because hidden
      expect(
        violations.filter((v) => v.problem.includes("user hasn't been informed")),
      ).toHaveLength(0);
    });

    it('skips components with importantForAccessibility=no-hide-descendants', () => {
      render(
        <View testID="container">
          <TouchableOpacity importantForAccessibility="no-hide-descendants">
            <View />
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(
        violations.filter((v) => v.problem.includes("user hasn't been informed")),
      ).toHaveLength(0);
    });
  });

  describe('nested components', () => {
    it('checks nested pressables', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityLabel="Button 1" accessibilityRole="button">
            <Text>Button 1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Button 2</Text>
          </TouchableOpacity>
        </View>,
      );
      const violations = checkAccessibility(screen.getByTestId('container'));
      expect(violations.length).toBeGreaterThan(0);
      expect(violations.some((v) => v.problem.includes("user hasn't been informed"))).toBe(true);
    });
  });

  describe('toBeAccessible matcher', () => {
    it('passes for accessible component', () => {
      render(
        <View testID="container">
          <TouchableOpacity accessibilityLabel="Submit" accessibilityRole="button">
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>,
      );
      expect(screen.getByTestId('container')).toBeAccessible();
    });

    it('fails for inaccessible component', () => {
      render(
        <View testID="container">
          <TouchableOpacity>
            <View />
          </TouchableOpacity>
        </View>,
      );
      expect(() => {
        expect(screen.getByTestId('container')).toBeAccessible();
      }).toThrow();
    });
  });
});
