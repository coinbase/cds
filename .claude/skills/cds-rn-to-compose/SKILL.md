---
name: cds-rn-to-compose
description: |
  Guide for porting CDS React Native components to Jetpack Compose in packages/cds-android, and for auditing existing Android ports for completeness and quality.
  USE THIS whenever the user asks to port, migrate, or bring a CDS mobile/RN component to Android/Compose/Kotlin, audit an Android CDS component against mobile parity, or review whether a cds-android port is done correctly.
  Also trigger for phrases like "RN to Compose", "mobile to Android CDS", "port Button/Chip/Card to cds-android", "public API boundary", or "does our Android Button match mobile".
  Loads the CDS Compose Best Practices document from Linear, which is the source of truth for porting rules and learnings.
  Load jetpack-best-practices alongside this skill for Compose API shape.
---

# CDS React Native → Jetpack Compose

The porting rules and learnings live in the Linear document **CDS Compose Best Practices**, attached to the [Migrate CDS components to native](https://linear.app/coinbase/project/migrate-cds-components-to-native-f5911543a456) project.

- Document ID: `fbd2c503-d78f-42aa-bed9-fd9dd8b2af77`
- URL: https://linear.app/coinbase/document/cds-compose-best-practices-8810460c4b23

## Before starting

Fetch the document with the Linear MCP `get_document` tool, using the ID above, and follow it for the whole port or audit. If the Linear MCP server is unavailable, stop and ask the user to connect it. Do not port from memory.

## After finishing

If the port or audit taught something generalizable (a non-obvious pattern, a user correction, a gap in the doc, a deliberate decision not to port something), add it to the document with `save_document` using `patch`. Put it in the matching section, and tell the user what you changed. Skip one-off component trivia.
