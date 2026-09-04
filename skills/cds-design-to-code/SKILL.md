---
name: cds-design-to-code
description: |
  Turn Figma designs into CDS React (cds-web) or React Native (cds-mobile)
  code. Use when the user shares a Figma design URL (e.g. `figma.com/design/...?node-id=...`) or
  asks to "implement this design" or "build this from Figma" in a frontend project that is using Coinbase Design System (CDS).
  Do not use for general CDS UI work with no Figma reference (use `cds-code`), or for design critique without an implementation request.
license: Apache-2.0
metadata:
  version: '2.0.0'
---

# CDS Design To Code

This skill provides a structured workflow for translating Figma designs into CDS-first production code with high visual fidelity. It bridges the Figma MCP server with the Coinbase Design System, ensuring that designs are implemented using real CDS components and conventions rather than raw Figma HTML output.

The goal is not to copy the Figma output literally. The goal is to use Figma MCP as the design source, then adapt that output into the target project's real CDS component stack.

## When to use

- Use when the user shares a Figma URL like `figma.com/design/...?node-id=...` and wants it implemented.
- Use when translating a Figma design into CDS React or React Native code.
- Use when the user asks to "implement this design" or "build this from Figma."
- Do not use when there is no Figma design to reference -- use the `cds-code` skill instead for general CDS UI work.
- Do not use for design feedback or critique without an implementation request.

## Prerequisites

This skill is a thin bridge that leans on `cds-code` for all CDS component selection, styling, doc lookup, and code quality standards. Verify the following before starting.

- **Figma MCP server (required)** -- must be connected and accessible. Verify by checking whether `get_design_context` is available as an MCP tool.

  **Early exit:** if the Figma MCP server is missing or `get_design_context` is not available, **stop immediately**. Tell the user that this workflow depends on the Figma MCP server and its `get_design_context` tool, suggest they configure a Figma MCP server in their project (e.g. via `.cursor/mcp.json` or their agent's MCP settings), then run this workflow again.

- **`cds-code` skill (strongly recommended)** -- provides component selection, styling rules, doc lookup workflow, and code quality standards.

  If the `cds-code` skill is not available, do not exit. Instead, ask the user whether they want to proceed using only the Figma MCP server, explaining that the `cds-code` skill significantly improves the quality of the CDS code written (correct component selection, style props over inline styles, valid import paths). It is still possible to produce decent CDS code from Figma without it -- the skill only makes the output better. Proceed only if the user confirms; otherwise wait for them to install/enable `cds-code`.

- **`cds-docs` skill (recommended)** -- provides CDS component documentation (routes, props, examples) used by the `cds-code` skill. If it is not available you may continue, but documentation greatly improves accuracy.

- User must provide a Figma URL in the format: `https://figma.com/design/:fileKey/:fileName?node-id=1-2`

## Required Workflow

**Follow these steps in order. Do not skip steps.**

### Step 1: Optionally enable the `cds-code` skill

Start by grounding yourself in the current repo by enabling the `cds-code` skill.

Upon activation, the skill should provde you with information about which CDS NPM packages are installed.
Use this to determine if you are working with `cds-web` or `cds-mobile` (a React or React Native project respectively).

If the `cds-code` skill is not available, and the user has opted out of enabling it, try your best to determine which CDS package is used by inspecting the project's source.

Do not infer the platform from the Figma designs alone -- the repo is the source of truth. If both web and mobile exist and the target is genuinely ambiguous, ask one concise clarifying question.

### Step 2: Fetch Figma Design Context

Use Figma MCP's `get_design_context` tool with the extracted file key and node ID parameters.
**IMPORTANT:** Set the `clientFrameworks` parameter to request the correct CDS code connect mappings. Many components in Figma maintain 2 mappings, one for `cds-web` and one for `cds-mobile`.

Always call `get_design_context` with `disableCodeConnect: false` so Code Connect context is used whenever it is available. Never set `disableCodeConnect` to true.
Always keep screenshots enabled.

**If Figma MCP prompts to create Code Connect mappings for unmapped components:**

Designs will commonly contain components without Code Connect mappings -- either custom one-off components in the design file, or CDS components whose mappings have not been published yet. This is the expected common case, not an error.

When `get_design_context` returns a response indicating components are missing Code Connect mappings (e.g. a prompt like "Would you like to connect code components to the Figma design?"), **do not surface this to the user and do not ask them about Code Connect mappings**. Authoring `.figma.ts` Code Connect files is a CDS team responsibility, not something customers using this skill should do.

Instead, **silently skip the prompt** and immediately call `get_design_context` again with `disableCodeConnect: false` to get the best available context, then proceed with implementation. Treat unmapped components like any other fallback HTML/Tailwind output per the confidence matrix in Step 5.

**If the response is too large or truncated:**

1. Keep the original user node as the source-of-truth entry point.
2. Run `get_metadata(fileKey=":fileKey", nodeId="1-2")` to get the high-level node map and discover child node IDs.
3. Identify the most relevant child frame or section for the requested implementation scope.
4. Re-run `get_design_context` on the narrower child node.
5. Tell the user briefly that you narrowed to a child section because the original node was too large.

Do not treat `get_metadata` as a replacement for `get_design_context`. It is only a way to navigate large trees when the initial node is too broad.

**Staying narrow:** Figma MCP becomes less helpful when the selected node contains many unrelated frames. Stay on the specific node the user provided, prefer a clearly scoped child frame over a giant parent screen if the tool becomes noisy, and keep Code Connect enabled. If the tool still reports many unmapped frames, check whether the returned screenshot and code are still actionable before bouncing the problem back to the user.

### Step 3: Capture Visual Reference

Use Figma MCP's `get_screenshot` tool with the same file key and node ID.

Save this screenshot to a temporary, accessible location in the project and title it `figma-visual-reference` with whatever file extension the screenshot's format supports.

This screenshot is the visual source of truth throughout implementation. Keep it accessible for comparison during the visual verification step.

### Step 4: Download Required Assets

Download any assets (images, icons, SVGs) returned by the Figma MCP server and save them to a temporary, accessible location in the project.

- If the Figma MCP server returns a `localhost` source for an image or SVG, use that source directly.
- Do not import or add new icon packages -- all assets should come from the Figma payload.
- Do not create placeholders if a `localhost` source is provided.

### Step 5: Write CDS Code

This is the core code generation step. Your goal is to take all of the information provided by Figma MCP and begin iterating towards a working solution in code that matches the visual design.

Understanding the requirements of the design and potentially even what CDS component should be used (thanks to Figma Code Connect mappings) follow the workflow outlined in `cds-code` to complete this step.

#### Interpretting `get_design_context` response

Note that the `get_design_context` response is a mixed-confidence input -- treat each part accordingly the matrix below.

Not every element in a design may have a Code Connect mapping. These elements will fall back to raw HTML or Tailwind classes.

| Source                          | Confidence | How to use                                                                                                                                                                           |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CodeConnectSnippet`            | Highest    | Preserve the component choice. It maps to a real component chosen by the design system team. Keep the composition close to the snippet after fixing imports, props, and data wiring. |
| Screenshot                      | High       | Use for layout hierarchy, spacing rhythm, and visual intent verification.                                                                                                            |
| Default HTML / Tailwind classes | Lower      | Structural hints that must be adapted into CDS components. Never ship raw Figma HTML in a CDS app.                                                                                   |

#### Translating fallback HTML and Tailwind classes

When parts of the Figma response fall back to raw HTML or Tailwind-like classes, use them as evidence, not as the final implementation. Look for clues:

- Layout classes like `flex`, `flex-row`, `flex-col`, `items-start`, `justify-between`
- Spacing classes like `gap-[8px]`, `px-[var(--spacing/...)]`, `pb-[16px]`
- Semantic names in `data-name` attributes like `SectionHeader`, `List`, `Card`, `Row`, `Header`
- Repeated structures that imply a CDS collection or cell pattern

Translate those clues into CDS primitives and components:

- `flex-row` -> `HStack`
- `flex-col` -> `VStack`
- Padding and gap values -> CDS spacing props or tokens, not raw Tailwind classes
- `data-name` hints -> check CDS docs before inventing custom UI

Example: a fallback wrapper like `flex flex-col gap-[8px] px-[8px]` likely wants a `VStack` with `gap` and `paddingX`. A `data-name="SectionHeader"` is a strong signal to check whether CDS already has a `SectionHeader` component.

Do not guess the final component tree from CSS alone when CDS docs can confirm the intended abstraction.

**Props before `style`:**

Figma MCP output often includes raw CSS values for font size, weight, color, alignment, and transforms. Do not copy these into a `style` prop when the CDS component has a dedicated style prop -- map them to the matching CDS prop and token (e.g. `font-size: 10px; font-weight: 500` becomes `font="caption"`, `color: var(--palette/foregroundmuted)` becomes `color="fgMuted"`, `text-transform: uppercase` becomes `textTransform="uppercase"`). Follow the `cds-code` skill's styling rules for the full mapping of CSS values to CDS props and tokens.

### Step 6: Validate the Implementation

Validation happens in two phases. First confirm the code compiles and passes the project's own quality gates (Phase 1), then verify visual parity against the Figma design (Phase 2).

**Do not skip Phase 1.** Type errors almost always produce a blank or broken render, which makes visual verification useless and misleading. Catching an error at compile time is far cheaper than diagnosing a white page through browser tooling. Do not start the dev server or take screenshots until Phase 1 is clean.

#### Phase 1: Validate code quality and correctness

Before rendering anything, confirm the code compiles and passes the project's quality gates. Discover the project's commands rather than assuming a fixed toolchain -- different projects have different setups (a Vite app uses a different tsconfig than a Next.js monorepo; a project may use Biome instead of ESLint), and hardcoding a single command like `tsc --noEmit` is fragile.

1. **Detect the project's validation commands.** Inspect `package.json` scripts for `typecheck`, `check`, `lint`, `build`, and `format` to learn what the project actually uses. Note which tools are present (`eslint`, `prettier`, `biome`, etc.) to know which linters and formatters apply.
2. **Find the correct tsconfig.** Prefer project-specific tsconfig files (e.g. `tsconfig.app.json`, `tsconfig.web.json`) over the root. For composite projects -- a root `tsconfig.json` with only `"references"` and `"files": []` -- always target the app-specific tsconfig directly. A root `tsc --noEmit` resolves references from cached `.tsbuildinfo` and can exit 0 while real source errors go undetected.
3. **Run validation in order:**
   - Type check: prefer a project script like `yarn typecheck` or `npm run check`; fall back to `tsc -p tsconfig.app.json --noEmit` using the project-specific tsconfig you found.
   - Lint and format: if eslint, biome, prettier, or similar is present, run it on the changed files.
4. **Fix ALL errors before proceeding.** Do not move on to Phase 2 with outstanding type, lint, or format errors.
5. **Do not start the dev server or take screenshots until this phase is clean.**

#### Phase 2: Verify visual parity

Strive for high visual fidelity with the Figma design. Automated visual verification is **opt-in** -- it can require setting up tooling (e.g. a browser driver) and starting a dev server, so confirm with the user before proceeding. Run Phase 2 through the following sequence of operations in order.

**1. Detect the environment and choose a verification strategy.**

Inspect the project before deciding how to verify. Determine what visual verification tooling is already available rather than assuming a fixed approach:

- Check `package.json` (dependencies, devDependencies, and scripts) and lockfiles for an already-installed browser-automation tool (e.g. Playwright, Cypress, Puppeteer).
- Check whether such a tool is available globally or as a CLI on the system.
- Consider lighter-weight options that need no install, such as native OS screen capture of the rendered app.

Pick the strategy that requires the least new setup. Examples, roughly in order of preference: an automation tool the project already depends on, a tool already installed globally, native screen capture, or installing a new tool only as a last resort.

**2. Ask the user whether to perform automated visual validation.**

Before doing any rendering or setup, ask the user if they would like you to perform automated visual validation. State the strategy you intend to use and what it involves (e.g. starting the dev server, capturing screenshots with the detected tool). Proceed with the automated flow only if the user agrees.

**3. Ask permission before installing anything.**

If the chosen strategy requires installing or setting up a tool that is not already present (for example, installing Playwright and its browsers), you **must** ask the user for explicit permission first, naming the tool and that it will be added to the project. Do not install tools without confirmation. If the user declines the install, fall back to a no-install strategy (native screen capture) or to the user-shared screenshot path below.

**4. Run the verification loop.**

Once a strategy is agreed upon:

1. Render the target UI locally when possible.
2. Use the Figma screenshot from Step 3 as the visual source of truth.
3. Inspect the rendered implementation visually with the chosen tooling.
4. Compare at a matching viewport as closely as possible.
5. Fix the most obvious visual mismatches before finishing.

**Fallback:** If the user opts out of automated visual validation, declines a required install, or no inspection tooling is available, ask the user to take a screenshot of the rendered UI and share it with you so you can compare against the Figma design.

Pay special attention to:

- Section widths and content stretch behavior
- Spacing between nav, tabs, chips, cards, and footer
- Corner radius, border, and shadow treatment
- Typography hierarchy, truncation, and wrapping
- Scroll containers, clipping, and overflow behavior
- Active and inactive states for tabs, chips, and nav items
- Colors matching design tokens exactly
- Responsive behavior following Figma constraints

Prefer a short corrective loop: implement, visually compare, correct the largest differences, re-check once more.

Do not claim visual fidelity based only on reading code or DOM structure. Use the verification strategy the user agreed to, and fall back to the user-shared screenshot when automated inspection is unavailable or declined.

#### Final validation checklist

- [ ] Type check passes against the correct project tsconfig
- [ ] Lint and format pass on the changed files
- [ ] (automated visual validation) Layout matches captured Figma screenshot (spacing, alignment, sizing)
- [ ] (automated visual validation) Typography matches captured Figma screenshot (font, size, weight, line height)
- [ ] (automated visual validation) Assets/images render correctly (no browser placeholder images)
- [ ] No magic numbers/raw values - design tokens are used for spacing, color, radius, etc.
- [ ] Majority (preferably most) of JSX written is CDS components
- [ ] No raw HTML or Tailwind classes left in the final output
- [ ] No inline `style` overrides for values that have a CDS style prop (font, color, textAlign, padding, gap, etc.)
- [ ] Typical accessibility standards met

## Common Issues and Solutions

### Issue: Figma output is truncated

The design is too complex for a single response. Use `get_metadata` to get the node structure, then fetch specific child nodes individually with `get_design_context`.

### Issue: Design doesn't match after implementation

Compare side-by-side with the screenshot from Step 3. Check spacing, colors, and typography values in the design context data. Run the corrective loop from Phase 2 of Step 6.

### Issue: Assets not loading

Verify the Figma MCP server's assets endpoint is accessible. The server serves assets at `localhost` URLs -- use them directly without modification.

### Issue: Code Connect returns unexpected components

The Code Connect snippet maps to a real component chosen by the design system team. Preserve it unless the target repo clearly documents a different import path. If the snippet already uses CDS components, it is often nearly copy-pasteable after fixing imports, props, and data wiring.

### Issue: Mostly fallback HTML with few Code Connect mappings

This is normal for designs with many unmapped elements. Use the fallback HTML as structural evidence, translate layout classes to CDS primitives, and use `data-name` hints to look up CDS components before inventing custom markup.

### Issue: Design token values differ between Figma and CDS

When CDS tokens differ from Figma values, prefer CDS tokens for consistency. Adjust spacing or sizing minimally to maintain visual fidelity.

## Communication Style

Be concise and implementation-oriented.

- Mention when the design source was high confidence versus inferred.
- Call out when you preserved a Code Connect mapping directly.
- If you had to infer a CDS replacement from fallback HTML, explain the reasoning briefly.
- Ask clarifying questions only when the ambiguity would materially change the shipped UI.

Avoid turning the workflow into a long design critique unless the user asked for one.
