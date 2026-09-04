# CDS Docs skill

Loads Coinbase Design System documentation.

This skill can work as a compliement to or a replacement of the CDS MCP server. If the MCP server is available the skill prioritizes it.
This guaranttees the version of the docs matches the version of the installed cds packages.

## How it works

1. Prefer the **CDS MCP** tools `list-cds-routes` and `get-cds-doc`
2. If MCP is unavailable, use **curl** against `https://cds.coinbase.com/llms/...` (see
   [SKILL.md](./SKILL.md) for exact URLs and path rules).

## Testing / Tuning

Use the anthropic /skill-creator skill to run evals
