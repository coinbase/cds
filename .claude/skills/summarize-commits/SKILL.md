---
name: summarize-commits
description: Reviews a git log to summarize the recent N changes
allowed-tools: Bash(git log:*), Bash(git status:*), Bash(git show:*), Bash(echo:*)
argument-hint: [Number of commits to review]
---

## Your task

Review the last $1 git commits and provide a summary of the changes. In addition to `git log`, use `git show` to obtain detailed information about the changesets before making any conclusions.
