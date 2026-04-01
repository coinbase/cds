# cds-code

Produces high quality Coinbase Design System (CDS) UI code for React and React Native.

## What it does

This skill teaches your AI agent to write CDS-first UI code that is accurate, composable, and aligned with the official docs. It covers:

- **Component selection** -- picks the right CDS component before falling back to native elements or custom markup.
- **Layout** -- uses CDS primitives (`Box`, `HStack`, `VStack`, `Grid`) over raw `div`/`View`.
- **Styling** -- prefers StyleProps, semantic tokens, and CSS variables over hardcoded values; avoids unnecessary `style` overrides.
- **Theming** -- uses `ThemeProvider`, `useTheme`, and theme-derived spacing, radius, and colors correctly.
- **Visualization** -- reaches for `@coinbase/cds-web-visualization` or `@coinbase/cds-mobile-visualization` before custom charts.
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

## When to use

- You're building or editing React or React Native UI with CDS components.
- You're working with layouts, theming, styling, or design tokens.
- You're working with charts, sparklines, or data visualization components.
- You're refactoring existing UI to adopt CDS components.

## When NOT to use

- Your task has no UI or frontend component work.
