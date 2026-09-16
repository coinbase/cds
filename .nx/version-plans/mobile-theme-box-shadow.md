---
cds: minor
---

Feat: mobile shadow tokens can now be authored with React Native's cross-platform `boxShadow` view style instead of the iOS-only `shadowColor`/`shadowOffset`/`shadowOpacity`/`shadowRadius` props.

A token uses one form or the other, never both. The built-in themes continue to ship the legacy form, and the legacy props are now deprecated with an expected removal in v11.

```tsx
shadow: {
  elevation1: { boxShadow: [{ offsetX: 0, offsetY: 8, blurRadius: 24, color: 'rgba(0, 0, 0, 0.12)' }] },
  elevation2: { boxShadow: [{ offsetX: 0, offsetY: 8, blurRadius: 48, color: 'rgba(0, 0, 0, 0.12)' }] },
}
```

`boxShadow` requires React Native 0.76+ on the New Architecture. Only the array form is accepted; the CSS string shorthand is not. A `blurRadius` is roughly twice the `shadowRadius` it replaces, because React Native renders `boxShadow` on iOS as [`shadowRadius = blurRadius / 2`](https://github.com/facebook/react-native/blob/v0.81.5/packages/react-native/React/Fabric/Utils/RCTBoxShadow.mm#L67).

On Android, a `boxShadow` token renders on its own, so `Box` no longer emits a native `elevation` alongside it — doing so drew a second, offset shadow. Legacy `shadow*` tokens only render on iOS, so `Box` still emits the native `elevation` (`2` for level 1, `8` for level 2) for them, and will until the legacy props are removed in v11. Native `elevation` does not affect draw order in React Native; use document order or `zIndex` to control stacking.

Relatedly, `elevation` has been removed from the `StyleProps` type. It was passed straight through as a raw view style, so `<Text elevation={1}>` emitted a native Android `elevation: 1` and no shadow on either platform. `Box` declares `elevation` itself and is unaffected. `Text` keeps the prop for type compatibility, now marked deprecated and swallowed — it has no effect, and is expected to be removed in v11. Wrap text in an elevated `Box` instead.

Two things to be aware of:

- The `Shadow` token type is now a union, so `keyof` over it gains a `boxShadow` key. A `Record<keyof Shadow, T>` needs a fifth entry. Reading individual fields off a token (`theme.shadow.elevation1.shadowRadius`) is unaffected.
- The `BoxShadowStyle` type inherits a known React Native typing bug in which `BoxShadowValue.color` is declared `string` (should be `ColorValue`) and `blurRadius` is declared `ColorValue | number` (should be `number | string`). It is fixed upstream in React Native 0.84.
