const shouldAddToParentTypes = require('../shouldAddToParentTypes');

function doc(displayName: string) {
  return { displayName };
}

function prop(name: string, parent: string, required = false) {
  return { name, parent, required };
}

describe('shouldAddToParentTypes', () => {
  describe('required props are always kept in the props table', () => {
    it('returns false for required props even with parent type match', () => {
      expect(shouldAddToParentTypes(doc('Button'), prop('label', 'HTMLAttributes', true))).toBe(
        false,
      );
    });
  });

  describe('always-included prop names', () => {
    const alwaysIncluded = ['onChange', 'onPress', 'testID', 'type', 'value'];

    it.each(alwaysIncluded)('keeps %s in props table regardless of parent', (name) => {
      expect(shouldAddToParentTypes(doc('Input'), prop(name, 'HTMLAttributes'))).toBe(false);
    });
  });

  describe('layout parent types', () => {
    const layoutParents = [
      'BorderedStyles',
      'BoxBaseProps',
      'DimensionStyles',
      'FlexProps',
      'PositionStyles',
      'SpacingProps',
    ];

    it.each(layoutParents)('moves %s props to parent types for non-Box components', (parent) => {
      expect(shouldAddToParentTypes(doc('VStack'), prop('gap', parent))).toBe(true);
    });

    it.each(layoutParents)('keeps %s props in table for Box component', (parent) => {
      expect(shouldAddToParentTypes(doc('Box'), prop('gap', parent))).toBe(false);
    });
  });

  describe('pressable parent types', () => {
    const pressableParents = ['LinkableProps', 'PressableProps', 'Touchable'];

    it.each(pressableParents)(
      'moves %s props to parent types for non-Pressable components',
      (parent) => {
        expect(shouldAddToParentTypes(doc('Button'), prop('onPressIn', parent))).toBe(true);
      },
    );

    it.each(pressableParents)('keeps %s props in table for Pressable component', (parent) => {
      expect(shouldAddToParentTypes(doc('Pressable'), prop('onPressIn', parent))).toBe(false);
    });
  });

  describe('always-moved parent types', () => {
    const alwaysMoved = [
      'AccessibilityProps',
      'AriaAttributes',
      'ComponentEventHandlerProps',
      'DOMAttributes',
      'GestureResponderHandlers',
      'HTMLAttributes',
      'TVViewProps',
      'ViewProps',
    ];

    it.each(alwaysMoved)('moves %s props to parent types', (parent) => {
      expect(shouldAddToParentTypes(doc('Button'), prop('aria-label', parent))).toBe(true);
    });
  });

  describe('custom component props stay in table', () => {
    it('returns false for non-matching parent types', () => {
      expect(shouldAddToParentTypes(doc('Button'), prop('variant', 'ButtonProps'))).toBe(false);
    });

    it('returns false for component-specific parents', () => {
      expect(shouldAddToParentTypes(doc('Avatar'), prop('size', 'AvatarBaseProps'))).toBe(false);
    });
  });
});
