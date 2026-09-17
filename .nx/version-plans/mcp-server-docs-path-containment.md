---
cds: patch
---

Fix: constrain the MCP server's `get-cds-doc` tool to files inside its bundled `mcp-docs` directory. Routes that resolve outside of it are now reported as not found.
