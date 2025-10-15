# Skia Quick Start Guide

## 🎉 What's Been Set Up

@shopify/react-native-skia v1.12.4 has been integrated into the mobile-visualization package! Here's what's ready to use:

### ✅ Installed Dependencies

- ✅ `@shopify/react-native-skia@1.12.4` added to:
  - `packages/mobile-visualization/package.json` (peerDependencies + devDependencies)
  - `apps/mobile-app/package.json` (dependencies)
- ✅ Dependencies installed with `yarn install`

### ✅ Sample Components Created

Three new files to help you get started:

1. **`SkiaCartesianChart.tsx`** - Drop-in replacement for CartesianChart using Canvas instead of Svg
2. **`SkiaPath.tsx`** - Basic path component using Skia (work in progress)
3. **`SkiaChart.stories.tsx`** - Complete examples showing Skia in action

### ✅ Mobile App Route Added

The Skia examples are now accessible in your mobile app at the **"SkiaChart"** route!

## 🚀 How to Test It

### 1. Run the Mobile App

```bash
cd /Users/huntercopp/sources/cds
yarn nx run mobile-app:start
```

Then in another terminal:

```bash
yarn nx run mobile-app:ios
# or
yarn nx run mobile-app:android
```

### 2. Navigate to SkiaChart

In the mobile app, search for or navigate to **"SkiaChart"** in the component list.

You'll see several examples:

- 🚀 **SVG vs Skia Comparison** - Visual comparison
- **Basic Skia Line** - Simple line chart
- **Skia Line with Area** - Area chart
- **Skia Line with Points** - Points on a line
- **Multiple Skia Lines** - Multiple series
- **Performance Demo** - 100 data points
- **Raw Skia Primitives** - Basic shapes

## 📚 Example Usage

Here's a simple example from the stories:

```tsx
import { SkiaCartesianChart } from '@coinbase/cds-mobile-visualization/chart';
import { Circle, Path, Skia } from '@shopify/react-native-skia';

const MyChart = () => {
  const series = [
    {
      id: 'data',
      data: [65, 78, 45, 88, 92, 73, 69],
      color: '#3b82f6',
    },
  ];

  return (
    <SkiaCartesianChart height={200} series={series}>
      {/* Your Skia components here */}
      <SkiaLine seriesId="data" />
    </SkiaCartesianChart>
  );
};
```

## 📖 Key Differences: SVG vs Skia

### Container

```tsx
// SVG (Old)
<Svg width={width} height={height}>
  {children}
</Svg>

// Skia (New)
<Canvas style={{ width, height }}>
  {children}
</Canvas>
```

### Path Rendering

```tsx
// SVG (Old)
<Path d={pathData} fill="blue" stroke="red" strokeWidth={2} />;

// Skia (New)
const path = Skia.Path.MakeFromSVGString(pathData);
<Path path={path} color="red" strokeWidth={2} style="stroke" />;
```

### Basic Shapes

```tsx
// SVG (Old)
<Circle cx={50} cy={50} r={20} fill="red" />
<Rect x={0} y={0} width={100} height={50} fill="blue" />

// Skia (New)
<Circle cx={50} cy={50} r={20} color="red" />
<Rect x={0} y={0} width={100} height={50} color="blue" />
```

## 📝 Files Created

1. **`/packages/mobile-visualization/src/chart/SkiaCartesianChart.tsx`**
   - Main chart container using Skia Canvas
   - Same API as CartesianChart but renders with Skia

2. **`/packages/mobile-visualization/src/chart/SkiaPath.tsx`**
   - Basic path component (needs refinement)
   - Shows how to handle animations with Skia

3. **`/packages/mobile-visualization/src/chart/__stories__/SkiaChart.stories.tsx`**
   - Complete working examples
   - Helper components (SkiaLine, SkiaArea, SkiaPoints)
   - Performance demos

4. **`/packages/mobile-visualization/SKIA_MIGRATION.md`**
   - Comprehensive migration guide
   - API comparisons
   - Best practices

5. **`/apps/mobile-app/src/routes.ts`**
   - Added SkiaChart route

## 🎯 Next Steps

### Immediate Actions

1. **Test the Examples**: Run the app and check out the SkiaChart examples
2. **Compare Performance**: Notice the difference between SVG and Skia rendering
3. **Explore the Code**: Check out `SkiaChart.stories.tsx` for working implementations

### Short-term Goals

1. **Refine Components**: The example components (SkiaLine, SkiaArea, SkiaPoints) are simple implementations. You can enhance them with:
   - Better animation support
   - Gradient fills
   - Interactive features
   - Clipping and masking

2. **Migrate Existing Components**: Start with simpler components:
   - `SolidLine.tsx` → `SkiaSolidLine.tsx`
   - `GradientLine.tsx` → `SkiaGradientLine.tsx`
   - `Point.tsx` → `SkiaPoint.tsx`

3. **Add Advanced Features**:
   - Skia gradients using shaders
   - Custom animations with `useValue()` and `runTiming()`
   - Blur effects and shadows
   - Clipping paths for better performance

### Long-term Vision

1. Make Skia the default rendering engine for new chart components
2. Keep SVG for Sparkline (legacy compatibility)
3. Provide both options for users during transition

## 🐛 Troubleshooting

### Build Issues

If you encounter build issues with Skia:

**iOS:**

```bash
cd apps/mobile-app/ios
pod install
cd ..
yarn nx run mobile-app:ios
```

**Android:**

```bash
cd apps/mobile-app/android
./gradlew clean
cd ../..
yarn nx run mobile-app:android
```

### Import Errors

Make sure you're importing from the right packages:

```tsx
// Skia
import { Canvas, Path, Circle, Rect } from '@shopify/react-native-skia';

// Your components
import { SkiaCartesianChart } from '@coinbase/cds-mobile-visualization/chart';
```

### Performance Testing

To measure performance improvements:

1. Open React DevTools Profiler
2. Record while interacting with charts
3. Compare SVG vs Skia render times
4. Check frame rates (should be 60fps with Skia)

## 📚 Resources

- [Skia Documentation](https://shopify.github.io/react-native-skia/)
- [Skia Examples](https://shopify.github.io/react-native-skia/docs/getting-started/hello-world)
- [Migration Guide](./SKIA_MIGRATION.md)
- [Performance Best Practices](https://shopify.github.io/react-native-skia/docs/animations/performance)

## 💡 Tips

1. **Use `useMemo` liberally** - Path creation is expensive
2. **Batch updates** - Group multiple Skia operations together
3. **Use Skia animations** - They run on the UI thread, not JS thread
4. **Profile first** - Only optimize what needs optimizing
5. **Start simple** - Get basic rendering working before adding animations

## 🤝 Need Help?

Check out these example components in `SkiaChart.stories.tsx`:

- `SkiaLine` - Simple line rendering
- `SkiaArea` - Area fill implementation
- `SkiaPoints` - Circle rendering at data points

These are fully functional examples you can use as templates for your own components!

---

Happy coding! 🎉 Let me know if you need help with anything else.
