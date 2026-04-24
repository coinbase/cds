---
name: cds-code
description: |
  Produces high quality Coinbase Design System (CDS) code for React and React Native projects.
  Always use this skill every time you are asked to create or update UI or write React or React Native code.
license: Apache-2.0
metadata:
  version: '2.0.0'
---

# CDS Code Writing Skill

## Contents

1. Part 1: Initialization | Follow these steps once per session, before you write any code
2. Part 2: Workflow | Follow these steps for all frontend coding tasks

## Part 1: Initialization

Perform the following operations only once per session, after the skill is activated.

### Prepare CDS documentation

For any CDS documentation needs, you will need to use either of the following tools.
If neither are available you may let the user know but still continue on with the task as documentation is helpful but not required.

- Activate the `cds-docs` skill OR...
- If the `cds-docs` skill is not configured, try calling the CDS MCP server `list-cds-routes` tool.

### Environment Detection

You must determine if you are operating in a React or React Native project before you write any code.

1. **Discover installed CDS packages and runtime**

Run the `bash` discovery script: `scripts/discover-cds-packages.sh`

This will gve you:

- The `CDS Runtime` (`web` or `mobile`) - use this value as the `platform` argument for the CDS MCP server
- Every installed CDS package: its name, version, and valid export subpaths - these import paths are the ONLY ALLOWED PATHS for importing from CDS packages.

If you are unable to run the bash script, you can likely infer the `platform` by inspecting the project's source code.

2. Read the platform-specific styling and themeing documentation:

- `getting-started/styling`
- `getting-started/theming`

## Part 2: Workflow

For all frontend coding tasks, you must follow these steps.

**YOU MUST** perform steps 1 and 2 before writing any code!

### Step 1: Identify the appropriate components

Use `guidelines/components.md` to help identify the appropriate CDS components for the task.
The guidelines file will cover most use cases, but you may optionally browse the CDS docs for the full list of supported CDS components.

If you decide your task will require icons (`Icon` or `IconButton`) or illustrations (`SpotSquare`, `Pictogram`, `HeroSquare`, etc.) please read the corresponding guidelines files for more details.

| Icons                 | Illustrations                 |
| --------------------- | ----------------------------- |
| `guidelines/icons.md` | `guidelines/illustrations.md` |

If the task involves icons, also follow `guidelines/icons.md` and use `scripts/discover-cds-icons.mjs` to search icon names. If the task involves illustrations, also follow `guidelines/illustrations.md` and use `scripts/discover-cds-illustrations.mjs` to search illustration names.

If no CDS component fits your use case, you may fall back to the following options in this order of priority:

1. use a custom React component from the project's codebase
2. build your own custom React component
3. use the native platform's JSX elements for bespoke UI

**IMPORTANT:** Always inform the user which CDS components you are planning to use before moving on to `Step 2`.

### Step 2: Optionally read component docs

For any CDS component you plan to use, retrieve and read their documentation (see `Part 1` for more details on docs setup).

### Step 3: Execute the task (writing frontend code)

Now create or update the UI with proper CDS components and usage.

Most CDS component implement an API that allows you to apply the CDS design tokens, we call these 'style props'. Prefer setting these style props for styling components over setting custom style via inline styles or CSS.

**Why this matters:** When you set `font`, `color`, `textAlign`, or other typography properties through `style` instead of props, the component loses its connection to the CDS theme. For example, setting `fontSize` and `fontWeight` via `style` without a `font` prop means the CDS font family never applies -- the text falls back to `inherit` and may render in the wrong typeface.

You should check a component's props table in their CDS docs page to verify what props are available.

Example misuse of custom styles and their style props alternatives:

| Instead of `style`                                              | Use the prop                                       |
| --------------------------------------------------------------- | -------------------------------------------------- |
| `style={{ color: "var(--color-fgMuted)" }}`                     | `color="fgMuted"`                                  |
| `style={{ fontSize: 12, fontWeight: 500, lineHeight: "16px" }}` | `font="caption"` (or the matching CDS font token)  |
| `style={{ textAlign: "center" }}`                               | `textAlign="center"`                               |
| `style={{ textTransform: "uppercase" }}`                        | `textTransform="uppercase"`                        |
| `style={{ display: "flex", flexDirection: "column" }}`          | Use `VStack`, or `flexDirection="column"` on `Box` |
| `style={{ gap: 8 }}`                                            | `gap={1}`                                          |
| `style={{ padding: 16 }}`                                       | `padding={2}`                                      |
| `style={{ backgroundColor: "..." }}`                            | `background="bgAlternate"` (or semantic token)     |

If you need to further customize the style of a rendered CDS component or a specific style is not support via style props, you may reference: `guidelines/customizing-styles.md`.

### Step 4: Validate changes

Your task will be complete if:

1. You performed initialization steps in `Part 1`
2. You examined the user's request and identified specific CDS components to use
3. Your changes DO NOT include any raw rgb/hex/etc color values
4. Your changes DO NOT use any raw pixel values for spacing, border radius, etc.
5. You changes use style props (e.g. `font`, `color`, `textAlign`, `textTransform`, `padding`, `gap`) instead of customization via `style` or with CSS.
6. All import paths are valid CDS package exports (see section below)
7. Any project linting/typechecking tasks are passing

#### Validating import paths

**This is critical.** Do not guess or memorize CDS import paths. The discovery script output is the source of truth (see `Part 1` for details).

Before writing or returning any CDS import, verify it against the export list from setup:

1. Find the CDS package for the target platform in the discovery script output.
2. Confirm the subpath you want to import is listed as a valid export.
3. If the subpath is not listed, it does not exist -- pick the closest valid export instead.

**The package name may vary between projects.** Different repos may install CDS under different scopes. Always use the package name reported by the discovery script, not a hardcoded scope. If the project already has CDS imports in existing code, match whatever scope those files use.

Common mistakes to avoid:

- Inventing deep subpaths like `<pkg>/layout/Box` or `<pkg>/buttons/Button` when the actual export is `<pkg>/layout` or `<pkg>/buttons`.
- Guessing a package scope when the project uses a different one.
- Assuming that the CDS docs examples use the same package name as the target project -- they may differ.
