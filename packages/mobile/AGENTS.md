# CDS Mobile Package Guidelines

Mobile-specific patterns for `@coinbase/cds-mobile`.

## Styling with StyleSheet

Use `StyleSheet.create` for static styles and `useTheme()` for dynamic values:

```tsx
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: { position: 'relative', width: '100%' },
});

// Dynamic styles via theme hook
const theme = useTheme();
const dynamicStyle = {
  backgroundColor: theme.color.bgPrimary,
  padding: theme.space[2],
};

<View style={[styles.container, dynamicStyle, style]} />;
```

### Overriding styles

Mobile components should expose a `style` and `styles` props. `styles` can be used for granular overrides on child elements within the component.
`styles` should always be in the `*Props` type object, NEVER `*BaseProps`.

**Example:**

```tsx
type ComponentProps = ComponentBaseProps & {
  styles?: {
    root?: StyleProp<ViewStyle>;
    label?: StyleProp<TextStyle>;
  };
};
```

- While merging root styles give priority to `styles.[ELEMENT_NAME]` over the `style` prop
- Compose styles within the component with array syntax and memoize:

```tsx
const containerStyle = useMemo(
  () => [styles.base, { height }, styleProp?.container],
  [height, styleProp?.container],
);
```

## Animation

### React Native Reanimated

```tsx
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const opacity = useSharedValue(0);
const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
  transform: [{ translateY: withTiming(opacity.value * -8) }],
}));

<Animated.View style={animatedStyle} />;
```

We DO NOT use React-Spring anymore for animations on mobile.

## Gesture Handling

Use `react-native-gesture-handler`:

```tsx
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const panGesture = useMemo(
  () =>
    Gesture.Pan()
      .onStart(() => {
        /* ... */
      })
      .onUpdate(({ translationX }) => {
        /* ... */
      })
      .onEnd(({ translationX, velocityX }) => {
        /* ... */
      })
      .withTestId(testID)
      .runOnJS(true),
  [dependencies],
);

<GestureDetector gesture={panGesture}>
  <Animated.View>{/* ... */}</Animated.View>
</GestureDetector>;
```

## Layout Measurement

Use `onLayout` callback instead of ResizeObserver:

```tsx
const [size, onLayout] = useLayout();
<View onLayout={onLayout} />

// Or inline
<View onLayout={(e) => setHeight(e.nativeEvent.layout.height)} />
```

## Accessibility

Use React Native accessibility props:

```tsx
<View
  accessible
  accessibilityRole="adjustable"
  accessibilityLabel="Product carousel"
  accessibilityLiveRegion="polite"
>
  <Pressable
    accessibilityState={{ selected: isActive, disabled }}
    accessibilityActions={[{ name: 'activate' }]}
    onAccessibilityAction={handleAccessibilityAction}
  />
</View>
```

### Screen Reader Content

```tsx
// Hide visual content from screen readers
<View accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
  {/* Animated/visual content */}
</View>

// Provide accessible alternative
<Text
  importantForAccessibility="yes"
  accessibilityLiveRegion="polite"
  style={{ color: 'transparent', position: 'absolute' }}
>
  {accessibleLabel}
</Text>
```

## Native Module Integration

Example with date picker:

```tsx
import NativeDatePicker from 'react-native-date-picker';

<NativeDatePicker
  modal
  open={showPicker}
  date={selectedDate}
  mode="date"
  onConfirm={handleConfirm}
  onCancel={handleCancel}
/>;
```

## Reference Components

- **SlideButton**: gesture handling, spring animations, accessibility actions
- **RollingNumber**: Reanimated, measurement patterns, screen reader content
- **Select** (alpha/): controlled/uncontrolled, Drawer integration
- **Stepper**: direction-based defaults, shared logic from cds-common
