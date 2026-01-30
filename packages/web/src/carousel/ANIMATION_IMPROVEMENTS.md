# Carousel Animation Improvements Discussion

## Current State

### Web (framer-motion)

**Page Changes (programmatic navigation):**

```ts
animate(carouselScrollX, -targetOffset, { type: 'tween', duration: 0.25 });
```

- Time-based tween animation
- Fixed 250ms duration
- Linear/eased interpolation, not physics-based

**Dragging:**

```ts
dragTransition={{
  power: drag === 'free' ? 0.5 : 0.125,
  timeConstant: drag !== 'free' ? 125 : undefined,
  modifyTarget: handleDragTransition,
}}
```

- Uses framer-motion's inertia system
- `power`: How much velocity affects the final position (momentum multiplier)
- `timeConstant`: Controls deceleration rate (lower = faster stop)

---

### Mobile (react-spring)

**Page Changes (programmatic navigation):**

```ts
const animationConfig = { tension: 200, friction: 25 };
animationApi.x.start({ to: targetOffset, config: animationConfig });
```

- Spring/physics-based animation
- Uses tension and friction for natural feel
- Duration is dynamic based on distance

**Dragging:**

```ts
const power = drag === 'free' ? 0.25 : 0.125;
const momentumDistance = velocityX * power;
// ... then spring animation to final position
animationApi.x.start({ to: finalOffset, config: animationConfig });
```

- Manual momentum calculation
- Same spring config for settling animation

---

## Inconsistencies

| Aspect                     | Web                | Mobile           |
| -------------------------- | ------------------ | ---------------- |
| Page change animation      | Time-based (tween) | Spring-based     |
| Page change duration       | Fixed 250ms        | Dynamic (spring) |
| Drag momentum power (free) | 0.5                | 0.25             |
| Drag momentum power (snap) | 0.125              | 0.125            |
| Settling animation         | Inertia-based      | Spring-based     |

---

## Proposed Improvements

### 1. Unify Page Change Animation to Spring-Based

Both platforms should use spring-based animation for page changes to provide:

- Consistent feel across platforms
- Natural physics-based motion
- Dynamic duration based on distance

**Reference values from CDS Visualization:**

```ts
// packages/web-visualization/src/chart/utils/transition.ts
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
  mass: 4,
};

// packages/mobile-visualization/src/chart/utils/transition.ts
export const defaultTransition: Transition = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
};
```

**Proposed carousel spring config (needs tuning):**

For carousel, we likely want a snappier feel than the visualization charts:

```ts
// Option A: Snappy (similar to current mobile)
const carouselSpring = {
  type: 'spring',
  stiffness: 400, // Higher = faster
  damping: 30, // Higher = less oscillation
};

// Option B: Match visualization (smoother, more deliberate)
const carouselSpring = {
  type: 'spring',
  stiffness: 900,
  damping: 120,
  mass: 4, // web only - react-spring uses tension/friction
};

// Option C: Current mobile config converted
// tension: 200, friction: 25 ≈ stiffness: 200, damping: 25
const carouselSpring = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};
```

### 2. Unify Drag Momentum Power

Currently web uses `0.5` for free drag while mobile uses `0.25`. This makes web feel more "slippery".

**Recommendation:** Use consistent values across platforms:

- Free drag: `0.25` (current mobile value)
- Snap drag: `0.125` (already consistent)

### 3. Web Implementation Changes

Replace the tween animation with spring:

```ts
// Before
animate(carouselScrollX, -targetOffset, { type: 'tween', duration: 0.25 });

// After
animate(carouselScrollX, -targetOffset, {
  type: 'spring',
  stiffness: 400,
  damping: 30,
});
```

### 4. Consider Shared Animation Config

Create a shared animation config in `@coinbase/cds-common`:

```ts
// packages/common/src/carousel/carouselAnimation.ts
export const carouselSpringConfig = {
  // For framer-motion (web)
  web: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 30,
  },
  // For react-spring (mobile)
  mobile: {
    tension: 400,
    friction: 30,
  },
};

export const carouselDragConfig = {
  freePower: 0.25,
  snapPower: 0.125,
};
```

---

## Testing Considerations

1. Test with various content sizes (small items, full-width items)
2. Test with different numbers of pages
3. Test drag gestures at various velocities
4. Test on low-end devices for performance
5. Compare feel between platforms side-by-side
6. Test with looping enabled/disabled
7. Test autoplay transitions

---

## Questions to Resolve

1. Should the spring config be tuned for different `snapMode` values (item vs page)?
2. Do we want the pagination dot animation to match the carousel animation?
3. Should we expose animation config as a prop for advanced customization?
4. What's the desired "feel" - snappy or smooth/deliberate?

---

## Next Steps

1. [ ] Decide on target spring values through prototyping
2. [ ] Update web `goToPage` to use spring animation
3. [ ] Unify drag momentum power values
4. [ ] Consider shared config in common package
5. [ ] Test across platforms and gather feedback
