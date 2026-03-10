---
name: github-repo-manager
description: Instructions to manage a local cache of GitHub repositories. This would typically done in cases where the user want to perform research/analysis on a repository. Invoke whenever you need to clone a repo that isn't present locally, bring an existing clone up to date, or remove a repo from the cache. This skill handles only the mechanical filesystem/git operations — not research, analysis, or anything about the repo's contents.
allowed-tools: Bash(git clone *), Bash(git pull *), Bash(rm -rf temp/repo-cache/*), Bash(test -d temp/repo-cache/*)
user-invocable: false
---

Manages a local repository cache at `temp/repo-cache/`. Use these patterns for repo lifecycle operations.

## Ensure a repo is available and up to date

1. Check whether the repo directory already exists:

   ```bash
   test -d temp/repo-cache/<name> && echo "exists" || echo "missing"
   ```

2. If **missing** — clone a shallow copy of the default branch:

   ```bash
   git clone --depth 1 <repo-url> temp/repo-cache/<name> --quiet
   ```

3. If **already present** — pull the latest commits:
   ```bash
   cd temp/repo-cache/<name> && git pull --quiet
   ```

## Clean up a repo

Remove a cached repo when it's no longer needed or when explicitly asked:

```bash
rm -rf temp/repo-cache/<name>
```

## Rules

- Always use `temp/repo-cache/` as the cache root — never clone repos to other locations
- Always clone with `--depth 1` (shallow) to minimize disk usage and clone time
- Never clone more than the single repo you need for the current task
