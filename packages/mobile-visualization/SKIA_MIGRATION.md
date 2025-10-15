# Skia Migration Guide

This guide helps you migrate chart components from `react-native-svg` to `@shopify/react-native-skia`.

## Overview

We're using **@shopify/react-native-skia v1.12.4** for new chart components while keeping `react-native-svg` for legacy Sparkline components.

### Why Skia?

- **Better Performance**: Hardware-accelerated rendering
- **Smoother Animations**: Native 60fps animations
- **Lower Memory**: More efficient memory usage
- **Better Battery**: Less CPU usage on animations

## Installation

Already completed! The package is installed in:

- `packages/mobile-visualization/package.json` (peerDependencies + devDependencies)
- `apps/mobile-app/package.json` (dependencies)

## API Comparison

### Container Component

**SVG (Old):**

```tsx
import { Svg } from 'react-native-svg';

<Svg width={width} height={height}>
  {children}
</Svg>;
```

**Skia (New):**

```tsx
import { Canvas } from '@shopify/react-native-skia';

<Canvas style={{ width, height }}>{children}</Canvas>;
```

### Path Component

**SVG (Old):**

```tsx
import { Path } from 'react-native-svg';

<Path
  d={pathData}
  fill="blue"
  stroke="red"
  strokeWidth={2}
  strokeOpacity={0.8}
  fillOpacity={0.5}
/>;
```

**Skia (New):**

```tsx
import { Path, Skia } from '@shopify/react-native-skia';

const path = Skia.Path.MakeFromSVGString(pathData);

<Path
  path={path}
  color="blue" // For fill
  opacity={0.5}
  style="fill"
>
  {/* Nested Path for stroke */}
  <Path path={path} color="red" strokeWidth={2} opacity={0.8} style="stroke" />
</Path>;
```

### Rectangle

**SVG (Old):**

```tsx
import { Rect } from 'react-native-svg';

<Rect x={0} y={0} width={100} height={50} fill="blue" />;
```

**Skia (New):**

```tsx
import { Rect } from '@shopify/react-native-skia';

<Rect x={0} y={0} width={100} height={50} color="blue" />;
```

### Circle

**SVG (Old):**

```tsx
import { Circle } from 'react-native-svg';

<Circle cx={50} cy={50} r={20} fill="red" />;
```

**Skia (New):**

```tsx
import { Circle } from '@shopify/react-native-skia';

<Circle cx={50} cy={50} r={20} color="red" />;
```

### Grouping

**SVG (Old):**

```tsx
import { G } from 'react-native-svg';

<G opacity={0.5}>{children}</G>;
```

**Skia (New):**

```tsx
import { Group } from '@shopify/react-native-skia';

<Group opacity={0.5}>{children}</Group>;
```

### Gradients

**SVG (Old):**

```tsx
import { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';

<Defs>
  <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
    <Stop offset="0" stopColor="red" />
    <Stop offset="1" stopColor="blue" />
  </LinearGradient>
</Defs>
<Rect fill="url(#grad)" />
```

**Skia (New):**

```tsx
import { Rect, LinearGradient, vec } from '@shopify/react-native-skia';

<Rect x={0} y={0} width={100} height={100}>
  <LinearGradient start={vec(0, 0)} end={vec(0, 100)} colors={['red', 'blue']} />
</Rect>;
```

### Clipping

**SVG (Old):**

```tsx
import { Defs, ClipPath, Rect, Path } from 'react-native-svg';

<Defs>
  <ClipPath id="clip">
    <Rect x={0} y={0} width={100} height={100} />
  </ClipPath>
</Defs>
<Path d={pathData} clipPath="url(#clip)" />
```

**Skia (New):**

```tsx
import { Group, Rect, Path } from '@shopify/react-native-skia';

<Group clip={{ x: 0, y: 0, width: 100, height: 100 }}>
  <Path path={path} />
</Group>;
```

## Animation Differences

### react-native-reanimated with SVG

**SVG (Old):**

```tsx
import Reanimated, { useSharedValue, useAnimatedProps } from 'react-native-reanimated';
import { Path } from 'react-native-svg';

const AnimatedPath = Reanimated.createAnimatedComponent(Path);

const animatedValue = useSharedValue(0);
const animatedProps = useAnimatedProps(() => ({
  strokeDashoffset: animatedValue.value,
}));

<AnimatedPath animatedProps={animatedProps} />;
```

**Skia (New):**

```tsx
import { useValue } from '@shopify/react-native-skia';

const animatedValue = useValue(0);

<Path path={path} strokeDashoffset={animatedValue} />;
```

### Declarative Animation

Skia provides its own animation system:

```tsx
import { useValue, runTiming, Easing } from '@shopify/react-native-skia';
import { useEffect } from 'react';

const progress = useValue(0);

useEffect(() => {
  runTiming(progress, 1, {
    duration: 300,
    easing: Easing.inOut(Easing.ease),
  });
}, []);
```

## Component Migration Checklist

When migrating a component from SVG to Skia:

- [ ] Replace `Svg` container with `Canvas`
- [ ] Update all SVG imports to Skia equivalents
- [ ] Convert `fill` to `color` for fill operations
- [ ] Add `style="fill"` or `style="stroke"` to paths
- [ ] Convert path strings using `Skia.Path.MakeFromSVGString()`
- [ ] Update gradient definitions to use Skia shaders
- [ ] Replace `ClipPath` with `Group` clip prop
- [ ] Update animations to use Skia's animation system or `useValue`
- [ ] Test on both iOS and Android
- [ ] Verify performance improvements

## Example Migration: SolidLine

### Before (SVG):

```tsx
import { memo } from 'react';
import { Path } from '../Path';

export const SolidLine = memo(({ stroke, strokeWidth = 2, ...props }) => {
  return (
    <Path
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
});
```

### After (Skia):

```tsx
import { memo, useMemo } from 'react';
import { Path, Skia } from '@shopify/react-native-skia';

export const SkiaSolidLine = memo(({ d, stroke, strokeWidth = 2, ...props }) => {
  const path = useMemo(() => {
    return d ? Skia.Path.MakeFromSVGString(d) : null;
  }, [d]);

  if (!path) return null;

  return (
    <Path
      path={path}
      color={stroke}
      strokeWidth={strokeWidth}
      strokeCap="round"
      strokeJoin="round"
      style="stroke"
      {...props}
    />
  );
});
```

## File Organization

Keep Skia components separate from SVG components during migration:

```
chart/
├── CartesianChart.tsx          # SVG version (existing)
├── SkiaCartesianChart.tsx      # Skia version (new)
├── Path.tsx                    # SVG version
├── SkiaPath.tsx                # Skia version
├── line/
│   ├── SolidLine.tsx          # SVG version
│   └── SkiaSolidLine.tsx      # Skia version
```

Once fully migrated and tested, you can:

1. Remove SVG versions
2. Rename Skia versions (remove "Skia" prefix)
3. Update all imports

## Testing Strategy

1. **Create parallel components**: Build Skia versions alongside SVG versions
2. **Visual comparison**: Create stories showing both side-by-side
3. **Performance testing**: Use React DevTools Profiler to compare
4. **Device testing**: Test on both iOS and Android devices
5. **Edge cases**: Test with complex paths, animations, and interactions

## Common Issues & Solutions

### Issue: Path not rendering

**Problem**: Path appears empty or invisible

**Solution**: Ensure you're creating the path correctly:

```tsx
const path = Skia.Path.MakeFromSVGString(pathData);
// Check if path is valid
if (!path) {
  console.warn('Invalid path data:', pathData);
  return null;
}
```

### Issue: Colors not working

**Problem**: Colors appear wrong or not visible

**Solution**:

- Use valid CSS color strings or hex values
- For opacity, either use rgba() or the opacity prop
- Ensure `style` prop is set correctly ("fill" or "stroke")

### Issue: Performance worse than SVG

**Problem**: Skia version is slower

**Solution**:

- Use `useMemo` for path creation
- Avoid recreating paths on every render
- Use Skia's animation system instead of react-native-reanimated
- Batch multiple draw operations when possible

### Issue: Animations janky

**Problem**: Animations not smooth

**Solution**:

- Use Skia's `useValue` and `runTiming` for animations
- Avoid JS-based animations; let Skia handle them natively
- Consider using `useComputedValue` for derived animations

## Resources

- [Skia Documentation](https://shopify.github.io/react-native-skia/)
- [Skia Examples](https://shopify.github.io/react-native-skia/docs/getting-started/hello-world)
- [Skia Animation Guide](https://shopify.github.io/react-native-skia/docs/animations/animations)
- [Performance Best Practices](https://shopify.github.io/react-native-skia/docs/animations/performance)

## Next Steps

1. Start with simple components (e.g., `SolidLine`, `Point`)
2. Create Skia versions with "Skia" prefix
3. Test thoroughly in stories
4. Gradually migrate more complex components
5. Once confident, switch default exports to Skia versions
6. Remove SVG versions (keeping Sparkline components)
