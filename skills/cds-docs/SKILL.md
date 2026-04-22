---
name: cds-docs
description: |
  Retrieve Coinbase Design System (CDS) documentation: setup,
  installation, theming, tokens, and per-component APIs/examples. Use this skill whenever the task involves CDS components,
  design-system rules, theming, or choosing between web and mobile CDS packages, even if the user
  only says "use CDS" or names a component. Always start from the docs route index, then fetch
  only the pages you need to reason and implement correctly. Prefer the CDS MCP server
  (`list-cds-routes`, `get-cds-doc`); if MCP is unavailable, use curl against
  https://cds.coinbase.com/llms/....
allowed-tools: Bash(curl *)
license: Apache-2.0
metadata:
  version: '1.0.0'
---

# CDS Documentation Skill

**Goal:** Pull CDS documentation **into the session** so your next edits, recommendations, and
API usage are **grounded in current docs**—not to produce a documentation handout for the user.

Treat fetched pages as **source material you have read**: internalize props, patterns, imports, and
setup constraints, then **act** (code, refactors, answers) from that understanding. Quote or
summarize for the user only when it helps. Keep the actual doc page contents to yourself
and only share their contents directly to the user if they ask.

Whether you use the CDS MCP server or fetch the pages yourself with `curl` is an implementation detail.
The use does not need to know your methodology unless they indicated they are debugging this skill.

**Ambiguous product requests** (e.g. “turn this into tabs,” “make it a card”) after you’ve read the
index: if **several** CDS components could be relevant (e.g. underline `Tabs` vs pill `SegmentedTabs` vs
`TabNavigation`), it is **acceptable and often better** to ask **one** short, concrete question (e.g.
which visual pattern matches their spec) while briefly naming the options and how they differ per
the docs. Do not pick one arbitrarily just to avoid asking.

## 1. Choose platform

Decide whether the work targets **web** (React, `@cbhq/cds-web`) or **mobile** (React Native,
`@cbhq/cds-mobile`). If unclear, infer from the repo (e.g. `package.json` dependencies, `apps/*`
layout) or ask a single clarifying question.

Pass `web` or `mobile` to `list-cds-routes` and when building curl URLs.

## 2. Tool order (try in sequence)

1. **CDS MCP server** (packaged `mcp-docs` in `@cbhq/cds-mcp-server` / `packages/mcp-server`):
   - `list-cds-routes` with `platform`: `"web"` | `"mobile"`.
   - `get-cds-doc` with `route`: path **including the platform**, ending in **`.txt`** (e.g.
     `web/getting-started/installation.txt`). Paths must come from the index.

2. **curl** if MCP is not configured, fails, or returns errors:
   - **Index:** `https://cds.coinbase.com/llms/web/routes.txt` or
     `https://cds.coinbase.com/llms/mobile/routes.txt`
   - **Page:** `https://cds.coinbase.com/llms/<route>` where `<route>` matches the index (e.g.
     `web/getting-started/theming.txt`).

   Use `curl -fsSL '<url>'`. Prefer **targeted fetches** (the pages you need for this task) over
   loading everything; the index is for **routing**, not for echoing back wholesale.

## 3. Workflow whenever this skill applies

1. Resolve **platform** (`web` or `mobile`).
2. **Load the index** once per platform focus (`list-cds-routes` or `routes.txt`) and use it as the
   canonical map of `.txt` paths.
3. **Fetch additional pages** only as needed for the work ahead; after each fetch, **apply** what
   you learned (imports, props, patterns)—do not stop at regurgitating the file.

## 4. Practical notes

- Routes are **case-sensitive**; doc content is **`.txt`** from MCP or HTTP.
- Web and mobile docs differ; confirm the component or topic exists for that platform’s index.
- Human-readable URLs inside the `.txt` files are optional to share with the user; your priority is
  **correct implementation**, not reproducing the doc site in the reply.

## 5. What “done” looks like

- **Platform** is correct or explicitly chosen.
- **Index** informed which pages you pulled.
- **User-facing output** is implementation-focused (components, imports, structure); retrieval steps
  stay implicit unless the user needs them.
- If multiple components fit, you either **ground the choice in doc differences** or **ask one
  clarifying question** when the product spec is under-specified.
- Your **actions and explanations** reflect **fetched** CDS details (APIs, setup, tokens)—especially
  where memory would be risky—not a dump of documentation for its own sake.
