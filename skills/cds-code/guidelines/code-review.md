# CDS Code Review

---

## Clarify scope

A valid review scope is something specific and bounded: a named feature, a page or screen, a surface area of the app, or an explicit set of files (up to 50). A review cannot be performed against open-ended requests like "the whole app".

**If no scope was provided** — ask: _"What should I review? Please provide a specific feature, page, or set of files."_ Do not proceed until the user answers.

**If the scope is too broad or vague** (e.g. "the whole app", "everything", "all our screens") — ask again for something specific. Explain that the review needs a bounded target to be useful. If they wish to review a broader scope, suggest they use an agent orchestration strategy to break the review up across multiple agents.

**If the user repeatedly insists on an unreasonable scope** — end the workflow. Example: _"I can't perform an effective review at that scale in a single pass. If you'd like to scope it to a specific feature or set of files, I'm happy to help."_

**If the scope is specific but exceeds 50 files** — tell the user the count and ask them to narrow it before proceeding.

---

## Step 1: Preparation

Before reviewing any files:

1. **Detect the platform** — Run `scripts/discover-cds-packages.sh` to confirm web vs. mobile and get the valid CDS import paths. Some rules apply to only one platform.

---

## Step 2: Default Exclusions

Unless the user asks otherwise, skip files that are not user-facing production UI code. Use judgment — the goal is to focus on code that actually ships to users. Common categories to skip:

- **Test files** — unit tests, integration tests, fixtures, mocks
- **Dev tooling** — Storybook stories, debug screens, playground/sandbox files
- **Generated or non-code assets** — SVG files, auto-generated type definitions, build output
- **Third-party or vendor code** — anything not owned by the team being audited

When in doubt about whether a file should be included, include it and let the findings speak for themselves.

---

## Step 3: Apply the Rules

Work through each file in scope and check it against the rules below. Focus on recurring patterns — if the same violation appears N times across a file, report it once with a note of how many occurrences there are rather than listing every line.

Rules that require human judgment ("Review wrapper components that shadow CDS primitives", "Preserve CDS component accessibility") should be flagged as findings for the user to inspect rather than auto-suggested for fix.

For "No shadow design systems", flag the source module once and note its consumer count rather than reporting every import site.

---

## Step 4: Output Format

Group findings by file. Use the following format:

```
src/screens/HomeScreen.tsx
  23:8   style-props       Use `padding={2}` instead of `style={{ padding: 16 }}`
  67:15  hardcoded-colors  Replace '#1652F0' with a semantic color token (e.g. `bgPrimary`)

src/components/Card.tsx
  10:1   layout-primitives  Use `<Box>` instead of `<div style={{ ... }}>`
  44:5   style-props        Move `gap: 8` to the `gap={1}` prop  (×3 occurrences in this file)
```

Column format: `line:col   rule-name   message`

If no issues are found in a file, omit it from the output.

End every review with a structured summary:

```markdown
## Audit Summary

**Files reviewed:** 12  
**Files with issues:** 4

| File                           | Issues |
| ------------------------------ | ------ |
| src/screens/HomeScreen.tsx     | 2      |
| src/components/Card.tsx        | 4      |
| src/utils/constants.ts         | 1      |
| src/screens/SettingsScreen.tsx | 3      |

**Issue breakdown by rule:**

- style-props: 6 across 3 files
- hardcoded-colors: 3 across 2 files
- shadow-design-system: 1 — `src/utils/constants.ts` (migration required)
```

For findings that require migration work (e.g. shadow design systems, invalid import paths), note "migration required" and give high-level direction rather than generating full fix code during the review pass.

---

# Review Rules

---

## Prefer CDS style props over manual styling

**Applies to:** web + mobile

CDS components expose style props (`padding`, `gap`, `background`, `color`, `font`, etc.) that map directly to design tokens. Using `style={{}}`, `StyleSheet.create()`, or `styled()` template literals for properties that have a CDS prop equivalent bypasses the token system, breaks theming, and on mobile can silently drop the CoinbaseSans font family.

**Properties that always have a CDS prop equivalent:**
`padding*`, `margin*`, `gap`, `rowGap`, `columnGap`, `background`, `backgroundColor`, `color`, `borderColor`, `borderRadius`, `borderWidth`, `font*`, `lineHeight`, `letterSpacing`, `textAlign`, `textTransform`, `display`, `flexDirection`, `alignItems`, `justifyContent`, `flex*`, `width`, `height`, `min/maxWidth`, `min/maxHeight`, `opacity`

**Detect:**

- `style={{ <any of the above> }}` on a CDS component
- `StyleSheet.create({ key: { <any of the above>: <literal> } })` (mobile)
- `styled(CdsComponent)` template literals containing any of the above CSS properties

**Bad:**

```tsx
<Box style={{ padding: 16, gap: 8, backgroundColor: '#f5f5f5' }} />
<Text style={{ fontSize: 12, fontWeight: '500' }} color="fgMuted">…</Text>
<VStack style={{ paddingHorizontal: 8 }} alignSelf="center" gap={2}>…</VStack>

const styles = StyleSheet.create({ container: { padding: 16, backgroundColor: '#fff' } });

const Trigger = styled(Box)(() => css`
  display: flex;
  column-gap: 4px;
  padding-bottom: 4px;
`);
```

**Good:**

```tsx
<Box padding={2} gap={1} background="bgAlternate" />
<Text font="caption" color="fgMuted">…</Text>
<VStack paddingX={1} alignSelf="center" gap={2}>…</VStack>

// StyleSheet OK when using theme values:
const styles = StyleSheet.create({ container: { padding: theme.space[2] } });

// styled() OK for properties without a CDS prop (cursor, transform, etc.):
const Trigger = styled(Box)(() => css`
  border-bottom: 1px dashed var(--color-bgLine);
  cursor: pointer;
`);
<Trigger gap={1} paddingBottom={1} background="bgAlternate">…</Trigger>
```

**Skip:** Properties with no CDS prop equivalent (`cursor`, `transform`, `userSelect`, `overflow`, `pointerEvents`, exact pixel widths for designer-pinned layouts) are legitimate uses of `style`.

---

## Use CDS layout components over raw HTML/RN primitives

**Applies to:** web + mobile

Raw `<div>`/`<span>` (web) and `<View>` (mobile) bypass CDS theming, responsive props, and spacing scale. Use `Box`, `VStack`, or `HStack` instead.

**Detect:**

- Web: `<div style={{…}}>` or `<span style={{…}}>` where the style contains layout/spacing properties
- Mobile: `import { View } from 'react-native'` used as a layout container with a `style` prop

**Bad:**

```tsx
// Web
<div style={{ padding: '16px', display: 'flex', flexDirection: 'column' }}>
  <ChildComponent />
</div>;

// Mobile
import { View } from 'react-native';
return <View style={{ height: 20, padding: 8 }} />;
```

**Good:**

```tsx
// Web
import { Box } from '@cbhq/cds-web/layout';
<Box padding={2} flexDirection="column">
  <ChildComponent />
</Box>;

// Mobile
import { Box } from '@cbhq/cds-mobile/layout';
return <Box height={2.5} padding={1} />;
```

**Skip:** Raw `<View>` is acceptable when passing a ref to a non-CDS third-party component that requires one.

---

## No hardcoded color values

**Applies to:** web + mobile

Hardcoded hex/rgb/hsl literals prevent dark mode and break theming. CDS's type system actively rejects them (`Type '"#0000ff"' is not assignable to type 'Color | undefined'`). Use semantic color tokens (`bgPrimary`, `fgMuted`, `fgPositive`, `fgNegative`, etc.) instead.

**Detect:**

- `#[0-9a-fA-F]{3,8}` or `rgb(a)?\(` or `hsl(a)?\(` literals inside:
  - JSX attribute values (`color="#FF0000"`)
  - Inline `style` objects or `StyleSheet.create()`
  - `styled-components` / Linaria template literals for color-type CSS properties
  - Module-level color constant exports

**Bad:**

```tsx
<Box background="#1652F0" />
<Text style={{ color: '#627EEA' }}>…</Text>
export const color = { positive: '#61CA00', coinbase: '#1652F0' };
```

**Good:**

```tsx
<Box background="bgPrimary" />
<Text color="fgPrimary">…</Text>
// Web CSS:
background: var(--color-bgPrimary);
// Mobile with theme:
backgroundColor: theme.color.bgPositive
```

**Skip:** Test fixtures, embedded third-party widget configs (Google Maps styler, TradingView themes), and SVG illustration files.

---

## No hardcoded spacing or sizing

**Applies to:** web + mobile

CDS uses an 8px base scale. Raw `px`/`em`/`rem` strings (web) or bare numbers (mobile) for spacing properties silently diverge from the scale when designers adjust it. Use CDS props with token values or CSS variables instead.

**Detect:** Inside `style={{}}`, `StyleSheet.create()`, or `styled()` template literals — any of `padding*`, `margin*`, `gap`, `rowGap`, `columnGap`, `borderRadius`, `borderWidth` with a raw numeric or string value (excluding values already sourced from `theme.space[…]` or `var(--space-…)`).

**Bad:**

```tsx
// Web
<Box style={{ padding: 16, borderRadius: 8 }} />
padding-bottom: 24px; // in styled-components

// Mobile
<Icon style={{ marginTop: 6 }} />
style={{ marginHorizontal: -16 }}
```

**Good:**

```tsx
// Web (CDS prop)
<Box padding={2} borderRadius="roundedFull" />
// Web (CSS var)
padding-bottom: var(--space-3);
// Mobile
<Box marginX={-2} /> // -16 → -2 × 8
<Icon marginTop={0.75} /> // 6px → 0.75 × 8
```

**Width and height:** Explicit layout dimensions (`width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`) are a different category from spacing. Specific values like sidebar widths, column sizes, image dimensions, and fixed container heights are often intentional design decisions with no token equivalent — these are acceptable as raw values. Only flag `width`/`height` if it's clearly a spacing intent in disguise (e.g. `width: 16px` as a gap substitute).

**Skip:** 1px dividers, `100%`, `auto`, `100vw`/`100vh`.

---

## No shadow design systems

**Applies to:** web + mobile

A module that re-exports parallel color, spacing, or typography maps is a shadow design system — it defeats theming and makes it impossible to adopt dark mode for anything that consumes it. Flag the file itself rather than every individual consumer.

**Detect:** A `*.ts`/`*.tsx` module that exports:

- A `color`/`colors`/`palette` object whose values are hex/rgb literals AND whose keys overlap with CDS semantic names (`positive`, `negative`, `bg*`, `fg*`) or asset/brand names
- A `size`/`space`/`spacing` object whose values are CSS length strings (`'4px'`, `'8px'`)
- A `font`/`typography` object that maps `display1`/`title1`/`body`/`caption` to `{ fontSize, lineHeight, fontFamily }` tuples

**Bad:**

```ts
export const size = { tiny: '2px', small: '4px', medium: '8px', large: '16px' };
export const color = { coinbase: '#1652F0', positive: '#61CA00', negative: '#FF4949' };
export const typography = {
  body: { fontSize: 14, lineHeight: 20, fontFamily: 'CoinbaseSans-Regular' },
};
```

**Good:**

```tsx
import { useTheme } from '@cbhq/cds-web/system';
const theme = useTheme();
theme.space[2]; // 16px — adapts to scale changes
theme.color.bgPrimary; // adapts to color scheme
```

**Skip:** Truly app-specific tokens that cannot live in CDS (e.g. partner-brand colors for KYC card art) and third-party app directories with their own intentional brand.

---

## Use semantic tokens for color scheme differences

**Applies to:** web + mobile

CDS semantic tokens (`bg`, `bgPrimary`, `fg`, `fgMuted`, etc.) automatically invert in dark mode. Branching on `activeColorScheme === 'dark'` to pick color values is a sign the wrong token is being used — or that no token exists yet.

**Detect:** Any expression `activeColorScheme === 'dark'` (or `=== 'light'`) whose consequent/alternate are color literals or CDS color token strings.

**Bad:**

```tsx
const elementsColor = activeColorScheme === 'dark' ? 'fg' : 'fgInverse';
```

**Good:**

```tsx
// Use the semantic token that already expresses the intent
const elementsColor = 'fg';

// Acceptable: branching for non-color decisions (asset URLs, images)
return activeColorScheme === 'dark' ? darkModeImageUrl : lightModeImageUrl;
```

---

## Use CDS interactive components

**Applies to:** web + mobile

CDS provides `Button`, `IconButton`, and `Pressable` (plus `Interactable` on mobile) with built-in accessibility (`role`, `accessibilityLabel`, focus management, haptic feedback on iOS). Avoid lower-level primitives when a CDS interactive component fits.

**Detect (mobile):** `import { TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'`. Check whether this is already covered by `oxlint.config.ts` or `.eslintrc.js` no-restricted-imports — if so, note "covered by existing lint rule" and skip.

**Detect (web):** A click target built from a raw `<div onClick={…}>` or `<span onClick={…}>` that isn't wrapping a third-party widget.

**Bad:**

```tsx
// Mobile
<TouchableOpacity onPress={handlePress}><Text>Press me</Text></TouchableOpacity>

// Web
<div onClick={handlePress} style={{ cursor: 'pointer' }}>Press me</div>
```

**Good:**

```tsx
// Mobile
import { Pressable } from '@cbhq/cds-mobile/components';
<Pressable onPress={handlePress} accessibilityRole="button" accessibilityLabel="Press me">
  <Text>Press me</Text>
</Pressable>;

// Web
import { Button } from '@cbhq/cds-web/buttons';
<Button onPress={handlePress}>Press me</Button>;
```

---

## Use CDS icons and illustrations

**Applies to:** web + mobile

CDS ships an icon font (`Icon`), spot illustrations (`SpotIcon`, `SpotSquare`, `SpotRectangle`), and elevated product icons (`Pictogram`). Inline `<svg>` and raw `<img>` imports bypass theming and need separate light/dark variants.

**Detect:**

- Inline `<svg …>` elements in `.tsx` files (excluding auto-generated icon components inside the CDS icons package)
- `<img src="…/icons/…">` or `import iconSrc from '…/icons/*.svg'` used with `<img />`
- Custom `*Icon.tsx` components wrapping a raw `<svg>`

**Before flagging:** Run `scripts/discover-cds-icons.mjs` and `scripts/discover-cds-illustrations.mjs` to confirm CDS has an equivalent. Only flag if a CDS replacement exists.

**Bad:**

```tsx
<svg viewBox="0 0 24 24"><path d="…" /></svg>
<img src="/icons/buy.svg" alt="Buy" />
```

**Good:**

```tsx
import { Icon } from '@cbhq/cds-web/media';
import { SpotIcon } from '@cbhq/cds-web/media';
<Icon name="buy" size="m" color="fgMuted" />
<SpotIcon name="buy" />
```

**Skip:** Brand-specific illustration assets with no CDS equivalent.

---

## Preserve CDS component accessibility

**Applies to:** web + mobile

CDS components ship documented accessibility defaults: `Button` has `role="button"` + focus ring; `Modal` has focus trap + Esc-to-close; `Switch` has `role="switch"` + `aria-checked`; `TextInput` has label association. Reimplementing these from scratch with lower-level primitives drops all of this.

**Detect (requires judgment):** A component whose name suggests a CDS primitive (`MyButton`, `CustomModal`, `CustomCheckbox`) that is built from `Pressable`/`Box`/`div` instead of wrapping the CDS primitive AND lacks `role`/`aria-*`/keyboard handlers.

**Action:** Flag for human review rather than auto-suggesting a fix — the right call depends on why the custom component exists.

**Good:**

```tsx
import { Checkbox } from '@cbhq/cds-web/form';
<Checkbox checked={isOn} onChange={setIsOn} label="Subscribe" />;
```

---

## Review wrapper components that shadow CDS primitives

**Applies to:** web + mobile

Custom components like `Heading`, `AppButton`, `CardWrapper`, or `BlueLink` that re-implement a CDS primitive and override token-driven styles are a pattern worth surfacing. They may exist for legitimate reasons (analytics, cross-cutting IDs) or may just strip CDS defaults.

**Detect:** Files in `components/` whose name matches a CDS primitive (`Card`, `Button`, `Heading`, `Col`, `Row`, `Checkbox`) that import and wrap a CDS component with `styled()` or inline overrides of token-driven properties.

**Action:** Flag as a finding — note whether the wrapper adds meaningful value. Suggest either using the CDS primitive directly or moving the cross-cutting concern (analytics, IDs) into a hook or HOC.

---

## Validate CDS import paths

**Applies to:** web + mobile

Made-up import subpaths either fail at compile time or silently resolve through barrel files at the cost of extra bundle size. The discovery script output is the source of truth.

**Detect:** Any `@cbhq/cds-*` (or project-equivalent scope) import whose subpath is not in the package's `exports` map. Run `scripts/discover-cds-packages.sh` to get the authoritative list of valid exports.

**Common mistakes:**

- `@cbhq/cds-web/layout/Box` — should be `@cbhq/cds-web/layout`
- `@cbhq/cds-web/buttons/Button` — should be `@cbhq/cds-web/buttons`
- Using a hardcoded scope (`@cbhq/`) when the project uses a different one

---

## No deprecated CDS components or hooks

**Applies to:** web + mobile

Importing a deprecated CDS export means relying on something that may be removed in a future major version. Deprecated exports also typically have a better-supported replacement that should be preferred.

**Detect:**

- Any import from a CDS package of a named export marked `@deprecated` in its TypeScript types. Check by reading the relevant `.d.ts` file in `node_modules` for the installed package, or by referencing the CDS docs deprecation/migration notes.
- If the project uses `@cbhq/cds-migrator`, its codemods list is a reliable source of known deprecated → replacement mappings.

**Bad:**

```tsx
// Using a deprecated text shorthand component (v7 pattern)
import { TextBody } from '@cbhq/cds-web/typography';
<TextBody>…</TextBody>;
```

**Good:**

```tsx
import { Text } from '@cbhq/cds-web/typography';
<Text font="body">…</Text>;
```

**Action:** For each deprecated import found, note the recommended replacement from the CDS docs or the cds-migrator codemod list.

---

## Review dangerouslySet\* usages

**Applies to:** web + mobile

Props starting with `dangerouslySet*` (e.g. `dangerouslySetBackground`, `dangerouslySetColor`) are named intentionally — they bypass the type-safe token system. Most uses are "we don't have a token yet" workarounds that should be revisited as CDS's token set grows.

**Detect:** Any prop starting with `dangerouslySet` on a CDS component.

**Action:** Flag each occurrence and check whether a semantic token now covers the use case. If not, leave a comment noting the pending migration.

---

## CDS packages are on the latest published version

**Applies to:** web + mobile

Running outdated CDS versions means missing bug fixes, new components, and token updates. The discovery script already surfaces installed versions — pair that with a package manager query to check what's been published.

**How to check:**

1. The Initialization step already ran `scripts/discover-cds-packages.sh` and listed each installed CDS package and its version. Use that output.

2. Detect the package manager from lockfiles in the project root:

   | Lockfile            | Package manager |
   | ------------------- | --------------- |
   | `yarn.lock`         | yarn            |
   | `package-lock.json` | npm             |
   | `pnpm-lock.yaml`    | pnpm            |

3. For each installed CDS package, query the registry for the latest published version:

   ```bash
   # yarn
   yarn info <package-name> version

   # npm
   npm view <package-name> version

   # pnpm
   pnpm view <package-name> version
   ```

4. Compare installed vs. latest and report any gaps.

**Output format:**

```
package-version-check
  @cbhq/cds-web     installed 9.4.1 → latest 9.6.0
  @cbhq/cds-icons   installed 5.19.0 → latest 5.22.1
```

**Note:** Flag major version gaps as higher priority than patch/minor gaps. A project multiple majors behind may be missing breaking-change migrations that affect correctness, not just new features.
