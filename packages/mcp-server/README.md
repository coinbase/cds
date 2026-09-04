# CDS - MCP Server

CDS MCP Server for web and mobile.

## Dependency chain

The content for the MCP server is generated from the docs site content, which is in turn generated from the package source code. Running the `mcp-server:generate-mcp-docs` task results in the following dependent tasks running first:

1. `mcp-server:build` runs as a dependency of `common:build`
2. `common:build` runs as a dependency of `docs:build`
3. `docs:build` runs as a dependency of `mcp-server:generate-mcp-docs`
4. `mcp-server:generate-mcp-docs` finally runs
