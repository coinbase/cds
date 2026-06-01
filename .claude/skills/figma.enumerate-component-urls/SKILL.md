---
name: figma.enumerate-component-urls
description: >
  Enumerates every public component set in a CDS Figma file and produces a
  list of [Component Name]: [Figma URL] entries grouped by page section. Use
  this skill whenever asked to list, generate, or audit Figma component URLs,
  produce a component inventory from a Figma file, or when doing a Code Connect
  refresh/audit that requires knowing which Figma node each component maps to.
  Also trigger when someone asks "what are the Figma URLs for CDS components"
  or wants to find the node-id for a specific component.
---

## Overview

Produces a `[Name]: [URL]` list for every **public** component set in a CDS
Figma file, grouped by the file's page sections. Uses the Figma REST API
directly (more reliable than the Figma MCP tools, which only expose the
currently open page in the desktop app).

Requires `$FIGMA_ACCESS_TOKEN` to be set in the environment.

**Default file**: Unless the user provides a different Figma URL, always use
the canonical CDS Components file:

- **File key**: `k5CtyJccNQUGMI5bI4lJ2g`
- **URL**: https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/%E2%9C%A8-CDS-Components

---

## Step 1 — Get all pages via the REST API

Use the file key above (or extract it from a user-provided URL — it's the
segment between `/design/` and the next `/`). Then fetch all pages at depth=1:

```bash
FILE_KEY="k5CtyJccNQUGMI5bI4lJ2g"  # override if user provided a different URL
curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/${FILE_KEY}?depth=1" | python3 -c "
import json, sys
data = json.load(sys.stdin)
pages = data['document']['children']
for p in pages:
    print(p['id'], '|', p['name'])
"
```

The output mixes two kinds of pages:

| Pattern                            | Meaning                                                         |
| ---------------------------------- | --------------------------------------------------------------- |
| `⚡️ Actions`, `🔘 Inputs`, …      | **Section header** — group label only, no component sets inside |
| `     ↳ Button`, `     ↳ Modal`, … | **Component page** — contains the actual component set(s)       |

Collect only the component page IDs (those with the `↳` prefix) for Step 2.
Ignore section header pages, cover pages, staging pages, and deprecated
sections (usually marked `⛔️ Deprecated`).

---

## Step 2 — Batch-query pages for component sets

Query the `/nodes` endpoint at `depth=2` to discover `COMPONENT_SET` children
within each page. Batch many page IDs into one request to stay efficient:

```bash
# IDs are colon-separated (e.g. 60:512), URL-encode : → %3A and , → %2C
IDS="60%3A512%2C0%3A1%2C52733%3A3517"
curl -s -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/${FILE_KEY}/nodes?ids=${IDS}&depth=2" | python3 -c "
import json, sys
data = json.load(sys.stdin)
for nid, node in sorted(data['nodes'].items()):
    if node is None:
        continue
    page = node['document']
    sets = [c for c in page.get('children', []) if c['type'] == 'COMPONENT_SET']
    print(f'=== {page[\"name\"]} (id: {nid}) ===')
    for s in sets:
        print(f'  [SET] {s[\"id\"]} | {s[\"name\"]}')
    if not sets:
        # No sets at top level — print child types to diagnose
        for c in page.get('children', [])[:5]:
            print(f'  [{c[\"type\"]}] {c[\"id\"]} | {c[\"name\"]}')
"
```

### Edge case: pages that use SECTION containers

Some pages nest their component sets inside Figma `SECTION` nodes rather than
placing them directly as page children. When `depth=2` returns only `SECTION`
entries and no `COMPONENT_SET` entries, re-query those section IDs at `depth=2`
to find the component sets inside them.

The CDS **Tray** page is a known example — its `Tray` component set lives
inside a section called "Tray component".

---

## Step 3 — Exclude internal helper sets

Component sets whose names start with `.` are private design helpers used
internally by other components. They are not public consumer APIs and should
be excluded from the output.

Known examples in the CDS file:

- **Carousel**: `.count`, `.carouselPagination`
- **Select**: `.Input Chip`, `.Dropdown Menu`, `.Checkbox`, `.Tray/Multi Select`, `.Desktop Input Chips`, `.CheckboxGroup`
- **Modal**: `.Header`
- **SegmentedTabs**: `.tabs`
- **TabbedChips**: `.Tab Chip`
- **BottomTabBar**: `.Tab Bar Icon`
- **Tray**: `.ListCells-Mobile`, `.ListCells-Desktop`, `.TabbedChipps-Mobile`, `.TabbedChipps-Desktop`, `.Drag handle`

The rule is simple: if `name.startswith('.')`, skip it.

---

## Step 4 — Format the output URLs

Figma node IDs use `:` internally (`60:512`) but URLs use `-` (`node-id=60-512`).

**Which node ID to use in the URL:**

| Situation                                   | Use in URL                     | Name entry                                |
| ------------------------------------------- | ------------------------------ | ----------------------------------------- |
| Page has exactly **1** public component set | The **page** node ID           | The page name (stripped of `↳` and emoji) |
| Page has **2+** public component sets       | Each **component set** node ID | The component set name                    |

This mirrors Figma's own "use the filename" convention for single-set pages —
linking to the page is cleaner and more stable than linking to the set inside it.

**URL template:**

```
https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id={id-with-dashes}
```

---

## Output format

Group entries under the section headers from the file (Layout, Actions, Inputs,
etc.) using markdown `##` headings. Within each section, list components in the
order they appear in the file:

```
## ⚡️ Actions

**Button**: https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=0-1
**ButtonGroup**: https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=52733-3517
**IconButton**: https://www.figma.com/design/k5CtyJccNQUGMI5bI4lJ2g/✨-CDS-Components?node-id=57214-1766
```

For multi-set pages, each set gets its own line. If a set name contains emoji
decorators (like `🔮 Card carousel`), keep them — they convey meaning (e.g.,
`🔮` = experimental in CDS).

---

## Tips

- **Batch aggressively**: The `/nodes` endpoint accepts many IDs at once.
  Prefer fewer large requests over many small ones to stay within rate limits.
- **Check for WIP pages**: Pages prefixed with `🚧` are works in progress.
  Include them but note the WIP status in the output.
- **Section order matters**: Preserve the top-to-bottom page order from Step 1
  when grouping under section headers — it matches the Figma file's navigation
  structure, which is what consumers expect.
