---
name: cds-code
description: |
  Provides a structured workflow for writing high quality Coinbase Design System (CDS) code.
  Use this skill every time you are asked to create or update a user interface using React or React Native.
  Additinoally, this skill may be used to conduct a code review on existing code for CDS adherence.
  Trigger examples: "build this screen", "update this component", "perform a CDS audit on our changes", 
  "check our codebase for CDS adherence", "does this feature use CDS well?"
license: Apache-2.0
metadata:
  version: '2.1.0'
---

# CDS Code Skill

## On every request

Before responding, determine what the user needs:

**Coding** — the user wants to create or update UI → follow the Coding Workflow.

**Review** — the user explicitly asks to audit, review, or check existing code for CDS adherence → read `guidelines/code-review.md` and follow it instead.

**Default to coding.** Only treat a request as a review if the user's intent is explicit. Writing code is the primary use case for this skill.

## Initialization

Run this once per session, before doing anything else.

Run the discovery script: `scripts/discover-cds-packages.sh`

Its output tells you:

- The `CDS Runtime` (`web` or `mobile`) — use this value as the `platform` argument for the CDS MCP server if it is needed.
- Every installed CDS package: its name, version, and valid export subpaths — these import paths are the ONLY ALLOWED PATHS when importing from CDS packages

If the script cannot be run, much of the information it provides can be determined via manual inspection:

- Infer the platform by inspecting existing CDS imports in the project's source code
- Find valid import paths by reading the `exports` field of the `package.json` of installed CDS packages in `node_modules`

## Coding Workflow

For all frontend coding tasks, follow these steps in order.

**YOU MUST** perform steps 1 and 2 before writing any code!

### Step 1: Prepare CDS documentation

For any CDS documentation needs, use either of the following tools.
If neither are available, let the user know but continue — documentation is helpful but not required.

- Activate the `cds-docs` skill OR...
- If the `cds-docs` skill is not configured, try calling the CDS MCP server `list-cds-routes` tool.

Then read the platform-specific docs (using the runtime detected in Initialization):

- `getting-started/styling`
- `getting-started/theming`

### Step 2: Identify the appropriate components

Use `guidelines/components.md` to help identify the appropriate CDS components for the task.
The guidelines file will cover most use cases, but you may optionally browse the CDS docs for the full list of supported CDS components.

If you decide your task will require icons (`Icon` or `IconButton`) or illustrations (`SpotSquare`, `Pictogram`, `HeroSquare`, etc.) please read the corresponding guidelines files for more details.

| Icons                 | Illustrations                 |
| --------------------- | ----------------------------- |
| `guidelines/icons.md` | `guidelines/illustrations.md` |

If no CDS component fits your use case, you may fall back to the following options in this order of priority:

1. search for a relevant and reusable React component from the project's codebase to use
2. build your own custom React component using CDS primitives as building blocks
3. use the native platform's JSX elements (div, View, etc.) for bespoke UI as a last resort

**IMPORTANT:** Always inform the user which CDS components you are planning to use before moving on to Step 3.

### Step 3: Optionally read component docs

For any CDS component you plan to use, retrieve and read their documentation (see Step 1 in this workflow for more details on docs setup).

If documentation is not retrievable for any reason, the published type definitions for the component may be used to determine the full props API a component affords. This is no substitute for reading the documentation, but it can be a useful fallback when documentation is not available.

### Step 4: Execute the task (writing code)

Now create or update the UI with proper CDS components and usage.

#### Package scope

The package name may vary between projects. Different repos may install CDS under different scopes.
Always match the full CDS package name(s) as determined in the initialization step. If the project already has CDS imports in existing code, match whatever scope those files use.

#### Using the Design System

In most cases, you should avoid using inline style objects or CSS classNames (web only).
Through these methods it is very easy to make common mistakes like using hardcoded property values instead of the CDS design tokens.
Doing so would break the component's connection to the CDS theme.

If you must use a style object or a CSS className, you can still access the CDS theme either through the `useTheme` hook or by CSS variables (web only).

Most CDS components implement an API that conveniently allows you to apply CDS design tokens, internally we call these 'style props'.

In cds-web, style props essentially act as an API for applying atomic CSS classes, much like Tailwind's utility classes which are so prevelant in the web ecosystem.

You should prefer setting these style props for styling components over setting custom style via inline styles or CSS.

**Why this matters:** When you set `font`, `color`, `textAlign`, or other typography properties through `style` instead of props, the component loses its connection to the CDS theme. For example, setting `fontSize` and `fontWeight` via `style` without a `font` prop means the CDS font family never applies -- the text falls back to `inherit` and may render in the wrong typeface.

You should check a component's documentation which includes a props table to verify the available API.

Examples of opportunities to use style props over inline styles:

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

### Step 5: Validate changes

Your task will be complete if:

1. You performed skill initialization and explicitly identified the specific CDS components you would use
2. Your changes DO NOT include any raw rgb/hex/etc color values
3. Your changes DO NOT use any raw pixel values for spacing properties (padding, margin, gap, border radius). Explicit layout dimensions like `width` or `height` set to specific designer-specified values are acceptable.
4. Your changes DO NOT import any depreacted CDS components or hooks.
5. Your changes use components' style props (e.g. `font`, `color`, `background`, `textTransform`, `paddingX`, `gap`) instead of customization via inline `style` objects or with CSS classNames.
6. All import paths are valid CDS package exports, determined in initialization
7. The project's linting/typechecking/formatting tasks are passing
