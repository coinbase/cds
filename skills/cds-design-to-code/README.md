# cds-design-to-code

Turns Figma designs into CDS-first React or React Native production code with high visual fidelity.

## What it does

This skill provides a structured workflow for translating Figma designs into real CDS components. Give your AI agent a Figma URL and it will:

1. **Extract design context** from the Figma file using the Figma MCP server.
2. **Capture a screenshot** as the visual source of truth.
3. **Download assets** (images, icons, SVGs) from the Figma payload.
4. **Translate the design** into CDS components, leveraging Code Connect mappings as the highest-confidence signal and converting fallback HTML/Tailwind output into proper CDS primitives.
5. **Verify visual parity** by comparing the rendered implementation against the Figma screenshot, running a corrective loop until the UI matches.

## Dependencies

| Dependency           | Required | Purpose                                                                                                                           |
| -------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **`cds-code` skill** | Yes      | Provides component selection, styling rules, doc lookup workflow, and code quality standards. This skill must be installed first. |
| **CDS MCP server**   | Yes      | Provides `list-cds-routes` and `get-cds-doc` tools for looking up component docs, props, and examples at runtime.                 |
| **Figma MCP server** | Yes      | Provides `get_design_context`, `get_metadata`, and `get_screenshot` tools for fetching design data from Figma files.              |

### Installing the cds-code skill

Install via your organization's skill registry. The `cds-code` skill must be installed before using this skill.

### Installing the CDS MCP server

```sh
npx --package=@coinbase/cds-mcp-server cds-mcp-setup
```

After running the setup command, enable the MCP server in your editor. See the [CDS AI Overview](https://cds.coinbase.com/getting-started/ai-overview#first-time-setup) for full setup instructions.

### Installing the Figma MCP server

Follow the [Figma MCP setup guide](https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server) for your editor.

## Installing this skill

Install via your organization's skill registry.

## How to get a Figma node URL

You can turn any Figma frame or component into a working prototype by giving the agent its node URL. Here's how to get it:

1. Open the Figma file and switch to **Dev Mode** (toggle at the bottom of the screen).
2. Select the frame or component you want to implement.
3. In the right panel, find the **MCP** section. Click **Copy example prompt**.

This copies something like:

```
Implement this design from Figma.
@https://www.figma.com/design/<fileKey>/<fileName>?node-id=12345-67890&m=dev
```

Paste it directly into the Cursor chat. The `@https://www.figma.com/...` part is the Figma node URL -- the agent will fetch the design and translate it into CDS components automatically.

## When to use

- You have a Figma design you want to implement as CDS-first React or React Native code.
- You want to go from a Figma URL (`figma.com/design/...?node-id=...`) to production-ready components.

## When NOT to use

- You're writing CDS UI without a Figma design -- use the `cds-code` skill instead.
- You only need design feedback or a critique, not an implementation.
