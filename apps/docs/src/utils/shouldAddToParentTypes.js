/**
 * Used in docgen plugin
 *
 * Automatically excluding all types which come from node_modules can be problematic especially
 * since we extend core functionality from html and react-native.
 *
 * The docgen plugin provides flexibility with what types we want to include in main props table versus
 * what types we want to pull out into sharedParentTypes, which has an "Extends from ...." text link UI.
 *
 */
function shouldAddToParentTypes(doc, prop) {
  /** Always include in props table if it's required */
  if (prop.required) return false;
  /** Always include these props regardless if they are native platform props. */
  if (['onChange', 'onPress', 'testID', 'type', 'value'].includes(prop.name)) return false;

  /** Pull out props that come from these parentTypes
   * Since Box includes all of these we make expecption to display for that component,
   * but this would mean it wouldn't show redudant info for VStack and HStack and instead
   * say it extends from BoxBaseProps with modal to view the relevant props.
   */
  if (
    [
      'BorderedStyles',
      'BoxBaseProps',
      'DimensionStyles',
      'FlexProps',
      'PositionStyles',
      'SpacingProps',
    ].includes(prop.parent) &&
    doc.displayName !== 'Box'
  ) {
    return true;
  }

  /** Pull out props that come from these parentTypes except for Pressable. */
  if (
    ['LinkableProps', 'PressableProps', 'Touchable'].includes(prop.parent) &&
    doc.displayName !== 'Pressable'
  ) {
    return true;
  }

  if (
    [
      'AccessibilityProps',
      'AriaAttributes',
      'ComponentEventHandlerProps',
      'DOMAttributes',
      'GestureResponderHandlers',
      'HTMLAttributes',
      'TVViewProps',
      'ViewProps',
    ].includes(prop.parent)
  ) {
    return true;
  }
  return false;
}

module.exports = shouldAddToParentTypes;
