# Color Pairing Tool

> **Note:** This widget was vibe-coded and later documented. If you find edge cases or
> surprising behavior, that context may help explain why.

An interactive docsite tool that maps arbitrary colors (from uploaded images or manual
input) to the closest CDS spectrum primitive tokens and verifies WCAG accessibility
contrast. It produces light- and dark-mode token pairings and previews them on real CDS
components.

## File Map

```
ColorPairingTool/
├── index.tsx                  ← Orchestrator: state machine, input routing, export
├── types.ts                   ← Shared types (ResultEntry, Screen)
├── colorUtils.ts              ← Pure color math (WCAG, k-means, hue-aware matching)
├── UploadZone.tsx             ← Drag-and-drop / file-picker image upload UI
├── UploadZone.module.css      ← Drag thumbnail stack animation styles
├── ColorPicker.tsx            ← Manual hex/RGB input with HSV color picker
├── ColorPicker.module.css     ← react-colorful overrides
├── HotspotImagePreview.tsx    ← Draggable hotspot for pixel re-sampling on images
├── ResultCard.tsx             ← Result layout: image + contrast panel + playground
├── ResultCard.module.css      ← Blurred background, hotspot dot, drag label styles
├── ContrastPanel.tsx          ← Side-by-side light/dark WCAG contrast display
├── WcagBadge.tsx              ← Small pass/fail Tag for AA Normal / AA Large
├── ComponentPlayground.tsx    ← Light/Dark tab wrapper with ThemeProvider
├── PlaygroundContent.tsx      ← CDS component previews (Button, Tag, MessagingCard, LineChart)
└── checkerboard.svg           ← Placeholder pattern for image-less cards

External dependency (shared with other docsite tools):
  ../FileDropZone/
  ├── index.tsx                ← Generic dashed-border drop zone component
  └── useFileUpload.ts         ← Hook for drag/drop + file input events
```

## Architecture Overview

### State Machine

The top-level `ColorPairingTool` (index.tsx) manages a simple three-screen state machine:

```
 ┌──────┐   upload / manual input   ┌─────────┐   processing done   ┌────────┐
 │ idle │ ─────────────────────────▸ │ loading │ ──────────────────▸ │ result │
 └──────┘                           └─────────┘                     └────────┘
    ▲                                                                   │
    └───────────────────── "Start over" button ─────────────────────────┘
```

- **idle** — Shows `UploadZone` (drag-and-drop) and `ColorPicker` (manual entry).
- **loading** — Shows a progress bar while images are processed sequentially.
- **result** — Shows `ResultCard` with carousel navigation (if multiple results) and
  an "Export JSON" button.

State is held in a flat set of `useState` hooks (`screen`, `results[]`,
`currentResultIdx`, `progress`, `error`). There is no reducer or context—everything
lives in the single orchestrator component.

### Three Input Paths

| Path                 | Entry Point         | What Happens                                                                                                                                                                          |
| -------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Image upload**     | `handleFiles`       | Files are validated (PNG/JPG/WebP, max 10), then processed one-by-one through `processImageFile()` which extracts dominant colors via k-means and finds the closest CDS token.        |
| **Manual color**     | `handleManualApply` | Text input is parsed by `parseMultiColor()` (supports hex, RGB tuples, `rgb()`, comma-separated lists). Each parsed color is matched to a token via `findClosestPrimitiveHueAware()`. |
| **Hotspot resample** | `handleResampleBg`  | On the result screen, users drag a hotspot on the uploaded image to pick a new pixel. The sampled color replaces the primary extracted color and re-runs token matching.              |

### Data Flow

```
User input (image file or color string)
  │
  ▼
┌─────────────────────────────────────────────────┐
│ Color Extraction                                │
│  • Images: k-means clustering (K=4) on canvas   │
│    pixels with Gaussian center-weighting         │
│  • Manual: parse hex / RGB / rgb() string        │
└──────────────────────┬──────────────────────────┘
                       │  RGB value(s)
                       ▼
┌─────────────────────────────────────────────────┐
│ Token Matching (light spectrum)                 │
│  findClosestPrimitiveHueAware()                 │
│  → maps RGB → closest CDS spectrum token        │
└──────────────────────┬──────────────────────────┘
                       │  TokenMatch {token, hex}
                       ▼
┌─────────────────────────────────────────────────┐
│ Dark Mode Pairing                               │
│  findBestDarkToken()                            │
│  → same color family, passes min contrast       │
│    against dark background (gray5)              │
└──────────────────────┬──────────────────────────┘
                       │  light + dark TokenMatch
                       ▼
┌─────────────────────────────────────────────────┐
│ ResultEntry created → stored in results[]       │
│  Contains: filename, image data, extracted      │
│  colors, light token, dark token                │
└──────────────────────┬──────────────────────────┘
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
    ContrastPanel  Playground   Export JSON
    (WCAG badges)  (CDS comps)  (download)
```

## Key Modules in Detail

### `colorUtils.ts` — Color Math Engine

This is the algorithmic core of the tool. It is entirely pure functions with no React
dependencies. Key sections:

#### Hue-Aware Token Matching (`findClosestPrimitiveHueAware`)

The primary matching algorithm. It is purpose-built for CDS spectrum tokens and is
**not replaceable** by a generic color-distance library.

1. If the input is achromatic (HSL saturation < 0.1), fall back to plain RGB-distance
   matching (`findClosestPrimitive`), which allows grays as candidates.
2. For chromatic inputs, build a map of CDS color family → average hue, **excluding**
   the gray family entirely (CDS grays are blue-tinted at ~220° and would incorrectly
   match blue inputs).
3. Exclude extreme token steps (0 and 100) from hue computation because their hues
   drift toward adjacent families.
4. Find the family with the smallest hue distance to the input, then expand to any
   families within a 10° margin (`HUE_MARGIN`). This creates a candidate set.
5. Among all tokens in the candidate families, pick the closest by Euclidean RGB
   distance. This lets RGB break ties at hue boundaries (e.g., a ~210° input could be
   teal or blue—RGB distance decides correctly).

#### K-Means Color Extraction (`extractSubjectColors`)

Extracts the two most visually distinct colors from an uploaded image:

1. Sample ~3000 pixels from the image canvas at regular intervals.
2. Apply Gaussian spatial weighting (σ = 32% of image dimensions) so center pixels
   count more than edge pixels—biasing toward the subject of the image.
3. Detect bright (>200) or dark (<55) backgrounds from corner pixel brightness and
   skip those pixels to avoid matching the background.
4. Run k-means clustering with K=4 for up to 20 iterations.
5. From the 4 clusters, select the pair with the greatest RGB distance to maximize
   visual contrast.
6. Sort the pair by cluster size (dominant color first).

#### WCAG Compliance

- `luminance()` / `contrastRatio()` — Standard WCAG 2.1 relative luminance formulas.
- `wcagLevels()` — Thresholds: AA Normal ≥ 4.5:1, AA Large ≥ 3:1, AAA ≥ 7:1.
- `enforceAA()` — If a fg/bg pair fails AA, walks the spectrum to find the closest
  passing token in the same family first, then falls back to any family.
- `findBestDarkToken()` — Finds a dark-spectrum token in the same color family that
  passes a minimum contrast ratio (2:1) against `gray5` (the dark-mode card background).

#### Other Utilities

- Color conversions: `parseRGB`, `toHex`, `hexToRGB`, `rgbToHsl`, `hsbToRgb`, `rgbToHsb`
- `parseColorInput` / `parseMultiColor` — Flexible color string parsing (hex 3/6-digit,
  `rgb()`, bare RGB tuples, comma-separated lists)
- `buildAAAPairs` — Exhaustive 7:1 pair search across a spectrum (used for exports)

### `index.tsx` — Orchestrator

- Reads `lightSpectrum` and `darkSpectrum` from `useTheme()`.
- Routes user actions to the appropriate handler (file upload, manual color, hotspot).
- Computes export data (`computeExportEntry`) which includes button hover/pressed
  states (12%/24% black blend) and text color tokens (`gray0`/`gray100` chosen by
  contrast).
- Produces a downloadable JSON file with light/dark tokens, hex values, text colors,
  and button states.

### `UploadZone.tsx`

Wraps the shared `FileDropZone` component with:

- Drag-over animation: stacked checkerboard thumbnails that fan out (CSS transforms).
- Processing state: `ProgressBar` with "Processing X of Y" text.
- Error display for invalid file types.

### `ColorPicker.tsx`

- Uses `react-colorful` (`HsvColorPicker`) for visual color selection.
- Two-way sync: dragging the picker updates the text input; typing a valid color
  updates the picker position.
- Supports comma-separated multi-color input. Only the last segment syncs with the
  picker; earlier segments are preserved.

### `HotspotImagePreview.tsx`

- Renders the uploaded image with a blurred/saturated background (`filter: blur(24px)`).
- Maintains a hidden canvas at the processed image resolution for pixel sampling.
- Uses pointer events with `setPointerCapture` for smooth dragging.
- During drag: updates hotspot position and dot color via direct DOM refs (no React
  re-renders) for 60fps performance.
- On pointer up: samples the pixel, runs `findClosestPrimitive`, and calls
  `onResample` to update the parent's state.

### `ResultCard.tsx`

Layout component that composes:

- Left half: `HotspotImagePreview` (for images) or a color swatch (for manual input).
- Right half: `ContrastPanel` showing light and dark mode contrast results.
- Bottom: `ComponentPlayground` with real CDS component previews.

Runs `enforceAA`, `findClosestPrimitiveHueAware`, and `findBestDarkToken` in a
`useMemo` to derive the displayed token pairings.

### `ContrastPanel.tsx`

Two `ContrastRow` sub-components (light mode, dark mode), each showing:

- A color swatch with "Aa" text sample on the appropriate mode background.
- Token name and contrast ratio.
- `WcagBadge` tags for AA Normal and AA Large compliance.

### `ComponentPlayground.tsx` + `PlaygroundContent.tsx`

- `ComponentPlayground` provides a Light/Dark tab switcher using `SegmentedTabs` and
  wraps content in a `ThemeProvider` set to the selected color scheme.
- `PlaygroundContent` renders CDS components styled with the matched color:
  - `Button`, `IconButton`, `Tag` — filled with the matched color.
  - `MessagingCard` — promotional upsell card using the matched color as background,
    with the uploaded image (or checkerboard placeholder) as media.
  - `Card` with `LineChart` — avatar circle + line chart using the matched color as
    the primary series color (via `@coinbase/cds-web-visualization`).

## External Dependencies

| Package                           | Used For                                                  |
| --------------------------------- | --------------------------------------------------------- |
| `@coinbase/cds-web`               | All UI components (Button, Card, Tag, TextInput, etc.)    |
| `@coinbase/cds-web-visualization` | `LineChart`, `Scrubber`, `SolidLine` in playground        |
| `@coinbase/cds-common`            | `ThemeVars` types for spectrum color tokens               |
| `react-colorful`                  | HSV color picker widget in `ColorPicker.tsx`              |
| `@docusaurus/theme-common`        | `useColorMode()` for detecting site-level light/dark mode |

## Export Format

The "Export JSON" button downloads a file like:

```json
{
  "generated": "2026-04-13T00:00:00.000Z",
  "results": [
    {
      "source": "Image 1 — photo.png",
      "light": {
        "token": "blue40",
        "hex": "#3773f5",
        "textColor": { "token": "gray0", "hex": "#ffffff" }
      },
      "dark": {
        "token": "blue50",
        "hex": "#4d82f7",
        "textColor": { "token": "gray0", "hex": "#0a0b0d" }
      },
      "button": {
        "light": { "hover": "#3065d8", "pressed": "#2a57ba" },
        "dark": { "hover": "#4472d9", "pressed": "#3b63ba" }
      }
    }
  ]
}
```
