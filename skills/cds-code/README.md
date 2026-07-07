# cds-code

Helps your agent write idiomatic Coinbase Design System (CDS) code for React or React Native projects. Also supports CDS code review — ask your agent to audit a feature or set of files for CDS adherence.

We recommend also installing the `cds-docs` Skill or the CDS MCP server for even better performance!

```bash
npx skills add https://github.com/coinbase/cds --skill cds-docs
```

## Performance

Evaluated against 8 real-world coding and review tasks (iteration 3, 2026-06-26):

| Metric     | With skill | Without skill | Delta  |
| ---------- | ---------- | ------------- | ------ |
| Pass rate  | **100%**   | 73.7%         | +26.3% |
| Avg time   | 112.5s     | 72.4s         | +40.1s |
| Avg tokens | 39,907     | 38,176        | +1,731 |

### Per-eval breakdown

| Task                                              | With skill | Without skill |
| ------------------------------------------------- | ---------- | ------------- |
| Profile card (Avatar, ListCell, tokens)           | 100%       | 78%           |
| Create team modal (Modal, Select alpha)           | 100%       | 100%          |
| Banner + progress visualizations                  | 100%       | 100%          |
| Sidebar nav (icon names, active state)            | 100%       | 80%           |
| Empty state + illustration sizing                 | 100%       | 60%           |
| React Native wallet screen (CDS mobile)           | 100%       | 83%           |
| Deprecated component trap (TextHeadline/TextBody) | 100%       | 17%           |
| CDS code review (structured lint output)          | 100%       | 71%           |

The biggest gains come from domain-specific knowledge the base model lacks: CDS mobile primitives, deprecated API awareness, illustration component selection, and structured audit-format output.

## Running evaluations

Use the `skill-creator` skill to run the evals.

First install the skill-creator skill if it is not already:

```bash
npx skills add https://github.com/anthropics/skills --skill skill-creator
```

Run evals by prompting your agent:

> Use the skill-creator skill to run the evals for the cds-code skill
