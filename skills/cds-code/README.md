# cds-code

Produces high quality Coinbase Design System (CDS) UI code for React and React Native.

## What it does

This skill teaches your AI agent to write CDS-first UI code that is accurate, composable, and aligned with the official docs. It covers:

- **Component selection** -- picks the right CDS component before falling back to native elements or custom markup.
- **Layout** -- uses CDS primitives (`Box`, `HStack`, `VStack`, `Grid`) over raw `div`/`View`.
- **Styling** -- prefers StyleProps, semantic tokens, and CSS variables over hardcoded values; avoids unnecessary `style` overrides.
- **Theming** -- uses `ThemeProvider`, `useTheme`, and theme-derived spacing, radius, and colors correctly.
- **Visualization** -- reaches for CDS visualization packages before custom charts.
- **Import verification** -- discovers installed CDS packages at session start and verifies every import path against the package's actual exports, preventing made-up import paths.
- **Visual verification** -- verifies the rendered UI against the design intent using browser tooling or by requesting a screenshot from the user.

## Dependencies

| Dependency         | Required | Purpose                                                                                                           |
| ------------------ | -------- | ----------------------------------------------------------------------------------------------------------------- |
| **CDS MCP server** | Yes      | Provides `list-cds-routes` and `get-cds-doc` tools for looking up component docs, props, and examples at runtime. |

### Installing the CDS MCP server

```sh
npx --package=@coinbase/cds-mcp-server cds-mcp-setup
```

After running the setup command, enable the MCP server in your editor. See the [CDS AI Overview](https://cds.coinbase.com/getting-started/ai-overview#first-time-setup) for full setup instructions.

## Included scripts

### `scripts/discover-cds-packages.sh`

Scans `node_modules` for installed CDS packages and prints each package's name, version, and valid export subpaths. The agent runs this automatically at the start of each session to ground itself in the project's actual CDS installation.

```sh
bash scripts/discover-cds-packages.sh [node_modules_path]
```

This is important because CDS packages may be published under different scopes depending on the consuming project. The script detects whichever scope is installed and reports the correct package names and exports.

## Installing this skill

Install via your organization's skill registry.

## When to use

- You're building or editing React or React Native UI with CDS components.
- You're working with layouts, theming, styling, or design tokens.
- You're working with charts, sparklines, or data visualization components.
- You're refactoring existing UI to adopt CDS components.

## When NOT to use

- Your task has no UI or frontend component work.
