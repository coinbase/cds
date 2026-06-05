# cds-accessibility

Teaches your AI agent to use **Coinbase Design System (CDS)** components in an **accessible** way: **documented** props (for example `accessibilityLabel` and `accessibilityState` on React Native, and `aria-*` / `as` / `role` patterns on web **as the CDS web API supports**), and **choosing CDS components** whose official docs cover the right assistive-technology behavior. Grounding is [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) (prefer **CDS MCP** `list-cds-routes` / `get-cds-doc` when available; if MCP is unavailable or fails, use **`curl`** to `https://cds.coinbase.com/llms/...` per cds-docs) and [cds.cbhq.net](https://cds.cbhq.net/)—not a generic ARIA or WCAG tutorial that ignores CDS.

## What it does

- **Doc-first consumption** – For each CDS component in scope, follow [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) to load the **.txt** for **prop tables** and **examples** (MCP or curl; same content).
- **React Native** – Apply `accessibilityLabel`, `accessibilityHint`, `accessibilityState`, `accessibilityRole`, and any CDS-documented props **where the component or scenario requires them**.
- **Web** – Wire labels, `aria-*`, `as`, and `role` **through the CDS web component’s** supported API, following official examples.
- **Component choice** – Prefer CDS **composites** (modals, forms, lists, etc.) when their **docs** describe the **focus, keyboard, and semantics** you need, instead of re-building from layout primitives.
- **Focus management (scoped)** – When the change uses **focus-managed** CDS components (e.g. **Modal**, **Tray**, **Tooltip**, or others whose **official** doc defines focus), follow **Part 1, Step 5** in `SKILL.md` and the official examples—not generic focus-trap guidance for all UI.
- **Definition of done** – Work is **complete** when it satisfies **Success criteria** in `SKILL.md` (doc-correct CDS a11y **props**, **confident** component choice from the **current** **CDS** **.txt** per **cds-docs**, and all relevant **docs** read and applied—including cross-links).
- **Text (typography) and headings** – Match **`as`** (web) and **`accessibilityRole`** (React Native) to content intent and the [Text (typography)](https://cds.cbhq.net/components/typography/Text/) doc; use **Text** **web** and **mobile** routes per **cds-docs**.
- **Relationship to `cds-code`** – **`cds-code`** covers building CDS UI (layout, theming, imports, visualization, **visual** verification). **This skill** covers **CDS accessibility consumption** and **a11y-driven** component choice. Use both for typical feature work; use [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) for how you fetch **CDS** **.txt** for both.

## Dependencies

| Dependency         | Required    | Purpose                                                                                                                                                                                                                                                      |
| ------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **cds-docs**       | Yes         | [cds-docs](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs): how to load official CDS **.txt** (index first, then pages)—**MCP** (`list-cds-routes`, `get-cds-doc`) when available, else **`curl -fsSL`** to `https://cds.coinbase.com/llms/...`. |
| **CDS MCP server** | Optional    | **Preferred** first step in cds-docs when the environment has CDS MCP; not required if you use the **curl** path from cds-docs.                                                                                                                              |
| **cds.cbhq.net**   | Recommended | Browsing and shared links; same content family as the **`llms`** / MCP **.txt** sources.                                                                                                                                                                     |
| **cds-code skill** | Recommended | Session setup, package discovery, and CDS-first UI build flow when you are not doing a read-only a11y review.                                                                                                                                                |

### Documentation access (cds-docs, not MCP-only)

**Do not** treat CDS MCP as mandatory. For **tool order**, **indices**, and **`curl` URLs**, follow [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) (MCP first when it works; otherwise `curl` to the Coinbase `llms` host per that skill). Optional MCP install and editor wiring are covered in the [CDS AI overview](https://cds.coinbase.com/getting-started/ai-overview#first-time-setup) and cds-docs, not duplicated here.

## Included scripts

This skill does **not** ship a script. Optional automation (for example a repo-level accessibility CLI) can be added later only if a **documented, maintained** command exists in the consuming project.

## Installing this skill

Install via your organization’s skill registry. To add **cds-docs** in the same flow your org uses:

`npx @cbhq/cb-skills add https://skills.cbhq.net --skill frontend/cds-public/cds-docs` (see **cds-docs** for the exact command and registry URL).

## When to use

- You are implementing, extending, or reviewing **CDS** UI and need **screen reader, naming, and state** behavior that CDS documents.
- You need to set or audit **`accessibilityLabel`**, **`accessibilityState`**, and related **React Native** props per CDS.
- You need to align **web** CDS usage with **documented** `aria-*`, `as`, `role`, and form labeling patterns.
- You must **choose between CDS components** and **accessibility** (focus, modal, list semantics) is the deciding factor.

## When NOT to use

- The task has **no CDS** components or is **not** about consuming CDS (generic HTML or non-CDS frameworks—use other guidance).
- The task is **only** about layout, styling, theme tokens, or imports with **no** accessibility or labeling concerns—**`cds-code`** is enough.
- You want a **standalone** web accessibility course unrelated to **cds-docs** and CDS package APIs.

## See also

- [**cds-docs**](https://skills.cbhq.net/skill/frontend/cds-public/cds-docs) – how to load CDS **.txt** (MCP and curl).
- **`cds-code`** in the same registry – CDS-first **building** and **visual** verification.
- [https://cds.cbhq.net/](https://cds.cbhq.net/) – official CDS documentation.
