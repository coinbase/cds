---
name: ktlo
description: Instructions to fetch assigned Linear issues in the current cycle and potentially kick off a development session.
model: claude-sonnet-4-6
disable-model-invocation: true
---

Use the Linear MCP server to get my assigned issues in the active cycle. Follow these steps exactly:

1. Call `get_user` with query `"me"` to retrieve my user info and the list of teams I belong to.
2. For each of my teams, call `list_cycles` with `type: "current"` and that team's `teamId` to get the active cycle ID(s). Skip teams with no active cycle.
3. For each active cycle found, call `list_issues` with `assignee: "me"`, the explicit cycle `id` (NOT the string "current"), and the corresponding `team` ID. Do NOT pass `"current"` as the cycle value — it must be the actual cycle ID returned in step 2.
4. Deduplicate and combine all results.

Present them to me as a list of options. It is possible that I have no issues assigned to me in the active cycle.

Also remind me to check the Jira Bug Sprint board for any bugs that may be assigned to me as they are still not tracked in Linear.

If I have any issues assigned to me in the active cycle, ask for the issue id/name/etc. that I may want to work on. If provided, fetch the rest of the issue's details and think about the best way to implement the feature/bug/etc. If there is not enough context on the issue, ask me clarifying questions.

You must always execute on designated issue in PLAN MODE. Never start coding a solution to the issue without consent from me on a well thought out plan.
